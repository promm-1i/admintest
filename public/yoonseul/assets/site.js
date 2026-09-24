/* 윤슬 풀빌라 — 공통 동작 (레퍼런스와 같은 라이브러리·같은 설정값)
   메인: GSAP ScrollSmoother(smooth 2) + ScrollTrigger 핀 · data-gsap fade-up(y100, 1.5s power2.out, top 90%)
   서브: Lenis(duration 1.2, expo-out) + ScrollTrigger · 서브 히어로 핀(+200%, pinSpacing false)
   슬라이더: Swiper (레퍼런스 옵션 그대로) */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body, isMain = body.classList.contains('is-main');
  var hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  var hasSwiper = typeof window.Swiper !== 'undefined';
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (hasGsap) {
    gsap.registerPlugin(ScrollTrigger);
    if (window.ScrollSmoother) gsap.registerPlugin(ScrollSmoother);
    if (window.MotionPathPlugin) gsap.registerPlugin(MotionPathPlugin);
  }

  /* ---------- 스크롤 엔진 ---------- */
  var smoother = null, lenis = null;
  if (hasGsap && isMain && window.ScrollSmoother && !reduce) {
    smoother = ScrollSmoother.create({ wrapper: '#smooth-wrapper', content: '#smooth-content', smooth: 2, effects: true, normalizeScroll: true, ignoreMobileResize: true, smoothTouch: 0.1 });
  }
  if (!isMain && window.Lenis && !isTouch && !reduce) {
    lenis = new Lenis({ duration: 1.2, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, smoothWheel: true });
    if (hasGsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
    }
  }
  function stopScroll() { if (smoother) smoother.paused(true); if (lenis) lenis.stop(); document.documentElement.classList.add('flow-hidden'); body.style.overflow = 'hidden'; }
  function startScroll() { if (smoother) smoother.paused(false); if (lenis) lenis.start(); document.documentElement.classList.remove('flow-hidden'); body.style.overflow = ''; }

  /* ---------- 머리: 기준 섹션 top top 에서 .is-scroll (메인 ≥1000: 스페셜, 그 외: 히어로 다음) ---------- */
  var hd = $('#header');
  function hdTriggerEl() {
    if (isMain) return window.innerWidth >= 1000 ? $('.sp--main') : $('.mh');
    return $('.s-container');
  }
  var hdST = null;
  function makeHdTrigger() {
    var el = hdTriggerEl();
    if (!hd || !el) return;
    if (hasGsap) {
      if (hdST) hdST.kill();
      hdST = ScrollTrigger.create({ trigger: el, start: 'top top', onEnter: function () { hd.classList.add('is-scroll'); }, onLeaveBack: function () { hd.classList.remove('is-scroll'); } });
      hd.classList.toggle('is-scroll', hdST.progress > 0 || el.getBoundingClientRect().top <= 0);
    } else {
      var f = function () { hd.classList.toggle('is-scroll', el.getBoundingClientRect().top <= 0); };
      window.addEventListener('scroll', f, { passive: true }); f();
    }
  }

  /* ---------- 전체 메뉴 (열기: 원 scale 150 .8s · 내용 1.4s/.8s 지연, 닫기: closing 600ms) ---------- */
  var sm = $('#screenMenu'), smBtn = $('.hd-menu'), smClose = $('.sm-close'), lastFocus = null, smTimer;
  function openMenu() {
    lastFocus = document.activeElement; clearTimeout(smTimer);
    sm.hidden = false;
    requestAnimationFrame(function () { requestAnimationFrame(function () { sm.classList.add('is-open'); }); });
    smBtn.setAttribute('aria-expanded', 'true'); stopScroll();
    setTimeout(function () { smClose.focus(); }, 50);
  }
  function closeMenu() {
    sm.classList.remove('is-open'); smBtn.setAttribute('aria-expanded', 'false'); startScroll();
    smTimer = setTimeout(function () { sm.hidden = true; }, reduce ? 0 : 600);
    if (lastFocus) lastFocus.focus();
  }
  if (sm && smBtn) {
    smBtn.addEventListener('click', openMenu);
    smClose.addEventListener('click', closeMenu);
    document.addEventListener('keydown', function (e) {
      if (!sm.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeMenu();
      if (e.key === 'Tab') {
        var f = $$('a,button', sm).filter(function (el) { return el.offsetParent !== null; });
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
    $$('.sm-item').forEach(function (it) {
      var act = function () {
        var k = it.getAttribute('data-menu');
        $$('.sm-item,.sm-img,.sm-sub', sm).forEach(function (el) { el.classList.toggle('is-active', el.getAttribute('data-menu') === k); });
      };
      it.addEventListener('mouseover', act); it.addEventListener('focusin', act);
    });
  }

  /* ---------- 메인 공지 팝업 (하루 동안 보지 않기 · 닫기 · 끌어서 이동) ---------- */
  $$('.pop-layer').forEach(function (pop) {
    var key = 'yoonseul-' + pop.id, until = 0;
    try { until = parseInt(localStorage.getItem(key) || '0', 10); } catch (e) {}
    if (until > Date.now()) return;
    pop.hidden = false;
    $('.pop-close', pop).addEventListener('click', function () { pop.hidden = true; });
    $('.pop-day', pop).addEventListener('click', function () { try { localStorage.setItem(key, String(Date.now() + 864e5)); } catch (e) {} pop.hidden = true; });
    var handle = $('.pop-body', pop), sx, sy, ox, oy, drag = false;
    handle.addEventListener('pointerdown', function (e) { drag = true; sx = e.clientX; sy = e.clientY; ox = pop.offsetLeft; oy = pop.offsetTop; handle.setPointerCapture(e.pointerId); });
    handle.addEventListener('pointermove', function (e) { if (!drag) return; pop.style.left = (ox + e.clientX - sx) + 'px'; pop.style.top = (oy + e.clientY - sy) + 'px'; });
    handle.addEventListener('pointerup', function () { drag = false; });
  });

  /* ---------- 모바일 인트로 화면 (≤1024: h3 2s 페이드 → 2.5s 뒤 .8s 사라짐) ---------- */
  var intro = $('.intro-screen');
  if (intro && !reduce && window.innerWidth <= 1024) {
    requestAnimationFrame(function () { intro.classList.add('is-on'); });
    setTimeout(function () { intro.classList.add('is-hide'); }, 2500);
    setTimeout(function () { intro.style.display = 'none'; }, 3400);
  } else if (intro) { intro.style.display = 'none'; }

  /* ---------- 메인 인트로 타이틀 글자 쪼개기 (CSS 타임라인: 1s 페이드 · 2s 이동 1.5s · 3.5s 글자 .5s/.15 stagger) ---------- */
  var t3 = $('.mi-t3');
  if (t3) {
    var txt = t3.textContent; t3.textContent = '';
    txt.split('').forEach(function (ch, i) { var s = document.createElement('i'); s.textContent = ch; s.style.animationDelay = (3.05 + i * 0.15) + 's'; t3.appendChild(s); });
  }

  /* ---------- 메인 data-gsap fade-up ---------- */
  function initGsapFade() {
    $$('[data-gsap="fade-up"]').forEach(function (el) {
      if (reduce || !hasGsap) return;
      gsap.set(el, { opacity: 0, y: 100 });
      gsap.to(el, { opacity: 1, y: 0, duration: 1.5, delay: parseFloat(el.getAttribute('data-gsap-delay') || '0'), ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none', once: true } });
    });
  }

  /* ---------- AOS custom-circle (offset 80, once:false → 위로 되감기) ---------- */
  function initCircle() {
    $$('[data-aos="custom-circle"]').forEach(function (el) {
      if (!hasGsap || reduce) { el.classList.add('is-in'); return; }
      ScrollTrigger.create({ trigger: el, start: 'top bottom-=80', onEnter: function () { el.classList.add('is-in'); }, onLeaveBack: function () { el.classList.remove('is-in'); } });
    });
  }

  /* ---------- 패럴랙스 (.js-parallax-item: y 0→-100, top bottom → bottom top, scrub) ---------- */
  function initParallax() {
    if (!hasGsap || reduce) return;
    $$('[data-parallax]').forEach(function (el) {
      gsap.to(el, { y: -100, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }

  /* ---------- Swiper 들 ---------- */
  function initSwipers() {
    if (!hasSwiper) return;
    var auto = function (d) { return reduce ? false : { delay: d, disableOnInteraction: false }; };
    // 메인 항공 슬라이더: fade crossFade · loop · 4000
    $$('.hs.swiper').forEach(function (el) {
      var cur = $('[data-cur]', el), tot = $('[data-total]', el);
      new Swiper(el, { slidesPerView: 1, spaceBetween: 0, loop: true, autoplay: auto(4000), effect: 'fade', fadeEffect: { crossFade: true },
        navigation: { nextEl: $('.hs-next', el), prevEl: $('.hs-prev', el) },
        on: { init: function () { tot.textContent = pad(this.slides.length); }, slideChange: function () { cur.textContent = pad(this.realIndex + 1); } } });
    });
    // 서브 히어로: fade · speed 1500 · 4000 · loop
    $$('[data-shero]').forEach(function (root) {
      var el = $('.sh-media', root), cur = $('[data-cur]', root), tot = $('[data-total]', root);
      new Swiper(el, { loop: true, effect: 'fade', fadeEffect: { crossFade: true }, speed: reduce ? 0 : 1500, autoplay: auto(4000),
        navigation: { nextEl: $('.sh-next', root), prevEl: $('.sh-prev', root) },
        on: { init: function () { cur.textContent = pad(this.realIndex + 1); tot.textContent = pad(this.slides.length); }, slideChange: function () { cur.textContent = pad(this.realIndex + 1); } } });
    });
    // 스페셜 이중 슬라이더: 미디어 speed 1000 · 3000 · 스크롤바 드래그 · 패럴랙스 0.5 / 제목 auto·centered · touchRatio .2
    $$('[data-sp]').forEach(function (root) {
      var interleave = 0.5;
      var media = new Swiper($('.sp-media', root), {
        speed: reduce ? 0 : 1000, autoplay: auto(3000), grabCursor: true, watchSlidesProgress: true,
        scrollbar: { el: $('.sp-bar', root), draggable: true, hide: false },
        navigation: { nextEl: $('.sp-next', root), prevEl: $('.sp-prev', root) },
        on: {
          progress: function () {
            var sw = this;
            sw.slides.forEach(function (slide) { var bg = $('.sp-bg', slide); if (bg) bg.style.transform = 'translateX(' + (slide.progress * sw.width * interleave) + 'px)'; });
          },
          touchStart: function () { this.slides.forEach(function (s) { s.style.transition = ''; }); },
          setTransition: function (sw, speed) { sw.slides.forEach(function (s) { s.style.transition = speed + 'ms'; var bg = $('.sp-bg', s); if (bg) bg.style.transition = speed + 'ms'; }); }
        }
      });
      var titles = new Swiper($('.sp-titles', root), { speed: reduce ? 0 : 1000, slidesPerView: 'auto', centeredSlides: true, slideToClickedSlide: true, spaceBetween: 0, touchRatio: 0.2,
        breakpoints: { 0: { slidesPerView: 1 }, 1025: { slidesPerView: 'auto' } } });
      media.controller.control = titles; titles.controller.control = media;
      $$('.sp-t', root).forEach(function (t, i) { t.addEventListener('click', function (e) { if (i !== titles.activeIndex) { e.preventDefault(); media.slideTo(i); } }); });
    });
    // 모바일 스페셜 2열: loop · speed 600 · 2500
    $$('[data-msp]').forEach(function (el) {
      var sec = el.parentNode;
      new Swiper(el, { loop: true, slidesPerView: 2, spaceBetween: 0, speed: reduce ? 0 : 600, autoplay: auto(2500),
        navigation: { nextEl: $('.msp-next', sec), prevEl: $('.msp-prev', sec) } });
    });
  }

  /* ---------- 메인: 예약 콜라주 (≥1025 핀 350% · col1 yPercent -90→0, col2 40→-30) / 1001–1024 모바일 스와이퍼 ---------- */
  var bkSwiper = null;
  function initBooking() {
    var bk = $('.bk'); if (!bk) return;
    if (hasGsap) {
      ScrollTrigger.matchMedia({
        '(min-width: 1025px)': function () {
          if (reduce) return;
          gsap.set('.bk-col1', { yPercent: -90 }); gsap.set('.bk-col2', { yPercent: 40 });
          gsap.to('.bk-col1', { yPercent: 0, ease: 'none', scrollTrigger: { trigger: bk, start: 'top top', end: '350% bottom', scrub: true, pin: true, anticipatePin: 1 } });
          gsap.to('.bk-col2', { yPercent: -30, ease: 'none', scrollTrigger: { trigger: bk, start: 'top top', end: '350% bottom', scrub: true } });
        }
      });
    }
    var sync = function () {
      var mob = window.innerWidth <= 1024 && window.innerWidth > 1000;
      if (mob && !bkSwiper && hasSwiper) bkSwiper = new Swiper('.bk-swiper', { slidesPerView: 2, spaceBetween: 10, scrollbar: { el: '.bk-bar', draggable: true, hide: false }, autoplay: reduce ? false : { delay: 3000, disableOnInteraction: false } });
      if (!mob && bkSwiper) { bkSwiper.destroy(true, true); bkSwiper = null; }
    };
    sync(); window.addEventListener('resize', sync);
  }

  /* ---------- 메인: ROOM VIEW (≥1281 핀 + y -(scrollHeight-clientHeight) scrub .5 · 항목 top/bottom center 에서 active) / ≤1280 Swiper ---------- */
  var rmSwiper = null, rmST = null, itemSTs = [];
  function initRoom() {
    var sec = $('.rm'), box = $('.rg-swiper'); if (!sec || !box) return;
    if (rmST) { rmST.scrollTrigger && rmST.scrollTrigger.kill(true); rmST.kill(); rmST = null; }
    itemSTs.forEach(function (t) { t.kill(); }); itemSTs = [];
    if (rmSwiper) { rmSwiper.destroy(true, true); rmSwiper = null; }
    if (window.innerWidth <= 1280) {
      if (window.innerWidth > 1000 && hasSwiper) rmSwiper = new Swiper(box, { loop: true, slidesPerView: 1, spaceBetween: 20, grabCursor: true, breakpoints: { 768: { slidesPerView: 2, spaceBetween: 20 }, 1024: { slidesPerView: 3, spaceBetween: 20 } } });
      return;
    }
    if (!hasGsap) return;
    gsap.set(box, { clearProps: 'all' });
    var amount = box.scrollHeight - sec.clientHeight;
    rmST = gsap.to(box, { y: -amount, ease: 'none', scrollTrigger: { trigger: sec, pin: true, start: 'top top', end: '+=' + amount, scrub: reduce ? true : 0.5, invalidateOnRefresh: true } });
    $$('.rg-item').forEach(function (item) {
      itemSTs.push(ScrollTrigger.create({ trigger: item, start: 'top center', end: 'bottom center', toggleClass: { targets: item, className: 'is-active' } }));
    });
  }

  /* ---------- 서브 히어로 핀 (+200%, pinSpacing false · 오시는 길 제외) ---------- */
  function initHeroPin() {
    var h = $('.sh'); if (!h || !hasGsap || h.classList.contains('sh--nopin')) return;
    ScrollTrigger.create({ trigger: h, start: 'top top', end: '+=200%', pin: true, pinSpacing: false, anticipatePin: 1 });
  }

  /* ---------- 프롤로그 청록 섹션: 소개 글 · 선 그리기 · 점 이동 · 마무리 글 ---------- */
  function initPrologue() {
    var sec = $('.pl-s2'), path = $('#plPath'), dot = $('#plDot'); if (!sec || !path || !hasGsap) return;
    var mob = window.innerWidth <= 768, len = path.getTotalLength();
    if (reduce) { dot.setAttribute('transform', 'translate(6 6)'); return; }
    gsap.from('.pl-intro > p', { opacity: 0, y: 30, duration: 0.8, stagger: 0.2, ease: 'power2.out', scrollTrigger: { trigger: sec, start: mob ? 'top 80%' : 'top 70%', toggleActions: 'play none none reverse' } });
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 0.8 });
    gsap.to(path, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut', scrollTrigger: { trigger: sec, start: mob ? 'top 40%' : 'top 30%', end: mob ? '60% center' : 'center center', scrub: 0.5 } });
    gsap.set('.pl-outro > p', { opacity: 0, y: 30 });
    gsap.set(dot, { opacity: 0, scale: 0, transformOrigin: '50% 50%' });
    gsap.timeline({ scrollTrigger: { trigger: sec, start: mob ? 'top 35%' : 'top 25%', toggleActions: 'play none none reverse' } })
      .to(dot, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' });
    var shown = false;
    var tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: mob ? '40% center' : 'center center', end: mob ? '90% center' : 'bottom center', scrub: 1 } });
    if (window.MotionPathPlugin) {
      tl.to(dot, { motionPath: { path: path, align: path, alignOrigin: [0.5, 0.5], autoRotate: false }, ease: 'power1.inOut',
        onUpdate: function () { if (this.progress() >= 0.65 && !shown) { shown = true; gsap.to('.pl-outro > p', { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' }); } } });
    }
    ScrollTrigger.create({ trigger: sec, start: 'top bottom', onLeaveBack: function () { shown = false; gsap.set('.pl-outro > p', { opacity: 0, y: 30 }); } });
    var hori = $('.pl-hori2');
    if (hori) gsap.set(hori, { x: 0, xPercent: -50 });
    if (hori) gsap.to(hori, { xPercent: -100, ease: 'none', scrollTrigger: { trigger: '.pl-s4', start: 'top 80%', end: 'bottom top', scrub: true } });
  }

  /* ---------- 스페셜 곡선 영역 ---------- */
  function initRhythm() {
    var sec = $('[data-rhythm]'), wave = $('#spcWave'), dot = $('#spcDot'); if (!sec || !wave || !hasGsap) return;
    if (reduce) return;
    var len = wave.getTotalLength();
    gsap.set(wave, { strokeDasharray: len, strokeDashoffset: len, opacity: 0.8 });
    gsap.set(dot, { opacity: 0, scale: 0, transformOrigin: '50% 50%' });
    gsap.set('.spc-ib--l', { opacity: 0, x: -50 }); gsap.set('.spc-ib--r', { opacity: 0, x: 50 });
    gsap.to(sec, { backgroundColor: '#f7f9fb', duration: 0.8, ease: 'power2.inOut', scrollTrigger: { trigger: sec, start: 'top 0%', toggleActions: 'play none none reverse' } });
    gsap.to('.spc-head', { color: '#85BFC1', duration: 0.8, ease: 'power2.inOut', scrollTrigger: { trigger: sec, start: 'top 0%', toggleActions: 'play none none reverse' } });
    ScrollTrigger.create({ trigger: '.spc-path', start: 'top top', endTrigger: '.spc-scroll', end: 'bottom 90%', pin: true, pinSpacing: false });
    gsap.to(wave, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut', scrollTrigger: { trigger: '.spc-scroll', start: 'top 80%', end: '20% top', scrub: 0.5 } });
    var tl = gsap.timeline({ scrollTrigger: { trigger: '.spc-scroll', start: 'top 70%', end: 'bottom top', scrub: 1 } });
    tl.to(dot, { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(1.7)' });
    if (window.MotionPathPlugin) tl.to(dot, { motionPath: { path: wave, align: wave, alignOrigin: [0.5, 0.5], autoRotate: false }, ease: 'none', duration: 1 });
    gsap.to('.spc-ib--l', { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: '.spc-scroll', start: 'center bottom', end: 'top 40%', toggleActions: 'play none none reverse' } });
    gsap.to('.spc-ib--r', { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: '.spc-scroll', start: 'top bottom', toggleActions: 'play none none reverse' } });
  }

  /* ---------- 요금표 더보기 (400px ↔ scrollHeight + 버튼영역 + 20, .3s) ---------- */
  var mb = $('.rs-mb'), mc = $('.rs-mc');
  if (mb && mc) mb.addEventListener('click', function () {
    var open = !mc.classList.contains('is-open');
    if (open) { var extra = $('.rs-mbtn', mc).offsetHeight || 0; mc.style.height = (mc.scrollHeight + extra + 20) + 'px'; }
    else mc.style.height = '400px';
    mc.classList.toggle('is-open', open);
    mb.setAttribute('aria-expanded', open ? 'true' : 'false');
    mb.textContent = open ? 'close' : 'more view';
    if (hasGsap) setTimeout(function () { ScrollTrigger.refresh(); }, 350);
  });

  /* ---------- 초기화 ---------- */
  initSwipers();
  if (hasGsap) {
    initGsapFade(); initCircle(); initParallax(); initBooking(); initHeroPin(); initPrologue(); initRhythm();
    window.addEventListener('load', function () { initRoom(); makeHdTrigger(); ScrollTrigger.refresh(); });
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { initRoom(); makeHdTrigger(); ScrollTrigger.refresh(); }, 300); });
    makeHdTrigger();
  } else {
    initBooking(); initRoom(); makeHdTrigger();
    $$('[data-aos]').forEach(function (el) { el.classList.add('is-in'); });
  }
})();
