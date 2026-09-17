
(function(){
var d=document,W=window,$=function(s,r){return (r||d).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||d).querySelectorAll(s))};
var header=$('.header'),dimmed=$('.header__dimmed'),two=$('.header__two-depth'),lastY=0,dark=header.classList.contains('header--dark-kv');
function onScroll(){var y=W.scrollY;if(y>60){header.classList.add('is-white')}else if(!header.classList.contains('is-open')){header.classList.remove('is-white')}
 if(y>lastY&&y>200){header.classList.add('is-hidden')}else{header.classList.remove('is-hidden')}lastY=y;var b=$('.scroll-top-button');}
W.addEventListener('scroll',onScroll,{passive:true});onScroll();
/* 메가 메뉴: 1뎁스에 올리면 2뎁스 패널 높이 열림 */
var nav=$('.header__inner');
function openMenu(){header.classList.add('is-open');two.style.height=two.scrollHeight+'px';dimmed.classList.add('is-on')}
function closeMenu(){header.classList.remove('is-open');two.style.height='0px';dimmed.classList.remove('is-on');if(W.scrollY<=60)header.classList.remove('is-white')}
$$('.header__menu').forEach(function(m){m.addEventListener('mouseenter',openMenu)});
nav.addEventListener('mouseleave',closeMenu);dimmed.addEventListener('click',closeMenu);
var lang=$('.header__language');if(lang){lang.addEventListener('click',function(e){e.stopPropagation();lang.classList.toggle('is-open')});d.addEventListener('click',function(){lang.classList.remove('is-open')})}
/* 사이드 메뉴 */
var side=$('.side-menu'),back=$('.side-menu__backdrop');
$('.header__menu-icon').addEventListener('click',function(){side.classList.add('is-open');d.body.style.overflow='hidden'});
function closeSide(){side.classList.remove('is-open');d.body.style.overflow=''}$('.side-menu__close').addEventListener('click',closeSide);back.addEventListener('click',closeSide);
$$('.side-menu__item-header').forEach(function(h){h.addEventListener('click',function(){var it=h.parentNode,on=it.classList.contains('is-open');$$('.side-menu__item').forEach(function(o){o.classList.remove('is-open')});if(!on)it.classList.add('is-open')})});
/* 패밀리사이트 · 맨 위로 */
var dd=$('.drop-down');if(dd){$('.drop-down__trigger',dd).addEventListener('click',function(){dd.classList.toggle('is-open')})}
var top=$('.scroll-top-button');if(top)top.addEventListener('click',function(){W.scrollTo({top:0,behavior:'smooth'})});
/* 서브 KV 글자 등장 */
var kv=$('.sub-kv');if(kv)setTimeout(function(){kv.classList.add('is-in')},150);
/* 등장 모션 */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -12% 0px'});
$$('[data-motion]').forEach(function(el){io.observe(el)});
/* 탭 */
$$('[data-tabs]').forEach(function(box){var items=$$('.tab-item',box),panes=$$('[data-pane]',box.parentNode);items.forEach(function(it,i){it.addEventListener('click',function(e){e.preventDefault();items.forEach(function(o){o.classList.remove('is-active')});it.classList.add('is-active');panes.forEach(function(p,j){p.style.display=(j===i)?'':'none'})})})});
/* 숫자 카운트 */
$$('[data-count]').forEach(function(el){var io2=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;io2.disconnect();var to=parseFloat(el.dataset.count),dec=(el.dataset.count.split('.')[1]||'').length,t0=performance.now(),dur=1400;(function f(t){var p=Math.min(1,(t-t0)/dur),v=to*(1-Math.pow(1-p,3));el.textContent=v.toLocaleString('en-US',{minimumFractionDigits:dec,maximumFractionDigits:dec});if(p<1)requestAnimationFrame(f)})(t0)})},{threshold:.4});io2.observe(el)});
W.L={io:io};
})();
