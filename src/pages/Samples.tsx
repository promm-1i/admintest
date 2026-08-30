import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { Pagination } from "@/components/ui/Pagination";
import { SampleMarquee } from "@/components/sections/SampleMarquee";
import { SAMPLES, PORTFOLIO_FILTERS } from "@/lib/samples";
import { usePageTitle } from "@/hooks/usePageTitle";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 8;

export default function Samples() {
  const [page, setPage] = useState(1);
  const [selectedType, setSelectedType] = useState("all");

  usePageTitle(
    "업종별 포트폴리오 — NOVERIQ",
    "병원, 뷰티샵, 식당 등 업종별 홈페이지 제작 포트폴리오를 확인하세요.",
  );

  const filteredSamples =
    selectedType === "all"
      ? SAMPLES
      : SAMPLES.filter((site) => site.type?.includes(selectedType));

  const totalPages = Math.max(1, Math.ceil(filteredSamples.length / PAGE_SIZE));
  const pageSamples = filteredSamples.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePageChange = (next: number) => {
    if (next < 1 || next > totalPages) return;
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectType = (value: string) => {
    setSelectedType(value);
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-[1536px] px-4 py-14">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">업종별 포트폴리오</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        업종별로 실제 홈페이지 제작 시 자주 요청되는 구성을 포트폴리오로 정리했습니다. 원하시는
        업종이 없어도 상담을 통해 맞춤 구성으로 제작해 드립니다.
      </p>

      {/* Live Sample Captures Carousel / Marquee */}
      <div className="mt-8 rounded-2xl overflow-hidden">
        <SampleMarquee />
      </div>

      {/* Filter Bar */}
      <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {PORTFOLIO_FILTERS.map((f) => {
          const isActive = selectedType === f.value;
          return (
            <button
              key={f.value}
              onClick={() => handleSelectType(f.value)}
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
        {pageSamples.length > 0 ? (
          pageSamples.map((sample, i) => (
            <FadeIn key={sample.slug} delay={i * 60} className="h-full">
              <PortfolioCard sample={sample} />
            </FadeIn>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-sm text-muted-foreground bg-card rounded-xl border border-border/60">
            해당 카테고리의 포트폴리오를 준비 중입니다. 원하시는 업종을 문의해주시면 맞춤 구성안을 보여드립니다.
          </div>
        )}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
