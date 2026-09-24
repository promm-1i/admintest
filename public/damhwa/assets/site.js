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
    var started = false;
    var start = function () {
      if (started) return; started = true;
      if (reduce) {
        intro.classList.add('step-c1', 'step-c2', 'step-text');
        if (line) line.textContent = full;
        setTimeout(done, 180);
        return;
      }
      setTimeout(function () { intro.classList.add('step-c1'); }, 380);
      setTimeout(function () { intro.classList.add('step-c2'); }, 820);
      setTimeout(function () {
        intro.classList.add('step-text');
        var i = 0, t = setInterval(function () {
          i += 1; if (line) line.textContent = full.slice(0, i);
          if (i >= full.length) { clearInterval(t); setTimeout(done, 180); }
        }, 35);
      }, 1180);
    };
    /* 레퍼런스는 첫 화면 영상이 준비(ready→play→pause)되면 시작, 최대 2.8초 대기. 여기서는 첫 화면 포스터 로드로 대신한다 */
    var heroImg = $('.mn-top .cover');
    var fallback = setTimeout(start, 2800);
    var ready = function () { clearTimeout(fallback); start(); };
    if (!heroImg || heroImg.complete) ready();
    else { heroImg.addEventListener('load', ready); heroImg.addEventListener('error', ready); }
  } else if (intro) { intro.classList.add('done'); }

  /* ---------- 머리 ---------- */
  var hd = $('#hd'), menu = $('#hdMenu'), menuBtn = $('.menu-btn'), menuClose = $('.hd-menu-close');
  /* 전체메뉴 띠 배경: 항목 hover/focus 시 페이드(0.35s) 후 180ms 에 교체, 열기·닫기·목록 이탈 시 1번으로 */
  var bgImg = $('.hd-menu-bg img'), bgBox = $('.hd-menu-bg'), bgTimer = null, bgCur = 1;
  function swapBg(n) {
    if (!bgImg) return;
    if (n === bgCur && !bgBox.classList.contains('is-fading')) return;
    clearTimeout(bgTimer); bgBox.classList.add('is-fading');
    bgTimer = setTimeout(function () { bgImg.src = './assets/menu-bg-' + n + '.jpg'; bgBox.classList.remove('is-fading'); bgCur = n; }, 180);
  }
  $$('.hd-nav-item').forEach(function (it) {
    var go = function () { swapBg(Number(it.getAttribute('data-bg')) || 1); };
    it.addEventListener('mouseenter', go); it.addEventListener('focusin', go);
  });
  var navList = $('.hd-nav-list');
  if (navList) navList.addEventListener('mouseleave', function () { swapBg(1); });
  function setMenu(open) {
    if (!hd) return;
    hd.classList.toggle('menu-open', open);
    body.classList.toggle('lock', open && mq('(max-width: 767px)'));
    if (menuBtn) menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (menu) menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    swapBg(1);
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
  if (menu) menu.addEventListener('click', function (e) { if (e.target === menu) setMenu(false); });

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
    spacer.style.height = '0px';
    /* 등장 모션 transform 영향을 받지 않도록 흐름상 위치(스페이서) 기준 */
    navTop = spacer.getBoundingClientRect().top + window.scrollY - subNav.offsetHeight;
    if (fixed) { subNav.classList.add('is-fixed'); spacer.style.height = subNav.dataset.h + 'px'; }
  }
  var logoA = hdLogo ? $('a', hdLogo) : null, logoTimer = null;
  function setSmallLogo(small) {
    if (!hdLogo || hdLogo.classList.contains('is-small') === small) return;
    clearTimeout(logoTimer);
    logoA.classList.add('is-logo-fading');
    logoTimer = setTimeout(function () { hdLogo.classList.toggle('is-small', small); logoA.classList.remove('is-logo-fading'); }, 120);
  }
  function onScrollNav() {
    if (!subNav) return;
    var should = window.scrollY >= navTop;
    if (should && !subNav.classList.contains('is-fixed')) {
      subNav.dataset.h = subNav.offsetHeight;
      spacer.style.height = subNav.offsetHeight + 'px';
      subNav.classList.add('is-fixed');
    } else if (!should && subNav.classList.contains('is-fixed')) {
      subNav.classList.remove('is-fixed');
      spacer.style.height = '0px';
    }
    setSmallLogo(!mq('(max-width: 1024px)') && subNav.classList.contains('is-fixed'));
  }
  measureNav();
  window.addEventListener('resize', function () { measureNav(); onScrollNav(); onScrollHd(); });
  window.addEventListener('load', measureNav);
  window.addEventListener('scroll', function () { onScrollHd(); onScrollNav(); }, { passive: true });
  onScrollHd(); onScrollNav();

  /* ---------- 등장 모션: AOS 규칙 그대로 — anchorPlacement top-bottom · offset 0 · once:false
     (transform 을 뺀 문서상 윗변이 화면 아래 끝을 넘으면 on, 다시 아래로 내려가면 해제) ---------- */
  var rvs = $$('.rv');
  if (rvs.length) {
    if (reduce) { rvs.forEach(function (r) { r.classList.add('on'); }); }
    else {
      var tops = [];
      var docTop = function (el) { var y = 0; while (el) { y += el.offsetTop; el = el.offsetParent; } return y; };
      var measure = function () { tops = rvs.map(function (r) { return docTop(r); }); };
      var tick = false;
      var check = function () {
        tick = false;
        var edge = (window.scrollY || 0) + window.innerHeight;
        rvs.forEach(function (r, i) { r.classList.toggle('on', tops[i] < edge); });
      };
      var req = function () { if (!tick) { tick = true; requestAnimationFrame(check); } };
      measure(); check();
      window.addEventListener('scroll', req, { passive: true });
      window.addEventListener('resize', function () { measure(); req(); });
      window.addEventListener('load', function () { setTimeout(function () { measure(); req(); }, 200); });
    }
  }

  /* ---------- 커서 PREV/NEXT 영역 ---------- */
  function hitArea(wrap, sw) {
    var prev = $('.hit-area.prev', wrap), next = $('.hit-area.next', wrap), cur = $('.slide-cursor', wrap);
    if (!prev || !next) return;
    var txt = cur ? $('span', cur) : null;
    var canHover = mq('(hover: hover) and (pointer: fine)');
    [[prev, 'prev'], [next, 'next']].forEach(function (p) {
      p[0].addEventListener('click', function () { p[1] === 'prev' ? sw.slidePrev() : sw.slideNext(); });
      if (!canHover || !cur) return;
      var move = function (e) {
        var r = wrap.getBoundingClientRect();
        cur.style.left = (e.clientX - r.left) + 'px'; cur.style.top = (e.clientY - r.top) + 'px';
        txt.textContent = '[ ' + p[1] + ' ]';
      };
      p[0].addEventListener('mouseenter', function (e) { cur.classList.add('is-on'); move(e); });
      p[0].addEventListener('mousemove', move);
    });
    if (canHover && cur) wrap.addEventListener('mouseleave', function () { cur.classList.remove('is-on'); });
    if (!canHover) { prev.style.display = next.style.display = 'none'; if (cur) cur.style.display = 'none'; }
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

  var rmSw = sw('.rm-slide .swiper', { loop: true, speed: 900, effect: 'fade', fadeEffect: { crossFade: true }, autoplay: { delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: false } });
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
      var r = season.getBoundingClientRect();
      var range = Math.max(1, r.height - window.innerHeight);
      var p = Math.max(0, Math.min(0.9999, -r.top / range));
      var idx = (r.top >= window.innerHeight || r.bottom <= 0) ? -1 : Math.min(3, Math.floor(p * 4));
      boxes.forEach(function (b) { b.classList.toggle('is-active', idx >= 0 && b.classList.contains(order[idx])); });
    };
    window.addEventListener('scroll', hl, { passive: true }); window.addEventListener('resize', hl); hl();
  }

  /* ---------- 예약: 오른쪽 블록이 화면 중앙에 오면 왼쪽 사진 교체 (0.42s) ---------- */
  var rsBox = $('.rs-left-img'), rsImgs = $$('.rs-left-img img'), blocks = $$('.rs-block');
  if (rsImgs.length && blocks.length) {
    var rsCur = 0, rsTimer = null;
    var rsSync = function () {
      var trig = window.innerHeight * 0.5, idx = 0, best = Infinity;
      blocks.forEach(function (b, k) { var r = b.getBoundingClientRect(); var d = Math.abs(r.top + r.height * 0.5 - trig); if (d < best) { best = d; idx = k; } });
      if (idx === rsCur) return;
      rsCur = idx; clearTimeout(rsTimer);
      rsBox.classList.add('is-swapping');
      rsTimer = setTimeout(function () {
        rsImgs.forEach(function (im, k) { im.classList.toggle('is-active', k === idx); });
        requestAnimationFrame(function () { rsBox.classList.remove('is-swapping'); });
      }, 180);
    };
    window.addEventListener('scroll', rsSync, { passive: true }); window.addEventListener('resize', rsSync); rsSync();
  }

  /* 예약 하단 사진: 영역이 화면 아래(진행 0)→위(1)로 갈 때 1번 top 0→170px, 3번 bottom 22→100px (1250 폭 기준 비례) */
  var thum = $('.rs-thum'), ti1 = $('.rs-thum-imgs .i1'), ti3 = $('.rs-thum-imgs .i3'), tBox = $('.rs-thum-imgs');
  if (thum && ti1 && ti3) {
    var tMove = function () {
      if (mq('(max-width: 767px)')) { ti1.style.top = ''; ti3.style.bottom = ''; return; }
      var r = thum.getBoundingClientRect(), vh = window.innerHeight;
      var pr = Math.max(0, Math.min(1, (vh - r.top) / vh)), k = tBox.offsetWidth / 1250;
      ti1.style.top = (170 * pr * k) + 'px';
      ti3.style.bottom = ((22 + 78 * pr) * k) + 'px';
    };
    window.addEventListener('scroll', tMove, { passive: true }); window.addEventListener('resize', tMove); tMove();
  }
})();
