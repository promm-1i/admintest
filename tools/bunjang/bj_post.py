# 번개장터 상품 등록 — 웨일 새 탭 하나에서 채우고 화면을 찍는다. --post 를 붙여야 '등록하기'를 누른다.
#   python bj_post.py <글 폴더(post.txt)> <사진 폴더> [--post]
# 설정은 진수님이 직접 올린 글(442244117)과 같게: 기타 · 새 상품 (미사용) · 300,000원 · 가격 제안 받기(기본 켜짐) · 배송비 포함(기본) · 직거래 불가(기본) · 수량 1 · 태그 없음
import json, sys
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8")
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "joongna"))
from cdp_tab import Tab

PRICE = "300000"
OUT = Path.home() / ".bunjang" / "out"
OUT.mkdir(parents=True, exist_ok=True)
folder, picdir = Path(sys.argv[1]), Path(sys.argv[2])
POST = "--post" in sys.argv
title, body = (x.strip() for x in (folder / "post.txt").read_text(encoding="utf-8").split("\n===\n", 1))
pics = sorted(picdir.glob("*.jpg"))[:12]
assert pics, picdir
assert len(body) <= 2500 and len(title) <= 40
assert "·" not in title, "상품명에 가운뎃점(·)은 못 쓴다 — 등록하기가 조용히 막힘"

CLICK = """(t)=>{const el=[...document.querySelectorAll('button,li,a,span,div,label')].filter(e=>e.children.length<=3&&(e.innerText||'').trim()===t&&e.getBoundingClientRect().width>0).pop();
  if(!el) return 'none'; el.scrollIntoView({block:'center'}); el.click(); return 'ok'}"""
SETVAL = """([sel,v])=>{const el=document.querySelector(sel); const proto=el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto,'value').set.call(el,v); el.dispatchEvent(new Event('input',{bubbles:true})); el.dispatchEvent(new Event('change',{bubbles:true})); el.dispatchEvent(new Event('blur',{bubbles:true})); return el.value.length}"""
# 카테고리 목록 아래 고른 경로 · 상품상태 고른 값 · 설명 글자 수를 화면 글에서 읽는다
STATE = """(()=>{const t=document.body.innerText; const q=s=>document.querySelector(s);
  const cat=(t.match(/\\n재능\\n([^\\n]*)\\n상품상태/)||[])[1]||null; const cond=(t.match(/상품상태\\n([^\\n]*)\\n/)||[])[1]||null;
  const ship=[...document.querySelectorAll('button[aria-haspopup=listbox]')].map(b=>b.innerText.trim());
  const radio=[...document.querySelectorAll('input[type=radio]')].find(r=>r.checked);
  return {title:q('input[name="common.name"]').value, cat, cond, desc:(t.match(/(\\d+)\\/2500/)||[])[1],
    price:q('input[placeholder="가격을 입력해 주세요"]').value, ship, inPerson:radio?(radio.closest('label')||radio.parentElement).innerText.trim():null,
    offer:[...document.querySelectorAll('input[type=checkbox]')].filter(c=>c.checked).map(c=>c.value), qty:[...document.querySelectorAll('input[type=text]')].pop().value,
    pics:(t.match(/\\((\\d+)\\/12\\)/)||[])[1]}})()"""


def call(t, fn, arg):
    return t.js("(%s)(%s)" % (fn, json.dumps(arg, ensure_ascii=False)))


with Tab(bg=False) as t:
    t.cmd("Emulation.setDeviceMetricsOverride", {"width": 1280, "height": 1000, "deviceScaleFactor": 1, "mobile": False})
    t.go("https://m.bunjang.co.kr/products/new", 6)
    for _ in range(20):   # 등록 화면이 늦게 그려지는 때가 있다(10-24) — 사진 칸이 생길 때까지
        if t.js("!!document.querySelector('#media-input')"):
            break
        t.wait(1)
    assert "/products/new" in t.js("location.href"), "등록 화면이 아님(로그인 풀림?) " + t.js("location.href")
    t.cmd("DOM.enable")
    root = t.cmd("DOM.getDocument", {"depth": 1})["root"]["nodeId"]
    node = t.cmd("DOM.querySelector", {"nodeId": root, "selector": "#media-input"})["nodeId"]
    t.cmd("DOM.setFileInputFiles", {"nodeId": node, "files": [str(p) for p in pics]})
    for _ in range(90):
        t.wait(1)
        cnt = t.js("(document.body.innerText.match(/\\((\\d+)\\/12\\)/)||[])[1]")
        if cnt and int(cnt) >= len(pics):
            break
    print("사진", cnt, "/", len(pics)); t.wait(1)
    print("상품명", call(t, SETVAL, ['input[name="common.name"]', title])); t.wait(0.8)
    print("카테고리", call(t, CLICK, "기타")); t.wait(1.5)
    print("상품상태 열기", call(t, CLICK, "상품 상태를 선택해 주세요")); t.wait(1)
    print("  새 상품", call(t, CLICK, "새 상품 (미사용)")); t.wait(1)
    print("설명", call(t, SETVAL, ["textarea", body])); t.wait(0.8)
    t.js("(()=>{const p=document.querySelector('input[placeholder=\"가격을 입력해 주세요\"]'); p.scrollIntoView({block:'center'}); p.focus()})()")
    t.cmd("Input.insertText", {"text": PRICE}); t.wait(1)
    state = t.js(STATE)
    print("상태", json.dumps(state, ensure_ascii=False))
    ok = (state["title"] == title and state["cat"] == "기타" and state["cond"] == "새 상품 (미사용)" and state["desc"] == str(len(body))
          and state["price"] == "300,000" and "배송비 포함" in state["ship"] and state["inPerson"] == "불가" and state["qty"] == "1"
          and state["pics"] == str(len(pics)))
    print("설정 일치", ok)
    h = t.js("document.documentElement.scrollHeight")
    t.cmd("Emulation.setDeviceMetricsOverride", {"width": 1280, "height": min(h, 3600), "deviceScaleFactor": 1, "mobile": False}); t.wait(1.5)
    t.shot(str(OUT / "bj_fill.png"))
    print("화면", OUT / "bj_fill.png")
    if POST:
        assert ok, "설정이 다르면 올리지 않는다"
        before = t.js("document.body.innerText")
        print("등록하기", t.mclick_text("등록하기"))
        for k in range(16):   # 주소가 바뀌면 올라간 것, 안 바뀌면 새로 뜬 안내 글을 찍는다
            t.wait(0.7)
            if "/products/new" not in t.js("location.href"):
                break
            if k in (1, 4, 10):
                now = t.js("document.body.innerText")
                print("  새 글", [l for l in now.split("\n") if l.strip() and l not in before][:8])
                print("  알림창", t.js("[...document.querySelectorAll('[role=alert],[role=dialog],[role=alertdialog],[class*=toast],[class*=Toast],[class*=modal],[class*=Modal]')].filter(e=>e.getBoundingClientRect().width>0).map(e=>(e.innerText||'').trim().slice(0,120))"))
        print("올린 뒤 주소", t.js("location.href"))
        t.cmd("Emulation.setDeviceMetricsOverride", {"width": 1280, "height": 1000, "deviceScaleFactor": 1, "mobile": False}); t.wait(1)
        t.shot(str(OUT / "bj_after.png"))
