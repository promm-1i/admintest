import { useState } from "react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ServiceTypesSection } from "@/components/sections/ServiceTypesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { AdminFeatureSection } from "@/components/sections/AdminFeatureSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

export default function Home() {
  const [selectedType, setSelectedType] = useState<string>("all");

  usePageTitle(
    "MintCL — 소상공인·기업 홈페이지 제작",
    "30만 원부터 시작하는 맞춤형 홈페이지 제작. 상담부터 배포까지 정리해 드립니다.",
  );

  return (
    <div>
      <HeroSection />
      <ServiceTypesSection selectedType={selectedType} onSelectType={setSelectedType} />
      <PortfolioSection selectedType={selectedType} onSelectType={setSelectedType} />
      <AdminFeatureSection />
      <PricingSection />
      <ProblemSection />
      <FaqSection />
      <FinalCtaSection />
    </div>
  );
}
