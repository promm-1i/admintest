/**
 * 이로한의원 사례형 상세용 캡처.
 *
 * 규격은 tools/ref-clone/capture_premium_cases.mjs 와 같게 맞췄다
 * (main 1440x900 · page-* 960x600 · point-* 1280 · m-* 390x844@1.5 · -sm 800px).
 * 공용 도구를 쓰지 않은 이유: 거기 config 를 건드리면 다른 템플릿 캡처까지
 * 같이 다시 돌아간다.
 *
 *   npm run dev   (5173 이 떠 있어야 한다)
 *   node tools/compose/iro_cases.mjs
 */
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/iro';
const DIR = join(process.cwd(), 'public', 'cases', 'iro');

const PAGES = ['index', 'about', 'treatment', 't-chimgu', 'cases', 'reviews', 'location', 'contact'];
const POINTS = [
  ['steps', 'index', '.steps'],       // 이식 1 · ondam
  ['cases', 'index', '.cs'],          // 이식 2 · haesol
  ['faq', 'index', '.fq-sec'],        // 이식 3 · bodien
  ['subjects', 'index', '.sl'],       // 베이스 · 진료과목 플립
  ['numbers', 'index', '.dt'],        // 베이스 · 숫자
  ['rooms', 'index', '.bk'],          // 베이스 · 공간 슬라이더
];
const MOBILE = ['index', 'treatment', 'cases', 'contact'];

mkdirSync(DIR, { recursive: true });
const browser = await chromium.launch();

async function open(file, viewport, dsf = 1) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: dsf, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/${file}.html`, { waitUntil: 'networkidle', timeout: 60000 });
  // 등장 효과와 전환을 즉시 끝내 캡처마다 같은 상태가 되게 한다
  await page.addStyleTag({
    content: 'html{scroll-behavior:auto!important}'
      + '*,*::before,*::after{animation-delay:0s!important;animation-duration:0s!important;'
      + 'transition-delay:0s!important;transition-duration:0s!important}',
  });
  await page.waitForTimeout(400);
  return { ctx, page };
}

async function shot(file, path, viewport, dsf = 1) {
  const { ctx, page } = await open(file, viewport, dsf);
  try { await page.screenshot({ path: path.replace(/\.webp$/, '.png'), type: 'png' }); }
  finally { await ctx.close(); }
}

async function point(file, sel, path) {
  const { ctx, page } = await open(file, { width: 1280, height: 900 });
  try {
    const el = page.locator(sel).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await el.screenshot({ path: path.replace(/\.webp$/, '.png'), type: 'png' });
  } finally { await ctx.close(); }
}

await shot('index', join(DIR, 'main.webp'), { width: 1440, height: 900 });
for (const f of PAGES) await shot(f, join(DIR, `page-${f}.webp`), { width: 960, height: 600 });
for (const [n, f, sel] of POINTS) await point(f, sel, join(DIR, `point-${n}.webp`));
for (const f of MOBILE) await shot(f, join(DIR, `m-${f}.webp`), { width: 390, height: 844 }, 1.5);
await browser.close();

const toWebp = String.raw`
from pathlib import Path
from PIL import Image
import sys
root = Path(sys.argv[1])
for src in root.rglob('*.png'):
    with Image.open(src) as im:
        im.convert('RGB').save(src.with_suffix('.webp'), 'WEBP', quality=84, method=6)
    src.unlink()
for src in root.rglob('*.webp'):
    if src.name.startswith('m-') or src.name.endswith('-sm.webp'):
        continue
    with Image.open(src) as im:
        out = im.copy() if im.width <= 800 else im.resize((800, round(im.height * 800 / im.width)), Image.Resampling.LANCZOS)
    out.save(src.with_name(src.stem + '-sm.webp'), 'WEBP', quality=82, method=6)
print('webp 변환 완료')
`;
const r = spawnSync('python', ['-c', toWebp, DIR], { stdio: 'inherit' });
if (r.status !== 0) process.exit(r.status ?? 1);
console.log('[iro] 사례 캡처 완료');
