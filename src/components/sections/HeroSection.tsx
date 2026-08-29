import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoverImage } from "@/components/ui/CoverImage";
import { FadeIn } from "@/components/ui/FadeIn";
import heroBanner from "@/assets/images/hero_banner.jpg";

const HERO_HIGHLIGHTS = ["40만 원부터 합리적인 시작", "PC·모바일 100% 반응형 최적화", "사업 특성에 맞는 맞춤 기능 개발 가능"];

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
            <span className="inline-block rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              맞춤형 웹사이트 제작 전문
            </span>
            <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.2] tracking-tight text-foreground sm:text-5xl">
              작은 회사도
              <br />
              제대로 보이게.
            </h1>
            <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
              소상공인·기업을 위한 맞춤형 홈페이지 제작. 기획부터 디자인, 개발, 배포까지 한 번에
              진행합니다.
            </p>
            <ul className="mt-6 flex flex-col gap-2">
              {HERO_HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/contact">제작 상담하기</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/samples">포트폴리오 보기</Link>
              </Button>
            </div>
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
