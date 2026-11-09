import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "클리어뷰 안과",
  headline: "시력교정 정보를 차분하게 탐색하는 안과 홈페이지",
  summary: "검진과 시력교정 정보를 단계적으로 살펴보고 상담으로 이어지도록 구성한 병원 웹사이트 사례입니다.",
  brandColor: "rgb(31, 92, 119)",
  tintColor: "rgb(10, 28, 39)",
  mobileDark: false,
  overview: "시력교정과 안과 검진을 찾는 이용자가 필요한 정보를 빠르게 찾도록 진료 범주와 병원 소개를 정리했습니다. 첫 화면에서는 주요 안내와 상담 동선을 분명하게 보여주고, 소개 화면에서는 병원의 기준과 진료 환경을 이어서 확인할 수 있게 했습니다.",
  meta: [
    { label: "업종", value: "병원 · 안과 · 시력교정" },
    { label: "페이지 구성", value: "메인 · 병원 소개 · 진료 안내" },
    { label: "이런 곳에 맞습니다", value: "검진과 시력교정 정보를 신뢰감 있게 전달하려는 안과" },
  ],
  mainShot: "/cases/clinic-u-template/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "진료 정보와 병원 소개를 한 흐름으로 연결했습니다",
  pages: [
    { name: "메인", file: "index.html", img: "/cases/clinic-u-template/page-index.webp", desc: "주요 진료 영역과 상담 동선을 첫 화면에서 확인할 수 있습니다.", items: ["주요 진료 안내", "검진 정보", "상담 연결"] },
    { name: "병원 소개", file: "about_brand.html", img: "/cases/clinic-u-template/page-brand.webp", desc: "병원의 진료 기준과 운영 방향을 간결하게 보여줍니다.", items: ["병원 방향", "진료 기준", "안내 콘텐츠"] },
    { name: "소개 상세", file: "about_introduce.html", img: "/cases/clinic-u-template/page-introduce.webp", desc: "진료 환경과 검사 안내를 읽기 쉬운 순서로 구성했습니다.", items: ["검사 안내", "진료 환경", "방문 전 확인"] },
  ],
  points: [
    { title: "필요한 진료 정보를 첫 화면에서 찾습니다", body: "진료 영역을 분명한 카드와 짧은 설명으로 나누어 이용자가 원하는 정보로 바로 이동하도록 했습니다.", items: ["진료 영역 구분", "짧은 설명", "상담 동선"], img: "/cases/clinic-u-template/point-main.webp", caption: "메인 화면" },
    { title: "병원의 기준을 소개 콘텐츠로 전달합니다", body: "병원 소개와 검사 안내를 별도 흐름으로 구성해 서비스의 성격과 방문 전 정보를 함께 전달합니다.", items: ["병원 소개", "검사 안내", "방문 전 정보"], img: "/cases/clinic-u-template/point-brand.webp", caption: "소개 화면" },
  ],
  detailsLabel: "자세히",
  detailsTitle: "정보를 읽는 순서까지 설계했습니다",
  details: [
    { title: "진료 영역을 단계적으로 탐색합니다", body: "메인에서 핵심 정보를 확인한 뒤 소개와 상세 안내로 자연스럽게 이어지도록 화면 구조를 정리했습니다." },
    { title: "상담으로 이어지는 버튼을 일관되게 배치합니다", body: "페이지마다 다음 행동을 찾기 쉽도록 상담과 문의 연결을 같은 원칙으로 배치했습니다." },
  ],
  mobile: { title: "작은 화면에서도 진료 정보를 놓치지 않습니다", body: "주요 카드와 소개 콘텐츠를 세로 흐름으로 재배치해 모바일에서도 읽기와 이동이 편하도록 구성했습니다.", shots: [
    { img: "/cases/clinic-u-template/m-index.webp", caption: "메인" },
    { img: "/cases/clinic-u-template/m-brand.webp", caption: "병원 소개" },
  ] },
  faq: [
    { q: "어떤 정보를 먼저 보여주나요?", a: "주요 진료 영역과 방문 전에 확인할 내용을 먼저 보여주고, 상세 소개로 이어지게 구성했습니다." },
    { q: "상담 버튼은 어디에서 확인하나요?", a: "메인과 소개 화면의 주요 구간에 일관된 상담 연결을 배치했습니다." },
  ],
};

export default study;
