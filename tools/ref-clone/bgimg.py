# 페이지 전체에서 background-image(그라디언트/이미지) 와 img/svg 슬롯을 한 번에 뽑는다.
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
from playwright.sync_api import sync_playwright
JS = r"""
() => {
  const out=[];
  for (const e of document.querySelectorAll('body *')) {
    const cs=getComputedStyle(e); if(cs.display==='none')continue;
    const r=e.getBoundingClientRect(); if(r.width<4||r.height<4)continue;
    const bi=cs.backgroundImage;
    const isImg=e.tagName==='IMG'||e.tagName==='VIDEO';
    if(bi==='none'&&!isImg)continue;
    out.push(`${Math.round(r.top+scrollY)}\t${Math.round(r.left)}\t${Math.round(r.width)}x${Math.round(r.height)}\t${e.tagName}\tr${cs.borderRadius.replace(/\s/g,'')}\t${isImg?(e.getAttribute('src')||'').slice(-46):bi.replace(/\s+/g,' ').slice(0,120)}`);
  }
  return out;
}
"""
with sync_playwright() as p:
    b=p.chromium.launch(channel='chrome'); pg=b.new_page(viewport={'width':1440,'height':900})
    pg.goto(sys.argv[1],wait_until='load'); pg.wait_for_timeout(3000)
    H=pg.evaluate('document.documentElement.scrollHeight'); y=0
    while y<H: pg.evaluate(f'window.scrollTo(0,{y})'); pg.wait_for_timeout(130); y+=600
    pg.evaluate('window.scrollTo(0,0)'); pg.wait_for_timeout(1500)
    rows=pg.evaluate(JS); b.close()
io.open(sys.argv[2],'w',encoding='utf-8').write('\n'.join(rows))
print(len(rows))
