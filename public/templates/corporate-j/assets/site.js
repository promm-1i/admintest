/* 세온기계 corporate-j — 공통 동작 (원본 common.js 의 규칙: Lenis 1.2/1, 머리글 숨김·표시, 전체 메뉴, 꼬리글 장면, 맨 위로 300, 등장 85%) */
(function(){
  gsap.registerPlugin(ScrollTrigger);
  var isMain = document.getElementById('wrap').classList.contains('is-main');
  var fine = matchMedia('(pointer:fine)').matches;
  var lenis = null;
  if (window.Lenis && fine) {
    lenis = new Lenis({duration: isMain ? 1.2 : 1, wheelMultiplier: isMain ? 1 : 1.8});
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function(t){ lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
  window.SJ = {lenis: lenis};

  /* 머리글: 0 이면 show, 내려가면 hide, 올라오면 show */
  var hd = document.querySelector('.hd'), last = 0;
  addEventListener('scroll', function(){
    var y = scrollY;
    if (y === 0) { hd.classList.remove('hide', 'scrolled'); hd.classList.add('show'); }
    else { hd.classList.add('scrolled'); if (y > last) { hd.classList.remove('show'); hd.classList.add('hide'); } else { hd.classList.remove('hide'); hd.classList.add('show'); } }
    last = y;
  }, {passive: true});

  /* 메가 메뉴 2depth 패널 */
  document.querySelectorAll('.mega-d1 li').forEach(function(li){
    li.addEventListener('mouseenter', function(){
      if (innerWidth <= 1200) return;
      var mega = li.closest('.mega');
      mega.querySelectorAll('.mega-d1 li').forEach(function(x){ x.classList.remove('on'); });
      mega.querySelectorAll('.mega-panel').forEach(function(x){ x.classList.remove('on'); });
      li.classList.add('on');
      var p = document.getElementById(li.dataset.p); if (p) p.classList.add('on');
    });
  });

  /* 언어 */
  var lang = document.querySelector('.lang');
  if (lang) {
    lang.querySelector('.lang-btn').addEventListener('click', function(){ lang.classList.toggle('on'); });
    lang.addEventListener('mouseleave', function(){ lang.classList.remove('on'); });
  }

  /* 전체 메뉴 */
  var allm = document.querySelector('.allm');
  document.querySelector('.menu-btn').addEventListener('click', function(){ allm.classList.add('active'); document.body.style.overflow = 'hidden'; if (lenis) lenis.stop(); });
  document.querySelector('.allm-close').addEventListener('click', function(){ allm.classList.remove('active'); document.body.style.overflow = ''; if (lenis) lenis.start(); });
  allm.addEventListener('click', function(e){
    if (innerWidth > 1200) return;
    var a = e.target.closest('a'); if (!a || a.getAttribute('href')) return;
    var li = a.parentElement; if (!li.classList.contains('has')) return;
    e.preventDefault();
    var on = li.classList.contains('active');
    Array.prototype.forEach.call(li.parentElement.children, function(s){ s.classList.remove('active'); });
    if (!on) li.classList.add('active');
  });

  /* 꼬리글: inner y -100→0, 앞 섹션 모서리 0 0 40 40, 배경 y 100%→0 */
  var round = document.querySelector('.sub-contents') || document.querySelector('.sup');
  var ftTl = gsap.timeline({scrollTrigger: {trigger: '.ft', start: 'top bottom', end: 'bottom bottom', scrub: true}});
  ftTl.fromTo('.ft .inner', {y: -100}, {y: 0});
  if (round) ftTl.to(round, {borderRadius: '0 0 40px 40px'}, '<');
  gsap.timeline({scrollTrigger: {trigger: '.ft', start: 'center bottom', end: 'bottom bottom', scrub: true}})
    .fromTo('.ft-bg', {y: '100%', opacity: 0}, {y: 0, opacity: 1}, 0);

  /* 맨 위로 */
  var top = document.querySelector('.top-btn');
  ScrollTrigger.create({start: 300, end: 'max', onUpdate: function(s){ top.classList.toggle('show', s.scroll() > 300); }});
  top.addEventListener('click', function(){ if (lenis) lenis.scrollTo(0, {duration: 1.2, easing: function(t){ return 1 - Math.pow(1 - t, 3); }}); else scrollTo({top: 0, behavior: 'smooth'}); });

  /* 등장: top 85% 에서 한 번 */
  document.querySelectorAll('[data-motion]').forEach(function(el){
    gsap.to(el, {autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: {trigger: el, start: 'top 85%', once: true}});
  });

  /* 모달 */
  document.addEventListener('click', function(e){
    var o = e.target.closest('[data-modal]'); if (o) { e.preventDefault(); var m = document.querySelector(o.dataset.modal); if (m) m.classList.add('active'); return; }
    if (e.target.closest('.modal-close') || (e.target.classList.contains('modal'))) { var mm = e.target.closest('.modal'); if (mm) mm.classList.remove('active'); }
  });
})();
