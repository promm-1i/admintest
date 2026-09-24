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
    b.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
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

  /* 전경 사진 넘기기 (앞/뒤 교체, 3초 자동) */
  var stack = $('.pro-stack');
  if (stack) {
    var imgs = $$('img', stack), cur = 0;
    var swap = function () {
      cur = (cur + 1) % imgs.length;
      imgs.forEach(function (im, k) { im.classList.toggle('front', k === cur); im.classList.toggle('back', k !== cur); });
    };
    var next = $('.pro-next'); var timer = reduce ? null : setInterval(swap, 3000);
    if (next) next.addEventListener('click', function () { swap(); if (timer) { clearInterval(timer); timer = setInterval(swap, 3000); } });
  }

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

  var gallery = $('.room-gallery');
  if (gallery) {
    var num = $('.room-num');
    new Swiper(gallery, {
      effect: 'fade', fadeEffect: { crossFade: true }, speed: 800, loop: true, autoplay: auto,
      navigation: { nextEl: '.room-next' },
      on: { slideChange: function () { if (num) num.textContent = pad(this.realIndex + 1); } }
    });
  }
})();
