
const body=document.body,menu=document.querySelector('.mobile-menu'),openBtn=document.querySelector('.menu-button'),closeBtn=document.querySelector('.menu-close');
function setMenu(open){menu.classList.toggle('open',open);menu.setAttribute('aria-hidden',String(!open));openBtn.setAttribute('aria-expanded',String(open));body.classList.toggle('lock',open)}
openBtn?.addEventListener('click',()=>setMenu(true));closeBtn?.addEventListener('click',()=>setMenu(false));
document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
const topBtn=document.querySelector('.to-top');addEventListener('scroll',()=>topBtn?.classList.toggle('show',scrollY>700),{passive:true});topBtn?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.querySelectorAll('[data-toast]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();let old=document.querySelector('.toast');if(old)old.remove();let t=document.createElement('div');t.className='toast';t.textContent=el.dataset.toast;document.body.appendChild(t);requestAnimationFrame(()=>t.classList.add('show'));setTimeout(()=>t.remove(),2200)}));
document.querySelectorAll('.media-filter button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.media-filter button').forEach(b=>b.classList.toggle('on',b===btn));document.querySelectorAll('.media-grid>[data-kind]').forEach(card=>card.hidden=btn.dataset.filter!=='all'&&card.dataset.kind!==btn.dataset.filter)}));
