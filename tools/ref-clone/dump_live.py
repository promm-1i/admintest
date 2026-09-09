# 라이브 페이지 전체 요소 computed style 덤프 (실제 Chrome, 1440x900, 등장 애니메이션 끝낸 뒤)
#   python dump_live.py <url> <out.json> [width]
import json, sys
from playwright.sync_api import sync_playwright

JS = r"""
() => {
  const out = [];
  const T = (e) => [...e.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').replace(/\s+/g, ' ').trim();
  const walk = (e, depth) => {
    for (const c of e.children) {
      const r = c.getBoundingClientRect();
      const s = getComputedStyle(c);
      const tag = c.tagName.toLowerCase();
      if (tag === 'script' || tag === 'style' || tag === 'link' || tag === 'noscript') continue;
      const txt = T(c);
      const media = ['img','svg','video','input','button','textarea','canvas','iframe'].includes(tag);
      const hasBg = s.backgroundColor !== 'rgba(0, 0, 0, 0)' || s.backgroundImage !== 'none';
      const hasBorder = parseFloat(s.borderTopWidth) > 0 || parseFloat(s.borderBottomWidth) > 0 || parseFloat(s.borderLeftWidth) > 0 || parseFloat(s.borderRightWidth) > 0;
      const vis = r.width > 0 && r.height > 0 && s.display !== 'none' && s.visibility !== 'hidden';
      if (vis && (txt || media || hasBg || hasBorder || parseFloat(s.borderRadius) > 0 || s.boxShadow !== 'none' || s.display.includes('flex') || s.display.includes('grid'))) {
        out.push({
          d: depth, tag, id: c.id || undefined, fn: c.getAttribute('data-framer-name') || undefined, cls: (c.className && typeof c.className === 'string') ? c.className.slice(0, 60) : undefined,
          x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height),
          txt: txt ? txt.slice(0, 60) : undefined,
          font: txt || tag === 'input' ? (s.fontFamily.split(',')[0].replace(/"/g,'') + ' ' + s.fontSize + '/' + s.lineHeight + ' ' + s.fontWeight + ' ls' + s.letterSpacing + ' ' + s.textAlign + (s.textTransform !== 'none' ? ' ' + s.textTransform : '') + (s.fontStyle !== 'normal' ? ' ' + s.fontStyle : '')) : undefined,
          color: txt || tag === 'input' || tag === 'svg' ? s.color : undefined,
          bg: s.backgroundColor !== 'rgba(0, 0, 0, 0)' ? s.backgroundColor : undefined,
          bgimg: s.backgroundImage !== 'none' ? s.backgroundImage.slice(0, 100) : undefined,
          border: hasBorder ? s.borderTop + ' | ' + s.borderBottom + ' | ' + s.borderLeft + ' | ' + s.borderRight : undefined,
          radius: parseFloat(s.borderRadius) > 0 ? s.borderRadius : undefined,
          pad: s.padding !== '0px' ? s.padding : undefined,
          margin: s.margin !== '0px' ? s.margin : undefined,
          op: s.opacity !== '1' ? s.opacity : undefined,
          pos: s.position !== 'static' ? s.position + ' t' + s.top + ' l' + s.left + ' r' + s.right + ' b' + s.bottom + ' z' + s.zIndex : undefined,
          disp: s.display.includes('flex') || s.display.includes('grid') ? s.display + ' ' + s.flexDirection + ' gap' + s.gap + ' jc:' + s.justifyContent + ' ai:' + s.alignItems + (s.gridTemplateColumns !== 'none' ? ' cols:' + s.gridTemplateColumns : '') + (s.flexWrap !== 'nowrap' ? ' ' + s.flexWrap : '') : undefined,
          size: s.width + 'x' + s.height + (s.maxWidth !== 'none' ? ' max' + s.maxWidth : '') + (s.minHeight !== '0px' ? ' minH' + s.minHeight : '') + (s.aspectRatio !== 'auto' ? ' ar' + s.aspectRatio : ''),
          flex: s.flex !== '0 1 auto' ? s.flex : undefined,
          fit: tag === 'img' || tag === 'video' ? s.objectFit + ' ' + s.objectPosition : undefined,
          src: tag === 'img' ? (c.currentSrc || c.src).slice(-80) : tag === 'video' ? (c.currentSrc || c.src).slice(-60) : undefined,
          nat: tag === 'img' ? c.naturalWidth + 'x' + c.naturalHeight : undefined,
          vb: tag === 'svg' ? c.getAttribute('viewBox') : undefined,
          svg: tag === 'svg' ? c.outerHTML.slice(0, 600) : undefined,
          shadow: s.boxShadow !== 'none' ? s.boxShadow : undefined,
          tf: s.transform !== 'none' ? s.transform : undefined,
          trans: s.transitionDuration !== '0s' ? s.transitionProperty.slice(0, 40) + ' ' + s.transitionDuration + ' ' + s.transitionTimingFunction : undefined,
          anim: s.animationName !== 'none' ? s.animationName + ' ' + s.animationDuration + ' ' + s.animationTimingFunction + ' ' + s.animationIterationCount : undefined,
          ov: s.overflow !== 'visible' ? s.overflow : undefined,
          cursor: s.cursor !== 'auto' ? s.cursor : undefined,
          ph: tag === 'input' ? c.placeholder : undefined,
          href: tag === 'a' ? c.getAttribute('href') : undefined,
        });
      }
      if (tag !== 'svg') walk(c, depth + 1);
    }
  };
  walk(document.body, 0);
  const hdr = document.querySelector('header, [data-framer-name*="eader"], nav');
  return { docH: document.documentElement.scrollHeight, bodyBg: getComputedStyle(document.body).backgroundColor, htmlBg: getComputedStyle(document.documentElement).backgroundColor,
           headerPos: hdr ? getComputedStyle(hdr).position : null, fonts: [...document.fonts].map(f => f.family + ' ' + f.weight + ' ' + f.style + ' ' + f.status).filter((v,i,a)=>a.indexOf(v)===i), els: out };
}
"""

url, outp = sys.argv[1], sys.argv[2]
W = int(sys.argv[3]) if len(sys.argv) > 3 else 1440
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome')
    pg = b.new_context(viewport={'width': W, 'height': 900}).new_page()
    pg.goto(url, wait_until='load', timeout=60000); pg.wait_for_timeout(2500)
    H = pg.evaluate('document.documentElement.scrollHeight')
    for y in range(0, H + 900, 300):
        pg.evaluate(f'window.scrollTo(0,{y})'); pg.wait_for_timeout(150)
    pg.wait_for_timeout(1500)
    pg.evaluate('window.scrollTo(0,0)'); pg.wait_for_timeout(1500)
    res = pg.evaluate(JS)
    b.close()
json.dump(res, open(outp, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('docH', res['docH'], 'body', res['bodyBg'], 'html', res['htmlBg'], 'header', res['headerPos'], 'els', len(res['els']))
print('fonts:', *res['fonts'], sep='\n  ')
for e in res['els']:
    keys = ['txt','font','color','bg','bgimg','border','radius','pad','margin','op','pos','disp','size','flex','fit','src','nat','vb','shadow','tf','trans','anim','ov','ph','href']
    parts = [f'{k}={e[k]}' for k in keys if e.get(k) is not None]
    print(f"{'  '*e['d']}{e['tag']}{'#'+e['id'] if e.get('id') else ''}{'['+e['fn']+']' if e.get('fn') else ''} @{e['x']},{e['y']} {e['w']}x{e['h']} " + ' '.join(parts))
