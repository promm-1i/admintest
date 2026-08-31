import { useEffect, useRef, useState } from "react";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { cn } from "@/lib/utils";

type Props = {
  src?: string;
  label: string;
  liveUrl?: string;
  ratio?: "video" | "photo" | "wide";
  className?: string;
};

// 카드가 좁을 때 사이트 자체가 모바일 레이아웃으로 렌더링되는 걸 막기 위해,
// 항상 이 데스크톱 폭으로 렌더링한 뒤 카드 실제 폭에 맞춰 통째로 축소한다.
const VIRTUAL_WIDTH = 1280;
// iframe height는 그 안 문서의 100vh 기준값이기도 하다. 실제 대상 사이트 대부분이
// 히어로를 `min-height: 100vh` 식으로 잡아두기 때문에, 이 값을 실제 페이지 길이(수천px)
// 만큼 키우면 히어로 하나가 캔버스 전체를 집어삼켜서 "계속 히어로만 확대되어 보이는"
// 현상이 생긴다(ROADIN 확인: min-height: calc(-94px + 100vh)). 그래서 일반 데스크톱
// 브라우저 높이에 가까운 값으로만 잡아 히어로가 정상 비율로 나오게 하고, 그보다 살짝만
// 더 키워서 히어로 바로 다음 섹션 정도까지만 살짝 엿보이게 한다 — 페이지 끝까지 스크롤은
// 크로스오리진 iframe 구조상 vh를 깨뜨리지 않고는 불가능하다.
const TALL_HEIGHT = 1600;

const ASPECT: Record<NonNullable<Props["ratio"]>, number> = {
  video: 16 / 9,
  photo: 4 / 3,
  wide: 21 / 9,
};

/**
 * 기본은 정지 썸네일이고, liveUrl이 있으면 마우스를 올렸을 때만 실제 사이트를
 * iframe으로 띄워 위에서 아래로 스크롤되는 것처럼 보여준다. iframe은 항상
 * VIRTUAL_WIDTH(데스크톱 폭)로 렌더링해서 사이트의 데스크톱 레이아웃이 뜨게 하고,
 * 카드 실제 폭에 맞춰 ResizeObserver로 잰 배율만큼 CSS scale로 축소한다.
 *
 * 스크롤은 CSS @keyframes(portfolio-preview-scroll, index.css)로 무한 반복시켜서,
 * 맨 아래까지 다 내려간 뒤 처음(맨 위)으로 되돌아가 다시 내려가는 걸 hover가
 * 끝날 때까지 반복한다(왕복이 아니라 매번 위에서부터 다시 시작).
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
  const tallHeight = TALL_HEIGHT;
  const scrollDistance = tallHeight - visibleHeight;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg border border-border",
        ratio === "wide" ? "aspect-[21/9]" : ratio === "photo" ? "aspect-[4/3]" : "aspect-video",
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
            className={cn(
              "border-0 bg-background will-change-transform",
              scrolling && "animate-[portfolio-preview-scroll_2200ms_linear_infinite]",
            )}
            style={{
              width: VIRTUAL_WIDTH,
              height: tallHeight,
              transform: scrolling ? undefined : "translateY(0px)",
              // @ts-expect-error -- CSS custom properties aren't in React's CSSProperties type
              "--scroll-distance": `-${scrollDistance}px`,
            }}
          />
        </div>
      )}
    </div>
  );
}
