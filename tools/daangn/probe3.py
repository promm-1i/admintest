from playwright.sync_api import sync_playwright

JS = """()=>{const o=[];
 for(const e of document.querySelectorAll('[role=dialog],[role=listbox],[role=menu],[data-state=open],dialog')){
   const b=e.getBoundingClientRect(); if(b.height<20)continue;
   o.push({tag:e.tagName, role:e.getAttribute('role'), cls:(e.className+'').slice(0,50),
           txt:(e.innerText||'').split(String.fromCharCode(10)).join(' | ').slice(0,220)})}
 return o}"""

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    pg = b.contexts[0].pages[-1]
    if "/posts/new" not in pg.url:
        pg.goto("https://cafe.daangn.com/hompeiji-jejags/posts/new", wait_until="domcontentloaded")
        pg.wait_for_timeout(2500)
    btn = pg.locator("button.flex.items-center.justify-between").first
    print("버튼 글자:", btn.inner_text().strip())
    btn.click()
    pg.wait_for_timeout(1200)
    for o in pg.evaluate(JS):
        print(" ", o)
    print("--- 보이는 '포트폴리오' 요소")
    for h in pg.get_by_text("포트폴리오").all():
        try:
            if h.is_visible():
                print("  ", h.evaluate("e=>e.tagName+' '+(e.className+'').slice(0,46)"),
                      "|", (h.inner_text() or "").strip()[:30])
        except Exception:
            pass
