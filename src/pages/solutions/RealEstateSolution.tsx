import { SolutionShowcase } from "@/components/site/SolutionShowcase";
import { getIndustryShowcase } from "@/components/site/industryShowcase";

export default function RealEstateSolution() {
  return <SolutionShowcase industry={getIndustryShowcase("real-estate")!} />;
}
