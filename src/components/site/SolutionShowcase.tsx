import { Link } from "react-router-dom";
import { Send, ExternalLink, ShieldCheck, Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { DashboardPreview } from "./DashboardPreview";
import { CustomerSitePreview } from "./CustomerSitePreview";
import { ConnectionFlow } from "./ConnectionFlow";
import type { IndustryShowcase } from "./industryShowcase";
import { Reveal, RevealScale } from "@/pages/services/previewKit";
import { FadeIn } from "@/components/ui/FadeIn";

export function SolutionShowcase({ industry }: { industry: IndustryShowcase }) {
  usePageTitle(
    `${industry.heroTitle} — NOVERIQ`,
    industry.heroDesc,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <Reveal>
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
          CUSTOM BY INDUSTRY
        </p>
        <h1 className="mt-3 text-3xl font-semibold">{industry.heroTitle}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
          {industry.heroDesc}
        </p>
      </Reveal>

      <Reveal delay={100} className="mt-6 flex flex-wrap gap-3">
        <Button asChild variant="outline" className="gap-1.5 font-bold">
          <a href={industry.siteHref} target="_blank" rel="noopener noreferrer">
            <Globe className="h-3.5 w-3.5" />
            고객 홈페이지 보기
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
        <Button asChild className="gap-1.5 font-bold">
          <a href={industry.adminHref} target="_blank" rel="noopener noreferrer">
            <ShieldCheck className="h-3.5 w-3.5" />
            관리자 데모 보기
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </Reveal>

      <h2 className="mt-14 text-xl font-semibold">이 솔루션으로 관리할 수 있는 것</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {industry.manageables.map((m, i) => (
          <FadeIn key={m} direction="left" delay={i * 70}>
            <li className="flex items-start gap-2.5 text-sm text-foreground break-keep">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {m}
            </li>
          </FadeIn>
        ))}
      </ul>

      <h2 className="mt-14 text-xl font-semibold">핵심 기능</h2>
      <ul className="mt-5 grid gap-x-8 gap-y-3 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-3">
        {industry.features.map((f, i) => {
          const Icon = f.icon;
          return (
            <FadeIn key={f.label} direction="up" delay={i * 60}>
              <li className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                <Icon className="h-4 w-4 shrink-0 text-primary" />
                {f.label}
              </li>
            </FadeIn>
          );
        })}
      </ul>

      <Reveal className="mt-14">
        <h2 className="text-xl font-semibold">관리자 화면</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
          업종에 맞는 데이터를 한 화면에서 관리합니다. 실제 관리자 데모는 새 탭에서 전체 화면으로 열립니다.
        </p>
      </Reveal>
      <RevealScale className="mt-5">
        <DashboardPreview stats={industry.previewStats} menuIcons={industry.features} />
      </RevealScale>
      <div className="mt-5">
        <Button asChild className="gap-1.5 font-bold">
          <a href={industry.adminHref} target="_blank" rel="noopener noreferrer">
            <ShieldCheck className="h-3.5 w-3.5" />
            전체 관리자 데모 열기
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </div>

      <Reveal className="mt-14">
        <h2 className="text-xl font-semibold">고객 홈페이지</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
          관리자가 등록·공개한 내용이 그대로 노출되는 고객용 홈페이지입니다.
        </p>
      </Reveal>
      <RevealScale className="mt-5" delay={80}>
        <CustomerSitePreview />
      </RevealScale>
      <div className="mt-5">
        <Button asChild variant="outline" className="gap-1.5 font-bold">
          <a href={industry.siteHref} target="_blank" rel="noopener noreferrer">
            <Globe className="h-3.5 w-3.5" />
            고객 홈페이지 열기
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </div>

      <h2 className="mt-14 text-xl font-semibold">관리자와 고객 홈페이지가 하나로 연결됩니다</h2>
      <Reveal className="mt-5">
        <ConnectionFlow note={industry.connectionNote} />
      </Reveal>

      <Reveal className="mt-14 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
        <p className="text-sm font-medium text-foreground">
          업종과 업무 방식에 맞춰 기능·디자인·관리자 시스템을 커스터마이징할 수 있습니다.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          구축비와 월 이용료 등 자세한 요금은 업종별 맞춤 홈페이지 요금 페이지에서 확인하실 수 있습니다.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button asChild variant="outline">
            <Link to="/web-solutions">요금 확인하기</Link>
          </Button>
          <Button asChild className="gap-1.5 font-bold">
            <Link to="/contact">
              <Send className="h-3.5 w-3.5" />
              구축 문의하기
            </Link>
          </Button>
        </div>
      </Reveal>
    </div>
  );
}
