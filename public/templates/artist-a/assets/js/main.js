/* NOVERIQ — 공통 동작: 모바일 메뉴 · 스크롤 등장 · 작품 라이트박스 */
(function(){
  var hd=document.querySelector('.hd'), mb=document.querySelector('.hd .mb');
  if(mb){ mb.addEventListener('click',function(){ var on=hd.classList.toggle('open'); mb.setAttribute('aria-expanded',on?'true':'false'); document.body.classList.toggle('lock',on); }); }

  /* 스크롤 등장 — 같은 행 안에서 .1s 씩 지연(Noir appear 0/.1/.2…) */
  var rvs=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window && rvs.length){
    var io=new IntersectionObserver(function(en){ en.forEach(function(x){ if(x.isIntersecting){ var el=x.target, sib=el.parentElement?[].slice.call(el.parentElement.children).filter(function(c){return c.classList.contains('rv')}):[el]; var i=Math.max(0,sib.indexOf(el)); el.style.transitionDelay=(i*0.1)+'s'; el.classList.add('in'); io.unobserve(el); } }); },{rootMargin:'0px 0px -80px 0px',threshold:0.05});
    rvs.forEach(function(r){io.observe(r)});
  }else{ rvs.forEach(function(r){r.classList.add('in')}); }

  /* 라이트박스: .art[data-full] 클릭 → 큰 이미지 + 제목/연도/크기/재료 */
  var arts=[].slice.call(document.querySelectorAll('.art[data-full]'));
  if(!arts.length) return;
  var lb=document.createElement('div'); lb.className='lb'; lb.setAttribute('role','dialog'); lb.setAttribute('aria-modal','true'); lb.setAttribute('aria-label','작품 보기');
  lb.innerHTML='<div class="ct"></div><button class="x" aria-label="닫기"><svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19"/></svg></button>'+
    '<button class="pv" aria-label="이전 작품"><svg viewBox="0 0 24 24"><path d="M15 4l-8 8 8 8"/></svg></button>'+
    '<button class="nx" aria-label="다음 작품"><svg viewBox="0 0 24 24"><path d="M9 4l8 8-8 8"/></svg></button>'+
    '<img alt=""><div class="cap"><div class="t"></div><div class="m"></div></div>';
  document.body.appendChild(lb);
  var img=lb.querySelector('img'), ct=lb.querySelector('.ct'), tt=lb.querySelector('.cap .t'), mm=lb.querySelector('.cap .m'), cur=-1, last=null;
  function show(i){
    cur=(i+arts.length)%arts.length; var a=arts[cur];
    img.style.opacity=0; img.src=a.getAttribute('data-full'); img.alt=a.getAttribute('data-title')||'';
    img.onload=function(){ img.style.transition='opacity .5s'; img.style.opacity=1; };
    tt.textContent=a.getAttribute('data-title')||'';
    var m=[a.getAttribute('data-year'),a.getAttribute('data-medium'),a.getAttribute('data-size')].filter(Boolean).join(' · ');
    mm.textContent=m; mm.style.display=m?'':'none';
    ct.textContent=String(cur+1).padStart(2,'0')+' / '+String(arts.length).padStart(2,'0');
  }
  function open(i){ last=document.activeElement; show(i); lb.classList.add('on'); document.body.classList.add('lock'); lb.querySelector('.x').focus(); }
  function close(){ lb.classList.remove('on'); document.body.classList.remove('lock'); if(last&&last.focus) last.focus(); }
  arts.forEach(function(a,i){ a.setAttribute('tabindex','0'); a.setAttribute('role','button'); a.addEventListener('click',function(){open(i)}); a.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); open(i); } }); });
  lb.querySelector('.x').addEventListener('click',close);
  lb.querySelector('.pv').addEventListener('click',function(){show(cur-1)});
  lb.querySelector('.nx').addEventListener('click',function(){show(cur+1)});
  lb.addEventListener('click',function(e){ if(e.target===lb) close(); });
  document.addEventListener('keydown',function(e){ if(!lb.classList.contains('on')) return; if(e.key==='Escape') close(); if(e.key==='ArrowLeft') show(cur-1); if(e.key==='ArrowRight') show(cur+1); });
  var tx=0; lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true}); lb.addEventListener('touchend',function(e){ var d=e.changedTouches[0].clientX-tx; if(Math.abs(d)>60) show(cur+(d<0?1:-1)); });
})();
