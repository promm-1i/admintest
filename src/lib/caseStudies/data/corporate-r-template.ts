import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "NEXHARBOR",
  headline: "항만 물류·터미널 운영기업 홈페이지",
  summary:
    "항만 운영과 하역·운송·보관·통관·3PL 사업, 투자정보와 ESG, 관계사와 영문 화면까지 대규모 산업그룹의 전체 정보를 담은 프리미엄 기업 홈페이지입니다.",
  brandColor: "rgb(0, 109, 115)",
  tintColor: "rgb(224, 239, 239)",
  overview:
    "NEXHARBOR 디자인은 항만 터미널을 중심으로 하역, 운송, 보관, 통관과 3PL을 함께 제공하는 종합물류그룹을 가정해 구성했습니다. 대형 항만 히어로 뒤로 관계사와 사업 분야가 화면에 고정된 채 가로·세로로 전환되어 그룹의 규모를 먼저 체감하게 합니다.\n\n회사소개, 투자정보, 다섯 개 핵심 사업, 역사관과 홍보자료, 윤리·안전·ESG, 인재경영, 아홉 개 관계사와 영문 메인까지 45개 대표 메뉴와 목록·상세 상태를 모두 연결했습니다. 재무표, 공시, 뉴스, 채용, 입찰, 갤러리와 브로슈어처럼 실제 운영에 필요한 화면도 포함됩니다.\n\n회사명, 사업장, 재무수치, 공시, 뉴스와 화면 이미지는 디자인 예시이며 실제 기업 자료와 공개 기준에 맞춰 변경합니다.",
  meta: [
    { label: "적합 업종", value: "항만 운영 · 터미널 · 하역 · 운송 · 보관 · 통관 · 3PL 종합물류기업" },
    { label: "주요 구성", value: "회사소개 · 투자정보 · 사업 5분야 · 홍보관 · ESG · 인재 · 관계사 9개 · 영문" },
    { label: "맞춤 적용", value: "사업장 · 관계사 · 재무·공시 · 뉴스·입찰·채용 · 다국어 구성 변경 가능" },
  ],
  mainShot: "/cases/corporate-r/main.webp",
  pagesLabel: "PREVIEW",
  pagesTitle: "주요 화면 미리보기",
  pages: [
    { name: "홈", file: "index.html", img: "/cases/corporate-r/page-index.webp", desc: "대형 항만 히어로와 스크롤 고정형 관계사·사업 장면, 뉴스와 채용으로 그룹의 핵심을 보여 줍니다.", items: ["대형 항만 히어로", "관계사 가로 장면", "사업 5분야 고정 장면", "뉴스 · 홍보 · 채용"] },
    { name: "회사개요", file: "company.html", img: "/cases/corporate-r/page-company.webp", desc: "기업의 역사, 주요 수치와 항만 운영 역량을 회사소개 체계 안에서 전달합니다.", items: ["회사 소개와 핵심 수치", "CEO·경영이념·조직도 연결", "CI·연락처·오시는 길"] },
    { name: "연혁", file: "history.html", img: "/cases/corporate-r/page-history.webp", desc: "성장 과정과 수상 내역을 연도와 시대별로 확인하게 합니다.", items: ["시대별 연혁", "연도별 주요 사건", "수상 연혁 탭"] },
    { name: "그레인터미널", file: "business-grain.html", img: "/cases/corporate-r/page-business-grain.webp", desc: "곡물 하역, 저장과 품질관리 공정을 설비 이미지와 단계별 설명으로 소개합니다.", items: ["사업 개요와 규모", "사일로·제어실·하역 공정", "시설·품질관리 정보"] },
    { name: "컨테이너 터미널", file: "business-container.html", img: "/cases/corporate-r/page-business-container.webp", desc: "크레인과 야드 운영, 처리 역량을 이미지와 수치로 보여 줍니다.", items: ["터미널 운영 소개", "크레인·야드 시설", "처리 역량과 서비스"] },
    { name: "산업 역사관", file: "museum.html", img: "/cases/corporate-r/page-museum.webp", desc: "기업 기록과 산업 유산을 역사관 소개, 연대기와 자료실로 나눠 제공합니다.", items: ["역사관 소개", "기업 연대기", "기록 자료실과 갤러리"] },
    { name: "윤리경영", file: "ethics.html", img: "/cases/corporate-r/page-ethics.webp", desc: "윤리 원칙과 실천 기준, 제보 절차를 지속가능경영 메뉴 안에서 안내합니다.", items: ["윤리경영 원칙", "윤리규범·실천지침", "신고·제보 연결"] },
    { name: "뉴스", file: "news.html", img: "/cases/corporate-r/page-news.webp", desc: "기업 소식과 보도자료를 목록과 상세 화면으로 제공합니다.", items: ["뉴스 검색과 목록", "상세·이전·다음 글", "갤러리·영상·브로슈어 연결"] },
    { name: "채용", file: "careers.html", img: "/cases/corporate-r/page-careers.webp", desc: "채용 공고와 인재상, 복리후생을 지원자 관점에서 구성합니다.", items: ["채용 공고 목록·상세", "인재상과 복리후생", "지원 안내"] },
  ],
  points: [
    { title: "첫 화면에서\n항만의 규모를 전달합니다", body: "항만 전경과 대형 영문 메시지, 움직이는 수평 장면을 사용해 기업의 사업 규모와 현장성을 첫인상으로 보여 줍니다.", items: ["전체 화면 항만 비주얼", "대형 브랜드 메시지", "스크롤과 연결된 수평 장면"], img: "/cases/corporate-r/point-hero.webp", caption: "홈 · 항만 히어로" },
    { title: "관계사를\n가로 장면으로 연결합니다", body: "물류, 금융·투자, 트레이딩과 지역사회 사업을 가로로 이동하는 장면 안에 묶어 그룹의 사업 구조와 관계사를 한 번에 이해하게 합니다.", items: ["그룹 분야별 소개", "관계사 9개 연결", "가로 스크롤 전환"], img: "/cases/corporate-r/point-group.webp", caption: "홈 · 그룹사" },
    { title: "핵심 사업을\n화면 고정형 장면으로 보여 줍니다", body: "그레인, 정선, 컨테이너, 항만물류와 3PL이 스크롤 위치에 맞춰 이미지와 설명을 바꾸며, 한 사업씩 충분히 읽고 상세로 이동하게 합니다.", items: ["핵심 사업 5개", "이미지·번호·설명 전환", "사업 상세 연결"], img: "/cases/corporate-r/point-business.webp", caption: "홈 · 사업 영역" },
    { title: "기업 소식은\n대표 기사와 목록으로 정리합니다", body: "중요한 소식은 이미지와 함께 크게 보여 주고 나머지 뉴스는 날짜가 있는 목록으로 제공해 최신 활동을 빠르게 확인하게 합니다.", items: ["대표 뉴스 강조", "최신 기사 목록", "뉴스 전체 보기"] , img: "/cases/corporate-r/point-news.webp", caption: "홈 · 뉴스" },
    { title: "기업 홍보 콘텐츠를\n큰 이미지로 연결합니다", body: "브로슈어, 영상과 회사 소개 자료로 이어지는 홍보 장면을 별도 구간으로 구성해 이해관계자가 필요한 자료를 쉽게 찾게 합니다.", items: ["대형 홍보 비주얼", "브로슈어·영상 연결", "자료 다운로드 확장 가능"], img: "/cases/corporate-r/point-with.webp", caption: "홈 · 기업 홍보" },
    { title: "채용 정보를\n마지막 행동 동선으로 제공합니다", body: "인재상, 복리후생과 채용 공고를 메인 하단에서 바로 선택하게 해 기업에 관심을 가진 방문자가 지원 정보까지 자연스럽게 이어집니다.", items: ["인재상 바로가기", "복리후생 안내", "채용 공고 연결"], img: "/cases/corporate-r/point-recruit.webp", caption: "홈 · 채용" },
  ],
  details: [
    { title: "대규모 기업 메뉴 구조", body: "회사, 투자, 사업, 홍보, ESG, 인재와 관계사 정보를 일관된 메뉴 체계로 제공합니다." },
    { title: "재무·공시·입찰 게시판", body: "표와 자료, 검색 가능한 목록·상세 화면을 실제 공개 체계에 맞춰 구성합니다." },
    { title: "뉴스·갤러리·영상 관리", body: "관리자가 기업 소식과 홍보자료를 직접 등록하는 기능을 추가할 수 있습니다." },
    { title: "관계사·사업장 확장", body: "관계사와 사업장이 늘어나도 같은 구조 안에서 소개 화면과 연락 정보를 추가할 수 있습니다." },
    { title: "PC·태블릿·모바일 반응형", body: "긴 고정·가로 장면도 기기별로 읽기 쉬운 스크롤 방식과 메뉴 구조로 바뀝니다." },
    { title: "영문·다국어 확장", body: "글로벌 고객에게 필요한 영문 메인과 주요 사업·회사소개 화면을 별도로 구성할 수 있습니다." },
  ],
  mobile: {
    title: "모바일에서도 사업·공시·채용 화면으로 바로 이동합니다",
    body: "스크롤 고정 장면은 한 화면씩 읽는 방식으로 바뀌고, 많은 메뉴는 전체 메뉴 안에서 계층별로 펼쳐 필요한 정보를 빠르게 찾게 합니다.",
    shots: [
      { img: "/cases/corporate-r/m-index.webp", caption: "메인" },
      { img: "/cases/corporate-r/m-company.webp", caption: "회사개요" },
      { img: "/cases/corporate-r/m-business-grain.webp", caption: "그레인터미널" },
      { img: "/cases/corporate-r/m-careers.webp", caption: "채용" },
    ],
  },
  faq: [
    { q: "사업과 관계사가 많아도 같은 구조로 정리할 수 있나요?", a: "실제 조직과 사업 구조를 확인해 상위 메뉴, 사업·관계사 분류와 상세 화면 수를 다시 설계합니다." },
    { q: "재무자료와 공시·입찰을 관리자가 올릴 수 있나요?", a: "관리자 기능을 추가하면 재무·공시 자료, 입찰, 뉴스와 채용 공고를 직접 등록하고 수정할 수 있습니다." },
    { q: "기존 뉴스와 자료도 이전할 수 있나요?", a: "이전할 데이터의 형식과 수량을 확인한 뒤 뉴스, 갤러리, 공시와 자료실 콘텐츠를 새 구조로 옮길 수 있습니다." },
    { q: "영문 홈페이지도 함께 제작할 수 있나요?", a: "국문과 동일한 전체 영문 또는 회사·사업 중심의 핵심 영문 화면으로 나눠 제작할 수 있습니다." },
    { q: "제작 기간과 비용은 어떻게 정해지나요?", a: "프리미엄 디자인은 부가세 별도 300만 원부터이며 페이지 수, 데이터 이전, 관리자와 다국어 범위를 확인한 뒤 정확히 안내합니다." },
    { q: "도메인·호스팅·유지보수도 지원하나요?", a: "도메인과 호스팅 연결을 지원하고 공개 후 공시·뉴스 업데이트와 유지보수 방식도 함께 안내합니다." },
  ],
};

export default study;
