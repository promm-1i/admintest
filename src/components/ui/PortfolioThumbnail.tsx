import { useEffect, useState } from "react";
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
 *
 * 스크롤 시작을 iframe의 load 이벤트에 맞추지 않는다 — 대상 사이트가 무거우면
 * (이미지 많은 실제 홈페이지) load가 몇 초씩 걸리거나 hover가 끝날 때까지 안 뜰 수
 * 있어서, 대신 마운트 후 고정 지연(500ms)이 지나면 무조건 스크롤을 시작한다.
 */
export function PortfolioThumbnail({ src, label, liveUrl, ratio = "video", className }: Props) {
  const [hovering, setHovering] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    if (!hovering) {
      setScrolling(false);
      return;
    }
    const timer = setTimeout(() => setScrolling(true), 500);
    return () => clearTimeout(timer);
  }, [hovering]);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border",
        ratio === "wide" ? "aspect-[21/9]" : "aspect-video",
        className,
      )}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <ImagePlaceholder src={src} ratio={ratio} label={label} className="absolute inset-0 rounded-none border-0" />

      {liveUrl && hovering && (
        <iframe
          key={liveUrl}
          src={liveUrl}
          title={`${label} 실시간 미리보기`}
          tabIndex={-1}
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 w-full border-0 bg-background opacity-100",
            scrolling
              ? "transition-transform duration-[9000ms] ease-linear -translate-y-[66.6667%]"
              : "translate-y-0",
          )}
          style={{ height: "300%" }}
        />
      )}
    </div>
  );
}
