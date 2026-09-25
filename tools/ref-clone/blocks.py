# -*- coding: utf-8 -*-
"""섹션 구성표를 기계로 뽑는다 — 캡처를 눈으로 훑어 적던 2단계를 대신한다.

  python blocks.py <url> [폭] [--depth 3] [--json 파일]

쪽마다 찍는 것
  · 섹션(최상위 블록) 목록 — 클래스·y·높이·배경·패딩
  · 섹션 안 직계 블록 — 제목(글자크기/굵기/행간/색)·반복 항목 수·카드 상자(폭×높이·라운드·패딩·배경)
  · 이미지 슬롯 — 표시 크기와 파일명
  · 탭·아코디언·폼 칸 수

왜: 셈루트에서 서브 19쪽을 "메인이 맞으니 맞겠지" 하고 넘겨 요금 배너·후기 탭 6개·FAQ 탭 5개를 빠뜨렸다.
    사람이 캡처를 훑는 한 같은 누락이 또 난다. 세는 일은 기계가 한다.
"""
import io
import json
import sys

from playwright.sync_api import sync_playwright

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

JS = r"""
(maxDepth) => {
  const px = v => Math.round(parseFloat(v) || 0);
  const cls = e => (typeof e.className === 'string' ? e.className : '').trim()
                     .split(/\s+/).filter(Boolean).slice(0, 3).join('.');
  const vis = e => { const s = getComputedStyle(e);
    return s.display !== 'none' && s.visibility !== 'hidden' && e.getBoundingClientRect().height > 4; };
  const box = e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e);
    return { y: Math.round(r.top + scrollY), x: Math.round(r.left), w: Math.round(r.width),
             h: Math.round(r.height),
             bg: s.backgroundColor === 'rgba(0, 0, 0, 0)' ? '' : s.backgroundColor,
             bgi: s.backgroundImage === 'none' ? '' : s.backgroundImage.slice(0, 60),
             pad: [s.paddingTop, s.paddingRight, s.paddingBottom, s.paddingLeft].map(px).join(' '),
             rad: px(s.borderTopLeftRadius), gap: px(s.gap) }; };
  const type = e => { const s = getComputedStyle(e);
    return { fs: px(s.fontSize), fw: s.fontWeight, lh: s.lineHeight, ls: s.letterSpacing,
             col: s.color, fam: s.fontFamily.split(',')[0].replace(/"/g, '') }; };

  // 같은 부모 아래 같은 태그·클래스가 3개 이상이면 '반복 항목'으로 묶는다
  const repeats = e => {
    const by = {};
    [...e.children].filter(vis).forEach(c => {
      const k = c.tagName + '.' + cls(c);
      (by[k] = by[k] || []).push(c);
    });
    return Object.entries(by).filter(([, v]) => v.length >= 3)
      .map(([k, v]) => ({ key: k, n: v.length, box: box(v[0]) }));
  };

  const heads = e => [...e.querySelectorAll('h1,h2,h3,h4,strong,em')]
    .filter(vis).slice(0, 4)
    .map(h => ({ tag: h.tagName, t: (h.innerText || '').trim().slice(0, 46), ...type(h) }));

  const imgs = e => [...e.querySelectorAll('img')].filter(vis).slice(0, 6).map(i => {
    const r = i.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height),
             f: (i.currentSrc || i.src || '').split('/').pop().split('?')[0].slice(-34) }; });

  const out = [];
  const walk = (e, d) => {
    if (d > maxDepth || !vis(e)) return;
    const b = box(e);
    if (b.w < 200 || b.h < 40) return;
    out.push({ d: d, tag: e.tagName, cls: cls(e), ...b,
               heads: d <= 2 ? heads(e) : [], rep: repeats(e), imgs: d >= 1 ? imgs(e) : [] });
    [...e.children].forEach(c => walk(c, d + 1));
  };
  const root = document.querySelector('main') || document.body;
  [...root.children].forEach(c => walk(c, 0));

  const forms = [...document.querySelectorAll('input,select,textarea')].filter(vis)
    .map(f => f.tagName + ':' + (f.type || '') + ':' + (f.name || ''));

  // main 밖에 떠 있는 것 — 퀵바·플로팅 버튼·고정 배너.
  // 본아이에프의 브랜드 퀵바(body 직계 sticky)를 놓쳐서 넣었다.
  // 높이 0 짜리 sticky 껍데기 안에 막대를 넣어 띄우는 방식이 흔하다(본아이에프 퀵바).
  // 높이로 거르면 그 껍데기째 사라지므로, 비면 자식 상자를 대신 본다.
  const float = [...document.querySelectorAll('body *')].filter(e => {
    const s = getComputedStyle(e);
    if (!/fixed|sticky/.test(s.position)) return false;
    if (s.display === 'none' || s.visibility === 'hidden') return false;
    return !e.closest('header') && !e.closest('nav');
  }).slice(0, 10).map(e => {
    const s = getComputedStyle(e);
    let r = e.getBoundingClientRect(), who = e;
    if (r.height < 24 && e.firstElementChild) {
      who = e.firstElementChild; r = who.getBoundingClientRect();
    }
    const cs = getComputedStyle(who);
    return { cls: e.tagName.toLowerCase() + (cls(e) ? '.' + cls(e) : '')
                  + (who !== e ? ' > ' + who.tagName.toLowerCase() + '.' + cls(who) : ''),
             pos: s.position,
             w: Math.round(r.width), h: Math.round(r.height), top: s.top, bottom: s.bottom,
             bg: cs.backgroundColor, rad: cs.borderTopLeftRadius, z: s.zIndex,
             t: (e.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 60) }; })
    .filter(f => f.w >= 80 && f.h >= 20);

  return { float: float, doc: document.documentElement.scrollHeight,
           wide: document.documentElement.scrollWidth,
           body: getComputedStyle(document.body).fontFamily,
           forms: forms, blocks: out };
}
"""


def main():
    a = sys.argv[1:]
    if not a:
        print(__doc__)
        return
    url = a[0]
    w = int(a[1]) if len(a) > 1 and a[1].isdigit() else 1440
    depth = int(a[a.index('--depth') + 1]) if '--depth' in a else 3
    dump = a[a.index('--json') + 1] if '--json' in a else None

    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={'width': w, 'height': 960}, locale='ko-KR')
        pg.goto(url, wait_until='load', timeout=60_000)
        pg.wait_for_timeout(2200)
        pg.evaluate("()=>window.scrollTo(0,document.body.scrollHeight)")
        pg.wait_for_timeout(1800)
        pg.evaluate("()=>window.scrollTo(0,0)")
        pg.wait_for_timeout(1200)
        # 등장 애니메이션이 안 끝난 상태로 재면 좌표가 통째로 어긋난다.
        # (AOS fade-up 은 시작 위치가 +100px 이라 섹션이 100px 아래로 읽힌다)
        pg.evaluate("""()=>{
          document.querySelectorAll('[data-aos]').forEach(e=>{
            e.classList.add('aos-animate'); e.style.transition='none';});
          document.querySelectorAll('[data-animation]').forEach(e=>{
            e.style.opacity=1; e.style.transform='none'; e.style.transition='none';});
          document.querySelectorAll('[data-rv]').forEach(e=>{
            e.classList.add('on'); e.style.transition='none';});
        }""")
        pg.wait_for_timeout(600)
        r = pg.evaluate(JS, depth)
        b.close()

    print('%s  폭%d  문서 %dpx (가로 %d)  본문글꼴 %s'
          % (url, w, r['doc'], r['wide'], r['body'].split(',')[0]))
    for f in r['blocks']:
        ind = '  ' * f['d']
        print('%s%s%s  y%d h%d w%d%s%s%s%s'
              % (ind, f['tag'].lower(), ('.' + f['cls']) if f['cls'] else '',
                 f['y'], f['h'], f['w'],
                 ('  bg%s' % f['bg']) if f['bg'] else '',
                 ('  pad%s' % f['pad']) if f['pad'] != '0 0 0 0' else '',
                 ('  r%d' % f['rad']) if f['rad'] else '',
                 ('  gap%d' % f['gap']) if f['gap'] else ''))
        for h in f['heads']:
            print('%s  · %s %dpx/%s %s %s  "%s"'
                  % (ind, h['tag'], h['fs'], h['lh'], h['fw'], h['col'], h['t']))
        for q in f['rep']:
            print('%s  × %d개  %s  %dx%d%s%s'
                  % (ind, q['n'], q['key'], q['box']['w'], q['box']['h'],
                     ('  r%d' % q['box']['rad']) if q['box']['rad'] else '',
                     ('  pad%s' % q['box']['pad']) if q['box']['pad'] != '0 0 0 0' else ''))
        for i in f['imgs']:
            print('%s  img %dx%d  %s' % (ind, i['w'], i['h'], i['f']))
    for f in r.get('float', []):
        print('떠있음 %s  %s %dx%d  top:%s bottom:%s  bg%s r%s z%s  "%s"'
              % (f['cls'], f['pos'], f['w'], f['h'], f['top'], f['bottom'],
                 f['bg'], f['rad'], f['z'], f['t']))
    if r['forms']:
        print('폼 칸 %d개: %s' % (len(r['forms']), ', '.join(r['forms'][:24])))
    if dump:
        io.open(dump, 'w', encoding='utf-8').write(json.dumps(r, ensure_ascii=False, indent=1))
        print('→ %s' % dump)


if __name__ == '__main__':
    main()
