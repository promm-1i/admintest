import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { Pagination } from "@/components/ui/Pagination";
import { SAMPLES, PORTFOLIO_FILTERS } from "@/lib/samples";
import { usePageTitle } from "@/hooks/usePageTitle";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 8;

export default function Templates() {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [selectedType, setSelectedType] = useState(() => {
    const type = searchParams.get("type");
    return type && PORTFOLIO_FILTERS.some((f) => f.value === type) ? type : "all";
  });

  usePageTitle(
    "홈페이지 템플릿 — MintCL",
    "MintCL이 제작한 디자인을 기반으로 빠르게 시작할 수 있는 홈페이지 템플릿을 확인하세요.",
  );

  const filteredSamples =
    selectedType === "all" ? SAMPLES : SAMPLES.filter((site) => site.type?.includes(selectedType));

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
      <h1 className="text-3xl font-semibold">홈페이지 템플릿</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
        MintCL이 이미 제작한 디자인 중에서 마음에 드는 스타일을 골라 빠르게 제작을 시작할 수
        있습니다. 선택한 템플릿을 기반으로 문구와 이미지, 구성을 원하는 대로 조정해 드립니다.
      </p>

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
            해당 카테고리의 템플릿을 준비 중입니다. 원하시는 스타일을 문의해주시면 맞춤 구성안을
            보여드립니다.
          </div>
        )}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />

      <div className="mt-14 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
        <p className="text-sm text-muted-foreground">
          마음에 드는 템플릿을 찾으셨나요? 선택한 디자인을 기준으로 제작 범위와 일정을
          안내해드립니다.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button asChild variant="outline">
            <Link to="/website/price">제작 비용 확인하기</Link>
          </Button>
          <Button asChild className="gap-1.5 font-bold">
            <Link to="/contact">
              <Send className="h-3.5 w-3.5" />
              이 템플릿으로 상담하기
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
