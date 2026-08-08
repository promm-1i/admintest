import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { PriceCard } from "@/components/ui/PriceCard";
import { PRODUCT_TYPES, PRICING, ADDONS, PRICING_NOTE } from "@/lib/pricing";
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

      <h2 className="mt-12 text-xl font-semibold">제작 유형</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {PRODUCT_TYPES.map((type) => (
          <ServiceCard key={type.name} {...type} />
        ))}
      </div>

      <h2 className="mt-14 text-xl font-semibold">가격 안내</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-3">
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

      <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
        <p className="text-sm text-muted-foreground">어떤 유형이 맞을지 고민되신다면 먼저 문의해 주세요.</p>
        <Button asChild className="mt-4">
          <Link to="/contact">상담 문의하기</Link>
        </Button>
      </div>
    </div>
  );
}
