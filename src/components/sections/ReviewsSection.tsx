import { Link } from "react-router-dom";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { SectionPhoto } from "@/components/ui/SectionPhoto";
import { Star, ArrowRight } from "lucide-react";
import { REVIEWS } from "@/lib/reviews";
import photo from "@/assets/images/06_laptop_phone_site.jpg";

function ReviewCard({ quote, author, project, rating }: (typeof REVIEWS)[number]) {
  return (
    <div className="inline-flex w-80 shrink-0 flex-col gap-3 whitespace-normal rounded-xl border border-border bg-card p-6 align-top shadow-xs">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={
              i < rating
                ? "h-3.5 w-3.5 fill-primary text-primary"
                : "h-3.5 w-3.5 fill-none text-border"
            }
          />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-foreground break-keep">{quote}</p>
      <div className="mt-auto border-t border-border/60 pt-3">
        <p className="text-xs font-medium text-foreground">{author}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{project}</p>
      </div>
    </div>
  );
}

// 메인페이지는 업종이 겹치지 않는 대표 후기 6건만 노출한다 (전체 후기는 실제 REVIEWS 데이터 그대로 유지).
const FEATURED_REVIEWS = REVIEWS.slice(0, 6);

export function ReviewsSection() {
  const track = [...FEATURED_REVIEWS, ...FEATURED_REVIEWS];

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28">
      <SectionPhoto src={photo} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          label="REVIEWS"
          align="center"
          title="함께한 고객들의 이야기"
          description="제작이 끝난 고객님들의 실제 후기입니다."
        />
      </div>

      {REVIEWS.length > 0 ? (
        <div className="relative mt-12 flex w-full overflow-x-hidden group">
          <div className="flex animate-marquee gap-4 py-2 group-hover:[animation-play-state:paused]">
            {track.map((r, i) => (
              <ReviewCard key={`${r.id}-${i}`} {...r} />
            ))}
          </div>
        </div>
      ) : (
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn delay={80} className="mt-12">
            <div className="rounded-xl border border-dashed border-border bg-card/40 p-10 text-center">
              <p className="text-sm text-muted-foreground break-keep">
                아직 등록된 후기가 없습니다. 제작을 마친 고객님들께 후기를 받는 대로 이 자리에 하나씩
                채워나갈 예정입니다.
              </p>
              <Link
                to="/samples"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                지금은 실제 포트폴리오로 결과물을 확인해보세요 <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      )}
    </section>
  );
}
