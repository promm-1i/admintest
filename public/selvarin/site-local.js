(function () {
  'use strict';
  var responsive = document.createElement('link');
  responsive.rel = 'stylesheet';
  responsive.href = './clinic-r-responsive.css';
  document.head.appendChild(responsive);
  document.documentElement.classList.add('clinic-r-ready');
  document.documentElement.classList.add('clinic-r-local');
  var skip = document.createElement('a');
  skip.className = 'clinic-r-skip-link';
  skip.href = '#clinic-r-main';
  skip.textContent = 'Skip to main content';
  document.body.insertBefore(skip, document.body.firstChild);
  var mainLandmark = document.querySelector('main');
  if (mainLandmark && !mainLandmark.id) mainLandmark.id = 'clinic-r-main';
  if (mainLandmark && !mainLandmark.getAttribute('tabindex')) mainLandmark.setAttribute('tabindex', '-1');
  // Keep utility/document pages in the same semantic section structure as the
  // treatment pages. This is intentionally content-neutral: it only supplies
  // a landmark when the collected legacy markup has none.
  if (!document.querySelector('main section, section')) {
    var landmark = document.createElement('section');
    landmark.className = 'clinic-r-content-landmark';
    landmark.setAttribute('aria-label', 'Seolivane content');
    var main = document.querySelector('main') || document.body;
    while (main.firstChild && main.firstChild !== document.querySelector('header')) {
      landmark.appendChild(main.firstChild);
    }
    main.appendChild(landmark);
  }
  document.querySelectorAll('a[href$=".php"], a[href*=".php?"]').forEach(function (link) {
    link.href = link.href.replace(/\.php(?=\?|$)/, '.html');
  });
  document.querySelectorAll('img:not([alt])').forEach(function (img) {
    img.alt = '';
  });
  document.querySelectorAll('img[alt=""]').forEach(function (img) {
    if (!img.closest('.logo, .sound_only, [aria-hidden="true"]') &&
        !/logo|icon|arrow|cursor|blank|spacer/i.test(img.src)) {
      img.alt = 'Seolivane clinic image';
    }
  });
  document.querySelectorAll('img:not([loading])').forEach(function (img) {
    if (!img.closest('header, .logo, .hd_logo')) img.loading = 'lazy';
  });
  document.querySelectorAll('a[href="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) { event.preventDefault(); });
  });
  document.querySelectorAll('#top_btn, button.top_btn01').forEach(function (button) {
    if (!button.getAttribute('aria-label')) button.setAttribute('aria-label', '맨 위로 이동');
  });
  document.querySelectorAll('select').forEach(function (select) {
    if (!select.getAttribute('aria-label')) select.setAttribute('aria-label', '검색 기준');
  });
  document.querySelectorAll('input[type="text"], input[type="search"]').forEach(function (input) {
    if (!input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
      input.setAttribute('aria-label', input.placeholder || '검색어');
    }
  });
  document.querySelectorAll('iframe').forEach(function (frame) {
    if (!frame.title) frame.title = 'Seolivane clinic video';
  });
  document.querySelectorAll('[aria-label="메뉴"], .menu_btn, .m_menu_btn').forEach(function (button) {
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', function () {
      var expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      document.body.classList.toggle('menu-open', !expanded);
    });
  });
  document.querySelectorAll('button, a').forEach(function (control) {
    control.addEventListener('keydown', function (event) {
      if (event.key === ' ' && control.tagName === 'A') {
        event.preventDefault();
        control.click();
      }
    });
  });
  document.querySelectorAll('.main-popup-slide .swiper-pagination-bullet').forEach(function (el, i) {
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', el.getAttribute('aria-label') || ('팝업 ' + (i + 1) + '번 보기'));
    el.setAttribute('tabindex', '0');
  });
  document.querySelectorAll('.main-popup-close').forEach(function (el) {
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', '팝업 닫기');
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
  });
  document.querySelectorAll('.mv_btn022 input').forEach(function (el) {
    if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', '메인 영상 재생 전환');
  });
  document.querySelectorAll('.logo a[href="javascript:;"], .ft_logo').forEach(function (el) {
    if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', '셀바린의원 홈');
  });
  document.querySelectorAll('[data-contact-channel]').forEach(function (el) {
    if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', '카카오톡 상담 열기');
  });
  document.querySelectorAll('.logo > a, .hd_logo > a, .gnb_logo > a, .ft_logo > a').forEach(function (el) {
    if (!el.getAttribute('aria-label') && !el.textContent.trim()) el.setAttribute('aria-label', 'Seolivane clinic home');
  });
  document.querySelectorAll('[role="tablist"] > a').forEach(function (tab) {
    tab.setAttribute('role', 'tab');
    if (!tab.hasAttribute('aria-selected')) tab.setAttribute('aria-selected', 'false');
  });
  document.querySelectorAll('.stop > ul, .sbot > ul').forEach(function (list) {
    // The collected footer markup puts anchors directly under a list. Keep the
    // visual DOM intact while restoring the required ul > li relationship.
    Array.prototype.slice.call(list.children).forEach(function (child) {
      if (child.tagName === 'A') {
        var item = document.createElement('li');
        item.className = 'clinic-r-nav-item';
        child.parentNode.insertBefore(item, child);
        item.appendChild(child);
      }
    });
  });
  var contrastStyle = document.createElement('style');
  contrastStyle.textContent = '.clinic-r-skip-link{position:fixed;left:12px;top:-48px;z-index:10000;padding:10px 14px;background:#2d2926;color:#fff;border-radius:4px;font-weight:700}.clinic-r-skip-link:focus{top:12px}.clinic-r-skip-link:focus-visible{outline:3px solid #d8a46b;outline-offset:2px}.clinic-r-skip-link+*{} main:focus{outline:3px solid #d8a46b;outline-offset:4px}.header-3,.header-4,.re01_tx01 .single-line-inner,.cont_tx_bx .avenue,.cont_tx_bx .p2,.con_bt>p,.re03_txcont_left span,.txt01,.sw_h1 .avenue,.sub_title_sun,.sub_btn_00,.eyebrow,.point_f>p,.point_w .point_f>p,.pc_cont_768 span em,.sp2>em,.date>span,.tttjtj,.last.location_li .date{color:#5a1f10 !important;} .wnckdksso>p,.wnckdksso p{color:#5a1f10 !important;} .con_bt>a[href$="story.html"],a[href$="Ultheraintense.html"]{background-color:#8f3518 !important;color:#fff !important;} a[href$="Ultheraintense.html"] *{color:#fff !important;} .pc_cont_768 .re06_cont .re06_cont01 .hv_tx h1,.re06_item .hv_tx h1,.rection06 .re06_cont .re06_cont01 .hv_tx h1{color:#111 !important;} .stop a,.sbot a{color:#4a1a0d !important;} .swiper-slide a[href="javascript:;"],.swiper-slide a[href="javascript:;"] *,.category a[data-cat]{color:#5a1f10 !important;} .date>span,.tttjtj,.last.location_li:nth-child(4)>.date{color:#5a1f10 !important;background-color:#fff7f2 !important;}';
  document.head.appendChild(contrastStyle);
}());
