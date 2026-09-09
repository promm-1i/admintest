# 렌더 칸보다 원본이 작아 늘려 쓰는 사진을 찾는다(1440 기준, DPR 1).
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(channel='chrome')
    for slug in sys.argv[1:]:
        pg=b.new_page(viewport={'width':1440,'height':900})
        pg.goto(f'file:///C:/web-project/mintcl-netlify-spa/public/templates/{slug}/index.html', wait_until='load')
        pg.wait_for_timeout(2000)
        H=pg.evaluate('document.documentElement.scrollHeight'); y=0
        while y<H: pg.evaluate(f'window.scrollTo(0,{y})'); pg.wait_for_timeout(110); y+=700
        pg.evaluate('window.scrollTo(0,0)'); pg.wait_for_timeout(1200)
        rows=pg.evaluate("""() => [...document.images].map(i=>{
          const r=i.getBoundingClientRect();
          return {src:(i.getAttribute('src')||'').split('/').pop(),
                  nw:i.naturalWidth, nh:i.naturalHeight,
                  rw:Math.round(r.width), rh:Math.round(r.height)};
        }).filter(o=>o.rw>2&&o.rh>2)""")
        seen=set(); bad=[]
        for o in rows:
            k=(o['src'],o['rw'],o['rh'])
            if k in seen: continue
            seen.add(k)
            if o['nw']==0: bad.append((o,'로드실패')); continue
            if o['nw'] < o['rw']-1 or o['nh'] < o['rh']-1:
                bad.append((o, f"확대 {o['rw']/max(o['nw'],1):.2f}×/{o['rh']/max(o['nh'],1):.2f}×"))
        print(f'## {slug} — 이미지 {len(seen)}종')
        for o,why in bad:
            print(f"   ⚠ {o['src']:<16} 원본 {o['nw']}×{o['nh']} → 렌더 {o['rw']}×{o['rh']}  {why}")
        if not bad: print('   전부 원본 ≥ 렌더 칸')
        pg.close()
    b.close()
