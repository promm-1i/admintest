import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ExternalLink, Menu, Search, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Logo } from "@/components/site/Logo";
import { HEADER_NAV, type NavDropdownEntry } from "@/components/site/navData";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const MEGA_CLOSE_DELAY = 140;

function MobileNavGroup({ entry, onNavigate }: { entry: NavDropdownEntry; onNavigate: () => void }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={entry.key} className="border-b border-border">
        <AccordionTrigger className="py-4 text-base font-bold hover:no-underline">{entry.label}</AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-3 pb-5">
            {entry.items.map((item) => (
              <li key={item.label}>
                <Link to={item.href} onClick={onNavigate} className="flex items-center justify-between py-1 text-sm text-muted-foreground">
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
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const { isAdmin } = useAuth();

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    setActiveKey(null);
  }, [pathname]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const showMega = (key: string) => {
    window.clearTimeout(closeTimer.current);
    setActiveKey(key);
    setMegaOpen(true);
  };
  const keepMegaOpen = () => window.clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setMegaOpen(false);
      setActiveKey(null);
    }, MEGA_CLOSE_DELAY);
  };

  return (
    <header
      className={cn(
        "left-0 right-0 top-0 z-50 border-b border-border/55 bg-background/88 backdrop-blur-md",
        isHome ? "fixed" : "sticky",
      )}
      onMouseLeave={scheduleClose}
    >
      <div className="relative mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link to="/" className="flex min-w-[180px] items-center" aria-label="NOVERIQ 홈">
          <Logo wordmarkClassName="text-xl sm:text-2xl" />
        </Link>

        <nav className="absolute left-1/2 hidden h-full -translate-x-1/2 items-center xl:flex" aria-label="주요 메뉴">
          {HEADER_NAV.map((entry) => {
            if (entry.type === "dropdown") {
              const href = entry.items[0]?.href ?? "/";
              return (
                <Link
                  key={entry.key}
                  to={href}
                  onMouseEnter={() => showMega(entry.key)}
                  onFocus={() => showMega(entry.key)}
                  className={cn(
                    "flex h-full min-w-[126px] items-center justify-center whitespace-nowrap px-4 text-base font-bold transition-colors",
                    activeKey === entry.key ? "text-primary" : "text-foreground hover:text-primary",
                  )}
                >
                  {entry.label}
                </Link>
              );
            }
            return entry.external ? (
              <a key={entry.key} href={entry.href} target="_blank" rel="noopener noreferrer" className="flex h-full min-w-[126px] items-center justify-center gap-1 px-4 text-base font-bold">
                {entry.label}<ExternalLink className="size-3.5" />
              </a>
            ) : (
              <Link key={entry.key} to={entry.href} className="flex h-full min-w-[126px] items-center justify-center px-4 text-base font-bold">{entry.label}</Link>
            );
          })}
        </nav>

        <div className="hidden min-w-[180px] items-center justify-end gap-4 xl:flex">
          {isAdmin && <Link to="/admin" className="text-sm font-bold text-primary">관리자</Link>}
          <Link to="/search" aria-label="검색" className="flex h-11 w-11 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <Search className="size-5" />
          </Link>
        </div>

        <div className="flex items-center gap-1 xl:hidden">
          <Link to="/search" aria-label="검색" className="flex h-11 w-11 items-center justify-center"><Search className="size-5" /></Link>
          <button type="button" aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)} className="flex h-11 w-11 items-center justify-center">
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {megaOpen && (
        <div className="absolute inset-x-0 top-full hidden border-t border-border bg-background shadow-[0_18px_36px_rgba(0,0,0,0.12)] xl:block" onMouseEnter={keepMegaOpen} onMouseLeave={scheduleClose}>
          <div className="mx-auto grid max-w-[1440px] grid-cols-[180px_repeat(6,minmax(0,1fr))_180px] px-10 py-8">
            <div />
            {HEADER_NAV.map((entry) => (
              <div key={entry.key} className={cn("border-l border-border px-5", activeKey === entry.key && "bg-secondary/45")}>
                <p className="mb-4 text-sm font-black">{entry.label}</p>
                {entry.type === "dropdown" && (
                  <ul className="space-y-2.5">
                    {entry.items.slice(0, 8).map((item) => (
                      <li key={item.label}>
                        <Link to={item.href} onClick={() => setMegaOpen(false)} className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground">{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <div className="border-l border-border pl-6">
              <p className="text-sm font-black">바로가기</p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li><Link to="/web-solutions/demos" onClick={() => setMegaOpen(false)}>업종별 데모</Link></li>
                <li><Link to="/templates" onClick={() => setMegaOpen(false)}>전체 템플릿</Link></li>
                <li><Link to="/faq" onClick={() => setMegaOpen(false)}>자주 묻는 질문</Link></li>
                <li><Link to="/contact" onClick={() => setMegaOpen(false)}>상담 문의</Link></li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {mobileOpen && (
        <nav className="max-h-[calc(100vh-76px)] overflow-y-auto border-t border-border bg-background xl:hidden" aria-label="모바일 메뉴">
          <div className="px-5 pb-8 pt-2 sm:px-8">
            {HEADER_NAV.map((entry) => entry.type === "dropdown" ? (
              <MobileNavGroup key={entry.key} entry={entry} onNavigate={() => setMobileOpen(false)} />
            ) : entry.external ? (
              <a key={entry.key} href={entry.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border-b border-border py-4 text-base font-bold">{entry.label}<ExternalLink className="size-4" /></a>
            ) : (
              <Link key={entry.key} to={entry.href} onClick={() => setMobileOpen(false)} className="block border-b border-border py-4 text-base font-bold">{entry.label}</Link>
            ))}
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="mt-6 flex h-12 items-center justify-center bg-primary text-sm font-bold text-primary-foreground">상담 문의</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
