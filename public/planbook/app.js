const R = 707 / 500;          // 쪽 세로/가로
const MIN_W = 330;            // 쪽이 이보다 좁으면 한 쪽씩
const MAX_W = 560;

const book = document.getElementById('book');
const tabs = document.getElementById('tabs');
const now = document.getElementById('now');
const pages = [...book.querySelectorAll('.page')];
const last = pages.length - 1;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const touch = matchMedia('(pointer: coarse)').matches;
let flip;
let land = true;
let lastW = 0;

/* 크기 — 화면에 책 전체가 들어오게 쪽 너비를 정한다 */
function layout() {
  const vw = document.documentElement.clientWidth;
  if (!land && vw === lastW) return;   // 폰 주소창이 접히고 펴질 때(높이만 바뀜)는 책 크기를 그대로 둔다
  lastW = vw;
  const vh = window.innerHeight;
  let pw = Math.min((vw - 2 * 72) / 2, MAX_W, (vh - 40 - 56) / R);
  land = pw >= MIN_W;
  if (!land) pw = Math.min(vw - 24, MAX_W, (vh - 24 - 52 - 44) / R);
  pw = Math.floor(pw);
  book.style.width = (land ? 2 * pw : pw) + 'px';
  book.style.height = Math.round(pw * R) + 'px';
  document.body.classList.toggle('is-portrait', !land);
}

function placeTabs() {
  if (!land) { tabs.style.left = tabs.style.top = ''; return; }
  const r = book.getBoundingClientRect();
  const d = tabs.offsetParent.getBoundingClientRect();
  const i = flip ? flip.getCurrentPageIndex() : 0;
  const right = i === last ? r.left + r.width / 2 : r.right;   // 뒤표지만 펼친 왼쪽에
  const h = Math.min(72, (r.height * 0.86 - 6 * 4) / 7);
  tabs.style.setProperty('--tab-h', h + 'px');
  tabs.style.left = (right - d.left) + 'px';
  tabs.style.top = (r.top - d.top + r.height * 0.07) + 'px';
}

/* 지금 보이는 쪽 */
function visible(i) {
  if (!land || i === 0 || i === last) return [i];
  const s = i % 2 ? i : i - 1;
  return s + 1 < last ? [s, s + 1] : [s];
}

function sync(e) {
  const i = e && typeof e.data === 'number' ? e.data : flip.getCurrentPageIndex();
  const v = visible(i);
  tabs.querySelectorAll('button').forEach(b => b.classList.toggle('is-open', v.includes(+b.dataset.goto)));
  const nums = v.filter(n => n > 0 && n < last);
  now.textContent = v[0] === 0 ? '표지' : v[0] === last ? '뒤표지' : nums.join('–') + '쪽';
  document.querySelector('[data-step="-1"]').disabled = i === 0;
  document.querySelector('[data-step="1"]').disabled = v.includes(last);
  history.replaceState(null, '', i ? '#p' + v[0] : location.pathname + location.search);
  placeTabs();
}

/* 한 쪽 보기(폰)에서는 종이 말림 대신 쪽을 통째로 넘긴다 — 말림은 넘길 때마다 쪽을 복제해 사진이 깜빡인다 */
function setDensity() {
  const portrait = flip.getOrientation() === 'portrait';
  pages.forEach((el, i) => flip.getPage(i).setDensity(portrait || el.dataset.density === 'hard' ? 'hard' : 'soft'));
}

function go(n) {
  n = Math.max(0, Math.min(last, n));
  const v = visible(flip.getCurrentPageIndex());
  if (v.includes(n)) return;
  // 바로 옆 장만 넘김 효과로. 멀리 건너뛸 때 라이브러리는 목표 앞 장을 한 번 띄웠다 넘겨서 엉뚱한 쪽이 번쩍인다
  const near = visible(v[v.length - 1] + 1).includes(n) || visible(v[0] - 1).includes(n);
  if (reduce || !near) { flip.turnToPage(n); sync(); } else flip.flip(n);
}

/* 명함 — 연락처 저장 · 주소 복사 */
function saveVCard() {
  const card = document.querySelector('.card');
  const name = card.querySelector('.card__name').textContent.trim();
  const tel = card.querySelector('a[href^="tel:"]').textContent.trim();
  const vcf = ['BEGIN:VCARD', 'VERSION:3.0', `N:${name};;;;`, `FN:${name}`,
    `TEL;TYPE=CELL:${tel}`, `URL:${location.origin + location.pathname}`, 'END:VCARD'].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([vcf], { type: 'text/vcard;charset=utf-8' }));
  a.download = name + '.vcf';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

async function copyLink(btn) {
  const text = btn.textContent;
  try {
    await navigator.clipboard.writeText(location.origin + location.pathname);
    btn.textContent = '복사했습니다';
  } catch (e) {
    btn.textContent = '복사하지 못했습니다';
  }
  setTimeout(() => { btn.textContent = text; }, 1800);
}

document.addEventListener('click', e => {
  const g = e.target.closest('[data-goto]');
  if (g) { e.preventDefault(); go(+g.dataset.goto); return; }
  const s = e.target.closest('[data-step]');
  if (s) { +s.dataset.step > 0 ? flip.flipNext() : flip.flipPrev(); return; }
  const act = e.target.closest('[data-action]');
  if (act && act.dataset.action === 'vcard') saveVCard();
  if (act && act.dataset.action === 'copy') copyLink(act);
});

document.addEventListener('keydown', e => {
  if (!flip || e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.key === 'ArrowRight') flip.flipNext();
  if (e.key === 'ArrowLeft') flip.flipPrev();
});

/* 시작 */
(function start() {
  layout();
  window.addEventListener('resize', layout);

  const m = location.hash.match(/^#p(\d+)$/);
  flip = new St.PageFlip(book, {
    width: 500, height: 707, size: 'stretch',
    minWidth: MIN_W, maxWidth: MAX_W, minHeight: Math.round(MIN_W * R) - 200, maxHeight: Math.round(MAX_W * R),
    showCover: true, usePortrait: true, autoSize: false,
    maxShadowOpacity: 0.35, flippingTime: reduce ? 300 : 800,
    mobileScrollSupport: false, showPageCorners: false, useMouseEvents: !touch, startPage: m ? Math.min(+m[1], last) : 0,
  });
  flip.loadFromHTML(pages);
  setDensity();
  flip.on('flip', sync);
  flip.on('changeOrientation', () => { setDensity(); sync(); });

  /* 터치 기기 — 밀면 빠르든 느리든 한 장 넘긴다(라이브러리는 0.25초가 넘으면 끌기로 보고 되돌린다) */
  if (touch) {
    let sx = 0, sy = 0;
    book.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    book.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      dx < 0 ? flip.flipNext() : flip.flipPrev();
    }, { passive: true });
  }
  window.addEventListener('resize', () => requestAnimationFrame(placeTabs));

  book.querySelectorAll('img').forEach(img => img.decode().catch(() => {}));   // 숨은 쪽 사진도 미리 풀어 둔다
  book.classList.add('is-ready');
  tabs.classList.add('is-ready');
  sync();
})();
