import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "루미노아 키친웍스",
  headline: "주방가전 · 빌트인 가전 기업 홈페이지",
  summary: "후드, 쿡탑, 싱크볼과 수전 같은 주방 제품을 종류별 목록과 제품별 상세 페이지로 보여 주고, 욕실 · 환기 · 생활 소형가전까지 한 메뉴로 잇는 주방가전 기업 홈페이지입니다.",
  brandColor: "rgb(0, 157, 220)",
  tintColor: "rgb(36, 40, 44)",
  mobileDark: false,
  overview: "첫 화면은 PREMIUM LIVING INSPIRED BY LUMINOA 글자 사이에 둥근 사진 칸이 끼어 있고, 내리면 사진 칸이 가운데로 모였다가 화면 전체를 덮는 주방 영상과 사진 슬라이드로 커집니다. 이어서 빌트인 주방가전, 환기 · 공기질, 욕실, 생활 소형가전 네 갈래 사업 소개와 안심케어 서비스 카드, 대표 제품 슬라이드, 보도자료, SNS 사진이 차례로 나옵니다.\n\n제품소개에서는 왼쪽 상세필터와 위쪽 종류 탭, 검색칸으로 제품을 좁혀 보고, 상세 페이지에서 큰 제품 사진과 기능, 관리 방법을 읽습니다. 회사 소개는 내릴수록 회색 문장이 한 글자씩 진하게 바뀌고, Mission · Vision · Core Value 가 주방 사진 위에 차례로 겹쳐집니다.",
  meta: [
    { label: "업종", value: "주방가전 · 후드 · 쿡탑 · 욕실 · 환기 제품" },
    { label: "주요 구성", value: "회사 소개 · 연혁 · CI · 사업소 · 투자 정보 · 윤리 경영 · 제품소개 · 제품 상세 · 자주 묻는 질문 · 유지관리 가이드 · A/S 신청&조회 · E-카탈로그 · 사용설명서 · 구매처 · 고객의 소리 · 뉴스 · 홍보영상 · 공지 사항" },
  ],
  mainShot: "/cases/luminoa/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "제품을 고르고 고객지원까지 이어지는 흐름",
  pages: [
    { name: "메인", file: "index.html", img: "/cases/luminoa/page-index.webp", desc: "글자 사이 사진 칸이 화면 가득 커지는 첫 장면에서 시작해 사업 분야, 안심케어 서비스, 대표 제품, 보도자료, SNS 사진까지 이어서 봅니다.", items: ["커지는 첫 장면", "안심케어 서비스", "대표 제품"] },
    { name: "회사 소개", file: "kor-about-about.html", img: "/cases/luminoa/page-about.webp", desc: "회사 소개 문장이 내릴수록 한 글자씩 진하게 바뀌고, Mission · Vision · Core Value 를 주방 사진 위에 차례로 겹쳐 보여 줍니다.", items: ["한 글자씩 진해지는 문장", "Mission · Vision · Core Value"] },
    { name: "제품소개", file: "kor-product-kitchen-list.html", img: "/cases/luminoa/page-products.webp", desc: "분류 · 종류 · 설치형태 · 화구 · 형태 같은 상세필터와 종류 탭, 검색칸으로 제품을 좁히고, 카드마다 모델명과 쓰임새를 봅니다.", items: ["상세필터", "종류 탭", "검색칸"] },
    { name: "제품 상세", file: "kor-product-kitchen-list--bmain-view-uid-284.html", img: "/cases/luminoa/page-detail.webp", desc: "유리 후드 한 제품의 사진 묶음 아래로 기능과 관리 방법 여섯 가지, 디자인 이야기, 필터 손질, 쿡탑과 함께 보는 설치 구성을 큰 사진과 함께 차례로 읽습니다.", items: ["기능과 관리 방법", "디자인 이야기", "함께 보면 좋은 제품"] },
    { name: "A/S 신청&조회", file: "kor-support-service--1.html", img: "/cases/luminoa/page-service.webp", desc: "사진 세 장 아래에 A/S 신청하기, A/S 신청현황, 고객의 소리 칸을 나란히 두었습니다.", items: ["A/S 신청하기", "A/S 신청현황", "고객의 소리"] },
    { name: "뉴스", file: "kor-pr-center-news--list.html", img: "/cases/luminoa/page-news.webp", desc: "전시회 참가, 신제품 공개 같은 보도기사를 사진 카드로 모아 두고 보도기사 · 기업소식 탭으로 나눠 봅니다. 기사 상세에서는 사진과 본문을 이어서 읽습니다.", items: ["보도기사 카드", "탭", "기사 상세"] },
  ],
  points: [
    { title: "글자 사이 사진 칸이\n화면 전체로", body: "첫 화면 글자 사이 둥근 사진 칸이 내릴수록 가운데로 모이고, 화면을 가득 채우는 주방 영상과 사진 슬라이드로 커집니다.", items: ["스크롤 장면", "영상 · 사진 슬라이드"], img: "/cases/luminoa/point-film.webp", caption: "메인 · 첫 화면" },
    { title: "제품 찾기부터 A/S 까지\n카드 다섯 장으로", body: "나에게 꼭 맞는 제품 찾기 사진 카드 옆에 A/S 신청 및 확인, 전국 대리점 찾기, 자주 묻는 질문, 사용 설명서 카드를 붙였습니다.", items: ["안심케어 서비스"], img: "/cases/luminoa/point-service.webp", caption: "메인 · Our Service" },
    { title: "필터로 좁혀 보는\n제품 목록", body: "왼쪽 상세필터와 위쪽 종류 탭, 검색칸으로 후드 · 쿡탑 · 빌트인기기 · 주방수전을 골라 보고, 카드에서 상세 페이지로 넘어갑니다.", items: ["상세필터", "종류 탭"], img: "/cases/luminoa/point-filter.webp", caption: "제품소개 · 목록" },
  ],
  detailsLabel: "상세 내용",
  detailsTitle: "제품을 알아보고 도움을 받는 흐름",
  details: [
    { title: "제품마다 따로 있는 상세 페이지", body: "주방, 욕실, 환기 · 공기질, 생활 소형가전 제품을 종류별 목록으로 나누고, 제품마다 사진 묶음과 기능, 관리 방법, 디자인 이야기를 상세 페이지에 담습니다." },
    { title: "고객지원 메뉴", body: "자주 묻는 질문, 유지관리 가이드, A/S 신청&조회, E-카탈로그, 사용설명서, 서비스정책, 구매처, 고객의 소리, 대리점 개설 문의를 한 메뉴에 모았습니다. 넓은 화면에서는 오른쪽에 A/S 신청 · 사용설명서 · 대리점 개설문의 단추가 따라다닙니다." },
  ],
  mobile: {
    title: "휴대폰에서도 같은 순서로",
    body: "작은 화면에서는 첫 화면 글자와 사진 칸이 줄을 바꿔 쌓이고, 안심케어 서비스 카드가 한 열로 이어집니다. 제품소개는 검색칸과 필터 단추 아래로 종류 탭을 옆으로 밀어 고르고, 제품 카드가 한 열로 내려갑니다.",
    shots: [
      { img: "/cases/luminoa/m-index.webp", caption: "모바일 메인" },
      { img: "/cases/luminoa/m-products.webp", caption: "모바일 제품소개" },
    ],
  },
  faq: [
    { q: "어떤 제품을 소개할 수 있나요?", a: "후드, 쿡탑, 싱크볼과 수전 같은 주방 제품부터 욕실, 환기 · 공기질, 생활 소형가전까지 종류별 목록과 제품별 상세 페이지로 나눠 소개합니다." },
    { q: "고객이 홈페이지에서 무엇을 할 수 있나요?", a: "제품을 필터와 검색으로 찾아보고, 자주 묻는 질문과 사용설명서, A/S 신청&조회, 구매처를 고객지원 메뉴에서 볼 수 있습니다." },
  ],
};

export default study;
