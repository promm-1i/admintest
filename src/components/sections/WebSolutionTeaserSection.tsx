import { Link } from "react-router-dom";
import { ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { INDUSTRY_SHOWCASES } from "@/components/site/industryShowcase";

export function WebSolutionTeaserSection() {
  return (
    <section id="industry-section" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-secondary/30 p-8 sm:p-12">
        <SectionHeader
          label="CUSTOM BY INDUSTRY"
          title={
            <>
              업종에 맞게 바로 쓰는
              <br />
              맞춤형 웹솔루션
            </>
          }
          description={
            <>
              렌트카, 부동산처럼 고객 문의와 관리 기능이 중요한 업종에 맞춰 홈페이지와
              <br />
              관리자 시스템을 함께 구축합니다.
            </>
          }
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRY_SHOWCASES.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <FadeIn key={industry.key} delay={i * 60}>
                <Link
                  to={industry.solutionHref}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-md"
                >
                  <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-[100%] bg-primary/5 transition-transform duration-300 group-hover:scale-150" />
                  <Icon className="relative h-6 w-6 text-primary" strokeWidth={1.5} />
                  <h4 className="relative mt-3 text-sm font-semibold text-foreground">{industry.name}</h4>
                  <p className="relative mt-1.5 text-xs leading-relaxed text-muted-foreground break-keep">
                    {industry.cardTagline}
                  </p>
                  <span className="relative mt-auto flex items-center gap-1 pt-4 text-xs font-medium text-primary">
                    상세보기
                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        <div className="mt-9 flex flex-wrap gap-3">
          <Button asChild className="gap-1.5 font-bold">
            <Link to="/web-solutions">
              기능 및 요금 보기
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-1.5">
            <Link to="/contact">
              <Send className="h-3.5 w-3.5" />
              구축 문의하기
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
