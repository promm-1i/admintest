const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.1});
const _rvs=[...document.querySelectorAll('.rv')];
_rvs.forEach(el=>{const sibs=_rvs.filter(o=>o.parentElement===el.parentElement);if(sibs.length>1){el.style.transitionDelay=(sibs.indexOf(el)*90)+'ms';el.addEventListener('transitionend',()=>{el.style.transitionDelay='0ms'},{once:true});}io.observe(el);});
