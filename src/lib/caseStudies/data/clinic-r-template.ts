import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "압구정봄빛의원",
  headline: "피부 고민별 진료를 차분하게 고르는 피부 · 미용 의원 홈페이지",
  summary: "리프팅과 탄력, 피부결과 색소, 여드름 · 모공 · 흉터처럼 고민별로 진료를 나눠 안내합니다. 의료진 소개와 진료 소식, 진료시간과 오시는 길을 함께 살펴볼 수 있습니다.",
  brandColor: "#ff7048",
  tintColor: "#fbfaf9",
  mobileDark: false,
  overview: "첫 화면은 큰 영문 제목과 장비 사진으로 열리고, 아래로 내리면 공간 소개와 고민별 진료, 의료진 인사, 공간 사진과 오시는 길이 이어집니다.\n\n진료 페이지는 고민을 묻는 질문으로 시작해 원인과 관리 방법을 설명하고, 탭으로 시술을 바꿔 가며 읽습니다. 진료시간과 상담 채널, 지도와 길찾기 버튼은 오시는 길에 모았습니다.",
  meta: [
    { label: "업종", value: "피부 · 미용 의원" },
    { label: "주요 구성", value: "고민별 진료 · 의료진 · 전후 사진 · 이벤트 · 진료안내 / 오시는 길" },
  ],
  mainShot: "/cases/bombit/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "고민별 진료에서 방문 안내까지",
  pages: [
    { name: "메인", file: "index.html", img: "/cases/bombit/page-index.webp", desc: "공간 소개, 고민별 진료, 의료진 인사, 공간 사진과 오시는 길을 차례로 살펴봅니다.", items: ["첫 화면", "고민별 진료", "의료진 인사"] },
    { name: "여드름 · 모공 · 흉터", file: "Acne_pore_scars.php.html", img: "/cases/bombit/page-acne.webp", desc: "생활 습관을 묻는 질문에서 시작해 원인과 관리 방법을 설명하고 시술을 탭으로 바꿔 읽습니다.", items: ["고민 질문", "시술 탭", "개선 사례"] },
    { name: "의료진 소개", file: "medical_staff.php.html", img: "/cases/bombit/page-staff.webp", desc: "진료에서 중요하게 여기는 관점과 공간 사진, 원장 약력을 소개합니다.", items: ["진료 관점", "공간 사진", "약력"] },
    { name: "이벤트", file: "bbs_board.php__bo_table=event_wr_id=38.html", img: "/cases/bombit/page-event.webp", desc: "진료 소식의 기간과 안내 그림을 보고 이전 · 다음 글로 이동합니다.", items: ["진료 기간", "안내 그림", "이전 · 다음 글"] },
    { name: "진료안내 / 오시는 길", file: "information.php.html", img: "/cases/bombit/page-location.webp", desc: "요일별 진료시간과 상담 채널, 지도와 길찾기 버튼을 한 화면에서 확인합니다.", items: ["진료시간", "상담 채널", "길찾기"] },
  ],
  points: [
    { title: "시술을 탭으로 바꿔\n이어서 읽습니다", body: "진료 페이지마다 관련 시술을 탭으로 묶어, 탭을 누르면 설명과 영상 자리가 함께 바뀝니다.", items: ["시술 탭", "시술 설명"], img: "/cases/bombit/point-tabs.webp", caption: "여드름 · 모공 · 흉터" },
    { title: "메뉴를 펼쳐\n찾는 진료로 이동합니다", body: "오른쪽 위 메뉴를 열면 리프팅, 피부결 · 톤업, 쁘띠 · 페이셜, 커뮤니티까지 전체 진료가 한 화면에 펼쳐집니다.", items: ["전체 메뉴", "고민별 진료"], img: "/cases/bombit/point-menu.webp", caption: "공통 · 전체 메뉴" },
    { title: "진료시간과 상담 채널을\n함께 확인합니다", body: "요일별 진료시간 옆에 전화, 네이버 예약, 카카오톡, LINE, 위챗 상담 버튼을 두었습니다.", items: ["진료시간", "상담 채널"], img: "/cases/bombit/point-location.webp", caption: "진료안내 / 오시는 길" },
  ],
  detailsLabel: "상세 내용",
  detailsTitle: "상담 전에 궁금한 내용을 찾는 흐름",
  details: [
    { title: "고민별로 나뉜 진료", body: "리프팅, 콜라겐 부스터, 색소 · 홍조 · 미백, 여드름 · 모공 · 흉터 등 고민에 맞는 페이지에서 원인과 관리 방법을 읽습니다." },
    { title: "전후 사진과 후기", body: "전후 사진 게시판은 진료 분류별로 나뉘고, 진료 페이지 아래 후기 칸에서 진료를 받은 분들의 글을 넘겨 봅니다." },
  ],
  mobile: {
    title: "휴대폰에서도 같은 순서로",
    body: "작은 화면에서는 장면이 한 열로 이어지고, 오른쪽 빠른 메뉴에서 전화와 메신저 상담으로 바로 이동합니다.",
    shots: [
      { img: "/cases/bombit/m-index.webp", caption: "모바일 메인" },
      { img: "/cases/bombit/m-acne.webp", caption: "모바일 여드름 · 모공 · 흉터" },
    ],
  },
  faq: [
    { q: "어떤 진료를 안내하나요?", a: "리프팅과 탄력, 콜라겐 부스터, 색소 · 홍조 · 미백, 여드름 · 모공 · 흉터, 쁘띠 시술을 고민별로 안내합니다." },
    { q: "전후 사진은 어떻게 보나요?", a: "커뮤니티의 전후 사진에서 진료 분류를 골라 사례를 볼 수 있습니다." },
  ],
};

export default study;
