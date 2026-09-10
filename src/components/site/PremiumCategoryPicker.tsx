import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { label: string; sample: { slug: string } };
type Group = { key: string; label: string; desc?: string; items: Item[] };

/** 펼친 목록이 이 높이를 넘으면 안쪽에서 스크롤한다 — 오른쪽 큰 화면이 밀려나지 않게 */
const LIST_MAX_PX = 268;
const STEP_PX = 132;

/**
 * 펼친 목록 + 위아래 이동 버튼.
 * 목록이 길어져 스크롤이 생길 때만 버튼이 나타난다 (없을 땐 자리도 차지하지 않는다).
 */
function ScrollableList({
  children,
  openKey,
  isOpen,
}: {
  children: React.ReactNode;
  openKey: string;
  isOpen: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ up: false, down: false });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const slack = 4;
    setEdge({
      up: el.scrollTop > slack,
      down: el.scrollTop + el.clientHeight < el.scrollHeight - slack,
    });
  }, []);

  // 그룹을 바꾸면 맨 위에서 다시 시작한다
  useLayoutEffect(() => {
    if (ref.current) ref.current.scrollTop = 0;
    measure();
  }, [openKey, measure]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const nudge = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ top: dir * STEP_PX, behavior: reduce ? "auto" : "smooth" });
  };

  const Arrow = ({ dir }: { dir: 1 | -1 }) => (
    <button
      type="button"
      onClick={() => nudge(dir)}
      aria-label={dir === -1 ? "목록 위로" : "목록 아래로"}
      // 닫힌 그룹의 버튼은 보이지 않으므로 탭 이동에서도 빼 둔다
      tabIndex={isOpen ? 0 : -1}
      className="flex h-7 w-full items-center justify-center rounded-lg bg-secondary/70 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      {dir === -1 ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
    </button>
  );

  return (
    <div className="pb-2">
      {edge.up && (
        <div className="px-1 pb-1">
          <Arrow dir={-1} />
        </div>
      )}
      <div
        ref={ref}
        onScroll={measure}
        style={{ maxHeight: LIST_MAX_PX }}
        className="overflow-y-auto overscroll-contain px-1 scrollbar-none"
      >
        {children}
      </div>
      {edge.down && (
        <div className="px-1 pt-1">
          <Arrow dir={1} />
        </div>
      )}
    </div>
  );
}

/**
 * 프리미엄 디자인 선택 — 카테고리를 접어 두고, 누른 카테고리만 펼친다.
 * 26종을 한꺼번에 세로로 늘어놓으면 오른쪽 큰 화면이 화면 밖으로 밀려나 같이 볼 수 없었다.
 */
export function PremiumCategoryPicker({
  groups,
  activeSlug,
  onSelect,
}: {
  groups: Group[];
  activeSlug: string;
  onSelect: (slug: string) => void;
}) {
  const groupOf = (slug: string) => groups.find((g) => g.items.some((i) => i.sample.slug === slug))?.key;
  const [openKey, setOpenKey] = useState(() => groupOf(activeSlug) ?? groups[0]?.key ?? "");

  // 다른 경로로 선택이 바뀌면(예: 큰 화면의 링크) 그 카테고리를 펼쳐 준다
  useEffect(() => {
    const k = groupOf(activeSlug);
    if (k) setOpenKey(k);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlug]);

  return (
    <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card/40">
      {groups.map((group) => {
        const isOpen = group.key === openKey;
        const hasActive = group.items.some((i) => i.sample.slug === activeSlug);
        return (
          <div key={group.key}>
            <h4>
              <button
                type="button"
                onClick={() => setOpenKey(isOpen ? "" : group.key)}
                aria-expanded={isOpen}
                className={cn(
                  "flex w-full items-center gap-2.5 px-4 py-3 text-left transition-colors",
                  isOpen ? "bg-primary/[0.06]" : "hover:bg-secondary/50",
                )}
              >
                <span
                  className={cn(
                    "h-4 w-1 shrink-0 rounded-full transition-colors",
                    isOpen || hasActive ? "bg-primary" : "bg-border",
                  )}
                />
                <span className="min-w-0 flex-1 truncate text-[15px] font-bold tracking-tight text-primary">
                  {group.label}
                </span>
                <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground">
                  {group.items.length}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </h4>

            {/* 열고 닫기는 grid-template-rows 로 — 레이아웃 속성을 직접 애니메이션하지 않는다 */}
            <div
              className={cn(
                "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="min-h-0">
                <ScrollableList openKey={openKey} isOpen={isOpen}>
                  <ul className="flex flex-col gap-1">
                    {group.items.map((d) => {
                      const isActive = d.sample.slug === activeSlug;
                      return (
                        <li key={d.sample.slug}>
                          <button
                            type="button"
                            // 클릭으로만 바꾼다 — 호버로 바꾸면 목록을 지나가는 동안 큰 화면이 계속 깜빡였다
                            onClick={() => onSelect(d.sample.slug)}
                            aria-pressed={isActive}
                            tabIndex={isOpen ? 0 : -1}
                            className={cn(
                              "flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left transition-colors",
                              isActive
                                ? "border-primary/40 bg-card shadow-xs"
                                : "border-transparent hover:bg-card/70",
                            )}
                          >
                            <span
                              className={cn(
                                "min-w-0 flex-1 truncate text-sm font-semibold",
                                isActive ? "text-foreground" : "text-muted-foreground",
                              )}
                            >
                              {d.label}
                            </span>
                            <ArrowRight
                              className={cn(
                                "h-3.5 w-3.5 shrink-0",
                                isActive ? "text-primary opacity-100" : "opacity-0",
                              )}
                            />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollableList>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
