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


def tpl_dir(slug):
    for p in ('%s/public/%s' % (ROOT, slug), '%s/public/templates/%s' % (ROOT, slug)):
        if os.path.isdir(p):
            return p
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
    allmine = mycss + mypages

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
def check_pages(slug, ref):
    """메인만 맞추고 서브를 안 본 실수를 막는다."""
    print('\n[2] 쪽 수와 섹션 수')
    mine = tpl_dir(slug)
    if not mine:
        bad('템플릿 폴더를 못 찾음: %s' % slug)
        return
    mypages = sorted(glob.glob(mine + '/*.html'))
    print('       내 쪽 %d개' % len(mypages))
    refhtml = sorted(glob.glob('%s/%s/html/*.html' % (REFS, ref)))
    if refhtml:
        print('       원본 크롤 %d쪽' % len(refhtml))
        if len(mypages) < len(refhtml) * 0.4:
            warn('내 쪽 수가 원본 크롤의 40%% 미만이다 (%d vs %d) — 의도한 축약인지 확인'
                 % (len(mypages), len(refhtml)))
        else:
            ok('쪽 수 규모가 원본과 비슷함')
    empty = [os.path.basename(f) for f in mypages
             if len(re.findall(r'<section', io.open(f, encoding='utf-8').read())) == 0]
    if empty:
        bad('섹션이 하나도 없는 쪽: %s' % ', '.join(empty))
    else:
        ok('모든 쪽에 섹션이 있음')


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
    files = glob.glob(mine + '/assets/*.jpg') + glob.glob(mine + '/assets/*.png')
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
        ('사례 캡처', glob.glob('%s/public/cases/%s/*.webp' % (ROOT, slug))),
    ]
    src = io.open('%s/src/lib/samples.ts' % ROOT, encoding='utf-8').read()
    sep = chr(10) + '  {' + chr(10)
    blocks = [b for b in src.split(sep)
              if ('"/%s/"' % slug) in b or ('/templates/%s/' % slug) in b]
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
    if ('"/%s/"' % slug) in src or ('/templates/%s/' % slug) in src:
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
