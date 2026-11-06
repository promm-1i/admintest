import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "가로수피부과의원",
  headline: "피부 의원 홈페이지",
  summary: "필링, 주사, 리프팅의 목적과 진행 과정을 각 화면에서 살펴보고 상담과 방문 안내로 이어집니다.",
  brandColor: "rgb(177, 143, 113)",
  tintColor: "rgb(48, 39, 34)",
  mobileDark: false,
  overview: "가로수피부과의원 홈페이지에서는 피부 관리 정보와 상담 경로를 확인할 수 있습니다. 밝은 베이지와 짙은 브라운 색상, 시술 장면과 진료 공간 사진이 화면에 이어집니다.\n\n첫 화면에는 의원 소개 영상과 진료 안내가 보이고, 필링·주사·리프팅은 각각의 화면에서 목적과 진행 순서를 살펴봅니다. 진료시간과 위치, 상담예약, 게시판은 공통 메뉴에서 찾을 수 있습니다.",
  meta: [
    { label: "업종", value: "피부 의원 · 필링 · 주사 · 리프팅" },
    { label: "페이지 구성", value: "메인 · 의원 소개 · 시술 안내 · 게시판 · 상담예약 · 오시는 길" },
    { label: "이런 곳에 맞습니다", value: "피부 관리 정보와 상담 경로를 온라인에서 안내하려는 의원" },
  ],
  mainShot: "/cases/garosu/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "진료 정보를 살펴보고 방문을 준비합니다",
  pages: [
    { name: "홈", file: "index.html", img: "/cases/garosu/page-index.webp", desc: "첫 화면에서 의원 소개 영상과 주요 진료 안내를 보고 상담 경로를 찾습니다.", items: ["영상 첫 화면", "진료 안내", "상담 연결"] },
    { name: "의원 소개", file: "about.html", img: "/cases/garosu/page-about.webp", desc: "의원의 진료 방향과 공간 사진, 방문에 필요한 기본 정보를 확인합니다.", items: ["진료 방향", "진료 공간", "기본 정보"] },
    { name: "피아니시모", file: "pianissimo.html", img: "/cases/garosu/page-pianissimo.webp", desc: "피부와 근막을 살피는 관리의 목적과 적용 과정, 관리 범위를 읽습니다.", items: ["관리 목적", "적용 과정", "관리 범위"] },
    { name: "탄생주사", file: "pnp-injection.html", img: "/cases/garosu/page-pnp-injection.webp", desc: "자가혈에서 얻은 성분을 활용하는 시술의 과정과 주의 내용을 확인합니다.", items: ["시술 설명", "진행 과정", "회복 안내"] },
    { name: "자가혈얼굴관리", file: "facial-pnp-injection.html", img: "/cases/garosu/page-facial-pnp-injection.webp", desc: "얼굴과 두피, 목 주변을 살피는 관리 범위와 상담 정보를 확인합니다.", items: ["관리 범위", "상담 정보", "진행 과정"] },
    { name: "마네킹필", file: "mannequin-peel.html", img: "/cases/garosu/page-mannequin-peel.webp", desc: "피부 상태에 따른 필링 정보와 관리 전후 유의 사항을 살펴봅니다.", items: ["필링 안내", "피부 상태", "유의 사항"] },
    { name: "피부결케어", file: "skinny-peel.html", img: "/cases/garosu/page-skinny-peel.webp", desc: "피부 표면과 몸의 윤곽을 함께 살피는 바디 관리 내용을 확인합니다.", items: ["관리 원리", "적용 부위", "진행 순서"] },
    { name: "근막수기관리", file: "saelune-retrieve.html", img: "/cases/garosu/page-saelune-retrieve.webp", desc: "손으로 조직의 움직임과 당겨지는 힘을 확인하는 수기 관리 안내입니다.", items: ["조직 확인", "관리 과정", "상담 안내"] },
    { name: "상담예약", file: "consult.html", img: "/cases/garosu/page-consult.webp", desc: "문의 주제와 연락처를 작성하고 개인정보 안내를 확인합니다.", items: ["연락처 입력", "문의 주제", "개인정보 안내"] },
    { name: "오시는 길", file: "contact.html", img: "/cases/garosu/page-contact.webp", desc: "진료시간과 위치, 연락처가 한 화면에 표시됩니다.", items: ["진료시간", "위치 안내", "전화 상담"] },
  ],
  points: [
    { title: "첫 화면에서\n진료 방향을 살펴봅니다", body: "의원 소개 영상과 핵심 진료 안내가 첫 화면에 보이고, 화면 아래에서 관리 프로그램과 방문 정보를 이어서 확인할 수 있습니다.", items: ["의원 소개 영상", "진료 안내", "방문 정보"], img: "/cases/garosu/point-first-screen.webp", caption: "메인 · 첫 화면" },
    { title: "시술별 안내에서\n진행 과정을 확인합니다", body: "필링과 주사, 리프팅은 각각의 화면에 목적과 진행 순서가 표시됩니다. 관련 관리와 상담 정보도 해당 화면에서 확인할 수 있습니다.", items: ["필링", "주사", "리프팅"], img: "/cases/garosu/point-treatment.webp", caption: "시술별 안내" },
    { title: "얼굴 주변까지\n관리 범위를 살펴봅니다", body: "자가혈을 활용하는 얼굴 관리 화면에서 두피와 얼굴, 목·어깨로 이어지는 범위와 시술 단계를 읽을 수 있습니다.", items: ["관리 범위", "진행 단계", "회복 안내"], img: "/cases/garosu/point-face-care.webp", caption: "자가혈얼굴관리 안내" },
    { title: "바디 관리의\n적용 부위를 살펴봅니다", body: "피부결케어와 근막수기관리 화면에서 피부 표면과 조직의 움직임, 바디 관리 과정을 확인할 수 있습니다.", items: ["피부결케어", "근막수기관리", "상담 경로"], img: "/cases/garosu/point-body-care.webp", caption: "바디 관리 안내" },
  ],
  detailsLabel: "안내 내용",
  detailsTitle: "화면에서 확인할 수 있는 정보",
  details: [
    { title: "시술별 목적과 진행 순서", body: "필링, 주사, 리프팅 안내가 각 화면에 있고 목적과 진행 과정, 유의 사항을 살펴볼 수 있습니다." },
    { title: "진료시간과 위치", body: "오시는 길 화면에 진료시간, 위치와 연락처가 표시됩니다." },
    { title: "상담 항목과 개인정보 안내", body: "상담 화면에서 문의 내용과 연락처 항목을 확인하고 개인정보 수집·이용 안내를 읽을 수 있습니다." },
  ],
  mobile: {
    title: "휴대폰에서도 진료와 방문 정보를 찾습니다",
    body: "화면이 좁아지면 카드와 본문이 한 열로 이어집니다. 메뉴를 열어 의원 소개, 시술 안내와 상담 화면으로 이동할 수 있습니다.",
    shots: [
      { img: "/cases/garosu/m-index.webp", caption: "메인" },
      { img: "/cases/garosu/m-about.webp", caption: "의원 소개" },
      { img: "/cases/garosu/m-pianissimo.webp", caption: "피아니시모" },
      { img: "/cases/garosu/m-pnp-injection.webp", caption: "탄생주사" },
      { img: "/cases/garosu/m-contact.webp", caption: "오시는 길" },
    ],
  },
  faq: [
    { q: "의원 사진과 안내 문구를 바꿀 수 있나요?", a: "네. 실제 운영 정보와 사진에 맞춰 의원 소개와 진료 안내를 갱신할 수 있습니다." },
    { q: "상담 화면에서 어떤 정보를 확인하나요?", a: "문의 주제와 연락처 항목, 개인정보 수집·이용 안내를 확인할 수 있습니다." },
    { q: "시술 안내 화면을 더 살펴볼 수 있나요?", a: "페이지 목록에서 필링, 주사, 리프팅과 각 관리 안내로 이동할 수 있습니다." },
  ],
};

export default study;
