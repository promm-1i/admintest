
(function(){
var d=document,W=window,$=function(s,r){return (r||d).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||d).querySelectorAll(s))};
function announce(message){var n=$('.demo-notice');if(!n){n=d.createElement('div');n.className='demo-notice';n.setAttribute('role','status');d.body.appendChild(n)}n.textContent=message;clearTimeout(announce.timer);announce.timer=setTimeout(function(){n.remove()},3200)}
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
var menuButton=$('.header__menu-icon'),sideClose=$('.side-menu__close');
menuButton.addEventListener('click',function(){side.classList.add('is-open');side.setAttribute('aria-hidden','false');menuButton.setAttribute('aria-expanded','true');d.body.style.overflow='hidden';sideClose.focus()});
function closeSide(){side.classList.remove('is-open');side.setAttribute('aria-hidden','true');menuButton.setAttribute('aria-expanded','false');d.body.style.overflow='';menuButton.focus()}
sideClose.addEventListener('click',closeSide);back.addEventListener('click',closeSide);
$$('.side-menu__item-toggle').forEach(function(button){button.addEventListener('click',function(){var it=button.closest('.side-menu__item'),on=it.classList.contains('is-open');$$('.side-menu__item').forEach(function(o){o.classList.remove('is-open');var b=$('.side-menu__item-toggle',o);if(b)b.setAttribute('aria-expanded','false')});if(!on){it.classList.add('is-open');button.setAttribute('aria-expanded','true')}})});
d.addEventListener('keydown',function(e){if(e.key==='Escape'){closeMenu();if(side.classList.contains('is-open'))closeSide()}});
$$('[data-language]').forEach(function(button){button.addEventListener('click',function(e){e.stopPropagation();var value=button.dataset.language;if(value==='ko'){announce('한국어 페이지입니다.')}else{announce('영문 페이지는 준비 중입니다.')}lang&&lang.classList.remove('is-open')})});
/* 패밀리사이트 · 맨 위로 */
var dd=$('.drop-down');if(dd){$('.drop-down__trigger',dd).addEventListener('click',function(){dd.classList.toggle('is-open')})}
var top=$('.scroll-top-button');if(top)top.addEventListener('click',function(){W.scrollTo({top:0,behavior:'smooth'})});
/* 서브 KV 글자 등장 */
var kv=$('.sub-kv');if(kv)setTimeout(function(){kv.classList.add('is-in')},150);
/* 등장 모션 */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -12% 0px'});
$$('[data-motion]').forEach(function(el){io.observe(el)});
/* 탭 */
$$('[data-tabs]').forEach(function(box){var items=$$('.tab-item',box),panes=$$('[data-pane]',box.parentNode);items.forEach(function(it,i){it.addEventListener('click',function(e){e.preventDefault();items.forEach(function(o){o.classList.remove('is-active');o.setAttribute('aria-selected','false')});it.classList.add('is-active');it.setAttribute('aria-selected','true');panes.forEach(function(p,j){p.style.display=(j===i)?'':'none'})})})});
$$('.search-bar').forEach(function(form){form.addEventListener('submit',function(e){e.preventDefault();var q=$('.search-bar__input',form).value.trim().toLowerCase(),scope=form.closest('.sub-content')||d,rows=$$('.board-row,.news-card',scope),count=0;rows.forEach(function(row){var show=!q||row.textContent.toLowerCase().indexOf(q)>-1;row.hidden=!show;if(show)count++});announce(q?'검색 결과 '+count+'건입니다.':'전체 목록을 표시합니다.')})});
$$('[data-page]').forEach(function(btn){btn.addEventListener('click',function(){var wrap=btn.closest('.pagination');$$('.pagination__page-button',wrap).forEach(function(x){x.classList.remove('selected')});btn.parentNode.classList.add('selected');announce(btn.dataset.page+'페이지는 포트폴리오 데모 화면입니다.')})});
$$('[data-demo-download]').forEach(function(btn){btn.addEventListener('click',function(){announce('포트폴리오 데모에서는 실제 파일을 제공하지 않습니다.')})});
$$('[data-network-filter]').forEach(function(btn){btn.addEventListener('click',function(){var value=btn.dataset.networkFilter;$$('[data-network-filter]').forEach(function(x){x.classList.remove('button--active')});btn.classList.add('button--active');$$('.branch-card').forEach(function(card){card.hidden=value!=='전체'&&card.dataset.kind!==value})})});
$$('[data-demo-message]').forEach(function(btn){btn.addEventListener('click',function(){var row=btn.closest('.filter-row');if(row)$$('[data-demo-message]',row).forEach(function(x){x.classList.remove('button--active')});btn.classList.add('button--active');announce(btn.dataset.demoMessage)})});
/* 숫자 카운트 */
$$('[data-count]').forEach(function(el){var io2=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;io2.disconnect();var to=parseFloat(el.dataset.count),dec=(el.dataset.count.split('.')[1]||'').length,t0=performance.now(),dur=1400;(function f(t){var p=Math.min(1,(t-t0)/dur),v=to*(1-Math.pow(1-p,3));el.textContent=v.toLocaleString('en-US',{minimumFractionDigits:dec,maximumFractionDigits:dec});if(p<1)requestAnimationFrame(f)})(t0)})},{threshold:.4});io2.observe(el)});
W.L={io:io};
})();
