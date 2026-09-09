# 레퍼런스와 결과물을 같은 방식으로 요소별 실측한다.
# 핵심: 앵커마다 scrollIntoView 후 대기 → 등장/패럴랙스 애니메이션이 끝난 최종 위치를 잰다.
# 앵커는 텍스트 시작 문자열, 또는 "sel:<CSS 선택자>" (같은 글자가 여러 곳에 있을 때).
import json, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
from playwright.sync_api import sync_playwright

CONF = json.load(open(sys.argv[1], encoding='utf-8'))
REF, MINE, PAIRS = CONF['ref'], CONF['mine'], CONF['pairs']

HEAD = """
(txt) => {
  const norm = s => (s||'').replace(/\\s+/g,' ').trim();
"""

VISIBLE = """
    const cs = getComputedStyle(e);
    if (cs.display === 'none' || cs.visibility === 'hidden') return false;
    if (!e.getClientRects().length) return false;
    return true;
  });
"""

PICK = """
  if (!cands.length) return null;
  const depth = e => { let d=0, n=e; while(n.parentElement){d++;n=n.parentElement;} return d; };
  const minLen = Math.min(...cands.map(e => norm(e.textContent).length));
  cands = cands.filter(e => norm(e.textContent).length === minLen);
  // 같은 글자를 담은 래퍼가 여러 겹이면 가장 안쪽(=실제 텍스트 노드)을 고른다
  cands.sort((a,b) => depth(b) - depth(a));
  const el = cands[0];
  el.scrollIntoView({block:'center'});
  return new Promise(res => setTimeout(() => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    res({y: Math.round(r.top + window.scrollY), x: Math.round(r.left),
         w: Math.round(r.width), h: Math.round(r.height),
         fs: cs.fontSize, lh: cs.lineHeight, fw: cs.fontWeight,
         color: cs.color, tag: el.tagName});
  }, 900));
}
"""

BY_TEXT = """
  const all = [...document.querySelectorAll('body *')];
  let cands = all.filter(e => {
    if (!norm(e.textContent).startsWith(txt)) return false;
"""

BY_SEL = """
  let cands = [...document.querySelectorAll(txt)].filter(e => {
"""

JS = HEAD + BY_TEXT + VISIBLE + PICK
SEL_JS = HEAD + BY_SEL + VISIBLE + PICK


def grab(pg, texts):
    out = {}
    for t in texts:
        try:
            out[t] = pg.evaluate(SEL_JS, t[4:]) if t.startswith('sel:') else pg.evaluate(JS, t)
        except Exception:
            out[t] = None
    return out


with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome')
    res = {}
    for side, url in (('ref', REF), ('mine', MINE)):
        pg = b.new_page(viewport={'width': 1440, 'height': 900})
        pg.goto(url, wait_until='load'); pg.wait_for_timeout(4000)
        h = pg.evaluate('document.documentElement.scrollHeight'); y = 0
        while y < h:
            pg.evaluate(f'window.scrollTo(0,{y})'); pg.wait_for_timeout(180); y += 700
        pg.evaluate('window.scrollTo(0,0)'); pg.wait_for_timeout(1500)
        res[side] = grab(pg, [x[1] if side == 'ref' else x[2] for x in PAIRS])
        res[side + '_doc'] = pg.evaluate('document.documentElement.scrollHeight')
        pg.close()
    b.close()

import os
json.dump(res, open(os.path.splitext(sys.argv[1])[0] + '.res.json', 'w', encoding='utf-8'),
          ensure_ascii=False, indent=0)

print('| 항목 | ref y·x w×h | mine y·x w×h | Δy | Δx | Δw | Δh | 글꼴 | 글자색 |')
print('|---|---|---|---|---|---|---|---|---|')
bad = 0
for lab, rt, mt in PAIRS:
    a, c = res['ref'].get(rt), res['mine'].get(mt)
    if not a or not c:
        print(f'| {lab} ⚠못찾음 | {"-" if not a else "ok"} | {"-" if not c else "ok"} | | | | | | |')
        bad += 1
        continue
    dy, dx, dw, dh = c['y']-a['y'], c['x']-a['x'], c['w']-a['w'], c['h']-a['h']
    fa = f"{a['fs']}/{a['lh']} {a['fw']}"
    fc = f"{c['fs']}/{c['lh']} {c['fw']}"
    fnt = '' if fa == fc else f'{fa} → {fc}'
    col = '' if a['color'] == c['color'] else f"{a['color']} → {c['color']}"
    flag = ' ⚠' if abs(dy) > 4 or abs(dx) > 4 or abs(dw) > 6 or fnt or col else ''
    if flag:
        bad += 1
    print(f"| {lab}{flag} | {a['y']}·{a['x']} {a['w']}×{a['h']} | {c['y']}·{c['x']} {c['w']}×{c['h']} | {dy} | {dx} | {dw} | {dh} | {fnt} | {col} |")
print(f"\n문서높이 ref {res['ref_doc']} / mine {res['mine_doc']} (Δ{res['mine_doc']-res['ref_doc']}) · 어긋남 {bad}/{len(PAIRS)}")
