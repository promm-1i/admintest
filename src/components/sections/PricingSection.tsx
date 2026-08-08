import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { PriceCard } from "@/components/ui/PriceCard";
import { PRICING, ADDONS, PRICING_NOTE } from "@/lib/pricing";

export function PricingSection() {
  return (
    <section className="border-y border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeader label="PRICING" title="가격 안내" description="시작가 기준으로 명확하게 안내드립니다." />

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {PRICING.map((item, i) => (
            <FadeIn key={item.name} delay={i * 80}>
              <PriceCard {...item} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={240} className="mt-6 rounded-2xl border border-border bg-card p-7">
          <p className="mb-4 text-sm font-medium">추가 옵션</p>
          <ul className="grid gap-2.5 text-sm text-muted-foreground sm:grid-cols-2">
            {ADDONS.map((item) => (
              <li key={item.name} className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-2">
                <span>{item.name}</span>
                <span className="shrink-0 font-medium text-foreground">{item.price}</span>
              </li>
            ))}
          </ul>
        </FadeIn>

        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{PRICING_NOTE}</p>
      </div>
    </section>
  );
}
