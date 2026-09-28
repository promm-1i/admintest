from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    pg = b.contexts[0].pages[-1]
    print("URL:", pg.url)
    print("--- 파일 입력 칸")
    for i, h in enumerate(pg.locator("input[type=file]").all()):
        print(f"  [{i}] accept={h.get_attribute('accept')} multiple={h.get_attribute('multiple')} cls={h.get_attribute('class')}")
    print("--- 게시판 고르는 자리 (본문 영역 버튼)")
    js = """()=>[...document.querySelectorAll('button,[role=button],a')]
      .map(e=>({t:(e.innerText||'').trim().slice(0,26), c:(e.className+'').slice(0,50), tag:e.tagName}))
      .filter(o=>o.t && /게시판|포트폴리오|선택|말머리|등록|완료|올리기|작성/.test(o.t))"""
    for o in pg.evaluate(js):
        print("  ", o)
