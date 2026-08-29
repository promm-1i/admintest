import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

export function IndustryAdminPageShell({
  title,
  homeHref,
  backHref,
  children,
}: {
  title: string;
  homeHref: string;
  backHref: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background px-4 py-3 sm:px-6">
        <div>
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
            WEB SOLUTION DEMO
          </p>
          <h1 className="mt-0.5 text-base font-semibold text-foreground">{title}</h1>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <Button asChild size="sm" variant="outline" className="gap-1.5">
            <Link to={homeHref}>
              <Home className="h-3.5 w-3.5" />
              홈페이지 가기
            </Link>
          </Button>
          <Link
            to={backHref}
            className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            <ArrowLeft className="h-4 w-4" />
            솔루션 페이지로 돌아가기
          </Link>
        </div>
      </header>

      {children}
    </div>
  );
}
