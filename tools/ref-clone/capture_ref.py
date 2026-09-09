# 레퍼런스 사이트 전체 페이지 캡처.
#   python capture_ref.py <url> <out.png> [width]
# 스크롤로 등장 애니메이션(Framer/Webflow 의 appear 효과)을 전부 트리거한 뒤 맨 위로 올려 찍는다.
# 브라우저 페인 도구로 찍지 말 것 — 스크롤 캡처가 깨진다. 항상 이 스크립트를 쓴다.
import sys
from playwright.sync_api import sync_playwright

url, out = sys.argv[1], sys.argv[2]
width = int(sys.argv[3]) if len(sys.argv) > 3 else 1440

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': width, 'height': 900})
    try: pg.goto(url, wait_until='networkidle', timeout=45000)
    except Exception: pg.goto(url, wait_until='load', timeout=60000)  # Framer 는 networkidle 에 안 닿을 때가 있다
    pg.wait_for_timeout(4000)
    h = pg.evaluate("document.documentElement.scrollHeight"); y = 0
    while y < h:
        pg.mouse.wheel(0, 700); pg.wait_for_timeout(220); y += 700
        h = pg.evaluate("document.documentElement.scrollHeight")
    pg.wait_for_timeout(1500)
    pg.evaluate("window.scrollTo(0,0)"); pg.wait_for_timeout(2000)
    pg.screenshot(path=out, full_page=True)
    print(out, pg.evaluate("[innerWidth, document.documentElement.scrollHeight]"))
    b.close()
