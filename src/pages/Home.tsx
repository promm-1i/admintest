import { usePageTitle } from "@/hooks/usePageTitle";
import { HeroSection } from "@/components/sections/HeroSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { WebSolutionTeaserSection } from "@/components/sections/WebSolutionTeaserSection";
import { AdminFeatureSection } from "@/components/sections/AdminFeatureSection";
import { TemplateTeaserSection } from "@/components/sections/TemplateTeaserSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { SupportSection } from "@/components/sections/SupportSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { BlogTeaserSection } from "@/components/sections/BlogTeaserSection";
import { RecommendedForSection } from "@/components/sections/RecommendedForSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

export default function Home() {
  usePageTitle(
    "NOVERIQ — 소상공인·기업 홈페이지 제작",
    "40만 원부터 시작하는 맞춤형 홈페이지 제작. 상담부터 배포까지 정리해 드립니다.",
  );

  return (
    <div>
      <HeroSection />
      <PortfolioSection />
      <FeaturesSection />
      <WebSolutionTeaserSection />
      <AdminFeatureSection />
      <TemplateTeaserSection />
      <PricingSection />
      <ProcessSection />
      <SupportSection />
      <ReviewsSection />
      <BlogTeaserSection />
      <RecommendedForSection />
      <FaqSection />
      <FinalCtaSection />
    </div>
  );
}
