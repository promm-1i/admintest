(function () {
  var ease = function (t) { return t < 0.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2; };
  function revealPreloader() {
    var overlays = document.querySelectorAll('.doo-msx-prlx');
    if (!overlays.length) return;
    if (window.jQuery && jQuery.fn && jQuery.fn.animate) {
      jQuery.easing.easeInOutCubic = function (x, t, b, c, d) { t /= d/2; if (t < 1) return c/2*t*t*t+b; t -= 2; return c/2*(t*t*t+2)+b; };
      jQuery(overlays).stop(true, true).animate({opacity: 0}, 1800, 'easeInOutCubic', function () { this.style.visibility = 'hidden'; });
    } else {
      overlays.forEach(function (el) { el.style.transition = 'opacity 1800ms cubic-bezier(.645,.045,.355,1)'; requestAnimationFrame(function () { el.style.opacity = '0'; }); setTimeout(function () { el.style.visibility = 'hidden'; }, 1800); });
    }
  }

  function startProgramScene() {
    var section = document.querySelector('.doo-prgx-sctx');
    if (!section || !window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    var title = section.querySelector('.doo-tp-tx-cntx .doo-tx2');
    var symbolWrap = section.querySelector('.doo-symx-cntx-wr');
    var symbolScene = section.querySelector('.doo-symx-cntx');
    var symbols = section.querySelector('.doo-symx-ls');
    var line = section.querySelector('.doo-symx-cntx .doo-rl');
    var dot = section.querySelector('.doo-symx-cntx .doo-pt');
    var doda = section.querySelector('.doo-ddx-cntx');
    var cards = section.querySelector('.doo-ddx-cntx .doo-ls-bx');
    var fill = section.querySelector('.doo-ddx-cntx .doo-fllx-tx span');
    var logoFill = section.querySelector('.doo-ddx-lg svg:last-child');
    ScrollTrigger.create({trigger: section, start: 'top center', endTrigger: document.querySelector('.doo-dr-pgx') || section, end: 'center bottom',
      onEnter: function () { document.body.classList.add('bg'); },
      onLeaveBack: function () { document.body.classList.remove('bg'); },
      onLeave: function () { document.body.classList.remove('bg'); },
      onEnterBack: function () { document.body.classList.add('bg'); }
    });
    gsap.fromTo(title, {letterSpacing: '4vw', opacity: 0}, {
      letterSpacing: '0px', opacity: 1, duration: 1.2, ease: 'power2.out',
      scrollTrigger: {trigger: title.parentElement, start: '10% center', toggleActions: 'play reverse play reverse'}
    });
    gsap.timeline({scrollTrigger: {
      trigger: symbolScene, start: window.innerWidth > 768 ? 'top-=100% top' : 'top-=80% top',
      endTrigger: symbolScene, end: 'bottom bottom', scrub: true
    }}).to(dot, {opacity: 1, duration: 0.1}).to(line, {height: window.innerWidth > 768 ? '75%' : '50%', ease: 'none'}, 0);
    ScrollTrigger.create({trigger: symbolWrap, start: 'top 15%', end: 'bottom top', toggleClass: {targets: symbols.children, className: 'active'}});
    gsap.matchMedia().add({desktop: '(min-width: 769px)', mobile: '(max-width: 768px)'}, function (context) {
      var pinLength = context.conditions.desktop ? '+=600%' : '+=200%';
      var tl = gsap.timeline({scrollTrigger: {trigger: symbolWrap, start: 'top top', end: pinLength, scrub: true, pin: true, pinSpacing: true, anticipatePin: 1}});
      tl.to(symbolScene, {opacity: 0}, '')
        .to(doda, {opacity: 1})
        .to(fill, {backgroundSize: '100% 100%', duration: 1, ease: 'none'})
        .to(logoFill, {clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'none'}, '<')
        .to(cards, {x: 0, duration: 2})
        .to(cards.querySelectorAll('.doo-it:nth-child(odd)'), {y: '-6rem', duration: 2}, '<')
        .to(cards.querySelectorAll('.doo-it:nth-child(even)'), {y: '6rem', duration: 2}, '<')
        .to(doda.querySelector(':scope > .doo-tx-bx'), {opacity: 0, duration: 2}, '<')
        .to({}, {duration: 1});
    });
    // Keep the program visible on browsers where ScrollTrigger's refresh is delayed.
    var syncProgramFrame = function () {
      var top = section.getBoundingClientRect().top + window.scrollY;
      var viewport = window.innerHeight || 900;
      var start = top - viewport * 0.5;
      var progress = Math.max(0, Math.min(1, (window.scrollY - start) / (viewport * (window.innerWidth > 768 ? 6 : 2))));
      var within = window.scrollY >= start && window.scrollY < top + viewport * (window.innerWidth > 768 ? 6 : 2);
      document.body.classList.toggle('bg', within);
      title.style.opacity = progress > 0.015 ? '1' : '0';
      title.style.letterSpacing = (4 * (1 - Math.min(1, progress * 8))) + 'vw';
      if (progress > 0.16) { line.style.height = window.innerWidth > 768 ? '75%' : '50%'; dot.style.opacity = '1'; }
      symbols.children[0].classList.toggle('active', progress > 0.16);
      symbols.children[1].classList.toggle('active', progress > 0.24);
      symbolScene.style.opacity = progress > 0.36 ? '0' : '1';
      doda.style.opacity = progress > 0.36 ? '1' : '0';
      if (progress > 0.43) { fill.style.backgroundSize = '100% 100%'; logoFill.style.clipPath = 'inset(0% 0% 0% 0%)'; }
      if (progress > 0.78) {
        cards.style.transform = 'translateX(0)';
        cards.querySelectorAll('.doo-it').forEach(function (card, index) { card.style.transform = index % 2 ? 'translateY(6rem)' : 'translateY(-6rem)'; });
      }
    };
    window.addEventListener('scroll', syncProgramFrame, {passive: true});
    syncProgramFrame();
  }
  function setup() {
    revealPreloader();
    if (document.readyState === 'complete') startProgramScene();
    else window.addEventListener('load', startProgramScene, {once: true});
    var activateQuickReservation = function () {
      window.setTimeout(function () {
        document.querySelector('.doo-rsrx-pgx .doo-qk-sctx')?.classList.add('active');
      }, 1000);
    };
    if (document.readyState === 'complete') activateQuickReservation();
    else window.addEventListener('load', activateQuickReservation, {once: true});
    document.querySelectorAll('.doo-mdlx, .doo-vrx-mdlx').forEach(function (el) { el.classList.add('doo-popup'); });
    var configs = {".doo-sb-pgx-tt": {"threshold": 0.5, "repeat": false}, ".doo-cmx-nqrx-sctx .doo-sb-tt": {"threshold": 0.5, "repeat": false}, ".doo-tp-sec .doo-tp-pic": {"threshold": 0.5, "repeat": false}, ".doo-cp-sec .doo-lg": {"threshold": 0.5, "repeat": false}, ".doo-cp-sec .doo-t1x": {"threshold": 0.5, "repeat": false}, ".doo-cp-sec .doo-t2x": {"threshold": 0.5, "repeat": false}, ".doo-dr-pgx .doo-tp-sec .doo-pic6": {"threshold": 0.5, "repeat": false}, ".doo-dctx-sec .doo-ls .doo-it": {"threshold": 0.15, "repeat": false}, ".doo-clnx-pgx .doo-ntrx-sctx .doo-chtx-cntx .doo-ls": {"threshold": 0.5, "repeat": false}, ".doo-clnx-pgx .doo-qpx-sctx": {"threshold": 0.5, "repeat": false}, ".doo-sb-ds": {"threshold": 0.5, "repeat": false}, ".doo-vtyx-sec .doo-ls .doo-it": {"threshold": 0.5, "repeat": false}, ".doo-vclx-pgx .doo-sl-cntx": {"threshold": 0.5, "repeat": false}, ".doo-sb-tt-bx": {"threshold": 0.5, "repeat": false}, ".doo-cmx-nqrx-sctx .doo-cntx": {"threshold": 0.5, "repeat": false}, ".doo-rsrx-pgx .doo-gtx-cntx .doo-cmx-nqrx-ls": {"threshold": 0.5, "repeat": false}, ".doo-nf-pgx .doo-tmx-sctx .doo-ls": {"threshold": 0.5, "repeat": false}, ".doo-nf-pgx .doo-dr-sctx .doo-ls": {"threshold": 0.5, "repeat": false}, ".doo-clnx-pgx .doo-grpx-sctx .doo-grpx-cntx": {"threshold": 0.5, "repeat": false}, ".doo-clnx-pgx .doo-wy-sctx": {"threshold": 0.5, "repeat": false}, ".doo-clnx-pgx .doo-wy-sctx .doo-sl-wr": {"threshold": 0.5, "repeat": false}, ".doo-tp-smmx": {"threshold": 0.5, "repeat": false}, ".doo-pstx-csx": {"threshold": 0.5, "repeat": false}, ".doo-clnx-pgx .doo-grpx-cntx": {"threshold": 0.5, "repeat": false}};
    configs['.doo-lctx-pgx .doo-lctx-sctx .doo-sb-tt'] = {threshold: 0.5, repeat: false};
    configs['.doo-lctx-pgx .doo-nf-sctx .doo-sb-tt'] = {threshold: 0.5, repeat: false};
    configs['.doo-sb-tt'] = {threshold: 0.5, repeat: false};
    configs['.doo-sb-cntx-tt.doo-anix'] = {threshold: 0.5, repeat: false};
    configs['.doo-fqx-sctx .doo-qnx-ls'] = {threshold: 0, repeat: false};  // 원본 ComContObserver('.faq_sect .qna_list', 0, false, true)
    if ('IntersectionObserver' in window) {
      Object.keys(configs).forEach(function (selector) {
        var cfg = configs[selector];
        try {
          var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) { entry.target.classList.add('active'); if (!cfg.repeat) io.unobserve(entry.target); }
              else if (cfg.repeat) entry.target.classList.remove('active');
            });
          }, { threshold: cfg.threshold });
          document.querySelectorAll(selector).forEach(function (el) { io.observe(el); });
        } catch (_) {}
      });
      // Match the source start points for the special feature list and keep its paired image in sync.
      document.querySelectorAll('.doo-cmx-spcx-sctx').forEach(function (section) {
        var items = section.querySelectorAll('.doo-rt-ar .doo-ls .doo-it');
        var imageBox = section.querySelector('.doo-lf-ar .doo-pic-bx');
        var images = imageBox ? imageBox.querySelectorAll('img') : [];
        var line = section.querySelector('.doo-rt-ar .doo-rl, .doo-cntx .doo-rl');
        var list = section.querySelector('.doo-rt-ar .doo-ls');
        function setActive(index) {
          items.forEach(function (item, i) { item.classList.toggle('active', i === index); });
          if (imageBox) {
            imageBox.className = imageBox.className.replace(/\bindex\d+\b/g, '').trim();
            if (index >= 0) imageBox.classList.add('index' + (index + 1));
          }
          images.forEach(function (img, i) { img.classList.toggle('active', i === index); });
        }
        function syncSpecialScene() {
          if (window.innerWidth < 768 || !items.length) return;
          var triggerY = window.innerHeight * 0.7;
          var index = 0;
          items.forEach(function (item, i) {
            if (item.getBoundingClientRect().top <= triggerY) index = i;
          });
          setActive(index);
          if (line && list) {
            var rect = list.getBoundingClientRect();
            var progress = Math.max(0, Math.min(1, (window.innerHeight * 0.5 - rect.top) / Math.max(1, rect.height)));
            line.style.height = (progress * 100) + '%';
          }
        }
        window.addEventListener('scroll', syncSpecialScene, {passive: true});
        window.addEventListener('resize', syncSpecialScene);
        syncSpecialScene();
      });
      // Enable equipment carousels only while their section is in view, as on the source site.
      document.querySelectorAll('.doo-qpx-sctx').forEach(function (section) {
        var slider = section.querySelector('.swiper-container');
        if (!slider || !window.Swiper) return;
        var swiper = slider.swiper;
        if (!swiper) {
          swiper = new Swiper(slider, { slidesPerView: 1.1, spaceBetween: 20, loop: true, speed: 1000, autoplay: { delay: 3000, disableOnInteraction: false }, breakpoints: { 2000: { slidesPerView: 1.4, spaceBetween: 80 }, 1640: { slidesPerView: 1.1, spaceBetween: 60 }, 1240: { slidesPerView: 1.1, spaceBetween: 30 }, 768: { slidesPerView: 1.6, spaceBetween: 40 } }, on: { slideChange: function () { var tabs = section.querySelectorAll('.doo-tb'); var currentIndex = this.realIndex; tabs.forEach(function (tab, i) { tab.classList.toggle('active', i === currentIndex); }); } } });
          var tabs = section.querySelectorAll('.doo-tb');
          tabs.forEach(function (tab, i) { tab.addEventListener('click', function () { swiper.slideToLoop(i); }); });
        }
        var io = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (!swiper.autoplay) return; if (entry.isIntersecting) swiper.autoplay.start(); else swiper.autoplay.stop(); }); }, {threshold: .2});
        io.observe(section);
      });
      // Clinic media and disease carousels are part of the shared clinic template.
      // Without these Swipers, slides keep their intrinsic width and spill across
      // the page, which also distorts the measured document height.
      document.querySelectorAll('.doo-wy-sctx').forEach(function (section) {
        var slider = section.querySelector('.swiper-container');
        if (!slider || !window.Swiper || slider.swiper) return;
        new Swiper(slider, {
          slidesPerView: 1.2, spaceBetween: 15, loop: true, speed: 1000, loopedSlides: 6,
          autoplay: {delay: 3000, disableOnInteraction: false},
          navigation: {
            nextEl: section.querySelector('.swiper_btn.next'),
            prevEl: section.querySelector('.swiper_btn.prev')
          },
          pagination: {el: section.querySelector('.swiper-pagination'), type: 'progressbar'},
          breakpoints: {
            2580: {slidesPerView: 2.2, spaceBetween: 50},
            1240: {slidesPerView: 1.8, spaceBetween: 30},
            768: {slidesPerView: 2.2, spaceBetween: 25},
            600: {slidesPerView: 1.8, spaceBetween: 20}
          },
          on: {slideChange: function () {
            var current = section.querySelector('.paging .current');
            if (current) current.textContent = String(this.realIndex + 1);
          }}
        });
      });
      document.querySelectorAll('.doo-dssx-sctx').forEach(function (section) {
        var slider = section.querySelector('.swiper-container');
        if (!slider || !window.Swiper || slider.swiper) return;
        var mobile = window.innerWidth <= 768;
        new Swiper(slider, {
          slidesPerView: 3, spaceBetween: 15, speed: mobile ? 500 : 1500,
          centeredSlides: true,
          autoplay: mobile ? false : {delay: 2000, disableOnInteraction: false},
          loop: true, observer: true, observeParents: true,
          pagination: {el: section.querySelector('.slide_cont .paging'), type: 'progressbar'},
          breakpoints: {
            2000: {slidesPerView: 4, spaceBetween: 50},
            1440: {spaceBetween: 30}, 1240: {spaceBetween: 25}, 600: {spaceBetween: 20}
          }
        });
      });
    } else {
      document.querySelectorAll('.doo-wwx, '+Object.keys(configs).join(',')).forEach(function (el) { el.classList.add('active'); el.style.visibility = 'visible'; });
      document.querySelectorAll('.doo-cmx-spcx-sctx .doo-rt-ar .doo-ls .doo-it').forEach(function (el) { el.classList.add('active'); });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup); else setup();
})();

// Home page scroll scenes mirror the source site's pinned philosophy sequence.
(function () {
  function startHomeScrollScenes() {
    if (!document.querySelector('.doo-hm') || !window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    var introText = document.querySelector('.doo-ntrx-sctx .doo-fllx-tx span');
    if (introText) {
      gsap.to(introText, { backgroundSize: '100% 100%', ease: 'none', scrollTrigger: {
        trigger: '.doo-ntrx-sctx .doo-fllx-tx', start: 'top 80%', end: 'center 40%', scrub: true
      }});
    }
    ScrollTrigger.matchMedia({
      '(min-width: 1240px)': function () {
        var intro = document.querySelector('.doo-ntrx-sctx');
        if (intro) ScrollTrigger.create({trigger: intro, start: 'top top', end: '+=300%', pin: true, anticipatePin: 1, pinSpacing: false});
        var philosophy = document.querySelector('.doo-phlx-sctx');
        if (!philosophy) return;
        var tl = gsap.timeline({scrollTrigger: {trigger: philosophy, start: 'top top', end: '+=500%', scrub: 5, pin: true, anticipatePin: 1, pinSpacing: true}});
        tl.addLabel('step0', '+=0.5');
        tl.to('.doo-phlx-sctx .left', {y: '-66.66%', ease: 'none', duration: 2}, 'step0');
        tl.to('.doo-phlx-sctx .right', {y: '66.66%', ease: 'none', duration: 2}, 'step0');
        tl.addLabel('step1', '+=2');
        tl.to('.doo-phlx-sctx .left', {y: '-33.33%', ease: 'none', duration: 2}, 'step1');
        tl.to('.doo-phlx-sctx .right', {y: '33.33%', ease: 'none', duration: 2}, 'step1');
        tl.addLabel('step2', '+=2');
        tl.to('.doo-phlx-sctx .left', {y: '0%', ease: 'none', duration: 2}, 'step2');
        tl.to('.doo-phlx-sctx .right', {y: '0%', ease: 'none', duration: 2}, 'step2');
        tl.to({}, {duration: 5});
      }
    });
    var list = document.querySelector('.doo-vlx-sctx .doo-ls');
    var line = document.querySelector('.doo-vlx-sctx .doo-rl');
    if (list && line) gsap.fromTo(line, {height: 0}, {height: '100%', ease: 'none', scrollTrigger: {
      trigger: '.doo-vlx-sctx .doo-cntx', start: 'top center', end: 'bottom center', scrub: true
    }});
    document.querySelectorAll('.doo-vlx-sctx .doo-ls .doo-it').forEach(function (item, i) {
      gsap.fromTo(item, {opacity: 0, x: i % 2 ? 50 : -50, y: 50}, {opacity: 1, x: 0, y: 0, scrollTrigger: {
        trigger: item, start: 'top 80%', end: 'bottom center', scrub: true
      }});
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startHomeScrollScenes);
  else startHomeScrollScenes();
})();

// Keep the home consultation bar within the first-view campaign section.
(function () {
  function bindHomeConsultationBar() {
    var home = document.body.classList.contains('doo-hm') ? document.body : document.querySelector('.doo-hm');
    var hero = home && home.querySelector('.doo-kv-sctx');
    var form = home && home.querySelector('.doo-fx-fm');
    if (!hero || !form) return;
    var update = function () {
      form.classList.toggle('hide', hero.getBoundingClientRect().bottom <= 0);
    };
    window.addEventListener('scroll', update, {passive: true});
    window.addEventListener('resize', update);
    update();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindHomeConsultationBar);
  else bindHomeConsultationBar();
})();

// Brand story: pin the visual promise and reveal the slogan mask on scroll.
(function () {
  function startBrandScrollScenes() {
    var root = document.querySelector('.doo-sto-pgx');
    document.querySelectorAll('.doo-dox-crx-sctx .doo-cntx, .doo-lg-sctx').forEach(function (section) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('active');
          var title = entry.target.querySelector('.doo-sb-pgx-tt');
          if (title) title.classList.add('active');
          io.unobserve(entry.target);
        });
      }, {threshold: 0.15});
      io.observe(section);
    });
    document.querySelectorAll('.doo-sto-rlx-sctx').forEach(function (section) {
      var reveal = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          section.classList.add('active');
          reveal.unobserve(section);
        });
      }, {threshold: 0.05});
      reveal.observe(section);
      var slider = section.querySelector('.doo-rlx-sl .swiper');
      if (slider && window.Swiper && !slider.swiper) {
        new Swiper(slider, {
          loop: true, slidesPerView: 1.2, spaceBetween: 20, speed: 1000, autoHeight: true,
          navigation: {nextEl: '.doo-sto-rlx-sctx .doo-nxtx', prevEl: '.doo-sto-rlx-sctx .doo-prvx'},
          breakpoints: {620: {slidesPerView: 1.5, spaceBetween: 30}, 768: {slidesPerView: 2, spaceBetween: 30}, 1240: {slidesPerView: 3, spaceBetween: 30}}
        });
      }
    });
    document.querySelectorAll('.doo-sto-phlx-sctx').forEach(function (section) {
      var boxes = section.querySelectorAll('.doo-phlx-tx .doo-tx-bx');
      var images = section.querySelectorAll('.doo-phlx-pic .doo-pic2');
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var index = Array.prototype.indexOf.call(boxes, entry.target);
          boxes.forEach(function (box, i) { box.classList.toggle('active', i === index); });
          images.forEach(function (img, i) { img.classList.toggle('active', i === index); });
        });
      }, {rootMargin: '-35% 0px -35% 0px', threshold: 0});
      boxes.forEach(function (box) { io.observe(box); });
      var sectionIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          section.classList.add('active');
          sectionIO.unobserve(section);
        });
      }, {threshold: 0.05});
      sectionIO.observe(section);
    });
    if (!root || !window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    var visual = root.querySelector('.doo-kv-sctx');
    if (visual) {
      var duration = window.innerWidth > 768 ? '+=370%' : '+=200%';
      ScrollTrigger.create({trigger: visual, start: 'top top', end: duration, pin: true, anticipatePin: 1});
      var tl = gsap.timeline({scrollTrigger: {trigger: visual, start: 'top top', end: duration, scrub: true}});
      tl.to('.doo-sto-pgx .doo-cntx2 .doo-cp', {width: '100%', duration: 0.8})
        .to('.doo-sto-pgx .doo-cntx3', {opacity: 1, duration: 0.3})
        .to('.doo-sto-pgx .doo-cntx3 .doo-tt01 .doo-cp', {width: '100%', duration: 0.6})
        .to('.doo-sto-pgx .doo-cntx3 .doo-tt02 .doo-cp', {width: '100%', duration: 0.6})
        .to('.doo-sto-pgx .doo-cntx3 .doo-tt03 .doo-cp', {width: '100%', duration: 0.6})
        .to('.doo-sto-pgx .doo-cntx3 .doo-tt04 .doo-cp', {width: '100%', duration: 0.6})
        .to('.doo-sto-pgx .doo-cntx4', {opacity: 1, duration: 0.3})
        .to('.doo-sto-pgx .doo-cntx4 .doo-tt01 .doo-cp', {width: '100%', duration: 0.6})
        .to('.doo-sto-pgx .doo-cntx4 .doo-tt02 .doo-cp', {width: '100%', duration: 0.6});
    }
    var slogan = root.querySelector('.doo-slgx-sctx');
    if (!slogan) return;
    var responsiveWidth = function () {
      if (window.innerWidth <= 620) return '80vw';
      if (window.innerWidth <= 768) return '60vw';
      if (window.innerWidth <= 1240) return '42vw';
      return '30vw';
    };
    var responsiveX = function () { return (window.innerWidth - window.innerWidth * parseFloat(responsiveWidth()) / 100) / 2; };
    var end = '+=550%';
    ScrollTrigger.create({trigger: slogan, start: 'top top', end: end, pin: true});
    gsap.timeline({scrollTrigger: {trigger: slogan, start: 'top top', end: end, scrub: true}})
      .to('.doo-slgx-sctx .doo-tt-cntx .doo-pic-bx', {width: responsiveWidth, duration: 0.3})
      .to('.doo-slgx-sctx .intro_mask rect', {width: responsiveWidth, x: responsiveX, y: function () { return window.innerHeight / 2; }, duration: 0.3}, '<')
      .to('.doo-slgx-sctx .doo-tt-cntx .doo-pic-bx', {borderColor: 'transparent', duration: 0})
      .to('.doo-slgx-sctx .doo-tt-cntx .doo-pic-bx', {paddingTop: '30vh', duration: 0.3})
      .to('.doo-slgx-sctx .intro_mask rect', {height: '30vh', x: responsiveX, y: function () { return window.innerHeight * 0.35; }, duration: 0.3}, '<')
      .to('.doo-slgx-sctx .intro_mask rect', {width: '100vw', height: '100vh', rx: 0, x: 0, y: 0, duration: 0.3})
      .to('.doo-slgx-sctx .doo-mskx-bk .doo-bk-bkx', {opacity: 1, duration: 0.1})
      .to('.doo-slgx-sctx .doo-slgx-rl', {height: '100vh', duration: 0.2})
      .to('.doo-slgx-sctx .doo-sdx-bx', {opacity: 1, duration: 0.1}, '-=0.15')
      .to('.doo-slgx-sctx .doo-sdx-bx02', {marginLeft: function () { return window.innerWidth <= 768 ? '2%' : '20%'; }, duration: 0.1}, '<')
      .to('.doo-slgx-sctx .doo-slgx-rl', {opacity: 0, duration: 0.2})
      .to('.doo-slgx-sctx .doo-sdx-bx', {opacity: 0, duration: 0.1}, '<')
      .to('.doo-slgx-sctx .doo-lg', {opacity: 1, duration: 0.1})
      .to('.doo-slgx-sctx .doo-lg-cntx .doo-tx-bx', {marginTop: function () { return window.innerWidth <= 768 ? '5rem' : '8rem'; }, opacity: 1, duration: 0.1}, '<')
      .to('.doo-slgx-sctx .doo-lg-cntx .doo-tx01 .doo-cp', {width: '100%', duration: 0.1})
      .to('.doo-slgx-sctx .doo-lg-cntx .doo-tx02 .doo-cp', {width: '100%', duration: 0.1});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startBrandScrollScenes);
  else startBrandScrollScenes();
})();

// 자주 묻는 질문 펼치기 — 원본 sub.js 의 '.qna_list .row .que'(진료 쪽) · '.faq_list .item .question'(커뮤니티) 동작 그대로: 첫 항목 열림, 누르면 300ms 로 펼치고 나머지는 닫음
(function () {
  function ready(fn) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn(); }
  ready(function () {
    var $ = window.jQuery;
    if (!$) return;
    var $rows = $('.doo-qnx-ls .doo-rw');
    if ($rows.length) {
      var $first = $rows.first();
      $first.addClass('active').find('.doo-quex').addClass('active');
      $first.find('.doo-nswx').addClass('show').show();
      $first.find('.doo-quex .doo-bt').attr({'aria-expanded': 'true', 'aria-label': '답변 닫기'});
      $(document).on('click', '.doo-qnx-ls .doo-quex', function () {
        var $q = $(this), $row = $q.closest('.doo-rw'), $a = $q.next('.doo-nswx'), on = $row.hasClass('active');
        var $others = $('.doo-qnx-ls .doo-rw').not($row);
        $others.removeClass('active').find('.doo-quex').removeClass('active');
        $others.find('.doo-nswx').slideUp(300).removeClass('show');
        $others.find('.doo-quex .doo-bt').attr({'aria-expanded': 'false', 'aria-label': '답변 열기'});
        $row.toggleClass('active', !on); $q.toggleClass('active', !on);
        if (on) $a.stop(true, true).slideUp(300).removeClass('show'); else $a.stop(true, true).slideDown(300).addClass('show');
        $q.find('.doo-bt').attr({'aria-expanded': on ? 'false' : 'true', 'aria-label': on ? '답변 열기' : '답변 닫기'});
      });
    }
    if ($('.doo-fqx-ls .doo-qstx').length) {
      $(document).on('click', '.doo-fqx-ls .doo-it .doo-qstx', function (e) {
        e.preventDefault();
        var $q = $(this), $it = $q.parent('.doo-it'), $a = $q.siblings('.doo-nswx');
        $('.doo-fqx-ls .doo-it .doo-nswx').not($a).slideUp(300);
        $('.doo-fqx-ls .doo-it').not($it).removeClass('active').find('.doo-qstx').attr('aria-expanded', 'false');
        $a.stop(true, true).slideToggle(300);
        $it.toggleClass('active');
        $q.attr('aria-expanded', $it.hasClass('active') ? 'true' : 'false');
      });
      $(document).on('keydown', '.doo-fqx-ls .doo-qstx', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); $(this).trigger('click'); }
      });
    }
  });
})();

// 상단 하위 메뉴 고르기 — 원본은 고른 값으로 '/'+값 쪽으로 이동(.lnb select + .nice-select li). 값(about/doctors 등)을 이 폴더의 쪽 파일로 바꿔 이동한다
(function () {
  function go(v) {
    if (!v) return;
    var key = v.replace(/\//g, '_');
    var links = Array.prototype.slice.call(document.querySelectorAll('a[href]')).map(function (a) { return a.getAttribute('href'); });
    var hit = links.filter(function (h) { return h === key + '.html' || h.indexOf(key + '__') === 0; })[0];
    if (!hit && v.indexOf('/') < 0) hit = links.filter(function (h) { return h.indexOf(key + '_') === 0 && /\.html$/.test(h); })[0];
    if (hit) location.href = hit;
  }
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t && t.tagName === 'SELECT' && t.closest && t.closest('.doo-slx-wr')) go(t.value);
  });
})();

// 자가테스트 — 1단계를 고르면 2단계가 열리고, 고른 항목에 맞는 그림으로 바뀐다. 결과 확인하기는 두 답으로 결과를 알림창에 띄운다
(function () {
  var sec = document.querySelector('.doo-tstx-sec');
  if (!sec) return;
  function pick(name) {
    var rs = sec.querySelectorAll('input[name="' + name + '"]');
    for (var i = 0; i < rs.length; i++) if (rs[i].checked) return { i: i, t: rs[i].parentNode.querySelector('strong').textContent };
    return null;
  }
  sec.addEventListener('change', function (e) {
    var t = e.target;
    if (!t.classList || !t.classList.contains('doo-tstx-rdx')) return;
    var pics = t.closest('.doo-it').querySelectorAll('.doo-pic-sec > div'), p = pick(t.name);
    // 넓은 화면은 첫 칸이 사진(communitys-0N.jpg)이고 각도 그림이 한 칸 뒤에 있다
    var n = Math.min(p.i + (/communitys/.test(getComputedStyle(pics[0]).backgroundImage) ? 1 : 0), pics.length - 1);
    for (var i = 0; i < pics.length; i++) pics[i].classList.toggle('active', i === n);
    if (t.name === 'ra1') document.getElementById('doo-i-st02').classList.add('active');
  });
  var btn = document.querySelector('.doo-cmmx-btnx .doo-bt-tp1');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var a = pick('ra1'), b = pick('ra2');
    if (!a || !b) { IE.alert(a ? '2단계 항목을 골라 주세요.' : '1단계 항목부터 골라 주세요.'); return; }
    var lv = Math.max(Math.min(a.i, 3), b.i);
    var msg = [
      '앞으로 올리기와 뒤로 보내기 모두 정상 범위에 가깝습니다.<br>통증이 없다면 지금처럼 스트레칭을 이어 가세요.',
      '어깨 움직임이 조금 줄어 있습니다.<br>같은 동작에서 걸리거나 아픈 느낌이 이어지면 진료로 원인을 확인해 보세요.',
      '어깨 움직임이 꽤 줄어 있습니다.<br>오십견, 회전근개 손상 같은 원인이 있을 수 있어 진료를 권합니다.',
      '팔을 들고 뒤로 보내기가 많이 어려운 상태입니다.<br>통증이 심해지기 전에 진료를 받아 보세요.'
    ][lv];
    IE.alert('<strong>앞으로 ' + a.t + ' · 뒤로 ' + b.t + '</strong><br><br>' + msg + '<br><br><small>이 결과는 참고용이며 진단을 대신하지 않습니다.</small>');
  });
})();
