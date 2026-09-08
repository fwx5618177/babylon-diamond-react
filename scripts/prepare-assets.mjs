import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

export async function prepareAssets(source, destination) {
  await mkdir(join(destination, 'scene-assets'), { recursive: true });
  const textures = new Map();
  const manifest = {};
  const emit = async (name, extension, bytes) => {
    const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 16);
    const url = `/scene-assets/${name}-${hash}.${extension}`;
    await writeFile(join(destination, url), bytes);
    return url;
  };
  const texture = async bytes => {
    const hash = createHash('sha256').update(bytes).digest('hex');
    if (textures.has(hash)) return textures.get(hash);
    const { format } = await sharp(bytes).metadata();
    let extension = format === 'jpeg' ? 'jpg' : format;
    if (format === 'png') {
      const webp = await sharp(bytes).webp({ lossless: true, effort: 6 }).toBuffer();
      if (webp.length < bytes.length) {
        bytes = webp;
        extension = 'webp';
      }
    }
    const url = await emit('texture', extension, bytes);
    textures.set(hash, url);
    return url;
  };

  for (const name of ['diamond', 'diamondInner', 'diamondOuter', 'redCloth']) {
    const data = JSON.parse(await readFile(new URL(`model/${name}.json`, source), 'utf8'));
    delete data.editorData;
    for (const block of data.blocks ?? []) {
      if (block.texture?.name?.startsWith('data:')) {
        const bytes = Buffer.from(block.texture.name.split(',')[1], 'base64');
        block.texture.name = await texture(bytes);
      }
    }
    manifest[name === 'diamond' ? 'model' : name] = await emit(name, 'json', JSON.stringify(data));
  }
  manifest.shadow = await texture(await readFile(new URL('shadow.png', source)));
  manifest.textures = [...textures.values()];
  return manifest;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const destination = new URL('../generated/public/', import.meta.url);
  await rm(destination, { recursive: true, force: true });
  const manifest = await prepareAssets(new URL('../public/', import.meta.url), fileURLToPath(destination));
  await mkdir(new URL('../src/generated/', import.meta.url), { recursive: true });
  await writeFile(new URL('../src/generated/assets.json', import.meta.url), JSON.stringify(manifest, null, 2));
  console.log(`Prepared scene assets with ${manifest.textures.length} shared textures.`);
}
