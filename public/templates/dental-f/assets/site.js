
(function(){
var d=document,W=window,$=function(s,r){return (r||d).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||d).querySelectorAll(s))};
/* 헤더: 메인 최상단에서만 투명(흰 글자) */
var header=$('.header'),topWhite=header&&header.dataset.topwhite==='1';
function hs(){if(!header)return;if(topWhite&&W.scrollY<60){header.classList.add('topwhite')}else{header.classList.remove('topwhite')}}
W.addEventListener('scroll',hs,{passive:true});hs();
/* GNB 드롭다운: 흰 배경판 높이 */
var bg=$('.nav__bg');
$$('.header .nav .depth-1').forEach(function(li){
 li.addEventListener('mouseenter',function(){var s=$('.nav-list--depth2',li);if(bg)bg.style.height=(s?s.offsetHeight+60:0)+'px';if(header)header.classList.remove('topwhite')});
});
var nav=$('.header .nav');if(nav)nav.addEventListener('mouseleave',function(){if(bg)bg.style.height='0px';hs()});
/* 언어 */
var lang=$('.btn-langs');if(lang){lang.addEventListener('click',function(e){e.stopPropagation();$('.langs_drop',lang).classList.toggle('active')});d.addEventListener('click',function(){var l=$('.langs_drop');if(l)l.classList.remove('active')})}
/* 모바일 전체메뉴 */
var mb=$('.nav-mobile'),mbg=$('.nav-mobile__bg');
function mopen(){mb.classList.add('on');mbg.classList.add('on');d.body.style.overflow='hidden'}
function mclose(){mb.classList.remove('on');mbg.classList.remove('on');d.body.style.overflow=''}
var sm=$('.sitemap');if(sm)sm.addEventListener('click',function(e){e.preventDefault();mopen()});
var mc=$('.nav-mobile__head .close');if(mc)mc.addEventListener('click',mclose);if(mbg)mbg.addEventListener('click',mclose);
$$('.nav-mobile .depth-1').forEach(function(li){var a=$('.link',li);if(!$('.nav-list--depth2',li))return;
 a.addEventListener('click',function(e){e.preventDefault();var on=li.classList.contains('on');$$('.nav-mobile .depth-1').forEach(function(o){o.classList.remove('on')});if(!on)li.classList.add('on')})});
/* 우측 고정 메뉴 */
var fixed=$('.fixed-menu');
function fs(){if(!fixed)return;if(W.innerWidth>1200)fixed.classList.toggle('show',W.scrollY>400)}
W.addEventListener('scroll',fs,{passive:true});fs();
$$('.btn-top,.btn-top2').forEach(function(b){b.addEventListener('click',function(){W.scrollTo({top:0,behavior:'smooth'})})});
var fbtn=$('.fixed-menu .btn'),tmenu=$('.fixed-menu .top-menu');
if(fbtn)fbtn.addEventListener('click',function(){if(W.innerWidth>1200)return;tmenu.classList.toggle('hidden');fbtn.classList.toggle('open',!tmenu.classList.contains('hidden'))});
if(tmenu&&W.innerWidth<=1200)tmenu.classList.add('hidden');
/* 빠른상담 열고닫기(모바일) */
var qi=$('.quick-inquiry');
if(qi){var ob=$('.open-btn',qi);if(ob)ob.addEventListener('click',function(){qi.classList.toggle('active');qi.style.bottom=qi.classList.contains('active')?'0px':'-'+($('.open-bx',qi).offsetHeight)+'px'});}
/* 등장 애니메이션 */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('aos-animate');io.unobserve(e.target)}})},{rootMargin:'0px 0px -10% 0px'});
$$('[data-aos]').forEach(function(el){io.observe(el)});
/* 숫자 카운트 */
$$('[data-count]').forEach(function(el){var o=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;o.disconnect();
 var to=parseFloat(el.dataset.count),dec=(el.dataset.count.split('.')[1]||'').length,t0=performance.now(),dur=1600;
 (function f(t){var p=Math.min(1,(t-t0)/dur),v=to*(1-Math.pow(1-p,3));el.textContent=v.toLocaleString('ko-KR',{minimumFractionDigits:dec,maximumFractionDigits:dec});if(p<1)requestAnimationFrame(f)})(t0)})},{threshold:.4});o.observe(el)});
/* 탭 (data-tab 그룹) */
$$('[data-tabgroup]').forEach(function(g){var btns=$$('[data-tab]',g),panes=$$('[data-pane]',g);
 btns.forEach(function(b){b.addEventListener('click',function(){btns.forEach(function(o){o.classList.remove('on')});b.classList.add('on');
  var k=b.dataset.tab;panes.forEach(function(p){p.classList.toggle('on',p.dataset.pane===k)})})})});
/* 비포/애프터 드래그 */
$$('.ba').forEach(function(box){var rng=$('.ba-range',box),af=$('.ba-after',box),hd=$('.ba-handle',box);
 function set(v){af.style.clipPath='inset(0 0 0 '+v+'%)';if(hd)hd.style.left=v+'%'}
 if(rng){rng.addEventListener('input',function(){set(rng.value)});set(rng.value)}});
/* 아코디언 (FAQ) */
$$('.acc-item .acc-q').forEach(function(q){q.addEventListener('click',function(){var it=q.parentNode,on=it.classList.contains('on');
 $$('.acc-item',it.parentNode).forEach(function(o){o.classList.remove('on')});if(!on)it.classList.add('on')})});
W.F={io:io};
})();
