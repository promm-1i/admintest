from PIL import Image
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path.home() / '.daangn' / 'out'
OUT.mkdir(parents=True, exist_ok=True)

JS = """()=>[...document.querySelectorAll("input[name=visibility]")].map(e=>{
  const l=e.closest('label'); return (l?l.innerText:'?').trim()+' = '+(e.checked?'선택됨':'-')})"""

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    pg = b.contexts[0].pages[-1]
    print("공개 범위:", pg.evaluate(JS))
    print("검색 허용:", pg.evaluate("""()=>{const c=[...document.querySelectorAll('input[type=checkbox]')][0];
      return c? (c.checked?'켜짐':'꺼짐') : '없음'}"""))
    pg.evaluate("window.scrollTo(0,0)")
    pg.wait_for_timeout(400)
    pg.screenshot(path=str(OUT / "n_top.png"))
    im = Image.open(str(OUT / "n_top.png"))
    im.resize((im.width // 2, im.height // 2)).save(str(OUT / "n_top_s.png"))
    print("맨 위 화면 저장", im.size)
