import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "청담예원의원",
  headline: "피부 · 웰니스 의원 홈페이지",
  summary: "진료 철학과 얼굴·피부·바디 프로그램, 예약과 비용 안내를 한곳에서 살펴보는 의원 홈페이지입니다.",
  brandColor: "#806856",
  tintColor: "#f7f5f1",
  overview: "첫 화면에서 진료 철학과 의료진, 시그니처 프로그램을 확인하고 의원 소개와 진료 안내로 이동합니다. 따뜻한 사진과 절제된 갈색 강조색으로 각 화면을 이어 줍니다.\n\n풀페이스 필러와 밸런스 리프팅, 웰니스, 콜라겐 부스팅, 스킨 부스터, 바디 프로그램을 주제별 페이지에 나누어 설명합니다. 칼럼과 이벤트 · 공지 목록도 메뉴에서 살펴볼 수 있습니다.\n\n예약 화면에는 전화와 상담 경로, 진료 시간과 오시는 길이 모여 있습니다. 개인정보 안내와 비급여 진료비용은 별도 화면에서 확인합니다.",
  meta: [
    { label: "업종", value: "피부 · 웰니스 의원" },
    { label: "진료 안내", value: "시그니처 케어 · 피부 프로그램 · 바디 · 웰니스" },
    { label: "방문 정보", value: "상담 · 진료 시간 · 오시는 길 · 비급여 비용" },
  ],
  mainShot: "/cases/yewon/main.webp",
  pagesLabel: "진료 안내",
  pagesTitle: "필요한 주제별 화면을 살펴봅니다",
  pages: [
    { name: "홈", file: "index.html", img: "/cases/yewon/page-index.webp", desc: "의원과 의료진을 소개하고 시그니처 케어, 프로그램, 예약 안내로 연결합니다.", items: ["의원 소개", "진료 프로그램", "예약 안내"] },
    { name: "의원 소개", file: "about.html", img: "/cases/yewon/page-about.webp", desc: "진료 철학과 의료진, 공간 소개를 한 화면에서 확인합니다.", items: ["진료 철학", "의료진 소개", "공간 소개"] },
    { name: "시그니처 케어", file: "signature.html", img: "/cases/yewon/page-signature.webp", desc: "풀페이스 필러와 밸런스 리프팅의 특징을 안내합니다.", items: ["풀페이스 필러", "밸런스 리프팅", "진료 안내"] },
    { name: "밸런스 리프팅", file: "balance.html", img: "/cases/yewon/page-balance.webp", desc: "피부와 얼굴 지지 구조를 살피는 리프팅 정보가 나옵니다.", items: ["얼굴 균형", "리프팅 안내", "상담 정보"] },
    { name: "웰니스", file: "wellness.html", img: "/cases/yewon/page-wellness.webp", desc: "피부 변화와 생활 컨디션을 함께 다루는 웰니스 프로그램을 소개합니다.", items: ["생활 컨디션", "웰니스 케어", "진료 안내"] },
    { name: "콜라겐 프로그램", file: "collagen.html", img: "/cases/yewon/page-collagen.webp", desc: "콜라겐 부스팅 프로그램과 주사 정보를 안내합니다.", items: ["탄력과 볼륨", "콜라겐 프로그램", "상담 안내"] },
    { name: "스킨 부스터", file: "booster.html", img: "/cases/yewon/page-booster.webp", desc: "수분감과 탄력, 피부결 등 고민별 스킨 부스터 정보를 살펴봅니다.", items: ["피부 상태", "부스터 프로그램", "진료 안내"] },
    { name: "바디 프로그램", file: "body.html", img: "/cases/yewon/page-body.webp", desc: "체형과 탄력, 부위별 고민에 맞춘 바디 케어를 소개합니다.", items: ["체형 변화", "바디 케어", "프로그램 안내"] },
    { name: "메디컬 칼럼", file: "column.html", img: "/cases/yewon/page-column.webp", desc: "피부와 시술 관련 글을 목록에서 살펴보고 검색할 수 있습니다.", items: ["칼럼 목록", "검색", "진료 시간"] },
    { name: "이벤트 · 공지", file: "events.html", img: "/cases/yewon/page-events.webp", desc: "이벤트와 공지 게시글을 분류와 목록으로 확인합니다.", items: ["이벤트", "공지", "게시글 목록"] },
    { name: "예약 · 진료 안내", file: "reservation.html", img: "/cases/yewon/page-reservation.webp", desc: "상담 방법과 진료 시간, 위치와 주차 정보를 모았습니다.", items: ["전화 상담", "상담 및 예약", "진료 시간 · 오시는 길"] },
    { name: "개인정보 안내", file: "privacy.html", img: "/cases/yewon/page-privacy.webp", desc: "개인정보의 수집 항목과 이용 목적, 보호 안내를 읽을 수 있습니다.", items: ["수집 항목", "이용 목적", "보호 안내"] },
    { name: "비급여 안내", file: "fees.html", img: "/cases/yewon/page-fees.webp", desc: "일반 진료와 제증명 발급 등에 관한 비용표를 보여 줍니다.", items: ["일반 진료", "제증명 발급", "진료 시간 · 위치"] },
  ],
  points: [
    { title: "시그니처 케어를 한 화면에서", body: "풀페이스 필러와 밸런스 리프팅을 각각의 설명과 함께 확인합니다.", items: ["얼굴 볼륨 안내", "리프팅 정보", "상담 경로"], img: "/cases/yewon/point-signature.webp", caption: "시그니처 케어" },
    { title: "피부 프로그램을 따로 안내", body: "콜라겐 부스팅과 스킨 부스터, 바디 프로그램을 별도 페이지에서 살펴볼 수 있습니다.", items: ["콜라겐 프로그램", "스킨 부스터", "바디 케어"], img: "/cases/yewon/point-collagen.webp", caption: "콜라겐 프로그램" },
    { title: "상담 경로와 진료 시간을 함께", body: "예약 화면에서 전화와 상담 안내, 요일별 진료 시간과 위치 정보를 확인합니다.", items: ["전화 상담", "상담 안내", "진료 시간"], img: "/cases/yewon/point-booking.webp", caption: "예약 · 진료 안내" },
    { title: "비급여 비용을 표로 확인", body: "일반 진료와 서류 발급 항목을 종류와 비용으로 나누어 보여 줍니다.", items: ["진료 상담", "진단서", "진료기록 사본"], img: "/cases/yewon/point-fees.webp", caption: "비급여 진료비용" },
  ],
  detailsLabel: "이용 안내",
  detailsTitle: "진료와 방문에 필요한 정보를 모았습니다",
  details: [
    { title: "프로그램별 진료 정보", body: "얼굴 시그니처 케어와 피부 · 웰니스 · 바디 프로그램을 주제별 화면에서 살펴봅니다." },
    { title: "상담과 방문 준비", body: "상담 경로, 진료 시간, 주소와 주차 안내를 예약 화면에서 확인합니다." },
    { title: "비용과 개인정보", body: "비급여 비용표와 개인정보 안내를 각각의 메뉴에서 읽을 수 있습니다." },
  ],
  mobile: {
    title: "휴대폰 화면에서도 안내를 이어갑니다",
    body: "작은 화면에서도 첫 화면과 의원 소개, 시그니처 케어, 예약 정보를 차례로 볼 수 있습니다.",
    shots: [
      { img: "/cases/yewon/m-index.webp", caption: "홈" },
      { img: "/cases/yewon/m-about.webp", caption: "의원 소개" },
      { img: "/cases/yewon/m-signature.webp", caption: "시그니처 케어" },
      { img: "/cases/yewon/m-reservation.webp", caption: "예약 안내" },
    ],
  },
  faq: [
    { q: "어떤 진료 정보를 볼 수 있나요?", a: "시그니처 케어와 피부 · 웰니스 · 바디 프로그램을 주제별 페이지에서 확인할 수 있습니다." },
    { q: "상담과 예약 정보는 어디에 있나요?", a: "예약 · 진료 안내 화면에 상담 방법, 진료 시간과 오시는 길이 정리되어 있습니다." },
    { q: "비급여 비용도 확인할 수 있나요?", a: "비급여 안내 화면에서 일반 진료와 제증명 발급 비용을 표로 살펴볼 수 있습니다." },
    { q: "의원 소개에는 어떤 내용이 있나요?", a: "의원 소개 화면에서 진료 철학, 의료진과 공간을 확인할 수 있습니다." },
  ],
};

export default study;
