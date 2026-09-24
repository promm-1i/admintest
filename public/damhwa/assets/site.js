/* 담화재 — 공통 동작: 인트로 · 머리/전체메뉴 · 서브탭 고정 · 등장 모션 · 슬라이드 · 객실 갤러리/탭/평면도 · 사계 스크롤 · 예약 이미지 교체 */
(function () {
  'use strict';
  var doc = document, html = doc.documentElement, body = doc.body;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mq = function (q) { return window.matchMedia(q).matches; };
  html.classList.add('js');

  /* ---------- 인트로 (메인): 구름 1 걷힘 380ms → 구름 2 820ms → 문구 1180ms 타이핑(35ms/자) → 180ms+900ms 뒤 0.8s 페이드 ---------- */
  var intro = $('#intro');
  if (intro && !mq('(max-width: 767px)')) {
    var line = $('.intro-line', intro), full = line ? line.textContent.trim() : '';
    var lockable = !mq('(max-width: 1024px)');
    if (lockable) html.classList.add('intro-lock');
    var finish = function () {
      intro.classList.add('done');
      setTimeout(function () { html.classList.remove('intro-lock'); }, 800);
    };
    var safety = setTimeout(finish, 12000);
    if (line) { line.style.width = Math.ceil(line.scrollWidth) + 'px'; line.textContent = ''; }
    var done = function () { clearTimeout(safety); setTimeout(finish, 900); };
    if (reduce) {
      intro.classList.add('step-c1', 'step-c2', 'step-text');
      if (line) line.textContent = full;
      setTimeout(done, 180);
    } else {
      setTimeout(function () { intro.classList.add('step-c1'); }, 380);
      setTimeout(function () { intro.classList.add('step-c2'); }, 820);
      setTimeout(function () {
        intro.classList.add('step-text');
        var i = 0, t = setInterval(function () {
          i += 1; if (line) line.textContent = full.slice(0, i);
          if (i >= full.length) { clearInterval(t); setTimeout(done, 180); }
        }, 35);
      }, 1180);
    }
  } else if (intro) { intro.classList.add('done'); }

  /* ---------- 머리 ---------- */
  var hd = $('#hd'), menu = $('#hdMenu'), menuBtn = $('.menu-btn'), menuClose = $('.hd-menu-close');
  function setMenu(open) {
    if (!hd) return;
    hd.classList.toggle('menu-open', open);
    body.classList.toggle('lock', open);
    if (menuBtn) menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (menu) menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (open && menuClose) setTimeout(function () { menuClose.focus(); }, 60);
    if (!open && menuBtn) menuBtn.focus();
  }
  if (menuBtn) menuBtn.addEventListener('click', function () { setMenu(true); });
  if (menuClose) menuClose.addEventListener('click', function () { setMenu(false); });
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (hd && hd.classList.contains('menu-open')) setMenu(false);
      closePlan();
    }
  });
  /* 전체메뉴 항목에 올리면 띠 배경 교체 (0.35s 페이드) */
  var bgImg = $('.hd-menu-bg img'), bgBox = $('.hd-menu-bg'), bgTimer = null, bgCur = 1;
  $$('.hd-nav-item').forEach(function (it) {
    var go = function () {
      var n = Number(it.getAttribute('data-bg')) || 1;
      if (!bgImg || n === bgCur) return;
      bgCur = n; bgBox.classList.add('is-fading');
      clearTimeout(bgTimer);
      bgTimer = setTimeout(function () { bgImg.src = './assets/menu-bg-' + n + '.jpg'; bgBox.classList.remove('is-fading'); }, 350);
    };
    it.addEventListener('mouseenter', go); it.addEventListener('focusin', go);
  });

  /* 모바일: 100px 내려가면 머리 검정 고정 */
  function onScrollHd() {
    if (!hd) return;
    hd.classList.toggle('fixed', mq('(max-width: 767px)') && (window.scrollY || 0) >= 100);
  }

  /* ---------- 서브 탭 고정 (+ PC 로고 축소) ---------- */
  var subNav = $('.sub-nav'), spacer = null, navTop = 0, hdLogo = $('.hd-logo');
  if (subNav) {
    spacer = doc.createElement('div'); spacer.className = 'sub-nav-spacer';
    subNav.parentNode.insertBefore(spacer, subNav.nextSibling);
  }
  function measureNav() {
    if (!subNav) return;
    var fixed = subNav.classList.contains('is-fixed');
    if (fixed) subNav.classList.remove('is-fixed');
    navTop = subNav.getBoundingClientRect().top + window.scrollY;
    spacer.style.height = '0px';
    if (fixed) { subNav.classList.add('is-fixed'); spacer.style.height = subNav.dataset.h + 'px'; }
  }
  function onScrollNav() {
    if (!subNav) return;
    var mob = mq('(max-width: 767px)');
    var offset = mob ? 70 : 0;
    var should = window.scrollY + offset > navTop + subNav.offsetHeight * 0.5;
    if (should && !subNav.classList.contains('is-fixed')) {
      subNav.dataset.h = subNav.offsetHeight;
      spacer.style.height = subNav.offsetHeight + 'px';
      subNav.classList.add('is-fixed');
    } else if (!should && subNav.classList.contains('is-fixed')) {
      subNav.classList.remove('is-fixed');
      spacer.style.height = '0px';
    }
    if (hdLogo) hdLogo.classList.toggle('is-small', !mq('(max-width: 1024px)') && subNav.classList.contains('is-fixed'));
  }
  measureNav();
  window.addEventListener('resize', function () { measureNav(); onScrollNav(); onScrollHd(); });
  window.addEventListener('load', measureNav);
  window.addEventListener('scroll', function () { onScrollHd(); onScrollNav(); }, { passive: true });
  onScrollHd(); onScrollNav();

  /* ---------- 등장 모션: 요소 윗변이 화면 아래에 닿으면 on, 다시 아래로 벗어나면 해제 (AOS once:false) ---------- */
  var rvs = $$('.rv');
  if (rvs.length) {
    if ('IntersectionObserver' in window && !reduce) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) e.target.classList.add('on');
          else if (e.boundingClientRect.top > 0) e.target.classList.remove('on');
        });
      }, { rootMargin: '0px' });
      rvs.forEach(function (r) { io.observe(r); });
    } else { rvs.forEach(function (r) { r.classList.add('on'); }); }
  }

  /* ---------- 커서 PREV/NEXT 영역 ---------- */
  function hitArea(wrap, sw) {
    var prev = $('.hit-area.prev', wrap), next = $('.hit-area.next', wrap), cur = $('.slide-cursor', wrap);
    if (!prev || !next) return;
    var txt = cur ? $('span', cur) : null;
    var canHover = mq('(hover: hover) and (pointer: fine)');
    [[prev, 'PREV'], [next, 'NEXT']].forEach(function (p) {
      p[0].addEventListener('click', function () { p[1] === 'PREV' ? sw.slidePrev() : sw.slideNext(); });
      if (!canHover || !cur) return;
      p[0].addEventListener('mousemove', function (e) {
        var r = wrap.getBoundingClientRect();
        cur.style.left = (e.clientX - r.left) + 'px'; cur.style.top = (e.clientY - r.top) + 'px';
        txt.textContent = p[1]; cur.classList.add('is-on');
      });
      p[0].addEventListener('mouseleave', function () { cur.classList.remove('is-on'); });
    });
  }

  /* ---------- 슬라이드 (Swiper 11) ---------- */
  function sw(sel, opt) {
    var el = $(sel);
    if (!el || typeof Swiper === 'undefined') return null;
    if (reduce) { opt.autoplay = false; opt.speed = 0; }
    return new Swiper(el, opt);
  }
  var mainSw = sw('.mn-gallery .swiper', { loop: true, speed: 900, effect: 'fade', fadeEffect: { crossFade: true }, autoplay: { delay: 2800, disableOnInteraction: false } });
  if (mainSw) hitArea($('.mn-gallery'), mainSw);

  var spTit = $('.sp-tit');
  var spSw = sw('.sp-slider .swiper', {
    loop: true, speed: 700, slidesPerView: 4, slidesPerGroup: 1, spaceBetween: 20,
    autoplay: { delay: 2800, disableOnInteraction: false },
    navigation: { prevEl: '.sp-nav .prev', nextEl: '.sp-nav .next' },
    breakpoints: { 0: { slidesPerView: 1.2, spaceBetween: 16 }, 1025: { slidesPerView: 4, spaceBetween: 20 } },
    on: {
      slideChange: function () {
        if (!spTit) return;
        var a = this.slides[this.activeIndex];
        var eq = a ? Number(a.getAttribute('data-eq')) : 1;
        spTit.textContent = eq >= 5 ? 'EXPERIENCE IN DAMHWAJAE' : 'SPECIAL IN DAMHWAJAE';
      }
    }
  });

  sw('.mn-story-img .swiper', { loop: true, speed: 800, effect: 'fade', fadeEffect: { crossFade: true }, autoplay: { delay: 2600, disableOnInteraction: false } });

  sw('.ab-slide .swiper', {
    loop: true, speed: 700, slidesPerView: 5.5, slidesPerGroup: 1, spaceBetween: 20, roundLengths: true,
    autoplay: { delay: 2800, disableOnInteraction: false },
    breakpoints: { 0: { slidesPerView: 1.4, spaceBetween: 10 }, 1025: { slidesPerView: 5.5, spaceBetween: 20 } }
  });

  var rmSw = sw('.rm-slide .swiper', { loop: true, speed: 800, autoplay: { delay: 3000, disableOnInteraction: false } });
  if (rmSw) hitArea($('.rm-slide'), rmSw);

  /* ---------- 객실 갤러리: 다음 장이 62% 아래에서 올라오며(2.5s) 현재 장은 0.4s 페이드, 3.2s 자동 ---------- */
  var gal = $('.rm-gal');
  if (gal) {
    var slides = $$('.rm-gal-slide', gal), thumbs = $$('.rm-gal-thumb', gal), gTxt = $('.rm-gal-txt', gal);
    var gT = gTxt ? $('h3', gTxt) : null, gP = gTxt ? $('p', gTxt) : null;
    var cur = 0, timer = null, busy = null;
    var setTxt = function (i) {
      if (!gTxt) return;
      gTxt.classList.add('is-fading');
      setTimeout(function () {
        gT.textContent = slides[i].getAttribute('data-title');
        gP.innerHTML = slides[i].getAttribute('data-desc');
        gTxt.classList.remove('is-fading');
      }, 220);
    };
    var sync = function (i) {
      thumbs.forEach(function (t, k) { t.classList.toggle('is-active', k === i); t.setAttribute('aria-pressed', k === i ? 'true' : 'false'); });
    };
    var go = function (n) {
      if (n === cur) return;
      var a = slides[cur], b = slides[n];
      clearTimeout(busy);
      slides.forEach(function (s) { if (s !== a && s !== b) { s.style.transition = 'none'; s.classList.remove('is-current'); s.style.cssText = ''; } });
      if (reduce) {
        a.classList.remove('is-current'); b.classList.add('is-current');
      } else {
        b.style.transition = 'none'; b.style.zIndex = 2; b.style.opacity = '.96'; b.style.transform = 'translateY(62%) scale(1.02)';
        a.style.zIndex = 1;
        requestAnimationFrame(function () { requestAnimationFrame(function () {
          b.style.transition = 'transform 2500ms cubic-bezier(0.19,0.8,0.24,1), opacity 2500ms ease-out';
          b.style.transform = 'translateY(0) scale(1)'; b.style.opacity = '1';
          a.style.transition = 'opacity 400ms ease-out'; a.style.opacity = '0';
        }); });
        busy = setTimeout(function () {
          a.classList.remove('is-current'); a.style.cssText = '';
          b.classList.add('is-current'); b.style.cssText = '';
        }, 2540);
      }
      cur = n; sync(n); setTxt(n);
    };
    var auto = function () { clearInterval(timer); if (!reduce) timer = setInterval(function () { go((cur + 1) % slides.length); }, 3200); };
    thumbs.forEach(function (t, k) { t.addEventListener('click', function () { go(k); auto(); }); });
    sync(0); auto();
  }

  /* ---------- 객실 둘러보기 탭 ---------- */
  $$('.rm-amen').forEach(function (w) {
    var tabs = $$('.rm-amen-tab', w), panels = $$('.rm-amen-panel', w);
    var act = function (i, focus) {
      tabs.forEach(function (t, k) { t.setAttribute('aria-selected', k === i ? 'true' : 'false'); t.tabIndex = k === i ? 0 : -1; });
      panels.forEach(function (p, k) { p.classList.toggle('is-active', k === i); });
      if (focus) tabs[i].focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { act(i); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); act((i + 1) % tabs.length, true); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); act((i - 1 + tabs.length) % tabs.length, true); }
      });
    });
  });

  /* ---------- 객실 평면도 팝업 ---------- */
  var plan = $('#roomPlan'), planOpener = null;
  function closePlan() {
    if (!plan || !plan.classList.contains('open')) return;
    plan.classList.remove('open'); plan.setAttribute('aria-hidden', 'true'); body.classList.remove('lock');
    if (planOpener) planOpener.focus();
  }
  $$('[data-open-plan]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (!plan) return;
      planOpener = b; plan.classList.add('open'); plan.setAttribute('aria-hidden', 'false'); body.classList.add('lock');
      setTimeout(function () { $('.rm-plan-close', plan).focus(); }, 60);
    });
  });
  if (plan) { $$('.rm-plan-close, .rm-plan-dim', plan).forEach(function (b) { b.addEventListener('click', closePlan); }); }

  /* 예약 검색(샘플): 예약 안내 페이지로 이동 */
  var book = $('.rm-book form');
  if (book) book.addEventListener('submit', function (e) { e.preventDefault(); location.href = 'reservation.html'; });

  /* ---------- 사계 스크롤 하이라이트 (구간 진행률 → 4장 중 하나) ---------- */
  var season = $('.season');
  if (season) {
    var boxes = $$('.season-box', season);
    var order = ['spring', 'summer', 'autumn', 'winter'];
    var hl = function () {
      if (mq('(max-width: 767px)')) { boxes.forEach(function (b) { b.classList.remove('is-active'); }); return; }
      var r = season.getBoundingClientRect();
      var range = Math.max(1, r.height - window.innerHeight);
      var p = Math.max(0, Math.min(0.9999, -r.top / range));
      var idx = r.top > window.innerHeight * 0.5 ? -1 : Math.floor(p * 4);
      boxes.forEach(function (b) { b.classList.toggle('is-active', idx >= 0 && b.classList.contains(order[idx])); });
    };
    window.addEventListener('scroll', hl, { passive: true }); window.addEventListener('resize', hl); hl();
  }

  /* ---------- 예약: 오른쪽 블록이 화면 중앙에 오면 왼쪽 사진 교체 (0.42s) ---------- */
  var rsImgs = $$('.rs-left-img img'), blocks = $$('.rs-block');
  if (rsImgs.length && blocks.length) {
    var rsCur = 0;
    var rsSync = function () {
      var mid = window.innerHeight * 0.45, idx = 0;
      blocks.forEach(function (b, k) { if (b.getBoundingClientRect().top < mid) idx = k; });
      if (idx !== rsCur) { rsCur = idx; rsImgs.forEach(function (im, k) { im.classList.toggle('is-active', k === idx); }); }
    };
    window.addEventListener('scroll', rsSync, { passive: true }); rsSync();
  }
})();
