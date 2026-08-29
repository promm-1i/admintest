import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import type { NavDropdownEntry } from "./navData";

type Props = {
  entries: NavDropdownEntry[];
  onNavigate: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

/**
 * 헤더의 드롭다운 카테고리(홈페이지 제작 / 업종별 맞춤 제작 / 고객센터)를
 * 하나씩 따로 펼치지 않고, 전체를 한 번에 보여주는 통합 메가메뉴 패널.
 */
export function MegaMenuPanel({ entries, onNavigate, onMouseEnter, onMouseLeave }: Props) {
  return (
    <div
      role="region"
      aria-label="전체 메뉴"
      className="absolute inset-x-0 top-full z-50 border-t border-border bg-card shadow-lg motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1 motion-safe:duration-150"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="mx-auto grid max-w-5xl gap-10 px-10 py-8 sm:grid-cols-3">
        {entries.map((entry) => (
          <div key={entry.key}>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">{entry.label}</p>
            {entry.groupLabel && (
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                {entry.groupLabel}
              </p>
            )}
            <ul className={cnColumns(entry)}>
              {entry.items.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    onClick={onNavigate}
                    className="block py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {entry.externalNote && (
              <div className="mt-3 border-t border-border pt-3">
                <p className="text-xs leading-relaxed text-muted-foreground break-keep">{entry.externalNote.text}</p>
                <a
                  href={entry.externalNote.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onNavigate}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  {entry.externalNote.label}
                  <ExternalLink className="size-3" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function cnColumns(entry: NavDropdownEntry) {
  return entry.columns === 2 ? "mt-3 grid grid-cols-2 gap-x-4" : "mt-3 space-y-0.5";
}
