"""포트폴리오 등록 화면을 찾아 칸 구조를 읽는다."""
from playwright.sync_api import sync_playwright

CANDIDATES = [
    "https://kmong.com/mypage/portfolio",
    "https://kmong.com/portfolio/new",
    "https://kmong.com/mypage/portfolio/new",
    "https://kmong.com/gig/manage/portfolio",
]

FORM_JS = """()=>{const o=[];
 for(const e of document.querySelectorAll('input,textarea,select,[contenteditable=true]')){
   const b=e.getBoundingClientRect();
   o.push({tag:e.tagName, type:e.type||'-', name:e.name||'-',
           ph:e.placeholder||'-', id:e.id||'-',
           cls:(e.className+'').slice(0,34),
           보임:b.width>0&&b.height>0});
 }
 return o}"""

BTN_JS = """()=>[...document.querySelectorAll('button,a[role=button],[class*=btn]')]
 .map(e=>({t:(e.innerText||'').trim().slice(0,22), tag:e.tagName,
           보임:e.getBoundingClientRect().width>0}))
 .filter(o=>o.t && o.보임).slice(0,40)"""

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9223")
    pg = [x for x in b.contexts[0].pages if "about:blank" not in x.url][-1]
    for url in CANDIDATES:
        try:
            pg.goto(url, wait_until="domcontentloaded", timeout=30000)
        except Exception as e:
            print(url, "->", str(e)[:40])
            continue
        pg.wait_for_timeout(3500)
        print(f"\n=== {url}\n    최종 {pg.url}\n    제목 {pg.title()}")
        txt = pg.evaluate("document.body.innerText")
        print("    본문:", txt[:220].replace("\n", " | "))
        if "포트폴리오" in txt:
            print("    --- 입력 칸")
            for o in pg.evaluate(FORM_JS)[:25]:
                print("      ", o)
            print("    --- 버튼")
            for o in pg.evaluate(BTN_JS)[:25]:
                print("      ", o["t"])
            break
