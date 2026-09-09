# 템플릿들의 1440 문서높이만 빠르게 잰다 (문구 교체 전후 비교용)
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome')
    for slug in sys.argv[1:]:
        pg = b.new_page(viewport={'width': 1440, 'height': 900})
        pg.goto(f'file:///C:/web-project/mintcl-netlify-spa/public/templates/{slug}/index.html', wait_until='load')
        pg.wait_for_timeout(1800)
        H = pg.evaluate('document.documentElement.scrollHeight'); y = 0
        while y < H:
            pg.evaluate(f'window.scrollTo(0,{y})'); pg.wait_for_timeout(60); y += 900
        pg.evaluate('window.scrollTo(0,0)'); pg.wait_for_timeout(500)
        print(f"{slug}\t{pg.evaluate('document.documentElement.scrollHeight')}")
        pg.close()
    b.close()
