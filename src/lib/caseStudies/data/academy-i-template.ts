import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "셈다움",
  headline: "진단 · 문제 출제 · 성적 관리를 잇는 수학 문제은행 홈페이지",
  summary:
    "수준 진단과 맞춤 문제 구성, 기초·내신·수능 학습, 성적 관리와 전국수학평가까지 학원 운영에 필요한 정보를 20개 화면으로 나누어 보여 주는 수학 문제은행 홈페이지입니다.",
  brandColor: "rgb(39, 152, 128)",
  tintColor: "rgb(239, 249, 246)",
  overview:
    "셈다움은 수학 문제은행과 학원 운영 솔루션을 소개하는 브랜드입니다.\n\n메인 화면은 학습 과정과 서비스 장점을 먼저 전달하고 AI 맞춤 학습, 수준 진단, 기초 완성, 내신 향상, 수능 대비, 성적 관리로 이어집니다. 전국수학평가와 학원 후기, 설명회, 무료 체험 화면은 서비스 선택에 필요한 보조 정보를 별도 페이지로 구분했습니다.\n\nPC에서는 상위 메뉴와 하위 메뉴로 20개 화면을 오갈 수 있고, 모바일에서는 터치 기반 전체 메뉴와 세로 배치로 전환됩니다. 탭, 펼침 목록, 후기 더보기, 입력 검증은 화면 안에서 직접 확인할 수 있습니다.",
  meta: [
    { label: "업종", value: "수학 문제은행 · 학원 학습 솔루션" },
    { label: "페이지 구성", value: "20쪽 · 메인, 학습 솔루션 6쪽, 요금, 전국수학평가 4쪽, 후기·설명회·체험, 회사·약관 안내" },
    { label: "이런 곳에 맞습니다", value: "수학학원, 교습소, 공부방, 문제은행과 성적 관리 서비스를 함께 운영하는 교육 브랜드" },
  ],
  mainShot: "/cases/academy-i/main.webp",
  pagesLabel: "대표 화면",
  pagesTitle: "운영 목적에 따라 나눈 20개 화면",
  pages: [
    { name: "메인", file: "index.html", img: "/cases/academy-i/page-index.webp", desc: "핵심 학습 과정과 서비스 장점, 학원 후기와 체험 안내를 긴 흐름으로 보여 줍니다.", items: ["순환형 첫 화면", "학습 과정 안내", "후기 더보기"] },
    { name: "AI 맞춤 학습", file: "ai-customize.html", img: "/cases/academy-i/page-ai.webp", desc: "학생 수준에 맞춰 문제를 구성하는 학습 흐름과 활용 방법을 설명합니다.", items: ["진단 흐름", "맞춤 문제 구성", "운영 장점"] },
    { name: "이용 요금", file: "price.html", img: "/cases/academy-i/page-price.webp", desc: "서비스 범위와 이용 조건을 표와 안내 영역으로 구분해 확인할 수 있습니다.", items: ["요금 표", "이용 조건", "상담 연결"] },
    { name: "전국수학평가", file: "contest-schedule.html", img: "/cases/academy-i/page-assessment.webp", desc: "평가 일정과 접수 안내를 표 중심으로 정리한 화면입니다.", items: ["평가 일정", "접수 안내", "유의 사항"] },
    { name: "무료 체험", file: "trial.html", img: "/cases/academy-i/page-trial.webp", desc: "신청 정보를 단계별로 입력하고 필수 항목을 확인하는 체험 신청 화면입니다.", items: ["단계별 입력", "꼭 넣어야 하는 칸 검증", "완료 안내"] },
  ],
  points: [
    { title: "학습 과정을 한 번에 훑는 메인", body: "첫 화면에서 학습 과정과 서비스 특징을 순서대로 살펴보고 필요한 상세 화면으로 바로 이동할 수 있습니다.", items: ["자동 전환 첫 화면", "과정별 바로가기", "후기 더보기"], img: "/cases/academy-i/point-home.webp", caption: "셈다움 메인" },
    { title: "수준 진단과 성적 관리를 따로", body: "수준 진단부터 성적 관리까지 서로 다른 목적을 별도 화면으로 나누어 설명하므로 원하는 정보를 빠르게 찾을 수 있습니다.", items: ["진단과 맞춤", "내신·수능 대비", "성적 관리"], img: "/cases/academy-i/point-system.webp", caption: "AI 맞춤 학습" },
    { title: "평가 일정 · 수상 · 후기를 각각", body: "전국수학평가 일정, 수상 내역, 참가 후기와 학원 후기를 각각 따로 두어 서로 섞이지 않게 했습니다.", items: ["평가 일정", "수상 내역", "참가·학원 후기"], img: "/cases/academy-i/point-assessment.webp", caption: "전국수학평가 일정" },
  ],
  detailsLabel: "세부 구현",
  detailsTitle: "화면에서 직접 확인할 수 있는 동작",
  details: [
    { title: "메뉴와 탭", body: "PC 하위 메뉴와 모바일 전체 메뉴를 각각 사용할 수 있으며, 탭을 누르면 선택한 내용만 표시됩니다." },
    { title: "후기와 질문", body: "메인 후기 더보기와 자주 묻는 질문 펼침 목록이 버튼 입력에 맞춰 열리고 닫힙니다." },
    { title: "신청 화면", body: "필수 입력값을 검사하고 완료 상태를 보여 주지만, 외부 서버로 개인정보를 전송하거나 저장하지는 않습니다." },
  ],
  mobile: {
    title: "모바일에서는 메뉴와 내용이 세로로 바뀝니다",
    body: "휴대폰 폭(390px) 화면에서는 상위 메뉴가 터치 기반 전체 메뉴로 전환되고 표와 카드, 입력 항목이 화면 크기에 맞춰 다시 놓입니다. 옆으로 밀리는 일 없이 주요 내용을 읽고 버튼을 누를 수 있도록 구성했습니다.",
    shots: [
      { img: "/cases/academy-i/m-index.webp", caption: "모바일 메인" },
      { img: "/cases/academy-i/m-ai.webp", caption: "모바일 AI 맞춤 학습" },
      { img: "/cases/academy-i/m-trial.webp", caption: "모바일 무료 체험" },
    ],
  },
  faq: [
    { q: "상담과 무료 체험 신청 내용이 전송되나요?", a: "현재 화면에서는 입력 검증과 완료 안내만 확인할 수 있으며, 입력 내용은 외부 서버에 전송되거나 저장되지 않습니다." },
    { q: "화면 속 사진과 영상을 바꿀 수 있나요?", a: "네. 지금 들어 있는 사진, 교재 표지, 인터뷰 영상은 디자인을 보여 드리려고 새로 만든 예시입니다. 실제 수업 사진이나 교재, 선생님 인터뷰가 있으면 같은 칸에 바꿔 넣을 수 있습니다." },
    { q: "페이지를 줄이거나 필요한 기능을 연결할 수 있나요?", a: "실제 제작 단계에서는 운영 범위에 맞춰 화면을 조정하고 인증, 저장, 관리자 기능처럼 필요한 서버 기능을 별도로 설계해 연결할 수 있습니다." },
  ],
};

export default study;
