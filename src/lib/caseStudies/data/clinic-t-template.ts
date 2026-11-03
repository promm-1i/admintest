import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "누비아 여성의원",
  headline: "난임 · 여성의원 홈페이지",
  summary: "난임 진료와 여성 건강 정보를 살펴보고 상담과 예약 안내로 이어지는 홈페이지입니다.",
  brandColor: "rgb(108, 71, 145)",
  tintColor: "rgb(244, 240, 248)",
  overview: "시험관 시술과 인공수정, 가임력 보존, 여성검진 정보를 각각의 진료 화면에서 확인할 수 있습니다. 의료진과 진료시간, 검사 안내를 비롯해 상담 · 예약, 사례와 공지, 비급여 및 증명서 안내도 제공합니다.",
  meta: [
    { label: "업종", value: "난임 · 여성의원" },
    { label: "화면", value: "진료 안내 · 검사 · 의료진 · 상담 · 예약 · 게시판" },
    { label: "주요 정보", value: "시험관 · 인공수정 · 가임력 보존 · 여성검진" },
  ],
  mainShot: "/cases/nuvia/main.webp",
  pagesLabel: "화면 안내",
  pagesTitle: "필요한 진료 정보를 골라 살펴보세요",
  pages: [
    { name: "홈", file: "index.html", img: "/cases/nuvia/page-index.webp", desc: "주요 진료 안내와 상담 경로를 한눈에 확인합니다.", items: ["시험관 · 인공수정", "진료시간 · 의료진", "상담 안내"] },
    { name: "의료진", file: "doctors.html", img: "/cases/nuvia/page-doctors.webp", desc: "의료진 소개와 진료 정보를 살펴봅니다.", items: ["의료진 카드", "진료 분야", "진료시간 안내"] },
    { name: "난임 검사", file: "checkup.html", img: "/cases/nuvia/page-checkup.webp", desc: "검사와 배양 관련 안내를 확인합니다.", items: ["검사 안내", "연구실 정보", "자주 묻는 질문"] },
    { name: "상담", file: "consultation.html", img: "/cases/nuvia/page-consultation.webp", desc: "상담 전 확인할 사항과 문의 방법을 살펴봅니다.", items: ["상담 절차", "방문 준비", "문의 안내"] },
    { name: "가임력 보존", file: "preservation.html", img: "/cases/nuvia/page-preservation.webp", desc: "가임력 보존 진료에 관한 정보를 확인합니다.", items: ["보존 진료 안내", "관련 정보", "상담 연결"] },
    { name: "사례", file: "cases.html", img: "/cases/nuvia/page-cases.webp", desc: "사례 게시판에서 글 목록과 상세 내용을 확인합니다.", items: ["사례 목록", "페이지 이동", "상세 화면"] },
  ],
  points: [
    { title: "진료별 안내", body: "시험관, 인공수정, 가임력 보존과 여성검진 정보를 각각의 화면에서 살펴볼 수 있습니다.", items: ["시험관 · 인공수정", "가임력 보존", "여성검진"], img: "/cases/nuvia/point-treatment.webp", caption: "진료 안내" },
    { title: "상담과 예약", body: "온라인 상담과 진료 예약 화면에서 문의 및 방문 안내를 확인할 수 있습니다.", items: ["상담 안내", "온라인 상담", "진료 예약"], img: "/cases/nuvia/point-consultation.webp", caption: "상담 · 예약 안내" },
    { title: "게시판과 이용 정보", body: "사례와 공지, 비급여 진료비, 증명서 발급 안내를 별도 화면으로 제공합니다.", items: ["사례 · 공지", "비급여 안내", "증명서 안내"], img: "/cases/nuvia/point-information.webp", caption: "게시판 · 이용 정보" },
  ],
  detailsLabel: "이용 안내",
  detailsTitle: "진료 정보를 화면별로 확인할 수 있습니다",
  details: [
    { title: "검사 정보를 살펴보세요", body: "검사 안내와 난임연구실 관련 정보를 각 화면에서 확인할 수 있습니다." },
    { title: "방문 정보를 확인하세요", body: "진료시간, 의료진, 상담과 예약 안내를 방문 전에 살펴볼 수 있습니다." },
    { title: "게시판과 발급 안내", body: "사례와 공지 목록, 비급여 진료비와 증명서 안내가 마련되어 있습니다." },
  ],
  mobile: { title: "모바일에서도 진료 안내를 살펴보세요", body: "진료와 이용 정보를 화면별로 나누어 작은 화면에서도 순서대로 확인할 수 있습니다.", shots: [{ img: "/cases/nuvia/m-index.webp", caption: "홈" }, { img: "/cases/nuvia/m-doctors.webp", caption: "의료진" }, { img: "/cases/nuvia/m-consultation.webp", caption: "상담" }, { img: "/cases/nuvia/m-preservation.webp", caption: "가임력 보존" }] },
  faq: [
    { q: "어떤 진료 정보를 볼 수 있나요?", a: "시험관 시술, 인공수정, 가임력 보존과 여성검진 관련 안내를 확인할 수 있습니다." },
    { q: "방문 전 어떤 정보를 확인하면 되나요?", a: "진료시간과 의료진 안내를 확인하고 상담 또는 예약 화면에서 방문 관련 내용을 살펴보세요." },
  ],
};

export default study;
