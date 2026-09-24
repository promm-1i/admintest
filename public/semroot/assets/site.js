(function(){
  var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hd=document.getElementById('header');

  /* 원본 minimizeHeader — 10px 넘게 움직여야 반응하고, 한 화면을 지나서 내릴 때만
     헤더를 감춘다. 감춘 만큼 --minimize-height 가 커지고 서브 고정 탭이 따라 올라간다. */
  (function(){
    var last=0, MOVE=10, hidden=false;
    function h(){
      var cur=scrollY;
      hd.classList.toggle('is-stuck',cur>4);
      if(Math.abs(last-cur)<=MOVE) return;
      if(cur>last){ if(cur>innerHeight && !hidden){ set(true); } }
      else if(hidden){ set(false); }
      last=cur;
    }
    function set(on){
      hidden=on;
      var px=hd.offsetHeight;
      hd.style.transform=on?('translateY(-'+px+'px)'):'translateY(0)';
      hd.style.opacity=on?'0':'1';
      document.body.style.setProperty('--minimize-height',on?(px+'px'):'0px');
    }
    document.body.style.setProperty('--minimize-height','0px');
    addEventListener('scroll',h,{passive:true}); h();
  })();

  var tg=document.getElementById('hd-toggle');
  tg.addEventListener('click',function(){
    var open=document.body.classList.toggle('nav-open');
    tg.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');
  });

  if(RM){document.querySelectorAll('[data-rv]').forEach(function(el){el.classList.add('on')});return}
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}});
  },{rootMargin:'0px 0px -8% 0px',threshold:0.05});
  document.querySelectorAll('[data-rv]').forEach(function(el,i){
    el.style.transitionDelay=(i%4*0.06)+'s'; io.observe(el);
  });
})();