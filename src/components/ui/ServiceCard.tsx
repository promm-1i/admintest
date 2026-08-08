import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductType } from "@/lib/pricing";

export function ServiceCard({
  name,
  desc,
  bullets,
  price,
  tinted,
}: ProductType & { tinted?: boolean }) {
  return (
    <Link
      to="/contact"
      className={cn(
        "group flex flex-col justify-between rounded-2xl border p-7 transition-all hover:-translate-y-1 hover:shadow-md",
        tinted ? "border-transparent bg-secondary/50" : "border-border bg-card",
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold">{name}</h3>
          <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {bullets.map((b) => (
            <li key={b} className="rounded-full bg-background px-2.5 py-1 text-xs text-muted-foreground">
              {b}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-6 text-sm font-medium text-primary">{price}</p>
    </Link>
  );
}
