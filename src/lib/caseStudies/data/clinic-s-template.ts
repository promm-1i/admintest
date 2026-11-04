import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "라온피부의원",
  headline: "피부 질환과 미용 시술을 질환별로 나눠 설명하는 피부과 홈페이지",
  summary: "특수 질환, 항노화, 흉터, 여드름, 색소, 홍조 · 혈관 진료를 질환마다 다른 페이지로 나눴습니다. 의료진 약력과 논문, 시술 장비도 따로 볼 수 있습니다.",
  brandColor: "rgb(111, 94, 76)",
  tintColor: "rgb(38, 34, 30)",
  mobileDark: false,
  overview: "첫 화면은 'Be Proud, Move Onward' 문구와 해 질 녘 바다 물결 사진으로 열리고, 아래로 내리면 특수 질환 · 항노화 · 흉터 · 여드름 네 장의 솔루션 카드, 대표원장 약력, 1인실 진료 공간, 유튜브 영상이 이어집니다.\n\n진료 페이지는 포다이스반이나 켈로이드 흉터처럼 질환 하나마다 특징, 발생 부위, 치료 과정을 따로 적었습니다. 의원 소개에서는 대표원장의 약력과 학회 활동, 주요 논문을 보고, 시술 장비 페이지에서 리프팅 · 레이저 장비를 사진으로 확인합니다.",
  meta: [
    { label: "업종", value: "피부과 · 피부 질환 · 미용 시술" },
    { label: "주요 구성", value: "특수 질환 · 항노화 · 흉터 · 여드름 · 색소 · 홍조 혈관 · 의료진 · 시술 장비 · 공지 · 유튜브" },
  ],
  mainShot: "/cases/raonderm/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "질환 설명에서 장비 · 의료진 소개까지",
  pages: [
    { name: "메인", file: "index.html", img: "/cases/raonderm/page-index.webp", desc: "첫 화면에서 솔루션 카드 네 장, 대표원장 약력, 1인실 진료 공간, 유튜브 영상까지 차례로 살펴봅니다.", items: ["솔루션 카드", "대표원장 약력", "유튜브 영상"] },
    { name: "라온피부의원 소개", file: "01-about-php.html", img: "/cases/raonderm/page-about.webp", desc: "진료 철학과 대표원장의 약력 · 학회 활동을 읽고, 주요 논문과 저서를 카드로 넘겨 봅니다.", items: ["진료 철학", "약력 · 학회", "주요 논문"] },
    { name: "특수 질환", file: "05-special-disease-php.html", img: "/cases/raonderm/page-special.webp", desc: "포다이스반, 피지샘 증식증, 한관종, 안검황색종, 입술반점, 난치성 색소증의 특징과 치료 과정을 질환마다 확인합니다.", items: ["질환별 특징", "치료 과정", "사후 관리"] },
    { name: "항노화", file: "12-anti-aging-php.html", img: "/cases/raonderm/page-aging.webp", desc: "주름, 탄력 리프팅, 이중턱 솔루션을 나눠 보고, 이중턱 3단계 프로그램에 쓰는 주사 · 고주파 · 리프팅 장비를 읽습니다.", items: ["주름", "리프팅", "이중턱 3단계"] },
    { name: "흉터", file: "16-scar-php.html", img: "/cases/raonderm/page-scar.webp", desc: "여드름 흉터 치료 기법과 구진성 · 켈로이드 · 수술 흉터의 특징과 접근 방법을 확인합니다.", items: ["여드름 흉터 기법", "켈로이드", "수술 흉터"] },
    { name: "시술 장비", file: "02-bbs-board-php-bo-table-equipment.html", img: "/cases/raonderm/page-equipment.webp", desc: "리프팅 · 고주파 · 레이저 장비를 이름과 사진으로 한 장씩 보여 줍니다.", items: ["리프팅 장비", "레이저 장비", "장비 사진"] },
  ],
  points: [
    { title: "솔루션 카드 네 장으로\n진료를 고릅니다", body: "특수 질환 · 항노화 · 흉터 · 여드름을 흙벽, 회반죽, 대리석, 모래 질감 사진 위에 한 장씩 놓고, 카드마다 한 줄 설명을 붙였습니다.", items: ["카드 네 장", "질감 사진"], img: "/cases/raonderm/point-solution.webp", caption: "메인 · 우리의 솔루션은 특별합니다" },
    { title: "대표원장 약력과\n논문을 한 페이지에", body: "약력과 학회 활동 옆에 주요 논문과 저서를 학술지 이름과 함께 카드로 늘어놓아 넘겨 볼 수 있습니다.", items: ["약력 · 학회", "논문 카드"], img: "/cases/raonderm/point-about.webp", caption: "라온피부의원 소개" },
    { title: "질환 하나마다\n치료 과정을 따로", body: "포다이스반처럼 찾는 사람이 적은 질환도 특징, 발생 부위, 진단부터 사후 관리까지의 치료 과정을 나눠 적었습니다.", items: ["특징 · 발생 부위", "치료 과정"], img: "/cases/raonderm/point-special.webp", caption: "특수 질환" },
  ],
  detailsLabel: "상세 내용",
  detailsTitle: "진료를 읽고 방문을 준비하는 흐름",
  details: [
    { title: "질환별로 나뉜 진료", body: "특수 질환, 항노화, 흉터, 여드름, 색소 리커버리, 홍조 · 혈관을 메뉴마다 나누고, 각 페이지 안에서 질환을 탭으로 골라 읽습니다." },
    { title: "게시판과 방문 정보", body: "공지 · 이벤트와 유튜브 게시판에 글과 영상을 올리고, 아래쪽에서 진료시간과 오시는 길, 상담 전화번호를 확인합니다." },
  ],
  mobile: {
    title: "휴대폰에서도 같은 순서로",
    body: "작은 화면에서는 솔루션 카드와 진료 설명이 한 열로 이어지고, 전체 메뉴를 열어 질환 페이지로 이동합니다.",
    shots: [
      { img: "/cases/raonderm/m-index.webp", caption: "모바일 메인" },
      { img: "/cases/raonderm/m-special.webp", caption: "모바일 특수 질환" },
    ],
  },
  faq: [
    { q: "어떤 진료를 안내하나요?", a: "포다이스반 같은 특수 질환과 주름 · 리프팅 · 이중턱, 여드름과 여드름 흉터, 켈로이드 · 수술 흉터, 색소, 안면홍조 · 혈관 질환을 진료별로 안내합니다." },
    { q: "의료진과 장비는 어디에서 보나요?", a: "라온피부의원 소개에서 대표원장 약력과 논문을, 시술 장비 페이지에서 장비 사진을 볼 수 있습니다." },
  ],
};

export default study;
