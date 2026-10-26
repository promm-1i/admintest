// 원본 스크립트가 원본 서버 · 주소를 부르는 자리를 대신한다 (Claude 10-26, port_js.py 가 만듦)
(function(){
  var PATH = {"/": "index.html", "/specialty/spine": "spine.html", "/specialty/spine/conditions": "spine-conditions.html", "/specialty/spine/nonsurgical": "spine-nonsurgical.html", "/specialty/spine/surgical": "spine-surgical.html", "/specialty/joint": "joint.html", "/specialty/joint/conditions": "joint-conditions.html", "/specialty/joint/nonsurgical": "joint-nonsurgical.html", "/specialty/joint/knee-injection": "joint-injection.html", "/specialty/joint/surgical": "joint-surgical.html", "/specialty/brain": "brain.html", "/specialty/brain/conditions": "brain-conditions.html", "/specialty/brain/checkup": "brain-checkup.html", "/specialty/brain/iv-therapy": "brain-iv-therapy.html", "/specialty/brain/sclerotherapy": "brain-sclerotherapy.html", "/specialty/heart": "heart.html", "/specialty/heart/conditions": "heart-conditions.html", "/specialty/heart/diagnostics": "heart-diagnostics.html", "/specialty/heart/covid-care": "heart-recovery.html", "/specialty/internal-medicine": "internal-medicine.html", "/specialty/internal-medicine/endocrine": "endocrine.html", "/specialty/internal-medicine/iv-therapy": "iv-therapy.html", "/specialty/internal-medicine/obesity": "obesity.html", "/specialty/anesthesia": "anesthesia.html", "/specialty/imaging": "imaging.html", "/specialty/ai-innovation": "medical-innovation.html", "/guide/doctors": "doctors.html", "/guide/doctors/1": "doctor-1.html", "/guide/doctors/16": "doctor-2.html", "/guide/doctors/32": "doctor-3.html", "/guide/hours": "hours.html", "/guide/directions": "directions.html", "/guide/facilities": "facilities.html", "/guide/admission": "admission.html", "/guide/fees": "fees.html", "/guide/documents": "documents.html", "/guide/appointment": "appointment.html", "/media/press": "press.html", "/media/press/1486": "press-detail-1.html", "/media/press/1498": "press-detail-2.html", "/media/sns": "sns.html", "/community/notice": "notice.html", "/community/notice/676": "notice-detail-1.html", "/community/notice/625": "notice-detail-2.html", "/community/reviews": "reviews.html", "/community/faq": "faq.html", "/community/meals": "meals.html", "/about/introduction": "about.html", "/about/mission-vision": "mission.html", "/about/convivio": "community-care.html", "/about/research": "research.html", "/about/csr": "csr.html", "/about/csr/371": "csr-detail-1.html", "/about/csr/367": "csr-detail-2.html", "/blog": "blog.html", "/blog/spinal-disease": "blog-spine.html", "/blog/joint-disease": "blog-joint.html", "/blog/neuro-cardiovascular": "blog-brain-heart.html", "/blog/artificial-disc-replacement-vs-fusion": "blog-detail-1.html", "/blog/manual-therapy-for-spine": "blog-detail-2.html", "/specialty": "spine.html", "/guide": "doctors.html", "/media": "press.html", "/community": "notice.html", "/about": "about.html"}, DETAIL = {"/media/press": "press.html", "/community/notice": "notice.html", "/about/csr": "csr.html", "/guide/doctors": "doctors.html"}, FORM_MSG = "입력 내용이 확인되었습니다. 이 템플릿에서는 실제 전송되지 않습니다.", READY = "준비 중인 기능입니다.", AJAX_IDS = {"listView": "bf-i-ls-vwx", "mttListView": "bf-i-mttx-ls-vwx", "counselList": "bf-i-cnsx-ls", "ajaxListArea": "bf-i-jxx-ls-ar", "mealListArea": "bf-i-mlx-ls-ar", "planListArea": "bf-i-plnx-ls-ar"}, DYN_CLS = {"tab_cont1": "bf-tb-cntx2", "tab_cont2": "bf-tb-cntx3"}, DYN_ID = {"lnbDepth1": "bf-i-ln-dptx", "lnbDepth2": "bf-i-ln-dptx2", "lnbDepth3": "bf-i-ln-dptx3"};
  window.bfCls = function(n){ return DYN_CLS[n] || n; };
  window.bfId = function(n){ return DYN_ID[n] || n; };
  function pageOf(u){
    var a; try { a = new URL(u, 'https://www.bareunsup.example' + location.pathname.replace(/^.*\/bareunsup/, '')); } catch(e) { return null; }
    if (!/(^|\.)bareunsup\.example$/i.test(a.hostname)) return a.href.indexOf('http') === 0 && a.hostname !== location.hostname ? 'EXTERNAL' : null;
    var path = a.pathname.replace(/\/+$/, '') || '/', q = a.searchParams, p = q.get('p') || '';
    if (/\.html$/.test(path) && PATH[path] === undefined) { var f = path.split('/').pop(); return f; }
    if (path === '/') {
      if (p.indexOf('21') === 0) return 'counsel-write.html';
      var P = {'22': 'press.html', '26': 'notice.html', '27': 'reviews.html', '28': 'faq.html', '29': 'meals.html', '33': 'csr.html'};
      if (p.indexOf('29_view') === 0) return ({'11': 'meal-detail-1.html', '18': 'meal-detail-2.html'})[q.get('idx')] || 'meals.html';
      if (P[p]) return P[p];
      if (!p) return 'index.html';
    }
    if (path === '/guide/appointment') return q.get('tab') === '2' ? 'counsel.html' : 'appointment.html';
    if (PATH[path]) return PATH[path];
    for (var k in DETAIL) if (path.indexOf(k + '/') === 0) return DETAIL[k];
    if (path.indexOf('/blog/') === 0) return 'blog.html';
    return null;
  }
  window.bfNotice = function(msg){ if (window.alertLayer && window.jQuery) alertLayer(msg); else alert(msg); };
  window.bfGo = function(u, target){
    if (u === undefined || u === null) return;
    u = String(u);
    if (/^(#|javascript:)/.test(u) || u === '') return;
    if (/^tel:/.test(u)) { location.href = 'tel:01048944905'; return; }
    var f = pageOf(u);
    if (!f || f === 'EXTERNAL') { bfNotice(READY); return; }
    if (target === '_blank') window.open(f, '_blank'); else location.href = f;
  };
  window.bfOpen = function(u, target){ bfGo(u, '_blank'); return null; };
  function quiet(){}
  function form(divid, frm){ if (frm) bfNotice(FORM_MSG); }
  // 목록 불러오기: 목록은 이미 HTML 에 있으니 두고, 뒤처리 콜백(ScrollTrigger 등)만 부른다.
  // 검색 폼(frm)을 넘겨도 첫 화면 목록 불러오기다 — 사용자가 누른 전송 알림은 bf-a11y 의 submit 처리가 띄운다 (Claude 10-26)
  function list(divid, frm, url, pa, cb){
    if (!divid || typeof cb !== 'function') return;
    var el = document.getElementById(AJAX_IDS[divid] || divid);
    setTimeout(function(){ cb(el ? el.innerHTML : ''); }, 0);
  }
  window.bfStubs = function(){
    window.ajaxProc = list; window.ajaxJsonProc = form; window.ajaxMultiProc = quiet; window.ajaxMultiJsonProc = quiet;
    window.ajaxFileUploadProc = quiet; window.insertLog = quiet; window.translation = quiet; window.sendToLangToSERVER = function(a, cb){};
    ['openLoginModal', 'openJoinModal', 'openFindModal', 'login', 'loginWithKakao', 'kakaoLogout', 'medicalLike', 'medicalLike2',
     'kakaoTalkShare', 'snsCon', 'snsConMobile', 'copyLink'].forEach(function(n){ window[n] = function(){ bfNotice(READY); }; });
  };
  window.Kakao = { init: quiet, isInitialized: function(){ return true; }, Share: { sendDefault: function(){ bfNotice(READY); } },
                   Link: { sendDefault: function(){ bfNotice(READY); } }, Auth: { login: function(){ bfNotice(READY); }, logout: quiet } };
  bfStubs();
})();
