import { Link } from "react-router-dom";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { cn } from "@/lib/utils";
import type { Sample } from "@/lib/samples";

export function PortfolioCard({ sample, size = "normal" }: { sample: Sample; size?: "large" | "normal" }) {
  return (
    <Link
      to={`/samples/${sample.slug}`}
      className={cn(
        "group block overflow-hidden rounded-2xl border border-border bg-card",
        size === "large" && "sm:col-span-2",
      )}
    >
      <div className="overflow-hidden">
        <ImagePlaceholder
          src={sample.image}
          ratio={size === "large" ? "wide" : "video"}
          label={sample.industry}
          className="rounded-none border-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-6">
        <p className="text-xs font-medium tracking-wide text-primary">{sample.industry}</p>
        <h3 className="mt-2 font-medium">{sample.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sample.purpose}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {sample.features.slice(0, 3).map((f) => (
            <li key={f} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
              {f}
            </li>
          ))}
        </ul>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
          샘플 보기
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </Link>
  );
}
