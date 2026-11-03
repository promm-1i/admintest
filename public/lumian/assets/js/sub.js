/* Lumian page interactions */
(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. 스크롤 리빌
     [data-reveal] 요소가 뷰포트에 들어오면 .is-in 을 붙인다.
     [data-reveal-group] 안의 자식은 순차(stagger)로 붙는다. */
  function initReveal() {
    var targets = document.querySelectorAll('[data-reveal], .reveal-mask');
    if (!targets.length) return;

    if (REDUCED || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(targets, function (el) { el.classList.add('is-in'); });
      return;
    }

    // 그룹 내 순번에 따라 지연을 미리 계산해 심는다
    Array.prototype.forEach.call(document.querySelectorAll('[data-reveal-group]'), function (group) {
      var step = parseInt(group.getAttribute('data-reveal-group'), 10);
      if (isNaN(step)) step = 110;
      var kids = group.querySelectorAll(':scope > [data-reveal], :scope > .reveal-mask');
      Array.prototype.forEach.call(kids, function (kid, i) {
        if (!kid.style.getPropertyValue('--reveal-delay')) {
          kid.style.setProperty('--reveal-delay', (i * step) + 'ms');
        }
      });
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, {
      // 요소가 화면 아래 12% 지점에 닿으면 시작 — 너무 이르지도 늦지도 않게
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.08
    });

    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });

    /* 안전장치
       리빌은 opacity:0 에서 출발한다. IO가 어떤 이유로든 발화하지 않으면
       본문이 영영 보이지 않는다. 실제로 다음 상황에서 발화가 지연·정지된다.
         · 탭이 백그라운드(document.hidden)인 채로 로드된 경우
         · 페이지가 컴포지팅되지 않는 임베드/프리뷰 환경
         · 확장 프로그램이나 구형 폴리필이 IO를 가로챈 경우
       콘텐츠가 보이지 않는 것보다 애니메이션이 생략되는 편이 낫다. */
    function revealVisible() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      Array.prototype.forEach.call(targets, function (el) {
        if (el.classList.contains('is-in')) return;
        var r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) {
          el.classList.add('is-in');
          io.unobserve(el);
        }
      });
    }

    // 1) 첫 화면에 이미 들어와 있는 요소는 IO를 기다리지 않는다
    window.requestAnimationFrame(revealVisible);

    // 2) 숨은 탭에서 로드된 경우, 보이게 되는 순간 다시 확인
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) window.requestAnimationFrame(revealVisible);
    });

    // 3) 최후 방어 — 화면이 보이는데도 3초간 아무것도 나타나지 않았으면 전부 표시.
    //    숨은 탭이면 발동하지 않는다(위 visibilitychange 가 처리). 애니메이션을
    //    괜히 건너뛰지 않으면서, 안 보이는 사고만 막는다.
    window.setTimeout(function revealFailsafe() {
      if (document.hidden) {
        document.addEventListener('visibilitychange', function once() {
          document.removeEventListener('visibilitychange', once);
          window.setTimeout(revealFailsafe, 3000);
        });
        return;
      }
      if (document.querySelectorAll('[data-reveal].is-in, .reveal-mask.is-in').length) return;
      Array.prototype.forEach.call(targets, function (el) { el.classList.add('is-in'); });
    }, 3000);
  }

  /* 2. 헤더 — 스크롤 상태 / 아래로 스크롤 시 숨김 */
  function initHeader() {
    var hdr = document.querySelector('.hdr');
    if (!hdr) return;
    var last = window.pageYOffset;
    var ticking = false;

    function update() {
      var y = window.pageYOffset;
      hdr.classList.toggle('is-scrolled', y > 12);

      // 전체메뉴가 열려 있으면 숨기지 않는다
      var menuOpen = document.body.classList.contains('menu-open');
      if (!menuOpen) {
        var down = y > last && y > 260;
        hdr.classList.toggle('is-hidden', down);
      }
      last = y;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });

    update();
  }

  /* 3. 전체메뉴 (햄버거) */
  function initAllMenu() {
    var btn = document.querySelector('.hdr__menu');
    var panel = document.getElementById('allmenu');
    if (!btn || !panel) return;

    function setOpen(on) {
      btn.classList.toggle('is-open', on);
      panel.classList.toggle('is-open', on);
      document.body.classList.toggle('menu-open', on);
      document.body.style.overflow = on ? 'hidden' : '';
      btn.setAttribute('aria-expanded', on ? 'true' : 'false');
      if (on) document.querySelector('.hdr').classList.remove('is-hidden');
    }

    btn.addEventListener('click', function () {
      setOpen(!panel.classList.contains('is-open'));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) setOpen(false);
    });
    Array.prototype.forEach.call(panel.querySelectorAll('a'), function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
  }

  /* 4. 롤링 (.roll)
     · 기본 자동 재생 (CSS 애니메이션)
     · 트랙을 복제해 이음선 없는 무한 루프
     · 호버 시 정지 (CSS)
     · 드래그 / 스와이프 / 화살표로 수동 이동
     ※ CSS animation 이 transform 을 점유하므로, 수동 이동 시 animation 을
       none 으로 끄고 현재 위치를 읽은 뒤 인라인 transform 으로 제어한다. */
  function initRoll() {
    function readTx(el) {
      var m = window.getComputedStyle(el).transform;
      if (!m || m === 'none') return 0;
      var parts = m.replace(/^matrix(?:3d)?\(|\)$/g, '').split(',');
      if (parts.length === 16) return parseFloat(parts[12]) || 0;
      if (parts.length === 6) return parseFloat(parts[4]) || 0;
      return 0;
    }

    Array.prototype.forEach.call(document.querySelectorAll('.roll'), function (roll) {
      var track = roll.querySelector('.roll__track');
      if (!track || track.dataset.cloned === '1') return;

      // 무한 루프용 복제 (keyframes가 -50% 이동하므로 정확히 2배)
      var items = Array.prototype.slice.call(track.children);
      items.forEach(function (item) {
        var c = item.cloneNode(true);
        c.setAttribute('aria-hidden', 'true');
        Array.prototype.forEach.call(c.querySelectorAll('a, button, input'), function (f) {
          f.setAttribute('tabindex', '-1');
        });
        track.appendChild(c);
      });
      track.dataset.cloned = '1';

      var perItem = parseFloat(roll.dataset.rollSpeed || '4.2');
      var dur = (items.length * perItem) + 's';
      track.style.setProperty('--roll-dur', dur);
      roll.style.setProperty('--roll-dur', dur);

      var host = roll.parentElement;
      var btnPrev = host ? host.querySelector('[data-roll="prev"]') : null;
      var btnNext = host ? host.querySelector('[data-roll="next"]') : null;

      if (REDUCED) return;

      var down = false, startX = 0, base = 0, shift = 0, resume = null, easing = false;

      function stepPx() {
        var card = track.children[0];
        var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
        return card ? card.getBoundingClientRect().width + gap : 320;
      }

      function wrapShift() {
        var half = track.scrollWidth / 2;
        if (!half) return;
        while (shift <= -half) shift += half;
        while (shift > 0) shift -= half;
      }

      // 애니메이션을 끄고 현재 시각적 위치를 인라인 transform 으로 고정
      function takeControl() {
        if (roll.classList.contains('is-dragging') && track.style.animation === 'none') {
          return;
        }
        shift = readTx(track);
        roll.classList.add('is-dragging');
        track.style.animation = 'none';
        track.style.transition = 'none';
        track.style.transform = 'translate3d(' + shift + 'px,0,0)';
        // 레이아웃 강제 — 다음 transition 이 먹히도록
        void track.offsetWidth;
      }

      function applyShift(withTransition) {
        wrapShift();
        track.style.transition = withTransition
          ? 'transform 520ms cubic-bezier(0.22, 0.61, 0.36, 1)'
          : 'none';
        track.style.transform = 'translate3d(' + shift + 'px,0,0)';
      }

      function scheduleResume() {
        window.clearTimeout(resume);
        resume = window.setTimeout(function () {
          easing = true;
          track.style.transition = 'transform 900ms cubic-bezier(0.22, 0.61, 0.36, 1)';
          track.style.transform = 'translate3d(0,0,0)';
          shift = 0;
          window.setTimeout(function () {
            track.style.transition = '';
            track.style.transform = '';
            track.style.animation = '';
            roll.classList.remove('is-dragging');
            easing = false;
          }, 900);
        }, 2600);
      }

      function pos(e) {
        return e.touches ? e.touches[0].clientX : e.clientX;
      }
      function press(e) {
        // 카드 링크 드래그와 충돌 방지: 좌클릭/터치만
        if (e.type === 'mousedown' && e.button !== 0) return;
        window.clearTimeout(resume);
        takeControl();
        down = true;
        startX = pos(e);
        base = shift;
      }
      function move(e) {
        if (!down) return;
        shift = base + (pos(e) - startX);
        applyShift(false);
      }
      function release() {
        if (!down) return;
        down = false;
        wrapShift();
        applyShift(false);
        scheduleResume();
      }

      roll.addEventListener('mousedown', press);
      roll.addEventListener('mousemove', move);
      roll.addEventListener('mouseup', release);
      roll.addEventListener('mouseleave', release);
      roll.addEventListener('touchstart', press, { passive: true });
      roll.addEventListener('touchmove', move, { passive: true });
      roll.addEventListener('touchend', release);
      roll.addEventListener('dragstart', function (e) { e.preventDefault(); });

      /* 좌우 화살표 — `.roll` 과 같은 부모의 [data-roll] 버튼 */
      function nudge(dir) {
        if (easing) return;
        window.clearTimeout(resume);
        takeControl();
        shift += -dir * stepPx();
        applyShift(true);
        scheduleResume();
      }

      if (btnPrev) btnPrev.addEventListener('click', function (e) {
        e.preventDefault();
        nudge(-1);
      });
      if (btnNext) btnNext.addEventListener('click', function (e) {
        e.preventDefault();
        nudge(1);
      });
    });
  }

  /* 4-B. 갤러리 (.gal) — 둘러보기
     · 자동 재생이 기본. data-gal-interval 로 주기 조절(기본 4.5초)
     · 호버·포커스 시 정지, 벗어나면 재개
     · 화살표 / 썸네일 클릭 / 드래그·스와이프
     · 썸네일 스트립은 현재 항목이 보이도록 따라 움직인다 */
  function initGallery() {
    Array.prototype.forEach.call(document.querySelectorAll('.gal'), function (gal) {
      var stage  = gal.querySelector('.gal__stage');
      var thumbs = gal.querySelector('.gal__thumbs');
      var bar    = gal.querySelector('.gal__bar i');
      var prev   = gal.querySelector('[data-gal="prev"]');
      var next   = gal.querySelector('[data-gal="next"]');
      if (!stage || !thumbs) return;

      var slides = Array.prototype.slice.call(stage.querySelectorAll('img'));
      var tabs   = Array.prototype.slice.call(thumbs.children);
      var n = slides.length;
      if (!n) return;

      var i = 0;
      var timer = null;
      var interval = parseInt(gal.getAttribute('data-gal-interval'), 10) || 4500;

      function paint() {
        slides.forEach(function (s, k) { s.classList.toggle('is-on', k === i); });
        tabs.forEach(function (t, k) {
          var on = k === i;
          t.classList.toggle('is-on', on);
          t.setAttribute('aria-current', on ? 'true' : 'false');
        });
        if (bar) {
          bar.style.width = (100 / n) + '%';
          bar.style.transform = 'translateX(' + (i * 100) + '%)';
        }
        // 현재 썸네일이 스트립 밖이면 안으로 끌어온다
        var t = tabs[i];
        if (t) {
          var tr = t.getBoundingClientRect();
          var sr = thumbs.getBoundingClientRect();
          if (tr.left < sr.left || tr.right > sr.right) {
            thumbs.scrollTo({
              left: t.offsetLeft - (thumbs.clientWidth - t.offsetWidth) / 2,
              behavior: REDUCED ? 'auto' : 'smooth'
            });
          }
        }
      }

      function go(k) { i = (k % n + n) % n; paint(); }
      function step() { go(i + 1); }

      function play() {
        if (REDUCED || timer) return;
        timer = window.setInterval(step, interval);
      }
      function pause() {
        if (!timer) return;
        window.clearInterval(timer);
        timer = null;
      }

      if (prev) prev.addEventListener('click', function () { go(i - 1); });
      if (next) next.addEventListener('click', function () { go(i + 1); });
      tabs.forEach(function (t, k) { t.addEventListener('click', function () { go(k); }); });

      gal.addEventListener('mouseenter', pause);
      gal.addEventListener('mouseleave', play);
      gal.addEventListener('focusin', pause);
      gal.addEventListener('focusout', play);

      // 키보드 좌우
      gal.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft')  { go(i - 1); }
        if (e.key === 'ArrowRight') { go(i + 1); }
      });

      // 드래그 / 스와이프
      var down = false, x0 = 0;
      function px(e) { return e.touches ? e.touches[0].clientX : e.clientX; }
      stage.addEventListener('mousedown', function (e) { down = true; x0 = px(e); stage.classList.add('is-dragging'); pause(); });
      stage.addEventListener('touchstart', function (e) { down = true; x0 = px(e); pause(); }, { passive: true });
      function release(e) {
        if (!down) return;
        down = false;
        stage.classList.remove('is-dragging');
        var dx = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - x0;
        if (Math.abs(dx) > 45) go(i + (dx < 0 ? 1 : -1));
        play();
      }
      stage.addEventListener('mouseup', release);
      stage.addEventListener('mouseleave', function (e) { if (down) release(e); });
      stage.addEventListener('touchend', release);
      stage.addEventListener('dragstart', function (e) { e.preventDefault(); });

      // 탭이 숨으면 타이머를 멈춰 배터리·CPU 를 아낀다
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) pause(); else play();
      });

      paint();
      play();
    });
  }

  /* 4-C. FAQ 아코디언 — 부드럽게 열고 닫기
     페이지마다 클래스 접두사가 다르므로(ll-/ba-/mm-…) 구조로 잡는다.
     <details class="…faq__item"> > <summary> + 답변 요소

     네이티브 <details> 는 높이 전환이 없어 툭 끊긴다.
     닫을 때는 애니메이션이 끝날 때까지 open 을 유지해야 내용이 남는다.

     ※ 여기서 CSS 로 opacity 0 → 1 을 걸지 않는다.
       애니메이션이 진행되지 않는 환경에서 답변이 영영 안 보이게 된다
       (서브비주얼에서 실제로 겪은 함정). 페이드는 JS 로만 준다 —
       JS 가 안 돌면 <details> 가 네이티브로 동작해 내용은 항상 보인다. */
  function initFaq() {
    var items = document.querySelectorAll('details[class*="faq"]');
    if (!items.length) return;

    Array.prototype.forEach.call(items, function (d) {
      var sum = d.querySelector('summary');
      if (!sum) return;
      var body = sum.nextElementSibling;
      var running = null;
      var settle = null;

      sum.style.cursor = 'pointer';

      function cancelRunning() {
        if (running) {
          running.onfinish = null;
          running.oncancel = null;
          running.cancel();
          running = null;
        }
        window.clearTimeout(settle);
      }

      /* toOpen: true=열기 / false=닫기 */
      function animateToggle(toOpen) {
        if (REDUCED || !d.animate) {
          d.open = toOpen;
          d.classList.remove('is-closing');
          return;
        }

        if (d.open === toOpen && !running) return;

        cancelRunning();

        var startH = d.offsetHeight;
        d.open = toOpen;
        var endH = d.offsetHeight;
        d.open = true; // 애니메이션 동안 내용 유지

        d.classList.toggle('is-closing', !toOpen);
        d.style.overflow = 'hidden';
        running = d.animate(
          [{ height: startH + 'px' }, { height: endH + 'px' }],
          { duration: toOpen ? 440 : 360, easing: 'cubic-bezier(.22,.61,.36,1)' }
        );

        var ico = sum.querySelector(
          '[class*="faq__ico"], .ico-plus, .ico-minus, img'
        );
        if (ico && ico.animate) {
          ico.animate(
            [{ transform: (toOpen ? 'rotate(-45deg)' : 'rotate(45deg)') + ' scale(.84)', opacity: 0.25 },
             { transform: 'none', opacity: 1 }],
            { duration: 460, easing: 'cubic-bezier(.22,.61,.36,1)' }
          );
        }

        if (toOpen && body) {
          body.animate(
            [{ opacity: 0, transform: 'translateY(-8px)' },
             { opacity: 1, transform: 'none' }],
            { duration: 520, delay: 60, fill: 'backwards',
              easing: 'cubic-bezier(.22,.61,.36,1)' }
          );
        }

        function done() {
          window.clearTimeout(settle);
          d.open = toOpen;
          d.classList.remove('is-closing');
          d.style.overflow = '';
          running = null;
        }

        running.onfinish = done;
        running.oncancel = function () {
          d.classList.remove('is-closing');
          d.style.overflow = '';
        };
        settle = window.setTimeout(function () {
          if (running) { running.onfinish = null; running.cancel(); }
          done();
        }, (toOpen ? 440 : 360) + 400);
      }

      d._faqToggle = animateToggle;

      sum.addEventListener('click', function (e) {
        e.preventDefault();
        var willOpen = !d.open;

        // 다른 항목을 열 때 — 같은 FAQ 박스 안의 열린 항목은 닫기
        if (willOpen) {
          var box = d.closest('[class*="faq__box"]') || d.parentElement;
          var siblings = box
            ? box.querySelectorAll('details[class*="faq"]')
            : items;
          Array.prototype.forEach.call(siblings, function (other) {
            if (other === d) return;
            if (other.open || other.classList.contains('is-closing')) {
              if (typeof other._faqToggle === 'function') other._faqToggle(false);
              else other.open = false;
            }
          });
        }

        animateToggle(willOpen);
      });
    });
  }

  /* 5. 최상단 이동 버튼 */
  function initToTop() {
    var btn = document.querySelector('.quick__top');
    if (!btn) return;
    var ticking = false;

    function update() {
      btn.classList.toggle('is-on', window.pageYOffset > 420);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' });
    });
    update();
  }

  /* 6. 클립보드 복사 (주소 복사 버튼) */
  function initCopy() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (btn) {
      btn.addEventListener('click', function () {
        var text = btn.getAttribute('data-copy');
        var done = function () {
          var prev = btn.getAttribute('aria-label') || '';
          btn.setAttribute('aria-label', '복사되었습니다');
          btn.classList.add('is-copied');
          window.setTimeout(function () {
            btn.setAttribute('aria-label', prev);
            btn.classList.remove('is-copied');
          }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, function () {});
        }
      });
    });
  }

  /* case tabs */
  function initCaseTabs() {
    $('.cmp-case__in').each(function () {
      var tabWrap = $(this);

      tabWrap.find('.cmp-case__tabs li').removeClass('is-on');
      tabWrap.find('.cmp-case__tabs li').eq(0).addClass('is-on');

      tabWrap.find('.con').removeClass('active');
      tabWrap.find('.con').eq(0).addClass('active');

      tabWrap.find('.cmp-case__tabs li').on('click', function () {
        var idx = $(this).index();

        tabWrap.find('.cmp-case__tabs li').removeClass('is-on');
        $(this).addClass('is-on');

        tabWrap.find('.con').removeClass('active');
        tabWrap.find('.con').eq(idx).addClass('active');
      });
    });
  }

   function initBeforeSwiper() {
   if (typeof Swiper === 'undefined') return;

   document.querySelectorAll('.cmp-before .cmp-before__swiper').forEach(function (el) {
      if (el.swiper) return;

      var section = el.closest('.cmp-before');
      if (!section) return;

      var pager = section.querySelector('.cmp-before__dots');
      if (!pager) {
         pager = document.createElement('div');
         pager.className = 'cmp-before__dots';
         pager.setAttribute('aria-hidden', 'true');
         el.parentNode.insertBefore(pager, el.nextSibling);
      }

      new Swiper(el, {
         slidesPerView: 1,
         slidesPerGroup: 1,
         spaceBetween: 20,
         watchOverflow: true,
         loop: true,

         pagination: {
         el: pager,
         clickable: true,
         bulletClass: 'cmp-before__bullet',
         bulletActiveClass: 'is-on',
         },

         breakpoints: {
         761: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 40,
         },
         },

         on: {
         init: function (swiper) {
            if (swiper.pagination.bullets.length <= 1) {
               pager.style.display = 'none';
               pager.setAttribute('aria-hidden', 'true');
               pager.querySelectorAll('button, [tabindex]').forEach(function (control) {
                  control.setAttribute('tabindex', '-1');
               });
            } else {
               pager.style.display = '';
               pager.removeAttribute('aria-hidden');
               pager.querySelectorAll('[tabindex="-1"]').forEach(function (control) {
                  control.removeAttribute('tabindex');
               });
            }
         },
         },
      });
   });
   }

  function initColumnSwiper() {
    if (typeof Swiper === 'undefined') return;

    document.querySelectorAll('.cmp-column .cmp-column__swiper').forEach(function (el) {
      if (el.swiper) return;

      var section = el.closest('.cmp-column');
      if (!section) return;

      var pager = section.querySelector('.cmp-column__dots');
      if (!pager) {
        pager = document.createElement('div');
        pager.className = 'cmp-column__dots';
        pager.setAttribute('aria-hidden', 'true');
        var mount = el.closest('.cmp-column__in') || el.parentNode;
        mount.appendChild(pager);
      }

      new Swiper(el, {
        slidesPerView: 1.15,
        slidesPerGroup: 1,
        spaceBetween: 14,
        watchOverflow: true,
        loop: true,
        pagination: {
          el: pager,
          clickable: true,
          bulletClass: 'cmp-column__bullet',
          bulletActiveClass: 'is-on',
        },
        breakpoints: {
          621: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 20,
          },
          1101: {
            slidesPerView: 4,
            slidesPerGroup: 1,
            spaceBetween: 26.67,
          },
        },
      });
    });
  }

   function initEventSwiper() {
   if (typeof Swiper === 'undefined') return;

   document.querySelectorAll('.cmp-event .cmp-event__swiper').forEach(function (el) {
      if (el.swiper) return;

      var col = el.closest('.cmp-event__col');
      if (!col) return;

      var pager = col.querySelector('.cmp-event__dots');
      if (!pager) {
         pager = document.createElement('div');
         pager.className = 'cmp-event__dots';
         pager.setAttribute('aria-hidden', 'true');
         col.appendChild(pager);
      }

      var swiper = new Swiper(el, {
         slidesPerView: 1,
         slidesPerGroup: 1,
         spaceBetween: 14,
         watchOverflow: true,
         loop: true,

         pagination: {
         el: pager,
         clickable: true,
         bulletClass: 'cmp-event__bullet',
         bulletActiveClass: 'is-on',
         },

         breakpoints: {
         768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 24,
         },
         1200: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 50,
         },
         },

         on: {
         init: function (swiper) {
            if (swiper.pagination.bullets.length <= 1) {
               pager.style.display = 'none';
            } else {
               pager.style.display = '';
            }
         },
         },
      });
   });
   }

  /* board-chips: data-bfa 매칭으로 bfa-panel 전환 (jQuery) */
  function initTab() {
    var $chips = $('.board-chips');
    if (!$chips.length) return;

    $chips.on('click', '.board-chips__item', function (e) {
      e.preventDefault();

      var $item = $(this);
      var key = $item.attr('data-bfa');
      var $nav = $item.closest('.board-chips');
      var $root = $item.closest('main');
      var $panels = $root.find('.bfa-panel');

      $nav.find('.board-chips__item').removeClass('is-on').removeAttr('aria-current');
      $item.addClass('is-on').attr('aria-current', 'true');

      if (!$panels.length || key == null || key === '') return;

      $panels.removeClass('is-on').prop('hidden', true);
      var $active = $panels.filter('[data-bfa="' + key + '"]');
      $active.addClass('is-on').prop('hidden', false);

      if ($active.length) {
        var el = $active.get(0);
        el.scrollIntoView({
          behavior: REDUCED ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    });
  }

  function initArchiveSwiper() {
    if (typeof Swiper === 'undefined') return;

    document.querySelectorAll('.cmp-archive__swiper').forEach(function (el) {
      if (el.swiper) return;

      var section = el.closest('.cmp-archive');
      if (!section) return;

      var slideCount = el.querySelectorAll('.swiper-slide').length;
      var prev = section.querySelector('.cmp-archive__nav--prev');
      var next = section.querySelector('.cmp-archive__nav--next');
      var showNav = slideCount >= 3;

      section.classList.toggle('is-nav-off', !showNav);
      if (prev) prev.hidden = !showNav;
      if (next) next.hidden = !showNav;

      var opts = {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 16,
        watchOverflow: true,
        breakpoints: {
          761: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 32,
          },
        },
      };

      if (showNav && prev && next) {
        opts.navigation = {
          prevEl: prev,
          nextEl: next,
        };
      }

      var swiper = new Swiper(el, opts);

      function syncNav() {
        if (!showNav) return;
        if (prev) prev.hidden = swiper.isBeginning;
        if (next) next.hidden = swiper.isEnd;
      }

      if (showNav) {
        syncNav();
        swiper.on('slideChange', syncNav);
        swiper.on('resize', syncNav);
        swiper.on('update', syncNav);
      }
    });
  }

  /* before-after-breath: 펼침 필터 (PC/MO 공통) — 단일 선택 */
  function initBfaFilter() {
    var filter = document.querySelector('.bfa-filter');
    if (!filter) return;

    var root = filter.closest('main') || document;
    var bar = filter.querySelector('.bfa-filter__bar');
    var toggle = filter.querySelector('.bfa-filter__toggle');
    var panel = filter.querySelector('.bfa-filter__panel');
    var toggleTxt = filter.querySelector('.bfa-filter__toggle-txt');
    var panels = root.querySelectorAll('.bfa-panel');
    var tabNav = root.querySelector('.board-tab');

    function allInputs() {
      return root.querySelectorAll('input[name="bfa-select"][data-bfa]');
    }

    function selectedInput() {
      var found = null;
      Array.prototype.forEach.call(allInputs(), function (input) {
        if (input.checked) found = input;
      });
      return found;
    }

    function applyFilter() {
      var selected = selectedInput();

      // 미선택 또는 '전체' → 전체 패널 표시
      if (!selected || selected.hasAttribute('data-bfa-all')) {
        Array.prototype.forEach.call(panels, function (panelEl) {
          panelEl.classList.add('is-on');
          panelEl.hidden = false;
        });
        return;
      }

      var key = selected.getAttribute('data-bfa');
      Array.prototype.forEach.call(panels, function (panelEl) {
        var on = panelEl.getAttribute('data-bfa') === key;
        panelEl.classList.toggle('is-on', on);
        panelEl.hidden = !on;
      });
    }

    function resetFilter() {
      Array.prototype.forEach.call(allInputs(), function (input) {
        input.checked = false;
      });
      Array.prototype.forEach.call(panels, function (panelEl) {
        panelEl.classList.add('is-on');
        panelEl.hidden = false;
      });
    }

    function setFilterOpen(open) {
      filter.classList.toggle('is-open', open);
      if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (panel) panel.hidden = !open;
      if (toggleTxt) {
        var openLabel = toggleTxt.getAttribute('data-txt-open') || '필터 접기';
        var closeLabel = toggleTxt.getAttribute('data-txt-close') || '필터 펼치기';
        toggleTxt.textContent = open ? openLabel : closeLabel;
      }
    }

    if (bar) {
      bar.addEventListener('click', function () {
        setFilterOpen(!filter.classList.contains('is-open'));
      });
    }

    if (toggle) {
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        setFilterOpen(!filter.classList.contains('is-open'));
      });
    }

    root.addEventListener('change', function (e) {
      var input = e.target;
      if (!input || input.name !== 'bfa-select' || !input.hasAttribute('data-bfa')) return;
      applyFilter();
    });

    if (tabNav) {
      tabNav.addEventListener('click', function (e) {
        var item = e.target.closest('[data-bfa-tab]');
        if (!item || !tabNav.contains(item)) return;

        var tab = item.getAttribute('data-bfa-tab');
        if (tab === 'skin' || tab === 'etc') return;

        e.preventDefault();
        Array.prototype.forEach.call(tabNav.querySelectorAll('.board-tab__item'), function (el) {
          var on = el === item;
          el.classList.toggle('is-on', on);
          if (on) el.setAttribute('aria-current', 'true');
          else el.removeAttribute('aria-current');
        });

        if (tab === 'all') resetFilter();
      });
    }

    setFilterOpen(false);
  }

  function boot() {
    initBeforeSwiper();
    initColumnSwiper();
    initEventSwiper();
    initArchiveSwiper();
    initReveal();
    initHeader();
    initAllMenu();
    initRoll();
    initGallery();
    initFaq();
    initToTop();
    initCopy();
    initCaseTabs();
    initTab();
    initBfaFilter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
