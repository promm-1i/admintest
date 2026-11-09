# 찍어 둔 화면으로 올릴 사진 묶음을 만든다: ref-sites/_joongna_posts/<코드_이름>/pics/ 에 올릴 순서대로 번호, 마지막 한 장은 폰 세 장 나란히(글자 없이 실제 화면만)
#   python make_pics.py <날짜 MMDD> <폴더> <코드_이름> <이름,이름,...(9장)> <폰,폰,폰> [배경으로 흐릴 이름=index_0]
import shutil, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
sys.stdout.reconfigure(encoding="utf-8")

day, slug, code = sys.argv[1:4]
order, mobile = sys.argv[4].split(","), sys.argv[5].split(",")
bgname = sys.argv[6] if len(sys.argv) > 6 else "index_0"
SH = Path(r"C:\web-project\ref-sites\_biz_posts") / ("_shots_" + day) / slug
P = Path(r"C:\web-project\ref-sites\_joongna_posts") / code / "pics"


def three():
    W, H, ph = 2460, 1845, 1600
    bg = Image.open(SH / (bgname + ".jpg")).convert("RGB").resize((W, H)).filter(ImageFilter.GaussianBlur(40))
    bg = Image.blend(bg, Image.new("RGB", (W, H), (232, 238, 248)), 0.45)
    ims = []
    for n in mobile:
        im = Image.open(SH / (n + ".jpg")).convert("RGB")
        ims.append(im.resize((round(im.width * ph / im.height), ph), Image.LANCZOS))
    gap = 70
    x = (W - sum(i.width for i in ims) - gap * 2) // 2
    for im in ims:
        pw, y = im.width, (H - ph) // 2
        sh = Image.new("L", (W, H), 0); ImageDraw.Draw(sh).rounded_rectangle((x + 14, y + 22, x + pw + 14, y + ph + 22), 48, fill=110)
        bg.paste((20, 28, 52), (0, 0), sh.filter(ImageFilter.GaussianBlur(18)))
        m = Image.new("L", (pw, ph), 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, pw - 1, ph - 1), 44, fill=255)
        bg.paste(im, (x, y), m)
        ImageDraw.Draw(bg).rounded_rectangle((x, y, x + pw - 1, y + ph - 1), 44, outline=(29, 36, 54), width=5)
        x += pw + gap
    return bg


if P.exists():
    shutil.rmtree(P)
P.mkdir(parents=True)
for i, n in enumerate(order, 1):
    Image.open(SH / (n + ".jpg")).convert("RGB").save(P / ("%02d_%s.jpg" % (i, n)), quality=90)
three().save(P / ("%02d_mo_three.jpg" % (len(order) + 1)), quality=90)
print(code, len(list(P.glob("*.jpg"))), "장 →", P)
