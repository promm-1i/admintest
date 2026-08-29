import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { NavDropdown } from "@/components/site/NavDropdown";
import { NAV_GROUPS } from "@/components/site/navData";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const NAV_LINK_CLASS = ({ isActive }: { isActive: boolean }) =>
  `text-sm transition-colors hover:text-foreground ${
    isActive ? "font-medium text-foreground" : "text-muted-foreground"
  }`;

function MobileNavGroup({ groupKey, label, items, onNavigate }: {
  groupKey: string;
  label: string;
  items: { title: string; desc: string; href?: string }[];
  onNavigate: () => void;
}) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={groupKey} className="border-b-0">
        <AccordionTrigger className="py-3 text-sm text-muted-foreground hover:no-underline data-[state=open]:text-foreground">
          {label}
        </AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-3 pb-2 pl-1">
            {items.map((item) =>
              item.href ? (
                <li key={item.title}>
                  <Link
                    to={item.href}
                    onClick={onNavigate}
                    className="flex items-center gap-1.5 text-sm font-medium text-primary"
                  >
                    {item.title}
                    <ArrowRight className="size-3.5" />
                  </Link>
                </li>
              ) : (
                <li key={item.title} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  {item.title}
                  <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px]">준비 중</span>
                </li>
              ),
            )}
          </ul>
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
        "sticky top-0 z-40 border-b backdrop-blur transition-colors motion-safe:duration-300",
        scrolled ? "border-border bg-background/90 shadow-sm" : "border-transparent bg-background/60",
      )}
    >
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center text-lg font-semibold tracking-tight">
          Mint
          <span
            aria-hidden="true"
            className="mx-[3px] inline-block h-[0.85em] w-[3px] rounded-sm bg-primary"
          />
          CL
        </Link>

        <nav className="hidden items-center gap-4 xl:flex">
          <NavLink to="/" end className={NAV_LINK_CLASS}>
            홈
          </NavLink>
          {NAV_GROUPS.map((group) => (
            <NavDropdown key={group.key} group={group} />
          ))}
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
            <li>
              <Link to="/" onClick={() => setOpen(false)} className="block py-3 text-sm text-muted-foreground">
                홈
              </Link>
            </li>
            {NAV_GROUPS.map((group) => (
              <li key={group.key}>
                <MobileNavGroup
                  groupKey={group.key}
                  label={group.label}
                  items={group.items}
                  onNavigate={() => setOpen(false)}
                />
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
