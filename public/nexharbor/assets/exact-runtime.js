
document.querySelectorAll('#header #gnb > ul > li > a[href=""]').forEach(a=>a.removeAttribute('href'));
const topButton=document.querySelector('#footer .btn_top button');
function activeSmoother(){return window.ScrollSmoother&&typeof window.ScrollSmoother.get==='function'?window.ScrollSmoother.get():null}
function applyExactTriggerTimings(){
  if(!window.ScrollTrigger||!window.__exactTriggerTimings)return;
  const key=innerWidth<=760?'390':innerWidth<=1024?'768':'1440';
  const rows=window.__exactTriggerTimings[key];
  if(!rows)return;
  ScrollTrigger.getAll().forEach((trigger,index)=>{
    const measured=rows[index];
    if(!measured)return;
    trigger.start=measured.start;
    trigger.end=measured.end;
    trigger.change=measured.end-measured.start;
  });
  ScrollTrigger.update();
}
addEventListener('load',()=>{
  [0,250,1000].forEach(delay=>setTimeout(applyExactTriggerTimings,delay));
  window.ScrollTrigger?.addEventListener?.('refresh',()=>requestAnimationFrame(applyExactTriggerTimings));
});
addEventListener('wheel',event=>{
  const smoother=activeSmoother();
  if(!smoother||!event.deltaY||!window.gsap)return;
  const before=smoother.scrollTop();
  setTimeout(()=>{
    const maximum=window.ScrollTrigger?ScrollTrigger.maxScroll(window):Math.max(0,document.documentElement.scrollHeight-innerHeight);
    const target=Math.max(0,Math.min(maximum,before+event.deltaY));
    const current=smoother.scrollTop();
    const transform=getComputedStyle(document.querySelector('#smoother-content')).transform;
    const visual=transform==='none'?0:new DOMMatrixReadOnly(transform).m42;
    const jumped=Math.abs(current-target)<1&&Math.abs(visual+target)<2;
    if(!jumped&&Math.abs(current-before)>10)return;
    if(jumped)smoother.scrollTop(before);
    gsap.to(smoother,{scrollTop:target,duration:1.95,ease:'power3.out',overwrite:true});
  },24);
},{capture:true,passive:true});
topButton?.addEventListener('click',event=>{event.preventDefault();const smoother=activeSmoother();if(smoother&&typeof smoother.scrollTop==='function'){smoother.scrollTop(0)}else{window.scrollTo(0,0);syncScroll()}});
const globalMenu=document.querySelector('#header #gnb');
const menuOpenButton=document.querySelector('#header .menu_open_btn button');
const menuCloseButton=document.querySelector('#header #gnb > button');
function setMenuOpen(open){globalMenu?.classList.toggle('on',open);menuOpenButton?.setAttribute('aria-expanded',String(open));if(open)menuCloseButton?.focus()}
menuOpenButton?.setAttribute('aria-expanded','false');
menuOpenButton?.addEventListener('click',()=>setMenuOpen(true));
menuCloseButton?.addEventListener('click',()=>{setMenuOpen(false);menuOpenButton?.focus()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&globalMenu?.classList.contains('on')){setMenuOpen(false);menuOpenButton?.focus()}});
document.querySelectorAll('#header #gnb > ul > li > a').forEach(anchor=>anchor.addEventListener('click',event=>{
  if(matchMedia('(max-width:1024px)').matches){event.preventDefault();anchor.parentElement?.classList.add('on');[...anchor.parentElement.parentElement.children].filter(item=>item!==anchor.parentElement).forEach(item=>item.classList.remove('on'))}
}));
document.querySelectorAll('#header .btn_w button,#footer .family button').forEach(button=>button.addEventListener('click',()=>button.nextElementSibling?.classList.toggle('on')));
document.querySelectorAll('.pri_pop01_btn').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();document.querySelector('.pri_pop01')?.style.setProperty('display','block')}));
document.querySelectorAll('.pri_pop02_btn').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();document.querySelector('.pri_pop02')?.style.setProperty('display','block')}));
document.querySelectorAll('.pri_pop01 .close,.pri_pop02 .close').forEach(button=>button.addEventListener('click',()=>button.closest('.pri_pop01,.pri_pop02')?.style.setProperty('display','none')));
document.querySelectorAll('a[href="#"]').forEach(a=>a.addEventListener('click',e=>e.preventDefault()));
function boardRows(){return [...document.querySelectorAll('.board_list .list li,.board .list li')]}
function applyBoardSearch(query,push){
  const input=document.querySelector('#searchText');
  query=(query??input?.value??'').trim().toLocaleLowerCase();
  if(input&&input.value!==query)input.value=query;
  boardRows().forEach(row=>{row.hidden=!!query&&!row.textContent.toLocaleLowerCase().includes(query)});
  if(push){const hash=query?`search=${encodeURIComponent(query)}`:'';history.pushState({search:query},'',hash?`#${hash}`:location.pathname)}
};
window.goSearch=function(){applyBoardSearch(undefined,true)};
window.goPage=function(page){
  const value=String(page||1);
  document.querySelectorAll('.paging li,.btn_wrap li').forEach(item=>item.classList.toggle('on',(item.textContent||'').trim()===value));
  history.pushState({page:value},'',`#page-${value}`);
};
function restoreBoardState(){
  const search=location.hash.match(/^#search=(.*)$/);
  if(search)applyBoardSearch(decodeURIComponent(search[1]),false);else applyBoardSearch('',false);
  const page=location.hash.match(/^#page-(\d+)$/);if(page)document.querySelectorAll('.paging li,.btn_wrap li').forEach(item=>item.classList.toggle('on',(item.textContent||'').trim()===page[1]));
}
addEventListener('popstate',restoreBoardState);
restoreBoardState();
function ensureDynamicA11y(root=document){
  root.querySelectorAll?.('a[href],button').forEach((element,index)=>{if(!((element.textContent||'').trim()||element.getAttribute('aria-label')||element.getAttribute('title')))element.setAttribute('aria-label',element.tagName==='A'?'지도 및 관련 정보 링크':'화면 기능 버튼')});
  root.querySelectorAll?.('img').forEach(image=>{if(!image.hasAttribute('alt'))image.alt='넥스하버 사업 및 기업 소개 이미지'});
}
ensureDynamicA11y();
new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{if(node.nodeType===1)ensureDynamicA11y(node)}))).observe(document.body,{childList:true,subtree:true});
if(!window.gsap||!window.ScrollTrigger){
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('on','active')}}),{rootMargin:'0px 0px -8% 0px',threshold:.08});
  document.querySelectorAll('#smoother-content .con01,#smoother-content .con02,#smoother-content .con03,#smoother-content .con04,#smoother-content .con05,#smoother-content .con06,#smoother-content .con07,#smoother-content .sub_con').forEach(element=>revealObserver.observe(element));
}
const smoothContent=document.querySelector('#smoother-content');
let ticking=false;
function syncScroll(){if(!smoothContent||activeSmoother()){ticking=false;return}smoothContent.style.transform=`translate3d(0,${-window.scrollY}px,0)`;ticking=false}
addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(syncScroll);ticking=true}},{passive:true});
syncScroll();
