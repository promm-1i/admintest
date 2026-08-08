import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { PROCESS_STEPS } from "@/lib/pricing";

export function ProcessSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20 lg:py-28">
      <SectionHeader
        label="HOW MINTCL WORKS"
        title="홈페이지 제작 절차"
        description="복잡하지 않은 6단계 과정으로 체계적이고 신속하게 진행됩니다."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROCESS_STEPS.map((s, i) => (
          <FadeIn key={s.step} delay={i * 60}>
            <div className="group relative h-full rounded-xl border border-border bg-card p-6 shadow-xs transition-all duration-300 hover:border-primary/50 hover:shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <span className="font-mono text-2xl font-bold tracking-tight text-primary">
                  {s.step}
                </span>
                <span className="rounded bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-secondary-foreground">
                  STEP {s.step}
                </span>
              </div>

              <h3 className="mt-4 text-base font-semibold text-foreground break-keep">
                {s.title}
              </h3>

              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground break-keep">
                {s.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

