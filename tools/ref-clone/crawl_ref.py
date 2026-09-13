# -*- coding: utf-8 -*-
"""모델링용으로 사이트를 페이지 틀별로 받는다.

  python crawl_ref.py <시작URL> <저장폴더> [--max 60] [--per 2] [--prefix /admin] [--login] [--mobile] [--wait 1800]

페이지마다 남기는 것
  raw/<이름>.html     서버가 보낸 원본 HTML (소스 보기와 같다)
  html/<이름>.html    스크립트가 돈 뒤의 DOM
  shots/<이름>.png    1440 폭 전체 캡처 (12000px 넘으면 -2, -3 으로 나눈다)
  geo/<이름>.tsv      geo.py 와 같은 형식의 요소 기하
  m/<이름>.*          --mobile 이면 390 폭·모바일 UA 로 한 번 더 (원본·DOM·캡처)
  assets/...          같은 도메인 CSS·JS (경로 그대로)
  _index.json · _skipped.json · _menu.json(--login)

--login   창을 띄워 시작URL 에서 사람이 직접 로그인할 때까지 기다린다. 비밀번호는 스크립트가 넣지 않는다.
--prefix  이 경로로 시작하는 링크만 따라간다.
--per     숫자만 다른 주소(매물 상세 1, 2, 3…)는 몇 개까지 받을지.

주소는 GET 으로 열기만 한다. 클릭·폼 전송은 없다.
삭제·로그아웃·내려받기·상태 변경으로 보이는 주소는 열지 않고 _skipped.json 에 남긴다.
"""
import io, os, re, sys, json, time, hashlib
from urllib.parse import urlparse, parse_qsl
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace', line_buffering=True)
from playwright.sync_api import sync_playwright

# 주소를 / _ - . ? & = 로 쪼갠 조각이 하나라도 여기 있으면 열지 않는다
DENY = set('''logout signout delete del remove destroy drop truncate reset restore backup
action proc process exec excel xls xlsx csv download export print send copy clone duplicate
approve reject toggle hide show sold complete withdraw leave move sort change status state
confirm cancel social oauth install uninstall'''.split())
# 쪽수·정렬·검색어는 틀을 늘리지 않는다
NOISE = {'page', 'per_page', 'p', 'pg', 'offset', 'limit', 'sort', 'order', 'orderby', 'sst', 'sod',
         'sfl', 'stx', 'keyword', 'search', 'q', 'v', 'ver', 't', '_'}
# 이 이름의 숫자 값은 게시판·종류를 가르므로 그대로 둔다 (bbs?category=1 과 2 는 다른 게시판)
KEEP = {'category', 'cate', 'type', 'kind', 'mode', 'tab', 'menu', 'gubun', 'bo_table', 'code', 'group'}
FILE = re.compile(r'\.(css|js|png|jpe?g|gif|webp|svg|ico|pdf|zip|hwpx?|xlsx?|docx?|pptx?|mp4|mov|webm|mp3|'
                  r'woff2?|ttf|otf|txt|xml|json)$', re.I)
MOBILE_UA = ('Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 '
             '(KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1')

SCROLL = """async()=>{
  const pick=()=>{let best=document.scrollingElement,h=document.documentElement.scrollHeight;
    for(const e of document.querySelectorAll('div,main,section')){
      const c=getComputedStyle(e);
      if((c.overflowY==='auto'||c.overflowY==='scroll')&&e.scrollHeight>h){best=e;h=e.scrollHeight;}}
    return best;};
  const el=pick(); const step=Math.round(innerHeight*0.8);
  for(let y=0;y<el.scrollHeight&&y<60000;y+=step){el.scrollTop=y;window.scrollTo(0,y);
    await new Promise(r=>setTimeout(r,140));}
  el.scrollTop=0;window.scrollTo(0,0);await new Promise(r=>setTimeout(r,700));
  window.__sc = el===document.scrollingElement ? null : el;
  return {scroller:el===document.scrollingElement?'window':el.tagName+'.'+String(el.className).split(' ')[0],
          height:el.scrollHeight, title:document.title};}"""

LINKS = """(host)=>{
  const out=new Set();
  const add=h=>{try{const x=new URL(h,location.href);
    if(x.host===host&&/^https?:$/.test(x.protocol)&&!/['+]|%27/.test(x.href)){x.hash='';out.add(x.href);}}catch(e){}};
  document.querySelectorAll('a[href]').forEach(a=>{const h=(a.getAttribute('href')||'').trim();
    if(h&&!/^(javascript:|#|mailto:|tel:|sms:)/i.test(h))add(a.href);});
  document.querySelectorAll('[onclick]').forEach(e=>{
    const m=(e.getAttribute('onclick')||'').match(/location\\.href\\s*=\\s*['"]([^'"]+)['"]/);if(m)add(m[1]);});
  return [...out];}"""

# 메뉴 트리: 사이드바·상단 메뉴 안의 링크를 글자·깊이와 함께
MENU = """()=>[...document.querySelectorAll('a[href]')]
  .filter(a=>a.closest('nav,aside,header,[class*=menu],[class*=nav],[class*=gnb],[class*=lnb],[class*=side]'))
  .map(a=>{let d=0,n=a;while((n=n.parentElement))if(n.tagName==='UL')d++;
    return {depth:d,text:(a.textContent||'').replace(/\\s+/g,' ').trim(),href:a.href};})"""

GEO = r"""
() => {
  const sc=window.__sc;
  const off = sc ? (sc.scrollTop - sc.getBoundingClientRect().top) : scrollY;
  const out=[];
  for (const e of document.querySelectorAll('body *')) {
    const cs=getComputedStyle(e);
    if(cs.display==='none'||cs.visibility==='hidden')continue;
    const r=e.getBoundingClientRect();
    if(r.width<2&&r.height<2)continue;
    let d=0,n=e; while(n.parentElement){d++;n=n.parentElement;}
    out.push([Math.round(r.top+off),Math.round(r.left),Math.round(r.width),Math.round(r.height),d,
      e.tagName.toLowerCase(), cs.backgroundColor.replace(/\s/g,''),
      cs.borderRadius.replace(/\s/g,''), cs.padding.replace(/\s+/g,''),
      (cs.rowGap+'/'+cs.columnGap).replace(/\s/g,''),
      (cs.borderTopWidth+cs.borderTopStyle+cs.borderTopColor).replace(/\s/g,''),
      cs.boxShadow==='none'?'-':cs.boxShadow.replace(/\s+/g,''),
      parseFloat(cs.fontSize)+'/'+(parseFloat(cs.lineHeight)||0)+' '+cs.fontWeight,
      cs.fontFamily.split(',')[0].replace(/["']/g,'').trim(),
      cs.color.replace(/\s/g,''), cs.opacity,
      (e.textContent||'').replace(/\s+/g,' ').trim().slice(0,44),
      cs.backgroundImage==='none'?'-':cs.backgroundImage.replace(/\s+/g,'').slice(0,90)]);
  }
  out.sort((a,b)=>a[0]-b[0]||a[4]-b[4]||a[1]-b[1]);
  return out;
}
"""


def tkey(u):
    s = urlparse(u)
    path = re.sub(r'/\d+(?=/|$)', '/{n}', s.path.rstrip('/') or '/')
    path = re.sub(r'/[0-9a-f]{12,}(?=/|$)', '/{h}', path, flags=re.I)
    q = sorted((k, v if (k.lower() in KEEP or not re.fullmatch(r'\d+', v)) else '{n}')
               for k, v in parse_qsl(s.query, keep_blank_values=True) if k.lower() not in NOISE)
    return path + ('?' + '&'.join('%s=%s' % kv for kv in q) if q else '')


def denied(u, extra):
    s = urlparse(u)
    toks = {t.lower() for t in re.split(r'[/_\-.?&=]+', s.path + '?' + s.query) if t}
    return sorted(toks & (DENY | extra))


class Names:
    def __init__(self):
        self.by = {}

    def __call__(self, u):
        s = urlparse(u)
        base = s.path.strip('/').replace('/', '_') or 'index'
        if s.query:
            base += '__' + s.query
        base = re.sub(r'[^0-9A-Za-z가-힣=_.-]+', '_', base)[:90]
        if self.by.get(base, u) != u:
            base += '-' + hashlib.md5(u.encode()).hexdigest()[:6]
        self.by[base] = u
        return base


def shoot(pg, base):
    h = pg.evaluate('()=>Math.max(document.documentElement.scrollHeight,document.body?document.body.scrollHeight:0)')
    w = pg.viewport_size['width']
    seg, n = 12000, 0
    for y in range(0, max(h, 1), seg):
        n += 1
        kw = {} if h <= seg else {'clip': {'x': 0, 'y': y, 'width': w, 'height': min(seg, h - y)}}
        pg.screenshot(path='%s%s.png' % (base, '' if n == 1 else '-%d' % n),
                      full_page=True, animations='disabled', **kw)
    return n


def save_assets(bucket, out, host, got):
    for r in bucket:
        try:
            u = urlparse(r.url)
            if u.netloc != host:
                continue
            rt, ct = r.request.resource_type, r.headers.get('content-type', '')
            if rt not in ('stylesheet', 'script') and not re.search(r'css|javascript', ct):
                continue
            path = u.path.lstrip('/') or 'index'
            if not re.search(r'\.(css|js)$', path, re.I):
                path += '.css' if (rt == 'stylesheet' or 'css' in ct) else '.js'
            if path in got:
                continue
            body = r.body()
            f = os.path.join(out, 'assets', *path.split('/'))
            os.makedirs(os.path.dirname(f), exist_ok=True)
            open(f, 'wb').write(body)
            got.add(path)
        except Exception:
            pass


def settle(pg):
    pg.wait_for_timeout(1500)
    return pg.evaluate(SCROLL)


def main():
    a = sys.argv[1:]
    if len(a) < 2:
        print(__doc__)
        return
    opt = lambda k, d: a[a.index(k) + 1] if k in a else d
    start, out = a[0], a[1]
    MAX, PER, WAIT = int(opt('--max', 60)), int(opt('--per', 2)), int(opt('--wait', 1800))
    PREFIX, LOGIN, MOBILE = opt('--prefix', '/'), '--login' in a, '--mobile' in a
    if not PREFIX.startswith('/'):      # Git Bash 는 /admin 을 C:/Program Files/Git/admin 으로 바꿔 넘긴다
        sys.exit('--prefix 가 %s 로 들어왔다. MSYS_NO_PATHCONV=1 을 앞에 붙여 실행할 것' % PREFIX)
    host = urlparse(start).netloc
    extra = {'login'} if LOGIN else set()
    for d in ('raw', 'html', 'shots', 'geo', 'assets') + (('m',) if MOBILE else ()):
        os.makedirs(os.path.join(out, d), exist_ok=True)

    name = Names()
    seen, count, saved, skipped, got = set(), {}, [], [], set()
    with sync_playwright() as p:
        b = p.chromium.launch(channel='chrome', headless=not LOGIN)
        ctx = b.new_context(viewport={'width': 1440, 'height': 900}, device_scale_factor=1,
                            accept_downloads=False, locale='ko-KR')
        pg = ctx.new_page()
        bucket = []
        pg.on('response', lambda r: bucket.append(r))
        pg.on('dialog', lambda d: d.dismiss())
        ctx.on('page', lambda np_: np_.close())       # 팝업 창은 닫는다

        queue = [start]
        if LOGIN:
            pg.goto(start, wait_until='domcontentloaded', timeout=60_000)
            print('[로그인 대기] 뜬 크롬 창에서 직접 로그인하세요. 최대 %d분 기다립니다.' % (WAIT // 60))
            t0 = time.time()
            try:
                while True:
                    path = urlparse(pg.url).path.lower()
                    if 'login' not in path and path.startswith(PREFIX):
                        break
                    if time.time() - t0 > WAIT:
                        print('[시간 초과] 로그인이 확인되지 않아 끝냅니다.')
                        b.close()
                        sys.exit(2)
                    pg.wait_for_timeout(1000)
            except Exception as e:
                print('[중단] 창이 닫혔습니다 (%s)' % str(e).splitlines()[0][:60])
                sys.exit(3)
            pg.wait_for_timeout(2500)
            print('[로그인 확인] %s' % pg.url)
            menu = pg.evaluate(MENU)
            io.open(os.path.join(out, '_menu.json'), 'w', encoding='utf-8').write(
                json.dumps(menu, ensure_ascii=False, indent=1))
            print('[메뉴] 링크 %d개 → _menu.json' % len(menu))
            queue = [pg.url] + [m['href'] for m in menu]

        while queue and len(saved) < MAX:
            u = queue.pop(0).split('#')[0]
            if u in seen:
                continue
            seen.add(u)
            s = urlparse(u)
            if s.netloc != host or not s.path.startswith(PREFIX) or FILE.search(s.path):
                continue
            hit = denied(u, extra)
            if hit:
                skipped.append({'url': u, 'why': 'deny:' + ','.join(hit)})
                continue
            if count.get(tkey(u), 0) >= PER:
                continue
            del bucket[:]
            try:
                resp = pg.goto(u, wait_until='load', timeout=45_000)
            except Exception as e:
                skipped.append({'url': u, 'why': 'open:' + str(e).splitlines()[0][:80]})
                continue
            final = pg.url.split('#')[0]
            fs = urlparse(final)
            if LOGIN and 'login' in fs.path.lower():
                print('[중단] 로그인이 풀렸습니다: %s' % u)
                break
            if fs.netloc != host:
                skipped.append({'url': u, 'why': 'redirect:' + final})
                continue
            ct = resp.headers.get('content-type', '') if resp else ''
            if resp and 'html' not in ct:
                skipped.append({'url': u, 'why': 'type:' + ct})
                continue
            k = tkey(final)
            if final != u and (final in seen or count.get(k, 0) >= PER):
                continue
            seen.add(final)
            try:
                raw = resp.text() if resp else ''     # 스크립트가 다른 주소로 넘기면 본문이 사라진다 — 먼저 읽는다
            except Exception:
                raw = ''
            try:
                info = settle(pg)
                moved = pg.url.split('#')[0]
                if moved != final:                   # 자바스크립트로 넘어간 중간 주소(ItemReDirect)는 도착지로 받는다
                    skipped.append({'url': final, 'why': 'js-redirect:' + moved})
                    queue.append(moved)
                    continue
                nm = name(final)
                io.open(os.path.join(out, 'raw', nm + '.html'), 'w', encoding='utf-8').write(raw)
                io.open(os.path.join(out, 'html', nm + '.html'), 'w', encoding='utf-8').write(pg.content())
                nshot = shoot(pg, os.path.join(out, 'shots', nm))
                rows = pg.evaluate(GEO)
                with io.open(os.path.join(out, 'geo', nm + '.tsv'), 'w', encoding='utf-8') as f:
                    f.write('#doc\t%d\n' % info['height'])
                    for r in rows:
                        f.write('\t'.join(str(x) for x in r) + '\n')
                save_assets(bucket, out, host, got)
                links = pg.evaluate(LINKS, host)
            except Exception as e:
                skipped.append({'url': final, 'why': 'save:' + str(e).splitlines()[0][:80]})
                continue
            count[k] = count.get(k, 0) + 1
            saved.append({'url': final, 'key': k, 'name': nm, 'title': info['title'],
                          'height': info['height'], 'shots': nshot, 'raw': len(raw)})
            print('%3d  %-52s 높이 %6d  %s' % (len(saved), (fs.path + ('?' + fs.query if fs.query else ''))[:52],
                                              info['height'], info['title'][:30]))
            for l in links:
                if l not in seen:
                    queue.append(l)
            pg.wait_for_timeout(600)

        if MOBILE:
            mctx = b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=1, is_mobile=True,
                                 has_touch=True, user_agent=MOBILE_UA, accept_downloads=False, locale='ko-KR')
            mp = mctx.new_page()
            mb = []
            mp.on('response', lambda r: mb.append(r))
            mp.on('dialog', lambda d: d.dismiss())
            mctx.on('page', lambda np_: np_.close())
            for it in saved:
                del mb[:]
                try:
                    resp = mp.goto(it['url'], wait_until='load', timeout=45_000)
                    info = settle(mp)
                    base = os.path.join(out, 'm', it['name'])
                    io.open(base + '.raw.html', 'w', encoding='utf-8').write(resp.text() if resp else '')
                    io.open(base + '.html', 'w', encoding='utf-8').write(mp.content())
                    shoot(mp, base)
                    save_assets(mb, out, host, got)
                    it['m_height'] = info['height']
                    print('  m  %-52s 높이 %6d' % (urlparse(it['url']).path[:52], info['height']))
                except Exception as e:
                    skipped.append({'url': it['url'], 'why': 'mobile:' + str(e).splitlines()[0][:80]})
                mp.wait_for_timeout(600)
        b.close()

    io.open(os.path.join(out, '_index.json'), 'w', encoding='utf-8').write(
        json.dumps(saved, ensure_ascii=False, indent=1))
    io.open(os.path.join(out, '_skipped.json'), 'w', encoding='utf-8').write(
        json.dumps(skipped, ensure_ascii=False, indent=1))
    print('\n저장 %d쪽 · 틀 %d개 · CSS/JS %d개 · 건너뜀 %d개 → %s' %
          (len(saved), len(count), len(got), len(skipped), out))


main()
