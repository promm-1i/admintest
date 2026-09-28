import sys
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    pg = b.contexts[0].pages[-1]
    # 글쓰기 진입
    for sel in ["a:has-text('글쓰기')", "button:has-text('글쓰기')"]:
        loc = pg.locator(sel).first
        if loc.count():
            print("클릭:", sel, "href=", loc.get_attribute("href"))
            loc.click()
            break
    pg.wait_for_timeout(3000)
    print("URL :", pg.url)
    print("제목:", pg.title())
    print("--- 입력 칸")
    for h in pg.locator("input, textarea, [contenteditable='true'], select").all():
        try:
            print(" ", h.evaluate("e=>e.tagName+' type='+(e.type||'-')+' name='+(e.name||'-')+' ph='+(e.placeholder||'-')+' id='+(e.id||'-')+' cls='+(e.className+'').slice(0,40)+' 보임='+!!(e.offsetParent||e.getClientRects().length)"))
        except Exception:
            pass
    print("--- 버튼")
    for h in pg.locator("button, [role=button]").all()[:30]:
        try:
            t = (h.inner_text() or "").strip().replace("\n", " ")[:24]
            if t:
                print("  [", t, "]")
        except Exception:
            pass
