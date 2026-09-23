
(() => {
  const menu = document.querySelector('.menu-btn');
  const mobile = document.querySelector('.mobile-nav');
  if(menu && mobile){menu.addEventListener('click',()=>{const open=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':''});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mobile.classList.contains('open')){mobile.classList.remove('open');menu.setAttribute('aria-expanded','false');document.body.style.overflow=''}})}
  const slides=[...document.querySelectorAll('.hero-slide')],dots=[...document.querySelectorAll('.dot')];let active=0,timer;
  const show=i=>{if(!slides.length)return;active=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle('active',n===active));dots.forEach((d,n)=>d.classList.toggle('active',n===active))};
  dots.forEach((d,i)=>d.addEventListener('click',()=>{show(i);clearInterval(timer);timer=setInterval(()=>show(active+1),5200)}));if(slides.length>1)timer=setInterval(()=>show(active+1),5200);
  const heroControls=[...document.querySelectorAll('.hero-social button')];if(heroControls[0])heroControls[0].addEventListener('click',()=>show(active-1));if(heroControls[1])heroControls[1].addEventListener('click',()=>show(active+1));
  const reveals=[...document.querySelectorAll('.reveal,.n-biz-feature article,.n-area-group,.n-biz-news a,.n-values-track article')];reveals.forEach(x=>x.classList.add('reveal'));if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});reveals.forEach(x=>io.observe(x))}else reveals.forEach(x=>x.classList.add('in'));
  const stage=document.querySelector('.milestone-home'),track=document.querySelector('.milestone-track');
  const move=()=>{if(!stage||!track)return;const rect=stage.getBoundingClientRect(),max=Math.max(0,track.scrollWidth-innerWidth+80),span=Math.max(1,stage.offsetHeight-innerHeight),p=Math.min(1,Math.max(0,-rect.top/span));track.style.transform=`translate3d(${-max*p}px,0,0)`};addEventListener('scroll',move,{passive:true});addEventListener('resize',move);move();
})();
