# 중고나라 상품 등록 — 웨일(원격 디버깅 9222) 새 탭 하나에서 채우고 화면을 찍는다. --post 를 붙여야 '판매하기'를 누른다.
#   python jn_post.py <글 폴더(post.txt)> <사진 폴더> [--post]
# post.txt 는 첫 줄 제목, '===' 줄 뒤가 본문. 사진은 폴더 앞 10장(이름순) — 글마다 골라 둔 pics 폴더를 넘긴다.
# 2026-10-22 사용자 결정: 가격 30만원(본문에 실제 가격), 본문 첫 줄 시안 주소.
# 함정: 택배거래는 기본 체크(누르면 꺼짐) · AI 작성 스위치 기본 켜짐 · 가격은 오른쪽 창 '입력 완료'를 진짜 마우스로 ·
#       올린 직후 '판매 정산 계좌 등록' 창이 뜬다 — 계좌는 절대 넣지 않고 탭째 닫는다(사용자 몫).
# 설정은 진수님이 직접 올린 글과 같게: 티켓/쿠폰 > 기타 티켓/쿠폰/이용권 · 새상품 · 구성품 없음 · 택배거래 · 배송비 포함(무료배송)
import json, sys
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8")
from cdp_tab import Tab

PRICE = "300000"
OUT = Path.home() / ".joongna" / "out"
OUT.mkdir(parents=True, exist_ok=True)
folder, picdir = Path(sys.argv[1]), Path(sys.argv[2])
POST = "--post" in sys.argv
raw = (folder / "post.txt").read_text(encoding="utf-8")
title, body = (x.strip() for x in raw.split("\n===\n", 1))
pics = sorted(picdir.glob("*.jpg"))[:10]
assert pics, picdir
assert len(body) <= 5000

CLICK = """(t)=>{const el=[...document.querySelectorAll('button,li,a,span,div,label')].filter(e=>e.children.length<=3&&(e.innerText||'').trim()===t&&e.getBoundingClientRect().width>0).pop();
  if(!el) return 'none'; el.scrollIntoView({block:'center'}); el.click(); return 'ok'}"""
CLICK_START = """(t)=>{const el=[...document.querySelectorAll('label')].filter(e=>(e.innerText||'').trim().startsWith(t)&&e.getBoundingClientRect().width>0).pop();
  if(!el) return 'none'; el.scrollIntoView({block:'center'}); el.click(); return 'ok'}"""
SETVAL = """([sel,v])=>{const el=document.querySelector(sel); const proto=el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto,'value').set.call(el,v); el.dispatchEvent(new Event('input',{bubbles:true})); el.dispatchEvent(new Event('change',{bubbles:true})); return el.value.length}"""


def call(t, fn, arg):
    return t.js("(%s)(%s)" % (fn, json.dumps(arg, ensure_ascii=False)))


with Tab(bg=False) as t:
    t.cmd("Emulation.setDeviceMetricsOverride", {"width": 1280, "height": 1000, "deviceScaleFactor": 1, "mobile": False})
    t.go("https://web.joongna.com/product/form?type=regist", 8)
    # 사진 — 한꺼번에 넣고 순서를 확인한다
    t.cmd("DOM.enable")
    root = t.cmd("DOM.getDocument", {"depth": 1})["root"]["nodeId"]
    node = t.cmd("DOM.querySelector", {"nodeId": root, "selector": "input[type=file]"})["nodeId"]
    t.cmd("DOM.setFileInputFiles", {"nodeId": node, "files": [str(p) for p in pics]})
    for _ in range(60):
        t.wait(1)
        cnt = t.js("(document.body.innerText.match(/(\\d+)\\/10/)||[])[1]")
        if cnt and int(cnt) >= len(pics):
            break
    print("사진", cnt, "/", len(pics))
    for _ in range(20):   # 사진 올린 직후엔 칸이 잠깐 다시 그려진다
        t.wait(1)
        if t.js("!!document.querySelector('#product-name')"):
            break
    t.wait(1)
    # AI 작성 스위치는 끈다(기본 켜짐) — 글이 바뀌지 않게
    print("AI 끔", t.js("(()=>{const c=document.querySelector('input[aria-labelledby^=ai-mode]'); if(c&&c.checked) document.querySelector('label[for=\"'+c.id+'\"]').click(); return c?c.checked:null})()"))
    print("상품명", call(t, SETVAL, ["#product-name", title]))
    print("카테고리", call(t, CLICK, "티켓/쿠폰")); t.wait(1.2)
    print("  하위", call(t, CLICK, "기타 티켓/쿠폰/이용권")); t.wait(1.5)
    # 가격은 오른쪽 창에서 입력하고 '입력 완료'
    t.js("document.querySelector('#productPrice').scrollIntoView({block:'center'}); document.querySelector('#productPrice').click()"); t.wait(1.5)
    t.js("document.querySelector('input[placeholder=\"가격을 입력해 주세요.\"]').focus()")
    t.cmd("Input.insertText", {"text": PRICE}); t.wait(0.8)
    print("가격 창", t.mclick_text("입력 완료")); t.wait(1.2)
    print("가격 창 닫힘", not t.js("!!document.querySelector('input[placeholder=\"가격을 입력해 주세요.\"]')&&document.querySelector('input[placeholder=\"가격을 입력해 주세요.\"]').getBoundingClientRect().width>0"))
    print("가격", t.js("document.querySelector('#productPrice').value"))
    print("설명", call(t, SETVAL, ["#product-description", body]))
    print("새상품", t.js("(()=>{const r=document.querySelector('#new'); r.closest('label')?.click()||r.click(); return r.checked})()"))
    print("구성품 없음", t.js("(()=>{const r=document.querySelector('#none'); r.closest('label')?.click()||r.click(); return r.checked})()"))
    t.wait(1)
    # 택배거래는 기본으로 체크돼 있다 — 누르면 꺼진다. 꺼져 있을 때만 켠다
    print("택배거래", t.js("""(()=>{const c=[...document.querySelectorAll('label')].find(l=>(l.innerText||'').trim()==='택배거래')?.querySelector('input'); if(c&&!c.checked) c.closest('label').click(); return c?c.checked:null})()""")); t.wait(1)
    print("배송비 포함", call(t, CLICK_START, "배송비 포함")); t.wait(1)
    state = t.js("""(()=>{const q=s=>document.querySelector(s);
      const agree=[...document.querySelectorAll('input[type=checkbox]')].find(c=>(c.closest('label')||c.parentElement).innerText.includes('판매 정보가 실제 상품과'));
      return {title:q('#product-name').value, price:q('#productPrice').value, desc:q('#product-description').value.length,
        isNew:q('#new').checked, none:q('#none').checked,
        checks:[...document.querySelectorAll('input[type=checkbox],input[type=radio]')].filter(c=>c.checked).map(c=>(c.closest('label')||c.parentElement).innerText.replace(/\\s+/g,' ').trim().slice(0,30)),
        agree: agree?agree.checked:'없음', cat:(document.body.innerText.match(/카테고리\\n[\\s\\S]{0,40}/)||[''])[0]}})()""")
    print("상태", json.dumps(state, ensure_ascii=False))
    # 썸네일 순서(이름이 없으니 크기로)
    print("미리보기 수", t.js("[...document.querySelectorAll('img')].filter(i=>i.src.startsWith('blob:')||i.src.startsWith('data:')).length"))
    h = t.js("document.documentElement.scrollHeight")
    t.cmd("Emulation.setDeviceMetricsOverride", {"width": 1280, "height": min(h, 3600), "deviceScaleFactor": 1, "mobile": False}); t.wait(1.5)
    t.shot(str(OUT / "jn_fill.png"))
    print("화면", OUT / "jn_fill.png")
    if POST:
        if state["agree"] is False:
            print("동의 칸", call(t, CLICK_START, "판매 정보가 실제 상품과")); t.wait(0.8)
        print("판매하기", t.mclick_text("판매하기")); t.wait(8)
        print("올린 뒤 주소", t.js("location.href"))
        t.shot(str(OUT / "jn_after.png"))
