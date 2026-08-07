import { cn } from "@/lib/utils";

type Props = {
  /** 이후 public/images 의 실제 경로를 넣으면 그대로 표시됩니다. */
  src?: string | null;
  alt?: string;
  ratio?: "square" | "video" | "portrait" | "wide";
  label?: string;
  className?: string;
};

const ratioClass: Record<NonNullable<Props["ratio"]>, string> = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

export function ImagePlaceholder({ src, alt = "", ratio = "video", label, className }: Props) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-lg border border-border bg-muted",
        ratioClass[ratio],
        className,
      )}
    >
      {src ? (
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center px-4 text-center text-xs tracking-wide text-muted-foreground">
          {label ?? "이미지 준비 중"}
        </div>
      )}
    </div>
  );
}