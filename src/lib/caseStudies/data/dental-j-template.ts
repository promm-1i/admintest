import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "말끔치과",
  headline: "진료 분야와 병원 정보를 함께 살펴보는 치과 홈페이지",
  summary: "임플란트·치아 보존·심미 진료 안내에서 의료진, 진료 공간, 상담 문의로 이어집니다.",
  brandColor: "#514638",
  tintColor: "#F1EDE8",
  overview: "첫 화면에서 층별 공간과 주요 진료 분야를 살펴보고, 원하는 진료 안내로 이동할 수 있습니다.\n\n임플란트와 투명교정, 심미·보존 진료 화면에서는 치료 대상과 과정, 관리 방법을 확인합니다. 의료진 소개와 진료 공간, 장비 안내도 사진과 함께 볼 수 있습니다.\n\n공지와 진료시간, 오시는 길에서 병원 이용 정보를 찾을 수 있습니다. 상담 문의 화면에서는 필요한 내용을 작성하고 개인정보 동의 항목을 확인할 수 있습니다.",
  meta: [
    { label: "업종", value: "치과 홈페이지" },
    { label: "페이지 구성", value: "첫 화면 · 진료 분야 · 의료진 · 병원 소개 · 공지 · 오시는 길 · 상담 문의" },
    { label: "이런 곳에 맞습니다", value: "여러 진료 분야와 의료진, 병원 이용 정보를 한 곳에서 안내하려는 치과" },
  ],
  mainShot: "/cases/malkkeum/main.webp",
  pagesLabel: "주요 화면",
  pagesTitle: "진료 안내와 병원 소개를 분야별로",
  pages: [
    { name: "메인", file: "index.html", img: "/cases/malkkeum/main.webp", desc: "층별 공간과 주요 진료 분야를 보여주는 첫 화면", items: ["층별 공간", "진료 분야", "의료진"] },
    { name: "디지털 임플란트", file: "digital.html", img: "/cases/malkkeum/digital.webp", desc: "검사와 치료 계획, 관리 과정을 설명하는 진료 화면", items: ["검사 자료", "치료 과정", "진료 안내"] },
    { name: "투명교정", file: "clear-aligner.html", img: "/cases/malkkeum/clear-aligner.webp", desc: "장치의 제작 방식과 착용·관리 내용을 안내", items: ["장치 안내", "진료 대상", "자주 묻는 질문"] },
    { name: "의료진", file: "doctors.html", img: "/cases/malkkeum/doctors.webp", desc: "의료진 소개에서 개별 약력과 진료 일정으로 이동", items: ["의료진 소개", "약력", "진료 일정"] },
    { name: "진료 공간", file: "facilities.html", img: "/cases/malkkeum/facilities.webp", desc: "접수·대기·상담·촬영·기공 공간을 사진으로 확인", items: ["접수와 대기", "개별 진료실", "기공 공간"] },
    { name: "상담 문의", file: "inquiry.html", img: "/cases/malkkeum/inquiry.webp", desc: "문의할 내용과 연락 정보를 입력하는 상담 화면", items: ["상담 내용", "연락 정보", "동의 항목"] },
  ],
  points: [
    { title: "층별 공간을 보여주는 첫 화면", body: "스크롤에 따라 건물의 층별 구성이 펼쳐지고, 각 공간과 주요 진료 안내를 차례로 볼 수 있습니다.", items: ["스크롤 장면", "층별 공간 안내"], img: "/cases/malkkeum/main.webp", caption: "메인 — 층별 공간 안내" },
    { title: "진료 항목마다 이어지는 상세 안내", body: "진료의 대상과 과정, 관리 방법을 섹션별로 배치했습니다. 투명교정 화면에서는 장치 안내와 자주 묻는 질문을 함께 읽을 수 있습니다.", items: ["진료 과정", "관리 안내", "자주 묻는 질문"], img: "/cases/malkkeum/clear-aligner.webp", caption: "투명교정 — 장치와 진료 안내" },
    { title: "공간과 장비를 사진으로 확인", body: "입구와 대기실부터 개별 진료실, 촬영실, 기공 작업 공간까지 살펴볼 수 있습니다. 장비 화면에서는 각 장비의 용도도 볼 수 있습니다.", items: ["공간별 사진", "진료 장비 안내"], img: "/cases/malkkeum/facilities.webp", caption: "병원 소개 — 진료 공간" },
  ],
  details: [
    { title: "상단 메뉴와 화면별 이동 메뉴", body: "병원 소개와 진료 분류를 상단에서 선택하고, 상세 화면의 이동 메뉴로 다른 항목을 확인할 수 있습니다." },
    { title: "의료진 소개와 진료 일정", body: "의료진 목록에서 개별 소개로 이동하면 약력과 진료 요일, 시간 안내를 확인할 수 있습니다." },
    { title: "개인정보와 비용 안내", body: "바닥글에서 개인정보처리방침과 이용약관을 열고, 비급여 항목은 별도의 표로 살펴볼 수 있습니다." },
  ],
  mobile: {
    title: "휴대폰에서는 전체 메뉴로 항목 선택",
    body: "분류를 펼쳐 진료 항목을 찾고, 사진과 설명을 화면 폭에 맞춰 읽을 수 있습니다.",
    shots: [
      { img: "/cases/malkkeum/mobile-main.webp", caption: "메인" },
      { img: "/cases/malkkeum/mobile-menu.webp", caption: "전체 메뉴" },
      { img: "/cases/malkkeum/mobile-facilities.webp", caption: "진료 공간" },
    ],
  },
  faq: [
    { q: "병원 소개와 진료 안내를 나누어 볼 수 있나요?", a: "상단 메뉴에서 병원 소개와 진료 분류를 선택할 수 있습니다. 의료진, 진료 공간, 장비와 각 진료의 상세 안내가 구분되어 있습니다." },
    { q: "휴대폰에서도 하위 메뉴를 열 수 있나요?", a: "전체 메뉴에서 분류를 누르면 하위 항목이 펼쳐집니다. 원하는 항목을 선택하면 해당 화면으로 이동합니다." },
    { q: "약관과 비급여 항목은 어디에서 확인하나요?", a: "바닥글의 개인정보처리방침, 이용약관, 비급여수가 안내를 선택하면 각 내용을 확인할 수 있습니다." },
  ],
};

export default study;
