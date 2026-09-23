/* 하이온셀 서브 공통 — 모바일 탭은 켜진 칸이 보이게 가로 스크롤 */
(() => {
  document.querySelectorAll('.mtabs').forEach(t => {
    const on = t.querySelector('.on');
    if (on) t.scrollLeft = Math.max(0, on.offsetLeft - (t.clientWidth - on.offsetWidth) / 2);
  });
})();
document.querySelectorAll('.acc>button').forEach(b => b.addEventListener('click', () => {
  const it = b.parentElement, on = !it.classList.contains('on');
  it.classList.toggle('on', on); b.setAttribute('aria-expanded', on);
}));
