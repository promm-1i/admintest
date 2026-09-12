# 페이지 전체 요소 기하를 TSV 로 한 번에 떠 둔다. 이후 분석은 브라우저 없이 파일에서 한다.
import sys, io, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
from playwright.sync_api import sync_playwright
# 문서가 아니라 안쪽 div 가 스크롤하는 사이트가 있다(직방). 그런 페이지는 window.scrollY 가
# 늘 0 이라 fold 아래 좌표가 전부 틀어진다. 가장 큰 스크롤 컨테이너를 찾아 그 안쪽 좌표로 잰다.
PICK = r"""
() => {
  let best=document.scrollingElement, h=document.documentElement.scrollHeight;
  for(const e of document.querySelectorAll('div,main,section,article')){
    const c=getComputedStyle(e);
    if((c.overflowY==='auto'||c.overflowY==='scroll') && e.scrollHeight>h){best=e; h=e.scrollHeight;}}
  window.__sc = best===document.scrollingElement ? null : best;
  return {inner: !!window.__sc, height: h,
          name: window.__sc ? best.tagName+'.'+String(best.className).split(' ')[0] : 'window'};
}
"""
JS = r"""
() => {
  const sc=window.__sc;
  const off = sc ? (sc.scrollTop - sc.getBoundingClientRect().top) : scrollY;
  const out=[];
  for (const e of document.querySelectorAll('body *')) {
    const cs=getComputedStyle(e);
    if(cs.display==='none'||cs.visibility==='hidden')continue;
    const r=e.getBoundingClientRect();
    if(r.width<2&&r.height<2)continue;
    let d=0,n=e; while(n.parentElement){d++;n=n.parentElement;}
    out.push([Math.round(r.top+off),Math.round(r.left),Math.round(r.width),Math.round(r.height),d,
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
        info=pg.evaluate(PICK); H=info['height']; y=0
        while y<H:
            pg.evaluate('(y)=>{ if(window.__sc) window.__sc.scrollTop=y; else window.scrollTo(0,y); }', y)
            pg.wait_for_timeout(140); y+=600
        pg.evaluate('()=>{ if(window.__sc) window.__sc.scrollTop=0; else window.scrollTo(0,0); }')
        pg.wait_for_timeout(1600)
    else:
        pg.wait_for_timeout(2500)
    rows=pg.evaluate(JS)
    H=pg.evaluate('()=> window.__sc ? window.__sc.scrollHeight : document.documentElement.scrollHeight')
    b.close()
with io.open(outp,'w',encoding='utf-8') as f:
    f.write(f'#doc\t{H}\n')
    for r in rows: f.write('\t'.join(str(x) for x in r)+'\n')
print(outp, len(rows), 'doc', H, '스크롤:', info['name'])
