import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "피코링고",
  headline: "유아 영어 · 말하기 놀이 홈페이지",
  summary:
    "영상이 화면을 채우는 첫 장면에서 세 단계 학습 흐름, 대화 활동, 맞춤 학습과 말하기 기초 영역으로 이어지는 메인에 교육과정, 세 가지 가이드, 소식, 문의, 시작 안내와 정책 문서까지 11쪽을 갖춘 유아 영어 프로그램 홈페이지입니다.",
  brandColor: "rgb(64,95,113)",
  tintColor: "rgb(237,247,249)",
  overview:
    "피코링고는 4~7세 아이가 놀이 장면을 탐색하고 영어로 답해 보는 말하기 프로그램을 가정해 만든 가상 브랜드입니다. 실제 서비스나 학습 효과를 보장하는 자료가 아니며, 화면 속 활동명과 캐릭터, 학습 기록은 디자인 구성을 보여 드리기 위한 예시입니다.\n\n메인은 짙은 청회색 위쪽 메뉴와 영상형 첫 화면으로 시작합니다. 워밍업·탐색·마무리로 이어지는 흐름, 여러 역할을 고르는 활동 카드, 대화를 돕는 기술과 아이별 학습 경로를 긴 호흡으로 보여 줍니다. 마지막에는 여섯 가지 말하기 기초 영역과 상담 연결이 이어집니다.\n\n교육과정은 입문부터 중급까지 듣기와 말하기 비중이 달라지는 구조를 설명합니다. 세 개의 가이드 쪽은 이야기와 성장 단계, 기기 조작, 레벨 확인, 대화 방법, 추천 활동, 콘텐츠 유형을 항목별로 나눴습니다. 문의 쪽은 제휴와 이용 지원 유형을 바꿔 선택하고 필수 입력을 확인할 수 있습니다. 별도의 시작 안내와 가상 회사 기준 개인정보 처리방침·이용약관도 같은 반응형 구조로 구성했습니다.",
  meta: [
    { label: "업종", value: "유아 영어 교육, 말하기 중심 교육센터, 교육 앱 · 기관용 학습 프로그램" },
    { label: "페이지 구성", value: "11쪽 · 메인, 교육과정, 가이드 4쪽, 소식, 문의, 시작 안내, 개인정보 처리방침, 이용약관" },
    { label: "이런 곳에 맞습니다", value: "프로그램 흐름과 교육 철학을 함께 설명해야 하는 유아 영어 브랜드, 앱 기반 말하기 수업, 기관 도입 상담이 필요한 교육 서비스" },
  ],
  mainShot: "/cases/kids-i/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "11쪽이 어떻게 나뉘는지",
  pages: [
    { name: "메인", file: "index.html", img: "/cases/kids-i/page-index.webp", desc: "첫 영상부터 학습 흐름, 활동, 맞춤 학습, 말하기 기초 영역까지 한 번에 살펴봅니다.", items: ["영상형 첫 화면 · 소리 전환", "세 단계 학습 흐름", "활동 카드 · 말하기 기반 영역"] },
    { name: "교육과정", file: "curriculum.html", img: "/cases/kids-i/page-curriculum.webp", desc: "말하기 중심 교육 철학과 단계별 입력·출력 흐름을 설명합니다.", items: ["교육 철학 · 대화 수업", "입문부터 중급까지 열 단계", "게임·체험·개인화 학습 흐름"] },
    { name: "가이드 홈", file: "guide.html", img: "/cases/kids-i/page-guide.webp", desc: "기본·학습·콘텐츠 안내 중 필요한 갈래로 이동합니다.", items: ["세 가지 안내 갈래", "PC 하위 메뉴 · 모바일 펼침 메뉴"] },
    { name: "기본 가이드", file: "guide-basic.html", img: "/cases/kids-i/page-guide-basic.webp", desc: "첫 시작부터 이동·말하기·보상·화면 구성까지 순서대로 정리했습니다.", items: ["이야기와 성장 단계", "권장 학습 방법 · 조작", "화면 구성 · 공간 꾸미기"] },
    { name: "학습 가이드", file: "guide-learning.html", img: "/cases/kids-i/page-guide-learning.webp", desc: "수준 확인과 대화, 추천 활동, 결과 확인 방식을 안내합니다.", items: ["시작 수준 확인", "대화 도움과 추천 활동", "활동 결과 · 다음 단계 확인"] },
    { name: "콘텐츠 가이드", file: "guide-contents.html", img: "/cases/kids-i/page-guide-contents.webp", desc: "대화·퀴즈·직업·탐색 활동을 유형별로 길게 설명합니다.", items: ["대화형 미션", "퀴즈 · 직업 체험", "캐릭터 · 필드 활동"] },
    { name: "소식", file: "news.html", img: "/cases/kids-i/page-news.webp", desc: "프로그램 소식을 담을 수 있는 간결한 목록 화면입니다.", items: ["소식 제목 영역", "빈 상태를 포함한 목록 구조"] },
    { name: "문의", file: "contact.html", img: "/cases/kids-i/page-contact.webp", desc: "도입 제휴와 이용 지원을 나누고 필수 정보를 확인하는 문의 화면입니다.", items: ["문의 유형 전환", "꼭 넣어야 하는 칸 · 이메일 형식 확인", "실제 전송 없이 완료 안내"] },
    { name: "시작 안내", file: "promotion.html", img: "/cases/kids-i/page-promotion.webp", desc: "기기별 체험 진입점과 프로그램의 핵심 메시지를 한 화면에 안내합니다.", items: ["기기별 체험 버튼", "프로그램 소개 배너", "모바일 세로 배치"] },
    { name: "개인정보 처리방침", file: "privacy.html", img: "/cases/kids-i/page-privacy.webp", desc: "가상 서비스의 개인정보 처리 기준과 이용자 권리를 일반 문안으로 안내합니다.", items: ["수집·이용 목적", "아동 정보 보호", "이용자 권리와 문의"] },
    { name: "이용약관", file: "terms.html", img: "/cases/kids-i/page-terms.webp", desc: "가상 서비스 이용에 필요한 기본 기준과 책임 범위를 안내합니다.", items: ["이용 자격과 계정", "서비스 이용 기준", "변경·분쟁 안내"] },
  ],
  points: [
    { title: "기능 목록 대신 아이가 하는 순서로", body: "첫 화면에서 바로 기능을 나열하지 않고, 아이가 준비하고 탐색한 뒤 오늘의 경험을 말로 정리하는 순서로 내용을 이어 갑니다.", items: ["세 단계 흐름", "활동 카드 · 기반 역량"], img: "/cases/kids-i/point-flow.webp", caption: "메인 — 학습 흐름" },
    { title: "필요한 항목을 빠르게 찾는 가이드", body: "기본 사용법, 학습 방법, 콘텐츠 설명을 세 쪽으로 나누고 위쪽 메뉴와 각 안내의 목차에서 바로 해당 위치로 이동할 수 있게 했습니다.", items: ["세 갈래 하위 메뉴", "항목별 바로가기"], img: "/cases/kids-i/point-guide.webp", caption: "가이드 — 목차와 본문" },
    { title: "화면 폭에 맞춘 메뉴", body: "넓은 화면에서는 세 칸 하위 메뉴를 보여 주고, 좁은 화면에서는 전체 메뉴 안에서 필요한 안내만 펼칩니다. 키보드와 Esc 키로도 닫을 수 있습니다.", items: ["PC 하위 메뉴", "모바일 펼침 · 키보드 닫기"], img: "/cases/kids-i/point-menu.webp", caption: "위쪽 메뉴" },
    { title: "제출 전 입력을 확인하는 문의", body: "제휴 문의와 이용 지원 유형을 고르고 이름, 연락처, 기관 정보, 동의를 확인합니다. 현재 디자인에서는 실제 서버로 보내지 않고 화면에서만 접수 확인을 보여 줍니다.", items: ["문의 유형 선택", "꼭 넣어야 하는 칸 · 형식 확인", "실제 전송 없음"], img: "/cases/kids-i/point-contact.webp", caption: "문의" },
  ],
  detailsLabel: "자세히",
  detailsTitle: "만들 때 확인한 것",
  details: [
    { title: "사진 없이 틀부터 만들었습니다", body: "사진과 앱 화면은 로컬 자리 그림으로 분리해 두었습니다. 최종 제작 때 브랜드 사진과 화면 자료로 각 칸을 교체할 수 있습니다." },
    { title: "PC부터 휴대폰까지 따로 확인합니다", body: "큰 모니터부터 휴대폰까지 다섯 크기(1440 · 1280 · 1024 · 768 · 390px)에서 메뉴, 긴 본문, 카드 쌓임과 옆으로 삐져나오는 곳을 확인하도록 구성했습니다." },
    { title: "문의는 연결 전 상태입니다", body: "필수 입력과 완료 안내까지만 동작합니다. 실제 이메일이나 관리자 접수는 제작 단계에서 별도로 연결해야 합니다." },
  ],
  mobile: {
    title: "좁은 화면에서는 이렇게 보입니다",
    body: "위쪽 메뉴는 펼침 방식으로 바뀌고, 여러 칸 카드는 한 줄로 쌓입니다. 긴 가이드 문단과 화면 그림은 휴대폰 폭을 넘지 않도록 배치됩니다.",
    shots: [
      { img: "/cases/kids-i/m-index.webp", caption: "메인 — 첫 화면" },
      { img: "/cases/kids-i/m-curriculum.webp", caption: "교육과정" },
      { img: "/cases/kids-i/m-guide-basic.webp", caption: "기본 가이드" },
      { img: "/cases/kids-i/m-contact.webp", caption: "문의" },
      { img: "/cases/kids-i/m-promotion.webp", caption: "시작 안내" },
      { img: "/cases/kids-i/m-privacy.webp", caption: "개인정보 처리방침" },
    ],
  },
  faq: [
    { q: "피코링고는 실제 교육 브랜드인가요?", a: "아니요. 디자인을 보여 드리려고 만든 가상 브랜드입니다. 활동명, 캐릭터, 학습 수치도 모두 화면 구성을 위한 예시입니다." },
    { q: "사진과 앱 화면을 바꿀 수 있나요?", a: "네. 지금 들어 있는 건 한눈에 구분되는 자리 그림입니다. 보유한 수업 사진, 캐릭터, 앱 화면에 맞춰 교체할 수 있습니다." },
    { q: "가이드 항목을 줄이거나 늘릴 수 있나요?", a: "네. 운영 중인 프로그램에 맞춰 목차와 설명 쪽 수를 조정할 수 있습니다." },
    { q: "문의 내용이 실제로 접수되나요?", a: "현재는 입력 확인과 완료 안내까지만 있는 시연 상태입니다. 실제 접수는 이메일, 데이터베이스 또는 관리자 기능을 연결해야 합니다." },
  ],
};

export default study;
