"""올라간 소식의 제목만 바꾼다. 목록에서 글을 찾아 ⋮ → 소식 수정 → 제목 교체 → 완료."""
from playwright.sync_api import sync_playwright

LIST = "https://bizprofile.daangn.com/biz_accounts/4030544/manager/posts/"

# (찾을 제목 일부, 새 제목) — 골격을 다섯 개 다 다르게
JOBS = [
    ("결혼 준비 순서가 한눈에 보이는", "상담 전에 준비 순서부터 보이게"),
    ("시술 설명이 길어지지 않게", "시술 하나에 네 단계, 부위와 추천 대상까지 한 쪽에"),
    ("날짜와 장소를 먼저 묻는", "그날 그 자리에 있는 차만 보입니다"),
    ("지도와 매물 목록이 같이 움직이는", "지도와 목록이 같이 줄어드는 매물 검색"),
]

OPEN_MENU = """(title)=>{
  const el=[...document.querySelectorAll('*')].find(e=>e.children.length===0 && (e.textContent||'').includes(title));
  if(!el) return 'no-title';
  const r=el.getBoundingClientRect();
  const b=[...document.querySelectorAll("button[aria-label='더보기']")]
    .find(x=>Math.abs(x.getBoundingClientRect().y-r.y)<60);
  if(!b) return 'no-menu';
  b.click(); return 'ok';}"""

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    pg = b.contexts[0].pages[-1]
    for find, new in JOBS:
        pg.goto(LIST, wait_until="domcontentloaded")
        pg.wait_for_timeout(3000)
        try:                                   # 목록이 다 그려질 때까지 기다린다
            pg.get_by_text(find, exact=False).first.wait_for(timeout=15000)
        except Exception:
            print(f"  목록에 안 보임 — 건너뜀 {find}")
            continue
        r = pg.evaluate(OPEN_MENU, find)
        if r != "ok":
            print(f"  건너뜀 ({r}) {find}")
            continue
        pg.wait_for_timeout(1200)
        pg.get_by_text("소식 수정", exact=True).first.click()
        pg.wait_for_timeout(4000)
        ti = pg.locator("input[placeholder='소식 제목']").first
        before = ti.input_value()
        if find not in before:
            print(f"  다른 글이 열림 ({before[:24]}) — 건너뜀")
            continue
        ti.click()
        ti.fill(new)
        pg.wait_for_timeout(600)
        pg.get_by_role("button", name="완료").first.click()
        pg.wait_for_timeout(5000)
        print(f"  바꿈: {before[:26]}  →  {new}")
