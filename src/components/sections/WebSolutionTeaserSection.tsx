import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { INDUSTRY_SHOWCASES } from "@/components/site/industryShowcase";
import { cn } from "@/lib/utils";
import realEstateImg from "@/assets/images/real_estate_platform_thumbnail.jpg";
import rentcarImg from "@/assets/images/rentcar_solution_thumbnail.jpg";
import hospitalImg from "@/assets/images/hospital_solution_thumbnail.jpg";
import academyImg from "@/assets/images/academy_solution_thumbnail.jpg";
import interiorImg from "@/assets/images/interior_solution_thumbnail.jpg";
import movingImg from "@/assets/images/moving_solution_thumbnail.jpg";

/** 업종 key → 우측 프리뷰에 띄우는 실제 구축 화면 */
const INDUSTRY_PREVIEWS: Record<string, string> = {
  "real-estate": realEstateImg,
  rentcar: rentcarImg,
  hospital: hospitalImg,
  academy: academyImg,
  interior: interiorImg,
  moving: movingImg,
};

/**
 * 좌측 업종 리스트에 마우스를 올리면(클릭 · 포커스 동일) 우측 프리뷰가
 * 해당 업종의 실제 구축 화면과 관리 항목으로 바뀐다.
 */
export function WebSolutionTeaserSection() {
  const [activeKey, setActiveKey] = useState(INDUSTRY_SHOWCASES[0]!.key);
  const active = INDUSTRY_SHOWCASES.find((s) => s.key === activeKey) ?? INDUSTRY_SHOWCASES[0]!;

  return (
    <section id="industry-section" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl rounded-3xl border border-border bg-secondary/30 p-8 sm:p-12">
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

        <div className="mt-10 grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* 업종 리스트 — 모바일에서는 가로 스크롤 칩, 데스크톱에서는 세로 목록 */}
          <ul className="flex gap-2 overflow-x-auto pb-1 scrollbar-none lg:flex-col lg:overflow-visible lg:pb-0">
            {INDUSTRY_SHOWCASES.map((industry) => {
              const Icon = industry.icon;
              const isActive = industry.key === activeKey;
              return (
                <li key={industry.key} className="shrink-0 lg:shrink">
                  <button
                    type="button"
                    onMouseEnter={() => setActiveKey(industry.key)}
                    onFocus={() => setActiveKey(industry.key)}
                    onClick={() => setActiveKey(industry.key)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors lg:py-3.5",
                      isActive
                        ? "border-primary/40 bg-card shadow-xs"
                        : "border-transparent text-muted-foreground hover:bg-card/70",
                    )}
                  >
                    <Icon
                      className={cn("h-5 w-5 shrink-0", isActive ? "text-primary" : "text-muted-foreground/60")}
                      strokeWidth={1.5}
                    />
                    <span
                      className={cn(
                        "whitespace-nowrap text-sm font-semibold",
                        isActive ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {industry.name}
                    </span>
                    <ArrowRight
                      className={cn(
                        "ml-auto hidden h-3.5 w-3.5 transition-opacity lg:block",
                        isActive ? "text-primary opacity-100" : "opacity-0",
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* 선택된 업종의 실제 구축 화면 + 문구 */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <Link to={active.solutionHref} className="group block">
              <div className="relative overflow-hidden">
                <img
                  key={active.key}
                  src={INDUSTRY_PREVIEWS[active.key]}
                  alt={`${active.name} 구축 화면`}
                  className="aspect-[16/8] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300"
                />
                <span className="absolute left-4 top-4 rounded-full bg-black/65 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-xs">
                  {active.name} · 실제 구축 화면
                </span>
              </div>
            </Link>

            <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-7">
              <div className="min-w-0">
                <h4 className="text-lg font-bold text-foreground">{active.heroTitle}</h4>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground break-keep">
                  {active.connectionNote}
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                  {active.manageables.slice(0, 4).map((m) => (
                    <li key={m} className="flex items-center gap-1.5 text-xs text-foreground/80">
                      <Check className="h-3 w-3 shrink-0 text-primary" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild className="shrink-0 gap-1.5 font-bold">
                <Link to={active.solutionHref}>
                  상세보기
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
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
