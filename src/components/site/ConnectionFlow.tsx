import { Settings, Eye, ArrowRight, LayoutDashboard, Globe } from "lucide-react";

/** 관리자 ↔ 고객 홈페이지가 하나의 데이터로 연결된다는 것을 보여주는 단순 다이어그램. */
export function ConnectionFlow({ note }: { note: string }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/30 p-6 sm:p-8">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
        <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card px-6 py-4">
          <LayoutDashboard className="h-5 w-5 text-primary" />
          <p className="text-sm font-semibold text-foreground">관리자</p>
        </div>

        <div className="flex flex-col items-center gap-1.5 text-muted-foreground sm:rotate-0">
          <ArrowRight className="h-4 w-4 rotate-90 sm:rotate-0" />
          <div className="flex items-center gap-1.5 text-[11px]">
            <Settings className="h-3 w-3" />
            데이터 관리
          </div>
          <div className="flex items-center gap-1.5 text-[11px]">
            <Eye className="h-3 w-3" />
            공개 설정
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card px-6 py-4">
          <Globe className="h-5 w-5 text-primary" />
          <p className="text-sm font-semibold text-foreground">고객 홈페이지</p>
        </div>
      </div>
      <p className="mt-5 text-center text-sm leading-relaxed text-muted-foreground break-keep">{note}</p>
    </div>
  );
}
