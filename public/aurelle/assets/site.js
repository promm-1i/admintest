/* AURELLE HOTEL SEOUL — 공통 동작 (언어·전체 메뉴·꼬리 셀렉트·퀵/Top·탭·아코디언·샘플 안내) */
(function () {
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var body = document.body;
  document.documentElement.classList.add('js');

  /* 드롭다운(언어·꼬리 셀렉트) */
  $$('[data-dd]').forEach(function (d) {
    var b = d.querySelector('button');
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var on = !d.classList.contains('open');
      $$('[data-dd]').forEach(function (x) { x.classList.remove('open'); x.querySelector('button').setAttribute('aria-expanded', 'false'); });
      d.classList.toggle('open', on); b.setAttribute('aria-expanded', on ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function () { $$('[data-dd]').forEach(function (x) { x.classList.remove('open'); }); });

  /* GNB 드롭다운: 항목에 올리면 머리 아래 흰 판 + 해당 목록 즉시 표시 (레퍼런스 실측: 전환 없음) */
  var hd = $('.hd');
  if (hd) {
    var items = $$('.gnb-it', hd);
    var close = function () { hd.classList.remove('gnb-open'); items.forEach(function (x) { x.classList.remove('open'); }); };
    items.forEach(function (it) {
      var open = function () {
        close();
        if (!$('.gnb-sub', it)) return;
        it.classList.add('open'); hd.classList.add('gnb-open');
      };
      it.addEventListener('mouseenter', open);
      it.addEventListener('focusin', open);
    });
    hd.addEventListener('mouseleave', close);
    hd.addEventListener('focusout', function (e) { if (!hd.contains(e.relatedTarget)) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* 전체 메뉴 */
  var am = $('#allmenu'), lastFocus = null;
  function amOpen(on) {
    if (!am) return;
    am.classList.toggle('open', on); am.setAttribute('aria-hidden', on ? 'false' : 'true');
    body.classList.toggle('lock', on);
    if (on) { lastFocus = document.activeElement; setTimeout(function () { $('.am-x', am).focus(); }, 50); }
    else if (lastFocus) lastFocus.focus();
  }
  $$('[data-am-open]').forEach(function (b) { b.addEventListener('click', function () { amOpen(true); }); });
  $$('[data-am-close]').forEach(function (b) { b.addEventListener('click', function () { amOpen(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') amOpen(false); });

  /* 퀵 메뉴 Top · 모바일 Top */
  var qk = $('.qk'), mt = $('.m-top');
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (qk) qk.classList.toggle('scrolled', y > 300);
    if (mt) mt.classList.toggle('show', y > 300);
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  $$('[data-top]').forEach(function (b) {
    b.addEventListener('click', function () {
      var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: rm ? 'auto' : 'smooth' });
    });
  });

  /* 탭 (data-tabs 그룹 → data-panel) */
  $$('[data-tabs]').forEach(function (g) {
    var tabs = $$('[role="tab"]', g);
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        var k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (k) { e.preventDefault(); var n = (i + k + tabs.length) % tabs.length; select(n); tabs[n].focus(); }
      });
    });
    function select(i) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.classList.toggle('is-on', on); t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1;
        var p = document.getElementById(t.getAttribute('aria-controls'));
        if (p) { p.hidden = !on; p.classList.toggle('is-on', on); }
      });
    }
  });

  /* 아코디언 (FAQ) */
  $$('[data-acc] .acc-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var it = q.closest('.acc-it'), on = !it.classList.contains('open');
      it.classList.toggle('open', on); q.setAttribute('aria-expanded', on ? 'true' : 'false');
      var a = document.getElementById(q.getAttribute('aria-controls')); if (a) a.hidden = !on;
    });
  });

  /* 샘플 사이트 안내 (예약·가입·로그인 등 실제 동작 없는 버튼) */
  var note;
  function toast(msg) {
    if (!note) { note = document.createElement('div'); note.className = 'sample-note'; note.setAttribute('role', 'status'); body.appendChild(note); }
    note.textContent = msg; note.classList.add('show');
    clearTimeout(note._t); note._t = setTimeout(function () { note.classList.remove('show'); }, 2200);
  }
  $$('[data-sample]').forEach(function (el) {
    el.addEventListener(el.tagName === 'FORM' ? 'submit' : 'click', function (e) {
      e.preventDefault(); toast(el.getAttribute('data-sample') || '샘플 사이트입니다. 실제 예약·가입은 진행되지 않습니다.');
    });
  });
})();
