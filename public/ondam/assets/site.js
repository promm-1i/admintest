(function(){
  /* 등장 — 원본 ScrollMagic triggerHook 0.75 (뷰포트 75% 지점) */
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('on'); io.unobserve(e.target); } });
  },{rootMargin:'0px 0px -25% 0px'});
  document.querySelectorAll('[data-rv]').forEach(function(e){io.observe(e)});

  /* 메가메뉴 — 마우스가 머리 위에 있는 동안만 */
  var hd=document.querySelector('.hd');
  if(hd){
    hd.addEventListener('mouseenter',function(){hd.classList.add('on')});
    hd.addEventListener('mouseleave',function(){hd.classList.remove('on')});
    hd.addEventListener('focusin',function(){hd.classList.add('on')});
    hd.addEventListener('focusout',function(ev){
      if(!hd.contains(ev.relatedTarget)) hd.classList.remove('on');
    });
  }
  /* 모바일 서랍 */
  var bg=document.querySelector('.hd__burger');
  if(bg) bg.addEventListener('click',function(){
    var open=document.body.classList.toggle('nav-open');
    bg.setAttribute('aria-expanded',open?'true':'false');
  });
  /* 탭 (메뉴 소개·매장 찾기·단체 주문 공용) */
  document.querySelectorAll('[data-tabs]').forEach(function(box){
    var btns=box.querySelectorAll('[data-tab]');
    var panes=box.querySelectorAll('[data-pane]');
    btns.forEach(function(b){
      b.addEventListener('click',function(){
        btns.forEach(function(x){x.classList.remove('on');x.setAttribute('aria-selected','false')});
        b.classList.add('on'); b.setAttribute('aria-selected','true');
        panes.forEach(function(p){p.hidden=(p.dataset.pane!==b.dataset.tab)});
      });
    });
  });
  /* 아코디언 (창업 FAQ) */
  document.querySelectorAll('.acc__q').forEach(function(q){
    q.addEventListener('click',function(){
      var open=q.getAttribute('aria-expanded')==='true';
      q.setAttribute('aria-expanded',open?'false':'true');
      q.parentElement.classList.toggle('on',!open);
    });
  });
})();
