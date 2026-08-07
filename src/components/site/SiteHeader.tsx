import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const NAV = [
  { to: "/", label: "홈" },
  { to: "/about", label: "소개" },
  { to: "/services", label: "서비스" },
  { to: "/gallery", label: "갤러리" },
  { to: "/notices", label: "공지사항" },
  { to: "/reserve", label: "예약 문의" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          MINT<span className="text-primary">CL</span> STUDIO
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
          <Button asChild size="sm">
            <Link to="/reserve">예약하기</Link>
          </Button>
        </nav>

        <button
          type="button"
          aria-label="메뉴 열기"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
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
