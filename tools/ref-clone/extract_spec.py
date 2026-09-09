# 레퍼런스 DOM 덤프(소스.html) → 구현 스펙 자동 추출.
#   python extract_spec.py <dump.html> <outdir> [width]
#
# 덤프를 Playwright 로 렌더링해서(스크립트 제거, 등장 애니메이션 강제 표시) 아래를 뽑는다:
#   ref-<w>.png      전체 페이지 캡처
#   spec.md          섹션 구성표(순서·높이·배경·열 수·카드 수·제목) + 미디어 슬롯 표 + 토큰 + 애니메이션 요약
#   slots.json       이미지/영상 슬롯 목록 (렌더 크기, 비율, 섹션, 문맥 텍스트, 파일명)
#   tokens.json      색 · 타입 스케일 · 라운드 · 간격 · 컨테이너 · 이징
#   prompts.md       슬롯별 이미지 프롬프트 초안 (문맥 넣어 둔 뼈대 — 주제는 손으로 다듬는다)
#   placeholders/    슬롯 크기 그대로의 등고선 플레이스홀더 jpg (템플릿이 바로 렌더되게)
#
# 경계: 여기서 뽑는 건 구조·치수·문맥이다. 원본 CSS·이미지·문구를 결과물에 복사하지 않는다.
import sys, os, re, json, math, random
from collections import Counter
from playwright.sync_api import sync_playwright
from PIL import Image, ImageDraw, ImageFilter

src, outdir = sys.argv[1], sys.argv[2]
W = int(sys.argv[3]) if len(sys.argv) > 3 else 1440
os.makedirs(outdir, exist_ok=True); os.makedirs(os.path.join(outdir, 'placeholders'), exist_ok=True)

# 0) 입력 정규화 — 세 가지 형태를 받는다
#    a. 진짜 HTML (DevTools Copy outerHTML / SingleFile)
#    b. 크롬 "페이지 소스 보기" 화면을 저장한 파일 (줄번호 테이블 안에 이스케이프된 소스)  ← 가장 흔함
#    c. 통째로 &lt;…&gt; 이스케이프된 텍스트
import html as _html
raw = open(src, encoding='utf-8', errors='ignore').read()
if 'class="line-content"' in raw[:200000] or 'saved from url=' in raw[:400]:
    cells = re.findall(r'<td class="line-content">(.*?)</td>', raw, flags=re.S)
    if cells:
        lines = [_html.unescape(re.sub(r'<[^>]+>', '', c)) for c in cells]
        raw = '\n'.join(lines)
        print(f'view-source 저장본 감지 → {len(lines)}줄 복원')
elif raw.lstrip()[:4] == '&lt;':
    raw = _html.unescape(raw); print('이스케이프 텍스트 감지 → 복원')
html = raw
open(os.path.join(outdir, '_source.html'), 'w', encoding='utf-8').write(html)   # 복원본 보관 (원본은 건드리지 않는다)

# 1) 스크립트 제거한 사본 — 런타임이 돌면 레이아웃이 바뀌거나 깨진다
static = re.sub(r'<script\b[^>]*>.*?</script>', '', html, flags=re.S | re.I)
static = re.sub(r'<noscript\b[^>]*>.*?</noscript>', '', static, flags=re.S | re.I)
tmp = os.path.join(outdir, '_static.html'); open(tmp, 'w', encoding='utf-8').write(static)

JS = r"""
(vw) => {
  const R = (el) => { const r = el.getBoundingClientRect(); return {x:Math.round(r.x), y:Math.round(r.y+scrollY), w:Math.round(r.width), h:Math.round(r.height)}; };
  const vis = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const txt = (el) => (el.innerText || '').replace(/\s+/g,' ').trim();
  const bgOf = (el) => { let e = el; for (let i=0;i<6&&e;i++){ const b = getComputedStyle(e).backgroundColor; if (b && b !== 'rgba(0, 0, 0, 0)' && b !== 'transparent') return b; e = e.parentElement; } return null; };

  // 등장 애니메이션 초기 상태 해제
  document.querySelectorAll('*').forEach(el => {
    const s = getComputedStyle(el);
    if (parseFloat(s.opacity) < 0.05) el.style.setProperty('opacity','1','important');   // Framer 초기값 0.001 포함
    if (el.hasAttribute('data-framer-appear-id') || /translate|scale\(0/.test(el.style.transform||'')) el.style.setProperty('transform','none','important');
  });

  // ---- 섹션: 폭이 뷰포트의 90% 이상이고 높이 200 이상인 블록. 같은 높이의 중첩 래퍼는 가장 바깥 하나만.
  const all = [...document.body.querySelectorAll('*')].filter(vis);
  const docH = document.documentElement.scrollHeight;
  // 후보: 뷰포트 폭 90% 이상, 높이 200 이상, 페이지의 60% 미만(그 이상은 그룹 래퍼)
  let cands = all.filter(el => { const r = el.getBoundingClientRect(); return r.width >= vw*0.9 && r.height >= 200 && r.height < docH*0.6; });
  // 점수: 텍스트 많고 미디어 있는 블록이 진짜 섹션. 같은 자리의 래퍼·오버레이보다 우선.
  const score = (el) => { const r = el.getBoundingClientRect(); return txt(el).length + el.querySelectorAll('img,video').length*200 + el.querySelectorAll('h1,h2,h3').length*300 - r.height*0.05; };
  cands.sort((a,b) => score(b) - score(a));
  // 탐욕 선택: 이미 뽑힌 블록과 세로로 50% 넘게 겹치면 버린다 → 서로 겹치지 않는 섹션 목록
  const picked = [];
  const overlap = (a, b) => { const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect(); const o = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top); return o > 0 ? o / Math.min(ra.height, rb.height) : 0; };
  cands.forEach(el => { if (!picked.some(p => overlap(p, el) > 0.5)) picked.push(el); });
  let blocks = picked.sort((a,b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);

  const sections = blocks.map((el, i) => {
    const r = R(el);
    const heads = [...el.querySelectorAll('h1,h2,h3')].filter(vis).map(txt).filter(Boolean);
    const smalls = [...el.querySelectorAll('p,span,div')].filter(h => vis(h) && h.children.length === 0).map(h => ({t:txt(h), fs:parseFloat(getComputedStyle(h).fontSize)})).filter(o => o.t && o.t.length < 40 && o.fs <= 14);
    const imgs = [...el.querySelectorAll('img,video')].filter(vis).filter(m => m.getBoundingClientRect().width >= 80);
    // 열 수: 직계·손자 중 큰 자식들의 x 위치 군집
    const kids = [...el.querySelectorAll(':scope > *, :scope > * > *, :scope > * > * > *')].filter(k => vis(k) && k.getBoundingClientRect().width > 120 && k.getBoundingClientRect().height > 80);
    const rows = {}; kids.forEach(k => { const b = k.getBoundingClientRect(); const key = Math.round(b.top/40); (rows[key] = rows[key]||[]).push(Math.round(b.left)); });
    const cols = Math.max(0, ...Object.values(rows).map(xs => new Set(xs).size));
    // 카드: 같은 부모 아래 크기가 비슷한 형제 3개 이상
    let cards = 0, cardSize = null;
    const parents = new Set(kids.map(k => k.parentElement));
    parents.forEach(p => { const ch = [...p.children].filter(vis).map(c => c.getBoundingClientRect()).filter(b => b.width > 150 && b.height > 100);
      const groups = {}; ch.forEach(b => { const key = Math.round(b.width/20)+'x'+Math.round(b.height/20); groups[key] = (groups[key]||0)+1; });
      for (const [k,n] of Object.entries(groups)) if (n >= 3 && n > cards) { cards = n; const b = ch.find(b => Math.round(b.width/20)+'x'+Math.round(b.height/20) === k); cardSize = {w:Math.round(b.width), h:Math.round(b.height)}; } });
    const cs = getComputedStyle(el);
    return {i, ...r, bg: bgOf(el), padT: cs.paddingTop, padB: cs.paddingBottom, heading: heads[0] || '', headings: heads.slice(0,4),
            label: (smalls[0]||{}).t || '', cols, cards, cardSize, media: imgs.length, textSample: txt(el).slice(0,160)};
  });

  // ---- 미디어 슬롯: img · video · background-image
  const secOf = (y) => { const s = sections.filter(s => y >= s.y && y < s.y + s.h); return s.length ? s[s.length-1].i : -1; };
  const nearHeading = (el) => { let e = el; for (let i=0;i<8&&e;i++){ const h = e.querySelector && [...e.querySelectorAll('h1,h2,h3,h4')].find(vis); if (h && h !== el) return txt(h); e = e.parentElement; } return ''; };
  const slots = [];
  const push = (el, kind, extra) => { const r = R(el); if (r.w < 64 || r.h < 64) return; // 아이콘 제외
    let rad = 0, e = el; for (let i=0;i<3&&e;i++){ rad = Math.max(rad, parseFloat(getComputedStyle(e).borderRadius)||0); e = e.parentElement; }
    slots.push({kind, ...r, aspect: +(r.w/r.h).toFixed(3), radius: rad, section: secOf(r.y), alt: el.getAttribute('alt')||'', heading: nearHeading(el), objectFit: getComputedStyle(el).objectFit, ...extra}); };
  [...document.querySelectorAll('img')].filter(vis).forEach(el => push(el, 'img', {natural:[el.naturalWidth, el.naturalHeight]}));
  [...document.querySelectorAll('video')].filter(vis).forEach(el => push(el, 'video', {poster: !!el.poster, autoplay: el.autoplay, loop: el.loop, muted: el.muted}));
  all.forEach(el => { const bi = getComputedStyle(el).backgroundImage; if (bi && bi.startsWith('url(') && !el.querySelector('img')) push(el, 'bg', {}); });
  slots.sort((a,b) => a.y - b.y || a.x - b.x);

  // ---- 토큰
  const textEls = all.filter(el => el.children.length === 0 && txt(el).length > 0);
  const type = {}; textEls.forEach(el => { const s = getComputedStyle(el); const k = `${parseFloat(s.fontSize)}|${s.lineHeight}|${s.letterSpacing}|${s.fontWeight}|${s.fontFamily.split(',')[0].replace(/"/g,'')}`; type[k] = (type[k]||0)+1; });
  const colors = {}; all.forEach(el => { const s = getComputedStyle(el); [s.backgroundColor, s.color].forEach(c => { if (c && c !== 'rgba(0, 0, 0, 0)') colors[c] = (colors[c]||0)+1; }); });
  const radii = {}; all.forEach(el => { const r = getComputedStyle(el).borderRadius; if (r && r !== '0px') radii[r] = (radii[r]||0)+1; });
  const gaps = {}; all.forEach(el => { const s = getComputedStyle(el); if (s.display.includes('grid') || s.display.includes('flex')) { const g = s.gap; if (g && g !== 'normal' && g !== '0px') gaps[g] = (gaps[g]||0)+1; } });
  const heads = [...document.querySelectorAll('h2')].filter(vis).map(h => Math.round(h.getBoundingClientRect().left));
  const leftEdge = heads.length ? heads.sort((a,b)=>a-b)[Math.floor(heads.length/2)] : null;
  const maxWidths = {}; all.forEach(el => { const m = getComputedStyle(el).maxWidth; if (m && m.endsWith('px') && parseFloat(m) > 600) maxWidths[m] = (maxWidths[m]||0)+1; });
  const eas = {}; const durs = {}; all.forEach(el => { const s = getComputedStyle(el); if (s.transitionDuration && s.transitionDuration !== '0s') { durs[s.transitionDuration] = (durs[s.transitionDuration]||0)+1; eas[s.transitionTimingFunction] = (eas[s.transitionTimingFunction]||0)+1; } });
  const appear = document.querySelectorAll('[data-framer-appear-id]').length;

  return {docH: document.documentElement.scrollHeight, sections, slots, tokens: {type, colors, radii, gaps, leftEdge, maxWidths, easings: eas, durations: durs, appearCount: appear, header: (()=>{const h=document.querySelector('header'); return h? R(h): null})()}};
}
"""

with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': W, 'height': 900})
    pg.goto('file:///' + os.path.abspath(tmp).replace('\\', '/'), wait_until='networkidle'); pg.wait_for_timeout(2000)
    # lazy 이미지는 스크롤 전엔 안 불러온다 → eager 로 바꾸고 끝까지 스크롤해 로드시킨다
    pg.evaluate("document.querySelectorAll('img').forEach(i=>{i.loading='eager'; if(i.dataset.src&&!i.src) i.src=i.dataset.src;})")
    h = pg.evaluate("document.documentElement.scrollHeight"); y = 0
    while y < h:
        pg.evaluate(f"window.scrollTo(0,{y})"); pg.wait_for_timeout(120); y += 600
    pg.evaluate("window.scrollTo(0,0)")
    for _ in range(40):   # 최대 8초
        if pg.evaluate("[...document.images].every(i=>i.complete)"): break
        pg.wait_for_timeout(200)
    pg.wait_for_timeout(800)
    data = pg.evaluate(JS, W); pg.wait_for_timeout(500)
    pg.screenshot(path=os.path.join(outdir, f'ref-{W}.png'), full_page=True)
    b.close()

# Framer 등장 애니메이션 정의 — <script type="framer/appear" id="__framer__appearAnimations"> 의 JSON
appear_defs = {}
for m in re.finditer(r'<script[^>]*type="framer/appear"[^>]*id="([^"]+)"[^>]*>(.*?)</script>', html, flags=re.S):
    try: appear_defs[m.group(1)] = json.loads(m.group(2))
    except Exception: pass
anim_summary = []; _seen = set()
try:
    aa = appear_defs.get('__framer__appearAnimationsContent') or appear_defs.get('__framer__appearAnimations') or {}
    for aid, per_bp in aa.items():
        for bp, spec in (per_bp.items() if isinstance(per_bp, dict) else []):
            if not isinstance(spec, dict): continue
            ini, ani = spec.get('initial', {}), spec.get('animate', {})
            tr = ani.get('transition') or spec.get('transition') or {}
            desc = []
            for k in ('opacity', 'y', 'x', 'scale', 'rotate', 'rotateX', 'skewX'):
                if k in ini and ini[k] != ani.get(k, ini[k]): desc.append(f"{k} {ini[k]}→{ani.get(k)}")
            if not desc: continue   # 초기=최종이면 애니메이션 아님
            e = tr.get('ease'); e = f"cubic-bezier({','.join(map(str, e))})" if isinstance(e, list) else e
            line = f"{', '.join(desc)} · {tr.get('duration', '?')}s · {e or ('spring' if tr.get('type') == 'spring' else '?')} · delay {tr.get('delay', 0)}s"
            if line in _seen: continue   # 브레이크포인트만 다른 중복은 한 번만
            _seen.add(line); anim_summary.append(f"- `{aid[:8]}`: {line}")
except Exception as ex:
    anim_summary.append(f"- (appear JSON 해석 실패: {ex})")
bp_defs = appear_defs.get('__framer__breakpoints')

# CSS 텍스트에서 keyframes · cubic-bezier 분포 (computed 로 안 잡히는 것)
css = ' '.join(re.findall(r'<style[^>]*>(.*?)</style>', html, flags=re.S | re.I))
keyframes = re.findall(r'@keyframes\s+([\w-]+)', css)
beziers = Counter(re.findall(r'cubic-bezier\([^)]*\)', css))
fs_hist = Counter(re.findall(r'font-size:\s*([0-9.]+px)', css))
ls_hist = Counter(re.findall(r'letter-spacing:\s*(-?[0-9.]+(?:px|em))', css))
lh_hist = Counter(re.findall(r'line-height:\s*([0-9.]+(?:px|em|%)?)', css))
pad_hist = Counter(re.findall(r'padding:\s*([0-9]+px\s+[0-9]+px)', css))

# ---- 비율 라벨링 · 파일명 · 플레이스홀더
RATIOS = [('21:9', 21/9), ('16:9', 16/9), ('3:2', 1.5), ('4:3', 4/3), ('5:4', 1.25), ('1:1', 1), ('4:5', .8), ('3:4', .75), ('2:3', 2/3), ('9:16', 9/16)]
def ratio_label(a): return min(RATIOS, key=lambda r: abs(r[1] - a))[0]
def slug(s): s = re.sub(r'[^a-z0-9가-힣]+', '-', (s or '').lower()).strip('-'); return s[:24] or 'sec'

def topo(w, h, seed):
    random.seed(seed); base = (228, 233, 224); ln = (200, 211, 194)
    im = Image.new('RGB', (w, h), base); d = ImageDraw.Draw(im)
    cx, cy = w * random.uniform(.3, .7), h * random.uniform(.3, .7)
    ph = [random.uniform(0, 6.28) for _ in range(5)]; amp = [random.uniform(.05, .18) for _ in range(5)]
    maxr = max(w, h) * 1.05
    for k in range(16, 0, -1):
        r0 = maxr * k / 16; pts = []
        for i in range(240):
            t = i / 240 * 2 * math.pi; f = 1 + sum(amp[j] * math.sin((j + 2) * t + ph[j]) for j in range(5)) / 2.4
            pts.append((cx + r0 * f * math.cos(t), cy + r0 * f * math.sin(t) * .72))
        d.line(pts + [pts[0]], fill=ln, width=2)
    return im.filter(ImageFilter.GaussianBlur(.6))

secs = data['sections']; slots = data['slots']
per_sec = Counter()
for s in slots:
    sec = secs[s['section']] if 0 <= s['section'] < len(secs) else None
    base = 'hero' if (sec and sec['y'] == 0) else (slug(sec['label'] or sec['heading'])[:16].rstrip('-') if sec else 'page')
    per_sec[base] += 1
    s['file'] = f"{base}-{per_sec[base]}.{'mp4' if s['kind']=='video' else 'jpg'}"
    s['ratio'] = ratio_label(s['aspect'])
    s['sectionHeading'] = sec['heading'] if sec else ''
    # 플레이스홀더: 렌더 크기 2배(레티나), 최대 2400
    if s['kind'] != 'video':
        pw, ph_ = min(2400, s['w'] * 2), min(2400, s['h'] * 2)
        topo(pw, ph_, hash(s['file']) & 0xffff).save(os.path.join(outdir, 'placeholders', s['file']), quality=82)

json.dump(slots, open(os.path.join(outdir, 'slots.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
tok = data['tokens']; tok.update({'keyframes': keyframes, 'beziersInCss': beziers.most_common(8), 'fontSizesInCss': sorted(fs_hist.items(), key=lambda x: float(x[0][:-2])),
                                  'letterSpacingInCss': ls_hist.most_common(6), 'lineHeightInCss': lh_hist.most_common(8), 'paddingPairsInCss': pad_hist.most_common(8)})
json.dump(tok, open(os.path.join(outdir, 'tokens.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# ---- spec.md
L = []
L.append(f"# 레퍼런스 스펙 — {os.path.basename(src)} @ {W}px\n")
L.append(f"문서 높이 {data['docH']}px · 섹션 {len(secs)}개 · 미디어 슬롯 {len(slots)}개 · 헤더 {tok['header'] and tok['header']['h']}px · 콘텐츠 좌측선(h2 x 중앙값) {tok['leftEdge']}px\n")
L.append("전체 캡처: `ref-%d.png` — **구성표를 쓰기 전에 반드시 캡처를 4등분해서 본다.** 아래 표는 자동 추출이라 열 수·카드 수는 힌트일 뿐이다.\n" % W)
L.append("## 1. 섹션 구성표 (위→아래)\n")
L.append("| # | y | 높이 | 배경 | 라벨 | 제목 | 열 | 카드 | 미디어 | 텍스트 샘플 |\n|---|---|---|---|---|---|---|---|---|---|")
for s in secs:
    cs = f"{s['cards']}개 {s['cardSize']['w']}×{s['cardSize']['h']}" if s['cards'] else '-'
    L.append(f"| {s['i']} | {s['y']} | {s['h']} | {s['bg'] or '-'} | {s['label']} | {s['heading'][:40]} | {s['cols']} | {cs} | {s['media']} | {s['textSample'][:60]}… |")
L.append("\n## 2. 미디어 슬롯 (파일명 그대로 쓴다 · placeholders/ 에 같은 이름으로 임시 이미지 있음)\n")
L.append("| 파일 | 종류 | 렌더 w×h | 비율 | 라운드 | 섹션 | 문맥 제목 | alt |\n|---|---|---|---|---|---|---|---|")
for s in slots:
    L.append(f"| `{s['file']}` | {s['kind']} | {s['w']}×{s['h']} | {s['ratio']} | {s['radius']} | {s['section']} {s['sectionHeading'][:18]} | {s['heading'][:30]} | {s['alt'][:30]} |")
L.append("\n## 3. 토큰\n")
top_type = sorted(tok['type'].items(), key=lambda x: -x[1])[:14]
L.append("타입 (fs|lh|ls|weight|family : 빈도)\n")
for k, n in top_type: L.append(f"- `{k}` : {n}")
L.append("\nCSS 소스의 font-size 분포: " + ', '.join(f"{k}×{n}" for k, n in tok['fontSizesInCss']))
L.append("letter-spacing: " + ', '.join(f"{k}×{n}" for k, n in tok['letterSpacingInCss']))
L.append("line-height: " + ', '.join(f"{k}×{n}" for k, n in tok['lineHeightInCss']))
L.append("\n색 (빈도순 상위 10)\n")
for c, n in sorted(tok['colors'].items(), key=lambda x: -x[1])[:10]: L.append(f"- `{c}` : {n}")
L.append("\n라운드: " + ', '.join(f"{k}×{n}" for k, n in sorted(tok['radii'].items(), key=lambda x: -x[1])[:8]))
L.append("gap: " + ', '.join(f"{k}×{n}" for k, n in sorted(tok['gaps'].items(), key=lambda x: -x[1])[:8]))
L.append("max-width(>600): " + ', '.join(f"{k}×{n}" for k, n in sorted(tok['maxWidths'].items(), key=lambda x: -x[1])[:5]))
L.append("padding 쌍: " + ', '.join(f"{k}×{n}" for k, n in tok['paddingPairsInCss']))
L.append("\n## 4. 애니메이션\n")
L.append(f"- 등장 애니메이션 요소(data-framer-appear-id): {tok['appearCount']}개 → 우리 `.rv` 스크롤 등장으로 매핑")
if anim_summary:
    L.append("- Framer appear 정의 (초기→최종 · 길이 · 이징 · 지연) — `.rv` 의 transform/duration/easing 을 이 값에 맞춘다:")
    L.extend('  ' + a for a in anim_summary[:20])
if bp_defs: L.append(f"- 브레이크포인트: {json.dumps(bp_defs, ensure_ascii=False)[:300]}")
L.append("- @keyframes: " + (', '.join(sorted(set(keyframes))) or '없음'))
L.append("- cubic-bezier: " + (', '.join(f"{k}×{n}" for k, n in tok['beziersInCss']) or '없음'))
L.append("- transition 이징(computed): " + ', '.join(f"{k}×{n}" for k, n in sorted(tok['easings'].items(), key=lambda x: -x[1])[:5]))
L.append("- transition 길이(computed): " + ', '.join(f"{k}×{n}" for k, n in sorted(tok['durations'].items(), key=lambda x: -x[1])[:5]))
L.append("\n## 5. 다음 단계\n1. `ref-%d.png` 4등분해서 보고 위 구성표를 손으로 고친다 (열 수·카드 배치·사진 위치).\n2. `placeholders/` 를 템플릿 `assets/` 로 복사하고 `slots.json` 의 파일명으로 마크업을 짠다.\n3. `prompts.md` 의 [주제] 를 채운다.\n4. 구현 후 `audit.py` 로 재측정, `verify_template.sh` 로 검증.\n" % W)
open(os.path.join(outdir, 'spec.md'), 'w', encoding='utf-8').write('\n'.join(L))

# ---- prompts.md
P = [f"# 이미지 프롬프트 — {os.path.basename(src)}\n", "> 공통 접미: `photorealistic, natural light, no text, no logo, no watermark, high detail`", "> [주제] 는 업종에 맞게 채운다. 파일명·비율은 그대로.\n",
     "| 파일 | 비율 | 권장 저장 크기 | 자리 |\n|---|---|---|---|"]
for s in slots:
    P.append(f"| `{s['file']}` | {s['ratio']} | {min(2400, s['w']*2)}×{min(2400, s['h']*2)} | 섹션 {s['section']} · {s['sectionHeading'][:20]} |")
P.append("")
for s in slots:
    ctx = ' / '.join(x for x in [s['sectionHeading'], s['heading'], s['alt']] if x)
    if s['kind'] == 'video':
        P.append(f"**{s['file']}** — {s['ratio']} · 영상 · 문맥: {ctx or '-'}\n```\n[주제], slow steady camera, seamless loop, 8-12s, no cuts, muted palette --ar {s['ratio']}\n```")
    else:
        P.append(f"**{s['file']}** — {s['ratio']} · 문맥: {ctx or '-'}\n```\n[주제], {'vertical composition' if s['aspect'] < .9 else 'wide composition' if s['aspect'] > 1.6 else 'balanced composition'}, {'empty space in upper and lower thirds for overlay text' if s['radius'] >= 8 and s['h'] > 300 else 'clean subject'} --ar {s['ratio']}\n```")
open(os.path.join(outdir, 'prompts.md'), 'w', encoding='utf-8').write('\n'.join(P))
os.remove(tmp)
print(f"섹션 {len(secs)} · 슬롯 {len(slots)} · 문서높이 {data['docH']} → {outdir}")
