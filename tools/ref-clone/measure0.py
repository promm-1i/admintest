# 스크롤 0 상태에서 레퍼런스↔결과물을 대조한다.
# sticky·패럴랙스 섹션(히어로 등)은 scrollIntoView 로 재면 값이 거짓이라 이걸 쓴다.
# 페이지를 끝까지 훑어 lazy·등장 애니메이션을 끝낸 뒤, 스크롤 0 으로 돌아와서 잰다.
#   python measure0.py <config.json>
# config 는 measure2.py 와 같은 형식 ({ref, mine, pairs:[[라벨, 레퍼런스텍스트, 결과물텍스트], ...]}).
# "sel:<CSS선택자>" 앵커도 같이 쓸 수 있다.
import json, sys, io, os
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
  cands.sort((a,b) => depth(b) - depth(a));
  const el = cands[0];
  const r = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  return {y: Math.round(r.top + window.scrollY), x: Math.round(r.left),
          w: Math.round(r.width), h: Math.round(r.height),
          fs: cs.fontSize, lh: cs.lineHeight, fw: cs.fontWeight,
          color: cs.color, tag: el.tagName};
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
            pg.evaluate(f'window.scrollTo(0,{y})'); pg.wait_for_timeout(150); y += 700
        pg.evaluate('window.scrollTo(0,0)'); pg.wait_for_timeout(2500)   # 스크롤 0 으로 복귀 후 안정화
        res[side] = grab(pg, [x[1] if side == 'ref' else x[2] for x in PAIRS])
        res[side + '_doc'] = pg.evaluate('document.documentElement.scrollHeight')
        pg.close()
    b.close()

json.dump(res, open(os.path.splitext(sys.argv[1])[0] + '.s0.json', 'w', encoding='utf-8'),
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
print(f"\n(스크롤 0 기준) 문서높이 ref {res['ref_doc']} / mine {res['mine_doc']} (Δ{res['mine_doc']-res['ref_doc']}) · 어긋남 {bad}/{len(PAIRS)}")
