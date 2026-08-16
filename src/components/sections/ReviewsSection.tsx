import { Link } from "react-router-dom";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { Quote, ArrowRight } from "lucide-react";
import { REVIEWS } from "@/lib/reviews";
import bgTexture from "@/assets/images/bg_texture_1.jpg";

export function ReviewsSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28">
      <SectionBackground
        src={bgTexture}
        opacity={0.08}
        overlayClassName="bg-gradient-to-b from-background/75 via-background/50 to-background/80"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          label="REVIEWS"
          title="함께한 고객들의 이야기"
          description="제작이 끝난 고객님들의 실제 후기를 순서대로 채워가고 있습니다."
        />

        {REVIEWS.length > 0 ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <FadeIn key={r.id} delay={i * 70}>
                <div className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-xs">
                  <Quote className="h-5 w-5 text-primary/60" />
                  <p className="flex-1 text-sm leading-relaxed text-foreground break-keep">{r.quote}</p>
                  <div className="border-t border-border/60 pt-3">
                    <p className="text-xs font-medium text-foreground">{r.author}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{r.project}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
}
