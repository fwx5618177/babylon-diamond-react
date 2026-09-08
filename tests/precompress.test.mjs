import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { precompress } from '../scripts/precompress.mjs';

test('precompressed assets round-trip without changing the original bytes', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'diamond-gzip-'));
  try {
    const data = Buffer.from(JSON.stringify({ positions: Array(10000).fill(1.2345) }));
    const filename = join(directory, 'model.json');
    await writeFile(filename, data);
    await precompress(directory);
    const compressed = await readFile(`${filename}.gz`);
    assert.deepEqual(gunzipSync(compressed), data);
    assert.deepEqual(await readFile(filename), data);
    assert.ok(compressed.length < data.length / 10);
  } finally {
    await rm(directory, { recursive: true });
  }
});
