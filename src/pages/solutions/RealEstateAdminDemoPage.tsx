import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { RealEstateAdminDemo } from "@/pages/solutions/RealEstateAdminDemo";

export default function RealEstateAdminDemoPage() {
  usePageTitle(
    "부동산 관리자 데모 — MintCL",
    "부동산 매물관리 웹 솔루션의 관리자 기능을 직접 체험해볼 수 있는 데모 페이지입니다.",
  );

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background px-4 py-3 sm:px-6">
        <div>
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
            WEB SOLUTION DEMO
          </p>
          <h1 className="mt-0.5 text-base font-semibold text-foreground">
            부동산 매물관리 관리자 데모
          </h1>
        </div>
        <Link
          to="/web-solutions/real-estate"
          className="flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          솔루션 페이지로 돌아가기
        </Link>
      </header>

      <RealEstateAdminDemo />
    </div>
  );
}
