import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { cn } from "@/lib/utils";

type BrowserMockupProps = {
  src?: string;
  alt?: string;
  label?: string;
  ratio?: "square" | "video" | "portrait" | "wide";
  className?: string;
};

/** 실제 스크린샷 대신 브라우저 창 모양의 HTML/CSS 목업으로 웹사이트 미리보기를 표현한다. */
export function BrowserMockup({ src, alt, label, ratio = "portrait", className }: BrowserMockupProps) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-card shadow-sm", className)}>
      <div className="flex items-center gap-1.5 border-b border-border bg-muted/60 px-3 py-2.5">
        <span className="size-2 rounded-full bg-destructive/50" />
        <span className="size-2 rounded-full bg-chart-4/60" />
        <span className="size-2 rounded-full bg-primary/50" />
        <span className="ml-2 h-4 flex-1 rounded-sm bg-background/80" />
      </div>
      <ImagePlaceholder
        src={src}
        alt={alt}
        ratio={ratio}
        label={label}
        className="rounded-none border-0"
      />
    </div>
  );
}
