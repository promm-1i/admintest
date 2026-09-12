# -*- coding: utf-8 -*-
"""자바스크립트를 실행한 뒤의 HTML 을 페이지마다 저장한다 — SPA 용 HTTrack.

HTTrack 은 서버 응답만 저장한다. 서버렌더 사이트(프레이머·Next.js SSR)면 그걸로 충분하지만,
브라우저에서 그리는 부분은 못 받고 링크를 안 따라가는 라우트도 놓친다
(직방: 162개 받았는데 실제 페이지는 공지사항 1개뿐이었다. 메인은 SSR 이라 제대로 받아졌다).
이건 실제 브라우저로 열어 끝까지 스크롤한 뒤의 DOM 을 저장하므로 어느 쪽이든 화면 그대로 나온다.

  python crawl_spa.py <시작URL> <저장폴더> [--max 30] [--same-host] [--list a,b,c]

  --list  를 주면 링크를 따라가지 않고 그 경로들만 받는다
  안쪽 div 가 스크롤하는 사이트(직방)도 컨테이너를 찾아 같이 훑는다
"""
import io, os, re, sys, json
from urllib.parse import urljoin, urlparse
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
from playwright.sync_api import sync_playwright

SCROLL = """async()=>{
  const pick=()=>{let best=document.scrollingElement,h=document.documentElement.scrollHeight;
    for(const e of document.querySelectorAll('div,main,section')){
      const c=getComputedStyle(e);
      if((c.overflowY==='auto'||c.overflowY==='scroll')&&e.scrollHeight>h){best=e;h=e.scrollHeight;}}
    return best;};
  const el=pick(); const step=Math.round(innerHeight*0.8);
  for(let y=0;y<el.scrollHeight;y+=step){el.scrollTop=y;window.scrollTo(0,y);
    await new Promise(r=>setTimeout(r,140));}
  el.scrollTop=0;window.scrollTo(0,0);await new Promise(r=>setTimeout(r,500));
  return {scroller:el===document.scrollingElement?'window':el.tagName+'.'+String(el.className).split(' ')[0],
          height:el.scrollHeight};}"""

LINKS = """(host)=>[...document.querySelectorAll('a[href]')].map(a=>a.href)
  .filter(h=>{try{const u=new URL(h);return u.host===host&&!u.hash&&/^https?:/.test(u.protocol);}catch(e){return false;}})"""

def slug(u):
    p = urlparse(u).path.strip('/')
    return (p.replace('/', '_') or 'index') + '.html'

def main():
    a = sys.argv[1:]
    if len(a) < 2:
        print(__doc__); return
    start, out = a[0], a[1]
    mx = int(a[a.index('--max') + 1]) if '--max' in a else 20
    only = a[a.index('--list') + 1].split(',') if '--list' in a else None
    host = urlparse(start).netloc
    os.makedirs(out, exist_ok=True)

    queue = [urljoin(start, p) for p in only] if only else [start]
    seen, saved = set(), []
    with sync_playwright() as p:
        b = p.chromium.launch(channel='chrome')
        pg = b.new_page(viewport={'width': 1440, 'height': 900})
        while queue and len(saved) < mx:
            u = queue.pop(0)
            if u in seen: continue
            seen.add(u)
            try:
                pg.goto(u, wait_until='networkidle', timeout=30_000)
            except Exception as e:
                print('  건너뜀 %s (%s)' % (u, str(e)[:40])); continue
            pg.wait_for_timeout(900)
            info = pg.evaluate(SCROLL)
            html = pg.content()
            body = re.sub(r'<script.*?</script>', '', html, flags=re.S)
            body = re.sub(r'<style.*?</style>', '', body, flags=re.S)
            text = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', body)).strip()
            f = os.path.join(out, slug(u))
            io.open(f, 'w', encoding='utf-8').write(html)
            saved.append({'url': u, 'file': os.path.basename(f), 'text': len(text),
                          'height': info['height'], 'scroller': info['scroller']})
            print('  %-46s 본문 %5d자  높이 %5d  (%s)' %
                  (urlparse(u).path or '/', len(text), info['height'], info['scroller']))
            if not only:
                for l in pg.evaluate(LINKS, host):
                    if l not in seen and l not in queue: queue.append(l)
        b.close()
    io.open(os.path.join(out, '_index.json'), 'w', encoding='utf-8').write(
        json.dumps(saved, ensure_ascii=False, indent=1))
    print('\n%d개 저장 → %s' % (len(saved), out))

main()
