/**
 * 사례형 상세(/samples/<slug>)의 POINT 캡처를 선택자로 다시 찍는다.
 *
 * 2026-10-15: 빛결안과 · 온연피부과의 point-*.webp 가 제목과 다른 장면으로 찍혀 있었다
 * (스크롤 좌표로 잡은 캡처가 고정 구간 · 늦은 마운트 때문에 밀린 것으로 보인다).
 * 좌표 대신 섹션 선택자로 잡고, 1440×900 으로 찍어 기존 규격인 960×600 으로 줄인다.
 *
 *   BASE=http://127.0.0.1:5191 node tools/compose/case_points.mjs <설정이름>
 *
 * 설정 이름은 아래 JOBS 의 키. 사이트마다 선택자가 달라 손으로 적는다.
 */
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { chromium } from 'playwright';

const BASE = process.env.BASE || 'http://127.0.0.1:5191';

const JOBS = {
  bitgyeol: {
    folder: 'clinic-j',
    page: 'bitgyeol/index.html',
    shots: [
      ['point-warranty', 'section.eb-scx-grnx', 0],   // 수술 보증서
      ['point-way', 'section.eb-scx-mp', 130],        // 오시는 길 · 약도(130px 내려야 역삼역 출구 표지가 안 잘린다)
    ],
  },
  onyeon: {
    folder: 'clinic-m',
    page: 'onyeon/index.html',
    shots: [
      ['point-program', 'section.oy-hm-sctx-ntrx', 0],   // 피부 고민별 진료 항목
      ['point-doctors', 'section.oy-hm-sctx-dr', 0],     // 의료진과 진료 원칙 (스크롤 방식으로 맞음)
    ],
  },
};

const CLOSE = () => {
  for (const e of document.querySelectorAll('body *')) {
    const s = getComputedStyle(e);
    if (s.display === 'none') continue;
    const name = (e.id + ' ' + (typeof e.className === 'string' ? e.className : '')).toLowerCase();
    const r = e.getBoundingClientRect();
    const cover = ['fixed', 'absolute'].includes(s.position) && +s.zIndex >= 100
      && r.width * r.height > innerWidth * innerHeight * 0.35 && r.top < innerHeight * 0.5;
    const named = /(popup|modal|layer|dim)/.test(name) && s.position !== 'static' && r.width > innerWidth * 0.5;
    if (cover || named) e.style.setProperty('display', 'none', 'important');
  }
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
};

const key = process.argv[2];
const job = JOBS[key];
if (!job) { console.log('설정 없음:', key, '· 있는 것:', Object.keys(JOBS).join(', ')); process.exit(1); }
const DIR = join(process.cwd(), 'public', 'cases', job.folder);

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto(`${BASE}/${job.page}`, { waitUntil: 'networkidle', timeout: 90000 });
await page.addStyleTag({
  content: 'html{scroll-behavior:auto!important}'
    + '*,*::before,*::after{animation-delay:0s!important;animation-duration:0s!important;'
    + 'transition-delay:0s!important;transition-duration:0s!important}'
    + '[data-aos],[data-animate]{opacity:1!important;transform:none!important}'
    // 글자가 위에서 떨어지는 제목(온연 .oy-tx-anix)은 가려진 자리에서 시작한다 — 제자리에 세워 둔다
    + '[class*="-anix"],[class*="-ani "],[class*="txt-ani"]{opacity:1!important;transform:none!important;animation:none!important}',
});
await page.waitForTimeout(600);
await page.evaluate(CLOSE);
// 글자 하나씩 떠오르는 제목(온연 oy-tx-anix)은 스크롤이 닿아야 켜진다 — 한 번 훑고 강제로 보이게
await page.evaluate(async () => {
  const doc = document.documentElement.scrollHeight;
  for (let y = 0; y < doc; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
  window.scrollTo(0, 0);
  await new Promise(r => setTimeout(r, 400));
  for (const e of document.querySelectorAll('main *, section *')) {
    const cs = getComputedStyle(e);
    if (parseFloat(cs.opacity) < 0.9) { e.style.setProperty('opacity', '1', 'important'); e.style.setProperty('transform', 'none', 'important'); }
  }
});
await page.waitForTimeout(300);

const made = [];
for (const [name, sel, off] of job.shots) {
  const box = await page.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { y: Math.round(r.top + scrollY), h: Math.round(r.height) };
  }, sel);
  if (!box) { console.log('못 찾음:', sel); continue; }
  const y = Math.max(0, (box.h < 900 ? box.y - Math.round((900 - box.h) / 2) : box.y - 40) + (off || 0));
  if (process.env.CLIP) {
    // 스크롤해 찍으면 고정 · 늦은 마운트 구간에서 밀린다 — 문서 좌표로 바로 오려 낸다
    await page.screenshot({ path: join(DIR, `${name}.png`), type: 'png', fullPage: true,
      clip: { x: 0, y, width: 1440, height: 900 } });
  } else {
    await page.evaluate((t) => window.scrollTo(0, t), y);
    await page.waitForTimeout(700);
    await page.evaluate(CLOSE);
    await page.waitForTimeout(200);
    await page.screenshot({ path: join(DIR, `${name}.png`), type: 'png' });
  }
  made.push(name);
  console.log(name, '← y', y, '· 섹션 높이', box.h);
}
await ctx.close();
await browser.close();

const toWebp = String.raw`
from pathlib import Path
from PIL import Image
import sys
root = Path(sys.argv[1])
for stem in sys.argv[2:]:
    src = root / (stem + '.png')
    with Image.open(src) as im:
        im.convert('RGB').resize((960, 600), Image.Resampling.LANCZOS).save(root / (stem + '.webp'), 'WEBP', quality=84, method=6)
    src.unlink()
    with Image.open(root / (stem + '.webp')) as im:
        out = im.copy() if im.width <= 800 else im.resize((800, round(im.height * 800 / im.width)), Image.Resampling.LANCZOS)
        out.save(root / (stem + '-sm.webp'), 'WEBP', quality=82, method=6)
`;
const r = spawnSync('python', ['-c', toWebp, DIR, ...made], { stdio: 'inherit' });
if (r.status !== 0) process.exit(r.status ?? 1);
console.log(`[${key}] point 다시 찍음:`, made.join(', '));
