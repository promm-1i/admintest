// 한벡스금속 서브 공용 — 머리 제목 글자 · 하위 탭(768 이하 펼침) · 분류 알약 · 공정 탭+슬라이드 · 견적 문의
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 사진 머리 제목: 글자마다 --i (위에서 20px, 1s, .05s 간격)
  $$('.sv h1').forEach(h => {
    const t = h.textContent.trim(); h.setAttribute('aria-label', t); h.textContent = '';
    [...t].forEach((c, i) => { const s = document.createElement('span'); s.className = 'ch'; s.setAttribute('aria-hidden', 'true'); s.style.setProperty('--i', i); s.textContent = c === ' ' ? ' ' : c; h.append(s); });
  });

  // 하위 탭 (768 이하에서 현재 메뉴를 눌러 펼침)
  const snav = $('.snav');
  if (snav) $('.cur', snav).addEventListener('click', e => { const o = snav.classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', o); });

  // 분류 알약: data-f 가 all 이면 모두, 아니면 data-cat 이 같은 것만
  $$('.cats').forEach(cats => {
    const scope = $(cats.dataset.target) || document;
    $$('button', cats).forEach(b => b.addEventListener('click', () => {
      $$('button', cats).forEach(x => x.setAttribute('aria-pressed', x === b));
      $$('[data-cat]', scope).forEach(it => { it.hidden = b.dataset.f !== 'all' && it.dataset.cat !== b.dataset.f; });
      window.HV && HV.tick();
    }));
    const first = $('button[aria-pressed=true]', cats); if (first && first.dataset.f !== 'all') first.click();
  });

  // 생산공정: 탭 누르면 그 장면으로 · 슬라이드는 4초마다 .8s (앞 장은 -12% 뒤로, 다음 장은 오른쪽에서) · 올리면 멈춤
  const proc = $('.proc');
  if (proc && window.Swiper) {
    const tabs = $$('.ptabs li', proc), body = $('.pcopy .pb', proc);
    const render = i => {
      const li = tabs[i];
      body.innerHTML = `<em>${li.dataset.em}</em><h3>${li.dataset.title}</h3><p>${li.dataset.desc}</p>`;
      tabs.forEach((t, k) => { t.classList.toggle('on', k === i); $('button', t).setAttribute('aria-pressed', k === i); });
    };
    const sw = new Swiper($('.pswiper', proc), {
      speed: 800, grabCursor: true, loop: false, effect: 'creative',
      creativeEffect: { prev: { translate: ['-12%', 0, -1] }, next: { translate: ['100%', 0, 0] } },
      autoplay: reduce ? false : { delay: 4000, disableOnInteraction: false },
      navigation: { prevEl: $('.pprev', proc), nextEl: $('.pnext', proc) },
      on: { init: s => render(s.activeIndex), slideChange: s => render(s.activeIndex) },
    });
    tabs.forEach((li, i) => $('button', li).addEventListener('click', () => {
      sw.slideTo(i);
      if (innerWidth < 1024) window.HV ? HV.scrollTo($('.pstage', proc), 1.5) : $('.pstage', proc).scrollIntoView({ behavior: 'smooth' });
    }));
    proc.addEventListener('mouseenter', () => sw.autoplay?.stop());
    proc.addEventListener('mouseleave', () => !reduce && sw.autoplay?.start());
  }

  // 견적 문의: 필수 칸 확인 후 접수 문구 (실제 전송은 제작 시 연결)
  const form = $('#inquiryForm');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const bad = $$('[required]', form).find(el => el.type === 'checkbox' ? !el.checked : !el.value.trim());
    const msg = $('#formMsg');
    if (bad) { msg.textContent = (bad.dataset.name || '필수 항목') + '을(를) 확인해 주세요.'; bad.focus(); return; }
    msg.textContent = '문의가 접수되었습니다. 담당자가 영업일 기준 하루 안에 연락드리겠습니다.'; form.reset();
  });
})();
