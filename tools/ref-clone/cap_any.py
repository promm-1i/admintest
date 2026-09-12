# 결과물 전체 페이지를 뷰포트 단위로 이어붙여 캡처한다 (스크롤 캡처 깨짐 방지).
# 사용: cap_any.py <파일경로 또는 URL> <출력 png> <폭>
import sys, io
from PIL import Image
from playwright.sync_api import sync_playwright

URL, OUT, W = sys.argv[1], sys.argv[2], int(sys.argv[3])
VH = 900 if W >= 1000 else 800

HIDE = """() => {
  // 고정/스티키 요소는 이어붙일 때 반복되므로 첫 화면 뒤로는 숨긴다
  const out = [];
  document.querySelectorAll('body *').forEach(e => {
    const p = getComputedStyle(e).position;
    if (p !== 'fixed' && p !== 'sticky') return;
    if (window.__sc && (e === window.__sc || e.contains(window.__sc))) return;  // 본문 통째로 사라진다
    out.push(e); e.dataset._h = '1';
  });
  return out.length;
}"""
TOGGLE = """(on) => {
  document.querySelectorAll('[data-_h]').forEach(e => { e.style.visibility = on ? '' : 'hidden'; });
}"""

with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome')
    pg = b.new_page(viewport={'width': W, 'height': VH}, device_scale_factor=1)
    pg.goto(URL, wait_until='load'); pg.wait_for_timeout(3500)
    pg.evaluate("""()=>{let best=null,h=document.documentElement.scrollHeight;
      for(const e of document.querySelectorAll('div,main,section,article')){
        const c=getComputedStyle(e);
        if((c.overflowY==='auto'||c.overflowY==='scroll')&&e.scrollHeight>h){best=e;h=e.scrollHeight;}}
      window.__sc=best;}""")
    h = pg.evaluate('()=> window.__sc ? window.__sc.scrollHeight : document.documentElement.scrollHeight')
    y = 0
    while y < h:
        pg.evaluate('(y)=>{ if(window.__sc) window.__sc.scrollTop=y; else window.scrollTo(0,y); }', y)
        pg.wait_for_timeout(220); y += VH
    pg.evaluate('()=>{ if(window.__sc) window.__sc.scrollTop=0; else window.scrollTo(0,0); }')
    pg.wait_for_timeout(1200)
    h = pg.evaluate('()=> window.__sc ? window.__sc.scrollHeight : document.documentElement.scrollHeight')
    pg.evaluate(HIDE)

    canvas = Image.new('RGB', (W, h), (255, 255, 255))
    y = 0
    first = True
    while y < h:
        pg.evaluate(TOGGLE, first)
        pg.evaluate('(y)=>{ if(window.__sc) window.__sc.scrollTop=y; else window.scrollTo(0,y); }', y)
        pg.wait_for_timeout(260)
        shot = Image.open(io.BytesIO(pg.screenshot()))
        top = pg.evaluate('()=> window.__sc ? window.__sc.scrollTop : window.scrollY')
        canvas.paste(shot.crop((0, 0, W, min(VH, h - top))), (0, int(top)))
        y += VH
        first = False
    b.close()

canvas.save(OUT)
print(OUT, canvas.size)
