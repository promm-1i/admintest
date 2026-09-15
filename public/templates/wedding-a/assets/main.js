/* wedding-a 메인 — 원본 main.js 동작 (인트로 → 히어로 fade 5s · 고정 4단계 · 후기 뒤 글자 · FAQ) */
(function(){
  var W = window, D = document, B = D.body;
  var reduce = W.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // 인트로: 글자 0.35s×0.07 계단 → 아래 글 → 0.3s 사라짐 → 머리 나타나고 히어로 시작
  var intro = D.querySelector('.intro'), hero = D.querySelector('.hero'), heroSw;
  function startHero(){
    B.classList.remove('intro-on'); B.classList.add('ready'); hero.classList.add('ani-started');
    heroSw = new Swiper('.hero-slide .swiper-container', { slidesPerView: 1, effect: 'fade', loop: true, speed: 700, autoplay: reduce ? false : { delay: 5000 }, pagination: { el: '.hero .swiper-pagination', clickable: true } });
  }
  if (intro && !reduce) { B.classList.add('intro-on'); setTimeout(function(){ intro.classList.add('out'); startHero(); setTimeout(function(){ intro.remove(); }, 350); }, 1500); }
  else { if (intro) intro.remove(); startHero(); }
  // 고정 4단계: 240vh 스크롤을 1.8 단위 타임라인으로 (단계 i 는 0.5*i 에서 켜짐)
  var wrap = D.querySelector('.process-wrap'), list = [].slice.call(D.querySelectorAll('.process .list li')), cards = [].slice.call(D.querySelectorAll('.process .img-list .item')), cur = 0, procSw = null;
  function setStep(i){ if (i === cur) return; cur = i; list.forEach(function(l, k){ l.classList.toggle('on', k === i); }); cards.forEach(function(c, k){ c.classList.toggle('on', k === i); }); }
  W.__onScroll = function(y, vh){
    if (W.innerWidth <= 1024 || !wrap) return;
    var top = wrap.getBoundingClientRect().top + y, p = (y - top) / (vh * 2.4); p = Math.max(0, Math.min(1, p));
    var t = p * 1.8, i = Math.min(3, Math.floor(t / 0.5)); setStep(i);
  };
  function procMode(){
    if (W.innerWidth <= 1024) { if (!procSw) { cards.forEach(function(c){ c.classList.add('on', 'swiper-slide'); }); D.querySelector('.process .img-list').classList.add('swiper-wrapper'); D.querySelector('.process .right').classList.add('swiper-container'); procSw = new Swiper('.process .right', { slidesPerView: 1, spaceBetween: 16 }); } }
    else if (procSw) { procSw.destroy(true, true); procSw = null; cards.forEach(function(c, k){ c.classList.toggle('on', k === cur); }); }
  }
  W.addEventListener('resize', procMode); procMode();
  // 후기: 뒤 필기체가 카드의 라벨로 바뀜 (768 초과)
  var back = D.querySelector('.review .back-text'), change = back.querySelector('.change'), items = D.querySelectorAll('.review .review-list li');
  items.forEach(function(li){ var s = D.createElement('span'); var l = li.querySelectorAll('.loca'); s.textContent = l[l.length - 1].textContent; change.appendChild(s); });
  var spans = change.querySelectorAll('span');
  items.forEach(function(li, i){ li.addEventListener('mouseenter', function(){ if (W.innerWidth <= 768) return; back.classList.add('on'); spans.forEach(function(s, k){ s.classList.toggle('on', k === i); }); }); });
  D.querySelector('.review .review-list').addEventListener('mouseleave', function(){ back.classList.remove('on'); spans.forEach(function(s){ s.classList.remove('on'); }); });
  new Swiper('.review-list', { slidesPerView: 1, spaceBetween: 20, breakpoints: { 768: { slidesPerView: 'auto', spaceBetween: 32 }, 1260: { slidesPerView: 'auto', spaceBetween: 60 } } });
  // FAQ
  D.querySelectorAll('.faq .sect-cont .item').forEach(function(it){ it.addEventListener('click', function(){ var open = it.classList.toggle('open'); D.querySelectorAll('.faq .sect-cont .item').forEach(function(o){ if (o !== it) o.classList.remove('open'); }); }); });
  var more = D.querySelector('.faq .more-btn button'); if (more) more.addEventListener('click', function(){ D.querySelector('.faq .sect-cont').classList.add('more'); });
})();
