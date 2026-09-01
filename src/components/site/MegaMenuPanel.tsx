import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { NavDropdownEntry, NavTemplateGroup } from "./navData";

type Props = {
  entry: NavDropdownEntry;
  onNavigate: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

/**
 * 업종을 먼저 고르고(왼쪽), 그 업종의 디자인 시안을 고르는(오른쪽) 2단 패널.
 * 업종당 시안이 여러 개라 한 번에 다 펼치면 같은 업종명이 반복돼 읽기 어렵다.
 */
function TemplateFlyout({ groups, onNavigate }: { groups: NavTemplateGroup[]; onNavigate: () => void }) {
  const [activeKey, setActiveKey] = useState(groups[0]?.key ?? "");
  const active = groups.find((g) => g.key === activeKey) ?? groups[0];

  return (
    <div className="flex max-h-[76vh] w-[640px] max-w-[78vw] overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
      <ul className="w-[190px] shrink-0 overflow-y-auto overscroll-contain border-r border-border p-2">
        {groups.map((g) => (
          <li key={g.key}>
            <button
              type="button"
              onMouseEnter={() => setActiveKey(g.key)}
              onFocus={() => setActiveKey(g.key)}
              aria-current={g.key === active?.key}
              className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                g.key === active?.key
                  ? "bg-primary/8 font-semibold text-primary"
                  : "text-foreground/80 hover:bg-secondary"
              }`}
            >
              {g.label}
              <ChevronRight className="size-3.5 shrink-0 opacity-50" />
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div className="flex-1 overflow-y-auto overscroll-contain p-3">
          <p className="px-1 pb-2 text-xs font-semibold text-muted-foreground">
            {active.label} · 디자인 {active.designs.length}종
          </p>
          <ul className="grid grid-cols-2 gap-2">
            {active.designs.map((d) => (
              <li key={d.href}>
                <Link
                  to={d.href}
                  onClick={onNavigate}
                  className="group/item block overflow-hidden rounded-lg border border-border transition-colors hover:border-primary/60 hover:bg-primary/5"
                >
                  {d.image && (
                    <img
                      src={d.image}
                      alt=""
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover object-top"
                    />
                  )}
                  <span className="flex items-baseline justify-between gap-1 px-2 py-1.5">
                    <span className="text-xs font-semibold text-foreground/90 group-hover/item:text-primary">
                      {d.label}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">{d.code}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/**
 * 대메뉴 트리거 바로 아래, 정확히 같은 중심축에 뜨는 드롭다운 패널.
 * 트리거를 감싸는 relative wrapper 기준 left-1/2 + -translate-x-1/2로
 * 위치를 고정하므로 centerX 오차가 항상 0px다.
 */
export function MegaMenuPanel({ entry, onNavigate, onMouseEnter, onMouseLeave }: Props) {
  return (
    <div
      role="region"
      aria-label={entry.label}
      className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ul className="min-w-[220px] rounded-2xl border border-border bg-background py-2.5 shadow-xl motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 motion-safe:duration-200 motion-safe:ease-out">
        {entry.items.map((item, i) => {
          // 앞 항목과 group이 달라지는 지점에 얇은 구분선 + 소제목을 넣는다
          const groupStart = item.group && item.group !== entry.items[i - 1]?.group;
          return (
            <li key={item.label} className={item.children ? "group/fly relative" : undefined}>
              {groupStart && (
                <div className="mx-5 mb-1 mt-2 border-t border-border pt-2">
                  <p className="text-center text-xs font-semibold tracking-wide text-muted-foreground">
                    {item.group}
                  </p>
                </div>
              )}
              <Link
                to={item.href}
                onClick={onNavigate}
                className="relative flex items-center justify-center whitespace-nowrap rounded-lg px-9 py-2.5 text-center text-base text-foreground/80 transition-colors hover:bg-secondary hover:font-semibold hover:text-foreground"
              >
                {item.label}
                {item.children && (
                  <ChevronRight className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                )}
              </Link>

              {/* hover 시 우측으로 펼쳐지는 업종 → 디자인 2단계 플라이아웃 */}
              {item.children && (
                <div className="invisible absolute left-full top-0 z-10 pl-2 opacity-0 transition-all duration-200 group-hover/fly:visible group-hover/fly:opacity-100 group-focus-within/fly:visible group-focus-within/fly:opacity-100 motion-reduce:transition-none">
                  <TemplateFlyout groups={item.children} onNavigate={onNavigate} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
