import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { PriceCard } from "@/components/ui/PriceCard";
import { Check } from "lucide-react";
import { PRODUCT_TYPES, PRICING, ADDONS, PRICING_NOTE, BENEFITS } from "@/lib/pricing";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function Services() {
  usePageTitle(
    "제작 상품 및 가격 안내 — MintCL",
    "민트클 홈페이지 제작 상품 구성과 가격을 안내합니다.",
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-3xl font-semibold">제작 상품 및 가격 안내</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        필요한 규모에 맞는 상품을 선택하시면 됩니다. 정확한 견적은 페이지 수와 기능에 따라 상담 후
        안내드립니다.
      </p>

      <h2 id="types" className="mt-12 text-xl font-semibold scroll-mt-24">제작 유형</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCT_TYPES.map((type) => (
          <ServiceCard key={type.name} {...type} />
        ))}
      </div>

      <h2 id="pricing" className="mt-14 text-xl font-semibold scroll-mt-24">가격 안내</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PRICING.map((item) => (
          <PriceCard key={item.name} {...item} />
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-border bg-card p-6">
        <p className="mb-3 text-sm font-medium">추가 옵션</p>
        <ul className="grid gap-2.5 text-sm text-muted-foreground sm:grid-cols-2">
          {ADDONS.map((item) => (
            <li key={item.name} className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-2">
              <span>{item.name}</span>
              <span className="shrink-0 font-medium text-foreground">{item.price}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">{PRICING_NOTE}</p>

      <h2 id="features" className="mt-14 text-xl font-semibold scroll-mt-24">기본 제공 기능</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
        모든 홈페이지 제작에 기본으로 포함되는 기능입니다.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {BENEFITS.map((b) => (
          <li
            key={b}
            className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground"
          >
            <Check className="size-4 shrink-0 text-primary" />
            {b}
          </li>
        ))}
      </ul>

      <h2 id="maintenance" className="mt-14 text-xl font-semibold scroll-mt-24">유지보수</h2>
      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <p className="text-sm leading-relaxed text-muted-foreground break-keep">
          제작 완료 후에도 문구 수정, 이미지 교체 등 간단한 요청은 상담을 통해 도와드립니다.
          업종별 맞춤 홈페이지(스타터/프로)는 월 3회 간단 수정을 기본으로 제공합니다. 그 외
          유지보수 범위와 방법은 제작 상담 시 함께 안내드립니다.
        </p>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
        <p className="text-sm text-muted-foreground">어떤 유형이 맞을지 고민되신다면 먼저 문의해 주세요.</p>
        <Button asChild className="mt-4">
          <Link to="/contact">상담 문의하기</Link>
        </Button>
      </div>
    </div>
  );
}
