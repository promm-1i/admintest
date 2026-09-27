/* 비급여 — 분류별 명칭 검색(원본 pay_search) : 입력한 글자가 들어간 줄만 남긴다 */
(function(){
  document.querySelectorAll('.npp').forEach(function(p){
    var q=p.querySelector('[data-npq]'), rows=[].slice.call(p.querySelectorAll('tbody tr')), none=p.querySelector('.npp__none');
    if(!q) return;
    q.addEventListener('input',function(){
      var v=q.value.replace(/\s+/g,''), n=0;
      rows.forEach(function(r){ var on=!v||r.textContent.replace(/\s+/g,'').indexOf(v)>-1; r.hidden=!on; if(on) n++ });
      none.hidden=n>0;
    });
  });
})();
