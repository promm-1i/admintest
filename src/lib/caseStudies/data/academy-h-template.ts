import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "아람결 치료교육연구소",
  headline: "상담 · 발달평가 · 부모교육을 나눈 치료교육 연구소 홈페이지",
  summary:
    "아동의 기질과 발달을 이해하는 첫 안내부터 심리상담, 특별 프로그램, 전문가 교육과 부모교육까지 이어지는 18페이지 구성입니다. 연구소 소개, 연구진, 교육 활동과 협력 네트워크는 각각의 화면으로 나누고 일정·자료·문의 정보를 함께 배치했습니다.",
  brandColor: "rgb(145,189,32)",
  tintColor: "rgb(246,249,238)",
  overview:
    "첫 화면은 월간 일정, 연구소가 바라보는 발달 관점, 프로그램 안내와 소식이 차례로 이어집니다. 소개 영역은 연구소 안내, 연혁, 연구진, 활동, 협력 네트워크로 분리해 정보량이 많은 기관도 내용을 찾기 쉽도록 구성했습니다.\n\nPC의 넓은 메뉴와 모바일 메뉴를 각각 유지했고, 상담·검사 안내와 문의 양식에는 필수 입력, 개인정보 동의, 완료 상태를 구분했습니다. 프로그램은 대상, 진행 순서, 신청 방법을 한 화면에서 확인할 수 있도록 정리했습니다.",
  meta: [
    { label: "업종", value: "아동·청소년 심리상담, 가족상담, 치료교육 및 부모교육 기관" },
    { label: "페이지 구성", value: "18쪽 · 메인 1, 간편 검사 2, 연구소 소개 7, 프로그램 5, 자료·문의 3" },
    { label: "이런 곳에 맞습니다", value: "심리상담센터, 발달지원기관, 치료교육 연구소, 부모교육 기관" },
  ],
  mainShot: "/cases/academy-h/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "소개부터 프로그램과 문의까지 18쪽으로 나눴습니다",
  pages: [
    { name: "메인", file: "index.html", img: "/cases/academy-h/page-index.webp", desc: "일정, 프로그램, 연구소 관점과 소식이 한 흐름으로 이어집니다.", items: ["월간 일정", "프로그램 소개", "연구소 소식"] },
    { name: "연구소 소개", file: "about-introduction.html", img: "/cases/academy-h/page-introduction.webp", desc: "기관의 방향과 상담·교육 원칙을 긴 소개 화면으로 정리했습니다.", items: ["연구소 방향", "핵심 가치", "상담·교육 원칙"] },
    { name: "연구진", file: "about-researcher.html", img: "/cases/academy-h/page-researcher.webp", desc: "연구진의 담당 분야와 역할을 카드형 목록으로 안내합니다.", items: ["연구진 카드", "역할 안내", "반응형 목록"] },
    { name: "심리상담", file: "program-psychotherapy.html", img: "/cases/academy-h/page-psychotherapy.webp", desc: "대상과 진행 방식, 상담 흐름을 단계별로 설명합니다.", items: ["상담 대상", "진행 절차", "유의사항"] },
    { name: "문의", file: "contact.html", img: "/cases/academy-h/page-contact.webp", desc: "필수 항목, 개인정보 동의와 접수 상태를 구분한 문의 양식입니다.", items: ["입력 검증", "개인정보 동의", "접수 상태"] },
  ],
  points: [
    { title: "일정과 프로그램이 이어지는 첫 화면", body: "월간 일정에서 교육과 상담 프로그램을 확인한 뒤 관련 안내로 이동할 수 있습니다. 모바일에서는 달력 대신 읽기 쉬운 일정 목록을 사용합니다.", items: ["PC 월간 달력", "모바일 일정 목록", "프로그램 연결"], img: "/cases/academy-h/point-home.webp", caption: "메인 일정과 프로그램" },
    { title: "소개 · 연혁 · 연구진을 각각 한 쪽씩", body: "연구소 소개, 연혁, 연구진, 교육 활동과 협력 네트워크를 각각의 화면으로 분리했습니다. 방문자는 필요한 소개 항목으로 바로 이동할 수 있습니다.", items: ["7개 소개 화면", "연혁과 연구진", "협력 분야 안내"], img: "/cases/academy-h/point-about.webp", caption: "연구소 소개 화면" },
    { title: "목적에 따라 구분한 상담·교육 안내", body: "기질·발달 평가, 심리상담, 특별 프로그램, 전문가 교육, 부모교육을 별도 페이지로 구성해 필요한 정보를 바로 찾을 수 있습니다.", items: ["5개 프로그램 화면", "단계별 설명", "과장 없는 안내 문구"], img: "/cases/academy-h/point-program.webp", caption: "프로그램 상세 화면" },
  ],
  detailsLabel: "운영 범위",
  detailsTitle: "상담기관 홈페이지에 필요한 운영 화면을 담았습니다",
  details: [
    { title: "반응형 메뉴와 일정", body: "PC·태블릿·모바일에서 메뉴, 일정, 카드와 긴 본문이 화면 크기에 맞게 다시 놓입니다." },
    { title: "입력 상태를 구분한 양식", body: "마음특성 체크와 문의 양식에서 필수 입력, 동의, 처리 상태를 순서대로 확인할 수 있습니다." },
    { title: "새로 만든 사진", body: "연구소 공간, 상담·교육 장면, 연구원 사진을 새로 만들어 같은 배치에 넣었습니다. 실제 기관 사진도 같은 비율 칸에 바꿔 넣을 수 있습니다." },
  ],
  mobile: {
    title: "작은 화면에서는 일정과 긴 정보를 한 줄 흐름으로 읽습니다",
    body: "휴대폰 폭(390px) 화면에서 메뉴를 탭으로 열고, 달력은 날짜별 일정 목록으로 전환합니다. 소개와 프로그램 카드는 한 줄로 배치하며 옆으로 밀리는 일 없이 전체 내용을 확인하도록 점검했습니다.",
    shots: [
      { img: "/cases/academy-h/m-index.webp", caption: "모바일 메인" },
      { img: "/cases/academy-h/m-introduction.webp", caption: "모바일 연구소 소개" },
      { img: "/cases/academy-h/m-program.webp", caption: "모바일 프로그램" },
    ],
  },
  faq: [
    { q: "프로그램별 안내를 따로 구성할 수 있나요?", a: "가능합니다. 상담, 발달평가, 부모교육, 기관교육처럼 운영 분야에 맞춰 메뉴와 상세 화면을 나눌 수 있습니다." },
    { q: "연구진과 협력 활동도 함께 소개할 수 있나요?", a: "연구진의 담당 분야, 기관 연계 활동, 교육 소식과 일정을 각각의 목록으로 구성할 수 있습니다." },
    { q: "사진은 최종 상태인가요?", a: "네. 연구소 공간과 상담·교육 장면 사진을 새로 만들어 넣었습니다. 실제 기관 사진으로 바꿀 수도 있습니다." },
    { q: "문의 접수 기능을 연결할 수 있나요?", a: "운영 방식에 따라 이메일 알림, 데이터베이스 저장, 관리자 확인 기능을 연결할 수 있습니다." },
  ],
};

export default study;
