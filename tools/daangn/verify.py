"""사진과 바로 아래 링크가 짝이 맞는지 그림으로 대조하고, 공지 고정 칸이 있는지 본다."""
import importlib.util
from pathlib import Path
from PIL import Image, ImageChops, ImageStat
from playwright.sync_api import sync_playwright

spec = importlib.util.spec_from_file_location("n", str(Path(__file__).parent / "notice.py"))
# notice.py 는 실행되면 안 되니 ITEMS 만 읽어 온다
src = Path(str(Path(__file__).parent / "notice.py")).read_text(encoding="utf-8")
ns = {}
exec(src[src.index("ITEMS = ["):src.index("def type_block")], ns)
ITEMS = ns["ITEMS"]
ROOT = Path.home() / "Desktop" / "개발" / "2. 홍보카드"
TMP = Path.home() / '.daangn' / 'out' / 'vcmp'
TMP.mkdir(parents=True, exist_ok=True)


def sig(im):
    return im.convert("L").resize((64, 80))


def diff(a, b):
    return ImageStat.Stat(ImageChops.difference(a, b)).mean[0]


refs = [(lab, sig(Image.open(ROOT / fol / "당근_카페" / "01-대표.jpg"))) for _, fol, lab in ITEMS]

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    pg = b.contexts[0].pages[-1]
    imgs = pg.locator(".ProseMirror img")
    n = imgs.count()
    bad = 0
    for i in range(n):
        el = imgs.nth(i)
        el.scroll_into_view_if_needed()
        pg.wait_for_timeout(100)
        path = TMP / f"v{i:02d}.png"
        el.screenshot(path=str(path))
        s = sig(Image.open(path))
        best = min(refs, key=lambda r: diff(r[1], s))[0]
        want = ITEMS[i][2] if i < len(ITEMS) else "?"
        mark = "" if best == want else "   <-- 어긋남"
        if best != want:
            bad += 1
        print(f"  {i + 1:2d} 사진={best:26s} 아래글={want}{mark}")
    print(f"\n사진 {n}장 · 짝 안 맞는 것 {bad}개")
    print("--- 공지 고정 칸")
    js = """()=>[...document.querySelectorAll('label,button,[role=switch],input[type=checkbox]')]
      .map(e=>((e.innerText||'')+' | '+(e.getAttribute('aria-label')||'')).trim())
      .filter(t=>t.length>2&&t.length<40)"""
    seen = set()
    for t in pg.evaluate(js):
        if t not in seen:
            seen.add(t)
            print("   ", t)
