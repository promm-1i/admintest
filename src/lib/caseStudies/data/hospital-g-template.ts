import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "서해중앙병원",
  headline: "진료과 · 전문센터 · 의료진 안내를 갖춘 종합병원 홈페이지",
  summary: "진료과와 전문센터, 의료진, 병원 이용 안내, 진단 장비, 병원 소식과 고객 의견 화면을 갖춘 종합병원 홈페이지입니다.",
  brandColor: "#0f7471",
  tintColor: "#eef7f7",
  overview:
    "서해중앙병원의 메인은 병원 안내 슬라이드로 시작해 서비스 바로가기 아이콘, 의료진 소개, 진료과와 전문센터 칸 띠, 병원 소식, 찾아오시는 길이 차례로 이어집니다. 진료과와 전문센터는 한 줄에 여섯 칸씩 보이고 화살표로 한 칸씩 넘깁니다.\n\n병원 소개 쪽에는 설립 연도와 진료과 · 병상 · 의료진 숫자, 병원 연혁, 병원장 인사말이 있고, 연혁은 왼쪽 글귀를 두고 오른쪽에 연도별 기록을 세로선으로 이어 보여 줍니다. 진료과 쪽은 진료과마다 아이콘 칸을 두고, 마우스를 올리면 칸이 청록색으로 바뀝니다.\n\n이용 안내 쪽은 외래 · 응급 진료 절차, 편의시설, 오시는 길, 비급여 진료비를 나누어 담았습니다. 진단 장비 쪽은 장비마다 사진과 설명을 두고, 자세히 보기를 누르면 큰 사진과 함께 설명 창이 열립니다.",
  meta: [
    { label: "업종", value: "종합병원 · 지역 중심 병원" },
    { label: "페이지 구성", value: "메인 · 병원 소개 · 진료과 · 전문센터 · 의료진 · 이용 안내 · 진단 장비 · 소식과 문의" },
    { label: "이런 곳에 맞습니다", value: "진료과와 전문센터가 많고 외래 · 응급 · 입원 이용 안내를 나누어 보여 줘야 하는 병원" },
  ],
  mainShot: "/cases/seohae/main.webp",
  pagesLabel: "페이지 구성",
  pagesTitle: "병원 소개부터 이용 안내, 진단 장비까지",
  pages: [
    { name: "병원 소개", file: "intro_hsptl.html", img: "/cases/seohae/page-intro_hsptl.webp", desc: "설립 연도와 진료과 · 병상 · 의료진 숫자 아래로 지역 진료와 진료 협력, 진료 분야별 서비스, 브랜드 안내가 이어집니다.", items: ["숫자 네 가지", "진료 협력 안내", "브랜드 안내"] },
    { name: "병원 연혁", file: "intro_history.html", img: "/cases/seohae/page-intro_history.webp", desc: "왼쪽에 병원 글귀를 두고 오른쪽 세로선을 따라 최근 연도는 한 해씩, 이전 기록은 10년씩 묶어 보여 줍니다.", items: ["연도별 묶음", "세로선 연표", "왼쪽 글귀"] },
    { name: "편의시설", file: "amenities.html", img: "/cases/seohae/page-amenities.webp", desc: "대기 공간과 휴게 공간 같은 병원 안 시설을 사진 칸으로 보여 주고, 시설 위치와 이용 중 필요한 도움을 안내합니다.", items: ["시설 사진", "시설 위치", "이용 도움"] },
    { name: "응급 진료", file: "emergencycare.html", img: "/cases/seohae/page-emergencycare.webp", desc: "응급실 접수와 내원 후 절차, 응급 증상, 함께 진료하는 진료과를 순서대로 정리했습니다.", items: ["응급실 접수", "내원 후 절차", "응급 협진 진료과"] },
    { name: "진단 장비", file: "intro_equipment.html", img: "/cases/seohae/page-intro_equipment.webp", desc: "장비마다 사진 · 이름 · 설명을 세 줄로 놓고, 자세히 보기를 누르면 큰 사진과 설명이 든 창이 열립니다.", items: ["장비 사진 칸", "자세히 보기 창", "검사 목적 설명"] },
    { name: "병원 소식", file: "hospitalnews.html", img: "/cases/seohae/page-hospitalnews.webp", desc: "병원 소식을 사진 카드로 모아 보여 주고, 아래에 이용 시 확인할 사항을 붙였습니다.", items: ["사진 카드", "소식 제목 · 날짜", "확인할 사항"] },
  ],
  points: [
    { title: "첫 화면에서 병원 안내를 넘겨 봅니다", body: "메인 첫 화면 오른쪽 아래 화살표를 누르면 진료과 안내 · 병원 이용 안내 · 응급 진료 안내 · 건강검진 안내가 사진과 함께 바뀝니다.", items: ["안내 사진", "바로가기 버튼", "넘김 화살표"], img: "/cases/seohae/point-slider.webp", caption: "메인 첫 화면" },
    { title: "메뉴에 올리면 하위 메뉴가 펼쳐집니다", body: "병원소개 · 진료 · 이용 정보 · 건강 정보 · 소식과 문의 메뉴에 마우스를 올리면 하위 페이지 목록이 펼쳐집니다.", items: ["진료과", "전문센터", "의료진"], img: "/cases/seohae/point-menu.webp", caption: "공통 상단 메뉴" },
    { title: "비급여 진료비를 갈래별로 봅니다", body: "비급여 진료비 쪽에서 행위료 · 치료 재료 · 약제비 · 제증명 수수료 탭을 누르면 해당 항목 표만 남습니다.", items: ["갈래 탭", "항목 표", "금액 확인 안내"], img: "/cases/seohae/point-tabs.webp", caption: "비급여 진료비" },
    { title: "고객 의견을 바로 남깁니다", body: "고객 의견 쪽에서 이름과 연락처, 내용을 적고 개인정보 동의에 체크하면 접수 안내 문구가 나옵니다.", items: ["이름 · 연락처", "의견 내용", "개인정보 동의"], img: "/cases/seohae/point-form.webp", caption: "고객 의견" },
  ],
  detailsLabel: "화면 안내",
  detailsTitle: "화면에서 직접 확인할 수 있는 동작",
  details: [
    { title: "진료과 · 전문센터 칸 띠", body: "메인의 진료과와 전문센터 칸은 화살표로 한 칸씩 넘어가고, 칸마다 진료과에 맞는 아이콘이 붙습니다." },
    { title: "위치 표시 메뉴", body: "하위 쪽 위의 두 칸짜리 위치 메뉴를 누르면 같은 갈래의 다른 쪽으로 바로 옮겨 갑니다." },
    { title: "오시는 길", body: "지도 그림 옆에 주소 · 대표전화 · 주차 안내가 있고, 자가용 이용 · 대중교통 이용 탭으로 지역별 경로를 나누어 봅니다." },
    { title: "병원장 인사말", body: "왼쪽 사진 칸과 오른쪽 인사 글, 맨 아래 서명으로 구성됩니다." },
  ],
  mobile: {
    title: "휴대폰에서는 칸이 두 줄로",
    body: "390px 폭에서는 진료과와 전문센터 칸이 한 줄에 두 칸씩 놓이고, 메뉴는 오른쪽 위 버튼으로 엽니다.",
    shots: [
      { img: "/cases/seohae/m-index.webp", caption: "메인" },
      { img: "/cases/seohae/m-intro_hsptl.webp", caption: "병원 소개" },
      { img: "/cases/seohae/m-amenities.webp", caption: "편의시설" },
      { img: "/cases/seohae/m-touchingstory.webp", caption: "고객 의견" },
    ],
  },
  faq: [
    { q: "진료과나 전문센터를 더할 수 있나요?", a: "네. 진료과 칸과 상세 쪽은 같은 틀이라 이름과 아이콘, 설명을 넣어 늘릴 수 있습니다." },
    { q: "의료진 사진 없이 시작해도 되나요?", a: "네. 지금처럼 진료 공간 사진을 쓰거나 이름과 진료 분야만 먼저 보여 줄 수 있습니다." },
    { q: "고객 의견은 어디로 접수되나요?", a: "지금은 대표 전화로 안내하는 문구가 나오며, 접수 방식은 병원 사정에 맞게 정합니다." },
  ],
};

export default study;
