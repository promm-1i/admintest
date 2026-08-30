import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, Send, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  TEMPLATE_PACKAGES,
  PRICING_ROWS,
  PRODUCTION_PERIOD,
  PERIOD_INFO,
  formatMan,
} from "@/lib/templatePackages";

/**
 * ⓘ 아이콘 툴팁. 아이콘 기준 왼쪽 정렬로 열려 표 왼쪽 밖으로 잘리지 않고,
 * 아래쪽 행은 side="top"으로 위로 열어 스크롤 컨테이너에 잘리지 않게 한다.
 */
function InfoTip({ lines, side = "bottom" }: { lines: string[]; side?: "top" | "bottom" }) {
  return (
    <span className="group relative ml-1 inline-flex align-middle">
      <button
        type="button"
        aria-label="자세한 정보 보기"
        className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full text-muted-foreground/70 transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none"
      >
        <Info className="h-3.5 w-3.5" />
      </button>
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute left-0 z-30 w-max rounded-lg bg-neutral-800 px-3.5 py-2.5 text-left text-[11px] font-medium leading-relaxed text-white opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none",
          side === "bottom"
            ? "top-full mt-2 translate-y-1 group-hover:translate-y-0 group-focus-within:translate-y-0"
            : "bottom-full mb-2 -translate-y-1 group-hover:translate-y-0 group-focus-within:translate-y-0",
        )}
      >
        <span
          className={cn(
            "absolute left-3 h-2 w-2 rotate-45 bg-neutral-800",
            side === "bottom" ? "-top-1" : "-bottom-1",
          )}
        />
        {lines.map((l) => (
          <span key={l} className="block whitespace-nowrap">
            {l}
          </span>
        ))}
      </span>
    </span>
  );
}

type Frame = { left: number; top: number; width: number; height: number };

/**
 * 템플릿 요금제 4구조 비교표.
 * 열 강조는 셀 테두리 대신 절대배치 프레임 하나가 열 사이를 미끄러져 이동하는 방식이라
 * hover 시 레이아웃이 전혀 흔들리지 않는다.
 */
export function PricingComparison() {
  const [active, setActive] = useState<number | null>(null);
  const tableRef = useRef<HTMLTableElement | null>(null);
  const headRefs = useRef<(HTMLTableCellElement | null)[]>([]);
  const [frame, setFrame] = useState<Frame | null>(null);

  useEffect(() => {
    if (active === null) return; // 마지막 위치를 유지한 채 opacity로만 사라진다
    const table = tableRef.current;
    const th = headRefs.current[active];
    if (!table || !th) return;
    const top = th.offsetTop + th.offsetHeight;
    setFrame({
      left: th.offsetLeft,
      top,
      width: th.offsetWidth,
      height: table.offsetHeight - top,
    });
  }, [active]);

  return (
    <div>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          홈페이지 제작 비용 안내
          <span className="ml-2 align-middle text-sm font-medium text-muted-foreground">(VAT 별도)</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          호스팅 · 셋팅 · 업종 전용 기능이 모두 포함된 금액입니다.
        </p>
      </div>

      <div className="mt-8 overflow-x-auto pb-2">
        <div className="relative">
          <table
            ref={tableRef}
            className="w-full min-w-[880px] border-separate border-spacing-0 text-sm"
            onMouseLeave={() => setActive(null)}
          >
            <caption className="sr-only">템플릿 패키지별 제공 항목과 제작 비용 비교</caption>

            <thead>
              <tr>
                <th scope="col" className="w-[200px] px-4 pb-3 text-left align-bottom">
                  <span className="text-xs font-semibold text-muted-foreground">구분</span>
                </th>
                {TEMPLATE_PACKAGES.map((p, i) => (
                  <th
                    key={p.key}
                    ref={(el) => {
                      headRefs.current[i] = el;
                    }}
                    scope="col"
                    tabIndex={0}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="relative px-3 pb-3 align-bottom focus-visible:outline-none"
                  >
                    {p.badge && (
                      <span
                        className={cn(
                          "mb-2 inline-block rounded-full px-3 py-1 text-[11px] font-bold text-white shadow-sm",
                          p.badgeTone === "recommended" ? "bg-primary" : "bg-emerald-500",
                        )}
                      >
                        {p.badge}
                      </span>
                    )}
                    <span
                      className={cn(
                        "block rounded-t-lg px-3 py-2.5 text-base font-bold transition-colors duration-300",
                        active === i
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/60 text-foreground",
                      )}
                    >
                      {p.label}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {PRICING_ROWS.map((row, rowIdx) => (
                <tr key={row.label} className={rowIdx % 2 ? "bg-secondary/25" : ""}>
                  <th scope="row" className="border-t border-border px-4 py-3 text-left font-medium">
                    <span className="text-foreground">{row.label}</span>
                    {row.required && (
                      <span className="ml-1.5 align-top text-[10px] font-bold text-primary">필수</span>
                    )}
                    {row.info && <InfoTip lines={row.info} side={row.infoSide ?? "bottom"} />}
                    {row.note && (
                      <span className="mt-0.5 block text-[11px] font-normal leading-snug text-muted-foreground">
                        {row.note}
                      </span>
                    )}
                  </th>
                  {row.values.map((v, i) => (
                    <td
                      key={`${row.label}-${i}`}
                      onMouseEnter={() => setActive(i)}
                      className={cn(
                        "border-t border-border px-4 py-3 text-center transition-colors duration-300",
                        active === i ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}

              {/* 합계로 내려가는 화살표 */}
              <tr>
                <td className="border-t border-border" />
                {TEMPLATE_PACKAGES.map((p, i) => (
                  <td
                    key={`${p.key}-arrow`}
                    onMouseEnter={() => setActive(i)}
                    className="border-t border-border px-4 py-3 text-center"
                  >
                    <ArrowDown
                      className={cn(
                        "mx-auto h-4 w-4 transition-colors duration-300",
                        active === i ? "text-primary" : "text-border",
                      )}
                    />
                  </td>
                ))}
              </tr>

              {/* 기본 제작 비용 — 결과 행이라 항상 붉게 강조 */}
              <tr className="bg-primary/[0.04]">
                <th
                  scope="row"
                  className="border-t-2 border-primary/25 px-4 py-4 text-left text-base font-bold text-foreground"
                >
                  기본 제작 비용
                </th>
                {TEMPLATE_PACKAGES.map((p, i) => (
                  <td
                    key={`${p.key}-total`}
                    onMouseEnter={() => setActive(i)}
                    className="border-t-2 border-primary/25 px-4 py-4 text-center"
                  >
                    <span className="text-lg font-extrabold text-primary sm:text-xl">
                      {formatMan(p.total)} ~
                    </span>
                  </td>
                ))}
              </tr>

              {/* 제작 기간 */}
              <tr>
                <th
                  scope="row"
                  className="border-y border-border px-4 py-3 text-left font-medium text-foreground"
                >
                  제작 기간
                  <InfoTip lines={PERIOD_INFO} side="top" />
                </th>
                {TEMPLATE_PACKAGES.map((p, i) => (
                  <td
                    key={`${p.key}-period`}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      "border-y border-border px-4 py-3 text-center transition-colors duration-300",
                      active === i ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {PRODUCTION_PERIOD}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>

          {/* 활성 열을 감싸고 열 사이를 미끄러져 이동하는 강조 프레임 */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute rounded-b-lg border-2 border-primary bg-primary/[0.05] transition-all duration-300 ease-out motion-reduce:transition-none",
              active === null || !frame ? "opacity-0" : "opacity-100",
            )}
            style={frame ?? undefined}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button asChild size="lg" className="gap-2 font-bold">
          <Link to="/contact">
            <Send className="h-4 w-4" />
            견적 상담받기
          </Link>
        </Button>
      </div>
    </div>
  );
}
