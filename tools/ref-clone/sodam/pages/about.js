/* 0601 — 원본: sec01 300% 고정(scrub) · 진행률로 장면 교체 / sec02 선 장식은 들어오면 한 번 그린다 */
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pin=document.querySelector('.spin'); 
  if(pin&&!reduce){
    var sl=[].slice.call(pin.querySelectorAll('.spin__sl')), cur=-1;
    function size(){ pin.style.height=innerWidth>1000?(innerHeight*4)+'px':'' }
    function tick(){
      if(innerWidth<=1000){ sl.forEach(function(s){s.classList.add('on')}); cur=-1; return }
      var r=pin.getBoundingClientRect(), len=pin.offsetHeight-innerHeight, p=Math.min(.999,Math.max(0,-r.top/(len||1)));
      var i=Math.floor(p*sl.length); if(i!==cur){ cur=i; sl.forEach(function(s,k){s.classList.toggle('on',k===i)}) }
    }
    size(); tick(); addEventListener('scroll',tick,{passive:true}); addEventListener('resize',function(){size();cur=-1;tick()});
  } else if(pin){ pin.querySelectorAll('.spin__sl').forEach(function(s){s.classList.add('on')}) }
  var ln=[].slice.call(document.querySelectorAll('[data-line]'));
  if(!('IntersectionObserver' in window)||reduce){ ln.forEach(function(e){e.classList.add('on')}); return }
  var io=new IntersectionObserver(function(es){ es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('on'); io.unobserve(en.target) } }) },{rootMargin:'0px 0px -20% 0px'});
  ln.forEach(function(e){io.observe(e)});
})();
