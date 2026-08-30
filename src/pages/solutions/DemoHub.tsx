import { Link } from "react-router-dom";
import { ExternalLink, ShieldCheck, Globe, Paintbrush, LayoutTemplate, Puzzle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { FadeIn } from "@/components/ui/FadeIn";
import { INDUSTRY_SHOWCASES } from "@/components/site/industryShowcase";

/** 데모는 기능 시연용이고, 실제 납품물은 업체별 맞춤 제작이라는 점을 앞세운다 */
const CUSTOM_POINTS = [
  {
    icon: Paintbrush,
    title: "디자인 전부 맞춤",
    desc: "데모의 화면은 기능 시연용 예시입니다. 실제 제작 시 색상 · 폰트 · 레이아웃을 업체 브랜드에 맞춰 새로 디자인합니다.",
  },
  {
    icon: LayoutTemplate,
    title: "화면 구성도 맞춤",
    desc: "메뉴 구조, 섹션 배치, 노출 항목을 업체의 영업 방식에 맞게 처음부터 설계합니다.",
  },
  {
    icon: Puzzle,
    title: "기능 추가 · 변경 가능",
    desc: "데모에 없는 기능도 필요하면 추가하고, 불필요한 기능은 뺄 수 있습니다. 업종이 달라도 같은 방식으로 구축합니다.",
  },
];

export default function DemoHub() {
  usePageTitle(
    "업종별 데모 — NOVERIQ",
    "업종에 맞게 설계된 NOVERIQ 웹 솔루션을 직접 확인해보세요. 고객 홈페이지부터 관리자 시스템까지 실제 동작하는 인터랙티브 데모를 제공합니다.",
  );

  return (
    <div className="mx-auto max-w-7xl px-3 py-14 sm:px-5">
      <FadeIn className="text-center">
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
          INTERACTIVE DEMO
        </p>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
          업종에 맞게 설계된
          <br />
          웹 솔루션을 직접 확인해보세요
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground break-keep">
          고객 홈페이지부터 관리자 시스템까지, 실제 동작하는 인터랙티브 데모를 제공합니다.
        </p>
      </FadeIn>

      {/* 맞춤형 안내 — 데모 화면이 곧 최종 디자인이라는 오해를 막는다 */}
      <FadeIn delay={100} className="mt-10 rounded-2xl border border-primary/30 bg-primary/[0.04] p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-base font-bold text-foreground sm:text-lg">
            고객 홈페이지는 <span className="text-primary">맞춤형 개발</span>이라 모두 커스텀할 수 있습니다.
          </p>
          <p className="text-xs text-muted-foreground">데모 화면은 기능 확인용 예시 구성입니다.</p>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {CUSTOM_POINTS.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-foreground">{p.title}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground break-keep">
                    {p.desc}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </FadeIn>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRY_SHOWCASES.map((industry, idx) => {
          const Icon = industry.icon;
          return (
            <FadeIn
              key={industry.key}
              delay={(idx % 3) * 80}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 motion-safe:hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <Link
                    to={industry.solutionHref}
                    className="text-base font-bold text-foreground hover:underline"
                  >
                    {industry.cardTitle}
                  </Link>
                  <p className="text-[11px] text-muted-foreground">{industry.cardTagline}</p>
                </div>
              </div>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {industry.features.slice(0, 4).map((f) => {
                  const FIcon = f.icon;
                  return (
                    <li
                      key={f.label}
                      className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/40 px-2.5 py-1 text-[11px] font-medium text-foreground/80"
                    >
                      <FIcon className="h-3 w-3 text-primary/70" />
                      {f.label}
                    </li>
                  );
                })}
              </ul>

              <p className="mt-4 border-t border-border/60 pt-3 text-xs leading-relaxed text-muted-foreground break-keep">
                {industry.connectionNote}
              </p>

              <div className="mt-5 flex flex-1 flex-col justify-end gap-2">
                <Button asChild size="sm" className="gap-1.5 font-bold">
                  <a href={industry.adminHref} target="_blank" rel="noopener noreferrer">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    관리자 데모
                    <ExternalLink className="ml-auto h-3.5 w-3.5" />
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline" className="gap-1.5 font-bold">
                  <a href={industry.siteHref} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-3.5 w-3.5" />
                    고객 화면
                    <ExternalLink className="ml-auto h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </FadeIn>
          );
        })}
      </div>

      <FadeIn className="mt-14 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
        <p className="text-sm text-muted-foreground">
          원하는 업종이 목록에 없거나, 다른 방식의 맞춤 기능이 필요하신가요?
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button asChild variant="outline">
            <Link to="/web-solutions">요금 확인하기</Link>
          </Button>
          <Button asChild className="font-bold">
            <Link to="/contact">구축 문의하기</Link>
          </Button>
        </div>
      </FadeIn>
    </div>
  );
}
