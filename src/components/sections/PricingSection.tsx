import { Link } from "react-router-dom";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ArrowRight } from "lucide-react";
import { TEMPLATE_PACKAGES, formatMan } from "@/lib/templatePackages";
import { cn } from "@/lib/utils";

export function PricingSection() {
  return (
    <section className="border-y border-border bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeader
          label="TYPE & PRICING"
          title="제작 유형과 가격"
          description="호스팅·셋팅·업종 전용 기능이 모두 포함된 금액입니다. 필요한 구성에 맞춰 선택하시면 됩니다."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEMPLATE_PACKAGES.map((p, i) => (
            <FadeIn key={p.key} delay={i * 60} className="h-full">
              <div
                className={cn(
                  "flex h-full flex-col rounded-xl border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm",
                  p.badgeTone === "recommended"
                    ? "border-primary/40"
                    : "border-border hover:border-primary/30",
                )}
              >
                {p.badge ? (
                  <span
                    className={cn(
                      "mb-2 inline-block w-fit rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white",
                      p.badgeTone === "recommended" ? "bg-primary" : "bg-emerald-500",
                    )}
                  >
                    {p.badge}
                  </span>
                ) : (
                  <span className="mb-2 h-[18px]" />
                )}
                <h3 className="text-base font-bold text-foreground">{p.label}</h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground break-keep">
                  {p.desc}
                </p>
                <p className="mt-4 text-xl font-black tracking-tight text-primary">
                  {formatMan(p.total)}
                  <span className="ml-0.5 text-sm font-bold text-muted-foreground">~</span>
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={260} className="mt-5 flex justify-center">
          <Link
            to="/website/price"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            항목별 상세 비용 비교 보기
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            to="/estimate"
            className="group flex w-full items-center justify-between gap-4 rounded-2xl bg-foreground px-6 py-5 text-background shadow-md transition-transform hover:-translate-y-0.5 sm:w-auto sm:min-w-[340px]"
          >
            <span>
              <span className="block text-[11px] font-mono font-semibold uppercase tracking-widest text-background/60">Estimate</span>
              <span className="mt-0.5 block text-base font-extrabold">1분 견적 계산기</span>
              <span className="mt-0.5 block text-xs text-background/60">업종 · 형태만 고르면 예상 비용이 바로</span>
            </span>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </FadeIn>

        <p className="mt-8 text-xs leading-relaxed text-muted-foreground/80 break-keep">
          ※ 모든 금액은 VAT 별도이며, 페이지 수와 추가 기능 범위에 따라 최종 견적은 상담 후 확정됩니다.
        </p>
      </div>
    </section>
  );
}
