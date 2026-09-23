(function(){
var wrap=document.getElementById('wrap'),header=document.getElementById('header'),body=document.body;
var isPC=function(){return window.innerWidth>1024};
/* Lenis */
var lenis=null;
if(window.Lenis&&isPC()){lenis=new Lenis({duration:1});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(function(t){lenis.raf(t*1000)});gsap.ticker.lagSmoothing(0)}
window.NW={lenis:lenis,stop:function(){lenis?lenis.stop():body.style.overflow='hidden'},start:function(){lenis?lenis.start():body.style.overflow=''}};
/* 헤더 숨김/투명 */
var curT=0,sv=document.querySelector('.sec_visual');
window.addEventListener('scroll',function(){var t=window.scrollY;body.setAttribute('data-scroll',t>curT?'down':'up');
 if(t>0){if(t>curT){header.classList.add('header_hidden')}else{header.classList.remove('header_hidden');if(wrap.classList.contains('transparent'))wrap.classList.add('transparent_on')}}
 else if(t===0&&wrap.classList.contains('transparent'))wrap.classList.remove('transparent_on');curT=t},{passive:true});
/* GNB */
var gnbWrap=document.getElementById('gnbWrap'),gnb=gnbWrap.querySelector('.gnb'),gnbBg=document.getElementById('gnbBg'),dim=document.getElementById('dim');
var depth1=gnbWrap.querySelectorAll('.gnb_depth1_title'),activeLi=gnb.querySelector('li.depth1_active');
function headerReset(){NW.start();if(wrap.classList.contains('transparent')){gnb.classList.remove('focus_effect');if(curT===0)wrap.classList.remove('transparent_on')}
 gnbWrap.querySelectorAll('.gnb_sub_wrap').forEach(function(s){s.style.display='none'});header.classList.remove('dim_on','gnbBg_on');
 depth1.forEach(function(d){d.classList.remove('on');d.parentNode.classList.remove('depth1_hover');if(d.parentNode!==activeLi)d.parentNode.classList.remove('depth1_active')});gnbBg.style.height='30%';
 if(activeLi){activeLi.classList.add('depth1_active');gnb.classList.add('focus_effect')}else gnb.classList.remove('focus_effect')}
depth1.forEach(function(d){var li=d.parentNode,sub=li.querySelector('.gnb_sub_wrap'),tm;
 d.addEventListener('mouseenter',function(){if(!isPC())return;clearTimeout(tm);tm=setTimeout(function(){NW.stop();closeSearch();header.classList.add('dim_on','gnbBg_on');gnb.classList.add('focus_effect');
  depth1.forEach(function(x){x.classList.remove('on');x.parentNode.classList.remove('depth1_active','depth1_hover')});li.classList.add('depth1_hover');sub.style.display='block';gnbBg.style.height=sub.offsetHeight+'px';d.classList.add('on');
  if(wrap.classList.contains('transparent'))wrap.classList.add('transparent_on')},100)});
 d.addEventListener('mouseleave',function(){clearTimeout(tm)})});
gnbWrap.addEventListener('mouseleave',headerReset);
/* 언어 */
var langWrap=document.getElementById('langWrap');
langWrap.addEventListener('mouseenter',function(){langWrap.classList.add('on')});langWrap.addEventListener('mouseleave',function(){langWrap.classList.remove('on')});
/* 검색 */
var sBtn=document.getElementById('gnbSearchBtn'),sBox=document.getElementById('gnbSearchBox');
function closeSearch(){if(!sBtn.classList.contains('on'))return;NW.start();sBtn.classList.remove('on');sBox.classList.remove('on');sBox.style.display='none';header.classList.remove('dim_on');if(wrap.classList.contains('transparent')&&curT===0)wrap.classList.remove('transparent_on')}
sBtn.addEventListener('click',function(e){e.preventDefault();if(sBtn.classList.contains('on')){closeSearch();return}NW.stop();header.classList.add('dim_on');header.classList.remove('gnbBg_on');depth1.forEach(function(x){x.classList.remove('on')});if(wrap.classList.contains('transparent'))wrap.classList.add('transparent_on');sBtn.classList.add('on');sBox.style.display='block';setTimeout(function(){sBox.classList.add('on')},30)});
var sInput=sBox.querySelector('input');sInput.addEventListener('input',function(){sInput.parentNode.classList.toggle('on',sInput.value.length>0)});sBox.querySelector('.clear_btn').addEventListener('click',function(){sInput.value='';sInput.parentNode.classList.remove('on')});
sBox.querySelector('.search_btn').addEventListener('click',function(e){e.preventDefault()});
/* 사이트맵 */
var sitemap=document.getElementById('sitemap');
document.getElementById('hamburger').addEventListener('click',function(e){e.preventDefault();closeSearch();NW.stop();header.classList.add('dim_on');header.classList.remove('gnbBg_on');dim.classList.add('for_sitemap');sitemap.classList.add('on')});
function closeSitemap(){NW.start();header.classList.remove('dim_on','gnbBg_on');dim.classList.remove('for_sitemap');sitemap.classList.remove('on')}
document.getElementById('sitemapBtn').addEventListener('click',closeSitemap);
dim.addEventListener('click',function(){closeSitemap();closeSearch();NW.start()});
sitemap.querySelectorAll('.gnb_depth1_title').forEach(function(t){t.addEventListener('click',function(e){if(isPC())return;e.preventDefault();var li=t.parentNode,open=li.classList.contains('depth1_active');
 sitemap.querySelectorAll('.gnb>li').forEach(function(x){x.classList.remove('depth1_active');x.querySelector('.gnb_sub_wrap').style.display='none'});if(!open){li.classList.add('depth1_active');li.querySelector('.gnb_sub_wrap').style.display='block'}})});
/* 푸터 패밀리 */
var fam=document.getElementById('familySiteBtn');fam.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();fam.parentNode.classList.toggle('on')});document.addEventListener('click',function(){fam.parentNode.classList.remove('on')});
/* 퀵 */
var quick=document.getElementById('quickMenu'),footer=document.getElementById('footer'),banner=document.getElementById('secBanner');
document.getElementById('goToTop').addEventListener('click',function(e){e.preventDefault();lenis?lenis.scrollTo(0,{duration:1.2}):window.scrollTo({top:0,behavior:'smooth'})});
function quickSetup(){var h=footer.offsetHeight+(banner?banner.offsetHeight:0);document.documentElement.style.setProperty('--footer-height',h+'px');
 ScrollTrigger.create({trigger:wrap,start:'150px top-=20px',endTrigger:banner||footer,end:'top bottom',invalidateOnRefresh:true,onEnter:function(){quick.classList.add('active','fixed')},onLeave:function(){quick.classList.remove('fixed')},onLeaveBack:function(){quick.classList.remove('active')},onEnterBack:function(){quick.classList.add('fixed')}})}
window.addEventListener('load',quickSetup);
/* data-motion */
document.querySelectorAll('[data-motion]').forEach(function(el){ScrollTrigger.create({trigger:el,start:'top 80%',onEnter:function(){el.classList.add('active')}})});
/* 탭 */
document.querySelectorAll('.tab_content_layout').forEach(function(lay){var tabs=lay.querySelectorAll('.tab_menu>li'),conts=lay.querySelectorAll('.tab_content');tabs.forEach(function(t,i){t.querySelector('a').addEventListener('click',function(e){e.preventDefault();tabs.forEach(function(x){x.classList.remove('on')});conts.forEach(function(x){x.classList.remove('on')});t.classList.add('on');if(conts[i])conts[i].classList.add('on');ScrollTrigger.refresh()})})});
/* 아코디언 */
document.querySelectorAll('.board_type_accordion').forEach(function(list){list.querySelectorAll('.question_box').forEach(function(q){q.addEventListener('click',function(){var li=q.parentNode,ans=li.querySelector('.answer_box'),open=li.classList.contains('on');
 list.querySelectorAll('li').forEach(function(x){x.classList.remove('on');var a=x.querySelector('.answer_box');if(a)a.style.display='none'});if(!open){li.classList.add('on');ans.style.display='block'}ScrollTrigger.refresh()})})});
/* 서브 비주얼 */
if(sv&&isPC()){var tw=sv.querySelector('.title_wrap'),bw=sv.querySelector('.bg_wrap'),bg=bw.querySelector('.bg');
 gsap.timeline({scrollTrigger:{trigger:sv,start:'top top',end:'bottom bottom',scrub:1,invalidateOnRefresh:true}}).to(bw,{'--clip':'0% 0% 0% 0%',duration:.5,ease:'none'}).to(bg,{y:0,duration:.5,ease:'none'},0).to(tw,{top:'50%',y:'-50%',duration:.5,ease:'none'},0).to(tw.querySelectorAll('h2,p'),{color:'#fff',duration:.25,ease:'none'},0)}
/* 텍스트 티커 */
window.textTicker=function(el){var text=el.textContent.trim(),h='';for(var i=0;i<2;i++){h+='<div class="roller">';for(var j=0;j<5;j++)h+='<span>'+text+'</span><i></i>';h+='</div>'}el.innerHTML=h;var w=el.querySelector('.roller').offsetWidth,tk=gsap.to(el.querySelectorAll('.roller'),{duration:w/70,xPercent:-100,ease:'none',repeat:-1,paused:true});var sec=el.closest('.sec')||el;ScrollTrigger.create({trigger:sec,start:'top bottom',end:'bottom top',onEnter:function(){tk.play()},onEnterBack:function(){tk.play()},onLeave:function(){tk.pause()},onLeaveBack:function(){tk.pause()}})};
document.querySelectorAll('[data-ticker]').forEach(textTicker);
/* 세로 티커(제품) */
document.querySelectorAll('.sec_ticker_common').forEach(function(sec){var sliders=sec.querySelectorAll('.slider');sliders.forEach(function(s){var ul=s.querySelector('ul');ul.innerHTML+=ul.innerHTML});
 var anims=[];sliders.forEach(function(s,i){var ul=s.querySelector('ul');if(isPC()){gsap.set(s,{y:i===0?'-50%':'0%'});anims.push(gsap.to(ul,{repeat:-1,y:i===0?'50%':'-50%',duration:20,ease:'none',paused:true}))}else{gsap.set(s,{x:i===0?'-50%':'0%'});anims.push(gsap.to(ul,{repeat:-1,x:i===0?'50%':'-50%',duration:20,ease:'none',paused:true}))}});
 var play=function(){anims.forEach(function(a){a.play()})},pause=function(){anims.forEach(function(a){a.pause()})};
 sec.querySelectorAll('.slider a').forEach(function(a){a.addEventListener('mouseenter',pause);a.addEventListener('mouseleave',play)});
 ScrollTrigger.create({trigger:sec,start:'top bottom',end:'bottom top',onEnter:play,onEnterBack:play,onLeave:pause,onLeaveBack:pause})});
})();
