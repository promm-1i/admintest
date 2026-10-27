import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "그루브온댄스학원",
  headline: "장르 · 강사 · 시간표를 한 흐름으로 잇는 댄스학원 홈페이지",
  summary:
    "열 가지 댄스 장르와 강사진, 요일별 시간표, 체험 수업, 팝업 특강과 입시·전문반을 39개 화면으로 나누어 보여 주는 댄스아카데미 홈페이지입니다.",
  brandColor: "rgb(190, 255, 58)",
  tintColor: "rgb(241, 244, 235)",
  overview:
    "그루브온댄스학원은 스트릿댄스와 K-POP, 키즈 수업, 입시·전문반을 함께 소개하는 포트폴리오용 가상 브랜드입니다.\n\n메인 화면에서 대표 수업과 강사, 요일별 시간표, 특강 소식을 차례로 살펴볼 수 있습니다. 장르와 강사 상세에서는 해당 강의와 다른 강사를 연결하고, 시간표에서는 요일 탭을 눌러 원하는 수업을 빠르게 찾도록 구성했습니다.\n\n체험 수업과 수강료, 준비물, 자주 묻는 질문, 신청 양식을 각각 나누어 처음 방문한 수강생도 등록 과정을 이해할 수 있습니다. PC 전체 메뉴와 모바일 메뉴, 수업 미리보기와 반응형 배치를 모든 대표 화면에서 확인할 수 있습니다.",
  meta: [
    { label: "업종", value: "댄스학원 · 스트릿댄스 · K-POP 아카데미" },
    { label: "페이지 구성", value: "39쪽 · 메인, 학원 소개, 장르·강사, 시간표, 특강, 입시·전문반, 수강 안내·신청" },
    { label: "이런 곳에 맞습니다", value: "장르와 강사가 많고 키즈반, 팝업 특강, 입시·전문반을 함께 운영하는 댄스학원" },
  ],
  mainShot: "/cases/academy-j/main.webp",
  pagesLabel: "대표 화면",
  pagesTitle: "수업을 찾고 신청하기까지 이어지는 39개 화면",
  pages: [
    { name: "메인", file: "index.html", img: "/cases/academy-j/page-index.webp", desc: "대표 클래스, 학원 특징, 요일별 시간표, 강사진과 최신 소식을 긴 흐름으로 보여 줍니다.", items: ["대표 화면 전환", "시간표 바로가기", "강사·공지 연결"] },
    { name: "시간표", file: "schedule.html", img: "/cases/academy-j/page-schedule.webp", desc: "월요일부터 토요일까지 요일 탭으로 수업 시간과 강사, 홀 정보를 나누어 확인합니다.", items: ["요일 탭", "강사 상세 연결", "홀·수업 시간 안내"] },
    { name: "장르 소개", file: "genre.html", img: "/cases/academy-j/page-genre.webp", desc: "왁킹, 소울, 힙합, 코레오그래피, K-POP 등 열 가지 장르의 특징과 담당 강사를 소개합니다.", items: ["10개 장르", "수업 미리보기", "장르별 강사"] },
    { name: "강사진", file: "instructors.html", img: "/cases/academy-j/page-instructors.webp", desc: "수업 장르에 따라 강사를 묶고 각 프로필과 담당 클래스로 이동할 수 있습니다.", items: ["장르별 묶음", "강사 프로필", "담당 수업 안내"] },
    { name: "수업 신청", file: "contact.html", img: "/cases/academy-j/page-contact.webp", desc: "신청 종류와 희망 수업, 연락 정보를 입력하고 개인정보 동의를 확인하는 화면입니다.", items: ["수업 선택", "필수값 확인", "개인정보 동의"] },
  ],
  points: [
    { title: "장르에서 강사와 시간표로 이어지는 탐색", body: "장르 소개, 강사 카드와 요일별 시간표가 서로 연결되어 방문자가 관심 있는 춤을 고른 뒤 담당 강사와 수업 시간을 연달아 확인할 수 있습니다.", items: ["10개 장르", "18명 강사", "요일별 시간표"], img: "/cases/academy-j/point-navigation.webp", caption: "장르와 강사 탐색" },
    { title: "A·B 홀을 함께 보여 주는 요일별 시간표", body: "같은 시간대에 다른 홀에서 진행하는 수업을 카드로 나누고, 요일 탭과 강사 사진을 이용해 많은 수업도 한눈에 비교할 수 있도록 구성했습니다.", items: ["월~토 탭", "홀 구분", "수업 신청 연결"], img: "/cases/academy-j/point-schedule.webp", caption: "요일별 수업 시간표" },
    { title: "체험부터 특강·입시반까지 나눈 안내", body: "처음 오시는 분, 체험 수업, 팝업 특강, 입시·전문반, 수강료와 환불 기준을 별도 화면으로 나누어 서로 다른 방문 목적에 맞춰 읽을 수 있습니다.", items: ["체험 안내", "팝업 특강", "입시·전문반"], img: "/cases/academy-j/point-content.webp", caption: "수강 목적별 상세 안내" },
  ],
  detailsLabel: "세부 구현",
  detailsTitle: "화면에서 직접 확인할 수 있는 동작",
  details: [
    { title: "PC·모바일 메뉴", body: "PC에서는 여러 단계의 전체 메뉴를 사용하고 모바일에서는 화면 폭에 맞는 펼침 메뉴로 바뀝니다." },
    { title: "시간표와 질문 목록", body: "시간표는 요일 탭으로 선택 내용을 바꾸고 자주 묻는 질문은 필요한 답변만 펼쳐 볼 수 있습니다." },
    { title: "신청 화면", body: "수업 종류와 희망 클래스를 선택하고 필수 항목과 개인정보 동의를 확인한 뒤 시연용 접수 완료 화면으로 이동합니다." },
  ],
  mobile: {
    title: "모바일에서는 카드와 표가 한 열로 바뀝니다",
    body: "휴대폰 폭 390px에서는 강사와 수업 카드, 안내 표가 세로로 재배치됩니다. 요일 탭과 전체 메뉴는 터치로 조작하며 긴 페이지에서도 주요 신청 버튼으로 이동할 수 있습니다.",
    shots: [
      { img: "/cases/academy-j/m-index.webp", caption: "모바일 메인" },
      { img: "/cases/academy-j/m-schedule.webp", caption: "모바일 시간표" },
      { img: "/cases/academy-j/m-instructor.webp", caption: "모바일 강사 소개" },
    ],
  },
  faq: [
    { q: "시간표와 강사 정보는 실제 운영 정보인가요?", a: "아닙니다. 그루브온댄스학원과 화면 속 강사, 일정, 주소는 디자인을 보여 드리기 위해 만든 가상 정보입니다. 실제 제작 단계에서는 운영 중인 시간표와 강사진으로 바꿉니다." },
    { q: "사진과 수업 미리보기를 교체할 수 있나요?", a: "네. 현재 사진과 짧은 미리보기는 포트폴리오용으로 새로 만든 예시입니다. 실제 수업 사진과 영상을 같은 자리에 맞춰 교체할 수 있습니다." },
    { q: "예약이나 결제 기능도 연결할 수 있나요?", a: "현재 화면은 신청 양식과 완료 흐름을 보여 주는 정적 예시입니다. 실제 제작 단계에서는 예약, 결제, 수강생 관리처럼 필요한 기능을 운영 방식에 맞춰 별도로 연결할 수 있습니다." },
  ],
};

export default study;
