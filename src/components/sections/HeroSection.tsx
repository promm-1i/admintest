import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CoverImage } from "@/components/ui/CoverImage";
import { FadeIn } from "@/components/ui/FadeIn";
import heroDevices from "@/assets/images/hero_devices.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto flex max-w-7xl flex-col lg:h-[560px] lg:flex-row">
        <div className="flex flex-1 flex-col justify-center bg-secondary/30 px-4 py-14 sm:px-6 lg:basis-[45%] lg:px-14 lg:py-0">
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
            <div className="mt-9 flex flex-wrap gap-3">
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

        <div className="relative h-64 shrink-0 sm:h-96 lg:h-auto lg:basis-[55%]">
          <CoverImage
            src={heroDevices}
            alt="MintCL이 제작한 반응형 웹사이트가 모니터, 노트북, 모바일 화면에 표시된 화이트톤 오피스"
            priority
            className="object-[center_30%]"
          />
        </div>
      </div>
    </section>
  );
}
