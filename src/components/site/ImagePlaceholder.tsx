import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** public/images 안의 정적 파일 경로 (예: /images/portfolio-beauty.webp) */
  src?: string | null;
  alt?: string;
  ratio?: "square" | "video" | "photo" | "portrait" | "wide";
  label?: string;
  className?: string;
};

const ratioClass: Record<NonNullable<Props["ratio"]>, string> = {
  square: "aspect-square",
  video: "aspect-video",
  photo: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

/**
 * src가 주어져도 실제 파일이 아직 없을 수 있으므로(placeholder 파일명만 지정된 상태),
 * onError 시 깨진 이미지 아이콘 대신 그라데이션 placeholder로 전환한다.
 */
export function ImagePlaceholder({ src, alt = "", ratio = "video", label, className }: Props) {
  const [errored, setErrored] = useState(false);
  const showImage = Boolean(src) && !errored;

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-lg border border-border",
        !showImage && "bg-gradient-to-br from-secondary via-muted to-secondary",
        ratioClass[ratio],
        className,
      )}
    >
      {showImage ? (
        <img
          src={src!}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={() => setErrored(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center px-4 text-center text-xs tracking-wide text-muted-foreground">
          {label ?? "이미지 준비 중"}
        </div>
      )}
    </div>
  );
}
