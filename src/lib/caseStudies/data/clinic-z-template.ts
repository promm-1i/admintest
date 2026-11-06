import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "서울시원안과",
  headline: "시력교정 · 안과 병원 홈페이지",
  summary: "시력교정 수술과 노안 · 백내장, 안질환 진료와 안검진을 각 화면에서 살펴보고 온라인 진료 예약으로 이어집니다.",
  brandColor: "rgb(72, 86, 103)",
  tintColor: "rgb(36, 43, 52)",
  mobileDark: false,
  overview: "서울시원안과 홈페이지에서는 시력교정 수술, 진료센터, 안검진센터 정보를 메뉴별로 나누어 볼 수 있습니다. 차분한 회청색 바탕에 진료 공간과 검사 장면 사진이 이어집니다.\n\n첫 화면에는 오늘 진료 여부와 주요 수술 안내가 보이고, 아래로 내려가면 안과 소개, 고객 후기, 소식과 이벤트, 오시는 길과 진료시간이 차례로 나옵니다. 상담 · 비용 문의와 온라인 진료 예약은 화면 옆 빠른 메뉴에서 바로 열 수 있습니다.",
  meta: [
    { label: "업종", value: "안과 · 시력교정 · 노안 · 백내장 · 안검진" },
    { label: "페이지 구성", value: "메인 · 안과 소개 · 안검진센터 · 진료센터 · 수술센터 · 커뮤니티 · 온라인 예약 · 상담 문의" },
    { label: "이런 곳에 맞습니다", value: "수술과 진료, 검진 정보를 나누어 안내하고 온라인 예약을 받으려는 안과" },
  ],
  mainShot: "/cases/siwoneye/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "수술과 진료 정보를 살펴보고 예약을 준비합니다",
  pages: [
    { name: "홈", file: "index.html", img: "/cases/siwoneye/page-index.webp", desc: "첫 화면에서 오늘 진료 여부와 주요 수술 안내를 보고, 후기와 소식, 오시는 길로 이어집니다.", items: ["진료 여부 안내", "주요 수술", "빠른 메뉴"] },
    { name: "브랜드 스토리", file: "about_brand.html", img: "/cases/siwoneye/page-about_brand.webp", desc: "안과의 목표와 강점, 진료에 대한 생각을 사진과 함께 읽습니다.", items: ["브랜드 소개", "안과의 목표", "강점"] },
    { name: "실크스마일라식", file: "operation_silk.html", img: "/cases/siwoneye/page-operation_silk.webp", desc: "렌티큘 디자인과 레이저 스팟 비교, 수술 장점과 추천 대상을 차례로 살펴봅니다.", items: ["수술 원리", "장점", "추천 대상"] },
    { name: "노안 · 백내장", file: "treatment_senior.html", img: "/cases/siwoneye/page-treatment_senior.webp", desc: "노안의 원인과 발생 비율, 주요 증상과 자가진단, 모노비전 안내를 확인합니다.", items: ["발생 원인", "자가진단", "모노비전"] },
    { name: "안검진센터", file: "checkup_intro.html", img: "/cases/siwoneye/page-checkup_intro.webp", desc: "검진으로 일찍 찾을 수 있는 질환과 추천 대상, 검사 과정과 검진 전 주의사항을 읽습니다.", items: ["조기진단 질환", "검사 과정", "검진 전 주의사항"] },
    { name: "후기", file: "community_review.html", img: "/cases/siwoneye/page-community_review.webp", desc: "수술 종류와 일반 · 영상 후기로 나누어 목록을 보고, 상세에서 교정 전후 시력과 본문을 읽습니다.", items: ["수술 종류별 목록", "교정 전후 시력", "후기 상세"] },
    { name: "이벤트", file: "community_event.html", img: "/cases/siwoneye/page-community_event.webp", desc: "진행 중인 이벤트를 카드 목록으로 보고 상세 안내로 이동합니다.", items: ["이벤트 목록", "상세 안내"] },
    { name: "온라인 진료 예약", file: "online_reservation_write.html", img: "/cases/siwoneye/page-online_reservation_write.webp", desc: "예약 날짜와 시간, 상담 분야, 초진 · 재진 구분을 고르고 개인정보 안내를 확인합니다.", items: ["예약 시간 선택", "상담 분야", "개인정보 동의"] },
  ],
  points: [
    { title: "안과 소개에서\n주요 수술을 고릅니다", body: "메인 화면을 내려가면 실크 스마일 라식, 라식 · 라섹, 렌즈삽입술, 노안 · 백내장, 드림렌즈 카드가 이어지고, 카드를 누르면 각 수술 안내로 넘어갑니다.", items: ["시력교정 수술", "노안 · 백내장", "드림렌즈"], img: "/cases/siwoneye/point-intro.webp", caption: "메인 · 안과 소개" },
    { title: "고객 후기를\n메인에서 바로 봅니다", body: "수술을 받은 분들의 후기 카드가 메인에 이어집니다. 영상후기와 일반후기로 골라 보고, 카드를 누르면 후기 상세로 넘어갑니다.", items: ["후기 카드", "영상 · 일반 후기", "후기 상세"], img: "/cases/siwoneye/point-review.webp", caption: "메인 · 고객 후기" },
    { title: "소식과 이벤트를\n한곳에서 확인합니다", body: "병원 소식과 이벤트가 메인 아래쪽에 함께 보이고, 각 게시판으로 이동해 지난 글도 찾아볼 수 있습니다.", items: ["병원 소식", "이벤트", "게시판 이동"], img: "/cases/siwoneye/point-community.webp", caption: "메인 · 소식과 이벤트" },
    { title: "방문 전에\n둘러보고 자가 진단합니다", body: "안과 둘러보기와 자가 진단 테스트, 문의하기, 오시는 길과 진료시간이 메인 마지막에 이어집니다.", items: ["안과 둘러보기", "자가 진단", "오시는 길 · 진료시간"], img: "/cases/siwoneye/point-around.webp", caption: "메인 · 둘러보기와 오시는 길" },
  ],
  detailsLabel: "안내 내용",
  detailsTitle: "화면에서 확인할 수 있는 정보",
  details: [
    { title: "수술별 원리와 추천 대상", body: "실크스마일라식, 라식 · 라섹, 렌즈삽입술, 노안 · 백내장 수술 화면에서 수술 원리와 장점을 살펴볼 수 있습니다." },
    { title: "진료센터와 안검진", body: "녹내장, 황반변성, 안구건조증, 어린이 근시 같은 진료 안내와 안검진 프로그램, 검사 장비 화면이 있습니다." },
    { title: "온라인 예약과 상담 문의", body: "온라인 진료 예약 화면에서 날짜와 시간, 상담 분야를 고르고, 상담 · 비용 문의 화면에서 궁금한 내용을 남길 수 있습니다." },
  ],
  mobile: {
    title: "휴대폰에서도 수술 정보와 후기를 찾습니다",
    body: "화면이 좁아지면 카드와 본문이 한 열로 이어집니다. 아래쪽 빠른 메뉴에서 간편예약, 카톡상담, 전화상담을 바로 누를 수 있습니다.",
    shots: [
      { img: "/cases/siwoneye/m-index.webp", caption: "메인" },
      { img: "/cases/siwoneye/m-operation_silk.webp", caption: "실크스마일라식" },
      { img: "/cases/siwoneye/m-community_review.webp", caption: "후기" },
    ],
  },
  faq: [
    { q: "수술 이름과 안내 문구를 바꿀 수 있나요?", a: "네. 실제로 하는 수술과 진료 과목에 맞춰 메뉴와 안내 화면을 고칠 수 있습니다." },
    { q: "온라인 예약 화면에서 무엇을 고르나요?", a: "예약 날짜와 시간, 상담 분야, 초진 · 재진 구분, 예약 종류를 고르고 연락처를 적습니다." },
    { q: "후기와 이벤트 게시판도 있나요?", a: "네. 커뮤니티 메뉴에 공지사항, 이벤트, 병원소식, 후기, 미디어 · 언론보도, FAQ가 있습니다." },
  ],
};

export default study;
