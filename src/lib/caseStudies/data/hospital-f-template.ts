import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "서울슬림의원",
  headline: "비만 · 줄기세포 클리닉 홈페이지",
  summary: "지방줄기세포 프로그램 6가지와 센터 소개, 의료진, 온라인 예약·전화 상담 화면을 갖춘 클리닉 홈페이지입니다.",
  brandColor: "#ed6c00",
  tintColor: "#fdf1e6",
  overview: "서울슬림의원의 첫 화면은 영상 슬라이드로 시작해, 스크롤을 내리면 지방조직과 혈액·골수의 줄기세포 수 비교, 프로그램 6가지, 숫자 구간, 치료 후기와 영상, 뉴스룸, 지점 지도가 차례로 이어집니다. 검은 바탕과 흰 바탕을 오가며 주황색을 강조색으로 씁니다.\n\n센터 소개는 세포를 다루며 지키는 기록·온도·설명 세 가지와, 지방 채취부터 분리·보관·시술까지 네 단계를 보여 줍니다. 프로그램 페이지는 진행 방식과 단계별 과정, 문의가 많은 경우를 한 흐름으로 읽게 합니다.\n\n상담·예약은 지점과 희망 프로그램, 날짜를 고르는 온라인 예약과 연락처만 남기는 전화 상담으로 나뉩니다. 어느 페이지에서나 아래쪽 빠른 상담 신청 막대가 함께 따라옵니다.",
  meta: [
    { label: "업종", value: "비만 · 줄기세포 클리닉" },
    { label: "페이지 구성", value: "홈 · 센터 소개 · 프로그램 6종 · 의료진 · 커뮤니티 · 온라인 예약 · 전화 상담" },
    { label: "이런 곳에 맞습니다", value: "프로그램이 여러 가지이고 지점별 예약을 받는 클리닉" },
  ],
  mainShot: "/cases/seoulslim/main.webp",
  pagesLabel: "페이지 구성",
  pagesTitle: "센터와 프로그램, 예약을 화면별로",
  pages: [
    { name: "홈", file: "index.html", img: "/cases/seoulslim/page-index.webp", desc: "영상 슬라이드와 보관 세포 수로 시작해 줄기세포 수 비교, 프로그램 6가지, 뉴스룸과 지점 지도까지 이어집니다.", items: ["영상 슬라이드", "프로그램 6가지", "뉴스룸·지점 지도"] },
    { name: "센터 소개", file: "stem-cell-center_about-center.html", img: "/cases/seoulslim/page-about.webp", desc: "세포를 다루며 지키는 세 가지와 채취·분리·보관·시술 네 단계, 숫자로 본 센터를 보여 줍니다.", items: ["기록·온도·설명", "네 단계 과정", "숫자로 본 센터"] },
    { name: "서울슬림 뱅킹", file: "programs_stem-banking.html", img: "/cases/seoulslim/page-banking.webp", desc: "보관 기간과 온도 기록, 나누어 보관하는 방식, 상담부터 보관 증서 발송까지 여섯 단계를 안내합니다.", items: ["진행 방식", "여섯 단계 과정", "문의가 많은 경우"] },
    { name: "의료진 소개", file: "stem-cell-center_medical-staff.html", img: "/cases/seoulslim/page-staff.webp", desc: "센터장 인사말 아래로 신사 본원 의료진 네 명을 사진과 함께 소개합니다.", items: ["센터장 인사말", "의료진 네 명", "의료진 상세"] },
    { name: "온라인 예약", file: "consultation_online-booking.html", img: "/cases/seoulslim/page-online-consult.webp", desc: "지점과 희망 프로그램, 예약 날짜를 고르고 이름·생년월일·연락처를 적는 예약 화면입니다.", items: ["지점·프로그램 선택", "예약 날짜 달력", "전화·카톡·네이버 예약"] },
    { name: "전화 상담", file: "consultation_phone-booking.html", img: "/cases/seoulslim/page-phone-consult.webp", desc: "이름과 연락처, 상담 내용을 남기면 전화로 연락받는 신청 화면입니다.", items: ["이름·연락처", "상담 내용", "개인정보 동의"] },
  ],
  points: [
    { title: "메뉴에 올리면 하위 메뉴가 펼쳐집니다", body: "센터·Why SEOUL SLIM·프로그램 안내·커뮤니티·상담예약 다섯 메뉴에 마우스를 올리면 하위 페이지 목록이 한 번에 펼쳐집니다.", items: ["지방줄기세포센터", "Why SEOUL SLIM", "프로그램 안내", "커뮤니티", "상담·예약"], img: "/cases/seoulslim/point-menu.webp", caption: "공통 상단 메뉴" },
    { title: "보관 과정을 단계별로 읽습니다", body: "서울슬림 뱅킹 페이지에서 1:1 상담, 자가 지방 채취, 세포 분리, 동결, 보관 장소, 보관 증서 발송을 스크롤하며 차례로 봅니다.", items: ["1:1 상담", "분리·동결", "보관 증서 발송"], img: "/cases/seoulslim/point-banking.webp", caption: "프로그램 · 서울슬림 뱅킹" },
    { title: "의료진을 사진으로 소개합니다", body: "의료진 소개 페이지에서 본원 의료진 네 명의 사진과 이름을 보고, 사진을 누르면 의료진별 상세 화면으로 이동합니다.", items: ["의료진 사진", "이름·직함", "상세 화면"], img: "/cases/seoulslim/point-staff.webp", caption: "센터 · 의료진 소개" },
    { title: "예약에 필요한 칸을 한 화면에", body: "온라인 예약에서 지점, 희망 프로그램, 날짜를 고르고 연락처를 적습니다. 진료시간과 다른 예약 경로도 같은 화면에 있습니다.", items: ["지점 선택", "날짜 달력", "진료시간 안내"], img: "/cases/seoulslim/point-consult.webp", caption: "상담·예약 · 온라인 예약" },
  ],
  detailsLabel: "화면 안내",
  detailsTitle: "페이지를 따라 필요한 내용을 확인합니다",
  details: [
    { title: "스크롤로 움직이는 첫 화면", body: "숫자가 차오르고 세포 그림과 DNA 나선이 스크롤에 맞춰 움직입니다." },
    { title: "프로그램 6가지", body: "뱅킹·스킨·IV·힙라인·바스트·헤어가 같은 틀의 페이지로 나뉘어 있습니다." },
    { title: "빠른 상담 신청 막대", body: "모든 페이지 아래쪽에서 상담 방법과 이름, 연락처를 바로 적을 수 있습니다." },
    { title: "지점 안내", body: "지점 탭을 누르면 약도와 주소, 진료시간이 바뀝니다." },
  ],
  mobile: {
    title: "휴대폰에서도 이어지는 센터 안내",
    body: "작은 화면에서는 메뉴가 펼침 버튼으로 바뀌고, 홈과 프로그램, 의료진, 예약 화면을 세로 흐름으로 살펴볼 수 있습니다.",
    shots: [
      { img: "/cases/seoulslim/m-index.webp", caption: "홈" },
      { img: "/cases/seoulslim/m-banking.webp", caption: "서울슬림 뱅킹" },
      { img: "/cases/seoulslim/m-staff.webp", caption: "의료진 소개" },
      { img: "/cases/seoulslim/m-consult.webp", caption: "온라인 예약" },
    ],
  },
  faq: [
    { q: "예약·상담 신청이 실제로 접수되나요?", a: "현재 화면은 시안이라 신청 내용을 전송하거나 저장하지 않습니다. 실제 접수는 별도 연동이 필요합니다." },
    { q: "어떤 화면을 살펴볼 수 있나요?", a: "홈, 센터 소개, 프로그램 6가지, 의료진 소개, 커뮤니티, 온라인 예약, 전화 상담 화면을 제공합니다." },
    { q: "페이지 구성을 바꿀 수 있나요?", a: "운영하는 센터와 프로그램의 실제 안내 범위에 맞춰 페이지와 문구를 조정할 수 있습니다." },
  ],
};

export default study;
