import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
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
            <li key={item.label} className={item.children ? "group/fly relative" : undefined}>
              {groupStart && (
                <div className="mx-5 mb-1 mt-2 border-t border-border pt-2">
                  <p className="text-center text-xs font-semibold tracking-wide text-muted-foreground">
                    {item.group}
                  </p>
                </div>
              )}
              <Link
                to={item.href}
                onClick={onNavigate}
                className="relative flex items-center justify-center whitespace-nowrap rounded-lg px-9 py-2.5 text-center text-base text-foreground/80 transition-colors hover:bg-secondary hover:font-semibold hover:text-foreground"
              >
                {item.label}
                {item.children && (
                  <ChevronRight className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                )}
              </Link>

              {/* hover 시 우측으로 펼쳐지는 실제 템플릿 목록 플라이아웃 */}
              {item.children && (
                <div className="invisible absolute left-full top-0 z-10 pl-2 opacity-0 transition-all duration-200 group-hover/fly:visible group-hover/fly:opacity-100 group-focus-within/fly:visible group-focus-within/fly:opacity-100 motion-reduce:transition-none">
                  <ul className="w-60 rounded-2xl border border-border bg-background p-2 shadow-xl">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          to={child.href}
                          onClick={onNavigate}
                          className="group/item flex items-center gap-3 rounded-lg p-2 ring-primary/70 ring-inset transition-all hover:bg-primary/5 hover:ring-2"
                        >
                          {child.image && (
                            <img
                              src={child.image}
                              alt=""
                              loading="lazy"
                              className="h-10 w-16 shrink-0 rounded-md border border-border object-cover transition-transform group-hover/item:scale-105"
                            />
                          )}
                          <span className="origin-left text-sm font-medium text-foreground/90 transition-transform group-hover/item:scale-110 group-hover/item:font-bold group-hover/item:text-primary">
                            {child.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
