(function(){
  var d=document, w=window, hd=d.querySelector('.hd'), bar=d.querySelector('.hd-bar'),
      dots=d.querySelector('.hd-dots'), sub=d.body.classList.contains('sub');
  w.AR=w.AR||{};

  
  if(sub){ hd.classList.add('white'); dots.classList.add('white');
    setTimeout(function(){bar.classList.add('show');dots.classList.add('show');},30); }

  
  var gnb=d.querySelector('.gnb');
  if(gnb){
    var open=function(){hd.classList.add('open','over-menu');dots.classList.add('menu-over');},
        close=function(){hd.classList.remove('open','over-menu');dots.classList.remove('menu-over');};
    gnb.addEventListener('mouseenter',open); gnb.addEventListener('mouseleave',close);
    gnb.addEventListener('focusin',open);
    gnb.addEventListener('focusout',function(e){if(!gnb.contains(e.relatedTarget))close();});
  }

  
  var kv=d.querySelector('.kv');
  var onScroll=function(){
    var y=w.pageYOffset, lim=(w.innerWidth>1400&&kv)?kv.offsetHeight-300:21, on=y>lim;
    hd.classList.toggle('active',on); dots.classList.toggle('active2',on);
  };
  if(sub){w.addEventListener('scroll',onScroll,{passive:true}); onScroll();}

  
  var map=d.querySelector('.smap'), mapBg=d.querySelector('.smap-bg');
  AR.closeMap=function(){map.classList.remove('active');mapBg.classList.remove('active');
    dots.classList.remove('active');hd.classList.remove('over-map');dots.setAttribute('aria-expanded','false');
    map.setAttribute('aria-hidden','true');};
  dots.addEventListener('click',function(){
    if(map.classList.contains('active')){AR.closeMap();return;}
    map.classList.add('active');mapBg.classList.add('active');dots.classList.add('active');hd.classList.add('over-map');
    dots.setAttribute('aria-expanded','true');map.setAttribute('aria-hidden','false');
  });
  d.addEventListener('keydown',function(e){if(e.key==='Escape'&&map.classList.contains('active'))AR.closeMap();});
  map.querySelectorAll('.smap-g').forEach(function(g){
    g.addEventListener('click',function(e){ if(w.innerWidth<=1000){ e.preventDefault();
      var s=g.parentNode.querySelector('.smap-sub'), was=s.classList.contains('open');
      map.querySelectorAll('.smap-sub.open').forEach(function(x){x.classList.remove('open');});
      if(!was)s.classList.add('open'); }});
  });

  
  d.querySelectorAll('.crumb-dd>button').forEach(function(b){
    b.addEventListener('click',function(){var li=b.parentNode, o=li.classList.toggle('open');
      b.setAttribute('aria-expanded',o?'true':'false');});
  });
  d.addEventListener('click',function(e){d.querySelectorAll('.crumb-dd.open').forEach(function(li){
    if(!li.contains(e.target)){li.classList.remove('open');li.querySelector('button').setAttribute('aria-expanded','false');}});});

  
  var rv=[].slice.call(d.querySelectorAll('[data-active]'));
  AR.reveal=function(){
    var vh=w.innerHeight;
    rv.forEach(function(e){ if(e.closest('.fp-sec')&&d.body.classList.contains('fp-on'))return;
      var r=e.getBoundingClientRect(), h=r.height||1, t=h*.05,
          inView=(r.top+t<vh)&&(r.bottom-t>0);
      if(inView){e.classList.add('active');e.classList.remove('inactive');}
      else if(e.classList.contains('active')){e.classList.remove('active');e.classList.add('inactive');}});
  };
  w.addEventListener('scroll',AR.reveal,{passive:true}); w.addEventListener('resize',AR.reveal);
  AR.reveal();

  
  d.querySelectorAll('.ft-top').forEach(function(b){b.addEventListener('click',function(){
    if(AR.fpTop){AR.fpTop();return;} w.scrollTo({top:0,behavior:'smooth'});});});

  
  d.querySelectorAll('[data-tabs]').forEach(function(box){
    var tabs=[].slice.call(box.querySelectorAll('[data-tab]'));
    tabs.forEach(function(t){t.addEventListener('click',function(e){e.preventDefault();
      var id=t.getAttribute('data-tab');
      tabs.forEach(function(x){var on=x===t; x.parentNode.classList.toggle('on',on); x.setAttribute('aria-selected',on?'true':'false');
        var p=d.getElementById(x.getAttribute('data-tab')); if(p)p.classList.toggle('on',on);});
      if(w.AR.onTab)AR.onTab(id); AR.reveal();});});
  });
  
  w.addEventListener('load',function(){
    var id=new URLSearchParams(w.location.search).get('tab');
    var t=id&&d.querySelector('[data-tab="'+id.replace(/[^\w-]/g,'')+'"]'); if(t)t.click();
  });

  
  AR.fader=function(root){
    var slides=[].slice.call(root.querySelectorAll('[data-slide]')), thumbs=[].slice.call(root.querySelectorAll('[data-thumb]')),
        ms=+root.getAttribute('data-auto')||0, i=0, tm=null, n=slides.length;
    if(!n)return;
    var go=function(k){ i=(k+n)%n; slides.forEach(function(s,j){s.classList.toggle('on',j===i);
        s.setAttribute('aria-hidden',j===i?'false':'true');});
      thumbs.forEach(function(t,j){t.classList.toggle('on',j===i);t.setAttribute('aria-pressed',j===i?'true':'false');});
      if(root.onGo)root.onGo(i);
      if(ms){clearTimeout(tm);tm=setTimeout(function(){go(i+1);},ms);} };
    thumbs.forEach(function(t,j){t.addEventListener('click',function(){go(j);});});
    var p=root.querySelector('[data-prev]'), nx=root.querySelector('[data-next]');
    if(p)p.addEventListener('click',function(){go(i-1);}); if(nx)nx.addEventListener('click',function(){go(i+1);});
    root.go=go; go(0); return root;
  };
  d.querySelectorAll('[data-fader]').forEach(AR.fader);

  
  AR.openDlg=function(id){var g=d.getElementById(id); if(!g)return; g.classList.add('open');
    var x=g.querySelector('.dlg-x'); if(x)x.focus();};
  d.querySelectorAll('[data-dlg]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();
    AR.openDlg(b.getAttribute('data-dlg'));});});
  d.querySelectorAll('.dlg').forEach(function(g){g.addEventListener('click',function(e){
    if(e.target===g||e.target.closest('.dlg-x'))g.classList.remove('open');});});
  d.addEventListener('keydown',function(e){if(e.key==='Escape')d.querySelectorAll('.dlg.open').forEach(function(g){g.classList.remove('open');});});

  
  AR.toast=function(msg){var t=d.querySelector('.toast'); if(!t){t=d.createElement('div');t.className='toast';
    t.setAttribute('role','status');d.body.appendChild(t);} t.textContent=msg; t.classList.add('show');
    clearTimeout(t._t); t._t=setTimeout(function(){t.classList.remove('show');},2200);};
  d.querySelectorAll('[data-toast]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();
    AR.toast(a.getAttribute('data-toast'));});});

  
  var au=d.getElementById('bgm'), bb=d.querySelector('.hd-bgm button'), eq=[].slice.call(d.querySelectorAll('.hd-eq i')), ti=null;
  AR.bgm=function(on){ if(!au)return;
    if(on&&!au.getAttribute('src')){ AR.toast('배경음악 파일(assets/bgm.mp3)을 넣으면 이 단추로 재생됩니다.'); return; }
    if(on){ var pr=au.play(); if(pr&&pr.catch)pr.catch(function(){});
      clearInterval(ti); ti=setInterval(function(){eq.forEach(function(e){e.style.height=(Math.random()*10)+'px';});},300);
      bb.setAttribute('aria-pressed','true'); }
    else { au.pause(); clearInterval(ti); eq.forEach(function(e){e.style.height='2px';}); bb.setAttribute('aria-pressed','false'); } };
  if(bb)bb.addEventListener('click',function(){AR.bgm(au.paused);});
})();
