# -*- coding: utf-8 -*-
"""레퍼런스와 구현본의 섹션 흐름을 나란히 뽑아 통째로 빠진 섹션을 찾는다.

  python outline.py <ref.tsv> <mine.tsv> <ref최소글자크기> <내최소글자크기>

geo.py 로 뜬 TSV 두 개를 받는다. 프레이머는 제목을 글자 단위로 쪼개 놓으므로
y 밴드(기본 170px)로 묶어 밴드마다 가장 크고 긴 텍스트 하나만 남긴다.
verify_template.sh 는 가로스크롤·깨진이미지만 보고 섹션 누락은 못 잡는다. 이걸 같이 돌린다."""
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
COLS='top left w h depth tag bg radius pad gap border shadow font family color opacity text bgimg'.split()

def outline(path, minsize, band=170):
    rows=[]
    for i,l in enumerate(io.open(path,encoding='utf-8')):
        if i==0: continue
        p=l.rstrip('\n').split('\t')
        if len(p)<18: p+=['']*(18-len(p))
        d=dict(zip(COLS,p))
        try: fs=float(d['font'].split('/')[0])
        except: continue
        t=re.sub(r'\s+',' ',d['text']).strip()
        if not t or fs<minsize or len(t)<2: continue
        rows.append((int(float(d['top'])), round(fs), t[:44]))
    rows.sort()
    out=[]; cur=[]
    for r in rows:
        if cur and r[0]-cur[0][0] > band:
            best=max(cur, key=lambda x:(x[1], len(x[2])))
            out.append((cur[0][0], best[1], best[2])); cur=[]
        cur.append(r)
    if cur:
        best=max(cur, key=lambda x:(x[1], len(x[2]))); out.append((cur[0][0], best[1], best[2]))
    return out

ref,mine,rs,ms = sys.argv[1],sys.argv[2],float(sys.argv[3]),float(sys.argv[4])
R=outline(ref, rs); M=outline(mine, ms)
print('  레퍼런스 섹션 %d개%s내 것 %d개'%(len(R),' '*36,len(M)))
print('  '+'-'*100)
for i in range(max(len(R),len(M))):
    a='%6d %3dpx %-34s'%R[i] if i<len(R) else ' '*48
    b='%6d %3dpx %-34s'%M[i] if i<len(M) else ''
    print('  %-48s| %s'%(a,b))
