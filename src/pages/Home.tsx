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
import { LiveInquiriesSection } from "@/components/sections/LiveInquiriesSection";
import { BlogTeaserSection } from "@/components/sections/BlogTeaserSection";
import { RecommendedForSection } from "@/components/sections/RecommendedForSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

export default function Home() {
  usePageTitle(
    "NOVERIQ — 소상공인·기업 홈페이지 제작",
    "홈페이지부터 플랫폼형 웹까지, 기획·디자인·개발·관리를 한 번에. 업종 전용 기능과 관리자 시스템까지 직접 설계·구축하는 웹 스튜디오입니다.",
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
      <LiveInquiriesSection />
      <BlogTeaserSection />
      <RecommendedForSection />
      <FaqSection />
      <FinalCtaSection />
    </div>
  );
}
