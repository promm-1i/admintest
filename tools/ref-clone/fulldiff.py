# 페이지의 모든 텍스트 런과 모든 박스를 실측해 ref/mine 을 y 순서로 섞어 출력한다.
# 앵커를 손으로 고르지 않으므로 "빠뜨린 요소"가 생기지 않는다.
import json, sys, io, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
from playwright.sync_api import sync_playwright

TEXT_JS = r"""
() => {
  const out = [];
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while (n = w.nextNode()) {
    const t = (n.nodeValue || '').replace(/\s+/g, ' ').trim();
    if (!t) continue;
    const p = n.parentElement; if (!p) continue;
    if (p.closest('script,style,noscript')) continue;
    const cs = getComputedStyle(p);
    if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) continue;
    let hid = false;
    for (let e = p; e; e = e.parentElement) {
      const s = getComputedStyle(e);
      if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity === 0) { hid = true; break; }
    }
    if (hid) continue;
    const rg = document.createRange(); rg.selectNodeContents(n);
    const r = rg.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;
    out.push({ t: t.slice(0, 46), y: Math.round(r.top + scrollY), x: Math.round(r.left),
      w: Math.round(r.width), h: Math.round(r.height),
      f: `${parseFloat(cs.fontSize)}/${parseFloat(cs.lineHeight)||0} ${cs.fontWeight}`,
      ff: cs.fontFamily.split(',')[0].replace(/["']/g, '').trim(),
      c: cs.color.replace(/\s/g, ''), ls: cs.letterSpacing });
  }
  out.sort((a, b) => a.y - b.y || a.x - b.x);
  // Framer 는 등장 애니메이션 때문에 헤드라인을 글자/단어 단위 span 으로 쪼갠다.
  // 같은 줄·같은 서체의 인접 런을 하나로 합쳐야 내 마크업과 비교가 된다.
  const m = [];
  for (const r of out) {
    const p = m[m.length - 1];
    if (p && Math.abs(p.y - r.y) <= 2 && p.h === r.h && p.f === r.f && p.c === r.c &&
        p.ff === r.ff && r.x - (p.x + p.w) < 22 && r.x >= p.x) {
      p.t = (p.t + (r.x - (p.x + p.w) > 1 ? ' ' : '') + r.t).slice(0, 60);
      p.w = r.x + r.w - p.x;
    } else m.push({ ...r });
  }
  return m;
}
"""

BOX_JS = r"""
() => {
  const out = [];
  for (const e of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(e);
    if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) continue;
    const r = e.getBoundingClientRect();
    if (r.width < 8 || r.height < 8) continue;
    const bg = cs.backgroundColor.replace(/\s/g, '');
    const paint = bg !== 'rgba(0,0,0,0)' || cs.borderTopWidth !== '0px' ||
      cs.boxShadow !== 'none' || cs.backdropFilter !== 'none' || cs.borderTopLeftRadius !== '0px';
    if (!paint) continue;
    out.push({ y: Math.round(r.top + scrollY), x: Math.round(r.left),
      w: Math.round(r.width), h: Math.round(r.height), tag: e.tagName.toLowerCase(),
      bg, rd: cs.borderRadius.replace(/\s/g, ''),
      bd: cs.borderTopWidth === '0px' ? '-' : (cs.borderTopWidth + ' ' + cs.borderTopColor).replace(/\s+/g, ''),
      pd: cs.padding.replace(/\s+/g, ' '),
      sh: cs.boxShadow === 'none' ? '-' : cs.boxShadow.replace(/\s+/g, '').slice(0, 40),
      bf: cs.backdropFilter === 'none' ? '-' : cs.backdropFilter, op: cs.opacity });
  }
  out.sort((a, b) => a.y - b.y || a.x - b.x);
  return out;
}
"""

CONF = json.load(open(sys.argv[1], encoding='utf-8'))
MODE = sys.argv[2] if len(sys.argv) > 2 else 'text'
LO = int(sys.argv[3]) if len(sys.argv) > 3 else 0
HI = int(sys.argv[4]) if len(sys.argv) > 4 else 10 ** 9
JS = TEXT_JS if MODE == 'text' else BOX_JS

res = {}
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome')
    for side, url in (('ref', CONF['ref']), ('mine', CONF['mine'])):
        pg = b.new_page(viewport={'width': 1440, 'height': 900})
        pg.goto(url, wait_until='load'); pg.wait_for_timeout(3500)
        h = pg.evaluate('document.documentElement.scrollHeight'); y = 0
        while y < h:
            pg.evaluate(f'window.scrollTo(0,{y})'); pg.wait_for_timeout(160); y += 600
        pg.evaluate('window.scrollTo(0,0)'); pg.wait_for_timeout(1600)
        res[side] = pg.evaluate(JS)
        res[side + '_doc'] = pg.evaluate('document.documentElement.scrollHeight')
        pg.close()
    b.close()

base = os.path.splitext(sys.argv[1])[0] + f'.{MODE}.json'
json.dump(res, open(base, 'w', encoding='utf-8'), ensure_ascii=False)

rows = [('R', r) for r in res['ref'] if LO <= r['y'] < HI] + \
       [('M', r) for r in res['mine'] if LO <= r['y'] < HI]
rows.sort(key=lambda k: (k[1]['y'], 0 if k[0] == 'R' else 1, k[1]['x']))
for s, r in rows:
    if MODE == 'text':
        print(f"{s} {r['y']:>5}·{r['x']:<5}{r['w']:>4}×{r['h']:<4} {r['f']:<12} {r['ff'][:14]:<14} {r['c']:<22} {r['ls'][:6]:<6} {r['t']}")
    else:
        print(f"{s} {r['y']:>5}·{r['x']:<5}{r['w']:>4}×{r['h']:<4} {r['tag']:<4} {r['bg']:<22} r{r['rd']:<12} {r['bd']:<18} p[{r['pd']}] {r['sh']:<20} {r['bf']:<12} {r['op']}")
print(f"\n문서높이 ref {res['ref_doc']} / mine {res['mine_doc']} (Δ{res['mine_doc']-res['ref_doc']}) · 텍스트런 ref {len(res['ref'])} / mine {len(res['mine'])}")
