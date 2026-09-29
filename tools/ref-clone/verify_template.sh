#!/usr/bin/env bash
# 정적 템플릿 마무리 검증 — 기본형 재생성 · CSS 일치 · 3 뷰포트 · 썸네일 · tsc 를 한 번에.
#   bash verify_template.sh <slug> [브랜드폴더]   예) bash verify_template.sh travel-a
# 전제: <slug>/index.html (랜딩형) 이 완성돼 있고, 기본형은 <slug>-basic 폴더.
# 폴더 위치는 프리미엄 디자인이면 public/<브랜드>/, 나머지는 public/templates/<slug>/ 다.
# 슬러그와 브랜드 폴더 이름이 다르면(real-estate-f → public/artiel/) 두 번째 인자로 주거나,
# samples.ts 의 "<slug>-template" 항목 liveUrl 에서 찾는다. 그때 기본형은 공개 경로 밖
# public/templates/<slug>-basic/ 에 두고 자산은 ../../<브랜드>/ 를 가리킨다.
set -euo pipefail
SLUG="${1:?slug 필요}"
cd /c/web-project/mintcl-netlify-spa
OUT="C:/_tmp/claude/ref-clone-out"; mkdir -p "$OUT"
TPLDIR="public/templates/${SLUG}"; [ -d "public/${SLUG}" ] && TPLDIR="public/${SLUG}"
BASIC="${TPLDIR}-basic"; APFX="../${SLUG}/"
DIR="${2:-}"
if [ -z "$DIR" ] && [ ! -d "$TPLDIR" ]; then
  DIR=$(python -c "import re,sys; s=open('src/lib/samples.ts',encoding='utf-8').read(); m=re.search(r'slug: \"%s-template\",[^{}]*?liveUrl: \"/([a-z0-9-]+)/\"' % re.escape(sys.argv[1]), s); print(m.group(1) if m else '')" "$SLUG")
fi
if [ -n "$DIR" ]; then TPLDIR="public/${DIR}"; BASIC="public/templates/${SLUG}-basic"; APFX="../../${DIR}/"; fi
[ -f "${TPLDIR}/index.html" ] || { echo "랜딩형을 못 찾음: ${TPLDIR}/index.html"; exit 1; }
echo "  랜딩형 ${TPLDIR} · 기본형 ${BASIC}"
export PYTHONIOENCODING=utf-8 SLUG OUT TPLDIR BASIC APFX

echo "=== A. 기본형 재생성 (${SLUG}-basic) ==="
python - <<'PY'
import re, os
slug=os.environ['SLUG']; tdir=os.environ['TPLDIR']; basic=os.environ['BASIC']; ap=os.environ['APFX']
s=open(f'{tdir}/index.html',encoding='utf-8').read()
n=0
s,k=re.subn(r'\(디자인 ([A-Z])\)</title>', r'(기본형 · 디자인 \1)</title>', s); n+=k
s,k=re.subn(r'content="([^"]*)\(디자인 ([A-Z])\)"', r'content="\1(기본형 · 디자인 \2)"', s); n+=k
s=s.replace('원페이지 랜딩입니다.','원페이지 기본형입니다.')
assert '<meta property="og:image" content="./og.jpg">' in s, 'og:image 없음'
s=s.replace('<meta property="og:image" content="./og.jpg">', f'<meta property="og:image" content="{ap}og.jpg">')
assert 'src="./assets/' in s, 'assets 참조 없음'
s=s.replace('src="./assets/', f'src="{ap}assets/')   # data-src 도 함께 걸린다
s=s.replace('srcset="./assets/', f'srcset="{ap}assets/').replace(', ./assets/', f', {ap}assets/').replace('poster="./assets/', f'poster="{ap}assets/')   # srcset 후보·poster 도 기본형 경로로
s=s.replace('href="./assets/', f'href="{ap}assets/')   # preload 링크도
for q in ('url(./assets/', "url('./assets/", 'url("./assets/'):     # CSS 배경 이미지도 (video-a 의 grain·glow)
    s=s.replace(q, q.replace('./assets/', f'{ap}assets/'))
s=s.replace('</style>','''
/* 기본형: 스크롤 등장 애니메이션 없이 처음부터 보이게 한다 */
.rv{opacity:1!important;transform:none!important;filter:none!important;transition-property:none!important}
.hero img.bg,.hero-frame img.bg{transform:none!important;transition:none!important}
</style>''',1)
s=re.sub(r'\n<script>.*?</script>\n','\n',s,flags=re.S)
assert 'IntersectionObserver' not in s, '스크립트 제거 실패'
os.makedirs(basic, exist_ok=True)
open(f'{basic}/index.html','w',encoding='utf-8').write(s)
print(f'  재생성 완료 (제목 치환 {n}건)')
PY
[ -f "${BASIC}/favicon.svg" ] || cp "${TPLDIR}/favicon.svg" "${BASIC}/favicon.svg"

echo "=== B. 랜딩형 ↔ 기본형 CSS 일치 ==="
python - <<'PY'
import re, os
slug=os.environ['SLUG']; tdir=os.environ['TPLDIR']; basic=os.environ['BASIC']; ap=os.environ['APFX']
css=lambda p: re.search(r'<style>(.*?)</style>', open(p,encoding='utf-8').read(), re.S).group(1)
a=css(f'{tdir}/index.html'); b=css(f'{basic}/index.html')
# 기본형은 assets 경로만 상위로 바꾼다 — 비교 전에 되돌려 놓는다
b=b.replace(f'{ap}assets/', './assets/')
extra="\n/* 기본형: 스크롤 등장 애니메이션 없이 처음부터 보이게 한다 */\n.rv{opacity:1!important;transform:none!important;filter:none!important;transition-property:none!important}\n.hero img.bg,.hero-frame img.bg{transform:none!important;transition:none!important}\n"
assert b == a + extra, '기본형 CSS 가 랜딩형과 다르다 — 기본형을 직접 고치지 말고 랜딩형을 고친 뒤 이 스크립트를 다시 돌릴 것'
print('  일치 — 기본형은 랜딩형 CSS + 모션 차단뿐')
PY

echo "=== C. 검증: 랜딩형·기본형 × 1440 / 768 / 390 ==="
python - <<'PY'
import os
from playwright.sync_api import sync_playwright
slug=os.environ['SLUG']; out=os.environ['OUT']; tdir=os.environ['TPLDIR']; ok=True
with sync_playwright() as p:
    b=p.chromium.launch()
    for folder in [tdir, os.environ['BASIC']]:
        for w,h in [(1440,900),(768,1024),(390,844)]:
            pg=b.new_page(viewport={'width':w,'height':h}); errs=[]
            pg.on('console', lambda m: errs.append(m.text) if m.type=='error' else None)
            pg.on('pageerror', lambda e: errs.append('PAGEERROR '+str(e)))
            pg.goto('file:///C:/web-project/mintcl-netlify-spa/'+folder+'/index.html'); pg.wait_for_timeout(2000)
            pg.evaluate("document.querySelectorAll('.rv').forEach(e=>e.classList.add('on'))"); pg.wait_for_timeout(1000)
            # loading=lazy 사진은 화면에 들어와야 불러오므로 끝까지 훑은 뒤에 깨진 이미지를 센다.
            # scroll-behavior:smooth 면 scrollTo 가 애니메이션이라 긴 페이지 바닥까지 못 닿는다 → 잠시 끈다
            pg.add_style_tag(content='html{scroll-behavior:auto!important}')
            H=pg.evaluate('document.documentElement.scrollHeight')
            for y in range(0, H, 600): pg.evaluate(f'window.scrollTo(0,{y})'); pg.wait_for_timeout(120)
            pg.evaluate('window.scrollTo(0,0)'); pg.wait_for_timeout(1800)
            ov=pg.evaluate("document.documentElement.scrollWidth>document.documentElement.clientWidth")
            broken=pg.evaluate("[...document.images].filter(i=>i.complete?i.naturalWidth===0:i.loading!=='lazy').map(i=>i.getAttribute('src'))")   # 가로 슬라이더 끝의 lazy 사진은 아직 안 불렀을 뿐이라 깨짐으로 안 센다
            docH=pg.evaluate("document.documentElement.scrollHeight")
            print(f'  {folder} @{w}: 가로스크롤={ov} 깨진이미지={len(broken)} 높이={docH} 콘솔에러={len(errs)}')
            if errs: print('    ', errs[:3])
            if ov or broken or errs: ok=False
            if w==1440: pg.screenshot(path=f'{out}/{folder}-1440.png', full_page=True)
            pg.close()
    b.close()
print('  검증', 'PASS' if ok else 'FAIL'); raise SystemExit(0 if ok else 1)
PY

echo "=== D. 썸네일 재캡처 (video.bg 제거 후 사진 기준) ==="
python - <<'PY'
import os, re
from playwright.sync_api import sync_playwright
slug=os.environ['SLUG']; tdir=os.environ['TPLDIR']
html=open(f'{tdir}/index.html',encoding='utf-8').read()
ids=[i for i in re.findall(r'<section[^>]*id="([^"]+)"', html) if i not in ('top',)][:4]
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1280,'height':960})
    pg.goto(f'file:///C:/web-project/mintcl-netlify-spa/{tdir}/index.html?devskip=1'); pg.wait_for_timeout(2500)   # devskip: 긴 인트로가 있는 템플릿(artiel)은 첫 장면부터 — 없는 템플릿은 무시
    pg.evaluate("document.querySelectorAll('video.bg').forEach(v=>v.remove())")
    pg.evaluate("document.querySelectorAll('.main-popup,.intro-splash,.layer-popup').forEach(v=>v.remove())")  # 첫 방문 팝업은 썸네일에서 뺀다
    pg.evaluate("document.querySelectorAll('.rv').forEach(e=>e.classList.add('on'))"); pg.wait_for_timeout(1200)
    pg.screenshot(path=f'public/thumbs/{slug}.jpg', type='jpeg', quality=74)
    from PIL import Image
    VP={'real-estate-f':(1440,1080)}   # 1280×960 이 흐름 모드라 원본대로 제목이 머리글에 겹치는 템플릿 — 대표 사진만 이 크기(4:3)로 찍어 줄인다
    if slug in VP:
        pg2=b.new_page(viewport={'width':VP[slug][0],'height':VP[slug][1]})
        pg2.goto(f'file:///C:/web-project/mintcl-netlify-spa/{tdir}/index.html?devskip=1'); pg2.wait_for_timeout(2500)
        pg2.evaluate("document.querySelectorAll('.main-popup,.intro-splash,.layer-popup').forEach(v=>v.remove())"); pg2.wait_for_timeout(1200)
        pg2.screenshot(path=f"{os.environ['OUT']}/{slug}-thumb.png"); pg2.close()
        Image.open(f"{os.environ['OUT']}/{slug}-thumb.png").convert('RGB').resize((1280,960), Image.LANCZOS).save(f'public/thumbs/{slug}.jpg', 'JPEG', quality=74)
    im=Image.open(f'public/thumbs/{slug}.jpg'); os.makedirs('public/thumbs/sm', exist_ok=True); im.resize((640, round(im.height*640/im.width)), Image.LANCZOS).save(f'public/thumbs/sm/{slug}.jpg', 'JPEG', quality=72, optimize=True, progressive=True)  # 히어로 캐러셀용 축소본
    os.makedirs('public/thumbs/sections', exist_ok=True)
    for i,sid in enumerate(ids,1):
        el=pg.query_selector('#'+sid); el.scroll_into_view_if_needed(); pg.wait_for_timeout(500)
        for c in el.query_selector_all('[data-count]'): c.scroll_into_view_if_needed(); pg.wait_for_timeout(1900)  # 카운트업 1.6s 끝난 뒤
        el.scroll_into_view_if_needed(); pg.wait_for_timeout(300)
        el.screenshot(path=f'public/thumbs/sections/{slug}-{i}.jpg', type='jpeg', quality=72)
    b.close()
print('  썸네일 완료:', ids)
PY

echo "=== E. 타입체크 ==="
npx tsc -b --pretty false && echo "  tsc OK"
echo "전체 캡처: $OUT/${SLUG}-1440.png"
