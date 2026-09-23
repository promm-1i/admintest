/* 제품 데이터 + 목록 그리기 — 원본 m31_list.php?cate=&cate2= 와 같은 마크업을 쿼리로 만든다.
   사진은 ./assets/p/prd-<cate>-<cate2>.jpg (분류 소개) · ./assets/p/prd-<idx>.jpg (제품 썸네일) 자리 이미지 */
var PRODUCTS = {
  '1': { name: 'Lens Assembly', subs: [
    { code: '001', name: 'Objective Lens', img: [1241, 700],
      desc: '무한 보정 대물 렌즈는 반도체 미세 패턴과 디스플레이 정밀 검사용 광학계의 핵심 부품입니다. 누빛광학이 설계하고 만드는 대물 렌즈는 고해상도, 저왜곡, 텔레센트릭 특성을 갖춰 미세 패턴 계측, 결함 검출, 자동 광학 검사(AOI)에 알맞게 쓰실 수 있습니다. <br>핵심 기술<br>1)무편심 조립 기술<br>2)측정 및 평가 기술<br>',
      items: [[227, '측정 및 평가 기술', 227, 193], [226, '무편심 조립 기술', 274, 260]] },
    { code: '002', name: 'F-Theta / Telecentric Lens', img: [1149, 986],
      desc: 'F-Theta/Telecentric 렌즈는 갈바노 스캐너(Galvanometer)와 <br>함께 사용하는 레이저 스캐닝 시스템용 빔 집속 광학계로,<br>스캐너 미러가 회전하는 각도(θ)에 정확히 비례해 가공 필드 위 레이저 빔의 위치가 고르게 움직이도록( f·θ ) 설계한 특수<br>렌즈입니다. <br>이 특성 덕분에 레이저 빔을 원하는 가공 위치에 정확히 모을 수<br>있으며, 누빛광학의 F-Theta/Telecentric Lens는 레이저 마킹, 드릴링, 용접, 커팅, 표면 텍스처링 같은 반도체·디스플레이 분야 고정밀 레이저 가공 장비의 핵심 광학 소자로 쓰입니다. 누빛광학은 TGV 스캐닝용 F-Theta 렌즈를 비롯해 1 mm×1 mm 초소형 가공 필드부터 400 mm × 400 mm 이상의 대면적 가공 필드까지, 다양한 사양의 F-Theta 렌즈를 직접 설계하고 제작하며, 품질까지 모두 책임지고 있습니다.<br>',
      items: [] },
    { code: '003', name: 'Beam Expander', img: [800, 800], desc: '레이저 빔의 지름을 원하는 배율로 넓혀 빔 퍼짐을 줄이고 집속 성능을 높이는 광학계입니다.<br>', items: [] },
    { code: '004', name: 'Vision Telecentric Lens', img: [800, 800], desc: '거리가 달라져도 배율이 일정하게 유지되어 치수 측정과 외관 검사에 쓰는 비전용 텔레센트릭 렌즈입니다.<br>', items: [] },
    { code: '005', name: 'Projection Lens', img: [800, 800], desc: '패턴을 정해진 배율로 정확하게 투영하는 노광·검사 장비용 투영 렌즈입니다.<br>', items: [] },
    { code: '006', name: 'Collimator Lens', img: [800, 800], desc: '광원에서 퍼져 나오는 빛을 평행광으로 만들어 주는 시준 렌즈입니다.<br>', items: [] }
  ] },
  '2': { name: 'Optical Components', subs: [
    { code: '001', name: 'WINDOWS &amp; OPTICAL FLATS', img: [951, 447],
      desc: '정밀 연마 기술과 여러 코팅 레시피로 용도에 맞는 레이저 윈도우를 공급합니다.<br>– Substrate Material<br>UV Grade Fused Silica, CaF2 , MgF2 , BK7, ZnSe, Sapphire, Ge, Crystal Quartz, Other material is available<br>– Surface Quality, Surface Flatness<br>10-5 Laser Quality, λ/20 at 633nm<br>– Damage Threshold<br>20J/cm2, 8nsec @ 1064nm typical<br>– Low loss, High damage threshold AR coatings available',
      items: [[233, 'LARGE WEDGE WINDOWS', 266, 203], [232, 'INTERFEROMETER FLATS', 266, 200], [231, 'LASER GRADE RECTANGULAR WINDOWS', 269, 207],
              [230, 'LASER GRADE SQUARE WINDOWS', 273, 207], [229, 'LASER GRADE PLANE PARALLEL WINDOWS', 266, 202], [228, 'ANTIREFLECTION COATED LASER WINDOWS', 265, 192]] },
    { code: '002', name: 'Laser Mirrors', img: [472, 287], pages: 4,
      desc: '-당사 레이저 미러는 높은 Damage Threshold 를 보장하며, IBS 코팅으로 R&gt;99.99% 초고반사율 구현<br><br>– Output Coupler Mirrors (Partially Reflecting Mirrors)<br><br>– Femtosecond Laser Mirrors<br><br>– Nd:YAG, Nd:YVO4 &amp; Nd:YLF Laser Mirrors<br><br>– Solid State Laser Mirrors &amp; Gas Laser Mirrors<br><br>– Excimer Laser Mirrors<br><br>– Broadband Metal &amp; Dielectric Mirrors',
      items: [[254, 'PLANE RECTANGULAR FUSED SILICA MIRROR BLANKS', 262, 201], [253, 'PLANE SQUARE FUSED SILICA N N-BK7 MIRROR BLANKS', 266, 200], [252, 'PLANE ROUND FUSED SILICA MIRROR BLANKS', 269, 205],
              [251, 'PLANE ROUND N-BK7 MIRROR BLANKS', 264, 204], [250, 'CONCAVE SPHERICAL MIRROR BLANKS', 264, 205], [249, 'CONVEX FUSED SILICA MIRROR BLANKS', 264, 201]] },
    { code: '003', name: 'ULTRAFAST_COMPONENTS', img: [800, 800], desc: '펨토초·피코초 레이저에 맞춘 저분산 미러와 광학 부품입니다.<br>', items: [] },
    { code: '004', name: 'Cylindrical Lens', img: [800, 800], desc: '한 방향으로만 빛을 모으거나 넓혀 라인 빔을 만드는 원통형 렌즈입니다.<br>', items: [] }
  ] },
  '3': { name: 'Optical Module', subs: [
    { code: '001', name: 'Vision Inspection Module', img: [600, 556],
      desc: '누빛광학은 정밀 광학 기술을 바탕으로 디스플레이·이차전지·반도체 등 여러 제조 공정에 폭넓게 쓸 수 있는 비전 검사 광학 모듈을 공급합니다. 고객마다 다른 검사 요구에 맞추기 위해 자체 테스트 벤치를 갖추고 있으며, 실제 시료로 성능을 하나하나 꼼꼼히 검증하고 공정에 알맞은 검사 조건을 잡을 수 있습니다. 또한 광학계 설계부터 렌즈와 모듈 제작까지 직접 맡아 고객 맞춤형 광학 모듈을 꾸준하고 안정적으로 생산해 오고 있습니다.<br>',
      items: [[225, 'IT Display 검사 모듈', 482, 410], [220, '시야각 검사 모듈', 456, 330], [219, 'FPCB Inspection Optical Module', 348, 432], [218, 'AOI 광학 모듈', 177, 357], [217, '디스플레이 층간 검사 모듈', 401, 377]] },
    { code: '002', name: '레이저 대공무기 빔 정렬 모듈', title: '레이저 대공무기', img: [836, 783], desc: '1. 고에너지 레이저 전송<br>2. 레이저 정렬 오차 확인<br>3. 조준점 영상 획득<br>', items: [] },
    { code: '003', name: '소형 무인기 빔 결합 모듈', img: [800, 800], desc: '여러 레이저 빔을 하나의 광축으로 합쳐 보내는 소형 빔 결합 모듈입니다.<br>', items: [] },
    { code: '004', name: '정밀 제어용 레이저 빔 정렬 모듈', img: [800, 800], desc: '빔 방향 오차를 실시간으로 잡아 주는 정밀 정렬 모듈입니다.<br>', items: [] },
    { code: '005', name: '조준 광학 모듈', img: [800, 800], desc: '표적을 확대해 보고 조준점을 맞추는 광학 모듈입니다.<br>', items: [] },
    { code: '006', name: '흑체 조립체', img: [800, 800], desc: '열상 장비의 온도 기준을 잡는 교정용 흑체 조립체입니다.<br>', items: [] }
  ] },
  '4': { name: 'Sub-System', subs: [
    { code: '001', name: 'OCT System', img: [487, 515],
      desc: '기술 개요 : 광간섭 단층촬영 기술로 제품 내부 구조를 비침습 방식으로 3차원 시각화하는 산업용 디스플레이 검사 장비 <br>적용 분야 : 투명 디스플레이 층간 불량 검출 (OLED 패널, LCD 패널, Micro OLED)<br>Spec.<br>- Resolution : lateral 35um, vertical 7um<br>- Tact time (sample scan 및 영상 획득) : 5 sec.<br>- 내부 이물, 찍힘, crack, 기포 등 이물 크기 : 80um 이상<br>',
      items: [] }
  ] }
};

function productQuery() {
  var q = new URLSearchParams(location.search);
  var cate = PRODUCTS[q.get('cate')] ? q.get('cate') : '1';
  var subs = PRODUCTS[cate].subs;
  var sub = subs.filter(function (s) { return s.code === q.get('cate2'); })[0] || subs[0];
  return { cate: cate, cat: PRODUCTS[cate], sub: sub, idx: q.get('idx') };
}

function setPageTitle(name) {
  document.querySelector('.pageTitle h3').textContent = name;
  document.querySelector('.pageTitle .pageLocation li:last-child').textContent = name;
  document.title = name + ' — 누빛광학 (프리미엄 디자인 E)';
}

function paging(r) {
  var pg = +new URLSearchParams(location.search).get('pg') || 1, out = [];
  for (var i = 1; i <= (r.sub.pages || 1); i++) {
    out.push(i === pg ? '<strong>' + i + '</strong>' : '<a href="./products.html?cate=' + r.cate + '&amp;cate2=' + r.sub.code + '&amp;pg=' + i + '">' + i + '</a>');
  }
  return out.join(' ');
}

function renderProductList(root) {
  var r = productQuery();
  setPageTitle(r.cat.name);
  var tabs = r.cat.subs.map(function (s) {
    return '<li class="' + (s === r.sub ? 'on' : '') + '"><a href="./products.html?cate=' + r.cate + '&amp;cate2=' + s.code + '">' + s.name + '</a></li>';
  }).join('');
  var html = '<div class="tabs"><ul>' + tabs + '</ul></div>' +
    '<div class="prdExp"><div class="innerwrap">' +
    '<div class="imgarea fadeRight rv"><img src="./assets/p/prd-' + r.cate + '-' + r.sub.code + '.jpg" alt="" width="' + r.sub.img[0] + '" height="' + r.sub.img[1] + '"></div>' +
    '<div class="txtarea fadeLeft rv"><h4>' + (r.sub.title || r.sub.name) + '</h4><p>' + r.sub.desc + '</p></div>' +
    '</div></div>';
  if (r.sub.items.length) {
    html += '<div class="prdList innerwrap"><h5>제품 종류</h5><ul>' + r.sub.items.map(function (it) {
      return '<li class="fadeUp rv"><a href="./product-view.html?cate=' + r.cate + '&amp;cate2=' + r.sub.code + '&amp;idx=' + it[0] + '">' +
        '<div class="img"><img src="./assets/p/prd-' + it[0] + '.jpg" alt="" width="' + it[2] + '" height="' + it[3] + '"></div><div class="tit">' + it[1] + '</div></a></li>';
    }).join('') + '</ul><div class="paging">' + paging(r) + '</div></div>';
  }
  root.innerHTML = html;
  // 원본처럼 선택된 탭이 가운데 오도록 탭 줄을 가로로 밀어 둔다 (넘칠 때만 의미가 있다)
  window.addEventListener('load', function () {
    var ul = root.querySelector('.tabs ul'), li = ul && ul.querySelector('li.on');
    if (!li) return;
    var to = li.offsetLeft - parseFloat(getComputedStyle(li).marginLeft) - ul.offsetWidth / 2 + li.offsetWidth / 2;
    ul.scrollTo({ left: to, behavior: 'smooth' });
  });
}


/* 제품 상세 — 원본 m31_view.php?cate=&cate2=&idx= . body 는 원본의 웹에디터 칸(자유 서식) 자리 */
var PRODUCT_VIEWS = {
  226: { thumb: [291, 260], timg: 'prdv-226-t', p: '무편심 조립 기술',
    body: '<p>&nbsp;</p><p>무편심 조립 기술은 렌즈마다 광학 중심축(Optical Axis)을 경통의 기계 중심축(Mechanical Axis)과 한 축 위에 맞춰 정렬하고 고정하는 기술입니다.</p><p>렌즈 중심 편차(Decenter)와 기울어짐(Tilt)을 거의 없애는 것이 목표입니다. 미세 패턴을 검사하고 측정하는 광학계는 수 µm 만 어긋나도 MTF 가 떨어지고 왜곡과 비대칭 수차가 커지기 때문에, 편심을 재 가며 조립하는 과정이 꼭 필요합니다.<br><img src="./assets/p/prdv-226-1.jpg" alt="" width="1100" height="565"></p>' },
  227: { thumb: [227, 193], p: '측정 및 평가 기술',
    body: '<p>&nbsp;</p><p>대물 렌즈 성능은 렌즈를 지난 파면이 얼마나 일그러졌는지 수치로 재는 Wavefront 측정으로 평가합니다. 간섭계와 Wavefront 센서로 이상적인 파면과 실제 파면의 차이를 RMS, PV, Zernike 계수로 나눠 보고, 해상도와 수차 분포, 조립 편심, 응력으로 생긴 성능 저하까지 확인합니다.</p><p><img src="./assets/p/prdv-227-1.jpg" alt="" width="1100" height="757"><img src="./assets/p/prdv-227-2.jpg" alt="" width="1100" height="1424"><img src="./assets/p/prdv-227-3.jpg" alt="" width="1095" height="936"></p>' },
  232: { thumb: [266, 200], p: 'IF 는 양면을 연마한 무코팅(Uncoated) 윈도우 기판으로, wedge 각도는 30 ±5 각분입니다. 이 덕분에 W1, W2 윈도우, 빔 분할기(Beam Splitter), 출력 커플러, 고조파 분리기, Dichroic 미러, 부분 반사기처럼 여러 코팅 제품의 바탕 기판으로 두루 쓰입니다.',
    body: '<p>30 분 wedge 가 두 면 사이의 간섭을 줄여 줍니다.</p><p>양쪽 면에서 반사된 빔을 따로 쓸 수 있습니다.</p><p>출력 커플러, 빔 분할기, 빔 샘플링 기판으로 쓰기 좋습니다.</p><p>λ/10 투과 파면, 10-5 표면 품질<br><br><b>Specifications</b></p><p><b>Optical Material</b></p><p>UV-grade fused silica 또는 N-BK7</p><p><b>Transmitted Wavefront Error</b></p><p>λ/10 @ 633 nm</p><p><b>Clear Aperture</b></p><p>중심 지름의 85% 이상<br><br><img src="./assets/p/prdv-232-1.jpg" alt="" width="760" height="584"></p>' },
  233: { thumb: [266, 203], p: 'Large wedge 윈도우는 wedge 를 1° 또는 3° 로 만든 레이저 품질 윈도우입니다. 이 wedge 가 되돌아오는 반사광으로 생기는 간섭을 막아 주어 여러 빔 조정 분야에서 쓰입니다.',
    body: '<p>누빛광학의 저손실 고에너지 AR 코팅을 모두 적용할 수 있습니다.</p><p>OEM 용도에 맞춰 치수, wedge, 소재를 따로 정할 수 있습니다.<br><br><b>Specifications</b></p><p><b>Optical Material</b></p><p>UV-grade fused silica 또는 N-BK7</p><p><b>Surface Quality</b></p><p>10-5 scratch and dig</p><p><b>Clear Aperture</b></p><p>중심 지름의 85% 이상<br><img src="./assets/p/prdv-233-1.jpg" alt="" width="724" height="582"></p>' },
  220: { thumb: [456, 330], p: '16K 라인 스캔 카메라와 경사 조명을 쓰는 디스플레이 검사용 광학 시스템으로, 전면(front)과 측면(lateral) 표면을 보도록 카메라를 배치했습니다',
    body: '<p>&nbsp;</p><div>- 주요 SPEC&nbsp;</div><br><p>&nbsp;</p>' },
  225: { thumb: [482, 410], p: '기술 개요 : 태블릿 PC와 노트북에 쓰는 디스플레이 패널 검사 모듈', body: '' }
};

function renderProductView(root) {
  var r = productQuery();
  setPageTitle(r.cat.name);
  var item = r.sub.items.filter(function (it) { return String(it[0]) === r.idx; })[0] || r.sub.items[0];
  if (!item) { location.replace('./products.html?cate=' + r.cate + '&cate2=' + r.sub.code); return; }
  var v = PRODUCT_VIEWS[item[0]] || { thumb: [item[2], item[3]], p: item[1], body: '' };
  var tabs = r.cat.subs.map(function (s) {
    return '<li class="' + (s === r.sub ? 'on' : '') + '"><a href="./products.html?cate=' + r.cate + '&amp;cate2=' + s.code + '">' + s.name + '</a></li>';
  }).join('');
  root.innerHTML = '<div class="tabs"><ul>' + tabs + '</ul></div>' +
    '<div class="prdExp2"><div class="innerwrap">' +
    '<div class="imgarea"> <img src="./assets/p/' + (v.timg || 'prd-' + item[0]) + '.jpg" alt="" width="' + v.thumb[0] + '" height="' + v.thumb[1] + '"> </div>' +
    '<div class="txtarea"><h4>' + r.sub.name + '</h4><h5>' + item[1] + '</h5><p>' + v.p + '</p></div>' +
    '</div></div>' +
    '<div class="conwrap"><div class="exp"><div class="innerwrap">' + v.body + '</div></div><div class="standard"><div class="innerwrap"></div></div></div>';
}


/* 통합검색 — 원본 _research.php?keyword= : 제품명·분류명으로 찾아 목록과 같은 카드로 보여 준다 */
function renderProductSearch(root) {
  var kw = (new URLSearchParams(location.search).get('keyword') || '').trim();
  var input = document.querySelector('.prdSearch input[name=keyword]');
  if (input) input.value = kw;
  if (!kw) return;
  var q = kw.toLowerCase(), found = [];
  Object.keys(PRODUCTS).forEach(function (c) {
    PRODUCTS[c].subs.forEach(function (s) {
      s.items.forEach(function (it) {
        if ((it[1] + ' ' + s.name + ' ' + PRODUCTS[c].name).toLowerCase().indexOf(q) > -1) found.push([c, s.code, it]);
      });
    });
  });
  var esc = kw.replace(/[&<>"]/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]; });
  root.innerHTML = '<div class="result">찾으신 <span class="keyword">' + esc + '</span>에 대한 결과는 총 <span class="total">' + found.length + '</span>개 있습니다.</div>' +
    '<div class="prdList"><ul>' + found.map(function (f) {
      var it = f[2];
      return '<li class="fadeUp rv"><a href="./product-view.html?cate=' + f[0] + '&amp;cate2=' + f[1] + '&amp;idx=' + it[0] + '"><div class="img"><img src="./assets/p/prd-' + it[0] + '.jpg" alt="" width="' + it[2] + '" height="' + it[3] + '"></div><div class="tit">' + it[1] + '</div></a></li>';
    }).join('') + '</ul><div class="paging"><strong>1</strong></div></div>';
}

// <script src="./assets/products.js" data-render="list|view"> 를 .page 안 끝에 두면 그 자리에서 바로 그린다 (site.js 가 .rv 를 모으기 전에)
(function (me) {
  if (!me || !me.dataset.render) return;
  var root = me.parentNode;
  if (me.dataset.render === 'list') renderProductList(root);
  if (me.dataset.render === 'view') renderProductView(root);
  if (me.dataset.render === 'search') renderProductSearch(root);
})(document.currentScript);
