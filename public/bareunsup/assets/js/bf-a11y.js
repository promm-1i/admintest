// Codex 공용 스크립트에서 접근성 보정만 남김 (Claude 10-26). 동작은 원본 스크립트가 맡는다.
(function(){
  'use strict';
  var qa = function(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function fix(){
    qa('button').forEach(function(b, i){ if (!((b.innerText || '').trim() || b.getAttribute('aria-label') || b.getAttribute('title'))) b.setAttribute('aria-label', '기능 버튼 ' + (i + 1)); });
    qa('img:not([alt])').forEach(function(img, i){ img.setAttribute('alt', '바른숲병원 안내 이미지 ' + (i + 1)); });
    qa('a').forEach(function(a, i){ if (!((a.innerText || '').trim() || a.getAttribute('aria-label') || a.getAttribute('title') || a.querySelector('img[alt]:not([alt=""])'))) a.setAttribute('aria-label', '이동 링크 ' + (i + 1)); });
    qa('input:not([type=hidden]),textarea,select').forEach(function(el, i){ var lb = el.id && document.querySelector('label[for="' + CSS.escape(el.id) + '"]'); if (!(el.getAttribute('aria-label') || el.getAttribute('title') || (lb && lb.innerText.trim()) || el.getAttribute('placeholder'))) el.setAttribute('aria-label', el.getAttribute('name') || '입력 항목 ' + (i + 1)); });
    qa('body *').forEach(function(el, i){ var s = getComputedStyle(el); if (/auto|scroll/.test(s.overflowX + s.overflowY) && (el.scrollWidth > el.clientWidth + 2 || el.scrollHeight > el.clientHeight + 2)) { if (!el.hasAttribute('tabindex')) el.tabIndex = 0; if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', '스크롤 영역 ' + (i + 1)); } });
  }
  qa('form').forEach(function(f){ if (!f.getAttribute('onsubmit')) f.addEventListener('submit', function(e){ e.preventDefault(); window.bfNotice && bfNotice('입력 내용이 확인되었습니다. 이 템플릿에서는 실제 전송되지 않습니다.'); }); });
  if (window.bfStubs) bfStubs();                       // 쪽 스크립트가 같은 이름 함수를 다시 선언해도 서버를 부르지 않게
  fix(); document.addEventListener('DOMContentLoaded', fix); window.addEventListener('load', function(){ fix(); setTimeout(fix, 1200); });
})();
