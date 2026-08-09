import { ExternalLink } from "lucide-react";

export function ExternalSitePreview({ url }: { url: string }) {
  const host = (() => {
    try {
      return new URL(url).host;
    } catch {
      return url;
    }
  })();

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      {/* Mini browser chrome bar */}
      <div className="flex items-center justify-between gap-3 border-b border-border bg-secondary/50 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-1.5 rounded-md bg-background px-3 py-1 text-xs font-mono text-muted-foreground border border-border/60">
          <span className="truncate">{host}</span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
        >
          <ExternalLink className="h-3.5 w-3.5" /> 새 탭에서 방문하기
        </a>
      </div>
      <iframe
        src={url}
        title="실제 제작 사이트 미리보기"
        loading="lazy"
        className="h-[80vh] w-full bg-card"
      />
    </div>
  );
}
