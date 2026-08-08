import { Link } from "react-router-dom";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { SAMPLES } from "@/lib/samples";

export function PortfolioSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader
          label="PORTFOLIO"
          title="샘플 사이트"
          description="업종에 따라 레이아웃과 톤을 다르게 구성합니다."
        />
        <Link to="/samples" className="text-sm font-medium text-primary">
          전체 보기 →
        </Link>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {SAMPLES.slice(0, 5).map((sample, i) => (
          <FadeIn key={sample.slug} delay={i * 60}>
            <PortfolioCard sample={sample} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
