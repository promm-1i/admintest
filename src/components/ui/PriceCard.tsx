import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PriceItem } from "@/lib/pricing";

export function PriceCard({ name, price, features, recommended }: PriceItem) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border bg-card p-7 transition-shadow hover:shadow-md",
        recommended ? "border-primary/50 shadow-sm shadow-primary/10" : "border-border",
      )}
    >
      {recommended && (
        <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          추천
        </span>
      )}
      <p className="text-sm text-muted-foreground">{name}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{price}</p>
      {features.length > 0 && (
        <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}
      <Button asChild variant={recommended ? "default" : "outline"} className="mt-7 w-full">
        <Link to="/contact">이 유형 상담하기</Link>
      </Button>
    </div>
  );
}
