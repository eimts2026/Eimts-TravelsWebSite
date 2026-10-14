import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve('public/images');
const dimensionsPath = 'src/data/image-sizes.json';
const dimensions = JSON.parse(await fs.readFile(dimensionsPath, 'utf8'));
const changes = [];
async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { await walk(file); continue; }
    if (!/\.(webp|jpe?g|png)$/i.test(entry.name)) continue;
    const input = await fs.readFile(file);
    const meta = await sharp(input).metadata();
    if (meta.pages > 1) continue;
    let pipeline = sharp(input).rotate().resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true });
    if (/\.webp$/i.test(file)) pipeline = pipeline.webp({ quality: 78, effort: 5 });
    else if (/\.png$/i.test(file)) pipeline = pipeline.png({ compressionLevel: 9 });
    else pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
    const output = await pipeline.toBuffer();
    // Avoid recompression when the saving is negligible.
    if (output.length < input.length * .85) {
      await fs.writeFile(file, output);
      const size = await sharp(output).metadata();
      const url = '/' + path.relative('public', file).split(path.sep).join('/');
      if (dimensions[url]) dimensions[url] = { width: size.width, height: size.height };
      changes.push({ file: url, before: input.length, after: output.length });
    }
  }
}
await walk(root);
await fs.writeFile(dimensionsPath, JSON.stringify(dimensions, null, 2) + '\n');
await fs.mkdir('docs/review', { recursive: true });
await fs.writeFile('docs/review/image-optimization.json', JSON.stringify(changes, null, 2));
console.log(JSON.stringify({ optimized: changes.length, bytesSaved: changes.reduce((n, x) => n + x.before - x.after, 0) }));
