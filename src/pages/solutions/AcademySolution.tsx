import { SolutionShowcase } from "@/components/site/SolutionShowcase";
import { getIndustryShowcase } from "@/components/site/industryShowcase";

export default function AcademySolution() {
  return <SolutionShowcase industry={getIndustryShowcase("academy")!} />;
}
