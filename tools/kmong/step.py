"""등록 마법사를 한 단계씩 밟으며 화면 구조를 읽는다. 마지막 '등록'은 누르지 않는다.

  python step.py                 1단계 채우고 2단계 구조 보기
"""
import sys

from playwright.sync_api import sync_playwright

TITLE = "동물병원 · 동물의료센터 홈페이지 (프리미엄 디자인 A)"
CAT1, CAT2 = "IT·프로그래밍", "홈페이지 신규 제작"

FORM_JS = """()=>[...document.querySelectorAll('input,textarea,select,[contenteditable=true]')]
 .map(e=>{const b=e.getBoundingClientRect();
   return {tag:e.tagName, type:e.type||'-', name:e.name||'-', ph:e.placeholder||'-',
           accept:e.getAttribute('accept')||'-', multiple:e.hasAttribute('multiple'),
           w:Math.round(b.width), h:Math.round(b.height)}})"""

BTN_JS = """()=>[...document.querySelectorAll('button,[role=button]')]
 .map(e=>{const b=e.getBoundingClientRect();
   return {t:(e.innerText||'').trim().replace(/\\s+/g,' ').slice(0,28), w:Math.round(b.width)}})
 .filter(o=>o.t && o.w>20)"""


def close_modal(pg):
    for _ in range(3):
        dlg = pg.locator("[role=dialog]").first
        if not dlg.count() or not dlg.is_visible():
            return
        for nm in ["닫기", "확인", "취소", "다음에 하기"]:
            btn = dlg.get_by_role("button", name=nm)
            if btn.count() and btn.first.is_visible():
                btn.first.click()
                pg.wait_for_timeout(700)
                break
        else:
            pg.keyboard.press("Escape")
            pg.wait_for_timeout(700)


def pick(pg, button_name: str, option: str) -> bool:
    b = pg.get_by_role("button", name=button_name)
    if not b.count():
        return False
    b.first.click()
    pg.wait_for_timeout(900)
    for sel in ["[role=listbox]", "[role=dialog]", "[role=menu]", "ul"]:
        box = pg.locator(sel).filter(has_text=option).first
        if box.count() and box.is_visible():
            box.get_by_text(option, exact=True).first.click()
            pg.wait_for_timeout(900)
            return True
    opt = pg.get_by_text(option, exact=True)
    for i in range(opt.count()):
        if opt.nth(i).is_visible():
            opt.nth(i).click()
            pg.wait_for_timeout(900)
            return True
    return False


def dump(pg, tag: str):
    print(f"\n=== {tag}  {pg.url}")
    for o in pg.evaluate(FORM_JS):
        if o["w"] > 0 or o["type"] == "file":
            print(f"   {o['tag']:9s} type={o['type']:8s} ph={o['ph'][:26]:28s} "
                  f"accept={o['accept'][:22]:24s} multi={o['multiple']} {o['w']}x{o['h']}")
    print("   버튼:", [o["t"] for o in pg.evaluate(BTN_JS)][:22])


with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9223")
    pg = [x for x in b.contexts[0].pages if "about:blank" not in x.url][-1]
    pg.goto("https://kmong.com/seller/portfolios/new", wait_until="domcontentloaded", timeout=60000)
    pg.wait_for_timeout(2500)
    close_modal(pg)
    dump(pg, "1단계")

    t = pg.locator("input[placeholder*='제목']").first
    t.click()
    t.fill(TITLE)
    print("\n제목 넣음")
    print("1차 카테고리:", pick(pg, "1차 카테고리", CAT1))
    print("2차 카테고리:", pick(pg, "2차 카테고리", CAT2))
    pg.wait_for_timeout(800)

    nxt = pg.get_by_role("button", name="다음")
    if nxt.count() and nxt.first.is_enabled():
        nxt.first.click()
        pg.wait_for_timeout(3500)
        dump(pg, "2단계")
    else:
        print("'다음' 이 아직 안 열림 — 1단계 상태:")
        dump(pg, "1단계 재확인")
