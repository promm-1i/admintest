# 모바일 폭에서 줄바꿈·넘침·잘림을 한 번에 훑는다.
#   python mobilecheck.py <slug> [<slug> ...] [--w 390,375]
# 검사 항목
#   OVERFLOW  뷰포트 밖으로 나가는데 잘리지도 않는 요소 (가로 스크롤 원인)
#   CLIP      제 컨테이너보다 내용이 넓어 잘리는 텍스트
#   ORPHAN    마지막 줄에 1~2글자만 남은 줄바꿈 (한글 고아 음절)
#   OVERLAP   형제 요소끼리 세로로 겹침
#   TINY      12px 미만 글자
#   TAP       44px 미만인 링크·버튼
#   IMG       깨진 이미지
import sys, io, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
from playwright.sync_api import sync_playwright

args = sys.argv[1:]
widths = [390]
if '--w' in args:
    i = args.index('--w')
    widths = [int(x) for x in args[i + 1].split(',')]
    del args[i:i + 2]
slugs = [a for a in args if not a.startswith('--')]

JS = r"""
(W) => {
  const out = [];
  const txt = e => (e.textContent || '').replace(/\s+/g, ' ').trim();
  const clipped = e => {
    for (let n = e.parentElement; n; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (['hidden','clip','auto','scroll'].includes(cs.overflowX)) return true;
    }
    return false;
  };
  const name = e => e.tagName.toLowerCase() +
    (e.className && e.className.baseVal === undefined && e.className ? '.' + String(e.className).trim().split(/\s+/).slice(0,2).join('.') : '');

  for (const e of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(e);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = e.getBoundingClientRect();
    if (!r.width || !r.height) continue;

    // 1) 뷰포트 밖 (잘리지 않는 것만)
    if ((r.right > W + 1 || r.left < -1) && !clipped(e))
      out.push(['OVERFLOW', name(e), `x ${Math.round(r.left)}~${Math.round(r.right)} (뷰포트 ${W})`, txt(e).slice(0,34)]);

    // 2) 제 컨테이너보다 내용이 넓다
    if (e.scrollWidth > e.clientWidth + 2 && e.clientWidth > 0 &&
        !['auto','scroll'].includes(cs.overflowX) && e.children.length === 0)
      out.push(['CLIP', name(e), `내용 ${e.scrollWidth} > 칸 ${e.clientWidth}`, txt(e).slice(0,34)]);

    // 2-b) 높이가 0으로 무너진 시각 요소 (세로 flex + flex-basis:0 함정)
    if (r.height < 2 && (e.querySelector('img,video') || cs.backgroundImage.includes('url(')) && cs.position !== 'absolute')
      out.push(['ZERO', name(e), `높이 ${r.height.toFixed(1)} (flex ${cs.flex})`, txt(e).slice(0,30) || '(사진)']);

    // 3) 세로로 넘침 (고정 높이 안에 글이 안 들어감)
    if (e.scrollHeight > e.clientHeight + 2 && e.clientHeight > 0 &&
        ['hidden','clip'].includes(cs.overflowY) && txt(e).length > 4 &&
        !e.querySelector('img,video,svg')) {
      // 실제로 상자 밖으로 나간 '자식 요소'가 있을 때만 잘림으로 본다.
      // ::after 글로우, translateY 로 대기 중인 호버 채움, 오도미터 숫자띠는 여기서 걸러진다.
      const r0 = e.getBoundingClientRect();
      const cut = [...e.querySelectorAll('*')].find(c => {
        const cr = c.getBoundingClientRect();
        return cr.height > 4 && cr.bottom > r0.bottom + 2 && (c.textContent||'').trim();
      });
      if (cut) out.push(['CUT', name(e), `내용 ${e.scrollHeight} > 칸 ${e.clientHeight}`,
        (cut.textContent||'').replace(/\s+/g,' ').trim().slice(0,34)]);
    }
  }

  // 4) 줄바꿈 고아 — 마지막 줄에 1~2글자만 남은 텍스트
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  let n;
  while ((n = walker.nextNode())) {
    const s = (n.nodeValue || '').replace(/\s+/g, ' ').trim();
    if (s.length < 12) continue;
    const p = n.parentElement;
    if (!p || seen.has(p)) continue;
    const cs = getComputedStyle(p);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const rg = document.createRange();
    rg.selectNodeContents(n);
    const rects = [...rg.getClientRects()].filter(r => r.width > 0.5);
    if (rects.length < 2) continue;
    // 뒤에 인라인 형제가 이어지면 그 줄은 고아가 아니다 (h2 뒤의 <i>Questions</i> 같은 경우)
    if (n.nextSibling && (n.nextSibling.nodeType === 1 || (n.nextSibling.nodeValue||'').trim())) continue;
    seen.add(p);
    const last = rects[rects.length - 1];
    const lh = parseFloat(cs.fontSize) || 16;
    // 마지막 줄이 글자 2개 이하 폭이면 고아
    if (last.width < lh * 3.1)
      out.push(['ORPHAN', name(p), `${rects.length}줄 · 마지막 줄 ${Math.round(last.width)}px (글자 ${(last.width/lh).toFixed(1)}자)`, s.slice(-24)]);
  }

  // 5) 작은 글자 · 좁은 탭 타깃
  for (const e of document.querySelectorAll('a,button')) {
    const cs = getComputedStyle(e);
    if (cs.display === 'none') continue;
    const r = e.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    if (r.height < 40 && txt(e))
      out.push(['TAP', name(e), `${Math.round(r.width)}×${Math.round(r.height)}`, txt(e).slice(0,24)]);
  }
  for (const e of document.querySelectorAll('p,span,li,td,label,a,button,h1,h2,h3,h4,h5,h6')) {
    const cs = getComputedStyle(e);
    if (cs.display === 'none' || !txt(e) || e.children.length) continue;
    const fs = parseFloat(cs.fontSize);
    if (fs < 12) out.push(['TINY', name(e), fs + 'px', txt(e).slice(0,24)]);
  }

  const broken = [...document.images].filter(i => i.complete && i.naturalWidth === 0).length;
  return {out, broken, sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth,
          h: document.documentElement.scrollHeight};
}
"""

with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome')
    total = 0
    for slug in slugs:
        for W in widths:
            pg = b.new_page(viewport={'width': W, 'height': 820}, device_scale_factor=2,
                            is_mobile=True, has_touch=True)
            errs = []
            pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
            # "artist-a/about" 처럼 슬래시를 주면 그 페이지를, 아니면 index.html 을 연다
            path = (slug + '.html') if '/' in slug else (slug + '/index.html')
            pg.goto(f'file:///C:/web-project/mintcl-netlify-spa/public/templates/{path}',
                    wait_until='load')
            pg.wait_for_timeout(2200)
            H = pg.evaluate('document.documentElement.scrollHeight'); y = 0
            while y < H:
                pg.evaluate(f'window.scrollTo(0,{y})'); pg.wait_for_timeout(110); y += 600
            pg.evaluate('window.scrollTo(0,0)'); pg.wait_for_timeout(900)
            d = pg.evaluate(JS, W)
            rows = d['out']
            NOISE = ('TAP', 'TINY')
            # 같은 종류·같은 선택자는 한 번만
            uniq, key = [], set()
            for r in rows:
                k = (r[0], r[1], r[2])
                if k in key: continue
                key.add(k); uniq.append(r)
            hscroll = d['sw'] > d['cw']
            head = f"■ {slug} @{W}  높이 {d['h']}  가로스크롤 {'예' if hscroll else '아니오'}  깨진이미지 {d['broken']}  콘솔에러 {len(errs)}"
            print(head)
            hard = [r for r in uniq if r[0] not in NOISE]
            soft = [r for r in uniq if r[0] in NOISE]
            for r in hard:
                print(f"   [{r[0]:8s}] {r[1][:30]:30s} {r[2][:40]:40s} {r[3]}")
            if soft:
                tap = [r for r in soft if r[0] == 'TAP']
                tiny = [r for r in soft if r[0] == 'TINY']
                bits = []
                if tap: bits.append(f"탭타깃 40px 미만 {len(tap)}개(최소 {min(int(r[2].split('×')[1]) for r in tap)}px)")
                if tiny: bits.append(f"12px 미만 글자 {len(tiny)}개")
                print("   · " + " · ".join(bits))
            total += len(hard)
            if not hard: print("   줄바꿈·넘침 문제 없음")
            pg.close()
    b.close()
    print(f"\n총 지적 {total}건")
