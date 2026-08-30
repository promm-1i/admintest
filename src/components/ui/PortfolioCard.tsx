import { Link } from "react-router-dom";
import { PortfolioThumbnail } from "@/components/ui/PortfolioThumbnail";
import { cn } from "@/lib/utils";
import type { Sample } from "@/lib/samples";

export function PortfolioCard({
  sample,
  size = "normal",
}: {
  sample: Sample;
  size?: "large" | "normal";
}) {
  return (
    <Link
      to={`/samples/${sample.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-sm",
        size === "large" && "md:col-span-2",
      )}
    >
      <div className="relative overflow-hidden bg-muted/40 shrink-0">
        <PortfolioThumbnail
          src={sample.image}
          liveUrl={sample.liveUrl}
          ratio={size === "large" ? "wide" : "video"}
          label={sample.industry}
          className="rounded-none border-0"
        />
      </div>

      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center justify-between gap-2 shrink-0">
          <span className="inline-block rounded bg-secondary px-2.5 py-1 text-sm font-medium text-secondary-foreground">
            {sample.tag || sample.industry}
          </span>
          <span className="text-sm text-muted-foreground">{sample.industry}</span>
        </div>

        <h3 className="mt-3.5 text-xl font-bold text-foreground transition-colors group-hover:text-primary shrink-0 break-keep">
          {sample.title}
        </h3>

        <p className="mt-2.5 text-base leading-relaxed text-muted-foreground line-clamp-3 break-keep min-h-[4.3rem]">
          {sample.purpose}
        </p>

        {sample.features && sample.features.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2 pt-3.5 border-t border-border/60">
            {sample.features.slice(0, 3).map((f) => (
              <li key={f} className="text-sm text-muted-foreground">
                · {f}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between text-base font-medium text-primary border-t border-border/40">
          <span>포트폴리오 보기</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}
