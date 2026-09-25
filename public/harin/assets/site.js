(function(){
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('on');
      io.unobserve(e.target); } });
  },{rootMargin:'0px 0px -18% 0px'});
  document.querySelectorAll('[data-rv]').forEach(function(e){io.observe(e)});

  var hd=document.querySelector('.hd');
  if(hd){
    hd.addEventListener('mouseenter',function(){hd.classList.add('on')});
    hd.addEventListener('mouseleave',function(){hd.classList.remove('on')});
    hd.addEventListener('focusin',function(){hd.classList.add('on')});
    hd.addEventListener('focusout',function(ev){
      if(!hd.contains(ev.relatedTarget)) hd.classList.remove('on');
    });
    var solid=function(){hd.classList.toggle('solid', window.scrollY>40)};
    window.addEventListener('scroll',solid,{passive:true}); solid();
  }
  var bg=document.querySelector('.hd__burger');
  if(bg) bg.addEventListener('click',function(){
    var open=document.body.classList.toggle('nav-open');
    bg.setAttribute('aria-expanded',open?'true':'false');
  });
  document.querySelectorAll('[data-tabs]').forEach(function(box){
    var btns=box.querySelectorAll('[data-tab]'), panes=box.querySelectorAll('[data-pane]');
    btns.forEach(function(b){
      b.addEventListener('click',function(){
        btns.forEach(function(x){x.classList.remove('on');
          x.setAttribute('aria-selected','false')});
        b.classList.add('on'); b.setAttribute('aria-selected','true');
        panes.forEach(function(p){p.hidden=(p.dataset.pane!==b.dataset.tab)});
      });
    });
  });
  document.querySelectorAll('.acc__q').forEach(function(q){
    q.addEventListener('click',function(){
      var open=q.getAttribute('aria-expanded')==='true';
      q.setAttribute('aria-expanded',open?'false':'true');
      q.parentElement.classList.toggle('on',!open);
    });
  });
})();
