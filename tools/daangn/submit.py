from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    pg = [x for x in b.contexts[0].pages if "posts/new" in x.url][0]
    pg.bring_to_front()
    print("올리기 전 URL:", pg.url)
    hit = None
    for name in ["등록", "완료", "올리기", "게시", "작성하기", "등록하기"]:
        loc = pg.get_by_role("button", name=name, exact=True)
        if loc.count() and loc.first.is_visible():
            hit = (name, loc.first)
            break
    if hit is None:
        print("버튼 못 찾음 — 보이는 버튼 목록")
        for h in pg.locator("button").all():
            try:
                t = (h.inner_text() or "").strip().replace("\n", " ")[:20]
                if t and h.is_visible():
                    print("  [", t, "]")
            except Exception:
                pass
    else:
        print("누름:", hit[0])
        hit[1].click()
        pg.wait_for_timeout(6000)
        print("올린 뒤 URL:", pg.url)
        print("제목:", pg.title())
