const drawer=document.querySelector('.mobile-drawer');
document.querySelector('.menu-button')?.addEventListener('click',()=>drawer?.classList.add('open'));
document.querySelector('.drawer-close')?.addEventListener('click',()=>drawer?.classList.remove('open'));
function announce(message){
  let notice=document.querySelector('.demo-notice');
  if(!notice){notice=document.createElement('div');notice.className='demo-notice';notice.setAttribute('role','status');document.body.appendChild(notice)}
  notice.textContent=message; clearTimeout(announce.timer); announce.timer=setTimeout(()=>notice.remove(),3200);
}
document.querySelectorAll('form[data-demo]').forEach(form=>form.addEventListener('submit',event=>{
  event.preventDefault(); const note=form.querySelector('.form-note'); if(note)note.style.display='block';
}));
document.querySelectorAll('[data-map-query]').forEach(button=>button.addEventListener('click',()=>{
  window.open('https://map.naver.com/p/search/'+encodeURIComponent(button.dataset.mapQuery),'_blank','noopener');
}));
document.querySelectorAll('[data-demo-download]').forEach(button=>button.addEventListener('click',()=>announce('포트폴리오 데모에서는 실제 파일을 제공하지 않습니다.')));
document.querySelectorAll('.media-grid').forEach(grid=>{
  const cards=[...grid.querySelectorAll('.media-card')], button=grid.parentElement.querySelector('.load-more');
  let visible=6; cards.forEach((card,index)=>card.hidden=index>=visible);
  button?.addEventListener('click',()=>{visible+=3;cards.forEach((card,index)=>card.hidden=index>=visible);if(visible>=cards.length)button.hidden=true});
});
document.querySelectorAll('[data-media-search]').forEach(form=>form.addEventListener('submit',event=>{
  event.preventDefault(); const query=form.querySelector('input').value.trim().toLowerCase();
  const cards=[...form.parentElement.querySelectorAll('.media-card')]; let count=0;
  cards.forEach(card=>{const match=!query||card.textContent.toLowerCase().includes(query);card.hidden=!match;if(match)count++});
  const more=form.parentElement.querySelector('.load-more'); if(more)more.hidden=true;
  announce(query?`검색 결과 ${count}건입니다.`:'전체 목록을 표시합니다.');
}));
