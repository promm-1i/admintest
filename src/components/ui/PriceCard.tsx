import { Link } from "react-router-dom";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PriceItem } from "@/lib/pricing";

export function PriceCard({ name, price, features, recommended, compareNote }: PriceItem) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col justify-between rounded-2xl border bg-card p-7 transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:border-primary hover:ring-2 hover:ring-primary/20 hover:shadow-2xl z-0 hover:z-10",
        recommended
          ? "border-primary/60 shadow-md shadow-primary/10 bg-gradient-to-b from-card via-card to-primary/5"
          : "border-border shadow-xs",
      )}
    >
      <div>
        {recommended && (
          <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
            추천
          </span>
        )}
        <p className="text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors">
          {name}
        </p>
        <p className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {price}
        </p>
        {compareNote && (
          <p className="mt-2 text-xs leading-relaxed text-primary/80 break-keep">{compareNote}</p>
        )}
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
      </div>

      <Button asChild variant={recommended ? "default" : "outline"} className="mt-7 w-full font-bold shadow-xs">
        <Link to="/contact" className="inline-flex items-center justify-center gap-1.5">
          <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          이 유형 상담하기
        </Link>
      </Button>
    </div>
  );
}

