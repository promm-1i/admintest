import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "새한종합건축사사무소",
  headline: "건축 · 도시 설계와 건설사업관리를 함께 소개하는 건축사사무소 홈페이지",
  summary: "대표 프로젝트, 업무 분야, 작품 목록, 수상 기록, 사람 소개와 소식을 갖춘 건축사사무소 홈페이지입니다.",
  brandColor: "#b4501e",
  tintColor: "#f5f5f5",
  overview:
    "새한종합건축사사무소의 메인은 한 화면씩 넘어가는 구성입니다. 대표 프로젝트 사진과 발주 기관 · 사업지 · 부지 면적 · 연면적이 첫 화면에 나오고, 이어서 회사 소개와 숫자 네 개, 대표 프로젝트 슬라이드, 업무시설 · 주거시설 · 문화시설 구역이 차례로 넘어갑니다. 마지막 화면에는 소식, 작품 목록, 업무 분야 네 가지가 이어집니다.\n\n업무 분야 쪽은 건축 설계 · 도시 설계 · BIM 설계 · 건설사업관리를 왼쪽 메뉴로 나누고, 분야마다 설명과 사례 사진 세 장을 붙였습니다.\n\n작품 쪽은 분류 · 지역 · 연도로 고르는 사진 목록이고, 수상 쪽은 연도별 수상 기록과 작품 사진을 나란히 보여 줍니다. 사람 소개는 팀별로 나눠 이름과 직함을 작업 사진 칸과 함께 보여 줍니다.",
  meta: [
    { label: "업종", value: "건축사사무소 · 설계 · 건설사업관리" },
    { label: "페이지 구성", value: "메인 · 회사 소개 · 업무 분야 · 작품 · 수상 · 사람 · 채용 · 소식" },
    { label: "이런 곳에 맞습니다", value: "작품과 수상 기록이 많고 설계 · 감리 · 사업관리 분야를 나누어 보여 줘야 하는 건축사사무소" },
  ],
  mainShot: "/cases/saehanarch/main.webp",
  pagesLabel: "페이지 구성",
  pagesTitle: "대표 프로젝트부터 작품, 수상, 사람 소개까지",
  pages: [
    { name: "메인", file: "index.html", img: "/cases/saehanarch/page-home.webp", desc: "대표 프로젝트 화면 아래로 업무 분야 아이콘 띠, 회사 소개와 숫자 네 개, 대표 프로젝트 슬라이드가 한 화면씩 이어집니다.", items: ["대표 프로젝트", "회사 소개 숫자", "프로젝트 슬라이드"] },
    { name: "회사 소개", file: "about.html", img: "/cases/saehanarch/page-company.webp", desc: "회사 개요 글과 큰 건물 사진, 도시 · 이용자 · 지속가능성 · 기술 네 가지 설계 방향을 아이콘과 함께 설명합니다.", items: ["회사 개요", "설계 방향 네 가지", "건물 사진"] },
    { name: "업무 분야", file: "services.html", img: "/cases/saehanarch/page-services.webp", desc: "건축 설계 · 도시 설계 · BIM 설계 · 건설사업관리를 왼쪽 메뉴로 나누고, 분야마다 설명과 사례 사진 세 장을 붙였습니다.", items: ["분야 메뉴", "분야 설명", "사례 사진"] },
    { name: "작품", file: "works.html", img: "/cases/saehanarch/page-projects.webp", desc: "분류 · 지역 · 연도로 고르는 작품 사진 목록이고, 사진형과 목록형으로 바꿔 볼 수 있습니다.", items: ["분류 · 지역 · 연도", "사진형 · 목록형", "작품 상세 연결"] },
    { name: "수상", file: "award.html", img: "/cases/saehanarch/page-award.webp", desc: "연도별로 수상 · 선정 기록을 적고 오른쪽에 해당 작품 사진을 붙였으며, 연대별 탭으로 넘겨 봅니다.", items: ["연대별 탭", "연도별 기록", "작품 사진"] },
    { name: "소식", file: "news.html", img: "/cases/saehanarch/page-news.webp", desc: "새한 소식과 보도 자료를 탭으로 나누고 검색이 되는 사진 카드 목록입니다.", items: ["소식 · 보도 자료 탭", "검색", "사진 카드"] },
  ],
  points: [
    { title: "첫 화면에서 대표 프로젝트를 넘겨 봅니다", body: "첫 화면 왼쪽 아래 화살표를 누르면 다음 프로젝트 사진과 발주 기관 · 사업지 · 면적 · 설계 연도가 함께 바뀝니다.", items: ["프로젝트 사진", "프로젝트 정보", "장 번호"], img: "/cases/saehanarch/point-home-slider.webp", caption: "대표 프로젝트" },
    { title: "소식을 갈래별로 걸러 봅니다", body: "소식 쪽에서 새한 소식 · 보도 자료 탭을 누르면 그 갈래의 카드만 남고, 검색어로 다시 좁힐 수 있습니다.", items: ["갈래 탭", "검색어", "사진 카드"], img: "/cases/saehanarch/point-news-filter.webp", caption: "소식 갈래" },
    { title: "작품을 분류 · 지역 · 연도로 고릅니다", body: "작품 쪽 위의 고르기 칸으로 분류와 지역, 연도를 정하면 사진 목록이 바뀝니다.", items: ["분류", "지역", "연도"], img: "/cases/saehanarch/point-project-filter.webp", caption: "작품 고르기" },
    { title: "업무 분야로 바로 옮겨 갑니다", body: "메인 업무 분야 아이콘이나 업무 분야 쪽 왼쪽 메뉴를 누르면 건축 설계 · 도시 설계 · BIM 설계 · 건설사업관리 중 해당 칸으로 바로 내려갑니다.", items: ["분야 아이콘", "왼쪽 메뉴", "바로 이동"], img: "/cases/saehanarch/point-service-anchor.webp", caption: "업무 분야" },
  ],
  detailsLabel: "화면 안내",
  detailsTitle: "화면에서 직접 확인할 수 있는 동작",
  details: [
    { title: "한 화면씩 넘어가는 메인", body: "넓은 화면에서는 마우스 휠 한 번에 한 구역씩 넘어가고, 오른쪽 점으로 원하는 구역에 바로 갑니다." },
    { title: "구역 제목이 나타나는 동작", body: "구역에 들어서면 제목 글자가 한 글자씩 나타나고, 회사 소개 숫자는 0 에서 세어 올라갑니다." },
    { title: "사람 소개", body: "사람 쪽은 팀별 메뉴로 나뉘고, 이름과 직함 아래 작업 사진 칸이 붙습니다." },
    { title: "채용 안내", body: "인재상 · 복리후생 · 채용 공고 쪽이 따로 있어 채용 정보를 나누어 보여 줍니다." },
  ],
  mobile: {
    title: "휴대폰에서는 구역이 이어지는 긴 화면으로",
    body: "390px 폭에서는 한 화면씩 넘기지 않고 구역이 위아래로 이어지며, 작품과 소식 카드는 한 줄씩 놓입니다.",
    shots: [
      { img: "/cases/saehanarch/m-home.webp", caption: "메인" },
      { img: "/cases/saehanarch/m-company.webp", caption: "회사 소개" },
      { img: "/cases/saehanarch/m-projects.webp", caption: "작품" },
      { img: "/cases/saehanarch/m-news.webp", caption: "소식" },
    ],
  },
  faq: [
    { q: "작품을 직접 더할 수 있나요?", a: "네. 작품 목록과 상세 쪽은 같은 틀이라 사진과 프로젝트 정보를 넣어 늘릴 수 있습니다." },
    { q: "메인의 한 화면씩 넘어가는 방식을 끌 수 있나요?", a: "네. 일반 스크롤 방식으로 바꿀 수 있고, 휴대폰에서는 이미 위아래로 이어지는 화면입니다." },
    { q: "사람 사진이 없어도 되나요?", a: "네. 지금처럼 작업 장면 사진을 쓰거나 이름과 직함만 보여 줄 수 있습니다." },
  ],
};

export default study;
