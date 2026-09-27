/* 0605 — 주소 복사 (원본 #copy_btn) */
(function(){
  var b=document.querySelector('[data-copy]'); if(!b) return;
  b.addEventListener('click',function(){
    var t=b.dataset.copy;
    function done(){ alert('주소를 복사했습니다.') }
    if(navigator.clipboard&&window.isSecureContext){ navigator.clipboard.writeText(t).then(done,fallback) } else fallback();
    function fallback(){ var a=document.createElement('textarea'); a.value=t; a.setAttribute('readonly',''); a.style.position='fixed'; a.style.opacity='0'; document.body.appendChild(a); a.select();
      try{ document.execCommand('copy'); done() }catch{ prompt('아래 주소를 복사해 주세요.',t) } a.remove() }
  });
})();
