
document.addEventListener('DOMContentLoaded',function(){
  function sync(){
    document.querySelectorAll('[aria-hidden]').forEach(function(el){
      el.inert=el.getAttribute('aria-hidden')==='true';
    });
    document.querySelectorAll('.slick-initialized').forEach(function(slider){
      slider.setAttribute('role','region');
      slider.setAttribute('aria-roledescription','carousel');
      if(!slider.hasAttribute('aria-label')) slider.setAttribute('aria-label','내용 슬라이더');
      slider.querySelectorAll('.slick-track').forEach(function(track){track.setAttribute('role','list');});
      slider.querySelectorAll('.slick-slide').forEach(function(slide){
        slide.setAttribute('role','listitem');
        const hidden=slide.getAttribute('aria-hidden')==='true';
        slide.inert=hidden;
        if(hidden) slide.setAttribute('tabindex','-1');
      });
    });
    document.querySelectorAll('.custom_paging[role="tablist"]>li').forEach(function(tab){
      const selected=tab.classList.contains('slick-active');
      tab.setAttribute('role','tab');
      tab.setAttribute('aria-selected',String(selected));
      tab.setAttribute('tabindex',selected?'0':'-1');
    });
  }
  sync();
  new MutationObserver(function(records){
    if(records.some(function(r){return r.attributeName==='aria-hidden';})) sync();
  }).observe(document.body,{subtree:true,attributes:true,attributeFilter:['aria-hidden']});
  window.addEventListener('load',sync);
  document.addEventListener('keydown',function(event){
    const tab=event.target;
    if(!tab.matches('.custom_paging[role="tablist"]>li')) return;
    const tabs=[...tab.parentElement.children];
    let index=tabs.indexOf(tab);
    if(event.key==='ArrowRight') index=(index+1)%tabs.length;
    else if(event.key==='ArrowLeft') index=(index+tabs.length-1)%tabs.length;
    else if(event.key==='Home') index=0;
    else if(event.key==='End') index=tabs.length-1;
    else if(event.key!=='Enter'&&event.key!==' ') return;
    event.preventDefault();tabs[index].click();tabs[index].focus();sync();
  });
});
