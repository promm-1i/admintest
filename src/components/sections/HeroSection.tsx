import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CoverImage } from "@/components/ui/CoverImage";
import { FadeIn } from "@/components/ui/FadeIn";
import heroBanner from "@/assets/images/hero_banner.jpg";

const HERO_ALT =
  "MintCL이 제작한 반응형 웹사이트가 모니터, 노트북, 모바일 화면에 표시된 화이트톤 오피스";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background lg:mx-auto lg:aspect-video lg:max-w-[1920px]">
      {/* Desktop: full-bleed 16:9 banner, capped at 1920x1080 so it doesn't overgrow on wider screens */}
      <img
        src={heroBanner}
        alt={HERO_ALT}
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 hidden h-full w-full object-cover opacity-80 lg:block"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col lg:h-full lg:justify-center">
        <div className="max-w-md px-4 py-14 sm:px-6 lg:px-12 lg:py-0">
          <FadeIn>
            <p className="text-sm font-medium tracking-widest text-primary">MintCL</p>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-5xl">
              작은 회사도
              <br />
              제대로 보이게.
            </h1>
            <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
              소상공인·기업을 위한 맞춤형 홈페이지 제작. 기획부터 디자인, 개발, 배포까지 한 번에
              진행합니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/contact">제작 상담하기</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/samples">포트폴리오 보기</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">40만 원부터 · 5~10영업일 · 반응형 기본</p>
          </FadeIn>
        </div>

        {/* Mobile: text above a shorter device-photo band, biased right to feature the devices */}
        <div className="relative h-64 shrink-0 sm:h-96 lg:hidden">
          <CoverImage
            src={heroBanner}
            alt={HERO_ALT}
            priority
            className="object-[80%_center] opacity-80"
          />
        </div>
      </div>
    </section>
  );
}
