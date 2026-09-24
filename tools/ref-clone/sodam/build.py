# -*- coding: utf-8 -*-
"""소담한의원(clinic-h) 페이지 조립기.

  python tools/ref-clone/sodam/build.py

pages/<파일>.html 조각(본문만)에 공통 머리·헤더·메가메뉴·전체메뉴·퀵·푸터를 붙여 public/sodam/<파일>.html 로 쓴다.
조각 첫 줄은 <!--meta {...json...}--> 이다.
  title   탭 제목 앞부분 (없으면 메뉴 이름)
  desc    meta description
  over    흰 글자 헤더를 유지할 요소 선택자 (히어로가 어두운 쪽)
  quick   퀵 메뉴를 띄울 기준 요소 선택자 (없으면 300px 스크롤)
  hero    서브 비주얼: {"img":..., "t":..., "d":...} · "flat" 이면 사진 없는 440 띠
  lnb     true 면 같은 묶음 메뉴 띠를 비주얼 아래에 붙인다
  css/js  이 쪽에서만 쓰는 스타일·스크립트 파일(pages/ 기준) — 인라인으로 넣는다
공통 부분을 고칠 때는 여기와 assets/site.css · site.js 만 고치고 다시 돌린다.
"""
import io, os, re, json, html

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(ROOT, '..', '..', '..', 'public', 'sodam'))
BRAND = '소담한의원'
BRAND_EN = 'SODAM KOREAN MEDICINE CLINIC'
TEL = '031-000-0000'
TEL_DOT = '031.000.0000'

MENU = [
    ('통증 · 추나클리닉', 'mega-1.jpg', [
        ('검사부터 다릅니다', 'diagnosis.html'), ('목 통증', 'neck-pain.html'), ('어깨 통증', 'shoulder-pain.html'),
        ('허리 통증', 'back-pain.html'), ('팔다리 · 관절 통증', 'limb-pain.html'), ('체형 교정', 'posture.html'),
        ('외상 · 수술 후 재활', 'rehab.html')]),
    ('다이어트 프로그램', 'mega-2.jpg', [
        ('소담 다이어트 원리', 'diet-principle.html'), ('상황별 맞춤 다이어트', 'diet-situation.html'),
        ('체형별 다이어트', 'diet-body-type.html'), ('지방분해 약침', 'lipolysis-injection.html'),
        ('소담 디톡스 프로그램', 'detox.html')]),
    ('스페셜 클리닉', 'mega-3.jpg', [
        ('피부 · 미용 클리닉', 'beauty-skin.html'), ('1:1 맞춤 치료 한약', 'custom-herbal.html'),
        ('면역 보약', 'immune-tonic.html'), ('내과 질환 클리닉', 'internal-medicine.html'),
        ('한방 마음건강 클리닉', 'mental-health.html')]),
    ('교통사고 후유증', 'mega-4.jpg', [
        ('교통사고 후유증', 'traffic-injury.html'), ('증상별 후유증 관리', 'traffic-symptoms.html'),
        ('어혈 집중 관리', 'bruise-care.html')]),
    ('치료 사례', 'mega-5.jpg', [
        ('전후 사진', 'before-after.html'), ('치료 후기', 'reviews.html')]),
    ('소담한의원', 'mega-6.jpg', [
        ('소담의 특별함', 'about.html'), ('의료진 소개', 'doctors.html'), ('커뮤니티', 'community.html'),
        ('병원 둘러보기', 'tour.html'), ('오시는 길', 'location.html')]),
]
EXTRA = {'community-view.html': 5, 'join.html': None, 'privacy.html': None, 'terms.html': None, 'nonpay.html': None}

def esc(s): return html.escape(s, quote=True)

ICON = {
 'mark': '<svg class="logo__mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4.5c-4.4 3.3-6.6 7-6.6 11 0 3.9 2.9 6.9 6.6 6.9s6.6-3 6.6-6.9c0-4-2.2-7.7-6.6-11Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M16 11v17.5M16 17.5l3.4-3M16 21.5l-3.4-3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M6 27.5c3.2-1.6 6.5-2.4 10-2.4s6.8.8 10 2.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
 'talk': '<svg viewBox="0 0 26 26" aria-hidden="true"><path fill="currentColor" d="M13 3C6.9 3 2 6.9 2 11.7c0 3.1 2 5.8 5.1 7.3l-1.1 4 4.5-2.9c.8.1 1.6.2 2.5.2 6.1 0 11-3.9 11-8.6S19.1 3 13 3Z"/><text x="13" y="14.6" font-size="6.2" font-weight="800" text-anchor="middle" fill="#F3F1EC" font-family="Arial">TALK</text></svg>',
 'naver': '<svg viewBox="0 0 26 26" aria-hidden="true"><rect x="3" y="3" width="20" height="20" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path fill="currentColor" d="M9 8h3l3 5V8h2.9v10H15l-3-5v5H9z"/></svg>',
 'blog': '<svg viewBox="0 0 26 26" aria-hidden="true"><path fill="currentColor" d="M5 4h2.6v6.3c.8-.9 1.9-1.4 3.2-1.4 2.8 0 4.6 2.2 4.6 5.3S13.6 19.6 10.8 19.6c-1.3 0-2.4-.5-3.2-1.4v1.1H5Zm5.2 7.3c-1.5 0-2.6 1.2-2.6 2.9s1.1 3 2.6 3 2.5-1.2 2.5-3-1-2.9-2.5-2.9ZM19 4h2.6v15.4H19z"/></svg>',
 'tel': '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1Z"/></svg>',
 'up': '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20V5M6 11l6-6 6 6" fill="none" stroke="#2C2C2C" stroke-width="1.6"/></svg>',
 'home': '<svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 2 2 8.6V18h5.5v-5h5v5H18V8.6Z"/></svg>',
 'pin': '<svg viewBox="0 0 18 18" aria-hidden="true"><path fill="currentColor" d="M9 1a6 6 0 0 0-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 0 0-6-6Zm0 8.2A2.2 2.2 0 1 1 9 4.8a2.2 2.2 0 0 1 0 4.4Z"/></svg>',
 'clock': '<svg viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="8" fill="currentColor"/><path d="M9 4.5V9l3 2" fill="none" stroke="#9c8058" stroke-width="1.6" stroke-linecap="round"/></svg>',
 'phone': '<svg viewBox="0 0 18 18" aria-hidden="true"><path fill="currentColor" d="M4.9 8.1a11.3 11.3 0 0 0 5 5l1.6-1.7c.2-.2.5-.3.8-.2.8.3 1.7.5 2.7.5.4 0 .8.3.8.7V15c0 .4-.4.8-.8.8A12.8 12.8 0 0 1 2.2 3c0-.4.4-.8.8-.8h2.6c.4 0 .8.4.8.8 0 1 .2 1.9.4 2.7.1.3 0 .6-.2.8Z"/></svg>',
 'x': '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="m1 1 12 12M13 1 1 13" stroke="#2C2C2C" stroke-width="1.6"/></svg>',
}

def logo(extra=''):
    return ('<span class="logo%s">%s<span class="logo__txt"><span class="logo__ko">%s</span>'
            '<span class="logo__en">%s</span></span></span>') % (extra, ICON['mark'], BRAND, BRAND_EN)

def group_of(fn):
    for gi, (_, _, items) in enumerate(MENU):
        for name, f in items:
            if f == fn: return gi, name
    if fn in EXTRA and EXTRA[fn] is not None:
        return EXTRA[fn], '커뮤니티'
    return None, None

def header(cur_g, meta):
    gnb = ''.join('<li%s><a href="./%s">%s</a></li>' % (' class="is-cur"' if gi == cur_g else '', items[0][1], esc(t))
                  for gi, (t, _, items) in enumerate(MENU))
    panes = ''
    for gi, (t, img, items) in enumerate(MENU):
        lis = ''.join('<li><a href="./%s">%s</a></li>' % (f, esc(n)) for n, f in items)
        panes += ('<div class="mega__pane"><img class="mega__bg" src="./assets/%s" alt="" loading="lazy" width="576" height="480">'
                  '<div class="mega__in"><p class="mega__t">%s</p><ul>%s</ul></div></div>') % (img, esc(t), lis)
    attrs = ''
    if meta.get('over'): attrs += ' data-over="%s"' % esc(meta['over'])
    if meta.get('quick'): attrs += ' data-quick="%s"' % esc(meta['quick'])
    if meta.get('autohide'): attrs += ' data-autohide="1"'
    mode = 'over' if meta.get('over') else 'top'
    return ('<a class="skip" href="#main">본문 바로가기</a>\n'
            '<header class="hd" data-mode="%s"%s>\n<div class="hd__in">\n'
            '<a href="./index.html" aria-label="%s 홈으로">%s</a>\n'
            '<nav aria-label="주 메뉴" style="margin-left:auto"><ul class="gnb">%s</ul></nav>\n'
            '<div class="hd__rt"><div class="hd__acc"><a href="./join.html">로그인</a><a href="./join.html">회원가입</a></div>'
            '<button class="hd__burger" type="button" data-smap aria-expanded="false" aria-label="전체 메뉴 열기"><i></i><i></i><i></i><i></i></button></div>\n'
            '</div>\n<div class="mega">%s</div>\n</header>\n') % (mode, attrs, BRAND, logo(), gnb, panes)

def sitemap():
    grps = ''.join('<div class="smap__grp"><p>%s</p><ul>%s</ul></div>' % (
        esc(t), ''.join('<li><a href="./%s">%s</a></li>' % (f, esc(n)) for n, f in items)) for t, _, items in MENU)
    return ('<div class="smap" role="dialog" aria-modal="true" aria-label="전체 메뉴">'
            '<div class="smap__bg"><img src="./assets/sitemap-bg.jpg" alt="" loading="lazy"></div>'
            '<div class="smap__list"><div class="smap__cols">%s</div>'
            '<div class="smap__pic"><button class="smap__x" type="button" data-smap-close aria-label="전체 메뉴 닫기">%s</button>'
            '<img src="./assets/mega-6.jpg" alt="" loading="lazy" width="380" height="560"></div></div>'
            '<button class="smap__x" type="button" data-smap-close aria-label="전체 메뉴 닫기" style="position:fixed;right:24px;top:24px;z-index:3">%s</button></div>\n') % (grps, ICON['x'], ICON['x'])

def quick():
    return ('<aside class="quick" aria-label="빠른 상담"><ul class="quick__list">'
            '<li><a href="#" data-demo>%s카톡 상담</a></li>'
            '<li><a href="#" data-demo>%s네이버 예약</a></li>'
            '<li><a href="#" data-demo>%s블로그</a></li>'
            '<li class="tel"><a href="tel:%s">%s%s</a></li></ul>'
            '<button class="quick__top" type="button" data-top aria-label="맨 위로">%s</button></aside>\n'
            '<nav class="mbar" aria-label="빠른 상담"><a href="#" data-demo>%s카톡 상담</a><a href="#" data-demo>%s네이버 예약</a>'
            '<a href="#" data-demo>%s블로그</a><a class="mbar__call" href="tel:%s">%s전화 상담</a></nav>\n') % (
        ICON['talk'], ICON['naver'], ICON['blog'], TEL, ICON['tel'], '<br>'.join(TEL_DOT.rsplit('.', 1)),
        ICON['up'], ICON['talk'], ICON['naver'], ICON['blog'], TEL, ICON['tel'])

def footer():
    return ('<footer class="ft">\n<img class="ft__bg" src="./assets/footer-bg.jpg" alt="" loading="lazy"><span class="ft__bg-tint"></span>\n'
            '<div class="wrap ft__main">\n<div class="ft__sum">\n'
            '<div class="ft__blk"><p class="ft__h">%s대표전화</p><a class="ft__tel" href="tel:%s">%s</a>'
            '<ul class="ft__dl"><li><b>상호명</b><span>%s</span></li><li><b>대표자</b><span>한도윤</span></li><li><b>사업자등록번호</b><span>000-00-00000</span></li></ul></div>\n'
            '<div class="ft__blk"><p class="ft__h">%s진료시간 안내</p><ul class="ft__dl ft__hours">'
            '<li><b><span>평</span><span>일</span></b><span>09:30 ~ 20:30</span></li>'
            '<li><b><span>주말 · 공휴일</span></b><span>09:30 ~ 16:30</span></li>'
            '<li><b><span>점</span><span>심</span><span>시</span><span>간</span></b><span>13:30 ~ 14:30</span></li></ul>'
            '<span class="ft__note">※ 주말과 공휴일은 점심시간 없이 진료합니다.</span></div>\n'
            '<div class="ft__copy"><p>Copyright © 2026 %s. All rights reserved.</p><p>홈페이지 디자인 예시 — 상호·연락처·주소는 가상의 정보입니다.</p></div>\n'
            '</div>\n<div class="ft__map"><p class="ft__h">%s오시는 길</p><span>경기도 성남시 분당구 소담로 00, 2층</span>'
            '<div class="ft__map-img"><img src="./assets/map.jpg" alt="소담한의원 위치 약도" loading="lazy" width="760" height="360"><a href="./location.html">자세히 보기</a></div></div>\n'
            '</div>\n<div class="ft__bot"><div class="wrap"><a href="./index.html" aria-label="%s 홈으로">%s</a>'
            '<nav class="ft__links" aria-label="약관"><a href="./privacy.html">개인정보처리방침</a><a href="./terms.html">이용약관</a><a href="./nonpay.html">비급여 진료비 안내</a></nav></div></div>\n'
            '</footer>\n') % (ICON['phone'], TEL, TEL_DOT, BRAND, ICON['clock'], BRAND, ICON['pin'], BRAND, logo())

def sub_hero(fn, meta, gi, name):
    h = meta.get('hero')
    if not h: return ''
    if h == 'flat': h = {'type': 'flat'}
    typ = h.get('type', 'photo')
    title = h.get('t') or esc(name or meta.get('title', ''))
    desc = ('<p class="%s__d">%s</p>' % ('sub-hero' if typ in ('photo', 'flat', 'flatc') else 'sub-' + typ, h['d'])) if h.get('d') else ''
    crumb = '<nav class="crumb" aria-label="현재 위치"><a href="./index.html" aria-label="홈">%s</a><i></i><span>%s</span><i></i><span>%s</span></nav>' % (
        ICON['home'], esc(MENU[gi][0]) if gi is not None else '안내', esc(name or meta.get('title', '')))
    img = lambda: '<img src="./assets/%s" alt="" width="1440" height="900" fetchpriority="high" data-shot="%s">' % (h['img'], esc(h.get('shot', '')))
    if typ in ('flat', 'flatc'):
        return ('<section class="sub-hero sub-hero--flat%s"><div class="wrap sub-hero__txt">%s<h1 class="sub-hero__t">%s</h1>%s</div></section>\n') % (
            ' sub-hero--flatc' if typ == 'flatc' else '', crumb, title, desc)
    if typ == 'curve':
        return ('<section class="sub-curve" id="subHero">%s<div class="sub-curve__box" aria-hidden="true"></div>'
                '<div class="wrap sub-curve__txt"><h1 class="sub-curve__t">%s</h1>%s%s</div></section>\n') % (
            img().replace('<img ', '<img class="sub-curve__img" '), title, desc, crumb)
    if typ == 'reveal':
        return ('<section class="sub-reveal" id="subHero"><div class="sub-reveal__stick"><div class="sub-reveal__img">%s</div>'
                '<div class="sub-reveal__txt"><h1 class="sub-reveal__t">%s</h1>%s%s</div></div></section>\n') % (img(), title, desc, crumb)
    ring = ('<span class="rot" aria-hidden="true"><svg class="rot__ring" viewBox="0 0 120 120"><defs><path id="rp" d="M60 60m-48 0a48 48 0 1 1 96 0a48 48 0 1 1-96 0"/></defs>'
            '<text font-family="Cormorant, serif" font-size="11.5" letter-spacing="3.2" fill="#fff"><textPath href="#rp">SODAM · CLOSER TO THE CAUSE · SODAM · CARE ·</textPath></text></svg>'
            '<span class="rot__mark">%s</span></span>') % ICON['mark'].replace('class="logo__mark"', '')
    return ('<section class="sub-hero" id="subHero">%s'
            '<div class="wrap sub-hero__txt">%s<h1 class="sub-hero__t">%s</h1>%s</div>%s</section>\n') % (
        img().replace('<img ', '<img class="sub-hero__img" '), crumb, title, desc, ring)

def lnb(fn, gi):
    if gi is None: return ''
    items = MENU[gi][2]
    lis = ''.join('<li><a href="./%s"%s>%s</a></li>' % (f, ' aria-current="page"' if (f == fn or (fn == 'community-view.html' and f == 'community.html')) else '', esc(n)) for n, f in items)
    return '<nav class="lnb" aria-label="%s 메뉴"><ul>%s</ul></nav>\n' % (esc(MENU[gi][0]), lis)

HEAD = '''<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta property="og:type" content="website">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="./og.jpg">
<meta name="theme-color" content="#CBAA78">
<link rel="icon" href="./favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200;300;400;600;700&family=Cormorant:wght@500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Serif+Display&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
<link rel="stylesheet" href="./assets/site.css">
{css}</head>
<body{bodycls}>
'''

def build(fn):
    src = io.open(os.path.join(ROOT, 'pages', fn), encoding='utf-8').read()
    m = re.match(r'<!--meta\s*(\{.*?\})\s*-->\s*', src, re.S)
    meta = json.loads(m.group(1)) if m else {}
    body = src[m.end():] if m else src
    gi, name = group_of(fn)
    title = meta.get('title') or name or BRAND
    full_title = '%s | %s' % (BRAND, title) if fn == 'index.html' else '%s | %s' % (title, BRAND)
    desc = meta.get('desc') or '%s — %s' % (BRAND, title)
    css = ''
    for c in meta.get('css', []):
        css += '<style>\n%s\n</style>\n' % io.open(os.path.join(ROOT, 'pages', c), encoding='utf-8').read().strip()
    js = ''
    for j in meta.get('js', []):
        js += '<script>\n%s\n</script>\n' % io.open(os.path.join(ROOT, 'pages', j), encoding='utf-8').read().strip()
    htype = meta['hero'].get('type', 'photo') if isinstance(meta.get('hero'), dict) else meta.get('hero')
    if htype in ('photo', 'curve'):
        meta.setdefault('over', '#subHero')
    if htype in ('photo', 'curve', 'reveal'):
        meta.setdefault('quick', '#subHero')
    if fn != 'index.html':
        css = '<link rel="stylesheet" href="./assets/sub.css">\n' + css
    if fn != 'index.html': meta.setdefault('autohide', True)
    out = HEAD.format(title=esc(full_title), desc=esc(desc), css=css, bodycls=(' class="%s"' % meta['body']) if meta.get('body') else '')
    out += header(gi, meta) + sitemap()
    # 모바일에서 <br> 을 숨겨도 앞뒤 낱말이 붙지 않도록 줄바꿈 앞에 빈칸을 둔다(줄 끝 빈칸은 보이지 않는다)
    body = re.sub(r'(?<=[^\s>])<br>', ' <br>', body)
    for k in ('t', 'd'):
        if isinstance(meta.get('hero'), dict) and meta['hero'].get(k):
            meta['hero'][k] = re.sub(r'(?<=[^\s>])<br>', ' <br>', meta['hero'][k])
    out += '<main id="main">\n' + sub_hero(fn, meta, gi, name) + (lnb(fn, gi) if meta.get('lnb') else '') + body.strip() + '\n</main>\n'
    out += footer() + quick()
    if meta.get('cta'):
        out += '<a class="fcta" href="%s">%s</a>\n' % (meta['cta'][1], esc(meta['cta'][0]))
    out += '<script src="./assets/site.js"></script>\n' + js
    out += ('<script>document.addEventListener("click",function(e){var a=e.target.closest("[data-demo]");'
            'if(a){e.preventDefault();alert("디자인 예시 화면입니다. 실제 납품 시 병원 채널로 연결됩니다.");}});</script>\n')
    out += '</body>\n</html>\n'
    io.open(os.path.join(OUT, fn), 'w', encoding='utf-8', newline='\n').write(out)
    return fn

MAP = os.path.normpath(os.path.join(ROOT, '..', 'photo-map-clinic-h.txt'))

def sync_photos():
    """쪽마다 쓰인 ./assets/*.jpg 를 모아 사진 대응표에 없는 것은 덧붙이고, 파일이 없으면 임시 그림을 만든다.
    설명은 alt(없으면 data-shot), 톤은 data-tone(warm·dark·light, 기본 warm), 원본 크기는 표시 크기의 2배."""
    rows, known = [], {}
    for line in io.open(MAP, encoding='utf-8'):
        if line.startswith('#') or not line.strip(): continue
        c = line.rstrip('\n').split('\t'); rows.append(c); known[c[2]] = c
    found = {}
    for fn in sorted(os.listdir(OUT)):
        if not fn.endswith('.html'): continue
        for tag in re.findall(r'<img\b[^>]*>', io.open(os.path.join(OUT, fn), encoding='utf-8').read()):
            m = re.search(r'src="\./assets/([^"]+\.jpg)"', tag)
            if not m or m.group(1) in known or m.group(1) in found: continue
            a = lambda k: (re.search(r'\b%s="([^"]*)"' % k, tag) or [None, ''])[1]
            w, h = int(a('width') or 800), int(a('height') or 600)
            found[m.group(1)] = [m.group(1), w, h, a('data-tone') or 'warm', html.unescape(a('alt') or a('data-shot') or '장식 사진'), fn]
    n = len(rows)
    for f, (name, w, h, tone, desc, page) in found.items():
        n += 1
        rows.append(['%03d' % n, 'clinic-h', name, str(w), str(h), str(w * 2), str(h * 2), tone, '%s (%s)' % (desc, page)])
    with io.open(MAP, 'w', encoding='utf-8', newline='\n') as o:
        o.write('# 번호\t슬러그\t파일\t표시폭\t표시높이\t원본폭\t원본높이\t톤\t무엇을 찍은 사진인가\n')
        for k, r in enumerate(rows, 1): r[0] = '%03d' % k; o.write('\t'.join(r) + '\n')
    import subprocess, sys as _s
    subprocess.run([_s.executable, os.path.join(ROOT, '..', 'make_placeholders.py'), MAP, os.path.join(OUT, 'assets'), 'SODAM'], check=True)
    return len(found)

if __name__ == '__main__':
    import sys
    only = sys.argv[1:]
    done = [build(f) for f in sorted(os.listdir(os.path.join(ROOT, 'pages')))
            if f.endswith('.html') and (not only or f in only)]
    print('%d쪽 → %s' % (len(done), OUT))
    print('사진 대응표에 새로 올린 사진 %d장' % sync_photos())
