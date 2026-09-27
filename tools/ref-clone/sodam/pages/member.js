/* 회원가입 — 이메일 도메인 선택 · 약관 보기 팝업 (원본 member_join) */
(function(){
  var dom=document.getElementById('emDomain'), sel=document.getElementById('emSel');
  if(dom&&sel) sel.addEventListener('change',function(){ dom.value=sel.value; dom.readOnly=!!sel.value; if(!sel.value) dom.focus() });
  var opener=null;
  document.querySelectorAll('[data-tpop]').forEach(function(b){ b.addEventListener('click',function(){
    var p=document.getElementById(b.dataset.tpop); opener=b; p.hidden=false; p.querySelector('.tpop__x').focus() }) });
  function close(p){ p.hidden=true; if(opener) opener.focus() }
  document.querySelectorAll('.tpop').forEach(function(p){
    p.addEventListener('click',function(e){ if(e.target===p||e.target.closest('.tpop__x')) close(p) });
    addEventListener('keydown',function(e){ if(e.key==='Escape'&&!p.hidden) close(p) });
  });
})();
