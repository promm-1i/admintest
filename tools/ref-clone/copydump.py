# 템플릿의 한글 문구를 렌더된 줄 수·글자 예산과 함께 뽑는다.
# 문구를 다시 쓸 때 줄 수를 그대로 유지하려면 이 예산 안에서 써야 한다.
#   python copydump.py <slug> [--w 1440] [--min 6]
import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
from playwright.sync_api import sync_playwright

args = sys.argv[1:]
W = int(args[args.index('--w') + 1]) if '--w' in args else 1440
MIN = int(args[args.index('--min') + 1]) if '--min' in args else 6
slug = [a for a in args if not a.startswith('--')][0]

JS = r"""
(MIN) => {
  const out = [];
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = w.nextNode())) {
    const s = (n.nodeValue || '').replace(/\s+/g, ' ').trim();
    if (s.length < MIN) continue;
    if (!/[가-힣]/.test(s)) continue;
    const p = n.parentElement;
    const cs = getComputedStyle(p);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const rg = document.createRange(); rg.selectNodeContents(n);
    const rects = [...rg.getClientRects()].filter(r => r.width > 0.5);
    if (!rects.length) continue;
    const fs = parseFloat(cs.fontSize);
    const lines = rects.length;
    // 한 줄에 들어가는 글자 수 = 가장 긴 줄 폭 / 글자당 폭
    const maxw = Math.max(...rects.map(r => r.width));
    const per = Math.round(maxw / (s.length ? maxw / s.length * lines : fs)) || Math.round(maxw / fs);
    out.push({tag: p.tagName.toLowerCase(), cls: String(p.className || '').trim().split(/\s+/).slice(0,2).join('.'),
              fs: Math.round(fs), lines, len: s.length,
              box: Math.round(maxw), txt: s});
  }
  return out;
}
"""

with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome')
    pg = b.new_page(viewport={'width': W, 'height': 900})
    pg.goto(f'file:///C:/web-project/mintcl-netlify-spa/public/templates/{slug}/index.html', wait_until='load')
    pg.wait_for_timeout(2500)
    H = pg.evaluate('document.documentElement.scrollHeight'); y = 0
    while y < H:
        pg.evaluate(f'window.scrollTo(0,{y})'); pg.wait_for_timeout(90); y += 700
    pg.evaluate('window.scrollTo(0,0)'); pg.wait_for_timeout(900)
    rows = pg.evaluate(JS, MIN)
    b.close()

seen = set()
print(f'# {slug} @{W} — 한글 문구 {len(rows)}개')
print('# 줄수를 유지하려면 "글자수"를 (줄수-1)*줄당 ~ 줄수*줄당 사이로 유지할 것')
print(f"{'태그.클래스':26s} {'글꼴':>4s} {'줄':>2s} {'글자':>4s} {'줄당':>4s}  문구")
for r in rows:
    if r['txt'] in seen: continue
    seen.add(r['txt'])
    per = round(r['len'] / r['lines'])
    print(f"{(r['tag']+'.'+r['cls'])[:26]:26s} {r['fs']:4d} {r['lines']:2d} {r['len']:4d} {per:4d}  {r['txt']}")
