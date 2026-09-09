# geo.py TSV 두 개를 받아 "칠해진 상자"를 위치로 짝지어 7열(배경·라운드·테두리·패딩·그림자·투명도·크기)을 대조한다.
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

C = dict(y=0, x=1, w=2, h=3, d=4, tag=5, bg=6, rd=7, pd=8, gap=9, bd=10, sh=11, op=15, t=16, bgi=17)


def load(f):
    out = []
    for ln in io.open(f, encoding='utf-8'):
        if ln.startswith('#'):
            continue
        c = ln.rstrip('\n').split('\t')
        if len(c) < 17:
            continue
        if len(c) == 17:
            c.append('-')
        if c[10][:3] == '0px':
            c[10] = '-'   # 두께 0 이면 테두리 색은 상속값일 뿐이다
        y, x, w, h = (int(float(v)) for v in c[:4])
        if w < 24 or h < 12 or x < -50:
            continue
        painted = (c[6] != 'rgba(0,0,0,0)' or c[10] != '-'
                   or c[11] != '-' or c[7] != '0px' or c[17] != '-')
        if not painted:
            continue
        out.append(c)
    return out


ref, mine = load(sys.argv[1]), load(sys.argv[2])
lo = int(sys.argv[3]) if len(sys.argv) > 3 else 0
hi = int(sys.argv[4]) if len(sys.argv) > 4 else 10 ** 9
used = set()
print('| ref y·x w×h | 배경 | 라운드 | 테두리 | 패딩 | 그림자 | 투명도 |')
print('|---|---|---|---|---|---|---|')
bad = miss = tot = 0
for r in ref:
    ry, rx, rw, rh = (int(float(v)) for v in r[:4])
    if not (lo <= ry < hi):
        continue
    tot += 1
    best = None
    for i, m in enumerate(mine):
        if i in used:
            continue
        my, mx, mw, mh = (int(float(v)) for v in m[:4])
        d = abs(my - ry) + abs(mx - rx) + abs(mw - rw) * .5 + abs(mh - rh) * .5
        if abs(my - ry) <= 8 and abs(mx - rx) <= 8 and abs(mw - rw) <= 10 and abs(mh - rh) <= 10:
            if best is None or d < best[0]:
                best = (d, i, m)
    if best is None:
        miss += 1
        print(f"| {ry}·{rx} {rw}×{rh} `{r[5]}` | **짝 없음** | {r[6]} | r{r[7]} | {r[10]} | {r[11][:26]} | |")
        continue
    used.add(best[1])
    m = best[2]
    diffs = []
    for lab, k in (('배경', 'bg'), ('배경그림', 'bgi'), ('라운드', 'rd'), ('테두리', 'bd'), ('패딩', 'pd'), ('그림자', 'sh'), ('투명도', 'op')):
        a, b = r[C[k]], m[C[k]]
        if a != b:
            diffs.append(f"{lab} {a} → {b}")
    if diffs:
        bad += 1
        print(f"| {ry}·{rx} {rw}×{rh} `{r[5]}` | " + ' <br> '.join(diffs) + ' |')
print(f"\n칠해진 상자 ref {tot} · 짝 없음 {miss} · 값 다름 {bad} · 일치 {tot-miss-bad}")
