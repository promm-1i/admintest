/* Static DOM ports of the captured clinic components. Source versions:
   GSAP/ScrollTrigger 3.14.2, Lenis 1.3.21; AOS provider uses duration 800,
   ease-in-out-cubic, once true, offset 80, delay 0. */
(() => {
  'use strict';
  const one = (s, root = document) => root.querySelector(s);
  const all = (s, root = document) => [...root.querySelectorAll(s)];
  const cls = part => `[class*="${part}"]`;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Custom-property URLs are resolved where the consuming stylesheet lives.
  // Resolve captured inline background variables against the page instead.
  all('[style]').forEach(element => {
    [...element.style].filter(name => name.startsWith('--')).forEach(name => {
      const value = element.style.getPropertyValue(name);
      if (!value.includes('url(')) return;
      element.style.setProperty(name, value.replace(/url\(\s*(["']?)(.*?)\1\s*\)/g, (_, quote, url) =>
        'url("' + new URL(url, document.baseURI).href + '")'));
    });
  });
  const viewportHeight=window.visualViewport?.height||innerHeight;
  document.documentElement.style.setProperty('--vh',(viewportHeight*.01)+'px');
  document.documentElement.style.setProperty('--vh-visible',(viewportHeight*.01)+'px');
  const g = window.gsap;
  const st = window.ScrollTrigger;
  if (g && st) g.registerPlugin(st);
  if (g && window.MotionPathPlugin) g.registerPlugin(window.MotionPathPlugin);
  const lenis = window.Lenis ? new Lenis({ autoRaf: true }) : null;
  window.clinicLenis = lenis;
  if (lenis && st) lenis.on('scroll', st.update);

  function scrollLock(locked) {
    document.documentElement.style.overflow = locked ? 'hidden' : '';
    document.body.style.overflow = locked ? 'hidden' : '';
    if (locked) lenis?.stop(); else lenis?.start();
  }
  const activate = (element, fn) => {
    element.addEventListener('click', fn);
    if (!element.matches('button,a,input,select,textarea')) {
      if(!element.hasAttribute('role'))element.setAttribute('role','button');
      element.tabIndex = 0;
      element.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault(); fn(event);
        }
      });
    }
  };

  function resetCapturedSwiper(root) {
    if(!root)return;
    const wrapper=one('.swiper-wrapper',root)||one(cls('EquipmentSection-module__DKVuNW__swiperWrapper'),root);
    if(!wrapper)return;
    const slides=[...wrapper.children].filter(e=>e.classList.contains('swiper-slide'));
    if(slides.length&&slides.every(e=>e.hasAttribute('data-swiper-slide-index'))){
      slides.sort((a,b)=>Number(a.dataset.swiperSlideIndex)-Number(b.dataset.swiperSlideIndex)).forEach(slide=>wrapper.append(slide));
    }
    wrapper.style.transform='none';wrapper.style.transitionDuration='0ms';
    slides.forEach(slide=>{
      ['width','height','opacity','transform','transition-duration','z-index'].forEach(property=>slide.style.removeProperty(property));
      slide.classList.remove('swiper-slide-active','swiper-slide-prev','swiper-slide-next','swiper-slide-visible','swiper-slide-fully-visible');
    });
  }

  function popupModal() {
    const modal = one(cls('PopupModal-module__ecw6GG__popupGroup'));
    if (!modal) return;
    resetCapturedSwiper(one('.swiper',modal));
    const opener = document.activeElement;
    let popupSlider;
    const close = () => {
      modal.hidden = true; modal.style.display = 'none';
      popupSlider?.destroy(true,true);
      opener?.focus?.();
    };
    if(document.cookie.split('; ').some(item=>item==='siyaretina_popup_group=done')){
      close(); return;
    }
    all('button,a,div,span', modal).filter(e => e.children.length === 0 && e.textContent.trim() === '닫기').forEach(e => activate(e, close));
    const daily = one(cls('PopupModal-module__ecw6GG__noDisplayButton'), modal);
    daily?.addEventListener('click', () => {
      document.cookie='siyaretina_popup_group=done; max-age=86400; path=/siyaretina/; SameSite=Lax'; close();
    });
    const tabs = all(cls('PopupModal-module__ecw6GG__remoteItem'), modal);
    const slides = all('.swiper-slide', modal);
    const wrapper=one('.swiper-wrapper',modal);
    if(wrapper){wrapper.style.transform='none';wrapper.style.display=window.SourceSwiper?'':'block';}
    const show=index=>{
      slides.forEach((slide,i)=>{
        slide.hidden=i!==index;slide.style.opacity=i===index?'1':'0';slide.style.transform='none';
        slide.style.position=i===index?'relative':'absolute';slide.style.width='100%';
        slide.style.pointerEvents=i===index?'auto':'none';
      });
    };
    tabs.forEach((tab,index) => activate(tab, () => {
      tabs.forEach((e,i) => { e.setAttribute('aria-pressed',String(i === index)); e.classList.toggle('clinic-tab-active',i === index); });
      if(popupSlider)popupSlider.slideToLoop(index);else show(index);
    }));
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-label','진료 소식');
    modal.setAttribute('aria-modal','true');modal.tabIndex=-1;modal.focus({preventScroll:true});
    modal.addEventListener('click', e => { if (e.target === modal || e.target.matches(cls('PopupModal-module__ecw6GG__overlay'))) close(); });
    one(cls('PopupModal-module__ecw6GG__closeButton'),modal)?.addEventListener('click',close);
    if(window.SourceSwiper){
      const {Swiper,Autoplay}=window.SourceSwiper;
      const root=one('.PopupModal-module__ecw6GG__swiper',modal);
      if(root)popupSlider=new Swiper(root,{modules:[Autoplay],spaceBetween:0,slidesPerView:1,loop:slides.length>1,autoplay:!reduce&&slides.length>1?{delay:7000,disableOnInteraction:false}:false,on:{slideChange(swiper){tabs.forEach((tab,i)=>{tab.classList.toggle('PopupModal-module__ecw6GG__active',i===swiper.realIndex);tab.setAttribute('aria-pressed',String(i===swiper.realIndex));});}}});
    }else show(0);
    modal.addEventListener('keydown', e => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') {
        const items=all('a[href],button,[tabindex="0"]',modal).filter(e=>e.offsetParent!==null);
        if (!items.length) return;
        if (e.shiftKey && document.activeElement===items[0]) {e.preventDefault();items.at(-1).focus();}
        else if (!e.shiftKey && document.activeElement===items.at(-1)) {e.preventDefault();items[0].focus();}
      }
    });
  }

  function headerMenu() {
    const button=one(cls('Header-module__VwvCqG__hamburger')),panel=one('#pc-megamenu'),header=one('header');
    if(!button||!panel)return;
    let full=false,hover=-1,backdrop=null;
    const links=all(cls('Header-module__VwvCqG__gnb')+' > li',header);
    const columns=all(cls('Header-module__VwvCqG__depth2Col'),panel);
    function render(){
      const open=innerWidth>1200&&(full||hover>=0);
      panel.hidden=!open;panel.inert=!open;panel.style.visibility=open?'visible':'hidden';panel.style.opacity=open?'1':'0';panel.style.pointerEvents=open?'auto':'none';
      panel.classList.toggle('Header-module__VwvCqG__active',open);
      button.setAttribute('aria-expanded',String(full));button.setAttribute('aria-label',full?'메뉴 닫기':'메뉴 열기');
      links.forEach((item,i)=>item.classList.toggle('Header-module__VwvCqG__gnbItemActive',i===hover));
      columns.forEach((item,i)=>item.classList.toggle('Header-module__VwvCqG__depth2ColActive',i===hover));
      if(full&&!backdrop){
        backdrop=document.createElement('div');backdrop.className='Header-module__VwvCqG__pcMenuBackdrop';backdrop.setAttribute('aria-hidden','true');header.before(backdrop);
        backdrop.addEventListener('click',()=>{full=false;hover=-1;render();});
      }else if(!full&&backdrop){backdrop.remove();backdrop=null;}
    }
    button.addEventListener('click',()=>{if(innerWidth>1200){full=!full;hover=-1;render();}});
    links.forEach((item,i)=>{item.addEventListener('mouseenter',()=>{hover=i;render();});item.addEventListener('focusin',()=>{hover=i;render();});});
    one(cls('Header-module__VwvCqG__gnbWrap'),header)?.addEventListener('mouseleave',()=>{hover=-1;render();});
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&(full||hover>=0)){full=false;hover=-1;render();button.focus();}});
    all('a',panel).forEach(link=>link.addEventListener('click',()=>{full=false;hover=-1;render();}));
    window.addEventListener('resize',()=>{if(innerWidth<=1200){full=false;hover=-1;render();}});
    render();
    let previous=scrollY,pending=false;
    window.addEventListener('scroll',()=>{
      if(pending)return;pending=true;
      requestAnimationFrame(()=>{
        const y=scrollY,diff=y-previous;
        if(y<200){header.classList.remove('Header-module__VwvCqG__hidden');previous=y;}
        else if(Math.abs(diff)>24){
          header.classList.toggle('Header-module__VwvCqG__hidden',diff>0);
          if(diff>0){full=false;hover=-1;render();}
          previous=y;
        }
        pending=false;
      });
    },{passive:true});
  }

  function sharedDialogs() {
    let current=null;
    let returnFocus=null;
    const stack=[];
    let agreements=[false,false];
    const close=()=>{
      current?.remove();
      if(stack.length){const previous=stack.pop();current=previous.element;current.hidden=false;returnFocus=previous.focus;previous.trigger?.focus?.();return;}
      current=null;scrollLock(false);
      const toggle=one(cls('Header-module__VwvCqG__hamburger'));toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','메뉴 열기');returnFocus?.focus?.();
    };
    function open(id,trigger,nested=false){
      if(current){
        if(nested){current.hidden=true;stack.push({element:current,focus:returnFocus,trigger});}
        else current.remove();
      }
      const template=document.getElementById(id);if(!template)return;
      const fragment=template.content.cloneNode(true);
      current=fragment.firstElementChild;
      returnFocus=trigger||document.activeElement;
      document.body.append(fragment);scrollLock(true);
      all('[class*="modalContent"]',current).forEach(region=>region.setAttribute("tabindex","0"));
      all('button[aria-label="닫기"]',current).forEach(button=>button.addEventListener('click',close));
      all('[class*="overlay"],[class*="Overlay"]',current).forEach(overlay=>overlay.addEventListener('click',close));
      current.addEventListener('keydown',event=>{
        if(event.key==='Escape'){close();return;}
        if(event.key==='Tab'){
          const items=all('input,select,textarea,button,a[href],[tabindex="0"]',current).filter(e=>e.offsetParent!==null);
          if(!items.length)return;
          if(event.shiftKey&&document.activeElement===items[0]){event.preventDefault();items.at(-1).focus();}
          else if(!event.shiftKey&&document.activeElement===items.at(-1)){event.preventDefault();items[0].focus();}
        }
      });
      const dialog=current;
      const errorClass='AuthModal-module__Z9lRPW__errorTxt';
      function validateAuth(form,fields=all('input',form)){
        let valid=true;
        fields.forEach(input=>{
          const value=input.value.trim(),name=input.name;
          const required={id:'아이디를 입력해주세요.',password:'비밀번호를 입력해주세요.',passwordConfirm:'비밀번호를 한번 더 입력해주세요.',name:'이름을 입력해주세요.',birth:'생년월일을 입력해주세요.',num:'전화번호를 입력해주세요.',hp:'전화번호를 입력해주세요.',email:'이메일을 입력해주세요.'};
          let message=value?'':required[name]||'입력 항목을 확인해주세요.';
          if(value&&['num','hp'].includes(name)&&!/^01[016789][0-9]{7,8}$/.test(value))message='올바른 전화번호를 입력해주세요.';
          if(value&&name==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))message='올바른 이메일 형식으로 입력해주세요.';
          if(value&&name==='password'&&id==='clinic-signup-step2'&&!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/.test(value))message='영문, 숫자, 특수문자를 포함해 8자리 이상 입력해주세요.';
          if(value&&name==='passwordConfirm'&&value!==one('input[name="password"]',form)?.value)message='비밀번호가 일치하지 않습니다.';
          const container=input.closest('[class*="inpCon"]')||input.parentElement;
          let error=one('.'+errorClass,container);
          input.setAttribute('aria-invalid',String(Boolean(message)));
          if(message){
            valid=false;
            if(!error){error=document.createElement('p');error.className=errorClass;error.id=(input.id||'clinic-auth-'+name)+'-error';container.append(error);}
            error.textContent=message;input.setAttribute('aria-describedby',error.id);
          }else{error?.remove();input.removeAttribute('aria-describedby');}
        });
        return valid;
      }
      all('form',dialog).forEach(form=>{
        form.noValidate=true;
        all('input',form).forEach(input=>input.addEventListener('input',()=>{
          if(['num','hp'].includes(input.name))input.value=input.value.replace(/[^0-9]/g,'');
          if(input.getAttribute('aria-invalid')==='true')validateAuth(form,[input]);
        }));
        form.addEventListener('submit',event=>{
          event.preventDefault();
          if(id==='clinic-modal-1'){if(agreements.every(Boolean))open('clinic-signup-step2',trigger);return;}
          if(!validateAuth(form)){one('[aria-invalid="true"]',form)?.focus();return;}
          if(id==='clinic-signup-step2'){alert('아이디 중복확인을 진행해주세요.');return;}
          alert(id==='clinic-modal-0'?'로그인에 실패했습니다.':'잠시 후 다시 시도해주세요.');
        });
      });
      all('button[type="button"]',dialog).filter(b=>b.textContent.trim()==='회원가입').forEach(b=>b.addEventListener('click',()=>{agreements=[false,false];open('clinic-modal-1',trigger);}));
      all('button',dialog).filter(b=>b.textContent.trim()==='아이디/비밀번호 찾기').forEach(b=>b.addEventListener('click',()=>open('clinic-find-id',trigger)));
      all('[data-find]',dialog).forEach(button=>button.addEventListener('click',()=>open('clinic-find-'+button.dataset.find,trigger)));
      all('[data-auth-back]',dialog).forEach(button=>button.addEventListener('click',()=>open('clinic-modal-1',trigger)));
      all('[data-duplicate]',dialog).forEach(button=>button.addEventListener('click',()=>{const input=one('input[name="'+button.dataset.duplicate+'"]',dialog);if(input&&validateAuth(input.form,[input]))alert('중복확인 중 오류가 발생했습니다.');}));
      if(id==='clinic-modal-1'){
        const checks=all('input[type="checkbox"]',dialog),next=one('button[type="submit"]',dialog);
        const update=()=>{checks.forEach((input,i)=>{input.checked=i===2?agreements.every(Boolean):agreements[i];});if(next)next.disabled=!agreements.every(Boolean);};
        checks.forEach((input,i)=>input.addEventListener('change',()=>{if(i===2)agreements=[input.checked,input.checked];else agreements[i]=input.checked;update();}));update();
        all('button',dialog).filter(b=>b.textContent.trim()==='전체보기').forEach((button,i)=>button.addEventListener('click',()=>open('clinic-modal-'+(i===0?3:2),button,true)));
      }
      one('input,button',current)?.focus();
      bindMobile(current);
    }
    all(cls('Header-module__VwvCqG__authLink')).forEach((button,index)=>button.addEventListener('click',()=>{agreements=[false,false];open('clinic-modal-'+index,button);}));
    all(cls('ReservationContent-module__tY_P1q__detailLink')).forEach(button=>button.addEventListener('click',event=>{event.preventDefault();open('clinic-modal-3',button);}));
    all(cls('Footer-module__3c4pDG__policyLink')).forEach((button,index)=>button.addEventListener('click',()=>open('clinic-modal-'+(index+2),button)));
    const hamburger=one(cls('Header-module__VwvCqG__hamburger'));
    hamburger?.addEventListener('click',()=>{
      if(innerWidth<=1200){hamburger.setAttribute('aria-expanded','true');hamburger.setAttribute('aria-controls','mobile-menu');open('clinic-mobile-menu',hamburger);}
    });
    function bindMobile(root){
      all(cls('Header-module__VwvCqG__mobileMenuClose'),root).forEach(button=>button.addEventListener('click',()=>{close();hamburger?.setAttribute('aria-expanded','false');}));
      all(cls('Header-module__VwvCqG__mobileMenuTrigger'),root).forEach(button=>button.addEventListener('click',()=>{
        const active=button.getAttribute('aria-expanded')!=='true';
        all(cls('Header-module__VwvCqG__mobileMenuTrigger'),root).forEach(trigger=>{
          const selected=trigger===button&&active;trigger.setAttribute('aria-expanded',String(selected));
          const item=trigger.closest('li');
          one(cls('Header-module__VwvCqG__mobileMenuLabelRow'),item)?.classList.toggle('Header-module__VwvCqG__mobileMenuLabelRowOn',selected);
          one(cls('Header-module__VwvCqG__mobileMenuActiveIcon'),item)?.classList.toggle('Header-module__VwvCqG__mobileMenuActiveIconOn',selected);
          one(cls('Header-module__VwvCqG__mobileMenuChevron'),item)?.classList.toggle('Header-module__VwvCqG__mobileMenuChevronOpen',selected);
          one(cls('Header-module__VwvCqG__mobileMenuSub'),item)?.classList.toggle('Header-module__VwvCqG__mobileMenuSubOpen',selected);
        });
      }));
      all('a[href]',root).forEach(a=>a.addEventListener('click',()=>{if(root.id==='mobile-menu')close();}));
    }
  }

  function checkList() {
    all(cls('CheckList-module__x0VOVq__card')).forEach(item=>{
      item.removeAttribute('role');item.removeAttribute('aria-checked');item.removeAttribute('tabindex');
      const control=document.createElement('button');control.type='button';
      control.className='clinic-check-control';control.setAttribute('role','checkbox');
      control.setAttribute('aria-label',item.textContent.trim());
      control.setAttribute('aria-checked',item.dataset.initialChecked==='true'?'true':'false');
      item.append(control);
      const render=()=>{
        const selected=control.getAttribute('aria-checked')==='true';
        item.classList.toggle('CheckList-module__x0VOVq__checked',selected);
        const icon=one(cls('CheckList-module__x0VOVq__checkIcon'),item);
        if(icon)icon.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" aria-hidden="true"><rect x=".5" y=".5" width="35" height="35" rx="7.5" fill="'+(selected?'#17685d':'white')+'" stroke="'+(selected?'#17685d':'#d1d6d5')+'"/>'+(selected?'<path d="m11 18 6 6 8-12" fill="none" stroke="white" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>':'')+'</svg>';
      };
      activate(control,()=>{control.setAttribute('aria-checked',String(control.getAttribute('aria-checked')!=='true'));render();});
      render();
    });
  }

  function tourGallery() {
    const gallery=one(cls('TourGallery-module__ELuxwW__gallery'));if(!gallery)return;
    const thumbs=all(cls('TourGallery-module__ELuxwW__thumbItem'),gallery),stage=one(cls('TourGallery-module__ELuxwW__mainImage'),gallery),list=one(cls('TourGallery-module__ELuxwW__thumbList'),gallery);
    if(!stage||!thumbs.length||!list)return;
    let index=-1;
    const english=['Entrance','Lobby','Lobby','Lobby','Reception','Consultation Room','Surgery Center','Surgery Center','Operating Room','Eye Examination Center','Examination Room','Patient Room'];
    function show(next){
      next=(next+thumbs.length)%thumbs.length;if(next===index)return;index=next;
      const image=one('img',thumbs[index]),main=one('img',stage);if(main&&image){main.src=image.src;main.removeAttribute('srcset');main.alt=image.alt+' 사진';}
      const korean=one(cls('TourGallery-module__ELuxwW__titleKr'),gallery),latin=one(cls('TourGallery-module__ELuxwW__titleEn'),gallery);
      if(korean)korean.textContent=image.alt;if(latin)latin.textContent=english[index]||'';
      thumbs.forEach((thumb,i)=>{thumb.setAttribute('aria-current',String(i===index));thumb.classList.toggle('TourGallery-module__ELuxwW__thumbActive',i===index);});
      all(cls('TourGallery-module__ELuxwW__pageCurrent'),gallery).forEach(number=>number.textContent=String(index+1).padStart(2,'0'));
      const fade=one(cls('TourGallery-module__ELuxwW__mainImageFade'),stage);if(fade){const copy=fade.cloneNode(true);fade.replaceWith(copy);}
      thumbs[index].scrollIntoView({block:'nearest',behavior:reduce?'auto':'smooth'});
    }
    const resize=()=>{list.style.maxHeight=stage.offsetHeight+'px';};resize();new ResizeObserver(resize).observe(stage);
    thumbs.forEach((thumb,i)=>thumb.addEventListener('click',()=>show(i)));
    all(cls('TourGallery-module__ELuxwW__arrowBtn'),gallery).forEach(button=>button.addEventListener('click',()=>show(index+(button.getAttribute('aria-label')?.includes('이전')?-1:1))));
    let target=list.scrollTop,frame=0,running=false;
    const tick=()=>{const difference=target-list.scrollTop;if(Math.abs(difference)<.5){list.scrollTop=target;running=false;return;}list.scrollTop+=difference*.15;frame=requestAnimationFrame(tick);};
    list.addEventListener('wheel',event=>{
      const max=list.scrollHeight-list.clientHeight;if(max<=0)return;
      const next=Math.max(0,Math.min(max,target+event.deltaY));
      if((target<=0&&event.deltaY<0)||(target>=max&&event.deltaY>0))return;
      event.preventDefault();event.stopPropagation();target=next;
      if(!running){running=true;frame=requestAnimationFrame(tick);}
    },{passive:false});
    show(0);
  }

  function heroSwiper() {
    const root=one(cls('HeroSwiper-module__m83WKW__root'));
    if(!root)return;
    resetCapturedSwiper(root);
    const track=one('.swiper-wrapper',root);
    const slides=all('.swiper-slide',root);
    if(!track||!slides.length)return;
    if(window.SourceSwiper){
      const {Swiper,Autoplay,EffectFade}=window.SourceSwiper;
      const shell=root.closest(cls('HeroSwiper-module__m83WKW__shell'))||root;
      const slider=new Swiper(root,{modules:[Autoplay,EffectFade],observer:false,observeParents:false,resizeObserver:false,effect:'fade',fadeEffect:{crossFade:true},autoplay:reduce?false:{delay:4000},loop:true,speed:1000,on:{slideChange(swiper){const counter=one(cls('HeroSwiper-module__m83WKW__indexCurrent'),shell);if(counter)counter.textContent=String(swiper.realIndex+1).padStart(2,'0');},autoplayTimeLeft(swiper,time,progress){const fill=one(cls('HeroSwiper-module__m83WKW__trackFill'),shell);if(fill)fill.style.width=Math.min(100,Math.max(0,100*(1-progress)))+'%';}}});
      slider.updateSlides();slider.updateProgress();slider.updateSlidesClasses();slider.setTranslate(slider.translate);
      all(cls('HeroSwiper-module__m83WKW__progressNav'),shell).forEach(button=>button.addEventListener('click',()=>button.getAttribute('aria-label')?.includes('이전')?slider.slidePrev():slider.slideNext()));
      return;
    }
    let index=0;
    let timer;
    const shell=root.closest(cls('HeroSwiper-module__m83WKW__shell')) || root;
    function show(next) {
      index=(next+slides.length)%slides.length;
      slides.forEach(s=>{s.style.width=root.clientWidth+'px';});
      if(g&&!reduce)g.to(track,{x:-index*root.clientWidth,duration:0.8,ease:'power2.inOut'});
      else track.style.transform=`translate3d(${-index*root.clientWidth}px,0,0)`;
      const counter=one(cls('HeroSwiper-module__m83WKW__indexCurrent'),shell);
      if(counter)counter.textContent=String(index+1).padStart(2,'0');
    }
    all(cls('HeroSwiper-module__m83WKW__progressNav'),shell).forEach(b=>b.addEventListener('click',()=>show(index+(b.getAttribute('aria-label')?.includes('이전')?-1:1))));
    const reset=()=>{clearInterval(timer);timer=setInterval(()=>{if(document.visibilityState==='visible')show(index+1);},6000);};
    root.addEventListener('pointerenter',()=>clearInterval(timer));
    root.addEventListener('pointerleave',reset);
    window.addEventListener('resize',()=>show(index));
    show(0);reset();
  }

  function localCarousels() {
    if(!window.SourceSwiper)return;
    const {Swiper,Autoplay,EffectFade}=window.SourceSwiper;
    all('main .swiper').filter(root=>!root.className.includes('HeroSwiper-module__m83WKW__root')).forEach(resetCapturedSwiper);
    const autoplay=delay=>reduce?false:{delay,disableOnInteraction:false,pauseOnMouseEnter:true};
    const observe=(root,slider,threshold=0)=>{
      slider.autoplay?.stop();
      new IntersectionObserver(entries=>entries.forEach(entry=>{
        if(entry.isIntersecting&&!reduce)slider.autoplay?.start();else slider.autoplay?.stop();
      }),{threshold}).observe(root);
    };
    const arrows=(box,slider,wrap=false)=>{
      let busy=false;
      const jump=index=>{
        if(busy)return;busy=true;slider.el.style.transition='opacity 350ms ease';slider.el.style.opacity='0';
        setTimeout(()=>{slider.slideTo(index,0);requestAnimationFrame(()=>{slider.el.style.opacity='1';setTimeout(()=>busy=false,350);});},350);
      };
      all('button[aria-label*=이전],button[aria-label*=다음]',box).forEach(button=>button.addEventListener('click',()=>{
        const previous=button.getAttribute('aria-label').includes('이전');
        if(wrap&&previous&&slider.isBeginning&&slider.realIndex===0)jump(slider.slides.length-1);
        else if(wrap&&!previous&&slider.isEnd)jump(0);
        else previous?slider.slidePrev():slider.slideNext();
      }));
      if(wrap)slider.on('touchEnd',swiper=>{const diff=swiper.touches.diff||0;if(swiper.isEnd&&diff<-30)jump(0);else if(swiper.isBeginning&&diff>30)jump(swiper.slides.length-1);});
    };
    const service=one(cls('ServiceCarouselSection-module__S9w5GW__section'));
    if(service){
      const root=one('.swiper',service);
      const update=swiper=>{
        swiper.slides.forEach((slide,i)=>{slide.classList.toggle('swiper-slide-left',i<swiper.activeIndex);slide.classList.toggle('swiper-slide-right',i>swiper.activeIndex);});
        all(cls('ServiceCarouselSection-module__S9w5GW__dot'),service).filter(e=>e.tagName==='BUTTON').forEach((dot,i)=>dot.classList.toggle('ServiceCarouselSection-module__S9w5GW__dotActive',i===swiper.realIndex%6));
      };
      const slider=new Swiper(root,{modules:[Autoplay],centeredSlides:true,slidesPerView:1,spaceBetween:0,loop:true,initialSlide:6,loopAdditionalSlides:6,speed:600,autoplay:autoplay(1500),on:{init:update,realIndexChange:update}});
      arrows(service,slider);
      all('button[aria-label^=슬라이드]',service).forEach((button,i)=>button.addEventListener('click',()=>slider.slideToLoop(i)));
    }
    const equipment=one(cls('EquipmentSection-module__DKVuNW__section'));
    if(equipment){
      const root=one('.swiper',equipment);
      const slider=new Swiper(root,{modules:[Autoplay,EffectFade],wrapperClass:'EquipmentSection-module__DKVuNW__swiperWrapper',effect:'fade',fadeEffect:{crossFade:true},speed:700,loop:true,autoplay:autoplay(1500),on:{slideChange(swiper){const count=one(cls('EquipmentSection-module__DKVuNW__pageCurrent'),equipment);if(count)count.textContent=String(swiper.realIndex+1).padStart(2,'0');}}});
      arrows(equipment,slider);observe(equipment,slider,.25);
    }
    const ports=[
      ['ImageCardSlider-module__Ic31-G__imageCardSlider','ImageCardSlider-module__Ic31-G__swiper',28,12,100,true],
      ['StepSlider-module__hjJSVa__stepSlider','StepSlider-module__hjJSVa__swiper',60,12,100,true],
      ['ProcessSlider-module__YLqWEG__processSlider','ProcessSlider-module__YLqWEG__swiper',80,16,60,false],
    ];
    ports.forEach(([boxClass,rootClass,gap,mobileGap,after,extend])=>all(cls(boxClass)).forEach(box=>{
      const root=one(cls(rootClass),box);if(!root)return;
      const update=swiper=>{
        const index=swiper.realIndex,count=swiper.slides.length;
        all('[class*=__current],[class*=__pageCurrent]',box).forEach(e=>e.textContent=String(index+1).padStart(2,'0'));
        all('[class*=__progress]',box).forEach(e=>e.style.width=(count>1?index/(count-1)*100:0)+'%');
        if(boxClass.startsWith('ImageCard'))all(cls('ImageCardSlider-module__Ic31-G__card'),box).forEach((card,i)=>{
          card.classList.toggle('ImageCardSlider-module__Ic31-G__active',i===index);card.classList.toggle('ImageCardSlider-module__Ic31-G__inactive',i!==index);
        });
      };
      const fit=swiper=>{if(extend&&innerWidth>=769&&swiper.slides[0]){swiper.params.slidesOffsetAfter=Math.max(0,swiper.el.clientWidth-swiper.slides[0].offsetWidth);swiper.update();}};
      const slider=new Swiper(root,{modules:[Autoplay],slidesPerView:'auto',spaceBetween:gap,speed:1000,autoplay:autoplay(1500),breakpoints:{0:{spaceBetween:mobileGap,slidesOffsetAfter:after},769:{spaceBetween:gap,slidesOffsetAfter:0}},on:{afterInit:fit,resize:fit,slideChange:update}});
      update(slider);arrows(box,slider,true);observe(root,slider);
    }));
    all(cls('OverlayCardGrid-module__mKUS7G__grid')).forEach(grid=>{
      const columns=[...grid.children],cards=all(cls('OverlayCardGrid-module__mKUS7G__card'),grid).filter(e=>e.classList.contains('OverlayCardGrid-module__mKUS7G__card')).sort((a,b)=>Number(a.style.getPropertyValue('--i'))-Number(b.style.getPropertyValue('--i')));
      const media=matchMedia('(max-width:768px)');let slider=null,outer=null;
      grid.classList.remove('OverlayCardGrid-module__mKUS7G__active');
      const reveal=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){grid.classList.add('OverlayCardGrid-module__mKUS7G__active');reveal.disconnect();}},{threshold:.15});reveal.observe(grid);
      const update=()=>{
        if(media.matches&&!slider){
          outer=document.createElement('div');outer.className='OverlayCardGrid-module__mKUS7G__slider';
          const root=document.createElement('div');root.className='swiper';const wrapper=document.createElement('div');wrapper.className='swiper-wrapper';
          cards.forEach(card=>{const slide=document.createElement('div');slide.className='swiper-slide OverlayCardGrid-module__mKUS7G__slide';slide.append(card);wrapper.append(slide);});
          root.append(wrapper);outer.append(root);grid.replaceWith(outer);slider=new Swiper(root,{slidesPerView:'auto',spaceBetween:12});
        }else if(!media.matches&&slider){
          slider.destroy(true,true);slider=null;
          cards.forEach((card,i)=>columns[i%2]?.append(card));outer.replaceWith(grid);outer=null;
        }
        st?.refresh();
      };media.addEventListener('change',update);update();
    });
    const options=one(cls('page-module__uxeRYq__optionGrid'));
    if(options){
      const cards=[...options.children],originalClass=options.className;
      const media=matchMedia('(max-width:1024px)');let slider=null;
      const update=()=>{
        if(media.matches&&!slider){
          const wrapper=document.createElement('div');wrapper.className='swiper-wrapper';
          cards.forEach(card=>{const slide=document.createElement('div');slide.className='swiper-slide page-module__uxeRYq__optionSlide';slide.append(card);wrapper.append(slide);});
          options.replaceChildren(wrapper);options.className='swiper page-module__uxeRYq__optionSlider';
          slider=new Swiper(options,{modules:[Autoplay],slidesPerView:'auto',spaceBetween:16,speed:1000,autoplay:reduce?false:{delay:3000,disableOnInteraction:false},grabCursor:true});observe(options,slider);
        }else if(!media.matches&&slider){slider.destroy(true,true);slider=null;options.className=originalClass;options.replaceChildren(...cards);}
        st?.refresh();
      };media.addEventListener('change',update);update();
    }
    const exam=one(cls('page-module__uxeRYq__examSlider'));
    if(exam){
      const root=one('.swiper',exam);
      const slides=all('.swiper-slide',root);
      const original=slides.map(slide=>({src:one('img',slide)?.getAttribute('src'),alt:one('img',slide)?.alt||'',title:one('[class*=__examCaptionTitle],[class*=__examFeaturedTitle]',slide)?.textContent||''}));
      const details={
        'r139.webp':['검사 결과 상담','검사 결과를 함께 살피고 치료 계획을 세웁니다.'],
        'r140.webp':['눈물량 확인 검사','쉬르머 검사로 5분 동안 생기는 눈물의 양을 측정합니다.'],
        'r141.webp':['눈물막 유지 시간','눈물막 파괴 시간을 재어 눈물막의 안정성을 살핍니다.'],
        'r142.webp':['마이봄샘 구조 관찰','마이보그래피 영상으로 샘의 모양과 손상 여부를 살핍니다.'],
        'r143.webp':['각막 표면 염색','형광 염색으로 각막 표면의 손상 정도를 확인합니다.'],
      };
      const content=slides.map((slide,i)=>{
        const item=original[i];const text=details[item.src?.split('/').at(-1)]||[item.title,'검사 결과에 따라 치료 방향을 정합니다.'];
        const side=document.createElement('div');side.className='page-module__uxeRYq__examSide';
        const thumb=document.createElement('div');thumb.className='page-module__uxeRYq__examThumb';
        const img=document.createElement('img');img.className='page-module__uxeRYq__examImg';img.src=item.src;img.alt=item.alt;img.loading='lazy';thumb.append(img);
        const caption=document.createElement('p');caption.className='page-module__uxeRYq__examCaptionTitle';caption.textContent=item.title||text[0];side.append(thumb,caption);
        const featured=document.createElement('div');featured.className='page-module__uxeRYq__examCard page-module__uxeRYq__examFeatured';
        featured.append(img.cloneNode());const overlay=document.createElement('div');overlay.className='page-module__uxeRYq__examOverlay';featured.append(overlay);
        const copy=document.createElement('div');copy.className='page-module__uxeRYq__examFeaturedText';const title=document.createElement('p');title.className='page-module__uxeRYq__examFeaturedTitle';title.textContent=caption.textContent;
        const desc=document.createElement('div');desc.className='page-module__uxeRYq__examFeaturedDesc';desc.textContent=text[1];copy.append(title,desc);featured.append(copy);
        slide.replaceChildren(side,featured);slide.style.transform='';return {side,featured};
      });
      const update=swiper=>{
        swiper.slides.forEach((slide,i)=>{const featured=one(cls('page-module__uxeRYq__examFeatured'),slide),side=one(cls('page-module__uxeRYq__examSide'),slide);const active=i===swiper.activeIndex;if(featured)featured.hidden=!active;if(side)side.hidden=active;});
        const index=swiper.realIndex%5;const current=one(cls('page-module__uxeRYq__examPagerCurrent'),exam),fill=one(cls('page-module__uxeRYq__examPagerFill'),exam);if(current)current.textContent=String(index+1).padStart(2,'0');if(fill)fill.style.width=index/4*100+'%';
      };
      const slider=new Swiper(root,{modules:[Autoplay],grabCursor:true,centeredSlides:true,slidesPerView:'auto',loop:true,loopAdditionalSlides:5,watchSlidesProgress:true,slideToClickedSlide:true,speed:1000,autoplay:reduce?false:{delay:3000,disableOnInteraction:false},on:{init:update,slideChange:update}});
      arrows(exam,slider);observe(root,slider);
      let running=false;
      const arrange=()=>{
        if(!running)return;
        const elements=[...slider.slides];elements.forEach(e=>{e.style.transform='';e.style.transformOrigin='';});
        const rect=root.getBoundingClientRect(),center=rect.left+rect.width*.5,width=elements[0]?.getBoundingClientRect().width||1;
        const thumb=one(cls('page-module__uxeRYq__examThumb'),root),step=(thumb?.getBoundingClientRect().width||385)*425/385;
        elements.forEach(e=>{const r=e.getBoundingClientRect(),distance=r.left+r.width*.5-center,d=distance/width;if(Math.abs(d)>3.5){e.style.transform=`translate3d(${Math.sign(d)*(rect.width+4*step)}px,0,0)`;return;}const power=Math.pow(Math.min(Math.abs(d),2.5),.585);e.style.transformOrigin='center center';e.style.transform=`translate3d(${d*step-distance}px,${.19*step*power}px,0) rotate(${4*Math.sign(d)*power}deg)`;});
        requestAnimationFrame(arrange);
      };
      new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting&&!running){running=true;requestAnimationFrame(arrange);}else if(!entry.isIntersecting)running=false;});}).observe(root);
    }
  }

  function stickyCards() {
    all(cls('StickyCardSection-module__j5PyXq__stickyLayout')).forEach(root=>{
      const track=one(cls('StickyCardSection-module__j5PyXq__stickyCards'),root);
      const cards=all(cls('StickyCardSection-module__j5PyXq__card'),track).filter(e=>e.classList.contains('StickyCardSection-module__j5PyXq__card'));
      const images=all(cls('StickyCardSection-module__j5PyXq__stickyImageItem'),root);
      const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
        entry.target.classList.toggle('StickyCardSection-module__j5PyXq__active',entry.isIntersecting);
        if(entry.isIntersecting){const index=cards.indexOf(entry.target);images.forEach((image,i)=>image.classList.toggle('StickyCardSection-module__j5PyXq__stickyImageActive',i===index));}
      }),{threshold:.6,rootMargin:'-10% 0px -30% 0px'});cards.forEach(card=>observer.observe(card));
      if(!track||reduce)return;
      let timer,index=0,resume;
      const stop=()=>{clearInterval(timer);timer=null;};
      const start=()=>{stop();if(innerWidth<=1024)timer=setInterval(()=>{index=(index+1)%cards.length;const card=cards[index];track.scrollTo({left:card.offsetLeft-track.offsetLeft,behavior:'smooth'});},1500);};
      const pause=()=>{stop();clearTimeout(resume);resume=setTimeout(start,5000);};
      new IntersectionObserver(([entry])=>entry.isIntersecting?start():stop(),{threshold:.3}).observe(track);
      track.addEventListener('touchstart',pause,{passive:true});track.addEventListener('scroll',pause,{passive:true});track.addEventListener('mouseenter',stop);track.addEventListener('mouseleave',start);
    });
  }

  function reservationForm() {
    const form=one(cls('ReservationContent-module__tY_P1q__form'));if(!form)return;
    const inputs=all('input:not([type="checkbox"])',form),select=one('select',form),agreements=all('input[type="checkbox"]',form);
    inputs.forEach(input=>input.setAttribute('aria-label',input.getAttribute('placeholder')||'입력 항목'));
    const phone=inputs.find(input=>input.type==='tel');
    phone?.addEventListener('input',()=>{phone.value=phone.value.replace(/\D/g,'').slice(0,11).replace(/(\d{3})(\d{3,4})(\d{4})/,'$1-$2-$3');});
    agreements.forEach(input=>{
      const render=()=>{const icon=one('svg',input.parentElement);if(!icon)return;icon.innerHTML='<rect x=".5" y=".5" width="19" height="19" rx="3.5" fill="'+(input.checked?'#17685d':'none')+'" stroke="'+(input.checked?'#17685d':'white')+'"/>'+(input.checked?'<path d="m5 10 3.5 3.5 6.5-7" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'');icon.setAttribute('viewBox','0 0 20 20');};
      input.addEventListener('change',render);render();
    });
    form.addEventListener('submit',event=>{
      event.preventDefault();
      if(!inputs[0]?.value.trim()){alert('성함을 입력해주세요.');inputs[0]?.focus();return;}
      if(!/^01[016789]-\d{3,4}-\d{4}$/.test(phone?.value||'')){alert('유효한 휴대폰 번호를 입력해주세요.');phone?.focus();return;}
      if(!select?.value){alert('진료항목을 선택해주세요.');select?.focus();return;}
      if(!agreements[1]?.checked){alert('개인정보 수집 및 이용에 동의해주세요.');agreements[1]?.focus();return;}
      alert('예약문의 접수에 실패했습니다.');
    });
  }

  function noticeSearch() {
    const bar=one(cls('SearchTopBar-module__gaT9Pa__topBar')),grid=one(cls('NoticeList-module__6RdPPa__grid'));
    if(!bar)return;
    const form=one('form',bar),input=one('input',bar),count=one(cls('SearchTopBar-module__gaT9Pa__totalCount')+' span',bar);
    input?.setAttribute('aria-label','게시글 검색어');
    if(!grid){form?.addEventListener('submit',event=>{event.preventDefault();if(count)count.textContent='0';});return;}
    const cards=[...grid.children],template=document.getElementById('clinic-notice-page2');
    if(template)cards.push(...template.content.cloneNode(true).children);
    const navigation=one(cls('Pagination-module__oDmVKG__pagination'));
    const numbers=navigation?all(cls('Pagination-module__oDmVKG__pageNum'),navigation).filter(e=>e.tagName==='BUTTON'):[];
    let current=1,query='',empty=null;
    const matches=()=>cards.filter(card=>card.textContent.toLowerCase().includes(query));
    function show(next=1,scroll=false){
      const filtered=matches(),pages=Math.max(1,Math.ceil(filtered.length/12));current=Math.max(1,Math.min(next,pages));
      grid.replaceChildren(...filtered.slice((current-1)*12,current*12));
      grid.hidden=filtered.length===0;
      if(count)count.textContent=String(filtered.length);
      if(!filtered.length&&!empty){
        empty=document.createElement('div');empty.className='EmptyState-module__bToI3q__empty';empty.setAttribute('role','status');
        empty.innerHTML='<span class="EmptyState-module__bToI3q__iconCircle" aria-hidden="true"><svg class="EmptyState-module__bToI3q__icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2"><rect x="7" y="5" width="18" height="22" rx="3"/><path d="M11 12h10M11 17h10M11 22h6"/></svg></span><p class="EmptyState-module__bToI3q__text">조건에 맞는 게시글이 없습니다.</p>';grid.before(empty);
      }else if(filtered.length&&empty){empty.remove();empty=null;}
      if(navigation){
        navigation.hidden=pages<=1;
        numbers.forEach((button,i)=>{button.hidden=i>=pages;button.classList.toggle('Pagination-module__oDmVKG__active',i+1===current);if(i+1===current)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');});
        all('button[aria-label]',navigation).forEach(button=>{const label=button.getAttribute('aria-label');button.disabled=label.includes('그룹')||label.includes('이전')&&current===1||label.includes('다음')&&current===pages;});
      }
      if(scroll){if(lenis)lenis.scrollTo(0);else window.scrollTo({top:0,behavior:reduce?'auto':'smooth'});}
    }
    form?.addEventListener('submit',event=>{event.preventDefault();query=(input?.value||'').trim().toLowerCase();show(1);});
    numbers.forEach((button,i)=>button.addEventListener('click',()=>show(i+1,true)));
    if(navigation)all('button[aria-label]',navigation).forEach(button=>button.addEventListener('click',()=>show(current+(button.getAttribute('aria-label').includes('이전')?-1:1),true)));
    // The initial twelve cards remain exactly the source's first page.
  }

  function tabsAndAccordions() {
    all('[role="tablist"]').forEach(list=>{
      const tabs=all('[role="tab"]',list);
      function select(tab){
        tabs.forEach(t=>{
          const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;
          const id=t.getAttribute('aria-controls');const panel=id?document.getElementById(id):null;
          if(panel){panel.hidden=!active;panel.style.display=active?'':'none';}
        });
      }
      tabs.forEach((tab,i)=>{
        tab.addEventListener('click',e=>{if(tab.getAttribute('aria-controls')){e.preventDefault();select(tab);}});
        tab.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const n=tabs[(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length];select(n);n.focus();}});
      });
    });
    all(cls('Accordion')+' [aria-expanded]').forEach(button=>activate(button,()=>{
      const open=button.getAttribute('aria-expanded')!=='true';
      button.setAttribute('aria-expanded',String(open));
      const panel=document.getElementById(button.getAttribute('aria-controls'));
      button.closest('.Accordion-module__p6dWSa__item')?.classList.toggle('Accordion-module__p6dWSa__on',open);
      if(panel){panel.hidden=false;panel.inert=!open;panel.setAttribute('aria-hidden',String(!open));}
    }));
  }

  function motions() {
    window.AOS?.init({duration:800,easing:'ease-in-out-cubic',once:true,offset:80,delay:0,disable:reduce});
    if(!g||!st)return;
    // Captures contain generated pin-spacer geometry. Remove the capture's
    // wrapper before ScrollTrigger establishes its own viewport-aware pin.
    all('.pin-spacer').forEach(wrapper=>{
      const child=wrapper.firstElementChild;
      if(child){wrapper.replaceWith(...wrapper.childNodes);g.set(child,{clearProps:'position,left,top,width,height,maxWidth,maxHeight,margin,padding,boxSizing,transform'});}
    });
    clinicVisionMotion();
    clinicStatementMotion();
    ourValueMotion();
    clinicIntroMotion();valueCurveMotion();donutCharts();visionCopyMotion();doctorMetricsMotion();statProgressMotion();
    const reveal=all('main [style]').filter(e=>e.style.opacity==='0' && !e.closest('.swiper,.StatProgress-module__ILkvdW__root,.VisionSection-module__EVsBVG__section,[data-aos],[class*="ClinicVisionSection"],[class*="ClinicStatementSection"],[class*="OurValueSection"],[class*="ClinicIntroSection"]') && !e.matches('img,svg,path'));
    reveal.forEach(element=>{
      if(reduce){g.set(element,{autoAlpha:1,clearProps:'transform'});return;}
      g.to(element,{autoAlpha:1,y:0,duration:0.8,ease:'power2.out',scrollTrigger:{trigger:element,start:'top 92%',once:true}});
    });
    all('img').forEach(img=>img.addEventListener('load',()=>st.refresh(),{once:true}));
    document.fonts.ready.then(()=>st.refresh());
    window.addEventListener('load',()=>{window.AOS?.refresh();st.refresh();});
  }


  // Port of reference chunk 0my2_b5u~pi~p.js, module6909.
  function statProgressMotion(){
    const root=one('.StatProgress-module__ILkvdW__root');if(!root||!g||!st)return;
    const C=name=>'.StatProgress-module__ILkvdW__'+name;
    const columns=all(C('column'),root),donut=one(C('donutNumber'),root),clock=one(C('clockNumber'),root);
    const image=one(C('donutImg'),root),wrap=one(C('progressWrap'),root),bar=one(C('progressbar'),root);
    if(reduce){if(donut)donut.textContent='85%';if(clock)clock.textContent='20\ubd84';return;}
    const animate=(timeline,index,img,ratio)=>{
      const start=1.2*ratio;
      if(index===0&&img){
        const state={p:0};timeline.to(state,{p:1,duration:.84,ease:'power2.out',onUpdate(){const degrees=360*state.p;const mask=`conic-gradient(from 0deg, black 0deg ${degrees}deg, transparent ${degrees}deg 360deg)`;img.style.maskImage=mask;img.style.webkitMaskImage=mask;if(donut)donut.textContent=Math.floor(85*state.p)+'%';},onComplete(){if(donut)donut.textContent='85%';}},start);
      }else if(index===1&&img){timeline.fromTo(img,{clipPath:'inset(100% 0 0 0)'},{clipPath:'inset(0% 0 0 0)',duration:.72,ease:'power2.out'},start);}
      else if(index===2&&clock){
        if(img)timeline.fromTo(img,{opacity:0},{opacity:1,duration:.6,ease:'power2.out'},start);
        timeline.fromTo(clock,{opacity:0},{opacity:1,duration:.6,ease:'power2.out'},start);
        const count={v:0};timeline.to(count,{v:20,duration:.84,ease:'power2.out',onUpdate(){clock.textContent=Math.floor(count.v)+'\ubd84';},onComplete(){clock.textContent='20\ubd84';}},start);
      }
    };
    const setup=mobile=>{
      const position=()=>{
        if(!mobile||!wrap)return;
        const dot=one(C('dot'),root);if(!dot)return;
        const bounds=root.getBoundingClientRect(),point=dot.getBoundingClientRect();
        g.set(wrap,{left:point.left+point.width/2-bounds.left-wrap.offsetWidth/2,top:0,height:bounds.height});
      };position();
      if(donut)donut.textContent='0%';if(clock)clock.textContent='0\ubd84';
      if(image){image.style.maskImage='conic-gradient(black 0deg, transparent 0deg)';image.style.webkitMaskImage=image.style.maskImage;}
      g.set(bar,mobile?{scaleX:1,scaleY:0,transformOrigin:'top center'}:{scaleX:0,scaleY:1,transformOrigin:'left center'});
      const timeline=g.timeline({scrollTrigger:{trigger:root,start:mobile?'top 85%':'top 80%',toggleActions:'play none none none'},defaults:{ease:'power2.out'}});
      if(bar)timeline.to(bar,mobile?{scaleY:1,duration:1.2,ease:'none'}:{scaleX:1,duration:1.2,ease:'none'},0);
      columns.forEach((column,index)=>{
        const graphic=one(C('graphic'),column),label=one(C('label'),column),dot=one(C('dot'),column),img=one(C('graphic')+' img',column);
        const parts=[graphic,label,dot].filter(Boolean);g.set(parts,{opacity:.25});
        let ratio=(index+.5)/columns.length;
        if(dot){const point=dot.getBoundingClientRect(),bounds=mobile?root.getBoundingClientRect():wrap?.getBoundingClientRect();if(bounds&&(mobile?bounds.height:bounds.width)>0)ratio=mobile?(point.top+point.height/2-bounds.top)/bounds.height:(point.left+point.width/2-bounds.left)/bounds.width;}
        ratio=Math.min(Math.max(ratio,0),1);timeline.to(parts,{opacity:1,duration:.48},1.2*ratio);animate(timeline,index,img,ratio);
      });
      if(mobile){window.addEventListener('resize',position);const observer=new ResizeObserver(position);observer.observe(root);return()=>{window.removeEventListener('resize',position);observer.disconnect();};}
    };
    const media=g.matchMedia();media.add('(min-width:769px)',()=>setup(false));media.add('(max-width:768px)',()=>setup(true));
  }

  function doctorMetricsMotion() {
    const root=one('.page-module__Lm0Pma__metrics');if(!root||!g||!st)return;
    all('.page-module__Lm0Pma__metricCount',root).forEach(element=>{
      const value=Number(element.dataset.value||0),initial=Number(element.dataset.from||0),state={v:initial};
      const render=()=>element.textContent=Math.round(state.v).toLocaleString('en-US');
      if(reduce){state.v=value;render();return;}
      render();g.to(state,{v:value,duration:1,ease:'steps(30)',scrollTrigger:{trigger:root,start:'top 80%',once:true},onUpdate:render});
    });
  }

  function visionCopyMotion() {
    const root=one('.VisionSection-module__EVsBVG__section');
    if(!root||!g||!st)return;
    const copy=one('.VisionSection-module__EVsBVG__copy',root);
    if(!copy)return;
    const blocks=[...copy.children],chars=all('[data-vision-char]',copy);
    const styles=getComputedStyle(document.documentElement);
    const accent=styles.getPropertyValue('--color-brand-mint-green-plus-300').trim()||'#c8eee7';
    if(reduce){g.set(blocks,{opacity:1,y:0});chars.forEach(char=>g.set(char,{color:char.hasAttribute('data-accent')?accent:'#fff'}));return;}
    g.set(blocks,{opacity:0,y:40});g.set(chars,{color:'rgba(255,255,255,.3)'});
    const timeline=g.timeline({scrollTrigger:{trigger:root,start:'top top',end:'bottom bottom',scrub:.3}});
    timeline.to({},{duration:.5}).to(blocks,{opacity:1,y:0,duration:1.5,stagger:.3,ease:'power2.out'},.5);
    chars.forEach((char,index)=>timeline.to(char,{color:char.hasAttribute('data-accent')?accent:'#fff',ease:'none'},2.5+.3*index));
    timeline.to({},{duration:1});
  }

  function clinicIntroMotion() {
    const root=one(cls('ClinicIntroSection-module__-Ei4Uq__section'));if(!root||!g||!st)return;
    const cards=all(cls('ClinicIntroSection-module__-Ei4Uq__card'),root).filter(e=>e.classList.contains('ClinicIntroSection-module__-Ei4Uq__card'));
    const path=one('.clinic-orbit-path',root),dots=all('.clinic-orbit-dot',root);
    if(!path)return;
    const resize=()=>{const svg=path.ownerSVGElement;if(!svg?.clientWidth||!svg.clientHeight)return;all('.clinic-orbit-scale',svg).forEach(dot=>dot.setAttribute('transform','scale('+(1100/svg.clientWidth)+','+(680/svg.clientHeight)+')'));};
    resize();window.addEventListener('resize',resize);window.addEventListener('load',resize);
    if(reduce){g.set([...cards,path,...dots],{autoAlpha:1,y:0});return;}
    g.set(cards,{autoAlpha:0,y:40});g.set([path,...dots],{autoAlpha:0});
    if(window.MotionPathPlugin)dots.forEach((dot,i)=>g.set(dot,{motionPath:{path,start:i*.5,end:i*.5,alignOrigin:[.5,.5]}}));
    const tl=g.timeline({scrollTrigger:{trigger:root,start:'top 80%',once:true},onComplete:()=>{
      if(window.MotionPathPlugin)dots.forEach((dot,i)=>g.to(dot,{duration:5,repeat:-1,ease:'none',motionPath:{path,start:i*.5,end:i*.5+1,alignOrigin:[.5,.5]}}));
    }});
    tl.to(cards,{autoAlpha:1,y:0,duration:.6,ease:'power2.out',stagger:.18}).to([path,...dots],{autoAlpha:1,duration:.4},'>-0.1');
    const tagline=one(cls('ClinicIntroSection-module__-Ei4Uq__tagline'),root),fills=all(cls('ClinicIntroSection-module__-Ei4Uq__taglineFill'),root);
    if(tagline&&fills.length){const mobile=innerWidth<=768;g.set(fills,{'--fill':'100%'});const fill=g.timeline({scrollTrigger:{trigger:tagline,start:mobile?'top 85%':'top 90%',end:mobile?'center 60%':'bottom 20%',scrub:mobile?.3:.6}});fill.to(fills[0],{'--fill':'0%',ease:'none'}).to(fills[1]||fills[0],{'--fill':'0%',ease:'none'});}
  }

  function valueCurveMotion() {
    const root=one(cls('ValueSection-module__bDn77G__section'));if(!root||!g||!st)return;
    const svg=one(cls('ValueSection-module__bDn77G__curve'),root),path=one('.clinic-value-line',root);if(!svg||!path)return;
    const reverse=one(cls('ValueSection-module__bDn77G__blockReverse'),root);
    const desktop='M2030 55C1810-25 1615 40 1505 160C1370 300 1380 590 955 700C620 780 445 720 355 605C260 485 275 325 445 310C680 285 875 735 650 1125C445 1485 25 1770-245 1830';
    const mobile='M660 5C615-17 565 5 535 31C504 59 503 137 403 163C321 184 280 169 258 142C235 116 236 74 278 70C334 65 385 172 331 267C281 355 218 418 0 418';
    const draw=(line,trigger,start,end,once=false)=>{
      const length=line.getTotalLength();line.style.strokeDasharray=String(length);line.style.strokeDashoffset=reduce?'0':String(length);
      if(!reduce)g.to(line,{strokeDashoffset:0,ease:'none',scrollTrigger:{trigger,start,end,scrub:.3,once,invalidateOnRefresh:true}});
    };
    const media=g.matchMedia();
    media.add('(min-width:769px)',()=>{svg.setAttribute('viewBox','0 0 1920 1843');path.setAttribute('d',desktop);path.setAttribute('stroke-width','25.2134');draw(path,root,'top 75%','bottom 85%');});
    media.add('(max-width:768px)',()=>{
      svg.setAttribute('viewBox','0 0 393 423');path.setAttribute('d',mobile);path.setAttribute('stroke-width','8');draw(path,root,'top 85%','top 10%',true);
      if(reverse){
        const wrapper=document.createElementNS('http://www.w3.org/2000/svg','svg');wrapper.setAttribute('viewBox','0 0 383.7 445.891');wrapper.setAttribute('class','ValueSection-module__bDn77G__retinaCurve');wrapper.setAttribute('aria-hidden','true');
        const second=document.createElementNS('http://www.w3.org/2000/svg','path');second.setAttribute('d','M2 14C37-9 95 9 125 63C166 136 152 218 175 307C209 440 335 468 381 419');second.setAttribute('fill','none');second.setAttribute('stroke','#478d80');second.setAttribute('stroke-width','8');wrapper.append(second);reverse.prepend(wrapper);
        draw(second,reverse,'top 85%','bottom 50%',true);return()=>wrapper.remove();
      }
    });
  }

  function donutCharts() {
    all(cls('DonutChart-module__ahQWwG__donutChart')).forEach(root=>{
      const rings=all(cls('DonutChart-module__ahQWwG__progress'),root);
      rings.forEach(ring=>{ring.dataset.finalOffset=ring.getAttribute('stroke-dashoffset');if(!reduce)ring.style.strokeDashoffset=String(2*Math.PI*Number(ring.getAttribute('r')));});
      if(reduce)return;
      const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){rings.forEach(ring=>ring.style.strokeDashoffset=ring.dataset.finalOffset);observer.disconnect();}},{threshold:.3});observer.observe(root);
    });
  }

  function clinicVisionMotion() {
    const root=one(cls('ClinicVisionSection-module__UFsyhq__section'));
    if(!root||!g||!st)return;
    const part=name=>one(cls('ClinicVisionSection-module__UFsyhq__'+name),root);
    const box=part('box'),line1=part('line1'),line2=part('line2'),outro=part('outro'),image=part('boxImg'),rule=part('rule'),standard=part('standard');
    if(!box||!line1||!line2||!outro||!image||!rule||!standard)return;
    if(reduce){g.set([box,line1,line2,outro,standard],{autoAlpha:1,clearProps:'transform'});return;}
    const lengths=innerWidth<=768?[320,320,320,960,960]:[480,480,480,960,1920];
    const total=lengths.reduce((sum,value)=>sum+value,0);
    const [a,d,u,h,f]=lengths.map(value=>value/total);
    g.set(box,{width:'0%',height:'0.10416666666666667%',autoAlpha:0});
    g.set(image,{autoAlpha:1});g.set(rule,{autoAlpha:1});
    g.set(line1,{yPercent:-50,top:'45.83333333333333%',autoAlpha:1});
    g.set(line2,{yPercent:-50,top:'54.16666666666666%',autoAlpha:1});
    g.set(outro,{autoAlpha:0});g.set(standard,{autoAlpha:0,y:64});
    const tl=g.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:root,start:'top top',end:'+='+total,pin:true,scrub:true,invalidateOnRefresh:true}});
    tl.to(box,{width:'30.20833333333333%',autoAlpha:1,duration:a},0);
    tl.to(box,{height:'33.33333333333333%',duration:d},a);
    tl.to(rule,{autoAlpha:0,duration:0.4*d},a);
    tl.to(line1,{top:'25%',duration:d},a);tl.to(line2,{top:'75%',duration:d},a);
    tl.to(box,{width:'62.5%',height:'71.04166666666667%',duration:u},a+d);
    tl.to(line1,{top:'6.25%',autoAlpha:0,duration:u},a+d);
    tl.to(line2,{top:'93.75%',autoAlpha:0,duration:u},a+d);
    const expand=a+d+u;
    tl.to(box,{width:'103.125%',height:'107.29166666666667%',duration:h},expand);
    tl.to(box,{'--overlay':0.6,duration:0.35*h},expand+0.65*h);
    tl.to(outro,{autoAlpha:1,duration:0.3*h},expand+0.7*h);
    const end=expand+h;
    tl.to(outro,{autoAlpha:0,duration:0.45*f},end);
    tl.to(standard,{autoAlpha:1,y:0,duration:0.6*f},end+0.35*f);
  }

  function clinicStatementMotion() {
    const root=one(cls('ClinicStatementSection-module__biTpNW__section'));
    if(!root||!g||!st)return;
    const symbol=one(cls('ClinicStatementSection-module__biTpNW__gifWrap'),root);
    const text=one(cls('ClinicStatementSection-module__biTpNW__contentText'),root);
    if(!symbol||!text)return;
    const paragraphs=all('p',text);
    if(reduce){g.set([symbol,text,...paragraphs],{opacity:1,clearProps:'transform'});return;}
    const media=g.matchMedia();
    media.add('(min-width:769px)',()=>{
      g.set(symbol,{xPercent:-50,yPercent:-50,x:0,y:0,opacity:0.16});
      g.set(text,{opacity:0});g.set(paragraphs,{opacity:0,y:40});
      const tl=g.timeline({scrollTrigger:{trigger:root,start:'top top',end:'+=200%',pin:true,scrub:0.5}});
      tl.to(symbol,{opacity:0.25,duration:3,ease:'none'});
      tl.to(symbol,{x:()=>-0.28*innerWidth,opacity:1,duration:3,ease:'power1.inOut'});
      tl.to(text,{opacity:1,duration:1.5,ease:'none'},'-=1.5');
      tl.to(paragraphs,{opacity:1,y:0,duration:3,stagger:1,ease:'none'},'-=1');
    });
    media.add('(max-width:768px)',()=>{
      g.set(symbol,{xPercent:-50,yPercent:-50,x:0,y:0,opacity:0.16});
      g.set(text,{opacity:0});g.set(paragraphs,{opacity:0,y:40});
      const tl=g.timeline({scrollTrigger:{trigger:root,start:'top 65%',toggleActions:'play none none none'}});
      tl.to(symbol,{opacity:0.25,duration:1,ease:'power1.inOut'});
      tl.to(text,{opacity:1,duration:0.6,ease:'power1.out'},0.5);
      tl.to(paragraphs,{opacity:1,y:0,duration:0.8,stagger:0.25,ease:'power2.out'},0.7);
    });
  }

  function ourValueMotion() {
    const root=one(cls('OurValueSection-module__OOgSCq__root'));
    if(!root||!g||!st)return;
    const inner=one(cls('OurValueSection-module__OOgSCq__inner'),root);
    const overlays=all(cls('OurValueSection-module__OOgSCq__layerOverlay'),root);
    if(!inner||overlays.length<2)return;
    if(reduce){g.set(overlays,{clearProps:'clipPath'});return;}
    g.matchMedia().add('(min-width:1025px)',()=>{
      const tl=g.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:root,start:'top top',end:'bottom bottom',pin:inner,scrub:0.3,invalidateOnRefresh:true}});
      tl.to({},{duration:0.5});
      tl.fromTo(overlays[0],{clipPath:'inset(0% 0% 0% 0%)'},{clipPath:'inset(50% 0% 50% 0%)',duration:1},0.3);
      tl.fromTo(overlays[1],{clipPath:'inset(50% 50% 50% 50%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:1},0.3);
      tl.to({},{duration:1});
    });
  }

  all('form').forEach(form=>form.addEventListener('submit',event=>{event.preventDefault();form.reportValidity();}));
  all(cls('QuickBar-module__3Fia2a__topLink')).forEach(button=>button.addEventListener('click',()=>lenis?lenis.scrollTo(0):window.scrollTo({top:0,behavior:reduce?'auto':'smooth'})));
  all('a[href^="#"]').forEach(a=>a.addEventListener('click',event=>{
    const id=a.getAttribute('href').slice(1);if(!id)return;
    const target=document.getElementById(id);if(target){event.preventDefault();lenis?lenis.scrollTo(target,{offset:-80}):target.scrollIntoView();}
  }));
  popupModal();headerMenu();sharedDialogs();checkList();tourGallery();heroSwiper();localCarousels();stickyCards();tabsAndAccordions();reservationForm();noticeSearch();motions();
})();
