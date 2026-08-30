import { Link } from "react-router-dom";
import { PORTFOLIO_SAMPLES } from "@/lib/samples";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";

export function SampleMarquee() {
  // 가장 최근 등록된 6개만 슬라이드에 노출 (PORTFOLIO_SAMPLES는 최신순 정렬)
  const latest = PORTFOLIO_SAMPLES.slice(0, 6);
  // Double the array to create a seamless infinite loop effect
  const marqueeItems = [...latest, ...latest];

  return (
    <div className="w-full overflow-hidden py-6 bg-secondary/20 border-y border-border/60">
      <div className="mb-3 px-4 text-center">
        <span className="text-xs font-mono font-semibold tracking-wider text-primary uppercase">
          LIVE PREVIEW SLIDER
        </span>
        <h4 className="text-sm font-semibold text-foreground mt-0.5">
          실시간 업종별 메인 화면 미리보기
        </h4>
      </div>

      <div className="relative flex w-full overflow-x-hidden group">
        <div className="flex animate-marquee whitespace-nowrap gap-4 py-2 group-hover:[animation-play-state:paused]">
          {marqueeItems.map((sample, idx) => (
            <Link
              key={`${sample.slug}-${idx}`}
              to={`/samples/${sample.slug}`}
              className="inline-block w-96 shrink-0 rounded-xl border border-border/80 bg-card p-3 shadow-xs transition-all duration-300 hover:border-primary hover:shadow-md hover:-translate-y-1"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                <ImagePlaceholder
                  src={sample.image}
                  ratio="video"
                  label={sample.industry}
                  className="rounded-lg border-0"
                />
                <div className="absolute top-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-xs">
                  {sample.industry}
                </div>
              </div>
              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground truncate max-w-[280px]">
                  {sample.title}
                </span>
                <span className="text-[11px] font-medium text-primary">미리보기 →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
