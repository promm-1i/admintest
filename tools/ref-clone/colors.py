# 레퍼런스에서 컴포넌트 안쪽 색·배경·라운드·패딩·그림자를 조상 사슬까지 뽑는다.
# 사용: colors.py <ref-url> <앵커텍스트1> <앵커텍스트2> ...
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
from playwright.sync_api import sync_playwright

URL = sys.argv[1]
ANCHORS = sys.argv[2:]

JS = """
(txt) => {
  const norm = s => (s||'').replace(/\\s+/g,' ').trim();
  let cands = [...document.querySelectorAll('body *')].filter(e =>
    norm(e.textContent).startsWith(txt) && e.getClientRects().length);
  if (!cands.length) return null;
  const dep = e => { let d=0,n=e; while(n.parentElement){d++;n=n.parentElement} return d; };
  const m = Math.min(...cands.map(e => norm(e.textContent).length));
  cands = cands.filter(e => norm(e.textContent).length === m);
  cands.sort((a,b) => dep(b) - dep(a));
  const el = cands[0];
  el.scrollIntoView({block:'center'});
  return new Promise(res => setTimeout(() => {
    const out = []; let n = el;
    for (let i = 0; i < 6 && n; i++) {
      const cs = getComputedStyle(n), r = n.getBoundingClientRect();
      out.push({
        tag: n.tagName, w: Math.round(r.width), h: Math.round(r.height),
        color: cs.color, bg: cs.backgroundColor,
        rad: cs.borderRadius === '0px' ? '' : cs.borderRadius,
        bd: cs.borderTopWidth === '0px' ? '' : cs.borderTopWidth + ' ' + cs.borderTopColor,
        pad: cs.padding === '0px' ? '' : cs.padding,
        sh: cs.boxShadow === 'none' ? '' : cs.boxShadow.slice(0, 46),
        bf: cs.backdropFilter === 'none' ? '' : cs.backdropFilter,
        op: cs.opacity === '1' ? '' : cs.opacity,
      });
      n = n.parentElement;
    }
    res(out);
  }, 800));
}
"""

with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome')
    pg = b.new_page(viewport={'width': 1440, 'height': 900})
    pg.goto(URL, wait_until='load'); pg.wait_for_timeout(4000)
    h = pg.evaluate('document.documentElement.scrollHeight'); y = 0
    while y < h:
        pg.evaluate(f'window.scrollTo(0,{y})'); pg.wait_for_timeout(160); y += 700
    pg.evaluate('window.scrollTo(0,0)'); pg.wait_for_timeout(1200)
    for a in ANCHORS:
        chain = pg.evaluate(JS, a)
        print('==', a)
        if not chain:
            print('   못찾음'); continue
        for i, c in enumerate(chain):
            bits = ' '.join(x for x in (
                f"bg{c['bg']}" if c['bg'] != 'rgba(0, 0, 0, 0)' else '',
                f"r{c['rad']}" if c['rad'] else '',
                f"bd{c['bd']}" if c['bd'] else '',
                f"p{c['pad']}" if c['pad'] else '',
                f"sh{c['sh']}" if c['sh'] else '',
                f"bf{c['bf']}" if c['bf'] else '',
                f"op{c['op']}" if c['op'] else '') if x)
            print(f"   L{i} {c['tag']:7s} {c['w']:5d}x{c['h']:<5d} col{c['color']:24s} {bits}")
    b.close()
