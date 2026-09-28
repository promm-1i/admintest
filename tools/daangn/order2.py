"""편집기 안 사진을 하나씩 찍어 원본 20장과 대조해 실제 순서를 알아낸다."""
from pathlib import Path
from PIL import Image, ImageChops, ImageStat
from playwright.sync_api import sync_playwright

SRC = sorted((Path.home() / "Desktop" / "개발" / "2. 홍보카드" /
              "BREP-1001_해담양조" / "당근_카페").glob("*.jpg"))
TMP = Path.home() / '.daangn' / 'out' / 'cmp'
TMP.mkdir(parents=True, exist_ok=True)


def sig(im):
    return im.convert("L").resize((64, 80))


def diff(a, b):
    return ImageStat.Stat(ImageChops.difference(a, b)).mean[0]


refs = [(f.name, sig(Image.open(f))) for f in SRC]

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    pg = b.contexts[0].pages[-1]
    imgs = pg.locator(".ProseMirror img")
    n = imgs.count()
    print("편집기 안 사진", n, "장")
    for i in range(n):
        el = imgs.nth(i)
        el.scroll_into_view_if_needed()
        pg.wait_for_timeout(120)
        path = TMP / f"e{i:02d}.png"
        el.screenshot(path=str(path))
        s = sig(Image.open(path))
        best = min(refs, key=lambda r: diff(r[1], s))
        print(f"  {i + 1:2d}번째  ->  {best[0]}")
