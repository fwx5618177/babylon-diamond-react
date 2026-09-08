import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { gzipSync } from 'node:zlib';

export async function precompress(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = join(directory, entry.name);
    if (entry.isDirectory()) await precompress(filename);
    else if (/\.(js|json|css)$/.test(entry.name)) {
      const data = await readFile(filename);
      if (data.length >= 1024) await writeFile(`${filename}.gz`, gzipSync(data, { level: 9 }));
    }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await precompress(fileURLToPath(new URL('../dist/', import.meta.url)));
}
