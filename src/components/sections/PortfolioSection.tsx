import { Link } from "react-router-dom";
import { Send } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { SampleMarquee } from "@/components/sections/SampleMarquee";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { Button } from "@/components/ui/button";
import { SAMPLES } from "@/lib/samples";
import { cn } from "@/lib/utils";
import bgTexture from "@/assets/images/bg_texture_1.jpg";

type PortfolioSectionProps = {
  selectedType?: string;
  onSelectType?: (filterValue: string) => void;
};

const FILTERS = [
  { label: "전체", value: "all" },
  { label: "원페이지", value: "one-page" },
  { label: "소상공인", value: "small-business" },
  { label: "기업", value: "business" },
  { label: "포트폴리오", value: "portfolio" },
  { label: "리뉴얼", value: "renewal" },
];

export function PortfolioSection({
  selectedType = "all",
  onSelectType,
}: PortfolioSectionProps) {
  const filteredSamples =
    selectedType === "all"
      ? SAMPLES
      : SAMPLES.filter((site) => site.type?.includes(selectedType));

  // 메인페이지에는 최신 포트폴리오 6건만 노출 (SAMPLES는 최신순 정렬, 전체 목록은 /samples)
  const displaySamples = filteredSamples.slice(0, 6);

  const activeFilterLabel =
    FILTERS.find((f) => f.value === selectedType)?.label || "전체";

  return (
    <section id="portfolio-section" className="relative overflow-hidden py-20 lg:py-28">
      <SectionBackground
        src={bgTexture}
        opacity={0.1}
        overlayClassName="bg-gradient-to-b from-background/70 via-background/45 to-background/75"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-border/80 pb-8">
        <SectionHeader
          label="PORTFOLIO"
          title="포트폴리오"
          description="업종과 목적에 따라 서로 다른 구성과 디자인으로 제작합니다."
        />

        <Link
          to="/samples"
          className="text-sm font-medium text-primary hover:underline self-start md:self-auto shrink-0"
        >
          전체 포트폴리오 보기 →
        </Link>
      </div>

      {/* Live Sample Card Marquee Slider */}
      <div className="mt-8 rounded-2xl overflow-hidden">
        <SampleMarquee />
      </div>

      {/* Filter Bar */}
      <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {FILTERS.map((f) => {
          const isActive = selectedType === f.value;
          return (
            <button
              key={f.value}
              onClick={() => onSelectType && onSelectType(f.value)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-foreground text-background shadow-xs"
                  : "bg-secondary/70 text-secondary-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Active Filter Indicator */}
      {selectedType !== "all" && (
        <p className="mt-4 text-xs font-medium text-primary">
          ‘{activeFilterLabel}’ 유형과 연결된 포트폴리오 {filteredSamples.length}건이 표시되고 있습니다.
        </p>
      )}

      {/* Samples Grid with Unified Card Heights */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
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

      {/* Consultation CTA */}
      <FadeIn className="mt-16">
        <div className="rounded-xl border border-border bg-card/60 p-8 sm:p-10 text-center shadow-xs">
          <h3 className="text-xl font-medium text-foreground">
            마음에 드는 구성이 있으신가요?
          </h3>
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
