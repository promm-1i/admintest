"""포트폴리오 등록 화면의 칸·선택지를 읽는다."""
import json
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

FORM_JS = """()=>{const o=[];
 for(const e of document.querySelectorAll('input,textarea,select,[contenteditable=true]')){
   const b=e.getBoundingClientRect();
   o.push({tag:e.tagName, type:e.type||'-', name:e.name||'-', ph:e.placeholder||'-',
           id:e.id||'-', cls:(e.className+'').slice(0,40),
           accept:e.getAttribute('accept')||'-', multiple:e.hasAttribute('multiple'),
           w:Math.round(b.width), h:Math.round(b.height)});
 }
 return o}"""

BTN_JS = """()=>[...document.querySelectorAll('button,[role=button]')]
 .map(e=>{const b=e.getBoundingClientRect();
   return {t:(e.innerText||'').trim().replace(/\\s+/g,' ').slice(0,26),
           w:Math.round(b.width), h:Math.round(b.height), dis:!!e.disabled}})
 .filter(o=>o.t && o.w>20)"""

LABEL_JS = """()=>[...document.querySelectorAll('label,h2,h3,legend,p')]
 .map(e=>(e.innerText||'').trim().replace(/\\s+/g,' '))
 .filter(t=>t.length>1&&t.length<40)"""

out = Path("C:/_tmp/claude/kmong_form.json")
with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9223")
    pg = [x for x in b.contexts[0].pages if "about:blank" not in x.url][-1]
    pg.goto("https://kmong.com/seller/portfolios/new", wait_until="domcontentloaded", timeout=60000)
    pg.wait_for_timeout(2500)
    # 안내 모달이 떠 있으면 닫는다
    for _ in range(3):
        dlg = pg.locator("[role=dialog]").first
        if not dlg.count() or not dlg.is_visible():
            break
        closed = False
        for nm in ["닫기", "확인", "취소", "다음에 하기"]:
            btn = dlg.get_by_role("button", name=nm)
            if btn.count() and btn.first.is_visible():
                btn.first.click()
                closed = True
                break
        if not closed:
            pg.keyboard.press("Escape")
        pg.wait_for_timeout(900)
    pg.wait_for_timeout(4000)
    print("등록 화면:", pg.url)
    form = pg.evaluate(FORM_JS)
    btns = pg.evaluate(BTN_JS)
    labels = pg.evaluate(LABEL_JS)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps({"url": pg.url, "form": form, "btns": btns, "labels": labels},
                              ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"\n입력 칸 {len(form)}개")
    for o in form[:30]:
        print(f"   {o['tag']:9s} type={o['type']:9s} name={o['name'][:16]:16s} ph={o['ph'][:24]:24s} "
              f"accept={o['accept'][:18]:18s} multi={o['multiple']} {o['w']}x{o['h']}")
    print(f"\n버튼 {len(btns)}개:", [o["t"] for o in btns][:28])
    print("\n적어 둠:", out)
