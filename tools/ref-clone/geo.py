# 페이지 전체 요소 기하를 TSV 로 한 번에 떠 둔다. 이후 분석은 브라우저 없이 파일에서 한다.
import sys, io, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
from playwright.sync_api import sync_playwright
JS = r"""
() => {
  const out=[];
  for (const e of document.querySelectorAll('body *')) {
    const cs=getComputedStyle(e);
    if(cs.display==='none'||cs.visibility==='hidden')continue;
    const r=e.getBoundingClientRect();
    if(r.width<2&&r.height<2)continue;
    let d=0,n=e; while(n.parentElement){d++;n=n.parentElement;}
    out.push([Math.round(r.top+scrollY),Math.round(r.left),Math.round(r.width),Math.round(r.height),d,
      e.tagName.toLowerCase(), cs.backgroundColor.replace(/\s/g,''),
      cs.borderRadius.replace(/\s/g,''), cs.padding.replace(/\s+/g,''),
      (cs.rowGap+'/'+cs.columnGap).replace(/\s/g,''),
      (cs.borderTopWidth+cs.borderTopStyle+cs.borderTopColor).replace(/\s/g,''),
      cs.boxShadow==='none'?'-':cs.boxShadow.replace(/\s+/g,''),
      parseFloat(cs.fontSize)+'/'+(parseFloat(cs.lineHeight)||0)+' '+cs.fontWeight,
      cs.fontFamily.split(',')[0].replace(/["']/g,'').trim(),
      cs.color.replace(/\s/g,''), cs.opacity,
      (e.textContent||'').replace(/\s+/g,' ').trim().slice(0,44),
      cs.backgroundImage==='none'?'-':cs.backgroundImage.replace(/\s+/g,'').slice(0,90)]);
  }
  out.sort((a,b)=>a[0]-b[0]||a[4]-b[4]||a[1]-b[1]);
  return out;
}
"""
url, outp = sys.argv[1], sys.argv[2]
with sync_playwright() as p:
    b=p.chromium.launch(channel='chrome'); pg=b.new_page(viewport={'width':1440,'height':900})
    pg.goto(url, wait_until='load'); pg.wait_for_timeout(3500)
    if '--noscroll' not in sys.argv:
        H=pg.evaluate('document.documentElement.scrollHeight'); y=0
        while y<H: pg.evaluate(f'window.scrollTo(0,{y})'); pg.wait_for_timeout(140); y+=600
        pg.evaluate('window.scrollTo(0,0)'); pg.wait_for_timeout(1600)
    else:
        pg.wait_for_timeout(2500)
    rows=pg.evaluate(JS); H=pg.evaluate('document.documentElement.scrollHeight')
    b.close()
with io.open(outp,'w',encoding='utf-8') as f:
    f.write(f'#doc\t{H}\n')
    for r in rows: f.write('\t'.join(str(x) for x in r)+'\n')
print(outp, len(rows), 'doc', H)
