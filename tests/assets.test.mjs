import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import { prepareAssets } from '../scripts/prepare-assets.mjs';

const source = new URL('../public/', import.meta.url);
let directory;
let manifest;
const readJson = async path => JSON.parse(await readFile(path, 'utf8'));

before(async () => {
  directory = await mkdtemp(join(tmpdir(), 'diamond-assets-'));
  manifest = await prepareAssets(source, directory);
});
after(async () => { if (directory) await rm(directory, { recursive: true }); });

test('model compaction preserves every geometry and scene property', async () => {
  const original = await readJson(new URL('model/diamond.json', source));
  const optimized = await readJson(join(directory, manifest.model));
  assert.deepEqual(optimized, original);
  assert.ok((await readFile(join(directory, manifest.model))).length < 4_000_000);
});

test('materials share external textures and retain the complete node graph', async () => {
  const urls = [];
  for (const key of ['diamondInner', 'diamondOuter', 'redCloth']) {
    const original = await readJson(new URL(`model/${key}.json`, source));
    const optimized = await readJson(join(directory, manifest[key]));
    assert.equal(optimized.editorData, undefined);
    for (const [index, block] of optimized.blocks.entries()) {
      if (!block.texture?.name?.startsWith('/scene-assets/')) continue;
      const url = block.texture.name;
      urls.push(url);
      const originalData = Buffer.from(original.blocks[index].texture.name.split(',')[1], 'base64');
      const encoded = await readFile(join(directory, url));
      if (url.endsWith('.jpg')) assert.deepEqual(encoded, originalData);
      else {
        const decode = data => sharp(data).toColourspace('srgb').ensureAlpha().raw().toBuffer();
        const before = await decode(originalData);
        const after = await decode(encoded);
        assert.equal(after.length, before.length);
        for (let i = 0; i < before.length; i += 4) {
          assert.equal(after[i + 3], before[i + 3]);
          if (before[i + 3]) assert.deepEqual(after.subarray(i, i + 3), before.subarray(i, i + 3));
        }
      }
      block.texture.name = original.blocks[index].texture.name;
    }
    delete original.editorData;
    assert.deepEqual(optimized, original);
  }
  assert.equal(urls.length, 11);
  assert.equal(new Set(urls).size, 7);
});
