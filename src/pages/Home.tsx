import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SAMPLES } from "@/lib/samples";
import { BENEFITS, PRODUCT_TYPES, PRICING, ADDONS, PRICING_NOTE, PROCESS_STEPS } from "@/lib/pricing";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function Home() {
  usePageTitle(
    "MINTCL — 소상공인·1인기업 홈페이지 제작",
    "30만 원부터 시작하는 맞춤형 홈페이지 제작. 상담부터 배포까지 정리해 드립니다.",
  );

  return (
    <div>
      {/* 히어로 */}
      <section className="mx-auto max-w-6xl px-4 py-20 text-center md:py-28">
        <p className="text-sm font-medium tracking-widest text-primary">MINTCL</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
          소상공인과 1인기업을 위한
          <br />
          홈페이지 제작
        </h1>
        <p className="mt-5 text-lg font-medium text-foreground">
          30만 원부터 시작하는 맞춤형 홈페이지
        </p>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          홈페이지가 필요하지만 어디서부터 시작해야 할지 모르는 분들을 위해, 필요한 구성부터 배포까지
          정리해드립니다.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/contact">상담 문의하기</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/samples">샘플 보기</Link>
          </Button>
        </div>
      </section>

      {/* 핵심 장점 */}
      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-xl font-semibold">이런 부분까지 기본으로 챙깁니다</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {BENEFITS.map((item) => (
              <div key={item} className="rounded-lg bg-card p-5 text-sm font-medium shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 제작 유형 */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold">제작 유형</h2>
        <p className="mt-2 text-sm text-muted-foreground">필요한 규모에 맞춰 골라서 시작하실 수 있습니다.</p>
        <div className="mt-8 divide-y divide-border rounded-lg border border-border bg-card">
          {PRODUCT_TYPES.map((type) => (
            <div key={type.name} className="flex flex-col gap-1 p-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <p className="font-medium">{type.name}</p>
              <p className="text-sm text-muted-foreground sm:max-w-md sm:text-right">{type.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 가격 안내 */}
      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-semibold">가격 안내</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {PRICING.map((item) => (
              <div key={item.name} className="rounded-lg border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">{item.name}</p>
                <p className="mt-2 text-xl font-semibold text-primary">{item.price}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-border bg-card p-6">
            <p className="mb-3 text-sm font-medium">추가 옵션</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {ADDONS.map((item) => (
                <li key={item.name} className="flex items-baseline justify-between">
                  <span>{item.name}</span>
                  <span className="font-medium text-foreground">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{PRICING_NOTE}</p>
        </div>
      </section>

      {/* 제작 절차 */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold">제작 절차</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS_STEPS.map((s) => (
            <div key={s.step} className="rounded-lg border border-border bg-card p-6">
              <p className="text-sm font-semibold text-primary">{s.step}</p>
              <p className="mt-2 font-medium">{s.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 샘플 사이트 미리보기 */}
      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold">샘플 사이트</h2>
            <Link to="/samples" className="text-sm text-primary">
              전체 보기
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SAMPLES.slice(0, 3).map((sample) => (
              <Link
                key={sample.slug}
                to={`/samples/${sample.slug}`}
                className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary"
              >
                <p className="text-xs font-medium tracking-wide text-primary">{sample.industry}</p>
                <p className="mt-2 font-medium">{sample.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{sample.purpose}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 최종 상담 CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold sm:text-3xl">홈페이지가 필요하시면 편하게 문의해주세요</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          업종과 필요한 구성만 알려주시면, 적합한 제작 방향과 예상 비용을 안내드립니다.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link to="/contact">상담 문의하기</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
