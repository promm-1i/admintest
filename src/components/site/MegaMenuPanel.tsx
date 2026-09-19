import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { NavDropdownEntry } from "./navData";

type Props = {
  entries: NavDropdownEntry[];
  activeKey: string | null;
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
  const open = activeKey !== null;

  return (
    <div
      id="site-mega-menu"
      role="navigation"
      aria-label="전체 메뉴"
      aria-hidden={!open}
      className={cn(
        "pointer-events-none absolute inset-x-0 top-full z-50 hidden h-[430px] overflow-hidden xl:block",
        open && "pointer-events-auto",
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={cn(
          "min-h-[430px] border-t border-border/70 bg-background shadow-xl",
          "transition-[translate,opacity] [transition-duration:400ms,400ms] [transition-timing-function:ease,ease] motion-reduce:translate-y-0 motion-reduce:transition-none",
          open
            ? "translate-y-0 opacity-100 [transition-delay:0ms,300ms]"
            : "-translate-y-[500px] opacity-0 [transition-delay:0ms,0ms]",
        )}
      >
        <div
          className="mx-auto grid min-h-[430px] w-[900px]"
          style={{ gridTemplateColumns: `repeat(${entries.length}, minmax(0, 1fr))` }}
        >
          {entries.map((entry) => {
            const active = entry.key === activeKey;
            return (
              <section
                key={entry.key}
                aria-label={`${entry.label} 하위 메뉴`}
                className={cn(
                  "flex min-h-[430px] justify-center border-r border-border/70 px-4 pb-12 pt-8 transition-colors first:border-l last:border-r",
                  active ? "bg-secondary/55" : "bg-background",
                )}
                onMouseEnter={() => onActiveChange(entry.key)}
              >
                <div className="w-fit max-w-full">
                  <ul className="space-y-4">
                    {entry.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          onClick={onNavigate}
                          tabIndex={open ? undefined : -1}
                          className="block text-[17px] leading-6 text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
