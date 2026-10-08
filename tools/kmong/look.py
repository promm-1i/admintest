"""붙어서 지금 화면 상태만 본다. 인자로 주소를 주면 거기로 간다."""
import sys

from playwright.sync_api import sync_playwright


def page(b):
    pages = [x for x in b.contexts[0].pages if "about:blank" not in x.url]
    return pages[-1] if pages else b.contexts[0].pages[-1]


with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9223")
    pg = page(b)
    if len(sys.argv) > 1:
        pg.goto(sys.argv[1], wait_until="domcontentloaded")
        pg.wait_for_timeout(3000)
    print("URL :", pg.url)
    print("제목:", pg.title())
    logged = pg.evaluate("""()=>{const t=document.body.innerText;
      return !/로그인하기|회원가입/.test(t.slice(0,1200))}""")
    print("로그인 돼 보임:", logged)
    txt = pg.evaluate("document.body.innerText")
    print("--- 본문 앞부분")
    print(txt[:700])
