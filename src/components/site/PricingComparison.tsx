import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  TEMPLATE_PACKAGES,
  PRICING_ROWS,
  LUMP_SUM,
  PRODUCTION_PERIOD,
  formatMan,
} from "@/lib/templatePackages";

/**
 * 템플릿 요금제 4구조 비교표. 마우스를 올린(또는 키보드로 포커스한) 열 전체가 강조된다.
 * 열이 4개라 좁은 화면에서는 가로 스크롤로 넘긴다.
 */
export function PricingComparison() {
  const [active, setActive] = useState<number | null>(null);

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

      <div className="mt-6 overflow-x-auto pb-2">
        <table
          className="w-full min-w-[860px] border-separate border-spacing-0 text-sm"
          onMouseLeave={() => setActive(null)}
        >
          <caption className="sr-only">템플릿 패키지별 제공 항목과 제작 비용 비교</caption>
          <thead>
            <tr>
              <th scope="col" className="w-[190px] px-4 pb-3 text-left align-bottom">
                <span className="text-xs font-semibold text-muted-foreground">구분</span>
              </th>
              {TEMPLATE_PACKAGES.map((p, i) => (
                <th
                  key={p.key}
                  scope="col"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  tabIndex={0}
                  className={cn(
                    "relative px-4 pb-3 align-bottom transition-colors duration-200",
                    active === i ? "text-primary" : "text-foreground",
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
                  <span className="block text-base font-bold">{p.label}</span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {PRICING_ROWS.map((row, rowIdx) => (
              <tr key={row.label} className={rowIdx % 2 ? "bg-secondary/30" : ""}>
                <th scope="row" className="border-t border-border px-4 py-3 text-left font-medium">
                  <span className="text-foreground">{row.label}</span>
                  {row.required && (
                    <span className="ml-1.5 align-top text-[10px] font-bold text-primary">필수</span>
                  )}
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
                      "border-t border-border px-4 py-3 text-center transition-colors duration-200",
                      active === i
                        ? "bg-primary/[0.07] font-semibold text-foreground"
                        : "text-muted-foreground",
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
                  className={cn(
                    "border-t border-border px-4 py-3 text-center transition-colors duration-200",
                    active === i && "bg-primary/[0.07]",
                  )}
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
                  className={cn(
                    "border-t border-border px-4 py-4 text-center transition-colors duration-200",
                    active === i && "bg-primary/[0.07]",
                  )}
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
              </th>
              {TEMPLATE_PACKAGES.map((p, i) => (
                <td
                  key={`${p.key}-period`}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "border-y border-border px-4 py-3 text-center text-muted-foreground transition-colors duration-200",
                    active === i && "bg-primary/[0.07]",
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
