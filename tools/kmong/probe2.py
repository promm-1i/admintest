"""2단계의 남은 칸(업종·설명·고객사·키워드) 구조와 선택지를 읽는다."""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).parent))
from fill import CAT1, CAT2, clean_title, close_dialog, pick_option  # noqa: E402

TITLE = clean_title("동물병원 · 동물의료센터 홈페이지 (프리미엄 디자인 A)")

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9223")
    pg = [x for x in b.contexts[0].pages if "about:blank" not in x.url][-1]
    if "이미지 등록" not in pg.evaluate("document.body.innerText"):
        pg.goto("https://kmong.com/seller/portfolios/new", wait_until="domcontentloaded", timeout=60000)
        pg.wait_for_timeout(2500)
        close_dialog(pg)
        t = pg.locator("input[placeholder*='제목']").first
        t.click()
        t.fill(TITLE)
        pg.wait_for_timeout(400)
        pick_option(pg, "1차 카테고리", CAT1)
        pick_option(pg, "2차 카테고리", CAT2)
        pg.get_by_role("button", name="다음").first.click()
        pg.wait_for_timeout(3500)
    print("화면:", pg.url)

    print("\n--- 업종 고르기")
    b1 = pg.get_by_role("button", name="업종을 선택해 주세요")
    if not b1.count():
        b1 = pg.get_by_text("업종을 선택해 주세요", exact=True)
    print("   단추 수:", b1.count())
    if b1.count():
        b1.first.click()
        pg.wait_for_timeout(1200)
        opts = pg.evaluate("""()=>{const o=[];
          for(const e of document.querySelectorAll('[role=listbox] *,[role=dialog] *,[role=menu] *,ul li')){
            if(e.children.length)continue;
            const t=(e.textContent||'').trim();
            const b=e.getBoundingClientRect();
            if(t&&t.length<24&&b.width>0)o.push(t)}
          return [...new Set(o)]}""")
        print("   선택지:", opts[:40])
        pg.keyboard.press("Escape")
        pg.wait_for_timeout(600)

    print("\n--- 글자 칸")
    for o in pg.evaluate("""()=>[...document.querySelectorAll('input,textarea')]
      .map(e=>{const b=e.getBoundingClientRect();
        return {tag:e.tagName,type:e.type||'-',ph:e.placeholder||'-',w:Math.round(b.width)}})
      .filter(o=>o.w>0&&o.type!=='file')"""):
        print("   ", o)

    print("\n--- 체크박스 옆 글")
    print(pg.evaluate("""()=>[...document.querySelectorAll('input[type=checkbox]')]
      .map(e=>{let n=e, t='';
        for(let i=0;i<4&&n;i++,n=n.parentElement){t=(n.innerText||'').trim(); if(t)break}
        return t.slice(0,40)})"""))
