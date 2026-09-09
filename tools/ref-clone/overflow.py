import sys,io
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8',errors='replace')
from playwright.sync_api import sync_playwright
JS="""(w)=>{const out=[];document.querySelectorAll('body *').forEach(e=>{
 const r=e.getBoundingClientRect();
 if(r.right>w+1||r.left<-1){out.push([e.tagName+'.'+(e.className&&e.className.baseVal===undefined?String(e.className).slice(0,40):''),
  Math.round(r.left),Math.round(r.right),Math.round(r.width),(e.textContent||'').replace(/\s+/g,' ').trim().slice(0,26)])}});
 return out.slice(0,25)}"""
slug=sys.argv[1]; W=int(sys.argv[2])
with sync_playwright() as p:
    b=p.chromium.launch(channel='chrome')
    pg=b.new_page(viewport={'width':W,'height':800})
    pg.goto(f'file:///C:/web-project/mintcl-netlify-spa/public/templates/{slug}/index.html',wait_until='load');pg.wait_for_timeout(2500)
    for r in pg.evaluate(JS,W): print(' ',r)
    b.close()
