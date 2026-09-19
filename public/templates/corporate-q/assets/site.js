const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const menu = document.querySelector('.menu-button');
const drawer = document.querySelector('.mobile-drawer');
const dim = document.querySelector('.drawer-dim');
const closeBtn = document.querySelector('.drawer-close');
let drawerReturnFocus = null;

const focusableSelector = 'a[href],button:not([disabled]),summary,input,select,textarea,[tabindex]:not([tabindex="-1"])';

function visibleFocusable(root) {
  return [...root.querySelectorAll(focusableSelector)].filter((element) => {
    const style = getComputedStyle(element);
    return style.visibility !== 'hidden' && style.display !== 'none' && element.getClientRects().length > 0;
  });
}

function setDrawer(open) {
  if (!drawer) return;
  drawer.classList.toggle('open', open);
  dim?.classList.toggle('on', open);
  drawer.setAttribute('aria-hidden', String(!open));
  menu?.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) {
    drawerReturnFocus = document.activeElement;
    closeBtn?.focus();
  } else if (drawerReturnFocus instanceof HTMLElement) {
    drawerReturnFocus.focus();
  }
}

if (drawer) {
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-modal', 'true');
  drawer.setAttribute('aria-label', '전체 메뉴');
}

menu?.addEventListener('click', () => setDrawer(true));
closeBtn?.addEventListener('click', () => setDrawer(false));
dim?.addEventListener('click', () => setDrawer(false));
document.addEventListener('keydown', (event) => {
  if (!drawer?.classList.contains('open')) return;
  if (event.key === 'Escape') {
    setDrawer(false);
    return;
  }
  if (event.key !== 'Tab') return;
  const items = visibleFocusable(drawer);
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

function animateScrollTo(target, duration = 500) {
  if (reducedMotion.matches) {
    scrollTo(0, target);
    return;
  }
  const start = scrollY;
  const distance = target - start;
  const startedAt = performance.now();
  const easeOutCubic = (progress) => 1 - Math.pow(1 - progress, 3);
  const frame = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    scrollTo(0, start + distance * easeOutCubic(progress));
    if (progress < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

document.querySelector('.to-top')?.addEventListener('click', () => animateScrollTo(0, 500));

document.querySelector('.home-popup>button')?.addEventListener('click', (event) => {
  event.currentTarget.parentElement.remove();
});

document.querySelectorAll('[data-demo]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const output = form.querySelector('.form-status');
    if (output) output.textContent = '포트폴리오 데모가 정상 작동했습니다. 실제 전송은 연결되지 않습니다.';
  });
});

function activateButtonGroup(group, index, moveFocus = false) {
  const buttons = [...group.querySelectorAll('button')];
  if (!buttons.length) return;
  const activeIndex = (index + buttons.length) % buttons.length;
  buttons.forEach((button, buttonIndex) => {
    const active = buttonIndex === activeIndex;
    button.classList.toggle('on', active);
    button.classList.toggle('selected', active);
    button.setAttribute('aria-selected', String(active));
    button.tabIndex = active ? 0 : -1;
  });
  if (moveFocus) buttons[activeIndex].focus();
  group.dispatchEvent(new CustomEvent('tabchange', { detail: { index: activeIndex, button: buttons[activeIndex] } }));
}

document.querySelectorAll('.filter-tabs,.home-tabs,.search-tabs').forEach((group) => {
  group.setAttribute('role', 'tablist');
  const buttons = [...group.querySelectorAll('button')];
  buttons.forEach((button, index) => {
    button.setAttribute('role', 'tab');
    button.addEventListener('click', () => {
      activateButtonGroup(group, index);
      if (group.matches('.filter-tabs,.search-tabs')) {
        const url = new URL(location.href);
        url.hash = index ? `tab=${index}` : '';
        history.pushState({ tab: index }, '', url);
      }
    });
    button.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const current = buttons.indexOf(document.activeElement);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : current + (event.key === 'ArrowRight' ? 1 : -1);
      activateButtonGroup(group, next, true);
    });
  });
  const hashIndex = Number(new URLSearchParams(location.hash.slice(1)).get('tab'));
  activateButtonGroup(group, Number.isInteger(hashIndex) && hashIndex >= 0 && hashIndex < buttons.length ? hashIndex : Math.max(0, buttons.findIndex((button) => button.classList.contains('on') || button.classList.contains('selected'))));
  addEventListener('popstate', () => {
    const index = Number(new URLSearchParams(location.hash.slice(1)).get('tab'));
    activateButtonGroup(group, Number.isInteger(index) && index >= 0 && index < buttons.length ? index : 0);
  });
});

document.querySelectorAll('.filter-tabs').forEach((group) => {
  const cards = [...group.parentElement.querySelectorAll('.gallery-grid > a')];
  const updateFilter = ({ detail }) => {
    cards.forEach((card, index) => {
      const visible = detail.index === 0 || index % Math.max(group.children.length - 1, 1) === detail.index - 1;
      card.hidden = !visible;
      card.setAttribute('aria-hidden', String(!visible));
    });
  };
  group.addEventListener('tabchange', updateFilter);
  const activeIndex = [...group.querySelectorAll('button')].findIndex((button) => button.getAttribute('aria-selected') === 'true');
  updateFilter({ detail: { index: Math.max(0, activeIndex) } });
});

document.querySelectorAll('.search-tabs').forEach((group) => {
  const results = [...document.querySelectorAll('.search-results > article')];
  const updateResults = ({ detail }) => {
    results.forEach((result, index) => {
      const visible = detail.index === 0 || index % Math.max(group.children.length - 1, 1) === detail.index - 1;
      result.hidden = !visible;
    });
  };
  group.addEventListener('tabchange', updateResults);
  const activeIndex = [...group.querySelectorAll('button')].findIndex((button) => button.getAttribute('aria-selected') === 'true');
  updateResults({ detail: { index: Math.max(0, activeIndex) } });
});

function createAutoplay(root, delay, advance) {
  let timer = null;
  let manuallyPaused = false;
  const start = () => {
    clearInterval(timer);
    const interacting = root.matches(':hover') || root.contains(document.activeElement);
    if (!manuallyPaused && !reducedMotion.matches && !interacting) timer = setInterval(advance, delay);
  };
  const stop = () => clearInterval(timer);
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', (event) => {
    if (!root.contains(event.relatedTarget)) start();
  });
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  reducedMotion.addEventListener('change', start);
  start();
  return {
    restart: start,
    stop,
    toggle(button) {
      manuallyPaused = !manuallyPaused;
      button.setAttribute('aria-pressed', String(manuallyPaused));
      button.setAttribute('aria-label', manuallyPaused ? '자동재생 시작' : '자동재생 정지');
      button.textContent = manuallyPaused ? '▶' : 'Ⅱ';
      if (manuallyPaused) stop(); else start();
    }
  };
}

function bindSwipe(root, previous, next) {
  let startX = null;
  let startY = null;
  root.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse') return;
    startX = event.clientX;
    startY = event.clientY;
  }, { passive: true });
  root.addEventListener('pointerup', (event) => {
    if (startX === null || startY === null) return;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    startX = null;
    startY = null;
    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    if (deltaX > 0) previous(); else next();
  }, { passive: true });
}

const hero = document.querySelector('.ref-hero');
if (hero) {
  hero.classList.add('preparing');
  const slides = [...hero.querySelectorAll('.hero-scene-slide')];
  const dots = [...hero.querySelectorAll('.hero-pagination button')];
  const toggle = hero.querySelector('.hero-toggle');
  let current = 0;
  const show = (next) => {
    current = (next + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === current);
      slide.setAttribute('aria-hidden', String(index !== current));
    });
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === current);
      dot.setAttribute('aria-current', index === current ? 'true' : 'false');
    });
  };
  const autoplay = createAutoplay(hero, 4000, () => show(current + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => {
    show(index);
    autoplay.restart();
  }));
  toggle?.addEventListener('click', () => autoplay.toggle(toggle));
  bindSwipe(hero, () => {
    show(current - 1);
    autoplay.restart();
  }, () => {
    show(current + 1);
    autoplay.restart();
  });
  requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('entered')));

  const scrollButton = document.createElement('button');
  scrollButton.type = 'button';
  scrollButton.className = 'main-scroll-control';
  scrollButton.innerHTML = '<span>SCROLL</span><i></i>';
  scrollButton.setAttribute('aria-label', '다음 콘텐츠로 이동');
  scrollButton.addEventListener('click', () => animateScrollTo(Math.max(0, innerWidth - 100), 650));
  hero.append(scrollButton);
}

const notice = document.querySelector('.ref-notice');
if (notice) {
  const tabs = [...notice.querySelectorAll('[role="tab"]')];
  const panels = [...notice.querySelectorAll('.notice-panel')];
  let current = 0;
  const show = (next, moveFocus = false) => {
    current = (next + panels.length) % panels.length;
    tabs.forEach((tab, index) => {
      const active = index === current;
      tab.classList.toggle('selected', active);
      tab.classList.toggle('on', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && moveFocus) tab.focus();
    });
    panels.forEach((panel, index) => {
      panel.classList.toggle('active', index === current);
      panel.setAttribute('aria-hidden', String(index !== current));
      panel.querySelectorAll('a').forEach((link) => link.tabIndex = index === current ? 0 : -1);
    });
  };
  const autoplay = createAutoplay(notice, 3000, () => show(current + 1));
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      show(index);
      autoplay.restart();
      const url = new URL(location.href);
      url.hash = index ? `notice=${index}` : '';
      history.pushState({ notice: index }, '', url);
    });
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1), true);
      autoplay.restart();
    });
  });
  const noticeIndex = Number(new URLSearchParams(location.hash.slice(1)).get('notice'));
  show(Number.isInteger(noticeIndex) && noticeIndex >= 0 && noticeIndex < tabs.length ? noticeIndex : 0);
  addEventListener('popstate', () => {
    const index = Number(new URLSearchParams(location.hash.slice(1)).get('notice'));
    show(Number.isInteger(index) && index >= 0 && index < tabs.length ? index : 0);
  });
}

const promo = document.querySelector('.promo-popup');
if (promo) {
  const track = promo.querySelector('.promo-track');
  const cards = [...track.children];
  const counter = promo.querySelector('.promo-controls b');
  const toggle = promo.querySelector('.promo-toggle');
  let current = 0;
  const show = (next) => {
    current = (next + cards.length) % cards.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    if (counter) counter.textContent = String(current + 1);
    cards.forEach((card, index) => card.setAttribute('aria-hidden', String(index !== current)));
  };
  const autoplay = createAutoplay(promo, 3000, () => show(current + 1));
  promo.querySelector('.promo-prev')?.addEventListener('click', () => {
    show(current - 1);
    autoplay.restart();
  });
  promo.querySelector('.promo-next')?.addEventListener('click', () => {
    show(current + 1);
    autoplay.restart();
  });
  toggle?.addEventListener('click', () => autoplay.toggle(toggle));
  bindSwipe(promo, () => {
    show(current - 1);
    autoplay.restart();
  }, () => {
    show(current + 1);
    autoplay.restart();
  });
  show(0);
}

const partners = document.querySelector('.partners');
if (partners) {
  const track = partners.querySelector('.partner-track');
  if (!track.parentElement.classList.contains('partner-window')) {
    const windowElement = document.createElement('div');
    windowElement.className = 'partner-window';
    track.before(windowElement);
    windowElement.append(track);
  }
  const partnerNames = ['산업혁신부', '에너지연구협의회', '국가과학기술원', '산업기술진흥원', '탄소중립지원센터', '한국에너지공단', '에너지경제연구원', '한국전력공사', '전력거래소', '신재생에너지협회', '국가연구재단'];
  if (track.children.length < partnerNames.length) {
    partnerNames.slice(track.children.length).forEach((name) => {
      const item = document.createElement('span');
      item.textContent = name;
      track.append(item);
    });
  }
  let toggle = partners.querySelector('.partner-toggle');
  if (!toggle) {
    toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'partner-toggle';
    toggle.setAttribute('aria-label', '자동재생 정지');
    toggle.setAttribute('aria-pressed', 'false');
    toggle.textContent = 'Ⅱ';
    partners.querySelector('.partner-next')?.before(toggle);
  }
  const originalItems = [...track.children];
  originalItems.forEach((item) => track.append(item.cloneNode(true)));
  let current = 0;
  let moving = false;
  const visibleCount = () => window.innerWidth <= 420 ? 1.5 : window.innerWidth <= 780 ? 2.5 : window.innerWidth <= 1100 ? 3.5 : 5;
  const render = (animate = true) => {
    track.style.transition = animate && !reducedMotion.matches ? 'transform 1000ms ease' : 'none';
    const item = track.firstElementChild;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = item ? item.getBoundingClientRect().width + gap : 0;
    track.style.transform = `translateX(-${current * step}px)`;
    track.querySelectorAll('span').forEach((item, index) => item.setAttribute('aria-hidden', String(index < current || index >= current + Math.ceil(visibleCount()))));
  };
  const settle = () => {
    moving = false;
    if (current >= originalItems.length) {
      current = 0;
      render(false);
    }
  };
  const next = () => {
    if (moving) return;
    moving = true;
    current += 1;
    render();
    if (reducedMotion.matches) settle();
  };
  const previous = () => {
    if (moving) return;
    if (current === 0) {
      current = originalItems.length;
      render(false);
      track.getBoundingClientRect();
    }
    moving = true;
    current -= 1;
    render();
    if (reducedMotion.matches) settle();
  };
  track.addEventListener('transitionend', settle);
  const autoplay = createAutoplay(partners, 5000, next);
  partners.querySelector('.partner-prev')?.addEventListener('click', () => {
    previous();
    autoplay.restart();
  });
  partners.querySelector('.partner-next')?.addEventListener('click', () => {
    next();
    autoplay.restart();
  });
  toggle?.addEventListener('click', () => autoplay.toggle(toggle));
  bindSwipe(partners, () => {
    previous();
    autoplay.restart();
  }, () => {
    next();
    autoplay.restart();
  });
  window.addEventListener('resize', () => render(false));
  render(false);
}

const videoStage = document.querySelector('.video-stage');
if (videoStage) {
  const playButton = videoStage.querySelector('button');
  playButton?.setAttribute('aria-pressed', 'false');
  playButton?.addEventListener('click', () => {
    const playing = videoStage.classList.toggle('is-playing');
    playButton.setAttribute('aria-pressed', String(playing));
    playButton.setAttribute('aria-label', playing ? '영상 일시정지' : '영상 재생');
    playButton.textContent = playing ? 'Ⅱ' : '▶';
  });
}

document.querySelector('#site-search')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = document.querySelector('#query').value.trim();
  if (query) {
    const safeQuery = query.replace(/[<>]/g, '');
    document.querySelector('.search-summary').innerHTML = `<b>‘${safeQuery}’</b> 검색 결과 총 <strong>48</strong>건입니다.`;
    const url = new URL(location.href);
    url.searchParams.set('q', safeQuery);
    history.replaceState(null, '', url);
  }
});

const queryFromUrl = new URLSearchParams(location.search).get('q');
if (queryFromUrl && document.querySelector('#query')) {
  document.querySelector('#query').value = queryFromUrl;
  document.querySelector('#site-search')?.dispatchEvent(new Event('submit', { cancelable: true }));
}

document.querySelectorAll('.board-tools form').forEach((form) => {
  const input = form.querySelector('input');
  const rows = [...form.closest('.sub-content').querySelectorAll('.board-list .board-row:not(.board-head)')];
  let status = form.parentElement.querySelector('.board-search-status');
  if (!status) {
    status = document.createElement('p');
    status.className = 'board-search-status';
    status.setAttribute('role', 'status');
    form.parentElement.append(status);
  }
  const filter = () => {
    const keyword = input.value.trim().toLocaleLowerCase('ko');
    let visibleCount = 0;
    rows.forEach((row) => {
      const visible = !keyword || row.textContent.toLocaleLowerCase('ko').includes(keyword);
      row.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    status.textContent = keyword ? `${visibleCount}개의 결과가 표시됩니다.` : '';
    const url = new URL(location.href);
    if (keyword) url.searchParams.set('q', keyword); else url.searchParams.delete('q');
    history.replaceState(null, '', url);
  };
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    filter();
  });
  if (queryFromUrl) {
    input.value = queryFromUrl;
    filter();
  }
});

document.querySelectorAll('.pagination').forEach((pagination) => {
  const buttons = [...pagination.querySelectorAll('button')];
  const pageButtons = buttons.filter((button) => /^\d+$/.test(button.textContent.trim()));
  const setPage = (page) => {
    const bounded = Math.min(Math.max(page, 1), pageButtons.length);
    pageButtons.forEach((button) => {
      const active = Number(button.textContent) === bounded;
      button.classList.toggle('on', active);
      if (active) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
    });
    const url = new URL(location.href);
    if (bounded === 1) url.hash = ''; else url.hash = `page-${bounded}`;
    history.pushState({ page: bounded }, '', url);
  };
  buttons.forEach((button, index) => button.addEventListener('click', () => {
    const current = Number(pageButtons.find((item) => item.classList.contains('on'))?.textContent || 1);
    const label = button.textContent.trim();
    if (/^\d+$/.test(label)) setPage(Number(label));
    else if (label === '«') setPage(1);
    else if (label === '‹') setPage(current - 1);
    else if (label === '›') setPage(current + 1);
    else if (label === '»') setPage(pageButtons.length);
  }));
  const restore = () => {
    const match = location.hash.match(/^#page-(\d+)$/);
    const page = match ? Math.min(Math.max(Number(match[1]), 1), pageButtons.length) : 1;
    pageButtons.forEach((button) => {
      const active = Number(button.textContent) === page;
      button.classList.toggle('on', active);
      if (active) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
    });
  };
  addEventListener('popstate', restore);
  restore();
});

const searchButtons = [...document.querySelectorAll('.search-button')];
if (searchButtons.length) {
  const overlay = document.createElement('div');
  overlay.className = 'search-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = '<div class="search-overlay-panel" role="dialog" aria-modal="true" aria-labelledby="search-overlay-title"><button type="button" class="search-overlay-close" aria-label="검색 닫기">×</button><p>ENERGY INNOVATION</p><h2 id="search-overlay-title">통합검색</h2><form><label for="overlay-query">검색어</label><div><input id="overlay-query" autocomplete="off" placeholder="검색어를 입력해 주세요"><button type="submit">검색</button></div></form></div>';
  document.body.append(overlay);
  const panel = overlay.querySelector('.search-overlay-panel');
  const input = overlay.querySelector('input');
  const close = overlay.querySelector('.search-overlay-close');
  let returnFocus = null;
  const setSearchOpen = (open) => {
    overlay.classList.toggle('open', open);
    overlay.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('overlay-open', open);
    if (open) {
      returnFocus = document.activeElement;
      setTimeout(() => input.focus(), 210);
    } else if (returnFocus instanceof HTMLElement) returnFocus.focus();
  };
  searchButtons.forEach((button) => button.addEventListener('click', (event) => {
    event.preventDefault();
    setSearchOpen(true);
  }));
  close.addEventListener('click', () => setSearchOpen(false));
  overlay.addEventListener('pointerdown', (event) => {
    if (!panel.contains(event.target)) setSearchOpen(false);
  });
  overlay.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (query) location.href = `search.html?q=${encodeURIComponent(query)}`;
  });
  document.addEventListener('keydown', (event) => {
    if (!overlay.classList.contains('open')) return;
    if (event.key === 'Escape') setSearchOpen(false);
    if (event.key !== 'Tab') return;
    const items = visibleFocusable(panel);
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

const header = document.querySelector('.site-header');
const mega = document.querySelector('.mega');
if (header && mega) {
  mega.id = 'global-mega-menu';
  const navLinks = [...header.querySelectorAll('.top-nav-link')];
  navLinks.forEach((link) => {
    link.setAttribute('aria-controls', mega.id);
    link.setAttribute('aria-expanded', 'false');
  });
  const setMegaOpen = (open) => {
    header.classList.toggle('mega-open', open);
    navLinks.forEach((link) => link.setAttribute('aria-expanded', String(open)));
  };
  header.querySelector('.top-nav')?.addEventListener('mouseenter', () => setMegaOpen(true));
  header.addEventListener('mouseleave', () => setMegaOpen(false));
  header.addEventListener('focusin', (event) => setMegaOpen(event.target.closest('.top-nav,.mega') !== null));
  header.addEventListener('focusout', (event) => {
    if (!header.contains(event.relatedTarget)) setMegaOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !header.classList.contains('mega-open')) return;
    setMegaOpen(false);
    navLinks.find((link) => link.getAttribute('aria-expanded') === 'true')?.focus();
  });
}

document.querySelectorAll('.mobile-nav details').forEach((details) => details.addEventListener('toggle', () => {
  if (!details.open) return;
  details.parentElement.querySelectorAll('details').forEach((other) => {
    if (other !== details) other.open = false;
  });
}));

const homeSections = [...document.querySelectorAll('.ref-home main > section')];
if (homeSections.length) {
  document.documentElement.classList.add('motion-ready');
  let ticking = false;
  const updateSections = () => {
    const top = scrollY;
    const viewport = innerHeight;
    homeSections.forEach((section, index) => {
      const trigger = index === 0 ? section.offsetTop + viewport / 2 : section.offsetTop - (index === 3 ? viewport / 2 : viewport / 1.2);
      section.classList.toggle('motion-active', top >= Math.max(0, trigger));
    });
    if (homeSections[0]) homeSections[0].classList.toggle('motion-active', top < (homeSections[1]?.offsetTop || Infinity) - viewport / 2);
    ticking = false;
  };
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateSections);
  }, { passive: true });
  addEventListener('resize', updateSections);
  updateSections();
}

const gallery = document.querySelector('.gallery-grid');
if (gallery) {
  const cards = [...gallery.querySelectorAll(':scope > a')];
  const modal = document.createElement('div');
  modal.className = 'gallery-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = '<div class="gallery-dialog" role="dialog" aria-modal="true" aria-labelledby="gallery-modal-title"><button type="button" class="gallery-close" aria-label="갤러리 닫기">×</button><button type="button" class="gallery-prev" aria-label="이전 이미지">‹</button><div class="gallery-stage"><div class="gallery-stage-image"></div><small></small><h2 id="gallery-modal-title"></h2></div><button type="button" class="gallery-next" aria-label="다음 이미지">›</button><div class="gallery-thumbs" role="tablist" aria-label="이미지 선택"></div></div>';
  document.body.append(modal);
  const thumbs = modal.querySelector('.gallery-thumbs');
  const dialog = modal.querySelector('.gallery-dialog');
  let current = 0;
  let returnFocus = null;
  const showCard = (index, push = false) => {
    current = (index + cards.length) % cards.length;
    const sourceImage = cards[current].querySelector('.gallery-image');
    const targetImage = modal.querySelector('.gallery-stage-image');
    const sourceStyle = getComputedStyle(sourceImage);
    targetImage.style.cssText = sourceImage.style.cssText;
    targetImage.style.backgroundImage = sourceStyle.backgroundImage;
    targetImage.style.backgroundPosition = sourceStyle.backgroundPosition;
    targetImage.style.backgroundSize = sourceStyle.backgroundSize;
    targetImage.className = `${sourceImage.className} gallery-stage-image`;
    modal.querySelector('.gallery-stage small').textContent = cards[current].querySelector('small')?.textContent || '';
    modal.querySelector('.gallery-stage h2').textContent = cards[current].querySelector('h3')?.textContent || `갤러리 ${current + 1}`;
    [...thumbs.children].forEach((thumb, thumbIndex) => {
      thumb.classList.toggle('on', thumbIndex === current);
      thumb.setAttribute('aria-selected', String(thumbIndex === current));
    });
    const galleryHash = `#gallery-${current + 1}`;
    if (push) history.pushState({ gallery: current }, '', galleryHash);
    else if (location.hash.startsWith('#gallery-')) history.replaceState({ gallery: current }, '', galleryHash);
  };
  cards.forEach((card, index) => {
    const thumb = document.createElement('button');
    thumb.type = 'button';
    thumb.setAttribute('role', 'tab');
    thumb.setAttribute('aria-label', `${index + 1}번 이미지 보기`);
    thumb.innerHTML = card.querySelector('.gallery-image').outerHTML;
    thumb.addEventListener('click', () => showCard(index));
    thumbs.append(thumb);
    card.addEventListener('click', (event) => {
      event.preventDefault();
      returnFocus = card;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('overlay-open');
      showCard(index, true);
      modal.querySelector('.gallery-close').focus();
    });
  });
  const closeGallery = (useHistory = true) => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overlay-open');
    if (useHistory && location.hash.startsWith('#gallery-')) history.back();
    returnFocus?.focus();
  };
  modal.querySelector('.gallery-close').addEventListener('click', () => closeGallery());
  modal.querySelector('.gallery-prev').addEventListener('click', () => showCard(current - 1));
  modal.querySelector('.gallery-next').addEventListener('click', () => showCard(current + 1));
  bindSwipe(dialog, () => showCard(current - 1), () => showCard(current + 1));
  modal.addEventListener('pointerdown', (event) => {
    if (!dialog.contains(event.target)) closeGallery();
  });
  document.addEventListener('keydown', (event) => {
    if (!modal.classList.contains('open')) return;
    if (event.key === 'Escape') closeGallery();
    if (event.key === 'ArrowLeft') showCard(current - 1);
    if (event.key === 'ArrowRight') showCard(current + 1);
  });
  addEventListener('popstate', () => {
    if (!location.hash.startsWith('#gallery-') && modal.classList.contains('open')) closeGallery(false);
  });
}

const faqLinks = [...document.querySelectorAll('.customer-feedback a')].filter((link) => link.textContent.trim().toUpperCase() === 'FAQ');
if (faqLinks.length) {
  const faqModal = document.createElement('div');
  faqModal.className = 'faq-modal';
  faqModal.setAttribute('aria-hidden', 'true');
  faqModal.innerHTML = '<section role="dialog" aria-modal="true" aria-labelledby="faq-title"><button class="faq-close" type="button" aria-label="FAQ 닫기">×</button><small>NEIA CUSTOMER SERVICE</small><h2 id="faq-title">자주 묻는 질문</h2><div class="faq-list"><details><summary>사업 공고와 접수 일정은 어디에서 확인하나요?</summary><p>공지·공시의 사업공고 메뉴에서 분야별 공고와 접수 일정을 확인할 수 있습니다.</p></details><details><summary>R&amp;D 과제 담당자는 어떻게 찾나요?</summary><p>기관소개의 직원검색에서 부서 또는 담당 업무로 검색할 수 있습니다.</p></details><details><summary>정보공개 청구는 어떻게 진행하나요?</summary><p>정보공개 메뉴의 공개청구 및 처리절차를 확인한 뒤 안내된 절차에 따라 신청할 수 있습니다.</p></details></div></section>';
  document.body.append(faqModal);
  const faqPanel = faqModal.querySelector('section');
  let faqReturnFocus = null;
  const setFaqOpen = (open, updateHistory = true) => {
    faqModal.classList.toggle('open', open);
    faqModal.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('overlay-open', open);
    if (open) {
      faqReturnFocus = document.activeElement;
      if (updateHistory) history.pushState({ faq: true }, '', '#faq');
      faqModal.querySelector('.faq-close').focus();
    } else {
      if (updateHistory && location.hash === '#faq') history.back();
      faqReturnFocus?.focus();
    }
  };
  faqLinks.forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    setFaqOpen(true);
  }));
  faqModal.querySelector('.faq-close').addEventListener('click', () => setFaqOpen(false));
  faqModal.addEventListener('pointerdown', (event) => {
    if (!faqPanel.contains(event.target)) setFaqOpen(false);
  });
  faqModal.querySelectorAll('details').forEach((details) => details.addEventListener('toggle', () => {
    if (!details.open) return;
    details.parentElement.querySelectorAll('details').forEach((other) => {
      if (other !== details) other.open = false;
    });
  }));
  document.addEventListener('keydown', (event) => {
    if (!faqModal.classList.contains('open')) return;
    if (event.key === 'Escape') setFaqOpen(false);
    if (event.key !== 'Tab') return;
    const items = visibleFocusable(faqPanel);
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  addEventListener('popstate', () => {
    if (location.hash !== '#faq' && faqModal.classList.contains('open')) setFaqOpen(false, false);
  });
}
