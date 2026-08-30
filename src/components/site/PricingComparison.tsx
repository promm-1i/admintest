import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, Send, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  TEMPLATE_PACKAGES,
  PRICING_ROWS,
  LUMP_SUM,
  PRODUCTION_PERIOD,
  PERIOD_INFO,
  formatMan,
} from "@/lib/templatePackages";

/** ⓘ 아이콘. 마우스를 올리거나 키보드로 포커스하면 어두운 말풍선으로 상세 정보를 보여준다. */
function InfoTip({ lines }: { lines: string[] }) {
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
        className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 w-max max-w-[260px] -translate-x-1/2 translate-y-1 rounded-lg bg-neutral-800 px-3.5 py-2.5 text-left text-[11px] font-medium leading-relaxed text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:transition-none"
      >
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-neutral-800" />
        {lines.map((l) => (
          <span key={l} className="block whitespace-nowrap">
            {l}
          </span>
        ))}
      </span>
    </span>
  );
}

type CellPos = "head" | "body" | "last";

/**
 * 템플릿 요금제 4구조 비교표.
 * 마우스를 올린(또는 포커스한) 열은 위아래로 이어지는 테두리와 헤더 강조로 전체가 묶여 보인다.
 */
export function PricingComparison() {
  const [active, setActive] = useState<number | null>(null);

  /** 활성 열에만 좌우 테두리를 주어 열 전체가 하나의 카드처럼 보이게 한다. */
  const colCls = (i: number, pos: CellPos) => {
    const on = active === i;
    return cn(
      "transition-colors duration-200",
      on && "border-x-2 border-x-primary bg-primary/[0.06]",
      on && pos === "head" && "border-t-2 border-t-primary",
      on && pos === "last" && "border-b-2 border-b-primary",
    );
  };

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

      <div className="mt-8 overflow-x-auto overflow-y-visible pb-2">
        <table
          className="w-full min-w-[880px] border-separate border-spacing-0 text-sm"
          onMouseLeave={() => setActive(null)}
        >
          <caption className="sr-only">템플릿 패키지별 제공 항목과 제작 비용 비교</caption>

          <thead>
            <tr>
              <th scope="col" className="w-[210px] px-4 pb-3 text-left align-bottom">
                <span className="text-xs font-semibold text-muted-foreground">구분</span>
              </th>
              {TEMPLATE_PACKAGES.map((p, i) => (
                <th
                  key={p.key}
                  scope="col"
                  tabIndex={0}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={cn(
                    "relative px-4 pb-3 align-bottom focus-visible:outline-none",
                    "transition-colors duration-200",
                  )}
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
                      "block rounded-t-lg px-3 py-2.5 text-base font-bold transition-colors duration-200",
                      active === i
                        ? "border-x-2 border-t-2 border-primary bg-primary text-primary-foreground"
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
                  {row.info && <InfoTip lines={row.info} />}
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
                      "border-t border-border px-4 py-3 text-center",
                      active === i ? "font-semibold text-foreground" : "text-muted-foreground",
                      colCls(i, rowIdx === 0 ? "head" : "body"),
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
                  className={cn("border-t border-border px-4 py-3 text-center", colCls(i, "body"))}
                >
                  <ArrowDown
                    className={cn(
                      "mx-auto h-4 w-4 transition-colors duration-200",
                      active === i ? "text-primary" : "text-border",
                    )}
                  />
                </td>
              ))}
            </tr>

            {/* 기본 제작 비용 */}
            <tr>
              <th scope="row" className="border-t border-border px-4 py-4 text-left font-bold text-foreground">
                기본 제작 비용
              </th>
              {TEMPLATE_PACKAGES.map((p, i) => (
                <td
                  key={`${p.key}-total`}
                  onMouseEnter={() => setActive(i)}
                  className={cn("border-t border-border px-4 py-4 text-center", colCls(i, "body"))}
                >
                  <span
                    className={cn(
                      "text-lg font-extrabold transition-colors duration-200 sm:text-xl",
                      active === i ? "text-primary" : "text-foreground",
                    )}
                  >
                    {formatMan(p.total)} ~
                  </span>
                </td>
              ))}
            </tr>

            {/* 제작 기간 */}
            <tr>
              <th scope="row" className="border-y border-border px-4 py-3 text-left font-medium text-foreground">
                제작 기간
                <InfoTip lines={PERIOD_INFO} />
              </th>
              {TEMPLATE_PACKAGES.map((p, i) => (
                <td
                  key={`${p.key}-period`}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "border-y border-border px-4 py-3 text-center text-muted-foreground",
                    colCls(i, "last"),
                  )}
                >
                  {PRODUCTION_PERIOD}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* 일시불 옵션 + CTA */}
      <div className="mt-8 grid gap-4 rounded-2xl border border-border bg-secondary/30 p-6 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="text-sm font-bold text-foreground">한 번에 구매하는 일시불 옵션도 있습니다</p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {LUMP_SUM.map((l, i) => (
              <span key={l.label}>
                {i > 0 && <span className="mx-2 text-border">|</span>}
                {l.label} <strong className="font-bold text-foreground">{formatMan(l.price)}</strong>
              </span>
            ))}
            <span className="ml-2 text-xs">(VAT 별도)</span>
          </p>
        </div>
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
