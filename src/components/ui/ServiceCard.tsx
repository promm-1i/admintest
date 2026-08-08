import { Link } from "react-router-dom";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { cn } from "@/lib/utils";
import type { ProductType } from "@/lib/pricing";

export function ServiceCard({ name, bullets, price, image, tinted }: ProductType & { tinted?: boolean }) {
  return (
    <Link
      to="/contact"
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-md",
        tinted ? "border-transparent bg-secondary/50" : "border-border bg-card",
      )}
    >
      <ImagePlaceholder
        src={image}
        ratio="video"
        label={name}
        className="rounded-none border-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-base font-semibold">{name}</h3>
        <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
          {bullets.map((b) => (
            <li key={b}>· {b}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm font-medium text-primary">{price}</p>
      </div>
    </Link>
  );
}
