import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { PRODUCT_TYPES, type ProductType } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import bgTexture from "@/assets/images/bg_texture_1.jpg";

type ServiceTypesSectionProps = {
  selectedType?: string;
  onSelectType?: (filterValue: string) => void;
};

export function ServiceTypesSection({
  selectedType = "all",
  onSelectType,
}: ServiceTypesSectionProps) {
  const [hoveredType, setHoveredType] = useState<ProductType>(PRODUCT_TYPES[0]);

  const activeItem =
    PRODUCT_TYPES.find((pt) => pt.filterValue === selectedType) || hoveredType;

  const handleItemClick = (type: ProductType) => {
    setHoveredType(type);
    if (onSelectType) {
      onSelectType(type.filterValue);
    }
    const target = document.getElementById("portfolio-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="services-section" className="relative border-y border-border bg-background py-20 lg:py-28">
      <SectionBackground
        src={bgTexture}
        opacity={0.1}
        overlayClassName="bg-gradient-to-b from-background/70 via-background/45 to-background/75"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          label="SERVICE"
          title="제작 유형"
          description="필요한 규모와 목적에 맞춰 홈페이지 제작 방식을 선택할 수 있습니다."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Fixed / Active Editorial Preview */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <FadeIn>
              <div className="overflow-hidden rounded-xl border border-border bg-card p-2 shadow-xs transition-all duration-300">
                <div className="relative overflow-hidden rounded-lg bg-muted">
                  <ImagePlaceholder
                    src={activeItem.image}
                    ratio="video"
                    label={activeItem.name}
                    className="rounded-none border-0 transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 rounded bg-background/90 px-2.5 py-1 text-xs font-mono font-medium text-foreground backdrop-blur-xs">
                    TYPE {activeItem.num}
                  </div>
                  <div className="absolute bottom-3 right-3 rounded bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-xs">
                    {activeItem.price}
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="text-lg font-medium text-foreground">{activeItem.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {activeItem.desc}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-border/60">
                    {activeItem.bullets.map((b) => (
                      <span
                        key={b}
                        className="rounded bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleItemClick(activeItem)}
                    className="mt-5 w-full rounded-md border border-primary/30 bg-secondary/50 py-2.5 text-center text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    이 유형의 포트폴리오 보기 ↓
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Numbered Editorial List */}
          <div className="lg:col-span-7 space-y-4">
            {PRODUCT_TYPES.map((type, index) => {
              const isSelected = selectedType === type.filterValue;
              const isHovered = hoveredType.filterValue === type.filterValue;

              return (
                <FadeIn key={type.name} delay={index * 50}>
                  <div
                    onClick={() => handleItemClick(type)}
                    onMouseEnter={() => setHoveredType(type)}
                    className={cn(
                      "group relative cursor-pointer overflow-hidden rounded-xl border p-6 transition-all duration-300",
                      isSelected
                        ? "border-primary bg-card ring-1 ring-primary/20"
                        : isHovered
                          ? "border-border bg-card/80"
                          : "border-border/70 bg-card/40 hover:border-border hover:bg-card/70"
                    )}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-4">
                        <span
                          className={cn(
                            "font-mono text-sm font-medium transition-colors",
                            isSelected ? "text-primary" : "text-muted-foreground"
                          )}
                        >
                          {type.num}
                        </span>
                        <h3
                          className={cn(
                            "text-base font-medium transition-colors",
                            isSelected ? "text-foreground font-semibold" : "text-foreground/90 group-hover:text-foreground"
                          )}
                        >
                          {type.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3 self-start sm:self-auto">
                        <span
                          className={cn(
                            "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                            isSelected
                              ? "bg-primary/10 text-primary"
                              : "bg-secondary text-secondary-foreground"
                          )}
                        >
                          {type.price}
                        </span>
                        <span
                          className={cn(
                            "text-sm font-medium transition-transform duration-300 group-hover:translate-x-1",
                            isSelected ? "text-primary" : "text-muted-foreground"
                          )}
                        >
                          →
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground pl-9 sm:pl-10">
                      {type.desc}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2 pl-9 sm:pl-10">
                      {type.bullets.map((b) => (
                        <span key={b} className="text-xs text-muted-foreground/80">
                          · {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
