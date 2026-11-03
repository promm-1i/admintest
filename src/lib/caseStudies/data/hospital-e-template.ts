import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "오르벨라 정형외과",
  headline: "정형외과 병원 홈페이지",
  summary:
    "진료과와 의료진, 입원 준비, 병원 공간과 재활 정보를 화면별로 안내하는 정형외과 병원 홈페이지입니다.",
  brandColor: "rgb(34, 117, 126)",
  tintColor: "rgb(241, 247, 247)",
  overview:
    "오르벨라 정형외과 홈페이지에서는 관절 · 척추 진료와 입원, 재활 정보를 함께 살펴볼 수 있습니다. 병원 건물과 진료 공간 사진이 화면마다 이어집니다.\n\n첫 화면에서 진료 분야와 방문 안내를 보여주고, 진료과·의료진·입원·병원 둘러보기·재활센터·건강 정보 페이지로 이어집니다. 메뉴와 페이지 안의 탭, 질문 목록, 날짜 선택 및 입력 안내를 화면에서 확인할 수 있습니다.\n\n흰색과 밝은 회색 바탕 위에 사진과 안내 표가 번갈아 놓여 긴 진료 정보도 나누어 읽을 수 있습니다.",
  meta: [
    { label: "업종", value: "정형외과 병원" },
    { label: "페이지 구성", value: "진료 안내 · 의료진 · 입원 · 병원 둘러보기 · 재활센터 · 건강 정보" },
    { label: "이런 곳에 맞습니다", value: "진료 분야와 병원 이용 정보를 함께 안내하려는 병원" },
  ],
  mainShot: "/cases/orvella/main.webp",
  pagesLabel: "페이지 구성",
  pagesTitle: "필요한 안내를 페이지별로",
  pages: [
    { name: "첫 화면", file: "index.html", img: "/cases/orvella/page-home.webp", desc: "병원 소개와 주요 안내로 시작하는 첫 화면입니다.", items: ["진료 안내", "방문 정보", "예약 안내"] },
    { name: "진료과 안내", file: "dep_shoulder.php.html", img: "/cases/orvella/page-shoulder.webp", desc: "어깨 진료의 설명과 치료 정보를 살펴봅니다.", items: ["질환 안내", "치료 정보", "관련 질문"] },
    { name: "입원 안내", file: "gui_admission02.php.html", img: "/cases/orvella/page-admission.webp", desc: "입원 전후에 필요한 준비와 이용 정보를 확인합니다.", items: ["입원 준비", "병동 생활", "퇴원 안내"] },
    { name: "병원 둘러보기", file: "hos_tour.php.html", img: "/cases/orvella/page-tour.webp", desc: "병원 공간을 사진과 설명으로 소개합니다.", items: ["층별 안내", "공간 소개", "방문 정보"] },
    { name: "재활센터", file: "srp_center_facility-info.php.html", img: "/cases/orvella/page-facility.webp", desc: "재활센터 시설과 프로그램 정보를 확인합니다.", items: ["시설 안내", "프로그램", "센터 정보"] },
    { name: "자주 묻는 질문", file: "res_faq.php.html", img: "/cases/orvella/page-faq.webp", desc: "병원 이용에 관한 질문을 눌러 펼쳐 봅니다.", items: ["질문 펼치기", "분야별 안내", "관련 페이지"] },
  ],
  points: [
    { title: "진료과 정보를 나눠서", body: "진료 분야마다 별도 페이지를 두어 질환과 치료 관련 안내를 읽을 수 있습니다.", img: "/cases/orvella/point-clinics.webp", caption: "진료과 안내" },
    { title: "입원 준비와 이용 안내", body: "입원 준비부터 병동 생활, 퇴원에 필요한 정보를 순서대로 찾아볼 수 있습니다.", img: "/cases/orvella/point-admission.webp", caption: "입원 안내" },
    { title: "사진으로 병원 공간 소개", body: "시설 탭과 사진 갤러리를 통해 병원 공간을 살펴볼 수 있습니다.", img: "/cases/orvella/point-gallery.webp", caption: "시설 갤러리" },
    { title: "질문을 눌러 상세 내용 확인", body: "자주 묻는 질문을 선택하면 답변이 펼쳐지는 화면입니다.", img: "/cases/orvella/point-faq.webp", caption: "질문 펼치기" },
  ],
  detailsLabel: "화면 기능",
  detailsTitle: "페이지 안에서 직접 살펴보세요",
  details: [
    { title: "메뉴와 페이지 이동", body: "상단 메뉴에서 진료·의료진·입원·시설 등 각 안내 페이지로 이동합니다." },
    { title: "탭과 이미지 갤러리", body: "시설 페이지에서 탭을 선택하고 갤러리 이미지를 넘겨 볼 수 있습니다." },
    { title: "질문 목록", body: "FAQ의 질문을 누르면 해당 답변이 펼쳐집니다." },
    { title: "입력 안내", body: "예약 화면에서 병원 · 진료 · 진료과목을 고르고 필요한 입력 항목을 확인합니다." },
  ],
  mobile: {
    title: "작은 화면에서도 이어지는 병원 안내",
    body: "휴대폰 화면에서는 메뉴를 열어 페이지를 이동하고, 진료·시설·FAQ를 세로 흐름으로 살펴볼 수 있습니다.",
    shots: [
      { img: "/cases/orvella/m-home.webp", caption: "첫 화면" },
      { img: "/cases/orvella/m-shoulder.webp", caption: "진료 안내" },
      { img: "/cases/orvella/m-facility.webp", caption: "재활센터 시설" },
      { img: "/cases/orvella/m-faq.webp", caption: "자주 묻는 질문" },
    ],
  },
  faq: [
    { q: "페이지와 안내 항목을 바꿀 수 있나요?", a: "네. 병원에서 사용하는 진료 분야와 시설, 입원 안내에 맞춰 페이지 구성과 문구를 조정할 수 있습니다." },
    { q: "병원 사진을 넣을 수 있나요?", a: "네. 실제 사용 권한이 확인된 병원 사진을 전달해 주시면 해당 위치와 화면 비율에 맞춰 반영할 수 있습니다." },
  ],
};

export default study;
