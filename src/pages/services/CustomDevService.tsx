import { Link } from "react-router-dom";
import {
  Send,
  ArrowRight,
  Wrench,
  Check,
  MessagesSquare,
  DraftingCompass,
  Code2,
  Rocket,
  MonitorPlay,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { CUSTOM_SERVICES } from "@/components/site/customServices";
import { Reveal, NextStepsSection } from "@/pages/services/previewKit";
import { FadeIn } from "@/components/ui/FadeIn";
import { CustomBuildPreviewSection } from "@/components/sections/CustomBuildPreviewSection";
import { TemplatePickVisual, CustomBuildVisual } from "@/components/sections/CompareVisuals";

/** 템플릿형과 커스텀 개발의 차이 */
const COMPARE = [
  {
    name: "템플릿형",
    desc: "이미 만들어 둔 디자인에 문구와 이미지를 적용해 빠르고 합리적으로 시작합니다.",
    points: ["완성된 디자인에서 선택", "빠른 제작 기간", "합리적인 시작 비용"],
    href: "/templates",
    linkLabel: "템플릿 보기",
  },
  {
    name: "커스텀 개발",
    desc: "업종의 업무 방식에 맞춰 화면 구성과 기능을 처음부터 설계합니다. 관리자 시스템과 데이터베이스까지 함께 구축합니다.",
    points: ["화면 · 기능을 처음부터 설계", "관리자 · DB · 업무 흐름 포함", "운영하면서 계속 확장 가능"],
    href: "/web-solutions",
    linkLabel: "업종별 솔루션 보기",
    highlight: true,
  },
];

/** 진행 절차 — 실제 상담 → 오픈 흐름 그대로 */
const STEPS = [
  { no: "01", icon: MessagesSquare, title: "상담 · 요구 정리", desc: "업종과 업무 방식, 필요한 기능을 함께 정리합니다." },
  { no: "02", icon: DraftingCompass, title: "구조 설계", desc: "화면 구성과 데이터 구조, 관리자 범위를 설계해 확인받습니다." },
  { no: "03", icon: Code2, title: "개발 · 검수", desc: "실제 화면으로 만들며 중간중간 함께 확인하고 다듬습니다." },
  { no: "04", icon: Rocket, title: "오픈 · 운영", desc: "도메인 연결 후 오픈하고, 관리자 모드로 직접 운영합니다." },
];

/** 비용이 정해지는 기준 — 견적 요인 (금액을 단정하지 않는다) */
const COST_FACTORS = [
  "만들어야 하는 화면(페이지)의 수",
  "관리자에서 다뤄야 하는 업무 범위",
  "저장 · 검색해야 하는 데이터의 종류와 양",
  "예약 · 결제 · 회원 같은 실시간 기능 여부",
  "외부 서비스(지도 · 문자 · API) 연동 범위",
  "준비된 자료(문구 · 사진)의 정리 정도",
];

export default function CustomDevService() {
  usePageTitle(
    "커스텀 개발 안내 — NOVERIQ",
    "템플릿이 아니라 업종의 업무 방식에 맞춰 화면과 기능을 처음부터 설계하는 커스텀 개발의 진행 절차와 비용 기준을 안내합니다.",
  );

  return (
    <div>
      {/* 히어로 */}
      <div className="mx-auto max-w-4xl px-4 pb-4 pt-14 text-center sm:pt-20">
        <p className="mx-auto flex w-fit items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
          <Wrench className="h-3.5 w-3.5" />
          CUSTOM SERVICE — 커스텀 개발
        </p>
        <h1 className="mx-auto mt-4 max-w-lg text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          커스텀 개발이란?
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted-foreground break-keep">
          정해진 템플릿을 고르는 것이 아니라, 업종의 업무 방식에 맞춰 화면 구성과 기능을 처음부터
          설계하는 방식입니다. 홈페이지와 관리자 시스템, 데이터베이스까지 하나로 구축합니다.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="gap-2 font-bold">
            <Link to="/contact">
              <Send className="h-4 w-4" />
              구축 상담하기
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="gap-1.5 text-primary hover:bg-primary/5">
            <a href="#how">
              커스텀 개발 방식 보기
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>

      {/* 템플릿형과 무엇이 다른가 */}
      <div className="py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
              템플릿형과의 차이
            </p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">고르는 것과 설계하는 것</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {COMPARE.map((c, i) => (
              <FadeIn key={c.name} direction="up" delay={i * 120}>
                <div
                  className={`flex h-full flex-col rounded-2xl border p-6 ${
                    c.highlight ? "border-primary/40 bg-primary/[0.04]" : "border-border bg-card"
                  }`}
                >
                  {c.highlight ? <CustomBuildVisual /> : <TemplatePickVisual />}
                  <p className={`text-sm font-bold ${c.highlight ? "text-primary" : "text-muted-foreground"}`}>
                    {c.name}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground break-keep">{c.desc}</p>
                  <ul className="mt-4 space-y-2 border-t border-border/60 pt-4">
                    {c.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground break-keep">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={c.href}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    {c.linkLabel}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* 커스텀 개발에서 실제로 일어나는 일 — hover 미리보기 */}
      <CustomBuildPreviewSection />

      {/* 기능별 개발 */}
      <div className="border-b border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">기능별 개발</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">필요한 기능만 골라서 구축할 수도 있습니다</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground break-keep">
              전체를 새로 만들지 않아도 됩니다. 아래 기능들은 각각 독립적으로 구축할 수 있고, 어떤
              것까지 가능한지 기능별 안내 페이지에서 실제 화면과 함께 확인하실 수 있습니다.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CUSTOM_SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <FadeIn key={s.slug} direction="up" delay={(i % 3) * 80}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="group flex h-full flex-col rounded-xl border border-border bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-sm"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </span>
                    <h3 className="mt-3 text-base font-bold text-foreground group-hover:text-primary">
                      {s.navLabel}
                    </h3>
                    <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground break-keep">
                      {s.tagline}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      자세히 보기
                      <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>

      {/* 진행 절차 */}
      <div className="py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">진행 절차</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">상담부터 오픈까지, 4단계</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <FadeIn key={s.no} direction="up" delay={i * 110}>
                  <div className="h-full rounded-xl border border-border bg-card p-5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </span>
                      <span className="font-mono text-xl font-bold text-primary/25">{s.no}</span>
                    </div>
                    <h3 className="mt-3 text-sm font-bold text-foreground">{s.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground break-keep">{s.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>

      {/* 비용이 정해지는 기준 */}
      <div className="border-y border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">비용 기준</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">비용은 이렇게 정해집니다</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground break-keep">
              커스텀 개발은 정찰가가 아니라, 아래 기준에 따라 상담 후 견적이 확정됩니다. 디자인비만이
              아니라 관리자 기능과 데이터 처리 범위가 가격의 대부분을 결정합니다.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {COST_FACTORS.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-foreground break-keep">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={160} className="mt-8 flex flex-col gap-3 rounded-xl border border-border bg-card px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-foreground break-keep">
              업종별 맞춤 구축은 <strong className="font-bold text-primary">150만 원부터</strong> 시작하며,
              반응형 제작과 관리자 시스템이 기본으로 포함됩니다.
            </p>
            <Button asChild variant="outline" className="shrink-0 gap-1.5">
              <Link to="/web-solutions">
                요금 자세히 보기
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>

      {/* 업종별 솔루션 · 데모 */}
      <div className="py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
              직접 확인해 보세요
            </p>
            <h2 className="mt-3 text-3xl font-bold text-foreground break-keep">
              이렇게 설계한 결과물을 그대로 열어 보실 수 있습니다
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground break-keep">
              부동산 · 렌트카 · 병원 등 업종별로 이미 이런 방식으로 구축해 둔 관리자 시스템과 고객
              홈페이지가 있습니다. 설명 대신 실제 화면으로 확인해 보세요.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <FadeIn direction="up">
              <Link
                to="/web-solutions"
                className="group flex h-full items-start gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-sm"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </span>
                <span>
                  <span className="block text-base font-bold text-foreground group-hover:text-primary">
                    업종별 솔루션 안내
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground break-keep">
                    업종별 구축 범위와 프리미엄 라인 요금을 확인합니다.
                  </span>
                </span>
              </Link>
            </FadeIn>
            <FadeIn direction="up" delay={110}>
              <Link
                to="/web-solutions/demos"
                className="group flex h-full items-start gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-sm"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MonitorPlay className="h-5 w-5 text-primary" />
                </span>
                <span>
                  <span className="block text-base font-bold text-foreground group-hover:text-primary">
                    실제 구현 예시 보기
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground break-keep">
                    구축해 둔 관리자 모드와 고객 홈페이지를 직접 조작해 봅니다.
                  </span>
                </span>
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* 다른 맞춤형 서비스 + 상담 CTA */}
      <NextStepsSection
        otherServices={CUSTOM_SERVICES.map((s) => ({ slug: s.slug, navLabel: s.navLabel }))}
        ctaTitle="어떤 기능이 필요한지부터 함께 정리해 드립니다"
        ctaDesc="업종과 지금의 업무 방식만 알려주세요. 필요한 화면과 기능 구성을 상담에서 함께 설계합니다."
      />
    </div>
  );
}
