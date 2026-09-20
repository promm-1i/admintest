/* hotel-e 서라호텔앤리조트 — 공통 동작 (머리 고정·전체 메뉴·언어/통화·예약 모달·꼬리 아코디언·패밀리사이트·등장 모션) */
(function () {
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var hd = $('#header'), dim = $('#hdDim'), body = document.body;
  var isPC = function () { return window.innerWidth > 767; };

  /* 머리: 투명 히어로 위에서는 투명, 내려가면 흰색 고정 */
  var transparent = hd && hd.classList.contains('transparent');
  function onScroll() {
    var t = window.scrollY || document.documentElement.scrollTop;
    if (!hd) return;
    if (transparent) {
      hd.classList.toggle('solid', t > 80);
      hd.classList.toggle('fixed', t > 80);
    } else {
      hd.classList.add('solid', 'fixed');
      hd.classList.add('fixed');
    }
  }
  if (hd && !transparent) { hd.classList.add('solid', 'fixed'); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 언어·통화 드롭다운 */
  $$('.hd-sel').forEach(function (s) {
    $('.sel-btn', s).addEventListener('click', function (e) {
      e.stopPropagation();
      var on = s.classList.contains('on');
      $$('.hd-sel').forEach(function (x) { x.classList.remove('on'); });
      if (!on) s.classList.add('on');
    });
    $$('.sel-list button', s).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('.sel-list button', s).forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        $('.sel-btn', s).textContent = b.textContent;
        s.classList.remove('on');
      });
    });
  });
  document.addEventListener('click', function () { $$('.hd-sel').forEach(function (x) { x.classList.remove('on'); }); });

  /* 전체 메뉴 */
  var am = $('#allmenu');
  function amOpen(on) {
    if (!am) return;
    am.classList.toggle('on', on);
    if (dim) dim.classList.toggle('on', on);
    body.classList.toggle('lock', on);
  }
  if ($('#allmenuBtn')) $('#allmenuBtn').addEventListener('click', function () { amOpen(true); });
  if ($('#allmenuClose')) $('#allmenuClose').addEventListener('click', function () { amOpen(false); });

  /* 예약 모달 */
  var rm = $('#reserveModal');
  function rmOpen(on) {
    if (!rm) return;
    rm.classList.toggle('on', on);
    body.classList.toggle('lock', on);
  }
  if ($('#btnReserve')) $('#btnReserve').addEventListener('click', function () { rmOpen(true); });
  if (rm) {
    $('.modal-close', rm).addEventListener('click', function () { rmOpen(false); });
    $('.modal-dimm', rm).addEventListener('click', function () { rmOpen(false); });
  }
  if (dim) dim.addEventListener('click', function () { amOpen(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { amOpen(false); rmOpen(false); } });

  /* 공통 셀렉트 */
  $$('.sel').forEach(function (s) {
    var head = $('.sel-head', s);
    if (!head) return;
    head.addEventListener('click', function (e) {
      e.stopPropagation();
      var on = s.classList.contains('on');
      $$('.sel').forEach(function (x) { x.classList.remove('on'); });
      if (!on) s.classList.add('on');
    });
    $$('.sel-body button', s).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('.sel-body button', s).forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        head.firstChild.textContent = b.textContent;
        s.classList.remove('on');
      });
    });
  });
  document.addEventListener('click', function () { $$('.sel').forEach(function (x) { x.classList.remove('on'); }); });

  /* 꼬리 아코디언 · 패밀리사이트 */
  $$('.ft-acc-item').forEach(function (it) {
    $('.ft-acc-btn', it).addEventListener('click', function () { it.classList.toggle('on'); });
  });
  var fam = $('.ft-family');
  if (fam) {
    $('.family-btn', fam).addEventListener('click', function (e) { e.stopPropagation(); fam.classList.toggle('on'); });
    document.addEventListener('click', function () { fam.classList.remove('on'); });
  }

  /* 등장 모션 (원본 dataMotion: 화면 아래 20% 지점) */
  var ms = $$('[data-motion]');
  if (ms.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('active'); io.unobserve(e.target); } });
      }, { rootMargin: '0px 0px -20% 0px' });
      ms.forEach(function (m) { io.observe(m); });
    } else { ms.forEach(function (m) { m.classList.add('active'); }); }
  }

  /* 칩 · 탭 공통 (data-chips 그룹 안에서 하나만 on) */
  $$('[data-chips]').forEach(function (g) {
    $$('.chip', g).forEach(function (c) {
      c.addEventListener('click', function () {
        $$('.chip', g).forEach(function (x) { x.classList.remove('on'); });
        c.classList.add('on');
        var key = c.getAttribute('data-target');
        if (!key) return;
        var scope = document.querySelector(g.getAttribute('data-chips'));
        if (!scope) return;
        $$('[data-pane]', scope).forEach(function (p) {
          p.classList.toggle('on', p.getAttribute('data-pane') === key);
        });
        if (window.Swiper) window.dispatchEvent(new Event('resize'));
      });
    });
  });

  document.documentElement.classList.add('js');
})();
