import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "갤러리 노바르크",
  headline: "갤러리 · 전시 공간 홈페이지",
  summary:
    "큰 전시 이미지와 스크롤 장면, 전시 상세, 두 층의 공간 소개, 대관 일정과 문의까지 한 흐름으로 연결한 갤러리 홈페이지입니다.",
  brandColor: "rgb(17,17,17)",
  tintColor: "rgb(246,244,239)",
  overview:
    "갤러리 노바르크는 동시대 전시와 공간 대관을 함께 운영하는 판매용 갤러리 예시 디자인입니다. 첫 화면은 큰 이미지와 짧은 문구가 스크롤에 맞춰 전환되고, 현재 전시 소개와 방문 안내, 공간 대관으로 이어집니다.\n\n소개에서는 갤러리 운영 방향과 6층·7층 공간의 규격을 보여 줍니다. 전시는 현재 · 예정 · 지난 전시로 나뉘며, 대관 일정과 신청 조회, 문의 양식은 실제 전송 없이 화면 동작을 확인할 수 있는 예시로 구성했습니다. 뉴스와 자주 묻는 질문까지 포함해 운영형 갤러리 사이트의 주요 화면을 모두 살펴볼 수 있습니다.",
  meta: [
    { label: "업종", value: "갤러리 · 미술관 · 전시 대관" },
    { label: "페이지 구성", value: "16쪽 · 소개, 공간, 전시, 대관, 문의, 뉴스, FAQ" },
    { label: "이런 곳에 맞습니다", value: "갤러리, 복합 문화 공간, 전시 대관 공간, 작가 공동 전시장" },
  ],
  mainShot: "/cases/artist-b/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "16쪽이 어떻게 이어지는지",
  pages: [
    { name: "홈", file: "index.html", img: "/cases/artist-b/page-index.webp", desc: "큰 전시 장면에서 현재 전시, 방문 안내, 공간 대관으로 이어집니다.", items: ["스크롤 연동 첫 화면", "현재 전시 · 방문 안내", "6층·7층 대관 소개"] },
    { name: "갤러리 소개", file: "about-story.html", img: "/cases/artist-b/page-about.webp", desc: "공간 · 작가 · 관람객을 기준으로 운영 방향을 설명합니다.", items: ["갤러리 이야기", "운영 방향 세 가지", "디지털 오브제 포스터"] },
    { name: "공간 소개", file: "about-space.html", img: "/cases/artist-b/page-space.webp", desc: "6층과 7층 공간을 전환해 시설과 규격을 확인합니다.", items: ["층별 공간 전환", "사진 갤러리", "면적 · 조명 · 음향 · 전시 장치"] },
    { name: "현재 전시", file: "exhibition-current.html", img: "/cases/artist-b/page-exhibition.webp", desc: "대표 이미지, 전시 글, 참여 작가와 작품을 한 페이지에 담았습니다.", items: ["전시 대표 이미지", "전시 소개", "참여 작가 · 작품"] },
    { name: "지난 전시", file: "exhibition-past.html", img: "/cases/artist-b/page-past.webp", desc: "지난 전시를 날짜와 전시장 정보가 있는 카드로 정리했습니다.", items: ["지난 전시 카드", "기간 · 공간", "더 보기 버튼"] },
    { name: "대관", file: "rent-schedule.html", img: "/cases/artist-b/page-rent.webp", desc: "대관 기준과 유의사항, 일정 선택 화면을 함께 보여 줍니다.", items: ["대관 안내 · 유의사항", "월별 일정", "신청 · 조회 · 문의"] },
    { name: "뉴스 · FAQ", file: "notice-list.html", img: "/cases/artist-b/page-notice.webp", desc: "공지 목록과 펼쳐 보는 질문 답변으로 운영 정보를 전달합니다.", items: ["뉴스 · 공지 목록", "공지 상세 대표 2쪽", "FAQ 아코디언"] },
  ],
  points: [
    { title: "스크롤에 맞춰\n장면이 이어집니다", body: "Lenis 스크롤과 GSAP 장면을 사용해 큰 이미지와 문구가 차례로 이어집니다. 모바일에서는 같은 내용을 짧은 이동 거리로 조정했습니다.", items: ["부드러운 휠 감쇠", "스크롤 연동 등장", "모바일 이동 거리 조정"], img: "/cases/artist-b/point-scroll.webp", caption: "홈 · 스크롤 장면" },
    { title: "두 층의 공간을\n한 화면에서 비교합니다", body: "6층과 7층 버튼을 누르면 공간 영상 포스터, 사진 목록, 면적과 설비 정보가 함께 바뀝니다.", items: ["층별 버튼", "포스터 · 사진 갤러리", "공간 규격과 설비"], img: "/cases/artist-b/point-space.webp", caption: "공간 · 층 전환" },
    { title: "전시와 대관을\n운영 화면까지 연결합니다", body: "전시 소개만 보여 주지 않고 대관 일정, 신청 조회, 문의, 공지와 FAQ까지 같은 디자인으로 연결했습니다.", items: ["현재 · 예정 · 지난 전시", "대관 일정 · 조회", "문의 · 뉴스 · FAQ"], img: "/cases/artist-b/point-rent.webp", caption: "대관 · 운영 화면" },
  ],
  detailsLabel: "자세히",
  detailsTitle: "만들 때 신경 쓴 것",
  details: [
    { title: "사진이 바뀌어도 비율이 유지됩니다", body: "전시와 공간 사진 칸마다 지정 비율을 유지해 실제 사진으로 교체해도 레이아웃이 흔들리지 않게 구성했습니다." },
    { title: "폼은 상태를 분명히 보여 줍니다", body: "필수 입력, 오류, 제출 중, 완료 상태를 구분할 수 있으며 현재 미리보기에서는 실제 전송 없이 안내만 표시합니다." },
    { title: "모바일 메뉴와 FAQ를 손가락으로 조작합니다", body: "모바일 메뉴와 질문 답변은 탭으로 열고 닫으며, 버튼의 열림 상태도 보조 기술에 전달합니다." },
  ],
  mobile: {
    title: "좁은 화면에서는 이렇게 됩니다",
    body: "큰 제목과 사진은 한 열로 바뀌고, 전체 메뉴는 화면을 덮어 탭으로 조작합니다. 공간 정보와 대관 폼도 가로 스크롤 없이 한 줄씩 쌓입니다.",
    shots: [
      { img: "/cases/artist-b/m-index.webp", caption: "홈" },
      { img: "/cases/artist-b/m-space.webp", caption: "공간 소개" },
      { img: "/cases/artist-b/m-exhibition.webp", caption: "현재 전시" },
      { img: "/cases/artist-b/m-rent.webp", caption: "대관" },
    ],
  },
  faq: [
    { q: "전시와 작품은 직접 바꿀 수 있나요?", a: "관리자 기능을 추가하면 전시 제목, 기간, 작가, 작품 사진과 설명을 직접 등록하고 수정할 수 있습니다." },
    { q: "대관 일정을 실제 예약과 연결할 수 있나요?", a: "가능합니다. 일정별 가능 여부, 신청서 접수, 관리자 승인과 조회 기능을 운영 방식에 맞춰 연결합니다." },
    { q: "영상 대신 사진만 사용해도 되나요?", a: "네. 영상 칸은 같은 비율의 사진이나 짧은 자체 영상으로 바꿀 수 있습니다." },
    { q: "노바르크는 실제 갤러리인가요?", a: "아닙니다. 디자인을 보여 드리기 위해 만든 예시 갤러리이며 전시명, 작가명, 작품, 공간 사진도 모두 예시입니다." },
  ],
};

export default study;
