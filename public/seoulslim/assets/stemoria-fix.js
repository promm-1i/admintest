window.STEM_FRAGS = {"bbs/ajaxBbsListHtml.php": {"d": "bbs_press", "v": {}}, "bbs/ajaxBbsListOriHtml.php": {"d": "bbs_press_ori", "v": {}}, "faq/ajaxListHtml.php": {"d": "faq", "v": {}}, "site/playListHtml.php": {"d": "play_youtube", "v": {"gubun=shorts": "play_shorts"}}, "bbs/ajaxListHtml.php": {"d": "news", "v": {}}, "bbs/ajaxResearchListHtml.php": {"d": "research_board", "v": {}}, "bbs/researchListHtml.php": {"d": "research", "v": {}}, "site/mediTeamList.php": {"d": "staff_52", "v": {}}, "consulting/timeAjaxProc.php": {"d": "time_list", "v": {}}, "include/mainSpotListView.php": {"d": "spot_main_52", "v": {"code=52": "spot_main_52", "code=36": "spot_main_36", "code=36-2": "spot_main_36-2", "code=18-4": "spot_main_18-4", "code=35": "spot_main_35", "code=21-4": "spot_main_21-4", "code=04": "spot_main_04", "code=06": "spot_main_06", "code=03": "spot_main_03", "code=34-1": "spot_main_34-1"}}, "site/areaTabHtml.php": {"d": "area_tab_0", "v": {"tabcode=충청권": "area_tab_1", "tabcode=영남권": "area_tab_2"}}, "include/spotListView.php": {"d": "branch_52", "v": {"code=52": "branch_52", "code=36": "branch_36", "code=36-2": "branch_36-2", "code=18-4": "branch_18-4", "code=35": "branch_35", "code=21-4": "branch_21-4", "code=04": "branch_04", "code=06": "branch_06", "code=03": "branch_03", "code=34-1": "branch_34-1"}}, "modal/privacy.php": {"d": "modal_privacy", "v": {}}, "modal/personal.php": {"d": "modal_personal", "v": {}}, "modal/billOfRights.php": {"d": "modal_billOfRights", "v": {}}, "modal/marketing.php": {"d": "modal_marketing", "v": {}}, "modal/reserv_complete.php": {"d": "modal_reserv_complete", "v": {}}, "modal/play_modal.php": {"d": "modal_play_modal", "v": {}}};
/* SEOUL SLIM — 원본 common.js 바로 뒤에 읽힌다.
   서버에서 불러오던 목록·팝업은 assets/frags.js 에 미리 담은 조각으로 채우고, 접수·로그인은 예시 알림으로 바꾼다. */
(function () {
  var NOTICE = '온라인 접수는 준비 중입니다.<br>상담은 010-4894-4905 로 연락해 주세요.';
  var MEMBER = '회원 기능은 준비 중입니다.';

  // 온라인 예약 달력 — 원본 달력 조각과 같은 마크업을 달마다 만든다(오늘 다음 날부터, 일요일 빼고 예약 가능)
  function calHtml(pa) {
    var q = {};
    String(pa || '').split('&').forEach(function (kv) { var p = kv.split('='); if (p[0]) q[p[0]] = p[1] || ''; });
    var now = new Date();
    var y = parseInt(q.curYear, 10) || now.getFullYear();
    var m = parseInt(q.curMonth, 10) || now.getMonth() + 1;
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var prev = m === 1 ? [y - 1, 12] : [y, m - 1];
    var next = m === 12 ? [y + 1, 1] : [y, m + 1];
    var arrow = function (d) {
      return '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 25 24" fill="none"><path d="' + d +
        '" stroke="#101010" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    };
    var h = '<div class="cal_top"><button type="button" class="btn prev" aria-label="이전 달" onclick="moveCalendar(\'' + prev[0] + '\', \'' + pad(prev[1]) + '\' ,\'\');">' +
      arrow('M15.5 18L9.5 12L15.5 6') + '</button><div class="date">' + y + '. ' + pad(m) + '</div>' +
      '<button type="button" class="btn next" aria-label="다음 달" onclick="moveCalendar(\'' + next[0] + '\', \'' + pad(next[1]) + '\', \'\');">' +
      arrow('M9.5 18L15.5 12L9.5 6') + '</button></div><div class="cal_box"><div class="week_wrap"><div class="week">일</div>' +
      '<div>월</div><div>화</div><div>수</div><div>목</div><div>금</div><div>토</div></div><div class="day_wrap">';
    var first = new Date(y, m - 1, 1).getDay();
    var days = new Date(y, m, 0).getDate();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var cells = Math.ceil((first + days) / 7) * 7;
    for (var i = 0; i < cells; i++) {
      var d = i - first + 1;
      var wd = i % 7;
      var cls = 'day' + (wd === 0 ? ' week' : wd === 6 ? ' sat' : '');
      if (d < 1 || d > days) { h += '<div class="' + cls + '" data-date=""></div>'; continue; }
      var dt = new Date(y, m - 1, d);
      if (dt.getTime() === today.getTime()) cls += ' today';
      var ymd = y + pad(m) + pad(d);
      h += '<div class="' + cls + '" data-date="' + y + '-' + pad(m) + '-' + pad(d) + '"><span class="date">' + d + '</span>' +
        (dt > today && wd !== 0 ? '<button type="button" class="btn" onclick="bookDateBTN(\'' + ymd + '\', this)">예약<br class="mini_only" />가능</button>' : '') +
        '</div>';
    }
    return h + '</div></div>';
  }

  function fragName(key, pa) {
    var e = (window.STEM_FRAGS || {})[key];
    if (!e) return null;
    var q = '&' + decodeURIComponent(String(pa || '').replace(/\+/g, ' ')).replace(/^&+/, '') + '&';
    for (var v in (e.v || {})) {
      if (q.indexOf('&' + v + '&') >= 0) return e.v[v];
    }
    return e.d;
  }

  window.ajaxProc = function (divid, frmnm, url, pa, cb) {
    var key = String(url).split('?')[0].split('/').slice(-2).join('/');
    var done = function (h) {
      if (divid) $('#' + divid).html(h);
      if (typeof cb === 'function') { try { cb(h); } catch (err) { /* 원본 콜백 오류는 무시 */ } }
    };
    if (key === 'consulting/calendarHtml.php' || key === 'calendar/calendarHtml.php') { done(calHtml(pa)); return; }
    var name = fragName(key, pa);
    if (!name) { done(''); return; }
    $.get('assets/frags/' + name + '.html', done, 'html');
  };
  window.ajaxJsonProc = function (divid, frmnm, url, pa, cb) {
    if (typeof cb === 'function') { try { cb({ success: false, msg: NOTICE }); } catch (err) {} }
  };
  window.ajaxMultiProc = window.ajaxMultiProc_new = function () { alertLayer(NOTICE); };
  window.insertLog = function () {};
  window.translatePage = function () { return Promise.resolve(); };
  window.setMapType = window.zoomIn = window.zoomOut = window.mapRefresh = function () {};

  var openModal0 = window.openModal;
  window.openModal = function (name, a) {
    if (/^(login|join)/.test(name)) { alertLayer(MEMBER); return; }
    if (name === 'play_modal') {
      ajaxProc('modalView', '', 'modal/play_modal.php', 'v=' + (a || ''), openModalEnd);
      return;
    }
    return openModal0.apply(this, arguments);
  };
  window.openModalPlay = function (name, params) { window.openModal(name, params); };

  // 로그인해야 보이던 후기 자세히 보기도 회원 알림으로
  $(document).on('click', 'a[href="#member"]', function (e) { e.preventDefault(); alertLayer(MEMBER); });
})();

// nice-select 펼침 목록은 스크롤되는데 초점을 받을 수 없어 키보드로 못 내린다
$(window).on('load', function () { $('.nice-select .list').attr('tabindex', '0'); });
