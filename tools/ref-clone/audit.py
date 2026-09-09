# 레퍼런스 vs 구현 — 같은 뷰포트에서 요소별 크기를 실측해 표로 대조한다.
#   python audit.py <anchors.json> [width]
#
# anchors.json 형식 (텍스트 앵커로 요소를 찾는다 — 두 사이트의 같은 자리 텍스트를 적는다):
# {
#   "ref":  {"url": "https://...", "nav0": "About", "headerCta": "Book", "eyebrow": "...", "heroCta": "...",
#            "heroP": "설명 앞부분", "chip": "Mountain",
#            "sections": {"about": "Who We Are", "hikes": "Our Hikes", ...},
#            "cards": {"trail": ["Annapurna", 400, 300], "inclSmall": ["Guiding", 200, 120], ...},
#            "closingH2": "Your next adventure"},
#   "mine": {"url": "file:///C:/.../index.html", ...같은 키..., "revealClass": ".rv"}
# }
# cards 값은 [앵커 텍스트, 최소 폭, 최소 높이] — 앵커에서 올라가며 그 크기를 처음 넘는 조상을 카드로 본다.
#
# 주의: Framer 는 텍스트를 12px 래퍼 <p> 안의 <span> 에 넣는다. 가장 깊은 일치 요소를 잡아야 진짜 폰트 크기가 나온다.
#       h1 좌표·워드마크는 숨은 SEO 요소나 SVG 에 걸리기 쉬워 신뢰하지 말 것.
import json, sys
from playwright.sync_api import sync_playwright

JS = r"""
(a) => {
  const R = (el) => { if(!el) return null; const r = el.getBoundingClientRect();
    return {x:Math.round(r.x), y:Math.round(r.y+scrollY), w:Math.round(r.width), h:Math.round(r.height)}; };
  const F = (el) => { if(!el) return null; const s = getComputedStyle(el);
    return {fs:parseFloat(s.fontSize), lh:s.lineHeight, ls:s.letterSpacing, fw:s.fontWeight}; };
  const all = [...document.querySelectorAll('h1,h2,h3,h4,p,span,a,div,summary,b,strong,li,button')];
  const depth = (x) => { let d=0; while(x){d++; x=x.parentElement} return d; };
  const inHeader = (x) => !!x.closest('header,nav');
  const byText = (t) => {
    let c = all.filter(x => (x.innerText||'').trim() === t && !inHeader(x));
    if(!c.length) c = all.filter(x => (x.innerText||'').trim().startsWith(t) && !inHeader(x));
    if(!c.length) c = all.filter(x => (x.innerText||'').trim() === t);
    c.sort((p,q)=>depth(q)-depth(p)); return c[0] || null; };
  const up = (el, pred, max=14) => { let e = el; for(let i=0;i<max && e;i++){ if(pred(e)) return e; e = e.parentElement; } return null; };
  const maxRadius = (el) => { let r=0, x=el; for(let i=0;i<4&&x;i++){ r=Math.max(r,parseFloat(getComputedStyle(x).borderRadius)||0); x=x.parentElement; } return r; };
  const out = {docH: document.documentElement.scrollHeight};

  const hdr = document.querySelector('header'); out.header = R(hdr);
  const nav0 = [...document.querySelectorAll('a')].find(x=>(x.innerText||'').trim()===a.nav0 && x.getBoundingClientRect().y<200);
  out.navLink = {...R(nav0), ...F(nav0)};
  const hc = byText(a.headerCta); const hcb = up(hc, e => getComputedStyle(e).backgroundColor !== 'rgba(0, 0, 0, 0)', 4) || hc; out.headerCta = R(hcb);

  const h1 = document.querySelector('h1'); out.h1 = F(h1);
  const hf = up(h1, e => e.getBoundingClientRect().width > 1200 && e.getBoundingClientRect().height > 500);
  out.heroFrame = hf ? {...R(hf), radius: getComputedStyle(hf).borderRadius} : null;
  const eb = byText(a.eyebrow); out.eyebrow = {...R(eb), ...F(eb)};
  const cta = byText(a.heroCta); const ctab = up(cta, e => parseFloat(getComputedStyle(e).paddingLeft) > 10, 4) || cta; out.heroCta = R(ctab);
  const hp = byText(a.heroP); out.heroP = {...R(hp), ...F(hp)};
  const ch = byText(a.chip); const chb = up(ch, e => parseFloat(getComputedStyle(e).paddingLeft) > 6, 4) || ch; out.chip = R(chb);

  out.sections = {};
  for (const [k,label] of Object.entries(a.sections||{})) {
    const l = byText(label); if(!l){ out.sections[k] = {missing:label}; continue; }
    const s = up(l, e => e.getBoundingClientRect().width > 1100 && e.getBoundingClientRect().height > 300);
    const h2 = up(l, e => e.getBoundingClientRect().width > 300, 6)?.querySelector('h2') || document.evaluate('following::h2[1]', l, null, 9, null).singleNodeValue;
    out.sections[k] = {label:{...R(l), ...F(l)}, section:R(s), h2:h2?{...R(h2), ...F(h2)}:null};
  }
  out.cards = {};
  for (const [k,[t,minW,minH]] of Object.entries(a.cards||{})) {
    const e = byText(t); if(!e){ out.cards[k] = {missing:t}; continue; }
    const c = up(e, x => { const r = x.getBoundingClientRect(); return r.width >= minW && r.height >= minH; });
    out.cards[k] = c ? {...R(c), radius:maxRadius(c), title:F(e)} : {missing:t};
  }
  const gs = out.sections.gallery && out.sections.gallery.section;
  if (gs) out.galleryImgs = [...document.querySelectorAll('img')].map(i=>R(i)).filter(r=>r.y>=gs.y && r.y<gs.y+gs.h && r.w>150).slice(0,8).map(r=>[r.w,r.h]);
  return out;
}
"""

def measure(pg, cfg):
    try: pg.goto(cfg['url'], wait_until='networkidle', timeout=45000)
    except Exception: pg.goto(cfg['url'], wait_until='load', timeout=60000)
    pg.wait_for_timeout(3000)
    if cfg.get('resetAppear'):  # 스크립트 뺀 Framer 덤프: appear 초기상태(opacity .001 · y150)를 최종상태로
        pg.evaluate("document.querySelectorAll('[data-framer-appear-id]').forEach(e=>{e.style.opacity=1;e.style.transform='none'})")
    if cfg.get('revealClass'):
        pg.evaluate(f"document.querySelectorAll('{cfg['revealClass']}').forEach(e=>e.classList.add('on'))"); pg.wait_for_timeout(1200)
    else:
        h = pg.evaluate("document.documentElement.scrollHeight"); y = 0
        while y < h:
            pg.mouse.wheel(0, 700); pg.wait_for_timeout(180); y += 700
            h = pg.evaluate("document.documentElement.scrollHeight")
        pg.wait_for_timeout(1200); pg.evaluate("window.scrollTo(0,0)"); pg.wait_for_timeout(1500)
    return pg.evaluate(JS, cfg)

cfg = json.load(open(sys.argv[1], encoding='utf-8'))
width = int(sys.argv[2]) if len(sys.argv) > 2 else 1440
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': width, 'height': 900})
    t = measure(pg, cfg['ref']); m = measure(pg, cfg['mine']); b.close()

def g(o,*ks):
    for k in ks:
        o = o.get(k) if isinstance(o, dict) else None
    return o
def wh(o): return f"{g(o,'w')}×{g(o,'h')}" if o and g(o,'w') is not None else '-'
rows = []
row = lambda n,a,b: rows.append((n,a,b))
row('문서 높이', t['docH'], m['docH'])
row('헤더 높이', g(t,'header','h'), g(m,'header','h'))
row('내비 링크 폰트', g(t,'navLink','fs'), g(m,'navLink','fs'))
row('헤더 CTA 높이', g(t,'headerCta','h'), g(m,'headerCta','h'))
row('히어로 프레임 w×h', wh(g(t,'heroFrame')), wh(g(m,'heroFrame')))
row('히어로 x / 라운드', f"{g(t,'heroFrame','x')} / {g(t,'heroFrame','radius')}", f"{g(m,'heroFrame','x')} / {g(m,'heroFrame','radius')}")
row('eyebrow 폰트 / x', f"{g(t,'eyebrow','fs')} / {g(t,'eyebrow','x')}", f"{g(m,'eyebrow','fs')} / {g(m,'eyebrow','x')}")
row('h1 폰트/행간/자간', f"{g(t,'h1','fs')}/{g(t,'h1','lh')}/{g(t,'h1','ls')}", f"{g(m,'h1','fs')}/{g(m,'h1','lh')}/{g(m,'h1','ls')}")
row('히어로 CTA 높이 / x', f"{g(t,'heroCta','h')} / {g(t,'heroCta','x')}", f"{g(m,'heroCta','h')} / {g(m,'heroCta','x')}")
row('히어로 설명 폰트 / 폭', f"{g(t,'heroP','fs')} / {g(t,'heroP','w')}", f"{g(m,'heroP','fs')} / {g(m,'heroP','w')}")
row('칩 높이', g(t,'chip','h'), g(m,'chip','h'))
for k in (cfg['ref'].get('sections') or {}):
    ts, ms = g(t,'sections',k), g(m,'sections',k)
    row(f'[{k}] 섹션 높이', g(ts,'section','h'), g(ms,'section','h'))
    row(f'[{k}] 라벨 폰트 / x / y', f"{g(ts,'label','fs')} / {g(ts,'label','x')} / {g(ts,'label','y')}", f"{g(ms,'label','fs')} / {g(ms,'label','x')} / {g(ms,'label','y')}")
    row(f'[{k}] h2 폰트 / 행간', f"{g(ts,'h2','fs')} / {g(ts,'h2','lh')}", f"{g(ms,'h2','fs')} / {g(ms,'h2','lh')}")
    gap = lambda s: (g(s,'h2','y') or 0)-(g(s,'label','y') or 0)-(g(s,'label','h') or 0)
    row(f'[{k}] 라벨→h2 간격', gap(ts), gap(ms))
for k in (cfg['ref'].get('cards') or {}):
    tc, mc = g(t,'cards',k), g(m,'cards',k)
    row(f'<{k}> w×h / 라운드', f"{wh(tc)} / {g(tc,'radius')}", f"{wh(mc)} / {g(mc,'radius')}")
    row(f'<{k}> 제목 폰트', g(tc,'title','fs'), g(mc,'title','fs'))
row('갤러리 이미지', t.get('galleryImgs'), m.get('galleryImgs'))
print(f"{'항목':28} {'레퍼런스':>30} {'구현':>30}")
for n,a,b in rows: print(f"{n:28} {str(a):>30} {str(b):>30}")
json.dump({'ref':t,'mine':m}, open(sys.argv[1].replace('.json','.result.json'),'w',encoding='utf-8'), ensure_ascii=False, indent=1)
