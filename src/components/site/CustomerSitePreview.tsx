/**
 * 고객 홈페이지를 iframe으로 축소하지 않고, 레이아웃만 추상적으로 표현하는
 * 정적 프리뷰. 실제 데이터나 기능은 담지 않는 시각적 목업이다.
 */
export function CustomerSitePreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border bg-secondary/40 px-5 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Customer Site Preview
        </p>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="h-3 w-20 rounded-full bg-foreground/70" />
          <div className="hidden gap-3 sm:flex">
            <span className="h-2 w-10 rounded-full bg-muted-foreground/20" />
            <span className="h-2 w-10 rounded-full bg-muted-foreground/20" />
            <span className="h-2 w-10 rounded-full bg-muted-foreground/20" />
          </div>
          <span className="h-6 w-16 rounded-full bg-primary/15" />
        </div>
        <div className="mt-6 rounded-xl bg-secondary/30 px-6 py-8 text-center">
          <span className="mx-auto block h-3 w-44 rounded-full bg-foreground/50" />
          <span className="mx-auto mt-3 block h-2 w-56 rounded-full bg-muted-foreground/20" />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border border-border p-2.5">
              <div className="h-12 rounded-md bg-secondary/40" />
              <span className="mt-2 block h-2 w-3/4 rounded-full bg-muted-foreground/20" />
              <span className="mt-1.5 block h-2 w-1/2 rounded-full bg-muted-foreground/15" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
