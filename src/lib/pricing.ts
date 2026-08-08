export type ProductType = {
  name: string;
  desc: string;
  bullets: string[];
  price: string;
  image?: string;
};

export const PRODUCT_TYPES: ProductType[] = [
  {
    name: "원페이지 홈페이지",
    desc: "간단한 서비스 소개, 이벤트 페이지, 광고용 랜딩페이지에 적합합니다.",
    bullets: ["간단한 서비스 소개", "이벤트 페이지", "광고용 랜딩페이지"],
    price: "30만 원부터",
    image: "/images/service-onepage.webp",
  },
  {
    name: "소상공인 홈페이지",
    desc: "매장 소개와 서비스 안내, 연락 수단을 한 화면에 정리합니다.",
    bullets: ["매장 소개", "서비스 안내", "지도 / 전화 / 카카오톡 연결"],
    price: "35만 원부터",
    image: "/images/service-smallbiz.webp",
  },
  {
    name: "기업 홈페이지",
    desc: "회사 소개와 사업 영역, 실적을 정리해 신뢰를 전달합니다.",
    bullets: ["회사 소개", "사업 영역", "주요 실적", "문의 접수"],
    price: "65만 원부터",
    image: "/images/service-corporate.webp",
  },
  {
    name: "포트폴리오 홈페이지",
    desc: "작가, 강사, 프리랜서 등 작업물을 보여주는 데 적합합니다.",
    bullets: ["작가 / 강사 / 프리랜서", "작업물 소개"],
    price: "구성에 따라 협의",
    image: "/images/service-portfolio.webp",
  },
  {
    name: "기존 홈페이지 리뉴얼",
    desc: "낡은 디자인을 개선하고 기존 자료를 기반으로 다시 정리합니다.",
    bullets: ["낡은 디자인 개선", "모바일 최적화", "문구 재정리"],
    price: "기존 자료 기반 협의",
    image: "/images/service-renewal.webp",
  },
];

export type PriceItem = {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
};

export const PRICING: PriceItem[] = [
  {
    name: "원페이지 홈페이지",
    price: "30만 원부터",
    features: ["단일 페이지", "서비스 소개", "전화 / 카카오톡 연결", "모바일 반응형", "기본 SEO"],
  },
  {
    name: "소상공인 홈페이지",
    price: "35만 원부터",
    features: ["약 5페이지 구성", "매장 / 서비스 소개", "지도 연결", "문의 버튼", "모바일 반응형"],
    recommended: true,
  },
  {
    name: "기업 홈페이지",
    price: "65만 원부터",
    features: ["회사 소개", "사업 영역", "포트폴리오", "문의 폼", "기본 SEO"],
  },
];

export const ADDONS: PriceItem[] = [
  { name: "문의 / 예약 폼", price: "협의", features: [] },
  { name: "다국어 페이지", price: "협의", features: [] },
  { name: "관리자 기능 / 공지사항 관리", price: "협의", features: [] },
  { name: "추가 페이지", price: "협의", features: [] },
  { name: "기존 홈페이지 리뉴얼", price: "협의", features: [] },
];

export const PRICING_NOTE =
  "최종 견적은 페이지 수, 디자인 난이도, 기능 범위, 자료 정리 정도에 따라 달라질 수 있습니다.";

export const PROCESS_STEPS = [
  { step: "01", title: "상담 접수", desc: "업종, 제작 목적, 필요한 페이지, 참고 사이트, 원하는 분위기를 확인합니다." },
  { step: "02", title: "자료 전달", desc: "로고, 사진, 소개 문구 등 보유하신 자료를 전달받습니다." },
  { step: "03", title: "구성안 정리", desc: "메인 문구, 섹션 순서, 페이지 구조, 필요한 기능을 먼저 정리합니다." },
  { step: "04", title: "디자인 제작", desc: "구성안을 기반으로 반응형 홈페이지를 디자인하고 개발합니다." },
  { step: "05", title: "검수 및 수정", desc: "시안을 확인하시고 필요한 부분을 수정합니다." },
  { step: "06", title: "배포 및 유지보수", desc: "도메인 연결과 배포를 안내하고, 이후 수정 요청도 대응해 드립니다." },
];

export const STATS = [
  { value: "30만 원부터", label: "원페이지 제작" },
  { value: "35만 원부터", label: "소상공인 홈페이지" },
  { value: "5~10영업일", label: "기본 제작 기간" },
];

export const BENEFITS = [
  "모바일 반응형",
  "카카오톡 / 전화 / 지도 연결",
  "Netlify 배포",
  "기본 SEO 세팅",
  "유지보수 가능",
];

export const PROBLEM_POINTS = [
  {
    title: "첫인상",
    desc: "고객은 문의 전에 먼저 검색합니다. 정돈된 홈페이지는 첫인상을 바꿉니다.",
  },
  {
    title: "상담 전환",
    desc: "전화, 카카오톡, 문의폼을 한 화면에서 쉽게 연결합니다.",
  },
  {
    title: "관리 부담 감소",
    desc: "필요한 내용만 정리한 구조로 제작해 운영 부담을 줄입니다.",
  },
];

export const ADMIN_FEATURE_POINTS = [
  "공지사항 등록",
  "문의내역 확인",
  "노출 / 비노출 관리",
  "관리자 로그인",
];
