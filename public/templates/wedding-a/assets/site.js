/* wedding-a 공통 — 원본 common.js·ani.js 의 동작(옆 메뉴·모달·80% 등장·패럴랙스·커서)을 gsap 없이 */
(function(){
  var W = window, D = document, header = D.querySelector('header');
  var mob = function(){ return W.innerWidth <= 768; };
  // 옆 메뉴
  var menuBtn = D.querySelector('header .menu button');
  if (menuBtn) menuBtn.addEventListener('click', function(){ header.classList.toggle('open'); });
  D.querySelectorAll('aside .backdrop').forEach(function(b){ b.addEventListener('click', function(){ header.classList.remove('open'); }); });
  D.querySelectorAll('aside .gnb > li').forEach(function(li){
    li.addEventListener('mouseenter', function(){
      D.querySelectorAll('aside .gnb .img-box').forEach(function(i){ i.classList.remove('active'); });
      var im = li.querySelector('.img-box'); if (im) im.classList.add('active');
    });
    var dep2 = li.querySelector('.dep2-menu'), d1 = li.querySelector('.dep1 a');
    if (dep2 && d1) d1.addEventListener('click', function(e){
      if (!mob()) return;
      e.preventDefault();
      var open = li.classList.toggle('dep-open');
      li.parentNode.querySelectorAll('li').forEach(function(o){ if (o !== li) { o.classList.remove('dep-open'); var m = o.querySelector('.dep2-menu'); if (m) m.style.display = 'none'; } });
      dep2.style.display = open ? 'block' : 'none';
    });
  });
  // 모달
  W.modalOpen = function(id){
    var m = D.getElementById(id); if (!m) return;
    m.classList.add('active');
    if (!D.querySelector('.layer-back')) { var b = D.createElement('div'); b.className = 'layer-back'; D.body.appendChild(b); }
    if (id === 'inquiryModal') { m.querySelectorAll('.step-box').forEach(function(s, i){ s.classList.toggle('on', i === 0); }); }
  };
  W.modalClose = function(el){
    var m = el.closest('.layer-modal'); m.classList.remove('active');
    if (!D.querySelector('.layer-modal.active')) { var b = D.querySelector('.layer-back'); if (b) b.remove(); }
  };
  D.querySelectorAll('.layer-modal .close-btn').forEach(function(c){ c.addEventListener('click', function(e){ e.preventDefault(); modalClose(c); }); });
  D.addEventListener('click', function(e){ if (e.target.classList && e.target.classList.contains('layer-back')) D.querySelectorAll('.layer-modal.active .close-btn').forEach(function(c){ modalClose(c); }); });
  D.querySelectorAll('[data-modal]').forEach(function(a){ a.addEventListener('click', function(e){ e.preventDefault(); modalOpen(a.getAttribute('data-modal')); }); });
  W.moveTop = function(sel){ var t = sel ? D.querySelector(sel) : null; W.scrollTo({ top: t ? t.getBoundingClientRect().top + W.scrollY : 0, behavior: 'smooth' }); };
  // 문의 폼
  var f = D.querySelector('#inquiryModal form');
  if (f) {
    var submit = f.querySelector('.util .next');
    var check = function(){
      var ok = true;
      f.querySelectorAll('.form-box.required').forEach(function(b){
        var inp = b.querySelector('input[type=text],input[type=email]'), chks = b.querySelectorAll('input[type=checkbox]');
        var bad = inp ? !inp.value.trim() : (chks.length ? ![].some.call(chks, function(c){ return c.checked; }) : false);
        b.classList.toggle('unverified', bad && f.dataset.touched === '1'); if (bad) ok = false;
      });
      submit.classList.toggle('disabled', !ok); return ok;
    };
    f.addEventListener('input', function(){ f.dataset.touched = '1'; check(); });
    f.addEventListener('change', function(){ f.dataset.touched = '1'; check(); });
    submit.addEventListener('click', function(e){ e.preventDefault(); f.dataset.touched = '1'; if (!check()) return; var steps = f.querySelectorAll('.step-box'); steps[0].classList.remove('on'); steps[1].classList.add('on'); f.querySelectorAll('.indi .dot').forEach(function(d, i){ d.classList.toggle('active', i === 1); }); });
    check();
  }
  // 등장: 요소 위가 화면 80% 선 (원본 ScrollTrigger start "top 80%")
  var items = [].slice.call(D.querySelectorAll('[data-ani]'));
  var px = [].slice.call(D.querySelectorAll('.parallax-cont')).map(function(c){ return { el: c, box: c.parentNode }; });
  var reduce = W.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function tick(){
    var vh = W.innerHeight, y = W.scrollY;
    items = items.filter(function(it){ var r = it.getBoundingClientRect(); if (r.top <= vh * 0.8) { it.classList.add('ani-started'); return false; } return true; });
    if (!reduce) px.forEach(function(p){
      var r = p.box.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
      var diff = p.el.offsetHeight - p.box.offsetHeight; if (diff <= 0) return;
      var t = (vh - r.top) / (vh + r.height); t = Math.max(0, Math.min(1, t));
      p.el.style.transform = 'translate3d(0,' + (-diff * t).toFixed(1) + 'px,0)';
    });
    if (W.__onScroll) W.__onScroll(y, vh);
  }
  var raf = false;
  W.addEventListener('scroll', function(){ if (!raf) { raf = true; requestAnimationFrame(function(){ raf = false; tick(); }); } }, { passive: true });
  W.addEventListener('resize', tick);
  W.addEventListener('load', function(){ tick(); setTimeout(tick, 150); });
  tick();
  // 커서 (PC · .cursor-target 위에서만)
  var cur = D.getElementById('cursor');
  if (cur && W.matchMedia('(hover:hover)').matches && W.innerWidth > 768) {
    var cx = 0, cy = 0, tx = 0, ty = 0, run = false;
    D.addEventListener('mousemove', function(e){ tx = e.clientX; ty = e.clientY; if (!run) { run = true; requestAnimationFrame(move); } });
    function move(){ cx += (tx - cx) * 0.25; cy += (ty - cy) * 0.25; cur.style.left = cx + 'px'; cur.style.top = cy + 'px'; if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) requestAnimationFrame(move); else run = false; }
    D.querySelectorAll('.cursor-target').forEach(function(t){ t.addEventListener('mouseenter', function(){ cur.classList.add('on'); }); t.addEventListener('mouseleave', function(){ cur.classList.remove('on'); }); });
  } else if (cur) cur.remove();
})();
