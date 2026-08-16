import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { PriceCard } from "@/components/ui/PriceCard";
import { SectionPhoto } from "@/components/ui/SectionPhoto";
import { PRICING, ADDONS, PRICING_NOTE } from "@/lib/pricing";
import { PlusCircle } from "lucide-react";
import photo from "@/assets/images/01_hero_imac.jpg";

export function PricingSection() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-secondary/30 py-20 lg:py-28">
      <SectionPhoto src={photo} className="-right-16 -top-16 h-72 w-72" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          label="PRICING"
          title="투명한 가격 안내"
          description="시작가 기준으로 거품 없이 명확한 가격 정책을 제공합니다."
        />

        <div className="mt-12 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING.map((item, i) => (
            <FadeIn key={item.name} delay={i * 80} className="h-full">
              <PriceCard {...item} />
            </FadeIn>
          ))}
        </div>

        {/* Addons Box */}
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

        <p className="mt-5 text-xs leading-relaxed text-muted-foreground/80 break-keep">
          ※ {PRICING_NOTE}
        </p>
      </div>
    </section>
  );
}

