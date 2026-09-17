document.documentElement.classList.add('js');
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const header = $('.site-header');
const vision = $('.vision-scroll');
const pages = $$('.vision-page');
const bars = $$('.vision-progress i');
let active = -1;
function updateVision(){
  const rect = vision.getBoundingClientRect();
  const span = Math.max(vision.offsetHeight - innerHeight, 1);
  const progress = Math.min(1, Math.max(0, -rect.top / span));
  const next = Math.min(4, Math.floor(progress * 5));
  if(next !== active){
    active = next;
    pages.forEach((page,i)=>page.classList.toggle('active',i===active));
    bars.forEach((bar,i)=>bar.classList.toggle('on',i===active));
    pages.forEach((page,i)=>{ const video=$('video',page); if(!video)return; i===active?video.play().catch(()=>{}):video.pause(); });
  }
  header.classList.toggle('hide', scrollY > 40);
}
addEventListener('scroll', updateVision, {passive:true});
addEventListener('resize', updateVision); updateVision();

const serviceTrack = $('.service-track');
$('.service-shell .next')?.addEventListener('click',()=>serviceTrack.scrollBy({left:396,behavior:'smooth'}));
$('.service-shell .prev')?.addEventListener('click',()=>serviceTrack.scrollBy({left:-396,behavior:'smooth'}));

const reviewTrack = $('.review-track');
$$('.review-next').forEach(btn=>btn.addEventListener('click',()=>{
  const width = reviewTrack.clientWidth;
  const atEnd = reviewTrack.scrollLeft + width >= reviewTrack.scrollWidth - 8;
  reviewTrack.scrollTo({left:atEnd?0:reviewTrack.scrollLeft+width,behavior:'smooth'});
}));

const toggle=$('.menu-toggle'), mobileMenu=$('.mobile-menu');
toggle?.addEventListener('click',()=>{
  const open=mobileMenu.classList.toggle('open');
  toggle.setAttribute('aria-expanded',String(open));
});
$$('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));

const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('on');observer.unobserve(entry.target)}
}),{threshold:.14});
$$('.rv').forEach(el=>observer.observe(el));
