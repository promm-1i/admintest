import { useState } from "react";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { cn } from "@/lib/utils";

type Props = {
  src?: string;
  label: string;
  liveUrl?: string;
  ratio?: "video" | "wide";
  className?: string;
};

/**
 * 기본은 정지 썸네일이고, liveUrl이 있으면 마우스를 올렸을 때만 실제 사이트를
 * iframe으로 띄워 위에서 아래로 스크롤되는 것처럼 보여준다. iframe 높이를 300%로
 * 잡고 -2/3만큼 끌어올리는 방식이라 카드 실제 픽셀 크기를 몰라도 항상 정확히
 * 3구간(위→가운데→아래)을 스크롤한 것처럼 보인다.
 */
export function PortfolioThumbnail({ src, label, liveUrl, ratio = "video", className }: Props) {
  const [hovering, setHovering] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border",
        ratio === "wide" ? "aspect-[21/9]" : "aspect-video",
        className,
      )}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setLoaded(false);
      }}
    >
      <ImagePlaceholder src={src} ratio={ratio} label={label} className="absolute inset-0 rounded-none border-0" />

      {liveUrl && hovering && (
        <iframe
          key={liveUrl}
          src={liveUrl}
          title={`${label} 실시간 미리보기`}
          tabIndex={-1}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 w-full border-0 bg-background transition-[transform,opacity] duration-[7000ms] ease-in-out",
            loaded ? "-translate-y-2/3 opacity-100" : "translate-y-0 opacity-0",
          )}
          style={{ height: "300%" }}
        />
      )}
    </div>
  );
}
