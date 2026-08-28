import { Link } from "react-router-dom";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { cn } from "@/lib/utils";

type Tier = {
  name: string;
  setupFee: string;
  monthlyFee: string;
  features: string[];
  recommended?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "베이직",
    setupFee: "49만 원",
    monthlyFee: "9.9만 원",
    features: ["관리자 시스템", "데이터베이스 연동", "검색 기능"],
  },
  {
    name: "프로",
    setupFee: "99만 원",
    monthlyFee: "14.9만 원",
    features: ["베이직 포함 기능", "더 넓은 데이터 처리 범위", "확장 기능 우선 대응"],
    recommended: true,
  },
];

export default function WebSolutions() {
  usePageTitle(
    "웹 솔루션 요금 안내 — MintCL",
    "관리자 시스템, 데이터베이스, 검색, 예약 등 웹 솔루션 구축 범위와 이용 요금을 안내합니다.",
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-3xl font-semibold">웹 솔루션 요금 안내</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        홈페이지를 넘어 실제 업무에 활용할 수 있는 웹 솔루션(관리자 시스템, 데이터베이스, 검색, 예약,
        회원관리 등)의 구축 방식과 이용 요금을 안내합니다. 정확한 기능 구성과 견적은 상담 후 맞춤
        확정됩니다.
      </p>

      <h2 className="mt-12 text-xl font-semibold">요금제</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "relative flex h-full flex-col justify-between rounded-2xl border bg-card p-7",
              tier.recommended ? "border-primary/60 shadow-md shadow-primary/10" : "border-border shadow-xs",
            )}
          >
            <div>
              {tier.recommended && (
                <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
                  추천
                </span>
              )}
              <p className="text-sm font-semibold text-muted-foreground">{tier.name}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  {tier.setupFee}
                </span>
                <span className="text-sm text-muted-foreground">구축비</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                + 월 이용료 <span className="font-semibold text-foreground">{tier.monthlyFee}</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground/80">부가세 별도</p>

              <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              asChild
              variant={tier.recommended ? "default" : "outline"}
              className="mt-7 w-full font-bold shadow-xs"
            >
              <Link to="/contact" className="inline-flex items-center justify-center gap-1.5">
                <Send className="h-3.5 w-3.5" />이 요금제 상담하기
              </Link>
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="mb-2 text-sm font-medium text-foreground">호스팅 · 도메인</p>
          <p className="text-sm leading-relaxed text-muted-foreground break-keep">
            호스팅은 MintCL이 제공합니다. 도메인만 준비해 주시면 연결해 드립니다.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="mb-2 text-sm font-medium text-foreground">유지보수 (선택)</p>
          <p className="text-sm leading-relaxed text-muted-foreground break-keep">
            월 5만 원(부가세 별도)에 문구 수정 등 간단한 요청을 월 3회까지 지원합니다.
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        ※ 표시 금액은 부가세 별도이며, 정확한 견적은 필요한 기능과 데이터 규모에 따라 상담 후
        확정됩니다.
      </p>

      <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
        <p className="text-sm text-muted-foreground">필요한 기능에 맞춘 맞춤 상담을 도와드립니다.</p>
        <Button asChild className="mt-4">
          <Link to="/contact">구축 문의하기</Link>
        </Button>
      </div>
    </div>
  );
}
