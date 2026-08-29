import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { PlusCircle } from "lucide-react";
import { PRODUCT_TYPES, ADDONS, PRICING_NOTE } from "@/lib/pricing";

export function PricingSection() {
  return (
    <section className="border-y border-border bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeader
          label="TYPE & PRICING"
          title="제작 유형과 가격"
          description="필요한 규모에 맞는 유형을 선택하시면 됩니다. 시작가 기준으로 거품 없이 안내합니다."
        />

        <div className="mt-12 divide-y divide-border rounded-xl border border-border bg-card">
          {PRODUCT_TYPES.map((type, i) => (
            <FadeIn key={type.name} delay={i * 50}>
              <div className="flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-foreground">{type.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground break-keep">{type.desc}</p>
                </div>
                <span className="shrink-0 text-base font-bold text-primary sm:text-lg">{type.price}</span>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={240} className="mt-8 rounded-xl border border-border bg-card p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/60">
            <PlusCircle className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">필요 시 선택 가능한 추가 옵션</h3>
          </div>
          <ul className="grid gap-3 text-xs sm:text-sm text-muted-foreground sm:grid-cols-2">
            {ADDONS.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between gap-4 rounded-lg bg-secondary/40 px-4 py-3 border border-border/40"
              >
                <span className="font-medium text-foreground break-keep">{item.name}</span>
                <span className="shrink-0 font-semibold text-primary">{item.price}</span>
              </li>
            ))}
          </ul>
        </FadeIn>

        <p className="mt-5 text-xs leading-relaxed text-muted-foreground/80 break-keep">※ {PRICING_NOTE}</p>
      </div>
    </section>
  );
}
