/* 소담한의원 — 공통 스크립트 (헤더·메가메뉴·전체메뉴·퀵·등장 모션) */
document.documentElement.classList.add('js');

(function(){
  var hd=document.querySelector('.hd'); if(!hd) return;
  var mega=document.querySelector('.mega'), smap=document.querySelector('.smap');
  var quick=document.querySelector('.quick');
  var overEl=document.querySelector(hd.dataset.over||'#none');   /* 이 요소를 지나기 전까지 흰 글자 헤더 */
  var quickEl=document.querySelector(hd.dataset.quick||'#none'); /* 이 요소를 지나야 퀵 메뉴가 나온다 */
  var last=0;

  function mode(){
    var y=scrollY||0, H=hd.offsetHeight;
    if(overEl && overEl.getBoundingClientRect().bottom>H) hd.dataset.mode='over';
    else hd.dataset.mode=y>10?'solid':(overEl?'solid':'top');
    if(quick) quick.classList.toggle('is-on',quickEl?quickEl.getBoundingClientRect().bottom<=H:y>300);
    /* 서브에서만 아래로 내릴 때 헤더를 숨긴다 (메인은 원본처럼 항상 고정) */
    if(hd.dataset.autohide){
      hd.dataset.hide=(y>400 && y>last && hd.dataset.open!=='1')?'1':'0';
    }
    last=y;
  }
  addEventListener('scroll',mode,{passive:true}); addEventListener('resize',mode); mode();

  /* 메가메뉴 — 메뉴 항목에 올리면 그 묶음 패널을 연다 */
  if(mega){
    var items=[].slice.call(hd.querySelectorAll('.gnb>li')), panes=[].slice.call(mega.querySelectorAll('.mega__pane'));
    var timer;
    function open(i){
      clearTimeout(timer);
      items.forEach(function(li,k){li.classList.toggle('is-on',k===i)});
      panes.forEach(function(p,k){p.classList.toggle('is-on',k===i)});
      mega.classList.add('is-open'); hd.dataset.open='1';
    }
    function close(){ timer=setTimeout(function(){
      mega.classList.remove('is-open'); hd.dataset.open='0';
      items.forEach(function(li){li.classList.remove('is-on')});
    },120); }
    items.forEach(function(li,i){
      li.addEventListener('mouseenter',function(){ if(innerWidth>1000) open(i) });
      li.querySelector('a').addEventListener('focus',function(){ if(innerWidth>1000) open(i) });
    });
    hd.addEventListener('mouseleave',function(e){ if(!mega.contains(e.relatedTarget)) close() });
    mega.addEventListener('mouseenter',function(){clearTimeout(timer)});
    mega.addEventListener('mouseleave',function(e){ if(!hd.contains(e.relatedTarget)) close() });
    mega.addEventListener('focusout',function(e){ if(!mega.contains(e.relatedTarget)&&!hd.contains(e.relatedTarget)) close() });
  }

  /* 전체메뉴 */
  var opener=null;
  function smapOpen(on){
    if(!smap) return;
    if(on){ opener=document.activeElement; smap.classList.add('is-open');
      requestAnimationFrame(function(){requestAnimationFrame(function(){smap.classList.add('is-in')})});
      document.documentElement.style.overflow='hidden';
      var x=smap.querySelector('.smap__x'); if(x) setTimeout(function(){x.focus()},50);
    }else{ smap.classList.remove('is-in');
      setTimeout(function(){smap.classList.remove('is-open')},300);
      document.documentElement.style.overflow='';
      if(opener&&opener.focus) opener.focus();
    }
    document.querySelectorAll('[data-smap]').forEach(function(b){b.setAttribute('aria-expanded',on?'true':'false')});
  }
  document.addEventListener('click',function(e){
    if(e.target.closest('[data-smap]')){ e.preventDefault(); smapOpen(true); }
    else if(e.target.closest('[data-smap-close]')) smapOpen(false);
    if(e.target.closest('[data-top]')) scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  });
  addEventListener('keydown',function(e){ if(e.key==='Escape'&&smap&&smap.classList.contains('is-open')) smapOpen(false) });
})();

/* 스크롤 등장 — 원본 AOS(fade-up·fade-left·fade-right, 800ms) 대응. 한 번 켜면 유지 */
(function(){
  var els=[].slice.call(document.querySelectorAll('.rv')); if(!els.length) return;
  if(!('IntersectionObserver' in window)){ els.forEach(function(e){e.classList.add('on')}); return; }
  var io=new IntersectionObserver(function(es){ es.forEach(function(en){
    if(en.isIntersecting){ en.target.classList.add('on'); io.unobserve(en.target); }
  }); },{rootMargin:'0px 0px -12% 0px'});
  els.forEach(function(e){io.observe(e)});
})();

/* 탭 — [data-tabs] 안의 [role=tab] ↔ [role=tabpanel] */
(function(){
  document.querySelectorAll('[data-tabs]').forEach(function(box){
    var tabs=[].slice.call(box.querySelectorAll('[role="tab"]'));
    tabs.forEach(function(t,i){
      t.addEventListener('click',function(){
        tabs.forEach(function(x){
          var on=x===t; x.setAttribute('aria-selected',on?'true':'false'); x.tabIndex=on?0:-1;
          var p=document.getElementById(x.getAttribute('aria-controls')); if(p) p.hidden=!on;
        });
      });
      t.addEventListener('keydown',function(e){
        var k=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0; if(!k) return;
        var n=tabs[(i+k+tabs.length)%tabs.length]; n.focus(); n.click();
      });
    });
  });
})();

/* 가로 슬라이더 — [data-slider] 트랙을 이전/다음 버튼으로 한 장씩 */
(function(){
  document.querySelectorAll('[data-slider]').forEach(function(box){
    var track=box.querySelector('[data-track]'); if(!track) return;
    var prev=box.querySelector('[data-prev]'), next=box.querySelector('[data-next]');
    var bar=box.querySelector('[data-bar]');
    function step(){ var c=track.children[0]; if(!c) return 300;
      return c.getBoundingClientRect().width+parseFloat(getComputedStyle(track).columnGap||getComputedStyle(track).gap||0); }
    function sync(){
      var max=track.scrollWidth-track.clientWidth-2;
      if(prev) prev.disabled=track.scrollLeft<=2;
      if(next) next.disabled=track.scrollLeft>=max;
      if(bar) bar.style.transform='scaleX('+Math.max(.08,Math.min(1,(track.scrollLeft+track.clientWidth)/track.scrollWidth))+')';
    }
    if(prev) prev.addEventListener('click',function(){track.scrollBy({left:-step(),behavior:'smooth'})});
    if(next) next.addEventListener('click',function(){track.scrollBy({left:step(),behavior:'smooth'})});
    track.addEventListener('scroll',sync,{passive:true}); addEventListener('resize',sync); sync();
  });
})();
