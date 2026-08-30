import { Link } from "react-router-dom";
import type { NavDropdownEntry } from "./navData";

type Props = {
  entry: NavDropdownEntry;
  onNavigate: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

/**
 * 대메뉴 트리거 바로 아래, 정확히 같은 중심축에 뜨는 드롭다운 패널.
 * 트리거를 감싸는 relative wrapper 기준 left-1/2 + -translate-x-1/2로
 * 위치를 고정하므로 centerX 오차가 항상 0px다.
 */
export function MegaMenuPanel({ entry, onNavigate, onMouseEnter, onMouseLeave }: Props) {
  return (
    <div
      role="region"
      aria-label={entry.label}
      className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ul className="min-w-[220px] rounded-2xl border border-border bg-background py-2.5 shadow-xl motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 motion-safe:duration-200 motion-safe:ease-out">
        {entry.items.map((item, i) => {
          // 앞 항목과 group이 달라지는 지점에 얇은 구분선 + 소제목을 넣는다
          const groupStart = item.group && item.group !== entry.items[i - 1]?.group;
          return (
            <li key={item.label}>
              {groupStart && (
                <div className="mx-5 mb-1 mt-2 border-t border-border pt-2">
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground">
                    {item.group}
                  </p>
                </div>
              )}
              <Link
                to={item.href}
                onClick={onNavigate}
                className="block whitespace-nowrap rounded-lg px-5 py-2.5 text-base text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
