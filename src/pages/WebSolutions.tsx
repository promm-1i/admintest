import { Link } from "react-router-dom";
import { Check, Minus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { cn } from "@/lib/utils";
import { INDUSTRY_ITEMS } from "@/components/site/navData";

type Tier = {
  name: string;
  setupFee: string;
  monthlyFee: string;
  tagline: string;
  features: string[];
  recommended?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "스타터",
    setupFee: "49만 원",
    monthlyFee: "9.9만 원",
    tagline: "처음 시작하는 사업장을 위한 입문형",
    features: [
      "호스팅 포함",
      "월 3회 간단 수정 포함",
      "기본 홈페이지 구성",
      "상담 문의 폼",
      "반응형 모바일 화면",
      "기본 SEO 세팅",
    ],
  },
  {
    name: "프로",
    setupFee: "99만 원",
    monthlyFee: "14.9만 원",
    tagline: "사업을 운영하는 사업장을 위한 운영형",
    features: [
      "호스팅 포함",
      "월 3회 간단 수정 포함",
      "프리미엄 디자인 구성",
      "업종 맞춤 기능",
      "관리자 페이지 연동",
      "문의 관리 기능",
      "검색 · 필터 기능",
      "포트폴리오 / 사례형 구성 가능",
    ],
    recommended: true,
  },
];

type FeatureValue = boolean | string;
type FeatureRow = { label: string; basic: FeatureValue; pro: FeatureValue };

const FEATURE_ROWS: FeatureRow[] = [
  { label: "관리자 페이지 (콘텐츠 · 데이터 관리)", basic: true, pro: true },
  { label: "데이터베이스 연동", basic: true, pro: true },
  { label: "검색 · 필터 기능", basic: true, pro: true },
  { label: "문의 · 예약 접수 관리", basic: true, pro: true },
  { label: "관리자 계정", basic: "1개", pro: "여러 개" },
  { label: "직원별 접근 권한 설정", basic: false, pro: true },
  { label: "작업 이력(활동 로그) 관리", basic: false, pro: true },
  { label: "통계 대시보드", basic: "기본", pro: "상세" },
  { label: "우선 기술지원", basic: false, pro: true },
  { label: "유지보수 옵션 (월 3회, 선택)", basic: true, pro: true },
];

function FeatureCell({ value }: { value: FeatureValue }) {
  if (typeof value === "string") {
    return <span className="text-sm font-medium text-foreground">{value}</span>;
  }
  return value ? (
    <Check className="mx-auto size-4 text-primary" />
  ) : (
    <Minus className="mx-auto size-4 text-muted-foreground/40" />
  );
}

export default function WebSolutions() {
  usePageTitle(
    "업종별 맞춤 홈페이지 제작 — MintCL",
    "부동산, 렌트카, 병원 등 업종에 맞는 관리자 시스템과 기능까지 갖춘 맞춤형 홈페이지 제작 범위와 요금을 안내합니다.",
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
        CUSTOM BY INDUSTRY
      </p>
      <h1 className="mt-3 text-3xl font-semibold">업종별 맞춤 홈페이지 제작</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
        업종에 맞게 바로 쓰는 맞춤형 홈페이지를 만듭니다. 렌트카, 부동산처럼 고객 문의와 관리
        기능이 중요한 업종에 맞춰 홈페이지와 관리자 시스템을 함께 구축하며, 정확한 기능 구성과
        견적은 상담 후 맞춤 확정됩니다.
      </p>

      <h2 className="mt-12 text-xl font-semibold">업종</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRY_ITEMS.map((item) => {
          const Icon = item.icon;
          const isReal = Boolean(item.href);
          const content = (
            <>
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                  isReal ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                {item.title}
                {!isReal && (
                  <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-normal text-muted-foreground">
                    준비 중
                  </span>
                )}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground break-keep">
                {item.desc}
              </p>
            </>
          );
          return isReal ? (
            <Link
              key={item.title}
              to={item.href!}
              className="flex flex-col items-start rounded-xl border border-primary/20 bg-primary/5 p-5 transition-colors hover:border-primary/40 hover:bg-primary/10"
            >
              {content}
            </Link>
          ) : (
            <div key={item.title} className="flex flex-col items-start rounded-xl border border-border p-5">
              {content}
            </div>
          );
        })}
      </div>

      <p className="mt-14 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
        PRICING
      </p>
      <h2 className="mt-2 text-xl font-semibold">처음에는 작게 시작하고, 필요할 때 확장하세요</h2>
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
              <p className="mt-4 text-sm font-medium text-foreground break-keep">{tier.tagline}</p>

              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
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

      <h3 className="mt-10 text-base font-semibold">기능 비교</h3>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[520px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              <th className="px-5 py-3 font-medium text-muted-foreground">기능</th>
              <th className="px-5 py-3 text-center font-semibold text-foreground">스타터</th>
              <th className="px-5 py-3 text-center font-semibold text-foreground">프로</th>
            </tr>
          </thead>
          <tbody>
            {FEATURE_ROWS.map((row) => (
              <tr key={row.label} className="border-b border-border/60 last:border-b-0">
                <td className="px-5 py-3 text-foreground">{row.label}</td>
                <td className="px-5 py-3 text-center">
                  <FeatureCell value={row.basic} />
                </td>
                <td className="px-5 py-3 text-center">
                  <FeatureCell value={row.pro} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="mb-2 text-sm font-medium text-foreground">호스팅 · 도메인</p>
          <p className="text-sm leading-relaxed text-muted-foreground break-keep">
            호스팅은 MintCL이 제공합니다. 도메인만 준비해 주시면 연결해 드립니다.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="mb-2 text-sm font-medium text-foreground">유지보수 (기본 포함)</p>
          <p className="text-sm leading-relaxed text-muted-foreground break-keep">
            모든 요금제에 문구 수정 등 간단한 요청을 월 3회까지 기본으로 지원합니다.
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        ※ 표시 금액은 부가세 별도이며, 정확한 견적은 필요한 기능과 데이터 규모에 따라 상담 후
        확정됩니다.
      </p>

      <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
        <p className="text-sm text-muted-foreground">필요한 기능에 맞춘 맞춤 상담을 도와드립니다.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link to="/contact">구축 문의하기</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/web-solutions/demos">데모 보기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
