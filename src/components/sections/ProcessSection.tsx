import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { MessageSquare, PenTool, Code2, Rocket, ArrowRight } from "lucide-react";

const STEPS = [
  { num: "01", title: "상담", desc: "필요한 페이지, 기능, 예산을 확인합니다.", icon: MessageSquare },
  { num: "02", title: "기획·디자인", desc: "메뉴 구조와 디자인 방향을 결정합니다.", icon: PenTool },
  { num: "03", title: "개발", desc: "반응형 화면과 필요한 기능을 구축합니다.", icon: Code2 },
  { num: "04", title: "검수·오픈", desc: "PC·모바일 검수 후 도메인 연결 및 배포합니다.", icon: Rocket },
];

export function ProcessSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader label="PROCESS" title="제작 절차" align="center" />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => {
            const IconComp = step.icon;
            const isLast = i === STEPS.length - 1;

            return (
              <FadeIn key={step.num} delay={i * 80} className="relative">
                <div className="relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-border bg-card p-6 text-center shadow-xs">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-3 right-2 select-none font-black text-6xl text-secondary/80"
                  >
                    {step.num}
                  </span>
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="relative mt-4 text-base font-bold tracking-tight text-foreground">{step.title}</h3>
                  <p className="relative mt-2 text-xs leading-relaxed text-muted-foreground break-keep">{step.desc}</p>
                </div>

                {!isLast && (
                  <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center text-muted-foreground/50 lg:flex">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
