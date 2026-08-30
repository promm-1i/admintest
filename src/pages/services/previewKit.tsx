import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/** 서비스 상세페이지에서 실제 화면 미리보기를 감싸는 공용 브라우저 창 프레임. */
export function BrowserFrame({
  label,
  heightClassName,
  children,
}: {
  label: string;
  heightClassName: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-1.5 border-b border-border bg-secondary/60 px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-2 truncate font-mono text-[11px] text-muted-foreground">{label}</span>
      </div>
      <div className={cn("overflow-hidden bg-background", heightClassName)}>{children}</div>
    </div>
  );
}

/**
 * 실제 React 컴포넌트를 축소해 보여주는 미리보기. inert로 전체 서브트리를 포인터/키보드
 * 조작과 접근성 트리에서 완전히 제외해, 미리보기 안의 조작이 실제 데이터를 바꾸지 않게 한다.
 */
export function LiveComponentPreview({ scale, children }: { scale: number; children: ReactNode }) {
  return (
    <div className="select-none" inert>
      <div className="origin-top-left p-5" style={{ transform: `scale(${scale})`, width: `${100 / scale}%` }}>
        {children}
      </div>
    </div>
  );
}

/**
 * 뷰포트 근처에 올 때까지 true를 반환하지 않는 훅. iframe처럼 무거운 것을 실제로 스크롤해서
 * 볼 때만 마운트하기 위한 공용 IntersectionObserver 로직이다.
 */
export function useLazyMount<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shouldLoad) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return { ref, shouldLoad };
}

/**
 * 스크롤로 뷰포트에 들어오면 서서히 나타나는 래퍼. prefers-reduced-motion에서는 transition
 * 자체가 꺼져 즉시 나타난다. stagger가 필요하면 delay(ms)를 다르게 준다.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, shouldLoad } = useLazyMount<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        shouldLoad ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
      style={{ transitionDelay: shouldLoad ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

/**
 * 실제 컴포넌트를 큰 배율로(거의 원본 크기 또는 확대) 보여주면서 관심 영역만 crop한다.
 * LiveComponentPreview보다 훨씬 큰 scale을 쓰기 위한 버전 — 글자가 실제로 읽혀야 하는 곳에 쓴다.
 */
export function ZoomCrop({
  scale,
  offsetX = 0,
  offsetY = 0,
  heightClassName,
  children,
}: {
  scale: number;
  offsetX?: number;
  offsetY?: number;
  heightClassName: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-background", heightClassName)}>
      <div
        className="origin-top-left"
        style={{ transform: `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`, width: `${100 / scale}%` }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * 실제 화면 상태가 자동으로 전환되는 루프. 별도 영상 파일 없이, 실제 UI 상태(before/after)를
 * 타이머로 바꿔가며 보여준다 — 동작을 보여주는 목적이며 prefers-reduced-motion에서는 정지한다.
 */
export function LoopingBeforeAfter({
  before,
  after,
  intervalMs = 2600,
}: {
  before: ReactNode;
  after: ReactNode;
  intervalMs?: number;
}) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => setShowAfter((v) => !v), intervalMs);
    return () => window.clearInterval(id);
  }, [reducedMotion, intervalMs]);

  return (
    <div className="relative">
      <div className={cn("transition-opacity duration-500", showAfter ? "opacity-0" : "opacity-100")}>{before}</div>
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          showAfter ? "opacity-100" : "opacity-0",
        )}
      >
        {after}
      </div>
    </div>
  );
}

/**
 * 실제 라이브 페이지를 iframe으로 그대로 불러와 축소 표시한다. 뷰포트 근처에 올 때까지 iframe
 * 자체를 마운트하지 않아 초기 로드에는 네트워크 요청이 없다. inert로 포커스·클릭도 모두 막는다.
 */
export function LazyIframePreview({ src, scale, title }: { src: string; scale: number; title: string }) {
  const { ref, shouldLoad } = useLazyMount<HTMLDivElement>();

  return (
    <div ref={ref} className="h-full w-full overflow-hidden" inert>
      <div className="origin-top-left" style={{ transform: `scale(${scale})`, width: `${100 / scale}%` }}>
        {shouldLoad ? (
          <iframe src={src} title={title} style={{ width: "100%", height: 900, border: 0 }} />
        ) : (
          <div style={{ width: "100%", height: 900 }} className="bg-secondary/20" />
        )}
      </div>
    </div>
  );
}
