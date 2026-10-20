/* mooroo 프로토타입 데모 데이터 — 실제 쇼핑몰에선 관리자 페이지에서 등록한 값으로 바뀐다 */
window.MOO = {
  today: '2026-10-20',
  shipFee: 3000,
  freeShipOver: 50000,

  cats: [
    { id: 'top', name: 'TOP', ko: '상의' },
    { id: 'bottom', name: 'BOTTOM', ko: '하의' },
    { id: 'outer', name: 'OUTER', ko: '아우터' },
    { id: 'bag', name: 'BAG', ko: '가방' },
    { id: 'acc', name: 'ACC', ko: '액세서리' }
  ],

  products: [
    { id: 'p1', cat: 'top', name: '페이드 엔젤 그래픽 롱슬리브', en: 'FADED ANGEL LONG SLEEVE', price: 39000, sale: null, date: '2026-10-17', sales: 182, colors: ['차콜'], sizes: ['S', 'M', 'L'], desc: '한 번 워싱해 프린트가 살짝 바랜 긴소매 티셔츠입니다. 어깨선이 내려가는 여유 있는 핏이라 한 사이즈 작게 입어도 됩니다.', fabric: '면 100%' },
    { id: 'p2', cat: 'top', name: '스타 크롭 베이비 티', en: 'STAR BABY TEE', price: 25000, sale: 19000, date: '2026-09-28', sales: 240, colors: ['화이트', '블랙'], sizes: ['FREE'], desc: '몸에 붙는 짧은 기장의 베이비 티입니다. 가슴에 작은 별 하나만 올렸습니다.', fabric: '면 95% · 스판 5%' },
    { id: 'p3', cat: 'top', name: '스타 버튼 크롭 가디건', en: 'STAR BUTTON CARDIGAN', price: 52000, sale: null, date: '2026-10-12', sales: 96, colors: ['네이비', '그레이'], sizes: ['FREE'], desc: '별 모양 은색 단추를 단 크롭 니트 가디건입니다. 단추를 다 잠그면 니트 상의로도 입을 수 있습니다.', fabric: '아크릴 70% · 울 30%' },
    { id: 'p4', cat: 'top', name: '스카이 워싱 후드 집업', en: 'SKY WASHED ZIP HOODIE', price: 59000, sale: 47000, date: '2026-09-10', sales: 130, colors: ['스카이'], sizes: ['M', 'L'], desc: '안감 기모가 들어간 후드 집업입니다. 색이 고르지 않게 빠지도록 피그먼트 워싱을 했습니다.', fabric: '면 80% · 폴리 20%' },

    { id: 'p5', cat: 'bottom', name: '워싱 카고 버뮤다 팬츠', en: 'WASHED CARGO BERMUDA', price: 49000, sale: null, date: '2026-10-15', sales: 205, colors: ['차콜'], sizes: ['S', 'M', 'L'], desc: '무릎을 덮는 길이의 와이드 카고 반바지입니다. 밑단 조임끈으로 퍼지는 정도를 조절합니다.', fabric: '면 100%' },
    { id: 'p6', cat: 'bottom', name: '라이트 워싱 와이드 데님', en: 'LIGHT WASH WIDE DENIM', price: 62000, sale: 52000, date: '2026-09-20', sales: 160, colors: ['연청'], sizes: ['S', 'M', 'L'], desc: '바닥에 살짝 끌리는 기장의 와이드 데님입니다. 허벅지 쪽만 밝게 워싱했습니다.', fabric: '면 100%' },
    { id: 'p7', cat: 'bottom', name: '나일론 파라슈트 팬츠', en: 'NYLON PARACHUTE PANTS', price: 45000, sale: null, date: '2026-10-19', sales: 74, colors: ['블랙', '그레이'], sizes: ['FREE'], desc: '바스락거리는 나일론 소재의 파라슈트 팬츠입니다. 밑단 스토퍼로 조거처럼 입을 수 있습니다.', fabric: '나일론 100%' },
    { id: 'p8', cat: 'bottom', name: '멜란지 플리츠 미니스커트', en: 'MELANGE PLEATS SKIRT', price: 36000, sale: 29000, date: '2026-08-30', sales: 88, colors: ['그레이'], sizes: ['S', 'M'], desc: '안에 속바지가 달린 플리츠 미니스커트입니다.', fabric: '폴리 65% · 레이온 35%' },

    { id: 'p9', cat: 'outer', name: '퍼 카라 레더 봄버', en: 'FUR COLLAR LEATHER BOMBER', price: 98000, sale: null, date: '2026-10-18', sales: 151, colors: ['블랙'], sizes: ['M', 'L'], desc: '페이크 퍼 카라를 단 크롭 봄버 재킷입니다. 카라는 지퍼로 떼어 낼 수 있습니다.', fabric: '겉감 PU 100% · 카라 폴리 100%' },
    { id: 'p10', cat: 'outer', name: '메탈릭 실버 숏패딩', en: 'METALLIC SILVER PUFFER', price: 119000, sale: 95000, date: '2026-10-05', sales: 67, colors: ['실버'], sizes: ['FREE'], desc: '광택 있는 나일론 겉감의 짧은 패딩입니다. 카라를 끝까지 올리면 목까지 덮습니다.', fabric: '겉감 나일론 100% · 충전재 폴리 100%' },
    { id: 'p11', cat: 'outer', name: '오버핏 데님 트러커 재킷', en: 'OVERSIZED DENIM TRUCKER', price: 79000, sale: null, date: '2026-09-14', sales: 112, colors: ['중청'], sizes: ['M', 'L'], desc: '어깨가 넓게 떨어지는 데님 재킷입니다. 은색 단추를 달았습니다.', fabric: '면 100%' },
    { id: 'p12', cat: 'outer', name: '투라인 트랙 재킷', en: 'TWO LINE TRACK JACKET', price: 65000, sale: 52000, date: '2026-08-25', sales: 58, colors: ['네이비'], sizes: ['S', 'M', 'L'], desc: '소매에 흰 줄 두 개를 넣은 트랙 재킷입니다.', fabric: '폴리 100%' },

    { id: 'p13', cat: 'bag', name: '트리플 버클 숄더백', en: 'TRIPLE BUCKLE SHOULDER BAG', price: 58000, sale: null, date: '2026-10-16', sales: 220, colors: ['블랙'], sizes: ['FREE'], desc: '앞면에 버클 세 줄을 단 바게트 숄더백입니다. 장지갑과 휴대폰이 같이 들어갑니다.', fabric: 'PU 100%' },
    { id: 'p14', cat: 'bag', name: '실버 체인 미니 바게트백', en: 'SILVER CHAIN MINI BAG', price: 42000, sale: 34000, date: '2026-09-25', sales: 140, colors: ['실버'], sizes: ['FREE'], desc: '체인 끈을 단 작은 바게트백입니다. 끈을 두 겹으로 감으면 짧게 멜 수 있습니다.', fabric: 'PU 100%' },
    { id: 'p15', cat: 'bag', name: '나일론 메신저백', en: 'NYLON MESSENGER BAG', price: 46000, sale: null, date: '2026-09-02', sales: 61, colors: ['네이비', '블랙'], sizes: ['FREE'], desc: '13인치 노트북이 들어가는 메신저백입니다.', fabric: '나일론 100%' },
    { id: 'p16', cat: 'bag', name: '스타 패치 캔버스 토트', en: 'STAR PATCH CANVAS TOTE', price: 29000, sale: null, date: '2026-10-10', sales: 99, colors: ['아이보리'], sizes: ['FREE'], desc: '두꺼운 캔버스 토트백입니다. 구석에 별 자수 패치를 붙였습니다.', fabric: '면 100%' },

    { id: 'p17', cat: 'acc', name: '고딕 크로스 체인 목걸이', en: 'GOTHIC CROSS NECKLACE', price: 32000, sale: null, date: '2026-10-14', sales: 175, colors: ['실버'], sizes: ['FREE'], desc: '써지컬 스틸 체인에 십자가 펜던트를 단 목걸이입니다. 길이는 50cm입니다.', fabric: '써지컬 스틸' },
    { id: 'p18', cat: 'acc', name: '스타 자수 비니', en: 'STAR EMBROIDERY BEANIE', price: 24000, sale: 19000, date: '2026-09-30', sales: 133, colors: ['블랙', '그레이'], sizes: ['FREE'], desc: '앞에 작은 별 자수를 넣은 비니입니다.', fabric: '아크릴 100%' },
    { id: 'p19', cat: 'acc', name: '실버 스타 헤어핀 세트', en: 'SILVER STAR PIN SET', price: 15000, sale: null, date: '2026-10-11', sales: 190, colors: ['실버'], sizes: ['FREE'], desc: '별 모양 헤어핀 네 개 세트입니다.', fabric: '합금' },
    { id: 'p20', cat: 'acc', name: '스카이 렌즈 오벌 선글라스', en: 'SKY LENS OVAL SUNGLASSES', price: 38000, sale: 30000, date: '2026-09-08', sales: 84, colors: ['실버'], sizes: ['FREE'], desc: '얇은 은색 테에 연한 하늘색 렌즈를 넣은 타원 선글라스입니다. 자외선 차단 렌즈입니다.', fabric: '메탈 프레임 · TAC 렌즈' }
  ],

  /* 카테고리 창에 대표로 띄울 상품 */
  catCover: { top: 'p1', bottom: 'p5', outer: 'p9', bag: 'p13', acc: 'p17' },

  coordi: [
    { id: 'c1', img: 'img/p21.jpg', title: 'LOOK 01', caption: '차콜 그래픽 티에 카고 반바지. 버클백이랑 십자가 목걸이까지 은색으로 맞췄어요.', date: '2026-10-18', items: ['p1', 'p5', 'p13', 'p17'] },
    { id: 'c2', img: 'img/p22.jpg', title: 'LOOK 02', caption: '흰 베이비 티 + 연청 와이드. 실버 미니백 하나로 끝.', date: '2026-10-11', items: ['p2', 'p6', 'p14', 'p19'] },
    { id: 'c3', img: 'img/p23.jpg', title: 'LOOK 03', caption: '퍼 카라 봄버는 파라슈트 팬츠랑 제일 잘 맞아요. 비니는 별 자수 쪽이 앞.', date: '2026-10-04', items: ['p9', 'p7', 'p18'] },
    { id: 'c4', img: 'img/p24.jpg', title: 'LOOK 04', caption: '실버 패딩에 플리츠 스커트. 선글라스 렌즈 색이랑 메신저백 네이비가 같이 갑니다.', date: '2026-09-27', items: ['p10', 'p8', 'p15', 'p20'] }
  ],

  qna: [
    { id: 'q5', type: '상품', title: '퍼 카라 레더 봄버 M 사이즈 어깨 단면 궁금해요', body: '평소 상의 M 입는데 어깨가 넓은 편이라서요. M 어깨 단면이 몇 cm인지 알려주세요.', author: '김**', date: '2026-10-19', secret: false, product: 'p9', answer: '안녕하세요 mooroo입니다. M 사이즈 어깨 단면은 52cm입니다. 드롭 숄더라 평소 M 입으시면 그대로 고르셔도 됩니다.' },
    { id: 'q4', type: '배송', title: '어제 주문했는데 언제 출발하나요?', body: '10월 18일 주문했습니다.', author: '비회원', date: '2026-10-19', secret: true, pw: '1234', answer: '안녕하세요! 오늘 오후에 출고되어 내일 도착 예정입니다.' },
    { id: 'q3', type: '교환·반품', title: '사이즈 교환 가능할까요', body: '와이드 데님 S를 받았는데 조금 작아서 M으로 바꾸고 싶어요.', author: '이**', date: '2026-10-18', secret: true, pw: '1234', product: 'p6', answer: '' },
    { id: 'q2', type: '상품', title: '와이드 데님 총장이 몇 cm인가요?', body: '키 163인데 바닥에 많이 끌릴까요?', author: '박**', date: '2026-10-16', secret: false, product: 'p6', answer: 'S 기준 총장 104cm입니다. 163cm면 운동화 신었을 때 살짝 덮는 정도예요.' },
    { id: 'q1', type: '기타', title: '스타 크롭 베이비 티 블랙 재입고 되나요?', body: '블랙 품절이라 재입고 알림 받고 싶어요.', author: '최**', date: '2026-10-14', secret: false, product: 'p2', answer: '' }
  ],

  member: { name: '김무루', phone: '010-0000-1234', email: 'demo@mooroo.test', zip: '04000', addr: '서울시 ○○구 ○○로 00', addr2: '000호', marketing: true },

  points: { balance: 3500, history: [
    { date: '2026-10-02', text: '구매 확정 적립 (주문 MR2610020011)', amt: 1500 },
    { date: '2026-09-21', text: '신규 가입 적립', amt: 2000 }
  ] },

  coupons: [
    { name: '신규 가입 10% 할인', cond: '3만원 이상 구매 시 · 최대 1만원', until: '2026-11-30', rate: 10, max: 10000, min: 30000 },
    { name: '무료배송 쿠폰', cond: '금액 제한 없음', until: '2026-10-31', ship: true }
  ],

  /* 데모 주문 (마이페이지에서 보이는 기본 주문) */
  orders: [
    { no: 'MR2610170042', date: '2026-10-17', status: '배송중', courier: 'CJ대한통운', track: '0000-0000-0000', items: [{ id: 'p13', color: '블랙', size: 'FREE', qty: 1 }, { id: 'p17', color: '실버', size: 'FREE', qty: 1 }], ship: 0, pay: '카드' },
    { no: 'MR2610020011', date: '2026-10-02', status: '배송완료', courier: 'CJ대한통운', track: '0000-0000-0001', items: [{ id: 'p2', color: '화이트', size: 'FREE', qty: 2 }], ship: 3000, pay: '카카오페이' }
  ]
};
