import { SolutionShowcase } from "@/components/site/SolutionShowcase";
import { getIndustryShowcase } from "@/components/site/industryShowcase";

export default function HospitalSolution() {
  return <SolutionShowcase industry={getIndustryShowcase("hospital")!} />;
}
