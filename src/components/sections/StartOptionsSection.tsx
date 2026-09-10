import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { SAMPLES, getPremiumCategories } from "@/lib/samples";
import { getDesignCode } from "@/lib/designCode";
import { PremiumCategoryPicker } from "@/components/site/PremiumCategoryPicker";

/**
 * 시작하는 방법은 두 가지뿐이라 한 섹션에서 대비시킨다.
 * 순서는 "두 가지 방법(결론) → 그 중 실제 결과물(증거)"이다.
 *
 * 아래 미리보기는 업종 31개 목록이 아니라 프리미엄 디자인 8종을 카테고리로 묶어 보여준다.
 * 업종 목록은 31개가 세로 스크롤에 잘려 보였고 가나다순이라 첫 항목이 대표성이 없었다.
 * 히어로 원통은 여러 장을 빠르게 훑는 자리, 여기는 한 종을 크게 보는 자리로 역할을 나눈다.
 */
const PREMIUM_GROUPS = getPremiumCategories();
const PREMIUM_FLAT = PREMIUM_GROUPS.flatMap((g) => g.items);

const INDUSTRY_COUNT = new Set(SAMPLES.filter((s) => s.industryKey).map((s) => s.industryKey)).size;
const DESIGN_COUNT = SAMPLES.filter((s) => s.industryKey).length;

export function StartOptionsSection() {
  const [activeSlug, setActiveSlug] = useState(PREMIUM_FLAT[0]?.sample.slug ?? "");
  const active = PREMIUM_FLAT.find((d) => d.sample.slug === activeSlug) ?? PREMIUM_FLAT[0];

  return (
    <section id="industry-section" className="border-y border-border bg-secondary/25 px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            label="HOW TO START"
            title={
              <>
                시작하는 방법은
                <br />두 가지입니다
              </>
            }
            description="완성된 업종 템플릿을 골라 빠르게 열거나, 업무 방식에 맞춰 처음부터 설계하거나. 두 방식 모두 아래에서 실제 구축된 화면을 그대로 보실 수 있습니다."
          />
          <p className="shrink-0 text-sm text-muted-foreground">
            업종 <strong className="font-mono text-base tabular-nums text-foreground">{INDUSTRY_COUNT}</strong>개
            <span className="mx-2 text-border">·</span>
            디자인 시안 <strong className="font-mono text-base tabular-nums text-primary">{DESIGN_COUNT}</strong>종
          </p>
        </div>

        {/* 두 가지 방식 — 제목이 약속한 답을 먼저 보여준다 */}
        <FadeIn delay={80} className="mt-10">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
            <div className="flex flex-col bg-card p-6 sm:p-8">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Template
              </p>
              <h3 className="mt-3 text-xl font-bold text-foreground">완성된 디자인으로 빠르게</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground break-keep">
                업종마다 기본형 · 랜딩형 시안이 이미 만들어져 있습니다. 문구 · 사진 · 회사정보만
                바꿔 여는 방식이라 제작 기간이 짧고 비용이 낮습니다.
              </p>
              <Link
                to="/templates"
                className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                템플릿 {DESIGN_COUNT}종 보기
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="flex flex-col bg-primary/[0.04] p-6 sm:p-8">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-primary">
                Custom
              </p>
              <h3 className="mt-3 text-xl font-bold text-foreground">업무 방식에 맞춰 처음부터</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground break-keep">
                템플릿에 없는 화면과 기능은 기획 단계부터 함께 설계합니다. 관리자 시스템과
                데이터베이스까지 하나로 구축합니다.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild size="sm" className="gap-1.5 font-bold">
                  <Link to="/web-solutions">
                    맞춤 제작 알아보기
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="gap-1.5">
                  <Link to="/contact">
                    <Send className="h-3.5 w-3.5" />
                    구축 문의
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 프리미엄 디자인 미리보기 — 카테고리별 8종, 고르면 실제 구축 화면이 바뀐다 */}
        {active && (
          <div className="mt-14">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-primary">
                  Premium Design
                </p>
                <h3 className="mt-2 text-xl font-bold text-foreground">프리미엄 디자인 미리보기</h3>
              </div>
              <Link
                to="/web-solutions"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                프리미엄 라인 전체 보기
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[250px_1fr]">
              {/* 디자인 선택 — 26종이라 카테고리를 접어 두고 누른 것만 펼친다 */}
              <PremiumCategoryPicker
                groups={PREMIUM_GROUPS}
                activeSlug={activeSlug}
                onSelect={setActiveSlug}
              />

              {/* 선택한 디자인의 실제 구축 화면 */}
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                <Link to={d_href(active.sample.slug)} className="group block">
                  {/* 배지를 사진 위에 얹지 않는다 — 좌상단은 그 사이트의 로고 자리라 가려졌다 */}
                  <div className="overflow-hidden">
                    <img
                      key={activeSlug}
                      src={active.sample.image}
                      alt={`${active.label} 실제 구축 화면`}
                      loading="lazy"
                      className="aspect-[3/2] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300"
                    />
                  </div>
                </Link>

                <div className="flex flex-col gap-5 border-t border-border p-6 sm:flex-row sm:items-start sm:justify-between sm:p-7">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-secondary-foreground">
                        {active.label} · 실제 구축 화면
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {getDesignCode(active.sample)}
                      </span>
                    </div>
                    <h4 className="mt-2.5 text-lg font-bold text-foreground break-keep">
                      {active.sample.title.replace(/\s*\(.*\)$/, "")}
                    </h4>
                    <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground break-keep">
                      {active.sample.idealFor}에 맞춘 구성입니다.
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                      {active.sample.features.slice(0, 4).map((m) => (
                        <li key={m} className="flex items-center gap-1.5 text-xs text-foreground/80">
                          <Check className="h-3 w-3 shrink-0 text-primary" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button asChild className="shrink-0 gap-1.5 font-bold">
                    <Link to={d_href(active.sample.slug)}>
                      상세보기
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function d_href(slug: string) {
  return `/samples/${slug}`;
}
