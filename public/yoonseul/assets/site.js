/* 윤슬 풀빌라 — 공통 동작
   머리 스크롤 상태 · 전체 메뉴 · 등장 모션 · 페이드 슬라이더 · 스페셜 이중 슬라이더 · 모바일 스페셜 ·
   예약 콜라주/ROOM VIEW 스크롤 고정 · 곡선 그리기 · 패럴랙스 · 요금표 더보기 */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body;
  var hd = $('#header');
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  /* ---------- 머리: 기준 섹션 상단이 화면 위에 닿으면 청록 바 ---------- */
  function hdTrigger() {
    var sel = body.getAttribute('data-hd-trigger') || '.s-container';
    if (body.classList.contains('is-main') && window.innerWidth < 1000) sel = '.mh';
    if (body.classList.contains('is-main') && window.innerWidth <= 768) sel = '.mh';
    return $(sel);
  }
  var trig = hdTrigger();
  window.addEventListener('resize', function () { trig = hdTrigger(); });

  /* ---------- 전체 메뉴 ---------- */
  var sm = $('#screenMenu'), smBtn = $('.hd-menu'), smClose = $('.sm-close'), lastFocus = null, smTimer;
  function openMenu() {
    lastFocus = document.activeElement;
    clearTimeout(smTimer);
    sm.hidden = false;
    requestAnimationFrame(function () { requestAnimationFrame(function () { sm.classList.add('is-open'); }); });
    smBtn.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden';
    setTimeout(function () { smClose.focus(); }, 50);
  }
  function closeMenu() {
    sm.classList.remove('is-open');
    smBtn.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
    smTimer = setTimeout(function () { sm.hidden = true; }, reduce ? 0 : 800);
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
      it.addEventListener('mouseenter', act);
      it.addEventListener('focusin', act);
    });
  }

  /* ---------- 모바일 인트로 화면 (≤1024) ---------- */
  var intro = $('.intro-screen');
  if (intro && !reduce && window.innerWidth <= 1024) {
    requestAnimationFrame(function () { intro.classList.add('is-on'); });
    setTimeout(function () { intro.classList.add('is-hide'); }, 2500);
    setTimeout(function () { intro.style.display = 'none'; }, 3400);
  } else if (intro) { intro.style.display = 'none'; }

  /* ---------- 메인 인트로 타이틀: 글자 쪼개기 (stagger .15s, 3.5s 부터) ---------- */
  var t3 = $('.mi-t3');
  if (t3) {
    var txt = t3.textContent;
    t3.textContent = '';
    txt.split('').forEach(function (ch, i) {
      var s = document.createElement('i');
      s.textContent = ch;
      s.style.animationDelay = (3.5 + i * 0.15) + 's';
      t3.appendChild(s);
    });
  }

  /* ---------- 등장 모션 ---------- */
  var rvEls = $$('[data-rv], .st-circle, .spc-ib');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, d = parseInt(el.getAttribute('data-d') || '0', 10);
        el.style.transitionDelay = d ? d + 'ms' : '';
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    rvEls.forEach(function (el) { if (!el.classList.contains('spc-ib')) io.observe(el); });
  } else {
    rvEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- 페이드 슬라이더 (메인 항공 · 서브 히어로) ---------- */
  $$('[data-fade]').forEach(function (root) {
    var slides = $$('.hs-slide,.sh-slide', root), n = slides.length, i = 0, timer;
    var cur = $('[data-cur]', root);
    if (n < 2) return;
    function go(k) {
      slides[i].classList.remove('is-active');
      i = (k + n) % n;
      slides[i].classList.add('is-active');
      var img = $('img', slides[i]); if (img) img.loading = 'eager';
      if (cur) cur.textContent = pad(i + 1);
    }
    function play() { if (reduce) return; clearInterval(timer); timer = setInterval(function () { go(i + 1); }, parseInt(root.getAttribute('data-delay') || '4000', 10)); }
    var p = $('[data-prev]', root), nx = $('[data-next]', root);
    if (p) p.addEventListener('click', function () { go(i - 1); play(); });
    if (nx) nx.addEventListener('click', function () { go(i + 1); play(); });
    play();
  });

  /* ---------- 스페셜 이중 슬라이더 (속도 1000ms · 자동 3000ms · 이미지 패럴랙스 0.5) ---------- */
  $$('[data-sp]').forEach(function (root) {
    var mtrack = $('.sp-track', root), ttrack = $('.sp-ttrack', root);
    var orig = $$('.sp-slide', mtrack), torig = $$('.sp-t', ttrack), n = orig.length;
    // 앞뒤로 한 벌씩 복제해 무한 루프
    [orig, torig].forEach(function (list, idx) {
      var tr = idx ? ttrack : mtrack;
      list.forEach(function (el) { var c = el.cloneNode(true); c.setAttribute('aria-hidden', 'true'); $$('a', c).forEach(function (a) { a.tabIndex = -1; }); tr.appendChild(c); });
      list.slice().reverse().forEach(function (el) { var c = el.cloneNode(true); c.setAttribute('aria-hidden', 'true'); $$('a', c).forEach(function (a) { a.tabIndex = -1; }); tr.insertBefore(c, tr.firstChild); });
    });
    var mAll = $$('.sp-slide', mtrack), tAll = $$('.sp-t', ttrack), bar = $('.sp-bar span', root);
    var pos = n, timer, busy = false, SPEED = reduce ? 0 : 1000;
    bar.style.width = (100 / n) + '%';
    function layout(anim) {
      var W = root.clientWidth, tw = tAll[0].offsetWidth;
      var tr = anim ? 'transform ' + SPEED + 'ms ease' : 'none';
      mtrack.style.transition = tr; ttrack.style.transition = tr;
      mtrack.style.transform = 'translate3d(' + (-pos * W) + 'px,0,0)';
      ttrack.style.transform = 'translate3d(' + (W / 2 - tw / 2 - pos * tw) + 'px,0,0)';
      mAll.forEach(function (s, k) {
        var bg = $('.sp-bg', s);
        bg.style.transition = tr;
        bg.style.transform = 'translate3d(' + ((pos - k) * W * 0.5) + 'px,0,0)';
      });
      tAll.forEach(function (t, k) { t.classList.toggle('is-active', k === pos); });
      bar.style.transform = 'translateX(' + (((pos - n) % n + n) % n) * 100 + '%)';
    }
    function go(p) {
      if (busy) return;
      busy = SPEED > 0; pos = p; layout(true);
      setTimeout(function () {
        busy = false;
        if (pos >= 2 * n || pos < n) { pos = ((pos - n) % n + n) % n + n; layout(false); }
      }, SPEED + 20);
    }
    function play() { if (reduce) return; clearInterval(timer); timer = setInterval(function () { go(pos + 1); }, 3000 + SPEED); }
    $('.sp-next', root).addEventListener('click', function () { go(pos + 1); play(); });
    $('.sp-prev', root).addEventListener('click', function () { go(pos - 1); play(); });
    tAll.forEach(function (t, k) { t.addEventListener('click', function (e) { if (k !== pos) { e.preventDefault(); go(k); play(); } }); });
    root.addEventListener('mouseenter', function () { clearInterval(timer); });
    root.addEventListener('mouseleave', play);
    window.addEventListener('resize', function () { layout(false); });
    layout(false); play();
  });

  /* ---------- 모바일 스페셜 2열 (속도 600ms · 자동 2500ms) ---------- */
  $$('[data-msp]').forEach(function (root) {
    var tr = $('.msp-track', root), orig = $$('.msp-slide', tr), n = orig.length, sec = root.parentNode;
    orig.forEach(function (el) { var c = el.cloneNode(true); c.setAttribute('aria-hidden', 'true'); $('a', c).tabIndex = -1; tr.appendChild(c); });
    orig.slice().reverse().forEach(function (el) { var c = el.cloneNode(true); c.setAttribute('aria-hidden', 'true'); $('a', c).tabIndex = -1; tr.insertBefore(c, tr.firstChild); });
    var pos = n, timer, SP = reduce ? 0 : 600;
    function lay(anim) {
      var w = root.clientWidth / 2;
      tr.style.transition = anim ? 'transform ' + SP + 'ms ease' : 'none';
      tr.style.transform = 'translate3d(' + (-pos * w) + 'px,0,0)';
    }
    function go(p) { pos = p; lay(true); setTimeout(function () { if (pos >= 2 * n || pos < n) { pos = ((pos - n) % n + n) % n + n; lay(false); } }, SP + 20); }
    function play() { if (reduce) return; clearInterval(timer); timer = setInterval(function () { go(pos + 1); }, 2500 + SP); }
    $('.msp-next', sec).addEventListener('click', function () { go(pos + 1); play(); });
    $('.msp-prev', sec).addEventListener('click', function () { go(pos - 1); play(); });
    window.addEventListener('resize', function () { lay(false); });
    lay(false); play();
  });

  /* ---------- 스크롤 연동 ---------- */
  var bk = $('.bk'), c1 = $('.bk-col1'), c2 = $('.bk-col2');
  var rm = $('.rm'), rg = $('.rg'), rgItems = $$('.rg-item'), rmCol = $('.rm-col2');
  var plPath = $('.pl-path'), plDot = $('.pl-dot'), plLen = plPath ? plPath.getTotalLength() : 0;
  var rhythm = $('[data-rhythm]'), wave = $('.spc-wave'), wLen = wave ? wave.getTotalLength() : 0, dot = $('.spc-dot');
  var pars = $$('[data-parallax]');
  var ibL = $('.spc-ib--l'), ibR = $('.spc-ib--r'), scrollBox = $('.spc-scroll');
  if (plPath) { plPath.style.strokeDasharray = plLen; plPath.style.strokeDashoffset = plLen; }
  if (wave) { wave.style.strokeDasharray = wLen; wave.style.strokeDashoffset = wLen; }

  function sizeRoom() {
    if (!rm || !rg) return;
    if (window.innerWidth <= 1280) { rm.style.height = ''; return; }
    rg.style.transform = 'none';
    var amount = rmCol.scrollHeight - rmCol.clientHeight;
    rm.style.height = (window.innerHeight + Math.max(0, amount)) + 'px';
    rm._amount = amount;
  }

  function onScroll() {
    var vh = window.innerHeight, y = window.scrollY;
    if (hd && trig) hd.classList.toggle('is-scroll', trig.getBoundingClientRect().top <= 0);

    if (bk && window.innerWidth > 1024) {
      var r = bk.getBoundingClientRect(), p = clamp(-r.top / (r.height - vh), 0, 1);
      c1.style.transform = 'translate3d(0,' + (-90 + 90 * p) + '%,0)';
      c2.style.transform = 'translate3d(0,' + (40 - 70 * p) + '%,0)';
    }
    if (rm && rg && window.innerWidth > 1280) {
      var rr = rm.getBoundingClientRect(), q = clamp(-rr.top / Math.max(1, rr.height - vh), 0, 1);
      rg.style.transform = 'translate3d(0,' + (-q * (rm._amount || 0)) + 'px,0)';
      var mid = vh / 2;
      rgItems.forEach(function (it) {
        var b = it.getBoundingClientRect();
        it.classList.toggle('is-active', b.top <= mid && b.bottom >= mid);
      });
    }
    if (plPath) {
      var pr = plPath.closest('.pl-s2').getBoundingClientRect();
      var pp = clamp((vh - pr.top) / (pr.height + vh * .2), 0, 1);
      plPath.style.strokeDashoffset = plLen * (1 - pp);
      var pt = plPath.getPointAtLength(plLen * pp);
      plDot.setAttribute('cx', pt.x); plDot.setAttribute('cy', pt.y);
    }
    if (rhythm) {
      var hr = rhythm.getBoundingClientRect();
      rhythm.classList.toggle('is-light', hr.top <= 0);
      var sb = scrollBox.getBoundingClientRect();
      // 선 그리기: 스크롤 영역 top 80% → 20% top
      var s1 = clamp((vh * .8 - sb.top) / (vh * .8 + sb.height * .2), 0, 1);
      wave.style.strokeDashoffset = wLen * (1 - s1);
      var s2 = clamp((vh * .7 - sb.top) / (vh * .7 + sb.height), 0, 1);
      var svg = wave.ownerSVGElement, pt2 = wave.getPointAtLength(wLen * s2), bb = svg.getBoundingClientRect();
      dot.style.opacity = s2 > 0.02 ? 1 : 0;
      dot.style.transform = 'translate(' + ((pt2.x - 50) / 100 * bb.width) + 'px,' + (pt2.y / 900 * bb.height) + 'px)';
      if (sb.top + sb.height / 2 < vh) ibL.classList.add('is-in'); else if (sb.top > vh * .6) ibL.classList.remove('is-in');
      if (sb.top < vh) ibR.classList.add('is-in'); else ibR.classList.remove('is-in');
    }
    if (!reduce) pars.forEach(function (el) {
      var b = el.parentNode.getBoundingClientRect();
      if (b.bottom < 0 || b.top > vh) return;
      var k = clamp((vh - b.top) / (vh + b.height), 0, 1);
      el.style.transform = 'translate3d(0,' + (-100 * k) + 'px,0)';
    });
  }
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { ticking = false; onScroll(); });
  }, { passive: true });
  window.addEventListener('resize', function () { sizeRoom(); onScroll(); });
  window.addEventListener('load', function () { sizeRoom(); onScroll(); });
  sizeRoom(); onScroll();

  /* ---------- 요금표 더보기 ---------- */
  var mb = $('.rs-mb'), mc = $('.rs-mc');
  if (mb && mc) mb.addEventListener('click', function () {
    var open = mc.classList.toggle('is-open');
    mb.setAttribute('aria-expanded', open ? 'true' : 'false');
    mb.textContent = open ? 'close' : 'more view';
  });
})();
