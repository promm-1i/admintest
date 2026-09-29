"""사진 칸에 끌어다 놓기(drop)로 파일을 넣을 수 있는지 시험한다."""
import base64
from pathlib import Path
from playwright.sync_api import sync_playwright

PIC = sorted((Path.home() / "Desktop" / "개발" / "프리미엄_상세페이지_캡처" /
              "HOSP-1005_여울성형외과").glob("01_*.jpg"))[0]

DROP_JS = """async ([b64, name, sel])=>{
  const res = await fetch('data:image/jpeg;base64,' + b64);
  const blob = await res.blob();
  const file = new File([blob], name, {type:'image/jpeg'});
  const dt = new DataTransfer();
  dt.items.add(file);
  const el = document.querySelector(sel) || document.body;
  for (const type of ['dragenter','dragover','drop']) {
    const ev = new DragEvent(type, {bubbles:true, cancelable:true, dataTransfer:dt});
    el.dispatchEvent(ev);
  }
  return el.tagName + '.' + (el.className+'').slice(0,30);
}"""

COUNT_JS = """()=>{const e=document.querySelector('span.css-1q94qra');return e?e.textContent.trim():'?'}"""

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    pg = b.contexts[0].pages[-1]
    b64 = base64.b64encode(PIC.read_bytes()).decode()
    print("전:", pg.evaluate(COUNT_JS))
    for sel in ["div.css-1x476uy", "button.css-mw5fyl", "[contenteditable=true]"]:
        try:
            where = pg.evaluate(DROP_JS, [b64, PIC.name, sel])
            pg.wait_for_timeout(3500)
            print(f"  {sel:26s} → {where} | 지금 {pg.evaluate(COUNT_JS)}")
            if pg.evaluate(COUNT_JS) != "0":
                print("  >>> 이 자리에 떨구면 들어간다")
                break
        except Exception as e:
            print(f"  {sel:26s} 실패 {str(e)[:50]}")
