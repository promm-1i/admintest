(function(){
var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function count(el){var t=el.getAttribute('data-n');if(!t)return;var n=+t.replace(/,/g,''),u=el.getAttribute('data-u')||'',t0=null,fmt=t.indexOf(',')>-1;
  if(rm){return}function f(ts){if(!t0)t0=ts;var k=Math.min(1,(ts-t0)/1400),v=Math.round(n*(1-Math.pow(1-k,3)));
  el.innerHTML=(fmt?v.toLocaleString('en-US'):v)+(u?'<small>'+u+'</small>':'');if(k<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
function play(s){s.classList.add('in-view');[].forEach.call(s.querySelectorAll('.gmx__num[data-n]'),count);
  var st=[].slice.call(s.querySelectorAll('.gmx__flow li'));st.forEach(function(li){li.classList.remove('lit')});
  st.forEach(function(li,i){setTimeout(function(){li.classList.add('lit')},rm?0:900+i*550)})}
window.gmxReplay=function(root){[].forEach.call((root||document).querySelectorAll('.gmx'),function(s){s.classList.remove('in-view');void s.offsetWidth;setTimeout(function(){play(s)},60)})};
var secs=document.querySelectorAll('.gmx');
if(!('IntersectionObserver' in window)){[].forEach.call(secs,play);return}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){play(e.target);io.unobserve(e.target)}})},{threshold:.25});
[].forEach.call(secs,function(e){io.observe(e)})})();