$(function(){
 const form=document.querySelector('#listfm'),board=document.querySelector('.board-wrap');if(!form||!board)return;
 const isInsight=board.classList.contains('event'),list=board.querySelector('ul.event-list,ul.gallery-list')||board.querySelector('li.item')?.parentElement;
 if(!list)return;const template=list.querySelector('li.item')?.cloneNode(true);let records=[],pageNumber=1;
 const field=n=>form.querySelector('[name="'+n+'"]')?.value||'';
 const render=()=>{
  const author=field('ser_writer'),category=field('ser_cate'),year=field('year'),keyword=field('keyword').trim().toLowerCase();
  const categoryLabel=form.querySelector('.search-category .dropdown-list button[data-value="'+category+'"]')?.textContent.trim();
  const filtered=records.filter(r=>(!isInsight||!author||r.writer===author)&&(!isInsight||!category||r.category===categoryLabel)&&(!year||year==='all'||(year==='~2022'?Number(r.year)<=2022:r.year===year))&&(!keyword||(isInsight?r.title+' '+r.author:r.text).toLowerCase().includes(keyword)));
  const totalPages=Math.max(1,Math.ceil(filtered.length/10));pageNumber=Math.max(1,Math.min(totalPages,pageNumber));
  list.replaceChildren();filtered.slice((pageNumber-1)*10,pageNumber*10).forEach(r=>{
   let node;if(isInsight){node=template.cloneNode(true);node.querySelector('.tit').textContent=r.title;node.querySelector('.name').textContent=r.author;node.querySelector('.badge').textContent=r.category;node.querySelectorAll('a').forEach(a=>{a.href='#';a.removeAttribute('target')});}
   else{const t=document.createElement('template');t.innerHTML=r.html;node=t.content.firstElementChild;}
   list.append(node);
  });
  let empty=board.querySelector('[data-board-empty]');if(!empty){empty=document.createElement('p');empty.dataset.boardEmpty='1';empty.setAttribute('role','status');empty.style.cssText='padding:60px 20px;text-align:center';list.after(empty)}
  empty.textContent=filtered.length?'':'검색 결과가 없습니다.';empty.hidden=!!filtered.length;
  const count=board.querySelector('.total-count strong');if(count)count.textContent=filtered.length;
  const pager=board.querySelector('.pagination');if(pager){pager.replaceChildren();for(let n=1;n<=totalPages;n++){const li=document.createElement('li');li.className='page-item'+(n===pageNumber?' active':'');const a=document.createElement(n===pageNumber?'span':'a');a.className='page-link';a.textContent=n;if(n===pageNumber)li.setAttribute('aria-current','page');else{a.href='#';a.addEventListener('click',e=>{e.preventDefault();pageNumber=n;render();board.scrollIntoView({behavior:'smooth',block:'start'})})}li.append(a);pager.append(li)}}
  list.querySelectorAll('.obj-animated,.obj-show').forEach(e=>{e.style.opacity='1';e.style.transform='none'});
 };
 window.goto_page=n=>{pageNumber=Number(n)||1;render()};window.search_list=()=>{pageNumber=1;render()};
 form.addEventListener('submit',e=>{e.preventDefault();window.search_list()});
 $(form).on('change','input[type=hidden]',()=>{pageNumber=1;render()});
 form.querySelector('.btn-search')?.addEventListener('click',window.search_list);
 fetch('assets/interactions/'+(isInsight?'insight-records.json':'news-records.json')).then(r=>{if(!r.ok)throw Error(r.status);return r.json()}).then(data=>{records=data;render()}).catch(()=>{const count=board.querySelector('.total-count strong');if(count)count.textContent=list.children.length});
});