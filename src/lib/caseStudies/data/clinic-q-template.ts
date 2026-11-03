import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "시야안과",
  headline: "눈의 변화를 이해하고 진료를 준비하는 안과 홈페이지",
  summary: "망막과 백내장·노안, 근시, 건성안, 녹내장과 안종합검진을 분야별로 안내합니다. 질환 설명에서 검사와 치료 과정으로 이어지고, 의료진과 장비, 병원 공간을 함께 살펴볼 수 있습니다.",
  brandColor: "#17685d",
  tintColor: "#eff7f5",
  overview: "첫 화면에서는 진료 분야 카드와 병원의 진료 기준, 수술 장비와 후기, 소식을 차례로 살펴보고 바닥에서 위치와 진료시간을 확인합니다.\n\n질환 페이지는 정의와 원인, 증상, 치료 방법을 순서대로 설명합니다. 증상 확인 목록과 자가테스트, 펼쳐 읽는 질문으로 궁금한 내용을 찾아봅니다.",
  meta: [
    { label: "업종", value: "안과 · 망막 · 백내장 · 근시 · 건성안 · 녹내장" },
    { label: "주요 구성", value: "병원 소개 · 진료 분야 · 안종합검진 · 고객지원" },
  ],
  mainShot: "/cases/siyaretina/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "찾고 싶은 정보를 진료 분야별로",
  pages: [
    { name: "메인", file: "index.html", img: "/cases/siyaretina/page-index.webp", desc: "진료 분야 카드, 진료 기준, 수술 장비와 후기, 소식을 한 흐름으로 살펴봅니다.", items: ["진료 분야 슬라이드", "수술 장비 안내", "진료 후기"] },
    { name: "병원 소개", file: "about_clinic.html", img: "/cases/siyaretina/page-about_clinic.webp", desc: "환자를 대하는 진료 기준과 검사·수술 환경을 소개합니다.", items: ["진료 원칙", "검사와 수술 환경"] },
    { name: "망막 진료", file: "retina_macular-degeneration.html", img: "/cases/siyaretina/page-retina_macular-degeneration.webp", desc: "질환의 원인과 증상, 치료 방법을 순서대로 설명하고 자주 묻는 질문을 펼쳐 읽습니다.", items: ["증상 확인", "자가테스트", "자주 묻는 질문"] },
    { name: "장비 소개", file: "about_equipment.html", img: "/cases/siyaretina/page-about_equipment.webp", desc: "검사와 치료에 쓰이는 장비를 사진과 함께 소개합니다.", items: ["장비 사진", "용도와 검사 설명"] },
    { name: "병원 둘러보기", file: "about_tour.html", img: "/cases/siyaretina/page-about_tour.webp", desc: "작은 사진을 선택해 진료 공간을 크게 둘러봅니다.", items: ["썸네일 선택", "공간별 사진"] },
  ],
  points: [
    { title: "설명을 따라 이해하는 진료 정보", body: "정의와 원인, 증상과 치료 방법을 단계적으로 읽을 수 있습니다. 증상 확인 목록과 자가테스트로 지금 눈 상태를 살펴봅니다.", items: ["증상 확인 목록", "자가테스트"], img: "/cases/siyaretina/point-info.webp", caption: "황반변성 안내의 증상 확인" },
    { title: "병원의 공간을 사진으로", body: "입구부터 검사실까지 공간별 사진을 넘겨 보며 방문 전에 진료 환경을 확인합니다.", items: ["공간 갤러리", "썸네일 이동"], img: "/cases/siyaretina/point-tour.webp", caption: "병원 둘러보기" },
  ],
  detailsLabel: "상세 내용",
  detailsTitle: "방문 전 필요한 정보를 찾는 흐름",
  details: [
    { title: "공지와 진료 일정", body: "고객지원에서 공지 목록을 검색하고, 첫 화면 알림 창에서 월별 진료 안내를 확인합니다." },
    { title: "필요한 안내로 이어지는 메뉴", body: "넓은 화면에서는 전체 메뉴를 펼쳐 보고, 모바일에서는 진료 분야별 하위 항목을 열어 이동합니다." },
    { title: "공통 약관 안내", body: "모든 화면의 바닥글에서 이용약관, 개인정보처리방침, 환자의 권리와 의무를 창으로 열어 읽고 비급여진료비 안내로 이동합니다." },
  ],
  mobile: {
    title: "작은 화면에서도 이어지는 진료 안내",
    body: "질환 설명과 사진, 병원 이용 정보를 화면 폭에 맞춰 읽을 수 있습니다.",
    shots: [
      { img: "/cases/siyaretina/m-index.webp", caption: "모바일 메인" },
      { img: "/cases/siyaretina/m-retina.webp", caption: "모바일 황반변성 안내" },
    ],
  },
  faq: [
    { q: "어떤 진료 분야를 안내하나요?", a: "망막 질환과 백내장·노안, 근시, 건성안, 녹내장과 안종합검진을 안내합니다." },
    { q: "병원 공간도 확인할 수 있나요?", a: "병원 둘러보기에서 작은 사진을 선택해 공간별 사진을 크게 볼 수 있습니다." },
  ],
};

export default study;
