export type QuoteFeature = { key: string; label: string; price: number };

export const QUOTE_FEATURES: QuoteFeature[] = [
  { key: "map", label: "네이버/카카오 지도 연동", price: 50000 },
  { key: "tap-contact", label: "모바일 원터치 전화/카톡 연결", price: 30000 },
  { key: "inquiry-form", label: "문의·예약 폼 추가", price: 100000 },
  { key: "multilingual", label: "다국어 추가", price: 200000 },
];

export type QuoteConfig = {
  basePrice: number;
  includedPages: number;
  extraPagePrice: number;
  /** 페이지 수를 고객이 직접 조절할 수 있는지 (원페이지형은 항상 1페이지 고정) */
  pagesAdjustable: boolean;
};

/** PRODUCT_TYPES의 name과 동일한 키를 사용한다 */
export const QUOTE_CONFIGS: Record<string, QuoteConfig> = {
  "원페이지 홈페이지": { basePrice: 300000, includedPages: 1, extraPagePrice: 0, pagesAdjustable: false },
  "소상공인 홈페이지": { basePrice: 350000, includedPages: 3, extraPagePrice: 30000, pagesAdjustable: true },
  "기업 홈페이지": { basePrice: 650000, includedPages: 5, extraPagePrice: 30000, pagesAdjustable: true },
};

export function getQuoteConfig(serviceType: string): QuoteConfig | null {
  return QUOTE_CONFIGS[serviceType] ?? null;
}

export function calculateQuote(
  config: QuoteConfig,
  pageCount: number,
  featureKeys: string[],
): number {
  const extraPages = Math.max(0, pageCount - config.includedPages);
  const featureTotal = QUOTE_FEATURES.filter((f) => featureKeys.includes(f.key)).reduce(
    (sum, f) => sum + f.price,
    0,
  );
  return config.basePrice + extraPages * config.extraPagePrice + featureTotal;
}

export function formatQuoteSummary(
  serviceType: string,
  pageCount: number,
  featureKeys: string[],
  total: number,
): string {
  const featureLabels = QUOTE_FEATURES.filter((f) => featureKeys.includes(f.key)).map((f) => f.label);
  const lines = [
    "[실시간 견적 계산기]",
    `선택 유형: ${serviceType}`,
    `예상 페이지 수: ${pageCount}페이지`,
    `선택 기능: ${featureLabels.length > 0 ? featureLabels.join(", ") : "없음"}`,
    `산출 예상 비용: 약 ${total.toLocaleString("ko-KR")}원`,
  ];
  return lines.join("\n");
}
