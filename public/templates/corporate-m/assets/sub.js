const drawer=document.querySelector('.mobile-drawer');
document.querySelector('.menu-button')?.addEventListener('click',()=>drawer?.classList.add('open'));
document.querySelector('.drawer-close')?.addEventListener('click',()=>drawer?.classList.remove('open'));
document.querySelectorAll('form[data-demo]').forEach(form=>form.addEventListener('submit',event=>{
  event.preventDefault(); const note=form.querySelector('.form-note'); if(note)note.style.display='block';
}));
