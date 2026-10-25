// 진행 상황 시트 — 구글 시트 [파일 > 공유 > 웹에 게시 > CSV] 주소를 넣으면 그걸 읽는다.
// 비어 있으면 data/status.csv(예시)를 읽는다.
const STATUS_CSV_URL = '';

const R = 707 / 500;          // 쪽 세로/가로
const MIN_W = 330;            // 쪽이 이보다 좁으면 한 쪽씩
const MAX_W = 560;

const book = document.getElementById('book');
const tabs = document.getElementById('tabs');
const now = document.getElementById('now');
const pages = [...book.querySelectorAll('.page')];
const last = pages.length - 1;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let flip;
let land = true;

/* 크기 — 화면에 책 전체가 들어오게 쪽 너비를 정한다 */
function layout() {
  const vw = document.documentElement.clientWidth;
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

function go(n) {
  n = Math.max(0, Math.min(last, n));
  if (visible(flip.getCurrentPageIndex()).includes(n)) return;
  if (reduce) { flip.turnToPage(n); sync(); } else flip.flip(n);
}

/* 진행 상황 — CSV 한 줄 = 활동 하나: 분야, 제목, 상태, 기간, 기관 */
const FIELDS = [
  { key: '공연, 축제, 행사', cls: 'c-plan', test: /공연|축제|행사|문화|엔터/ },
  { key: '농업', cls: 'c-link', test: /농업|치유|체험|관광/ },
  { key: '언론', cls: 'c-seek', test: /언론|취재|기사/ },
  { key: '컨설팅, 평가 자문', cls: 'c-grow', test: /컨설팅|브랜딩|코칭|평가|자문/ },
];
const ON = /중$/;            // 진행중 · 운영중 · 취재중
const PLAN = /^기획중$/;
const SHOW = 2;

function parseCSV(text) {
  const rows = [];
  let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') q = false;
      else cell += ch;
    } else if (ch === '"') q = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.map(r => r.map(c => c.trim())).filter(r => r.some(Boolean));
}

const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function renderStatus(rows) {
  const head = rows.shift() || [];
  const col = name => head.findIndex(h => h.replace(/\s/g, '') === name);
  const at = { field: col('분야'), title: col('제목'), state: col('상태'), when: col('기간'), org: col('기관') };
  const items = rows.map(r => ({
    field: r[at.field] || '', title: r[at.title] || '', state: r[at.state] || '',
    when: at.when < 0 ? '' : r[at.when] || '', org: at.org < 0 ? '' : r[at.org] || '',
  })).filter(x => x.title);

  const rank = s => ON.test(s) && !PLAN.test(s) ? 0 : PLAN.test(s) ? 1 : 2;
  const groups = FIELDS.map(f => {
    const mine = items.filter(x => f.test.test(x.field))
      .map((x, n) => ({ ...x, n })).sort((a, b) => rank(a.state) - rank(b.state) || a.n - b.n);
    if (!mine.length) return '';
    const shown = mine.slice(0, SHOW);
    const more = mine.length > SHOW ? `<span>외 ${mine.length - SHOW}건</span>` : '';
    const rows = shown.map((x, k) => {
      const kind = ['on', 'plan', 'done'][rank(x.state)];
      const meta = [x.org, x.when].filter(Boolean).map(esc).join(', ');
      const cls = [k === 0 && 'first', k === shown.length - 1 && 'last'].filter(Boolean).join(' ');
      const field = k === 0 ? `<th scope="rowgroup" rowspan="${shown.length}"><i class="dot"></i>${f.key.replace(/, /g, ',<br>')}${more}</th>` : '';
      return `<tr class="${cls}">${field}<td class="what"><p>${esc(x.title)}</p>${meta ? `<p>${meta}</p>` : ''}</td><td class="state state--${kind}">${esc(x.state)}</td></tr>`;
    }).join('');
    return `<tbody class="${f.cls}">${rows}</tbody>`;
  }).join('');
  document.getElementById('status').innerHTML = groups
    ? `<table class="sheet"><colgroup><col class="f"><col><col class="s"></colgroup><thead><tr><th scope="col">분야</th><th scope="col">활동</th><th scope="col">상태</th></tr></thead>${groups}</table>`
    : '<p class="status-msg">지금 올라온 활동이 없습니다.</p>';
}

async function loadStatus() {
  const url = STATUS_CSV_URL || 'data/status.csv';
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 5000);
  try {
    const res = await fetch(url, { signal: ctl.signal, cache: 'no-store' });
    if (!res.ok) throw new Error(res.status);
    renderStatus(parseCSV(await res.text()));
  } catch (e) {
    document.getElementById('status').innerHTML =
      '<p class="status-msg">진행 상황을 불러오지 못했습니다. 잠시 뒤 다시 열어 주세요.</p>';
  } finally {
    clearTimeout(timer);
  }
}

/* 명함 — 연락처 저장 · 주소 복사 */
function saveVCard() {
  const card = document.querySelector('.card');
  const name = card.querySelector('.card__name').textContent.trim();
  const role = card.querySelector('.card__role').textContent.trim();
  const tel = card.querySelector('a[href^="tel:"]').textContent.trim();
  const mail = card.querySelector('a[href^="mailto:"]').textContent.trim();
  const vcf = ['BEGIN:VCARD', 'VERSION:3.0', `N:${name};;;;`, `FN:${name}`, `TITLE:${role}`,
    `TEL;TYPE=CELL:${tel}`, `EMAIL:${mail}`, `URL:${location.origin + location.pathname}`, 'END:VCARD'].join('\r\n');
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

/* 시작 — 진행 상황을 먼저 채우고 책을 만든다(한 쪽 보기는 쪽을 복제해서 넘기기 때문) */
(async function start() {
  layout();
  window.addEventListener('resize', layout);
  await loadStatus();

  const m = location.hash.match(/^#p(\d+)$/);
  flip = new St.PageFlip(book, {
    width: 500, height: 707, size: 'stretch',
    minWidth: MIN_W, maxWidth: MAX_W, minHeight: Math.round(MIN_W * R) - 200, maxHeight: Math.round(MAX_W * R),
    showCover: true, usePortrait: true, autoSize: false,
    maxShadowOpacity: 0.35, flippingTime: reduce ? 300 : 800,
    mobileScrollSupport: false, startPage: m ? Math.min(+m[1], last) : 0,
  });
  flip.loadFromHTML(pages);
  flip.on('flip', sync);
  flip.on('changeOrientation', () => { sync(); });
  window.addEventListener('resize', () => requestAnimationFrame(placeTabs));

  book.classList.add('is-ready');
  tabs.classList.add('is-ready');
  sync();
})();
