import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const source = 'C:/Users/Gaveen/Desktop/images';
const target = 'public/images/home-gallery';
const files = [
  ['beach.jpg', 'coastal-bay'],
  ['red mosque.jpg', 'red-mosque'],
  ['promodhya-abeysekara-gjd-7_3Ek_w-unsplash.jpg', 'city-heritage'],
  ['sander-traa-PPEP9eGTsnI-unsplash.jpg', 'sigiriya-summit'],
  ['agnieszka-stankiewicz-bkfBxbI7a1g-unsplash.jpg', 'cave-temple'],
  ['240_F_362976347_Kimm7TxnC5WzNPGhHqZNbxkAUPO8xPF8.jpg', 'fishermen-sunset'],
  ['sebastian-latorre-VqPOeYqzK-M-unsplash.jpg', 'coconut-coast'],
];
await mkdir(target, { recursive: true });
for (const [file, name] of files) {
  const input = path.join(source, file);
  const output = await sharp(input).rotate().resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true }).webp({ quality: 86 }).toFile(path.join(target, `${name}.webp`));
  await sharp(input).rotate().resize({ width: 240, height: 240, fit: 'inside', withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(target, `${name}-thumb.webp`));
  console.log(`${name}: ${output.width}x${output.height}, ${Math.round(output.size / 1024)} KB`);
}
