import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { Pagination } from "@/components/ui/Pagination";
import { SAMPLES, TEMPLATE_INDUSTRY_FILTERS } from "@/lib/samples";
import { usePageTitle } from "@/hooks/usePageTitle";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 9;

const STYLES = [
  { label: "기본형", value: "basic-template" },
  { label: "랜딩형", value: "landing-template" },
] as const;

const TEMPLATES = SAMPLES.filter((s) => s.industryKey);

export default function Templates() {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [style, setStyle] = useState<string>(() => {
    const s = searchParams.get("style");
    return STYLES.some((v) => v.value === s) ? s! : "basic-template";
  });
  const [industry, setIndustry] = useState(() => {
    const i = searchParams.get("industry");
    return i && TEMPLATE_INDUSTRY_FILTERS.some((f) => f.value === i) ? i : "all";
  });

  usePageTitle(
    "홈페이지 템플릿 — NOVERIQ",
    "NOVERIQ이 제작한 디자인을 기반으로 빠르게 시작할 수 있는 홈페이지 템플릿을 확인하세요.",
  );

  const filteredSamples = TEMPLATES.filter(
    (s) => s.type.includes(style) && (industry === "all" || s.industryKey === industry),
  );

  const totalPages = Math.max(1, Math.ceil(filteredSamples.length / PAGE_SIZE));
  const pageSamples = filteredSamples.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePageChange = (next: number) => {
    if (next < 1 || next > totalPages) return;
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectStyle = (value: string) => {
    setStyle(value);
    setPage(1);
  };

  const handleSelectIndustry = (value: string) => {
    setIndustry(value);
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-[1536px] px-4 py-14">
      <h1 className="text-3xl font-semibold">홈페이지 템플릿</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
        NOVERIQ이 이미 제작한 디자인 중에서 마음에 드는 스타일을 골라 빠르게 제작을 시작할 수
        있습니다. 선택한 템플릿을 기반으로 문구와 이미지, 구성을 원하는 대로 조정해 드립니다.
      </p>

      <div className="mt-8 inline-flex rounded-full border border-border bg-secondary/40 p-1">
        {STYLES.map((s) => {
          const isActive = style === s.value;
          return (
            <button
              key={s.value}
              onClick={() => handleSelectStyle(s.value)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200",
                isActive ? "bg-foreground text-background shadow-xs" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {TEMPLATE_INDUSTRY_FILTERS.map((f) => {
          const isActive = industry === f.value;
          return (
            <button
              key={f.value}
              onClick={() => handleSelectIndustry(f.value)}
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

      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
        {pageSamples.length > 0 ? (
          pageSamples.map((sample, i) => (
            <FadeIn key={sample.slug} delay={i * 60} className="h-full">
              <PortfolioCard sample={sample} />
            </FadeIn>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-sm text-muted-foreground bg-card rounded-xl border border-border/60">
            해당 업종의 {style === "basic-template" ? "기본형" : "랜딩형"} 템플릿을 준비 중입니다.
            원하시는 업종을 문의해주시면 맞춤 구성안을 보여드립니다.
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
