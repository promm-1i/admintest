/**
 * 홈페이지 템플릿 요금제 구조.
 *
 * 모든 패키지에 공통으로 들어가는 필수 비용(호스팅 1년 24만 + 셋팅 10만 + 업종 전용 기능 30만 = 64만)에
 * 패키지별 디자인 비용만 더해 최종 시작가가 결정된다. 모든 금액은 VAT 별도.
 */

const MAN = 10_000;

/** 패키지와 무관하게 공통으로 들어가는 필수 항목 */
export const BASE_COST = {
  hosting: 24 * MAN,
  setup: 10 * MAN,
  industryFeature: 30 * MAN,
};

const BASE_TOTAL = BASE_COST.hosting + BASE_COST.setup + BASE_COST.industryFeature; // 64만

export type TemplatePackage = {
  key: string;
  label: string;
  /** 패키지별 디자인 비용 (기본형은 무료) */
  designCost: number;
  /** 공통 필수 비용 + 디자인 비용 */
  total: number;
  badge?: string;
  badgeTone?: "value" | "recommended";
  desc: string;
};

export const TEMPLATE_PACKAGES: TemplatePackage[] = [
  {
    key: "basic",
    label: "기본형",
    designCost: 0,
    total: BASE_TOTAL,
    desc: "필요한 정보를 정직하게 전달하는 정적 구성",
  },
  {
    key: "basic-responsive",
    label: "기본+반응형",
    designCost: 30 * MAN,
    total: BASE_TOTAL + 30 * MAN,
    badge: "가성비 패키지",
    badgeTone: "value",
    desc: "기본형에 PC·태블릿·모바일 반응형까지",
  },
  {
    key: "landing",
    label: "랜딩형",
    designCost: 20 * MAN,
    total: BASE_TOTAL + 20 * MAN,
    desc: "스크롤 연출과 인터랙션이 들어간 전환 중심 구성",
  },
  {
    key: "landing-responsive",
    label: "랜딩+반응형",
    designCost: 50 * MAN,
    total: BASE_TOTAL + 50 * MAN,
    badge: "추천 패키지",
    badgeTone: "recommended",
    desc: "랜딩형 연출에 전 디바이스 반응형까지",
  },
];

/** 만원 단위로 읽기 좋게 (640000 → "64만원") */
export function formatMan(won: number): string {
  return `${(won / MAN).toLocaleString("ko-KR")}만원`;
}

export type PricingRow = {
  label: string;
  /** 필수 항목이면 라벨 옆에 "필수" 뱃지 */
  required?: boolean;
  note?: string;
  /** TEMPLATE_PACKAGES와 같은 순서 */
  values: [string, string, string, string];
};

export const PRICING_ROWS: PricingRow[] = [
  {
    label: "도메인 1개",
    note: "한글·영문 / com · co.kr · kr 선택 가능",
    values: ["무료", "무료", "무료", "무료"],
  },
  {
    label: "디자인 비용",
    required: true,
    values: ["무료", "30만원", "20만원", "50만원"],
  },
  {
    label: "업종 전용 기능",
    note: "매물·차량 관리 등 업종별 전용 기능",
    values: ["30만원", "30만원", "30만원", "30만원"],
  },
  {
    label: "관리자 모드 제공",
    note: "공지·문의·콘텐츠를 직접 등록·수정",
    values: ["무료", "무료", "무료", "무료"],
  },
  { label: "모바일 웹", values: ["무료", "무료", "무료", "무료"] },
  { label: "DB · 파일", values: ["무제한", "무제한", "무제한", "무제한"] },
  {
    label: "실시간 문자 기능",
    note: "무료 설치 · 발송 건당 16원 별도",
    values: ["0원", "0원", "0원", "0원"],
  },
  { label: "셋팅비용", required: true, values: ["10만원", "10만원", "10만원", "10만원"] },
  {
    label: "호스팅 1년",
    required: true,
    note: "2년 연속 10% · 3년 연속 20% 할인",
    values: ["24만원", "24만원", "24만원", "24만원"],
  },
];

/** 월 이용료 없이 한 번에 구매하는 옵션 */
export const LUMP_SUM = [
  { label: "기본형 일시불", price: 100 * MAN },
  { label: "랜딩형 일시불", price: 150 * MAN },
];

export const PRODUCTION_PERIOD = "영업일 7일 ~";
