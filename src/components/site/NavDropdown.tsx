import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavGroup } from "./navData";

const CLOSE_DELAY = 150;

/**
 * 데스크톱 메가메뉴 드롭다운. 트리거 버튼과 패널을 한 컴포넌트 안에서 같이 관리한다.
 * 열림/닫힘은 hover가 아니라 "닫기 타이머"로 제어해서, 버튼→패널 사이에 시각적인 틈이
 * 있어도(DOM상 서로 다른 위치) CLOSE_DELAY 안에 다시 진입하면 닫히지 않는다.
 */
export function NavDropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = `nav-menu-${group.key}`;

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
    <div>
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
        {group.label}
        <ChevronDown className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div
          id={panelId}
          role="region"
          aria-label={`${group.label} 메뉴`}
          className="absolute inset-x-0 top-full z-50 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1 motion-safe:duration-150"
          onMouseEnter={openNow}
          onMouseLeave={scheduleClose}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeAndFocusTrigger();
          }}
        >
          <div className="border-b border-border bg-background shadow-md">
            <div
              className={cn(
                "mx-auto grid max-w-6xl gap-8 px-4 py-8",
                group.promo ? "lg:grid-cols-[1fr_320px]" : "",
              )}
            >
              <ul className="grid gap-1.5 sm:grid-cols-2">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isReal = Boolean(item.href);
                  const content = (
                    <>
                      <div
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                          isReal ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground",
                        )}
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                          {item.title}
                          {!isReal && (
                            <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-normal text-muted-foreground">
                              준비 중
                            </span>
                          )}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground break-keep">
                          {item.desc}
                        </p>
                      </div>
                    </>
                  );

                  return (
                    <li key={item.title}>
                      {isReal ? (
                        <Link
                          to={item.href!}
                          onClick={() => setOpen(false)}
                          className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3 transition-colors hover:border-primary/40 hover:bg-primary/10"
                        >
                          {content}
                        </Link>
                      ) : (
                        <div className="flex items-start gap-3 rounded-xl p-3">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              {group.promo && (
                <div className="rounded-2xl bg-secondary/50 p-6">
                  <p className="whitespace-pre-line text-base font-semibold leading-snug text-foreground break-keep">
                    {group.promo.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground break-keep">
                    {group.promo.desc}
                  </p>
                  <Link
                    to={group.promo.href}
                    onClick={() => setOpen(false)}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    {group.promo.linkLabel} <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
