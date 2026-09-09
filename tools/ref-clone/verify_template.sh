#!/usr/bin/env bash
# 정적 템플릿 마무리 검증 — 기본형 재생성 · CSS 일치 · 3 뷰포트 · 썸네일 · tsc 를 한 번에.
#   bash verify_template.sh <slug>      예) bash verify_template.sh travel-a
# 전제: public/templates/<slug>/index.html (랜딩형) 이 완성돼 있고, 기본형은 <slug>-basic 폴더.
set -euo pipefail
SLUG="${1:?slug 필요}"
cd /c/web-project/mintcl-netlify-spa
OUT="C:/_tmp/claude/ref-clone-out"; mkdir -p "$OUT"
export PYTHONIOENCODING=utf-8 SLUG OUT

echo "=== A. 기본형 재생성 (${SLUG}-basic) ==="
python - <<'PY'
import re, os
slug=os.environ['SLUG']
s=open(f'public/templates/{slug}/index.html',encoding='utf-8').read()
n=0
s,k=re.subn(r'\(디자인 ([A-Z])\)</title>', r'(기본형 · 디자인 \1)</title>', s); n+=k
s,k=re.subn(r'content="([^"]*)\(디자인 ([A-Z])\)"', r'content="\1(기본형 · 디자인 \2)"', s); n+=k
s=s.replace('원페이지 랜딩입니다.','원페이지 기본형입니다.')
assert '<meta property="og:image" content="./og.jpg">' in s, 'og:image 없음'
s=s.replace('<meta property="og:image" content="./og.jpg">', f'<meta property="og:image" content="../{slug}/og.jpg">')
assert 'src="./assets/' in s, 'assets 참조 없음'
s=s.replace('src="./assets/', f'src="../{slug}/assets/')   # data-src 도 함께 걸린다
s=s.replace('srcset="./assets/', f'srcset="../{slug}/assets/').replace(', ./assets/', f', ../{slug}/assets/').replace('poster="./assets/', f'poster="../{slug}/assets/')   # srcset 후보·poster 도 기본형 경로로
s=s.replace('</style>','''
/* 기본형: 스크롤 등장 애니메이션 없이 처음부터 보이게 한다 */
.rv{opacity:1!important;transform:none!important;filter:none!important;transition-property:none!important}
.hero img.bg,.hero-frame img.bg{transform:none!important;transition:none!important}
</style>''',1)
s=re.sub(r'\n<script>.*?</script>\n','\n',s,flags=re.S)
assert 'IntersectionObserver' not in s, '스크립트 제거 실패'
os.makedirs(f'public/templates/{slug}-basic', exist_ok=True)
open(f'public/templates/{slug}-basic/index.html','w',encoding='utf-8').write(s)
print(f'  재생성 완료 (제목 치환 {n}건)')
PY
[ -f "public/templates/${SLUG}-basic/favicon.svg" ] || cp "public/templates/${SLUG}/favicon.svg" "public/templates/${SLUG}-basic/favicon.svg"

echo "=== B. 랜딩형 ↔ 기본형 CSS 일치 ==="
python - <<'PY'
import re, os
slug=os.environ['SLUG']
css=lambda p: re.search(r'<style>(.*?)</style>', open(p,encoding='utf-8').read(), re.S).group(1)
a=css(f'public/templates/{slug}/index.html'); b=css(f'public/templates/{slug}-basic/index.html')
extra="\n/* 기본형: 스크롤 등장 애니메이션 없이 처음부터 보이게 한다 */\n.rv{opacity:1!important;transform:none!important;filter:none!important;transition-property:none!important}\n.hero img.bg,.hero-frame img.bg{transform:none!important;transition:none!important}\n"
assert b == a + extra, '기본형 CSS 가 랜딩형과 다르다 — 기본형을 직접 고치지 말고 랜딩형을 고친 뒤 이 스크립트를 다시 돌릴 것'
print('  일치 — 기본형은 랜딩형 CSS + 모션 차단뿐')
PY

echo "=== C. 검증: 랜딩형·기본형 × 1440 / 768 / 390 ==="
python - <<'PY'
import os
from playwright.sync_api import sync_playwright
slug=os.environ['SLUG']; out=os.environ['OUT']; ok=True
with sync_playwright() as p:
    b=p.chromium.launch()
    for folder in [slug, slug+'-basic']:
        for w,h in [(1440,900),(768,1024),(390,844)]:
            pg=b.new_page(viewport={'width':w,'height':h}); errs=[]
            pg.on('console', lambda m: errs.append(m.text) if m.type=='error' else None)
            pg.on('pageerror', lambda e: errs.append('PAGEERROR '+str(e)))
            pg.goto(f'file:///C:/web-project/mintcl-netlify-spa/public/templates/{folder}/index.html'); pg.wait_for_timeout(2000)
            pg.evaluate("document.querySelectorAll('.rv').forEach(e=>e.classList.add('on'))"); pg.wait_for_timeout(1000)
            # loading=lazy 사진은 화면에 들어와야 불러오므로 끝까지 훑은 뒤에 깨진 이미지를 센다
            H=pg.evaluate('document.documentElement.scrollHeight')
            for y in range(0, H, 600): pg.evaluate(f'window.scrollTo(0,{y})'); pg.wait_for_timeout(120)
            pg.evaluate('window.scrollTo(0,0)'); pg.wait_for_timeout(1800)
            ov=pg.evaluate("document.documentElement.scrollWidth>document.documentElement.clientWidth")
            broken=pg.evaluate("[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.getAttribute('src'))")
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
slug=os.environ['SLUG']
html=open(f'public/templates/{slug}/index.html',encoding='utf-8').read()
ids=[i for i in re.findall(r'<section[^>]*id="([^"]+)"', html) if i not in ('top',)][:4]
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1280,'height':960})
    pg.goto(f'file:///C:/web-project/mintcl-netlify-spa/public/templates/{slug}/index.html'); pg.wait_for_timeout(2500)
    pg.evaluate("document.querySelectorAll('video.bg').forEach(v=>v.remove())")
    pg.evaluate("document.querySelectorAll('.rv').forEach(e=>e.classList.add('on'))"); pg.wait_for_timeout(1200)
    pg.screenshot(path=f'public/thumbs/{slug}.jpg', type='jpeg', quality=74)
    from PIL import Image; im=Image.open(f'public/thumbs/{slug}.jpg'); os.makedirs('public/thumbs/sm', exist_ok=True); im.resize((640, round(im.height*640/im.width)), Image.LANCZOS).save(f'public/thumbs/sm/{slug}.jpg', 'JPEG', quality=72, optimize=True, progressive=True)  # 히어로 캐러셀용 축소본
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
