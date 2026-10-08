"""포트폴리오 관리 화면 주소를 훑어 찾는다."""
from playwright.sync_api import sync_playwright

URLS = [
    "https://kmong.com/dashboard",
    "https://kmong.com/seller/dashboard",
    "https://kmong.com/manage_gigs",
    "https://kmong.com/gig/manage",
    "https://kmong.com/seller/portfolio",
    "https://kmong.com/my_profile/portfolio",
    "https://kmong.com/@노베릭솔루션",
]

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9223")
    pg = [x for x in b.contexts[0].pages if "about:blank" not in x.url][-1]
    for url in URLS:
        try:
            pg.goto(url, wait_until="domcontentloaded", timeout=30000)
        except Exception as e:
            print(f"{url:44s} -> {str(e)[:34]}")
            continue
        pg.wait_for_timeout(3000)
        txt = pg.evaluate("document.body.innerText")
        ok = "404" not in txt[:60]
        hit = "포트폴리오" in txt
        print(f"{url:44s} -> {'OK ' if ok else '404'} 포트폴리오{'있음' if hit else '없음'}  {pg.url[:60]}")
        if ok and hit:
            links = pg.evaluate("""()=>[...document.querySelectorAll('a[href],button')]
              .map(e=>({t:(e.innerText||'').trim().slice(0,24), h:e.getAttribute('href')||''}))
              .filter(o=>o.t.includes('포트폴리오')||o.h.includes('portfolio'))""")
            for o in links[:14]:
                print("      ", o)
