import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Send } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_SAMPLES, PORTFOLIO_FILTERS, MAIN_PORTFOLIO_CAROUSEL } from "@/lib/samples";
import { cn } from "@/lib/utils";
import type { Sample } from "@/lib/samples";

/** 자동 슬라이드 속도 (px/초). 카드 한 장이 3~4초 안에 지나가는 속도. */
const AUTO_SCROLL_SPEED = 130;

/**
 * 좌→우로 흐르는 무한 루프 캐러셀.
 * - 마우스를 올리면 자동 슬라이드가 멈추고, 좌클릭한 채 좌우로 끌어서 직접 이동할 수 있다.
 * - 목록을 두 번 이어 붙이고 scrollLeft를 한 세트 폭만큼 되감아 이음새 없이 순환한다.
 * - prefers-reduced-motion 사용자에게는 자동 슬라이드 없이 일반 가로 스크롤로 동작한다.
 */
function PortfolioCarousel({ items }: { items: Sample[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);
  // 드래그로 이동한 뒤 손을 뗄 때 카드 링크가 클릭되는 것을 막기 위한 플래그
  const draggedRef = useRef(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // 두 번째 세트 첫 카드와 첫 세트 첫 카드의 간격 = 정확한 한 바퀴 폭
    const first = el.children[0] as HTMLElement | undefined;
    const second = el.children[items.length] as HTMLElement | undefined;
    if (!first || !second) return;
    const period = second.offsetLeft - first.offsetLeft;

    // 콘텐츠가 화면보다 좁으면 순환할 필요가 없다
    if (el.scrollWidth <= el.clientWidth + 50) return;

    el.scrollLeft = period; // 중간 지점에서 시작해 양방향 모두 여유를 확보

    const wrap = () => {
      if (el.scrollLeft < period * 0.25) el.scrollLeft += period;
      else if (el.scrollLeft > period * 1.25) el.scrollLeft -= period;
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      // 좌→우 흐름: 카드가 오른쪽으로 이동하도록 scrollLeft를 줄인다
      if (!pausedRef.current) el.scrollLeft -= (dt / 1000) * AUTO_SCROLL_SPEED;
      wrap();
      raf = requestAnimationFrame(tick);
    };
    if (!reduceMotion) raf = requestAnimationFrame(tick);

    // 마우스 좌클릭 드래그로 좌우 이동 (터치는 브라우저 기본 스와이프 스크롤을 그대로 쓴다)
    let dragging = false;
    let startX = 0;
    let startScrollLeft = 0;
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      draggedRef.current = false;
      startX = e.clientX;
      startScrollLeft = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 5) draggedRef.current = true;
      el.scrollLeft = startScrollLeft - dx;
      wrap();
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      el.releasePointerCapture(e.pointerId);
    };
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    const onScroll = () => wrap();
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  const loopItems = [...items, ...items];

  return (
    <div
      ref={trackRef}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onTouchStart={() => {
        pausedRef.current = true;
      }}
      onTouchEnd={() => {
        pausedRef.current = false;
      }}
      onClickCapture={(e) => {
        // 드래그 직후 발생하는 클릭은 카드 이동으로 이어지지 않게 삼킨다
        if (draggedRef.current) {
          e.preventDefault();
          e.stopPropagation();
          draggedRef.current = false;
        }
      }}
      onDragStart={(e) => e.preventDefault()}
      className="mt-8 flex cursor-grab select-none items-stretch gap-6 overflow-x-auto pb-2 scrollbar-none active:cursor-grabbing"
    >
      {loopItems.map((sample, i) => (
        <div key={`${sample.slug}-${i}`} className="w-[340px] shrink-0 sm:w-[420px] lg:w-[480px]">
          <PortfolioCard sample={sample} size="normal" />
        </div>
      ))}
    </div>
  );
}

export function PortfolioSection() {
  const [selectedType, setSelectedType] = useState("all");

  // 기본 화면은 대표 12건 슬라이드, 필터 선택 시 해당 분류 전체를 같은 슬라이드로 보여준다.
  const displaySamples =
    selectedType === "all"
      ? MAIN_PORTFOLIO_CAROUSEL
      : PORTFOLIO_SAMPLES.filter((site) => site.type?.includes(selectedType));

  return (
    <section id="portfolio-section" className="relative overflow-hidden py-20 lg:py-28">
      <div className="relative mx-auto max-w-[1536px] px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-border/80 pb-8">
          <SectionHeader
            label="PORTFOLIO"
            title="실제로 이렇게 만들었습니다"
            description="업종과 목적에 따라 서로 다른 구성과 디자인으로 제작한 대표 사례입니다."
          />

          <Link
            to="/samples"
            className="text-sm font-medium text-primary hover:underline self-start md:self-auto shrink-0"
          >
            전체 포트폴리오 보기 →
          </Link>
        </div>

        <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PORTFOLIO_FILTERS.map((f) => {
            const isActive = selectedType === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setSelectedType(f.value)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-foreground text-background shadow-xs"
                    : "bg-secondary/70 text-secondary-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {displaySamples.length > 0 ? (
          <PortfolioCarousel key={selectedType} items={displaySamples} />
        ) : (
          <div className="mt-8 py-16 text-center text-sm text-muted-foreground bg-card rounded-xl border border-border/60">
            해당 카테고리의 포트폴리오를 준비 중입니다. 원하시는 업종을 문의해주시면 맞춤 구성안을 보여드립니다.
          </div>
        )}

        <FadeIn className="mt-16">
          <div className="rounded-xl border border-border bg-card/60 p-8 sm:p-10 text-center shadow-xs">
            <h3 className="text-xl font-medium text-foreground">마음에 드는 구성이 있으신가요?</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-xl mx-auto">
              업종과 필요한 기능을 알려주시면 적합한 구성과 제작 비용을 자세히 안내드립니다.
            </p>
            <div className="mt-6 flex justify-center">
              <Button asChild size="lg" className="px-8 font-bold gap-2 shadow-sm">
                <Link to="/contact">
                  <Send className="h-4 w-4" />
                  제작 상담하기
                </Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
