"""Create local review sheets for the package photography."""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw

root = Path(__file__).resolve().parents[1]
out = root / 'tmp/package-review'
out.mkdir(parents=True, exist_ok=True)
for source in ['packages', 'travel']:
    files = [path for path in (root/'public/images'/source).glob('*') if path.suffix.lower() in ['.jpg', '.jpeg', '.png', '.webp']]
    for page in range((len(files)+23)//24):
        subset = files[page*24:(page+1)*24]
        sheet = Image.new('RGB',(1200, ((len(subset)+3)//4)*210),'#f7f7f0')
        draw = ImageDraw.Draw(sheet)
        for i, path in enumerate(subset):
            x, y = (i%4)*300, (i//4)*210
            try:
                im = ImageOps.fit(Image.open(path).convert('RGB'),(292,166))
                sheet.paste(im,(x,y))
                name=path.stem
                draw.text((x+4,y+169),f'{files.index(path)}: {name[:38]}',fill='black')
                draw.text((x+4,y+185),name[38:78],fill='black')
            except Exception as error: print(path,error)
        sheet.save(out/f'{source}-{page}.jpg')
    print(source, list(enumerate(path.name for path in files)))
