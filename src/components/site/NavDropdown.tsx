import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavDropdownEntry } from "./navData";

const CLOSE_DELAY = 150;

/**
 * 텍스트 중심의 정돈된 드롭다운. 트리거 버튼 아래 자기 너비만큼만 펼쳐지는
 * 단순 목록으로, 카드/아이콘 박스/설명문 없이 항목명만 보여준다.
 * 열림/닫힘은 hover가 아니라 "닫기 타이머"로 제어해서, 버튼→패널 사이에 시각적인 틈이
 * 있어도(DOM상 서로 다른 위치) CLOSE_DELAY 안에 다시 진입하면 닫히지 않는다.
 */
export function NavDropdown({ entry }: { entry: NavDropdownEntry }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = `nav-menu-${entry.key}`;

  const cancelClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = undefined;
    }
  };

  const openNow = () => {
    cancelClose();
    setOpen(true);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

  const closeAndFocusTrigger = () => {
    cancelClose();
    setOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => () => cancelClose(), []);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        onMouseEnter={openNow}
        onMouseLeave={scheduleClose}
        onClick={() => (open ? closeAndFocusTrigger() : openNow())}
        onKeyDown={(e) => {
          if (e.key === "Escape") closeAndFocusTrigger();
        }}
      >
        {entry.label}
        <ChevronDown className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div
          id={panelId}
          role="region"
          aria-label={`${entry.label} 메뉴`}
          className="absolute left-0 top-full z-50 pt-3 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1 motion-safe:duration-150"
          onMouseEnter={openNow}
          onMouseLeave={scheduleClose}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeAndFocusTrigger();
          }}
        >
          <div className="min-w-48 rounded-md border border-border bg-card py-2 shadow-sm">
            {entry.groupLabel && (
              <p className="px-4 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                {entry.groupLabel}
              </p>
            )}
            <ul className={cn("whitespace-nowrap", entry.columns === 2 && "grid grid-cols-2")}>
              {entry.items.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between gap-3 px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                    <span className="text-muted-foreground/50 opacity-0 transition-opacity group-hover:opacity-100">→</span>
                  </Link>
                </li>
              ))}
            </ul>

            {entry.externalNote && (
              <div className="mt-1 border-t border-border px-4 pt-3">
                <p className="text-xs leading-relaxed text-muted-foreground break-keep">{entry.externalNote.text}</p>
                <a
                  href={entry.externalNote.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  {entry.externalNote.label}
                  <ExternalLink className="size-3" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
