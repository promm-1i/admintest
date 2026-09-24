/* 메인 연출 — 원본 main.js(GSAP ScrollTrigger) 타임라인을 같은 시간표로 옮겼다. 라이브러리 없이 스크롤 진행률로 계산한다. */
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function clamp(v,a,b){return v<a?a:v>b?b:v}
  function seg(t,a,b){return clamp((t-a)/(b-a),0,1)}
  function pinProgress(pin){ var r=pin.getBoundingClientRect(), len=pin.offsetHeight-innerHeight; return len>0?clamp(-r.top/len,0,1):0 }
  var out1=function(x){return 1-(1-x)*(1-x)};            /* GSAP 기본 power1.out */

  /* ① 히어로 — 총 11 단위: 1~3 첫 문장 위로(-100) · 3~6 둘째 문장 제자리 · 3~9 사진 원형 확장(0→100%) · 9~11 여백.
        원본 scrub:3 은 3초 따라잡기라서 여기서도 진행률을 부드럽게 따라가게 한다. */
  var heroPin=document.getElementById('heroPin'), hero=heroPin&&heroPin.querySelector('.hero');
  if(hero&&reduce){ hero.classList.add('is-in') }   /* 움직임 줄이기: 고정 연출 없이 CSS 가 최종 상태를 그린다 */
  else if(hero){
    var c1=hero.querySelector('.hero__c1'), c2=hero.querySelector('.hero__c2'), doc=hero.querySelector('.hero__doc');
    var cur=0, target=0, raf=0;
    function paint(t){
      var mob=innerWidth<=1000, lift=mob?50:100, low=mob?50:90;
      c1.style.transform='translateY('+(-lift*out1(seg(t,1,3))-(mob?0:0))+'px)';
      c1.style.opacity=String(1-seg(t,1.6,3));
      c2.style.transform='translateY('+(-low*out1(seg(t,3,6)))+'px)';
      doc.style.opacity=String(out1(seg(t,3,3.5)));
      doc.style.clipPath='circle('+(100*seg(t,3,9))+'% at 50% 50%)';
    }
    function loop(){ cur+= (target-cur)*0.12; if(Math.abs(target-cur)<0.002) cur=target; paint(cur); raf=cur!==target?requestAnimationFrame(loop):0 }
    function onScroll(){ target=pinProgress(heroPin)*11; if(!raf) raf=requestAnimationFrame(loop) }
    addEventListener('scroll',onScroll,{passive:true}); addEventListener('resize',onScroll);
    requestAnimationFrame(function(){ hero.classList.add('is-in') });
    onScroll();
  }

  /* ② 차별점 — 항목 상단이 화면 가운데를 지나면 활성, 진행선은 항목 구간(top center→bottom center)만큼 채운다 */
  var diff=document.getElementById('diff');
  if(diff){
    var items=[].slice.call(diff.querySelectorAll('.diff__item')), subj=[].slice.call(diff.querySelectorAll('.diff__subj li'));
    var pic=diff.querySelector('.diff__pic'), lines=items.map(function(i){return i.querySelector('.diff__line i')});
    var active=-1;
    function onDiff(){
      var mid=innerHeight/2, head=diff.querySelector('.wrap').getBoundingClientRect();
      if(head.top<mid) diff.classList.add('is-in');
      if(innerWidth<=1000) return;
      var idx=0;
      items.forEach(function(it,k){
        var r=it.getBoundingClientRect();
        if(r.top<=mid) idx=k;
        lines[k].style.height=(clamp((mid-r.top)/r.height,0,1)*100)+'%';
      });
      if(idx!==active){
        active=idx; pic.dataset.active=idx;
        items.forEach(function(it,k){it.classList.toggle('is-on',k===idx)});
        subj.forEach(function(s,k){s.classList.toggle('is-on',k===idx)});
      }
    }
    addEventListener('scroll',onDiff,{passive:true}); addEventListener('resize',onDiff); onDiff();
  }

  /* ③ 치료 결과 카드 — 박스 상단이 화면 상단에 닿으면 한 번: 0/5/10° 로 흔들림(.5s) → 0°(.5s, .2s 겹침) → 좌우로 펼침(.5s) */
  var cards=document.querySelector('[data-cards]');
  if(cards){
    var cs=[].slice.call(cards.querySelectorAll('.case')), played=false;
    function spread(){
      if(innerWidth<=1000){ cards.classList.add('is-done'); return }
      var W=cards.clientWidth, w=cs[0].offsetWidth, x=[0,(W-w)/2,W-w];
      cs.forEach(function(c,k){ c.style.transition='transform .5s cubic-bezier(.25,.46,.45,.94),left .5s cubic-bezier(.25,.46,.45,.94)'; c.style.left=x[k]+'px'; c.style.transform='none' });
      setTimeout(function(){ cards.classList.add('is-done') },520);
    }
    function play(){
      if(played) return; played=true;
      if(reduce||innerWidth<=1000){ spread(); return }
      cs.forEach(function(c,k){ c.style.transition='transform .5s cubic-bezier(.25,.46,.45,.94)'; c.style.transform='translateX(-50%) rotate('+[0,5,10][k]+'deg)' });
      setTimeout(function(){ cs.forEach(function(c){ c.style.transform='translateX(-50%) rotate(0deg)' }) },300);
      setTimeout(spread,800);
    }
    function onCards(){ var box=document.getElementById('proof').getBoundingClientRect(); if(box.top<=0||cards.getBoundingClientRect().top<innerHeight*.35) play() }
    addEventListener('scroll',onCards,{passive:true}); onCards();
    addEventListener('resize',function(){ if(cards.classList.contains('is-done')&&innerWidth>1000){ var W=cards.clientWidth,w=cs[0].offsetWidth; [0,(W-w)/2,W-w].forEach(function(v,k){cs[k].style.transition='none';cs[k].style.left=v+'px'}) } });
  }

  /* ⑤ 약속 — 300% 고정. 진행률 3등분으로 항목 교체, 배경은 아래에서 차오르는 다각형, 가운데 사진은 원으로 번진다, 원 궤적은 선형으로 그려진다 */
  var ppin=document.getElementById('promisePin');
  if(ppin){
    var bgs=[].slice.call(ppin.querySelectorAll('.promise__bgs p')), imgs=[].slice.call(ppin.querySelectorAll('.promise__imgs p'));
    var its=[].slice.call(ppin.querySelectorAll('.promise__items li')), dots=[].slice.call(ppin.querySelectorAll('.promise__dot'));
    var draw=ppin.querySelector('.promise__draw'), steps=bgs.length-1, prev=-1;
    function onPromise(){
      var p=pinProgress(ppin), idx=p<1/3?0:p<2/3?1:2;
      if(idx!==prev){ prev=idx; its.forEach(function(e,k){e.classList.toggle('is-on',k===idx)}) }
      var raw=p*steps, n=Math.min(steps-1,Math.floor(raw)), f=raw-n;
      bgs.forEach(function(e,k){
        e.style.clipPath=k===n?'polygon(0 0,100% 0,100% 100%,0 100%)':k===n+1?'polygon(0 '+(100-f*100)+'%,100% '+(100-f*100)+'%,100% 100%,0 100%)':'polygon(0 100%,100% 100%,100% 100%,0 100%)';
      });
      imgs.forEach(function(e,k){ e.style.clipPath=k===n?'circle(50% at 50% 50%)':k===n+1?'circle('+(f*50)+'% at 50% 50%)':'circle(0% at 50% 50%)' });
      var dash=1876*(1-p); draw.style.strokeDashoffset=dash;
      var stage=dash<=728?3:dash<=1170?2:1;
      dots.forEach(function(d,k){ d.classList.toggle('is-on',k<stage) });
    }
    addEventListener('scroll',onPromise,{passive:true}); addEventListener('resize',onPromise); onPromise();
  }

  /* ⑥ 필름 — 원본: 트리거가 걸리면 1초 선형으로 폭 0→100% (스크럽 아님) */
  var film=document.querySelector('[data-film]');
  if(film){
    if(!('IntersectionObserver' in window)||reduce) film.classList.add('is-in');
    else{ var fo=new IntersectionObserver(function(es){ if(es[0].isIntersecting){ film.classList.add('is-in'); fo.disconnect() } },{rootMargin:'0px 0px -30% 0px'}); fo.observe(film) }
  }

  /* 공간 슬라이더 — 원본 Swiper: loop · 5초 자동 · 800ms · 간격 100 · 활성 장만 내려앉는다(-140 → 0) */
  var tour=document.querySelector('[data-tour]');
  if(tour){
    var track=tour.querySelector('[data-ttrack]'), slides=[].slice.call(track.children), n=slides.length, i=0, timer=0;
    var first=slides[0].cloneNode(true), last=slides[n-1].cloneNode(true);
    [first,last].forEach(function(c){ c.setAttribute('aria-hidden','true'); c.querySelector('img').alt='' });
    track.appendChild(first); track.insertBefore(last,slides[0]);
    var all=[].slice.call(track.children);
    function gap(){ return parseFloat(getComputedStyle(all[0]).marginRight)||0 }
    function place(anim){
      track.style.transition=anim?'':'none';
      track.style.transform='translateX('+(-(i+1)*(all[0].offsetWidth+gap()))+'px)';
      all.forEach(function(s,k){ s.classList.toggle('is-on',k===i+1) });
    }
    function go(d){
      i+=d; place(true);
      if(i>=n||i<0){ setTimeout(function(){ i=(i+n)%n; all.forEach(function(s){s.style.transition='none'}); place(false);
        requestAnimationFrame(function(){ all.forEach(function(s){s.style.transition=''}) }) },820) }
      restart();
    }
    function restart(){ clearInterval(timer); if(!reduce) timer=setInterval(function(){go(1)},5000) }
    tour.querySelector('[data-tprev]').addEventListener('click',function(){go(-1)});
    tour.querySelector('[data-tnext]').addEventListener('click',function(){go(1)});
    tour.addEventListener('mouseenter',function(){clearInterval(timer)}); tour.addEventListener('mouseleave',restart);
    addEventListener('resize',function(){place(false)});
    place(false); restart();
  }
})();
