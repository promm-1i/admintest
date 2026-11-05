// 원본 스크립트가 원본 서버 · 주소를 부르는 자리를 대신한다 (Claude 10-26, build/port_js.py 가 만듦)
(function(){
  var PATH = {"/": "index.html", "/support/location": "location.html", "/story/specialty": "story-specialty.html", "/story/history": "story-history.html", "/story/team": "story-team.html", "/story/equipment": "story-equipment.html", "/story/stories": "treatment-cases.html", "/story/media": "media.html", "/story/talk": "health-videos.html", "/prostate/bph": "prostate-bph.html", "/prostate/bph-surgery": "prostate-bph-surgery.html", "/prostate/holep": "prostate-laser-enucleation.html", "/prostate/aquablation": "prostate-waterjet-resection.html", "/prostate/rezum": "prostate-steam-therapy.html", "/prostate/itind": "prostate-temporary-expansion.html", "/prostate/urolift": "prostate-lift.html", "/prostate/revision-clinic": "prostate-revision-clinic.html", "/prostate/prostatitis": "prostate-prostatitis.html", "/prostate/prostate-cancer": "prostate-prostate-cancer.html", "/prostate/mri-biopsy": "prostate-fusion-biopsy.html", "/prostate/mri": "prostate-imaging.html", "/stone/urinary-stone": "stone-urinary-stone.html", "/stone/eswl": "stone-eswl.html", "/stone/urs": "stone-urs.html", "/stone/pcnl": "stone-pcnl.html", "/stone/zamenix": "stone-robotic-navigation.html", "/stone/urodot": "stone-image-analysis.html", "/std/condyloma": "std-condyloma.html", "/std/herpes": "std-herpes.html", "/std/urethritis": "std-urethritis.html", "/std/other-std": "std-other-std.html", "/std/gardasil": "std-vaccination.html", "/voiding/symptoms": "voiding-symptoms.html", "/voiding/retention": "voiding-retention.html", "/voiding/bladder-disease": "voiding-bladder-disease.html", "/voiding/stricture": "voiding-stricture.html", "/voiding/kidney-disease": "voiding-kidney-disease.html", "/voiding/bladder-cancer": "voiding-bladder-cancer.html", "/voiding/hematuria": "voiding-hematuria.html", "/male/ed": "male-ed.html", "/male/vasectomy": "male-vasectomy.html", "/male/male-surgery": "male-male-surgery.html", "/male/circumcision": "male-circumcision.html", "/male/male-urology": "male-male-urology.html", "/male/reconstruction": "male-reconstruction.html", "/male/infertility": "male-infertility.html", "/male/wedding-checkup": "male-wedding-checkup.html", "/female/cystitis": "female-cystitis.html", "/female/ic": "female-ic.html", "/female/oab": "female-oab.html", "/female/incontinence": "female-incontinence.html", "/support/consult": "consult.html", "/support/reserve": "reserve.html", "/support/results": "results.html", "/support/qna": "faq.html", "/support/notice": "notice.html", "/support/certificate": "support-certificate.html", "/support/pricing": "support-pricing.html", "/support/self-check": "support-self-check.html", "/support/notice/view": "notice-detail-1.html", "/story/team/view": "doctor-1.html", "/support/self-check-test": "self-check-1.html", "/support/self-check-venereal": "support-self-check-venereal.html", "/support/self-check-hematuria": "support-self-check-hematuria.html", "/support/reserve/write": "reserve-form-2.html", "/story/stories/videos/view": "treatment-video-1.html"}, FORM_MSG = "현재 온라인 신청은 이용할 수 없습니다. 상담은 전화로 문의해 주세요.", READY = "준비 중인 기능입니다.", DYN_CLS = {"ai_review_item": "on-30949bbb78", "ai_case_item": "on-db11302a7c", "ai_video_item": "on-aix-mv-it", "scroll-anchor": "on-scr-nchx"};
  window.onCls = function(n){ return DYN_CLS[n] || n; };
  var REFS = ['ST5nUrk1765175403', 'ST2U7uO1762500982', 'STb3wyi1765175690', 'ST4gOtu1765176116', 'STOFqGC1765176483'];
  var REF_OF_PAGE = window.ON_REF_PATH || '/';
  function quiet(){}
  function pageOf(u){
    var a; try { a = new URL(u, 'https://www.onrium.example' + REF_OF_PAGE); } catch(e) { return null; }
    if (!/(^|\.)onrium\.example$/i.test(a.hostname)) return a.hostname !== location.hostname ? 'EXTERNAL' : (/\.html$/.test(a.pathname) ? a.pathname.split('/').pop() : null);
    var path = a.pathname.replace(/\/+$/, '') || '/', q = a.searchParams;
    if (/\.html$/.test(path) && !PATH[path]) return path.split('/').pop();
    if (path === '/story/stories') return ({case: 'treatment-cases.html', review: 'treatment-reviews.html', video: 'treatment-videos.html'})[q.get('cate') || 'case'] || 'treatment-cases.html';
    if (path === '/support/location') { var t = q.get('tab') || ''; return /^[23567]$/.test(t) ? 'location-' + t + '.html' : 'location.html'; }
    if (path === '/support/reserve/write') { var b = q.get('branchIdx') || '2'; return 'reserve-form-' + (/^[235]$/.test(b) ? b : '2') + '.html'; }
    if (path === '/story/team/view') return ({'8': 'doctor-1.html', '10': 'doctor-2.html'})[q.get('doctorIdx')] || 'story-team.html';
    if (path === '/support/notice/view') return ({'564': 'notice-detail-1.html', '584': 'notice-detail-2.html'})[q.get('idx')] || 'notice.html';
    if (path === '/story/stories/videos/view') return ({'20': 'treatment-video-1.html', '19': 'treatment-video-2.html'})[q.get('idx')] || 'treatment-videos.html';
    if (/^\/(support\/)?self-check-test(\/self-check-test)?$/.test(path)) { var i = REFS.indexOf(q.get('ref')); return i >= 0 ? 'self-check-' + (i + 1) + '.html' : 'support-self-check.html'; }
    var top = {'/female': 'female-cystitis.html', '/male': 'male-ed.html', '/prostate': 'prostate-bph.html', '/std': 'std-condyloma.html',
               '/stone': 'stone-urinary-stone.html', '/story': 'story-specialty.html', '/support': 'location.html', '/voiding': 'voiding-symptoms.html', '/': 'index.html'};
    if (top[path]) return top[path];
    if (path.indexOf('/story/media/view') === 0) return 'media.html';
    if (path.indexOf('/story/talk/view') === 0) return 'health-videos.html';
    if (path.indexOf('/support/qna/view') === 0) return 'faq.html';
    if (path.indexOf('/support/consult/write') === 0) return 'consult.html';
    if (path.indexOf('/support/results/write') === 0) return 'results.html';
    if (PATH[path]) return PATH[path];
    var pre = [['/support/notice', 'notice.html'], ['/story/team', 'story-team.html'], ['/story/stories/videos', 'treatment-videos.html'], ['/story/stories', 'treatment-cases.html']];
    for (var k = 0; k < pre.length; k++) if (path.indexOf(pre[k][0] + '/') === 0) return pre[k][1];
    return null;
  }
  window.onNotice = function(msg){ if (window.alertLayer && window.jQuery) alertLayer(msg); else alert(msg); };
  window.onGo = function(u, target){
    if (u === undefined || u === null) return;
    u = String(u);
    if (/^(#|javascript:)/.test(u) || u === '') return;
    if (/^tel:/.test(u)) { location.href = 'tel:020002026'; return; }
    var f = pageOf(u);
    if (!f || f === 'EXTERNAL') { onNotice(READY); return; }
    if (target === '_blank') window.open(f, '_blank'); else location.href = f;
  };
  window.onOpen = function(u, target){
    if (!u) { onNotice(READY); return {document: {open: quiet, write: quiet, close: quiet}, focus: quiet, print: quiet, close: quiet}; }   // 인쇄용 약도 창 등
    onGo(u, '_blank'); return null; };
  var JSON_OK = {
    getReserveTime: {success: true, data: {time_options: ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30'], holiday: '7'}},
    getQuickReserveTime: {success: true, data: {holiday: '7'}},
    getPublicHolidays: {success: true, data: []},
    getFullHolidayException: {success: true, data: []},
    getUploadedCommonFileJson: null          // 첨부 없음 → 콜백을 부르지 않는다(빈 배열을 넘기면 원본 함수가 정의 안 된 deleteBtn 을 읽는다)
  };
  // 목록 불러오기: 목록은 이미 HTML 에 있으니 두고, 뒤처리 콜백(벽돌 배치 · ScrollTrigger 등)만 부른다.
  // 2쪽 이상 넘김은 자료가 없으니 준비 중 알림(원본은 서버에서 다음 쪽을 받아 바꿔 끼운다)
  function list(divid, frm, url, pa, cb){
    if (/Proc\.php/.test(String(url))) { if (!/kakaoLogin/.test(url)) onNotice(READY); return; }
    var m = /(?:^|&)page=(\d+)/.exec(String(pa || ''));
    if (m && m[1] !== '1') { onNotice(READY); return; }
    var run = (window.ON_AJAX_JS || {})[divid];
    setTimeout(function(){
      // 원본: 응답 HTML 을 넣으며 그 안 <script> 실행 → 콜백. 목록 HTML 은 이미 있으니 스크립트만 전역으로 돌린다
      if (run && !run.done) { run.done = 1; run.forEach(function(s){ var n = document.createElement('script'); n.text = s; document.head.appendChild(n); n.remove(); }); }
      if (typeof cb === 'function') { var el = divid ? document.getElementById(divid) : null; cb(el ? el.innerHTML : ''); }
    }, 0);
  }
  function json(divid, frm, url, pa, cb){
    for (var k in JSON_OK) if (String(url).indexOf(k) >= 0) { if (typeof cb === 'function' && JSON_OK[k]) { var r = JSON.parse(JSON.stringify(JSON_OK[k])); setTimeout(function(){ cb(r); }, 0); } return; }
    if (frm) onNotice(FORM_MSG);
  }
  window.onStubs = function(){
    window.ajaxProc = list; window.ajaxJsonProc = json; window.ajaxMultiProc = quiet; window.ajaxMultiJsonProc = quiet;
    window.ajaxFileUploadProc = quiet; window.insertLog = quiet; window.translation = quiet;
    ['openLoginModal', 'loginWithKakao', 'kakaoLogout', 'kakaoTalkShare', 'snsCon', 'snsConMobile', 'copyLink', 'snsLogin', 'daumZipSearch'].forEach(function(n){ window[n] = function(){ onNotice(READY); }; });
    if (window.jQuery && !jQuery.ajax.onStub) {
      // 자가 점검 결과 저장 · 그림 글자 읽기 등 원본 서버 호출 → 보내지 않고 실패 처리(원본 오류 처리기가 다음 쪽으로 보냄)
      var stub = function(o){ var d = jQuery.Deferred(); setTimeout(function(){ var x = {status: 0, responseText: ''}; if (o && o.error) o.error(x, 'error', ''); if (o && o.complete) o.complete(x, 'error'); d.reject(x, 'error', ''); }, 0); return d.promise(); };
      stub.onStub = 1; jQuery.ajax = stub;
    }
  };
  window.Kakao = { init: quiet, isInitialized: function(){ return true; }, Share: { sendDefault: function(){ onNotice(READY); } },
                   Link: { sendDefault: function(){ onNotice(READY); } }, Auth: { login: function(){ onNotice(READY); }, logout: quiet, getAccessToken: function(){ return null; } } };
  onStubs();
})();
