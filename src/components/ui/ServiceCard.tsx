import { Link } from "react-router-dom";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { cn } from "@/lib/utils";
import type { ProductType } from "@/lib/pricing";

export function ServiceCard({
  num,
  name,
  bullets,
  price,
  image,
  tinted,
}: ProductType & { tinted?: boolean }) {
  return (
    <Link
      to="/contact"
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:border-primary/60 hover:bg-card",
        tinted ? "border-transparent bg-secondary/60" : "border-border bg-card",
      )}
    >
      <div className="relative overflow-hidden bg-muted/30">
        <ImagePlaceholder
          src={image}
          ratio="video"
          label={name}
          className="rounded-none border-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        {num && (
          <span className="absolute top-3 left-3 rounded bg-background/90 px-2 py-0.5 text-xs font-mono font-medium text-foreground backdrop-blur-xs">
            {num}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>

        <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground flex-1">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-primary/60 shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-medium text-primary">
          <span>{price}</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}
