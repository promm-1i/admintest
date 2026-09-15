// 한벡스금속 공용 — 부드러운 스크롤 · 머리 · 전체 메뉴 · 언어 · 등장 · 제목 글자 · 굴림 버튼 · TOP
// 레퍼런스 설정값: Lenis duration 1.1 (터치 기기 제외) · 머리 숨김 문턱 6px / 맨 위 10px · AOS offset 120 · mirror
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch = matchMedia('(hover: none)').matches;
  const HV = window.HV = { ticks: [] };

  if (window.Lenis && !touch && !reduce) {
    const lenis = HV.lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  HV.scrollTo = (y, d = 1) => HV.lenis ? HV.lenis.scrollTo(y, { duration: d }) : scrollTo({ top: typeof y === 'number' ? y : y.getBoundingClientRect().top + scrollY, behavior: reduce ? 'auto' : 'smooth' });

  // 제목 글자 나누기 (줄바꿈 유지, 글자마다 --i)
  $$('.split').forEach(el => {
    let i = 0;
    const walk = node => [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const f = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(part => {   // 단어는 한 덩어리로
          if (!part) return;
          if (/^\s+$/.test(part)) { f.append(' '); return; }
          const wd = document.createElement('span'); wd.style.whiteSpace = 'nowrap'; f.append(wd);
          [...part].forEach(c => { const s = document.createElement('span'); s.className = 'ch'; s.style.setProperty('--i', i++); s.textContent = c; wd.append(s); });
        });
        n.replaceWith(f);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
    });
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    walk(el);
    $$('.ch', el).forEach(s => s.setAttribute('aria-hidden', 'true'));
  });

  // 굴림 버튼 글자
  $$('.more').forEach(a => {
    const label = a.dataset.label || a.textContent.trim();
    const mk = cls => `<span class="t ${cls}" aria-hidden="true">` + [...label].map((c, i) => c === ' ' ? '<span class="sp"></span>' : `<span style="--i:${i}">${c}</span>`).join('') + '</span>';
    a.innerHTML = mk('a') + mk('b') + '<span class="ar" aria-hidden="true"><svg viewBox="0 0 9 15"><path d="M1.5 1.5 7.5 7.5 1.5 13.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg><svg viewBox="0 0 9 15" style="opacity:.5"><path d="M1.5 1.5 7.5 7.5 1.5 13.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></span><span class="sr">' + label + '</span>';
  });

  // 머리
  const hd = $('#hd');
  if (hd) {
    const items = $$('.gnb > ul > li', hd);
    const open = li => { li.classList.add('open'); $(':scope > a', li).classList.add('on'); };
    const close = li => { li.classList.remove('open'); $(':scope > a', li).classList.remove('on'); };
    const closeAll = ex => items.forEach(li => li !== ex && close(li));
    hd.addEventListener('mouseenter', () => hd.classList.add('active'));
    hd.addEventListener('mouseleave', () => { closeAll(); hd.classList.remove('active'); });
    items.forEach(li => {
      li.addEventListener('mouseenter', () => { hd.classList.add('active'); closeAll(li); open(li); });
      li.addEventListener('mouseleave', () => close(li));
      $(':scope > a', li).addEventListener('focus', () => { hd.classList.add('active'); closeAll(li); open(li); });
      li.addEventListener('focusout', e => { if (!li.contains(e.relatedTarget)) close(li); if (!hd.contains(e.relatedTarget)) hd.classList.remove('active'); });
    });
    let last = scrollY;
    HV.ticks.push(() => {
      const y = scrollY, d = y - last;
      hd.classList.toggle('scrolled', y > 0);
      if (y <= 10) hd.classList.remove('hide');
      else if (!hd.classList.contains('active') && !side?.classList.contains('on')) {
        if (d > 6) hd.classList.add('hide'); else if (d < -6) hd.classList.remove('hide');
      }
      last = y;
    });
  }

  // 전체 메뉴 (한 번에 하나만 펼침)
  const side = $('#side'), burger = $('#burger');
  if (side && burger) {
    burger.addEventListener('click', () => {
      const on = !side.classList.contains('on');
      burger.classList.toggle('on', on); burger.setAttribute('aria-expanded', on); burger.setAttribute('aria-label', on ? '메뉴 닫기' : '메뉴 열기');
      side.classList.remove('shown'); side.classList.toggle('on', on);
      if (on) side.addEventListener('transitionend', function f(e) { if (e.propertyName !== 'transform') return; side.removeEventListener('transitionend', f); side.classList.add('shown'); });
      document.documentElement.style.overflow = on ? 'hidden' : '';
      HV.lenis && (on ? HV.lenis.stop() : HV.lenis.start());
    });
    $$('#side nav > ul > li').forEach(li => $(':scope > button', li).addEventListener('click', () => {
      const on = !li.classList.contains('on');
      $$('#side nav > ul > li.on').forEach(o => { o.classList.remove('on'); $(':scope > button', o).setAttribute('aria-expanded', 'false'); });
      li.classList.toggle('on', on); $(':scope > button', li).setAttribute('aria-expanded', on);
    }));
  }

  // 언어 (1200 이하에서 흰 상자로 펼침)
  const lang = $('.lang');
  if (lang) $('button', lang).addEventListener('click', e => { const on = $('ul', lang).classList.toggle('on'); e.currentTarget.setAttribute('aria-expanded', on); });

  // 등장: 요소 위가 화면 아래 120px 위로 오면 켜고, 다시 그 아래로 내려가면 끈다
  const aos = $$('[data-aos]');
  aos.forEach(el => el.dataset.delay && el.style.setProperty('--d', el.dataset.delay / 1000 + 's'));
  HV.ticks.push(() => aos.forEach(el => {
    const tf = getComputedStyle(el).transform, t = el.getBoundingClientRect().top - (tf === 'none' ? 0 : new DOMMatrixReadOnly(tf).m42), line = innerHeight - 120;   // 움직이는 중인 위치가 아니라 제자리 기준
    if (t < line) el.classList.add('aos-on'); else el.classList.remove('aos-on');
  }));

  // TOP
  $$('.ft .top').forEach(b => b.addEventListener('click', () => HV.scrollTo(0, 1)));

  let ticking = false;
  const tick = () => { HV.ticks.forEach(f => f()); ticking = false; };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(tick); } }, { passive: true });
  addEventListener('resize', tick);
  HV.tick = tick;
  requestAnimationFrame(tick);
})();
