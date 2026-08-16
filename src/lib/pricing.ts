import serviceOnepageImg from "@/assets/images/service_onepage.jpg";
import serviceSmallbizImg from "@/assets/images/service_smallbiz.jpg";
import serviceCorporateImg from "@/assets/images/service_corporate.jpg";
import serviceShoppingMallImg from "@/assets/images/mujin_thumbnail.jpg";
import servicePortfolioImg from "@/assets/images/service_portfolio.jpg";
import serviceRenewalImg from "@/assets/images/service_renewal.jpg";

export type ProductType = {
  num: string;
  name: string;
  filterValue: string;
  desc: string;
  bullets: string[];
  price: string;
  image?: string;
};

export const PRODUCT_TYPES: ProductType[] = [
  {
    num: "01",
    name: "원페이지 홈페이지",
    filterValue: "one-page",
    desc: "핵심 내용을 한 페이지에 집중해서 전달하는 간결한 홈페이지",
    bullets: ["서비스 소개", "이벤트 페이지", "광고용 랜딩페이지"],
    price: "40만 원부터",
    image: serviceOnepageImg,
  },
  {
    num: "02",
    name: "소상공인 홈페이지",
    filterValue: "small-business",
    desc: "매장과 서비스를 소개하고 고객 문의로 연결하는 홈페이지",
    bullets: ["매장 소개", "서비스 안내", "지도 / 전화 / 카카오톡 연결"],
    price: "50만 원부터",
    image: serviceSmallbizImg,
  },
  {
    num: "03",
    name: "기업 홈페이지",
    filterValue: "business",
    desc: "회사 정보와 사업 내용을 신뢰감 있게 전달하는 기업용 홈페이지",
    bullets: ["회사 소개", "사업 영역", "주요 실적", "문의 / 상담"],
    price: "100만 원부터",
    image: serviceCorporateImg,
  },
  {
    num: "04",
    name: "쇼핑몰 홈페이지",
    filterValue: "shopping-mall",
    desc: "상품을 직접 등록하고 판매할 수 있는 쇼핑몰형 홈페이지",
    bullets: ["상품 목록 / 상세 페이지", "장바구니 · 주문 연동", "결제 시스템 연동", "회원 관리"],
    price: "200만 원부터",
    image: serviceShoppingMallImg,
  },
  {
    num: "05",
    name: "포트폴리오 홈페이지",
    filterValue: "portfolio",
    desc: "작업물과 전문성을 효과적으로 보여주는 포트폴리오 중심 홈페이지",
    bullets: ["작가 / 강사", "디자인 스튜디오", "인테리어", "개인 브랜드"],
    price: "협의",
    image: servicePortfolioImg,
  },
  {
    num: "06",
    name: "기존 홈페이지 리뉴얼",
    filterValue: "renewal",
    desc: "오래된 홈페이지의 디자인과 사용성을 현재 기준에 맞게 개선",
    bullets: ["디자인 개선", "모바일 최적화", "구조 재정리", "기존 자료 활용"],
    price: "협의",
    image: serviceRenewalImg,
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
    price: "40만 원부터",
    features: ["단일 페이지", "서비스 소개", "전화 / 카카오톡 연결", "모바일 반응형", "기본 SEO"],
  },
  {
    name: "소상공인 홈페이지",
    price: "50만 원부터",
    features: ["약 5페이지 구성", "매장 / 서비스 소개", "지도 연결", "문의 버튼", "모바일 반응형"],
    recommended: true,
  },
  {
    name: "기업 홈페이지",
    price: "100만 원부터",
    features: ["회사 소개", "사업 영역", "포트폴리오", "문의 폼", "기본 SEO"],
  },
  {
    name: "쇼핑몰 홈페이지",
    price: "200만 원부터",
    features: ["상품 등록 / 관리", "장바구니 · 결제 연동", "회원 관리", "모바일 반응형"],
  },
];

export const ADDONS: PriceItem[] = [
  { name: "문의 / 예약 폼", price: "5만 원", features: [] },
  { name: "관리자 기능 / 공지사항 관리", price: "10만 원", features: [] },
  { name: "네이버 카카오 지도연동", price: "5만 원", features: [] },
  { name: "추가 페이지", price: "페이지당 5만 원", features: [] },
];

export const PRICING_NOTE =
  "최종 견적은 페이지 수, 디자인 난이도, 기능 범위, 자료 정리 정도에 따라 달라질 수 있습니다.";

export const STATS = [
  { value: "40만 원부터", label: "원페이지 제작" },
  { value: "50만 원부터", label: "소상공인 홈페이지" },
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
