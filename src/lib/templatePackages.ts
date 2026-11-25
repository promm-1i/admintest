/** 홈페이지 제작 요금. 모든 금액은 VAT 별도. */
export type WebsitePackage = {
  key: string;
  label: string;
  total: number;
  badge?: string;
  badgeTone?: "value" | "recommended";
  desc: string;
};

export const WEBSITE_PACKAGES: WebsitePackage[] = [
  {
    key: "premium",
    label: "프리미엄 디자인",
    total: 1_500_000,
    desc: "디자인과 사진까지 새로 만드는 브랜드 사이트 — 서브페이지 확장 가능",
  },
  {
    key: "shop",
    label: "쇼핑몰",
    total: 2_000_000,
    desc: "상품 등록부터 결제·회원까지 직접 판매하는 구성",
  },
];

export function formatMan(won: number): string {
  return `${(won / 10_000).toLocaleString("ko-KR")}만원`;
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
  /** WEBSITE_PACKAGES와 같은 순서 */
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
    label: "페이지 구성",
    values: ["메뉴별 상세 페이지 · 확장 가능", "상품 등록 · 결제 · 회원"],
  },
  {
    label: "업종 전용 기능",
    note: "매물·차량 관리 등 업종별 전용 기능",
    values: ["포함", "포함"],
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
    values: ["포함", "포함"],
  },
];

/** 표 맨 아래 "제작 기간" 행 툴팁 */
export const PERIOD_INFO = ["진행 자료 전달과 수정 범위에 따라", "제작 기간이 달라질 수 있습니다."];

export const PRODUCTION_PERIOD = "상담 후 확정";
