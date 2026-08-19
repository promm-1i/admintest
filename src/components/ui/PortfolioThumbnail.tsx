import { useEffect, useRef, useState } from "react";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { cn } from "@/lib/utils";

type Props = {
  src?: string;
  label: string;
  liveUrl?: string;
  ratio?: "video" | "wide";
  className?: string;
};

// 카드가 좁을 때 사이트 자체가 모바일 레이아웃으로 렌더링되는 걸 막기 위해,
// 항상 이 데스크톱 폭으로 렌더링한 뒤 카드 실제 폭에 맞춰 통째로 축소한다.
const VIRTUAL_WIDTH = 1280;
const SCROLL_MULTIPLE = 3;

const ASPECT: Record<NonNullable<Props["ratio"]>, number> = {
  video: 16 / 9,
  wide: 21 / 9,
};

/**
 * 기본은 정지 썸네일이고, liveUrl이 있으면 마우스를 올렸을 때만 실제 사이트를
 * iframe으로 띄워 위에서 아래로 스크롤되는 것처럼 보여준다. iframe은 항상
 * VIRTUAL_WIDTH(데스크톱 폭)로 렌더링해서 사이트의 데스크톱 레이아웃이 뜨게 하고,
 * 카드 실제 폭에 맞춰 ResizeObserver로 잰 배율만큼 CSS scale로 축소한다.
 *
 * 스크롤 시작을 iframe의 load 이벤트에 맞추지 않는다 — 대상 사이트가 무거우면
 * (이미지 많은 실제 홈페이지) load가 몇 초씩 걸리거나 hover가 끝날 때까지 안 뜰 수
 * 있어서, 대신 마운트 후 고정 지연(500ms)이 지나면 무조건 스크롤을 시작한다.
 */
export function PortfolioThumbnail({ src, label, liveUrl, ratio = "video", className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [hovering, setHovering] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setScale(el.offsetWidth / VIRTUAL_WIDTH);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!hovering) {
      setScrolling(false);
      return;
    }
    const timer = setTimeout(() => setScrolling(true), 500);
    return () => clearTimeout(timer);
  }, [hovering]);

  const visibleHeight = VIRTUAL_WIDTH / ASPECT[ratio];
  const tallHeight = visibleHeight * SCROLL_MULTIPLE;
  const scrollDistance = tallHeight - visibleHeight;

  return (
    <div
      ref={containerRef}
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
        <div
          className="pointer-events-none absolute left-0 top-0 origin-top-left"
          style={{ width: VIRTUAL_WIDTH, height: visibleHeight, transform: `scale(${scale})` }}
        >
          <iframe
            key={liveUrl}
            src={liveUrl}
            title={`${label} 실시간 미리보기`}
            tabIndex={-1}
            className={cn("border-0 bg-background", scrolling && "transition-transform duration-[2000ms] ease-linear")}
            style={{
              width: VIRTUAL_WIDTH,
              height: tallHeight,
              transform: scrolling ? `translateY(-${scrollDistance}px)` : "translateY(0px)",
            }}
          />
        </div>
      )}
    </div>
  );
}
