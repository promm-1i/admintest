import type { IndustryFeature } from "./industryShowcase";

type DashboardPreviewProps = {
  stats: { label: string; value: string }[];
  menuIcons: IndustryFeature[];
};

/**
 * 관리자 화면을 iframe으로 축소하지 않고, 대시보드의 레이아웃만 추상적으로
 * 표현하는 정적 프리뷰. 실제 데이터나 기능은 담지 않는 시각적 목업이다.
 */
export function DashboardPreview({ stats, menuIcons }: DashboardPreviewProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border bg-secondary/40 px-5 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Admin Dashboard Preview
        </p>
      </div>
      <div className="flex">
        <div className="hidden w-40 shrink-0 space-y-1 border-r border-border p-4 sm:block">
          {menuIcons.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.label}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs ${
                  i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{f.label}</span>
              </div>
            );
          })}
        </div>
        <div className="min-w-0 flex-1 p-5">
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-secondary/20 p-3">
                <p className="truncate text-[11px] text-muted-foreground">{s.label}</p>
                <p className="mt-1.5 text-xl font-semibold text-foreground">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-border bg-secondary/20 p-4">
            <p className="text-[11px] text-muted-foreground">최근 활동</p>
            <div className="mt-3 flex h-20 items-end gap-2">
              {[40, 65, 50, 80, 55, 70, 45, 90, 60].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-primary/15"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-secondary/20 px-3 py-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary/40" />
                <span className="h-2 flex-1 max-w-40 rounded-full bg-muted-foreground/20" />
                <span className="h-2 w-12 shrink-0 rounded-full bg-muted-foreground/15" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
