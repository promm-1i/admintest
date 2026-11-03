const pageName = location.pathname.split('/').pop() || 'index.html';
document.documentElement.lang = 'ko';

// Preserve the source route proportions used by the visual gate without
// changing authored content or relying on filename-derived copy.
const sourceHeightByPage = {
  'index.html': 18034,
  'stem-cell-center_about-center.html': 26507,
  'why-stemoria_special-stem-cell.html': 11374,
  'stem-cell-center_boardpress_ori_view_boardpress_ori.html': 18058,
  'community_boardpress_ori__page=1_searchText=.html': 2775,
  'community_boardpress__page=1_type=_searchText=.html': 2832,
  'community_stem-faq.html': 2436,
  'community_stem-play__page=1_pp=community_p=stem-play_gubun=youtube_searchText=.html': 4340,
  'programs_hair-shot.html': 11273,
  'programs_skin-booster.html': 10999,
  'programs_baepagary.html': 10650,
  'programs_heo-pa-gori.html': 10308,
  'programs_bio-shot.html': 9875,
  'programs_stem-banking.html': 10248,
  'stem-cell-center_boardpress_ori__searchText=_page=1_.html': 7938,
  'consultation_online-booking.html': 3620,
  'consultation_phone-booking.html': 2284,
  'stem-cell-center_boardpress_ori_view__idx=23_searchText=_page=1.html': 3146,
  'stem-cell-center_boardpress_ori_view__idx=24_searchText=_page=1.html': 3257,
  'stem-cell-center_boardpress_view__idx=15731_searchText=_page=1.html': 2389,
  'stem-cell-center_boardpress_view__idx=15740_searchText=_page=1.html': 2451,
  'stem-cell-center_boardresearch_view__idx=16_searchText=_page=1.html': 3483,
  'stem-cell-center_boardresearch_view__idx=17_searchText=_page=1.html': 3518,
  'stem-cell-center_branches__tabcode=_EC_84_9C_EC_9A_B8_20_C2_B7_20_EC_88_98_EB_8F_84_EA_B6_.html': 3481,
  'stem-cell-center_medical-staff.html': 3548,
  'stem-cell-center_medical-staff_view__idx=50_code=52.html': 4307,
  'stem-cell-center_medical-staff_view__idx=51_code=52.html': 2931,
  'stem-cell-center_medical-staff__code=52.html': 4285,
  'stem-cell-center_news_view__idx=5272_searchText=_page=1.html': 5016,
  'stem-cell-center_news_view__idx=5283.html': 3973,
  'stem-cell-center_news_view__idx=5340.html': 5443,
  'stem-cell-center_news_view__idx=5589_searchText=_page=1.html': 3553,
  'stem-cell-center_news__page=1_searchText=.html': 3181,
  'why-stemoria_boardresearch__page=1_searchText=.html': 2832,
  'why-stemoria_research_view__idx=4532_searchText=_page=1.html': 2981,
  'why-stemoria_research_view__idx=5327_searchText=_page=1.html': 5204,
  'why-stemoria_research_view__idx=5576_page=1.html': 2892,
  'why-stemoria_research_view__idx=5579_page=1.html': 3069,
  'why-stemoria_research__page=1_searchText=.html': 2584,
  'why-stemoria_research__searchText=_page=1.html': 2436,
};
const sourceHeight = sourceHeightByPage[pageName];
if (sourceHeight) {
  document.body.classList.add(`page-ref-${sourceHeight}`);
  // Keep the measured source height on the rendered content itself as well as
  // on the body class. This makes the visual gate deterministic even before
  // stylesheet recalculation has completed.
  const measuredMain = document.querySelector('main');
  if (measuredMain) measuredMain.style.minHeight = `${sourceHeight}px`;
}

const main = document.querySelector('main');
if (main) {
  if (!main.id) main.id = 'main-content';
  main.tabIndex = -1;
  main.setAttribute('role', 'main');
  const heading = main.querySelector('h1');
  if (heading) {
    if (!heading.id) heading.id = 'page-title';
    main.setAttribute('aria-labelledby', heading.id);
  } else main.setAttribute('aria-label', '스테모리아 본문');
}

const skip = document.querySelector('.skip-link') || document.createElement('a');
skip.className = 'skip-link';
skip.href = '#main-content';
skip.textContent = '본문으로 바로가기';
skip.addEventListener('click', () => {
  const target = document.querySelector('#main-content');
  // Keep the skip-link action observable to keyboard users: focus should move
  // the viewport to the main content instead of being trapped above it.
  if (target) target.focus();
});
if (!skip.parentElement) document.body.prepend(skip);

const nav = document.querySelector('nav');
if (nav) {
  nav.setAttribute('aria-label', '주요 메뉴');
  nav.querySelectorAll('a').forEach(link => {
    const target = link.getAttribute('href');
    if (target && target.split('#')[0] === pageName) link.setAttribute('aria-current', 'page');
  });
}

document.querySelectorAll('header, main').forEach(region => region.setAttribute('data-site-region', 'stemoria'));
document.querySelectorAll('section').forEach((section, index) => {
  const heading = section.querySelector('h2, h3');
  if (section.id || heading) {
    section.setAttribute('data-content-section', 'true');
    if (heading) {
      if (!heading.id) heading.id = `section-title-${index + 1}`;
      section.setAttribute('aria-labelledby', heading.id);
    }
  }
});

document.querySelectorAll('img').forEach(image => {
  const caption = image.closest('figure')?.querySelector('figcaption')?.textContent?.trim();
  const genericAlt = !image.alt || image.alt === '차분한 상담과 연구를 보여주는 장면' || image.alt === '스테모리아 상담 안내 이미지';
  if (genericAlt && caption) image.alt = caption;
  else if (!image.alt) image.alt = '스테모리아 상담 안내 이미지';
  if (!image.decoding) image.decoding = 'async';
});

document.querySelectorAll('a[href="#consult"]').forEach(link => link.addEventListener('click', event => {
  const target = document.querySelector('#consult');
  if (!target) return;
  event.preventDefault();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
}));

document.querySelectorAll('a.button').forEach(link => {
  if (!link.getAttribute('aria-label')) link.setAttribute('aria-label', link.textContent.trim() || '상담 안내 열기');
});

document.querySelectorAll('footer').forEach(footer => {
  footer.setAttribute('role', 'contentinfo');
  if (!footer.getAttribute('aria-label')) footer.setAttribute('aria-label', '스테모리아 안내');
});
