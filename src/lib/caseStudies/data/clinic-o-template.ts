import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "늘봄결정형외과",
  headline: "어깨 · 팔꿈치 통증을 중심으로 척추 · 관절 · 재활까지 안내하는 정형외과 홈페이지",
  summary: "어깨, 팔꿈치, 허리, 목, 관절 통증을 클리닉마다 나눠 질환별 원인과 증상을 보여 줍니다. 치료 과정, 교정 · 재활, 영양수액, 서류 발급과 예약 · 상담 안내도 따로 볼 수 있습니다.",
  brandColor: "rgb(121, 114, 85)",
  tintColor: "rgb(58, 54, 38)",
  mobileDark: false,
  overview: "첫 화면은 진료 사진이 넘어가는 큰 슬라이드로 열리고, 화면 아래에는 상담 항목과 날짜, 이름, 연락처만 적는 상담 신청 줄이 붙어 있습니다. 내리면 진료 철학 두 가지가 사진과 함께 화면을 채우고, 어깨 · 팔꿈치와 척추 · 관절 클리닉 소개, 염증 치료부터 치료 졸업까지 네 단계로 나눈 치료 프로그램, 의료진, 치료 후기, 자주 묻는 질문이 이어집니다.\n\n클리닉 페이지는 오십견, 회전근개파열 같은 질환을 카드 한 장씩 넘기며 원인과 증상을 보고, 아래에서 체외충격파 · 한랭분사 · 고주파 · 초음파 주사 · C-arm 주사 치료를 탭으로 골라 읽습니다. 자가테스트 페이지에서는 팔을 올리고 뒤로 보내는 각도를 골라 어깨 움직임을 직접 점검합니다.",
  meta: [
    { label: "업종", value: "정형외과 · 어깨 · 척추 · 관절 · 재활" },
    { label: "주요 구성", value: "병원 소개 · 의료진 · 어깨 · 팔꿈치 클리닉 · 척추 · 관절 클리닉 · 교정 · 재활 클리닉 · 영양수액 · 비급여 · 서류 발급 · 예약 · 상담 · 자가테스트 · 치료 후기" },
  ],
  mainShot: "/cases/neulbomgyeol/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "질환 설명에서 예약 · 서류 안내까지",
  pages: [
    { name: "메인", file: "index.html", img: "/cases/neulbomgyeol/page-index.webp", desc: "진료 사진 슬라이드와 상담 신청 줄로 시작해 진료 철학, 클리닉 소개, 네 단계 치료 프로그램, 의료진, 치료 후기, 새 소식까지 이어서 봅니다.", items: ["상담 신청 줄", "네 단계 치료 프로그램", "치료 후기"] },
    { name: "치료컨셉", file: "about_concept.html", img: "/cases/neulbomgyeol/page-concept.webp", desc: "어깨 치료가 어려운 이유 여섯 가지를 사진 카드로 읽고, 늘봄결 치료 프로그램 DODA의 네 단계를 차례로 확인합니다.", items: ["어깨 치료가 어려운 이유", "DODA 프로그램"] },
    { name: "어깨 통증 클리닉", file: "shoulder-clinic_shoulder-pain.html", img: "/cases/neulbomgyeol/page-shoulder.webp", desc: "오십견, 석회성건염, 어깨충돌증후군, 회전근개파열을 카드로 넘겨 원인과 증상을 보고, 치료 방법 다섯 가지를 탭으로 골라 읽습니다.", items: ["질환 카드", "치료 방법 탭", "자주 묻는 질문"] },
    { name: "교정 전문 클리닉", file: "rehab-clinic_posture-clinic.html", img: "/cases/neulbomgyeol/page-posture.webp", desc: "척추 · 골반 · 몸통 · 성장기 교정을 나눠 설명하고, 촬영 시기와 각도 변화를 적은 치료 사례를 넘겨 봅니다.", items: ["부위별 교정", "치료 사례", "치료 공간"] },
    { name: "자가테스트", file: "community_self-test.html", img: "/cases/neulbomgyeol/page-selftest.webp", desc: "팔을 앞으로 올린 각도를 먼저 고르면 다음 단계에서 뒤로 보낸 각도를 고르는 순서로 어깨 움직임을 점검합니다.", items: ["1단계 팔 올리기", "2단계 팔 뒤로 보내기"] },
    { name: "영양수액", file: "guide_iv-clinic.html", img: "/cases/neulbomgyeol/page-iv.webp", desc: "VIP, 수면 · 기분, 비만, 피로 회복, 관절 통증, 면역 테라피를 성분과 함께 소개하고, 1인 수액실 사진을 넘겨 봅니다.", items: ["테라피 여섯 가지", "1인 수액실"] },
  ],
  points: [
    { title: "치료 순서를\n네 단계 카드로", body: "염증 치료, 가동성 확보, 근력 강화, 치료 졸업을 큰 영문 머리글자 카드 네 장으로 나란히 놓고, 내리면 카드가 차례로 올라옵니다.", items: ["카드 네 장", "스크롤 장면"], img: "/cases/neulbomgyeol/point-doda.webp", caption: "메인 · 치료 프로그램" },
    { title: "질환마다 원인과 증상을\n카드 한 장에", body: "질환 이름과 설명 아래에 원인과 증상을 두 칸으로 나눠 적고, 옆으로 넘기며 다른 질환을 비교합니다.", items: ["원인 · 증상 두 칸", "옆으로 넘기기"], img: "/cases/neulbomgyeol/point-disease.webp", caption: "어깨 통증 클리닉 · 질환 카드" },
    { title: "팔 각도를 골라\n어깨 움직임 점검", body: "사진 위에 각도 다섯 칸을 띄워 두고, 내 팔이 올라가는 높이와 가장 가까운 칸을 골라 다음 단계로 넘어갑니다.", items: ["각도 다섯 칸", "단계별 점검"], img: "/cases/neulbomgyeol/point-selftest.webp", caption: "자가테스트 · 1단계" },
  ],
  detailsLabel: "상세 내용",
  detailsTitle: "통증을 알아보고 진료를 예약하는 흐름",
  details: [
    { title: "부위별로 나눈 클리닉", body: "어깨 · 팔꿈치, 허리 · 목 · 기타 관절, 교정 · 재활 클리닉을 메뉴마다 나누고, 페이지마다 질환 카드와 치료 방법, 자주 묻는 질문을 따로 둡니다." },
    { title: "방문 전에 볼 안내", body: "진료시간과 의료진 시간표, 비급여 항목 표, 온라인 · 방문 서류 발급 방법, 주차와 대중교통 안내를 이용안내 메뉴에 모았고, 예약 · 상담 게시판에서 글을 남깁니다." },
  ],
  mobile: {
    title: "휴대폰에서도 같은 순서로",
    body: "작은 화면에서는 카드와 사진이 한 열로 이어지고, 화면 아래에 전화상담, 예약 상담, 오시는 길 단추가 붙습니다.",
    shots: [
      { img: "/cases/neulbomgyeol/m-index.webp", caption: "모바일 메인" },
      { img: "/cases/neulbomgyeol/m-shoulder.webp", caption: "모바일 어깨 통증 클리닉" },
    ],
  },
  faq: [
    { q: "어떤 진료를 안내하나요?", a: "어깨 통증, 팔꿈치 통증, 허리 · 목 · 기타 관절 통증, 교정과 재활 클리닉, 영양수액을 페이지마다 나눠 안내합니다." },
    { q: "방문 전에 무엇을 확인할 수 있나요?", a: "진료시간과 의료진 시간표, 비급여 비용, 서류 발급 방법, 오시는 길을 이용안내 메뉴에서 보고, 예약 · 상담 페이지에서 상담 글을 남길 수 있습니다." },
  ],
};

export default study;
