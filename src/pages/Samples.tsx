import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
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

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SAMPLES.map((sample) => (
          <article key={sample.slug} className="overflow-hidden rounded-lg border border-border bg-card">
            <ImagePlaceholder ratio="video" label={sample.industry} className="rounded-none border-0" />
            <div className="p-6">
              <p className="text-xs font-medium tracking-wide text-primary">{sample.industry}</p>
              <h2 className="mt-2 font-medium">{sample.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sample.purpose}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {sample.features.map((f) => (
                  <li key={f} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-muted-foreground">적합한 고객: {sample.idealFor}</p>
              <Button asChild size="sm" variant="outline" className="mt-4 w-full">
                <Link to={`/samples/${sample.slug}`}>샘플 보기</Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
