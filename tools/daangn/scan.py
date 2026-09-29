"""카페 소개글과 글 목록을 긁는다. 광고로 걸릴 문구를 찾기 위한 것."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path.home() / ".daangn" / "out"
OUT.mkdir(parents=True, exist_ok=True)
CAFE = "https://cafe.daangn.com/hompeiji-jejags"

LINKS_JS = """()=>[...document.querySelectorAll('a[href*="/posts/"]')]
  .map(a=>({href:a.getAttribute('href'), txt:(a.innerText||'').split(String.fromCharCode(10)).join(' | ').slice(0,120)}))"""

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    pg = b.contexts[0].pages[-1]
    pg.goto(CAFE, wait_until="domcontentloaded")
    pg.wait_for_timeout(2500)

    # 소개글 펼치기
    for sel in ["button:has-text('더보기')", "text=더보기"]:
        try:
            loc = pg.locator(sel).first
            if loc.count() and loc.is_visible():
                loc.click()
                pg.wait_for_timeout(700)
                break
        except Exception:
            pass
    intro = pg.evaluate("""()=>{const m=document.querySelector('main')||document.body;
      return m.innerText.slice(0, 2500)}""")
    (OUT / "cafe_intro.txt").write_text(intro, encoding="utf-8")
    print("=== 카페 화면 글 (앞 2500자) → out/cafe_intro.txt")
    print(intro[:1400])

    # 글 목록 — 끝까지 스크롤
    seen, last = {}, -1
    for _ in range(40):
        for o in pg.evaluate(LINKS_JS):
            seen[o["href"]] = o["txt"]
        if len(seen) == last:
            break
        last = len(seen)
        pg.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        pg.wait_for_timeout(1200)
    (OUT / "cafe_posts.json").write_text(json.dumps(seen, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"\n=== 글 {len(seen)}개 → out/cafe_posts.json")
