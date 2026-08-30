import { cn } from "@/lib/utils";

/**
 * NOVERIQ CI 마크. 모노그램(N을 잇는 지그재그 스트로크, 오른쪽 상단만 accent red)과
 * 워드마크("NOVERIQ", Q만 accent red)로 구성된다.
 */
export function Logo({
  className,
  markClassName,
  wordmarkClassName,
  showMark = true,
}: {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  showMark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-foreground", className)}>
      {showMark && (
        <svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          className={cn("h-[1.5em] w-[1.5em] shrink-0", markClassName)}
        >
          <path
            d="M15 85 L15 15 L85 85 L85 45"
            fill="none"
            stroke="currentColor"
            strokeWidth="13"
            strokeLinecap="butt"
            strokeLinejoin="round"
          />
          <path d="M85 45 L85 15" fill="none" stroke="var(--color-primary)" strokeWidth="13" strokeLinecap="butt" />
        </svg>
      )}
      <span className={cn("font-logo tracking-[0.06em]", wordmarkClassName)}>
        NOVERI<span className="text-primary">Q</span>
      </span>
    </span>
  );
}
