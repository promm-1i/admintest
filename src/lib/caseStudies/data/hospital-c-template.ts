import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "해움샘한방병원",
  headline: "암 치료와 회복기 입원을 함께 안내하는 한방병원 홈페이지",
  summary: "싸이모신, 골전이, CTC 검사, 고압산소, 고주파온열, 미슬토 클리닉을 하나씩 나눠 설명합니다. 의료진과 환자 식단, 병원 시설, 건강 칼럼도 따로 볼 수 있습니다.",
  brandColor: "rgb(53, 110, 125)",
  tintColor: "rgb(2, 40, 43)",
  mobileDark: false,
  overview: "첫 화면은 '회복기까지, 진료와 입원을 함께 살핍니다' 문구로 열리고, 내리면 병실 사진이 화면 가득 커지며 의료진 소개가 이어집니다. 그 아래로 병원장 인사말, 협진 안내, 대표원장 세 분, 암 보조진료 카드 네 장, 환자 식단, 진료 결과, 건강 영상이 차례로 나옵니다.\n\n암 클리닉 페이지는 고압산소챔버처럼 치료 하나마다 왜 필요한지, 어떤 원리인지, 안전한지를 도표와 함께 길게 풀어 씁니다. 큰 화면에서는 아래에 이름과 연락처만 적는 상담 신청 줄이 늘 붙어 있습니다.",
  meta: [
    { label: "업종", value: "암 요양 · 한방병원 · 회복기 입원" },
    { label: "주요 구성", value: "암 클리닉 · 난치성 질환 · 의료진 · 환자 식단 · 병원 시설 · 건강 칼럼 · 환자 후기 · 상담 예약" },
  ],
  mainShot: "/cases/haeumsaem/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "치료 설명에서 식단 · 시설 안내까지",
  pages: [
    { name: "메인", file: "index.html", img: "/cases/haeumsaem/page-index.webp", desc: "병실 사진이 커지는 첫 장면부터 병원장 인사말, 대표원장 세 분, 암 보조진료, 환자 식단, 건강 영상까지 이어서 봅니다.", items: ["병원장 인사말", "대표원장 소개", "암 보조진료"] },
    { name: "해움샘 차별점", file: "about.html", img: "/cases/haeumsaem/page-about.webp", desc: "암 한 분야에 집중하는 이유와 국제 학회 활동, 검사 장비, 보건복지부 인증을 항목마다 사진과 함께 읽습니다.", items: ["암 집중 진료", "국제 학회", "인증 의료기관"] },
    { name: "의료진", file: "medical-team.html", img: "/cases/haeumsaem/page-team.webp", desc: "대표원장 세 분과 진료 원장들의 약력을 보고, 의료진이 지키는 진료 원칙을 읽습니다.", items: ["대표원장", "원장 약력", "진료 원칙"] },
    { name: "고압산소챔버", file: "cancer-clinic_hyperbaric-oxygen.html", img: "/cases/haeumsaem/page-oxygen.webp", desc: "종양의 저산소 환경이 치료에 미치는 영향, 챔버 안 압력과 산소량, 안전성까지 도표로 차례대로 확인합니다.", items: ["저산소와 암", "챔버 원리", "안전성"] },
    { name: "환자 식단", file: "food.html", img: "/cases/haeumsaem/page-food.webp", desc: "제한하는 재료와 쓰는 식자재 기준을 읽고, 영양팀의 하루를 담은 영상과 식사 원칙 연구를 봅니다.", items: ["식사 원칙", "식자재 기준", "영양팀 영상"] },
    { name: "병원 시설", file: "facility-info.html", img: "/cases/haeumsaem/page-facility.webp", desc: "1인실부터 병실 종류와 치료실, 휴게 공간을 사진으로 누르며 크게 살펴봅니다.", items: ["병실 안내", "치료 공간", "사진 크게 보기"] },
  ],
  points: [
    { title: "대표원장 세 분을\n한 화면에", body: "어두운 숲 사진 위에 협진 원칙을 적고, 옆에 대표원장 세 분의 사진과 담당 분야를 나란히 놓았습니다.", items: ["협진 원칙", "대표원장 세 분"], img: "/cases/haeumsaem/point-team.webp", caption: "메인 · 진료 원칙" },
    { title: "보조진료 네 가지를\n카드로", body: "골전이 클리닉, 고압산소, 고주파온열치료, CTC 검사를 장비 사진 카드 네 장으로 묶고 카드마다 한 줄 설명을 붙였습니다.", items: ["카드 네 장", "장비 사진"], img: "/cases/haeumsaem/point-care.webp", caption: "메인 · 암 보조진료" },
    { title: "입원 중 식사를\n사진으로", body: "영양팀이 조리하는 사진과 실제 식판 사진을 넘겨 보며 어떤 식사를 하는지 미리 확인합니다.", items: ["조리 사진", "식판 사진"], img: "/cases/haeumsaem/point-food.webp", caption: "메인 · 해움샘의 식사" },
  ],
  detailsLabel: "상세 내용",
  detailsTitle: "치료를 알아보고 입원을 준비하는 흐름",
  details: [
    { title: "치료마다 따로 쓴 설명", body: "암 클리닉 여섯 가지와 당뇨발 · 장 · 자가면역질환 · 파킨슨 진료를 메뉴마다 나누고, 각 페이지에서 원리와 치료 과정을 길게 풀어 씁니다." },
    { title: "읽을거리와 상담", body: "건강 칼럼은 암 종류별로, 환자 후기와 강의 소식은 따로 모아 두었고, 화면 아래 상담 신청 줄에서 바로 연락처를 남깁니다." },
  ],
  mobile: {
    title: "휴대폰에서도 같은 순서로",
    body: "작은 화면에서는 카드와 도표가 한 열로 이어지고, 화면 아래에 전화 상담과 상담 글 쓰기 단추가 붙습니다.",
    shots: [
      { img: "/cases/haeumsaem/m-index.webp", caption: "모바일 메인" },
      { img: "/cases/haeumsaem/m-oxygen.webp", caption: "모바일 고압산소챔버" },
    ],
  },
  faq: [
    { q: "어떤 진료를 안내하나요?", a: "싸이모신, 골전이, CTC 검사, 고압산소챔버, 고주파온열치료, 미슬토 같은 암 클리닉과 당뇨발, 장 · 자가면역질환, 파킨슨 진료를 안내합니다." },
    { q: "입원 생활은 어디에서 보나요?", a: "환자 식단 페이지에서 식사 원칙과 식단 사진을, 병원 시설 페이지에서 병실과 치료 공간 사진을 볼 수 있습니다." },
  ],
};

export default study;
