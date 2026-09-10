/**
 * 홈페이지 템플릿 요금제 구조.
 *
 * 모든 패키지에 공통으로 들어가는 필수 비용(호스팅 1년 24만 + 셋팅 10만 + 업종 전용 기능 30만 = 64만)에
 * 패키지별 디자인 비용과 서브페이지 제작비를 더해 최종 시작가가 결정된다. 모든 금액은 VAT 별도.
 *
 * 2026-09-10, 구분 축을 "반응형 유무"에서 "페이지 수"로 바꿨다. 템플릿 154종을 실측한 결과
 * 기본형 템플릿도 미디어쿼리와 viewport가 이미 다 들어 있어(moto-a-basic은 랜딩형과 @media 수가
 * 동일) 반응형을 별도로 받을 근거가 없었다. 반응형은 전 등급 기본 제공으로 올리고, 30만원은
 * 서브페이지 분리 제작에 붙인다. 배열 순서는 가격 오름차순이다 — 예전에는 "기본+반응형 94만"이
 * "랜딩형 84만"보다 비싸 어느 쪽이 상위인지 읽히지 않았다.
 */

const MAN = 10_000;

/** 패키지와 무관하게 공통으로 들어가는 필수 항목 */
export const BASE_COST = {
  hosting: 24 * MAN,
  setup: 10 * MAN,
  industryFeature: 30 * MAN,
};

const BASE_TOTAL = BASE_COST.hosting + BASE_COST.setup + BASE_COST.industryFeature; // 64만

/** 랜딩형 연출(스크롤 등장 · 인터랙션) 추가 비용 */
const LANDING_COST = 20 * MAN;
/** 소개 · 서비스 · 사례 · 문의 등을 별도 페이지로 분리 제작하는 비용 */
const SUBPAGE_COST = 30 * MAN;

export type TemplatePackage = {
  key: string;
  label: string;
  /** 랜딩형 연출 비용 (기본형은 무료) */
  designCost: number;
  /** 서브페이지 분리 제작 비용 (원페이지는 0) */
  subpageCost: number;
  /** 공통 필수 비용 + 연출 비용 + 서브페이지 비용 */
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
    subpageCost: 0,
    total: BASE_TOTAL,
    badge: "가성비 패키지",
    badgeTone: "value",
    desc: "필요한 정보를 한 페이지에 정직하게 담는 구성",
  },
  {
    key: "landing",
    label: "랜딩형",
    designCost: LANDING_COST,
    subpageCost: 0,
    total: BASE_TOTAL + LANDING_COST,
    badge: "추천 패키지",
    badgeTone: "recommended",
    desc: "스크롤 연출과 인터랙션을 더한 한 페이지 구성",
  },
  {
    key: "basic-sub",
    label: "기본형 + 서브페이지",
    designCost: 0,
    subpageCost: SUBPAGE_COST,
    total: BASE_TOTAL + SUBPAGE_COST,
    desc: "메뉴별로 페이지를 나눠 내용을 넉넉하게",
  },
  {
    key: "landing-sub",
    label: "랜딩형 + 서브페이지",
    designCost: LANDING_COST,
    subpageCost: SUBPAGE_COST,
    total: BASE_TOTAL + LANDING_COST + SUBPAGE_COST,
    desc: "랜딩형 연출에 메뉴별 서브페이지까지",
  },
];

/** 만원 단위로 읽기 좋게 (640000 → "64만원") */
export function formatMan(won: number): string {
  return `${(won / MAN).toLocaleString("ko-KR")}만원`;
}

/**
 * 호스팅 장기 계약 할인. 연 24만원을 기준으로 계약 연수만큼 곱한 뒤 할인율을 적용한 총액이다.
 * (사용자가 정한 구간은 1~3년까지라 그 이상은 표기하지 않는다.)
 */
export const HOSTING_DISCOUNTS = [
  { years: 1, rate: 0 },
  { years: 2, rate: 0.1 },
  { years: 3, rate: 0.2 },
].map(({ years, rate }) => ({
  years,
  rate,
  total: Math.round(BASE_COST.hosting * years * (1 - rate)),
}));

export type PricingRow = {
  label: string;
  /** 필수 항목이면 라벨 옆에 "필수" 뱃지 */
  required?: boolean;
  note?: string;
  /** ⓘ 아이콘에 마우스를 올렸을 때 뜨는 툴팁 (줄 단위) */
  info?: string[];
  /** 표 아래쪽 행은 툴팁이 표 밖으로 잘리지 않도록 위로 연다 */
  infoSide?: "top" | "bottom";
  /** TEMPLATE_PACKAGES와 같은 순서 */
  values: [string, string, string, string];
};

export const PRICING_ROWS: PricingRow[] = [
  {
    label: "도메인 1개",
    info: [
      "첫 1년은 무료로 제공됩니다.",
      "이후 연 30,000원이 호스팅료에 추가됩니다.",
      "한글·영문 모두 가능하며 com · co.kr · kr 등 여러 도메인 중 원하시는 것으로 선택하실 수 있습니다.",
    ],
    values: ["1년 무료", "1년 무료", "1년 무료", "1년 무료"],
  },
  {
    label: "랜딩형 연출",
    note: "스크롤 등장 · 인터랙션",
    values: ["무료", "20만원", "무료", "20만원"],
  },
  {
    label: "서브페이지 제작",
    note: "소개 · 서비스 · 사례 · 문의 등을 별도 페이지로",
    info: [
      "한 페이지에 다 넣는 대신 메뉴별로 페이지를 나눕니다.",
      "올릴 내용이 많거나 메뉴 구성을 갖추고 싶을 때 고르십니다.",
      "서브페이지를 넣어도 제작 기간은 영업일 7일 그대로입니다.",
    ],
    values: ["원페이지", "원페이지", "30만원", "30만원"],
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
  {
    label: "반응형 제작",
    note: "PC · 태블릿 · 모바일",
    values: ["무료", "무료", "무료", "무료"],
  },
  { label: "DB · 파일", values: ["무료", "무료", "무료", "무료"] },
  {
    label: "실시간 문자 기능",
    info: [
      "설치 비용은 0원입니다.",
      "발송 건당 16원의 요금만 별도로 부과됩니다.",
      "문의 접수 시 실시간으로 알림을 받아보실 수 있습니다.",
    ],
    values: ["0원", "0원", "0원", "0원"],
  },
  {
    label: "셋팅비용",
    required: true,
    info: ["도메인 연결, 서버 셋팅, 초기 데이터 등록에 필요한 1회성 비용입니다."],
    values: ["10만원", "10만원", "10만원", "10만원"],
  },
  {
    label: "호스팅 1년",
    required: true,
    infoSide: "top",
    info: [
      ...HOSTING_DISCOUNTS.map(
        (h) => `${h.years}년 ${Math.round(h.rate * 100)}%할인 ${h.total.toLocaleString("ko-KR")}원`,
      ),
    ],
    values: ["24만원", "24만원", "24만원", "24만원"],
  },
];

/** 표 맨 아래 "제작 기간" 행 툴팁 */
export const PERIOD_INFO = ["진행 자료 전달과 수정 범위에 따라", "제작 기간이 달라질 수 있습니다."];

export const PRODUCTION_PERIOD = "영업일 7일 ~";
