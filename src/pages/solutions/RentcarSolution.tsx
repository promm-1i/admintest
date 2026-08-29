import { SolutionShowcase } from "@/components/site/SolutionShowcase";
import { getIndustryShowcase } from "@/components/site/industryShowcase";

export default function RentcarSolution() {
  return <SolutionShowcase industry={getIndustryShowcase("rentcar")!} />;
}
