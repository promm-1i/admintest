import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "FLOVEX",
  headline: "산업설비 · 스마트 플로우 기업 홈페이지",
  summary:
    "산업설비 기업의 기술과 설비를 보여 주는 프리미엄 기업 홈페이지입니다. 회사소개, 사업영역, 인증·특허, 미디어, 채용, 자료실, 상담 문의까지 기업 홈페이지에 필요한 전체 구성을 제공합니다.",
  brandColor: "rgb(0, 112, 239)",
  tintColor: "rgb(232, 243, 255)",
  overview:
    "산업설비 기업이 보유한 기술, 설비, 수행 역량을 방문자가 쉽게 이해할 수 있도록 정보의 흐름을 설계했습니다. 회사의 전문성과 사업 경쟁력을 첫 화면부터 주요 사업영역, 성과, 인증 자료, 고객 사례 순으로 확인할 수 있습니다.\n\n업종과 브랜드에 맞춰 회사명, 색상, 사진, 메뉴, 사업 내용을 변경할 수 있으며 PC·태블릿·모바일에서 편리하게 이용할 수 있도록 제작합니다. 문의 접수, 자료 등록, 소식 관리처럼 운영에 필요한 기능도 상담 후 연결할 수 있습니다.\n\nFLOVEX와 화면에 표시된 회사 정보, 실적, 고객사, 연혁은 디자인 구성을 보여주기 위한 예시입니다.",
  meta: [
    {
      label: "적합 업종",
      value: "산업설비 · 반도체 · 이차전지 · 데이터센터 · 클린룸",
    },
    {
      label: "주요 구성",
      value: "회사소개 · 사업영역 · 인증·특허 · 미디어 · 채용 · 자료실 · 문의",
    },
    {
      label: "맞춤 적용",
      value: "브랜드 색상 · 메뉴 · 사진 · 사업 내용 · 문의 기능 변경 가능",
    },
  ],
  mainShot: "/cases/corporate-m/main.webp",
  capabilities: {
    label: "26-PAGE ENGINEERING SYSTEM",
    title: "여섯 사업의 기술·인증·자료·문의 흐름을 26개 화면으로 구축했습니다",
    body: "긴 메인 장면뿐 아니라 사업별 기술 설명, 검증 자료, 미디어와 채용, 카탈로그와 문의까지 산업설비 기업의 실제 영업·운영 범위를 보여 줍니다.",
    stats: [
      { value: "26", label: "실제 구축 화면", note: "회사·사업·홍보·지원·채용" },
      { value: "6", label: "사업 상세", note: "반도체부터 데이터센터까지" },
      { value: "4", label: "검증·자료 영역", note: "자격·카탈로그·리포트·미디어" },
      { value: "4", label: "인재 화면", note: "인재상·채용·복지·스토리" },
    ],
    groups: [
      { label: "사업 6분야", title: "산업별 설비와 공정 역량을 여섯 개 상세 화면으로 분리했습니다", body: "반도체·이차전지·극저온·불소수지·드라이룸·데이터센터 사업을 각 산업의 요구와 공정 이미지에 맞춰 설명합니다.", items: ["사업 분야 6개 독립 상세", "산업별 기술·공정 설명", "메인 솔루션에서 상세 연결"], img: "/cases/corporate-m/page-semiconductor.webp", caption: "사업 · 반도체 유틸리티", file: "business-semiconductor.html" },
      { label: "데이터센터", title: "데이터센터 냉각과 유틸리티 역량을 별도 사업 화면으로 제공합니다", body: "설비 구조와 운영 안정성, 적용 영역을 전용 이미지와 문장으로 구성해 신규 산업 역량을 명확히 보여 줍니다.", items: ["데이터센터 설비 개요", "냉각·배관 적용 영역", "관련 기술과 상담 연결"], img: "/cases/corporate-m/page-datacenter.webp", caption: "사업 · 데이터센터", file: "business-datacenter.html" },
      { label: "자격·인증", title: "보유 자격과 검증 자료를 프로젝트 신뢰의 근거로 제시합니다", body: "산업설비 발주자가 확인해야 하는 등록·인증·수행 자격을 목록과 상세 정보로 정리했습니다.", items: ["자격·인증 분류", "증빙 이미지와 설명", "회사 기술정보 연결"], img: "/cases/corporate-m/page-qualification.webp", caption: "기술 · 자격 및 인증", file: "qualification.html" },
      { label: "미디어·실적", title: "뉴스와 프로젝트 미디어를 운영형 아카이브로 제공합니다", body: "현장 수행 사례와 기업 소식을 카드 목록으로 축적하고 개별 콘텐츠에서 사업 역량을 확인할 수 있습니다.", items: ["프로젝트 미디어 카드", "뉴스 목록·상세", "사업·채용 콘텐츠 연결"], img: "/cases/corporate-m/page-media.webp", caption: "홍보 · 미디어 아카이브", file: "media.html" },
      { label: "인재·복지", title: "인재상·채용·복지와 구성원 이야기를 네 화면으로 연결합니다", body: "채용 공고만 두지 않고 조직문화와 복지, 실제 구성원 스토리를 함께 제공해 지원자가 회사를 이해하게 합니다.", items: ["인재상과 채용 정보", "복리후생 항목", "구성원 인터뷰·스토리"], img: "/cases/corporate-m/page-benefits.webp", caption: "채용 · 복리후생", file: "benefits.html" },
      { label: "자료·상담", title: "카탈로그와 고객지원, 문의·제보 접수를 목적별로 분리했습니다", body: "제품·기술 자료를 내려받고 필요한 사업을 선택해 문의하거나 별도 지원·제보 화면을 이용할 수 있습니다.", items: ["카탈로그 자료실", "사업 분야 선택 문의 폼", "고객지원·제보 접수"], img: "/cases/corporate-m/page-inquiry.webp", caption: "고객지원 · 사업 문의", file: "inquiry.html" },
    ],
  },
  pagesLabel: "PREVIEW",
  pagesTitle: "주요 화면 미리보기",
  pages: [
    {
      name: "홈",
      file: "index.html",
      img: "/cases/corporate-m/page-index.webp",
      desc: "회사의 핵심 사업과 비전, 주요 성과를 첫 화면에서 빠르게 파악할 수 있도록 구성했습니다.",
      items: [
        "주요 사업영역 소개",
        "기업 비전과 핵심가치",
        "글로벌 역량과 주요 성과",
        "고객 사례와 최신 소식",
      ],
    },
    {
      name: "경영 비전",
      file: "vision.html",
      img: "/cases/corporate-m/page-vision.webp",
      desc: "기업이 추구하는 방향과 핵심가치를 브랜드 메시지에 맞춰 인상적으로 전달합니다.",
      items: ["기업 미션과 비전", "핵심가치 소개", "브랜드 메시지 맞춤 적용"],
    },
    {
      name: "회사 연혁",
      file: "history.html",
      img: "/cases/corporate-m/page-history.webp",
      desc: "회사의 성장 과정과 주요 성과를 연도별로 정리해 기업의 경험과 신뢰도를 보여줍니다.",
      items: ["주요 연혁 정리", "성장 과정과 성과 강조", "회사 자료에 맞춘 내용 변경"],
    },
    {
      name: "인증 · 특허",
      file: "qualification.html",
      img: "/cases/corporate-m/page-qualification.webp",
      desc: "보유한 인증, 특허, 면허를 분야별로 정리해 기술력과 공신력을 쉽게 확인할 수 있습니다.",
      items: ["인증·면허 분류", "특허 자료 안내", "증빙 자료 이미지 적용"],
    },
    {
      name: "반도체",
      file: "business-semiconductor.html",
      img: "/cases/corporate-m/page-semiconductor.webp",
      desc: "반도체 분야의 기술, 설비, 적용 공정을 설명과 현장 사진으로 나눠 소개합니다.",
      items: ["사업 분야 핵심 요약", "기술과 설비 상세 소개", "관련 이미지와 적용 분야 안내"],
    },
    {
      name: "데이터센터",
      file: "business-datacenter.html",
      img: "/cases/corporate-m/page-datacenter.webp",
      desc: "데이터센터 냉각과 유틸리티 분야의 전문 역량을 이해하기 쉬운 흐름으로 전달합니다.",
      items: ["솔루션 특징 소개", "주요 설비와 공정 안내", "프로젝트 자료에 맞춘 구성"],
    },
    {
      name: "미디어센터",
      file: "media.html",
      img: "/cases/corporate-m/page-media.webp",
      desc: "기업 뉴스, 보도자료, 프로젝트 소식을 주제별로 찾아볼 수 있도록 정리합니다.",
      items: ["기업 소식 분류", "보도자료와 프로젝트 소개", "원하는 소식을 찾는 검색 기능"],
    },
    {
      name: "자료실",
      file: "catalog.html",
      img: "/cases/corporate-m/page-catalog.webp",
      desc: "회사소개서와 제품 자료를 방문자가 확인하고 내려받을 수 있는 공간으로 활용합니다.",
      items: ["회사소개서 제공", "카탈로그와 기술자료 정리", "자료 미리보기와 다운로드 연결"],
    },
    {
      name: "복리후생",
      file: "benefits.html",
      img: "/cases/corporate-m/page-benefits.webp",
      desc: "복리후생과 근무 환경을 소개해 구성원을 중시하는 기업문화와 채용 경쟁력을 보여줍니다.",
      items: ["복리후생 제도 안내", "사내 공간과 근무 환경 소개", "근무 환경과 복리후생 소개"],
    },
    {
      name: "문의",
      file: "inquiry.html",
      img: "/cases/corporate-m/page-inquiry.webp",
      desc: "방문자가 필요한 내용을 확인한 뒤 담당 부서에 편리하게 상담을 요청할 수 있습니다.",
      items: ["담당 부서와 연락처 안내", "문의 항목 맞춤 구성", "이메일·문자 알림 기능 추가 가능"],
    },
  ],
  points: [
    {
      title: "주요 사업영역을\n한눈에 보여줍니다",
      body: "여러 사업 분야를 나란히 놓고 비교합니다. 각 사업영역은 상세 소개 페이지로 이어져 기술, 설비, 적용 분야를 따로 읽을 수 있습니다.",
      items: [
        "핵심 사업영역을 한눈에 확인",
        "각 분야의 상세 페이지 연결",
        "PC·모바일에 맞춘 화면 구성",
      ],
      img: "/cases/corporate-m/point-services.webp",
      caption: "홈 · Solutions & Services",
    },
    {
      title: "미션과 비전은\n스크롤을 따라 이어집니다",
      body: "스크롤을 내리면 미션과 비전이 차례로 나옵니다. 회사 이름과 인사말만 적는 대신, 무엇을 하는 회사인지 먼저 읽히게 했습니다.",
      items: [
        "기업 비전과 핵심가치 강조",
        "몰입감 있는 스크롤 전환",
        "브랜드 메시지에 맞게 변경 가능",
      ],
      img: "/cases/corporate-m/point-vision.webp",
      caption: "홈 · Vision & Mission",
    },
    {
      title: "사업 거점은 지도로,\n성과는 숫자로",
      body: "사업 거점과 핵심 성과를 지도와 수치로 정리해 회사의 규모와 수행 역량을 빠르게 전달합니다. 실제 제작 시 기업이 보유한 지사, 실적, 업력 등의 자료로 교체합니다.",
      items: ["국내외 사업 거점 안내", "핵심 성과를 보기 쉽게 정리", "실제 기업 자료에 맞춘 내용 구성"],
      img: "/cases/corporate-m/point-reach.webp",
      caption: "홈 · Global Reach",
    },
    {
      title: "고객 후기와\n납품 사례를 나란히 놓았습니다",
      body: "고객 후기, 주요 납품 사례, 협력 경험을 함께 보여줘 처음 방문한 고객도 회사의 전문성과 수행 능력을 확인할 수 있습니다.",
      items: ["고객 후기와 평가 소개", "대표 납품·수행 사례 강조", "신뢰 자료에 맞춘 내용 변경"],
      img: "/cases/corporate-m/point-review.webp",
      caption: "홈 · Client Reviews",
    },
    {
      title: "인증 · 특허 · 면허는\n분야별로 나눠 놓았습니다",
      body: "보유한 인증, 특허, 면허를 분야별로 분류해 방문자가 필요한 자격 정보를 쉽게 찾을 수 있도록 구성했습니다.",
      items: ["인증과 특허를 분야별로 구분", "증빙 자료 이미지 적용", "신규 취득 자료 추가 가능"],
      img: "/cases/corporate-m/point-qualification.webp",
      caption: "회사소개 · 인증 및 특허",
    },
    {
      title: "복잡한 기술 정보도\n읽기 쉽게 구성합니다",
      body: "전문 용어가 많은 산업설비 분야도 핵심 설명과 현장 이미지를 순서대로 배치해 고객이 기술의 특징과 적용 범위를 이해하도록 돕습니다.",
      items: ["기술 특징과 장점 요약", "설비·공정 이미지 활용", "사업별 상세 소개 페이지 제공"],
      img: "/cases/corporate-m/point-business.webp",
      caption: "사업영역 · 데이터센터",
    },
    {
      title: "뉴스와 보도자료는\n분류와 검색으로 찾습니다",
      body: "기업 뉴스, 보도자료, 프로젝트 소식을 한곳에 모아 최신 활동을 꾸준히 알릴 수 있습니다. 주제별 분류와 검색을 통해 원하는 정보를 빠르게 찾을 수 있습니다.",
      items: ["기업 뉴스와 보도자료 제공", "주제별 소식 분류", "키워드 검색 기능"],
      img: "/cases/corporate-m/point-media.webp",
      caption: "미디어 · Media Center",
    },
    {
      title: "카탈로그와 회사소개서\n다운로드를 제공합니다",
      body: "고객이 필요한 회사소개서, 카탈로그, 기술자료를 직접 확인하고 내려받을 수 있어 자료 요청과 전달 과정을 줄일 수 있습니다.",
      items: ["회사소개서와 카탈로그 제공", "자료별 미리보기 지원", "실제 파일 다운로드 연결 가능"],
      img: "/cases/corporate-m/point-catalog.webp",
      caption: "미디어 · Downloads",
    },
    {
      title: "복리후생과 근무 환경을\n지원 전에 확인합니다",
      body: "지원자가 복리후생, 근무 환경, 사내 공간을 지원 전에 확인할 수 있게 했습니다.",
      items: ["복리후생 제도 안내", "사내 공간과 조직문화 소개", "채용 공고로 바로 이동"],
      img: "/cases/corporate-m/point-benefits.webp",
      caption: "채용 · Employee Benefits",
    },
    {
      title: "담당 부서 연락처와\n문의 화면을 함께 둡니다",
      body: "회사와 사업 내용을 충분히 확인한 방문자가 담당 부서에 바로 상담을 요청할 수 있도록 연락처와 문의 화면을 명확하게 제공합니다.",
      items: ["담당 부서와 연락처 안내", "업무에 맞춘 문의 항목 구성", "이메일·문자 알림 기능 추가 가능"],
      img: "/cases/corporate-m/page-inquiry.webp",
      caption: "고객지원 · 상담 문의",
    },
  ],
  detailsLabel: "SCOPE",
  detailsTitle: "제작 범위 및 지원 항목",
  details: [
    {
      title: "회사소개부터 문의까지 총 26페이지 구성",
      body: "기업 소개, 사업영역, 인증·특허, 미디어, 채용, 자료실, 문의에 필요한 전체 화면을 제공합니다.",
    },
    {
      title: "PC·태블릿·모바일 반응형 제작",
      body: "접속하는 기기의 화면 크기에 맞춰 메뉴, 이미지, 본문이 편리하게 보이도록 구성합니다.",
    },
    {
      title: "브랜드 색상·메뉴·콘텐츠 맞춤 적용",
      body: "회사명과 색상부터 메뉴, 문구, 사진, 사업 내용까지 기업의 브랜드와 자료에 맞게 변경합니다.",
    },
    {
      title: "사업영역·인증·자료실·채용 페이지 제공",
      body: "기업의 기술력, 신뢰 자료, 고객용 자료, 채용 정보를 목적에 맞게 나누어 전달합니다.",
    },
    {
      title: "문의 접수와 관리자 기능 추가 가능",
      body: "문의 알림, 소식 등록, 자료 관리 등 운영에 필요한 기능은 상담을 통해 범위를 정한 뒤 연결할 수 있습니다.",
    },
    {
      title: "도메인·호스팅·유지보수 지원",
      body: "홈페이지 공개에 필요한 도메인과 호스팅을 지원하고, 운영 중 필요한 유지보수 범위도 함께 안내합니다.",
    },
  ],
  mobile: {
    title: "PC·태블릿·모바일에 맞춰 편리하게 보입니다",
    body: "작은 화면에서도 사업 내용과 자료를 쉽게 읽고 원하는 메뉴로 이동할 수 있도록 구성합니다. 상담 문의까지 이어져 이동 중인 고객도 편리하게 이용할 수 있습니다.",
    shots: [
      { img: "/cases/corporate-m/m-index.webp", caption: "홈" },
      { img: "/cases/corporate-m/m-business.webp", caption: "데이터센터" },
      { img: "/cases/corporate-m/m-catalog.webp", caption: "자료실" },
      { img: "/cases/corporate-m/m-benefits.webp", caption: "복리후생" },
    ],
  },
  faq: [
    {
      q: "우리 회사 메뉴와 내용에 맞게 변경할 수 있나요?",
      a: "네. 회사명, 브랜드 색상, 메뉴, 문구, 사진, 사업영역을 실제 기업 자료와 원하는 구성에 맞춰 변경합니다.",
    },
    {
      q: "사진과 문구도 함께 제작해 주나요?",
      a: "보유한 회사 자료와 현장 사진을 우선 활용하며, 필요한 경우 업종과 브랜드 방향에 맞춘 이미지와 문구를 새로 구성합니다.",
    },
    {
      q: "관리자가 소식과 자료를 직접 등록할 수 있나요?",
      a: "가능합니다. 뉴스, 자료실, 채용 공고처럼 자주 바뀌는 내용을 직접 관리할 수 있도록 관리자 기능을 추가할 수 있으며 세부 범위는 상담 후 정합니다.",
    },
    {
      q: "문의 내용을 이메일이나 문자로 받을 수 있나요?",
      a: "문의 접수 기능을 연결하면 담당자 이메일이나 문자로 알림을 받을 수 있습니다. 알림 방식과 수신 담당자는 업무 흐름에 맞춰 설정합니다.",
    },
    {
      q: "제작 기간과 비용은 어떻게 정해지나요?",
      a: "이 프리미엄 디자인은 부가세 별도 300만 원부터이며, 도메인 1개와 호스팅 1년이 포함됩니다. 정확한 기간과 비용은 페이지 구성, 관리자 기능, 제공 자료를 확인한 뒤 안내합니다.",
    },
    {
      q: "도메인·호스팅·유지보수도 지원하나요?",
      a: "네. 홈페이지 공개에 필요한 도메인과 호스팅을 지원하며, 공개 후 유지보수 범위와 운영 방법도 함께 안내합니다.",
    },
  ],
};

export default study;
