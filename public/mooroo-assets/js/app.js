/* mooroo 프로토타입 — 해시 라우터 + 화면 그리기. 장바구니·문의·주문은 이 브라우저(localStorage)에만 저장된다. */
(function () {
  var M = window.MOO;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var view = $('#view');
  var BASE = window.MOO_BASE || '';

  /* ---------- 공용 ---------- */
  var won = function (n) { return n.toLocaleString('ko-KR') + '원'; };
  var P = function (id) { return M.products.filter(function (p) { return p.id === id; })[0]; };
  var cat = function (id) { return M.cats.filter(function (c) { return c.id === id; })[0]; };
  var priceOf = function (p) { return p.sale || p.price; };
  var pct = function (p) { return p.sale ? Math.round((1 - p.sale / p.price) * 100) : 0; };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var days = function (a, b) { return Math.round((new Date(b) - new Date(a)) / 864e5); };
  var isNew = function (p) { return days(p.date, M.today) <= 14; };
  var md = function (d) { return d.slice(5).replace('-', '.'); };
  var bySales = function () { return M.products.slice().sort(function (a, b) { return b.sales - a.sales; }); };
  var img = function (id) { return BASE + 'img/' + id + '.jpg'; };

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem('moo_' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem('moo_' + k, JSON.stringify(v)); } catch (e) { } }
  };
  var S = {
    cart: store.get('cart', []),
    qna: store.get('qna', []),
    orders: store.get('orders', []),
    patch: store.get('patch', {}),
    member: store.get('member', null) || JSON.parse(JSON.stringify(M.member)),
    login: store.get('login', false),
    points: store.get('points', M.points.balance),
    usedCoupons: store.get('usedCoupons', []),
    unlocked: {}
  };
  var save = function () {
    store.set('cart', S.cart); store.set('qna', S.qna); store.set('orders', S.orders); store.set('patch', S.patch);
    store.set('member', S.member); store.set('login', S.login); store.set('points', S.points); store.set('usedCoupons', S.usedCoupons);
    badge();
  };

  function toast(html) {
    var t = $('#toast');
    t.innerHTML = html;
    t.classList.add('on');
    clearTimeout(toast.t);
    toast.t = setTimeout(function () { t.classList.remove('on'); }, 2800);
  }

  function modal(title, body) {
    var m = $('#modal');
    m.innerHTML = '<div class="win modal" role="dialog" aria-modal="true" aria-label="' + esc(title) + '">' +
      '<div class="titlebar"><span class="px tb-ico" data-icon="app"></span><b class="tb-name">' + esc(title) + '</b>' +
      '<div class="tb-btns"><button type="button" class="tbb" data-act="close" aria-label="닫기">×</button></div></div>' +
      '<div class="mb">' + body + '</div></div>';
    m.hidden = false;
    MOOICON.hydrate(m);
    var f = $('input, select, textarea, button.btn', m);
    if (f) f.focus();
  }
  function closeModal() { var m = $('#modal'); m.hidden = true; m.innerHTML = ''; }

  function badge() {
    var n = S.cart.reduce(function (a, c) { return a + c.qty; }, 0);
    var b = $('#cartBadge');
    b.textContent = n; b.hidden = !n;
  }

  var panel = function (title, body, o) {
    o = o || {};
    return '<section class="panel ' + (o.cls || '') + '">' +
      '<div class="panel-bar"><span>' + title + '</span><span class="pb-right">' + (o.right || '&gt;&gt; <a href="#/" aria-label="홈으로">×</a>') + '</span></div>' +
      '<div class="panel-body">' + body + '</div></section>';
  };

  var priceHtml = function (p) {
    return p.sale
      ? '<span class="price"><s>' + won(p.price) + '</s><b class="pct">' + pct(p) + '%</b><b>' + won(p.sale) + '</b></span>'
      : '<span class="price"><b>' + won(p.price) + '</b></span>';
  };

  function card(p, o) {
    o = o || {};
    return '<a class="pcard" href="#/p/' + p.id + '">' +
      '<span class="pc-bar"><span>' + p.en + '</span><i aria-hidden="true">×</i></span>' +
      '<span class="pc-img"><img src="' + img(p.id) + '" alt="' + esc(p.name) + '" loading="lazy">' +
      (o.rank ? '<b class="rank">' + o.rank + '</b>' : '') +
      (p.sale ? '<b class="badge sale">-' + pct(p) + '%</b>' : '') +
      (!o.rank && isNew(p) ? '<b class="badge new">NEW</b>' : '') + '</span>' +
      '<span class="pc-info"><span class="pc-name">' + esc(p.name) + '</span>' + priceHtml(p) +
      (o.date ? '<span class="pc-date">' + md(p.date) + ' 입고</span>' : '') +
      (o.sales ? '<span class="pc-date">최근 30일 ' + p.sales + '개 판매</span>' : '') + '</span></a>';
  }
  var grid = function (list, o) {
    return list.length ? '<div class="pgrid">' + list.map(function (p, i) { return card(p, { rank: o && o.rank ? i + 1 : 0, date: o && o.date, sales: o && o.sales }); }).join('') + '</div>'
      : '<p class="empty">아직 등록된 상품이 없어요.</p>';
  };

  /* ---------- HOME ---------- */
  var tilt = [-5, 3, -2, 4, -3];
  function home() {
    var cards = M.cats.map(function (c, i) {
      var p = P(M.catCover[c.id]);
      return '<a class="cw" href="#/c/' + c.id + '" style="--r:' + tilt[i] + 'deg">' +
        '<span class="cw-title"><i class="cw-x" aria-hidden="true">×</i></span>' +
        '<span class="cw-img"><img src="' + img(p.id) + '" alt="' + c.ko + ' — ' + esc(p.name) + '"></span>' +
        '<span class="cw-label">' + c.name + '<i class="cw-arrow" aria-hidden="true">↘</i></span></a>';
    }).join('');
    var looks = M.coordi.map(function (c, i) { return '<img src="' + BASE + c.img + '" alt="" class="' + (i ? '' : 'on') + '">'; }).join('');
    return panel('SELECT YOUR ITEM',
      '<i class="spark deco-l" aria-hidden="true"></i><i class="spark deco-l2" aria-hidden="true"></i>' +
      '<div class="cw-row">' + cards + '</div>' +
      '<svg class="deco-orbit" viewBox="0 0 80 50" aria-hidden="true"><path d="M6 40 C 30 52, 70 34, 74 12 C 76 2, 62 2, 50 8" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4"/><path d="M66 22 l2.4 5 5.4.8 -3.9 3.8 .9 5.4 -4.8-2.6 -4.8 2.6 .9-5.4 -3.9-3.8 5.4-.8z" fill="currentColor"/></svg>' +
      '<span class="px deco-cursor" data-icon="cursor" aria-hidden="true"></span>',
      { cls: 'select', right: '&gt;&gt;<span aria-hidden="true">×</span>' }) +
      '<div class="info-strip">' +
      '<span class="px is-floppy" data-icon="floppy" aria-hidden="true"></span>' +
      '<a class="is-text" href="#/new">NEW DROP — 10.19 나일론 파라슈트 팬츠 입고<br>신상은 매주 금요일에 올라와요</a>' +
      '<a class="is-folder" href="#/coordi"><span class="px" data-icon="folder" aria-hidden="true"></span><span>LIVE<br>YOUR<br>MOOROO</span><b>&gt;&gt;</b></a>' +
      '<div class="is-player" id="player">' +
      '<button type="button" class="ip-play" data-act="play" aria-label="코디 슬라이드 재생">▶</button>' +
      '<a class="ip-screen" href="#/coordi" aria-label="인스타 코디 보기">' + looks + '</a>' +
      '<span class="ip-meta"><span class="ip-title" id="ipTitle">LOOKBOOK · LOOK 01</span><span class="ip-bar"><i id="ipBar"></i></span></span>' +
      '<a class="ip-x" href="#/coordi" aria-label="코디 목록">×</a></div>' +
      '</div>';
  }

  /* 코디 슬라이드 (홈 플레이어) */
  var player = { on: false, i: 0, t: null };
  function playerStep() {
    var imgs = $$('#player .ip-screen img');
    if (!imgs.length) { stopPlayer(); return; }
    player.i = (player.i + 1) % imgs.length;
    imgs.forEach(function (im, k) { im.classList.toggle('on', k === player.i); });
    $('#ipTitle').textContent = 'LOOKBOOK · ' + M.coordi[player.i].title;
    $('#ipBar').style.width = ((player.i + 1) / imgs.length * 100) + '%';
  }
  function stopPlayer() { player.on = false; clearInterval(player.t); var b = $('#player .ip-play'); if (b) { b.textContent = '▶'; b.setAttribute('aria-label', '코디 슬라이드 재생'); } }

  /* ---------- 목록 ---------- */
  function catTabs(active) {
    return '<nav class="tabs" aria-label="카테고리">' + M.cats.map(function (c) {
      return '<a class="tab' + (c.id === active ? ' on' : '') + '" href="#/c/' + c.id + '">' + c.name + '</a>';
    }).join('') + '</nav>';
  }
  var SORTS = [['new', '신상품순'], ['best', '인기순'], ['low', '낮은 가격순'], ['high', '높은 가격순']];
  function sortList(list, s) {
    var l = list.slice();
    if (s === 'best') l.sort(function (a, b) { return b.sales - a.sales; });
    else if (s === 'low') l.sort(function (a, b) { return priceOf(a) - priceOf(b); });
    else if (s === 'high') l.sort(function (a, b) { return priceOf(b) - priceOf(a); });
    else l.sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    return l;
  }
  function listCat(id, q) {
    var c = cat(id);
    if (!c) return notFound();
    var s = q.s || 'new';
    var list = sortList(M.products.filter(function (p) { return p.cat === id; }), s);
    var sel = '<label class="sort"><span class="sr">정렬</span><select class="sel" data-act="sort" data-base="#/c/' + id + '">' +
      SORTS.map(function (o) { return '<option value="' + o[0] + '"' + (o[0] === s ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select></label>';
    return panel(c.name + ' — ' + c.ko + ' ' + list.length + '개',
      '<div class="toolbar">' + catTabs(id) + sel + '</div>' + grid(list));
  }
  function listNew() {
    var list = M.products.filter(function (p) { return days(p.date, M.today) <= 30; })
      .sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    return panel('NEW — 최근 30일 입고 ' + list.length + '개',
      '<p class="note">등록일이 최근인 상품부터 보여 줍니다. 상품을 등록하면 자동으로 맨 앞에 붙어요.</p>' + grid(list, { date: true }));
  }
  function listSale() {
    var list = M.products.filter(function (p) { return p.sale; }).sort(function (a, b) { return pct(b) - pct(a); });
    return panel('SALE — 할인 중 ' + list.length + '개',
      '<p class="note">할인가를 넣은 상품만 모입니다. 정상가 · 할인가 · 할인율이 같이 표시돼요.</p>' + grid(list));
  }
  function listBest() {
    var list = bySales().slice(0, 12);
    return panel('BEST — 인기 상품 TOP ' + list.length,
      '<p class="note">최근 30일 판매량 순으로 자동 정렬됩니다. 관리자가 특정 상품을 맨 앞에 고정할 수도 있어요. (지금 숫자는 예시)</p>' +
      grid(list, { rank: true, sales: true }));
  }

  /* ---------- 상품 상세 ---------- */
  var pd = null;
  function product(id) {
    var p = P(id);
    if (!p) return notFound();
    pd = { id: id, color: p.colors.length === 1 ? p.colors[0] : null, size: p.sizes.length === 1 ? p.sizes[0] : null, qty: 1, tab: 'info' };
    var c = cat(p.cat);
    var chips = function (key, arr) {
      return '<div class="chips" role="group">' + arr.map(function (v) {
        return '<button type="button" class="chip' + (pd[key] === v ? ' on' : '') + '" data-act="opt" data-k="' + key + '" data-v="' + esc(v) + '" aria-pressed="' + (pd[key] === v) + '">' + esc(v) + '</button>';
      }).join('') + '</div>';
    };
    var qn = allQna().filter(function (q) { return q.product === id; });
    var body =
      '<div class="pd">' +
      '<div class="pd-img"><img src="' + img(p.id) + '" alt="' + esc(p.name) + '">' + (p.sale ? '<b class="badge sale">-' + pct(p) + '%</b>' : '') + '</div>' +
      '<div class="pd-main">' +
      '<p class="crumb"><a href="#/">HOME</a> › <a href="#/c/' + c.id + '">' + c.name + '</a></p>' +
      '<h1>' + esc(p.name) + '</h1><p class="pd-en">' + p.en + '</p>' +
      '<div class="pd-price">' + (p.sale
        ? '<span class="pp-was">정상가 <s>' + won(p.price) + '</s></span><span class="pp-now"><b class="pct">' + pct(p) + '%</b> ' + won(p.sale) + '</span>'
        : '<span class="pp-now">' + won(p.price) + '</span>') + '</div>' +
      '<div class="optrow"><span>색상</span>' + chips('color', p.colors) + '</div>' +
      '<div class="optrow"><span>사이즈</span>' + chips('size', p.sizes) + '</div>' +
      '<div class="optrow"><span>수량</span><div class="stepper"><button type="button" data-act="pdqty" data-d="-1" aria-label="수량 줄이기">−</button><span id="pdQty">1</span><button type="button" data-act="pdqty" data-d="1" aria-label="수량 늘리기">+</button></div></div>' +
      '<div class="pd-total"><span>총 상품금액</span><b id="pdTotal">' + won(priceOf(p)) + '</b></div>' +
      '<div class="btns"><button type="button" class="btn wide" data-act="addcart">장바구니 담기</button><button type="button" class="btn pri wide" data-act="buynow">바로 구매</button></div>' +
      '<ul class="pd-info"><li>배송비 ' + won(M.shipFee) + ' · ' + won(M.freeShipOver) + ' 이상 무료배송</li><li>구매 확정 시 결제금액의 1% 적립</li><li>교환 · 반품은 받은 날부터 7일 안에 마이페이지에서 신청</li></ul>' +
      '</div></div>' +
      '<div class="ptabs"><nav class="tabs" role="tablist">' +
      [['info', '상세정보'], ['size', '사이즈'], ['ship', '배송 · 교환'], ['qna', '상품문의 (' + qn.length + ')']].map(function (t, i) {
        return '<button type="button" class="tab' + (i ? '' : ' on') + '" role="tab" data-act="ptab" data-t="' + t[0] + '" aria-selected="' + !i + '">' + t[1] + '</button>';
      }).join('') + '</nav><div class="ptab-body" id="ptabBody">' + ptab(p, 'info') + '</div></div>';
    return panel(c.name + ' › ' + p.en, body);
  }
  function ptab(p, t) {
    if (t === 'size') {
      if (p.sizes[0] === 'FREE') return '<p>FREE 사이즈 한 가지입니다. 상세 치수는 실제 상품 등록 때 넣습니다.</p>';
      return '<table class="size"><thead><tr><th>사이즈</th><th>총장</th><th>어깨</th><th>가슴</th></tr></thead><tbody>' +
        p.sizes.map(function (s, i) { return '<tr><td>' + s + '</td><td>' + (66 + i * 2) + '</td><td>' + (48 + i * 2) + '</td><td>' + (54 + i * 3) + '</td></tr>'; }).join('') +
        '</tbody></table><p class="note">단위 cm · 재는 방법에 따라 1~2cm 차이가 날 수 있어요. (예시 치수)</p>';
    }
    if (t === 'ship') return '<p>오후 2시 전 결제하면 그날 출고됩니다. CJ대한통운으로 보내고, 보통 1~2일 걸려요.</p><p>교환 · 반품은 받은 날부터 7일 안에 마이페이지 › 주문내역에서 신청할 수 있어요. 단순 변심 반품은 왕복 배송비 6,000원이 들어요.</p><p class="note">(예시 문구 — 실제 규정으로 바꿉니다)</p>';
    if (t === 'qna') {
      var qn = allQna().filter(function (q) { return q.product === p.id; });
      return (qn.length ? qTable(qn, true) : '<p class="empty">아직 문의가 없어요.</p>') +
        '<div class="btns end"><a class="btn pri" href="#/qna/write?p=' + p.id + '">이 상품 문의하기</a></div>';
    }
    return '<p>' + esc(p.desc) + '</p><p><b>소재</b> ' + esc(p.fabric) + '</p><p class="note">실제 쇼핑몰에선 이 자리에 상세 사진과 설명이 길게 들어갑니다.</p>';
  }
  function pdUpdate() {
    var p = P(pd.id);
    $('#pdQty').textContent = pd.qty;
    $('#pdTotal').textContent = won(priceOf(p) * pd.qty);
  }

  /* ---------- 장바구니 ---------- */
  var key = function (c) { return c.id + '|' + c.color + '|' + c.size; };
  function addCart(item) {
    var k = key(item);
    var ex = S.cart.filter(function (c) { return key(c) === k; })[0];
    if (ex) ex.qty = Math.min(99, ex.qty + item.qty); else S.cart.push(item);
    save();
  }
  var subtotal = function (items) { return items.reduce(function (a, c) { return a + priceOf(P(c.id)) * c.qty; }, 0); };
  var shipOf = function (sub) { return sub === 0 || sub >= M.freeShipOver ? 0 : M.shipFee; };

  function cartView() {
    if (!S.cart.length) return panel('CART — 장바구니', '<div class="empty"><span class="px empty-ico" data-icon="cart"></span><p>장바구니가 비어 있어요.</p><a class="btn pri" href="#/new">신상품 보러 가기</a></div>');
    var sub = subtotal(S.cart), ship = shipOf(sub);
    var rows = S.cart.map(function (c) {
      var p = P(c.id), k = esc(key(c));
      return '<div class="crow"><a href="#/p/' + p.id + '"><img src="' + img(p.id) + '" alt=""></a>' +
        '<div class="cr-info"><a class="cr-name" href="#/p/' + p.id + '">' + esc(p.name) + '</a><span class="cr-opt">색상 ' + esc(c.color) + ' / 사이즈 ' + esc(c.size) + '</span>' + priceHtml(p) + '</div>' +
        '<div class="stepper"><button type="button" data-act="qty" data-k="' + k + '" data-d="-1" aria-label="수량 줄이기">−</button><span>' + c.qty + '</span><button type="button" data-act="qty" data-k="' + k + '" data-d="1" aria-label="수량 늘리기">+</button></div>' +
        '<b class="cr-line">' + won(priceOf(p) * c.qty) + '</b>' +
        '<button type="button" class="x-btn" data-act="del" data-k="' + k + '" aria-label="' + esc(p.name) + ' 삭제">×</button></div>';
    }).join('');
    var left = sub < M.freeShipOver ? '<p class="note">' + won(M.freeShipOver - sub) + ' 더 담으면 무료배송이에요.</p>' : '<p class="note">무료배송 적용됐어요.</p>';
    return panel('CART — 장바구니 ' + S.cart.length + '개',
      '<div class="cart-layout"><div class="clist">' + rows + '<div class="btns"><button type="button" class="btn sm" data-act="clear">전체 삭제</button><a class="btn sm" href="#/">쇼핑 계속하기</a></div></div>' +
      '<aside class="sum"><div class="sum-row"><span>상품금액</span><span>' + won(sub) + '</span></div><div class="sum-row"><span>배송비</span><span>' + (ship ? won(ship) : '무료') + '</span></div>' +
      '<div class="sum-row sum-total"><span>결제예정금액</span><b>' + won(sub + ship) + '</b></div>' + left +
      '<button type="button" class="btn pri" data-act="tocheckout">주문하기</button></aside></div>');
  }

  /* ---------- 주문서 ---------- */
  var checkoutItems = null;
  function checkout() {
    var items = checkoutItems || S.cart;
    if (!items.length) { location.hash = '#/cart'; return ''; }
    var sub = subtotal(items), ship = shipOf(sub), m = S.login ? S.member : {};
    var coupons = S.login ? M.coupons.filter(function (c) { return S.usedCoupons.indexOf(c.name) < 0; }) : [];
    var list = items.map(function (c) {
      var p = P(c.id);
      return '<div class="oitem"><img src="' + img(p.id) + '" alt=""><span>' + esc(p.name) + '<br><small>' + esc(c.color) + ' / ' + esc(c.size) + ' · ' + c.qty + '개</small></span><b>' + won(priceOf(p) * c.qty) + '</b></div>';
    }).join('');
    var f = function (label, name, val, ph, type) {
      return '<label class="field"><span>' + label + '</span><input name="' + name + '" type="' + (type || 'text') + '" value="' + esc(val || '') + '" placeholder="' + (ph || '') + '" required></label>';
    };
    return panel('ORDER — 주문서',
      '<form class="co" id="coForm" novalidate><div class="co-main">' +
      '<h2 class="h2">주문 상품</h2><div class="olist">' + list + '</div>' +
      (S.login ? '' : '<p class="note box">비회원으로 주문 중이에요. 주문 뒤 받는 주문번호로 마이페이지에서 조회할 수 있어요. <a href="#/mypage">로그인</a></p>') +
      '<h2 class="h2">받는 사람</h2><div class="form two">' +
      f('이름', 'name', m.name, '받는 분 이름') + f('휴대폰', 'phone', m.phone, '010-0000-0000', 'tel') +
      f('주소', 'addr', m.addr ? m.addr + ' ' + (m.addr2 || '') : '', '도로명 주소') +
      '<label class="field"><span>배송 메모</span><select name="memo"><option>문 앞에 놔 주세요</option><option>경비실에 맡겨 주세요</option><option>배송 전에 연락 주세요</option></select></label></div>' +
      (S.login ? '<h2 class="h2">할인</h2><div class="form two"><label class="field"><span>쿠폰</span><select name="coupon" data-act="recalc"><option value="">쿠폰 선택 안 함</option>' +
        coupons.map(function (c) { return '<option value="' + esc(c.name) + '">' + esc(c.name) + '</option>'; }).join('') + '</select></label>' +
        '<label class="field"><span>적립금 (보유 ' + won(S.points) + ')</span><input name="pts" type="number" min="0" step="100" max="' + S.points + '" value="0" data-act="recalc"></label></div>' : '') +
      '<h2 class="h2">결제 수단</h2><div class="radios" role="radiogroup">' +
      ['신용카드', '계좌이체', '카카오페이', '네이버페이'].map(function (v, i) { return '<label><input type="radio" name="pay" value="' + v + '"' + (i ? '' : ' checked') + '> ' + v + '</label>'; }).join('') + '</div>' +
      '<label class="check"><input type="checkbox" name="agree" required> 주문 내용을 확인했고 결제에 동의합니다.</label>' +
      '</div><aside class="sum" id="coSum"></aside></form>');
  }
  function coCalc() {
    var form = $('#coForm');
    if (!form) return null;
    var items = checkoutItems || S.cart;
    var sub = subtotal(items), ship = shipOf(sub), disc = 0, pts = 0;
    var cname = form.coupon ? form.coupon.value : '';
    var cp = M.coupons.filter(function (c) { return c.name === cname; })[0];
    if (cp && cp.ship) ship = 0;
    if (cp && cp.rate) disc = sub >= cp.min ? Math.min(cp.max, Math.floor(sub * cp.rate / 100 / 10) * 10) : 0;
    if (form.pts) pts = Math.max(0, Math.min(S.points, parseInt(form.pts.value || '0', 10) || 0, sub - disc));
    var total = sub + ship - disc - pts;
    $('#coSum').innerHTML = '<div class="sum-row"><span>상품금액</span><span>' + won(sub) + '</span></div>' +
      '<div class="sum-row"><span>배송비</span><span>' + (ship ? won(ship) : '무료') + '</span></div>' +
      (disc ? '<div class="sum-row"><span>쿠폰 할인</span><span>−' + won(disc) + '</span></div>' : '') +
      (cp && cp.rate && !disc ? '<p class="note">이 쿠폰은 ' + won(cp.min) + ' 이상 살 때 쓸 수 있어요.</p>' : '') +
      (pts ? '<div class="sum-row"><span>적립금</span><span>−' + won(pts) + '</span></div>' : '') +
      '<div class="sum-row sum-total"><span>최종 결제금액</span><b>' + won(total) + '</b></div>' +
      '<button type="submit" class="btn pri">' + won(total) + ' 결제하기</button>';
    return { sub: sub, ship: ship, disc: disc, pts: pts, total: total, coupon: cp && (cp.rate ? disc : true) ? cp.name : '' };
  }
  function placeOrder(form) {
    var c = coCalc();
    var items = (checkoutItems || S.cart).map(function (x) { return { id: x.id, color: x.color, size: x.size, qty: x.qty }; });
    var no = 'MR' + M.today.slice(2).replace(/-/g, '') + String(Date.now()).slice(-4);
    S.orders.unshift({ no: no, date: M.today, status: '결제완료', items: items, ship: c.ship, disc: c.disc, pts: c.pts, total: c.total, pay: form.pay.value, guest: !S.login, name: form.name.value, phone: form.phone.value, addr: form.addr.value });
    if (c.pts) S.points -= c.pts;
    if (c.coupon) S.usedCoupons.push(c.coupon);
    if (!checkoutItems) S.cart = [];
    checkoutItems = null;
    save();
    closeModal();
    location.hash = '#/order/' + no;
  }
  function orderDone(no) {
    var o = allOrders().filter(function (x) { return x.no === no; })[0];
    if (!o) return notFound();
    return panel('ORDER COMPLETE',
      '<div class="done"><span class="px done-ico" data-icon="best"></span><h2 class="h2">주문이 접수됐어요</h2>' +
      '<p>주문번호 <b class="mono">' + o.no + '</b></p><p class="note">' + (o.guest ? '비회원 주문은 이 번호로 마이페이지에서 조회할 수 있어요.' : '마이페이지 › 주문내역에서 배송 상태를 볼 수 있어요.') + '</p>' +
      '<div class="olist">' + oItems(o) + '</div><p class="done-total">결제금액 <b>' + won(orderTotal(o)) + '</b> · ' + esc(o.pay) + '</p>' +
      '<div class="btns center"><a class="btn pri" href="#/mypage/orders">주문내역 보기</a><a class="btn" href="#/">쇼핑 계속하기</a></div></div>');
  }

  /* ---------- 코디 ---------- */
  function coordiList() {
    return panel('INSTAGRAM COORDI — 코디 ' + M.coordi.length + '개',
      '<p class="note">인스타그램에 올린 코디를 모아 둔 곳이에요. 사진을 누르면 코디에 쓰인 상품이 나와요. 관리자 화면에서 사진 올리고 상품만 고르면 계속 추가됩니다.</p>' +
      '<div class="cgrid">' + M.coordi.map(function (c, i) {
        return '<a class="polaroid" href="#/coordi/' + c.id + '" style="--r:' + [-2, 2, -1, 3][i % 4] + 'deg"><span class="pol-img"><img src="' + BASE + c.img + '" alt="' + c.title + ' 코디" loading="lazy"></span>' +
          '<span class="pol-cap"><b>' + c.title + '</b><span>' + md(c.date) + ' · 상품 ' + c.items.length + '개</span></span></a>';
      }).join('') + '</div>');
  }
  function coordiView(id) {
    var c = M.coordi.filter(function (x) { return x.id === id; })[0];
    if (!c) return notFound();
    return panel('INSTAGRAM COORDI › ' + c.title,
      '<div class="cv"><div class="cv-img"><img src="' + BASE + c.img + '" alt="' + c.title + ' 코디 사진"></div>' +
      '<div class="cv-side"><p class="cv-handle"><span class="px" data-icon="coordi" aria-hidden="true"></span> @mooroo.official · ' + md(c.date) + '</p>' +
      '<p class="cv-cap">' + esc(c.caption) + '</p><h2 class="h2">이 코디에 쓰인 상품</h2><div class="olist">' +
      c.items.map(function (pid) { var p = P(pid); return '<a class="oitem link" href="#/p/' + p.id + '"><img src="' + img(p.id) + '" alt=""><span>' + esc(p.name) + '<br>' + priceHtml(p) + '</span><b>›</b></a>'; }).join('') +
      '</div><div class="btns"><a class="btn" href="#/coordi">코디 목록</a><button type="button" class="btn pri" data-act="lookcart" data-id="' + c.id + '">코디 전체 담기</button></div></div></div>');
  }

  /* ---------- ABOUT ---------- */
  function about() {
    return panel('ABOUT US — mooroo',
      '<div class="about">' +
      '<div class="win ab-win ab-readme"><div class="titlebar"><span class="px tb-ico" data-icon="app"></span><b class="tb-name">README.txt</b></div>' +
      '<div class="ab-body"><p class="ab-big">wear your own universe</p>' +
      '<p>mooroo는 2000년대 컴퓨터 화면을 좋아하는 사람들이 만든 옷 가게예요. 은색 단추, 별 자수, 바랜 프린트처럼 그 시절 물건에서 본 디테일을 지금 입기 편한 옷에 옮깁니다.</p>' +
      '<p>옷은 매주 금요일에 조금씩 올리고, 같은 디자인을 다시 찍지 않는 게 원칙이에요.</p><p class="note">(예시 문구 — 브랜드 소개 글을 받으면 바꿉니다)</p></div></div>' +
      '<div class="win ab-win ab-photo"><div class="titlebar"><span class="px tb-ico" data-icon="coordi"></span><b class="tb-name">studio.jpg</b></div><img src="' + BASE + 'img/p25.jpg" alt="mooroo 작업실"></div>' +
      '<div class="win ab-win ab-list"><div class="titlebar"><span class="px tb-ico" data-icon="folder"></span><b class="tb-name">DESIGN.ini</b></div>' +
      '<div class="ab-body"><dl><dt>[color]</dt><dd>하늘색 · 네이비 · 은색 · 차콜</dd><dt>[detail]</dt><dd>별 · 십자가 · 버클 · 체인</dd><dt>[fit]</dt><dd>상의는 넉넉하게, 하의는 와이드</dd><dt>[drop]</dt><dd>매주 금요일 · 소량</dd></dl></div></div>' +
      '<div class="win ab-win ab-photo2"><div class="titlebar"><span class="px tb-ico" data-icon="coordi"></span><b class="tb-name">making.jpg</b></div><img src="' + BASE + 'img/p26.jpg" alt="옷을 개는 손"></div>' +
      '</div>');
  }

  /* ---------- Q&A ---------- */
  function allQna() { return S.qna.concat(M.qna); }
  function qTable(list, compact) {
    return '<table class="qtable"><thead><tr>' + (compact ? '' : '<th class="hide-m">분류</th>') + '<th>제목</th><th class="hide-m">작성자</th><th class="hide-m">날짜</th><th>답변</th></tr></thead><tbody>' +
      list.map(function (q) {
        return '<tr>' + (compact ? '' : '<td class="hide-m">' + esc(q.type) + '</td>') +
          '<td><a href="#/qna/' + q.id + '">' + (q.secret ? '<span class="lock" aria-label="비밀글">🔒</span> ' : '') + esc(q.title) + '</a>' +
          '<span class="q-sub">' + esc(q.author) + ' · ' + md(q.date) + '</span></td>' +
          '<td class="hide-m">' + esc(q.author) + '</td><td class="hide-m">' + md(q.date) + '</td>' +
          '<td><span class="st ' + (q.answer ? 'done' : 'wait') + '">' + (q.answer ? '답변완료' : '답변대기') + '</span></td></tr>';
      }).join('') + '</tbody></table>';
  }
  function qnaList(q) {
    var types = ['전체', '상품', '배송', '교환·반품', '기타'];
    var t = q.t || '전체';
    var list = allQna().filter(function (x) { return t === '전체' || x.type === t; });
    return panel('Q&amp;A — 문의 게시판',
      '<div class="toolbar"><nav class="tabs" aria-label="문의 분류">' + types.map(function (x) {
        return '<a class="tab' + (x === t ? ' on' : '') + '" href="#/qna' + (x === '전체' ? '' : '?t=' + encodeURIComponent(x)) + '">' + x + '</a>';
      }).join('') + '</nav><a class="btn pri sm" href="#/qna/write">문의 쓰기</a></div>' +
      (list.length ? qTable(list) : '<p class="empty">이 분류엔 아직 문의가 없어요.</p>') +
      '<p class="note">비회원도 이름과 비밀번호로 쓸 수 있어요. 비밀글은 쓴 사람과 관리자만 봅니다.</p>');
  }
  function qnaWrite(q) {
    var opts = M.products.map(function (p) { return '<option value="' + p.id + '"' + (q.p === p.id ? ' selected' : '') + '>' + esc(p.name) + '</option>'; }).join('');
    return panel('Q&amp;A › 문의 쓰기',
      '<form class="form" id="qForm" novalidate>' +
      '<div class="form two"><label class="field"><span>분류</span><select name="type">' + ['상품', '배송', '교환·반품', '기타'].map(function (x) { return '<option' + (q.p && x === '상품' ? ' selected' : '') + '>' + x + '</option>'; }).join('') + '</select></label>' +
      '<label class="field"><span>상품 (선택)</span><select name="product"><option value="">상품 선택 안 함</option>' + opts + '</select></label></div>' +
      '<label class="field"><span>제목</span><input name="title" required maxlength="60" placeholder="예) M 사이즈 어깨 단면이 궁금해요"></label>' +
      '<label class="field"><span>내용</span><textarea name="body" required placeholder="궁금한 점을 적어 주세요."></textarea></label>' +
      (S.login ? '<p class="note">' + esc(S.member.name) + ' 님 이름으로 등록돼요.</p>'
        : '<div class="form two"><label class="field"><span>작성자</span><input name="author" required placeholder="이름"></label><label class="field"><span>비밀번호</span><input name="pw" type="password" required minlength="4" placeholder="글 확인용 4자리 이상" autocomplete="new-password"></label></div>') +
      '<label class="check"><input type="checkbox" name="secret" checked> 비밀글로 쓰기</label>' +
      '<div class="btns"><a class="btn" href="#/qna">취소</a><button type="submit" class="btn pri">등록하기</button></div></form>');
  }
  function qnaView(id) {
    var q = allQna().filter(function (x) { return x.id === id; })[0];
    if (!q) return notFound();
    var mine = q.mine && S.login && q.author === S.member.name;
    if (q.secret && !S.unlocked[id] && !mine) {
      return panel('Q&amp;A › 비밀글',
        '<form class="form narrow" id="pwForm" data-id="' + id + '"><p><span class="lock">🔒</span> 비밀글이에요. 글을 쓸 때 넣은 비밀번호를 입력해 주세요.</p>' +
        '<label class="field"><span>비밀번호</span><input name="pw" type="password" required autocomplete="off"></label>' +
        '<p class="note">프로토타입 예시 글의 비밀번호는 1234</p><div class="btns"><a class="btn" href="#/qna">목록</a><button class="btn pri" type="submit">확인</button></div></form>');
    }
    var p = q.product ? P(q.product) : null;
    return panel('Q&amp;A › ' + esc(q.type),
      '<article class="qpost"><h2 class="h2">' + esc(q.title) + '</h2><p class="q-meta">' + esc(q.author) + ' · ' + q.date + (p ? ' · <a href="#/p/' + p.id + '">' + esc(p.name) + '</a>' : '') + '</p>' +
      '<div class="q-body">' + esc(q.body).replace(/\n/g, '<br>') + '</div>' +
      (q.answer ? '<div class="q-ans"><b>mooroo 답변</b><p>' + esc(q.answer) + '</p></div>' : '<div class="q-ans wait">답변을 준비하고 있어요. 답변이 달리면 여기에 보여요.</div>') +
      '<div class="btns"><a class="btn" href="#/qna">목록</a>' + (q.mine ? '<button type="button" class="btn" data-act="qdel" data-id="' + q.id + '">삭제</button>' : '') + '</div></article>');
  }

  /* ---------- MY PAGE ---------- */
  function allOrders() {
    return S.orders.concat(M.orders).map(function (o) { return S.patch[o.no] ? Object.assign({}, o, { status: S.patch[o.no] }) : o; });
  }
  var orderTotal = function (o) { return o.total != null ? o.total : subtotal(o.items) + (o.ship || 0); };
  function oItems(o) {
    return o.items.map(function (c) {
      var p = P(c.id);
      return '<a class="oitem link" href="#/p/' + p.id + '"><img src="' + img(p.id) + '" alt=""><span>' + esc(p.name) + '<br><small>' + esc(c.color) + ' / ' + esc(c.size) + ' · ' + c.qty + '개</small></span><b>' + won(priceOf(p) * c.qty) + '</b></a>';
    }).join('');
  }
  var STEPS = ['결제완료', '상품준비', '배송중', '배송완료'];
  function orderCard(o) {
    var acts = [];
    if (o.status === '결제완료' || o.status === '상품준비') acts.push('<button type="button" class="btn sm" data-act="claim" data-k="취소" data-no="' + o.no + '">주문 취소</button>');
    if (o.status === '배송중' || o.status === '배송완료') acts.push('<button type="button" class="btn sm" data-act="track" data-no="' + o.no + '">배송 조회</button>');
    if (o.status === '배송완료') acts.push('<button type="button" class="btn sm" data-act="claim" data-k="교환" data-no="' + o.no + '">교환 신청</button><button type="button" class="btn sm" data-act="claim" data-k="반품" data-no="' + o.no + '">반품 신청</button>');
    var claim = /요청/.test(o.status);
    return '<div class="order"><div class="order-h"><span>' + o.date + ' · <b class="mono">' + o.no + '</b></span><span class="st ' + (claim ? 'wait' : 'done') + '">' + o.status + '</span></div>' +
      '<div class="order-b">' + oItems(o) + '</div>' +
      '<div class="order-f"><span>결제 ' + won(orderTotal(o)) + ' · ' + esc(o.pay) + '</span><span class="btns">' + (claim ? '<span class="note">접수됐어요. 처리되면 문자로 알려 드려요.</span>' : acts.join('')) + '</span></div></div>';
  }
  function loginView() {
    return panel('MY PAGE — 로그인',
      '<div class="login"><form class="form" id="loginForm"><p class="note box">프로토타입이라 아무 값이나 넣거나 아래 데모 버튼을 누르면 들어가져요. 실제 회원가입 · 로그인은 계약 후 연결합니다.</p>' +
      '<label class="field"><span>아이디</span><input name="id" autocomplete="off" placeholder="아이디"></label>' +
      '<label class="field"><span>비밀번호</span><input name="pw" type="password" autocomplete="off" placeholder="비밀번호"></label>' +
      '<div class="btns"><button type="submit" class="btn pri wide">로그인</button><button type="button" class="btn wide" data-act="demo">데모 계정으로 보기</button></div>' +
      '<p class="note"><a href="#/mypage" data-act="signup">회원가입</a> · <a href="#/mypage" data-act="signup">아이디 · 비밀번호 찾기</a></p></form>' +
      '<form class="form" id="guestForm"><h2 class="h2">비회원 주문 조회</h2><label class="field"><span>주문번호</span><input name="no" required placeholder="MR로 시작하는 번호"></label>' +
      '<button type="submit" class="btn">조회하기</button><div id="guestOut"></div></form></div>');
  }
  function mypage(tab) {
    if (!S.login) return loginView();
    var orders = allOrders().filter(function (o) { return !o.guest; });
    var coupons = M.coupons.filter(function (c) { return S.usedCoupons.indexOf(c.name) < 0; });
    var tabs = [['orders', '주문 · 배송'], ['claims', '취소 · 교환 · 반품'], ['info', '회원정보'], ['benefit', '적립금 · 쿠폰']];
    var body;
    if (tab === 'claims') {
      var cl = orders.filter(function (o) { return /요청|취소/.test(o.status); });
      body = (cl.length ? cl.map(orderCard).join('') : '<p class="empty">신청한 취소 · 교환 · 반품이 없어요.</p>') +
        '<p class="note">주문 · 배송 탭에서 주문마다 취소(배송 전), 교환 · 반품(받은 뒤 7일 안)을 신청할 수 있어요.</p>';
    } else if (tab === 'info') {
      var m = S.member;
      body = '<form class="form" id="infoForm"><div class="form two">' +
        '<label class="field"><span>이름</span><input name="name" value="' + esc(m.name) + '" required></label>' +
        '<label class="field"><span>휴대폰</span><input name="phone" type="tel" value="' + esc(m.phone) + '" required></label>' +
        '<label class="field"><span>이메일</span><input name="email" type="email" value="' + esc(m.email) + '"></label>' +
        '<label class="field"><span>우편번호</span><input name="zip" value="' + esc(m.zip) + '"></label></div>' +
        '<label class="field"><span>주소</span><input name="addr" value="' + esc(m.addr) + '"></label>' +
        '<label class="field"><span>상세 주소</span><input name="addr2" value="' + esc(m.addr2) + '"></label>' +
        '<label class="check"><input type="checkbox" name="marketing"' + (m.marketing ? ' checked' : '') + '> 할인 · 신상 소식 문자 받기</label>' +
        '<div class="btns"><button type="button" class="btn" data-act="pwchange">비밀번호 변경</button><button type="submit" class="btn pri">저장하기</button></div></form>';
    } else if (tab === 'benefit') {
      body = '<div class="stats"><div class="stat">적립금<b>' + won(S.points) + '</b></div><div class="stat">쿠폰<b>' + coupons.length + '장</b></div><div class="stat">적립률<b>1%</b></div></div>' +
        '<h2 class="h2">쿠폰</h2>' + (coupons.length ? '<div class="coupons">' + coupons.map(function (c) { return '<div class="coupon"><b>' + esc(c.name) + '</b><span>' + esc(c.cond) + '</span><span>~ ' + c.until + '</span></div>'; }).join('') + '</div>' : '<p class="empty">쓸 수 있는 쿠폰이 없어요.</p>') +
        '<h2 class="h2">적립금 내역</h2><table class="qtable"><tbody>' + M.points.history.map(function (h) { return '<tr><td>' + h.date + '</td><td>' + esc(h.text) + '</td><td class="num">+' + won(h.amt) + '</td></tr>'; }).join('') + '</tbody></table>';
    } else {
      body = orders.length ? orders.map(orderCard).join('') : '<p class="empty">주문 내역이 없어요.</p>';
    }
    return panel('MY PAGE — ' + esc(S.member.name) + ' 님',
      '<div class="me-head"><div class="stats"><div class="stat">주문<b>' + orders.length + '건</b></div><div class="stat">적립금<b>' + won(S.points) + '</b></div><div class="stat">쿠폰<b>' + coupons.length + '장</b></div></div>' +
      '<button type="button" class="btn sm" data-act="logout">로그아웃</button></div>' +
      '<nav class="tabs" aria-label="마이페이지">' + tabs.map(function (t) { return '<a class="tab' + (t[0] === tab ? ' on' : '') + '" href="#/mypage/' + t[0] + '">' + t[1] + '</a>'; }).join('') + '</nav>' +
      '<div class="tab-body">' + body + '</div>');
  }

  function notFound() {
    return panel('ERROR 404', '<div class="empty"><p>찾는 화면이 없어요.</p><a class="btn pri" href="#/">HOME</a></div>');
  }

  /* ---------- 라우터 ---------- */
  var ROUTES = [
    [/^\/$/, home, 'home'],
    [/^\/c\/(\w+)$/, function (m, q) { return listCat(m[1], q); }, 'cat'],
    [/^\/p\/(\w+)$/, function (m) { return product(m[1]); }, 'product'],
    [/^\/new$/, listNew, 'new'], [/^\/sale$/, listSale, 'sale'], [/^\/best$/, listBest, 'best'],
    [/^\/coordi$/, coordiList, 'coordi'], [/^\/coordi\/(\w+)$/, function (m) { return coordiView(m[1]); }, 'coordi'],
    [/^\/about$/, about, 'about'],
    [/^\/cart$/, cartView, 'cart'], [/^\/checkout$/, checkout, 'cart'], [/^\/order\/(\w+)$/, function (m) { return orderDone(m[1]); }, 'mypage'],
    [/^\/qna$/, function (m, q) { return qnaList(q); }, 'qna'], [/^\/qna\/write$/, function (m, q) { return qnaWrite(q); }, 'qna'],
    [/^\/qna\/(\w+)$/, function (m) { return qnaView(m[1]); }, 'qna'],
    [/^\/mypage(?:\/(\w+))?$/, function (m) { return mypage(m[1] || 'orders'); }, 'mypage']
  ];
  var PATH = { home: '', cat: 'SHOP', product: 'SHOP', new: 'NEW', sale: 'SALE', best: 'BEST', coordi: 'COORDI', about: 'ABOUT', cart: 'CART', qna: 'Q&A', mypage: 'MY PAGE' };

  function route() {
    var h = location.hash.replace(/^#/, '') || '/';
    var parts = h.split('?'), path = parts[0], q = {};
    (parts[1] || '').split('&').forEach(function (kv) { if (kv) { var a = kv.split('='); q[a[0]] = decodeURIComponent(a[1] || ''); } });
    var hit = null, m = null;
    for (var i = 0; i < ROUTES.length; i++) { m = path.match(ROUTES[i][0]); if (m) { hit = ROUTES[i]; break; } }
    if (path !== '/checkout') checkoutItems = null;
    stopPlayer();
    var html = hit ? hit[1](m, q) : notFound();
    if (html === '') return;
    var name = hit ? hit[2] : '';
    view.innerHTML = html;
    document.body.classList.toggle('is-home', name === 'home');
    $('#tbPath').textContent = PATH[name] ? ' — C:\\MOOROO\\' + PATH[name] : '';
    $$('.tk-btn').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-tk') === name); });
    $$('.dicon').forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + path || (name === 'coordi' && a.getAttribute('href') === '#/coordi')); });
    closeMenus();
    MOOICON.hydrate(view);
    if (name === 'cart' && path === '/checkout') coCalc();
    view.scrollTop = 0;
    if (window.innerWidth < 900) window.scrollTo(0, 0);
    if (name !== 'home') view.focus({ preventScroll: true });
    document.title = (PATH[name] ? PATH[name] + ' — ' : '') + 'mooroo';
  }

  /* ---------- 이벤트 ---------- */
  function closeMenus() { $$('.mitem.open').forEach(function (x) { x.classList.remove('open'); }); }

  document.addEventListener('click', function (e) {
    var mb = e.target.closest('.mitem > button');
    if (mb) { var it = mb.parentNode, was = it.classList.contains('open'); closeMenus(); if (!was) it.classList.add('open'); return; }
    if (!e.target.closest('.mitem')) closeMenus();

    var a = e.target.closest('[data-act]');
    if (!a) return;
    var act = a.getAttribute('data-act');

    if (act === 'close') return closeModal();
    if (act === 'opt') {
      pd[a.getAttribute('data-k')] = a.getAttribute('data-v');
      $$('.chip[data-k="' + a.getAttribute('data-k') + '"]').forEach(function (c) { var on = c === a; c.classList.toggle('on', on); c.setAttribute('aria-pressed', on); });
      return;
    }
    if (act === 'pdqty') { pd.qty = Math.max(1, Math.min(99, pd.qty + +a.getAttribute('data-d'))); return pdUpdate(); }
    if (act === 'ptab') {
      $$('.ptabs .tab').forEach(function (t) { var on = t === a; t.classList.toggle('on', on); t.setAttribute('aria-selected', on); });
      $('#ptabBody').innerHTML = ptab(P(pd.id), a.getAttribute('data-t'));
      return;
    }
    if (act === 'addcart' || act === 'buynow') {
      if (!pd.color || !pd.size) return toast('색상과 사이즈를 골라 주세요');
      var item = { id: pd.id, color: pd.color, size: pd.size, qty: pd.qty };
      if (act === 'buynow') { checkoutItems = [item]; location.hash = '#/checkout'; return; }
      addCart(item);
      return toast('장바구니에 담았어요 <a href="#/cart">장바구니 보기 ›</a>');
    }
    if (act === 'qty' || act === 'del') {
      var k = a.getAttribute('data-k');
      S.cart = S.cart.map(function (c) {
        if (key(c) !== k) return c;
        if (act === 'del') return null;
        c.qty = Math.max(1, Math.min(99, c.qty + +a.getAttribute('data-d')));
        return c;
      }).filter(Boolean);
      save(); return route();
    }
    if (act === 'clear') { S.cart = []; save(); return route(); }
    if (act === 'tocheckout') { checkoutItems = null; location.hash = '#/checkout'; return; }
    if (act === 'lookcart') {
      var lk = M.coordi.filter(function (x) { return x.id === a.getAttribute('data-id'); })[0];
      lk.items.forEach(function (pid) { var p = P(pid); addCart({ id: pid, color: p.colors[0], size: p.sizes[Math.floor(p.sizes.length / 2)], qty: 1 }); });
      return toast('코디 상품 ' + lk.items.length + '개를 담았어요 <a href="#/cart">장바구니 보기 ›</a>');
    }
    if (act === 'play') {
      if (player.on) return stopPlayer();
      player.on = true; a.textContent = '❚❚'; a.setAttribute('aria-label', '코디 슬라이드 멈춤');
      playerStep(); player.t = setInterval(playerStep, 2200);
      return;
    }
    if (act === 'demo') { S.login = true; save(); return route(); }
    if (act === 'logout') { S.login = false; save(); toast('로그아웃했어요'); return route(); }
    if (act === 'signup') { e.preventDefault(); return toast('회원가입은 계약 후 실제로 연결해요. 지금은 데모 계정으로 둘러보세요.'); }
    if (act === 'pwchange') return toast('비밀번호 변경은 실제 회원 기능을 붙일 때 연결해요.');
    if (act === 'qdel') {
      S.qna = S.qna.filter(function (x) { return x.id !== a.getAttribute('data-id'); });
      save(); toast('문의를 지웠어요'); location.hash = '#/qna'; return;
    }
    if (act === 'track') {
      var o = allOrders().filter(function (x) { return x.no === a.getAttribute('data-no'); })[0];
      var at = STEPS.indexOf(o.status);
      return modal('배송 조회', '<p>' + esc(o.courier || 'CJ대한통운') + ' · 송장 <b class="mono">' + esc(o.track || '발급 전') + '</b></p>' +
        '<div class="steps">' + STEPS.map(function (s, i) { return '<span class="' + (i <= at ? 'on' : '') + '">' + s + '</span>'; }).join('') + '</div>' +
        '<p class="note">실제 쇼핑몰에선 관리자가 송장번호를 넣으면 택배사 조회와 연결돼요.</p><div class="btns end"><button type="button" class="btn pri" data-act="close">확인</button></div>');
    }
    if (act === 'claim') {
      var kind = a.getAttribute('data-k'), no = a.getAttribute('data-no');
      var reasons = kind === '취소' ? ['단순 변심', '주문 실수', '배송이 늦어요'] : ['사이즈가 안 맞아요', '색상이 달라요', '상품 불량', '단순 변심'];
      return modal(kind + ' 신청', '<form id="claimForm" data-no="' + no + '" data-k="' + kind + '"><p>주문번호 <b class="mono">' + no + '</b></p>' +
        '<label class="field"><span>사유</span><select name="reason">' + reasons.map(function (r) { return '<option>' + r + '</option>'; }).join('') + '</select></label>' +
        '<label class="field"><span>자세한 내용 (선택)</span><textarea name="memo" rows="3"></textarea></label>' +
        (kind === '취소' ? '' : '<p class="note">받은 날부터 7일 안에 신청할 수 있어요. 단순 변심은 왕복 배송비가 들어요.</p>') +
        '<div class="btns end"><button type="button" class="btn" data-act="close">닫기</button><button type="submit" class="btn pri">' + kind + ' 신청하기</button></div></form>');
    }
  });

  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t.getAttribute('data-act') === 'sort') { location.hash = t.getAttribute('data-base') + '?s=' + t.value; return; }
    if (t.getAttribute('data-act') === 'recalc') coCalc();
  });
  document.addEventListener('input', function (e) { if (e.target.getAttribute('data-act') === 'recalc') coCalc(); });

  document.addEventListener('submit', function (e) {
    var f = e.target;
    e.preventDefault();
    if (f.id === 'coForm') {
      var miss = ['name', 'phone', 'addr'].filter(function (n) { return !f[n].value.trim(); });
      if (miss.length) { f[miss[0]].focus(); return toast('받는 사람 정보를 다 채워 주세요'); }
      if (!f.agree.checked) return toast('결제 동의에 체크해 주세요');
      var c = coCalc();
      modal('결제 안내', '<p><b>프로토타입 안내</b></p><p>실제 쇼핑몰에선 여기서 ' + esc(f.pay.value) + ' 결제창이 열립니다. 결제대행사(PG) 연결은 계약 후 진행해요.</p><p>지금은 주문만 데모로 만들어서 마이페이지에서 확인할 수 있게 했어요.</p>' +
        '<p class="sum-row sum-total"><span>결제금액</span><b>' + won(c.total) + '</b></p><div class="btns end"><button type="button" class="btn" data-act="close">닫기</button><button type="button" class="btn pri" id="payOk">데모 주문 완료하기</button></div>');
      $('#payOk').onclick = function () { placeOrder(f); };
      return;
    }
    if (f.id === 'qForm') {
      if (!f.title.value.trim() || !f.body.value.trim()) return toast('제목과 내용을 적어 주세요');
      if (!S.login && (!f.author.value.trim() || f.pw.value.length < 4)) return toast('작성자와 비밀번호(4자리 이상)를 넣어 주세요');
      var id = 'u' + Date.now().toString(36);
      S.qna.unshift({ id: id, type: f.type.value, title: f.title.value.trim(), body: f.body.value.trim(), author: S.login ? S.member.name : f.author.value.trim(), date: M.today, secret: f.secret.checked, pw: S.login ? '' : f.pw.value, product: f.product.value || undefined, answer: '', mine: true });
      S.unlocked[id] = true;
      save(); toast('문의를 등록했어요. 답변이 달리면 이 글에서 볼 수 있어요.');
      location.hash = '#/qna/' + id; return;
    }
    if (f.id === 'pwForm') {
      var qid = f.getAttribute('data-id'), q = allQna().filter(function (x) { return x.id === qid; })[0];
      if (f.pw.value === q.pw) { S.unlocked[qid] = true; return route(); }
      f.pw.value = ''; return toast('비밀번호가 맞지 않아요');
    }
    if (f.id === 'loginForm') { S.login = true; save(); return route(); }
    if (f.id === 'guestForm') {
      var o = allOrders().filter(function (x) { return x.no === f.no.value.trim().toUpperCase(); })[0];
      $('#guestOut').innerHTML = o ? orderCard(o) : '<p class="note">그 번호로 된 주문이 없어요. 주문 완료 화면의 번호를 넣어 주세요.</p>';
      return;
    }
    if (f.id === 'infoForm') {
      ['name', 'phone', 'email', 'zip', 'addr', 'addr2'].forEach(function (n) { S.member[n] = f[n].value.trim(); });
      S.member.marketing = f.marketing.checked;
      save(); toast('회원정보를 저장했어요'); return route();
    }
    if (f.id === 'claimForm') {
      S.patch[f.getAttribute('data-no')] = f.getAttribute('data-k') + '요청';
      save(); closeModal(); toast(f.getAttribute('data-k') + ' 신청을 접수했어요'); return route();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { if (!$('#modal').hidden) closeModal(); closeMenus(); }
  });
  $('#modal').addEventListener('click', function (e) { if (e.target === e.currentTarget) closeModal(); });

  /* 사진이 아직 없으면 회색 자리로 */
  document.addEventListener('error', function (e) {
    var t = e.target;
    if (t.tagName === 'IMG' && !t.getAttribute('data-ph')) {
      t.setAttribute('data-ph', '1');
      t.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect width="10" height="10" fill="#e4e7ee"/><path d="M3 6.5l1.6-2 1.2 1.4.8-.9L8 6.5z" fill="#b8bfcc"/></svg>');
    }
  }, true);

  /* 창 단추 */
  $('#btnMin').onclick = function () { $('#mainWin').hidden = true; $('#restoreChip').hidden = false; $('#restoreChip').focus(); };
  $('#restoreChip').onclick = function () { $('#mainWin').hidden = false; $('#restoreChip').hidden = true; };
  $('#btnMax').onclick = function () { document.body.classList.toggle('maxed'); };

  /* 시안(테마) 바꾸기 */
  var THEMES = ['sky', 'sunset', 'night', 'aqua', 'chrome'];
  function setTheme(t) {
    if (THEMES.indexOf(t) < 0) t = 'sky';
    document.body.setAttribute('data-theme', t);
    $$('#draftBar button').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-t') === t); b.setAttribute('aria-pressed', b.getAttribute('data-t') === t); });
    try { var u = new URL(location.href); u.searchParams.set('t', t); history.replaceState(null, '', u); } catch (e) { }
  }
  /* 배포본은 시안마다 주소가 따로(/mooroo-1/ …) — 버튼을 누르면 같은 화면(#)을 유지한 채 그 주소로 간다 */
  $('#draftBar').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-t]');
    if (!b) return;
    if (window.MOO_DRAFT) { location.href = '/mooroo-' + (THEMES.indexOf(b.getAttribute('data-t')) + 1) + '/' + location.hash; return; }
    setTheme(b.getAttribute('data-t'));
  });

  if (window.MOO_DRAFT) {
    var t = THEMES[window.MOO_DRAFT - 1];
    document.body.setAttribute('data-theme', t);
    $$('#draftBar button').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-t') === t); b.setAttribute('aria-pressed', b.getAttribute('data-t') === t); });
  } else setTheme(new URLSearchParams(location.search).get('t'));
  MOOICON.hydrate(document);
  badge();
  window.addEventListener('hashchange', route);
  route();
})();
