/* 아름결치과의원 — 화면 동작.
   원본(인터서울치과)의 동작을 원본 수치(시간·구간·공식) 그대로 새로 짠 코드다.
   GSAP 3(ScrollTrigger·Observer)와 Swiper 6 을 쓴다. 없으면 기본 동작만 한다. */
(function () {
  'use strict';
  const q = (s, r = document) => r.querySelector(s), qa = (s, r = document) => [...r.querySelectorAll(s)];
  const body = document.body, page = body.dataset.page || '';
  const G = window.gsap, ST = window.ScrollTrigger, OB = window.Observer;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktop = () => innerWidth > 960;
  if (G && ST) G.registerPlugin(ST); if (G && OB) G.registerPlugin(OB);

  /* ── 메뉴·퀵메뉴·탭·폼·빈 링크·맨 위로 ── */
  qa('[data-act="menu"]').forEach(b => b.addEventListener('click', () => { const open = body.classList.toggle('ag-menu-open'); b.setAttribute('aria-expanded', String(open)); }));
  qa('[data-act="quick"]').forEach(b => b.addEventListener('click', () => { const p = b.closest('[data-quick]'); const open = p && p.classList.toggle('open'); b.setAttribute('aria-expanded', String(!!open)); }));
  qa('[data-tab]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); const root = b.closest('[data-tabs]') || document; qa('[data-tab]', root).forEach(x => x.classList.toggle('active', x === b)); qa('[data-panel]', root).forEach(x => x.classList.toggle('active', x.dataset.panel === b.dataset.tab)); }));
  qa('form').forEach(f => f.addEventListener('submit', e => { e.preventDefault(); if (!f.checkValidity()) { f.reportValidity(); return; } alert('템플릿 예시 화면입니다. 실제 전송 기능은 제작 시 연결됩니다.'); }));
  qa('a[href="#"]').forEach(a => a.addEventListener('click', e => { if (a.dataset.act !== 'menu') e.preventDefault(); }));
  qa('.ag-tp-bt-wr,#ag-i-tp-bt').forEach(b => b.addEventListener('click', e => { e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' }); }));

  /* 모바일 전체 메뉴: 1단을 누르면 2단이 0.7초에 펼쳐지고 나머지는 0.4초에 접힌다(원본 scroll.js) */
  qa('.ag-gn-mn-dptx > a, .ag-gn-mn-dptx > p').forEach(head => head.addEventListener('click', e => {
    if (desktop() || !G) return;
    const li = head.parentElement, sub = q('.ag-gn-mn-dptx2', li); if (!sub) return;
    e.preventDefault();
    const all = qa('.ag-gn-mn-dptx'), shut = head.offsetHeight;
    if (li.classList.contains('on')) { li.classList.remove('on'); G.to(li, { height: shut, duration: .7 }); return; }
    all.forEach(x => { x.classList.remove('on'); if (x !== li) G.to(x, { height: shut, duration: .4 }); });
    li.classList.add('on'); G.to(li, { height: shut + sub.offsetHeight + 1, duration: .7 });
  }));

  /* ── 머리글 ──
     내리면 nav-up, 올리면 nav-down: 250ms 마다 보고 5px 이하 움직임은 무시(원본 common.js) */
  const wr01 = q('#ag-i-hm-cntx-wr01');
  const navH = () => (wr01 ? wr01.offsetHeight : 0);
  let lastY = scrollY, moved = false;
  addEventListener('scroll', () => { moved = true; }, { passive: true });
  setInterval(() => {
    if (!moved) return; moved = false;
    const st = scrollY; if (Math.abs(lastY - st) <= 5) return;
    const t = qa('header, .ag-s51x-fx-mn');
    if (st > lastY && st > navH()) t.forEach(x => { x.classList.remove('ag-nv-dwnx'); x.classList.add('ag-nv-upx'); });
    else if (st + innerHeight < document.documentElement.scrollHeight) t.forEach(x => { x.classList.remove('ag-nv-upx'); x.classList.add('ag-nv-dwnx'); });
    lastY = st;
  }, 250);
  /* scrolled: 메인은 첫 본문 구간 위끝부터, 서브는 조금이라도 내리면. 맨 위로 돌아오면 퀵메뉴를 다시 연다 */
  const scrolledTargets = qa('.ag-htx-in, .ag-hm-hd, .ag-qk-wr, .ag-tp-bt-wr');
  const syncScrolled = () => {
    const on = wr01 ? scrollY > wr01.getBoundingClientRect().top + scrollY : scrollY > 0;
    const was = scrolledTargets[0] && scrolledTargets[0].classList.contains('ag-scrx');
    scrolledTargets.forEach(x => x.classList.toggle('ag-scrx', on));
    if (was && !on) qa('#ag-i-qk, #ag-i-qk-mx').forEach(x => x.classList.add('open'));
  };
  addEventListener('scroll', syncScrolled, { passive: true }); syncScrolled();

  /* ── 등장: 화면에 걸치면 active, 벗어나면 뗀다(원본은 매 프레임 검사) ── */
  const reveals = qa('.ag-rvlx');
  if (reduce || !('IntersectionObserver' in window)) reveals.forEach(x => x.classList.add('active'));
  else { const io = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('active', e.isIntersecting)), { threshold: 0 }); reveals.forEach(x => io.observe(x)); }

  /* ── 숫자 세기: CountUp 과 같은 easeOutExpo ── */
  const ease = t => (t >= 1 ? 1 : (1 - Math.pow(2, -10 * t)) * 1024 / 1023);
  function counter(el, from, to, sec) {
    let raf = 0;
    return {
      start() { cancelAnimationFrame(raf); const t0 = performance.now(); const tick = now => { const p = Math.min(1, (now - t0) / (sec * 1000)); el.textContent = String(Math.round(from + (to - from) * ease(p))); if (p < 1) raf = requestAnimationFrame(tick); }; raf = requestAnimationFrame(tick); },
      reset() { cancelAnimationFrame(raf); el.textContent = String(from); }
    };
  }
  /* 서브 쪽 숫자: 0 부터 5초, 아래로 지나가면 세고 위로 돌아가면 0(원본 Waypoint offset 95%·85%) */
  [['.ag-cntx3', 47, .95], ['.ag-cntx4', 28, .95], ['.ag-cntx5', 18, .85], ['.ag-cntx6', 5, .85], ['.ag-cntx-mx', 18, .95], ['.ag-cntx-mx2', 5, .95], ['.ag-cntx7', 486, .95], ['.ag-cntx8', 917, .95], ['.ag-cntx9', 431, .95]].forEach(([sel, to, off]) => qa(sel).forEach(el => {
    const c = counter(el, 0, to, 5); c.reset(); let fired = false;
    const check = () => { const top = el.getBoundingClientRect().top, line = innerHeight * off; if (!fired && top <= line) { fired = true; reduce ? (el.textContent = String(to)) : c.start(); } else if (fired && top > line) { fired = false; c.reset(); } };
    addEventListener('scroll', check, { passive: true }); check();
  }));
  /* 메인 슬라이더 숫자: 숫자 있는 장이 뜨면 1.3초 뒤 1 부터 2초·3초, 다른 장이면 1 로.
     loop 복제 장에도 같은 숫자가 있으니 부를 때마다 전부 다시 찾는다 */
  let heroTimer = 0, heroCounters = [];
  const heroCount = slideEl => {
    clearTimeout(heroTimer); heroCounters.forEach(c => c.reset());
    heroCounters = [...qa('.ag-cntx').map(el => counter(el, 1, 47, 2)), ...qa('.ag-cntx2').map(el => counter(el, 1, 28, 3))];
    heroCounters.forEach(c => c.reset());
    if (slideEl && q('.ag-cntx, .ag-cntx2', slideEl)) heroTimer = setTimeout(() => heroCounters.forEach(c => c.start()), 1300);
  };

  /* ── 슬라이더: 원본 옵션 그대로(전부 slidesPerView:'auto') ── */
  const swipers = {};
  if (window.Swiper) {
    const bullet = (i, cls) => '<span class="' + cls + ' active"><svg class="ag-crcx" width="14" height="14" aria-hidden="true"><circle class="ag-crcx2" cx="8" cy="8" r="5" stroke="rgb(255,255,255)" stroke-width="2" fill="none"></circle><circle class="ag-crcx3" cx="8" cy="8" r="5" stroke="rgba(255,255,255,.2)" stroke-width="2" fill="none"></circle></svg></span>';
    const base = { slidesPerView: 'auto', spaceBetween: 0, observer: true, observeParents: true, loopAdditionalSlides: 1 };
    const OPT = {
      '.ag-hm-tp-sl': { speed: 1200, loop: true, autoplay: { delay: 3500, disableOnInteraction: false }, effect: 'fade', fadeEffect: { crossFade: true }, pagination: { el: '.ag-hm-sl-pgnx', clickable: true, renderBullet: bullet }, on: { slideChange() { heroCount(this.slides[this.activeIndex]); } } },
      '.ag-hm-cntx-swpx': { speed: 1000, loop: false, autoplay: { delay: 3500, disableOnInteraction: false }, pagination: { el: '.ag-hm-cntx-pgnx', type: 'progressbar' } },
      '.ag-hm-cntx-swpx-mx': { speed: 5000, loop: true, centeredSlides: true, autoplay: { delay: 0, disableOnInteraction: false }, pagination: { el: '.ag-hm-cntx-pgnx-mx', type: 'progressbar' } },
      '.ag-qk-bt-swpx': { speed: 800, loop: true, centeredSlides: true, autoplay: { delay: 2200, disableOnInteraction: false } },
      '.ag-s11x-c05x-swpx': { speed: 1000, loop: false, autoplay: { delay: 3500, disableOnInteraction: false }, pagination: { el: '.ag-s11x-c05x-pgnx', type: 'progressbar' } },
      '.ag-s11x-c06x-swpx': { speed: 1000, loop: true, autoplay: { delay: 3500, disableOnInteraction: false }, pagination: { el: '.ag-s11x-c06x-pgnx', type: 'progressbar' } },
      '.ag-s21x-c01x-swpx': { speed: 1000, loop: true, autoplay: { delay: 3500, disableOnInteraction: false }, pagination: { el: '.ag-s21x-c01x-pgnx', clickable: true } },
      '.ag-s31x-c03x-swpx-mx': { speed: 1000, loop: true, autoplay: { delay: 3500, disableOnInteraction: false }, pagination: { el: '.ag-s31x-c03x-pgnx', clickable: true } }
    };
    Object.entries(OPT).forEach(([sel, o]) => qa(sel).forEach(el => {
      if (el.swiper) return;
      const opt = Object.assign({}, base, o);
      if (opt.pagination && typeof opt.pagination.el === 'string') opt.pagination = Object.assign({}, opt.pagination, { el: q(opt.pagination.el) });
      try { swipers[sel] = new Swiper(el, opt); } catch (_) {}
    }));
    qa('.ag-qk-bt').forEach(b => b.addEventListener('click', () => { const s = swipers['.ag-qk-bt-swpx']; if (s && s.autoplay) s.autoplay.stop(); }));
  }

  /* ── 질문·답 펼침: 0.3초 슬라이드, 한 번에 하나(원본 slideToggle 300) ── */
  const slide = (el, open) => {
    if (!el) return;
    if (reduce || !G) { el.style.display = open ? 'block' : 'none'; return; }
    G.killTweensOf(el);
    if (open) { el.style.display = 'block'; G.fromTo(el, { height: 0, overflow: 'hidden' }, { height: el.scrollHeight, duration: .3, ease: 'none', onComplete: () => { el.style.height = ''; el.style.overflow = ''; } }); }
    else G.to(el, { height: 0, overflow: 'hidden', duration: .3, ease: 'none', onComplete: () => { el.style.display = 'none'; el.style.height = ''; el.style.overflow = ''; } });
  };
  [['.ag-hm-cntx-quex', false], ['.ag-s21x-c10x-quex', true], ['.ag-s41x-c06x-quex', true], ['.ag-s51x-c09x-quex', true]].forEach(([sel, firstOpen]) => {
    const qs = qa(sel); if (!qs.length) return;
    qs.forEach((x, i) => { const a = x.nextElementSibling; if (!a) return; const open = firstOpen && i === 0; a.style.display = open ? 'block' : 'none'; a.classList.toggle('on', open); x.classList.toggle('on', open); });
    qs.forEach(x => x.addEventListener('click', e => {
      e.preventDefault();
      const willOpen = !x.classList.contains('on');
      qs.forEach(o => { if (o !== x && o.classList.contains('on')) { o.classList.remove('on'); o.nextElementSibling && o.nextElementSibling.classList.remove('on'); slide(o.nextElementSibling, false); } });
      x.classList.toggle('on', willOpen); x.nextElementSibling && x.nextElementSibling.classList.toggle('on', willOpen); slide(x.nextElementSibling, willOpen);
    }));
  });
  /* 메인 전후사례: 배경·제목을 누르면 열린 답을 닫는다 */
  qa('.ag-hm-cntx-bk, .ag-hm-cntx-bk2, .ag-hm-cntx-sec-bk, .ag-hm-cntx-tt5').forEach(b => b.addEventListener('click', e => { e.preventDefault(); qa('.ag-hm-cntx-quex.on').forEach(o => { o.classList.remove('on'); o.nextElementSibling && o.nextElementSibling.classList.remove('on'); slide(o.nextElementSibling, false); }); }));

  /* ── 배경 겹: 구간이 지나가는 만큼 투명도를 올린다 ──
     p = (스크롤 + 창 높이 - 겹 위끝) / 겹 높이. 메인 전후사례는 p 1~2 에서 p-1, 서브는 1.2~2 에서 p-1.2, 넘으면 1 */
  const fade = (hold, alsoSel, lo) => {
    if (!hold) return;
    const others = alsoSel ? qa(alsoSel) : [];
    const run = () => {
      const r = hold.getBoundingClientRect(), p = (innerHeight - r.top) / (hold.offsetHeight || 1);
      const i = p < lo ? 0 : p > 2 ? 1 : p - lo;
      hold.style.opacity = i; others.forEach(o => { o.style.opacity = i; });
    };
    addEventListener('scroll', run, { passive: true }); addEventListener('resize', run); run();
  };
  fade(q('.ag-hm-cntx-bk'), '.ag-hm-cntx-bk2', 1);
  fade(q('.ag-s21x-c09x-bk'), '.ag-s21x-c09x-bk2', 1.2);
  fade(q('.ag-s31x-c05x-bk'), '.ag-s31x-c05x-bk2', 1.2);
  fade(q('.ag-s51x-c04x-bk'), '.ag-s51x-c04x-bk2', 1.2);

  /* ── 메인 진료 카드: 짝 카드에 마우스를 올리면 옆 카드도 on ── */
  [['02', '01'], ['04', '03'], ['05', '06'], ['07', '08']].forEach(([a, b]) => qa('.ag-hm-cntx-ls' + a).forEach(el => {
    el.addEventListener('mouseenter', () => qa('.ag-hm-cntx-ls' + b).forEach(x => x.classList.add('on')));
    el.addEventListener('mouseleave', () => qa('.ag-hm-cntx-ls' + b).forEach(x => x.classList.remove('on')));
  }));

  if (!G || !ST) { const s = swipers['.ag-hm-tp-sl']; if (s) heroCount(s.slides[s.activeIndex]); return; }

  /* ── 구간 클래스(ScrollTrigger toggleClass) ── */
  const tc = (trigger, start, end, cls, targets) => { if (q(trigger)) ST.create({ trigger, start, end, toggleClass: { className: cls, targets } }); };
  if (page === 'index.html') {
    tc('.ag-hm-cntx-wr06', 'top top', 'bottom top', 'ag-clrx-chnx3', '.ag-htx-in, .ag-hm-hd');
    tc('#ag-i-hm-cntx-wr01', '-10px top', 'bottom 20%', 'ag-clrx-chnx', '.ag-hm-hd');
    tc('#ag-i-hm-cntx-wr01', 'top top', 'bottom 20%', 'ag-clrx-chnx', '.ag-htx-in');
  }
  tc('.ag-s21x-bx-it-wr', 'top 65%', '30% 50%', 'on', '.ag-s21x-bx-it-wr');
  tc('.ag-s51x-fx-mn', '-80px top', 999999, 'ag-scr', '.ag-s51x-fx-mn');
  [['.ag-s51x-c01x-wr', 'l01x'], ['.ag-s51x-bx-it-wr', 'l02x'], ['.ag-s51x-c05x-wr', 'l03x'], ['.ag-s51x-c06x-wr', 'l04x']].forEach(([t, li]) => tc(t, '-80px top', 'bottom 6%', 'on', '.ag-s51x-fx-mn-' + li));
  tc('.ag-s51x-c07x-wr', '-80px top', 999999, 'on', '.ag-s51x-fx-mn-l05x');

  /* ── 영상 구간: 화면 절반에 닿으면 on + 1.5초 뒤 재생, 벗어나면 멈춤 ── */
  const videoZone = (zoneSel, videoSel) => {
    const zone = q(zoneSel); if (!zone) return;
    let timer = 0;
    ST.create({ trigger: zone, start: 'top 50%', end: 'bottom 30%', toggleClass: { className: 'on', targets: zoneSel },
      onToggle: self => { const vs = qa(videoSel).filter(v => v.offsetParent); clearTimeout(timer); if (self.isActive) timer = setTimeout(() => vs.forEach(v => { const p = v.play(); p && p.catch(() => {}); }), 1500); else vs.forEach(v => v.pause()); } });
  };
  videoZone('.ag-hm-cntx-wr04', '#ag-i-hm-cntx-mv-pcx, #ag-i-hm-cntx-mv-mx');
  videoZone('.ag-s21x-c07x-cntx-bx', '#ag-i-s21x-c07x-mv');

  /* 원본의 유튜브·비메오 임베드 자리: 포스터 + 가운데 재생 단추, 누르면 소리 켜고 재생 */
  qa('.ag-vplay').forEach(b => b.addEventListener('click', () => {
    const v = b.previousElementSibling; v.controls = true; v.muted = false;
    const p = v.play(); p && p.catch(() => {}); b.classList.add('is-on');
  }));

  ST.matchMedia({
    '(min-width: 961px)': () => {
      /* 메인 오시는 길: 원본 코드에는 지도를 고정해 50% 로 줄이는 장치가 있지만, 시작점(8233)이
         스크롤 끝(8443) 근처라 라이브에서는 움직이지 않는다(지도 전체 폭 + Location 제목). 화면에 보이는 대로 둔다. */
      /* 슬라이더 위 동그란 커서 */
      const cur = q('#ag-i-crcx-crsx');
      if (cur && !reduce) {
        const move = e => { cur.style.top = e.clientY + 'px'; cur.style.left = e.clientX + 'px'; };
        document.addEventListener('mousemove', move);
        const tl = G.timeline({ paused: true }).fromTo(cur, { autoAlpha: 0, scale: .5 }, { autoAlpha: 1, scale: 1, ease: 'power4.out' });
        const on = () => { cur.classList.add('ag-isx-xpnx-sl'); tl.play(); }, off = () => { cur.classList.remove('ag-isx-xpnx-sl'); tl.reverse(.5); };
        qa('.ag-msx-hvrx').forEach(s => { s.addEventListener('mouseenter', on); s.addEventListener('mouseleave', off); });
        return () => document.removeEventListener('mousemove', move);
      }
    }
  });

  /* ── 메인 첫 화면(1025px 이상): 휠 한 번에 사진 판 하나, 셋째 판에서 1.5초 뒤 일반 스크롤로 ── */
  const hero = swipers['.ag-hm-tp-sl'];
  const panels = qa('.ag-hm-ntrx-fx-wr .ag-hm-ntrx-sl-bx');
  if (page !== 'index.html' || innerWidth <= 1024 || !OB || !panels.length || reduce) {
    if (hero) heroCount(hero.slides[hero.activeIndex]);
    return;
  }
  if (hero && hero.autoplay) hero.autoplay.stop();
  const header = q('#ag-i-hd') || q('header');
  const colors = ['#f2f0ea', '#ffffff', '#252533'];
  const paint = c => {
    qa('.ag-hm-ntrx-bgtx > p, .ag-hm-ntrx-tx > p').forEach(x => { x.style.color = c; });
    qa('.ag-msx-scr.ag-ntrx-scr > .ag-tx01').forEach(x => { x.style.color = c === '#ffffff' ? '#ffffff' : '#5f5f5f'; });
  };
  G.set('.ag-yx-100', { yPercent: 100 });
  G.set(panels, { zIndex: i => i });
  let cur = -1, busy = false;
  const go = (index, down) => {
    busy = true;
    if ((index === panels.length && down) || (index === -1 && !down)) { G.to({}, { duration: 0, onComplete: () => { busy = false; if (down) intent.disable(); } }); return; }
    G.to(down ? panels[index] : panels[cur], { yPercent: down ? 0 : 100, duration: .75, onComplete: () => { busy = false; } });
    cur = index;
    [1, 2, 3].forEach(n => qa('.ag-hm-ntrx-tx0' + n).forEach(x => x.classList.toggle('on', n === index + 1)));
    const dark = index === 2;
    if (header) header.classList.toggle('ag-clrx-chnx', dark);
    qa('.ag-ntrx-scr-rrwx').forEach(x => x.classList.toggle('ag-clrx-wx', dark));
    paint(dark ? '#ffffff' : '#000000');
    if (index === 0) qa('.ag-hm-ntrx-bgtx > p > span').forEach(x => x.classList.add('active'));
    const bg = n => qa('.ag-hm-ntrx-sl-bx0' + n + ' > .ag-hm-ntrx-sl-bk');
    bg(index + 1).forEach(x => { x.style.opacity = '1'; });
    setTimeout(() => [1, 2, 3].filter(n => n !== index + 1).forEach(n => bg(n).forEach(x => { x.style.opacity = '0'; })), 600);
    G.to('.ag-hm-ntrx-swpx-wr', { backgroundColor: colors[index], duration: .5, ease: 'power1.inOut' });
    setTimeout(() => qa('.ag-hm-ntrx-swpx-bx-gd').forEach(x => x.classList.add('on')), 1000);
    if (dark) setTimeout(() => { if (hero && hero.autoplay) hero.autoplay.start(); heroCount(hero && hero.slides[hero.activeIndex]); go(cur + 1, true); intent.disable(); }, 1500);
  };
  const intent = OB.create({ type: 'wheel,touch', wheelSpeed: -1, tolerance: 10, preventDefault: true,
    onUp: () => !busy && go(cur + 1, true), onDown: () => !busy && go(cur - 1, false),
    onPress: self => { ST.isTouch && self.event.preventDefault(); } });
  intent.disable();
  G.set('.ag-hm-ntrx-fx-wr', { height: '100vh' });
  G.fromTo('.ag-hm-ntrx-fx-wr', { yPercent: 0 }, { yPercent: 0, duration: 1.5, immediateRender: false,
    scrollTrigger: { trigger: '.ag-hm-ntrx-fx-wr', start: 'top top', end: () => '+=' + q('.ag-hm-ntrx-fx-wr').offsetHeight, pin: true, pinSpacing: false, scrub: 3 } });
  if (scrollY <= 930) scrollTo(0, 0); else { if (hero && hero.autoplay) hero.autoplay.start(); }
  ST.create({ trigger: '#ag-i-hm-ntrx-fx', pin: true, start: 'top top', end: '+=1',
    onEnter: () => { intent.enable(); go(cur + 1, true); },
    onEnterBack: () => { intent.enable(); go(cur - 1, false); } });
})();
