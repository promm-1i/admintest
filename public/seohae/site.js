(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
let opener=null;
function close(d){if(!d)return;d.close();document.body.classList.remove('r1-drawer-open');$$('[data-menu]').forEach(b=>b.setAttribute('aria-expanded','false'));opener?.focus();}
function open(d,b){opener=b;d.showModal();if(d.id==='r1-directory'){document.body.classList.add('r1-drawer-open');$$('[data-menu]').forEach(b=>b.setAttribute('aria-expanded','true'));}else if(d.id==='r1-search')$('input',d)?.focus();}
$$('[data-menu]').forEach(b=>b.addEventListener('click',()=>open($('#r1-directory'),b)));
$$('[data-search]').forEach(b=>b.addEventListener('click',()=>{const drawer=$('#r1-directory');if(drawer.open){close(drawer);open($('#r1-search'),[$('.r1-mobile-toggle'),$('.r1-directory-toggle')].find(e=>e&&e.offsetWidth));}else open($('#r1-search'),b);}));
$$('dialog').forEach(d=>{d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close(d);}});d.addEventListener('cancel',e=>{e.preventDefault();close(d)});$$('[data-close]',d).forEach(b=>b.addEventListener('click',()=>close(d)));});
$$('#r1-directory a').forEach(a=>a.addEventListener('click',()=>close($('#r1-directory'))));
const entries=JSON.parse($('#r1-search-data')?.textContent||'[]');
$('[data-search-form]')?.addEventListener('submit',e=>{e.preventDefault();const q=$('input',e.currentTarget).value.trim(),out=$('.r1-search-results');out.replaceChildren();const hits=entries.filter(x=>x.title.includes(q));if(!hits.length){out.textContent='검색 결과가 없습니다. 다른 검색어를 입력해 주세요.';return;}hits.forEach(x=>{const a=document.createElement('a');a.href=x.url;a.textContent=x.title;out.append(a);});});
$$('[role="tablist"]').forEach(list=>{
 const tabs=$$('[role="tab"]',list);const table=list.parentElement.querySelector('table');const rows=table?[...table.tBodies[0].rows]:[];
 function activate(i){tabs.forEach((t,n)=>{t.setAttribute('aria-selected',String(n===i));t.tabIndex=n===i?0:-1;const id=t.getAttribute('aria-controls'),panel=id?document.getElementById(id):null;if(panel)panel.hidden=n!==i;});
  if(!tabs[i].hasAttribute('aria-controls')){const label=tabs[i].textContent.trim();let allowed=label.includes('행위')?['검사료','처치료']:label.includes('치료 재료')?['치료 재료']:label.includes('약제')?['약제비']:label.includes('제증명')?['제증명']:null;rows.forEach(r=>r.hidden=!!allowed&&!allowed.includes((r.cells[0]?.querySelector('.r1-cell-value')||r.cells[0])?.textContent.trim()));}
 }
 tabs.forEach((t,i)=>{t.addEventListener('click',()=>activate(i));t.addEventListener('keydown',e=>{let n=i;if(e.key==='ArrowRight')n=(i+1)%tabs.length;else if(e.key==='ArrowLeft')n=(i-1+tabs.length)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();activate(n);tabs[n].focus();});});
 if(tabs.length)activate(Math.max(0,tabs.findIndex(t=>t.getAttribute('aria-selected')==='true')));
});
$$('[data-equipment-open]').forEach(b=>b.addEventListener('click',()=>{const d=$('#r1-equipment'),im=$('[data-detail-image]',d);im.src=b.dataset.image;im.alt=b.dataset.title;$('#equipment-title',d).textContent=b.dataset.title;$('[data-detail-text]',d).textContent=b.dataset.description;open(d,b);}));
$('[data-agree-all]')?.addEventListener('change',e=>$$('.r1-consent input[required]').forEach(c=>c.checked=e.currentTarget.checked));
$$('form:not([data-search-form])').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const out=$('.r1-result',f);if(out)out.textContent='온라인 접수는 준비 중입니다. 문의는 010-4894-4905로 전화 주세요.';}));
const slides=$$('.r1-slide');let slide=0;$$('[data-slide]').forEach(b=>b.addEventListener('click',()=>{slide=(slide+Number(b.dataset.slide)+slides.length)%slides.length;slides.forEach((s,i)=>s.hidden=i!==slide);$('.r1-slide-status').textContent=$('h3',slides[slide]).textContent;}));
$$('.r1-map-links a').forEach(a=>a.addEventListener('click',()=>{const id=a.hash.slice(1),panel=document.getElementById(id);if(panel?.getAttribute('role')==='tabpanel'){const tab=$(`[aria-controls="${id}"][role="tab"]`);tab?.click();}}));
})();
