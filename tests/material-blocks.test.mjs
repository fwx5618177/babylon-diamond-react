import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { GetClass } from '@babylonjs/core/Misc/typeStore.js';
import '../src/scene/materials/registerBlocks.ts';

test('every serialized material block is registered by the production imports', async () => {
  for (const name of ['diamondInner', 'diamondOuter', 'redCloth']) {
    const data = JSON.parse(await readFile(new URL(`../public/model/${name}.json`, import.meta.url), 'utf8'));
    for (const block of data.blocks) assert.ok(GetClass(block.customType), block.customType);
  }
});
