/**
 * 당근 비즈프로필 가격 메뉴에 올리는 가격표 사진을 사이트에서 그대로 찍는다.
 *
 * 요금을 바꾸면 사이트만 고치고 당근 가격표를 놓치기 쉬워서 만들었다.
 * 03_프리미엄_라인_요금.png 은 /web-solutions 의 프리미엄 카드다. 템플릿 요금과는
 * 무관하지만 버튼 글자색·브랜드 파랑이 바뀌면 같이 다시 찍어야 한다.
 *
 *   npm run dev   (5173 이 떠 있어야 한다)
 *   node tools/promo-cards/shot_price_cards.mjs
 */
import { chromium } from 'file:///C:/web-project/mintcl-netlify-spa/node_modules/playwright/index.mjs';

const OUT = 'C:/Users/진수/Desktop/개발/당근_가격표_20261005';

const JOBS = [
  { file: '01_템플릿_요금표.png',       url: 'http://localhost:5173/website/price', find: 'table', w: 1280 },
  // lg:grid-cols-4 가 1024px 부터라 그 아래에서 찍어야 체크 목록이 원본과 같은 2열이 된다.
  { file: '02_템플릿_프리미엄_비교.png', url: 'http://localhost:5173/web-solutions', find: 'diff',  w: 1000 },
  { file: '03_프리미엄_라인_요금.png',   url: 'http://localhost:5173/web-solutions', find: 'tiers', w: 1280 },
];

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 1400 }, deviceScaleFactor: 2 });

for (const job of JOBS) {
  await p.setViewportSize({ width: job.w, height: 1400 });
  await p.goto(job.url, { waitUntil: 'networkidle', timeout: 120000 });
  await p.addStyleTag({ content: '*{opacity:1!important;transform:none!important;transition:none!important}'
    + ' [role="tooltip"]{opacity:0!important;visibility:hidden!important}' });
  await p.waitForTimeout(1200);

  // clip 좌표 계산 대신 요소에 직접 여백을 줘서 제목이 잘리지 않게 한다
  const el = await p.evaluateHandle((find) => {
    let n;
    if (find === 'table') {
      n = document.querySelector('table');
    } else if (find === 'tiers') {
      // 프리미엄 요금 카드 세 장(브랜드 페이지 · 쇼핑몰 · 리뉴얼)을 감싼 격자
      const h = [...document.querySelectorAll('h3,strong,p,span')]
        .find(x => x.textContent.trim() === '브랜드 페이지');
      n = h?.closest('div.grid') ?? null;
    } else {
      const h = [...document.querySelectorAll('h2,h3')].find(x => x.textContent.includes('무엇이 다를까요'));
      n = h?.closest('section') ?? h?.parentElement?.parentElement;
    }
    if (n) { n.style.padding = '28px'; n.style.background = '#fff'; }
    return n ?? null;
  }, job.find);

  if (!(await el.evaluate(n => !!n))) { console.log('FAIL 요소 못 찾음:', job.file); continue; }
  await el.asElement().scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
  await el.asElement().screenshot({ path: `${OUT}/${job.file}` });
  const box = await el.asElement().boundingBox();
  console.log('OK', job.file, Math.round(box.width) + 'x' + Math.round(box.height), '(2x)');
}
await b.close();
