import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { Pagination } from "@/components/ui/Pagination";
import { SampleMarquee } from "@/components/sections/SampleMarquee";
import { SAMPLES } from "@/lib/samples";
import { usePageTitle } from "@/hooks/usePageTitle";

const PAGE_SIZE = 6;

export default function Samples() {
  const [page, setPage] = useState(1);

  usePageTitle(
    "업종별 포트폴리오 — MintCL",
    "병원, 뷰티샵, 식당 등 업종별 홈페이지 제작 포트폴리오를 확인하세요.",
  );

  const totalPages = Math.max(1, Math.ceil(SAMPLES.length / PAGE_SIZE));
  const pageSamples = SAMPLES.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePageChange = (next: number) => {
    if (next < 1 || next > totalPages) return;
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-3xl font-semibold">업종별 포트폴리오</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        업종별로 실제 홈페이지 제작 시 자주 요청되는 구성을 포트폴리오로 정리했습니다. 원하시는
        업종이 없어도 상담을 통해 맞춤 구성으로 제작해 드립니다.
      </p>

      {/* Live Sample Captures Carousel / Marquee */}
      <div className="mt-8 rounded-2xl overflow-hidden">
        <SampleMarquee />
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
        {pageSamples.map((sample, i) => (
          <FadeIn key={sample.slug} delay={i * 60} className="h-full">
            <PortfolioCard sample={sample} />
          </FadeIn>
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
