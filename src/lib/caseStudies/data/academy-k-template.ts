import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "새빛로봇코딩학원",
  headline: "로봇 조립부터 코딩 수업까지 이어지는 학원 홈페이지",
  summary:
    "어린이 · 청소년 · 성인 과정과 학교 · 기관 수업 사례를 나누어 안내하고, 공지 · 소식과 수업 신청 문의로 이어지는 로봇 · 코딩 학원 홈페이지입니다.",
  brandColor: "#2f5bea",
  tintColor: "#eef3ff",
  overview:
    "새빛로봇코딩학원의 메인은 수업 사진과 큰 문구가 넘어가는 첫 화면으로 시작합니다. 아래에는 AI 로봇 동물 과정, 기초 코딩 수업, 파이썬으로 로봇팔을 제어하는 수업 같은 과정 카드가 크기를 달리해 모여 있고, 그 다음에 수업 운영 방식과 학습 사례, 소식이 이어집니다.\n\n과정 메뉴는 어린이 · 청소년 교육과 성인 교육으로 나뉩니다. 과정마다 상세 쪽이 있어 수강 대상 · 학습 내용 · 수업 기간 카드와 수업에서 다루는 내용 네 가지를 보여 줍니다.\n\n수업 사례 메뉴에는 학교 · 기관에서 진행한 수업의 기간과 대상, 결과물 사진과 수업 사진이 정리돼 있습니다. 공지 · 소식은 검색이 되는 목록이고, 수업 신청은 이름 · 연락처 · 이메일 · 희망 지역 · 문의 내용을 적는 양식입니다.",
  meta: [
    { label: "업종", value: "로봇 · 코딩 학원" },
    { label: "페이지 구성", value: "메인 · 학원 안내 · 어린이 · 청소년 교육 · 성인 교육 · 수업 사례 · 공지 · 소식 · 수업 신청" },
    { label: "이런 곳에 맞습니다", value: "어린이 과정과 성인 과정을 함께 운영하고 학교 · 기관 출강 사례를 보여 주려는 로봇 · 코딩 학원" },
  ],
  mainShot: "/cases/saebit/main.webp",
  pagesLabel: "페이지 구성",
  pagesTitle: "과정 소개부터 수업 사례, 수업 신청까지",
  pages: [
    { name: "메인", file: "index.html", img: "/cases/saebit/page-home.webp", desc: "첫 화면 슬라이드 아래로 크기가 다른 과정 카드 묶음과 수업 운영 방식, 학습 사례가 이어집니다.", items: ["첫 화면 슬라이드", "과정 카드 묶음", "수업 운영 방식"] },
    { name: "학원 안내", file: "introduce.html", img: "/cases/saebit/page-introduction.webp", desc: "학원이 기르려는 학습자 모습과 교육 운영 내용, 주제별 · 교과 연계 · 팀별 활동 순서, 강사 · 로봇 교구 · 코딩 앱 같은 수업 자료를 차례로 소개합니다.", items: ["교육 운영 내용", "활동 순서", "수업 자료와 교구"] },
    { name: "어린이 · 청소년 교육", file: "child.html", img: "/cases/saebit/page-child-course.webp", desc: "로봇 축구 수업, AI 동물 돌봄 과정, 디지털 기기와 코딩을 익히는 과정 등을 사진 카드로 모아 보여 줍니다.", items: ["과정 사진 카드", "과정 한 줄 설명", "상세 쪽 연결"] },
    { name: "수업 사례", file: "online-detail.html", img: "/cases/saebit/page-online-course.webp", desc: "학교에서 진행한 수업의 과정명 · 기간 · 대상 · 횟수 · 인원과 수업 결과물, 수업 사진을 한 쪽에 정리했습니다.", items: ["수업 정보", "결과물 사진", "수업 사진"] },
    { name: "공지 · 소식", file: "news.html", img: "/cases/saebit/page-news.webp", desc: "공지사항과 언론 · 소식 탭, 전체 건수와 검색, 날짜가 있는 목록과 쪽 번호가 있습니다.", items: ["공지 · 소식 탭", "검색", "쪽 번호"] },
    { name: "수업 신청", file: "inquiry.html", img: "/cases/saebit/page-inquiry.webp", desc: "이름 · 연락처 · 이메일 · 희망 지역 · 문의 제목과 내용을 적고 개인정보 동의를 확인하는 신청 양식입니다.", items: ["희망 지역", "문의 내용", "개인정보 동의"] },
  ],
  points: [
    { title: "첫 화면이 수업 장면별로 넘어갑니다", body: "첫 화면은 수업 사진과 큰 문구가 장마다 바뀌고, 오른쪽 아래 화살표와 장 번호로 앞뒤를 넘깁니다.", items: ["수업 사진 슬라이드", "장 번호", "화살표 넘기기"], img: "/cases/saebit/point-slider.webp", caption: "첫 화면 슬라이드" },
    { title: "공지에서 검색어로 글을 찾습니다", body: "공지 · 소식 쪽에서 검색어를 넣으면 맞는 글만 남고, 몇 개를 찾았는지 검색칸 아래에 나옵니다.", items: ["검색어 입력", "찾은 개수", "목록 줄이기"], img: "/cases/saebit/point-notice-search.webp", caption: "공지 검색" },
    { title: "수업 신청 양식", body: "이메일 · 희망 지역 · 문의 제목 · 문의 내용 칸이 두 줄로 놓이고, 필수 칸에는 파란 표시가 붙습니다.", items: ["필수 칸 표시", "희망 지역", "문의 내용"], img: "/cases/saebit/point-inquiry-form.webp", caption: "수업 신청" },
    { title: "휴대폰에서는 검은 전체 메뉴가 열립니다", body: "390px 폭에서 메뉴 단추를 누르면 학원 안내 · 어린이 · 청소년 교육 · 성인 교육 · 수업 사례 · 공지 · 소식이 한 화면에 펼쳐지고, 갈래마다 하위 메뉴를 엽니다.", items: ["전체 메뉴", "갈래별 펼치기", "언어 바꾸기"], img: "/cases/saebit/point-mobile-menu.webp", caption: "휴대폰 메뉴" },
  ],
  detailsLabel: "화면 안내",
  detailsTitle: "화면에서 직접 확인할 수 있는 동작",
  details: [
    { title: "과정 상세 쪽", body: "과정 카드를 누르면 수강 대상 · 학습 내용 · 수업 기간 카드와 수업에서 다루는 내용 네 가지가 있는 상세 쪽으로 옮겨 갑니다." },
    { title: "맨 위 띠 알림", body: "맨 위 파란 띠에 학원 알림 한 줄이 있고, 오른쪽 닫기 단추로 숨깁니다." },
    { title: "공지 · 소식 탭", body: "공지사항과 언론 · 소식을 탭으로 바꿔 보고, 글을 누르면 상세 쪽이 열립니다." },
    { title: "수업 신청 안내", body: "수업 신청 양식을 보내면 전화 문의 안내 문구가 나옵니다." },
  ],
  mobile: {
    title: "휴대폰에서는 과정 카드가 한 줄로",
    body: "390px 폭에서는 과정 카드와 수업 사진이 한 줄씩 놓이고, 메뉴는 검은 전체 메뉴로 열립니다.",
    shots: [
      { img: "/cases/saebit/m-home.webp", caption: "메인" },
      { img: "/cases/saebit/m-child-course.webp", caption: "어린이 · 청소년 교육" },
      { img: "/cases/saebit/m-news.webp", caption: "공지 · 소식" },
      { img: "/cases/saebit/m-inquiry.webp", caption: "수업 신청" },
    ],
  },
  faq: [
    { q: "어린이 과정과 성인 과정을 함께 넣을 수 있나요?", a: "네. 메뉴가 어린이 · 청소년 교육과 성인 교육으로 나뉘어 있고, 과정마다 같은 틀의 상세 쪽이 있습니다." },
    { q: "학교 · 기관 출강 사례를 더 늘릴 수 있나요?", a: "네. 수업 사례 쪽은 같은 틀이라 수업 정보와 사진을 넣어 사례를 더할 수 있습니다." },
    { q: "수업 신청을 보내면 바로 접수되나요?", a: "지금은 신청을 보내면 전화 안내 문구가 나옵니다. 온라인 접수를 받으려면 접수 기능을 따로 연결합니다." },
  ],
};

export default study;
