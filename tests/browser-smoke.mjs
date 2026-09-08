import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import sharp from 'sharp';

const url = process.env.DIAMOND_URL || 'http://127.0.0.1:4186/';
const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
  args: process.env.SOFTWARE_WEBGL ? ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] : [],
});
const results = [];
const difference = async (left, right) => {
  const pixels = image => sharp(image).resize(320, 200, { fit: 'fill' }).removeAlpha().raw().toBuffer();
  const a = await pixels(left);
  const b = await pixels(right);
  let total = 0;
  for (let i = 0; i < a.length; i++) total += Math.abs(a[i] - b[i]);
  return total / a.length;
};
await mkdir('test-results', { recursive: true });

try {
  const loading = await browser.newPage();
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  await loading.route('**/assets/index-*.js', async route => { await gate; await route.continue(); });
  try {
    await loading.goto(url, { waitUntil: 'commit' });
    await loading.locator('#scene-status').waitFor({ state: 'visible', timeout: 5000 });
    assert.match(await loading.locator('#scene-status').innerText(), /Loading/);
    console.log('PASS: loading feedback is visible before JavaScript downloads');
  } finally {
    release();
    await loading.unrouteAll({ behavior: 'wait' });
    await loading.close();
  }

  const entryFailure = await browser.newPage();
  await entryFailure.route('**/assets/index-*.js', route => route.abort());
  await entryFailure.goto(url, { waitUntil: 'commit' });
  await entryFailure.locator('#scene-status[role="alert"]').waitFor({ state: 'visible', timeout: 5000 });
  assert.equal(await entryFailure.locator('#scene-status a').isVisible(), true);
  await entryFailure.close();
  console.log('PASS: entry script failure shows a retry state');

  for (const viewport of [{ width: 1280, height: 800 }, { width: 390, height: 844 }]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      if (message.type() === 'error' || message.text().includes('GL_INVALID_OPERATION')) errors.push(message.text());
    });
    page.on('requestfailed', request => errors.push(`${request.url()}: ${request.failure()?.errorText}`));
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()}: ${response.url()}`); });
    for (const cache of ['cold', 'warm']) {
      await page.goto(url, { waitUntil: 'commit' });
      await page.waitForFunction(() => performance.getEntriesByName('diamond-ready').length > 0, null, { timeout: 60000 });
      assert.equal(await page.locator('#scene-status').isVisible(), false);
      const screenshot = await page.screenshot({ path: `test-results/${viewport.width}-${cache}.png` });
      if (viewport.width === 1280 && process.env.SOFTWARE_WEBGL) {
        const baseline = await readFile(new URL('./fixtures/diamond-desktop.png', import.meta.url));
        assert.ok(await difference(baseline, screenshot) < 2, 'Scene differs from the pre-optimization visual baseline');
      }
      const pixels = await sharp(screenshot).extract({ left: Math.round(viewport.width * 0.2), top: Math.round(viewport.height * 0.3), width: Math.round(viewport.width * 0.5), height: Math.round(viewport.height * 0.4) }).removeAlpha().raw().toBuffer();
      let bright = 0;
      for (let i = 0; i < pixels.length; i += 3) if (pixels[i] + pixels[i + 1] + pixels[i + 2] > 300) bright++;
      assert.ok(bright > 1000, `Blank scene: ${bright} bright pixels`);
      const resources = await page.evaluate(() => performance.getEntriesByType('resource').map(r => ({
        name: r.name, encoded: r.encodedBodySize, transfer: r.transferSize, decoded: r.decodedBodySize, duration: Math.round(r.duration),
      })));
      assert.equal(new Set(resources.map(r => r.name)).size, resources.length, 'Duplicate resource downloads');
      assert.ok(resources.filter(r => r.name.endsWith('.js')).length <= 2, 'Late shader request waterfall');
      const measurement = { viewport, cache, readyMs: Math.round(await page.evaluate(() => performance.getEntriesByName('diamond-ready')[0].startTime)), encodedBytes: resources.reduce((sum, r) => sum + r.encoded, 0), transferBytes: resources.reduce((sum, r) => sum + r.transfer, 0), resources };
      assert.ok(measurement.encodedBytes < 2_200_000, 'First-load resource budget exceeded');
      if (cache === 'warm' && url.startsWith('https://')) assert.equal(measurement.transferBytes, 0, 'Immutable assets were downloaded again');
      results.push(measurement);
      console.log(JSON.stringify({ ...measurement, resources: resources.length, brightPixels: bright }));
      const idleScreenshot = await page.screenshot();
      const autoDifference = await difference(screenshot, idleScreenshot);
      await page.mouse.move(viewport.width * 0.3, viewport.height * 0.4);
      await page.mouse.down();
      await page.mouse.move(viewport.width * 0.5, viewport.height * 0.5, { steps: 12 });
      await page.mouse.up();
      const dragDifference = await difference(idleScreenshot, await page.screenshot());
      assert.ok(dragDifference > Math.max(1, autoDifference * 2), `Drag must exceed auto-rotation: ${dragDifference} vs ${autoDifference}`);
      assert.deepEqual(errors, []);
    }
    await context.close();
  }

  for (const resource of ['diamond-*.json', 'diamondInner-*.json', 'texture-*.webp']) {
    const page = await browser.newPage();
    await page.route(`**/scene-assets/${resource}`, route => route.fulfill({ status: 503, body: 'Unavailable' }));
    await page.goto(url, { waitUntil: 'commit' });
    await page.waitForFunction(() => document.querySelector('#scene-status')?.getAttribute('role') === 'alert');
    assert.match(await page.locator('#scene-status').innerText(), /Unable to load/);
    assert.equal(await page.locator('#scene-status a').isVisible(), true);
    assert.equal(await page.evaluate(() => performance.getEntriesByName('diamond-ready').length), 0);
    await page.close();
  }
  console.log('PASS: model, material and texture failures show a retry state');
} finally {
  await writeFile('test-results/metrics.json', JSON.stringify(results, null, 2));
  await browser.close();
}
