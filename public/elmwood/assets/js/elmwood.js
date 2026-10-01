/* 엘름우드 — 원본(Next.js · React) 동작을 그대로 옮긴 우리 스크립트. class 이름은 빌드 때 우리 이름표로 바뀐다(js.py) */
(function () {
  'use strict';
  var W = window, D = document;
  var EW = {}, PATH = '';                 /* 쪽 설정(window.EW)은 이 파일 뒤에 오는 줄에서 정해진다 — init 에서 읽는다 */
  var A = './assets/';
  var IC = A + 'img/icons/';
  function $(s, r) { return (r || D).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || D).querySelectorAll(s)); }
  function on(el, ev, fn, o) { if (el) el.addEventListener(ev, fn, o || false); }
  function toks(s) { return (s || '').split(/\s+/).filter(Boolean); }
  function addc(el, s) { if (el) toks(s).forEach(function (t) { el.classList.add(t); }); }
  function delc(el, s) { if (el) toks(s).forEach(function (t) { el.classList.remove(t); }); }
  function swap(el, cond, yes, no) { if (!el) return; delc(el, cond ? no : yes); addc(el, cond ? yes : no); }
  function isMo() { return W.innerWidth < 1024; }
  function kids(el) { return el ? [].slice.call(el.children) : []; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  var HIDDEN = "hidden";

  /* ── 본문 스크롤 잠금(앤트 창이 열릴 때 body 에 거는 것과 같은 값) ── */
  var locks = 0;
  function lockBody(yes) {
    locks += yes ? 1 : -1;
    if (locks < 0) locks = 0;
    if (locks) {
      var sw = W.innerWidth - D.documentElement.clientWidth;
      D.body.style.overflowY = 'hidden';
      if (sw > 0) D.body.style.width = 'calc(100% - ' + sw + 'px)';
    } else {
      D.body.style.overflowY = '';
      D.body.style.width = '';
    }
  }

  /* ════════ 머리글 — 원본 N() 의 상태 그대로: E 스크롤 · z 숨김 · U 모바일 메뉴 · W 닫히는 중 · T 검색 · M 모바일 폭 · P 흰 머리글 쪽 · V 펼친 하위 메뉴 ════════ */
  var HB = "ewhd ewtrnx-tp ewfx ewlf-0 ewtp-0 ewzx-50 ewwx-fllx eweasx-inx-outx ewbfrx-bslx ewbfrx-lf-0 ewbfrx-zx-12 ewbfrx-blcx ewbfrx-hx-fllx ewbfrx-wx-fllx ewbfrx-bk-thmx-blcx ewbfrx-trnx-pctx ewbfrx-dlyx-0 ewbfrx-drtx-300 ewbfrx-easx-inx-outx ewbfrx-ct", NB = "ewzx-1 ewrltx ewmxx-20px2 ewflxx ewhx-84px ewjstx-btwx ewptx-22px ewdlyx-0 ewdrtx-0 ewlgx-mxx-40px ewlgx-hx-100x ewlgx-ptx-23px", MB = "ewtrnx-lf ewfx ewtp-84px ewzx-50 ewhx-clcx-100x-83px ewwx-fllx ewvrfx-yx-autx ewbk-thmx-blcx ewpbx-74px ewldnx-120x ewdlyx-0 ewdrtx-500 eweasx-inx-outx ewlgx-rltx ewlgx-lf-autx ewlgx-tp-autx ewlgx-flxx ewlgx-hx-fllx ewlgx-flxx-rw ewlgx-tmsx-md ewlgx-gpx-14px ewlgx-vrfx-vsbx ewlgx-bk-trnx ewlgx-px-0 ewlgx-drtx-0 ewxlx-gpx-28px", LB = ["ewbfrx-zx-1 ewbfrx-trnx-wdtx ewrltx ewnlnx-blcx ewhx-37px ewwx-fllx ewtx-f16x2 ewfntx-mdmx ewldnx-37px ewbfrx-bslx ewbfrx-bt-0 ewbfrx-lf-0 ewbfrx-blcx ewbfrx-hx-2pxx ewbfrx-wx-0 ewbfrx-bk-thmx-blcx ewbfrx-drtx-300 ewbfrx-easx-inx-outx ewbfrx-ct ewlgx-wx-autx ewlgx-pxx-6pxx ewlgx-ldnx-37px ewlgx-hvrx-bfrx-wx-fllx ewxlgx-hx-37px ewxlx-pxx-10px ewxlx-tx-f17x", "ewbfrx-zx-1 ewbfrx-trnx-wdtx ewrltx ewnlnx-blcx ewhx-37px ewwx-fllx ewtx-f16x2 ewfntx-mdmx ewldnx-37px ewbfrx-bslx ewbfrx-bt-0 ewbfrx-lf-0 ewbfrx-blcx ewbfrx-hx-2pxx ewbfrx-wx-0 ewbfrx-bk-thmx-blcx ewbfrx-drtx-300 ewbfrx-easx-inx-outx ewbfrx-ct ewlgx-hx-37px ewlgx-wx-autx ewlgx-pxx-6pxx ewlgx-ldnx-37px ewlgx-hvrx-bfrx-wx-fllx ewxlx-pxx-10px ewxlx-tx-f17x", "ewbfrx-zx-1 ewbfrx-trnx-wdtx ewrltx ewnlnx-blcx ewhx-37px ewwx-fllx ewtx-f16x2 ewfntx-mdmx ewldnx-37px ewbfrx-bslx ewbfrx-bt-0 ewbfrx-lf-0 ewbfrx-blcx ewbfrx-hx-2pxx ewbfrx-wx-0 ewbfrx-bk-thmx-blcx ewbfrx-drtx-300 ewbfrx-easx-inx-outx ewbfrx-ct ewlgx-hx-37px ewlgx-wx-autx ewlgx-pxx-6pxx ewlgx-ldnx-37px ewlgx-hvrx-bfrx-wx-fllx ewxlx-pxx-10px ewxlx-tx-f17x", "ewbfrx-zx-1 ewbfrx-trnx-wdtx ewrltx ewnlnx-blcx ewhx-37px ewwx-fllx ewtx-f16x2 ewfntx-mdmx ewldnx-37px ewbfrx-bslx ewbfrx-bt-0 ewbfrx-lf-0 ewbfrx-blcx ewbfrx-hx-2pxx ewbfrx-wx-0 ewbfrx-bk-thmx-blcx ewbfrx-drtx-300 ewbfrx-easx-inx-outx ewbfrx-ct ewlgx-hx-37px ewlgx-wx-autx ewlgx-pxx-6pxx ewlgx-ldnx-37px ewlgx-hvrx-bfrx-wx-fllx ewxlx-pxx-10px ewxlx-tx-f17x"], AB = "ewbslx ewrt-2 ewtp-19px ewzx-10 ewflxx ewhx-35px ewwx-35px ewtmsx-md ewjstx-md ewlgx-hddx", SB = ["ewtrnx ewvrfx-hddx ewbrdx-tx-whtx ewbrdx-pctx-20 ewtrnx-llx ewdrtx-300 eweasx-outx ewlgx-bslx ewlgx-lf-12px ewlgx-tp-fllx ewlgx-hddx ewlgx-mxx-hx-500x ewlgx-wx-195x ewlgx-rndx-4pxx ewlgx-brdx ewlgx-brdx-e6ex ewlgx-brdx-tx-e6ex ewlgx-brdx-pctx-100 ewlgx-bk-whtx ewlgx-px-12px ewlgx-pctx-0 ewgrpx-hvrx-lgx-blcx ewgrpx-hvrx-lgx-bk-pctx-100 ewgrpx-hvrx-lgx-pctx-100", "ewtrnx ewvrfx-hddx ewbrdx-tx-whtx ewbrdx-pctx-20 ewtrnx-llx ewdrtx-300 eweasx-outx ewlgx-bslx ewlgx-lf-12px ewlgx-tp-fllx ewlgx-hddx ewlgx-mxx-hx-400x ewlgx-wx-195x ewlgx-rndx-4pxx ewlgx-brdx ewlgx-brdx-e6ex ewlgx-brdx-tx-e6ex ewlgx-brdx-pctx-100 ewlgx-bk-whtx ewlgx-px-12px ewlgx-pctx-0 ewgrpx-hvrx-lgx-blcx ewgrpx-hvrx-lgx-bk-pctx-100 ewgrpx-hvrx-lgx-pctx-100", "ewtrnx ewvrfx-hddx ewbrdx-tx-whtx ewbrdx-pctx-20 ewtrnx-llx ewdrtx-300 eweasx-outx ewlgx-bslx ewlgx-lf-12px ewlgx-tp-fllx ewlgx-hddx ewlgx-mxx-hx-400x ewlgx-wx-195x ewlgx-rndx-4pxx ewlgx-brdx ewlgx-brdx-e6ex ewlgx-brdx-tx-e6ex ewlgx-brdx-pctx-100 ewlgx-bk-whtx ewlgx-px-12px ewlgx-pctx-0 ewgrpx-hvrx-lgx-blcx ewgrpx-hvrx-lgx-bk-pctx-100 ewgrpx-hvrx-lgx-pctx-100", "ewtrnx ewvrfx-hddx ewbrdx-tx-whtx ewbrdx-pctx-20 ewtrnx-llx ewdrtx-300 eweasx-outx ewlgx-bslx ewlgx-lf-12px ewlgx-tp-fllx ewlgx-hddx ewlgx-mxx-hx-400x ewlgx-wx-205x ewlgx-rndx-4pxx ewlgx-brdx ewlgx-brdx-e6ex ewlgx-brdx-tx-e6ex ewlgx-brdx-pctx-100 ewlgx-bk-whtx ewlgx-px-12px ewlgx-pctx-0 ewgrpx-hvrx-lgx-blcx ewgrpx-hvrx-lgx-bk-pctx-100 ewgrpx-hvrx-lgx-pctx-100"], SWB = "ewrltx ewmlx-5 ewtx-f16x2 ewfntx-mdmx ewxlx-mlx-5 ewxlx-tx-f18x", BB = "ewfx ewbt-0 ewzx-50 ewflxx ewwx-fllx ewtmsx-md ewjstx-btwx ewgpx-20px ewbk-thmx-blcx ewpx-20px ewlgx-hddx", SBX = "ewsrcx ewmxx-20px2 ewbrdx-bx ewbrdx-bx-000 ewbrdx-pctx-30 ewpyx-140x ewlgx-mxx-autx";
  var H = null;
  function header() {
    var hd = $('header');
    if (!hd) return;
    var nav = hd.querySelector('nav');
    var left = nav.children[0], right = nav.children[1];
    var logo = left.querySelector('img');
    var menu = left.querySelector('ul');
    var items = kids(menu);
    var r = kids(right);
    var loginBtn = r[0] && r[0].querySelector('button');
    var amen = r[1] && r[1].querySelector('a');
    var swli = $("#ewi-swtx");
    var iconLi = r[3], place = iconLi.querySelector('a img'), sbtn = iconLi.querySelector('button'), sImg = sbtn.querySelector('img');
    var mbtns = r[4].querySelectorAll('button'), mImg = mbtns[0].querySelector('img'), xImg = mbtns[1].querySelector('img');
    var bar = null, sbox = null;
    kids(hd).forEach(function (c) {
      if (c.tagName === 'A') bar = c;
      if (c.tagName === 'DIV' && c.classList.contains("ewsrcx")) sbox = c;
    });
    if (!bar) bar = nav.querySelector(':scope > a');
    var S = { E: W.scrollY, z: false, U: false, W: false, T: false, M: isMo(), P: !!EW.P, V: [] };
    var dimmer = null;
    function render() {
      var E = S.E, z = S.z, U = S.U, M = S.M, P = S.P, T = S.T;
      var dark = ((E >= 5 || P) && !(U && M)) || T;
      var solid = E >= 5 || (U && M) || P || T;
      hd.className = HB + ' ' + (z ? "ewlgx-tp-101x" : "ewlgx-tp-0") + ' ' +
        (dark ? "ewbfrx-bk-whtx ewlgx-bfrx-bk-whtx" : "ewbfrx-bk-thmx-blcx ewlgx-bfrx-bk-whtx") + ' ' +
        (solid ? "ewbfrx-pctx-1000 ewdlyx-300 ewdrtx-300 ewbfrx-tp-0" : "ewdlyx-0 ewdrtx-0 ewbfrx-tp-0 ewbfrx-pctx-0") + ' ' +
        (U && M ? "ewbfrx-bk-thmx-blcx ewbfrx-pctx-100 ewlgx-bfrx-bk-whtx" : '');
      nav.className = NB + ' ' + (z ? "hidden" : "ewflsx");
      logo.src = IC + (dark ? 'logo-black.svg' : 'logo-white.svg');
      menu.className = MB + ' ' + (U || S.W ? "ewlf-0" : "ewlf-100");
      items.forEach(function (li, i) {
        var a = li.querySelector('a'), b = li.querySelector(':scope > button'), sub = li.querySelector(':scope > ul');
        var k = i + 1, open = S.V.indexOf(k) >= 0;
        if (a && LB[i]) {
          a.className = LB[i] + ' ' + (solid ? "ewtx-whtx ewlgx-tx-thmx-blcx" : "ewtx-whtx ewbfrx-bk-whtx ewlgx-tx-whtx") + ' ' +
            (E >= 5 || !M ? "ewbfrx-bk-thmx-blcx ewlgx-hvrx-bfrx-wx-fllx" : '') + ' ' +
            (i === 1 && T ? "ewbfrx-bk-thmx-blcx ewlgx-bfrx-wx-fllx" + ' ' + "ewbfrx-bk-whtx ewlgx-bfrx-wx-fllx" : '');
        }
        if (b) b.className = AB + ' ' + (open ? '' : "ewrttx-180") + ' ' + "ewtrnx-trnx ewdrtx-300 eweasx-inx-outx";
        if (sub && SB[i]) sub.className = SB[i] + ' ' + (open ? "max-h-100 ewbrdx-tx ewpyx-6pxx" : "ewmxx-hx-0 ewpyx-0");
      });
      if (loginBtn) loginBtn.className = "ewrndx-bt" + ' ' + (dark ? "ewbrdx-3c3x ewtx-3c3x" : "ewbrdx-whtx ewtx-whtx");
      if (amen) amen.className = "ewrndx-bt" + ' ' + (dark ? "ewbrdx-3c3x ewtx-3c3x" : "ewbrdx-whtx ewtx-whtx");
      if (swli) swli.className = SWB + ' ' + (dark ? "ewfllx-thmx-blcx ewtx-thmx-blcx2" : "ewfllx-whtx ewtx-whtx");
      place.src = IC + (dark ? 'place-black.svg' : 'place-white.svg');
      sImg.src = T ? IC + 'search-close.svg' : IC + (dark ? 'search-black.svg' : 'search-white.svg');
      mImg.src = IC + (E >= 5 || (U && M) || T || P ? 'menu-black.svg' : 'menu-white.svg');
      mImg.className = (U ? "hidden" : "ewblcx") + ' ' + "ewhx-autx ewwx-5 ewdlyx-0 ewdrtx-0 ewlgx-wx-22px ewxlx-wx-24px";
      xImg.className = (U ? "ewblcx" : "hidden") + ' ' + "ewhx-autx ewwx-5 ewdlyx-0 ewdrtx-0 ewlgx-wx-22px ewxlx-wx-24px";
      if (bar) bar.className = BB + ' ' + (U && M ? "ewlf-0" : "ewlf-100");
      if (sbox) sbox.className = SBX + ' ' + (T ? '' : HIDDEN);
      if (T && !dimmer) {
        dimmer = D.createElement('span');
        dimmer.className = "ewdmmx";
        on(dimmer, 'click', function () { setT(false); });
        hd.appendChild(dimmer);
      } else if (!T && dimmer) {
        dimmer.remove();
        dimmer = null;
      }
    }
    on(W, 'scroll', function () {
      var l = W.scrollY;
      S.z = l < 600 ? false : (S.U ? false : !(l < S.E));
      S.E = l;
      render();
    }, { passive: true });
    on(W, 'resize', function () { S.M = isMo(); render(); });
    /* 모바일 메뉴 — 열면 본문을 그 자리에 고정(position:fixed · top:-스크롤) */
    var bodyTop = '';
    function setU(v) {
      S.U = v;
      if (v) {
        var y = W.scrollY;
        D.body.style.position = 'fixed';
        D.body.style.top = '-' + y + 'px';
        D.body.style.width = '100%';
      } else if (!S.W) {
        var t = D.body.style.top;
        D.body.style.position = '';
        D.body.style.top = '';
        D.body.style.width = '';
        W.scrollTo(0, -1 * parseInt(t || '0', 10));
      }
      render();
    }
    on(mImg, 'click', function () { setU(true); setT(false); });
    on(xImg, 'click', function () {
      S.W = true;
      render();
      setTimeout(function () {
        S.U = false;
        S.W = false;
        var t = D.body.style.top;
        D.body.style.position = '';
        D.body.style.top = '';
        D.body.style.width = '';
        W.scrollTo(0, -1 * parseInt(t || '0', 10));
        render();
      }, 300);
    });
    items.forEach(function (li, i) {
      var b = li.querySelector(':scope > button');
      on(b, 'click', function () {
        var k = i + 1, j = S.V.indexOf(k);
        if (j >= 0) S.V.splice(j, 1); else S.V.push(k);
        render();
      });
    });
    /* 검색 — 열려 있는 동안 휠 · 터치 · 방향키 · 스페이스 스크롤을 막는다.
       원본은 keydown 막기를 다른 함수로 떼어 내려다 실패해 한 번 열면 계속 막힌다(검색 칸에 띄어쓰기도 안 된다) — 그대로 */
    function stop(e) { e.preventDefault(); }
    var keyStuck = false;
    function setT(v) {
      S.T = v;
      if (v) {
        D.addEventListener('wheel', stop, { passive: false });
        D.addEventListener('touchmove', stop, { passive: false });
        if (!keyStuck) {
          keyStuck = true;
          D.addEventListener('keydown', function (e) {
            if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].indexOf(e.key) >= 0) e.preventDefault();
          });
        }
      } else {
        D.removeEventListener('wheel', stop, { passive: false });
        D.removeEventListener('touchmove', stop, { passive: false });
      }
      render();
    }
    on(sbtn, 'click', function () { if (S.T) setT(false); else { setT(true); if (S.U) setU(false); } });
    if (sbox) {
      var inp = sbox.querySelector('input'), go = sbox.querySelector('.' + "ant-input-suffix" + ' img');
      function search() { var v = inp.value; inp.value = ''; setT(false); W.location.href = 'search.html?keyword=' + encodeURIComponent(v); }
      on(inp, 'keydown', function (e) { if (e.key === 'Enter') search(); });
      on(go, 'click', search);
    }
    on(left.querySelector('a'), 'click', function () { S.U = false; W.scrollTo({ top: 0 }); });
    on(loginBtn, 'click', function () { openLogin(); });
    langSelect(swli);
    H = { render: render, S: S };
    render();
  }

  /* ── 앤트 입력칸 지우기 단추(allowClear) — 글이 있으면 보이고 누르면 비운다 ── */
  function clearable(root) {
    $$('.' + "ant-input-affix-wrapper", root).forEach(function (w) {
      var inp = w.querySelector('input'), x = w.querySelector('.' + "ant-input-clear-icon");
      if (!inp || !x) return;
      function sync() {
        swap(x, !inp.value, "ant-input-clear-icon-hidden", '');
        swap(w, !!inp.value, "ant-input-affix-wrapper-input-with-clear-btn", '');
      }
      on(inp, 'input', sync);
      on(x, 'click', function () { inp.value = ''; sync(); inp.dispatchEvent(new Event('input', { bubbles: true })); inp.focus(); });
      sync();
    });
    /* 앤트 입력칸 초점 — 감싼 칸에 -focused 를 붙인다 */
    $$('.' + "ant-input-affix-wrapper", root).forEach(function (w) {
      var inp = w.querySelector('input');
      if (!inp) return;
      on(inp, 'focus', function () { addc(w, "ant-input-affix-wrapper-focused"); });
      on(inp, 'blur', function () { delc(w, "ant-input-affix-wrapper-focused"); });
    });
  }

  /* ── 언어 고르기(앤트 Select, 펼침은 #switcherselect 안에 붙는다) — KR 만 있는 우리 사이트라 EN 은 고르기만 닫힌다 ── */
  function langSelect(li) {
    if (!li) return;
    var sel = li.querySelector('.' + "ant-select"), box = li.querySelector('.' + "ant-select-selector"), dd = null;
    function close() {
      if (!dd) return;
      dd.remove();
      dd = null;
      delc(sel, "ant-select-open ant-select-focused");
    }
    function open() {
      dd = D.createElement('div');
      dd.className = "ant-select-dropdown css-mncuj7 ant-select-dropdown-placement-bottomRight";
      dd.style.cssText = 'inset: 1px 3px auto auto; box-sizing: border-box; width: 66px;';
      dd.innerHTML = '<div><div class="' + "rc-virtual-list" + '" style="position: relative;"><div class="' + "rc-virtual-list-holder" + '" style="max-height: 256px; overflow-y: hidden; overflow-anchor: none;"><div><div class="' + "rc-virtual-list-holder-inner" + '" style="display: flex; flex-direction: column;">' +
        ['KR', 'EN'].map(function (t, i) {
          return '<div aria-selected="' + (i === 0) + '" role="option" class="' + "ant-select-item ant-select-item-option" + (i === 0 ? ' ' + "ant-select-item-option-active ant-select-item-option-selected" : '') + '" title="' + t + '"><div class="' + "ant-select-item-option-content" + '">' + t + '</div><span class="' + "ant-select-item-option-state" + '" unselectable="on" aria-hidden="true" style="user-select: none;"></span></div>';
        }).join('') + '</div></div></div></div></div>';
      li.appendChild(dd);
      addc(sel, "ant-select-open ant-select-focused");
      $$('.' + "ant-select-item", dd).forEach(function (it) {
        on(it, 'mouseenter', function () {
          $$('.' + "ant-select-item", dd).forEach(function (x) { delc(x, "ant-select-item-option-active"); });
          addc(it, "ant-select-item-option-active");
        });
        on(it, 'click', function (e) { e.stopPropagation(); close(); });
      });
    }
    on(box, 'click', function (e) { e.stopPropagation(); if (dd) close(); else open(); });
    on(D, 'click', function (e) { if (dd && !li.contains(e.target)) close(); });
    on(D, 'keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* ════════ 로그인 창 · 비밀번호 찾기 창 — 원본 C(): 아이디는 영문 · 숫자만, 둘 다 써야 로그인 단추가 켜진다.
     X 를 누르면 창을 닫고 게스트 서비스 쪽으로 간다(원본 그대로). 바깥 · Esc 로는 안 닫힌다(onCancel 없음) ════════ */
  var LOGIN = null, FINDPW = null;
  function showModal(root, v) {
    if (!root) return;
    if (v === (root.style.display !== 'none')) return;
    root.style.display = v ? '' : 'none';
    lockBody(v);
  }
  function openLogin() { showModal(LOGIN, true); }
  function modals() {
    LOGIN = $('[data-ew="login"]');
    FINDPW = $('[data-ew="findpw"]');
    if (LOGIN) {
      if (LOGIN.getAttribute('data-open')) { LOGIN.style.display = 'none'; showModal(LOGIN, true); }
      var form = LOGIN.querySelector('form'), ins = form.querySelectorAll('input'), id = ins[0], pw = ins[1];
      var btn = form.querySelector(':scope > button'), err = form.querySelector(':scope > p');
      var eye = LOGIN.querySelector('.' + "ant-input-password-icon"), chk = LOGIN.querySelector('.' + "ant-checkbox-input");
      function sync() { btn.disabled = !(id.value && pw.value); }
      on(id, 'input', function () { var v = id.value.replace(/[^a-zA-Z0-9]/g, ''); if (v !== id.value) id.value = v; sync(); });
      on(pw, 'input', sync);
      on(eye, 'click', function () {
        var vis = pw.type === 'password';
        pw.type = vis ? 'text' : 'password';
        eye.src = IC + (vis ? 'eye-off.svg' : 'eye.svg');
      });
      on(chk, 'change', function () {
        swap(chk.parentNode, chk.checked, "ant-checkbox-checked", '');
        swap(chk.closest('label'), chk.checked, "ant-checkbox-wrapper-checked", '');
      });
      on(form, 'submit', function (e) {
        e.preventDefault();
        err.className = "ewblcx ewhx-mnx" + ' ' + "ewmxx-autx ewtx-md ewtx-f12x2 ewtx-thmx-rdx ewlgx-ptx-1 ewlgx-tx-f14x";
        err.textContent = '아이디 또는 비밀번호를 확인해 주세요.';
      });
      var links = form.querySelectorAll('a');
      on(links[links.length - 1], 'click', function (e) { e.preventDefault(); showModal(FINDPW, true); });
      on(LOGIN.querySelector('.' + "ant-modal-close"), 'click', function () {
        showModal(LOGIN, false);
        W.location.href = 'guest.html';
      });
      sync();
    }
    if (FINDPW) {
      var f2 = FINDPW.querySelector('form'), i2 = f2.querySelectorAll('input'), b2 = f2.querySelector(':scope > button'), e2 = f2.querySelector(':scope > p');
      function sync2() { b2.disabled = !(i2[0].value && i2[1].value); }
      [].forEach.call(i2, function (x) { on(x, 'input', sync2); });
      on(f2, 'submit', function (e) {
        e.preventDefault();
        e2.className = "ewblcx ewhx-mnx" + ' ' + "ewmxx-autx ewtx-md ewtx-f12x2 ewtx-thmx-rdx ewlgx-ptx-1 ewlgx-tx-f14x";
        e2.textContent = '입력하신 정보와 일치하는 아이디가 없습니다.';
      });
      on(FINDPW.querySelector('.' + "ant-modal-close"), 'click', function () { showModal(FINDPW, false); });
      sync2();
    }
  }

  /* ════════ 바닥글 — 떠 있는 단추(지도 · 위로)는 스크롤 5 넘으면 보이고, 바닥글에 닿으면 그만큼 올라간다(원본 g() 의 B) ════════ */
  function footer() {
    var ft = $("#ewi-ft");
    if (!ft) return;
    var fx = kids(ft).filter(function (c) { return c.style && c.style.bottom; });
    var btns = fx[0], green = fx[1];
    var leasing = PATH.indexOf('/work/leasing') >= 0;
    var C3 = PATH.indexOf('/whatson/neighborhood') >= 0 || PATH.indexOf('/whatson/storiesofelmwood') >= 0 || PATH.indexOf('/whatson/pressmedia') >= 0;
    var t = 40;
    function place() {
      var o = W.scrollY, a = ft.getBoundingClientRect().top, ih = W.innerHeight, w = W.innerWidth;
      if (PATH.indexOf('whatson/details/') >= 0) t = w < 960 ? (a - 192 < ih ? ih - a + 192 : 20) : (a - 340 < ih ? ih - a + 340 : 40);
      else if (PATH.indexOf('whatson/') >= 0) t = w < 960 ? (a - 430 < ih ? ih - a + 430 : 20) : (a - 420 < ih ? ih - a + 420 : 40);
      else t = w < 960 ? (a - 152 < ih ? ih - a + 152 : 20) : (a - 180 < ih ? ih - a + 180 : 40);
      if (btns) {
        swap(btns, o < 5, HIDDEN, "ewflsx");
        btns.style.bottom = (leasing ? t + 90 : C3 ? t - 250 : t) + 'px';
      }
      if (green) {
        swap(green, o < 5, HIDDEN, "ewflsx");
        green.style.bottom = (leasing ? t + (W.innerWidth >= 1024 ? 60 : 80) : t) + 'px';
      }
    }
    on(W, 'scroll', place, { passive: true });
    if (btns) {
      var bs = btns.querySelectorAll(':scope > button');
      var top = bs[bs.length - 1];
      on(top, 'click', function () { W.scrollTo({ top: 0, behavior: 'smooth' }); });
      if (bs.length > 1) on(bs[0], 'click', function (e) { e.preventDefault(); openFloor('B1F', null); });
    }
    $$('button', ft).forEach(function (b) {
      if (b.closest('ul') && b.textContent.trim()) on(b, 'click', function (e) { e.preventDefault(); openFloor('B1F', null); });
    });
  }

  /* ════════ 층별 안내 창 — 원본은 외부 실내지도 엔진(키 · 비밀값이 박혀 있다)이 그리던 자리. 같은 창(앤트 Modal · 90%)에
     우리 평면도(SVG, assets/js/elmwood-floor.js)를 그린다. 층 탭 4개 · 끌어 옮기기 · 휠 확대 · 매장에서 열면 그 칸 강조 ════════ */
  var FLOOR_N = {"8": ["B1F", 0.0, 0.0, 64.8, 44.0], "11": ["B1F", 68.8, 0.0, 64.8, 44.0], "18": ["B1F", 137.6, 0.0, 64.8, 44.0], "20": ["B1F", 206.4, 0.0, 64.8, 44.0], "26": ["B1F", 275.2, 0.0, 64.8, 44.0], "50": ["B1F", 0.0, 48.0, 64.8, 44.0], "52": ["B1F", 68.8, 48.0, 64.8, 44.0], "54": ["B1F", 137.6, 48.0, 64.8, 44.0], "65": ["B1F", 206.4, 48.0, 64.8, 44.0], "73": ["B1F", 275.2, 48.0, 64.8, 44.0], "75": ["B1F", 0.0, 96.0, 64.8, 44.0], "82": ["B1F", 68.8, 96.0, 64.8, 44.0], "1": ["B1F", 420.0, 0.0, 64.8, 68.0], "27": ["B1F", 488.8, 0.0, 64.8, 68.0], "28": ["B1F", 557.6, 0.0, 64.8, 68.0], "42": ["B1F", 626.4, 0.0, 64.8, 68.0], "49": ["B1F", 695.2, 0.0, 64.8, 68.0], "66": ["B1F", 420.0, 72.0, 64.8, 68.0], "68": ["B1F", 488.8, 72.0, 64.8, 68.0], "69": ["B1F", 557.6, 72.0, 64.8, 68.0], "76": ["B1F", 626.4, 72.0, 64.8, 68.0], "30": ["B1F", 0.0, 302.0, 64.8, 68.0], "45": ["B1F", 68.8, 302.0, 64.8, 68.0], "55": ["B1F", 137.6, 302.0, 64.8, 68.0], "70": ["B1F", 206.4, 302.0, 64.8, 68.0], "79": ["B1F", 275.2, 302.0, 64.8, 68.0], "86": ["B1F", 0.0, 374.0, 64.8, 68.0], "91": ["B1F", 68.8, 374.0, 64.8, 68.0], "5": ["B1F", 420.0, 302.0, 64.8, 44.0], "13": ["B1F", 488.8, 302.0, 64.8, 44.0], "22": ["B1F", 557.6, 302.0, 64.8, 44.0], "23": ["B1F", 626.4, 302.0, 64.8, 44.0], "35": ["B1F", 695.2, 302.0, 64.8, 44.0], "41": ["B1F", 420.0, 350.0, 64.8, 44.0], "48": ["B1F", 488.8, 350.0, 64.8, 44.0], "51": ["B1F", 557.6, 350.0, 64.8, 44.0], "53": ["B1F", 626.4, 350.0, 64.8, 44.0], "56": ["B1F", 695.2, 350.0, 64.8, 44.0], "61": ["B1F", 420.0, 398.0, 64.8, 44.0], "62": ["B1F", 488.8, 398.0, 64.8, 44.0], "78": ["B1F", 557.6, 398.0, 64.8, 44.0], "81": ["B1F", 626.4, 398.0, 64.8, 44.0], "29": ["B1F", 356, 36, 48, 30], "6": ["1F", 0.0, 0.0, 64.8, 68.0], "63": ["1F", 68.8, 0.0, 64.8, 68.0], "67": ["1F", 137.6, 0.0, 64.8, 68.0], "71": ["1F", 206.4, 0.0, 64.8, 68.0], "83": ["1F", 275.2, 0.0, 64.8, 68.0], "90": ["1F", 0.0, 72.0, 64.8, 68.0], "2": ["1F", 420.0, 0.0, 64.8, 44.0], "4": ["1F", 488.8, 0.0, 64.8, 44.0], "15": ["1F", 557.6, 0.0, 64.8, 44.0], "17": ["1F", 626.4, 0.0, 64.8, 44.0], "25": ["1F", 695.2, 0.0, 64.8, 44.0], "33": ["1F", 420.0, 48.0, 64.8, 44.0], "34": ["1F", 488.8, 48.0, 64.8, 44.0], "38": ["1F", 557.6, 48.0, 64.8, 44.0], "44": ["1F", 626.4, 48.0, 64.8, 44.0], "46": ["1F", 695.2, 48.0, 64.8, 44.0], "64": ["1F", 420.0, 96.0, 64.8, 44.0], "84": ["1F", 488.8, 96.0, 64.8, 44.0], "14": ["1F", 0.0, 302.0, 64.8, 68.0], "24": ["1F", 68.8, 302.0, 64.8, 68.0], "36": ["1F", 137.6, 302.0, 64.8, 68.0], "80": ["1F", 206.4, 302.0, 64.8, 68.0], "3": ["1F", 420.0, 302.0, 64.8, 68.0], "10": ["1F", 488.8, 302.0, 64.8, 68.0], "31": ["1F", 557.6, 302.0, 64.8, 68.0], "40": ["1F", 626.4, 302.0, 64.8, 68.0], "58": ["1F", 695.2, 302.0, 64.8, 68.0], "74": ["1F", 420.0, 374.0, 64.8, 68.0], "85": ["1F", 488.8, 374.0, 64.8, 68.0], "19": ["1F", 356, 36, 48, 30], "37": ["1F", 356, 376, 48, 30], "12": ["2F", 0.0, 0.0, 64.8, 68.0], "16": ["2F", 68.8, 0.0, 64.8, 68.0], "59": ["2F", 137.6, 0.0, 64.8, 68.0], "60": ["2F", 206.4, 0.0, 64.8, 68.0], "72": ["2F", 275.2, 0.0, 64.8, 68.0], "32": ["2F", 420.0, 0.0, 64.8, 68.0], "77": ["2F", 488.8, 0.0, 64.8, 68.0], "87": ["2F", 557.6, 0.0, 64.8, 68.0], "88": ["2F", 626.4, 0.0, 64.8, 68.0], "89": ["2F", 695.2, 0.0, 64.8, 68.0], "7": ["2F", 0.0, 302.0, 64.8, 68.0], "9": ["2F", 68.8, 302.0, 64.8, 68.0], "21": ["2F", 137.6, 302.0, 64.8, 68.0], "47": ["2F", 206.4, 302.0, 64.8, 68.0], "57": ["2F", 275.2, 302.0, 64.8, 68.0], "43": ["2F", 420.0, 302.0, 64.8, 68.0]};
  var FL = [['B2F', '지하 2층'], ['B1F', '지하 1층'], ['1F', '1층'], ['2F', '2층']];
  var fm = null;
  function loadFloor(cb) {
    if (W.EW_FLOOR) return cb();
    var s = D.createElement('script');
    s.src = A + 'js/elmwood-floor.js';
    s.onload = cb;
    D.body.appendChild(s);
  }
  function openFloor(floor, target) {
    loadFloor(function () { buildFloor(floor, target); });
  }
  function buildFloor(floor, target) {
    if (fm) fm.remove();
    var size = W.EW_FLOOR.size;
    fm = D.createElement('div');
    fm.className = "ant-modal-root css-mncuj7";
    fm.innerHTML = '<div class="' + "ant-modal-mask" + '"></div><div tabindex="-1" class="' + "ant-modal-wrap ant-modal-centered" + '">' +
      '<div role="dialog" aria-modal="true" aria-label="층별 안내" class="' + "ant-modal css-mncuj7" + ' ew-fm"><div class="' + "ant-modal-content" + '">' +
      '<button type="button" aria-label="닫기" class="' + "ant-modal-close" + '"><span class="' + "ant-modal-close-x" + '"><span role="img" aria-label="close" class="' + "anticon anticon-close ant-modal-close-icon" + '"><svg fill-rule="evenodd" viewBox="64 64 896 896" focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path></svg></span></span></button>' +
      '<div class="' + "ant-modal-body" + '"><div class="ew-fm-page"><div class="ew-fm-viewer"><div class="ew-fm-list" role="tablist">' +
      FL.map(function (f) { return '<div role="tab" tabindex="0" class="ew-fm-item" data-floor="' + f[0] + '">' + f[1] + '</div>'; }).join('') +
      '</div><div class="ew-fm-map"><svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="층별 평면도"></svg></div></div></div></div></div></div></div>';
    D.body.appendChild(fm);
    lockBody(true);
    var svg = fm.querySelector('.ew-fm-map svg'), box = fm.querySelector('.ew-fm-map'), view = null, cur = null;
    function fit(f, tgt) {
      var bw = box.clientWidth, bh = box.clientHeight, w = size[0], h = size[1];
      var vw = bw, vh = bh, cx = w / 2, cy = h / 2;               /* 원본처럼 1:1 — 모바일은 가운데를 잘라 보인다 */
      if (tgt) { vw = bw / 2.4; vh = bh / 2.4; cx = tgt[1] + tgt[3] / 2; cy = tgt[2] + tgt[4] / 2; }
      view = [cx - vw / 2, cy - vh / 2, vw, vh];
      svg.setAttribute('viewBox', view.join(' '));
    }
    function show(f, n) {
      cur = f;
      svg.innerHTML = W.EW_FLOOR.floors[f];
      var tgt = n && FLOOR_N[n] && FLOOR_N[n][0] === f ? FLOOR_N[n] : null;
      if (tgt) {
        var u = svg.querySelector('[data-n="' + n + '"]');
        if (u) {
          u.querySelector('rect').setAttribute('fill', '#3C3A34');
          [].forEach.call(u.querySelectorAll('text'), function (t) { t.setAttribute('fill', '#FFFFFF'); });
          var px = tgt[1] + tgt[3] / 2, py = tgt[2] - 4;
          var pin = D.createElementNS('http://www.w3.org/2000/svg', 'path');
          pin.setAttribute('d', 'M' + px + ' ' + py + 'c-6-7-10-11-10-16a10 10 0 0 1 20 0c0 5-4 9-10 16z');
          pin.setAttribute('fill', '#A54C0A');
          svg.appendChild(pin);
          var dot = D.createElementNS('http://www.w3.org/2000/svg', 'circle');
          dot.setAttribute('cx', px); dot.setAttribute('cy', py - 16); dot.setAttribute('r', 3.6); dot.setAttribute('fill', '#fff');
          svg.appendChild(dot);
        }
      }
      fit(f, tgt);
      $$('.ew-fm-item', fm).forEach(function (it) {
        var a = it.getAttribute('data-floor') === f;
        it.classList.toggle('is-on', a);
        it.setAttribute('aria-selected', a);
      });
    }
    $$('.ew-fm-item', fm).forEach(function (it) {
      on(it, 'click', function () { show(it.getAttribute('data-floor'), null); });
      on(it, 'keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); it.click(); } });
    });
    /* 끌어 옮기기 · 휠 확대 */
    var drag = null;
    on(box, 'pointerdown', function (e) { drag = { x: e.clientX, y: e.clientY, v: view.slice() }; box.setPointerCapture(e.pointerId); box.style.cursor = 'grabbing'; });
    on(box, 'pointermove', function (e) {
      if (!drag) return;
      var k = view[2] / box.clientWidth;
      view[0] = drag.v[0] - (e.clientX - drag.x) * k;
      view[1] = drag.v[1] - (e.clientY - drag.y) * k;
      svg.setAttribute('viewBox', view.join(' '));
    });
    on(box, 'pointerup', function () { drag = null; box.style.cursor = ''; });
    on(box, 'wheel', function (e) {
      e.preventDefault();
      var r = box.getBoundingClientRect(), k = e.deltaY > 0 ? 1.12 : 1 / 1.12;
      var nw = Math.min(Math.max(view[2] * k, box.clientWidth / 4), box.clientWidth * 1.6), s = nw / view[2];
      var mx = view[0] + (e.clientX - r.left) / r.width * view[2], my = view[1] + (e.clientY - r.top) / r.height * view[3];
      view = [mx - (mx - view[0]) * s, my - (my - view[1]) * s, nw, view[3] * s];
      svg.setAttribute('viewBox', view.join(' '));
    }, { passive: false });
    function close() { if (!fm) return; fm.remove(); fm = null; lockBody(false); }
    on(fm.querySelector('.' + "ant-modal-close"), 'click', close);
    on(fm.querySelector('.' + "ant-modal-wrap"), 'click', function (e) { if (e.target === e.currentTarget) close(); });
    on(D, 'keydown', function esc(e) { if (e.key === 'Escape') { close(); D.removeEventListener('keydown', esc); } });
    show(['B2F', 'B1F', '1F', '2F'].indexOf(floor) >= 0 ? floor : 'B1F', target);
  }
  /* 매장 상세 — 주소 옆 위치 아이콘. 원본은 주소 마지막 낱말(B1F · 1F …)을 층으로, 매장 이름을 찾을 곳으로 넘긴다 */
  function storeMap() {
    var adr = $('address');
    if (!adr) return;
    var img = adr.querySelector('img');
    if (!img) return;
    var n = parseInt((EW.page || '').replace('shop-', ''), 10);
    on(img, 'click', function (e) {
      e.preventDefault();
      var words = adr.textContent.trim().split(/\s+/);
      openFloor(words[words.length - 1], n);
    });
  }


  /* ════════ 첫 화면(메인 비주얼) — 원본 d(): 장면 0 확대 1.15→1(9초), 6초 뒤부터 장면 넘김(9초 나타남 · 4초 사라짐 · 확대 1.25→1 · 1.15),
     스크롤 고정(위 top · 높이 절반)하며 로고 · 문구가 올라가며 사라진다. 원본은 로고 · 문구 참조가 마지막 장면 것이라 그것만 움직인다 — 그대로 ════════ */
  function mainVisual() {
    var mv = $(".ewhm-kv");
    if (!mv || !W.gsap) return;
    var g = W.gsap;
    if (W.ScrollTrigger) g.registerPlugin(W.ScrollTrigger);
    var m = kids(mv), p = m.map(function (s) { return s.children[s.children.length - 1]; });
    var last = m[m.length - 1];
    var d = last.querySelector(".ewtxtx"), f = last.children[1];
    g.context(function () {
      if (d) g.set(d, { autoAlpha: 1, y: 0 });
      if (f) g.set(f, { autoAlpha: 1, y: 0 });
      if (p[0]) g.set(p[0], { scale: 1.15, transformOrigin: 'center center' });
      var e = g.timeline({ defaults: { ease: 'power2.out' } });
      if (p[0]) e.to(p[0], { scale: 1, duration: 9 });
      var n = g.timeline({ repeat: -1, delay: 6, defaults: { ease: 'power2.inOut' } });
      if (m.length > 1) {
        m.forEach(function (_, l) {
          var a = l === m.length - 1 ? 0 : l + 1;
          if (p[a]) g.set(p[a], { scale: 1.25 });
          n.to(m[a], { opacity: 1, duration: 9 }).to(m[l], { opacity: 0, duration: 4 }, '<').to(p[a], { scale: 1, duration: 9 }, '<')
            .to(p[l], { scale: 1.15, duration: 8, delay: 1 }, '<');
        });
      }
      g.timeline({
        scrollTrigger: {
          trigger: mv, start: 'top top', end: function () { return '+=' + mv.scrollHeight / 2; }, pin: true, scrub: 0.3,
          onRefresh: function () { if (d) g.set(d, { autoAlpha: 1, y: 0 }); if (f) g.set(f, { autoAlpha: 1, y: 0 }); }
        }
      }).to(d, { y: '-120%', autoAlpha: 0, duration: 4.8, delay: 2.4 }).to(f, { y: '-280%', autoAlpha: 0, duration: 4.9, delay: 0.2 }, '<');
    });
  }

  /* ════════ 쪽 첫 화면(KV) 두 가지 — 원본 56757(서브): 고정 + 제목 -250px · 부제 -280px, 그림 13.5초 나타남 /
     63526(목록): 장면 칸 안 제목 -120% · 부제 -280%(마지막 장면 것) ════════ */
  function keyVisual() {
    var kv = $(".ewkyx-kv");
    if (!kv || !W.gsap) return;
    var g = W.gsap;
    if (W.ScrollTrigger) g.registerPlugin(W.ScrollTrigger);
    var slides = kids(kv).filter(function (c) { return c.tagName === 'DIV' && !c.classList.contains("ewtx-ar"); });
    if (slides.length) {
      var last = slides[slides.length - 1], ta = last.querySelector(".ewtx-ar");
      var i = ta && ta.querySelector('h1'), dd = ta && ta.querySelector('h2');
      g.context(function () {
        g.timeline({
          scrollTrigger: { trigger: kv, start: 'top top', end: '+=' + ((kv.scrollHeight || W.innerHeight) / 2), pin: true, scrub: 0.3 }
        }).to(i, { y: '-120%', autoAlpha: 0, duration: 4.8 }).to(dd, { y: '-280%', autoAlpha: 0, duration: 4.9 }, '<');
      });
    } else {
      var ta2 = $(".ewtx-ar", kv), h1 = ta2 && ta2.querySelector('h1'), h2 = ta2 && ta2.querySelector('h2');
      var img = kids(kv).filter(function (c) { return c.tagName === 'IMG'; })[0];
      g.context(function () {
        var tl = g.timeline({
          ease: 'none',
          scrollTrigger: { trigger: kv, start: 'top top', end: function () { return '+=' + kv.scrollHeight / 2; }, pin: true, scrub: 0.3, pinType: 'fixed' }
        });
        if (img) g.to(img, { opacity: 1, duration: 13.5, ease: 'power3.out' });
        tl.to(h1, { y: '-250px', autoAlpha: 0, duration: 3.8, delay: 0 }).to(h2, { y: '-280px', duration: 3.9, autoAlpha: 0, delay: 0.1 }, '<');
      });
    }
  }

  /* ════════ 넘김(Swiper) — 원본 설정값 그대로 ════════ */
  function nav(sw) {
    var p = sw.querySelector(':scope > .swiper-button-prev'), n = sw.querySelector(':scope > .swiper-button-next');
    return p && n ? { prevEl: p, nextEl: n } : false;
  }
  function swipers() {
    if (!W.Swiper) return;
    var Sw = W.Swiper;
    /* 메인 What's On — 묶음(두 개씩)이 하나뿐이면 넘기지 않는다 */
    $$(".ewwhtx" + ' .swiper').forEach(function (el) {
      var many = el.querySelectorAll('.swiper-slide').length > 1;
      new Sw(el, {
        loop: many, effect: 'creative', spaceBetween: 36, slidesPerView: 1, navigation: false,
        autoplay: many ? { delay: 3600, disableOnInteraction: false, pauseOnMouseEnter: true } : false,
        creativeEffect: { prev: { origin: 'left center', translate: [0, 0, -1], opacity: 0 }, next: { origin: 'left center', translate: [0, 0, 0], opacity: 0 } },
        breakpoints: { 1280: { slidesPerView: 1 } }
      });
    });
    /* 메인 브랜드 */
    $$(".ewnngx" + ' .swiper').forEach(function (el) {
      var d = el.querySelectorAll('.swiper-slide').length >= 3;
      new Sw(el, {
        loop: true, spaceBetween: 16, slidesPerView: 'auto', slidesPerGroup: 1, navigation: d ? nav(el) : false, speed: 600,
        breakpoints: { 960: { loop: d, slidesPerView: 3, spaceBetween: 24 } }
      });
    });
    /* 메인 오피스 사진 */
    $$(".ewwrkx2" + ' .swiper').forEach(function (el) {
      new Sw(el, {
        loop: true, spaceBetween: 8, slidesPerView: 'auto', centeredSlides: true, navigation: nav(el), speed: 600, grabCursor: true,
        autoplay: { delay: 2500, disableOnInteraction: false },
        breakpoints: { 1024: { slidesPerView: 'auto', spaceBetween: 16, centeredSlides: true } }
      });
    });
    /* What's On 위 스토리 넘김 */
    if (EW.page === 'whatson') {
      $$(".ewwhtx-nsdx" + ' .swiper').forEach(function (el) {
        new Sw(el, { slidesPerView: 1, navigation: nav(el), spaceBetween: 8, speed: 600, autoHeight: true });
      });
    }
    /* 동네 — 모바일 목록 넘김(세 곳씩) */
    $$(".ewcstx-mp-swpx").forEach(function (el) {
      new Sw(el, { spaceBetween: 8, slidesPerView: 'auto', pagination: { el: el.querySelector('.swiper-pagination'), clickable: true }, speed: 600 });
    });
  }
  /* 게스트 서비스 방 사진 — 보이는 칸만 띄우고, 탭을 바꾸면 새로(첫 장부터) */
  var guestSw = [];
  function guestSwipers(blocks) {
    if (!W.Swiper) return;
    guestSw.forEach(function (s) { s.destroy(true, true); });
    guestSw = [];
    blocks.forEach(function (b) {
      $$('.swiper', b).forEach(function (el) {
        guestSw.push(new W.Swiper(el, { spaceBetween: 0, centeredSlides: true, slidesPerView: 1, loop: true, autoplay: { delay: 1800, disableOnInteraction: false } }));
      });
    });
  }

  /* ════════ 탭(원본 57480) — 누르면 주소에 ?tab=값 을 남기고(pushState) 탭 묶음 위 80px 로 부드럽게 올라간다 ════════ */
  function tabs() {
    var wrap = $("#ewi-tb-wr");
    if (!wrap) return;
    var bs = $$(".ewtb-bt", wrap);
    if (!bs.length) return;
    var invert = !!wrap.querySelector(".ewscrx-nnx");
    var ids = ["#ewi-sbwx", "#ewi-bsx", "#ewi-bcyx", "#ewi-crx"];
    var vals = bs.map(function (b, i) { return b.getAttribute('data-tab') || ['subway', 'bus', 'bicycle', 'car'][i]; });
    var panes = vals.map(function (v, i) {
      return b_tab(v) || $(ids[i]);
    });
    function b_tab(v) { var x = $$('div[data-tab="' + v + '"]').filter(function (e) { return !e.classList.contains("ewtb-bt"); }); return x[0]; }
    function set(v) {
      bs.forEach(function (b, i) {
        var a = vals[i] === v, sp = b.querySelector('span');
        swap(b, a, invert ? "ewbrdx-bx-3pxx ewbrdx-thmx-whtx ewlgx-brdx-bx-4pxx" : "ewbrdx-bx-3pxx ewbrdx-thmx-blcx ewlgx-brdx-bx-4pxx",
          invert ? "ewbrdx-bx ewbrdx-thmx-gryx" : "ewbrdx-bx ewbrdx-thmx-gryx-ccx");
        swap(sp, a, invert ? "ewfntx-bldx ewtx-thmx-whtx2" : "ewfntx-bldx ewtx-thmx-blcx2",
          invert ? "ewfntx-mdmx ewtx-thmx-gryx ewlgx-fntx-smbx" : "ewfntx-mdmx ewtx-thmx-gryx-ccx ewlgx-fntx-smbx");
        var pn = panes[i];
        if (!pn) return;
        if (pn.id) swap(pn, a, "active", HIDDEN);
        else swap(pn, !a, HIDDEN, '');
      });
    }
    bs.forEach(function (b, i) {
      on(b, 'click', function () {
        var q = new URLSearchParams(W.location.search);
        q.delete('tab');
        q.set('tab', vals[i]);
        W.history.pushState(null, '', W.location.pathname + '?' + q.toString());
        set(vals[i]);
        W.scrollTo({ top: wrap.getBoundingClientRect().top + W.scrollY - 80, behavior: 'smooth' });
      });
    });
    var q0 = new URLSearchParams(W.location.search).get('tab');
    if (q0 && vals.indexOf(q0) >= 0) set(q0);
  }
  /* 게스트 서비스 탭(원본 li 탭) — ?tab=번호 를 남기고(스크롤 없음) 그 방 칸만 보인다 */
  function guestTabs() {
    var lis = $$('li[data-tab]');
    if (!lis.length) return;
    var blocks = $$('div[data-tab]');
    function set(id) {
      lis.forEach(function (li) {
        swap(li, li.getAttribute('data-tab') === String(id), "ewbrdx-thmx-blcx ewtx-thmx-blcx2", "ewbrdx-trnx ewtx-thmx-gryx-ccx");
      });
      var vis = [];
      blocks.forEach(function (b) {
        var a = b.getAttribute('data-tab') === String(id);
        swap(b, !a, HIDDEN, '');
        if (a) vis.push(b);
      });
      guestSwipers(vis);
    }
    lis.forEach(function (li) {
      on(li, 'click', function () {
        var id = li.getAttribute('data-tab');
        W.history.pushState(null, '', W.location.pathname + '?tab=' + id);
        set(id);
      });
    });
    $$('button[data-href]').forEach(function (b) { on(b, 'click', function () { W.location.href = b.getAttribute('data-href'); }); });
    var q = new URLSearchParams(W.location.search).get('tab');
    set(q && /^[1-4]$/.test(q) ? q : 1);
  }


  /* ════════ 이벤트 카드 D-day — 원본은 서버가 '종료일까지 남은 날'(D-n)을 내려주고, 끝난 이벤트는 그림 칸에 closed 를 붙인다.
     우리는 카드의 기간 글(2026.09.29.~ 2026.10.21.)에서 종료일을 읽어 오늘 기준으로 다시 센다 ════════ */
  function dday(a) {
    var ps = a.querySelectorAll('p'), when = ps[ps.length - 1];
    if (!when) return;
    var m = when.textContent.match(/~\s*(\d{4})\.(\d{2})\.(\d{2})/);
    var ddp = ps.length > 2 ? ps[1] : null;
    if (!m) { if (ddp) ddp.remove(); return; }
    var end = new Date(+m[1], +m[2] - 1, +m[3]), now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var n = Math.round((end - today) / 864e5);
    var box = a.querySelector('div');
    if (n < 0) {
      addc(box, "ewclsx");
      if (ddp) ddp.remove();
    } else if (ddp) {
      ddp.textContent = n === 0 ? 'D-Day' : 'D-' + n;
    }
  }
  function eventCards() {
    $$('a[data-id]').forEach(function (a) {
      if (/^event-\d+\.html/.test(a.getAttribute('href') || '')) dday(a);
    });
  }

  /* ════════ 분류 단추(What's On 이벤트 · 라이프스타일 매장) — 켜진 단추: 검은 바탕 · 흰 굵은 글 ════════ */
  function chip(btn, a) {
    swap(btn, a, "ewbrdx-nnx ewbk-thmx-blcx ewfntx-bldx ewtx-whtx", '');
    swap(btn.querySelector('span'), a, "ewfntx-bldx ewtx-whtx", "ewfntx-mdmx");
  }
  var EVENT_CAT = { 'event-1.html': 'Eat & Drink', 'event-2.html': 'Eat & Drink', 'event-3.html': 'Shop' };
  function whatsonFilter() {
    if (EW.page !== 'whatson') return;
    var cards = $$('a[data-id]').filter(function (a) { return /^event-\d+\.html/.test(a.getAttribute('href')); });
    if (!cards.length) return;
    var grid = cards[0].parentNode, nod = $('[data-ew="nodata"]');
    var row = $$('button').filter(function (b) { return b.textContent.trim() === 'All'; })[0];
    if (!row) return;
    var chips = kids(row.parentNode);
    function set(i) {
      chips.forEach(function (b, j) { chip(b, i === j); });
      var cat = chips[i].textContent.trim(), n = 0;
      cards.forEach(function (a) {
        var show = i === 0 || EVENT_CAT[a.getAttribute('href').split('?')[0]] === cat;
        a.style.display = show ? '' : 'none';
        if (show) n++;
      });
      swap(grid, !n, HIDDEN, '');
      if (grid.nextElementSibling && grid.nextElementSibling !== nod) swap(grid.nextElementSibling, !n, HIDDEN, '');
      if (nod) swap(nod, !!n, HIDDEN, '');
    }
    chips.forEach(function (b, i) {
      on(b, 'click', function () {
        var codes = ['', 'ep0101', 'ep0102', 'ep0103', 'ep0104', 'ep0105', 'ep0106', 'ep0107', 'ep0108'];
        W.history.replaceState(null, '', W.location.pathname + '?lang=ko&category=' + (codes[i] || ''));
        set(i);
      });
    });
  }
  /* 라이프스타일 — 분류는 분류 쪽으로(원본은 같은 쪽에서 다시 불러온다), 이름 찾기는 그 자리에서 거른다.
     원본은 분류 목록을 받은 뒤 0.5초 있다가 화면 한 높이만큼 부드럽게 내려간다(쪽을 열 때마다) — 그대로 */
  var CAT_PAGES = ['lifestyle.html', 'lifestyle-shop.html', 'lifestyle-eat.html', 'lifestyle-culture.html', 'lifestyle-wellness.html'];
  function lifestyleList() {
    if (!/^lifestyle/.test(EW.page || '')) return;
    var cards = $$('a[data-id]').filter(function (a) { return /^shop-\d+\.html/.test(a.getAttribute('href')); });
    var grid = cards.length ? cards[0].parentNode : null, nod = $('[data-ew="nodata"]');
    var all = $$('button').filter(function (b) { return b.textContent.trim() === 'All'; })[0];
    if (all) {
      kids(all.parentNode).forEach(function (b, i) {
        on(b, 'click', function () { W.location.href = CAT_PAGES[i]; });
      });
    }
    /* 원본은 16개씩 받아 오고, 목록 끝 1px 칸이 화면에 들어오면 다음 16개를 붙인다(무한 스크롤) */
    var PER = 16, shown = PER, v = '';
    function paint() {
      var n = 0, k = 0;
      cards.forEach(function (a) {
        var name = (a.children[1] ? a.children[1].textContent : '').toLowerCase();
        var hit = !v || name.indexOf(v) >= 0;
        if (hit) k++;
        var show = hit && k <= shown;
        a.style.display = show ? '' : 'none';
        if (show) n++;
      });
      return k;
    }
    if (grid) {
      paint();
      var sen = grid.nextElementSibling;
      if (sen && W.IntersectionObserver) {
        new IntersectionObserver(function (es) {
          if (es[0].isIntersecting && shown < cards.length) { shown += PER; paint(); }
        }).observe(sen);
      }
    }
    var inp = $(".ewcstx-ip" + ' input');
    if (inp && grid) {
      function filter() {
        v = inp.value.trim().toLowerCase();
        shown = PER;
        var n = paint();
        swap(grid.parentNode, !n, HIDDEN, '');
        if (nod) swap(nod, !!n, HIDDEN, '');
        var cat = { 'lifestyle-shop': 'br0101', 'lifestyle-eat': 'br0102', 'lifestyle-wellness': 'br0103', 'lifestyle-culture': 'br0104' }[EW.page] || '';
        W.history.replaceState(null, '', W.location.pathname + '?lang=ko&currentPageNo=1&category=' + cat + '&order=createDt&name=' + inp.value);
      }
      on(inp, 'input', filter);
      var q0 = new URLSearchParams(W.location.search).get('name');
      if (q0) { inp.value = q0; filter(); }
    }
    setTimeout(function () { W.scrollTo({ top: W.innerHeight, behavior: 'smooth' }); }, 500);
  }

  /* ════════ 검색 결과 — 원본 검색 API 자리. 색인(EW_SEARCH)에서 제목 · 이름(매장은 소개 글까지)에 검색어가 든 것.
     분류마다 처음 매장 4 · 나머지 3개, '더보기'로 같은 수만큼 더. 분류 탭은 그 칸으로 건너뛴다('전체'는 원본처럼 #brand) ════════ */
  function searchPage() {
    if (EW.page !== 'search' || !W.EW_SEARCH) return;
    var IDX = W.EW_SEARCH;
    var kw = (new URLSearchParams(W.location.search).get('keyword') || '').trim();
    var sw = $(".ewsrcx-wr"), inp = sw.querySelector('input'), go = sw.querySelector('.' + "ant-input-suffix" + ' img');
    inp.value = kw;
    function run() { W.location.href = 'search.html?keyword=' + encodeURIComponent(inp.value); }
    on(inp, 'keydown', function (e) { if (e.key === 'Enter') run(); });
    on(go, 'click', run);
    var cw = $(".ewcntx-wr"), nod = $('[data-ew="nodata"]');
    var bar = cw.children[0], allA = bar.querySelector('[data-ew="all"]'), tabT = bar.querySelector('[data-ew="tab"]');
    var KINDS = [['brand', 'Lifestyle', 4], ['event', 'Event & Promotion', 3], ['press', 'Press & Media', 3], ['stories', 'Stories of Elmwood', 3]];
    var k = kw.toLowerCase(), found = {}, total = 0;
    KINDS.forEach(function (x) {
      found[x[0]] = kw ? (IDX[x[0]] || []).filter(function (it) {
        return (it.n || '').toLowerCase().indexOf(k) >= 0 || (x[0] === 'brand' && (it.s || '').toLowerCase().indexOf(k) >= 0);
      }) : [];
      total += found[x[0]].length;
    });
    tabT.remove();
    if (!total) {
      cw.style.display = 'none';
      if (nod) delc(nod, HIDDEN);
      return;
    }
    var tabsA = [allA];
    KINDS.forEach(function (x) {
      var list = found[x[0]], sec = $('#ew-' + x[0]);
      if (!list.length) { sec.remove(); return; }
      var a = tabT.cloneNode(true), sp = a.querySelector('span');
      a.setAttribute('href', '#ew-' + x[0]);
      sp.firstChild.textContent = x[1];
      sp.querySelector('span').textContent = '(' + list.length + ')';
      bar.appendChild(a);
      tabsA.push(a);
      delc(sec, HIDDEN);
      sec.querySelector('h3 span').textContent = '(' + list.length + ')';
      var tpl = sec.querySelector('[data-ew="item"]'), box = tpl.parentNode, more = sec.querySelector('[data-ew="more"]'), shown = 0;
      tpl.remove();
      function fill(it) {
        var e = tpl.cloneNode(true), ims = e.querySelectorAll('img');
        e.removeAttribute('data-ew');
        e.setAttribute('href', it.h);
        if (ims[0]) ims[0].src = it.i;
        if (ims[1]) ims[1].src = it.m || it.i;
        var ts = [].filter.call(e.querySelectorAll('div, p, span'), function (t) { return !t.children.length; });
        if (x[0] === 'brand') { ts[0].textContent = it.n; e.querySelector('p').textContent = it.s; }
        else if (x[0] === 'event') { var ps = e.querySelectorAll('p'); ps[0].textContent = it.n; ps[ps.length - 1].textContent = it.d; }
        else if (x[0] === 'press') { var pp = e.querySelectorAll('p'); ts[0].textContent = 'Press'; pp[0].textContent = it.n; pp[1].textContent = it.d; }
        else { e.querySelector('span').textContent = it.l; e.querySelector('p').textContent = it.n; }
        box.appendChild(e);
      }
      function page() {
        list.slice(shown, shown + x[2]).forEach(fill);
        shown = Math.min(list.length, shown + x[2]);
        swap(more, shown >= list.length, HIDDEN, '');
      }
      page();
      on(more, 'click', page);
    });
    allA.setAttribute('href', '#ew-brand');
    tabsA.forEach(function (a, i) {
      on(a, 'click', function () {
        tabsA.forEach(function (b, j) {
          var on_ = i === j, sp = b.querySelector('span');
          swap(b, !on_, "ewtx-thmx-gryx3", '');
          swap(sp, on_, "ewfntx-bldx ewtx-thmx-blcx2", '');
          if (sp.querySelector('span')) swap(sp.querySelector('span'), on_, "ewfntx-bldx ewtx-thmx-blcx2", '');
        });
      });
    });
  }

  /* ════════ 보도 상세 — 주소 복사 단추: 현재 쪽 주소를 클립보드에 넣고 알림(원본 그대로) ════════ */
  function copyLink() {
    $$('button img').forEach(function (im) {
      if (!/link-40\.svg$/.test(im.getAttribute('src') || '')) return;
      on(im.parentNode, 'click', function () {
        try {
          navigator.clipboard.writeText(W.location.href).then(function () { alert('현재 페이지의 URL이 클립보드에 복사되었습니다.'); }, function () {});
        } catch (e) {}
      });
    });
  }

  /* ════════ 동네 — 지도 핀 · 오른쪽 목록에 마우스를 올리면 그 곳 경로 그림이 나타나고 다른 핀은 흐려진다(원본 ea). 누르면 상세 창(원본 el).
     모바일 목록은 원본이 누른 이벤트 자체를 id 로 넘겨(onClick: el) 내용 없는 상세 창이 뜬다 — 그대로 ════════ */
  var NBD = [{"t": "청솔 수목원", "s": "사계절 정원을 걷는 도심 속 수목원", "c": "엘름우드의 정원처럼 청솔 수목원의 너른 녹지는 도심의 업무 환경에 쉼과 여유를 더해 줍니다. (이미지 제공: 청솔 수목원)", "d": "청솔 수목원은 도심 한가운데서 계절마다 달라지는 숲을 만날 수 있는 도시형 수목원입니다. 숲길역에서 걸어서 닿는 이곳은 침엽수원, 물가 정원, 열린 잔디마당, 습지 산책로 네 구역으로 나뉘어 있으며, 대표 공간인 유리 온실에는 따뜻한 지방의 나무와 꽃이 사철 피어 있습니다. 야외 정원에는 우리 땅에서 자라는 나무와 보호가 필요한 식물을 함께 심어 걷는 길마다 배울 거리가 있습니다. 온실은 유료로 운영되며, 3월부터 10월까지는 오전 9시 30분부터 오후 6시, 11월부터 2월까지는 오전 9시 30분부터 오후 5시까지 둘러볼 수 있습니다. 나머지 정원과 산책로는 연중 언제나 열려 있어 점심시간이나 퇴근길에도 가볍게 들를 수 있습니다. 나무와 계절이 만드는 풍경 속에서 하루의 속도를 잠시 늦출 수 있는 곳입니다.", "img": "./assets/img/p/base-nb-seoulplant-1080x678.jpg"}, {"t": "숲길 컨벤션센터", "s": "도시 서쪽의 새로운 전시 · 회의 거점", "c": "숲길 컨벤션센터는 엘름우드의 오피스와 이어져 국제 행사와 비즈니스 교류가 활발한 동네를 함께 만들어 가고 있습니다. (이미지 제공: 숲길 컨벤션센터)", "d": "숲길 컨벤션센터는 도시 서쪽에 처음 들어선 전시 · 컨벤션 시설로, 지난해 겨울 숲길역 앞 복합단지에 문을 열었습니다. 연면적 약 8만㎡ 규모의 이곳은 도심 동쪽에 몰려 있던 전시와 회의 수요를 서쪽으로 나누는 새로운 거점 역할을 하고 있습니다. 최대 2,000명이 들어가는 1층 전시장과 연회장, 크고 작은 회의실을 두루 갖추어 행사의 성격에 맞게 공간을 고를 수 있습니다. 숲길역과 청솔역이 함께 지나는 역세권이라 대중교통으로 오가기 편하고, 엘름우드와는 지하 보행 통로로 이어져 행사 전후로 식사와 휴식을 함께 즐길 수 있습니다. 전시와 회의, 교류가 한자리에서 이어지는 도시 서쪽의 새로운 비즈니스 무대입니다.", "img": "./assets/img/p/base-nb-coexmagoc-1080x678.jpg"}, {"t": "느티 리서치파크", "s": "기업 연구소가 모인 연구 단지", "c": "느티 리서치파크는 엘름우드와 함께 이 동네의 혁신 생태계를 이루며, 기술과 비즈니스가 만나는 새로운 연결을 만들어 가고 있습니다. (이미지 제공: 느티 리서치파크)", "d": "느티 리서치파크는 여러 기업의 연구소가 한곳에 모인 대규모 연구 단지입니다. 몇 해 전 숲길역 북쪽에 문을 연 이곳에서는 전자, 소재, 통신, 에너지 등 다양한 분야의 연구자 2만여 명이 함께 일하며 미래 기술을 연구하고 있습니다. 단지 안에는 누구나 들를 수 있는 과학 체험관과 강연장이 있어 주말이면 아이와 함께 찾는 가족도 많습니다. 연구 단지를 넘어 이웃 기업, 지역 주민과 생각을 나누며 함께 성장하는 열린 혁신 공동체를 지향합니다.", "img": "./assets/img/p/base-nb-lgpark-1080x678.jpg"}, {"t": "갤러리 소담", "s": "도심 속 정원과 예술이 만나는 미술관", "c": "갤러리 소담은 엘름우드의 업무 공간과 함께 이 동네가 일만 하는 곳을 넘어 문화와 예술이 살아 있는 동네로 자라는 데 힘을 보태고 있습니다. (이미지 제공: 갤러리 소담)", "d": "갤러리 소담은 작은 전시 공간에서 시작해 몇 해 전 숲길역 인근으로 자리를 넓혀 다시 문을 연 미술관입니다. 그간 이름이 덜 알려진 신진 작가와 다시 조명할 필요가 있는 중견 작가를 꾸준히 소개하며 전시 기회를 넓혀 왔습니다. 곧게 뻗은 도시 블록 사이에서 부드러운 곡선을 그리는 건물은 그 자체로 볼거리가 되어 산책 삼아 찾는 이웃도 많습니다. 지하 1층, 지상 2층 규모의 건물 안에는 천장 높이가 서로 다른 전시실이 이어져 있어 작품마다 알맞은 전시 환경을 만들 수 있습니다. 문화 공간이 많지 않던 도시 서쪽에서 주민들이 현대 미술을 가깝게 만나는 새로운 문화 거점으로 자리 잡고 있으며, 옥상 정원과 바깥 잔디 마당에서 자연과 예술을 함께 누릴 수 있습니다.", "img": "./assets/img/p/base-nb-spacek-1080x678.jpg"}, {"t": "도심공항터미널", "s": "공항까지 가장 가까운 출발점", "c": "도심공항터미널은 엘름우드 입주 기업의 국내외 출장과 해외 파트너와의 만남을 잇는 가까운 관문이 되어 줍니다. (이미지 제공: 도심공항터미널)", "d": "도심공항터미널은 도시 서쪽에서 공항까지 가장 빠르게 이어지는 출발점입니다. 이곳에서 미리 탑승 수속과 짐 부치기를 마치고 공항 직통 열차에 오르면 별도의 기다림 없이 바로 출국장으로 들어갈 수 있습니다. 숲길역과 청솔역에서 한두 정거장 거리라 엘름우드에서 지하철로 10분 안팎이면 닿을 수 있어, 업무를 마치고 바로 출장길에 오르는 직장인들에게 특히 인기가 높습니다. 터미널 안에는 환전소와 여행자 보험 창구, 간단한 식사를 할 수 있는 식당가가 마련되어 있으며, 공항버스 정류장도 가까워 국내 주요 도시로 오가기에도 편리합니다. 몇 해 전 새 단장을 마쳐 더 넓고 쾌적한 시설을 갖추었습니다.", "img": "./assets/img/p/base-nb-airport-1080x678.jpg"}, {"t": "숲길 아트홀", "s": "사계절 무대가 이어지는 공연 예술 공간", "c": "숲길 아트홀은 엘름우드에서 일하는 직장인들에게 퇴근 뒤 수준 높은 공연을 가까이에서 즐기는 문화적 여유를 선물합니다. (이미지 제공: 숲길 아트홀)", "d": "숲길역 앞에 자리한 숲길 아트홀은 비영리 재단이 운영하는 공연장입니다. 도심의 작은 극장에서 출발해 오랫동안 국내외의 좋은 작품을 소개해 오다가 몇 해 전 지금의 자리로 옮겨 새롭게 문을 열었습니다. 기획 공연을 비롯해 연극, 뮤지컬, 무용, 콘서트 등 여러 장르의 무대를 통해 지금의 공연 예술을 폭넓게 소개합니다. 빛이 깊숙이 드는 로비와 정원으로 이어지는 계단은 공연이 없는 날에도 쉬어 가기 좋은 곳입니다. 1,300석 규모의 대극장과 객석 배치를 바꿀 수 있는 블랙박스 극장을 갖춘 이곳은 예술과 일상, 자연과 시민이 만나는 도시 서쪽의 새로운 문화 명소로 자리 잡고 있습니다.", "img": "./assets/img/p/base-nb-lgartcenter-1080x678.jpg"}];
  function neighborhood() {
    var mw = $(".ewmp-wr");
    if (!mw) return;
    var pins = $$('button', mw), overlays = $$('img[data-map]', mw).length ? $$('img[data-map]', mw) : $$('img', mw).slice(1, 1 + pins.length);
    var list = $$('ul' + ".ewlgx-blcx" + ' li button');
    var mob = $$(".ewcstx-mp-swpx" + ' li button');
    var Wv = '', Qv = '';
    function render() {
      pins.forEach(function (b, i) {
        var a = Wv === '' || Wv === i;
        swap(b, a, "ewpctx-100", "ewpctx-50");
      });
      overlays.forEach(function (im, i) { swap(im, Wv === i, "ewfdx-inx", "ewfdx-outx"); });
      list.forEach(function (b, i) { swap(b, Wv === i, "ewbk-thmx-whtx ewtrnx-llx ewdrtx-300", "ewbk-whtx2 ewtrnx-llx ewdrtx-300"); });
    }
    function ea(i, leave) { if (leave && Qv !== '') Wv = ''; else Wv = i === '' ? Qv : i; render(); }
    function open(i) { Qv = i; detail(i === null ? null : NBD[i]); }
    pins.concat(list).forEach(function (b, j) {
      var i = j % pins.length;
      on(b, 'click', function (e) { e.preventDefault(); open(i); });
      on(b, 'mouseenter', function () { ea(i); });
      on(b, 'mouseleave', function () { ea('', true); });
    });
    mob.forEach(function (b) { on(b, 'click', function () { open(null); }); });
    /* 교통수단 표시 기준 — 데스크톱은 올리면, 모바일은 누르면 펼친다(아래 오른쪽 맞춤 · 화살표 없음) */
    var pb = $(".ewcstx-ppvx-bt");
    if (pb) {
      var pop = null;
      function show(v) {
        if (v && !pop) {
          pop = D.createElement('div');
          pop.className = "ant-popover ewcstx-ppvx css-mncuj7 ant-popover-placement-bottomRight";
          pop.innerHTML = NB_POP;
          D.body.appendChild(pop);
          var r = pb.getBoundingClientRect();
          pop.style.cssText = 'position:absolute; box-sizing:border-box; top:' + (r.bottom + W.scrollY + 4) + 'px; right:' + (D.documentElement.clientWidth - r.right) + 'px;';
          if (!isMo()) { on(pop, 'mouseenter', function () { clearTimeout(pt); }); on(pop, 'mouseleave', function () { pt = setTimeout(function () { show(false); }, 100); }); }
        } else if (!v && pop) { pop.remove(); pop = null; }
      }
      var pt = 0;
      on(pb, 'mouseenter', function () { if (!isMo()) { clearTimeout(pt); show(true); } });
      on(pb, 'mouseleave', function () { if (!isMo()) pt = setTimeout(function () { show(false); }, 100); });
      on(pb, 'click', function () { if (isMo()) show(!pop); });
      on(D, 'click', function (e) { if (pop && isMo() && !pb.contains(e.target) && !pop.contains(e.target)) show(false); });
    }
    render();
  }
  var NB_POP = "<div class=\"ant-popover-content\"><div class=\"ant-popover-inner\" role=\"tooltip\"><div class=\"ant-popover-inner-content\"><div class=\"ewflxx ewflxx-cl ewgpx-3 ewlgx-gpx-11px\"><div class=\"ewflxx ewtmsx-md\"><span class=\"ewflxx ewmnx-wx-56px ewtmsx-md ewtx-f12x2 ewfntx-smbx2 ewtx-thmx-blcx2\"><img alt=\"도보\" width=\"20\" height=\"20\" class=\"ewhx-4 ewwx-4 ewlgx-hx-5 ewlgx-wx-5\" src=\"./assets/img/icons/walk.svg\"><span class=\"ewmlx-1 ewtx-f12x2 ewfntx-bldx\">도보</span></span><span class=\"ewmlx-3 ewtx-f12x2 ewtx-thmx-gryx\">엘름우드 반경 1.5km 이하</span></div><div class=\"ewflxx ewtmsx-md\"><span class=\"ewflxx ewmnx-wx-56px ewtmsx-md ewtx-f12x2 ewfntx-smbx2 ewtx-thmx-blcx2\"><img alt=\"자전거\" width=\"20\" height=\"20\" class=\"ewhx-4 ewwx-4 ewlgx-hx-5 ewlgx-wx-5\" src=\"./assets/img/icons/bike.svg\"><span class=\"ewmlx-1 ewtx-f12x2 ewfntx-bldx\">자전거</span></span><span class=\"ewmlx-3 ewtx-f12x2 ewtx-thmx-gryx\">엘름우드 반경 2km 이하</span></div><div class=\"ewflxx ewtmsx-md\"><span class=\"ewflxx ewmnx-wx-56px ewtmsx-md ewtx-f12x2 ewfntx-smbx2 ewtx-thmx-blcx2\"><img alt=\"지하철\" width=\"20\" height=\"20\" class=\"ewhx-4 ewwx-4 ewlgx-hx-5 ewlgx-wx-5\" src=\"./assets/img/icons/subway.svg\"><span class=\"ewmlx-1 ewtx-f12x2 ewfntx-bldx\">지하철</span></span><span class=\"ewmlx-3 ewtx-f12x2 ewtx-thmx-gryx\">엘름우드와 이웃 시설 간 직선 거리 2km 이상</span></div><div class=\"ewflxx ewtmsx-md\"><span class=\"ewflxx ewmnx-wx-56px ewtmsx-md ewtx-f12x2 ewfntx-smbx2 ewtx-thmx-blcx2\"><img alt=\"자동차\" width=\"20\" height=\"20\" class=\"ewhx-4 ewwx-4 ewlgx-hx-5 ewlgx-wx-5\" src=\"./assets/img/icons/car.svg\"><span class=\"ewmlx-1 ewtx-f12x2 ewfntx-bldx\">자동차</span></span><span class=\"ewmlx-3 ewtx-f12x2 ewtx-thmx-gryx\">엘름우드 반경 1km 이상 또는 도보 1km 이상</span></div></div></div></div></div>";
  var nbm = null;
  function detail(it) {
    if (nbm) nbm.remove();
    nbm = D.createElement('div');
    nbm.className = "ant-modal-root css-mncuj7 ewcstx-mdlx";
    nbm.innerHTML = '<div class="' + "ant-modal-mask" + '"></div><div tabindex="-1" class="' + "ant-modal-wrap" + '"><div role="dialog" aria-modal="true" aria-labelledby="ew-nb-title" class="' + "ant-modal css-mncuj7" + ' ew-nbm"><div class="' + "ant-modal-content" + '">' +
      '<button type="button" aria-label="Custom Close Button" class="' + "ant-modal-close" + '"><span class="' + "ant-modal-close-x" + '"><img alt="close" width="40" height="40" class="' + "ewlgx-hx-10 ewlgx-wx-10" + '" src="' + IC + 'close-40.svg"></span></button>' +
      '<div class="' + "ant-modal-header" + '"><div class="' + "ant-modal-title" + '" id="ew-nb-title"><div class="' + "ewmxx-autx ewbx-brdx ewwx-fllx ewmxx-wx-128x ewpxx-5" + '"><h1 class="' + "ewtx-md ewtx-f28x ewfntx-bldx ewxlx-tx-f44x" + '"></h1><p class="' + "ewtx-md ewtx-f18x ewfntx-bldx ewtx-thmx-blcx2 ewlgx-mtx-2-5" + '"></p></div></div></div>' +
      '<div class="' + "ant-modal-body" + '"><div><div class="' + "ewmtx-10 ewlgx-mtx-60px2" + '"><img alt="img" width="1080" height="678" class="' + "ewwx-fllx" + '"></div>' +
      '<p class="' + "ewmxx-autx ewmtx-60px ewwx-fllx ewwhtx-prx-rl ewtx-f20x2 ewfntx-nrmx2 ewtx-thmx-blcx2 ewlgx-mtx-60px2 ewlgx-mxx-wx-900x" + '"></p>' +
      '<a target="_blank" class="' + "ewbt-bscx ewmxx-autx ewmtx-8 ewbk-thmx-blcx ewhvrx-bk-thmx-blcx ewlgx-mtx-10" + '"><span class="' + "ewtx" + '"></span></a></div></div></div></div></div>';
    D.body.appendChild(nbm);
    lockBody(true);
    if (it) {
      nbm.querySelector('h1').textContent = it.t;
      nbm.querySelector('.' + "ant-modal-title" + ' p').textContent = it.s;
      var im = nbm.querySelector('.' + "ant-modal-body" + ' img');
      im.src = it.img;
      im.alt = 'img';
      var cap = D.createElement('p');
      cap.className = "ewmtx-12px ewtx-f12x2 ewfntx-nrmx2 ewldnx-150 ewtx-thmx-gryx ewpctx-80 ewxlx-mtx-5 ewxlx-tx-f16x";
      cap.textContent = it.c;
      im.parentNode.appendChild(cap);
      nbm.querySelector('.' + "ant-modal-body" + ' > div > p').textContent = it.d;
      nbm.querySelector('.' + "ant-modal-body" + ' a').setAttribute('href', '#');
      nbm.querySelector('.' + "ant-modal-body" + ' a span').textContent = '홈페이지 바로가기';
    } else {
      nbm.querySelector('.' + "ant-modal-body" + ' img').removeAttribute('src');
      nbm.querySelector('.' + "ant-modal-body" + ' a span').textContent = '홈페이지 바로가기';
    }
    function close() { if (!nbm) return; nbm.remove(); nbm = null; lockBody(false); }
    on(nbm.querySelector('.' + "ant-modal-close"), 'click', close);
    on(nbm.querySelector('.' + "ant-modal-wrap"), 'click', function (e) { if (e.target === e.currentTarget) close(); });
  }


  /* ════════ 폼 — 원본은 서버(API)로 보내고 서버 응답 글을 알림으로 띄운다. 우리는 서버가 없어 입력 검사 · 단추 켜짐 · 창 · 고르기는 원본 규칙대로,
     보내기는 접수 안내 알림으로 끝낸다(원본의 서버 응답 글 자리) ════════ */
  var TENANTS = [
    ['(주)한결건설', 'HANGYEOL E&C', 'A동 7F'], ['스페이스온', 'SPACE ON', 'B동 5F'], ['다온항공(주)', 'DAON AIR', 'C동 9F'], ['누리바이오', 'NURI BIO', 'D동 4F'],
    ['도담PM', 'DODAM PM', 'A동 3F'], ['누리자산운용(주)', 'NURI ASSET MANAGEMENT', 'B동 11F'], ['숲 호스피탈리티', 'SOOP HOSPITALITY', 'A동 3F'],
    ['(주)소담에어', 'SODAM AIR', 'C동 6F'], ['한빛연금', 'HANBIT PENSION', 'D동 8F'], ['온새미로소프트', 'ONSAEMIRO SOFT', 'B동 7F']
  ];
  function modalOf(kind) { return $('[data-ew="' + kind + '"]'); }
  function openM(kind) { showModal(modalOf(kind), true); }
  function wireModal(kind, outsideCloses) {
    var m = modalOf(kind);
    if (!m) return;
    on(m.querySelector('.' + "ant-modal-close"), 'click', function (e) { e.preventDefault(); showModal(m, false); });
    if (outsideCloses) on(m.querySelector('.' + "ant-modal-wrap"), 'click', function (e) { if (e.target === e.currentTarget) showModal(m, false); });
  }
  /* 체크박스 — 앤트: 칸에 -checked, 감싼 label 에 -wrapper-checked */
  function checks(root) {
    $$('.' + "ant-checkbox-input", root).forEach(function (c) {
      if (c.closest('[data-ew="login"]')) return;
      on(c, 'change', function () {
        swap(c.parentNode, c.checked, "ant-checkbox-checked", '');
        swap(c.closest('label'), c.checked, "ant-checkbox-wrapper-checked", '');
      });
    });
  }
  /* 고르기(앤트 Select) — 펼침은 body 에 붙여 칸 바로 아래에(원본 bottomLeft) */
  var openDD = null;
  function closeDD() { if (openDD) { openDD.el.remove(); delc(openDD.sel, "ant-select-open ant-select-focused"); openDD = null; } }
  on(D, 'click', function (e) { if (openDD && !openDD.sel.contains(e.target) && !openDD.el.contains(e.target)) closeDD(); });
  function select(sel, getOpts, onPick) {
    if (!sel) return;
    var box = sel.querySelector('.' + "ant-select-selector");
    sel.ewValue = '';
    function open() {
      var opts = getOpts();
      if (!opts.length) return;
      var r = sel.getBoundingClientRect();
      var dd = D.createElement('div');
      dd.className = "ant-select-dropdown css-mncuj7 ant-select-dropdown-placement-bottomLeft";
      dd.style.cssText = 'position:absolute; inset:' + (r.bottom + W.scrollY + 4) + 'px auto auto ' + (r.left + W.scrollX) + 'px; box-sizing:border-box; width:' + r.width + 'px;';
      dd.innerHTML = '<div><div class="' + "rc-virtual-list" + '" style="position: relative;"><div class="' + "rc-virtual-list-holder" + '" style="max-height: 256px; overflow-y: auto; overflow-anchor: none;"><div><div class="' + "rc-virtual-list-holder-inner" + '" style="display: flex; flex-direction: column;">' +
        opts.map(function (o) {
          var s = o === sel.ewValue;
          return '<div role="option" aria-selected="' + s + '" title="' + o + '" class="' + "ant-select-item ant-select-item-option" + (s ? ' ' + "ant-select-item-option-selected" : '') + '"><div class="' + "ant-select-item-option-content" + '">' + o + '</div><span class="' + "ant-select-item-option-state" + '" unselectable="on" aria-hidden="true"></span></div>';
        }).join('') + '</div></div></div></div></div>';
      D.body.appendChild(dd);
      addc(sel, "ant-select-open ant-select-focused");
      openDD = { el: dd, sel: sel };
      $$('.' + "ant-select-item", dd).forEach(function (it, i) {
        on(it, 'mouseenter', function () { $$('.' + "ant-select-item", dd).forEach(function (x) { delc(x, "ant-select-item-option-active"); }); addc(it, "ant-select-item-option-active"); });
        on(it, 'click', function (e) { e.stopPropagation(); pick(opts[i]); closeDD(); });
      });
    }
    function pick(v) {
      sel.ewValue = v;
      var wrap = sel.querySelector('.' + "ant-select-selection-wrap") || box;
      var ph = wrap.querySelector('.' + "ant-select-selection-placeholder");
      if (ph) ph.remove();
      var it = wrap.querySelector('.' + "ant-select-selection-item");
      if (!it) { it = D.createElement('span'); it.className = "ant-select-selection-item"; wrap.appendChild(it); }
      it.textContent = v;
      it.title = v;
      if (onPick) onPick(v);
    }
    sel.ewPick = pick;
    sel.ewReset = function () {
      sel.ewValue = '';
      var it = sel.querySelector('.' + "ant-select-selection-item");
      if (it) it.remove();
    };
    on(box, 'click', function (e) {
      e.stopPropagation();
      if (sel.classList.contains("ant-select-disabled")) return;
      if (openDD && openDD.sel === sel) closeDD(); else { closeDD(); open(); }
    });
  }
  /* 날짜 고르기(앤트 DatePicker, 영문 달력 · Today) — disabled(날) 이 참이면 못 고른다 */
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function picker(pk, disabled, onPick) {
    if (!pk) return;
    var inp = pk.querySelector('input'), dd = null, view = new Date();
    view.setDate(1);
    function close() { if (dd) { dd.remove(); dd = null; delc(pk, "ant-picker-focused"); } }
    function render() {
      var y = view.getFullYear(), m = view.getMonth(), first = new Date(y, m, 1), start = new Date(y, m, 1 - first.getDay());
      var today = new Date(), cur = inp.value;
      var rows = '';
      for (var w = 0; w < 6; w++) {
        rows += '<tr>';
        for (var d = 0; d < 7; d++) {
          var c = new Date(start.getFullYear(), start.getMonth(), start.getDate() + w * 7 + d), v = ymd(c);
          var cls = "ant-picker-cell" + (c.getMonth() === m ? ' ' + "ant-picker-cell-in-view" : '') + (v === ymd(today) ? ' ' + "ant-picker-cell-today" : '') +
            (v === cur ? ' ' + "ant-picker-cell-selected" : '') + (disabled && disabled(c) ? ' ' + "ant-picker-cell-disabled" : '');
          rows += '<td title="' + v + '" class="' + cls + '"><div class="' + "ant-picker-cell-inner" + '">' + c.getDate() + '</div></td>';
        }
        rows += '</tr>';
      }
      dd.innerHTML = '<div tabindex="-1" class="' + "ant-picker-panel-container ant-picker-date-panel-container" + '" style="margin-left: 0px; margin-right: auto;"><div class="' + "ant-picker-panel-layout" + '"><div><div tabindex="0" class="' + "ant-picker-panel" + '"><div class="' + "ant-picker-date-panel" + '">' +
        '<div class="' + "ant-picker-header" + '"><button type="button" aria-label="Last year (Control + left)" tabindex="-1" class="' + "ant-picker-header-super-prev-btn" + '" data-k="-12"><span class="' + "ant-picker-super-prev-icon" + '"></span></button>' +
        '<button type="button" aria-label="Previous month (PageUp)" tabindex="-1" class="' + "ant-picker-header-prev-btn" + '" data-k="-1"><span class="' + "ant-picker-prev-icon" + '"></span></button>' +
        '<div class="' + "ant-picker-header-view" + '"><button type="button" tabindex="-1" class="' + "ant-picker-month-btn" + '">' + MON[m] + '</button><button type="button" tabindex="-1" class="' + "ant-picker-year-btn" + '">' + y + '</button></div>' +
        '<button type="button" aria-label="Next month (PageDown)" tabindex="-1" class="' + "ant-picker-header-next-btn" + '" data-k="1"><span class="' + "ant-picker-next-icon" + '"></span></button>' +
        '<button type="button" aria-label="Next year (Control + right)" tabindex="-1" class="' + "ant-picker-header-super-next-btn" + '" data-k="12"><span class="' + "ant-picker-super-next-icon" + '"></span></button></div>' +
        '<div class="' + "ant-picker-body" + '"><table class="' + "ant-picker-content" + '"><thead><tr>' + ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(function (t) { return '<th>' + t + '</th>'; }).join('') + '</tr></thead><tbody>' + rows + '</tbody></table></div></div></div>' +
        '<div class="' + "ant-picker-footer" + '"><ul class="' + "ant-picker-ranges" + '"><li class="' + "ant-picker-now" + '"><a class="' + "ant-picker-now-btn" + '" aria-disabled="' + !!(disabled && disabled(today)) + '">Today</a></li></ul></div></div></div></div>';
      $$('[data-k]', dd).forEach(function (b) { on(b, 'click', function (e) { e.stopPropagation(); view.setMonth(view.getMonth() + parseInt(b.getAttribute('data-k'), 10)); render(); }); });
      $$('td', dd).forEach(function (td) {
        on(td, 'click', function (e) {
          e.stopPropagation();
          if (td.classList.contains("ant-picker-cell-disabled")) return;
          inp.value = td.title;
          close();
          if (onPick) onPick(td.title);
        });
      });
      var now = dd.querySelector('.' + "ant-picker-now-btn");
      on(now, 'click', function (e) {
        e.stopPropagation();
        if (disabled && disabled(new Date())) return;
        inp.value = ymd(new Date());
        close();
        if (onPick) onPick(inp.value);
      });
    }
    on(pk, 'click', function (e) {
      e.stopPropagation();
      if (dd) return;
      var r = pk.getBoundingClientRect();
      dd = D.createElement('div');
      dd.className = "ant-picker-dropdown css-mncuj7 ant-picker-dropdown-placement-bottomLeft";
      dd.style.cssText = 'position:absolute; inset:' + (r.bottom + W.scrollY + 4) + 'px auto auto ' + (r.left + W.scrollX) + 'px; box-sizing:border-box;';
      D.body.appendChild(dd);
      addc(pk, "ant-picker-focused");
      if (inp.value) { var p = inp.value.split('-'); view = new Date(+p[0], +p[1] - 1, 1); }
      render();
      on(dd, 'click', function (e2) { e2.stopPropagation(); });
    });
    on(D, 'click', close);
    inp.readOnly = true;
  }
  /* 켜진/꺼진 보내기 단추 — 원본: 꺼짐 'cursor-not-allowed bg-…' · 켜짐 'bg-themeBlack text-white' */
  function submitBtn(b, ok, offCls) {
    b.disabled = !ok;
    swap(b, ok, "ewbk-thmx-blcx ewtx-whtx", offCls);
  }

  /* ── FAQ — 질문을 누르면 그 답만 펼친다(다른 답은 닫힘, 다시 누르면 닫힘). 화살표는 돌지 않는다(원본 그대로) ── */
  function faq() {
    var qs = $$('li[data-n]');
    if (!qs.length) return;
    var ans = qs.map(function (li) { return li.nextElementSibling; });
    qs.forEach(function (li, i) {
      on(li, 'click', function () {
        var open = !ans[i].classList.contains(HIDDEN);
        ans.forEach(function (a) { addc(a, HIDDEN); });
        if (!open) delc(ans[i], HIDDEN);
      });
    });
    var form = $(".ewgstx");
    if (!form) return;
    var sels = $$('.' + "ant-select", form);
    select(sels[0], function () { return ['리테일', '오피스']; }, check);
    select(sels[1], function () { return ['일반 문의', '불편 문의', '시설 문의']; }, check);
    var f = {};
    ['name', 'email', 'tel', 'title'].forEach(function (n) { f[n] = form.querySelector('input[name="' + n + '"]'); });
    f.content = form.querySelector('textarea');
    on(f.tel, 'input', function () { f.tel.value = f.tel.value.replace(/\D/g, ''); });
    var boxes = $$('.' + "ant-checkbox-input", form);
    var btn = $$('button', form).filter(function (b) { return b.classList.contains("ewwrkx"); })[0];
    var pol = ['policy-privacy', 'policy-terms', 'policy-third'];
    $$('.' + "ant-checkbox-label" + ' button', form).forEach(function (b, i) {
      on(b, 'click', function (e) { e.preventDefault(); e.stopPropagation(); openM(pol[i]); });
    });
    pol.forEach(function (k) { wireModal(k, true); });
    function check() {
      var ok = sels[0].ewValue && sels[1].ewValue && f.name.value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value) && f.tel.value.length >= 9 &&
        f.title.value.trim() && f.content.value.trim() && boxes.every(function (c) { return c.checked; });
      submitBtn(btn, !!ok, "ewcrsx-ntx-llwx ewbk-thmx-gryx-ccx ewtx-thmx-gryx3");
    }
    [f.name, f.email, f.tel, f.title, f.content].forEach(function (x) { on(x, 'input', check); });
    boxes.forEach(function (c) { on(c, 'change', check); });
    on(btn, 'click', function (e) {
      e.preventDefault();
      if (btn.disabled) return;
      alert('문의가 접수되었습니다. 남겨 주신 이메일로 답변드리겠습니다.');
      [f.name, f.email, f.tel, f.title, f.content].forEach(function (x) { x.value = ''; });
      sels.forEach(function (s) { s.ewReset(); });
      boxes.forEach(function (c) { if (c.checked) c.click(); });
      check();
    });
    check();
  }

  /* ── 방문 등록 — 원본 O(): 평일만 · 지난 날 안 됨, 시간은 08:00~17:00 30분 단위(오늘이면 지난 시각 빼고), 인원 1~10명(넘으면 알림),
     입주사는 검색 창에서 고른다. 열면 0.5초 뒤 한 화면 내려간다. 조회 탭(?tab=detail)도 같은 쪽 ── */
  function visitor() {
    if (EW.page !== 'visitor') return;
    setTimeout(function () { W.scrollTo({ top: W.innerHeight, behavior: 'smooth' }); }, 500);
    var paneOf = function (v) { return $$('div[data-tab="' + v + '"]').filter(function (e) { return !e.classList.contains("ewtb-bt"); })[0]; };
    var pane = paneOf('regist'), form = pane && pane.querySelector('form');
    wireModal('rules', false);
    wireModal('company', true);
    wireModal('policy-privacy', true);
    wireModal('policy-terms', true);
    on(pane.querySelector(".ewgstx" + ' > div'), 'click', function () { openM('rules'); });
    if (!form) return;
    var f = function (n) { return form.querySelector('[name="' + n + '"]'); };
    var pk = form.querySelector('.' + "ant-picker"), sel = form.querySelector('.' + "ant-select");
    var weekdayOnly = function (d) { var t = new Date(); t.setHours(0, 0, 0, 0); return d < t || d.getDay() === 0 || d.getDay() === 6; };
    var date = '';
    picker(pk, weekdayOnly, function (v) { date = v; if (sel.ewReset) sel.ewReset(); check(); });
    select(sel, function () {
      var out = [], now = new Date(), isToday = date === ymd(now);
      for (var l = 0; l < 19; l++) {
        var t = pad(8 + Math.floor(l / 2)) + ':' + (l % 2 === 0 ? '00' : '30');
        var p = (date || ymd(now)).split('-'), at = new Date(+p[0], +p[1] - 1, +p[2], 8 + Math.floor(l / 2), l % 2 ? 30 : 0);
        if (!(isToday && at < now)) out.push(t);
      }
      return out;
    }, check);
    /* 입주사 검색 창 */
    var comp = f('companyId'), cm = modalOf('company');
    on(comp, 'click', function () { openM('company'); });
    if (cm) {
      var q = cm.querySelector('input'), go = $$('button', cm).filter(function (b) { return b.textContent.trim() === '검색'; })[0], tb = cm.querySelector('tbody');
      var emptyRow = tb.innerHTML;
      on(go, 'click', function () {
        var k = q.value.trim().toLowerCase();
        var hits = k ? TENANTS.filter(function (t) { return (t[0] + ' ' + t[1]).toLowerCase().indexOf(k) >= 0; }) : [];
        if (!hits.length) { tb.innerHTML = emptyRow; return; }
        tb.innerHTML = hits.map(function (t, i) {
          return '<tr><td class="' + "ewbrdx ewpx-2 ewtx-lf ewtx-f12x2 ewlgx-tx-f14x" + '">' + t[0] + '</td><td class="' + "ewbrdx ewpx-2 ewtx-lf ewtx-f12x2 ewlgx-tx-f14x" + '">' + t[1] + '</td><td class="' + "ewbrdx ewpx-2 ewtx-lf ewtx-f12x2 ewlgx-tx-f14x" + '">' + t[2] + '</td>' +
            '<td class="' + "ewbrdx ewpx-2 ewtx-md ewtx-f12x2 ewlgx-tx-f14x" + '"><button type="button" data-i="' + TENANTS.indexOf(t) + '" class="' + "ewwhtx-nwrx ewrndx ewbk-thmx-blcx ewpxx-3 ewpyx-1 ewtx-f12x2 ewfntx-smbx2 ewtx-thmx-whtx2 ewlgx-tx-f14x" + '">선택</button></td></tr>';
        }).join('');
        $$('button[data-i]', tb).forEach(function (b) {
          on(b, 'click', function () {
            comp.value = TENANTS[+b.getAttribute('data-i')][0];
            showModal(cm, false);
            q.value = '';
            tb.innerHTML = emptyRow;
            check();
          });
        });
      });
      on(q, 'keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); go.click(); } });
    }
    /* 방문 인원 · 방문자 줄 */
    var cnt = f('visitNumber'), minus = cnt.previousElementSibling, plus = cnt.nextElementSibling;
    var list = form.querySelector('[name="memberList.0.name"]').closest('ul'), proto = list.firstElementChild.cloneNode(true);
    function rows() { return kids(list); }
    on(plus, 'click', function () {
      if (rows().length >= 10) { alert('최대 10명까지 추가할 수 있습니다.'); return; }
      var r = proto.cloneNode(true), n = rows().length;
      $$('input', r).forEach(function (x) { x.value = ''; x.name = x.name.replace(/\.\d+\./, '.' + n + '.'); on(x, 'input', check); });
      wireTel(r);
      list.appendChild(r);
      cnt.value = rows().length;
      check();
    });
    on(minus, 'click', function () {
      if (rows().length <= 1) { alert('최소값은 1명입니다.'); return; }
      list.lastElementChild.remove();
      cnt.value = rows().length;
      check();
    });
    function wireTel(r) { var t = r.querySelector('input[name$=".tel"]'); on(t, 'input', function () { t.value = t.value.replace(/\D/g, ''); }); }
    wireTel(list.firstElementChild);
    var mt = f('managerTel');
    on(mt, 'input', function () { mt.value = mt.value.replace(/\D/g, ''); });
    var boxes = $$('.' + "ant-checkbox-input", form);
    var pol = ['policy-privacy', 'policy-terms'];
    $$('.' + "ant-checkbox-label" + ' button', form).forEach(function (b, i) {
      on(b, 'click', function (e) { e.preventDefault(); e.stopPropagation(); openM(pol[i]); });
    });
    var btn = form.querySelector('button[type="submit"]');
    var NAME = /^[가-힣a-zA-Z\s]+$/, MAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    function check() {
      var ok = !!date && !!sel.ewValue && !!comp.value && f('managerName').value.trim() && mt.value && f('visitPurpose').value.trim() &&
        rows().every(function (r) {
          var nm = r.querySelector('input[name$=".name"]').value, em = r.querySelector('input[name$=".email"]').value, tl = r.querySelector('input[name$=".tel"]').value;
          return NAME.test(nm) && nm.length <= 50 && MAIL.test(em) && /^\d{8}$/.test(tl);
        }) && boxes.every(function (c) { return c.checked; });
      submitBtn(btn, !!ok, "ewcrsx-ntx-llwx ewbk-thmx-whtx ewtx-thmx-gryx3");
    }
    $$('input, textarea', form).forEach(function (x) { on(x, 'input', check); });
    boxes.forEach(function (c) { on(c, 'change', check); });
    on(form, 'submit', function (e) {
      e.preventDefault();
      if (btn.disabled) { alert('필수 항목을 모두 입력 후 예약하기를 눌러주세요.'); return; }
      alert('방문 예약이 신청되었습니다. 입주사 확인 후 알림톡으로 안내해 드립니다.');
      W.location.reload();
    });
    check();
    /* 조회 탭 */
    var p2 = paneOf('detail');
    if (p2) {
      var pk2 = p2.querySelector('.' + "ant-picker"), ins = $$('input', p2), nm = ins[ins.length - 2], tel = ins[ins.length - 1], b2 = $$('button', p2).pop(), d2 = '';
      picker(pk2, null, function (v) { d2 = v; chk2(); });
      on(tel, 'input', function () {
        var v = tel.value.replace(/^010-?/, '').replace(/\D/g, '').slice(0, 8);
        tel.value = '010-' + (v.length > 4 ? v.slice(0, 4) + '-' + v.slice(4) : v);
        swap(tel, v.length < 8, "ewbrdx-rdx-500", '');
        chk2();
      });
      on(nm, 'input', chk2);
      function chk2() { submitBtn(b2, !!(d2 && nm.value.trim() && /^010-\d{4}-\d{4}$/.test(tel.value)), "ewcrsx-ntx-llwx ewbk-thmx-whtx ewtx-thmx-gryx3"); }
      on(b2, 'click', function (e) { e.preventDefault(); if (!b2.disabled) alert('입력하신 정보와 일치하는 방문 예약이 없습니다.'); });
      chk2();
    }
  }

  /* ── 회원가입 — 원본: 아이디는 영소문자 · 숫자만 남기고 5~20자(아니면 빨간 안내), 확인 단추는 형식이 맞을 때만, 비밀번호 8~16자 두 종류 이상,
     전화 010- 뒤 8자리(인증 요청 → 5분 타이머 → 6자리 확인), 이메일 형식, 개인정보 동의. 취소는 입력을 비운다(이동 없음) ── */
  function join() {
    if (EW.page !== 'join') return;
    var sels = $$('.' + "ant-select", D).filter(function (s) { return !s.closest("#ewi-swtx"); });
    select(sels[0], function () { return TENANTS.map(function (t) { return t[0]; }); }, check);
    var ins = $$('input', D).filter(function (x) { return !x.closest('header') && !x.closest('[data-ew]') && !/checkbox|radio|search/.test(x.type); });
    var byPh = function (re) { return ins.filter(function (x) { return re.test(x.placeholder || ''); })[0]; };
    var name = byPh(/이름/), id = byPh(/최대 30자/), pw = ins.filter(function (x) { return x.type === 'password'; }), tel = byPh(/하이픈/), code = byPh(/인증번호/), mail = byPh(/이메일/);
    var btn = function (t) { return $$('button').filter(function (b) { return b.textContent.trim() === t; })[0]; };
    var bId = btn('아이디 확인'), bReq = btn('인증요청'), bOk = btn('확인'), bJoin = btn('회원가입'), bCancel = btn('취소');
    var consent = $$('.' + "ant-checkbox-input", D).filter(function (c) { return !c.closest('[data-ew]') && !c.closest('header'); })[0];
    var idChecked = false, step = 0, timer = null, left = 300;
    function msg(input, text, cls) {
      var box = input.closest('.' + "ant-input-affix-wrapper") || input;
      var p = box.parentNode.querySelector(':scope > p[data-ew="msg"]');
      if (!text) { if (p) p.remove(); return; }
      if (!p) { p = D.createElement('p'); p.setAttribute('data-ew', 'msg'); box.parentNode.appendChild(p); }
      p.className = cls || "ewtx-thmx-rdx ewtx-xsx ewmtx-1";
      p.textContent = text;
    }
    function red(input, on_) { swap(input.closest('.' + "ant-input-affix-wrapper") || input, on_, "ewbrdx-rdx-500", ''); }
    on(id, 'input', function () {
      var l = id.value.replace(/[^a-z0-9]/g, '');
      if (l !== id.value) id.value = l;
      idChecked = false;
      var e = l ? (/^[a-z0-9]{5,20}$/.test(l) ? '' : '아이디는 5~20자여야 합니다.') : '';
      msg(id, e, "ewmtx-1 ewtx-xsx ewtx-rdx-500");
      red(id, !!e);
      bId.disabled = !/^[a-z0-9]{5,20}$/.test(l);
      check();
    });
    bId.disabled = true;
    on(bId, 'click', function (e) { e.preventDefault(); alert('사용 가능한 아이디입니다.'); idChecked = true; bId.disabled = true; check(); });
    function pwOk(t) { t = t || ''; if (t.length < 8 || t.length > 16) return false; return [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/].filter(function (r) { return r.test(t); }).length >= 2; }
    pw.forEach(function (x) {
      on(x, 'input', function () {
        var v = x.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\|,.<>\/?]/g, '').slice(0, 16);
        if (v !== x.value) x.value = v;
        var a = pw[0].value;
        msg(pw[0], a && !pwOk(a) ? '비밀번호는 8~16자이며, 대/소문자/숫자/특수문자 중 최소 2가지 이상을 포함해야 합니다.' : '');
        red(pw[0], !!(a && !pwOk(a)));
        msg(pw[1], a.length >= 8 && pw[1].value !== a ? '입력된 비밀번호를 확인해 주세요.' : '');
        check();
      });
    });
    $$('.' + "ant-input-password-icon", D).forEach(function (eye) {
      var inp = eye.closest('.' + "ant-input-affix-wrapper").querySelector('input');
      if (eye.closest('[data-ew]')) return;
      on(eye, 'click', function () { var vis = inp.type === 'password'; inp.type = vis ? 'text' : 'password'; eye.src = IC + (vis ? 'eye-off.svg' : 'eye.svg'); });
    });
    function telOk(v) { var d = (v || '').replace(/\D/g, ''); return d.length >= 10 && d.charAt(0) === '0'; }
    on(tel, 'input', function () {
      var t = tel.value;
      if (t.indexOf('010-') !== 0) { tel.value = '010-'; }
      else {
        var l = t.substring(4).replace(/\D/g, '').slice(0, 8);
        tel.value = '010-' + (l.length >= 4 ? l.substring(0, 4) + '-' + l.substring(4) : l);
      }
      red(tel, tel.value && !telOk(tel.value));
      bReq.disabled = tel.value.length < 13 || !telOk(tel.value);
      step = 0;
      check();
    });
    bReq.disabled = true;
    var tspan = null;
    on(bReq, 'click', function (e) {
      e.preventDefault();
      alert('인증번호가 발송되었습니다.');
      step = 1;
      code.disabled = false;
      delc(code, "ant-input-disabled");
      left = 300;
      clearInterval(timer);
      if (!tspan) { tspan = D.createElement('span'); tspan.className = "ewbslx ewrt-22 ewtp-2 ewlgx-tp-2-5 ewtx-thmx-rdx ewtx-f12x2 ewlgx-tx-f14x"; code.parentNode.appendChild(tspan); }
      function show() { tspan.textContent = pad(Math.floor(left / 60)) + ':' + pad(left % 60); }
      show();
      timer = setInterval(function () {
        left--;
        show();
        if (left <= 0) { clearInterval(timer); step = 0; code.value = ''; code.disabled = true; addc(code, "ant-input-disabled"); tspan.remove(); tspan = null; check(); }
      }, 1000);
    });
    on(code, 'input', function () { code.value = code.value.slice(0, 6); bOk.disabled = !(code.value.length === 6 && step >= 1 && step !== 2); });
    bOk.disabled = true;
    on(bOk, 'click', function (e) {
      e.preventDefault();
      alert('인증이 완료되었습니다.');
      step = 2;
      bOk.disabled = true;
      clearInterval(timer);
      if (tspan) { tspan.remove(); tspan = null; }
      check();
    });
    on(mail, 'input', function () {
      var v = mail.value.replace(/[^가-힣a-zA-Z0-9@._\-]/g, '').replace(/\s/g, '');
      if (v !== mail.value) mail.value = v;
      var bad = v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      red(mail, !!bad);
      msg(mail, bad ? '올바른 이메일 형식을 입력해 주세요.' : '');
      check();
    });
    function check() {
      var ok = sels[0] && sels[0].ewValue && name.value.trim() && idChecked && pwOk(pw[0].value) && pw[0].value === pw[1].value && step === 2 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value);
      bJoin.disabled = !ok;
    }
    on(name, 'input', check);
    on(bJoin, 'click', function (e) {
      e.preventDefault();
      if (bJoin.disabled) return;
      if (consent && !consent.checked) { alert('개인정보 수집 이용에 동의해 주세요.'); return; }
      alert('회원가입 신청이 완료되었습니다. 입주사 관리자 승인 후 로그인하실 수 있습니다.');
      W.location.href = 'index.html';
    });
    on(bCancel, 'click', function (e) {
      e.preventDefault();
      [name, id, pw[0], pw[1], code, mail].forEach(function (x) { x.value = ''; msg(x, ''); red(x, false); });
      tel.value = '010-';
      red(tel, false);
      if (sels[0].ewReset) sels[0].ewReset();
      if (consent && consent.checked) consent.click();
      idChecked = false; step = 0; clearInterval(timer);
      if (tspan) { tspan.remove(); tspan = null; }
      code.disabled = true;
      check();
    });
    check();
  }

  function forms() {
    checks(D);
    faq();
    visitor();
    join();
  }


  /* ════════ Work(라이프인) Premium Office Life — 원본 framer-motion 값 그대로 GSAP 로.
     데스크톱: 카드 6장이 처음엔 가운데(x -250 · 기울기 -4~4) 숨어 있다가 화면에 들어오면(아래 -600px 여유, 한 번) 펼쳐진다
     (불투명 · y · 높이 0.6초, 기울기 0.3초 easeOut 0.6초 뒤, x 0.4초 easeIn 1.6초 뒤). 쪽을 연 지 3초 뒤부터 카드에 올리면
     0.1초 뒤 그 카드가 y -350 · 높이 700 으로 떠오르고, 줄 전체가 그 카드 번호만큼 왼쪽으로 민다(떠나도 민 자리는 남는다).
     모바일: 끌어서(50px 넘게) 앞뒤 카드로 — 가운데 카드 1배, 나머지 0.9배 · 아래로 10px ════════ */
  function workLife() {
    var row = $$(".ewscrx-hdx" + ".ewhx-600x")[0];
    if (row && W.gsap) {
      var g = W.gsap, cards = kids(row), tilt = [-4, -2, 0, 2, 4, -2, -4], SHIFT = [0, -77, -153, -230, -307, -383, -460];
      var ready = false, hov = -1, last = -1, tm = 0, shown = false;
      cards.forEach(function (c, t) {
        c.style.transform = '';
        g.set(c, { x: -250, y: 0, opacity: 0, rotation: tilt[t % tilt.length], zIndex: 10 * t, height: 600 });
      });
      g.set(row, { x: 0 });
      function lay() {
        cards.forEach(function (c, t) {
          var on_ = hov === t;
          g.to(c, { y: on_ ? -350 : -300, height: on_ ? 700 : 600, opacity: 1, duration: 0.6, ease: 'power1.out', overwrite: 'auto' });
          g.set(c, { zIndex: on_ ? 9999 : 10 * t });
        });
        g.to(row, { x: last >= 0 ? SHIFT[last] : 0, duration: 0.6, ease: 'power1.inOut' });
      }
      var io = new IntersectionObserver(function (es) {
        if (!es[0].isIntersecting || shown) return;
        shown = true;
        io.disconnect();
        cards.forEach(function (c, t) {
          g.to(c, { opacity: 1, y: -300, height: 600, duration: 0.6, ease: 'power1.out' });
          g.to(c, { rotation: 0, duration: 0.3, ease: 'power1.out', delay: 0.6 });
          g.to(c, { x: -860 + 280 * t, duration: 0.4, ease: 'power1.in', delay: 1.6 });
        });
      }, { rootMargin: '0px 0px -600px 0px' });
      io.observe(row);
      setTimeout(function () { ready = true; }, 3000);
      cards.forEach(function (c, t) {
        on(c, 'mouseenter', function () {
          if (!ready) return;
          clearTimeout(tm);
          tm = setTimeout(function () { last = t; hov = t; lay(); }, 100);
        });
        on(c, 'mouseleave', function () { clearTimeout(tm); hov = -1; lay(); });
      });
    }
    var deck = $$(".ewspcx-280-392" + ".ewcrsx-grbx")[0];
    if (deck) {
      var cs = kids(deck), l = 0, drag = false, o = 0, u = 0;
      function place() {
        cs.forEach(function (c, t) {
          var a = t - l, z = cs.length - Math.abs(a), n = 1, r = 0;
          if (a === 0) { n = 1; z = cs.length + 10; r = 0; } else { n = 0.9; r = 10; }
          c.style.transform = 'translateX(' + (130 * a + (drag ? (u - o) * 0.3 : 0)) + 'px) translateY(' + r + 'px) scale(' + n + ')';
          c.style.zIndex = z;
        });
      }
      function start(x) { drag = true; o = x; u = x; }
      function move(x) { if (drag) { u = x; place(); } }
      function end() {
        if (!drag) return;
        var e = o - u;
        if (Math.abs(e) > 50) { if (e > 0 && l < cs.length - 1) l++; else if (e < 0 && l > 0) l--; }
        drag = false; o = 0; u = 0;
        place();
      }
      on(deck, 'mousedown', function (e) { start(e.clientX); });
      on(deck, 'mousemove', function (e) { move(e.clientX); });
      on(deck, 'mouseup', end);
      on(deck, 'mouseleave', function () { if (drag) end(); });
      on(deck, 'touchstart', function (e) { start(e.touches[0].clientX); }, { passive: true });
      on(deck, 'touchmove', function (e) { move(e.touches[0].clientX); }, { passive: true });
      on(deck, 'touchend', end);
      cs.forEach(function (c) { on(c, 'click', function (e) { if (Math.abs(o - u) > 5) e.preventDefault(); }); on(c, 'dragstart', function (e) { e.preventDefault(); }); });
      place();
    }
  }

  /* ════════ 스토리 상세 위아래 무늬 띠 — 원본: 960px 이하면 칸 배경을 빼고(그림만) 배경 크기 100% 61px, 넘으면 배경 깔고 100% 86px ════════ */
  function storyBands() {
    if (!/^story-\d+$/.test(EW.page || '')) return;
    var bands = $$('div[style*="background-image"]').filter(function (d) { return /story-band/.test(d.style.backgroundImage); });
    if (!bands.length) return;
    var keep = bands.map(function (d) { return d.style.backgroundImage; });
    var mq = W.matchMedia('(max-width: 960px)');
    function apply() {
      bands.forEach(function (d, i) {
        d.style.backgroundImage = mq.matches ? '' : keep[i];
        d.style.backgroundSize = mq.matches ? '100% 61px' : '100% 86px';
      });
    }
    apply();
    if (mq.addEventListener) mq.addEventListener('change', apply);
  }


  /* ════════ 시작 ════════ */
  function init() {
    EW = W.EW || {};
    PATH = EW.path || '';
    var steps = [header, modals, footer, mainVisual, keyVisual, swipers, tabs, guestTabs, eventCards, whatsonFilter, lifestyleList, searchPage,
      copyLink, storeMap, neighborhood, workLife, storyBands, function () { clearable(D); }];
    if (typeof forms === 'function') steps.push(forms);
    steps.forEach(function (f) {
      try { f(); } catch (e) { (W.EW_ERR = W.EW_ERR || []).push((f.name || '?') + ': ' + e.message); if (W.console) console.error('[elmwood]', f.name, e); }
    });
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', init); else init();
})();
