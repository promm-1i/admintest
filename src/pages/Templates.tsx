import { useEffect, useState } from "react";
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
  {
    label: "기본형",
    value: "basic-template",
    desc: "애니메이션 없이 꼭 필요한 정보만 담백하게 정리한 구성입니다. 빠르고 합리적인 비용으로 시작할 때 적합합니다.",
  },
  {
    label: "랜딩형",
    value: "landing-template",
    desc: "스크롤을 내릴 때마다 섹션이 나타나는 리빌 연출, 히어로 등장 애니메이션, 숫자 카운트업, 버튼·카드 호버 인터랙션이 들어간 프리미엄 원페이지 구성입니다. 브랜드 인상과 상담 전환에 유리합니다.",
  },
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

  // 이미 이 페이지에 있는 상태에서 메뉴로 다른 업종을 고르면 주소만 바뀌고
  // 목록은 그대로였다. 주소의 필터를 화면에 다시 맞춘다.
  useEffect(() => {
    const s = searchParams.get("style");
    if (STYLES.some((v) => v.value === s)) setStyle(s!);
    const i = searchParams.get("industry");
    setIndustry(i && TEMPLATE_INDUSTRY_FILTERS.some((f) => f.value === i) ? i : "all");
    setPage(1);
  }, [searchParams]);

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
            <span key={s.value} className="group relative inline-flex">
              <button
                onClick={() => handleSelectStyle(s.value)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200",
                  isActive ? "bg-foreground text-background shadow-xs" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {s.label}
              </button>
              {/* 기본형·랜딩형이 뭔지 모르는 방문자를 위한 hover 설명 팝업 */}
              <span
                role="tooltip"
                className="pointer-events-none absolute left-0 top-full z-30 mt-2.5 w-72 translate-y-1 rounded-lg bg-neutral-800 px-3.5 py-3 text-xs font-medium leading-relaxed text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:transition-none break-keep"
              >
                <span className="absolute -top-1 left-6 h-2 w-2 rotate-45 bg-neutral-800" />
                <span className="mb-1 block font-bold">{s.label} 템플릿</span>
                {s.desc}
              </span>
            </span>
          );
        })}
      </div>

      {/* 터치 기기에서도 차이를 알 수 있게, 선택된 스타일 설명을 항상 보여준다 */}
      <p className="mt-3 max-w-2xl text-xs leading-relaxed text-muted-foreground break-keep">
        <strong className="text-foreground">{STYLES.find((s) => s.value === style)?.label}</strong> ·{" "}
        {STYLES.find((s) => s.value === style)?.desc}
      </p>

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
