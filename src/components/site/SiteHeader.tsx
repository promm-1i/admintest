import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "홈" },
  { to: "/about", label: "소개" },
  { to: "/services", label: "서비스" },
  { to: "/samples", label: "포트폴리오" },
  { to: "/notices", label: "공지사항" },
] as const;

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
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center text-lg font-semibold tracking-tight">
          Mint
          <span
            aria-hidden="true"
            className="mx-[3px] inline-block h-[0.85em] w-[3px] rounded-sm bg-primary"
          />
          CL
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `text-sm transition-colors hover:text-foreground ${
                  isActive ? "font-medium text-foreground" : "text-muted-foreground"
                }`
              }
            >
              {item.label}
            </NavLink>
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

        <div className="flex items-center gap-2 md:hidden">
          <Button asChild size="sm" className="font-bold gap-1">
            <Link to="/contact">
              <Send className="h-3.5 w-3.5" />
              문의
            </Link>
          </Button>
          <button
            type="button"
            aria-label="메뉴 열기"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background md:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm text-muted-foreground"
                >
                  {item.label}
                </Link>
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
