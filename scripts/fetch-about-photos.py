"""Download and optimize the credited Unsplash photography used on About."""
import html, io, json, re, urllib.request
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
photos = [('bridge', 'w5jDXdaRvO0', '1775479788897-c5ec08cb7fb0'), ('tea', 'jDeiRvoIZj4', '1754644581156-2cd38958bf67'), ('coast', 'iQJAcWlZtBg', '1725807533946-45fb38f6ab50'), ('safari', 'TVbVOFbfGPo', '1627421706674-fb58c0befa92'), ('footer', 'LMOGPWcircE', '1637434666254-ff42734cf4a6')]
folder = root / 'public/images/about'
folder.mkdir(parents=True, exist_ok=True)
sizes_path = root / 'src/data/image-sizes.json'
sizes = json.loads(sizes_path.read_text())
credits = []
for name, photo_id, asset_id in photos:
    source = 'https://unsplash.com/photos/' + photo_id
    url = 'https://images.unsplash.com/photo-' + asset_id + '?auto=format&fit=max&w=1500&q=85'
    photo = Image.open(io.BytesIO(urllib.request.urlopen(url, timeout=40).read())).convert('RGB')
    photo.thumbnail((1500, 1500))
    photo.save(folder / (name + '.webp'), 'WEBP', quality=84)
    sizes['/images/about/' + name + '.webp'] = {'width': photo.width, 'height': photo.height}
    credits.append({'file': name + '.webp', 'source': source, 'license': 'https://unsplash.com/license'})
    print(name, photo.size)
sizes_path.write_text(json.dumps(sizes, indent=2) + '\n')
(root / 'src/data/about-photo-sources.json').write_text(json.dumps(credits, indent=2) + '\n')
