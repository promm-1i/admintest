(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desk = matchMedia('(min-width: 1025px)');
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const hd = $('#hd');

  let lastY = scrollY;
  const onHeader = () => {
    const y = scrollY;
    if (y !== lastY) {
      if (hd.classList.contains('open') || hd.classList.contains('mopen')) hd.classList.remove('hide');
      else hd.classList.toggle('hide', y > lastY && y > 80);
      lastY = y;
    }
  };

  const gnb = $('#gnb'), panelD = $('#panelD');
  let closeT;
  const openD = () => { if (!desk.matches) return; clearTimeout(closeT); hd.classList.add('open'); };
  const shutD = () => { closeT = setTimeout(() => hd.classList.remove('open'), 60); };
  [gnb, panelD].forEach(el => { el.addEventListener('mouseenter', openD); el.addEventListener('mouseleave', shutD); });
  gnb.addEventListener('focusin', openD);
  hd.addEventListener('focusout', e => { if (!hd.contains(e.relatedTarget)) hd.classList.remove('open'); });

  const mlist = $('#mlist'), cols = $$('.panel-d ul');
  $$('.gnb > ul > li > a').forEach((a, i) => {
    const li = document.createElement('li');
    li.innerHTML = '<button type="button" class="d1" aria-expanded="false"><span></span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button><ul class="d2"></ul>';
    $('span', li).textContent = a.textContent;
    $('.d2', li).append(...$$('li', cols[i]).map(x => x.cloneNode(true)));
    $('.d1', li).addEventListener('click', e => { const o = li.classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', o); });
    mlist.append(li);
  });
  const burger = $('#burger');
  const setM = o => {
    hd.classList.toggle('mopen', o); burger.setAttribute('aria-expanded', o);
    burger.setAttribute('aria-label', o ? '메뉴 닫기' : '메뉴 열기');
    document.body.style.overflow = o ? 'hidden' : '';
  };
  burger.addEventListener('click', () => setM(!hd.classList.contains('mopen')));
  $$('#mnav a').forEach(a => a.addEventListener('click', () => setM(false)));

  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } }),
    { rootMargin: '0px 0px -12% 0px' });
  $$('.rv, .rise').forEach(el => io.observe(el));

  const u = () => desk.matches ? Math.min(innerWidth, 2560) / 1440 : 1;
  const gates = [];
  const gate = (el, steps, set, { back = true, dur = 1000 } = {}) => {
    const g = { el, steps, set, back, dur, i: 0, busy: 0 };
    gates.push(g); return g;
  };
  const go = (g, i) => { g.i = i; g.set(i); g.busy = Date.now() + (reduce ? 50 : g.dur); };
  const intent = (dir, dist, e) => {
    for (const g of gates) {
      const t = g.el.getBoundingClientRect().top;
      if (dir > 0 && g.i < g.steps && t > 1 && t <= dist) { e.preventDefault(); scrollBy(0, t); return; }
      if (Math.abs(t) > 1) continue;
      if (Date.now() < g.busy) { e.preventDefault(); return; }
      if (dir > 0 && g.i < g.steps) { e.preventDefault(); hd.classList.add('hide'); go(g, g.i + 1); return; }
      if (dir < 0 && g.back && g.i > 0) { e.preventDefault(); go(g, g.i - 1); return; }
      if (dir < 0) hd.classList.remove('hide');
    }
  };
  const syncGates = () => gates.forEach(g => {
    const t = g.el.getBoundingClientRect().top;
    if (t < -2 && g.i < g.steps) { g.i = g.steps; g.set(g.steps); }
    else if (g.back && t > innerHeight * .5 && g.i > 0) { g.i = 0; g.set(0); }
  });
  addEventListener('wheel', e => { if (gates.length && e.deltaY) intent(Math.sign(e.deltaY), Math.abs(e.deltaY), e); }, { passive: false });
  let ty = null;
  addEventListener('touchstart', e => { ty = e.touches[0].clientY; }, { passive: true });
  addEventListener('touchmove', e => {
    if (!gates.length || ty === null) return;
    const d = ty - e.touches[0].clientY;
    if (Math.abs(d) < 24) return;
    const before = e.defaultPrevented; intent(Math.sign(d), Math.abs(d), e);
    if (e.defaultPrevented && !before) ty = null;
  }, { passive: false });
  addEventListener('touchend', () => { ty = null; });
  addEventListener('keydown', e => {
    if (!gates.length || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    const dir = { ArrowDown: 1, PageDown: 1, ' ': 1, ArrowUp: -1, PageUp: -1 }[e.key];
    if (dir) intent(dir, innerHeight, e);
  });

  const placeCover = st => st.style.setProperty('--cy', ($('.sh', st).offsetHeight + (desk.matches ? 180 * u() : 100)) + 'px');

  const ceo = $('#ceoStage');
  if (ceo) {
    placeCover(ceo);
    gate(ceo, 1, i => ceo.classList.toggle('on', i > 0), { back: false, dur: 1000 });
  }

  const ov = $('#ovStage');
  if (ov) {
    placeCover(ov);
    const panels = $$('.cover', ov);
    gate(ov, panels.length, i => {
      ov.classList.toggle('on', i > 0);
      panels.forEach((p, k) => { p.classList.toggle('now', k === i - 1); p.classList.toggle('past', k < i - 1); });
    }, { dur: 900 });
  }

  const feat = $('#feat');
  if (feat) gate(feat, 1, i => feat.classList.toggle('on', i > 0), { dur: 550 });

  const side = $$('.side a'), items = side.map(a => $(a.getAttribute('href')));
  const onSide = () => {
    if (!side.length) return;
    let k = 0; items.forEach((it, j) => { if (it.getBoundingClientRect().top < innerHeight * .5) k = j; });
    side.forEach((a, j) => j === k ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'));
  };

  const tabs = $$('.tabs a'), eras = $$('.era'), dot = $('.track i'), rows = $$('.era li');
  const onHist = () => {
    if (!eras.length) return;
    let k = 0; eras.forEach((e, j) => { if (e.getBoundingClientRect().top < innerHeight * .4) k = j; });
    tabs.forEach((a, j) => j === k ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'));
    const mid = innerHeight * .5; let best = null, bd = 1e9;
    rows.forEach(r => { const b = r.getBoundingClientRect(), d = Math.abs(b.top + b.height / 2 - mid); if (d < bd) { bd = d; best = b; } });
    if (best) dot.style.transform = 'translateY(' + clamp(best.top + best.height / 2 - 4, 0, innerHeight - 10).toFixed(1) + 'px)';
    const tl = $('.tabs'), cur = tabs[k];
    if (tl && cur && tl.scrollWidth > tl.clientWidth) tl.scrollLeft = cur.offsetLeft - 20;
  };

  $$('.faq button').forEach(b => b.addEventListener('click', () => {
    const o = b.getAttribute('aria-expanded') !== 'true';
    b.setAttribute('aria-expanded', o); $('#' + b.getAttribute('aria-controls')).hidden = !o;
  }));

  $$('.srch').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const q = $('input', f).value.trim(), list = $$('.grid3 li', f.closest('.plist'));
    let n = 0; list.forEach(li => { const hit = !q || li.textContent.includes(q); li.hidden = !hit; n += hit; });
    const c = $('.cnt strong', f.closest('.plist')); if (c) c.textContent = q ? n : c.dataset.total;
  }));

  const top = $('#totop');
  top.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

  let ticking = false;
  const tick = () => { onHeader(); syncGates(); onSide(); onHist(); top.classList.toggle('on', scrollY > innerHeight); ticking = false; };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(tick); } }, { passive: true });
  addEventListener('resize', () => { if (desk.matches) setM(false); if (ceo) placeCover(ceo); if (ov) placeCover(ov); tick(); });
  tick();
  document.fonts.ready.then(() => { if (ceo) placeCover(ceo); if (ov) placeCover(ov); });

  const fam = $('#fam'), famBtn = $('button', fam);
  famBtn.addEventListener('click', () => { const o = fam.classList.toggle('open'); famBtn.setAttribute('aria-expanded', o); });
})();
