import { Link } from "react-router-dom";
import { ExternalLink, ShieldCheck, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { INDUSTRY_SHOWCASES } from "@/components/site/industryShowcase";

export default function DemoHub() {
  usePageTitle(
    "업종별 데모 — MintCL",
    "업종에 맞게 설계된 MintCL 웹 솔루션을 직접 확인해보세요. 고객 홈페이지부터 관리자 시스템까지 실제 동작하는 인터랙티브 데모를 제공합니다.",
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="text-center">
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
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRY_SHOWCASES.map((industry) => {
          const Icon = industry.icon;
          return (
            <div
              key={industry.key}
              className="flex flex-col rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <Link
                to={industry.solutionHref}
                className="mt-4 text-base font-semibold text-foreground hover:underline"
              >
                {industry.cardTitle}
              </Link>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground break-keep">
                {industry.cardTagline}
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
            </div>
          );
        })}
      </div>

      <div className="mt-14 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
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
      </div>
    </div>
  );
}
