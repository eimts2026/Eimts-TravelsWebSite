import fs from 'node:fs/promises';
import sharp from 'sharp';
import places from '../src/data/home-places.js';

await fs.mkdir('public/images/places', { recursive: true });
for (const place of places.filter(item => item.image.startsWith('/images/places/'))) {
  await sharp(`tmp/city-photos/${place.id}.jpg`).rotate().resize({ width: 960, height: 960, fit: 'inside', withoutEnlargement: true }).webp({ quality: 84 }).toFile(`public${place.image}`);
}
const sources = JSON.parse(await fs.readFile('tmp/city-photos/sources.json', 'utf8'));
const stripHtml = text => (text || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
await fs.writeFile('public/images/places/credits.json', JSON.stringify(sources.map(item => ({ ...item, author: stripHtml(item.author) })), null, 2));
console.log(`Prepared ${places.length - 3} city photographs.`);
