import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "태흥정수",
  headline: "정수 필터 · 생활가전 제조 기업 홈페이지",
  summary: "정수기 · 필터 · 생활가전 제품군과 연구 개발, 주가 · 공시 같은 투자 자료, 소식과 기업 문의를 갖춘 제조 기업 홈페이지입니다.",
  brandColor: "#9c2033",
  tintColor: "#fafafa",
  overview:
    "태흥정수의 메인은 검은 바탕 가운데 상호와 한 줄 소개가 뜨는 첫 장면으로 시작해 제품 사진 슬라이드로 넘어갑니다. 아래로 내리면 생활가전 · 소재와 부품 · 건강 · 생활 제품 세 가지 사업 카드, 필터 설계와 연구 시설 소개, 소식 목록이 나옵니다.\n\n제품군 메뉴는 탁상형 · 싱크대 하부 · 물통형 정수기와 필터, 부품 제품을 나누어 보여 주고, 연구 개발 메뉴에는 기술 분야, 연구 시설, 국가 과제, 특허 · 인증 증서 목록이 있습니다.\n\n기업 투자 자료에는 시장 지수와 거래 가격, 일별 · 시간별 탭이 있는 주가 정보, 공시 자료와 투자자 공지 게시판이 있습니다. 기업 문의는 회사명 · 이메일 · 제목 · 내용을 적는 문의 양식입니다.",
  meta: [
    { label: "업종", value: "정수기 · 정수 필터 · 생활가전 제조" },
    { label: "페이지 구성", value: "메인 · 기업 소개 · 연구 개발 · 제품군 · 기업 투자 자료 · 기업 소식 · 고객 문의" },
    { label: "이런 곳에 맞습니다", value: "제품군이 여러 갈래이고 연구 개발과 투자자 안내를 함께 보여 줘야 하는 제조 기업" },
  ],
  mainShot: "/cases/taeheung/main.webp",
  pagesLabel: "페이지 구성",
  pagesTitle: "사업 소개부터 제품, 투자 자료, 문의까지",
  pages: [
    { name: "사업 부문", file: "about_business.html", img: "/cases/taeheung/page-business.webp", desc: "생활가전 · 가정용 제품 · 기업 공급 · 필터 소재와 부품 · 건강 · 생활 제품 사업을 사진과 함께 나누어 소개합니다.", items: ["사업 분야 카드", "기업 공급 안내", "OEM · ODM 문의"] },
    { name: "부품 제품", file: "product_others.html", img: "/cases/taeheung/page-product_others.webp", desc: "필터 소재와 정수 부품을 탭으로 나누고, 탄소 블록 · 역삼투 · 세라믹 · 양전하 여과재를 카드로 보여 줍니다.", items: ["필터 소재 · 정수 부품 탭", "제품 카드", "상세 연결"] },
    { name: "기술 분야", file: "rnd_technology.html", img: "/cases/taeheung/page-rnd_technology.webp", desc: "정수기 · 필터, 음식물 처리, 냉각, 분리막과 활성탄 소재 같은 연구 분야를 하나씩 설명합니다.", items: ["연구 분야 목록", "분야별 설명", "연구 시설 연결"] },
    { name: "주가 정보", file: "invest_stock.html", img: "/cases/taeheung/page-invest_stock.webp", desc: "시장 지수, 현재 거래 가격, 당일 최고 · 최저 가격, 상장 주식 수량, 호가 표를 한 쪽에 정리했습니다.", items: ["시장 지수", "거래 정보 표", "호가 표"] },
    { name: "태흥 소식", file: "news_list.html", img: "/cases/taeheung/page-news_list.webp", desc: "사진 카드 목록으로 제품 소식, 실적 자료, 전시 소식을 날짜와 함께 보여 주고 쪽 번호와 검색이 있습니다.", items: ["사진 카드 목록", "쪽 번호", "검색"] },
    { name: "기업 문의", file: "customer_inquiry.html", img: "/cases/taeheung/page-customer_inquiry.webp", desc: "이름, 이메일(주소 뒷부분 고르기), 제목, 문의 내용을 적고 개인정보 동의를 확인하는 문의 양식입니다.", items: ["이메일 주소 고르기", "제목 · 내용", "개인정보 동의"] },
  ],
  points: [
    { title: "필터 소재와 정수 부품을 탭으로 바꿔 봅니다", body: "부품 제품 쪽에서 필터 소재 · 정수 부품 탭을 누르면 카드 목록과 소개 글, 제품 사진이 바뀝니다.", items: ["두 가지 탭", "소재 카드", "부품 소개"], img: "/cases/taeheung/point-filter-materials.webp", caption: "부품 제품 탭" },
    { title: "문의를 보내면 전화 안내가 나옵니다", body: "기업 문의 양식을 채우고 보내기를 누르면 양식 아래에 전화 문의 안내 문구가 나타납니다.", items: ["필수 칸 확인", "안내 문구", "대표 전화"], img: "/cases/taeheung/point-inquiry-notice.webp", caption: "기업 문의" },
    { title: "휴대폰 메뉴에서 갈래별로 펼칩니다", body: "390px 폭에서 메뉴 단추를 누르면 기업 소개 · 연구 개발 · 제품군 · 기업 투자 자료 · 기업 소식 · 고객 문의 메뉴가 한 화면에 열립니다.", items: ["전체 메뉴", "갈래별 메뉴", "닫기"], img: "/cases/taeheung/point-mega-menu.webp", caption: "휴대폰 메뉴" },
    { title: "주가 정보를 탭으로 나누어 봅니다", body: "주가 정보 쪽 아래에서 현재 거래 가격 · 일별 가격 · 시간별 정보 · 회원사별 거래 정보 탭을 누르면 표가 바뀝니다.", items: ["거래 가격", "일별 · 시간별", "회원사별 거래"], img: "/cases/taeheung/point-stock-daily.webp", caption: "주가 정보 탭" },
  ],
  detailsLabel: "화면 안내",
  detailsTitle: "화면에서 직접 확인할 수 있는 동작",
  details: [
    { title: "검은 첫 장면", body: "메인은 검은 바탕 가운데 상호와 소개 한 줄로 시작한 뒤 제품 사진 슬라이드로 넘어갑니다." },
    { title: "특허 · 인증 증서 목록", body: "연구 개발과 기업 소개의 증서 목록은 증서 썸네일 격자로 보여 주고, 누르면 큰 증서 한 장을 봅니다." },
    { title: "게시판 묶음", body: "태흥 소식, 공지, 홍보 자료실, 공시 자료, 투자자 공지가 날짜가 있는 목록과 쪽 번호로 정리돼 있습니다." },
    { title: "경로 고르기", body: "하위 쪽 머리글 아래 경로 줄에서 갈래와 쪽을 골라 바로 옮겨 갑니다." },
  ],
  mobile: {
    title: "휴대폰에서는 카드와 표가 한 줄로",
    body: "390px 폭에서는 사업 카드와 제품 카드가 한 줄씩 놓이고, 메뉴는 전체 메뉴로 열립니다.",
    shots: [
      { img: "/cases/taeheung/m-business.webp", caption: "사업 부문" },
      { img: "/cases/taeheung/m-products.webp", caption: "부품 제품" },
      { img: "/cases/taeheung/m-stock.webp", caption: "주가 정보" },
      { img: "/cases/taeheung/m-inquiry.webp", caption: "기업 문의" },
    ],
  },
  faq: [
    { q: "주가 정보는 실제 시세와 연결되나요?", a: "지금 표의 숫자는 화면 구성을 보여 주기 위한 값입니다. 상장사라면 제작할 때 시세 제공 서비스를 연결합니다." },
    { q: "제품군을 더 늘릴 수 있나요?", a: "네. 제품군 메뉴와 제품 상세 쪽은 같은 틀이라 제품을 더하거나 뺄 수 있습니다." },
    { q: "문의를 보내면 바로 접수되나요?", a: "지금은 문의를 보내면 전화 안내 문구가 나옵니다. 온라인 접수를 받으려면 접수 기능을 따로 연결합니다." },
  ],
};

export default study;
