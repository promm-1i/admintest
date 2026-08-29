import { SolutionShowcase } from "@/components/site/SolutionShowcase";
import { getIndustryShowcase } from "@/components/site/industryShowcase";

export default function InteriorSolution() {
  return <SolutionShowcase industry={getIndustryShowcase("interior")!} />;
}
