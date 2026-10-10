import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "담온각",
  headline: "한식 다이닝 · 연회 · 한옥 홈페이지",
  summary: "한옥 공간 안내부터 한식 다이닝, 웨딩, 연회, 문화 프로그램과 예약 문의까지 39쪽에 담은 프리미엄 홈페이지입니다.",
  brandColor: "rgb(120,84,66)",
  tintColor: "rgb(244,240,234)",
  overview: "담온각은 도심 가까운 숲속 한옥에서 다이닝과 모임을 운영하는 가상 브랜드입니다. 첫 화면은 한옥 전경과 문화 프로그램, 공간 · 웨딩 · 다이닝 갈래가 이어지고, 각 건물과 마당을 사진 중심으로 살펴볼 수 있게 구성했습니다.\n\n다이닝은 한식당과 카페를 나누고 룸 · 코스 · 단품 차림을 세부 페이지로 연결했습니다. 야외 웨딩, 한옥 웨딩, 전통 혼례와 연회 안내에는 행사 형태와 공간 규모, 갤러리를 담았습니다. 소식 · 행사 · 갤러리 · FAQ · 고객 문의와 오시는 길도 같은 흐름으로 정리했습니다.",
  meta: [
    { label: "업종", value: "한식 다이닝, 한옥 웨딩, 연회 · 문화공간" },
    { label: "페이지 구성", value: "39쪽 · 메인, 공간 9, 프로그램 3, 웨딩·연회 6, 다이닝 9, 이용안내·소식 11" },
    { label: "이런 곳에 맞습니다", value: "한식당과 카페, 웨딩·연회 공간을 함께 운영하며 시설과 행사를 자세히 보여 줘야 하는 복합 외식 공간" },
  ],
  mainShot: "/cases/restaurant-p/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "39쪽의 주요 구성",
  pages: [
    { name: "메인", file: "index.html", img: "/cases/restaurant-p/page-index.webp", desc: "한옥 전경과 주요 서비스, 문화 프로그램을 한 흐름으로 보여 줍니다.", items: ["자동 전환 첫 장면", "공간 · 웨딩 · 다이닝 갈래", "행사 알림 세 장"] },
    { name: "공간 소개", file: "about.html", img: "/cases/restaurant-p/page-about.webp", desc: "여섯 채의 한옥과 정자, 마당을 카드와 상세 화면으로 안내합니다.", items: ["한옥별 소개", "시설 규모와 특징", "계절 풍경 갤러리"] },
    { name: "한식 다이닝", file: "restaurant.html", img: "/cases/restaurant-p/page-restaurant.webp", desc: "식당 홀과 독립실, 점심 반상 · 코스 · 단품 차림을 나눠 보여 줍니다.", items: ["홀 · 룸 선택", "세 가지 차림", "공간 사진 넘김"] },
    { name: "웨딩", file: "wedding.html", img: "/cases/restaurant-p/page-wedding.webp", desc: "야외 · 한옥 · 전통 혼례의 분위기와 행사 구성을 안내합니다.", items: ["웨딩 유형 3가지", "예식 시간", "행사 갤러리"] },
    { name: "연회", file: "banquet.html", img: "/cases/restaurant-p/page-banquet.webp", desc: "가족 모임부터 기업 행사까지 공간과 상차림을 연결합니다.", items: ["행사 유형", "공간별 규모", "연회 차림"] },
    { name: "문화 프로그램", file: "exhibit.html", img: "/cases/restaurant-p/page-exhibit.webp", desc: "공연 · 전시 · 강좌를 분류하고 상세 안내로 연결합니다.", items: ["분류 탭", "프로그램 카드", "긴 상세 안내"] },
    { name: "예약 · 문의", file: "inquiry.html", img: "/cases/restaurant-p/page-inquiry.webp", desc: "필수 항목과 개인정보 동의를 갖춘 고객 문의 양식입니다.", items: ["문의 분류", "필수값 확인", "데모 접수 안내"] },
  ],
  points: [
    { title: "한 장씩 보이는 첫 화면", body: "첫 장면은 4초마다 다음 장으로 넘어가며 이전·다음 버튼과 현재 순서를 함께 보여 줍니다.", items: ["전환 1초", "자동재생 4초", "모바일 동일 동작"], img: "/cases/restaurant-p/point-hero.webp", caption: "메인 — 첫 장면" },
    { title: "공간별 사진과 시설 정보", body: "각 한옥은 원본의 사진 배열과 시설 수치, 안내 순서를 유지하고 서로 다른 가상 공간명으로 구성했습니다.", items: ["건물별 갤러리", "시설 규모", "연관 공간 이동"], img: "/cases/restaurant-p/point-space.webp", caption: "공간 안내" },
    { title: "다이닝 차림과 독립실", body: "홀과 룸을 고르고 점심 반상, 코스, 단품 차림을 각각 살펴볼 수 있습니다.", items: ["룸 선택", "차림 분류", "사진 넘김"], img: "/cases/restaurant-p/point-dining.webp", caption: "한식 다이닝" },
    { title: "문의 양식의 실제 상태", body: "필수값을 확인하고 외부로 전송하지 않는 템플릿 안내를 보여 주도록 만들었습니다.", items: ["필수값 오류", "접수 안내", "키보드 접근"], img: "/cases/restaurant-p/point-form.webp", caption: "고객 문의" },
  ],
  detailsLabel: "자세히",
  detailsTitle: "구현 기준",
  details: [
    { title: "39쪽의 원본 흐름을 보존했습니다", body: "원본 메뉴와 본문이 내건 링크를 기준으로 공간 · 웨딩 · 연회 · 다이닝 · 소식 페이지를 빠짐없이 연결했습니다." },
    { title: "정적 페이지에서도 숨은 상태가 작동합니다", body: "전체 메뉴, 행사 알림 닫기, FAQ 펼침, 자동 넘김과 문의 양식을 별도 서버 없이 확인할 수 있습니다." },
    { title: "사진은 교체 가능한 자리 그림입니다", body: "원본 사진을 쓰지 않고 실사 사진 256칸과 글자 조판 10칸, 총 266칸의 요청서를 마련했습니다." },
  ],
  mobile: { title: "좁은 화면에서는 이렇게 됩니다", body: "전체 메뉴는 누르면 열리고, 공간 카드와 갤러리·차림표·문의 양식은 화면 너비에 맞춰 재배치됩니다.", shots: [
    { img: "/cases/restaurant-p/m-index.webp", caption: "메인" },
    { img: "/cases/restaurant-p/m-restaurant.webp", caption: "한식 다이닝" },
    { img: "/cases/restaurant-p/m-wedding.webp", caption: "웨딩" },
    { img: "/cases/restaurant-p/m-inquiry.webp", caption: "문의" },
  ] },
  faq: [
    { q: "실제 공간명과 메뉴로 바꿀 수 있나요?", a: "네. 한옥·룸 이름, 시설 수치, 메뉴명·가격과 운영 시간을 실제 자료에 맞춰 교체할 수 있습니다." },
    { q: "예약을 실제 접수 시스템과 연결할 수 있나요?", a: "네. 이메일, 데이터베이스나 예약 관리 도구에 연결하고 개인정보 동의와 접수 알림을 함께 구성할 수 있습니다." },
    { q: "사진은 언제 교체하나요?", a: "현재 실사 사진 자리 256칸을 촬영본이나 생성 이미지로 교체하고 글자 조판 10칸을 구운 뒤, 같은 비율로 최종 검수하면 됩니다." },
  ],
};
export default study;
