import { SAMPLES } from "./samples";
import { INDUSTRY_LANDING } from "./industryLanding";

export function premiumSampleOf(key: string) {
  return SAMPLES.find((sample) => sample.premium && (sample.industryKey === key || (key === "real-estate" && sample.industryKey === "estate")));
}

export const AVAILABLE_INDUSTRIES = Object.keys(INDUSTRY_LANDING).filter((key) => premiumSampleOf(key));
