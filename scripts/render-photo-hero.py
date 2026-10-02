"""Render the supplied travel photographs as a seamless 20-second hero loop."""
from pathlib import Path
import math
import subprocess
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path('C:/Users/Gaveen/Desktop/images')
OUT = ROOT / 'public' / 'videos'
OUT.mkdir(parents=True, exist_ok=True)
FFMPEG = 'C:/Users/Gaveen/AppData/Local/Temp/hero-ffmpeg/package/ffmpeg.exe'
W, H, FPS = 1280, 720, 30
# filename, start/end camera position, start/end magnification
SHOTS = [
 ('360_F_322535378_f2I0DBWZpMIUz6DQdFGzBgasc9uE3CKY.jpg', (.30,.48),(.39,.44),1.03,1.09),
 ('sander-traa-PPEP9eGTsnI-unsplash.jpg', (.57,.39),(.60,.27),1.10,1.02),
 ('agnieszka-stankiewicz-bkfBxbI7a1g-unsplash.jpg', (.40,.51),(.53,.51),1.04,1.09),
 ('240_F_191252597_61MYgOzSbqGQkGBjUZK1kEr9BI2y4uu0.jpg', (.32,.50),(.43,.47),1.03,1.07),
 ('240_F_512813744_8MJdcpwpfGkZtvuG84SINllLy33s2h05.jpg', (.52,.56),(.50,.38),1.08,1.02),
 ('yves-alarie-3R50kTNBKiE-unsplash.jpg', (.52,.55),(.48,.43),1.12,1.02),
 ('240_F_290795349_7zMB4TYOcLOaENH9DHtfwTxNfIkQZKdX.jpg', (.45,.48),(.54,.43),1.02,1.07),
 ('240_F_264132900_umlsAtwWXX3x6fa5n0iFyGxkxfGb2W5n.jpg', (.47,.53),(.52,.42),1.06,1.02),
 ('daniel-klein-Qx8_d5dGhrs-unsplash.jpg', (.49,.64),(.56,.59),1.03,1.11),
 ('240_F_362976347_Kimm7TxnC5WzNPGhHqZNbxkAUPO8xPF8.jpg', (.46,.58),(.52,.54),1.05,1.01),
]
images = []
for name, *_ in SHOTS:
    im = Image.open(SOURCE / name).convert('RGB')
    im.thumbnail((2600,2600), Image.Resampling.LANCZOS)
    images.append(im)

def shot(index, local):
    im = images[index]
    _, a, b, za, zb = SHOTS[index]
    p = max(0., min(1., local / 2.5))
    # Steady aerial glide with a subtle eased velocity change.
    p = .65*p + .35*(p*p*(3-2*p))
    z = za + (zb-za)*p
    cw = min(im.width, im.height*W/H)/z
    ch = cw*H/W
    x = (im.width-cw)*(a[0]+(b[0]-a[0])*p)
    y = (im.height-ch)*(a[1]+(b[1]-a[1])*p)
    return im.transform((W,H), Image.Transform.EXTENT, (x,y,x+cw,y+ch), Image.Resampling.BICUBIC)

def frame(t):
    t = (t+.5)%20
    i = int(t//2)
    local = t%2
    current = shot(i,local)
    if local < .5:
        p = local/.5
        mix = p*p*(3-2*p)
        previous = shot((i-1)%10,local+2)
        # A brief soft motion transition on aerial scene changes.
        radius = math.sin(math.pi*p)*1.4 if i in (1,4,5,6,7) else 0
        if radius:
            previous = previous.filter(ImageFilter.GaussianBlur(radius))
            current = current.filter(ImageFilter.GaussianBlur(radius))
        current = Image.blend(previous,current,mix)
    return current

target = OUT/'sri-lanka-hero-20s.mp4'
cmd = [FFMPEG,'-y','-hide_banner','-loglevel','error','-f','rawvideo','-vcodec','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','medium','-crf','21','-pix_fmt','yuv420p','-movflags','+faststart',str(target)]
proc = subprocess.Popen(cmd,stdin=subprocess.PIPE)
for n in range(20*FPS):
    picture = frame(n/FPS)
    proc.stdin.write(picture.tobytes())
    if n%60 == 0:
        print(f'Rendered {n//FPS}/20 seconds',flush=True)
proc.stdin.close()
if proc.wait():
    raise RuntimeError('Video encoding failed')
frame(0).save(OUT/'sri-lanka-hero-poster.jpg', quality=90)
sheet = Image.new('RGB',(960,540))
for i in range(10):
    thumb = frame(i*2+.7).resize((320,180),Image.Resampling.LANCZOS)
    # First nine shots in the main review sheet; final shot is checked separately.
    if i<9: sheet.paste(thumb,((i%3)*320,(i//3)*180))
sheet.save(OUT/'sri-lanka-hero-review.jpg',quality=88)
print(f'Done: {target} ({target.stat().st_size/1024/1024:.2f} MB)',flush=True)
