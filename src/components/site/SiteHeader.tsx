import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Send, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { NavDropdown } from "@/components/site/NavDropdown";
import { HEADER_NAV, type NavDropdownEntry } from "@/components/site/navData";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

function MobileNavGroup({ entry, onNavigate }: { entry: NavDropdownEntry; onNavigate: () => void }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={entry.key} className="border-b-0">
        <AccordionTrigger className="py-3 text-sm text-muted-foreground hover:no-underline data-[state=open]:text-foreground">
          {entry.label}
        </AccordionTrigger>
        <AccordionContent>
          {entry.groupLabel && (
            <p className="pb-1.5 pl-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              {entry.groupLabel}
            </p>
          )}
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
          {entry.externalNote && (
            <div className="mt-1 border-t border-border pb-2 pl-1 pt-3">
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

        <nav className="hidden items-center gap-6 xl:flex">
          {HEADER_NAV.map((entry) =>
            entry.type === "dropdown" ? (
              <NavDropdown key={entry.key} entry={entry} />
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
        </nav>

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
