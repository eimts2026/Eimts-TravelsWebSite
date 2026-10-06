"""Build the generated WebP collection assets and normalize repeated itinerary data."""
from pathlib import Path
import json
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
generated = Path('C:/Users/Gaveen/.codex/generated_images/01a10ae9-3350-7ad3-ace6-45cfcd066cef')
out = root / 'public/images/package-collection'
(out / 'cards').mkdir(parents=True, exist_ok=True)
scenes = [Image.open(generated / name).convert('RGB') for name in ['exec-27d8e9b7-4667-4d54-ad1e-711055c45a00.png', 'exec-0b70e25e-b66a-40f2-bfae-70f4d2f77a12.png']]
for width, name in [(1440, 'hero'), (720, 'hero-mobile')]:
    a, b = [ImageOps.fit(scene, (width, round(width * 9 / 16)), method=Image.Resampling.LANCZOS) for scene in scenes]
    frames = [a] + [Image.blend(a, b, i / 12) for i in range(1, 12)] + [b] + [Image.blend(b, a, i / 12) for i in range(1, 12)]
    frames[0].save(out / (name + '.webp'), save_all=True, append_images=frames[1:], duration=[3000] + [70]*11 + [3000] + [70]*11, loop=0, quality=74, method=6)
    if width == 1440:
        a.save(out / 'hero-still.webp', quality=85, method=6)

data_path = root / 'src/data/packages.json'
trips = json.loads(data_path.read_text(encoding='utf-8'))
sizes_path = root / 'src/data/image-sizes.json'
sizes = json.loads(sizes_path.read_text(encoding='utf-8'))
replacements = {
    1: ('7-day-kenya-safari-adventure-2.webp', 'Giraffes beside a safari track in Kenya'),
    4: ('6-day-amboseli-and-masai-mara-luxury-safari.jpg', 'Safari vehicle on the Kenyan plains with a balloon in the distance'),
    7: ('9-day-wildlife-diani-beach-safari.webp', 'White sand and turquoise water at Diani Beach'),
    8: ('6-day-sopa-all-inclusive-safari-in-kenya.jpg', 'Wildebeest crossing a river in Kenya'),
    10: ('3-day-mid-range-masai-mara-lake-naivasha-safari.jpg', 'Waterbirds beside a Kenyan lake'),
    11: ('10-day-best-of-kenya-safari-mara-amboseli-samburu-ol-pejeta-naivasha.jpg', 'Giraffes on the Amboseli plains beneath Kilimanjaro'),
    13: ('5-day-lake-naivasha-lake-nakuru-masai-mara-safari.jpg', 'Zebras and elephants on the Kenyan savannah'),
    15: ('4-days-lake-naivasha-lake-nakuru-masai-mara-4x4-safari.jpg', 'Buffalo and flamingos beside a Kenyan lake'),
    16: ('4-days-maasai-mara-lake-naivasha-lake-nakuru-budget-safari.jpg', 'Hippo and flamingos in a Kenyan lake'),
}
for index, (filename, alt) in replacements.items():
    image = Image.open(root / 'public/images/packages' / filename).convert('RGB')
    image.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
    path = '/images/package-collection/cards/' + Path(filename).stem + '.webp'
    image.save(root / ('public' + path), quality=84, method=6)
    trips[index].update(image=path, imageAlt=alt)
for index, filename, alt in [
    (22, 'sigiriya', 'Sigiriya rising above the green Sri Lankan landscape'),
    (26, 'waterfall', 'Waterfall in Sri Lanka’s lush hill country'),
    (32, 'nine-arch-bridge', 'Nine Arch Bridge among the green hills near Ella'),
]:
    trips[index].update(image=f'/images/home-gallery/{filename}.webp', imageAlt=alt)
leopard = Image.open(generated / 'exec-82933193-281d-498b-aad5-8e19986ae786.png').convert('RGB')
leopard.thumbnail((1200, 900), Image.Resampling.LANCZOS)
leopard.save(out / 'cards/sri-lanka-leopard.webp', quality=85, method=6)
trips[21].update(image='/images/package-collection/cards/sri-lanka-leopard.webp', imageAlt='Illustrative Sri Lankan leopard resting on a granite outcrop')
trips[24]['itinerarySource'] = trips[11]['url']
trips[24].pop('itinerary', None)
for trip in trips:
    with Image.open(root / ('public' + trip['image'])) as img:
        sizes[trip['image']] = {'width': img.width, 'height': img.height}
data_path.write_text(json.dumps(trips, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
sizes_path.write_text(json.dumps(sizes, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print('Built hero WebP files and unique images for', len(trips), 'booking options.')
