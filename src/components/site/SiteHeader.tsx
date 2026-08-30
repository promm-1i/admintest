import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Send, ArrowRight, ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { MegaMenuPanel } from "@/components/site/MegaMenuPanel";
import { HEADER_NAV, type NavDropdownEntry } from "@/components/site/navData";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const MEGA_CLOSE_DELAY = 150;
const DROPDOWN_ENTRIES = HEADER_NAV.filter((e): e is NavDropdownEntry => e.type === "dropdown");

function MobileNavGroup({ entry, onNavigate }: { entry: NavDropdownEntry; onNavigate: () => void }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={entry.key} className="border-b-0">
        <AccordionTrigger className="py-3 text-sm text-muted-foreground hover:no-underline data-[state=open]:text-foreground">
          {entry.label}
        </AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-3 pb-2 pl-1">
            {entry.items.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  onClick={onNavigate}
                  className="flex items-center gap-1.5 text-sm font-medium text-foreground"
                >
                  {item.label}
                  <ArrowRight className="size-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const { isAdmin } = useAuth();
  const megaOpen = activeKey !== null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const openMega = (key: string) => {
    window.clearTimeout(closeTimer.current);
    setActiveKey(key);
  };
  const scheduleCloseMega = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setActiveKey(null), MEGA_CLOSE_DELAY);
  };
  const closeMegaNow = () => {
    window.clearTimeout(closeTimer.current);
    setActiveKey(null);
  };
  const keepMegaOpen = () => {
    window.clearTimeout(closeTimer.current);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-background transition-colors motion-safe:duration-300",
        scrolled ? "border-border shadow-[0_1px_0_rgba(0,0,0,0.02)]" : "border-transparent",
      )}
    >
      <div className="relative flex h-16 items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link to="/" className="flex items-center text-lg font-semibold tracking-tight">
          Mint
          <span
            aria-hidden="true"
            className="mx-[3px] inline-block h-[0.85em] w-[3px] rounded-sm bg-primary"
          />
          CL
        </Link>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-14 xl:flex"
          onMouseLeave={scheduleCloseMega}
        >
          {HEADER_NAV.map((entry) =>
            entry.type === "dropdown" ? (
              <button
                key={entry.key}
                type="button"
                aria-expanded={activeKey === entry.key}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150",
                  activeKey === entry.key
                    ? "bg-neutral-950 text-white"
                    : "text-muted-foreground hover:bg-neutral-950 hover:text-white",
                )}
                onMouseEnter={() => openMega(entry.key)}
                onClick={() => (activeKey === entry.key ? scheduleCloseMega() : openMega(entry.key))}
              >
                {entry.label}
                <ChevronDown
                  className={cn("size-3.5 transition-transform duration-200", activeKey === entry.key && "rotate-180")}
                />
              </button>
            ) : entry.external ? (
              <a
                key={entry.key}
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {entry.label}
                <ExternalLink className="size-3" />
              </a>
            ) : (
              <Link
                key={entry.key}
                to={entry.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {entry.label}
              </Link>
            ),
          )}
        </nav>

        {megaOpen && (
          <MegaMenuPanel
            entries={DROPDOWN_ENTRIES}
            onNavigate={closeMegaNow}
            onMouseEnter={keepMegaOpen}
            onMouseLeave={scheduleCloseMega}
          />
        )}

        <div className="hidden items-center gap-4 xl:flex">
          {isAdmin && (
            <Link to="/admin" className="text-sm text-primary">
              관리자
            </Link>
          )}
          <Button asChild size="sm" className="font-bold gap-1.5 shadow-xs">
            <Link to="/contact">
              <Send className="h-3.5 w-3.5" />
              상담 문의
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <Button asChild size="sm" className="font-bold gap-1">
            <Link to="/contact">
              <Send className="h-3.5 w-3.5" />
              문의
            </Link>
          </Button>
          <button
            type="button"
            aria-label="메뉴 열기"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border bg-background xl:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {HEADER_NAV.map((entry) => (
              <li key={entry.key}>
                {entry.type === "dropdown" ? (
                  <MobileNavGroup entry={entry} onNavigate={() => setOpen(false)} />
                ) : entry.external ? (
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 py-3 text-sm text-muted-foreground"
                  >
                    {entry.label}
                    <ExternalLink className="size-3.5" />
                  </a>
                ) : (
                  <Link
                    to={entry.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-sm text-muted-foreground"
                  >
                    {entry.label}
                  </Link>
                )}
              </li>
            ))}
            {isAdmin && (
              <li>
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm text-primary"
                >
                  관리자
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
