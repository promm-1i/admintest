import { SAMPLES, TEMPLATE_INDUSTRY_LABELS, type Sample } from "./samples";

/** 문의 시 디자인을 특정하는 코드. 명시된 코드를 우선 사용한다. */
const INDUSTRY_PREFIX: Record<string, string> = {
  academy: "ACA",
  agency: "AGE",
  auto: "AUT",
  beauty: "BEA",
  care: "CAR",
  hospital: "HOS",
  corporate: "COR",
  craft: "CRA",
  dental: "DEN",
  fitness: "FIT",
  flower: "FLO",
  golf: "GOL",
  interior: "INT",
  kids: "KID",
  law: "LAW",
  moving: "MOV",
  photo: "PHO",
  "real-estate": "REA",
  rentcar: "REN",
  restaurant: "RES",
  stay: "STA",
  study: "STU",
  tax: "TAX",
  vet: "VET",
  usedcar: "USD",
  travel: "TRV",
  moto: "MOT",
  video: "VID",
  perfume: "PER",
  shop: "SHP",
  estate: "EST",
  artist: "ART",
  brew: "BRE",
  lighting: "LIG",
  bicycle: "BIC",
  laundry: "LAU",
  garden: "GAR",
  inspection: "INS",
  furniture: "FUR",
};

export function getDesignCode(sample: Sample): string {
  if (sample.designCode) return sample.designCode;
  const prefix = (sample.industryKey && INDUSTRY_PREFIX[sample.industryKey]) ?? "TPL";
  return `${prefix}P-1001`;
}

export type DesignLine = "프리미엄";
export type DesignCodeOption = {
  code: string;
  title: string;
  /** 업종 대분류 라벨 — 프리미엄은 디자인마다 industry 문구가 달라 그걸로 묶으면 1종짜리 업종이 수십 개 생긴다 */
  industry: string;
  line: DesignLine;
  /** 셀렉트에 보일 짧은 이름 (예: "카셰어링 홈페이지 A") */
  label: string;
};

/** TEMPLATE_INDUSTRY_LABELS 에 없는 업종(프리미엄에만 있는 것)과, 같은 업종인데 key 가 둘인 것 */
const OPTION_INDUSTRY_LABELS: Record<string, string> = {
  estate: "부동산",
  "real-estate": "부동산",
  agency: "디자인 에이전시",
  shop: "쇼핑몰",
  perfume: "향수·코스메틱",
  video: "영상 편집",
  stay: "호텔·펜션·스테이",
  lighting: "조명·유리 공예",
  bicycle: "자전거 브랜드",
  laundry: "무인세탁 · 세탁 프랜차이즈",
  garden: "정원·수목원",
  inspection: "사전점검·하자진단",
  furniture: "소파·가구 브랜드",
};


function shortLabel(title: string) {
  const letter = title.match(/디자인 ([A-Z])\)/)?.[1];
  const base = title.replace(/\s*\(.*\)\s*$/, "");
  return letter ? `${base} ${letter}` : base;
}

/**
 * 문의 폼 디자인 셀렉트에 노출할 전체 템플릿 목록.
 * 업종 대분류와 디자인 코드 순으로 정렬한다.
 */
export function getDesignCodeOptions(): DesignCodeOption[] {
  return SAMPLES.filter((s) => s.premium && s.industryKey)
    .map((s) => {
      const key = s.industryKey as string;
      const line: DesignLine = "프리미엄";
      return {
        code: getDesignCode(s),
        title: s.title,
        industry: OPTION_INDUSTRY_LABELS[key] ?? TEMPLATE_INDUSTRY_LABELS[key] ?? s.industry.replace(" 홈페이지", ""),
        line,
        label: shortLabel(s.title),
      };
    })
    .sort(
      (a, b) =>
        a.industry.localeCompare(b.industry, "ko") ||
        a.code.localeCompare(b.code),
    );
}
