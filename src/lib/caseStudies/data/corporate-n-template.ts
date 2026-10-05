import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "NEXORA",
  headline: "글로벌 첨단소재 그룹 홈페이지",
  summary:
    "첫 화면 사진 세 장, 사업 카드 다섯 칸, 30개국 126개 거점 숫자, 옆으로 흐르는 주요 성과, 뉴스로 이어지는 산업그룹 홈페이지입니다. 그룹소개 · 사업 · ESG · IR · 뉴스까지 모두 22쪽입니다.",
  brandColor: "rgb(98, 61, 185)",
  tintColor: "rgb(237, 232, 248)",
  overview:
    "NEXORA는 1966년 섬유 공장에서 시작해 첨단소재 · 산업인프라 · 미래소재 · 디지털솔루션 네 사업을 하는 산업그룹을 가정하고 만든 디자인입니다. 흰 바탕에 보라 한 가지를 강조색으로 썼고, 글로벌 네트워크 구역만 보라 그러데이션 바탕입니다.\n\n메인은 5.2초마다 넘어가는 첫 화면 사진 세 장, 마우스를 올리면 사진이 칸을 채우는 사업 카드 다섯 칸, 국가 30 · 사업장 126 · R&D 5 숫자, 스크롤에 따라 옆으로 흐르는 주요 성과 다섯 장, 최신 뉴스 목록으로 이어집니다.\n\n서브는 그룹소개 · 연혁 · 주요 성과 · 글로벌 네트워크 · 브랜드 · CI, 사업 개요와 사업 네 쪽, ESG · 환경경영 · 윤리경영, IR 개요 · 재무정보 · 공시정보, 뉴스 목록과 상세, 약관 두 쪽입니다. 회사명, 국가 · 거점 수, 성과, 재무 정보와 화면 이미지는 디자인 예시이며 실제 회사 자료에 맞춰 바꿉니다.",
  meta: [
    { label: "적합 업종", value: "첨단소재 · 산업기계 · 전력인프라 · 글로벌 제조그룹" },
    { label: "주요 구성", value: "회사소개 · 사업 5분야 · 글로벌 네트워크 · ESG · IR·재무·공시 · 뉴스" },
    { label: "맞춤 적용", value: "사업부 · 해외 거점 · 성과 수치 · 투자정보 · 브랜드 체계 변경 가능" },
  ],
  mainShot: "/cases/corporate-n/main.webp",
  capabilities: {
    label: "22-PAGE GLOBAL GROUP SYSTEM",
    title: "사업·글로벌 거점·ESG·IR까지 22개 화면",
    body: "메인 뒤로 그룹소개 여섯 쪽, 사업 다섯 쪽, ESG 세 쪽, IR 세 쪽, 뉴스 목록과 상세가 이어집니다.",
    stats: [
      { value: "22", label: "화면 수", note: "그룹·사업·ESG·IR·뉴스" },
      { value: "5", label: "사업 쪽", note: "사업 개요와 사업 네 쪽" },
      { value: "10", label: "글로벌 권역", note: "권역마다 거점 네 곳" },
      { value: "3", label: "ESG 세부 화면", note: "ESG·환경·윤리" },
    ],
    groups: [
      { label: "사업 5쪽", title: "사업 개요와 사업 네 쪽", body: "사업 개요 쪽에 네 사업부를 사진 카드로 놓고, 첨단소재 · 산업인프라 · 미래소재 · 디지털솔루션은 각각 쪽이 있습니다. 쪽마다 세 갈래 설명과 태그 세 개씩이 붙습니다.", items: ["사업 개요 · 사업부 카드 4", "사업마다 설명 세 갈래", "갈래마다 태그 3"], img: "/cases/corporate-n/page-business.webp", caption: "사업 · 그룹 사업영역", file: "business.html" },
      { label: "글로벌 10권역", title: "10개 권역과 거점 목록", body: "‘30개국 126개 거점, 하나의 품질 기준’ 아래로 대한민국부터 열 개 권역이 차례로 나오고, 권역마다 한 줄 설명과 거점 네 곳의 역할이 붙습니다.", items: ["권역 10 · 한 줄 설명", "거점 4곳 · 생산 · 연구 · 영업 · 물류", "생산 38 · 연구소 5 · 판매 법인 83"], img: "/cases/corporate-n/page-network.webp", caption: "그룹 · 글로벌 네트워크", file: "network.html" },
      { label: "성과·연혁", title: "옆으로 흐르는 성과와 10년 단위 연혁", body: "메인의 주요 성과는 스크롤에 따라 카드가 옆으로 흐르고, 주요 성과 쪽에는 1966년부터 열 장면을 숫자 세 개씩과 함께 적었습니다. 연혁은 10년 단위 구간으로 나눴습니다.", items: ["스크롤에 따라 흐르는 성과 카드", "주요 성과 10장면 · 숫자 3개씩", "연혁 10년 단위 구간"], img: "/cases/corporate-n/point-milestones.webp", caption: "홈 · 주요 성과", file: "milestones.html" },
      { label: "ESG 경영", title: "ESG · 환경경영 · 윤리경영 세 쪽", body: "ESG 쪽에 환경 로드맵 · 현장 안전 · 거버넌스 세 갈래를 적고, 환경경영과 윤리경영은 쪽을 따로 두어 항목별 목표와 방식을 적었습니다.", items: ["ESG 세 갈래", "환경경영 다섯 항목", "윤리경영 · 제보 채널"], img: "/cases/corporate-n/page-esg.webp", caption: "ESG · 전략과 활동", file: "esg.html" },
      { label: "IR·재무·공시", title: "IR 개요 · 재무표 · 공시 목록", body: "IR 개요에 3년치 매출 · 영업이익 · 자산, 재무정보에 4년치 여섯 항목 표를 두고, 공시정보는 등록일 · 제목 · 구분 목록입니다.", items: ["IR 개요 3년 실적", "재무정보 표 여섯 항목", "공시 목록 · 구분 표시"], img: "/cases/corporate-n/page-finance.webp", caption: "IR · 재무정보", file: "finance.html" },
      { label: "뉴스", title: "뉴스 목록과 상세", body: "뉴스룸에 날짜 · 제목 · 한 줄 요약이 붙은 보도자료를 날짜순으로 놓고, 누르면 상세 쪽으로 갑니다.", items: ["보도자료 목록 · 날짜 · 요약", "기사 상세 쪽", "메인 최신 뉴스 목록"], img: "/cases/corporate-n/page-news.webp", caption: "미디어 · 뉴스 목록", file: "news.html" },
    ],
  },
  pagesLabel: "PREVIEW",
  pagesTitle: "주요 화면 미리보기",
  pages: [
    { name: "홈", file: "index.html", img: "/cases/corporate-n/page-index.webp", desc: "첫 화면 사진 세 장 아래로 사업 카드, 글로벌 네트워크 숫자, 주요 성과, 최신 뉴스가 이어집니다.", items: ["첫 화면 사진 3장 · 5.2초 전환", "사업 카드 5칸", "국가 · 사업장 · R&D 숫자", "옆으로 흐르는 성과 · 뉴스"] },
    { name: "그룹소개", file: "about.html", img: "/cases/corporate-n/page-about.webp", desc: "섬유 공장에서 네 사업까지 온 소개 글과, 직원이 지키는 네 가지(최고 · 혁신 · 책임 · 신뢰)입니다.", items: ["소개 한 단락", "지키는 네 가지 · 한 줄씩", "주요 성과 · 연혁으로 가는 링크"] },
    { name: "연혁", file: "history.html", img: "/cases/corporate-n/page-history.webp", desc: "1966년부터 10년 단위 구간으로 나눠 해마다 사건 한 줄씩 적었습니다.", items: ["10년 단위 구간", "연도 · 제목 · 한 줄 설명"] },
    { name: "사업 개요", file: "business.html", img: "/cases/corporate-n/page-business.webp", desc: "네 사업부를 사진 카드로 놓고 카드마다 한 줄 설명과 태그 세 개를 붙였습니다.", items: ["사업부 카드 4", "한 줄 설명 · 태그 3", "사업별 쪽으로 연결"] },
    { name: "글로벌 네트워크", file: "network.html", img: "/cases/corporate-n/page-network.webp", desc: "열 개 권역마다 한 줄 설명과 거점 네 곳의 역할을 적었습니다.", items: ["권역 10", "권역마다 거점 4곳", "거점별 역할 표시"] },
    { name: "ESG", file: "esg.html", img: "/cases/corporate-n/page-esg.webp", desc: "환경 로드맵 · 현장 안전 · 거버넌스 세 갈래를 사진 카드로 적었습니다.", items: ["ESG 세 갈래", "갈래마다 태그 3", "환경 · 윤리 쪽으로 연결"] },
    { name: "재무정보", file: "finance.html", img: "/cases/corporate-n/page-finance.webp", desc: "2023~2026년 매출액 · 영업이익 · 순이익 · 자산 · 부채 · 자본 표입니다.", items: ["재무 표 6항목 × 4년", "공시 안내 한 줄", "IR · 공시 쪽으로 연결"] },
    { name: "뉴스", file: "news.html", img: "/cases/corporate-n/page-news.webp", desc: "날짜 · 제목 · 한 줄 요약이 붙은 보도자료 목록입니다.", items: ["보도자료 6건", "날짜 · 제목 · 요약", "상세 쪽 연결"] },
  ],
  points: [
    { title: "사업 카드 다섯 칸은\n올리면 사진이 칸을 채웁니다", body: "Business Areas 구역은 첨단소재 · 산업인프라 · 미래소재 · 디지털솔루션 · 기타 사업 분야 다섯 칸을 가로로 나눴습니다. 칸 아래쪽에 사진이 조금 보이다가, 마우스를 올리면 사진이 칸 전체로 커지고 누르면 사업 쪽으로 갑니다.", items: ["사업 카드 5칸", "마우스를 올리면 사진이 칸을 채움", "사업 쪽으로 연결"], img: "/cases/corporate-n/point-business.webp", caption: "홈 · 사업 분야" },
    { title: "국가 30 · 사업장 126 · R&D 5\n숫자 세 개", body: "Global Network 구역은 보라 그러데이션 바탕에 ‘30개국 126개 사업장에서 생산과 연구, 판매를 나눠 맡습니다.’ 한 줄과 국가 · 사업장 · R&D 숫자 세 개를 크게 적었습니다. 제목을 누르면 글로벌 네트워크 쪽으로 갑니다.", items: ["보라 그러데이션 바탕", "숫자 3 · 국가 · 사업장 · R&D", "글로벌 네트워크 쪽으로 연결"], img: "/cases/corporate-n/point-network.webp", caption: "홈 · 글로벌 네트워크" },
    { title: "주요 성과는\n스크롤에 따라 옆으로 흐릅니다", body: "Milestones 구역은 화면에 붙은 채 스크롤을 내리는 동안 2026 · 2024 · 2022 · 2018 · 2013 성과 카드가 옆으로 흐릅니다. 카드마다 연도 · 제목 · 한 줄 설명이 붙고, 바탕에는 1966 · 1987 · 2001 · 2013 · 2026 연도가 옅게 깔립니다.", items: ["화면 고정 · 카드가 옆으로 흐름", "성과 카드 5 · 연도 · 제목 · 한 줄", "바탕에 옅은 연도 글자"], img: "/cases/corporate-n/point-milestones.webp", caption: "홈 · 주요 성과" },
    { title: "최신 뉴스는\n한 건 크게, 네 건은 목록", body: "Latest News Release 구역은 맨 위 한 건을 크게 두고, 아래 네 건을 날짜와 제목만 있는 목록으로 놓았습니다. 줄마다 화살표가 붙고 누르면 뉴스 상세로 갑니다.", items: ["대표 뉴스 1", "목록 4건 · 날짜 · 제목", "뉴스 상세 연결"], img: "/cases/corporate-n/point-news.webp", caption: "홈 · 최신 뉴스" },
  ],
  details: [
    { title: "보라 한 가지와 흰 바탕", body: "강조색은 보라 한 가지이고, 글로벌 네트워크 구역만 보라 그러데이션 바탕입니다." },
    { title: "첫 화면 사진 세 장", body: "첫 화면 사진은 5.2초마다 넘어가고, 좌우 화살표와 점으로 직접 넘길 수 있습니다." },
    { title: "사업 쪽은 같은 틀", body: "사업 네 쪽과 ESG 세 쪽은 사진 카드 · 한 줄 설명 · 태그 세 개로 된 같은 틀을 씁니다." },
    { title: "뉴스·공시 관리 기능", body: "관리자가 회사 소식과 공시 자료를 직접 등록하는 기능을 추가할 수 있습니다." },
    { title: "본문 바로가기", body: "모든 쪽 맨 앞에 본문 바로가기 링크가 있어 키보드로 메뉴를 건너뛸 수 있습니다." },
    { title: "검색·공유 기본 설정", body: "페이지별 제목, 설명과 대표 이미지를 설정해 두었습니다." },
  ],
  mobile: {
    title: "휴대폰에서는 사업 카드가 세로로 쌓입니다",
    body: "760px보다 좁은 화면에서는 사업 카드 다섯 칸이 세로로 쌓이고, 주요 성과는 그대로 화면에 붙은 채 옆으로 흐릅니다. 메뉴는 접어 두었다가 버튼으로 엽니다.",
    shots: [
      { img: "/cases/corporate-n/m-index.webp", caption: "메인" },
      { img: "/cases/corporate-n/m-business.webp", caption: "사업영역" },
      { img: "/cases/corporate-n/m-network.webp", caption: "글로벌 네트워크" },
      { img: "/cases/corporate-n/m-esg.webp", caption: "ESG" },
    ],
  },
  faq: [
    { q: "사업 분야와 계열사가 많아도 구성할 수 있나요?", a: "네. 실제 조직과 사업 구조를 확인해 상위 메뉴, 사업 분류와 상세 화면 수를 다시 짭니다." },
    { q: "해외 법인과 사업장을 지도에 표시할 수 있나요?", a: "국가와 거점 자료를 주시면 권역별 지도와 목록으로 넣고 상세 연락처도 연결할 수 있습니다." },
    { q: "재무자료와 공시를 직접 올릴 수 있나요?", a: "관리자 기능을 추가하면 공시, 보고서, 뉴스와 재무자료를 직접 등록하고 수정할 수 있습니다." },
    { q: "영문 홈페이지도 함께 제작할 수 있나요?", a: "국문과 같은 구조의 영문 사이트 또는 핵심 페이지만 따로 만들 수 있으며 번역 범위에 따라 견적을 안내합니다." },
    { q: "제작 기간과 비용은 어떻게 정해지나요?", a: "프리미엄 디자인은 부가세 별도 150만 원부터이며 페이지 수, 다국어와 관리 기능 범위를 확인한 뒤 정확히 안내합니다." },
    { q: "도메인·호스팅·유지보수도 지원하나요?", a: "도메인과 호스팅 연결을 지원하고 공개 후 자료 업데이트와 유지보수 방식도 함께 안내합니다." },
  ],
};

export default study;
