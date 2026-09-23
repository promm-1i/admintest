import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "NEXORA",
  headline: "글로벌 첨단소재 그룹 홈페이지",
  summary:
    "여러 사업부와 해외 거점, 기술 성과와 ESG·IR 정보를 한 사이트에 나눠 담은 중견 산업그룹용 프리미엄 기업 홈페이지입니다.",
  brandColor: "rgb(98, 61, 185)",
  tintColor: "rgb(237, 232, 248)",
  overview:
    "NEXORA 디자인은 첨단소재, 산업인프라, 미래소재와 디지털솔루션을 함께 운영하는 글로벌 산업그룹을 가정해 구성했습니다. 첫 화면의 산업 이미지에서 사업 분야, 글로벌 네트워크, 주요 성과와 뉴스로 이어지며 기업의 규모를 한 흐름 안에서 이해하게 합니다.\n\n회사소개, 연혁, 네트워크, 브랜드와 CI, 다섯 개 사업 분야, ESG, IR, 재무와 공시, 뉴스까지 22개 화면을 갖춰 사업부와 이해관계자가 많은 기업에도 적용할 수 있습니다. 긴 성과 구간은 스크롤 진행에 맞춰 옆으로 이동하고, 글로벌 네트워크는 수치와 지도를 함께 사용합니다.\n\n회사명, 국가·거점 수, 성과, 재무 정보와 화면 이미지는 디자인 예시이며 실제 회사 자료에 맞춰 변경합니다.",
  meta: [
    { label: "적합 업종", value: "첨단소재 · 산업기계 · 전력인프라 · 글로벌 제조그룹" },
    { label: "주요 구성", value: "회사소개 · 사업 5분야 · 글로벌 네트워크 · ESG · IR·재무·공시 · 뉴스" },
    { label: "맞춤 적용", value: "사업부 · 해외 거점 · 성과 수치 · 투자정보 · 브랜드 체계 변경 가능" },
  ],
  mainShot: "/cases/corporate-n/main.webp",
  capabilities: {
    label: "22-PAGE GLOBAL GROUP SYSTEM",
    title: "사업·글로벌 거점·ESG·IR을 22개 화면의 그룹 포털로 구성했습니다",
    body: "기업 이미지만 강조하는 소개 페이지가 아니라 사업부, 해외 고객, 투자자와 이해관계자가 각자 필요한 정보를 바로 찾는 구조입니다.",
    stats: [
      { value: "22", label: "실제 구축 화면", note: "그룹·사업·ESG·IR·뉴스" },
      { value: "5", label: "사업 분야", note: "소재·인프라·디지털 사업" },
      { value: "10", label: "글로벌 권역", note: "국가·사업장·R&D 거점" },
      { value: "3", label: "ESG 세부 화면", note: "ESG·환경·윤리" },
    ],
    groups: [
      { label: "사업 5분야", title: "다섯 사업의 역할과 연결 관계를 한 구조에서 비교합니다", body: "그룹 전체 사업 지도를 먼저 이해하고 소재·산업·디지털 등 각 사업 상세로 이동하도록 구성했습니다.", items: ["사업 분야 5개", "사업별 이미지와 핵심 역량", "개별 사업 상세 연결"], img: "/cases/corporate-n/page-business.webp", caption: "사업 · 그룹 사업영역", file: "business.html" },
      { label: "글로벌 10권역", title: "국가·사업장·연구 거점을 지도와 수치로 탐색합니다", body: "해외 네트워크를 단순 지도 이미지로 끝내지 않고 권역별 거점과 사업 성격을 구분해 확인하게 합니다.", items: ["글로벌 10개 권역", "30개국·126개 거점 수치", "권역별 법인과 사업 정보"], img: "/cases/corporate-n/page-network.webp", caption: "그룹 · 글로벌 네트워크", file: "network.html" },
      { label: "성과·연혁", title: "주요 성과와 성장 과정을 가로 트랙과 시대별 기록으로 보여 줍니다", body: "대표 성과는 스크롤 진행에 맞춰 옆으로 이동하고 연혁은 여섯 시대로 나눠 그룹의 성장 맥락을 전달합니다.", items: ["스크롤 연동 성과 트랙", "연혁 6개 시대", "핵심 이정표와 수치"], img: "/cases/corporate-n/point-milestones.webp", caption: "홈 · 주요 성과", file: "milestones.html" },
      { label: "ESG 경영", title: "ESG 전략과 환경·윤리 활동을 세부 화면으로 분리했습니다", body: "목표 선언, 환경 과제와 윤리 원칙을 각각 읽을 수 있어 지속가능경영 자료를 분야별로 운영할 수 있습니다.", items: ["ESG 전략과 목표", "환경경영 세부 활동", "윤리경영 원칙"], img: "/cases/corporate-n/page-esg.webp", caption: "ESG · 전략과 활동", file: "esg.html" },
      { label: "IR·재무·공시", title: "투자자가 필요한 재무지표와 공시 자료를 별도 체계로 제공합니다", body: "IR 개요에서 재무상태와 손익을 비교하고 공시 목록으로 이동하는 투자정보 흐름을 갖췄습니다.", items: ["IR 정보 구조", "연도별 재무 비교", "공시 목록과 자료 연결"], img: "/cases/corporate-n/page-finance.webp", caption: "IR · 재무정보", file: "finance.html" },
      { label: "뉴스 아카이브", title: "그룹 소식은 목록과 상세 화면으로 지속 운영합니다", body: "대표 뉴스와 전체 목록, 개별 기사 화면을 분리해 사업·ESG·IR 업데이트를 축적할 수 있습니다.", items: ["뉴스 카드 목록", "기사 상세 화면", "사업·ESG 관련 콘텐츠 연결"], img: "/cases/corporate-n/page-news.webp", caption: "미디어 · 뉴스 목록", file: "news.html" },
    ],
  },
  pagesLabel: "PREVIEW",
  pagesTitle: "주요 화면 미리보기",
  pages: [
    { name: "홈", file: "index.html", img: "/cases/corporate-n/page-index.webp", desc: "산업 히어로에서 사업 분야, 글로벌 네트워크, 주요 성과와 뉴스까지 그룹의 핵심을 한 번에 보여 줍니다.", items: ["산업 히어로 슬라이드", "사업 분야 5개", "글로벌 네트워크 수치", "가로 이동 성과와 뉴스"] },
    { name: "기업개요", file: "about.html", img: "/cases/corporate-n/page-about.webp", desc: "기업의 정체성, 주요 수치와 사업 구조를 간결한 정보 블록으로 소개합니다.", items: ["기업 소개와 핵심 수치", "사업 구조와 주요 역량", "관련 회사소개 메뉴 연결"] },
    { name: "연혁", file: "history.html", img: "/cases/corporate-n/page-history.webp", desc: "성장 과정을 시대별 타임라인과 주요 사건으로 정리합니다.", items: ["6개 시대 구간", "연도별 주요 사건", "성장 단계 시각화"] },
    { name: "사업영역", file: "business.html", img: "/cases/corporate-n/page-business.webp", desc: "다섯 개 사업 분야의 역할과 연결 관계를 한 화면에서 비교합니다.", items: ["사업 분야 5개", "사업별 이미지와 설명", "상세 사업 화면 연결"] },
    { name: "글로벌 네트워크", file: "network.html", img: "/cases/corporate-n/page-network.webp", desc: "해외 법인과 사업 거점을 권역별로 확인할 수 있게 구성합니다.", items: ["10개 권역 네트워크", "국가·사업장·R&D 수치", "거점별 정보 표시"] },
    { name: "ESG", file: "esg.html", img: "/cases/corporate-n/page-esg.webp", desc: "환경, 사회, 윤리경영의 목표와 주요 활동을 분야별로 안내합니다.", items: ["ESG 전략과 목표", "환경·윤리 세부 화면", "성과 자료와 보고서 연결"] },
    { name: "재무정보", file: "finance.html", img: "/cases/corporate-n/page-finance.webp", desc: "주요 재무지표와 연도별 추이를 표와 그래프로 제공합니다.", items: ["재무상태와 손익", "연도별 비교", "IR·공시 화면 연결"] },
    { name: "뉴스", file: "news.html", img: "/cases/corporate-n/page-news.webp", desc: "그룹의 사업 성과와 기술 소식을 이미지 카드와 목록으로 전달합니다.", items: ["뉴스 카드와 목록", "상세 기사 연결", "날짜와 분류 표시"] },
  ],
  points: [
    { title: "사업 분야를\n한 화면에서 비교합니다", body: "서로 다른 사업부의 역할을 같은 형식의 패널로 보여 주고, 관심 분야는 호버와 클릭으로 넓혀 상세 화면으로 이동하게 합니다.", items: ["사업 분야 5개", "호버 확장 패널", "사업 상세 연결"], img: "/cases/corporate-n/point-business.webp", caption: "홈 · 사업 분야" },
    { title: "글로벌 사업 규모를\n수치와 지도로 보여 줍니다", body: "국가, 사업장과 R&D 거점 수치를 크게 보여 준 뒤 권역별 네트워크 화면으로 이어져 해외 사업 범위를 빠르게 이해하게 합니다.", items: ["국가·사업장·R&D 핵심 수치", "글로벌 지도", "권역별 거점 정보"], img: "/cases/corporate-n/point-network.webp", caption: "홈 · 글로벌 네트워크" },
    { title: "주요 성과는\n스크롤 흐름에 맞춰 이어집니다", body: "긴 세로 공간을 활용해 주요 성과 카드가 가로로 이동하도록 구성했습니다. 한 번에 많은 수치를 나열하지 않고 시기와 주제별로 읽게 합니다.", items: ["가로 이동 성과 트랙", "연도와 핵심 성과", "진행률에 맞춘 모션"], img: "/cases/corporate-n/point-milestones.webp", caption: "홈 · 주요 성과" },
    { title: "기업 소식을\n이미지와 목록으로 전달합니다", body: "최근 뉴스는 대표 기사와 나머지 목록의 위계를 나눠 중요한 소식은 크게, 추가 소식은 빠르게 훑을 수 있게 구성합니다.", items: ["대표 뉴스 강조", "최신 기사 목록", "뉴스 상세 연결"], img: "/cases/corporate-n/point-news.webp", caption: "홈 · 최신 뉴스" },
  ],
  details: [
    { title: "다중 사업부 정보 구조", body: "사업부와 제품군이 많아도 메뉴와 상세 화면을 목적별로 나눠 필요한 정보를 빠르게 찾게 합니다." },
    { title: "해외 거점·수치 맞춤 적용", body: "실제 국가, 법인, 공장과 연구소 자료에 맞춰 지도와 수치를 변경합니다." },
    { title: "ESG·IR 자료 제공", body: "지속가능경영, 재무, 공시와 보고서를 기업 운영 방식에 맞게 구성합니다." },
    { title: "뉴스·공시 관리 기능", body: "관리자가 기업 소식과 공시 자료를 직접 등록하는 기능을 추가할 수 있습니다." },
    { title: "PC·태블릿·모바일 반응형", body: "가로 성과 구간과 사업 패널도 작은 화면에 맞는 읽기 순서로 다시 배치됩니다." },
    { title: "검색·공유 기본 설정", body: "페이지별 제목, 설명과 대표 이미지를 설정해 검색 노출과 링크 공유에 대비합니다." },
  ],
  mobile: {
    title: "작은 화면에서도 사업과 투자정보를 빠르게 찾습니다",
    body: "사업 패널과 성과 카드는 세로 흐름으로 바뀌고, 메뉴를 접어 회사소개·사업·ESG·IR 화면으로 바로 이동할 수 있습니다.",
    shots: [
      { img: "/cases/corporate-n/m-index.webp", caption: "메인" },
      { img: "/cases/corporate-n/m-business.webp", caption: "사업영역" },
      { img: "/cases/corporate-n/m-network.webp", caption: "글로벌 네트워크" },
      { img: "/cases/corporate-n/m-esg.webp", caption: "ESG" },
    ],
  },
  faq: [
    { q: "사업 분야와 계열사가 많아도 구성할 수 있나요?", a: "네. 실제 조직과 사업 구조를 확인해 상위 메뉴, 사업 분류와 상세 화면 수를 다시 설계합니다." },
    { q: "해외 법인과 사업장을 지도에 표시할 수 있나요?", a: "국가와 거점 자료를 제공해 주시면 권역별 지도와 목록으로 구성하고 상세 연락처도 연결할 수 있습니다." },
    { q: "재무자료와 공시를 직접 올릴 수 있나요?", a: "관리자 기능을 추가하면 공시, 보고서, 뉴스와 재무자료를 직접 등록하고 수정할 수 있습니다." },
    { q: "영문 홈페이지도 함께 제작할 수 있나요?", a: "국문과 같은 구조의 영문 사이트 또는 핵심 페이지만 별도로 구성할 수 있으며 번역 범위에 따라 견적을 안내합니다." },
    { q: "제작 기간과 비용은 어떻게 정해지나요?", a: "프리미엄 디자인은 부가세 별도 300만 원부터이며 페이지 수, 다국어와 관리 기능 범위를 확인한 뒤 정확히 안내합니다." },
    { q: "도메인·호스팅·유지보수도 지원하나요?", a: "도메인과 호스팅 연결을 지원하고 공개 후 자료 업데이트와 유지보수 방식도 함께 안내합니다." },
  ],
};

export default study;
