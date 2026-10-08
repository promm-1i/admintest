"""포트폴리오 메뉴가 어디 있는지 링크를 훑어 찾는다."""
from playwright.sync_api import sync_playwright

LINKS_JS = """()=>[...document.querySelectorAll('a[href]')]
 .map(a=>({t:(a.innerText||'').trim().slice(0,22), h:a.getAttribute('href')}))
 .filter(o=>o.h && !o.h.startsWith('#'))"""

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9223")
    pg = [x for x in b.contexts[0].pages if "about:blank" not in x.url][-1]
    for url in ["https://kmong.com/my_profile/seller"]:
        try:
            pg.goto(url, wait_until="domcontentloaded", timeout=30000)
        except Exception:
            continue
        pg.wait_for_timeout(3000)
        links = pg.evaluate(LINKS_JS)
        hits = [o for o in links
                if "/support/" not in o["h"] and "become-a-seller" not in o["h"]]
        print(f"\n=== {pg.url}  (링크 {len(links)}개 중 걸린 것 {len(hits)})")
        for o in hits[:60]:
            print(f"   [{o['t']}] {o['h']}")
