# -*- coding: utf-8 -*-
"""클론 마감 전 기계 점검 — "다 됐다"고 말하기 전에 반드시 돌린다.

  python preflight.py <슬러그> <ref-sites 폴더명>
  예) python preflight.py semroot mathflat

왜 만들었나
  셈루트를 만들며 같은 종류의 누락을 네 번 반복했다.
    ① 자료를 다 안 읽고 시작   rwd-*.css 3개와 main.js 1,988줄을 안 읽어 1440 값이 전부 틀렸다
    ② 범위를 스스로 좁힘       메인과 서브 1쪽만 대조하고 "맞다"고 했다. 나머지 19쪽에 누락이 있었다
    ③ 체크리스트를 안 돌림     접근성·사례형 상세는 다른 템플릿엔 다 있는데 빠뜨렸다
    ④ 수치로만 검증            자리 이미지가 전부 같은 밝기라 화면이 밍밍한 걸 캡처 보고서야 알았다
  넷 다 기계로 잡을 수 있다. 사람이 "이만하면 됐다"고 선언하는 걸 막는 게 이 파일의 목적이다.

통과 못 하면 exit 1. 항목마다 왜 보는지 한 줄로 적어 둔다.
"""
import glob
import io
import json
import os
import re
import sys
from collections import Counter

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

ROOT = 'C:/web-project/mintcl-netlify-spa'
REFS = 'C:/web-project/ref-sites'
fails = []
warns = []


def ok(msg):
    print('  OK   %s' % msg)


def bad(msg):
    print('  실패 %s' % msg)
    fails.append(msg)


def warn(msg):
    print('  주의 %s' % msg)
    warns.append(msg)


def brand_dir(slug):
    """슬러그와 브랜드 폴더 이름이 다를 때(real-estate-f → artiel) samples.ts 의 liveUrl 로 찾는다."""
    src = io.open('%s/src/lib/samples.ts' % ROOT, encoding='utf-8').read()
    m = re.search(r'slug: "%s-template",[^{}]*?liveUrl: "/([a-z0-9-]+)/"' % re.escape(slug), src)
    return m.group(1) if m else None


def tpl_dir(slug):
    for p in ('%s/public/%s' % (ROOT, slug), '%s/public/templates/%s' % (ROOT, slug)):
        if os.path.isdir(p):
            return p
    d = brand_dir(slug)
    if d and os.path.isdir('%s/public/%s' % (ROOT, d)):
        return '%s/public/%s' % (ROOT, d)
    return None


# ── 1. 원본 자료를 다 읽었나 ──────────────────────────────────────
def check_sources(slug, ref):
    """반응형 덮어쓰기(rwd-*)와 스크립트를 안 읽으면 특정 폭에서 값이 전부 틀어진다."""
    print('\n[1] 원본 자료를 다 봤나')
    base = '%s/%s' % (REFS, ref)
    if not os.path.isdir(base):
        warn('레퍼런스 폴더 없음: %s — 이 항목 건너뜀' % base)
        return
    css = [f for f in glob.glob(base + '/**/*.css', recursive=True) if '.min.' not in f]
    js = [f for f in glob.glob(base + '/**/*.js', recursive=True) if '.min.' not in f]
    rwd = [f for f in css if re.search(r'(rwd|responsive|mobile)', os.path.basename(f), re.I)]
    print('       원본 CSS %d개(그중 반응형 %d) · JS %d개' % (len(css), len(rwd), len(js)))

    mine = tpl_dir(slug)
    mycss = io.open(mine + '/assets/site.css', encoding='utf-8').read() if mine and \
        os.path.exists(mine + '/assets/site.css') else ''
    mypages = ''.join(io.open(f, encoding='utf-8').read() for f in glob.glob(mine + '/*.html')) \
        if mine else ''
    # 스크립트를 쪽 밖 파일로 뺀 클론(엘름우드 assets/js/elmwood.js)도 센다 — 쪽 안 인라인만 세면 장면 함수 검사가 오탐한다
    myjs_files = [f for f in glob.glob(mine + '/assets/**/*.js', recursive=True) if '.min.' not in f] if mine else []
    allmine = mycss + mypages + ''.join(io.open(f, encoding='utf-8', errors='replace').read() for f in myjs_files)

    # 원본이 쓰는 중단점이 내 CSS 에도 있는가
    # 반응형 전용 파일이 있을 때만 본다. clamp() 로 푸는 원본은 이 파일이 없어 의미가 없다.
    bps = Counter()
    for f in rwd:
        for m in re.findall(r'max-width:\s*(\d+)px', io.open(f, encoding='utf-8', errors='replace').read()):
            bps[int(m)] += 1
    top = [b for b, n in bps.most_common(8) if n >= 3]
    if not rwd:
        ok('원본에 반응형 전용 CSS 가 없다 (clamp 방식) — 중단점 대조 건너뜀')
    miss = [b for b in top if ('max-width:%dpx' % b) not in allmine.replace(' ', '')]
    if top:
        print('       원본 주요 중단점: %s' % ', '.join(str(b) for b in sorted(top, reverse=True)))
    if miss:
        bad('내 CSS 에 없는 원본 중단점: %s — rwd-*.css 를 안 읽었을 수 있다'
            % ', '.join(str(b) for b in sorted(miss, reverse=True)))
    elif top:
        ok('원본 중단점이 모두 반영됨 (%s)' % ', '.join(str(b) for b in sorted(top, reverse=True)))

    # 원본 스크립트에 장면 함수가 있는데 내 JS 가 너무 작으면 애니메이션을 창작했을 확률이 높다
    fns = []
    for f in js:
        t = io.open(f, encoding='utf-8', errors='replace').read()
        fns += re.findall(r'function\s+(main[A-Z]\w+|\w*(?:Motion|Slider|Accordion|Viewer)\w*)\s*\(', t)
    fns = sorted(set(fns))
    if fns:
        myjs = len(re.findall(r'function|addEventListener|=>', allmine))
        print('       원본 장면 함수 %d개: %s' % (len(fns), ', '.join(fns[:8]) + (' …' if len(fns) > 8 else '')))
        if myjs < len(fns) * 3:
            bad('원본 장면 함수가 %d개인데 내 스크립트가 너무 얇다 — 애니메이션을 안 옮겼을 수 있다' % len(fns))
        else:
            ok('스크립트 분량이 원본 장면 수에 맞음')


# ── 2. 페이지·섹션 수를 원본과 맞췄나 ───────────────────────────
# 쪽 수를 사용자가 일부러 줄이라고 정한 원본만 적는다(스스로 좁힌 범위는 여기 넣지 않는다).
# 2026-09-15 사용자: 대기업 레퍼런스는 디자인은 원본대로, 쪽 구성만 중소기업 규모(15쪽 안팎 대표 틀)로 — 메모 feedback_corporate_ref_smb_scale
SCOPE_DECIDED = {
    'lgensol': '2026-09-15 사용자 결정, LG에너지솔루션 89쪽 → 중소기업 규모 대표 틀',
    'ktng': '2026-09-15 같은 결정(대기업 KT&G) → 중소기업 규모 대표 틀',
    'ejelaw': '2026-10-04 사용자 결정(권장안 승인) — 뉴스 12쪽·약 100개 중 목록 1쪽·기사 9개로 축약, 나머지는 원본대로',
    'hwacheon': '2026-10-04 사용자 승인, 화천기계 46쪽 → 23쪽 대표 틀 그대로',
}


def check_pages(slug, ref):
    """메인만 맞추고 서브를 안 본 실수를 막는다."""
    print('\n[2] 쪽 수와 섹션 수')
    mine = tpl_dir(slug)
    if not mine:
        bad('템플릿 폴더를 못 찾음: %s' % slug)
        return
    mypages = sorted(glob.glob(mine + '/*.html'))
    print('       내 쪽 %d개' % len(mypages))
    refdir = next((d for d in ('%s/%s/html' % (REFS, ref), '%s/%s/crawl/html' % (REFS, ref)) if os.path.isdir(d)), '')   # 선광처럼 crawl/ 아래 둔 곳도
    refhtml = sorted(glob.glob(refdir + '/*.html')) if refdir else []
    if refhtml:
        print('       원본 크롤 %d쪽' % len(refhtml))
        if len(mypages) < len(refhtml) * 0.4:
            warn('내 쪽 수가 원본 크롤의 40%% 미만이다 (%d vs %d) — 의도한 축약인지 확인'
                 % (len(mypages), len(refhtml)))
        else:
            ok('쪽 수 규모가 원본과 비슷함')
    empty = [os.path.basename(f) for f in mypages
             if len(re.findall(r'<section', io.open(f, encoding='utf-8').read())) == 0]
    # 원본 DOM 을 그대로 옮긴 클론(_clone 엔진)은 원본 쪽이 <section> 없이 div 로만 짜여 있으면 우리 쪽도 0 이다(홉키즈 12쪽).
    # 빌드 설정(PAGES: 원본 raw ↔ 우리 파일)이 있으면 원본 쪽의 section 수와 견줘, 원본보다 적을 때만 실패로 친다.
    same = {}
    cfgp = '%s/%s/build/cfg.py' % (REFS, ref)
    if empty and os.path.exists(cfgp):
        try:
            import importlib.util
            spec = importlib.util.spec_from_file_location('ref_cfg_' + ref, cfgp)
            sys.path.insert(0, os.path.dirname(cfgp))
            rc = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(rc)
            for row in getattr(rc, 'PAGES', []):
                rawf = os.path.join(rc.SRC, row[0])
                if os.path.exists(rawf):
                    same[row[1]] = len(re.findall(r'<section', io.open(rawf, encoding='utf-8', errors='replace').read()))
        except Exception as e:
            print('       (빌드 설정을 못 읽음: %s)' % str(e)[:80])
    # 빌드 설정이 없어도 원본 크롤에 같은 이름 쪽이 있으면 그 쪽의 section 수로 본다(서울바우 offer.html — 원본도 0)
    for f in empty:
        rawf = '%s/%s' % (refdir, f)
        if f not in same and os.path.exists(rawf):
            same[f] = len(re.findall(r'<section', io.open(rawf, encoding='utf-8', errors='replace').read()))
    really = [f for f in empty if same.get(f) != 0]
    # 손으로 짠 생성기라 쪽 짝(PAGES)이 없는 클론: 원본 크롤의 서브 쪽(메인 index·*_main 제외)이 모두 section 을 안 쓰면
    # (keoc 60쪽 · daesang 36쪽 · eumcblood 서브 64쪽 — section 은 메인에만) 우리 서브 쪽 0 도 원본 구조다.
    refmain = [f for f in refhtml if re.search(r'(^|_)(index|main)[._]', os.path.basename(f), re.I)]   # kr_index.html 같은 크롤 이름도
    refsub = [f for f in refhtml if f not in refmain]
    nosec = lambda fs: bool(fs) and not any('<section' in io.open(f, encoding='utf-8', errors='replace').read() for f in fs)
    if really and nosec(refsub) and ('index.html' not in really or nosec(refmain)):   # 원본 서브가 전부 section 0 이면 짝 유무와 상관없이 원본 구조
        ok('section 이 없는 %d쪽 — 원본 서브 %d쪽도 전부 section 을 안 씀(원본 구조 그대로)' % (len(really), len(refsub)))
    elif really:
        bad('섹션이 하나도 없는 쪽: %s' % ', '.join(really))
    elif empty:
        ok('section 이 없는 %d쪽은 원본 쪽에도 section 이 없음(원본 구조 그대로): %s' % (len(empty), ', '.join(empty)))
    else:
        ok('모든 쪽에 섹션이 있음')

    # 크롤이 닿은 쪽만 보고 만들면 절반을 빠뜨린다(온담 26/37 · 하린 22/31).
    # 원본이 스스로 내건 내부 링크를 세어 그 수와 비교한다.
    raws = sorted(glob.glob('%s/%s/raw/index*.html' % (REFS, ref))) or \
        sorted(glob.glob('%s/%s/raw/*.html' % (REFS, ref)))[:1]
    if raws:
        t = io.open(raws[0], encoding='utf-8', errors='replace').read()
        links = {l.split('#')[0].rstrip('/') or '/'
                 for l in re.findall(r'href="(/[^"#?]*)', t)}
        links = {l for l in links
                 if not re.search(r'\.(css|js|png|jpe?g|svg|ico|webp|pdf|zip)$', l, re.I)}
        print('       원본이 내건 내부 링크 %d개' % len(links))
        if len(links) >= 8 and len(mypages) < len(links) * 0.7 and ref in SCOPE_DECIDED:
            ok('원본 %d쪽 → 내 것 %d쪽은 사용자가 정한 축약 — %s' % (len(links), len(mypages), SCOPE_DECIDED[ref]))
        elif len(links) >= 8 and len(mypages) < len(links) * 0.7:
            bad('원본은 쪽을 %d개 내걸었는데 내 것은 %d개다 — 크롤이 닿은 쪽만 '
                '보고 만들지 않았는지 링크 목록과 표로 대조할 것' % (len(links), len(mypages)))
        elif len(links) >= 8:
            ok('원본이 내건 링크 수에 견줘 쪽이 모자라지 않음 (%d ≥ %d×0.7)'
               % (len(mypages), len(links)))


# ── 3. 자리 이미지가 화면을 밍밍하게 만들지 않나 ──────────────────
def check_images(slug):
    """114칸을 같은 밝기로 깔아 화면이 한 톤이 된 실수를 막는다."""
    print('\n[3] 이미지 명암 분포')
    try:
        from PIL import Image, ImageStat
    except ImportError:
        warn('Pillow 없음 — 건너뜀')
        return
    mine = tpl_dir(slug)
    files = glob.glob(mine + '/assets/**/*.jpg', recursive=True) + glob.glob(mine + '/assets/**/*.png', recursive=True)   # assets/img/ 아래도
    if not files:
        warn('이미지 없음')
        return
    vals = []
    for f in files:
        try:
            im = Image.open(f).convert('RGB')
            vals.append(sum(ImageStat.Stat(im).mean) / 3)
        except Exception:
            pass
    if not vals:
        return
    lo, hi = min(vals), max(vals)
    dark = sum(1 for v in vals if v < 90)
    span = hi - lo
    print('       %d장 · 밝기 %.0f ~ %.0f (폭 %.0f) · 어두운 칸 %d장' % (len(vals), lo, hi, span, dark))
    if span < 80:
        bad('밝기 폭이 %.0f 뿐 — 전부 비슷한 톤이라 화면이 밍밍해 보인다' % span)
    else:
        ok('밝고 어두운 칸이 섞여 있음')


# ── 4. 다른 템플릿이 갖춘 산출물을 갖췄나 ──────────────────────
def check_outputs(slug):
    """사례형 상세·썸네일처럼 '다른 데는 다 있는데 이번만 없는' 누락을 막는다."""
    print('\n[4] 산출물')
    items = [
        ('사례형 상세', glob.glob('%s/src/lib/caseStudies/data/*%s*.ts' % (ROOT, slug))),
        ('사례 캡처', glob.glob('%s/public/cases/%s/*.webp' % (ROOT, slug)) or   # 브랜드 폴더로 옮긴 프리미엄(한울 cases/hanul)
                    glob.glob('%s/public/cases/%s/*.webp' % (ROOT, brand_dir(slug) or slug))),
    ]
    src = io.open('%s/src/lib/samples.ts' % ROOT, encoding='utf-8').read()
    sep = chr(10) + '  {' + chr(10)
    mine = ('"/%s/"' % slug, '/templates/%s/' % slug, 'slug: "%s-template",' % slug)
    blocks = [b for b in src.split(sep) if any(k in b for k in mine)]
    img = re.search(r'image:\s*"([^"]+)"', blocks[0]) if blocks else None
    if img:
        f = ROOT + '/public' + img.group(1)
        items.append(('썸네일 %s' % img.group(1), [f] if os.path.exists(f) else []))
        sm = f.replace('/thumbs/', '/thumbs/sm/')
        items.append(('썸네일 축소본', [sm] if os.path.exists(sm) else []))
    else:
        items.append(('썸네일(samples.ts 의 image 경로)', []))
    for name, got in items:
        if got:
            ok('%s %d개' % (name, len(got)))
        else:
            bad('%s 없음' % name)
    if any(k in src for k in mine):
        ok('samples.ts 에 등록됨')
    else:
        bad('samples.ts 에 등록 안 됨')


# ── 5. 공개 경로에 검증용 폴더가 새지 않나 ─────────────────────
def check_leaks(slug):
    print('\n[5] 공개 경로 누수')
    leak = [os.path.basename(p) for p in glob.glob('%s/public/%s*-basic' % (ROOT, slug))]
    if leak:
        bad('검증용 기본형이 공개 경로에 있음: %s' % ', '.join(leak))
    else:
        ok('검증용 폴더 노출 없음')


# ── 6. 접근성 ─────────────────────────────────────────────────
def check_a11y(slug):
    """색만 바꿔도 대비가 깨진다. 수치로만 보면 절대 안 잡힌다."""
    print('\n[6] 접근성 (지난 검사 결과)')
    p = 'C:/_tmp/claude/a11y-%s.json' % slug
    if not os.path.exists(p):
        bad('접근성 검사 기록 없음 — a11y 검사를 돌리고 결과를 %s 로 남길 것' % p)
        return
    rows = json.load(io.open(p, encoding='utf-8'))
    n = sum(r.get('n', 0) for r in rows)
    if n:
        bad('접근성 위반 %d건' % n)
    else:
        ok('접근성 위반 0건')


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(2)
    slug = sys.argv[1]
    ref = sys.argv[2] if len(sys.argv) > 2 else slug
    ref = os.path.basename(os.path.normpath(ref))   # C:/web-project/ref-sites/<이름> 으로 줘도 된다
    print('=== 클론 마감 점검 · %s (레퍼런스 %s) ===' % (slug, ref))
    check_sources(slug, ref)
    check_pages(slug, ref)
    check_images(slug)
    check_outputs(slug)
    check_leaks(slug)
    check_a11y(slug)
    print('\n' + '=' * 54)
    if fails:
        print('통과 못 함 — 실패 %d건, 주의 %d건' % (len(fails), len(warns)))
        for f in fails:
            print('   · %s' % f)
        sys.exit(1)
    print('통과 (주의 %d건)' % len(warns))
    for w in warns:
        print('   · %s' % w)


if __name__ == '__main__':
    main()
