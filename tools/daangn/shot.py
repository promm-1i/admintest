from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path.home() / '.daangn' / 'out'
OUT.mkdir(parents=True, exist_ok=True)
from PIL import Image
with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    pg = b.contexts[0].pages[-1]
    pg.screenshot(path=str(OUT / "full.png"), full_page=True)
    im = Image.open(str(OUT / "full.png"))
    print("전체", im.size)
    im.crop((0, 0, im.width, min(1500, im.height))).resize((im.width // 2, min(1500, im.height) // 2)).save(str(OUT / "top.png"))
    txt = pg.evaluate("document.querySelector('.ProseMirror').innerText")
    print("--- 본문 그대로")
    print(txt[:700])
