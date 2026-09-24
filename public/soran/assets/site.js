/* 소란 풀빌라 — 공통 동작: 전체 메뉴 · 스크롤 등장 · 슬라이더 · 요금 아코디언 · 맨 위로 */
(function () {
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var body = document.body;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 전체 메뉴 열기/닫기 */
  var toggle = $('.menu-toggle'), panel = $('#gnbPanel');
  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    if (toggle) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    if (panel) panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (open && panel) { var f = $('a', panel); if (f) setTimeout(function () { f.focus(); }, 300); }
  }
  if (toggle) toggle.addEventListener('click', function () { setMenu(!body.classList.contains('menu-open')); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) { setMenu(false); toggle && toggle.focus(); }
  });
  /* 메뉴 항목에 올리면 오른쪽 사진 교체 */
  var pics = $$('.gnb-pics li');
  $$('.gnb-group').forEach(function (g, i) {
    var show = function () { pics.forEach(function (p, k) { p.classList.toggle('cur', k === i); }); };
    g.addEventListener('mouseover', show); g.addEventListener('focusin', show);
  });

  /* 스크롤 등장: 요소 상단 + 100px 이 화면 하단에 닿으면 .in */
  var items = $$('.sr, .sr-line, .sr-mask, .sr-rot, .sr-roll, .intro-title, .sp-list, .round-top, .guide-pic, .sp-txt h3');
  function reveal() {
    var vh = window.innerHeight;
    for (var i = items.length - 1; i >= 0; i--) {
      var el = items[i];
      if (el.getBoundingClientRect().top + 100 < vh) { el.classList.add('in'); items.splice(i, 1); }
    }
  }
  if (reduce) { items.forEach(function (el) { el.classList.add('in'); }); items = []; }
  else { setTimeout(reveal, 300); window.addEventListener('scroll', reveal, { passive: true }); window.addEventListener('resize', reveal); }

  /* 맨 위로 */
  $$('.to-top').forEach(function (b) {
    b.addEventListener('click', function () {
      var from = window.scrollY, t0 = null;
      if (reduce || !from) { window.scrollTo(0, 0); return; }
      var step = function (ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min(1, (ts - t0) / 1200), e = 0.5 - Math.cos(p * Math.PI) / 2; /* jQuery swing */
        window.scrollTo(0, from * (1 - e));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  });

  /* 공지 팝업: 닫기 / 하루 동안 보지 않기(브라우저 저장) / 끌어서 옮기기 */
  var pop = $('#noticePop');
  if (pop) {
    var key = 'soranPopHide', hideUntil = 0;
    try { hideUntil = +localStorage.getItem(key) || 0; } catch (e) {}
    if (Date.now() > hideUntil) pop.hidden = false;
    $$('[data-pop]', pop).forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.getAttribute('data-pop') === 'day') { try { localStorage.setItem(key, String(Date.now() + 864e5)); } catch (e) {} }
        pop.hidden = true;
      });
    });
    var drag = null, handle = $('.pop-body', pop);
    handle.addEventListener('pointerdown', function (e) {
      if (window.innerWidth <= 700) return;
      drag = { x: e.clientX - pop.offsetLeft, y: e.clientY - pop.offsetTop }; handle.setPointerCapture(e.pointerId);
    });
    handle.addEventListener('pointermove', function (e) {
      if (!drag) return;
      pop.style.left = Math.max(0, Math.min(window.innerWidth - pop.offsetWidth, e.clientX - drag.x)) + 'px';
      pop.style.top = Math.max(0, e.clientY - drag.y) + 'px';
    });
    handle.addEventListener('pointerup', function () { drag = null; });
  }

  /* 흐르는 문구: 레퍼런스 속도 0.515em/s (150px 기준 77px/s) */
  $$('.ticker-track').forEach(function (tr) {
    var sp = tr.querySelector('span');
    var set = function () {
      var fs = parseFloat(getComputedStyle(sp).fontSize) || 150;
      tr.style.animationDuration = (sp.offsetWidth / (fs * 0.515)).toFixed(2) + 's';
    };
    set(); window.addEventListener('resize', set);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(set);
  });

  /* 객실 요금 아코디언 */
  $$('.price-item').forEach(function (item) {
    var btn = $('.spec-head', item), bodyEl = $('.price-body', item), inner = $('.price-table', item);
    btn.addEventListener('click', function () {
      var open = !item.classList.contains('open');
      item.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      bodyEl.style.height = open ? inner.offsetHeight + 'px' : '0px';
    });
  });

  /* 객실 겹침 사진: 정보 블록이 화면 가운데를 지나는 동안 50% → 0 */
  var small = $('.room-pics .small'), depth = $('.room-depth');
  if (small && depth && !reduce) {
    var onScroll = function () {
      var r = depth.getBoundingClientRect(), c = window.innerHeight / 2;
      var p = Math.min(1, Math.max(0, (c - r.top) / r.height));
      small.style.setProperty('--ty', (50 * (1 - p)).toFixed(2) + '%');
    };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  } else if (small) { small.style.setProperty('--ty', '0%'); }

  /* 슬라이더 (Swiper) */
  if (typeof Swiper === 'undefined') return;
  var auto = reduce ? false : { delay: 3000, disableOnInteraction: false };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  var hero = $('.hero .swiper');
  if (hero) {
    var total = $$('.swiper-slide', hero).length;
    var curEl = $('.hero-count .cur'), totEl = $('.hero-count .tot');
    if (totEl) totEl.textContent = pad(total);
    new Swiper(hero, {
      effect: 'fade', fadeEffect: { crossFade: true }, speed: 500, loop: true, autoplay: auto,
      navigation: { prevEl: '.hero-arrows .prev', nextEl: '.hero-arrows .next' },
      a11y: { prevSlideMessage: '이전 사진', nextSlideMessage: '다음 사진' },
      on: { slideChange: function () { if (curEl) curEl.textContent = pad(this.realIndex + 1); } }
    });
  }

  var rooms = $('.rooms-slider');
  if (rooms) {
    new Swiper(rooms, {
      speed: 500, loop: true, autoplay: auto, slidesPerView: 2, spaceBetween: 15,
      pagination: { el: '.rooms .bar', type: 'progressbar' },
      navigation: { prevEl: '.rooms .btns .prev', nextEl: '.rooms .btns .next' },
      breakpoints: { 701: { slidesPerView: 3, spaceBetween: 50 } }
    });
  }

  var offers = $('.offers-slider');
  if (offers) new Swiper(offers, { speed: 500, loop: true, autoplay: auto, slidesPerView: 'auto' });

  var cover = $('.pro-cover');
  if (cover) {
    new Swiper(cover, {
      effect: 'coverflow', speed: 500, loop: true, loopAdditionalSlides: 1, slidesPerView: 1, autoplay: auto,
      coverflowEffect: { rotate: 0, stretch: 0, depth: 100, modifier: 4, slideShadows: false },
      navigation: { nextEl: '.pro-next' },
      breakpoints: { 0: { coverflowEffect: { rotate: 0, stretch: 0, depth: 200, modifier: 2, slideShadows: false } },
                     901: { coverflowEffect: { rotate: 0, stretch: 0, depth: 100, modifier: 4, slideShadows: false } } }
    });
  }

  var gallery = $('.room-gallery');
  if (gallery) {
    var num = $('.room-num');
    new Swiper(gallery, {
      effect: 'creative', speed: 800, loop: true, autoplay: auto, allowTouchMove: false,
      creativeEffect: { limitProgress: 2, prev: { translate: [0, 0, -1] }, next: { translate: ['100%', 0, 0] } },
      navigation: { nextEl: '.room-next' },
      on: { slideChange: function () { if (num) num.textContent = pad(this.realIndex + 1); } }
    });
  }
})();
