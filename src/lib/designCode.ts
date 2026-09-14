import { SAMPLES, TEMPLATE_INDUSTRY_LABELS, type Sample } from "./samples";

/**
 * 템플릿 디자인 코드 규칙.
 *
 * `{업종 3글자}{B|L}-{일련번호}` — B는 기본형, L은 랜딩형.
 * 같은 업종·유형의 첫 디자인이 1001이고, 추가 디자인 시안은 1002, 1003…으로 늘어난다.
 * 추가 시안은 samples.ts에서 designCode를 직접 지정하고, 지정이 없으면 1001로 계산한다.
 * 고객이 문의 시 이 코드를 그대로 말하면 어떤 디자인인지 특정된다.
 */
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
};

export function getDesignCode(sample: Sample): string {
  if (sample.designCode) return sample.designCode;
  const prefix = (sample.industryKey && INDUSTRY_PREFIX[sample.industryKey]) ?? "TPL";
  const isLanding = sample.type.includes("landing-template");
  return `${prefix}${isLanding ? "L" : "B"}-1001`;
}

export type DesignLine = "프리미엄" | "랜딩형" | "기본형";
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
};

const LINE_ORDER: Record<DesignLine, number> = { 프리미엄: 0, 랜딩형: 1, 기본형: 2 };

function shortLabel(title: string) {
  const letter = title.match(/디자인 ([A-Z])\)/)?.[1];
  const base = title.replace(/\s*\(.*\)\s*$/, "");
  return letter ? `${base} ${letter}` : base;
}

/**
 * 문의 폼 디자인 셀렉트에 노출할 전체 템플릿 목록.
 * 업종은 대분류로 묶고, 업종 안에서는 프리미엄 → 랜딩형 → 기본형 순으로 정렬해 돌려준다.
 */
export function getDesignCodeOptions(): DesignCodeOption[] {
  return SAMPLES.filter((s) => s.industryKey)
    .map((s) => {
      const key = s.industryKey as string;
      const line: DesignLine = s.type.includes("premium-template")
        ? "프리미엄"
        : s.type.includes("landing-template")
          ? "랜딩형"
          : "기본형";
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
        LINE_ORDER[a.line] - LINE_ORDER[b.line] ||
        a.code.localeCompare(b.code),
    );
}
