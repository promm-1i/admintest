import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "세영오토텍",
  headline: "차량 진단 · 검사 장비 기업 홈페이지",
  summary: "차량 진단 시스템과 전장 검사 장비를 사업 분야별로 소개하고, 사업장 안내 · 자료 받기 · 채용 절차를 갖춘 자동차 장비 기업 홈페이지입니다.",
  brandColor: "#1a1a1a",
  tintColor: "#f1f1f1",
  overview:
    "세영오토텍의 메인은 정비 현장 사진 위에 'GLOBAL INFORMATION TECHNOLOGY' 큰 제목을 얹은 슬라이드로 시작합니다. 아래로 내리면 회사가 하는 일을 큰 글씨 한 문장으로 보여 주고, 차량 생산 · 출고 전 점검 · 정비 단계별로 하는 일을 카드로 나눕니다.\n\n사업 분야 쪽은 진단 시스템 · 전장 검사 · 부품 분석처럼 분야마다 큰 사진, 큰 글씨 소개 문장, 기능 01 · 02 · 03 설명을 같은 틀로 보여 줍니다. 회사 소개에는 대표 인사말, 연혁, 국내 사업장과 해외 사무소 주소가 있습니다.\n\n안내 정보에는 원격 지원 프로그램과 사용 안내서를 받는 자료실, 제품 정보 게시판이 있고, 인재 채용에는 직무별 안내와 채용 절차, 공고 목록이 있습니다.",
  meta: [
    { label: "업종", value: "자동차 진단 장비 · 전장 검사 장비 제조" },
    { label: "페이지 구성", value: "메인 · 회사 소개 · 사업 분야 · 인재 채용 · 안내 정보 · 고객 지원" },
    { label: "이런 곳에 맞습니다", value: "사업 분야가 여러 개이고 자료실과 채용 안내를 함께 운영하는 장비 제조 기업" },
  ],
  mainShot: "/cases/seyoung/main.webp",
  pagesLabel: "페이지 구성",
  pagesTitle: "회사 소개부터 사업 분야, 자료실까지",
  pages: [
    { name: "회사 소개", file: "about_overview.html", img: "/cases/seyoung/page-about_overview.webp", desc: "큰 사진과 회사 소개 문장 아래에 책임 있는 업무 · 기술 개발 · 사회적 책임 세 가지 경영 원칙을 보여 줍니다.", items: ["큰 글씨 소개 문장", "경영 원칙 세 가지", "사진 위 설명 칸"] },
    { name: "사업장 안내", file: "about_da.html", img: "/cases/seyoung/page-about_da.webp", desc: "국내 사업장과 해외 사무소를 탭으로 나누고 본사, 기술 사무소, 제품 시험실, 제조 시설의 주소와 연락처를 적었습니다.", items: ["국내 · 해외 탭", "사업장별 주소", "대표번호 · 팩스"] },
    { name: "진단 시스템", file: "busi_ds.html", img: "/cases/seyoung/page-busi_ds.webp", desc: "휴대형 진단 단말기, 통신 통합 장치, 인도 전 점검 지원을 기능 01 · 02 · 03 으로 나누어 사진과 함께 설명합니다.", items: ["분야 대표 사진", "기능 세 가지", "검사 · 진단 단계"] },
    { name: "전장 검사", file: "busi_inspection.html", img: "/cases/seyoung/page-busi_inspection.webp", desc: "부품 검사 기준, 생산 설비 자동화, 전동화 장비를 같은 틀로 소개하는 사업 분야 쪽입니다.", items: ["검사 장비 사진", "기능 세 가지", "생산 공정 검사"] },
    { name: "자료 받기", file: "supp_download.html", img: "/cases/seyoung/page-supp_download.webp", desc: "원격 지원 프로그램, 진단 유틸리티, 사용 안내서를 번호 · 구분 · 제목 · 날짜 표로 보여 주는 자료실입니다.", items: ["자료 목록 표", "구분 · 날짜", "전체 자료 묶음"] },
    { name: "채용 안내", file: "recru_guide.html", img: "/cases/seyoung/page-recru_guide.webp", desc: "연구 개발 · 전장 · 품질 관리 · 경영 지원 등 직무를 탭으로 골라 보고 채용 단계를 확인합니다.", items: ["직무 탭", "직무별 업무", "채용 단계"] },
  ],
  points: [
    { title: "모바일 메뉴에서 하위 메뉴를 펼칩니다", body: "휴대폰에서 메뉴 버튼을 누르면 검은 바탕 전체 메뉴가 열리고, 회사 소개 · 사업 분야 · 인재 채용 · 안내 정보를 누를 때마다 하위 메뉴가 펼쳐집니다. 한국어 · 영어 선택도 메뉴 맨 위에 있습니다.", items: ["전체 메뉴", "하위 메뉴 펼침", "KOR · ENG"], img: "/cases/seyoung/point-navigation.webp", caption: "모바일 전체 메뉴" },
    { title: "어느 쪽에서나 검색 창을 엽니다", body: "오른쪽 위 검색 단추를 누르면 화면 오른쪽에 검색 창이 열립니다. 검색어를 넣고 사이트 안에서 찾습니다.", items: ["검색 단추", "검색 창", "닫기"], img: "/cases/seyoung/point-search.webp", caption: "검색 창" },
    { title: "메인 첫 화면 슬라이드", body: "정비 현장 사진이 차례로 바뀌고, 이전 · 다음 단추와 자동 넘김 멈춤 · 시작 단추로 직접 넘겨 볼 수 있습니다.", items: ["사진 슬라이드", "이전 · 다음", "자동 넘김 멈춤"], img: "/cases/seyoung/point-slider.webp", caption: "메인 슬라이드" },
    { title: "사업 분야 전체를 한 판에서 고릅니다", body: "사업 분야 메뉴를 열면 차량 검사, 부품 분석, 차량 시험, 진단 장비 같은 분야와 세부 항목이 검은 판 위에 한꺼번에 나옵니다.", items: ["분야별 묶음", "세부 항목", "바로 이동"], img: "/cases/seyoung/point-download.webp", caption: "사업 분야 메뉴" },
  ],
  detailsLabel: "화면 안내",
  detailsTitle: "화면에서 직접 확인할 수 있는 동작",
  details: [
    { title: "글자가 채워지는 소개 문장", body: "회사 소개 · 사업 분야 쪽의 큰 소개 문장은 화면을 내리는 만큼 글자 색이 채워집니다." },
    { title: "같은 틀의 사업 분야 쪽", body: "분야마다 큰 사진, 소개 문장, 기능 세 가지를 같은 순서로 보여 줘 분야를 늘려도 모양이 같습니다." },
    { title: "자료실 · 제품 정보 게시판", body: "자료 받기와 제품 정보는 번호 · 구분 · 제목 · 날짜가 있는 표 목록으로 정리했습니다." },
    { title: "고객 지원 단추", body: "머리글 오른쪽 고객 지원 단추를 누르면 A/S 안내 쪽으로 갑니다." },
  ],
  mobile: {
    title: "휴대폰에서는 기능 설명을 한 장씩 넘겨 봅니다",
    body: "390px 폭에서는 사업 분야의 기능 설명이 사진과 글을 묶은 카드로 바뀌어 옆으로 한 장씩 넘겨 봅니다. 메뉴는 검은 바탕 전체 메뉴로 열리고, 메뉴마다 하위 메뉴를 펼쳐 고릅니다.",
    shots: [
      { img: "/cases/seyoung/m-index.webp", caption: "메인" },
      { img: "/cases/seyoung/m-about.webp", caption: "회사 소개" },
      { img: "/cases/seyoung/m-diagnostics.webp", caption: "진단 시스템" },
      { img: "/cases/seyoung/m-downloads.webp", caption: "자료 받기" },
    ],
  },
  faq: [
    { q: "사업 분야를 더 늘리거나 줄일 수 있나요?", a: "네. 사업 분야 쪽은 같은 틀로 되어 있어 운영하는 분야 수에 맞춰 쪽을 더하거나 뺄 수 있습니다." },
    { q: "자료실에 실제 프로그램 파일을 올릴 수 있나요?", a: "네. 제작할 때 배포하는 프로그램과 안내서 파일을 목록에 연결합니다." },
    { q: "문의를 보내면 바로 접수되나요?", a: "지금은 문의를 보내면 전화 안내 문구가 나옵니다. 온라인 접수를 받으려면 접수 기능을 따로 연결합니다." },
  ],
};

export default study;
