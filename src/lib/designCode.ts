import { SAMPLES, type Sample } from "./samples";

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
};

export function getDesignCode(sample: Sample): string {
  if (sample.designCode) return sample.designCode;
  const prefix = (sample.industryKey && INDUSTRY_PREFIX[sample.industryKey]) ?? "TPL";
  const isLanding = sample.type.includes("landing-template");
  return `${prefix}${isLanding ? "L" : "B"}-1001`;
}

export type DesignCodeOption = { code: string; title: string; industry: string };

/** 문의 폼 디자인 코드 셀렉트에 노출할 전체 템플릿 목록 (업종별 그룹핑용 industry 포함) */
export function getDesignCodeOptions(): DesignCodeOption[] {
  return SAMPLES.filter((s) => s.industryKey).map((s) => ({
    code: getDesignCode(s),
    title: s.title,
    industry: s.industry,
  }));
}
