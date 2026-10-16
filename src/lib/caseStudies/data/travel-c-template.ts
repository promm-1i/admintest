import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "온들군 농촌체험휴양마을",
  headline: "농촌체험 · 마을여행 · 통합예약 홈페이지",
  summary: "열한 마을의 숙소와 체험, 가까운 여행지를 한곳에서 보고 날짜와 인원을 골라 신청하는 26쪽 홈페이지입니다.",
  brandColor: "rgb(0,166,81)",
  tintColor: "rgb(239,245,234)",
  overview:
    "온들군 농촌체험휴양마을은 한 지역의 여러 체험마을을 함께 운영하는 상황을 가정한 디자인입니다.\n\n첫 화면은 여섯 장면으로 나뉩니다. 지역 여행지, 열한 마을 지도, 체험 분류, 추천 코스, 공지와 FAQ, 여행 안내를 화면 단위로 차례로 보여 줍니다.\n\n마을 상세에서는 시설과 체험, 숙소, 교통편을 확인합니다. 숙박과 체험 예약은 마을과 날짜를 고르고 인원을 정한 뒤 신청 정보를 확인하는 순서이며, 예시 화면에서는 실제 저장이나 결제를 하지 않습니다.",
  meta: [
    { label: "업종", value: "농촌체험휴양마을 · 지역 관광 · 숙박 · 체험" },
    { label: "페이지 구성", value: "26쪽 · 홈, 마을 상세 2, 체험 분류 2, 숙박·체험 예약과 조회, 공지·FAQ·사진관, 소개·지도·관광, 로그인·회원가입·약관" },
    { label: "이런 곳에 맞습니다", value: "여러 마을을 한 사이트에서 안내하는 협의체, 숙박과 체험을 함께 접수하는 지역 관광조직" },
  ],
  mainShot: "/cases/ondeul/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "26쪽의 주요 화면",
  pages: [
    { name: "홈", file: "index.html", img: "/cases/ondeul/page-index.webp", desc: "여행지부터 마을 지도, 체험, 코스, 소식, 이용 안내까지 여섯 화면으로 이어집니다.", items: ["fullPage 여섯 화면", "Slick 대표 장면", "마을 지도 · 공지 · 바로가기"] },
    { name: "마을 상세", file: "village-sol.html", img: "/cases/ondeul/page-village.webp", desc: "마을 소개와 체험·숙소·교통 정보를 한쪽에서 확인합니다.", items: ["마을 사진", "시설·체험·숙소", "정적 약도 · 방문 기록"] },
    { name: "체험 안내", file: "experience-farm.html", img: "/cases/ondeul/page-experience.webp", desc: "농사와 생활 체험을 카드로 나누어 설명합니다.", items: ["체험 분류", "프로그램 카드", "마을별 연결"] },
    { name: "숙박 예약", file: "stay-reserve.html", img: "/cases/ondeul/page-reserve.webp", desc: "마을과 날짜, 인원을 고른 뒤 신청 정보를 확인합니다.", items: ["로그인 안내", "달력 · 마을 선택", "인원 · 신청 정보"] },
    { name: "공지사항", file: "notice.html", img: "/cases/ondeul/page-notice.webp", desc: "운영회와 각 마을 공지를 검색하고 상세로 들어갑니다.", items: ["분류 · 검색", "목록 · 상세", "첨부파일 상태"] },
    { name: "사진관", file: "gallery.html", img: "/cases/ondeul/page-gallery.webp", desc: "마을 사진을 목록과 상세 화면으로 구성했습니다.", items: ["사진 격자", "마을 분류", "이전·다음 글"] },
  ],
  points: [
    { title: "첫 화면을 여섯 장면으로\n나눴습니다", body: "여행지, 마을, 체험, 코스, 소식, 이용 안내를 한 화면씩 보여 줍니다. 화면 안의 사진 넘김과 구간 이동은 fullPage·Slick 으로 구성했습니다.", items: ["fullPage.js", "Slick 자동·수동 넘김", "스크롤 상태 헤더"], img: "/cases/ondeul/main.webp", caption: "홈 첫 화면" },
    { title: "열한 마을을 지도에서\n바로 찾습니다", body: "지도 위 마을 이름을 누르면 대표 상세로 이동합니다. 같은 상세 틀을 반복하지 않고 서로 다른 정보량을 가진 두 마을을 대표로 구성했습니다.", items: ["열한 마을 이름", "대표 상세 2쪽", "숙박·체험 바로가기"], img: "/cases/ondeul/point-map.webp", caption: "마을 지도" },
    { title: "예약은 세 단계로\n확인합니다", body: "마을과 날짜를 먼저 고른 뒤 성인·어린이 인원을 선택하고 신청자 정보를 확인합니다. 포트폴리오 화면에서는 저장과 결제가 일어나지 않습니다.", items: ["마을 · 날짜", "인원", "신청 정보"], img: "/cases/ondeul/point-reserve.webp", caption: "숙박 예약" },
  ],
  detailsLabel: "구성",
  detailsTitle: "운영 화면에서 챙긴 것",
  details: [
    { title: "반복 상세는 대표만", body: "마을·체험·관광 상세는 서로 다른 내용량을 보여 줄 대표만 남기고, 목록과 지도에서는 열한 마을 구성을 유지했습니다." },
    { title: "공지 · FAQ · 사진관 모두 목록과 상세", body: "공지 목록·상세, FAQ, 사진관 목록·상세를 하나씩 다 만들었습니다." },
    { title: "PC와 모바일 메뉴를 따로 확인", body: "넓은 화면의 하위 메뉴와 좁은 화면의 열기·펼치기·닫기 동작을 각각 확인했습니다." },
  ],
  mobile: {
    title: "390px에서는 세로로 이어집니다",
    body: "마을 지도와 체험 카드는 한 열로 정리되고, 달력은 일곱 칸을 유지하면서 마을 선택과 다음 단계 단추가 화면 폭에 맞춰 배치됩니다.",
    shots: [
      { img: "/cases/ondeul/m-index.webp", caption: "홈" },
      { img: "/cases/ondeul/m-village.webp", caption: "마을 상세" },
      { img: "/cases/ondeul/m-reserve.webp", caption: "숙박 예약" },
      { img: "/cases/ondeul/m-notice.webp", caption: "공지사항" },
    ],
  },
  faq: [
    { q: "마을 수가 늘어나면 어떻게 하나요?", a: "마을 목록과 지도 표식을 추가하고, 같은 상세 구조를 재사용해 시설·체험·숙소 정보를 등록할 수 있습니다." },
    { q: "예약과 결제가 실제로 되나요?", a: "현재는 화면 흐름을 보여 주는 정적 예시입니다. 실제 운영 시에는 회원 확인, 재고, 결제, 취소 정책을 별도 시스템과 연결해야 합니다." },
    { q: "공지와 사진은 직접 올릴 수 있나요?", a: "관리자 기능을 붙이면 공지·FAQ·사진관을 직접 관리하도록 만들 수 있습니다. 현재 포트폴리오에는 관리자가 연결돼 있지 않습니다." },
    { q: "온들군은 실제 지역인가요?", a: "아닙니다. 디자인 설명을 위해 만든 가상 지역과 마을 이름입니다. 제작 시 실제 명칭과 자료로 교체합니다." },
  ],
};

export default study;
