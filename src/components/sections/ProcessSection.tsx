import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { PROCESS_STEPS } from "@/lib/pricing";

export function ProcessSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeader label="HOW MINTCL WORKS" title="제작 절차" />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROCESS_STEPS.map((s, i) => (
          <FadeIn key={s.step} delay={i * 70}>
            <div className="h-full rounded-2xl border border-border bg-card p-7">
              <p className="text-3xl font-semibold tracking-tight text-primary/70">{s.step}</p>
              <p className="mt-3 font-medium">{s.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
