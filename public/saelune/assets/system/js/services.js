'use strict';
document.querySelectorAll('[data-service-password]').forEach(button=>button.addEventListener('click',()=>{
 const input=document.getElementById(button.dataset.servicePassword);const show=input.type==='password';
 input.type=show?'text':'password';button.textContent=show?'숨김':'보기';button.setAttribute('aria-label',show?'숨김, 비밀번호 숨기기':'보기, 비밀번호 표시');button.setAttribute('aria-pressed',String(show));
}));
