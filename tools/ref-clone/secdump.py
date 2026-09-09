import json,sys,io
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8',errors='replace')
s=sys.argv[1]; lo=int(sys.argv[2]); hi=int(sys.argv[3])
d=json.load(open(f'spec-{s}/live-1440.json',encoding='utf-8'))
for e in d['els']:
    y=e['y']; 
    if not (lo<=y<hi): continue
    if e['w']<24 or e['h']<12: continue
    t=(e['txt'] or '').replace('\n',' ')[:46]
    med=''
    if e['tag'] in ('IMG','VIDEO','img','video'): med=f" SRC:{(e['src'] or '')[-22:]}"
    f=(e['font'] or '')[:44]
    bg=(e['bg'] or '')
    r=(e['radius'] or '')
    pad=(e['pad'] or '')
    print(f"{y:6d} {e['x']:5d} {e['w']:5d}x{e['h']:<5d} d{e['d']:<2d} {e['tag'][:6]:6s} {bg[:22]:22s} r{r[:12]:12s} p{pad[:18]:18s} {f:44s} {t}{med}")
