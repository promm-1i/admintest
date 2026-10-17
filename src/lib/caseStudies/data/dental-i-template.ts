import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "온담길치과",
  headline: "어르신과 가족이 함께 읽는 치과 홈페이지",
  summary:
    "넓은 사진과 차분한 정보 구획으로 시작해 치과 소개, 의료진, 오시는 길, 교육 · 인증 · 저서, 구강관리, 어르신 진료, 자연치아, 임플란트, 평생관리와 기록 프로젝트까지 20쪽으로 이어지는 치과 홈페이지입니다.",
  brandColor: "rgb(38,123,158)",
  tintColor: "rgb(243,247,246)",
  overview:
    "온담길치과는 임플란트와 어르신 진료를 중심으로 구성한 치과 브랜드입니다.\n\n메인은 넓은 첫 장면 뒤로 치과의 진료 원칙, 주요 진료, 의료진, 구강관리와 기록 프로젝트를 길게 이어 보여 줍니다. 신뢰를 강조하되 치료 결과를 단정하지 않고, 진료 전 개인별 상담과 검사가 필요하다는 안내를 함께 담았습니다.\n\n서브 페이지는 치과 소개와 의료진, 위치, 공간, 임상 교육, 인증 및 협력, 저서, 구강관리, 어르신 진료, 자연치아, 임플란트, 평생관리, 진료 이야기와 디지털 기공 시스템, 기록 프로젝트로 나뉘었습니다.",
  meta: [
    { label: "업종", value: "임플란트, 어르신 진료, 자연치아 및 평생 구강관리를 안내하는 치과" },
    { label: "페이지 구성", value: "20쪽 · 메인, 로그인, 회원가입, 치과 소개, 의료진, 진료안내/오시는 길, 공간, 임상 교육, 인증 및 협력, 저서, 구강관리, 어르신 진료, 자연치아, 임플란트, 평생관리, 진료 이야기, 시스템 2쪽, 기록 프로젝트 2쪽" },
    { label: "이런 곳에 맞습니다", value: "어르신 환자와 보호자에게 진료 과정을 설명하고 임플란트 이후 관리까지 함께 안내하려는 치과" },
  ],
  mainShot: "/cases/dental-i/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "20쪽의 대표 화면",
  pages: [
    { name: "메인", file: "index.html", img: "/cases/dental-i/page-index.webp", desc: "첫 장면에서 진료 원칙과 주요 프로그램, 기록 프로젝트까지 길게 이어집니다.", items: ["넓은 첫 장면", "진료 원칙 · 주요 진료", "의료진 · 관리 · 기록"] },
    { name: "치과 소개", file: "intro.html", img: "/cases/dental-i/page-intro.webp", desc: "브랜드의 진료 철학과 공간, 관리 원칙을 소개합니다.", items: ["인사말", "진료 원칙", "공간 정보"] },
    { name: "의료진", file: "medical-team.html", img: "/cases/dental-i/page-medical-team.webp", desc: "의료진의 진료 분야와 약력을 나란히 정리했습니다.", items: ["의료진 프로필", "진료 분야", "약력"] },
    { name: "오시는 길", file: "location.html", img: "/cases/dental-i/page-location.webp", desc: "진료 시간과 주소, 약도, 교통편을 탭으로 나눠 안내합니다.", items: ["진료 시간", "약도", "교통편 탭"] },
    { name: "공간 둘러보기", file: "around.html", img: "/cases/dental-i/page-around.webp", desc: "대기실부터 진료실과 디지털 실험 공간까지 사진 칸을 같은 비율로 이어 붙였습니다.", items: ["다양한 공간 구획", "사진 비율 유지", "모바일 세로 배치"] },
    { name: "구강관리", file: "oral-care.html", img: "/cases/dental-i/page-oral-care.webp", desc: "일상의 구강관리 흐름을 단계별 구획과 함께 안내합니다.", items: ["관리 대상", "단계별 안내", "예약 양식"] },
    { name: "어르신 진료", file: "senior.html", img: "/cases/dental-i/page-senior.webp", desc: "어르신과 보호자가 함께 살펴볼 진료 흐름과 안전 확인 항목을 담았습니다.", items: ["상담 · 검사", "진료 흐름", "보호자 안내"] },
    { name: "자연치아 관리", file: "natural-teeth.html", img: "/cases/dental-i/page-natural-teeth.webp", desc: "자연치아를 오래 유지하기 위한 검사와 관리 방법을 설명합니다.", items: ["초기 검사", "개인별 관리", "정기 점검"] },
    { name: "임플란트", file: "implant.html", img: "/cases/dental-i/page-implant.webp", desc: "진단부터 유지관리까지의 일반적인 흐름을 시연용 탭과 카드로 보여 줍니다.", items: ["진단 흐름", "시스템 안내", "유지관리"] },
    { name: "디지털 기공 시스템", file: "lab.html", img: "/cases/dental-i/page-lab.webp", desc: "스캔과 설계, 제작 흐름을 장비와 작업 공간 이미지로 구성했습니다.", items: ["디지털 스캔", "설계 과정", "기공 협업"] },
  ],
  points: [
    { title: "어르신과 보호자를 함께 고려한 정보", body: "진료 전 확인할 내용과 진료 후 관리를 순서대로 읽을 수 있게 구성했습니다.", items: ["순서가 보이는 구획", "보호자와 공유할 안내"], img: "/cases/dental-i/point-senior.webp", caption: "어르신 진료 안내" },
    { title: "임플란트 전·후 흐름", body: "특정 결과를 약속하지 않고 상담, 검사, 개인별 계획, 유지관리 흐름을 중심으로 안내합니다.", items: ["진료 전 상담", "정기 유지관리"], img: "/cases/dental-i/point-implant.webp", caption: "임플란트 안내" },
    { title: "정보를 나누는 탭", body: "오시는 길과 진료 정보를 탭으로 나눠 필요한 내용을 빠르게 확인할 수 있습니다.", items: ["탭 클릭 전환", "현재 선택 표시"], img: "/cases/dental-i/point-tabs.webp", caption: "오시는 길 · 진료 정보" },
    { title: "기록 프로젝트", body: "진료 기록을 어떤 자리에 어떻게 놓는지 보여 줍니다. 사진은 치료 효과를 보장하지 않습니다.", items: ["인물", "재구성 장면"], img: "/cases/dental-i/point-stories.webp", caption: "기록 이야기" },
  ],
  detailsLabel: "자세히",
  detailsTitle: "구현에서 확인한 것",
  details: [
    { title: "다섯 화면 폭 반응형", body: "큰 모니터부터 휴대폰까지 다섯 크기(1440 · 1280 · 1024 · 768 · 390px)에서 20쪽의 배치와 옆으로 삐져나오는 곳을 확인했습니다." },
    { title: "모바일 메뉴와 탭", body: "작은 화면에서 하위 메뉴를 펼치고 링크를 누르면 메뉴가 닫히도록 구성했고, 탭은 한 패널만 보입니다." },
    { title: "회원·상담 기능은 시연용입니다", body: "로그인, 회원가입, 상담 양식은 화면과 입력 상태만 보여 주며 실제 전송·저장·인증은 연결하지 않았습니다." },
  ],
  mobile: {
    title: "휴대폰에서는 메뉴와 컨텐츠가 세로로 이어집니다",
    body: "전체 메뉴는 터치로 열고 하위 메뉴를 펼친 뒤 이동합니다. 사진과 정보 카드는 화면 크기에 맞게 한 줄 또는 세로 쌓기로 바뀝니다.",
    shots: [
      { img: "/cases/dental-i/m-index.webp", caption: "메인 — 첫 화면" },
      { img: "/cases/dental-i/m-location.webp", caption: "진료안내 · 오시는 길" },
      { img: "/cases/dental-i/m-senior.webp", caption: "어르신 진료" },
      { img: "/cases/dental-i/m-implant.webp", caption: "임플란트" },
    ],
  },
  faq: [
    { q: "실제 치과 정보로 바꿀 수 있나요?", a: "네. 계약 후 로고, 치과명, 주소, 진료 시간, 의료진과 진료 항목을 실제 정보에 맞게 바꿉니다." },
    { q: "화면 속 사진과 영상을 바꿀 수 있나요?", a: "네. 지금 들어 있는 의료진 · 공간 사진, 방송 썸네일, 진료 이야기 영상은 디자인을 보여 드리려고 새로 만든 예시입니다. 실제 치과 사진과 영상이 있으면 같은 칸에 바꿔 넣을 수 있습니다." },
    { q: "임플란트 결과를 보장하는 내용인가요?", a: "아닙니다. 사이트의 문구와 이미지는 구성 예시이며 실제 진료는 개인별 상태에 따른 상담과 검사가 필요합니다." },
    { q: "예약과 회원가입을 바로 사용할 수 있나요?", a: "현재는 화면 시연용입니다. 실제 운영에는 인증, 저장소, 관리자 권한과 스팸 방지 기능을 별도로 연결해야 합니다." },
  ],
};

export default study;
