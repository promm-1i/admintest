
var loadingYn = "N";
function getCookie(name) {
  var m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : '';
}
function setCookie(name, value, expiredays) {
  var d = new Date();
  d.setDate(d.getDate() + (expiredays || 1));
  document.cookie = name + '=' + encodeURIComponent(value) + '; path=/; expires=' + d.toUTCString();
}
function deleteCookie(name) { setCookie(name, '', -1); }
var BG_NOTICE = '예시 화면이라 실제로 접수되지 않습니다. 상담은 010-4894-4905 로 연락해 주세요.';
function ajaxProc(divid, frmnm, urlLink, pa, returnData) {
  if (/Proc\.php$/.test(urlLink)) alert(BG_NOTICE);
}
function ajaxJsonProc() {}
function openModal(name) {
  if (name === 'privacy') { location.href = 'privacy.html'; return; }
  alert('예시 화면이라 로그인·회원 기능은 동작하지 않습니다.');
}
function openOverModal() { alert(BG_NOTICE); }
function modalClose() {
  $('.eb-mdlx').find('input[type=text], input[type=tel]').val('');
  $('.eb-mdlx').removeClass('open');
  $('html').removeClass('eb-scr-nnx');
}
function overModalClose() {
  $('.eb-vrx-mdlx').removeClass('open');
  $('html').removeClass('eb-scr-nnx');
}
function copyLink() {
  var t = document.createElement('textarea');
  document.body.appendChild(t);
  t.value = location.href;
  t.select();
  document.execCommand('copy');
  document.body.removeChild(t);
  alert('클립보드에 복사되었습니다');
}
function CheckEmail(s) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s); }
function validateNumericInput(input) { input.value = input.value.replace(/[^0-9]/g, ''); }
(function () {
  function run(el, attr, e) {
    var r = (new Function('event', el.getAttribute(attr))).call(el, e);
    if (r === false) e.preventDefault();
  }
  ['click', 'change', 'input', 'submit'].forEach(function (type) {
    document.addEventListener(type, function (e) {
      var attr = 'data-on' + type;
      var el = e.target.closest ? e.target.closest('[' + attr + ']') : null;
      if (el) run(el, attr, e);
    });
  });
})();
