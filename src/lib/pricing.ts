export type ProductType = {
  name: string;
  desc: string;
};

export const PRODUCT_TYPES: ProductType[] = [
  { name: "원페이지 홈페이지", desc: "메뉴, 소개, 연락처를 한 화면에 담는 가장 가벼운 구성입니다." },
  { name: "소상공인 홈페이지", desc: "메뉴/서비스, 소개, 오시는 길 등 여러 페이지로 구성된 매장·서비스용 홈페이지입니다." },
  { name: "기업 홈페이지", desc: "사업 영역, 회사 소개, 문의 등을 갖춘 회사 소개용 홈페이지입니다." },
  { name: "기존 홈페이지 리뉴얼", desc: "운영 중인 홈페이지의 디자인과 구조를 다시 정리해 드립니다." },
];

export type PriceItem = {
  name: string;
  price: string;
  desc?: string;
};

export const PRICING: PriceItem[] = [
  { name: "원페이지 홈페이지", price: "30만 원부터" },
  { name: "소상공인 홈페이지", price: "35만 원부터" },
  { name: "기업 홈페이지", price: "65만 원부터" },
];

export const ADDONS: PriceItem[] = [
  { name: "문의 · 예약 폼 추가", price: "10만 원" },
  { name: "다국어 추가", price: "20만 원" },
];

export const PRICING_NOTE =
  "최종 금액은 페이지 수, 필요한 기능, 디자인 난이도에 따라 상담 후 조정됩니다.";

export const PROCESS_STEPS = [
  { step: "01", title: "상담", desc: "필요한 페이지 구성과 예산, 일정을 확인합니다." },
  { step: "02", title: "자료 전달", desc: "로고, 사진, 소개 문구 등 보유하신 자료를 전달받습니다." },
  { step: "03", title: "구성안 제작", desc: "페이지 구성과 정보 배치를 담은 구성안을 먼저 안내드립니다." },
  { step: "04", title: "디자인 / 개발", desc: "구성안을 기반으로 실제 홈페이지를 디자인하고 개발합니다." },
  { step: "05", title: "확인 및 수정", desc: "시안을 확인하시고 필요한 부분을 수정합니다." },
  { step: "06", title: "배포 / 인계", desc: "실제 도메인에 배포하고 관리 방법을 안내해 드립니다." },
];

export const BENEFITS = [
  "모바일 반응형",
  "카카오톡 / 전화 / 지도 연결",
  "Netlify 배포",
  "기본 SEO 세팅",
  "유지보수 가능",
];
