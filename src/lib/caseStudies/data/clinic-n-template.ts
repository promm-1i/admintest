import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "온리움비뇨의학과",
  headline: "세부 진료와 검사 과정을 깊게 안내하는 비뇨의학과 홈페이지",
  summary:
    "전립선, 요로결석, 배뇨장애와 남녀 비뇨기질환을 분야별로 나누고 의료진 · 검사 · 치료 과정 · 비급여 · 예약과 상담 · 지점 안내를 폭넓게 담은 비뇨의학과 홈페이지입니다.",
  brandColor: "rgb(16,47,53)",
  tintColor: "rgb(231,238,240)",
  overview:
    "온리움비뇨의학과는 증상과 검사, 치료 과정을 환자가 순서대로 이해할 수 있도록 안내합니다.\n\n메인은 세 장의 알림 팝업과 전체 메뉴, 주요 클리닉 안내, 의료진과 진료 원칙, 예약 · 상담 · 오시는 길로 이어집니다. 전립선, 요로결석, 성병, 배뇨장애, 남성 · 여성 비뇨질환은 각각 독립된 상세 화면으로 구성했습니다.\n\nAI 검색은 입력한 증상과 관련된 안내 링크를 찾아 보여 주며, 예약과 상담 양식은 입력 내용을 확인한 뒤 접수 상태를 안내합니다.",
  meta: [
    { label: "업종", value: "비뇨의학과 · 전립선 · 요로결석 · 배뇨장애 · 남녀 비뇨기질환" },
    { label: "페이지 구성", value: "메인, 병원 소개, 의료진, 6개 진료군 상세, 진료 사례와 건강 정보, 자가진단, 비급여, 예약 · 상담, 지점 안내" },
    { label: "이런 곳에 맞습니다", value: "세부 진료 분야가 많은 비뇨의학과, 검사와 치료 과정을 충분히 설명하려는 의원, 여러 진료실이나 지점을 함께 안내하는 의료기관" },
  ],
  mainShot: "/cases/clinic-n/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "대표 화면",
  pages: [
    { name: "메인", file: "index.html", img: "/cases/clinic-n/page-index.webp", desc: "알림 팝업과 주요 진료군, 의료진, 진료 원칙과 방문 안내가 긴 화면으로 이어집니다.", items: ["세 장 알림 팝업", "주요 클리닉 · 의료진", "예약 · 상담 · 오시는 길"] },
    { name: "전립선 클리닉", file: "prostate-bph.html", img: "/cases/clinic-n/page-prostate-bph.webp", desc: "증상과 검사, 치료 선택 기준을 단계별로 설명하는 대표 진료 상세입니다.", items: ["증상 · 검사 안내", "치료 선택 기준"] },
    { name: "요로결석 클리닉", file: "stone-urinary-stone.html", img: "/cases/clinic-n/page-stone-urinary-stone.webp", desc: "결석의 원인과 진단, 치료 방법을 한 흐름으로 안내합니다.", items: ["진단 과정", "치료 방법 비교"] },
    { name: "여성 비뇨질환", file: "female-cystitis.html", img: "/cases/clinic-n/page-female-cystitis.webp", desc: "여성 환자가 자주 묻는 증상과 검사 내용을 별도 진료 화면으로 구성했습니다.", items: ["증상별 설명", "검사 · 진료 흐름"] },
    { name: "의료진", file: "doctor-1.html", img: "/cases/clinic-n/page-doctor-1.webp", desc: "의료진의 진료 분야와 약력, 진료 원칙을 소개합니다.", items: ["진료 분야", "약력 · 진료 철학"] },
    { name: "비급여 안내", file: "support-pricing.html", img: "/cases/clinic-n/page-support-pricing.webp", desc: "검사와 처치 항목을 표로 정리해 비용 정보를 확인할 수 있습니다.", items: ["항목별 비용", "모바일 표 배치"] },
    { name: "온라인 예약", file: "reserve-form-2.html", img: "/cases/clinic-n/page-reserve-form-2.webp", desc: "필수 입력과 개인정보 동의를 확인한 뒤 예약 절차를 안내합니다.", items: ["입력값 확인", "완료 안내"] },
    { name: "오시는 길", file: "location.html", img: "/cases/clinic-n/page-location.webp", desc: "주소와 교통편, 진료시간을 지점 안내 형태로 보여 줍니다.", items: ["위치 안내 패널", "교통편 · 진료시간"] },
  ],
  points: [
    { title: "진료 분야를 한눈에", body: "전립선부터 여성 비뇨질환까지 큰 진료군과 세부 항목을 전체 메뉴와 카드에 같은 순서로 배치했습니다.", items: ["6개 진료군", "전체 메뉴와 상세 연결"], img: "/cases/clinic-n/point-clinics.webp", caption: "메인 — 클리닉 안내" },
    { title: "의료진과 진료 원칙", body: "의료진 소개와 진료 원칙을 충분한 여백과 큰 타이포그래피로 이어 환자가 중요한 정보를 천천히 읽도록 구성했습니다.", items: ["의료진 카드", "검사 · 치료 원칙"], img: "/cases/clinic-n/point-doctors.webp", caption: "메인 — 의료진" },
    { title: "증상에서 치료까지", body: "상세 화면은 증상, 검사, 치료 방법과 주의사항 순서로 반복되는 정보 구조를 사용합니다.", items: ["단계형 설명", "관련 진료 바로가기"], img: "/cases/clinic-n/point-system.webp", caption: "메인 — 진료 체계" },
    { title: "예약과 방문 정보", body: "예약 · 상담 양식과 지점별 진료시간, 교통편을 사이트 곳곳에서 바로 찾을 수 있게 연결했습니다.", items: ["정적 예약 · 상담", "지점 안내"], img: "/cases/clinic-n/point-information.webp", caption: "메인 — 방문 정보" },
  ],
  detailsLabel: "자세히",
  detailsTitle: "주요 안내 내용",
  details: [
    { title: "운영 정보에 맞춘 구성", body: "병원명, 의료진, 주소, 연락처와 진료 사례를 기관의 운영 정보에 맞춰 관리할 수 있습니다." },
    { title: "상표 대신 일반 명칭", body: "치료법과 장비 상표는 원리와 기능을 설명하는 일반 명칭으로 바꿨습니다." },
    { title: "주요 화면 동작", body: "알림 팝업의 오늘 하루 보지 않기, 전체 메뉴, 탭, 입력 확인과 오류 상태를 데스크톱과 모바일에서 제공합니다." },
    { title: "진료 안내 이미지", body: "진료 공간과 의료진, 안내 자료를 화면 비율에 맞춰 배치하고 각 화면의 설명을 함께 제공합니다." },
  ],
  mobile: {
    title: "모바일에서도 긴 진료 정보를 단계별로 읽습니다",
    body: "전체 메뉴는 터치로 열리고 진료 카드와 표는 화면 폭에 맞춰 재배치됩니다. 예약 입력과 위치 안내도 한 줄씩 내려 읽도록 구성했습니다.",
    shots: [
      { img: "/cases/clinic-n/m-index.webp", caption: "메인" },
      { img: "/cases/clinic-n/m-prostate-bph.webp", caption: "전립선 클리닉" },
      { img: "/cases/clinic-n/m-reserve-form-2.webp", caption: "온라인 예약" },
      { img: "/cases/clinic-n/m-location.webp", caption: "오시는 길" },
      { img: "/cases/clinic-n/m-treatment-cases.webp", caption: "진료 사례" },
    ],
  },
  faq: [
    { q: "병원 운영 정보에 맞춰 구성할 수 있나요?", a: "네. 병원명, 로고, 의료진, 주소, 진료시간과 진료 항목을 운영 정보에 맞춰 구성할 수 있습니다." },
    { q: "필요하지 않은 진료 상세를 뺄 수 있나요?", a: "네. 현재의 정보 구조를 유지하면서 운영하는 진료 분야만 남기고 순서를 조정할 수 있습니다." },
    { q: "예약과 상담이 접수되나요?", a: "입력 내용을 확인한 뒤 접수 상태를 안내합니다. 운영 환경에서는 메일, 관리자 화면 또는 예약 시스템으로 연결할 수 있습니다." },
    { q: "AI 검색이 진단을 하나요?", a: "아닙니다. 검색 결과는 관련 안내 링크를 제공하며 의료진의 진단을 대신하지 않습니다." },
  ],
};

export default study;
