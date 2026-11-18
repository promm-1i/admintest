import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "정우병원",
  headline: "치료 · 식이 상담 안내를 탭으로 나눈 암 요양 병원 홈페이지",
  summary: "병원소개, 암면역증진치료, 악액질 · 식이요법, 고객센터를 한 화면씩 탭으로 묶고, 치료와 검사마다 상담 · 준비 안내를 둔 병원 홈페이지입니다.",
  brandColor: "#184a45",
  tintColor: "#edf5f1",
  overview:
    "정우병원의 메인은 병원 건물 사진 두 장이 바뀌는 첫 화면과 진료 안내 팝업으로 시작합니다. 아래로 병원소개 · 암면역증진치료 · 악액질 · 식이요법 · 고객센터 · 협력병원 소개 구역이 이어지고, 구역마다 탭을 눌러 인사말, 치료 종류, 검사 종류를 바꿔 봅니다.\n\n치료 쪽은 비타민 · 면역세포 · 고주파 온열 · 싸이모신 · 미슬토 치료를 나누어, 각각 상담 순서와 방문 전 준비, 치료 중 알림 방법, 자주 묻는 질문을 담았습니다.\n\n악액질 · 식이요법 쪽에는 식품 지연성 반응 검사, 암환자의 식사, 끼니별 사진이 있는 병원식단, 식재료 정보가 있습니다. 고객센터는 공지를 사진과 함께 한 줄씩 보여 주고, 협력병원 이름은 옆으로 흐르는 띠로 보여 줍니다.",
  meta: [
    { label: "업종", value: "암 요양 · 통합 치료 병원" },
    { label: "페이지 구성", value: "메인 · 병원소개 · 의료진 · 치료 안내 · 악액질 검사 · 식이요법 · 병원식단 · 고객센터" },
    { label: "이런 곳에 맞습니다", value: "치료와 검사 종류가 여러 가지이고 식사 · 생활 관리 안내를 함께 보여 줘야 하는 요양 병원" },
  ],
  mainShot: "/cases/jungwoo/main.webp",
  pagesLabel: "페이지 구성",
  pagesTitle: "병원소개부터 치료, 식이 안내까지",
  pages: [
    { name: "인사말", file: "intro.html", img: "/cases/jungwoo/page-intro.webp", desc: "진료 공간 사진 옆에 인사 글을 두고, 아래에 설명 중심 진료 · 안전 확인 · 생활 지원 세 가지를 사진과 함께 안내합니다.", items: ["인사 글", "함께 확인할 내용", "대표 전화"] },
    { name: "병원 스토리", file: "story.html", img: "/cases/jungwoo/page-story.webp", desc: "진료 안내 범위와 처음 문의할 때 확인할 내용을 항목별로 적고, 병원 공간 사진을 모아 보여 줍니다.", items: ["안내 사항", "진료 전 확인", "공간 사진"] },
    { name: "의료진", file: "doctors.html", img: "/cases/jungwoo/page-doctors.webp", desc: "의료진마다 진료 분야와 학력 · 수련, 주요 이력을 나누어 소개합니다.", items: ["진료 분야", "학력 · 수련", "주요 이력"] },
    { name: "병원 둘러보기", file: "tour.html", img: "/cases/jungwoo/page-tour.webp", desc: "접수 · 상담 · 진료 · 검사 · 치료 공간을 설명과 사진으로 차례로 보여 줍니다.", items: ["공간별 안내", "시설 사진", "방문 안내"] },
    { name: "고주파 온열치료", file: "therapy-heat.html", img: "/cases/jungwoo/page-therapy-heat.webp", desc: "상담 순서와 기기 · 방문 안내, 방문 전 준비, 치료 중 불편할 때 알리는 방법, 자주 묻는 질문을 담았습니다.", items: ["상담 순서", "방문 전 준비", "자주 묻는 질문"] },
    { name: "식품 지연성 반응 검사", file: "food-test.html", img: "/cases/jungwoo/page-food-test.webp", desc: "상담에 가져올 식품 기록과 검사 · 결과 상담 순서, 검사 전 문의 사항을 정리했습니다.", items: ["식품 기록", "검사 순서", "결과 상담"] },
  ],
  points: [
    { title: "첫 화면에 진료 안내 팝업이 뜹니다", body: "메인에 들어오면 진료 일정과 방문 안내 팝업이 뜨고, 닫기나 오늘 보지 않기를 누르면 사라집니다.", items: ["안내 팝업", "닫기", "오늘 보지 않기"], img: "/cases/jungwoo/point-popup.webp", caption: "메인 팝업" },
    { title: "치료 종류를 탭으로 바꿔 봅니다", body: "암면역증진치료 구역에서 비타민 · 면역세포 · 고주파 온열 · 싸이모신 · 미슬토 치료 탭을 누르면 그 치료의 안내로 바뀝니다.", items: ["치료 탭", "상담 안내", "자세히 보기"], img: "/cases/jungwoo/point-treatment-tab.webp", caption: "암면역증진치료" },
    { title: "식이 안내도 탭으로 나뉩니다", body: "악액질 · 식이요법 구역에서 악액질 검사 · 식품 지연성 반응 검사 · 암환자의 식사 · 병원식단 탭을 골라 봅니다.", items: ["검사 탭", "식사 탭", "식단 탭"], img: "/cases/jungwoo/point-nutrition-tab.webp", caption: "악액질 · 식이요법" },
    { title: "휴대폰 메뉴를 펼칩니다", body: "휴대폰에서는 오른쪽 위 버튼을 누르면 병원소개 · 암면역증진치료 · 악액질 · 식이요법 · 고객센터 메뉴가 펼쳐집니다.", items: ["메뉴 버튼", "전체 메뉴", "전화 상담"], img: "/cases/jungwoo/point-menu.webp", caption: "휴대폰 메뉴" },
  ],
  detailsLabel: "화면 안내",
  detailsTitle: "화면에서 직접 확인할 수 있는 동작",
  details: [
    { title: "병원식단", body: "끼니 사진 아래에 날짜와 조식 · 중식 · 석식을 적어 사진 칸으로 모아 보여 줍니다." },
    { title: "고객센터", body: "공지마다 제목 · 날짜 · 요약과 오른쪽 사진을 한 줄씩 두고, 더보기로 공지 목록으로 넘어갑니다." },
    { title: "협력병원 소개", body: "협력 의료기관 이름이 옆으로 계속 흐르고, 움직임 줄이기 설정에서는 멈춥니다." },
    { title: "전화 상담", body: "상단 전화 상담 버튼과 오른쪽 아래 전화 문의 버튼으로 대표 번호에 바로 연결됩니다." },
  ],
  mobile: {
    title: "휴대폰에서는 구역이 위아래로",
    body: "390px 폭에서는 구역과 탭이 위아래로 이어지고, 치료 안내 글과 사진이 한 줄씩 놓입니다.",
    shots: [
      { img: "/cases/jungwoo/m-index.webp", caption: "메인" },
      { img: "/cases/jungwoo/m-intro.webp", caption: "인사말" },
      { img: "/cases/jungwoo/m-therapy.webp", caption: "고주파 온열치료" },
      { img: "/cases/jungwoo/m-nutrition.webp", caption: "암환자의 식사" },
    ],
  },
  faq: [
    { q: "치료 종류를 더하거나 뺄 수 있나요?", a: "네. 치료 쪽은 같은 틀이라 치료 이름과 상담 · 준비 안내를 넣어 늘리거나 줄일 수 있습니다." },
    { q: "병원식단 사진은 직접 바꾸나요?", a: "네. 끼니 사진과 날짜만 바꿔 넣으면 같은 칸에 그대로 보입니다." },
    { q: "팝업을 끌 수 있나요?", a: "네. 안내할 내용이 없을 때는 팝업을 빼고 첫 화면만 보여 줄 수 있습니다." },
  ],
};

export default study;
