/* 늘숲(NEULSOOP) — 공통 스크립트 (의존성 없음) */
(function () {
  'use strict';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---- 머리: 스크롤하면 흰 바탕, 내려가면 숨고 올리면 다시 나타남 ---- */
  var hd = $('#hd'), lastY = window.scrollY, ticking = false;
  var kvIn = $('.kv-in'), kvIn2 = $('.kv-in2') || null;
  var pin = $('.kv-pin'), totop = $('.totop');
  function onScroll() {
    var y = window.scrollY;
    if (hd) {
      hd.classList.toggle('solid', y > 10 || hd.classList.contains('open'));
      if (!hd.classList.contains('open')) {
        if (y > lastY && y > 300) hd.classList.add('hide');
        else if (y < lastY) hd.classList.remove('hide');
      }
    }
    // 첫 화면 문구: 고정 구간 동안 위로 밀리며 사라짐 (실측: 300px 에서 -84/.39, 450px 에서 -134/.03)
    if (kvIn && !reduce) {
      var p = pin ? parseFloat(getComputedStyle(pin).getPropertyValue('--pin')) || 507 : 507;
      var t = Math.min(y, p);
      kvIn.style.transform = 'translateY(' + (-t * 0.29).toFixed(1) + 'px)';
      kvIn.style.opacity = Math.max(0, 1 - t / 470).toFixed(3);
      if (kvIn2) {
        kvIn2.style.transform = 'translateY(' + (-t * 0.117).toFixed(1) + 'px)';
        kvIn2.style.opacity = Math.max(0, 1 - t / 455).toFixed(3);
      }
    }
    if (totop) totop.classList.toggle('show', y > 600);
    lastY = y; ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();
  if (totop) totop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    var f = $('.logo'); if (f) f.focus({ preventScroll: true });
  });

  /* ---- 모바일 메뉴 ---- */
  var mBtn = $('.hd-menu'), mnav = $('#mnav');
  if (mBtn && mnav) {
    var menuIcon = mBtn.innerHTML;
    var closeIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 5l14 14M19 5 5 19"/></svg>';
    var setMenu = function (open) {
      mnav.classList.toggle('open', open);
      hd.classList.toggle('open', open);
      hd.classList.remove('hide');
      document.body.classList.toggle('lock', open);
      mBtn.setAttribute('aria-expanded', String(open));
      mBtn.setAttribute('aria-label', open ? '전체 메뉴 닫기' : '전체 메뉴 열기');
      mBtn.innerHTML = open ? closeIcon : menuIcon;
      onScroll();
    };
    mBtn.addEventListener('click', function () { setMenu(!mnav.classList.contains('open')); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mnav.classList.contains('open')) { setMenu(false); mBtn.focus(); }
    });
    $$('.mnav-t', mnav).forEach(function (b) {
      b.addEventListener('click', function () {
        var sub = document.getElementById(b.getAttribute('aria-controls'));
        var open = b.getAttribute('aria-expanded') !== 'true';
        b.setAttribute('aria-expanded', String(open));
        sub.classList.toggle('open', open);
      });
    });
    $$('a', mnav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    window.addEventListener('resize', function () { if (innerWidth > 1023 && mnav.classList.contains('open')) setMenu(false); });
  }

  /* ---- 첫 화면 슬라이드: 확대(1.25→1) 후 2.5s 교차 페이드, 7.5s 주기 ---- */
  var slides = $$('.kv .kv-slide');
  if (slides.length) {
    // 첫 장도 확대 상태에서 시작해 줄어들게
    slides[0].classList.remove('is-on');
    requestAnimationFrame(function () { requestAnimationFrame(function () { slides[0].classList.add('is-on'); }); });
  }
  if (slides.length > 1 && !reduce) {
    var cur = 0;
    setInterval(function () {
      if (document.hidden) return;
      var prev = slides[cur];
      cur = (cur + 1) % slides.length;
      prev.classList.add('is-out'); prev.classList.remove('is-on');
      slides[cur].classList.add('is-on');
      setTimeout(function () { prev.classList.remove('is-out'); }, 2600);
    }, 7500);
  }

  /* ---- 가로 스크롤 슬라이더 (이전/다음) ---- */
  $$('[data-scroller]').forEach(function (box) {
    var track = $('.sc-track', box), prev = $('.sc-prev', box), next = $('.sc-next', box);
    if (!track) return;
    var step = function () {
      var it = track.children[0]; if (!it) return track.clientWidth;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return it.getBoundingClientRect().width + gap;
    };
    var sync = function () {
      var max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max;
    };
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' }); });
    track.addEventListener('scroll', function () { requestAnimationFrame(sync); }, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  });

  /* ---- 무한 회전 슬라이더 (가운데 정렬, 복제본으로 순환) ---- */
  $$('[data-loop]').forEach(function (box) {
    var track = $('.sc-track', box);
    var orig = Array.prototype.slice.call(track.children);
    var n = orig.length;
    var mkClone = function (li) {
      var c = li.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      $$('a', c).forEach(function (a) { a.tabIndex = -1; });
      return c;
    };
    orig.forEach(function (li) { track.insertBefore(mkClone(li), orig[0]); });
    orig.forEach(function (li) { track.appendChild(mkClone(li)); });
    var slideW = function () { return track.children[0].getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0); };
    var center = function (i, smooth) {
      var el = track.children[i];
      var left = el.offsetLeft - (track.clientWidth - el.offsetWidth) / 2;
      track.scrollTo({ left: left, behavior: smooth && !reduce ? 'smooth' : 'auto' });
    };
    var idx = n; // 원본 첫 장
    center(idx, false);
    window.addEventListener('load', function () { center(idx, false); });
    window.addEventListener('resize', function () { center(idx, false); });
    var t;
    track.addEventListener('scroll', function () {
      clearTimeout(t);
      t = setTimeout(function () {
        var w = slideW();
        var mid = track.scrollLeft + track.clientWidth / 2;
        idx = Math.round((mid - track.children[0].offsetWidth / 2 - track.children[0].offsetLeft) / w);
        if (idx < n || idx >= 2 * n) { idx = ((idx % n) + n) % n + n; center(idx, false); }
      }, 140);
    }, { passive: true });
    var go = function (d) { idx += d; center(idx, true); };
    $('.sc-prev', box).addEventListener('click', function () { go(-1); });
    $('.sc-next', box).addEventListener('click', function () { go(1); });
  });

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
    group.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (b) pick(b.dataset.f);
    });
    if (search) search.addEventListener('input', apply);
    var fromHash = function () {
      var h = location.hash.replace('#', '');
      if (h === 'brand-search' && search) { search.focus({ preventScroll: false }); return; }
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
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
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

  /* ---- 객실 패널: 화면에 들어오면 겹쳐 있던 카드가 펼쳐짐 ---- */
  $$('[data-panels]').forEach(function (row) {
    if (reduce || !('IntersectionObserver' in window)) { row.classList.add('spread'); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { row.classList.add('spread'); io.disconnect(); } });
    }, { rootMargin: '0px 0px -25% 0px' });
    io.observe(row);
  });
})();
