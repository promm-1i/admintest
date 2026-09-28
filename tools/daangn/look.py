"""붙어서 지금 화면 상태만 본다."""
import sys
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    ctx = b.contexts[0]
    pg = ctx.pages[-1]
    if len(sys.argv) > 1:
        pg.goto(sys.argv[1], wait_until="domcontentloaded")
        pg.wait_for_timeout(2500)
    print("URL :", pg.url)
    print("제목:", pg.title())
    txt = pg.evaluate("document.body.innerText").replace("\n\n", "\n")
    print("--- 본문 앞부분")
    print(txt[:1200])
