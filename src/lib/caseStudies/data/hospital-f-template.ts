import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "STEMORIA",
  headline: "비만 · 줄기세포 클리닉 홈페이지",
  summary: "센터 소개와 지방줄기세포 보관 안내, 의료진 안내, 온라인·전화 상담 화면을 갖춘 클리닉 홈페이지입니다.",
  brandColor: "#16745f",
  tintColor: "#edf6f0",
  overview: "STEMORIA의 화면에서 센터 소개와 보관 프로그램, 연구 자료, 상담 절차를 확인할 수 있습니다. 흰색과 연한 녹색 바탕에 짙은 녹색을 강조색으로 사용합니다.\n\n첫 화면의 안내 카드와 공통 메뉴에서 프로그램, 센터, 상담 페이지로 이동합니다. 센터 소개와 의료진 안내는 상담 전 확인할 내용과 진료 과정을 설명합니다.\n\n지방줄기세포 뱅킹 페이지는 프로그램의 의미, 극저온 보관, 활용, 기관 확인, 연구 이력, 세포 수, 추출 용액, 상담·채취·추출·보관 항목을 순서대로 보여 줍니다. 온라인 상담과 전화 상담은 각각의 안내 화면으로 열립니다.",
  meta: [
    { label: "업종", value: "비만 · 줄기세포 클리닉" },
    { label: "페이지 구성", value: "홈 · 센터 소개 · 보관 프로그램 · 의료진 안내 · 온라인 상담 · 전화 상담" },
    { label: "이런 곳에 맞습니다", value: "센터와 프로그램 정보를 나누어 소개하고 상담 경로를 안내하려는 클리닉" },
  ],
  mainShot: "/cases/stemoria/main.webp",
  pagesLabel: "페이지 구성",
  pagesTitle: "센터와 상담 정보를 화면별로",
  pages: [
    { name: "홈", file: "index.html", img: "/cases/stemoria/page-index.webp", desc: "센터 안내 카드와 프로그램·연구 정보, 상담 전 확인 항목을 첫 화면에서 살펴봅니다.", items: ["센터 안내 카드", "프로그램과 연구", "상담 준비 정보"] },
    { name: "센터 소개", file: "stem-cell-center_about-center.html", img: "/cases/stemoria/page-about.webp", desc: "센터의 역할과 자료 확인, 상담과 검사에 관한 안내를 읽습니다.", items: ["센터의 역할", "자료 확인", "상담과 검사"] },
    { name: "보관 프로그램", file: "programs_stem-banking.html", img: "/cases/stemoria/page-banking.webp", desc: "지방 유래 세포의 보관과 확인 항목을 주제별로 나누어 보여 줍니다.", items: ["보관과 활용", "연구·기관 확인", "상담부터 보관까지"] },
    { name: "의료진 안내", file: "stem-cell-center_medical-staff.html", img: "/cases/stemoria/page-staff.webp", desc: "상담에서 확인하는 내용과 진료 전에 준비할 내용을 안내합니다.", items: ["현재 상태", "질문과 설명", "다음 절차"] },
    { name: "온라인 상담", file: "consultation_online-booking.html", img: "/cases/stemoria/page-online-consult.webp", desc: "온라인 상담 안내와 상담 전 확인 항목을 보여 줍니다.", items: ["상담 안내", "준비할 내용", "센터 메뉴 이동"] },
    { name: "전화 상담", file: "consultation_phone-booking.html", img: "/cases/stemoria/page-phone-consult.webp", desc: "전화 상담 전에 정리할 질문과 통화 뒤 기록할 내용을 안내합니다.", items: ["질문 정리", "연락 시간", "다음 단계 기록"] },
  ],
  points: [
    { title: "공통 메뉴에서 안내를 찾습니다", body: "홈·프로그램·센터·상담 메뉴가 페이지 상단에 이어져 필요한 안내 화면으로 이동합니다.", items: ["홈", "프로그램", "센터", "상담"], img: "/cases/stemoria/point-menu.webp", caption: "홈 · 공통 메뉴" },
    { title: "보관 정보를 항목별로 읽습니다", body: "지방줄기세포 뱅킹 페이지에서 보관 개념부터 상담·채취·추출·보관까지 주제를 순서대로 살펴봅니다.", items: ["프로그램 안내", "연구와 확인 사항", "과정 안내"], img: "/cases/stemoria/point-banking.webp", caption: "프로그램 · 지방줄기세포 뱅킹" },
    { title: "진료 전 확인할 내용을 모았습니다", body: "센터 소개와 의료진 안내에서 상담·검사, 현재 상태와 이전 기록, 다음 절차를 확인합니다.", items: ["상담과 검사", "질문과 설명", "진료 뒤 다음 절차"], img: "/cases/stemoria/point-staff.webp", caption: "센터 · 의료진 안내" },
    { title: "상담 경로별 안내를 엽니다", body: "온라인 상담과 전화 상담을 별도 화면으로 나누고, 상담 전에 정리할 질문과 연락 관련 안내를 보여 줍니다.", items: ["온라인 상담 안내", "전화 상담 안내", "준비할 질문"], img: "/cases/stemoria/point-consult.webp", caption: "상담 · 온라인 상담" },
  ],
  detailsLabel: "화면 안내",
  detailsTitle: "페이지를 따라 필요한 내용을 확인합니다",
  details: [
    { title: "공통 상단 메뉴", body: "홈·프로그램·센터·상담 링크가 페이지 상단에 표시됩니다." },
    { title: "주제별 프로그램 안내", body: "보관 프로그램의 여러 주제를 한 페이지에서 순서대로 읽을 수 있습니다." },
    { title: "센터와 의료진 안내", body: "센터의 역할, 상담과 검사, 진료 전에 준비할 내용을 나누어 안내합니다." },
    { title: "상담 안내 화면", body: "온라인 상담과 전화 상담 페이지를 각각 열어 관련 정보를 확인합니다." },
  ],
  mobile: {
    title: "휴대폰에서도 이어지는 센터 안내",
    body: "작은 화면에서 홈과 프로그램, 의료진, 상담 안내를 세로 흐름으로 살펴볼 수 있습니다.",
    shots: [
      { img: "/cases/stemoria/m-index.webp", caption: "홈" },
      { img: "/cases/stemoria/m-banking.webp", caption: "보관 프로그램" },
      { img: "/cases/stemoria/m-staff.webp", caption: "의료진 안내" },
      { img: "/cases/stemoria/m-consult.webp", caption: "온라인 상담" },
    ],
  },
  faq: [
    { q: "상담 안내 화면에서 신청이 접수되나요?", a: "현재 화면은 안내용이며 신청 내용을 전송하거나 저장하지 않습니다. 실제 접수 기능은 별도 연동이 필요합니다." },
    { q: "어떤 화면을 살펴볼 수 있나요?", a: "홈, 센터 소개, 지방줄기세포 뱅킹, 의료진 안내, 온라인 상담, 전화 상담을 대표 화면으로 제공합니다." },
    { q: "페이지 구성을 바꿀 수 있나요?", a: "운영하는 센터와 프로그램의 실제 안내 범위에 맞춰 페이지와 문구를 조정할 수 있습니다." },
  ],
};

export default study;
