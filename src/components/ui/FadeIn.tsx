import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
};

/**
 * 요소가 화면에 들어올 때 한 번 fade-up 되는 가벼운 래퍼.
 * framer-motion 없이 IntersectionObserver + CSS transition으로 구현하며,
 * motion-safe:는 prefers-reduced-motion 사용자에게는 트랜지션 없이 즉시 노출한다.
 */
export function FadeIn({ children, className, delay = 0, direction = "up" }: FadeInProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  const hiddenTransform =
    direction === "up"
      ? "translate-y-4"
      : direction === "left"
        ? "-translate-x-4"
        : direction === "right"
          ? "translate-x-4"
          : "";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: isInView ? `${delay}ms` : "0ms" }}
      className={cn(
        "motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out",
        isInView ? "translate-x-0 translate-y-0 opacity-100" : `opacity-0 ${hiddenTransform}`,
        className,
      )}
    >
      {children}
    </div>
  );
}
