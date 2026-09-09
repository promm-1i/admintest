# 앵커마다 배경·라운드·테두리·패딩·그림자·backdrop-filter·투명도를 레퍼런스↔결과물로 대조한다.
# 클론 지시문이 요구하는 "컴포넌트 7개 열"을 measure2.py 와 같은 config 로 그대로 뽑는다.
#   python boxes.py <config.json> [--up N]
# --up N : 앵커 자신이 아니라 N 단계 위 조상(카드 몸통)을 잰다. 기본 0.
import json, sys, io, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
from playwright.sync_api import sync_playwright

CONF = json.load(open(sys.argv[1], encoding='utf-8'))
UP = int(sys.argv[sys.argv.index('--up') + 1]) if '--up' in sys.argv else 0
REF, MINE, PAIRS = CONF['ref'], CONF['mine'], CONF['pairs']

CORE = """
  const pick = e => {
    let n = e; for (let i = 0; i < UP && n.parentElement; i++) n = n.parentElement;
    const cs = getComputedStyle(n);
    return {bg: cs.backgroundColor, rad: cs.borderRadius,
            bor: cs.borderTopWidth === '0px' ? 'none' : cs.borderTopWidth + ' ' + cs.borderTopColor,
            pad: cs.padding, sh: cs.boxShadow === 'none' ? '-' : cs.boxShadow,
            bf: cs.backdropFilter === 'none' ? '-' : cs.backdropFilter, op: cs.opacity};
  };
"""

JS = """
(txt) => {
  const UP = %d;
  const norm = s => (s||'').replace(/\s+/g,' ').trim();
  %s
  const vis = e => { const cs = getComputedStyle(e);
    return cs.display !== 'none' && cs.visibility !== 'hidden' && e.getClientRects().length; };
  let cands = txt.startsWith('sel:')
    ? [...document.querySelectorAll(txt.slice(4))].filter(vis)
    : [...document.querySelectorAll('body *')].filter(e => norm(e.textContent).startsWith(txt) && vis(e));
  if (!cands.length) return null;
  const dep = e => { let d = 0, n = e; while (n.parentElement) { d++; n = n.parentElement; } return d; };
  const m = Math.min(...cands.map(e => norm(e.textContent).length));
  if (!txt.startsWith('sel:')) cands = cands.filter(e => norm(e.textContent).length === m);
  cands.sort((a, b) => dep(b) - dep(a));
  return pick(cands[0]);
}
""" % (UP, CORE)

with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome')
    res = {}
    for side, url in (('ref', REF), ('mine', MINE)):
        pg = b.new_page(viewport={'width': 1440, 'height': 900})
        pg.goto(url, wait_until='load'); pg.wait_for_timeout(4000)
        h = pg.evaluate('document.documentElement.scrollHeight'); y = 0
        while y < h:
            pg.evaluate(f'window.scrollTo(0,{y})'); pg.wait_for_timeout(150); y += 700
        pg.evaluate('window.scrollTo(0,0)'); pg.wait_for_timeout(1200)
        out = {}
        for x in PAIRS:
            t = x[1] if side == 'ref' else x[2]
            try: out[t] = pg.evaluate(JS, t)
            except Exception: out[t] = None
        res[side] = out
        pg.close()
    b.close()

KEYS = [('bg', '배경'), ('rad', '라운드'), ('bor', '테두리'), ('pad', '패딩'),
        ('sh', '그림자'), ('bf', 'backdrop'), ('op', '투명도')]
print(f'(조상 {UP}단계 위)' if UP else '(앵커 자신)')
print('| 항목 | ' + ' | '.join(k[1] for k in KEYS) + ' |')
print('|---' * (len(KEYS) + 1) + '|')
bad = 0
for lab, rt, mt in PAIRS:
    a, c = res['ref'].get(rt), res['mine'].get(mt)
    if not a or not c:
        print(f'| {lab} ⚠못찾음 |' + ' |' * len(KEYS)); bad += 1; continue
    cells, dif = [], False
    for k, _ in KEYS:
        if a[k] == c[k]:
            cells.append(a[k][:26])
        else:
            cells.append(f'**{a[k][:22]} → {c[k][:22]}**'); dif = True
    if dif: bad += 1
    print(f"| {lab}{' ⚠' if dif else ''} | " + ' | '.join(cells) + ' |')
print(f'\n어긋난 컴포넌트 {bad}/{len(PAIRS)}')
