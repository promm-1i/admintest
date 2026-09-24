(function(){
  var hd=document.getElementById('header');
  var onScroll=function(){hd.classList.toggle('is-stuck',scrollY>4)};
  addEventListener('scroll',onScroll,{passive:true}); onScroll();

  var tg=document.getElementById('hd-toggle');
  tg.addEventListener('click',function(){
    var open=document.body.classList.toggle('nav-open');
    tg.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');
  });

  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}});
  },{rootMargin:'0px 0px -8% 0px',threshold:0.05});
  document.querySelectorAll('[data-rv]').forEach(function(el,i){
    el.style.transitionDelay=(i%4*0.06)+'s'; io.observe(el);
  });
})();