import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { getSampleBySlug } from "@/lib/samples";
import { usePageTitle } from "@/hooks/usePageTitle";
import NotFound from "@/pages/NotFound";

export default function SampleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const sample = slug ? getSampleBySlug(slug) : undefined;

  usePageTitle(
    sample ? `${sample.industry} 제작 샘플 — MINTCL` : "샘플을 찾을 수 없습니다 — MINTCL",
    sample?.purpose,
  );

  if (!sample) return <NotFound />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <Link to="/samples" className="text-sm text-primary">
        ← 샘플 목록으로
      </Link>

      <p className="mt-6 text-xs font-medium tracking-wide text-primary">{sample.industry}</p>
      <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">{sample.title}</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{sample.purpose}</p>

      <div className="mt-8">
        <ImagePlaceholder ratio="wide" label={`${sample.industry} 샘플 이미지`} />
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold">주요 구성</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {sample.features.map((f) => (
              <li key={f}>· {f}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">적합한 고객</h2>
          <p className="mt-3 text-sm text-muted-foreground">{sample.idealFor}</p>
        </div>
      </div>

      <div className="mt-12 rounded-lg border border-border bg-secondary/40 p-8 text-center">
        <p className="text-sm text-muted-foreground">이런 구성으로 제작을 원하시면 편하게 문의해주세요.</p>
        <Button asChild className="mt-4">
          <Link to="/contact">상담 문의하기</Link>
        </Button>
      </div>
    </div>
  );
}
