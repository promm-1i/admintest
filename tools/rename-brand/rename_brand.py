"""포트폴리오 사이트 상호 · 주소 바꾸기 (2026-11-06, '홈페이지 포트폴리오' 전환).

  python -I tools/rename-brand/rename_brand.py <옛폴더> <새폴더> <옛샘플슬러그> <새샘플슬러그> \
      --map "셈루트=한빛수학" --map "SEMROOT=HANBIT MATH" [--apply]

하는 일(--apply 없으면 미리보기만):
  1. public/<옛폴더> 안 글 파일(html·css·js·json·svg·xml·txt·webmanifest)의 상호를 바꾼다.
     한글 짝은 조사 받침까지 맞춘다(셈루트를 → 한빛수학을, 셀바린은 → 봄빛은). 뒤에 한글이 붙어
     조사인지 모르는 곳은 바꾸되 '확인' 목록에 남긴다.
  2. 사이트 안 절대 주소 noveriq.co.kr/<옛폴더>/ · 루트 경로 "/<옛폴더>/" 를 새 폴더로.
  3. 폴더를 옮긴다: public/<옛> → public/<새>, public/cases/<옛> → cases/<새>, public/thumbs/(sm·sections/)<옛>*.jpg → <새>*.jpg.
  4. src/lib/caseStudies/data/<옛샘플>.ts → <새샘플>.ts 로 옮기고 경로 · 상호를 바꾼다.
  5. 끝에 옛 이름이 남은 곳(대소문자 무시)을 줄 단위로 보여 준다 — 그림 속 글자 · 로고 폭은 사람이 본다.
samples.ts · _redirects · netlify.toml 은 여러 세션이 함께 고치는 파일이라 여기서 건드리지 않는다.
git 은 쓰지 않는다(스테이징은 커밋하는 사람이 커밋 직전에).
"""
import sys, os, re, io, shutil, argparse

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
PUB = os.path.join(ROOT, 'public')
TEXT_EXT = ('.html', '.htm', '.css', '.js', '.mjs', '.json', '.svg', '.xml', '.txt', '.webmanifest', '.ts')

# 조사: (받침 없는 꼴, 받침 있는 꼴). 로/으로 는 ㄹ 받침도 '로'.
PARTICLES = [('예요', '이에요'), ('라고', '이라고'), ('라는', '이라는'), ('랑', '이랑'), ('로', '으로'), ('라', '이라'),
             ('며', '이며'), ('나', '이나'), ('고', '이고'), ('는', '은'), ('가', '이'), ('를', '을'), ('와', '과')]
ALL_P = sorted({p for pair in PARTICLES for p in pair}, key=len, reverse=True)
# 조사 뒤에 붙어도 되는 글자(로는 · 와의 · 은도 …)
TAIL_OK = set('는도만의서부까에')
# 받침과 상관없는 조사 첫 글자(의 · 도 · 만 · 에서 · 부터 · 까지 · 처럼 · 보다 · 께)
NEUTRAL = set('의도만에부까처보께')


def tail_class(word):
    """마지막 글자 받침: 'V' 없음 · 'L' ㄹ · 'B' 그 밖. 한글이 아니면(영문 · 숫자) 읽는 소리를 모르니 None."""
    ch = word.strip()[-1]
    code = ord(ch) - 0xAC00
    if not 0 <= code < 11172:
        return None
    jong = code % 28
    return 'V' if jong == 0 else ('L' if jong == 8 else 'B')


def particle_for(p, cls):
    for v, b in PARTICLES:
        if p in (v, b):
            if (v, b) == ('로', '으로'):
                return '으로' if cls == 'B' else '로'
            return v if cls == 'V' else b
    return p


def replace_korean(text, old, new, review, where):
    oc, nc = tail_class(old), tail_class(new)
    pat = re.compile(re.escape(old) + '(' + '|'.join(ALL_P) + ')?')

    def sub(m):
        p = m.group(1) or ''
        nxt = text[m.end():m.end() + 1]
        if p and oc and nc and oc != nc:
            if not ('가' <= nxt <= '힣') or nxt in TAIL_OK:
                return new + particle_for(p, nc)
            review.append('%s: "%s" 뒤 "%s" — 조사인지 확인' % (where, old + p, nxt))
        elif not p and '가' <= nxt <= '힣' and nxt not in NEUTRAL and oc != nc:
            review.append('%s: "%s%s…" — 붙은 말 확인' % (where, old, nxt))
        return new + p
    return pat.sub(sub, text)


def convert(text, pairs, old_dir, new_dir, review, where):
    for old, new in pairs:
        if re.search('[가-힣]', old):
            text = replace_korean(text, old, new, review, where)
        else:
            text = text.replace(old, new)
    text = text.replace('noveriq.co.kr/%s/' % old_dir, 'noveriq.co.kr/%s/' % new_dir)
    text = re.sub(r'(["\'(\s])/%s/' % re.escape(old_dir), r'\1/%s/' % new_dir, text)
    return text


def text_files(base):
    for dp, dn, fn in os.walk(base):
        for f in fn:
            if f.lower().endswith(TEXT_EXT):
                yield os.path.join(dp, f)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('old_dir'); ap.add_argument('new_dir'); ap.add_argument('old_slug'); ap.add_argument('new_slug')
    ap.add_argument('--map', action='append', default=[], help='옛=새 (긴 것부터 적용)')
    ap.add_argument('--apply', action='store_true')
    a = ap.parse_args()
    sys.stdout.reconfigure(encoding='utf-8')
    pairs = sorted((tuple(x.split('=', 1)) for x in a.map), key=lambda p: -len(p[0]))
    site = os.path.join(PUB, a.old_dir)
    assert os.path.isdir(site), site
    assert not os.path.exists(os.path.join(PUB, a.new_dir)), '새 폴더가 이미 있음: ' + a.new_dir
    review, changed, after = [], 0, {}
    for f in text_files(site):
        s = io.open(f, encoding='utf-8', errors='surrogateescape', newline='').read()
        t = convert(s, pairs, a.old_dir, a.new_dir, review, os.path.relpath(f, PUB))
        after[os.path.relpath(f, site)] = t
        if t != s:
            changed += 1
            if a.apply:
                io.open(f, 'w', encoding='utf-8', errors='surrogateescape', newline='').write(t)
    cs_old = os.path.join(ROOT, 'src', 'lib', 'caseStudies', 'data', a.old_slug + '.ts')
    cs_new = os.path.join(ROOT, 'src', 'lib', 'caseStudies', 'data', a.new_slug + '.ts')
    if os.path.exists(cs_old):
        s = io.open(cs_old, encoding='utf-8', newline='').read()
        t = convert(s.replace('/cases/%s/' % a.old_dir, '/cases/%s/' % a.new_dir), pairs, a.old_dir, a.new_dir, review, os.path.relpath(cs_old, ROOT))
        if a.apply:
            io.open(cs_new, 'w', encoding='utf-8', newline='').write(t)
            if cs_new != cs_old:
                os.remove(cs_old)
    moves = [(site, os.path.join(PUB, a.new_dir))]
    if os.path.isdir(os.path.join(PUB, 'cases', a.old_dir)):
        moves.append((os.path.join(PUB, 'cases', a.old_dir), os.path.join(PUB, 'cases', a.new_dir)))
    for sub in ('thumbs', 'thumbs/sm', 'thumbs/sections'):
        d = os.path.join(PUB, sub)
        for f in (os.listdir(d) if os.path.isdir(d) else []):
            if re.match(re.escape(a.old_dir) + r'([-_.].*)?\.(jpg|jpeg|png|webp)$', f):
                moves.append((os.path.join(d, f), os.path.join(d, a.new_dir + f[len(a.old_dir):])))
    print('글 파일 %d개 바뀜 · 옮길 것 %d' % (changed, len(moves)))
    for src, dst in moves:
        print('  옮김 %s → %s' % (os.path.relpath(src, PUB), os.path.relpath(dst, PUB)))
        if a.apply:
            shutil.move(src, dst)
    for r in review[:60]:
        print('  확인 ' + r)
    if len(review) > 60:
        print('  … 확인 %d건 더' % (len(review) - 60))
    # 바꾼 뒤에도 남은 옛 이름(대소문자 무시) — 파일 이름에 든 것 · 다른 표기는 사람이 본다
    olds = [o for o, _ in pairs] + [a.old_dir]
    left = 0
    for rel, t in after.items():
        for i, line in enumerate(t.split('\n')):
            for o in olds:
                k = line.lower().find(o.lower())
                if k >= 0:
                    left += 1
                    if left <= 25:
                        print('  남음 %s/%s:%d  …%s…' % (a.new_dir, rel, i + 1, line[max(0, k - 40):k + 50].strip()))
                    break
    print('남은 옛 이름 %d줄' % left)


if __name__ == '__main__':
    main()
