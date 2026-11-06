/* SEOUL SLIM — 원본 페이지 스크립트가 부르는 외부 함수 자리(분석·광고·카카오)를 비워 둔다. */
window.dataLayer = window.dataLayer || [];
window.gtag = function () {};
window.wcs = { inflow: function () {} };
window.wcs_do = function () {};
window.wcs_add = {};
window._nasa = {};
window.kakaoPixel = function () { return { pageView: function () {}, participation: function () {}, completeRegistration: function () {} }; };
window.fncGooglescript = function () {};
window.fncDaumscript = function () {};
window.Kakao = {
  init: function () {}, isInitialized: function () { return true; },
  Auth: { login: function () {}, authorize: function () {}, logout: function () {} },
  API: { request: function () { return { then: function () { return { catch: function () {} }; } }; } },
  Channel: { chat: function () {}, addChannel: function () {} },
  Share: { sendDefault: function () {} }
};
