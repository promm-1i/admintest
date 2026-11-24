(() => {
  const toggle = document.querySelector('#nav-toggle');
  const nav = document.querySelector('#site-nav');
  const closeMenu = (focus = false) => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '메뉴';
    nav.dataset.open = 'false';
    if (focus) toggle.focus();
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '닫기' : '메뉴';
    nav.dataset.open = String(open);
  });
  nav.addEventListener('click', e => {
    if (e.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.sb-header')) closeMenu();
  });
  const desktop = matchMedia('(min-width: 761px)');
  desktop.addEventListener('change', () => closeMenu());

  const form = document.querySelector('#booking-form');
  const dialog = document.querySelector('#booking-dialog');
  const date = document.querySelector('#f-date');
  const today = new Date();
  date.min = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
  let requestText = '';
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    requestText = `소반 예약 요청\n이름: ${data.get('name')}\n연락처: ${data.get('tel')}\n날짜: ${data.get('date')}\n시간: ${data.get('time')}\n인원: ${data.get('people')}`;
    document.querySelector('#booking-summary').textContent = requestText;
    document.querySelector('#booking-email').href = `mailto:6gsmake@gmail.com?subject=${encodeURIComponent('소반 예약 요청')}&body=${encodeURIComponent(requestText)}`;
    document.querySelector('#copy-status').textContent = '';
    dialog.showModal();
  });
  document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
  document.querySelector('#booking-copy').addEventListener('click', async () => {
    const status = document.querySelector('#copy-status');
    try {
      await navigator.clipboard.writeText(requestText);
      status.textContent = '예약 내용을 복사했습니다.';
    } catch {
      status.textContent = '복사할 수 없습니다. 위 내용을 선택해 복사해 주세요.';
    }
  });
})();
