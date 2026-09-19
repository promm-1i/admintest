import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { NavDropdownEntry } from "./navData";

type Props = {
  entries: NavDropdownEntry[];
  activeKey: string;
  onActiveChange: (key: string) => void;
  onNavigate: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

/**
 * 모든 대메뉴를 한 번에 보여 주는 데스크톱 전용 메가메뉴.
 * 상단에서 가리킨 항목의 열만 강조하고, 다른 열도 그대로 노출해 전체 구성을 빠르게 훑게 한다.
 */
export function MegaMenuPanel({
  entries,
  activeKey,
  onActiveChange,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
}: Props) {
  return (
    <div
      id="site-mega-menu"
      role="navigation"
      aria-label="전체 메뉴"
      className="absolute inset-x-0 top-full z-50 hidden border-t border-border bg-background shadow-xl xl:block"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="mx-auto grid max-w-7xl border-x border-border/70"
        style={{ gridTemplateColumns: `repeat(${entries.length}, minmax(0, 1fr))` }}
      >
        {entries.map((entry) => {
          const active = entry.key === activeKey;
          return (
            <section
              key={entry.key}
              aria-labelledby={`mega-heading-${entry.key}`}
              className={cn(
                "min-h-[360px] border-r border-border/70 px-5 py-7 transition-colors first:border-l-0 last:border-r-0",
                active ? "bg-secondary/55" : "bg-background",
              )}
              onMouseEnter={() => onActiveChange(entry.key)}
            >
              <h2
                id={`mega-heading-${entry.key}`}
                className={cn("text-sm font-bold", active ? "text-primary" : "text-foreground")}
              >
                {entry.label}
              </h2>
              <ul className="mt-5 space-y-3.5">
                {entry.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      onClick={onNavigate}
                      className="block text-sm leading-5 text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
