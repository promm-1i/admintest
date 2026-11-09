# 중고나라 · 번개장터 사진용 라이브 캡처: 쪽마다 맨 위(0)와 한 화면 아래(880) 두 장, 폰 세 장 → ref-sites/_biz_posts/_shots_<날짜>/<폴더>/
#   python shots.py <날짜 MMDD> <폴더> <쪽,쪽,...> <폰 쪽,쪽,쪽> [쪽|찾을 글|이름 ...]   마지막은 그 글이 화면 가운데 오게 찍는 기능 사진(f_*)
# channel='chrome' 금지 — 시스템 크롬 새 프로필이 윈도우 계정 잠금을 부른다. 내장 크로미엄이라 H.264 영상 첫 화면은 비어 찍힐 수 있으니 접촉 시트로 본다.
import sys
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8")
from playwright.sync_api import sync_playwright

B = "https://noveriq.co.kr/"
day, slug = sys.argv[1], sys.argv[2]
pages, mobile = sys.argv[3].split(","), sys.argv[4].split(",")
features = [a.split("|") for a in sys.argv[5:]]
OUT = Path(r"C:\web-project\ref-sites\_biz_posts") / ("_shots_" + day) / slug
OUT.mkdir(parents=True, exist_ok=True)
CLOSE = ("오늘 하루동안 보지 않기", "오늘은 다시 열지 않기", "오늘 하루 보지 않기", "오늘 하루 열지 않기", "24시간 동안 다시 보지 않기")
# 라벨이 체크박스인 팝업은 글자를 눌러도 안 닫힌다 — '팝업 닫기' 단추까지 누른다. 맨 '닫기' 글자는 메뉴 단추까지 눌러서 쓰지 않는다
CLOSE_BTN = "()=>{let n=0; for(const b of document.querySelectorAll('button[aria-label=\"팝업 닫기\"]')){if(b.getBoundingClientRect().width>0){b.click();n++}} return n}"
HIDE = """()=>{for(const el of document.querySelectorAll('body *')){const cs=getComputedStyle(el);
  if(cs.position==='fixed'||cs.position==='sticky'){const r=el.getBoundingClientRect(); if(r.top>150&&r.height<400) el.style.setProperty('visibility','hidden','important');}}}"""
FIND = """(t)=>{const els=[...document.querySelectorAll('body *')].filter(e=>(e.textContent||'').includes(t)&&e.getBoundingClientRect().height>0);
  const el=els.sort((a,b)=>a.textContent.length-b.textContent.length)[0]; if(!el) return null; const r=el.getBoundingClientRect(); return r.top+scrollY-360}"""


def close_popups(pg):
    for t in CLOSE:
        loc = pg.get_by_text(t, exact=True)
        for k in range(loc.count()):
            if loc.nth(k).is_visible():
                try:
                    loc.nth(k).click(timeout=1500); pg.wait_for_timeout(300)
                except Exception:
                    pass
    pg.evaluate(CLOSE_BTN)


def wheel(pg, y):
    pg.mouse.move(640, 480)
    left = int(y)
    while left > 0:   # 진짜 휠로 내려야 등장 모션이 켜진다
        pg.mouse.wheel(0, min(220, left)); left -= 220; pg.wait_for_timeout(150)
    pg.wait_for_timeout(2200)


def load(pg, page):
    pg.goto(B + slug + "/" + page + ".html", wait_until="load", timeout=90000)
    pg.wait_for_timeout(3500)
    close_popups(pg)


with sync_playwright() as p:
    br = p.chromium.launch()
    pg = br.new_page(viewport={"width": 1280, "height": 960}, device_scale_factor=1.5)
    for page in pages:
        for y in (0, 880):
            load(pg, page)
            wheel(pg, y)
            pg.evaluate(HIDE)
            pg.screenshot(path=str(OUT / ("%s_%d.jpg" % (page, y))), type="jpeg", quality=90)
        print(page, "높이", pg.evaluate("document.documentElement.scrollHeight"))
    for page, text, name in features:
        load(pg, page)
        y = pg.evaluate(FIND, text)
        print(name, "위치", y)
        wheel(pg, max(0, y or 0))
        pg.evaluate(HIDE)
        pg.screenshot(path=str(OUT / (name + ".jpg")), type="jpeg", quality=90)
    pg.close()
    pm = br.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2, is_mobile=True, has_touch=True)
    for page in mobile:
        load(pm, page); pm.wait_for_timeout(1200)
        pm.screenshot(path=str(OUT / ("m_%s.jpg" % page)), type="jpeg", quality=90)
    pm.close()
    br.close()
