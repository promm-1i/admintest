(function(){
document.documentElement.className='';
var gnb=document.querySelector('.pz-gnb');
var btn=document.querySelector('.pz-navbtn');
if(btn)btn.addEventListener('click',function(){gnb.classList.toggle('on')});

/* 나타나기 */
var io=new IntersectionObserver(function(es){es.forEach(function(e){
  if(e.isIntersecting){e.target.classList.add('up');io.unobserve(e.target)}})},{rootMargin:'0px 0px -12% 0px'});
document.querySelectorAll('[data-up]').forEach(function(el){io.observe(el)});

/* 히어로 줄 올리기 */
setTimeout(function(){document.querySelectorAll('.pz-hero-txt .ln').forEach(function(el,i){
  setTimeout(function(){el.classList.add('up')},i*140)})},300);

/* 대괄호 제목 */
var tio=new IntersectionObserver(function(es){es.forEach(function(e){
  if(e.isIntersecting){e.target.classList.add('on');tio.unobserve(e.target)}})},{threshold:0,rootMargin:'0px 0px -47% 0px'});
document.querySelectorAll('.pz-tt').forEach(function(el){tio.observe(el)});

/* 위로 */
var top=document.querySelector('.pz-top');
if(top){addEventListener('scroll',function(){top.classList.toggle('on',scrollY>300)},{passive:true});
top.addEventListener('click',function(){scrollTo({top:0,behavior:'smooth'})});}

/* 메뉴 이동 */
document.querySelectorAll('.pz-nav a').forEach(function(a){a.addEventListener('click',function(e){
  var t=document.querySelector(a.getAttribute('href')); if(!t)return; e.preventDefault();
  gnb.classList.remove('on');
  scrollTo({top:t.getBoundingClientRect().top+scrollY-(a.getAttribute('href')=='#about'?0:gnb.offsetHeight),behavior:'smooth'})})});

if(!window.gsap||matchMedia('(max-width:768px)').matches){
  document.querySelectorAll('.pz-ln').forEach(function(l){l.style.opacity=1});
  document.querySelectorAll('.pz-val-it').forEach(function(it){it.classList.add('on');
    var p=it.querySelector('.num>p'); if(p)p.textContent=p.dataset.n});
  return;
}
gsap.registerPlugin(ScrollTrigger);

/* 인트로 문단 */
var lines=document.querySelectorAll('.pz-ln:not(.gap)'), wrap=document.querySelector('.pz-intro');
lines.forEach(function(l,i){gsap.to(l,{opacity:1,scrollTrigger:{trigger:wrap,
  start:function(){return 'top+='+(i/lines.length*100)+'% top'},
  end:function(){return 'top+='+((i+1)/lines.length*100)+'% top'},scrub:true}})});

/* VALUE POINTS */
var vs=document.querySelector('.pz-val'), vb=document.querySelector('.pz-val-body'), vi=document.querySelectorAll('.pz-val-it');
if(!vs||!vb)return;
var vh=vb.scrollHeight; vs.style.height=(vh+innerHeight)+'px';
var done=[];
function count(el,to){var s=null;function step(t){if(!s)s=t;var p=Math.min((t-s)/1000,1);
  el.textContent=Math.floor(p*to);if(p<1)requestAnimationFrame(step);else el.textContent=to}requestAnimationFrame(step)}
vi.forEach(function(it){var p=it.querySelector('.num>p');if(p)p.textContent='0';done.push(false)});
gsap.to('.pz-val-roll',{y:function(){return -(vh-innerHeight)},ease:'none',scrollTrigger:{trigger:vs,start:'top top',end:'bottom bottom',scrub:1,
  onUpdate:function(self){var pr=self.progress,n=vi.length;
    vi.forEach(function(it,i){var mid=((i/n)+((i+1)/n))/2;
      if(pr>=mid-0.15&&pr<=mid+0.15){ if(!it.classList.contains('on')){it.classList.add('on');
        if(!done[i]){var p=it.querySelector('.num>p'); if(p)count(p,+p.dataset.n); done[i]=true}}}
      else it.classList.remove('on')})}}});

/* PROCESS 가로 이동 */
var rot=[0,-3,3,-3,3,0], ty=[0,-10,10,-10,10,0];
var lis=document.querySelectorAll('.pz-proc-sp>ul>li'), ul=document.querySelector('.pz-proc-sp>ul');
if(!ul)return;
ul.style.paddingLeft='60%';
lis.forEach(function(li,i){gsap.set(li,{rotation:rot[i],yPercent:ty[i],transformOrigin:'50% 50%'})});
var tl=gsap.timeline({scrollTrigger:{trigger:'#process',start:'top top',end:function(){return '+='+innerHeight*4},
  pin:true,anticipatePin:1,scrub:1.5,onEnter:function(){document.querySelector('#process .pz-tt').classList.add('on')}}});
tl.to(ul,{x:function(){return -(ul.scrollWidth-innerWidth*0.7)},ease:'none'},0);
tl.eventCallback('onUpdate',function(){var th=innerWidth*0.1;
  lis.forEach(function(li,i){ if(!rot[i]&&!ty[i])return;
    var left=li.getBoundingClientRect().left;
    if(li._x===undefined)li._x=left;
    if(li._x<=th){gsap.set(li,{rotation:0,yPercent:0});return}
    var p=Math.min(Math.max((li._x-left)/(li._x-th),0),1);
    gsap.set(li,{rotation:rot[i]*(1-p),yPercent:ty[i]*(1-p)})})});
ScrollTrigger.refresh();
})();