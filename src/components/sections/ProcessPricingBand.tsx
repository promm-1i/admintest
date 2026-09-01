import { Link } from "react-router-dom";
import { MessageSquare, PenTool, Code2, Rocket, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { TEMPLATE_PACKAGES, formatMan } from "@/lib/templatePackages";
import { cn } from "@/lib/utils";

/**
 * "어떻게 만들고, 얼마인가"는 한 흐름이라 한 섹션에 둔다.
 * 절차는 순서가 정보이므로 번호를 붙인 가로 타임라인, 가격은 비교가 목적이라 카드로 둔다.
 */
const STEPS = [
  { num: "01", title: "상담", desc: "필요한 페이지, 기능, 예산을 확인합니다.", icon: MessageSquare },
  { num: "02", title: "기획 · 디자인", desc: "메뉴 구조와 디자인 방향을 결정합니다.", icon: PenTool },
  { num: "03", title: "개발", desc: "반응형 화면과 필요한 기능을 구축합니다.", icon: Code2 },
  { num: "04", title: "검수 · 오픈", desc: "PC · 모바일 검수 후 도메인 연결 및 배포합니다.", icon: Rocket },
];

export function ProcessPricingBand() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          label="PROCESS & PRICING"
          title="어떻게 만들고, 얼마인가"
          description="상담부터 오픈까지 네 단계로 진행합니다. 아래 금액에는 호스팅 · 셋팅 · 업종 전용 기능이 모두 포함돼 있습니다."
        />

        {/* 절차 — 선으로 이어진 타임라인. 순서가 실제 정보라서 번호를 쓴다 */}
        <ol className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-5 hidden h-px bg-border lg:block"
          />
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeIn key={s.num} delay={i * 90} className="relative">
                <li className="relative">
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="mt-4 font-mono text-xs font-semibold tracking-widest text-muted-foreground">
                    {s.num}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-foreground">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground break-keep">
                    {s.desc}
                  </p>
                </li>
              </FadeIn>
            );
          })}
        </ol>

        {/* 가격 — 비교가 목적이라 같은 크기 카드가 맞다 */}
        <div className="mt-16 border-t border-border pt-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                        "idle-breath mb-2 inline-block w-fit rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white",
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

          <FadeIn delay={240} className="mt-6">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to="/website/price"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                항목별 상세 비용 비교 보기
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/estimate"
                className="group flex w-full items-center justify-between gap-4 rounded-2xl bg-foreground px-6 py-5 text-background shadow-md transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto sm:min-w-[340px]"
              >
                <span>
                  <span className="block font-mono text-[11px] font-semibold uppercase tracking-widest text-background/60">
                    Estimate
                  </span>
                  <span className="mt-0.5 block text-base font-extrabold">1분 견적 계산기</span>
                  <span className="mt-0.5 block text-xs text-background/60">
                    업종 · 형태만 고르면 예상 비용이 바로
                  </span>
                </span>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </FadeIn>

          <p className="mt-8 text-xs leading-relaxed text-muted-foreground/80 break-keep">
            ※ 모든 금액은 VAT 별도이며, 페이지 수와 추가 기능 범위에 따라 최종 견적은 상담 후
            확정됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}
