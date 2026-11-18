import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "꿈나무스마트학습",
  headline: "유아 학습부터 교과 복습까지 과목별로 고르는 어린이 학습 홈페이지",
  summary:
    "첫 화면 슬라이드 네 장과 학습 메뉴 줄, 과목 탭으로 유아 · 교과 · 읽기 · 수학 · 영어 학습을 골라 보고, 과목 쪽에서는 구독 안내 띠가 화면 아래를 따라오는 어린이 학습 서비스 홈페이지입니다.",
  brandColor: "#ff8296",
  tintColor: "#fff7f5",
  overview:
    "꿈나무스마트학습의 메인은 화면 폭을 꽉 채운 분홍 판에서 시작합니다. 판 안의 안내 네 장은 이전 · 다음 단추로 넘기고, 아래에 01 / 04 쪽 번호와 구독 안내 바로가기가 있습니다.\n\n그 아래로 학습 시작 · 교과 학습 · 읽기 연습 · 수학 연습 · 유아 학습 · 학년별 체험 · 꿈나무 수업으로 가는 아이콘 줄, 학습 소식, 보호자 학습 자료, 온라인 강의, 학습 이용 기록이 이어집니다. 학습 내용 확인 구역에서는 교과 학습, 읽기·독서, 수학, 영어 탭을 눌러 과목 범위와 학년별 영상을 봅니다.\n\n과목 쪽은 유아 학습, 과목별 학습, 영어, 읽기, 수학, 학습 만화, 학습 평가, 학습 시간으로 나뉘고, 학교와 기관을 위한 꿈나무 수업 안내와 구독 정보, 행사 · 학습 소식 · 학습 영상 · 학습 후기 쪽이 따로 있습니다.",
  meta: [
    { label: "업종", value: "어린이 온라인 학습 · 학습지 구독 서비스" },
    { label: "페이지 구성", value: "메인 · 유아 학습 · 과목별 학습 · 영어 · 읽기 · 수학 · 학습 만화 · 학습 평가 · 꿈나무 수업 · 구독 정보 · 행사 · 학습 소식 · 학습 영상 · 학습 후기" },
    { label: "이런 곳에 맞습니다", value: "과목과 학년이 여러 갈래이고, 구독 안내를 어느 쪽에서든 바로 보여 줘야 하는 어린이 학습 서비스" },
  ],
  mainShot: "/cases/kkumnamu/main.webp",
  pagesLabel: "페이지 구성",
  pagesTitle: "유아 학습부터 학교용 수업 안내까지",
  pages: [
    {
      name: "유아 학습",
      file: "early-learning.html",
      img: "/cases/kkumnamu/page-early-learning.webp",
      desc: "한글과 받아쓰기, 수학과 연산, 동요와 동화, 영어 기초, 학교생활 준비를 차례로 나누어 활동마다 그림과 설명을 붙였습니다.",
      items: ["한글 · 받아쓰기", "수학과 연산", "학교생활 준비"],
    },
    {
      name: "과목별 학습",
      file: "subjects.html",
      img: "/cases/kkumnamu/page-subjects.webp",
      desc: "연간 학습 계획과 국어 · 수학 · 사회 · 과학 수업 자료, 단원 복습 · 단원 문제, 주간 · 월간 · 단원별 학습 기록을 보여 줍니다.",
      items: ["과목별 수업 자료", "단원 학습 확인", "학습 기록"],
    },
    {
      name: "학습 만화",
      file: "learning-stories.html",
      img: "/cases/kkumnamu/page-learning-stories.webp",
      desc: "교과 내용을 다룬 학습 만화와 주제별 자료, 보호자용 이용 관리 기능, 공부해서 모은 포인트로 만화를 보는 방법을 안내합니다.",
      items: ["교과 학습 만화", "보호자 관리", "포인트로 만화 보기"],
    },
    {
      name: "꿈나무 수업",
      file: "class-info.html",
      img: "/cases/kkumnamu/page-class-info.webp",
      desc: "학교와 교육기관용 수업 자료를 소개하고, 기기 이용 · 학급별 수업 설정 · 학습 기록 관리, 정규 수업과 방과 후 수업 쓰임을 나누어 적었습니다.",
      items: ["수업 이용 방법", "정규 · 방과 후 수업", "교사 이용 정보"],
    },
    {
      name: "학습 평가",
      file: "assessment.html",
      img: "/cases/kkumnamu/page-assessment.webp",
      desc: "기초 학습 진단, 단원 평가, 학업 성취 평가를 나누고, 진단 뒤 결과 기록과 3주 학습 계획을 확인하는 순서를 보여 줍니다.",
      items: ["기초 학습 진단", "단원 평가", "학업 성취 평가"],
    },
    {
      name: "구독 정보",
      file: "subscribe.html",
      img: "/cases/kkumnamu/page-subscribe.webp",
      desc: "교과 · 읽기 · 독서 · 수학 · 영어 서비스 구성을 카드로 넘겨 보고, 학습 질문과 구독 방식 비교를 차례로 읽습니다.",
      items: ["서비스 구성", "학습 질문", "구독 방식 비교"],
    },
  ],
  points: [
    {
      title: "첫 화면 안내 네 장을 넘겨 봅니다",
      body: "분홍 판의 이전 · 다음 단추를 누르면 안내 글과 그림이 바뀌고, 아래 쪽 번호가 01 / 04 에서 02 / 04 로 넘어갑니다.",
      items: ["안내 네 장", "이전 · 다음 단추", "쪽 번호"],
      img: "/cases/kkumnamu/point-hero.webp",
      caption: "메인 첫 화면",
    },
    {
      title: "학습 메뉴를 아이콘 줄에서 고릅니다",
      body: "학습 자료 구역의 아이콘 일곱 개가 한 줄로 놓이고, 화면에 다 들어가지 않는 메뉴는 옆으로 밀거나 화살표를 눌러 봅니다.",
      items: ["아이콘 메뉴 일곱 개", "옆으로 밀기", "화살표 단추"],
      img: "/cases/kkumnamu/point-menu.webp",
      caption: "학습 자료",
    },
    {
      title: "과목 탭을 누르면 범위가 바뀝니다",
      body: "학습 내용 확인 구역에서 수학 탭을 누르면 탭 색이 바뀌고 과목 범위가 연산 · 도형 · 문제 풀이로 바뀝니다. 아래에는 초등 1 · 3 · 5학년 영상 카드가 있습니다.",
      items: ["과목 탭 네 개", "과목 범위", "학년별 영상"],
      img: "/cases/kkumnamu/point-subject-tab.webp",
      caption: "학습 내용 확인",
    },
    {
      title: "구독 안내 띠가 화면 아래를 따라옵니다",
      body: "과목 쪽을 내려 읽는 동안 구독 안내 띠가 화면 아래에 떠 있고, 끝까지 내려가면 바닥글 바로 위에 넓은 안내 구역으로 내려앉습니다.",
      items: ["화면 아래 띠", "구독 안내 보기", "바닥글 위 안내"],
      img: "/cases/kkumnamu/point-band.webp",
      caption: "학습 만화 쪽",
    },
  ],
  detailsLabel: "화면 안내",
  detailsTitle: "화면에서 직접 확인할 수 있는 동작",
  details: [
    {
      title: "학습 소식",
      body: "전체 · 학습 이야기 · 계절 학습 탭으로 소식 카드를 골라 보고, 카드를 누르면 소식 글로 넘어갑니다.",
    },
    {
      title: "학습 이용 기록",
      body: "태블릿 · 책 · 손이 보이는 사진 카드 세 장에 과목별로 오늘 할 과제를 짧게 적었습니다.",
    },
    {
      title: "이런 서비스는 어때요?",
      body: "읽기 자료 · 수학 연습 · 영어 학습 · 유아 학습 · 학년별 체험 카드 다섯 개로 다른 메뉴에 바로 들어갑니다.",
    },
    {
      title: "바닥글",
      body: "회사 정보 · 이용 약관 · 개인정보 처리 기준 링크와 상호, 주소, 사업자등록번호, 고객센터 번호와 상담 시간을 적었습니다.",
    },
  ],
  mobile: {
    title: "휴대폰에서는 카드형 첫 화면과 두 줄 메뉴",
    body: "390px 폭에서는 첫 화면이 둥근 카드로 바뀌고, 학습 메뉴 아이콘은 네 칸씩 두 줄로 놓입니다. 과목 쪽 내용은 위에서 아래로 한 줄씩 이어집니다.",
    shots: [
      { img: "/cases/kkumnamu/m-index.webp", caption: "메인" },
      { img: "/cases/kkumnamu/m-early-learning.webp", caption: "유아 학습" },
      { img: "/cases/kkumnamu/m-subjects.webp", caption: "과목별 학습" },
      { img: "/cases/kkumnamu/m-class-info.webp", caption: "꿈나무 수업" },
    ],
  },
  faq: [
    {
      q: "과목이나 학습 메뉴를 더할 수 있나요?",
      a: "네. 과목 쪽은 같은 틀이라 과목 이름과 설명, 그림을 넣어 늘릴 수 있고, 메인 아이콘 줄에도 메뉴를 더하면 옆으로 밀어 보는 칸이 늘어납니다.",
    },
    {
      q: "첫 화면 안내 글과 그림을 바꿀 수 있나요?",
      a: "네. 네 장마다 제목, 설명, 그림이 따로 있어서 행사나 계절에 맞춰 한 장씩 바꿔 넣으면 됩니다.",
    },
    {
      q: "구독 안내 띠의 문구를 바꿀 수 있나요?",
      a: "네. 띠 안의 문구와 단추 글, 단추를 눌렀을 때 넘어갈 쪽을 원하는 내용으로 바꿀 수 있습니다.",
    },
  ],
};

export default study;
