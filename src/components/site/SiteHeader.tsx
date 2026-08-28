import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { WebSolutionMegaMenu, WEB_SOLUTION_CATEGORIES } from "@/components/site/WebSolutionMegaMenu";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const NAV_LINK_CLASS = ({ isActive }: { isActive: boolean }) =>
  `text-sm transition-colors hover:text-foreground ${
    isActive ? "font-medium text-foreground" : "text-muted-foreground"
  }`;

// /services 페이지 안의 두 섹션(제작 유형 · 가격 안내)을 각각 다른 메뉴명으로 노출한다.
// 새 페이지가 아니라 앵커 링크라 NavLink의 활성 상태(경로 기준) 대신 일반 Link를 쓴다.
const ANCHOR_LINK_CLASS = "text-sm text-muted-foreground transition-colors hover:text-foreground";

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

        <nav className="hidden items-center gap-5 lg:flex">
          <NavLink to="/" end className={NAV_LINK_CLASS}>
            홈
          </NavLink>
          <Link to="/services#types" className={ANCHOR_LINK_CLASS}>
            홈페이지 제작
          </Link>
          <WebSolutionMegaMenu />
          <NavLink to="/samples" className={NAV_LINK_CLASS}>
            포트폴리오
          </NavLink>
          <Link to="/services#pricing" className={ANCHOR_LINK_CLASS}>
            제작비용
          </Link>
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

        <div className="flex items-center gap-2 lg:hidden">
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
        <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border bg-background lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            <li>
              <Link to="/" onClick={() => setOpen(false)} className="block py-3 text-sm text-muted-foreground">
                홈
              </Link>
            </li>
            <li>
              <Link
                to="/services#types"
                onClick={() => setOpen(false)}
                className="block py-3 text-sm text-muted-foreground"
              >
                홈페이지 제작
              </Link>
            </li>
            <li>
              <Accordion type="single" collapsible>
                <AccordionItem value="web-solution" className="border-b-0">
                  <AccordionTrigger className="py-3 text-sm text-muted-foreground hover:no-underline data-[state=open]:text-foreground">
                    웹 솔루션
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3 pb-2 pl-1">
                      {WEB_SOLUTION_CATEGORIES.map((item) =>
                        item.href ? (
                          <li key={item.title}>
                            <Link
                              to={item.href}
                              onClick={() => setOpen(false)}
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
            </li>
            <li>
              <Link to="/samples" onClick={() => setOpen(false)} className="block py-3 text-sm text-muted-foreground">
                포트폴리오
              </Link>
            </li>
            <li>
              <Link
                to="/services#pricing"
                onClick={() => setOpen(false)}
                className="block py-3 text-sm text-muted-foreground"
              >
                제작비용
              </Link>
            </li>
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
