import { SolutionShowcase } from "@/components/site/SolutionShowcase";
import { getIndustryShowcase } from "@/components/site/industryShowcase";

export default function MovingSolution() {
  return <SolutionShowcase industry={getIndustryShowcase("moving")!} />;
}
