"""상호 · 주소 바꾸기의 공유 파일 몫 — samples.ts · public/_redirects · netlify.toml.

  python -I tools/rename-brand/central_apply.py <옛폴더> <새폴더> <옛샘플> <새샘플> <새상호> \
      --map "셈루트=한빛수학" [--map …] [--apply]

세 파일은 다른 세션의 미커밋 수정이 섞여 있을 때가 많다. 그래서 커밋된 판(HEAD)과 작업 판에 같은 변환을
따로 걸고, 작업 판은 파일에 쓰고 HEAD+변환은 git 인덱스에만 올린다(hash-object + update-index).
그러면 커밋에는 내 변경만 들어가고 다른 세션 수정은 작업 판에 그대로 남는다.
  samples.ts   : 그 항목의 slug · title('<새상호> 홈페이지 포트폴리오') · tag 머리 · image · liveUrl · 본문 상호
  _redirects   : '/옛/* /옛/:splat 200' 줄을 새 주소 200 + 옛 주소 301 + 옛 상세 301 로, 다른 규칙의 /옛/ 목적지도 새로
  netlify.toml : 같은 내용을 [[redirects]] 묶음으로
"""
import sys, os, re, io, subprocess, argparse, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import rename_brand as rb

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))


def git(*a, data=None):
    return subprocess.run(['git', '-C', ROOT] + list(a), input=data, capture_output=True, check=True).stdout


def t_samples(s, a, pairs):
    m = re.search(r'\n  \{\n    slug: "%s",\n(?:.*\n)*?  \},\n' % re.escape(a.old_slug), s)
    assert m, 'samples.ts 항목 없음: ' + a.old_slug
    e = m.group(0)
    e = e.replace('slug: "%s",' % a.old_slug, 'slug: "%s",' % a.new_slug, 1)
    e = re.sub(r'\n    title: "[^"]*",', '\n    title: "%s 홈페이지 포트폴리오",' % a.brand, e, count=1)
    e = re.sub(r'(\n    tag: ")프리미엄 디자인 · ', r'\1홈페이지 포트폴리오 · ', e, count=1)
    e = re.sub(r'(image: "/thumbs/)%s(?=[-_.])' % re.escape(a.old_dir), r'\g<1>' + a.new_dir, e)
    e = e.replace('liveUrl: "/%s/' % a.old_dir, 'liveUrl: "/%s/' % a.new_dir)
    review = []
    for o, n in pairs:
        e = rb.replace_korean(e, o, n, review, 'samples') if re.search('[가-힣]', o) else e.replace(o, n)
    return s[:m.start()] + e + s[m.end():]


def redirect_lines(a, sep):
    L = ['/%s/*%s/%s/:splat%s200' % (a.new_dir, sep, a.new_dir, sep),
         '/%s/*%s/%s/:splat%s301' % (a.old_dir, sep, a.new_dir, sep),
         '/%s%s/%s/%s301' % (a.old_dir, sep, a.new_dir, sep)]
    if a.new_slug != a.old_slug:
        L += ['/samples/%s%s/samples/%s/%s301' % (a.old_slug, sep, a.new_slug, sep),
              '/samples/%s/*%s/samples/%s/%s301' % (a.old_slug, sep, a.new_slug, sep)]
    return L


def t_redirects(s, a):
    pat = re.compile(r'^/%s/\*(\s+)/%s/:splat\s+200[^\n]*$' % ((re.escape(a.old_dir),) * 2), re.M)
    m = pat.search(s)
    if m:
        s = s[:m.start()] + '\n'.join(redirect_lines(a, m.group(1))) + s[m.end():]
    else:  # 규칙 없이 폴더로만 열리던 곳(bodien) — SPA 폴백(/* /app.html) 앞에 넣는다(먼저 걸린 규칙이 이김)
        k = s.find('\n# SPA 폴백')
        if k < 0:
            k = re.search(r'\n/\*\s+/app\.html', s).start()
        s = s[:k] + '\n' + '\n'.join(redirect_lines(a, '  ')) + s[k:]
    # 다른 규칙(옛 코드명 → 옛 브랜드 주소)의 목적지도 새 주소로 — 두 번 넘기지 않게
    s = re.sub(r'(\s)/%s/(:splat|\s|$)' % re.escape(a.old_dir), lambda x: x.group(1) + '/%s/' % a.new_dir + x.group(2), s, flags=re.M)
    # 위 치환이 방금 넣은 '옛 → 새' 301 의 출발지는 건드리지 않았는지 확인
    assert '/%s/*' % a.old_dir in s
    return s


def t_toml(s, a, pairs):
    pat = re.compile(r'\[\[redirects\]\][^\n]*\n  from = "/%s/\*"\n  to = "/%s/:splat"\n  status = 200\n' % ((re.escape(a.old_dir),) * 2))
    m = pat.search(s)
    if not m:  # 최근 사이트는 _redirects 에만 규칙이 있다(_redirects 가 먼저 읽혀 301 은 거기서 충분)
        return re.sub(r'(to = ")/%s/' % re.escape(a.old_dir), r'\1/%s/' % a.new_dir, s)
    head = m.group(0).split('\n')[0]
    for o, n in pairs:
        head = head.replace(o, n)
    blocks = [head + '\n  from = "/%s/*"\n  to = "/%s/:splat"\n  status = 200\n' % (a.new_dir, a.new_dir)]
    for frm, to in [('/%s/*' % a.old_dir, '/%s/:splat' % a.new_dir), ('/%s' % a.old_dir, '/%s/' % a.new_dir)] + (
            [('/samples/%s' % a.old_slug, '/samples/%s/' % a.new_slug), ('/samples/%s/*' % a.old_slug, '/samples/%s/' % a.new_slug)]
            if a.new_slug != a.old_slug else []):
        blocks.append('\n[[redirects]]\n  from = "%s"\n  to = "%s"\n  status = 301\n' % (frm, to))
    s = s[:m.start()] + ''.join(blocks) + s[m.end():]
    s = re.sub(r'(to = ")/%s/' % re.escape(a.old_dir), r'\1/%s/' % a.new_dir, s)
    return s


def main():
    ap = argparse.ArgumentParser()
    for k in ('old_dir', 'new_dir', 'old_slug', 'new_slug', 'brand'):
        ap.add_argument(k)
    ap.add_argument('--map', action='append', default=[])
    ap.add_argument('--apply', action='store_true', help='작업 판 파일만 고친다')
    ap.add_argument('--stage', action='store_true', help='HEAD+변환을 인덱스에 올린다 — 커밋 바로 앞에서만')
    a = ap.parse_args()
    sys.stdout.reconfigure(encoding='utf-8')
    pairs = sorted((tuple(x.split('=', 1)) for x in a.map), key=lambda p: -len(p[0]))
    jobs = [('src/lib/samples.ts', lambda s: t_samples(s, a, pairs)),
            ('public/_redirects', lambda s: t_redirects(s, a)),
            ('netlify.toml', lambda s: t_toml(s, a, pairs))]
    for path, fn in jobs:
        # --stage 는 인덱스 판(처음엔 HEAD 와 같음)에 건다 — 여러 곳을 연달아 올려도 앞 곳 변경이 쌓인다
        head = git('show', (':' if a.stage else 'HEAD:') + path).decode('utf-8')
        h2 = fn(head)
        if a.stage:
            # 작업 판은 --apply 로 이미 고쳐 둔 상태. HEAD+변환만 인덱스에 올린다.
            blob = git('hash-object', '-w', '--stdin', data=h2.encode('utf-8')).decode().strip()
            mode = git('ls-files', '-s', path).decode().split()[0]
            git('update-index', '--cacheinfo', '%s,%s,%s' % (mode, blob, path))
            continue
        work = io.open(os.path.join(ROOT, path), encoding='utf-8', newline='').read()
        w2 = fn(work)
        print('%-20s HEAD %+d자 · 작업판 %+d자' % (path, len(h2) - len(head), len(w2) - len(work)))
        if a.apply:
            # 다른 프로세스(git grep 등)가 파일을 매핑 중이면 비우기가 Errno 22 로 막힌다 — 잠깐 쉬고 다시
            for n in range(30):
                try:
                    io.open(os.path.join(ROOT, path), 'w', encoding='utf-8', newline='').write(w2)
                    break
                except OSError:
                    if n == 29:
                        raise
                    time.sleep(1)
    if a.stage:
        print('스테이징됨:', git('diff', '--cached', '--stat').decode('utf-8', 'replace').strip().split('\n')[-1])


if __name__ == '__main__':
    main()
