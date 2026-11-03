import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "에어로비아안과",
  headline: "눈 건강 정보를 충분히 읽고 방문을 준비하는 안과 홈페이지",
  summary: "백내장, 드림렌즈, 망막·녹내장과 안구건조증을 분야별로 안내합니다. 질환의 이해부터 검사와 관리 방법까지 연결하고, 진료시간과 방문 정보를 함께 제공합니다.",
  brandColor: "#176c65",
  tintColor: "#f2f6f4",
  overview: "첫 화면에서는 주요 진료 분야와 병원의 진료 방향, 공지와 방문 정보를 순서대로 살펴볼 수 있습니다. 각 진료 페이지는 질환 설명, 증상, 검사와 관리 방법을 그림과 함께 안내하여 필요한 정보를 차근차근 읽도록 구성했습니다.\n\n장비 안내에서는 개별 장비의 사진을 선택해 용도와 관련 검사를 상세 창으로 확인할 수 있습니다. 모바일 메뉴와 진료 분야 탭, 자주 묻는 질문, 약관 창은 키보드로도 이용할 수 있습니다.",
  meta: [
    { label: "업종", value: "안과 · 백내장 · 망막 · 드림렌즈 · 안구건조증" },
    { label: "주요 구성", value: "병원 소개 · 진료 안내 · 검사 · 장비 · 진료시간 · 고객지원" },
  ],
  mainShot: "/cases/clinic-v/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "분야별로 이어지는 눈 건강 안내",
  pages: [
    { name: "메인", file: "index.html", img: "/cases/clinic-v/page-index.webp", desc: "주요 진료 분야, 진료 철학, 공지와 방문 정보를 한 흐름으로 살펴봅니다.", items: ["진료 분야 슬라이드", "병원 안내", "방문 정보"] },
    { name: "병원 소개", file: "introduction.html", img: "/cases/clinic-v/page-introduction.webp", desc: "진료에서 중요하게 여기는 설명과 선택의 과정, 병원의 공간을 소개합니다.", items: ["진료 철학", "공간 소개"] },
    { name: "정밀검사", file: "examination.html", img: "/cases/clinic-v/page-examination.webp", desc: "눈의 구조와 검사 항목, 검사 장비를 순서대로 안내합니다.", items: ["검사 항목", "장비 안내", "방문 준비"] },
    { name: "드림렌즈", file: "dreamlens.html", img: "/cases/clinic-v/page-dreamlens.webp", desc: "교정 원리와 검사·착용 과정, 관리 방법을 안내하고 자주 묻는 질문을 펼쳐 읽습니다.", items: ["교정 원리", "착용과 관리", "자주 묻는 질문"] },
    { name: "장비 안내", file: "equipment.html", img: "/cases/clinic-v/page-equipment.webp", desc: "장비 사진을 선택하면 각 장비의 용도와 검사에 관한 상세 설명을 확인합니다.", items: ["장비 목록", "상세 팝업", "키보드 조작"] },
    { name: "진료 안내", file: "medicalInformation.html", img: "/cases/clinic-v/page-medicalInformation.webp", desc: "진료시간과 상담 연락처, 방문 위치를 확인합니다.", items: ["진료시간", "연락처", "오시는 길"] },
  ],
  points: [
    { title: "설명과 그림으로 읽는 진료 정보", body: "질환의 개념부터 증상, 검사와 관리까지 원리를 이해하며 읽을 수 있도록 주제별 설명과 의료 그림을 배치했습니다.", items: ["분야별 진료 안내", "의료 설명 그림"], img: "/cases/clinic-v/point-clinic.webp", caption: "망막·녹내장 진료 안내" },
    { title: "필요할 때 펼쳐 보는 상세 정보", body: "장비마다 상세 창을 두어 용도와 관련 검사를 살펴볼 수 있습니다. 키보드로 창을 열고 닫으면 선택했던 위치로 초점이 돌아옵니다.", items: ["장비별 상세 설명", "초점 복귀"], img: "/cases/clinic-v/point-equipment.webp", caption: "장비 안내의 상세 창" },
  ],
  detailsLabel: "상세 내용",
  detailsTitle: "방문 전 궁금한 내용을 찾는 흐름",
  details: [
    { title: "분야별 내용 탐색", body: "공통 메뉴에서 백내장, 드림렌즈, 망막·녹내장, 안구건조증과 검사 안내로 이동합니다." },
    { title: "공지와 진료 정보", body: "공지 목록과 상세 글에서 새 소식과 비용 안내를 확인하고 진료 안내에서 시간과 연락처를 찾습니다." },
    { title: "공통 약관 안내", body: "모든 화면의 바닥글에서 이용약관, 개인정보처리방침, 환자권리장전을 창으로 열어 읽을 수 있습니다." },
  ],
  mobile: { title: "작은 화면에서도 이어지는 안내", body: "접이식 메뉴와 화면 너비에 맞춘 이미지로 진료 정보를 순서대로 읽습니다. 상세 창과 질문 목록은 터치와 키보드로 조작할 수 있습니다.", shots: [{ img: "/cases/clinic-v/m-index.webp", caption: "모바일 메인 화면" }, { img: "/cases/clinic-v/m-dreamlens.webp", caption: "모바일 드림렌즈 안내" }] },
  faq: [{ q: "병원의 운영 정보에 맞춰 안내를 바꿀 수 있나요?", a: "병원명, 진료 항목, 운영 시간과 방문 정보, 공지 내용을 운영 정보에 맞춰 조정할 수 있습니다." }],
};
export default study;
