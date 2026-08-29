import { Link } from "react-router-dom";
import { ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { WEB_SOLUTION_CATEGORIES } from "@/components/site/WebSolutionMegaMenu";

const SOLUTION_CATEGORIES = WEB_SOLUTION_CATEGORIES.filter((item) => item.href?.startsWith("/web-solutions/"));

export function WebSolutionTeaserSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-secondary/30 p-8 sm:p-12">
        <SectionHeader
          label="CUSTOM BY INDUSTRY"
          title={
            <>
              업종에 맞게 바로 쓰는
              <br />
              맞춤형 홈페이지
            </>
          }
          description={
            <>
              관리자 시스템, 데이터베이스, 검색, 예약 등 업종마다 필요한 기능까지 갖춘
              <br />
              맞춤형 홈페이지를 구축합니다.
            </>
          }
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {SOLUTION_CATEGORIES.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={i * 60}>
                <Link
                  to={item.href!}
                  className="group flex h-full flex-col items-start gap-3 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-xs"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground break-keep">{item.title}</h4>
                  <p className="text-xs leading-relaxed text-muted-foreground break-keep">{item.desc}</p>
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
