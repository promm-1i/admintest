import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "서울하나유방갑상선외과",
  headline: "유방·갑상선 진료와 피부 관리",
  summary: "진료 분야와 검사 안내를 살펴본 뒤 상담과 방문 정보를 이어서 확인할 수 있습니다.",
  brandColor: "rgb(125, 92, 164)",
  tintColor: "#f5f1f9",
  mobileDark: false,
  overview: "서울하나유방갑상선외과의 주요 진료 분야와 방문 정보를 한곳에서 살펴볼 수 있습니다. 차분한 보라색과 진료 공간 사진을 사용해 병원 분위기를 전하고, 유방·갑상선 진료와 피부 관리 정보를 구분해 안내합니다.\n\n검진과 진료 과정은 관련 화면에서 확인하고, 병원 소개와 진료 시간, 위치 정보는 메뉴를 통해 찾을 수 있습니다. 온라인 상담에서는 상담 글 목록과 답변 여부를 확인합니다.",
  meta: [
    { label: "진료 분야", value: "유방 · 갑상선 · 피부클리닉" },
    { label: "안내 화면", value: "병원 소개 · 유방 클리닉 · 검진 · 피부 관리 · 온라인 상담" },
    { label: "안내 정보", value: "검사와 진료 과정, 관리 정보, 예약과 방문 안내" },
  ],
  mainShot: "/cases/hanabreast/main.webp",
  pagesLabel: "진료 안내",
  pagesTitle: "필요한 진료 정보를 찾아봅니다",
  pages: [
    { name: "홈", file: "index.html", img: "/cases/hanabreast/page-index.webp", desc: "첫 화면에서 진료 분야와 병원 소개, 상담 경로를 확인합니다.", items: ["진료 분야", "병원 소개", "상담 연결"] },
    { name: "병원 소개", file: "about.html", img: "/cases/hanabreast/page-about.webp", desc: "진료 방향과 병원 이용에 필요한 기본 정보를 살펴봅니다.", items: ["진료 안내", "공간 소개", "이용 정보"] },
    { name: "유방 클리닉", file: "breast.html", img: "/cases/hanabreast/page-breast.webp", desc: "유방 진료 분야와 검사·상담 정보를 확인합니다.", items: ["진료 분야", "검사 정보", "상담 안내"] },
    { name: "유방 검진", file: "breast-checkup-nhis.html", img: "/cases/hanabreast/page-breast-checkup-nhis.webp", desc: "검진 대상과 검사 과정, 예약 정보를 살펴봅니다.", items: ["검진 안내", "검사 과정", "예약 정보"] },
    { name: "피부 관리", file: "skin-booster.html", img: "/cases/hanabreast/page-skin-booster.webp", desc: "피부 상태에 따른 관리 정보와 시술 전후 안내를 읽습니다.", items: ["관리 정보", "진행 과정", "유의 사항"] },
    { name: "초음파 리프팅", file: "skin-hifu-lifting.html", img: "/cases/hanabreast/page-skin-hifu-lifting.webp", desc: "초음파 에너지를 이용한 관리의 원리와 적용 범위를 확인합니다.", items: ["관리 원리", "적용 범위", "상담 안내"] },
    { name: "온라인 상담", file: "consult.html", img: "/cases/hanabreast/page-consult.webp", desc: "상담 글의 제목과 작성자, 답변 여부와 등록일을 목록으로 보고 검색합니다.", items: ["상담 목록", "답변 여부", "상담 검색"] },
    { name: "진료 안내", file: "information.html", img: "/cases/hanabreast/page-information.webp", desc: "진료 시간과 방문 전 확인할 기본 정보를 살펴봅니다.", items: ["진료 시간", "방문 안내", "문의 경로"] },
  ],
  points: [
    { title: "진료 분야와\n상담 경로를 찾습니다", body: "첫 화면에서 유방·갑상선 진료와 피부 관리 정보를 확인하고 관련 안내로 이동할 수 있습니다.", items: ["진료 분야", "병원 소개", "상담 경로"], img: "/cases/hanabreast/point-home.webp", caption: "메인 화면" },
    { title: "검진 과정과\n예약 정보를 확인합니다", body: "유방 클리닉과 검진 안내에서 검사 대상, 진행 과정과 상담에 필요한 정보를 살펴봅니다.", items: ["유방 진료", "검사 안내", "예약 정보"], img: "/cases/hanabreast/point-breast.webp", caption: "유방 클리닉" },
    { title: "피부 관리 정보를\n부위별로 살펴봅니다", body: "피부 관리 화면에서 적용 범위와 진행 과정, 시술 전후 확인할 사항을 살펴볼 수 있습니다.", items: ["피부 관리", "적용 범위", "유의 사항"], img: "/cases/hanabreast/point-skin.webp", caption: "피부클리닉" },
    { title: "온라인 상담 목록을\n한눈에 확인합니다", body: "상담 글의 제목과 작성자, 답변 여부와 등록일을 목록으로 살펴보고 검색으로 찾을 수 있습니다. 비밀글은 자물쇠 표시로 구분됩니다.", items: ["상담 목록", "답변 여부", "상담 검색"], img: "/cases/hanabreast/point-visit.webp", caption: "온라인 상담" },
  ],
  detailsLabel: "안내 내용",
  detailsTitle: "페이지에서 확인할 수 있는 정보",
  details: [
    { title: "검사와 진료 안내", body: "유방과 갑상선 진료 페이지에서 검사 분야와 상담에 필요한 내용을 살펴볼 수 있습니다." },
    { title: "피부 관리 정보", body: "피부클리닉 페이지에 관리 원리와 적용 범위, 시술 전후 유의 사항이 안내됩니다." },
    { title: "상담과 방문 준비", body: "온라인 상담과 진료 안내에서 상담 글과 진료 시간, 오시는 길 등 방문 전 정보를 확인할 수 있습니다." },
  ],
  mobile: {
    title: "휴대폰에서도 진료와 예약 정보를 확인합니다",
    body: "메뉴와 본문이 한 열로 이어져 병원 소개, 진료 분야, 상담 화면을 차례로 살펴볼 수 있습니다.",
    shots: [
      { img: "/cases/hanabreast/m-index.webp", caption: "메인" },
      { img: "/cases/hanabreast/m-about.webp", caption: "병원 소개" },
      { img: "/cases/hanabreast/m-breast.webp", caption: "유방 클리닉" },
      { img: "/cases/hanabreast/m-skin-booster.webp", caption: "피부 관리" },
      { img: "/cases/hanabreast/m-consult.webp", caption: "온라인 상담" },
    ],
  },
  faq: [
    { q: "진료 분야와 검사 정보를 확인할 수 있나요?", a: "유방·갑상선 클리닉과 검진 안내 페이지에서 진료 및 검사 정보를 살펴볼 수 있습니다." },
    { q: "피부 관리 내용은 어디에서 보나요?", a: "피부클리닉 메뉴에서 관리 원리와 적용 범위, 유의 사항을 확인할 수 있습니다." },
    { q: "상담 내용은 어디에서 보나요?", a: "온라인 상담 메뉴에서 상담 글 목록과 답변 여부를 확인할 수 있습니다." },
  ],
};

export default study;
