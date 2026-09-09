# geo.py TSV 두 개를 y 순서로 섞어 출력한다(텍스트를 가진 최말단 요소만). R=레퍼런스 M=내것
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')


def load(f, tag):
    rows, seen = [], {}
    for ln in io.open(f, encoding='utf-8'):
        if ln.startswith('#'):
            continue
        c = ln.rstrip('\n').split('\t')
        if len(c) < 17 or not c[16]:
            continue
        y, x, w, h, d = (int(float(v)) for v in c[:5])
        if w < 8 or h < 8:
            continue
        k = (y, x, w, h)
        if k in seen and int(seen[k][4]) >= d:
            continue
        seen[k] = c
    for k, c in seen.items():
        rows.append((tag, c))
    return rows


a = sys.argv
rows = load(a[1], 'R') + load(a[2], 'M')
lo = int(a[3]) if len(a) > 3 else 0
hi = int(a[4]) if len(a) > 4 else 10 ** 9
rows = [r for r in rows if lo <= int(r[1][0]) < hi]
rows.sort(key=lambda r: (int(r[1][0]), 0 if r[0] == 'R' else 1, int(r[1][1])))
for t, c in rows:
    print(f"{t} {int(c[0]):>5}·{int(c[1]):<5}{int(c[2]):>5}×{int(c[3]):<4} {c[5]:<5}{c[12]:<12}{c[13][:13]:<13}{c[14]:<20}{c[16][:44]}")
