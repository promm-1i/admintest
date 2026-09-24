/* 늘숲(NEULSOOP) — 공통 스크립트
   모션 값은 레퍼런스 번들(GSAP 3 · ScrollTrigger · Swiper 11 · framer-motion)에서 읽은 설정을 그대로 옮김.
   GSAP·Swiper 는 jsdelivr 에서 불러오며, 없으면 정적 레이아웃으로 동작한다. */
(function () {
  'use strict';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var G = window.gsap, ST = window.ScrollTrigger, SW = window.Swiper;
  if (G && ST) G.registerPlugin(ST);
  if (!SW) document.documentElement.classList.add('no-swiper');

  /* ---- 머리: y>10 이면 흰 바탕, 300 아래에서 내리면 숨김(top .3s, 지연 .3s), 올리면 표시 ---- */
  var hd = $('#hd'), lastY = window.scrollY, ticking = false, totop = $('.totop');
  function onScroll() {
    var y = window.scrollY;
    var locked = hd.classList.contains('open') || hd.classList.contains('sch-open');
    hd.classList.toggle('solid', y > 10 || locked);
    if (!locked) {
      if (y > lastY && y > 300) hd.classList.add('hide');
      else if (y < lastY) hd.classList.remove('hide');
    }
    if (totop) totop.classList.toggle('show', y > 0); // 레퍼런스: 스크롤이 0 이 아니면 표시
    lastY = y; ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  if (totop) totop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });

  /* ---- 언어 선택 ---- */
  var langBtn = $('.hd-lang'), langList = $('#lang-list');
  if (langBtn && langList) {
    var setLang = function (open) { langBtn.setAttribute('aria-expanded', String(open)); langList.classList.toggle('open', open); };
    langBtn.addEventListener('click', function (e) { e.stopPropagation(); setLang(langBtn.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('click', function (e) { if (!e.target.closest('.hd-lang-w')) setLang(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setLang(false); });
  }

  /* ---- 검색 패널: 머리가 429 높이로 흰색이 되고 아래는 rgba(0,0,0,.3) 덮개 ---- */
  var schBtn = $('.hd-search'), sch = $('#hd-sch'), dim = $('.sch-dim');
  if (schBtn && sch) {
    var schIcon = schBtn.innerHTML;
    var xIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6 6 18"/></svg>';
    var setSch = function (open) {
      sch.hidden = !open; if (dim) dim.hidden = !open;
      hd.classList.toggle('sch-open', open); hd.classList.remove('hide');
      schBtn.setAttribute('aria-expanded', String(open));
      schBtn.setAttribute('aria-label', open ? '검색 닫기' : '검색 열기');
      schBtn.innerHTML = open ? xIcon : schIcon;
      if (open) $('input', sch).focus();
      onScroll();
    };
    schBtn.addEventListener('click', function () { setSch(sch.hidden); });
    if (dim) dim.addEventListener('click', function () { setSch(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !sch.hidden) { setSch(false); schBtn.focus(); } });
  }

  /* ---- 모바일 메뉴 (왼쪽에서 .5s 로 들어옴, 아코디언 .3s) ---- */
  var mBtn = $('.hd-menu'), mnav = $('#mnav');
  if (mBtn && mnav) {
    var menuIcon = mBtn.innerHTML;
    var closeIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 5l14 14M19 5 5 19"/></svg>';
    var setMenu = function (open) {
      mnav.classList.toggle('open', open); hd.classList.toggle('open', open); hd.classList.remove('hide');
      document.body.classList.toggle('lock', open);
      mBtn.setAttribute('aria-expanded', String(open));
      mBtn.setAttribute('aria-label', open ? '전체 메뉴 닫기' : '전체 메뉴 열기');
      mBtn.innerHTML = open ? closeIcon : menuIcon;
      onScroll();
    };
    mBtn.addEventListener('click', function () { setMenu(!mnav.classList.contains('open')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && mnav.classList.contains('open')) { setMenu(false); mBtn.focus(); } });
    $$('.mnav-t', mnav).forEach(function (b) {
      b.addEventListener('click', function () {
        var sub = document.getElementById(b.getAttribute('aria-controls'));
        var open = b.getAttribute('aria-expanded') !== 'true';
        b.setAttribute('aria-expanded', String(open));
        sub.style.maxHeight = open ? sub.scrollHeight + 'px' : '0px';
        sub.classList.toggle('open', open);
      });
    });
    $$('a', mnav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    window.addEventListener('resize', function () { if (innerWidth > 1023 && mnav.classList.contains('open')) setMenu(false); });
  }

  /* ---- 첫 화면 ---- */
  var pinBox = $('.kv-pin');
  if (pinBox && G && !reduce) {
    var mode = pinBox.dataset.kv, pinPx = parseFloat(getComputedStyle(pinBox).getPropertyValue('--pin')) || 450;
    var ta = $('.kv-a', pinBox), tb = $('.kv-b', pinBox);
    var m = $$('.kv-slide', pinBox), p = $$('.kv-zoom', pinBox);
    if (mode === 'main' && m.length) {
      // 레퍼런스 메인: 첫 장 1.15→1 (9s power2.out), 6s 뒤부터 9s 간격 무한 교차
      G.set(p[0], { scale: 1.15, transformOrigin: 'center center' });
      G.timeline({ defaults: { ease: 'power2.out' } }).to(p[0], { scale: 1, duration: 9 });
      if (m.length > 1) {
        var loop = G.timeline({ repeat: -1, delay: 6, defaults: { ease: 'power2.inOut' } });
        m.forEach(function (_, l) {
          var a = l === m.length - 1 ? 0 : l + 1;
          G.set(p[a], { scale: 1.25 });
          loop.to(m[a], { opacity: 1, duration: 9 })
            .to(m[l], { opacity: 0, duration: 4 }, '<')
            .to(p[a], { scale: 1, duration: 9 }, '<')
            .to(p[l], { scale: 1.15, duration: 8, delay: 1 }, '<');
        });
      }
    }
    if (ST && ta && tb) {
      // 고정 구간(스크롤 --pin px) 동안 스크럽 .3 으로 문구가 올라가며 사라짐
      var tl = G.timeline({ scrollTrigger: { trigger: pinBox, start: 'top top', end: '+=' + pinPx, scrub: 0.3 } });
      if (mode === 'main') {
        tl.to(ta, { y: '-120%', autoAlpha: 0, duration: 4.8, delay: 2.4 }).to(tb, { y: '-280%', autoAlpha: 0, duration: 4.9, delay: 0.2 }, '<');
      } else if (mode === 'px') {
        tl.to(ta, { y: '-250px', autoAlpha: 0, duration: 3.8 }).to(tb, { y: '-280px', autoAlpha: 0, duration: 3.9, delay: 0.1 }, '<');
      } else {
        tl.to(ta, { y: '-120%', autoAlpha: 0, duration: 4.8 }).to(tb, { y: '-280%', autoAlpha: 0, duration: 4.9 }, '<');
      }
    }
  }

  /* ---- Swiper (레퍼런스 설정) ---- */
  if (SW) {
    var sp = reduce ? 0 : 600;
    // ul>li 구조라 슬라이드 역할을 listitem 으로 (기본 group 은 목록 규칙 위반)
    var A11Y = { slideRole: 'listitem' };
    if ($('.walk-sw')) new SW('.walk-sw', {
      loop: false, spaceBetween: 16, slidesPerView: 'auto', slidesPerGroup: 1, speed: sp, // 레퍼런스는 loop:true 이나 카드 3장이라 Swiper 가 스스로 끄므로 같은 동작

      navigation: { prevEl: '.walk-prev', nextEl: '.walk-next' }, a11y: A11Y,
      breakpoints: { 960: { slidesPerView: 3, spaceBetween: 24 } }
    });
    if ($('.rs-sw')) new SW('.rs-sw', {
      loop: true, spaceBetween: 8, slidesPerView: 'auto', centeredSlides: true, speed: sp, grabCursor: true,
      navigation: { prevEl: '.rs-prev', nextEl: '.rs-next' },
      autoplay: reduce ? false : { delay: 2500, disableOnInteraction: false },
      breakpoints: { 1024: { slidesPerView: 'auto', spaceBetween: 16, centeredSlides: true } },
      a11y: { slideRole: 'listitem', prevSlideMessage: '이전 사진', nextSlideMessage: '다음 사진' }
    });
    if ($('.sy-sw')) new SW('.sy-sw', {
      slidesPerView: 1, spaceBetween: 8, speed: sp, autoHeight: true,
      navigation: { prevEl: '.sy-prev', nextEl: '.sy-next' }, a11y: A11Y
    });
  }

  /* ---- 분류 칩 + 검색 ---- */
  $$('[data-filter]').forEach(function (group) {
    var sec = group.closest('section');
    var items = $$('[data-items] > li', sec);
    var empty = $('.empty', sec);
    var search = $('input[type="search"]', sec);
    var cat = 'all';
    var apply = function () {
      var q = search ? search.value.trim() : '';
      var shown = 0;
      items.forEach(function (li) {
        var ok = (cat === 'all' || li.dataset.cat === cat) && (!q || (li.dataset.name || '').indexOf(q) > -1);
        li.hidden = !ok; if (ok) shown++;
      });
      if (empty) empty.hidden = shown > 0;
    };
    var pick = function (k) {
      if (!$('[data-f="' + k + '"]', group)) return;
      cat = k;
      $$('.chip', group).forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.f === k)); });
      apply();
    };
    group.addEventListener('click', function (e) { var b = e.target.closest('.chip'); if (b) pick(b.dataset.f); });
    if (search) {
      search.addEventListener('input', apply);
      var q = new URLSearchParams(location.search).get('q');
      if (q) { search.value = q; apply(); }
    }
    var fromHash = function () {
      var h = location.hash.replace('#', '');
      if (h === 'brand-search' && search) { search.focus(); return; }
      if (h) pick(h);
    };
    window.addEventListener('hashchange', fromHash);
    fromHash();
  });

  /* ---- 탭 (오시는 길) ---- */
  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    var sel = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { sel(t); });
      t.addEventListener('keydown', function (e) {
        var j = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : null;
        if (j === null) return;
        e.preventDefault(); sel(tabs[(j + tabs.length) % tabs.length], true);
      });
    });
  });

  /* ---- 객실 패널 (레퍼런스 framer-motion 값)
     데스크톱: 화면 하단 600px 위로 들어오면 겹친 카드(회전 -4~4°)가 떠오르고(.6s) → 회전 0(.3s, 지연 .6s)
     → 가로로 펼침(x=-860+280t, .4s easeIn, 지연 1.6s). 3초 뒤부터 호버: 높이 700·위로 50·맨 앞,
     줄 전체는 호버한 순번만큼 왼쪽 이동(0,-77,-153,-230,-307,-383) .6s easeInOut.
     모바일: 가운데 한 장(scale 1) + 좌우 130px 간격 scale .9, 드래그 50px 넘으면 넘김(.5s ease-out). ---- */
  $$('[data-panels]').forEach(function (row) {
    var cards = $$('.pn', row), n = cards.length;
    var shift = [0, -77, -153, -230, -307, -383, -460];
    var inView = false, canHover = false, hov = -1, last = -1, mobile = null, idx = 0, drag = null, moved = false, timer;
    var mq = matchMedia('(max-width: 1023px)');
    setTimeout(function () { canHover = true; }, reduce ? 0 : 3000);
    function paintDesk() {
      row.style.transform = 'translateX(' + (last >= 0 ? shift[last] : 0) + 'px)';
      cards.forEach(function (c, t) {
        var h = hov === t, s = c.style;
        s.transform = '';
        s.left = 'calc(50% + ' + (inView ? -860 + 280 * t : -250) + 'px)';
        s.top = 'calc(50% + ' + (inView ? (h ? -350 : -300) : 0) + 'px)';
        s.height = (inView && h ? 700 : 600) + 'px';
        s.opacity = inView ? 1 : 0;
        s.rotate = inView ? '0deg' : getComputedStyle(c).getPropertyValue('--r');
        s.zIndex = inView && h ? 9999 : 10 * t;
      });
    }
    function paintMob(dx) {
      row.style.transform = '';
      cards.forEach(function (c, t) {
        var a = t - idx, s = c.style, sc = a === 0 ? 1 : 0.9, ty = a === 0 ? 0 : 10;
        s.left = s.top = s.height = s.rotate = s.opacity = '';
        s.transform = 'translateX(' + (130 * a + (dx || 0) * 0.3) + 'px) translateY(' + ty + 'px) scale(' + sc + ')';
        s.zIndex = a === 0 ? n + 10 : n - Math.abs(a);
        c.classList.toggle('is-act', a === 0);
      });
    }
    function paint(dx) {
      var m2 = mq.matches;
      if (m2 !== mobile) { mobile = m2; row.classList.toggle('pn-mob', m2); row.classList.toggle('pn-desk', !m2); }
      if (mobile) paintMob(dx); else paintDesk();
    }
    paint();
    mq.addEventListener ? mq.addEventListener('change', function () { paint(); }) : mq.addListener(function () { paint(); });
    if (reduce || !('IntersectionObserver' in window)) { inView = true; row.classList.add('no-anim'); paint(); }
    else {
      var io = new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) { inView = true; paint(); io.disconnect(); }
      }, { rootMargin: '0px 0px -600px 0px' });
      io.observe(row);
    }
    cards.forEach(function (c, t) {
      c.addEventListener('mouseenter', function () {
        if (mobile || !canHover) return;
        clearTimeout(timer);
        timer = setTimeout(function () { hov = t; last = t; paint(); }, 100);
      });
      c.addEventListener('mouseleave', function () { if (mobile) return; clearTimeout(timer); hov = -1; paint(); });
      $('a', c).addEventListener('focus', function () {
        if (mobile) { idx = t; paint(); } else { hov = t; last = t; paint(); }
      });
      $('a', c).addEventListener('blur', function () { if (!mobile) { hov = -1; paint(); } });
    });
    // 모바일 드래그
    var start = function (x) { if (!mobile) return; drag = { x0: x, x: x }; moved = false; row.classList.add('dragging'); };
    var move = function (x) { if (!drag) return; drag.x = x; if (Math.abs(x - drag.x0) > 5) moved = true; paint(x - drag.x0); };
    var end = function () {
      if (!drag) return;
      var d = drag.x0 - drag.x;
      if (Math.abs(d) > 50) { if (d > 0 && idx < n - 1) idx++; else if (d < 0 && idx > 0) idx--; }
      drag = null; row.classList.remove('dragging'); paint();
    };
    row.addEventListener('pointerdown', function (e) { start(e.clientX); });
    window.addEventListener('pointermove', function (e) { move(e.clientX); });
    window.addEventListener('pointerup', end);
    row.addEventListener('click', function (e) { if (moved) { e.preventDefault(); moved = false; } }, true);
    row.addEventListener('keydown', function (e) {
      if (!mobile) return;
      if (e.key === 'ArrowRight' && idx < n - 1) { idx++; paint(); $('a', cards[idx]).focus(); e.preventDefault(); }
      if (e.key === 'ArrowLeft' && idx > 0) { idx--; paint(); $('a', cards[idx]).focus(); e.preventDefault(); }
    });
  });
})();
