"""Render an eight-second looping photo film from existing destination assets."""
from pathlib import Path
import subprocess
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/videos/packages'
OUT.mkdir(parents=True, exist_ok=True)
FFMPEG = 'C:/Users/Gaveen/AppData/Local/Temp/hero-ffmpeg/package/ffmpeg.exe'
W, H, FPS = 1280, 720, 24
images = [Image.open(ROOT / path).convert('RGB') for path in ['public/images/home-gallery/tea-country.webp', 'public/images/travel/kenya-elephants.webp']]

def shot(index, t):
    im = images[index]
    p = max(0, min(1, t / 4.8))
    zoom = 1.03 + .045 * p
    width = min(im.width, im.height * W / H) / zoom
    height = width * H / W
    x = (im.width - width) * (.42 + .12 * p)
    y = (im.height - height) * .45
    return im.transform((W, H), Image.Transform.EXTENT, (x, y, x + width, y + height), Image.Resampling.BICUBIC)

def frame(t):
    t = (t + .8) % 8
    index, local = int(t // 4), t % 4
    current = shot(index, local)
    if local < .8:
        p = local / .8
        current = Image.blend(shot((index - 1) % 2, local + 4), current, p*p*(3-2*p))
    return current

proc = subprocess.Popen([FFMPEG, '-y', '-hide_banner', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-', '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(OUT/'journeys.mp4')], stdin=subprocess.PIPE)
for n in range(8 * FPS):
    proc.stdin.write(frame(n / FPS).tobytes())
proc.stdin.close()
assert proc.wait() == 0
frame(0).save(OUT/'poster.webp', quality=85)
sheet = Image.new('RGB', (960, 540))
for i in range(4):
    sheet.paste(frame(i*2).resize((480,270)), ((i%2)*480,(i//2)*270))
sheet.save(OUT/'review.jpg')
print(f'8 seconds, 1280x720, 24 fps, silent; {(OUT/"journeys.mp4").stat().st_size / 1048576:.2f} MB')
