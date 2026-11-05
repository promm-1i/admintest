// 제품 목록 쪽 동작 — 원본 스크립트가 없어 탭 · 검색 · 필터가 눌러도 그대로였다(2026-11-05)
// 탭 · 검색어 · 체크한 필터 글자로 카드(제품명 · 쓰임 · 설명)를 거르고, 걸러진 수를 '총 N개'에 적는다
(function () {
  var cards = [].slice.call(document.querySelectorAll('.product_card_item'));
  var no = document.querySelector('.hapd-ttlx-no');
  var tabs = [].slice.call(document.querySelectorAll('.hatb-it2'));
  var ips = [].slice.call(document.querySelectorAll('.hapd-ip')); // PC용 · 폰용 두 칸
  if (!cards.length || !no) return;
  var total = no.textContent;
  var SYN = { '쿡탑': ['쿡탑', '인덕션', '하이라이트'], '주방수전': ['수전'], '빌트인기기': ['빌트인', '식기세척', '오븐'],
    '비데일체형 / 비데': ['비데'], '레인샤워수전': ['샤워'], '주방가전': ['그라인더', '초퍼', '냉장고'],
    '공기청정가전': ['공기청정'], '생활가전': ['청소기', '휴지통'], '환기청정기': ['환기청정기'] };
  var text = function (c) { return c.textContent.replace(/\s+/g, ' '); };
  var words = function (label) { return SYN[label] || label.split(/[\/()]/).map(function (w) { return w.trim(); }).filter(Boolean); };
  var hit = function (c, label) { var t = text(c); return words(label).some(function (w) { return t.indexOf(w) >= 0; }); };
  var tab = 0, checked = [];
  var empty = document.createElement('p');
  empty.className = 'hapd-empty';
  empty.textContent = '조건에 맞는 상품이 없습니다.';
  empty.style.cssText = 'display:none;grid-column:1/-1;padding:80px 0;text-align:center;color:#888;';
  cards[0].parentNode.appendChild(empty);

  function apply() {
    var named = tabs.map(function (t) { return t.textContent.trim(); });
    var q = ips.map(function (v) { return v.value.trim(); }).filter(Boolean)[0] || '';
    var n = 0;
    cards.forEach(function (c) {
      var ok = true;
      if (tab > 0) {
        var lb = named[tab];
        ok = /^기타/.test(lb) ? !named.slice(1).some(function (o) { return !/^기타/.test(o) && hit(c, o); }) : hit(c, lb);
      }
      if (ok && q) ok = text(c).indexOf(q) >= 0;
      if (ok && checked.length) ok = checked.some(function (lb) { return hit(c, lb); });
      c.style.display = ok ? '' : 'none';
      if (ok) n++;
    });
    empty.style.display = n ? 'none' : '';
    no.textContent = (tab === 0 && !q && !checked.length) ? total : n + '개';
  }

  tabs.forEach(function (t, i) {
    t.style.cursor = 'pointer';
    t.addEventListener('click', function () {
      tabs.forEach(function (o) { o.classList.remove('on'); });
      t.classList.add('on'); tab = i; apply();
    });
  });
  ips.forEach(function (v) {
    v.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); apply(); } });
  });
  document.querySelectorAll('.hapd-ip-bt').forEach(function (sb) { sb.addEventListener('click', apply); });

  // 옆 필터: 묶음 머리를 누르면 펼치고, 체크하면 바로 거른다
  document.querySelectorAll('.habt-fltx-grpx').forEach(function (b) {
    b.addEventListener('click', function () { b.parentNode.classList.toggle('haisx-pnx'); });
  });
  function readChecks(root) {
    checked = [].slice.call(root.querySelectorAll('.hadtlx-fltx-chcx:checked')).map(function (x) {
      return x.parentNode.querySelector('.hadtlx-fltx-tx').textContent.trim();
    });
  }
  var side = document.querySelector('.hapd-fltx-ar');
  if (side) side.addEventListener('change', function () { readChecks(side); apply(); });

  // 폰 필터 창: 필터 단추로 열고, 닫기 · 바깥 · 검색하기로 닫는다
  var pan = document.querySelector('.happ-fltx');
  if (pan) {
    var close = function () { pan.classList.remove('haisx-pnx'); };
    var ob = document.querySelector('.hafltx-bt');
    if (ob) ob.addEventListener('click', function () { pan.classList.add('haisx-pnx'); });
    pan.querySelectorAll('.happ-fltx-bt-cls, .happ-fltx-dmx').forEach(function (x) { x.addEventListener('click', close); });
    var go = pan.querySelector('.happ-fltx-sbmx-bt');
    if (go) go.addEventListener('click', function () { readChecks(pan); apply(); close(); });
    var rs = pan.querySelector('.happ-fltx-rstx-bt');
    if (rs) rs.addEventListener('click', function () {
      pan.querySelectorAll('.hadtlx-fltx-chcx').forEach(function (x) { x.checked = false; });
      checked = []; apply();
    });
  }
})();
