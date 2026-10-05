# -*- coding: utf-8 -*-
"""
이로한의원 자리사진 — 실제 사진이 들어올 때까지 레이아웃을 볼 수 있게 깐다.

슬롯 크기는 마크업의 width/height 와 **반드시 같아야** 한다. 다르면 축소본
반올림 때문에 쪽 높이가 어긋난다(이전에 밟은 함정).

진짜 사진이 설치되면 이 스크립트는 다시 돌리지 말 것.
"""
import io, os
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.abspath(os.path.join(HERE, '..', '..', 'public', 'iro', 'assets'))

# (파일명, 폭, 높이, 화면에 적을 설명)
SLOTS = (
    [('in-%d.jpg' % i, 1240, 395, t) for i, t in enumerate(
        ['히어로 1 · 진맥', '히어로 2 · 탕전실', '히어로 3 · 치료실'], 1)] +
    [('bk-%d.jpg' % i, 1240, 580, t) for i, t in enumerate(
        ['진료실', '탕전실', '추나 치료실', '약재실', '회복실'], 1)] +
    [('tr-%d.jpg' % i, 440, 609, t) for i, t in enumerate(
        ['침·약침', '추나', '맞춤 한약', '공진단', '부항·뜸', '다이어트'], 1)] +
    [('trw-%d.jpg' % i, 640, 480, t) for i, t in enumerate(
        ['침·약침 (가로)', '추나 (가로)', '맞춤 한약 (가로)', '공진단 (가로)',
         '부항·뜸 (가로)', '다이어트 (가로)'], 1)] +
    [('tv-1.jpg', 760, 950, '침 치료실 (세로)')] +
    [('cs-%d.jpg' % i, 720, 540, t) for i, t in enumerate(
        ['목·어깨', '허리', '교통사고', '무릎', '소화', '산후', '수면', '다이어트', '안면마비'], 1)] +
    [('rv-%d.jpg' % i, 775, 438, '후기 %d' % i) for i in range(1, 7)] +
    [('ab-1.jpg', 760, 950, '소개 · 진료실'), ('ab-2.jpg', 760, 950, '소개 · 탕전실')] +
    [('map.jpg', 1600, 700, '약도'), ('ep-bg.jpg', 1600, 900, '예약 배경'),
     ('og.jpg', 1200, 630, '공유 미리보기')]
)

BG_A, BG_B = (0x2E, 0x6A, 0x4F), (0xDC, 0xEA, 0xE1)   # --pri → 연한 틴트

# 전부 같은 톤이면 화면이 밍밍해 보이고 preflight [3] 명암 폭 검사에도 걸린다.
# 실제 사진은 어두운 컷과 밝은 컷이 섞이므로 자리사진도 칸마다 톤을 흩어 둔다.
TONE = {'in': .35, 'bk': .55, 'tr': .95, 'trw': .80, 'tv': .45,
        'cs': 1.25, 'rv': 1.05, 'ab': .40, 'map': 1.45, 'ep': .25, 'og': .70}


def tone_of(name):
    key = name.split('-')[0].split('.')[0]
    return TONE.get(key, 1.0)


def shade(c, k):
    return tuple(max(0, min(255, int(v * k))) for v in c)


def font(px):
    for name in ('malgunbd.ttf', 'malgun.ttf'):
        try:
            return ImageFont.truetype('C:/Windows/Fonts/' + name, px)
        except OSError:
            pass
    return ImageFont.load_default()


def make(path, w, h, label, k=1.0):
    im = Image.new('RGB', (w, h))
    d = ImageDraw.Draw(im)
    a0, b0 = shade(BG_A, k), shade(BG_B, k)
    for y in range(h):                       # 세로 그라데이션
        t = y / max(1, h - 1)
        d.line([(0, y), (w, y)], fill=tuple(int(a + (b - a) * t) for a, b in zip(a0, b0)))
    # 자리임을 알 수 있게 대각선
    for x0 in range(-h, w, 56):
        d.line([(x0, 0), (x0 + h, h)], fill=(255, 255, 255), width=1)
    size = max(15, min(w, h) // 11)
    f = font(size)
    txt = '%s\n%d × %d' % (label, w, h)
    bb = d.multiline_textbbox((0, 0), txt, font=f, align='center', spacing=size // 3)
    x, y = (w - (bb[2] - bb[0])) // 2, (h - (bb[3] - bb[1])) // 2
    d.multiline_text((x + 1, y + 1), txt, font=f, fill=(0, 0, 0), align='center', spacing=size // 3)
    d.multiline_text((x, y), txt, font=f, fill=(255, 255, 255), align='center', spacing=size // 3)
    im.save(path, 'JPEG', quality=82, optimize=True)


def main():
    if not os.path.isdir(OUT):
        os.makedirs(OUT)
    total = 0
    for name, w, h, label in SLOTS:
        p = os.path.join(OUT, name)
        make(p, w, h, label, tone_of(name))
        total += os.path.getsize(p)
    print('자리사진 %d장, 합계 %.2f MB' % (len(SLOTS), total / 1048576))


if __name__ == '__main__':
    main()
