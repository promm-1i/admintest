/* 소담한의원 — 공통 스크립트 (헤더·메가메뉴·전체메뉴·퀵·등장 모션) */
document.documentElement.classList.add('js');

(function(){
  var hd=document.querySelector('.hd'); if(!hd) return;
  var mega=document.querySelector('.mega'), smap=document.querySelector('.smap');
  var quick=document.querySelector('.quick');
  var overEl=document.querySelector(hd.dataset.over||'#none');   /* 이 요소를 지나기 전까지 흰 글자 헤더 */
  var quickEl=document.querySelector(hd.dataset.quick||'#none'); /* 이 요소를 지나야 퀵 메뉴가 나온다 */
  var last=0;

  function mode(){
    var y=scrollY||0, H=hd.offsetHeight;
    if(overEl && overEl.getBoundingClientRect().bottom>H) hd.dataset.mode='over';
    else hd.dataset.mode=y>0?'solid':(overEl?'solid':'top');  /* 원본: 1px 만 내려도 fixed */
    if(quick) quick.classList.toggle('is-on',quickEl?quickEl.getBoundingClientRect().bottom<=H:y>100  /* 원본 서브: 100px */);
    /* 서브에서만 아래로 내릴 때 헤더를 숨긴다 (메인은 원본처럼 항상 고정) */
    if(hd.dataset.autohide){
      hd.dataset.hide=(y>400 && y>last && hd.dataset.open!=='1')?'1':'0';
    }
    last=y;
  }
  addEventListener('scroll',mode,{passive:true}); addEventListener('resize',mode); mode();

  /* 메가메뉴 — 메뉴 항목에 올리면 그 묶음 패널을 연다 */
  if(mega){
    var items=[].slice.call(hd.querySelectorAll('.gnb>li')), panes=[].slice.call(mega.querySelectorAll('.mega__pane'));
    var timer;
    function open(i){
      clearTimeout(timer);
      items.forEach(function(li,k){li.classList.toggle('is-on',k===i)});
      panes.forEach(function(p,k){p.classList.toggle('is-on',k===i)});
      mega.classList.add('is-open'); hd.dataset.open='1';
    }
    function close(){ timer=setTimeout(function(){
      mega.classList.remove('is-open'); hd.dataset.open='0';
      items.forEach(function(li){li.classList.remove('is-on')});
    },120); }
    items.forEach(function(li,i){
      li.addEventListener('mouseenter',function(){ if(innerWidth>1000) open(i) });
      li.querySelector('a').addEventListener('focus',function(){ if(innerWidth>1000) open(i) });
    });
    hd.addEventListener('mouseleave',function(e){ if(!mega.contains(e.relatedTarget)) close() });
    mega.addEventListener('mouseenter',function(){clearTimeout(timer)});
    mega.addEventListener('mouseleave',function(e){ if(!hd.contains(e.relatedTarget)) close() });
    mega.addEventListener('focusout',function(e){ if(!mega.contains(e.relatedTarget)&&!hd.contains(e.relatedTarget)) close() });
  }

  /* 전체메뉴 */
  var opener=null;
  function smapOpen(on){
    if(!smap) return;
    if(on){ opener=document.activeElement; smap.classList.add('is-open');
      requestAnimationFrame(function(){requestAnimationFrame(function(){smap.classList.add('is-in')})});
      document.documentElement.style.overflow='hidden';
      var x=smap.querySelector('.smap__x'); if(x) setTimeout(function(){x.focus()},50);
    }else{ smap.classList.remove('is-in');
      setTimeout(function(){smap.classList.remove('is-open')},300);
      document.documentElement.style.overflow='';
      if(opener&&opener.focus) opener.focus();
    }
    document.querySelectorAll('[data-smap]').forEach(function(b){b.setAttribute('aria-expanded',on?'true':'false')});
  }
  document.addEventListener('click',function(e){
    if(e.target.closest('[data-smap]')){ e.preventDefault(); smapOpen(true); }
    else if(e.target.closest('[data-smap-close]')) smapOpen(false);
    if(e.target.closest('[data-top]')) scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  });
  addEventListener('keydown',function(e){ if(e.key==='Escape'&&smap&&smap.classList.contains('is-open')) smapOpen(false) });
})();

/* 스크롤 등장 — 원본 AOS(fade-up·fade-left·fade-right, 800ms) 대응. 한 번 켜면 유지 */
(function(){
  var els=[].slice.call(document.querySelectorAll('.rv')); if(!els.length) return;
  if(!('IntersectionObserver' in window)){ els.forEach(function(e){e.classList.add('on')}); return; }
  var io=new IntersectionObserver(function(es){ es.forEach(function(en){
    if(en.isIntersecting){ en.target.classList.add('on'); io.unobserve(en.target); }
  }); },{rootMargin:'0px 0px -12% 0px'});
  els.forEach(function(e){io.observe(e)});
})();

/* 탭 — [data-tabs] 안의 [role=tab] ↔ [role=tabpanel] */
(function(){
  document.querySelectorAll('[data-tabs]').forEach(function(box){
    var tabs=[].slice.call(box.querySelectorAll('[role="tab"]'));
    tabs.forEach(function(t,i){
      t.addEventListener('click',function(){
        tabs.forEach(function(x){
          var on=x===t; x.setAttribute('aria-selected',on?'true':'false'); x.tabIndex=on?0:-1;
          var p=document.getElementById(x.getAttribute('aria-controls')); if(p) p.hidden=!on;
        });
      });
      t.addEventListener('keydown',function(e){
        var k=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0; if(!k) return;
        var n=tabs[(i+k+tabs.length)%tabs.length]; n.focus(); n.click();
      });
    });
  });
})();

/* 가로 슬라이더 — [data-slider] 트랙을 이전/다음 버튼으로 한 장씩 */
(function(){
  document.querySelectorAll('[data-slider]').forEach(function(box){
    var track=box.querySelector('[data-track]'); if(!track) return;
    var prev=box.querySelector('[data-prev]'), next=box.querySelector('[data-next]');
    var bar=box.querySelector('[data-bar]');
    function step(){ var c=track.children[0]; if(!c) return 300;
      return c.getBoundingClientRect().width+parseFloat(getComputedStyle(track).columnGap||getComputedStyle(track).gap||0); }
    function sync(){
      var max=track.scrollWidth-track.clientWidth-2;
      if(prev) prev.disabled=track.scrollLeft<=2;
      if(next) next.disabled=track.scrollLeft>=max;
      if(bar) bar.style.transform='scaleX('+Math.max(.08,Math.min(1,(track.scrollLeft+track.clientWidth)/track.scrollWidth))+')';
    }
    if(prev) prev.addEventListener('click',function(){track.scrollBy({left:-step(),behavior:'smooth'})});
    if(next) next.addEventListener('click',function(){track.scrollBy({left:step(),behavior:'smooth'})});
    track.addEventListener('scroll',sync,{passive:true}); addEventListener('resize',sync); sync();
  });
})();

/* ── 서브 ── */
/* 아코디언 — [data-acc] 안에서 하나만 연다 */
(function(){
  document.querySelectorAll('[data-acc]').forEach(function(box){
    var its=[].slice.call(box.querySelectorAll('.acc__it'));
    its.forEach(function(it){
      var b=it.querySelector('.acc__btn');
      b.setAttribute('aria-expanded',it.classList.contains('open')?'true':'false');
      b.addEventListener('click',function(){
        var on=!it.classList.contains('open');
        its.forEach(function(x){ x.classList.remove('open'); x.querySelector('.acc__btn').setAttribute('aria-expanded','false') });
        if(on){ it.classList.add('open'); b.setAttribute('aria-expanded','true') }
      });
    });
  });
})();

/* 비주얼 B(곡선)·C(펼침) — 원본 sub.js roundBgAnimation · stickyBgAnimation 시간표 */
(function(){
  var curve=document.querySelector('.sub-curve'), rev=document.querySelector('.sub-reveal');
  var hl=document.querySelector('.hl'); if(hl) setTimeout(function(){hl.classList.add('on')},300);
  if(!curve&&!rev) return;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var line=curve&&curve.querySelector('.sub-curve__line');
  var img=rev&&rev.querySelector('.sub-reveal__img'), ov=rev&&rev.querySelector('.sub-reveal__ov'), txt=rev&&rev.querySelector('.sub-reveal__txt');
  var cur={c:0,r:0}, tgt={c:0,r:0}, raf=0;
  function clamp(v){return v<0?0:v>1?1:v}
  function paint(){
    if(line) line.style.borderRadius=(50*(1-cur.c))+'%';
    if(rev){
      var q=cur.r, m=innerWidth<=1000, side=(m?6:13)*(1-q), top=45*(1-q);
      img.style.clipPath='inset('+top+'% '+side+'% 0 '+side+'%)';
      ov.style.opacity=String(q);
      var H=rev.querySelector('.sub-reveal__stick').offsetHeight, start=(H*.65-txt.scrollHeight)/2, end=m?H*.3:320;
      txt.style.height='auto'; txt.style.transform='translateY('+((start+(end-start)*q))+'px)';
      var c=Math.round(44+(255-44)*q); txt.style.color='rgb('+c+','+c+','+c+')';
    }
  }
  function loop(){ var d=0; for(var k in cur){ cur[k]+=(tgt[k]-cur[k])*.18; if(Math.abs(tgt[k]-cur[k])<.001) cur[k]=tgt[k]; d+=Math.abs(tgt[k]-cur[k]) }
    paint(); raf=d>0?requestAnimationFrame(loop):0 }
  function tick(){
    var y=scrollY||0, H=innerHeight;
    if(curve) tgt.c=clamp((y-curve.offsetTop)/(((curve.offsetHeight-H)*.5)||1));   /* start top top → end 50% center */
    if(rev){ var len=rev.offsetHeight-H; tgt.r=clamp((y-rev.offsetTop)/(len||1)) }
    if(reduce){ cur.c=tgt.c; cur.r=tgt.r; paint(); return }
    if(!raf) raf=requestAnimationFrame(loop);
  }
  addEventListener('scroll',tick,{passive:true}); addEventListener('resize',tick); tick(); if(reduce&&rev){ cur.r=1; paint() }
})();

/* 로그인 팝업 — 원본 popup_member (로그인 · 아이디 찾기 · 비밀번호 찾기) */
(function(){
  var pop=document.getElementById('loginPop'); if(!pop) return;
  var opener=null;
  function pane(k){ pop.querySelectorAll('.lpop__pane').forEach(function(p){p.hidden=p.dataset.pane!==k});
    var f=pop.querySelector('[data-pane="'+k+'"] input'); if(f) f.focus() }
  function open(){ opener=document.activeElement; pop.hidden=false; document.documentElement.style.overflow='hidden'; pane('login') }
  function close(){ pop.hidden=true; document.documentElement.style.overflow=''; if(opener&&opener.focus) opener.focus() }
  document.addEventListener('click',function(e){
    if(e.target.closest('[data-login]')){ e.preventDefault(); open() }
    var k=e.target.closest('[data-lpop]'); if(k) pane(k.dataset.lpop);
    if(e.target.closest('[data-lpop-close]')||e.target===pop) close();
  });
  addEventListener('keydown',function(e){ if(e.key==='Escape'&&!pop.hidden) close() });
})();

/* 다이어트 환 신청 — 원본 diet_modal (하단 버튼으로 열고 닫기 · 2단계 폼) */
(function(){
  var btn=document.querySelector('[data-dmodal]'), md=document.getElementById('dietModal'); if(!btn||!md) return;
  var f1=md.querySelector('[data-dstep="1"]'), f2=md.querySelector('[data-dstep="2"]');
  function set(on){ md.hidden=!on; btn.setAttribute('aria-expanded',on?'true':'false'); document.documentElement.style.overflow=on?'hidden':'';
    if(on){ f1.hidden=false; f2.hidden=true; f1.querySelector('select').focus() } }
  btn.addEventListener('click',function(){ set(md.hidden) });
  md.addEventListener('click',function(e){ if(e.target===md||e.target.closest('[data-dmodal-close]')) set(false) });
  f1.addEventListener('submit',function(e){ e.preventDefault(); if(!f1.checkValidity()){f1.reportValidity();return}
    f1.hidden=true; f2.hidden=false; f2.querySelector('input').focus() });
  addEventListener('keydown',function(e){ if(e.key==='Escape'&&!md.hidden) set(false) });
})();

/* 둘러보기 — 큰 사진 + 썸네일 */
(function(){
  var v=document.querySelector('[data-tourv]'); if(!v) return;
  var main=v.querySelector('.tourv__main img'), cap=v.querySelector('.tourv__cap');
  var th=[].slice.call(v.querySelectorAll('.tourv__thumbs button')), i=0;
  function show(k){ i=(k+th.length)%th.length; var b=th[i], im=b.querySelector('img');
    main.src=im.src; main.alt=b.dataset.cap; cap.textContent=b.dataset.cap;
    th.forEach(function(x,n){x.setAttribute('aria-current',n===i?'true':'false')}); }
  th.forEach(function(b,k){ b.addEventListener('click',function(){show(k)}) });
  v.querySelector('.tourv__btn--p').addEventListener('click',function(){show(i-1)});
  v.querySelector('.tourv__btn--n').addEventListener('click',function(){show(i+1)});
})();

/* 게시판 분류 버튼 — [data-filter] 로 목록 항목의 data-cat 을 거른다 */
(function(){
  var f=document.querySelector('[data-filter]'); if(!f) return;
  var tabs=[].slice.call(f.querySelectorAll('[role="tab"]')), items=[].slice.call(document.querySelectorAll('[data-cat]'));
  tabs.forEach(function(t){ t.addEventListener('click',function(){
    tabs.forEach(function(x){x.setAttribute('aria-selected',x===t?'true':'false')});
    items.forEach(function(it){ it.hidden=!(t.dataset.v==='all'||it.dataset.cat===t.dataset.v) });
    var c=document.querySelector('[data-count]'); if(c) c.textContent=items.filter(function(x){return !x.hidden}).length;
  }) });
})();

/* 데모 폼 — 실제 전송 없이 안내만 */
(function(){
  document.querySelectorAll('form[data-demo-form]').forEach(function(fm){
    fm.addEventListener('submit',function(e){ e.preventDefault();
      if(!fm.checkValidity()){ fm.reportValidity(); return }
      alert('디자인 예시 화면입니다. 실제 납품 시 병원 회원·상담 시스템과 연결됩니다.'); });
    var all=fm.querySelector('[data-all]');
    if(all) all.addEventListener('change',function(){ fm.querySelectorAll('[data-agree]').forEach(function(c){c.checked=all.checked}) });
  });
})();

/* 가로 아코디언 — [data-hacc] 안에서 하나만 펼친다 */
(function(){
  document.querySelectorAll('[data-hacc]').forEach(function(box){
    var its=[].slice.call(box.querySelectorAll('.hacc__it'));
    its.forEach(function(it){ it.querySelector('.hacc__btn').addEventListener('click',function(){
      its.forEach(function(x){x.classList.toggle('open',x===it); x.querySelector('.hacc__btn').setAttribute('aria-expanded',x===it?'true':'false')});
      var h=it.querySelector('h3'); if(h){ h.setAttribute('tabindex','-1'); h.focus({preventScroll:true}) }
    }) });
  });
})();

/* ══ 원본 부품 동작 (kakkai sub.js · 쪽별 스크립트) ══ */
/* arrow_image_sync — 제목에 마우스를 올리면(또는 초점) 그 항목이 열리고 오른쪽 사진이 바뀐다 */
(function(){
  document.querySelectorAll('[data-sync]').forEach(function(box){
    var lis=[].slice.call(box.querySelectorAll('.sync__list>li')), imgs=[].slice.call(box.querySelectorAll('.sync__r li'));
    function on(k){ lis.forEach(function(li,i){li.classList.toggle('on',i===k); li.querySelector('.sync__t').setAttribute('aria-expanded',i===k?'true':'false')});
      imgs.forEach(function(im,i){im.classList.toggle('on',i===k)}) }
    lis.forEach(function(li,k){ var t=li.querySelector('.sync__t');
      t.addEventListener('mouseenter',function(){on(k)}); t.addEventListener('focus',function(){on(k)}); t.addEventListener('click',function(){on(k)}) });
    on(0);
  });
})();

/* program_cont — 흰 알약을 누르면 설명이 펼쳐진다 · 첫 묶음은 4장씩 넘기는 슬라이더 */
(function(){
  document.querySelectorAll('.prg__tt').forEach(function(b){
    b.setAttribute('aria-expanded','false');
    b.addEventListener('click',function(){ var tx=b.parentElement, on=!tx.classList.contains('on'); tx.classList.toggle('on',on); b.setAttribute('aria-expanded',on?'true':'false') });
  });
  document.querySelectorAll('[data-prg]').forEach(function(box){
    var tr=box.querySelector('.prg__track'), pv=box.querySelector('[data-pprev]'), nx=box.querySelector('[data-pnext]');
    function sync(){ pv.disabled=tr.scrollLeft<=2; nx.disabled=tr.scrollLeft>=tr.scrollWidth-tr.clientWidth-2 }
    pv.addEventListener('click',function(){tr.scrollBy({left:-tr.clientWidth-12})});
    nx.addEventListener('click',function(){tr.scrollBy({left:tr.clientWidth+12})});
    tr.addEventListener('scroll',sync,{passive:true}); sync();
  });
})();

/* overflow_step — 200% 고정 동안 2·3번 카드가 150% 아래에서 차례로 올라와 겹친다 (scrub 1) */
(function(){
  var pins=[].slice.call(document.querySelectorAll('.ostep-pin')); if(!pins.length) return;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  pins.forEach(function(pin){
    var sec=pin.querySelector('.ostep'), its=[].slice.call(pin.querySelectorAll('.ostep__it')).slice(1), cur=0, tgt=0, raf=0;
    function size(){ pin.style.height=(innerWidth>1000&&!reduce)?(sec.offsetHeight+innerHeight*2)+'px':'' }
    function paint(){ var n=its.length; its.forEach(function(it,i){ var f=Math.min(1,Math.max(0,cur*n-i)); it.style.transform='translateY('+(150*(1-f))+'%)' }) }
    function loop(){ cur+=(tgt-cur)*.15; if(Math.abs(tgt-cur)<.001) cur=tgt; paint(); raf=cur!==tgt?requestAnimationFrame(loop):0 }
    function tick(){ if(innerWidth<=1000||reduce){ its.forEach(function(it){it.style.transform=''}); return }
      var r=pin.getBoundingClientRect(), len=pin.offsetHeight-sec.offsetHeight; tgt=Math.min(1,Math.max(0,-r.top/(len||1)));
      if(!raf) raf=requestAnimationFrame(loop) }
    size(); addEventListener('resize',function(){size();tick()}); addEventListener('scroll',tick,{passive:true}); tick();
  });
})();

/* click_btn — 누르면 설명이 펼쳐지고 다른 항목은 닫힌다 ([data-clk] 묶음) · hover_cont 는 올리면 열린다([data-hov]) */
(function(){
  document.querySelectorAll('[data-clk]').forEach(function(box){
    var bs=[].slice.call(box.querySelectorAll('.clk'));
    bs.forEach(function(b){ var h=b.querySelector('.clk__h'); h.setAttribute('aria-expanded','false');
      h.addEventListener('click',function(){ var on=!b.classList.contains('on');
        bs.forEach(function(x){x.classList.remove('on'); x.querySelector('.clk__h').setAttribute('aria-expanded','false')});
        if(on){ b.classList.add('on'); h.setAttribute('aria-expanded','true') } });
      if(box.hasAttribute('data-hov')){ b.addEventListener('mouseenter',function(){b.classList.add('on');h.setAttribute('aria-expanded','true')});
        b.addEventListener('mouseleave',function(){b.classList.remove('on');h.setAttribute('aria-expanded','false')}) }
    });
  });
})();

/* 흐르는 글자 — 섹션에 들어오면 40초 선형 반복 시작 */
(function(){
  var els=[].slice.call(document.querySelectorAll('.flowt')); if(!els.length) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  /* 관찰 대상은 부모 섹션 — 클래스는 흐르는 글자에 */
  els.forEach(function(e){ new IntersectionObserver(function(es){ e.classList.toggle('on',es[0].isIntersecting) }).observe(e.parentElement) });
})();

/* 체크 목록 — 누르면 체크 표시 (원본 0403 click_ul) */
(function(){
  document.querySelectorAll('[data-check] button').forEach(function(b){
    b.setAttribute('aria-pressed','false');
    b.addEventListener('click',function(){ var on=b.getAttribute('aria-pressed')!=='true'; b.setAttribute('aria-pressed',on?'true':'false') });
  });
})();

/* 탭에 따라 섹션 배경색이 바뀐다 (원본 0202 · 0304 · 0305) — 탭 버튼의 data-bg */
(function(){
  document.querySelectorAll('[data-tabs][data-bgsec]').forEach(function(box){
    var sec=box.closest('section');
    box.querySelectorAll('[role="tab"]').forEach(function(t){ t.addEventListener('click',function(){ sec.dataset.bg=t.dataset.bg||'' }) });
  });
})();

/* 끌어서 넘기기 — 원본 Swiper grab (마우스로 트랙을 잡아 끈다) */
(function(){
  document.querySelectorAll('[data-drag]').forEach(function(tr){
    var down=false, x0=0, s0=0, moved=false;
    tr.addEventListener('mousedown',function(e){ down=true; moved=false; x0=e.pageX; s0=tr.scrollLeft; tr.style.scrollSnapType='none'; tr.style.cursor='grabbing'; e.preventDefault() });
    addEventListener('mousemove',function(e){ if(!down) return; var d=e.pageX-x0; if(Math.abs(d)>4) moved=true; tr.scrollLeft=s0-d });
    addEventListener('mouseup',function(){ if(!down) return; down=false; tr.style.cursor=''; tr.style.scrollSnapType='' });
    tr.addEventListener('click',function(e){ if(moved){ e.preventDefault(); e.stopPropagation() } },true);
  });
})();

/* 넓어지는 카드 — 올린(또는 초점) 카드만 .on (원본 0201 box01 · 마지막으로 올린 카드가 유지된다) */
(function(){
  document.querySelectorAll('[data-grow]').forEach(function(box){
    var its=[].slice.call(box.children);
    its.forEach(function(it){ function on(){ its.forEach(function(x){x.classList.toggle('on',x===it)}) }
      it.addEventListener('mouseenter',on); it.addEventListener('focusin',on) });
  });
})();

/* 누르면 펼치는 판 — [data-pick] 안의 항목 하나만 .on (원본 0203 · 0304 가로 아코디언) */
(function(){
  document.querySelectorAll('[data-pick]').forEach(function(box){
    var its=[].slice.call(box.children);
    its.forEach(function(it){ var b=it.querySelector('button'); if(b) b.setAttribute('aria-expanded',it.classList.contains('on')?'true':'false');
      it.addEventListener('click',function(){ its.forEach(function(x){ x.classList.toggle('on',x===it); var bb=x.querySelector('button'); if(bb) bb.setAttribute('aria-expanded',x===it?'true':'false') }) }) });
  });
})();

/* 바닥에서 멈추고 다음 섹션이 덮어 올라온다 — 원본 0201 sec03 pin(bottom bottom) + sec04 yPercent 100→0 */
(function(){
  var els=[].slice.call(document.querySelectorAll('[data-stickbottom]')); if(!els.length) return;
  function set(){ els.forEach(function(e){ e.style.top=innerWidth>1000?Math.min(0,innerHeight-e.offsetHeight)+'px':'' }) }
  set(); addEventListener('resize',set); addEventListener('load',set);
})();

/* 슬라이더 점 — [data-slider] 안의 [data-dots] 에 장수만큼 점을 만들고, 가운데 온 장을 표시 */
(function(){
  document.querySelectorAll('[data-slider]').forEach(function(box){
    var dots=box.querySelector('[data-dots]'), tr=box.querySelector('[data-track]'); if(!dots||!tr) return;
    var its=[].slice.call(tr.children);
    its.forEach(function(it,k){ var b=document.createElement('button'); b.type='button'; b.setAttribute('aria-label',(k+1)+'번째 장');
      b.addEventListener('click',function(){ tr.scrollTo({left:it.offsetLeft-(tr.clientWidth-it.offsetWidth)/2,behavior:'smooth'}) }); dots.appendChild(b) });
    var bs=[].slice.call(dots.children);
    function sync(){ var c=tr.scrollLeft+tr.clientWidth/2, best=0, d=1e9;
      its.forEach(function(it,k){ var m=Math.abs(it.offsetLeft+it.offsetWidth/2-c); if(m<d){d=m;best=k} });
      its.forEach(function(it,k){ it.classList.toggle('on',k===best) }); bs.forEach(function(b,k){ b.setAttribute('aria-current',k===best?'true':'false') }) }
    tr.addEventListener('scroll',sync,{passive:true}); addEventListener('resize',sync); sync();
  });
})();

/* 무한 자동 캐러셀 — 원본 Swiper(loop · autoplay · centeredSlides). [data-loop] 안의 [data-ltrack] ·
   data-delay(ms) · [data-lprev]/[data-lnext] · [data-lnames] 이름표 버튼(원본 0604 탭 페이지 표시) */
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-loop]').forEach(function(box){
    var tr=box.querySelector('[data-ltrack]'), orig=[].slice.call(tr.children), n=orig.length, i=0, timer=0, busy=false;
    var delay=+box.dataset.delay||3000, speed=+box.dataset.speed||1000;
    function clone(c){ var x=c.cloneNode(true); x.setAttribute('aria-hidden','true'); x.querySelectorAll('img').forEach(function(m){m.alt=''}); x.querySelectorAll('a,button').forEach(function(a){a.tabIndex=-1}); return x }
    orig.forEach(function(c){ tr.appendChild(clone(c)) }); orig.slice().reverse().forEach(function(c){ tr.insertBefore(clone(c),tr.firstChild) });
    var all=[].slice.call(tr.children), names=[].slice.call(box.querySelectorAll('[data-lnames] button'));
    function gap(){ return parseFloat(getComputedStyle(tr).columnGap)||0 }
    function place(anim){
      var w=all[0].offsetWidth, g=gap(), k=i+n, x=-(k*(w+g))+(tr.parentElement.clientWidth-w)/2;
      tr.style.transition=anim?'transform '+speed+'ms ease':'none'; tr.style.transform='translateX('+x+'px)';
      all.forEach(function(s,j){ s.classList.toggle('on',j===k) });
      names.forEach(function(b,j){ b.setAttribute('aria-current',j===((i%n)+n)%n?'true':'false') });
    }
    function go(d){ if(busy) return; busy=true; i+=d; place(true);
      setTimeout(function(){ if(i>=n||i<0){ i=(i%n+n)%n; place(false) } busy=false },speed+20); }
    function to(k){ var d=k-(((i%n)+n)%n); if(d) { busy=false; i+=d; place(true); setTimeout(function(){busy=false},speed) } restart() }
    function restart(){ clearInterval(timer); if(!reduce) timer=setInterval(function(){go(1)},delay) }
    var pv=box.querySelector('[data-lprev]'), nx=box.querySelector('[data-lnext]');
    if(pv) pv.addEventListener('click',function(){go(-1);restart()}); if(nx) nx.addEventListener('click',function(){go(1);restart()});
    names.forEach(function(b,k){ b.addEventListener('click',function(){to(k)}) });
    box.addEventListener('mouseenter',function(){clearInterval(timer)}); box.addEventListener('mouseleave',restart);
    box.addEventListener('focusin',function(){clearInterval(timer)});
    addEventListener('resize',function(){place(false)}); place(false); restart();
  });
})();
