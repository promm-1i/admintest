
(() => {
  const q=(s,r=document)=>r.querySelector(s), qa=(s,r=document)=>[...r.querySelectorAll(s)];
  const isEn=document.documentElement.lang==='en';
  const toast=(message,delay=2000)=>{const t=q('.ready-toast');if(!t)return;t.textContent=message;t.classList.add('show');clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),delay)};

  const header=q('.header'), desktopNav=q('.desktop-nav');
  const setMega=open=>header?.classList.toggle('mega-open',open);
  desktopNav?.addEventListener('mouseenter',()=>setMega(true));
  desktopNav?.addEventListener('mouseleave',()=>setMega(false));
  desktopNav?.addEventListener('focusin',()=>setMega(true));
  header?.addEventListener('focusout',e=>{if(!header.contains(e.relatedTarget))setMega(false)});

  const panel=q('.mobile-panel'), menuButtons=qa('.site-btn,.menu-btn');
  const setPanel=open=>{if(!panel)return;panel.classList.toggle('open',open);panel.setAttribute('aria-hidden',String(!open));menuButtons.forEach(x=>x.setAttribute('aria-expanded',String(open)));document.body.style.overflow=open?'hidden':'';(open?q('.panel-close'):menuButtons[0])?.focus()};
  menuButtons.forEach(button=>button.addEventListener('click',()=>setPanel(!panel?.classList.contains('open'))));
  q('.panel-close')?.addEventListener('click',()=>setPanel(false));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){setPanel(false);qa('.crumb-select.open').forEach(x=>{x.classList.remove('open');q('button',x)?.setAttribute('aria-expanded','false')})}});
  qa('.mobile-group>button').forEach(button=>button.addEventListener('click',()=>{
    if(innerWidth>960)return;
    const group=button.parentElement,willOpen=!group.classList.contains('open');
    qa('.mobile-group').forEach(other=>{other.classList.remove('open');q(':scope>button',other)?.setAttribute('aria-expanded','false')});
    group.classList.toggle('open',willOpen);button.setAttribute('aria-expanded',String(willOpen));
  }));

  const closeCrumbs=except=>qa('.crumb-select').forEach(item=>{if(item!==except){item.classList.remove('open');q(':scope>button',item)?.setAttribute('aria-expanded','false')}});
  qa('.crumb-select>button').forEach(button=>button.addEventListener('click',()=>{const item=button.parentElement,open=!item.classList.contains('open');closeCrumbs(item);item.classList.toggle('open',open);button.setAttribute('aria-expanded',String(open))}));
  qa('.crumb-select').forEach(item=>item.addEventListener('mouseleave',()=>{item.classList.remove('open');q(':scope>button',item)?.setAttribute('aria-expanded','false')}));
  document.addEventListener('click',event=>{if(!event.target.closest('.crumb-select'))closeCrumbs()});

  const initSlider=(root,slideSelector,dotSelector,interval=3000)=>{
    const slides=qa(slideSelector,root),dots=qa(dotSelector,root);if(slides.length<2)return;
    let active=0,timer,startX=null;
    const show=n=>{active=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle('active',i===active));dots.forEach((d,i)=>{d.classList.toggle('active',i===active);d.setAttribute('aria-selected',String(i===active))})};
    const restart=()=>{clearInterval(timer);timer=setInterval(()=>show(active+1),interval)};
    dots.forEach((dot,i)=>dot.addEventListener('click',()=>{show(i);restart()}));
    root.addEventListener('pointerdown',e=>{startX=e.clientX});
    root.addEventListener('pointerup',e=>{if(startX===null)return;const dx=e.clientX-startX;startX=null;if(Math.abs(dx)>40){show(active+(dx<0?1:-1));restart()}});
    root.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();show(active+(e.key==='ArrowRight'?1:-1));restart()}});
    restart();show(0);
  };
  const hero=q('.hero');if(hero)initSlider(hero,'.hero-slide','.hero-dot',3000);

  setTimeout(()=>{
    const sections=qa('.home-motion-section');if(!sections.length)return;
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('section-on');observer.unobserve(entry.target)}}),{threshold:0,rootMargin:'0px 0px -30% 0px'});
    sections.forEach(section=>{observer.observe(section);if(section.getBoundingClientRect().top<=innerHeight*.7)section.classList.add('section-on')});
  },500);

  qa('.tabs[role="tablist"]').forEach(list=>{
    const tabs=qa('[role="tab"]',list),activate=(tab,updateHash=true)=>{
      tabs.forEach(item=>{const on=item===tab;item.classList.toggle('active',on);item.setAttribute('aria-selected',String(on));item.tabIndex=on?0:-1;const panel=document.getElementById(item.dataset.tab);if(panel)panel.hidden=!on});
      if(updateHash&&tab.dataset.tab)history.pushState({tab:tab.dataset.tab},'',`#${tab.dataset.tab}`);
    };
    tabs.forEach((tab,index)=>{tab.tabIndex=index? -1:0;tab.addEventListener('click',()=>activate(tab));tab.addEventListener('keydown',e=>{let next=null;if(e.key==='ArrowRight')next=(index+1)%tabs.length;if(e.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==null){e.preventDefault();tabs[next].focus();activate(tabs[next])}})});
    const fromHash=()=>{const match=tabs.find(tab=>tab.dataset.tab===location.hash.slice(1));activate(match||tabs[0],false)};fromHash();addEventListener('popstate',fromHash);addEventListener('hashchange',fromHash);
  });

  qa('[href="#ready"]').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();toast(isEn?'This program is being prepared.':'해당 프로그램은 준비 중입니다.',1800)}));
  q('.top-btn')?.addEventListener('click',()=>{const start=scrollY,t0=performance.now(),tick=now=>{const p=Math.min(1,(now-t0)/500),swing=.5-Math.cos(p*Math.PI)/2;scrollTo(0,start*(1-swing));if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)});

  const track=q('.family-track'),viewport=q('.family-viewport');let familyIndex=0,familyTimer,startX=null;
  const visible=()=>innerWidth<480?1.5:innerWidth<600?2:innerWidth<1024?3:5;
  const moveFamily=step=>{if(!track||!viewport)return;const count=track.children.length,max=Math.max(0,count-Math.floor(visible()));familyIndex=(familyIndex+step+max+1)%(max+1);const gap=24,item=(viewport.clientWidth-gap*(visible()-1))/visible();track.style.transform=`translateX(${-familyIndex*(item+gap)}px)`};
  const restartFamily=()=>{clearInterval(familyTimer);familyTimer=setInterval(()=>moveFamily(1),3000)};
  q('.family-prev')?.addEventListener('click',()=>{moveFamily(-1);restartFamily()});q('.family-next')?.addEventListener('click',()=>{moveFamily(1);restartFamily()});
  viewport?.addEventListener('pointerdown',e=>{startX=e.clientX});viewport?.addEventListener('pointerup',e=>{if(startX===null)return;const dx=e.clientX-startX;startX=null;if(Math.abs(dx)>40){moveFamily(dx<0?1:-1);restartFamily()}});viewport?.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();moveFamily(e.key==='ArrowRight'?1:-1);restartFamily()}});
  if(track)restartFamily();addEventListener('resize',()=>moveFamily(0));

  qa('.detail-gallery').forEach(gallery=>initSlider(gallery,'.detail-gallery-slide','.detail-gallery-dot',3000));
  qa('.legend-item').forEach(item=>{const pick=()=>{const marker=q(`.map-marker[data-type="${item.dataset.type}"][data-num="${item.dataset.num}"]`);marker?.classList.add('is-hovered')},clear=()=>qa('.map-marker').forEach(x=>x.classList.remove('is-hovered'));item.addEventListener('mouseenter',pick);item.addEventListener('mouseleave',clear);item.addEventListener('focus',pick);item.addEventListener('blur',clear);item.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();q(`.map-marker[data-type="${item.dataset.type}"][data-num="${item.dataset.num}"] a`)?.click()}})});

  qa('.site-categories a').forEach(link=>link.addEventListener('click',()=>{qa('.site-categories a').forEach(x=>x.classList.toggle('active',x===link))}));
  qa('form[data-filter]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const term=(q('input',form)?.value||'').trim().toLocaleLowerCase(),targets=qa(form.dataset.filter),params=new URLSearchParams(location.search);if(term)params.set('q',term);else params.delete('q');history.pushState({q:term},'',`${location.pathname}${params.size?'?'+params:''}${location.hash}`);let shown=0;targets.forEach(item=>{const on=!term||item.textContent.toLocaleLowerCase().includes(term);item.hidden=!on;if(on)shown++});let empty=q('.search-empty');if(!empty){empty=document.createElement('div');empty.className='search-empty';empty.textContent=isEn?'No results found.':'검색 결과가 없습니다.';(targets[0]?.parentElement||form).append(empty)}empty.classList.toggle('show',shown===0)}));
  qa('form:not([data-filter])').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();toast(isEn?'Demo form submitted.':'포트폴리오 데모 폼이 접수되었습니다.')}));
})();
