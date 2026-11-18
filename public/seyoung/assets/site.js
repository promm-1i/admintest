(function () {
  'use strict';

  var root = document.documentElement;
  var header = document.querySelector('#ki-hd');
  var nav = document.querySelector('#ki-nv');
  var activeTimers = new WeakMap();
  var carousels = [];

  function $all(selector, context) {
    return Array.prototype.slice.call((context || document).querySelectorAll(selector));
  }


  function initTextFill() {
    var paragraphs = $all('.ktx-fllx-wr > p.ktx-fllx:not(.ksmx)');
    paragraphs.forEach(function (paragraph) {
      if (paragraph.dataset.fillReady === '1') return;
      paragraph.dataset.fillReady = '1';
      var walker = document.createTreeWalker(paragraph, NodeFilter.SHOW_TEXT);
      var nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(function (node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return;
        var span = document.createElement('span');
        span.className = 'ktx-rl';
        node.parentNode.insertBefore(span, node);
        span.appendChild(node);
      });
    });
    var spans = $all('.ktx-fllx-wr > p.ktx-fllx:not(.ksmx) .ktx-rl');
    function updateTextFill() {
      var viewport = window.innerHeight || document.documentElement.clientHeight;
      spans.forEach(function (span) {
        var top = span.getBoundingClientRect().top;
        var progress = Math.max(0, Math.min(1, (viewport * .78 - top) / (viewport * .56)));
        span.style.backgroundPosition = ((1 - progress) * 100) + '% 0';
      });
    }
    updateTextFill();
    window.addEventListener('scroll', updateTextFill, { passive: true });
    window.addEventListener('resize', updateTextFill);
  }

  function setHidden(el, hidden) {
    if (!el) return;
    el.hidden = !!hidden;
    el.setAttribute('aria-hidden', hidden ? 'true' : 'false');
  }

  function slide(el, open, duration) {
    if (!el) return;
    window.clearTimeout(activeTimers.get(el));
    el.style.overflow = 'hidden';
    if (open) {
      el.hidden = false;
      el.setAttribute('aria-hidden', 'false');
      el.style.display = 'block';
      el.style.height = '0px';
      var target = el.scrollHeight;
      el.style.transition = 'height ' + (duration || 280) + 'ms ease';
      requestAnimationFrame(function () { el.style.height = target + 'px'; });
      activeTimers.set(el, window.setTimeout(function () {
        el.style.height = 'auto';
        el.style.overflow = '';
      }, (duration || 280) + 30));
    } else {
      var current = el.getBoundingClientRect().height;
      el.style.height = current + 'px';
      el.style.transition = 'height ' + (duration || 280) + 'ms ease';
      requestAnimationFrame(function () { el.style.height = '0px'; });
      activeTimers.set(el, window.setTimeout(function () {
        el.style.display = 'none';
        el.style.height = '';
        el.style.overflow = '';
        el.hidden = true;
        el.setAttribute('aria-hidden', 'true');
      }, (duration || 280) + 30));
    }
  }

  function closeNav() {
    if (header) {
      header.classList.remove('ksl-pnx');
      $all('.khd-lk-tggx, .khd-lk-wr button, .khd-bt', header).forEach(function (el) {
        el.classList.remove('kisx-ctvx');
        el.setAttribute('aria-expanded', 'false');
      });
    }
    if (nav) {
      nav.classList.remove('krdyx');
      nav.classList.remove('kisx-pnx');
      $all('.knv-dptx-it', nav).forEach(function (item) {
        item.classList.remove('kisx-pnx');
        var sub = item.querySelector('.knv-dptx-wr2');
        if (sub && window.innerWidth < 1024) slide(sub, false, 200);
      });
    }
    root.classList.remove('hidden');
  }

  function initCarousel(el, options) {
    if (!el || el.dataset.syCarousel === 'krdyx') return null;
    var slides = Array.prototype.slice.call(el.children).filter(function (child) {
      return child.nodeType === 1 && !child.classList.contains('ksl-cntx') && !child.classList.contains('ksl-pt-wr');
    });
    if (slides.length < 2) {
      el.classList.add('slick-initialized');
      if (slides[0]) {
        slides[0].classList.add('slick-slide', 'slick-active');
        slides[0].style.display = 'block';
        slides[0].style.float = 'none';
        slides[0].style.width = '100%';
        slides[0].style.height = '100%';
      }
      el.style.width = '100%';
      el.style.height = '100%';
      el.dataset.syCarousel = 'krdyx';
      return null;
    }
    var list = document.createElement('div');
    var track = document.createElement('div');
    list.className = 'slick-list';
    track.className = 'slick-track';
    list.style.overflow = 'hidden';
    track.style.display = 'flex';
    track.style.width = '100%';
    track.style.transition = 'transform 1000ms ease';
    slides.forEach(function (item) {
      item.classList.add('slick-slide');
      item.style.display = 'block';
      item.style.float = 'none';
      item.style.flex = '0 0 100%';
      item.style.width = '100%';
      track.appendChild(item);
    });
    list.appendChild(track);
    el.insertBefore(list, el.firstChild);
    el.classList.add('slick-initialized');
    el.dataset.syCarousel = 'krdyx';

    var data = { root: el, slides: slides, list: list, track: track, index: 0, timer: 0, paused: false, options: options || {} };
    carousels.push(data);
    var dots = el.parentElement && (el.parentElement.querySelector('.ksl-pt-wr') || el.parentElement.parentElement && el.parentElement.parentElement.querySelector('.ksl-pt-wr'));
    if (!dots) dots = el.closest('.ksl-wr') && el.closest('.ksl-wr').querySelector('.ksl-pt-wr');
    if (dots) {
      var host = dots.querySelector('.khm-in') || dots;
      if (!host.querySelector('[data-sy-dots]')) {
        var ul = document.createElement('ul');
        ul.dataset.syDots = '1';
        ul.className = 'slick-dots';
        slides.forEach(function (_, i) {
          var li = document.createElement('li');
          var button = document.createElement('button');
          button.type = 'button';
          button.setAttribute('aria-label', '항목 ' + (i + 1));
          button.addEventListener('click', function () { move(data, i); });
          li.appendChild(button);
          ul.appendChild(li);
        });
        host.appendChild(ul);
      }
      data.dots = host.querySelector('[data-sy-dots]');
    }
    move(data, 0);
    if (data.options.autoplay) play(data);
    return data;
  }

  function move(data, index) {
    if (!data) return;
    var n = data.slides.length;
    data.index = (index + n) % n;
    data.track.style.transform = 'translate3d(' + (-100 * data.index) + '%,0,0)';
    data.slides.forEach(function (item, i) {
      item.classList.toggle('slick-active', i === data.index);
      item.setAttribute('aria-hidden', i === data.index ? 'false' : 'true');
    });
    if (data.dots) $all('li', data.dots).forEach(function (li, i) {
      li.classList.toggle('slick-active', i === data.index);
      li.classList.toggle('slick-stop', data.paused && i === data.index);
    });
  }

  function play(data) {
    if (!data) return;
    data.paused = false;
    window.clearInterval(data.timer);
    data.timer = window.setInterval(function () { move(data, data.index + 1); }, data.options.speed || 5500);
    data.root.classList.remove('is-paused');
  }

  function pause(data) {
    if (!data) return;
    data.paused = true;
    window.clearInterval(data.timer);
    data.root.classList.add('is-paused');
    move(data, data.index);
  }

  function carouselFor(el) {
    return carousels.filter(function (item) { return item.root === el || item.root.contains(el); })[0];
  }

  function setupCarousels() {
    var main = document.querySelector('.khm-kv .ksl');
    if (main) {
      var mainCarousel = initCarousel(main, { autoplay: false, speed: 5500 });
      if (mainCarousel) window.setTimeout(function () { play(mainCarousel); }, 2700);
    }
    $all('.ksldx-mtnx .ksldx-ls').forEach(function (el) {
      if (window.innerWidth <= 1024) initCarousel(el, { autoplay: false });
    });
    $all('.khm-ab .kab-ls').forEach(function (el) {
      if (window.innerWidth <= 1024) initCarousel(el, { autoplay: false });
    });
    $all('.khm-bsx .kbsx-ct-wr').forEach(function (el) {
      if (window.innerWidth <= 1024) initCarousel(el, { autoplay: false });
    });
    $all('.kly-wr.main-popup .kly-cntx').forEach(function (el) {
      var data = initCarousel(el, { autoplay: false });
      if (!data) {
        var controls = el.closest('.kly-wr').querySelectorAll('.ksl-cntx, .ksl-pt-wr');
        controls.forEach(function (node) { node.hidden = true; });
      }
    });
  }

  function setupPostingHorizon() {
    var section = document.querySelector('.kcvrx-mtnx.khrzx-mtnx');
    var viewport = section && section.querySelector('.ksb-in');
    var track = section && section.querySelector('.kftx-sl-wr');
    if (!section || !viewport || !track || !document.body.classList.contains('krcrx-pstx')) return;

    var frame = 0;
    function update() {
      if (window.innerWidth <= 1024) {
        section.style.height = '';
        track.style.transform = '';
        return;
      }
      var margin = parseFloat(getComputedStyle(track).marginLeft) || 0;
      var sectionDistance = Math.max(window.innerHeight, track.scrollWidth + margin);
      section.style.height = sectionDistance + 'px';
      var available = Math.max(0, section.offsetHeight - window.innerHeight);
      var top = section.getBoundingClientRect().top + window.scrollY;
      var progress = available ? Math.min(1, Math.max(0, (window.scrollY - top) / available)) : 0;
      var maxX = Math.max(0, track.scrollWidth + margin - viewport.clientWidth);
      track.style.transform = 'translate3d(' + (-maxX * progress) + 'px,0,0)';
    }
    function schedule() {
      if (frame) return;
      frame = window.requestAnimationFrame(function () { frame = 0; update(); });
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', schedule);
    if ('ResizeObserver' in window) {
      var observer = new ResizeObserver(schedule);
      observer.observe(track);
      observer.observe(viewport);
    }
    update();
  }

  function scrollTo(target) {
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function openPopup(el) {
    if (!el) return;
    el.classList.add('show');
    el.style.display = 'block';
    root.classList.add('hidden');
    el.setAttribute('aria-hidden', 'false');
  }

  function closePopup(el, remember) {
    if (!el) return;
    el.classList.remove('show');
    el.style.display = 'none';
    el.setAttribute('aria-hidden', 'true');
    root.classList.remove('hidden');
    if (remember) {
      var expires = new Date(Date.now() + 86400000).toUTCString();
      document.cookie = 'mainPopup=Y; expires=' + expires + '; path=/; SameSite=Lax';
    }
  }

  function init() {
    // The source homepage uses its body marker only while an external loader
    // initializes. This clone owns that initialization, so reveal the page here.
    if (document.body) document.body.classList.remove('khm');
    setupCarousels();
    setupPostingHorizon();

    if (header) {
      if (window.scrollY > 0) header.classList.add('kisx-scr');
      window.addEventListener('scroll', function () {
        header.classList.toggle('kisx-scr', window.scrollY > 0);
      }, { passive: true });
      var hero = document.querySelector('.khm-kv');
      if (hero) {
        var setHeroHeader = function () {
          var onHero = window.scrollY < hero.offsetHeight - 100;
          header.classList.toggle('kdrkx-mdx', onHero);
          var scrollHint = document.querySelector('.kfltx-scdx');
          if (scrollHint) scrollHint.classList.toggle('kdrkx-mdx', onHero);
        };
        setHeroHeader();
        window.addEventListener('scroll', setHeroHeader, { passive: true });
      }
    }

    $all('[data-aos], .ktx-fllx-wr, .kcvrx-ntrx, .ksldx-it').forEach(function (el) {
      el.style.transition = el.style.transition || 'opacity .6s ease, transform .6s ease';
    });
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate', 'is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      $all('[data-aos], .ktx-fllx-wr, .kcvrx-ntrx, .ksldx-it').forEach(function (el) { observer.observe(el); });
    }

    initTextFill();

    var popup = document.querySelector('#mainPopup');
    if (popup && !document.cookie.split(';').some(function (item) { return item.trim() === 'mainPopup=Y'; })) {
      openPopup(popup);
    }

    window.addEventListener('scroll', function () {
      var floating = document.querySelector('#ki-fltx');
      var top = document.querySelector('.ktpbx');
      var sc = document.querySelector('.kfltx-scdx');
      var reached = window.scrollY > window.innerHeight / 2 - 250;
      if (floating) floating.classList.toggle('kisx-scr', reached);
      if (sc) sc.classList.toggle('kisx-scr', reached);
      if (top) top.classList.toggle('kisx-scr', reached);
      if (document.body.classList.contains('khm')) {
        $all('.kqk-wr').forEach(function (el) { el.classList.toggle('kisx-scr', window.scrollY > window.innerHeight / 2); });
      }
    }, { passive: true });

    document.addEventListener('click', function (event) {
      var target = event.target;
      var menuButton = target.closest('.khd-lk-tggx');
      if (menuButton && header) {
        var opening = !header.classList.contains('ksl-pnx');
        header.classList.toggle('ksl-pnx', opening);
        menuButton.classList.toggle('kisx-ctvx', opening);
        menuButton.setAttribute('aria-expanded', opening ? 'true' : 'false');
        if (nav && window.innerWidth < 1024) nav.classList.toggle('krdyx', opening);
        root.classList.toggle('hidden', opening);
        return;
      }

      var navItem = target.closest('.knv-dptx-it');
      if (navItem && nav && nav.contains(navItem) && window.innerWidth < 1024) {
        var link = target.closest('a[href]');
        var sub = navItem.querySelector('.knv-dptx-wr2');
        if (sub && (!link || link.getAttribute('href') === '#')) {
          event.preventDefault();
          var openingSub = !navItem.classList.contains('kisx-pnx');
          navItem.parentElement.querySelectorAll('.knv-dptx-it').forEach(function (item) {
            if (item !== navItem) {
              item.classList.remove('kisx-pnx');
              slide(item.querySelector('.knv-dptx-wr2'), false, 200);
            }
          });
          navItem.classList.toggle('kisx-pnx', openingSub);
          navItem.querySelector('.knv-dptx').classList.toggle('kplsx-pnx', openingSub);
          slide(sub, openingSub, 250);
          return;
        }
      }

      if (target.closest('.kft-fmlx-wr .kft-fmlx > button')) {
        var family = target.closest('.kft-fmlx');
        family.classList.toggle('kisx-pnx');
        slide(family.querySelector('.kfmlx-ls'), family.classList.contains('kisx-pnx'));
        return;
      }
      if (target.closest('.kfmlx-cls')) {
        var familyWrap = target.closest('.kft-fmlx');
        familyWrap.classList.remove('kisx-pnx');
        slide(familyWrap.querySelector('.kfmlx-ls'), false);
        return;
      }

      if (target.closest('.ktpbx, .kfltx-scdx.is-scroll')) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (target.closest('.kfltx-scdx')) {
        var next = document.querySelector('.ksb-kv + section') || document.querySelector('.kct-wr section:nth-of-type(2)');
        scrollTo(next);
        return;
      }

      if (target.closest('.kbt-ly')) {
        var layerLink = target.closest('.kbt-ly');
        var href = layerLink.getAttribute('href') || layerLink.dataset.target;
        if (href && href.charAt(0) === '#') {
          event.preventDefault();
          openPopup(document.querySelector(href));
          return;
        }
      }
      if (target.closest('.kly-cls, .kly-bckx')) {
        var layer = target.closest('.kly-wr');
        closePopup(layer, target.closest('.todayno') !== null);
        return;
      }
      if (target.closest('.todayno')) {
        closePopup(target.closest('.kly-wr'), true);
        return;
      }

      var control = target.closest('.ksl-bt');
      if (control) {
        var layerScope = control.closest('.kly-wr');
        var slideScope = control.closest('.ksl-wr, .kkv-sl-wr');
        var data = layerScope ? carousels.filter(function (item) { return item.root.closest('.kly-wr') === layerScope; })[0] :
          carousels.filter(function (item) { return slideScope && (item.root === slideScope || slideScope.contains(item.root)); })[0];
        if (!data) data = carouselFor(control.parentElement);
        if (control.classList.contains('kpsx')) pause(data);
        else if (control.classList.contains('kplyx')) play(data);
        else if (control.classList.contains('kprvx')) move(data, data.index - 1);
        else if (control.classList.contains('knxtx')) move(data, data.index + 1);
        if (control.classList.contains('kprvx') || control.classList.contains('knxtx')) play(data);
        return;
      }

      var shareLink = target.closest('.kshrx-wr a[data-share]');
      if (shareLink) {
        event.preventDefault();
        var shareUrl = window.location.href;
        var shareTitle = document.title;
        var platform = shareLink.getAttribute('data-share');
        var destinations = {
          facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl),
          x: 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(shareUrl) + '&text=' + encodeURIComponent(shareTitle)
        };
        var copyUrl = function () {
          var fallbackCopy = function () {
            var input = document.createElement('textarea'); input.value = shareUrl; input.style.position = 'fixed'; input.style.opacity = '0';
            document.body.appendChild(input); input.select(); document.execCommand('copy'); input.remove();
            shareLink.setAttribute('aria-label', 'Page URL copied');
          };
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(shareUrl).then(function () {
              shareLink.setAttribute('aria-label', 'Page URL copied');
            }).catch(fallbackCopy);
          } else fallbackCopy();
        };
        if (platform === 'copy') {
          copyUrl();
        } else if (destinations[platform]) {
          window.open(destinations[platform], '_blank', 'noopener,noreferrer,width=640,height=560');
        } else if (navigator.share) {
          navigator.share({ title: shareTitle, url: shareUrl }).catch(function () {});
        } else {
          copyUrl();
        }
        return;
      }
      if (target.closest('.kshrx-wr button')) {
        target.closest('.kshrx-wr').classList.toggle('kisx-pnx');
        return;
      }
      if (target.closest('.kmp-ls .kbt-mp')) {
        var board = target.closest('.kbd-it');
        var map = board && board.querySelector('.kmp-ar');
        if (board) board.classList.toggle('kisx-pnx');
        if (map) slide(map, map.hidden || getComputedStyle(map).display === 'none');
        return;
      }
      if (target.closest('.kdrpx-wr .kdrpx-bt')) {
        var drop = target.closest('.kdrpx-wr');
        drop.classList.toggle('kisx-pnx');
        slide(drop.querySelector('.kdrpx-ls'), drop.classList.contains('kisx-pnx'));
        return;
      }
      if (target.closest('.kdrpx-wr .kdrpx-ls button')) {
        var item = target.closest('.kdrpx-wr .kdrpx-ls button');
        var wrap = item.closest('.kdrpx-wr');
        wrap.classList.add('kisx-ctvx');
        wrap.classList.remove('kisx-pnx');
        var btn = wrap.querySelector('.kdrpx-bt');
        if (btn) btn.textContent = item.textContent.trim();
        slide(wrap.querySelector('.kdrpx-ls'), false);
        return;
      }
      if (target.closest('.kctgx-wr button, .kfltx-wr button')) {
        var option = target.closest('button');
        option.parentElement.parentElement.querySelectorAll('button').forEach(function (button) {
          button.parentElement.classList.remove('kisx-ctvx');
        });
        option.parentElement.classList.add('kisx-ctvx');
        var filterBox = option.closest('.kfqx-ls, .kbd-ls-wr');
        if (filterBox) {
          var label = option.textContent.trim().replace(/\s*\(\s*\d*\s*\)/, '');
          var kind = '';
          var isFaq = filterBox.classList.contains('kfqx-ls');
          var isMedia = filterBox.classList.contains('kmdx-wr');
          if (label !== '전체') {
            if (isFaq) kind = ({ '신입': 'knwx', '경력': 'kxprx', '인턴': 'kntrx', '면접': 'interview', '기타': 'ktcx' })[label] || '';
            else if (isMedia) kind = ({ '보도자료': 'press', '홍보자료': 'promotion', '홍보영상': 'video' })[label] || '';
            else kind = ({ '진단장비': 'diagnostic', '진단 SW': 'software', '전장': 'electrical', '커넥티비티(DCS)': 'connectivity', '전동화': 'electrified', '기타 장비': 'other', '단종제품': 'discontinued' })[label] || '';
          }
          var cardSelector = isFaq ? '.ktggx-it' : (isMedia ? '.kmdx-it' : '.kbd-it');
          filterBox.querySelectorAll(cardSelector).forEach(function (card) {
            var cardKind = isFaq ? card.querySelector('.kcrrx') : card.getAttribute('data-category');
            var matches = !kind || (isFaq ? cardKind && cardKind.classList.contains(kind) : cardKind === kind);
            card.hidden = !matches;
          });
        }
        return;
      }
      if (target.closest('.ktggx-wr .ktggx-bt')) {
        var toggle = target.closest('.ktggx-bt');
        toggle.classList.toggle('kplsx-pnx');
        slide(toggle.nextElementSibling, toggle.classList.contains('kplsx-pnx'));
        return;
      }
      if (target.closest('.ktb-wr .ktb-mn-wr button')) {
        var tab = target.closest('button');
        var tabList = tab.closest('.ktb-mn-wr');
        var tabBox = tab.closest('.ktb-wr');
        var index = Array.prototype.indexOf.call(tab.parentElement.parentElement.children, tab.parentElement);
        tab.parentElement.parentElement.querySelectorAll('li').forEach(function (li) { li.classList.remove('kisx-ctvx'); });
        tab.parentElement.classList.add('kisx-ctvx');
        var panels = tabBox.querySelectorAll('.ktb-ct');
        panels.forEach(function (panel, i) { panel.classList.toggle('show', i === index); });
        tabList.scrollLeft = tab.offsetLeft - tabList.offsetLeft + tabList.scrollLeft - 20;
        return;
      }

      if (!target.closest('.kft-fmlx') && document.querySelector('.kft-fmlx.is-open')) {
        var openedFamily = document.querySelector('.kft-fmlx.is-open');
        openedFamily.classList.remove('kisx-pnx');
        slide(openedFamily.querySelector('.kfmlx-ls'), false);
      }
      if (window.innerWidth > 1024 && nav && nav.classList.contains('kisx-pnx') && !target.closest('#ki-hd')) closeNav();
    });

    document.addEventListener('input', function (event) {
      if (event.target.matches('.ksr-wr input')) event.target.parentElement.classList.toggle('kisx-ctvx', !!event.target.value);
    });
    document.addEventListener('click', function (event) {
      if (event.target.closest('.ksr-wr .kbt-dltx')) {
        var search = event.target.closest('.ksr-wr');
        var input = search.querySelector('input');
        if (input) input.value = '';
        search.classList.remove('kisx-ctvx');
      }
    });
    document.addEventListener('submit', function (event) {
      event.preventDefault();
      window.alert('온라인 접수는 준비 중입니다. 문의는 010-4894-4905로 전화 주세요.');
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        var visibleLayer = document.querySelector('.kly-wr.show, .kly-wr[style*="display: block"]');
        if (visibleLayer) closePopup(visibleLayer, false);
        closeNav();
      }
    });

    $all('[data-backtheme], [data-backTheme]').forEach(function (el) {
      var color = el.getAttribute('data-backtheme') || el.getAttribute('data-backTheme');
      if (!color || !('IntersectionObserver' in window)) return;
      var themeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          document.querySelector('.kct-wr') && document.querySelector('.kct-wr').classList.toggle(color, entry.isIntersecting);
          if (header) header.classList.toggle('kdrkx-mdx', entry.isIntersecting && color === 'kblx');
        });
      }, { threshold: 0.35 });
      themeObserver.observe(el);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024) closeNav();
  });
})();
