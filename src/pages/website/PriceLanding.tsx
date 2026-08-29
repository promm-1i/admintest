import { Link } from "react-router-dom";
import { Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { PRODUCT_TYPES, ADDONS, PRICING_NOTE } from "@/lib/pricing";

const EXTRA_FEATURES = [
  ...ADDONS.map((a) => ({ name: a.name, price: a.price })),
  { name: "다국어 지원", price: "별도 협의" },
  { name: "회원 기능", price: "별도 협의" },
  { name: "결제 연동", price: "별도 협의" },
  { name: "외부 API 연동", price: "별도 협의" },
];

const QUOTE_FACTORS = [
  "페이지 수",
  "디자인 난이도",
  "관리자 기능",
  "데이터베이스",
  "회원 기능",
  "예약 기능",
  "결제 연동",
  "외부 API 연동",
  "다국어 지원",
  "자료 정리 정도",
];

export default function PriceLanding() {
  usePageTitle(
    "제작 비용 — MintCL",
    "홈페이지 제작 유형별 가격과 추가 기능 비용을 안내합니다. 정확한 견적은 상담 후 확정됩니다.",
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">PRICING</p>
      <h1 className="mt-3 text-3xl font-semibold">규모와 필요한 기능에 따라 달라지는 홈페이지 제작비</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
        기본 제작비와 추가 기능을 구분해 상담 전에 대략적인 비용을 확인하실 수 있습니다.
      </p>

      <h2 className="mt-16 text-xl font-semibold">제작 유형별 가격</h2>
      <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
        {PRODUCT_TYPES.map((type) => (
          <div key={type.name} className="flex flex-col gap-3 p-6 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-foreground">{type.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground break-keep">{type.desc}</p>
              <p className="mt-2 text-xs text-muted-foreground/80 break-keep">적합한 대상: {type.bullets.join(" · ")}</p>
            </div>
            <span className="shrink-0 text-lg font-bold text-primary">{type.price}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground/80 break-keep">※ {PRICING_NOTE}</p>

      <h2 className="mt-16 text-xl font-semibold">템플릿형 vs 맞춤형 가격 구조</h2>
      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className="text-base font-semibold text-foreground">템플릿 제작</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-keep">이미 만들어진 디자인 기반으로 제작합니다.</p>
          <ul className="mt-4 space-y-2">
            {["빠른 제작", "낮은 비용", "수정 범위 제한"].map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-foreground break-keep">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="sm:border-l sm:border-border sm:pl-8">
          <h3 className="text-base font-semibold text-foreground">맞춤 제작</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-keep">구조와 기능을 요구에 맞게 설계합니다.</p>
          <ul className="mt-4 space-y-2">
            {["디자인 자유도 높음", "기능 추가 가능", "관리자 / DB 가능", "업종별 시스템 구축 가능"].map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-foreground break-keep">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground/80">가격은 요구사항에 따라 달라집니다.</p>
        </div>
      </div>

      <h2 className="mt-16 text-xl font-semibold">추가 기능 가격</h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {EXTRA_FEATURES.map((item) => (
          <li
            key={item.name}
            className="flex items-center justify-between gap-4 rounded-lg bg-secondary/40 px-4 py-3 border border-border/40"
          >
            <span className="font-medium text-foreground break-keep">{item.name}</span>
            <span className="shrink-0 font-semibold text-primary">{item.price}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-16 text-xl font-semibold">견적이 달라지는 이유</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
        같은 유형이어도 아래 항목에 따라 최종 견적이 달라질 수 있습니다.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {QUOTE_FACTORS.map((f) => (
          <span key={f} className="rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
            {f}
          </span>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
        <p className="text-sm text-muted-foreground">정확한 견적은 필요한 페이지와 기능을 확인한 후 안내드립니다.</p>
        <div className="mt-5 flex justify-center">
          <Button asChild size="lg" className="gap-2 font-bold">
            <Link to="/contact">
              <Send className="h-4 w-4" />
              내 홈페이지 견적 문의하기
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
