/* Lumian page interactions */
(function () {
  'use strict';

  // medical-column: 해시태그(#…) 단위로 span 감싸 줄바꿈
  function wrapColumnCardCate() {
    document.querySelectorAll('.column_card_cate, .board-media__cate').forEach(function (el) {
      if (el.dataset.cateWrapped === '1') return;
      var text = (el.textContent || '').trim();
      if (text.indexOf('#') === -1) return;

      var tags = text.match(/#[^\s#]+(?:\s+[^\s#]+)*/gu);
      if (!tags || !tags.length) return;

      el.textContent = '';
      tags.forEach(function (tag, i) {
        if (i) el.appendChild(document.createTextNode(' '));
        var span = document.createElement('span');
        span.textContent = tag;
        el.appendChild(span);
      });
      el.dataset.cateWrapped = '1';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wrapColumnCardCate);
  } else {
    wrapColumnCardCate();
  }
})();
