import { FadeIn } from "@/components/ui/FadeIn";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { SAMPLES } from "@/lib/samples";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function Samples() {
  usePageTitle(
    "업종별 샘플 사이트 — MINTCL",
    "병원, 뷰티샵, 식당 등 업종별 홈페이지 제작 샘플을 확인하세요.",
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-3xl font-semibold">업종별 샘플 사이트</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        업종별로 실제 홈페이지 제작 시 자주 요청되는 구성을 샘플로 정리했습니다. 원하시는 업종이
        없어도 상담을 통해 맞춤 구성으로 제작해 드립니다.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {SAMPLES.map((sample, i) => (
          <FadeIn key={sample.slug} delay={i * 60} className={i === 0 ? "sm:col-span-2" : undefined}>
            <PortfolioCard sample={sample} size={i === 0 ? "large" : "normal"} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
