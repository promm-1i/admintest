import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "NATURIVE LAB",
  headline: "천연물 화장품 원료기업 홈페이지",
  summary:
    "원료 사진과 연구 데이터, 제품 검색과 샘플 문의를 한 곳에 모은 B2B 화장품 원료기업용 프리미엄 기업 홈페이지입니다.",
  brandColor: "rgb(205, 73, 33)",
  tintColor: "rgb(246, 235, 228)",
  overview:
    "NATURIVE LAB 디자인은 전 세계 식물 원료를 발굴하고 효능을 연구하는 화장품 원료기업을 가정해 구성했습니다. 자연을 담은 히어로에서 글로벌 원료 스토리, 연구기술, 주요 수치, 제품과 뷰티필름으로 이어져 감성과 과학적 신뢰를 함께 보여 줍니다.\n\n제품은 효능과 원료 유형으로 찾아볼 수 있고 상세 화면에서 특징, 데이터와 적용 제형을 확인한 뒤 샘플 문의로 이어집니다. 회사소개, ESG, 글로벌 네트워크, 연구·효능평가·특허·인증, 콘텐츠랩, 뉴스·전시회·채용·회원·문의까지 23개 화면을 갖췄습니다.\n\n회사명, 제품명, 효능 데이터, 특허, 국가와 화면 이미지는 디자인 예시이며 실제 기업의 검증 자료와 표시 기준에 맞춰 변경합니다.",
  meta: [
    { label: "적합 업종", value: "화장품 원료 · 천연물 소재 · 바이오 · 기능성 원료 연구기업" },
    { label: "주요 구성", value: "회사소개 · 원료 검색·상세 · 연구·효능·특허·인증 · 콘텐츠 · 채용 · 문의" },
    { label: "맞춤 적용", value: "제품 분류 · 효능 데이터 · 연구자료 · 글로벌 거점 · 샘플 문의 변경 가능" },
  ],
  mainShot: "/cases/corporate-o/main.webp",
  capabilities: {
    label: "23-PAGE INGREDIENT BUSINESS",
    title: "원료 검색부터 연구 근거와 샘플 문의까지 23개 화면으로 완성했습니다",
    body: "브랜드 이미지에 머무르지 않고 B2B 고객이 원료를 찾고 효능 자료를 검토한 뒤 전시·뉴스·문의까지 이어지는 실제 영업 흐름을 보여 줍니다.",
    stats: [
      { value: "23", label: "실제 구축 화면", note: "제품·연구·콘텐츠·회원 포함" },
      { value: "2", label: "제품 검색 기준", note: "효능과 원료 유형" },
      { value: "4", label: "연구 검증 영역", note: "기술·효능·특허·인증" },
      { value: "4", label: "콘텐츠 유형", note: "필름·인사이트·허브북·뉴스레터" },
    ],
    groups: [
      { label: "원료 검색", title: "효능과 원료 유형을 고르면 필요한 제품만 바로 확인합니다", body: "다양한 원료를 영업 목록처럼 나열하지 않고 방문자의 개발 목적에 맞는 조건으로 좁혀 탐색하게 합니다.", items: ["효능·원료 유형 필터", "제품 태그와 핵심 특징", "검색 결과에서 상세 연결"], img: "/cases/corporate-o/page-products.webp", caption: "제품 · 효능별 원료 검색", file: "products.html" },
      { label: "원료 상세", title: "특징·효능 데이터·적용 제형을 검토하고 샘플을 요청합니다", body: "상세 화면은 연구 기반 정보와 실제 적용 가능성을 함께 제공하고 선택한 원료가 포함된 문의 동선으로 연결됩니다.", items: ["원료 특징과 핵심 효능", "평가 데이터와 적용 제형", "선택 제품 샘플 문의"], img: "/cases/corporate-o/page-product-detail.webp", caption: "제품 · 상세와 샘플 문의", file: "product-detail.html" },
      { label: "연구기술", title: "원료 발굴부터 추출·분석·제품화까지 연구 과정을 공개합니다", body: "기술 설명과 보유 장비, 연구 프로세스를 단계별로 나눠 감성적인 원료 스토리를 검증 가능한 기술 역량으로 전환합니다.", items: ["R&D 프로세스", "보유 기술과 연구 장비", "특허·인증 자료 연결"], img: "/cases/corporate-o/page-technology.webp", caption: "R&D · 연구기술", file: "technology.html" },
      { label: "효능·검증", title: "평가 분야와 시험 절차, 특허와 인증을 독립 화면으로 제공합니다", body: "고객사가 필요로 하는 효능 근거와 시험 방식, 지식재산·인증 자료를 네 개의 검증 영역으로 구성했습니다.", items: ["효능평가 분야와 지표", "시험 절차와 결과 자료", "특허·인증 아카이브"], img: "/cases/corporate-o/page-efficacy.webp", caption: "R&D · 효능평가", file: "efficacy.html" },
      { label: "콘텐츠랩", title: "뷰티필름과 인사이트를 전문 콘텐츠 허브로 운영합니다", body: "제품 카탈로그와 다른 영상·칼럼·허브북·뉴스레터 영역으로 기술 트렌드와 브랜드 관점을 지속적으로 발행합니다.", items: ["뷰티필름 영상 콘텐츠", "인사이트·허브북", "뉴스레터 구독 동선"], img: "/cases/corporate-o/point-film.webp", caption: "콘텐츠랩 · 뷰티필름", file: "beauty.html" },
      { label: "글로벌·문의", title: "글로벌 거점과 전시·채용·원료 문의를 방문 목적별로 연결합니다", body: "권역별 파트너와 원료 산지를 확인하고 전시 소식, 채용, 회원과 원료 문의 화면으로 이동할 수 있습니다.", items: ["글로벌 지도와 권역별 거점", "전시회·뉴스·채용", "회원가입·원료 문의"], img: "/cases/corporate-o/page-global.webp", caption: "기업 · 글로벌 네트워크", file: "global.html" },
    ],
  },
  pagesLabel: "PREVIEW",
  pagesTitle: "주요 화면 미리보기",
  pages: [
    { name: "홈", file: "index.html", img: "/cases/corporate-o/page-index.webp", desc: "자연 원료 스토리부터 연구기술, 제품, 콘텐츠와 문의까지 브랜드의 핵심을 한 흐름으로 전달합니다.", items: ["4장 히어로", "글로벌 원료 스토리", "연구·특허·수출 핵심 수치", "제품 · 뷰티필름 · 전시 · 문의"] },
    { name: "회사소개", file: "company.html", img: "/cases/corporate-o/page-company.webp", desc: "기업의 시작과 방향, 주요 역량과 연구 철학을 이미지 중심으로 소개합니다.", items: ["기업 소개와 비전", "핵심 역량", "CEO·ESG·글로벌 메뉴 연결"] },
    { name: "원료 검색", file: "products.html", img: "/cases/corporate-o/page-products.webp", desc: "효능과 원료 유형으로 제품을 걸러 필요한 소재를 빠르게 찾게 합니다.", items: ["효능 카테고리 필터", "제품 카드와 핵심 태그", "검색 결과와 상세 연결"] },
    { name: "원료 상세", file: "product-detail.html", img: "/cases/corporate-o/page-product-detail.webp", desc: "원료 특징, 효능 데이터와 적용 정보를 확인하고 샘플 문의로 이동합니다.", items: ["원료 소개와 핵심 효능", "연구 데이터와 적용 제형", "샘플 문의 버튼"] },
    { name: "연구기술", file: "technology.html", img: "/cases/corporate-o/page-technology.webp", desc: "원료 발굴부터 추출, 분석과 제품화까지 연구 과정을 단계별로 설명합니다.", items: ["R&D 프로세스", "보유 기술과 장비", "특허·인증 화면 연결"] },
    { name: "효능평가", file: "efficacy.html", img: "/cases/corporate-o/page-efficacy.webp", desc: "평가 분야와 시험 절차를 도식과 사례 중심으로 안내합니다.", items: ["평가 분야 분류", "시험 과정과 지표", "연구 결과 자료 연결"] },
    { name: "글로벌 네트워크", file: "global.html", img: "/cases/corporate-o/page-global.webp", desc: "원료 산지와 해외 파트너, 연구·유통 거점을 지도와 목록으로 보여 줍니다.", items: ["글로벌 지도", "권역별 거점", "원료 산지와 파트너 정보"] },
    { name: "채용", file: "jobs.html", img: "/cases/corporate-o/page-jobs.webp", desc: "인재상과 직무, 지원 절차와 채용 공고를 한 화면에서 확인하게 합니다.", items: ["인재상과 조직문화", "직무·복리후생", "채용 공고와 지원 연결"] },
  ],
  points: [
    { title: "산지와 발굴 과정은\n큰 사진과 짧은 문장으로", body: "식물 산지와 원료 발굴 과정을 큰 사진과 짧은 문장으로 놓아, 제품 목록보다 먼저 읽히게 했습니다.", items: ["글로벌 원료 스토리", "원료 산지 이미지", "회사소개 · 네트워크 연결"], img: "/cases/corporate-o/point-story.webp", caption: "홈 · 원료 스토리" },
    { title: "자연 사진 다음에\n어두운 연구 장면이 옵니다", body: "자연 사진 뒤에 어두운 기술 장면을 붙여 화면 성격을 바꾸고, 상세 연구 화면으로 이어지게 했습니다.", items: ["R&D 핵심 메시지", "기술 이미지와 영상", "연구·효능·특허 연결"], img: "/cases/corporate-o/point-technology.webp", caption: "홈 · 연구기술" },
    { title: "제품을 효능별로\n빠르게 탐색합니다", body: "대표 원료는 효능 카테고리를 눌러 바로 바뀌고, 제품명과 핵심 특징을 확인한 뒤 전체 원료 검색이나 상세 화면으로 이동합니다.", items: ["효능 카테고리", "가로 제품 카드", "검색·상세·샘플 문의 연결"], img: "/cases/corporate-o/point-products.webp", caption: "홈 · 대표 원료" },
    { title: "기술 콘텐츠를\n영상형 카드로 소개합니다", body: "뷰티필름과 인사이트 콘텐츠를 제품 정보와 다른 큰 영상형 카드로 구성해 연구기업의 전문 콘텐츠를 꾸준히 전달할 수 있습니다.", items: ["뷰티필름 대표 콘텐츠", "영상·인사이트 연결", "콘텐츠랩 확장 가능"], img: "/cases/corporate-o/point-film.webp", caption: "홈 · 뷰티필름" },
    { title: "거점 정보와 원료 문의를\n한 구간에서 연결합니다", body: "국내외 회사 위치와 연락처를 확인한 뒤 필요한 원료와 수량을 문의할 수 있도록 마지막 행동 동선을 단순하게 정리합니다.", items: ["국내외 거점 정보", "연락처와 지도", "원료·샘플 문의 연결"], img: "/cases/corporate-o/point-contact.webp", caption: "홈 · 위치와 문의" },
  ],
  details: [
    { title: "제품 검색·분류 구조", body: "실제 제품군과 효능 체계에 맞춰 검색 조건, 태그와 상세 정보 항목을 설계합니다." },
    { title: "연구자료·특허·인증", body: "검증된 연구 데이터와 특허, 인증서를 분야별로 정리해 기술 신뢰를 전달합니다." },
    { title: "샘플·원료 문의 접수", body: "제품 상세에서 샘플 수량과 문의 내용을 받아 담당자에게 전달하도록 연결할 수 있습니다." },
    { title: "뉴스·전시·콘텐츠 관리", body: "관리자가 뉴스, 전시 일정과 인사이트 콘텐츠를 직접 등록하는 기능을 추가할 수 있습니다." },
    { title: "PC·태블릿·모바일 반응형", body: "가로 제품 카드와 데이터 화면도 작은 화면에 맞는 순서와 크기로 다시 배치됩니다." },
    { title: "다국어·글로벌 확장", body: "해외 고객 비중에 맞춰 영문 페이지와 국가별 문의 동선을 추가할 수 있습니다." },
  ],
  mobile: {
    title: "휴대폰에서도 원료 검색과 문의가 편리합니다",
    body: "제품 카드와 연구 정보는 한 줄씩 읽기 좋게 바뀌고, 상세 화면에서 효능을 확인한 뒤 바로 샘플 문의로 이동합니다.",
    shots: [
      { img: "/cases/corporate-o/m-index.webp", caption: "메인" },
      { img: "/cases/corporate-o/m-products.webp", caption: "원료 검색" },
      { img: "/cases/corporate-o/m-product-detail.webp", caption: "원료 상세" },
      { img: "/cases/corporate-o/m-technology.webp", caption: "연구기술" },
    ],
  },
  faq: [
    { q: "제품 분류와 효능 검색 조건을 바꿀 수 있나요?", a: "네. 실제 제품 데이터와 영업 방식에 맞춰 제품군, 효능, 원산지와 적용 제형 등 검색 조건을 다시 구성합니다." },
    { q: "제품 상세에서 샘플 문의를 받을 수 있나요?", a: "제품명과 요청 수량이 자동으로 포함되는 문의 폼을 만들고 이메일이나 문자로 담당자에게 전달할 수 있습니다." },
    { q: "특허와 연구자료를 직접 추가할 수 있나요?", a: "관리자 기능을 추가하면 특허, 인증, 뉴스와 기술자료를 직접 등록하고 수정할 수 있습니다." },
    { q: "영문 홈페이지도 제작할 수 있나요?", a: "해외 고객용 영문 사이트를 같은 구조로 제작하거나 제품·연구·문의 같은 핵심 화면만 우선 제공할 수 있습니다." },
    { q: "제작 기간과 비용은 어떻게 정해지나요?", a: "프리미엄 디자인은 부가세 별도 300만 원부터이며 제품 데이터 수, 다국어와 관리 기능 범위를 확인한 뒤 정확히 안내합니다." },
    { q: "도메인·호스팅·유지보수도 지원하나요?", a: "도메인과 호스팅 연결을 지원하고 제품과 콘텐츠 업데이트를 위한 유지보수 방식도 안내합니다." },
  ],
};

export default study;
