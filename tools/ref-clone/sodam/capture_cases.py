# -*- coding: utf-8 -*-
"""소담한의원(clinic-i) 사례 소개용 캡처 — capture_premium_cases.mjs 와 같은 규격.

  (public 폴더를 8765 로 띄운 뒤) python tools/ref-clone/sodam/capture_cases.py

public/cases/clinic-i/ 에 main.webp(1440×900) · page-*.webp(960×600) · point-*.webp(1280 폭 요소)
· m-*.webp(390×844 @1.5) 와 각 -sm.webp(800 폭) 를, public/thumbs/clinic-i.jpg(1280×960) 를 만든다.
움직임 줄이기 상태로 찍는다(고정 연출이 풀려 첫 화면에 원장 사진과 문장이 함께 보인다).
"""
import os
from pathlib import Path
from PIL import Image
from playwright.sync_api import sync_playwright

BASE = 'http://127.0.0.1:8765/sodam/'
ROOT = Path(__file__).resolve().parents[3] / 'public'
OUT = ROOT / 'cases' / 'clinic-i'
PAGES = ['index', 'diagnosis', 'neck-pain', 'diet-principle', 'beauty-skin', 'traffic-injury',
         'before-after', 'about', 'doctors', 'location']
POINTS = [('diff', 'index', '#diff .diff__body'), ('proof', 'index', '#proof'), ('diet', 'index', '#diet'),
          ('promise', 'index', '.promise'), ('special', 'index', '.special__row'), ('story', 'index', '#story'),
          ('orbit', 'diagnosis', '.dx'), ('steps', 'neck-pain', '.ostep'), ('hacc', 'diet-body-type', '.bacc'),
          ('glass', 'mental-health', '.sym4')]
MOBILE = ['index', 'neck-pain', 'diet-principle', 'location']
FREEZE = ('html{scroll-behavior:auto!important}*,*::before,*::after{animation-delay:0s!important;'
          'animation-duration:0s!important;transition-delay:0s!important;transition-duration:0s!important}'
          '.hd[data-hide="1"]{transform:none!important}')

def page(b, name, vp, dpr=1):
    ctx = b.new_context(viewport=vp, device_scale_factor=dpr, reduced_motion='reduce', is_mobile=vp['width'] < 600)
    ctx.add_init_script("try{localStorage.setItem('sodam_notice_hide',String(Date.now()+864e5))}catch(e){}")  # 공지 팝업을 닫은 상태로
    pg = ctx.new_page()
    pg.goto(BASE + ('' if name == 'index' else name + '.html'), wait_until='networkidle')
    pg.add_style_tag(content=FREEZE)
    pg.evaluate("document.querySelectorAll('.rv').forEach(e=>e.classList.add('on'));document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager')")
    pg.wait_for_load_state('networkidle'); pg.wait_for_timeout(400)
    return ctx, pg

def webp(png, keep_sm=True):
    p = Path(png)
    with Image.open(p) as im:
        im = im.convert('RGB'); im.save(p.with_suffix('.webp'), 'WEBP', quality=84, method=6)
        if keep_sm and not p.name.startswith('m-'):
            sm = im if im.width <= 800 else im.resize((800, round(im.height * 800 / im.width)), Image.LANCZOS)
            sm.save(p.with_name(p.stem + '-sm.webp'), 'WEBP', quality=82, method=6)
    p.unlink()

OUT.mkdir(parents=True, exist_ok=True)
with sync_playwright() as p:
    b = p.chromium.launch()
    ctx, pg = page(b, 'index', {'width': 1440, 'height': 900})
    pg.screenshot(path=str(OUT / 'main.png')); webp(OUT / 'main.png'); ctx.close()
    ctx, pg = page(b, 'index', {'width': 1280, 'height': 960})
    pg.screenshot(path=str(ROOT / 'thumbs' / 'clinic-i.jpg'), type='jpeg', quality=74); ctx.close()
    for n in PAGES:
        # 960 폭은 이 디자인의 모바일 구간(1000 미만)이라 1440×900 으로 찍고 960×600 으로 줄인다
        ctx, pg = page(b, n, {'width': 1440, 'height': 900})
        pg.screenshot(path=str(OUT / f'page-{n}.png')); ctx.close()
        Image.open(OUT / f'page-{n}.png').resize((960, 600), Image.LANCZOS).save(OUT / f'page-{n}.png')
        webp(OUT / f'page-{n}.png')
    for key, n, sel in POINTS:
        ctx, pg = page(b, n, {'width': 1280, 'height': 900})
        pg.add_style_tag(content='.hd,.quick,.mbar,.skip,.dmbtn{visibility:hidden!important}')
        el = pg.locator(sel).first; el.scroll_into_view_if_needed(); pg.wait_for_timeout(900)
        el.screenshot(path=str(OUT / f'point-{key}.png')); webp(OUT / f'point-{key}.png'); ctx.close()
    for n in MOBILE:
        ctx, pg = page(b, n, {'width': 390, 'height': 844}, 1.5)
        pg.screenshot(path=str(OUT / f'm-{n}.png')); webp(OUT / f'm-{n}.png'); ctx.close()
    b.close()
print('캡처 완료 →', OUT, len(os.listdir(OUT)), '장')
