import { useState } from "react";
import { Link } from "react-router-dom";
import { Send } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_SAMPLES, PORTFOLIO_FILTERS, MAIN_PORTFOLIO_SAMPLES } from "@/lib/samples";
import { cn } from "@/lib/utils";

export function PortfolioSection() {
  const [selectedType, setSelectedType] = useState("all");

  // 메인페이지 기본 화면은 업종별 대표 사례 6건으로 고정한다 (전체 목록은 /samples).
  // 필터를 선택했을 때만 해당 분류 전체에서 최대 6건을 보여준다.
  const displaySamples =
    selectedType === "all"
      ? MAIN_PORTFOLIO_SAMPLES
      : PORTFOLIO_SAMPLES.filter((site) => site.type?.includes(selectedType)).slice(0, 6);

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

        <div className="mt-8 grid gap-8 sm:grid-cols-2 items-stretch">
          {displaySamples.length > 0 ? (
            displaySamples.map((sample, i) => (
              <FadeIn key={sample.slug} delay={i * 60} className="h-full">
                <PortfolioCard sample={sample} size="normal" />
              </FadeIn>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-sm text-muted-foreground bg-card rounded-xl border border-border/60">
              해당 카테고리의 포트폴리오를 준비 중입니다. 원하시는 업종을 문의해주시면 맞춤 구성안을 보여드립니다.
            </div>
          )}
        </div>

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
