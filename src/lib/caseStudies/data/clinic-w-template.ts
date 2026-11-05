import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "온결한의원",
  headline: "리프팅 · 피부 · 체질 · 체중 진료와 여러 지점을 함께 안내하는 한의원 홈페이지",
  summary:
    "리프팅, 피부, 8체질, 체중과 체형 관리 진료를 항목별로 나누고 지점 소개, 지점별 진료 비용, 예약 안내, 소식까지 한 사이트에서 찾을 수 있게 구성한 한의원 홈페이지입니다.",
  brandColor: "rgb(120,129,109)",
  tintColor: "rgb(239,235,226)",
  overview:
    "온결한의원은 피부와 체형, 체질을 상담으로 함께 살피는 한의원입니다.\n\n메인은 큰 영상 화면에서 시작해 네 가지 진료 분야, 대표 리프팅 진료, 8체질 진료, 진료 기기와 진료 공간, 상담 문의로 이어집니다.\n\n진료 상세는 리프팅 · 피부 · 체중 · 체질 · 체형 교정 항목마다 따로 있고, 각 화면은 진료 소개, 진행 방식, 진료 후 경과, 진료 전에 알려 줄 내용 순서로 읽힙니다. 지점은 소개 화면과 진료 비용 화면을 지점마다 나눠 두었고, 화면 오른쪽 빠른 메뉴에서 메신저 상담, 예약 문의, 진료 비용으로 바로 이동합니다.",
  meta: [
    { label: "업종", value: "한의원 · 리프팅 · 피부 · 8체질 · 체중과 체형 관리" },
    { label: "페이지 구성", value: "메인, 진료 상세(리프팅 · 피부 · 체중 · 체질 · 체형 교정), 지점 소개, 지점별 진료 비용, 진료 예약, 소식 · 이벤트, 이용약관 · 개인정보처리방침" },
    { label: "이런 곳에 맞습니다", value: "리프팅과 피부 진료를 함께 하는 한의원, 체질 상담과 체중 관리를 운영하는 한의원, 여러 지점을 하나의 사이트로 안내하려는 의료기관" },
  ],
  mainShot: "/cases/onur/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "진료 항목에서 지점 정보까지 이어집니다",
  pages: [
    { name: "메인", file: "index.html", img: "/cases/onur/page-index.webp", desc: "영상 첫 화면에서 진료 분야, 대표 진료, 체질 진료, 진료 공간과 상담 문의로 이어지는 긴 화면입니다.", items: ["영상 첫 화면", "진료 분야 카드", "상담 문의"] },
    { name: "리프팅 진료", file: "lifting-oligio.html", img: "/cases/onur/page-lifting-oligio.webp", desc: "상담할 수 있는 고민과 진행 방식, 기기의 주요 기능, 진료 후 경과를 한 흐름으로 설명합니다.", items: ["진행 방식", "기기 기능", "진료 후 경과"] },
    { name: "피부 진료", file: "skin-clarity.html", img: "/cases/onur/page-skin-clarity.webp", desc: "레이저 진료의 특징과 대상, 관리 과정을 큰 사진과 함께 안내합니다.", items: ["진료 특징", "대상 · 과정"] },
    { name: "체중 관리 한약", file: "diet-custom-premium-herb.html", img: "/cases/onur/page-diet-custom-premium-herb.webp", desc: "상담에서 처방까지의 과정과 복용 중 확인할 내용을 정리했습니다.", items: ["상담 과정", "복용 안내"] },
    { name: "8체질 안내", file: "constitution-8-constitution-about.html", img: "/cases/onur/page-constitution-8-constitution-about.webp", desc: "여덟 가지 체질의 특징을 유형별로 나눠 원하는 유형을 골라 볼 수 있습니다.", items: ["유형별 특징", "유형 선택"] },
    { name: "지점 소개", file: "about-yangsan.html", img: "/cases/onur/page-about-yangsan.webp", desc: "지점마다 진료 방식과 진료 공간, 위치를 한 화면에 담았습니다.", items: ["진료 방식", "진료 공간", "위치"] },
    { name: "지점별 진료 비용", file: "prices-yangsan.html", img: "/cases/onur/page-prices-yangsan.webp", desc: "지점 버튼으로 바꿔 가며 진료 비용과 대표 연락처를 확인합니다.", items: ["지점 버튼", "비용 표", "대표 연락처"] },
    { name: "진료 예약", file: "facilities-reservation.html", img: "/cases/onur/page-facilities-reservation.webp", desc: "진료 항목과 지점별 운영 시간을 확인하고 예약 방법을 안내합니다.", items: ["항목 검색", "예약 안내"] },
  ],
  points: [
    { title: "네 가지 진료 분야", body: "리프팅, 피부 · 색소, 체중 관리, 체질 진료를 큰 사진 카드로 나누고 각 카드에서 바로 상세 진료로 들어갑니다.", items: ["사진 카드", "상세 진료 연결"], img: "/cases/onur/point-programs.webp", caption: "메인 — 진료 분야" },
    { title: "대표 진료를 크게", body: "얼굴선 리프팅처럼 많이 찾는 진료는 인물 사진과 짧은 설명으로 따로 보여 줍니다.", items: ["대표 진료 소개", "더 살펴보기"], img: "/cases/onur/point-lifting.webp", caption: "메인 — 얼굴선 리프팅" },
    { title: "8체질 진료", body: "네 가지 자연 이미지로 체질 유형을 나눠 보여 주고, 체질 안내와 체질별 생활표로 이어집니다.", items: ["체질 유형", "체질 안내 연결"], img: "/cases/onur/point-constitution.webp", caption: "메인 — 8체질 진료" },
    { title: "진료 공간", body: "상담실과 대기 공간 사진을 큰 화면과 작은 화면으로 나눠 배치해 방문 전 분위기를 살펴볼 수 있습니다.", items: ["공간 사진", "더 살펴보기"], img: "/cases/onur/point-space.webp", caption: "메인 — 진료 공간" },
  ],
  detailsLabel: "자세히",
  detailsTitle: "주요 안내 내용",
  details: [
    { title: "운영 정보에 맞춘 구성", body: "한의원 이름, 지점, 의료진, 주소, 연락처와 진료 비용을 운영 정보에 맞춰 바꿀 수 있습니다." },
    { title: "장비 이름 대신 원리", body: "리프팅 · 피부 진료 기기는 상표 대신 고주파, 초음파, 레이저처럼 원리와 기능으로 설명합니다." },
    { title: "지점별로 나눈 정보", body: "지점 소개와 진료 비용을 지점마다 따로 두고, 위쪽 지점 버튼으로 다른 지점 화면으로 옮겨 갑니다." },
    { title: "빠른 메뉴", body: "화면 오른쪽 빠른 메뉴에서 메신저 상담, 예약 문의, 진료 비용으로 바로 이동하고, 모바일에서는 화면 아래로 옮겨집니다." },
  ],
  mobile: {
    title: "모바일에서도 진료와 지점 정보를 한 손으로 찾습니다",
    body: "전체 메뉴는 터치로 열리고 진료 카드와 비용 표는 화면 폭에 맞춰 내려 읽도록 바뀝니다. 빠른 메뉴는 화면 아래에 고정됩니다.",
    shots: [
      { img: "/cases/onur/m-index.webp", caption: "메인" },
      { img: "/cases/onur/m-lifting-oligio.webp", caption: "리프팅 진료" },
      { img: "/cases/onur/m-about-yangsan.webp", caption: "지점 소개" },
      { img: "/cases/onur/m-prices-yangsan.webp", caption: "지점별 진료 비용" },
    ],
  },
  faq: [
    { q: "지점 수에 맞춰 바꿀 수 있나요?", a: "네. 지점 소개와 진료 비용 화면을 운영하는 지점 수에 맞춰 늘리거나 줄일 수 있습니다." },
    { q: "운영하지 않는 진료는 뺄 수 있나요?", a: "네. 진료 분야와 상세 화면 구성을 유지하면서 운영하는 진료만 남기고 순서를 조정할 수 있습니다." },
    { q: "진료 비용은 어디서 확인하나요?", a: "지점별 진료 비용 화면과 화면 오른쪽 빠른 메뉴의 진료 비용에서 확인할 수 있습니다." },
    { q: "예약이 바로 접수되나요?", a: "예약 안내 화면에서 항목과 방법을 확인합니다. 운영 환경에서는 전화, 메신저 상담이나 예약 시스템으로 연결할 수 있습니다." },
  ],
};

export default study;
