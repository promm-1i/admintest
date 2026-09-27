# -*- coding: utf-8 -*-
"""사진 대응표(photo-map-*.txt)대로 임시 그림을 만든다. 이미 실제 사진이 있으면 건너뛴다(--force 로 덮어쓰기).
  python make_placeholders.py <photo-map.txt> <assets 폴더> <브랜드 표기> [--force]
"""
import sys, os
from PIL import Image, ImageDraw, ImageFont
TONES = {'warm': ((203,170,120),(150,118,76)), 'dark': ((58,44,30),(28,22,16)),
         'light': ((243,241,236),(214,206,192))}
def font(sz, bold=True):
    for f in ('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
              'C:/Windows/Fonts/segoeuib.ttf'):
        if os.path.exists(f): return ImageFont.truetype(f, sz)
    return ImageFont.load_default()
mp, out, brand = sys.argv[1], sys.argv[2], sys.argv[3]
force = '--force' in sys.argv
n = 0
for line in open(mp, encoding='utf-8'):
    if line.startswith('#') or not line.strip(): continue
    c = line.rstrip('\n').split('\t')
    fn, W, H, tone = c[2], int(c[5]), int(c[6]), (c[7] if len(c) > 7 else 'warm')
    p = os.path.join(out, fn)
    if os.path.exists(p) and not force: continue
    top, bot = TONES.get(tone, TONES['warm'])
    im = Image.new('RGB', (W, H)); d = ImageDraw.Draw(im)
    for y in range(H):
        t = y / max(1, H - 1)
        d.line([(0, y), (W, y)], fill=tuple(int(top[i] + (bot[i] - top[i]) * t) for i in range(3)))
    ink = (44,44,44) if tone == 'light' else (255,255,255)
    d.rectangle([0, 0, W - 1, H - 1], outline=ink, width=max(1, W // 600))
    s1, s2 = font(max(12, min(W, H) // 9)), font(max(10, min(W, H) // 22), False)
    for txt, f, dy in ((brand, s1, -0.08), ('%s  %d×%d' % (fn, W, H), s2, 0.06)):
        w = d.textlength(txt, font=f)
        if w > W * 0.92: continue
        d.text(((W - w) / 2, H / 2 + H * dy - f.size / 2), txt, font=f, fill=ink)
    im.save(p, quality=72, optimize=True); n += 1
print('만든 임시 그림', n)
