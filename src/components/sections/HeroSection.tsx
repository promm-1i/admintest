import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { HERO_SLIDES } from "@/lib/heroSlides";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const [active, setActive] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const slide = HERO_SLIDES[active];

  // 활성 슬라이드가 바뀔 때마다 해당 영상만 처음부터 재생하고 나머지는 멈춘다.
  useEffect(() => {
    if (reducedMotion) return;
    HERO_SLIDES.forEach((_, i) => {
      const v = videoRefs.current[i];
      if (!v) return;
      if (i === active) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active, reducedMotion, isDesktop]);

  const handleEnded = () => setActive((i) => (i + 1) % HERO_SLIDES.length);

  // 첫 영상 재생이 실제로 시작되면 나머지 두 개를 백그라운드에서 미리 받아둔다.
  const handleFirstPlaying = () => {
    HERO_SLIDES.forEach((_, i) => {
      if (i === 0) return;
      const v = videoRefs.current[i];
      if (v && v.preload !== "auto") {
        v.preload = "auto";
        v.load();
      }
    });
  };

  const renderVideo = (s: (typeof HERO_SLIDES)[number], i: number, mobileObjectPosition?: string) => (
    <video
      key={s.id}
      ref={(el) => {
        videoRefs.current[i] = el;
      }}
      src={s.video}
      poster={s.poster}
      muted
      playsInline
      preload={i === 0 ? "auto" : "metadata"}
      onEnded={handleEnded}
      onPlaying={i === 0 ? handleFirstPlaying : undefined}
      style={mobileObjectPosition ? { objectPosition: mobileObjectPosition } : undefined}
      className={cn(
        "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out",
        i === active ? "opacity-80" : "opacity-0",
      )}
    />
  );

  return (
    <section className="relative overflow-hidden bg-background lg:w-full lg:aspect-[1680/860] lg:max-h-[min(82vh,860px)]">
      {/* Desktop: full-bleed width always (matches the edge-to-edge header); height follows an aspect ratio close to
          the source 16:9 so object-cover doesn't crop heavily, capped so it still fits one viewport */}
      {isDesktop && (
        <div className="absolute inset-0 hidden lg:block">
          {HERO_SLIDES.map((s, i) => renderVideo(s, i))}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[62%] bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>
      )}

      <div className="relative flex flex-col lg:h-full lg:max-w-3xl lg:justify-center lg:pl-[10%]">
        <div className="max-w-md px-4 py-14 sm:px-6 lg:px-10 lg:py-0">
          <FadeIn>
            <span className="inline-block rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              맞춤형 웹사이트 제작 전문
            </span>

            <div key={slide.id} className="motion-safe:animate-hero-text-fade">
              <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.2] tracking-tight text-foreground sm:text-5xl">
                {slide.title[0]}
                <br />
                {slide.title[1]}
              </h1>
              <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
                {slide.subtitle}
              </p>
              <ul className="mt-6 flex flex-col gap-2">
                {slide.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div key={`${slide.id}-cta`} className="mt-8 flex flex-wrap gap-3 motion-safe:animate-hero-text-fade">
              <Button asChild size="lg">
                <Link to={slide.ctaPrimary.to}>{slide.ctaPrimary.label}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to={slide.ctaSecondary.to}>{slide.ctaSecondary.label}</Link>
              </Button>
            </div>
          </FadeIn>

          {/* 슬라이드 내비게이션: 01 / 02 / 03 + 얇은 진행률 표시 */}
          <div className="mt-8 flex items-center gap-5 lg:mt-10">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${i + 1}번째 소개 보기: ${s.title.join(" ")}`}
                aria-current={i === active}
                className="group flex flex-col items-start gap-1.5"
              >
                <span
                  className={cn(
                    "font-mono text-xs font-bold tabular-nums transition-colors",
                    i === active ? "text-foreground" : "text-muted-foreground/50 group-hover:text-muted-foreground",
                  )}
                >
                  0{i + 1}
                </span>
                <span className="relative h-[2px] w-8 overflow-hidden rounded-full bg-border">
                  {i === active && (
                    <span
                      className={cn(
                        "absolute inset-y-0 left-0 bg-primary",
                        reducedMotion ? "w-full" : "w-0 motion-safe:animate-hero-progress",
                      )}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile: text above a shorter video band, object-position tuned per clip */}
        {!isDesktop && (
          <div className="relative h-64 shrink-0 overflow-hidden sm:h-96 lg:hidden">
            {HERO_SLIDES.map((s, i) => renderVideo(s, i, s.mobileObjectPosition))}
          </div>
        )}
      </div>
    </section>
  );
}
