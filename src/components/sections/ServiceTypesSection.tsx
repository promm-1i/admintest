import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { PRODUCT_TYPES } from "@/lib/pricing";

export function ServiceTypesSection() {
  return (
    <section className="border-y border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeader
          label="SERVICE"
          title="제작 유형"
          description="필요한 규모에 맞춰 골라서 시작하실 수 있습니다."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_TYPES.map((type, i) => (
            <FadeIn key={type.name} delay={i * 60} className={i === 0 ? "lg:col-span-2" : undefined}>
              <ServiceCard {...type} tinted={i % 2 === 1} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
