/* 통증·추나 묶음 — 부위별 슬라이더: 맨 앞에 온 카드를 크게, 진행 막대 위에 현재 부위 이름 ([data-reg]) */
(function(){
  document.querySelectorAll('[data-reg]').forEach(function(box){
    var tr=box.querySelector('[data-track]'), cur=box.querySelector('.reg__cur'), lab=cur&&cur.querySelector('span');
    if(!tr) return;
    var its=[].slice.call(tr.children), last=-1;
    function sync(){
      var x=tr.scrollLeft, k=0, best=1e9;
      its.forEach(function(it,i){ var d=Math.abs(it.offsetLeft-tr.offsetLeft-x); if(d<best){best=d;k=i} });
      k=Math.min(k,its.length-1);
      if(k!==last){ its.forEach(function(it,i){it.classList.toggle('on',i===k)}); last=k;
        if(lab){ var t=its[k].querySelector('.reg__t'); lab.textContent=t?t.textContent.trim():'' } }
      if(cur){ var f=Math.max(.08,Math.min(1,(tr.scrollLeft+tr.clientWidth)/tr.scrollWidth)); cur.style.left=(f*100)+'%' }
    }
    tr.addEventListener('scroll',sync,{passive:true}); addEventListener('resize',sync); sync();
  });
})();
