/**
 * 홈페이지 템플릿 요금제 구조.
 *
 * 모든 패키지에 공통으로 들어가는 필수 비용(셋팅 22만 + 업종 전용 기능 42만 = 64만)에
 * 패키지별 디자인 비용을 더해 최종 시작가가 결정된다. 모든 금액은 VAT 별도.
 *
 * 2026-09-10, 구분 축을 "반응형 유무"에서 "페이지 수"로 바꿨다. 템플릿 154종을 실측한 결과
 * 기본형 템플릿도 미디어쿼리와 viewport가 이미 다 들어 있어(moto-a-basic은 랜딩형과 @media 수가
 * 동일) 반응형을 별도로 받을 근거가 없었다. 반응형은 전 등급 기본 제공으로 올렸다.
 *
 * 2026-10-05, 프리미엄을 150만원으로 내리면서 서브페이지 분리 두 패키지(94만 · 114만)를 없앴다.
 * 프리미엄과 36만원 차이밖에 안 나서다. 템플릿은 원페이지 두 가지만 두고, 메뉴별로 페이지를
 * 나눠야 하는 손님은 프리미엄 라인으로 보낸다. 데모가 원래 여러 쪽인 템플릿(모토 · 식당 등)은
 * 그 쪽까지 그대로 포함한다 — 없어진 것은 원페이지를 나눠 주는 30만원 옵션뿐이다.
 */

const MAN = 10_000;

/**
 * 패키지와 무관하게 공통으로 들어가는 필수 항목.
 *
 * 2026-09-21, 호스팅을 청구 항목에서 뺐다. 고객이 직접 하면 들지 않는 비용이라
 * 따로 받을 근거가 없다. 대신 기존 호스팅 1년 24만원을 남은 두 항목에 12만원씩
 * 균등하게 녹여 총액(64만)은 그대로 둔다. 첫 해 호스팅은 금액 안에 포함된다.
 */
export const BASE_COST = {
  setup: 22 * MAN,
  industryFeature: 42 * MAN,
};

const BASE_TOTAL = BASE_COST.setup + BASE_COST.industryFeature; // 64만

/** 랜딩형 연출(스크롤 등장 · 인터랙션) 추가 비용 */
const LANDING_COST = 20 * MAN;

export type TemplatePackage = {
  key: string;
  label: string;
  /** 랜딩형 연출 비용 (기본형은 무료) */
  designCost: number;
  /** 공통 필수 비용 + 연출 비용 */
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
    badge: "가성비 패키지",
    badgeTone: "value",
    desc: "필요한 정보를 한 페이지에 넣는 구성",
  },
  {
    key: "landing",
    label: "랜딩형",
    designCost: LANDING_COST,
    total: BASE_TOTAL + LANDING_COST,
    badge: "추천 패키지",
    badgeTone: "recommended",
    desc: "스크롤하면 구역이 떠오르는 연출을 더한 한 페이지 구성",
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
  /** ⓘ 아이콘에 마우스를 올렸을 때 뜨는 툴팁 (줄 단위) */
  info?: string[];
  /** 표 아래쪽 행은 툴팁이 표 밖으로 잘리지 않도록 위로 연다 */
  infoSide?: "top" | "bottom";
  /** TEMPLATE_PACKAGES와 같은 순서 */
  values: [string, string];
};

export const PRICING_ROWS: PricingRow[] = [
  {
    label: "도메인 1개",
    info: [
      "첫 1년은 무료로 제공됩니다.",
      "이후 갱신은 연 30,000원입니다.",
      "한글·영문 모두 가능하며 com · co.kr · kr 등 여러 도메인 중 원하시는 것으로 선택하실 수 있습니다.",
    ],
    values: ["1년 무료", "1년 무료"],
  },
  {
    label: "랜딩형 연출",
    note: "스크롤 등장 · 인터랙션",
    values: ["무료", "20만원"],
  },
  {
    label: "페이지 구성",
    note: "고르신 템플릿에 있는 페이지 그대로",
    info: [
      "템플릿에 들어 있는 페이지는 그대로 제작합니다.",
      "메뉴별로 페이지를 더 나누려면 프리미엄 라인(150만원부터)에서 제작합니다.",
    ],
    values: ["포함", "포함"],
  },
  {
    label: "업종 전용 기능",
    note: "매물·차량 관리 등 업종별 전용 기능",
    values: ["42만원", "42만원"],
  },
  {
    label: "관리자 모드 제공",
    note: "공지·문의·콘텐츠를 직접 등록·수정",
    values: ["무료", "무료"],
  },
  {
    label: "반응형 제작",
    note: "PC · 태블릿 · 모바일",
    values: ["무료", "무료"],
  },
  { label: "DB · 파일", values: ["무료", "무료"] },
  {
    label: "실시간 문자 기능",
    info: [
      "설치 비용은 0원입니다.",
      "발송 건당 16원의 요금만 별도로 부과됩니다.",
      "문의 접수 시 실시간으로 알림을 받아보실 수 있습니다.",
    ],
    values: ["0원", "0원"],
  },
  {
    label: "셋팅비용",
    required: true,
    infoSide: "top",
    info: ["도메인 연결, 서버 셋팅, 초기 데이터 등록에 필요한 1회성 비용입니다.", "호스팅료는 따로 받지 않습니다."],
    values: ["22만원", "22만원"],
  },
];

/** 표 맨 아래 "제작 기간" 행 툴팁 */
export const PERIOD_INFO = ["진행 자료 전달과 수정 범위에 따라", "제작 기간이 달라질 수 있습니다."];

export const PRODUCTION_PERIOD = "영업일 7일 ~";
