import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "로우멜커피",
  headline: "커피 프랜차이즈 본사 홈페이지",
  summary: "한 화면씩 넘어가는 메인과 메뉴 · 매장 · 창업 정보를 35쪽에 담은 커피 프랜차이즈 홈페이지입니다.",
  brandColor: "rgb(201,58,24)",
  tintColor: "rgb(247,244,238)",
  overview: "로우멜커피는 커피와 베이글을 함께 내는 가상의 프랜차이즈 브랜드입니다. 첫 화면에는 행사 알림 세 장과 브랜드 갈래를 두고, 메뉴 · 매장 · 창업 · 소식 · 문의로 자연스럽게 이어지도록 구성했습니다.\n\n메뉴는 일반 매장과 소형 매장 두 갈래로 나뉘며 카드를 누르면 원재료와 알레르기 안내가 열립니다. 매장 찾기는 정적 지도와 지역 검색, 대표 매장 상세 두 쪽으로 구성했습니다. 창업 영역에는 절차 · 예상 비용 · 인테리어 · 자주 묻는 질문 · 상담 양식을 담았습니다.",
  meta: [
    { label: "업종", value: "커피 · 베이커리 프랜차이즈 본사, 카페 브랜드" },
    { label: "페이지 구성", value: "35쪽 · 메인, 브랜드 5, 메뉴 2, 매장 4, 소식 9, 창업 9, 문의 3, 정책 3" },
    { label: "이런 곳에 맞습니다", value: "메뉴와 매장을 안내하면서 가맹 상담까지 한 사이트에서 받아야 하는 외식기업" },
  ],
  mainShot: "/cases/restaurant-o/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "35쪽의 주요 구성",
  pages: [
    { name: "메인", file: "index.html", img: "/cases/restaurant-o/page-index.webp", desc: "팝업 세 장과 브랜드 갈래가 있는 장면형 첫 화면입니다.", items: ["행사 알림 세 장", "일반 · 소형 매장 갈래", "창업 상담 · 쇼핑 바로가기"] },
    { name: "브랜드", file: "story-brand.html", img: "/cases/restaurant-o/page-brand.webp", desc: "브랜드의 원두와 공간 철학을 소개합니다.", items: ["브랜드 이야기", "로고와 색상", "회사 · 앱 소개"] },
    { name: "메뉴", file: "menu.html", img: "/cases/restaurant-o/page-menu.webp", desc: "분류 탭과 상세 창이 있는 메뉴 목록입니다.", items: ["커피 · 베이글 분류", "메뉴 상세 창", "원재료 · 알레르기 안내"] },
    { name: "매장 찾기", file: "stores.html", img: "/cases/restaurant-o/page-stores.webp", desc: "지역 검색과 정적 지도를 나란히 둔 매장 찾기입니다.", items: ["시도 · 시군구 선택", "매장 목록", "대표 매장 상세 2쪽"] },
    { name: "창업 안내", file: "franchise.html", img: "/cases/restaurant-o/page-franchise.webp", desc: "개설 절차와 지원 내용을 한 흐름으로 보여 줍니다.", items: ["개설 절차", "비용 · 인테리어", "FAQ · 상담 양식"] },
    { name: "소식", file: "news.html", img: "/cases/restaurant-o/page-news.webp", desc: "뉴스 · 공지 · 브랜드 소식 목록과 본문입니다.", items: ["세 가지 게시판", "대표 본문 각 2쪽", "목록으로 돌아가기"] },
    { name: "문의", file: "contact.html", img: "/cases/restaurant-o/page-contact.webp", desc: "고객 · 협력업체 · 제휴 문의를 나눈 입력 양식입니다.", items: ["필수 입력 확인", "개인정보 동의", "중복 제출 방지 안내"] },
  ],
  points: [
    { title: "첫 화면 행사 알림", body: "세 장의 알림을 나란히 열고 각 알림을 따로 닫거나 오늘 하루 보지 않기를 고를 수 있습니다.", items: ["개별 닫기", "모바일 겹침 배치"], img: "/cases/restaurant-o/point-popup.webp", caption: "메인 — 알림" },
    { title: "메뉴 상세 창", body: "메뉴 카드를 누르면 설명과 원재료 · 알레르기 정보가 같은 화면 위에 열립니다.", items: ["키보드 닫기", "모바일 탭 동작"], img: "/cases/restaurant-o/point-menu.webp", caption: "메뉴" },
    { title: "지도와 매장 목록", body: "지도 옆에서 지역을 고르고 검색해 매장을 찾는 원본 구성을 정적 지도 예시로 구현했습니다.", items: ["지역 선택", "매장 상세 연결"], img: "/cases/restaurant-o/point-store.webp", caption: "매장 찾기" },
  ],
  detailsLabel: "자세히",
  detailsTitle: "구현 기준",
  details: [
    { title: "두 브랜드 흐름을 보존했습니다", body: "일반 매장과 소형 매장의 메뉴 · 소개 · 창업 안내를 각각 살펴볼 수 있습니다." },
    { title: "문의 양식은 데모로 안전하게 동작합니다", body: "필수값을 확인하고 실제 외부 전송 대신 템플릿 안내를 보여 줍니다." },
    { title: "사진은 교체 가능한 자리 그림입니다", body: "원본 사진을 쓰지 않고 86개 사진 칸과 개별 생성 요청서를 마련했습니다." },
  ],
  mobile: { title: "좁은 화면에서는 이렇게 됩니다", body: "머리 메뉴는 누르면 열리는 형태로 바뀌고, 메뉴 카드와 문의 양식은 한 줄씩 쌓입니다.", shots: [
    { img: "/cases/restaurant-o/m-index.webp", caption: "메인" }, { img: "/cases/restaurant-o/m-menu.webp", caption: "메뉴" }, { img: "/cases/restaurant-o/m-stores.webp", caption: "매장 찾기" }, { img: "/cases/restaurant-o/m-franchise.webp", caption: "창업 안내" },
  ] },
  faq: [
    { q: "실제 메뉴와 매장 정보로 바꿀 수 있나요?", a: "네. 메뉴 사진 · 설명 · 가격과 매장 주소 · 운영 시간을 실제 자료로 교체할 수 있습니다." },
    { q: "지도 서비스를 연결할 수 있나요?", a: "네. 현재는 정적 예시 지도이며 제작 시 사용하는 지도 서비스와 매장 데이터를 연결할 수 있습니다." },
    { q: "창업 문의는 어디로 접수되나요?", a: "원하는 이메일이나 고객관리 시스템으로 연결하고 개인정보 동의와 접수 알림을 함께 구성할 수 있습니다." },
  ],
};
export default study;
