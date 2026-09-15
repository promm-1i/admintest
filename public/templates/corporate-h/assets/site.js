/* 하이온셀 공통 동작 — 레퍼런스 com-ui.js · pub-ui.js 의 동작을 값만 따라 새로 씀
   머리: 메뉴 영역에 마우스 → 하위 목록 전부 높이 0→실제 .3s, 머리 높이 = 가장 긴 목록 + 124
   섹션 active: 스크롤 ≥ 섹션 위 − (PC 850 · 모바일 552) 이면 붙고 떼지 않음
   위로 버튼: 스크롤 > 화면 30% 에서 .5s 로 나타남, 꼬리 근처면 아래 520(모바일 390) */
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const HX = window.HX = {};
  const mq = matchMedia('(max-width:1279px)');
  HX.mobile = () => mq.matches;

  // 머리 메뉴
  const hd = $('.hd'), gnb = $('.gnb');
  if (gnb) {
    const lists = $$('.gnb .d1>ul');
    gnb.addEventListener('mouseenter', () => {
      hd.classList.add('on');
      lists.forEach(ul => { ul.style.transition = 'none'; ul.style.height = '0px'; });
      requestAnimationFrame(() => {
        const big = Math.max(...lists.map(ul => ul.scrollHeight));
        lists.forEach(ul => { ul.style.transition = 'height .3s ease'; ul.style.height = ul.scrollHeight + 'px'; });
        hd.style.height = gnb.style.height = (big + 124) + 'px';
      });
    });
    gnb.addEventListener('mouseleave', () => {
      hd.classList.remove('on');
      hd.style.height = gnb.style.height = '';
      lists.forEach(ul => { ul.style.transition = 'none'; ul.style.height = '0px'; });
    });
  }

  // 고객지원 알약
  const csBtn = $('.cs>button'), csPop = $('.cs-pop');
  if (csBtn) {
    csBtn.addEventListener('click', () => csPop.classList.add('open'));
    $('.cs-pop .x').addEventListener('click', () => csPop.classList.remove('open'));
  }

  // 선택 목록 (언어 · 관련사이트)
  $$('[data-sel]').forEach(root => {
    const btn = root.querySelector(':scope>button'), ul = root.querySelector(':scope>ul');
    btn.addEventListener('click', e => { e.stopPropagation(); const on = !ul.classList.contains('on'); $$('[data-sel]>ul.on').forEach(u => { u.classList.remove('on'); u.previousElementSibling.classList.remove('active'); }); ul.classList.toggle('on', on); btn.classList.toggle('active', on); });
    ul.addEventListener('click', e => { const a = e.target.closest('a'); if (a && a.getAttribute('href') === '#') { e.preventDefault(); $$('a', ul).forEach(x => x.classList.toggle('active', x === a)); } ul.classList.remove('on'); btn.classList.remove('active'); });
  });
  document.addEventListener('click', () => $$('[data-sel]>ul.on').forEach(u => { u.classList.remove('on'); u.previousElementSibling.classList.remove('active'); }));

  // 검색
  const srch = $('.srch');
  $$('.srch-btn').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); closeNav(); srch.classList.add('open'); setTimeout(() => $('input', srch).focus(), 50); }));
  document.addEventListener('click', e => { if (srch && srch.classList.contains('open') && !srch.contains(e.target)) srch.classList.remove('open'); });

  // 사이트맵 (PC 햄버거)
  const smap = $('.smap'), navBtn = $('.nav-btn'), navp = $('.navp');
  const lock = on => { document.documentElement.style.overflow = on ? 'hidden' : ''; HX.lenis && (on ? HX.lenis.stop() : HX.lenis.start()); };
  function closeNav() { if (!navp) return; navp.classList.remove('on'); navBtn.classList.remove('on'); hd.classList.remove('nav-open'); lock(false); }
  if (navBtn) navBtn.addEventListener('click', () => {
    if (HX.mobile()) {
      const on = !navp.classList.contains('on');
      if (!on) return closeNav();
      navp.classList.add('on'); navBtn.classList.add('on'); hd.classList.add('nav-open'); lock(true);
    } else { smap.classList.add('open'); lock(true); }
  });
  if (smap) $('.smap .close').addEventListener('click', () => { smap.classList.remove('open'); lock(false); });
  // 모바일 메뉴 아코디언 (68 + 칸수×28.8 + 간격(칸수−1)×12 + 24)
  $$('.navp .d1>a').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const li = a.parentElement, n = li.querySelectorAll('ul li').length;
    $$('.navp .d1').forEach(x => { x.classList.remove('on'); x.style.height = '68px'; });
    li.classList.add('on'); li.style.height = (68 + n * 28.8 + (n - 1) * 12 + 24) + 'px';
  }));

  // 이메일 무단 수집 거부 팝업
  $$('[data-modal]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); $(b.dataset.modal).classList.add('open'); lock(true); }));
  $$('.modal').forEach(m => m.addEventListener('click', e => { if (e.target === m || e.target.closest('.x,.ok')) { m.classList.remove('open'); lock(false); } }));

  // 섹션 active
  HX.actItems = $$('[data-act]');
  HX.checkAct = () => {
    const guard = HX.mobile() ? 552 : 850, y = scrollY;
    HX.actItems.forEach(el => { if (el.classList.contains('active')) return; const top = el.getBoundingClientRect().top + y; if (y >= top - guard && y < top - guard + el.clientHeight + guard) el.classList.add('active'); });
  };

  // 위로 버튼
  const fab = $('.top-fab'), ft = $('.ft');
  let shown = false;
  HX.checkFab = () => {
    if (!fab) return;
    const y = scrollY, want = y > innerHeight * .3;
    if (want && !shown) { shown = true; fab.classList.add('show'); requestAnimationFrame(() => fab.classList.add('vis')); }
    else if (!want && shown) { shown = false; fab.classList.remove('show', 'vis'); }
    const ftTop = ft.getBoundingClientRect().top + y;
    fab.classList.toggle('end', y >= ftTop - ft.clientHeight - 100);
  };
  if (fab) fab.addEventListener('click', () => HX.lenis ? HX.lenis.scrollTo(0, { duration: .3, easing: t => t }) : scrollTo({ top: 0, behavior: 'smooth' }));

  const onScroll = () => { HX.checkAct(); HX.checkFab(); HX.onScroll && HX.onScroll(scrollY); };
  let raf = 0;
  addEventListener('scroll', () => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; onScroll(); }); }, { passive: true });
  addEventListener('load', onScroll);
  onScroll();
})();
