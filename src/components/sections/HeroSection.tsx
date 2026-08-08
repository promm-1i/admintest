import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CoverImage } from "@/components/ui/CoverImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { STATS } from "@/lib/pricing";
import mainBanner from "@/assets/images/mainbanner.jpg";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[560px] overflow-hidden bg-gradient-to-br from-foreground via-foreground/90 to-primary/60 sm:min-h-[640px]">
      <CoverImage
        src={mainBanner}
        alt="MintCL 제작 홈페이지 예시"
        priority
        className="motion-safe:animate-[hero-zoom_20s_ease-out_forwards]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/55 to-foreground/20" />

      <div className="relative mx-auto flex min-h-[560px] max-w-6xl flex-col justify-end px-4 pb-16 pt-32 sm:min-h-[640px] sm:pb-20">
        <FadeIn>
          <p className="text-sm font-medium tracking-widest text-primary">MintCL</p>
          <h1 className="mt-5 max-w-2xl text-balance text-4xl font-semibold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
            작은 회사도
            <br />
            제대로 보이게.
          </h1>
          <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-white/75">
            소상공인·1인기업을 위한 홈페이지 제작. 기획, 디자인, 배포, 기본 유지보수까지 — 처음
            홈페이지를 만드는 분도 이해하기 쉽게 진행합니다.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/contact">제작 상담하기</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link to="/samples">포트폴리오 보기</Link>
            </Button>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/20 pt-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{s.value}</dd>
                <p className="mt-1 text-xs leading-snug text-white/60">{s.label}</p>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  );
}
