document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.wow,.fadeInUp,.fadeInDown,.fadeInLeft,.fadeInRight,[data-aos],.dmx:not(.solsaem-home-dim)').forEach(el=>{el.style.visibility='visible';el.style.opacity='1';el.style.transform='none';el.classList.add('animated')});
  if(window.gsap&&window.ScrollTrigger){
     gsap.registerPlugin(ScrollTrigger);
     const business=document.querySelector('.hm-bsnx'), businessBg=document.querySelector('.hm-bsnx-bk');
     if(business&&businessBg){
       const heading=businessBg.querySelector('h1'), label=heading?.querySelector('small'), image=businessBg.querySelector('.pic2'), dim=businessBg.querySelector('.solsaem-home-dim');
       const horizontal=document.querySelector('.hm-hrzx, .vrvx-hrzx');
       ScrollTrigger.create({trigger:business,pin:businessBg,scrub:1,start:'top top',endTrigger:horizontal||business,end:()=> 'bottom top-='+window.innerHeight,invalidateOnRefresh:true});
       if(heading)gsap.to([heading,label].filter(Boolean),{color:'#fff',scrollTrigger:{trigger:business,start:'top top',end:'300px top',scrub:1}});
       if(image&&dim){const timeline=gsap.timeline({scrollTrigger:{trigger:business,start:'top top',end:'100% top',scrub:1}});timeline.to(image,{width:'100%',top:'0',duration:.5}).to(dim,{opacity:1,duration:1});}
     }
     ScrollTrigger.matchMedia({'(min-width: 769px)':()=>{
       const horizontal=document.querySelector('.hm-hrzx, .vrvx-hrzx');
      if(horizontal){
        const tracks=horizontal.querySelectorAll('.trcx');
        const trackWidth=()=>Array.from(tracks).reduce((width,track)=>width+track.offsetWidth,0);
        gsap.defaults({ease:'none'});
        gsap.to(tracks,{x:()=>-trackWidth()+window.innerWidth,scrollTrigger:{trigger:horizontal,pin:true,scrub:1,start:'center center',end:()=>'+='+(horizontal.scrollWidth-window.innerWidth),onEnter:()=>horizontal.classList.add('on'),onLeaveBack:()=>horizontal.classList.remove('on'),invalidateOnRefresh:true}});
      }
    }});
  }
  document.querySelectorAll('.mnx-bd > li').forEach(li=>[li,...li.querySelectorAll('*')].forEach(el=>el.style.setProperty('color','#fff','important')));
  const header=document.querySelector('.site-header-area'), nav=document.querySelector('.site-navbar');
  const toggle=document.querySelector('.site-nav-toggle');
  if(toggle&&nav) toggle.addEventListener('click',()=>{toggle.classList.toggle('active');nav.classList.toggle('active');header?.classList.toggle('on');document.documentElement.classList.toggle('on');document.body.classList.toggle('on')});
  nav?.querySelectorAll('a[href]').forEach(link=>link.addEventListener('click',()=>{if(window.innerWidth<=900){nav.classList.remove('active');toggle?.classList.remove('active');header?.classList.remove('on');document.documentElement.classList.remove('on');document.body.classList.remove('on')}}));
  let last=window.scrollY;const updateHeader=()=>{const y=window.scrollY;if(header){header.classList.toggle('scrolled',y>20);if(Math.abs(y-last)>5){header.classList.toggle('up',y>last&&y>80);header.classList.toggle('down',y<last);if(y<5)header.classList.remove('down');last=y}}};window.addEventListener('scroll',updateHeader,{passive:true});updateHeader();
  nav?.querySelectorAll(':scope > li').forEach(item=>{item.addEventListener('mouseenter',()=>header?.classList.add('down'));item.addEventListener('mouseleave',()=>header?.classList.remove('down'))});
  document.querySelectorAll('.site-breadcrumb .breadcrumb-select > button').forEach(button=>button.addEventListener('click',event=>{event.stopPropagation();const item=button.parentElement;const open=!item.classList.contains('open');document.querySelectorAll('.site-breadcrumb .breadcrumb-select').forEach(other=>{other.classList.remove('open');other.querySelector('button')?.setAttribute('aria-expanded','false')});item.classList.toggle('open',open);button.setAttribute('aria-expanded',open?'true':'false')}));document.addEventListener('click',event=>{if(!event.target.closest('.site-breadcrumb'))document.querySelectorAll('.site-breadcrumb .breadcrumb-select').forEach(item=>{item.classList.remove('open');item.querySelector('button')?.setAttribute('aria-expanded','false')})});
  const quick=document.querySelector('.site-quick-menu');quick?.querySelectorAll('li').forEach((item,index,items)=>{if(index===items.length-2)item.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));if(index===items.length-1)item.addEventListener('click',()=>window.scrollTo({top:document.documentElement.scrollHeight,behavior:'smooth'}))});
  document.querySelectorAll('a[role="button"]').forEach(button=>button.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();button.click()}}));
  const bindHorizontalSwipe=(element,move)=>{
    if(!element)return;
    element.style.touchAction='pan-y';
    let startX=0,startY=0,tracking=false;
    element.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse'&&event.button!==0)return;startX=event.clientX;startY=event.clientY;tracking=true;try{element.setPointerCapture(event.pointerId)}catch(_){}});
    element.addEventListener('pointerup',event=>{if(!tracking)return;tracking=false;const dx=event.clientX-startX,dy=event.clientY-startY;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)*1.2)move(dx<0?1:-1)});
    element.addEventListener('pointercancel',()=>{tracking=false});
  };
  const heroSlider=document.querySelector('.hm-kv .swiper-container'), heroTrack=heroSlider?.querySelector('.swiper-wrapper');
  if(heroSlider&&heroTrack){
    const allSlides=[...heroTrack.children].filter(slide=>slide.classList.contains('swiper-slide'));
    const slides=[...new Map(allSlides.filter(slide=>!slide.classList.contains('swiper-slide-duplicate')).map(slide=>[Number(slide.dataset.swiperSlideIndex),slide])).entries()].sort((a,b)=>a[0]-b[0]).map(entry=>entry[1]);
    let slideIndex=Math.max(0,slides.findIndex(slide=>slide.classList.contains('swiper-slide-active')));
    const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const renderHeroSlide=()=>{
      const slideWidth=heroSlider.clientWidth;
      allSlides.forEach(slide=>{const active=slides[slideIndex]===slide;slide.style.display=slide.classList.contains('swiper-slide-duplicate')?'none':'flex';slide.style.width=slideWidth+'px';slide.style.flex='0 0 '+slideWidth+'px';slide.style.transform='none';slide.style.opacity=active?'1':'0';slide.setAttribute('aria-hidden',active?'false':'true');slide.classList.toggle('swiper-slide-active',active);slide.classList.toggle('swiper-slide-prev',slides[(slideIndex-1+slides.length)%slides.length]===slide);slide.classList.toggle('swiper-slide-next',slides[(slideIndex+1)%slides.length]===slide)});
      heroTrack.style.transition=reducedMotion?'none':'transform 500ms ease';heroTrack.style.transform='translate3d(-'+(slideIndex*slideWidth)+'px,0,0)';
      const live=heroSlider.querySelector('.swiper-notification');if(live)live.textContent='Slide '+(slideIndex+1)+' of '+slides.length;
    };
    const moveHeroSlide=step=>{slideIndex=(slideIndex+step+slides.length)%slides.length;renderHeroSlide()};
     heroSlider.querySelector('.swiper-button-next')?.addEventListener('click',()=>moveHeroSlide(1));
     heroSlider.querySelector('.swiper-button-prev')?.addEventListener('click',()=>moveHeroSlide(-1));
     bindHorizontalSwipe(heroSlider,moveHeroSlide);
     window.setInterval(()=>moveHeroSlide(1),5000);
     window.addEventListener('resize',renderHeroSlide);renderHeroSlide();
   }
  const caseSlider=document.querySelector('.hm-csx .myx-swpx'), caseTrack=caseSlider?.querySelector('.swiper-wrapper');
  if(caseSlider&&caseTrack){
    const caseSlides=[...caseTrack.children].filter(slide=>slide.classList.contains('swiper-slide'));
    const caseIndexes=[...new Set(caseSlides.map(slide=>Number(slide.dataset.swiperSlideIndex)))].sort((a,b)=>a-b);
    const caseCount=caseIndexes.length, caseStart=caseSlides.findIndex(slide=>!slide.classList.contains('swiper-slide-duplicate'));
    const initiallyActive=caseSlides.find(slide=>!slide.classList.contains('swiper-slide-duplicate')&&slide.classList.contains('swiper-slide-active'));
    let casePosition=caseStart+Math.max(0,caseIndexes.indexOf(Number(initiallyActive?.dataset.swiperSlideIndex)));
    let caseTimer;
    const caseProgress=caseSlider.parentElement?.querySelector('.swiper-pagination2 .swiper-pagination-progressbar-fill');
    const animateCaseProgress=()=>{
      if(!caseProgress)return;
      caseProgress.style.transition='none';caseProgress.style.transform='scaleX(0)';
      requestAnimationFrame(()=>{caseProgress.style.transition='transform 3000ms linear';caseProgress.style.transform='scaleX(1)'});
    };
    const caseLayout=()=>{
      const width=caseSlider.clientWidth;
      const perView=window.innerWidth>=1024?4:window.innerWidth>=768?2.5:1.5;
      const gap=window.innerWidth>=1024?50:window.innerWidth>=768?30:20;
      const slideWidth=(width-gap*(perView-1))/perView;
      const stride=slideWidth+gap;
      caseSlides.forEach((slide,index)=>{
        slide.style.width=slideWidth+'px';slide.style.flex='0 0 '+slideWidth+'px';slide.style.marginRight=gap+'px';
        slide.classList.toggle('swiper-slide-active',index===casePosition);
        slide.classList.toggle('swiper-slide-prev',index===casePosition-1);
        slide.classList.toggle('swiper-slide-next',index===casePosition+1);
        const left=(index-casePosition)*stride+(width-slideWidth)/2;
        slide.setAttribute('aria-hidden',left<width&&left+slideWidth>0?'false':'true');
      });
      caseTrack.style.transition='transform 1500ms ease';
      caseTrack.style.transform='translate3d('+(-(casePosition*stride+slideWidth/2-width/2))+'px,0,0)';
    };
    const moveCase=step=>{casePosition+=step;caseLayout()};
    caseTrack.addEventListener('transitionend',event=>{
      if(event.target!==caseTrack)return;
      if(casePosition>=caseStart+caseCount||casePosition<caseStart){
        casePosition=caseStart+((casePosition-caseStart)%caseCount+caseCount)%caseCount;
        caseTrack.style.transition='none';caseLayout();caseTrack.offsetHeight;
      }
    });
    const restartCaseAutoplay=()=>{window.clearInterval(caseTimer);animateCaseProgress();caseTimer=window.setInterval(()=>{moveCase(1);animateCaseProgress()},3000)};
    bindHorizontalSwipe(caseSlider,step=>{moveCase(step);restartCaseAutoplay()});
    window.addEventListener('resize',caseLayout);
    caseLayout();restartCaseAutoplay();
  }
  const projectCards=[...document.querySelectorAll('.csx .csx-ls .ls-wr ul.ls-cntx > li > .project-card-action[aria-haspopup="dialog"]')];
  let projectOverlay=document.querySelector('.pp-bk[role="presentation"]');
  if(!projectOverlay&&projectCards.length){
    projectOverlay=document.createElement('div');projectOverlay.className='pp-bk';projectOverlay.setAttribute('role','presentation');projectOverlay.setAttribute('aria-hidden','true');
    projectOverlay.innerHTML='<section class="pp01" role="dialog" aria-modal="true" aria-labelledby="case-dialog-title" tabindex="-1"><button class="pp-cls" type="button" aria-label="닫기"></button><div class="flxx" id="i-pp-bldx"><div class="bx"><div class="pic-cntx"><div class="th"><img data-case-photo alt=""></div></div></div><div class="bx right"><div class="bx-tt"><h4 data-case-category></h4><p id="case-dialog-title" data-case-title></p></div><div class="bx-nf"><dl><dt data-case-label="0"></dt><dd data-case-fact="0"></dd></dl><dl><dt data-case-label="1"></dt><dd data-case-fact="1"></dd></dl><dl><dt data-case-label="2"></dt><dd data-case-fact="2"></dd></dl><dl><dt data-case-label="3"></dt><dd data-case-fact="3"></dd></dl></div></div></div></section>';
    document.body.append(projectOverlay);
  }
  const projectDialog=projectOverlay?.querySelector('[role="dialog"]');
  const projectClose=projectOverlay?.querySelector('.pp-cls');
  let projectOpener=null, previousBodyOverflow='';
  const closeProject=()=>{
    if(!projectOverlay?.classList.contains('is-open'))return;
    projectOverlay.classList.remove('is-open');projectOverlay.setAttribute('aria-hidden','true');
    document.body.style.overflow=previousBodyOverflow;
    projectOpener?.focus();projectOpener=null;
  };
  const openProject=card=>{
    if(!projectOverlay||!projectDialog)return;
    const heading=card.querySelector('.tx-bx h3'), image=card.querySelector('.th img');
    const facts=[...card.querySelectorAll('.tx-bx > ul > li span')];
    if(!heading||!image)return;
    projectOpener=card;previousBodyOverflow=document.body.style.overflow;
    const category=projectDialog.querySelector('[data-case-category]');
    const title=projectDialog.querySelector('[data-case-title]');
    const photo=projectDialog.querySelector('[data-case-photo]');
    if(category)category.textContent=[...heading.childNodes].filter(node=>node.nodeType===Node.TEXT_NODE).map(node=>node.textContent.trim()).join(' ');
    if(title)title.textContent=heading.querySelector('em')?.textContent.trim()||heading.textContent.trim();
    if(photo){photo.src=image.getAttribute('src');photo.alt=image.alt||'';}
    const factLabels=['주용도','공사명','발주처','연면적'];
    projectDialog.querySelectorAll('[data-case-label]').forEach((field,index)=>{field.textContent=factLabels[index]||''});
    projectDialog.querySelectorAll('[data-case-fact]').forEach((field,index)=>{field.textContent=facts[index]?.textContent.trim()||''});
    projectOverlay.classList.add('is-open');projectOverlay.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';projectClose?.focus();
  };
  projectCards.forEach(card=>{
    card.addEventListener('click',event=>{const hit=event.target.closest('a,button,input,select,textarea');if(!hit||hit===card)openProject(card)});
    card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openProject(card)}});
  });
  projectClose?.addEventListener('click',closeProject);
  projectOverlay?.addEventListener('click',event=>{if(event.target===projectOverlay)closeProject()});
  document.addEventListener('keydown',event=>{
    if(!projectOverlay?.classList.contains('is-open'))return;
    if(event.key==='Escape'){event.preventDefault();closeProject();return;}
    if(event.key==='Tab'&&projectDialog){const focusable=[...projectDialog.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(el=>el.getClientRects().length);if(!focusable.length){event.preventDefault();projectDialog.focus();return;}const first=focusable[0],last=focusable[focusable.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}
  });
  const family=document.querySelector('.site-family-select'), familyToggle=family?.querySelector('.tggx');familyToggle?.addEventListener('click',event=>{event.preventDefault();family.classList.toggle('open');familyToggle.setAttribute('aria-expanded',family.classList.contains('open')?'true':'false')});
  document.querySelectorAll('#i-mlx-slx').forEach(select=>select.addEventListener('change',()=>{const address=select.closest('form')?.querySelector('[name="email_addr"]');if(address)address.value=select.value}));
  document.querySelectorAll('form[data-local-search="true"]').forEach(form=>form.addEventListener('submit',event=>{event.preventDefault();const query=(form.querySelector('[name="findWord"]')?.value||'').trim().toLocaleLowerCase();const mode=form.querySelector('[name="findType"]')?.value||'all';const selectors='.ls-gllx ul, .bbs-list, .notice-list, .srbx-ls table tbody';const list=form.parentElement.querySelector(selectors)||form.closest('.sec-ct')?.querySelector(selectors);const rows=list?[...list.children].filter(row=>!row.querySelector('th')):[];rows.forEach(row=>{const title=row.querySelector('.tt, h3, a')?.textContent||row.textContent||'';const content=row.querySelector('p')?.textContent||row.textContent||'';const source=mode==='b_subject'?title:mode==='b_content'?content:(title+' '+content);row.hidden=Boolean(query)&&!source.toLocaleLowerCase().includes(query)});form.dataset.searchCount=String(rows.filter(row=>!row.hidden).length)}));
  document.querySelectorAll('form[data-local-list="true"]').forEach(form=>form.addEventListener('submit',event=>event.preventDefault()));
  document.querySelectorAll('form[data-local-inquiry="true"]').forEach(form=>form.addEventListener('submit',event=>{event.preventDefault();let status=form.querySelector('[data-submit-status]');if(!status){status=document.createElement('p');status.dataset.submitStatus='true';status.setAttribute('role','status');status.setAttribute('aria-live','polite');form.append(status)}status.textContent='온라인 접수는 준비 중입니다. 문의는 010-4894-4905로 전화 주세요.'}));
});
// 11-18 Claude: 원본처럼 메뉴에 올리면 머리글이 흰 판으로(.hd-ar 와 .nv-bk 에 on)
document.addEventListener('DOMContentLoaded',()=>{
  const nav=document.querySelector('.site-navbar'),hd=document.querySelector('.site-header-area'),bg=document.querySelector('.nv-bk');
  if(!nav||!hd||!bg)return;
  const wide=window.matchMedia('(min-width: 1200px)');
  const open=()=>{if(wide.matches){hd.classList.add('on');bg.classList.add('on')}};
  const close=()=>{hd.classList.remove('on');bg.classList.remove('on')};
  nav.addEventListener('mouseenter',open);hd.addEventListener('mouseleave',close);
  nav.addEventListener('focusin',open);hd.addEventListener('focusout',e=>{if(!hd.contains(e.relatedTarget))close()});
});
