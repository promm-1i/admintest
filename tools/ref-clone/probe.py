# 컴포넌트 안쪽 실측 — 레퍼런스(라이브 URL)와 결과물(URL 또는 파일)에서 같은 요소를 텍스트로 찾아
# 글꼴·배경·라운드·패딩·블롭(blur/opacity)·SVG/IMG 크기·애니메이션을 나란히 뽑는다.
#   python probe.py <ref-url> <impl-url-or-path> <targets.json>
#   targets.json: [["120K 카드", "120K", "12만", 3], ...]   (라벨, 레퍼런스 텍스트, 결과물 텍스트, 카드 컨테이너까지 올라갈 단계)
# 레이아웃 박스(audit.py)만 재고 카드 안쪽을 눈대중으로 그리면 clipcut(video-a)처럼 "치수는 맞는데 디자인이 다른" 결과가 난다.
import asyncio, json, sys, os
from playwright.async_api import async_playwright

JS = r"""
(args) => {
  const [txt, up] = args;
  const norm = s => (s||'').replace(/\s+/g,'');
  let el = [...document.querySelectorAll('body *')].filter(e => e.children.length < 6 && norm(e.textContent) === norm(txt))[0];
  if (!el) { const c = [...document.querySelectorAll('body *')].filter(e => (e.textContent||'').includes(txt) && e.children.length < 8); el = c[c.length-1]; }
  if (!el) return { err: 'not found: ' + txt };
  let box = el; for (let i = 0; i < up; i++) { if (box.parentElement) box = box.parentElement; }
  let card = el;
  for (let i = 0; i < 8 && card; i++) { const s = getComputedStyle(card);
    if ((s.backgroundColor !== 'rgba(0, 0, 0, 0)' && s.backgroundColor !== 'transparent') || s.backgroundImage !== 'none' || parseFloat(s.borderRadius) > 0 || s.boxShadow !== 'none') break;
    card = card.parentElement; }
  const cont = card || box;
  const cs = e => { const s = getComputedStyle(e), r = e.getBoundingClientRect(); return {
    tag: e.tagName, w: Math.round(r.width), h: Math.round(r.height), bg: s.backgroundColor, bgimg: s.backgroundImage.slice(0, 120),
    border: s.border, radius: s.borderRadius, shadow: s.boxShadow.slice(0, 80), backdrop: s.backdropFilter, filter: s.filter, opacity: s.opacity,
    font: s.fontSize + '/' + s.lineHeight + ' ' + s.fontWeight + ' ' + s.fontFamily.split(',')[0] + ' ls' + s.letterSpacing, color: s.color, pad: s.padding }; };
  const texts = [...cont.querySelectorAll('*')].filter(e => e.children.length === 0 && (e.textContent||'').trim()).slice(0, 12)
    .map(e => { const s = getComputedStyle(e); return { t: e.textContent.trim().slice(0, 24), font: s.fontSize + '/' + s.lineHeight + ' ' + s.fontWeight + ' ' + s.fontFamily.split(',')[0], color: s.color, op: s.opacity }; });
  const media = [...cont.querySelectorAll('img,video,svg,canvas')].slice(0, 10).map(m => { const r = m.getBoundingClientRect();
    return { tag: m.tagName, w: Math.round(r.width), h: Math.round(r.height), src: (m.currentSrc || m.getAttribute('src') || '').slice(-70), vb: m.getAttribute && m.getAttribute('viewBox') }; });
  const blobs = [...cont.querySelectorAll('*')].filter(e => { const s = getComputedStyle(e); return s.backgroundImage.includes('gradient') || parseFloat(s.filter.replace(/[^0-9.]/g, '')) > 5 || (s.position === 'absolute' && s.backgroundColor !== 'rgba(0, 0, 0, 0)'); })
    .slice(0, 8).map(e => { const s = getComputedStyle(e), r = e.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), bg: s.backgroundColor, bgimg: s.backgroundImage.slice(0, 120), filter: s.filter, opacity: s.opacity, pos: s.position, radius: s.borderRadius, l: Math.round(r.left - cont.getBoundingClientRect().left), t: Math.round(r.top - cont.getBoundingClientRect().top) }; });
  const anim = [...cont.querySelectorAll('*')].filter(e => { const s = getComputedStyle(e); return s.animationName !== 'none' || (s.transitionDuration !== '0s' && s.transitionProperty !== 'all'); })
    .slice(0, 8).map(e => { const s = getComputedStyle(e); return { tag: e.tagName, anim: s.animationName + ' ' + s.animationDuration + ' ' + s.animationTimingFunction + ' x' + s.animationIterationCount, trans: s.transitionProperty.slice(0, 50) + ' ' + s.transitionDuration + ' ' + s.transitionTimingFunction.slice(0, 40) }; });
  return { card: cs(cont), texts, media, blobs, animated: anim, cardText: cont.innerText.replace(/\s+/g, ' ').slice(0, 140) };
}
"""

async def sample_motion(pg, txt):
    """등장 애니메이션: 요소를 뷰포트 아래에서 끌어올린 뒤 2.4초 동안 transform/opacity/filter 변화를 100ms 간격으로 찍는다."""
    try:
        el = await pg.query_selector(f'text="{txt}"')
        if not el: return []
        await pg.evaluate("e => window.scrollTo(0, e.getBoundingClientRect().top + scrollY - innerHeight + 120)", el)
        out = []
        for i in range(24):
            out.append(await pg.evaluate("e => { const s = getComputedStyle(e); return s.opacity + '|' + s.transform + '|' + s.filter }", el))
            await pg.wait_for_timeout(100)
        seen, comp = None, []
        for i, v in enumerate(out):
            if v != seen: comp.append(f'{i*100}ms {v}'); seen = v
        return comp[:12]
    except Exception as e:
        return [str(e)]

async def probe(pg, txt, up):
    try:
        el = await pg.query_selector(f'text="{txt}"')
        if el: await el.scroll_into_view_if_needed(); await pg.wait_for_timeout(1800)
    except Exception: pass
    return await pg.evaluate(JS, [txt, up])

async def main():
    ref, imp, tfile = sys.argv[1], sys.argv[2], sys.argv[3]
    if os.path.isfile(imp): imp = 'file:///' + os.path.abspath(imp).replace(os.sep, '/')
    targets = json.load(open(tfile, encoding='utf-8'))
    async with async_playwright() as p:
        b = await p.chromium.launch(channel='chrome')
        out = {}
        for name, url in (('REF', ref), ('IMP', imp)):
            pg = await (await b.new_context(viewport={'width': 1440, 'height': 900})).new_page()
            await pg.goto(url, wait_until='load', timeout=60000); await pg.wait_for_timeout(2500)
            for y in range(0, 8000, 400):
                await pg.evaluate(f'window.scrollTo(0,{y})'); await pg.wait_for_timeout(120)
            out[name] = {}
            for label, rt, it, up in targets:
                t = rt if name == 'REF' else it
                r = await probe(pg, t, up)
                r['motion'] = await sample_motion(pg, t)
                out[name][label] = r
        await b.close()
    for label, *_ in targets:
        print('=' * 24, label)
        for side in ('REF', 'IMP'):
            print(f'--- {side}'); print(json.dumps(out[side][label], ensure_ascii=False, indent=1))
    json.dump(out, open(os.path.splitext(tfile)[0] + '.result.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

asyncio.run(main())
