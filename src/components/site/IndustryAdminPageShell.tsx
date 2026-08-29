import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

export function IndustryAdminPageShell({
  title,
  homeHref,
  backHref,
  onResetDemoData,
  children,
}: {
  title: string;
  homeHref: string;
  backHref: string;
  onResetDemoData?: () => void;
  children: ReactNode;
}) {
  const handleReset = () => {
    if (!onResetDemoData) return;
    if (!window.confirm("이 업종의 모든 데모 데이터를 최신 샘플로 초기화합니다. 지금까지 등록·수정한 내용이 사라집니다. 계속하시겠습니까?")) return;
    onResetDemoData();
    toast.success("데모 데이터가 초기화되었습니다.");
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background px-4 py-3 sm:px-6">
        <div>
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
            WEB SOLUTION DEMO
          </p>
          <h1 className="mt-0.5 text-base font-semibold text-foreground">{title}</h1>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          {onResetDemoData && (
            <Button size="sm" variant="outline" className="gap-1.5" onClick={handleReset}>
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">데모 데이터 초기화</span>
            </Button>
          )}
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
