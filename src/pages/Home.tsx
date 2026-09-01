import { usePageTitle } from "@/hooks/usePageTitle";
import { HeroSection } from "@/components/sections/HeroSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { AdminFeatureSection } from "@/components/sections/AdminFeatureSection";
import { StartOptionsSection } from "@/components/sections/StartOptionsSection";
import { ProcessPricingBand } from "@/components/sections/ProcessPricingBand";
import { TrustBand } from "@/components/sections/TrustBand";
import { AfterLaunchBand } from "@/components/sections/AfterLaunchBand";
import { FaqBand } from "@/components/sections/FaqBand";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

/**
 * 섹션 순서는 "무엇을 만드는가 → 어떻게 만드는가 → 믿을 만한가 → 문의"의 한 흐름이다.
 * 같은 일을 하는 섹션을 따로 쌓지 않는다. 15개였던 것을 10개로 묶었다.
 */
export default function Home() {
  usePageTitle(
    "NOVERIQ — 소상공인·기업 홈페이지 제작",
    "홈페이지부터 플랫폼형 웹까지, 기획·디자인·개발·관리를 한 번에. 업종 전용 기능과 관리자 시스템까지 직접 설계·구축하는 웹 스튜디오입니다.",
  );

  return (
    <div>
      {/* 무엇을 만드는가 */}
      <HeroSection />
      <PortfolioSection />

      {/* 시작하는 두 가지 방법 */}
      <StartOptionsSection />

      {/* 무엇이 들어가는가 */}
      <FeaturesSection />
      <AdminFeatureSection />

      {/* 어떻게, 얼마에 */}
      <ProcessPricingBand />

      {/* 믿을 만한가 */}
      <TrustBand />
      <AfterLaunchBand />

      {/* 결정 */}
      <FaqBand />
      <FinalCtaSection />
    </div>
  );
}
