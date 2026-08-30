import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Send, ShieldCheck, LayoutGrid, Link2, ExternalLink, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TEMPLATE_PACKAGES, LUMP_SUM, formatMan, PRODUCTION_PERIOD } from "@/lib/templatePackages";
import type { Sample } from "@/lib/samples";

/** 업종별 전용 기능과 관리자 데모 경로 */
const INDUSTRY_SPEC: Record<
  string,
  { label: string; dedicated: string; adminDemoHref?: string; siteDemoHref?: string }
> = {
  "real-estate": {
    label: "부동산",
    dedicated: "매물 관리 + 조건별 매물 검색 + 상담 문의",
    adminDemoHref: "/web-solutions/real-estate/demo",
    siteDemoHref: "/web-solutions/real-estate/demo/site",
  },
};

const BASE_FEATURES = "일반게시판 + 갤러리 + 오시는 길 + FAQ";

const SPEC_ROWS = [
  { label: "페이지 제작", value: "10개 페이지 제공 (게시판 포함)" },
  { label: "모바일 웹", value: "업종 모바일 기본타입 무료 제공" },
  { label: "도메인", value: "1개 무료 제공 (한글 · 영문 · com · co.kr · kr)" },
  { label: "문자 발송 기능", value: "무료 설치 (발송 건당 16원 요금 별도)" },
  { label: "관리자 모드", value: "접속현황 · 문의관리 · 팝업설정 등 무료 제공" },
  { label: "기타", value: "검색엔진 최적화, 사이트 검색 등록 대행" },
];

/**
 * 템플릿 상세 우측에 붙는 스펙·가격 패널. 어떤 기능이 실제로 들어가는지,
 * 얼마인지, 어디서 체험할 수 있는지를 한 화면에서 보여준다.
 */
export function TemplateSpecPanel({ sample }: { sample: Sample }) {
  const isLanding = sample.type.includes("landing-template");
  const pkg = TEMPLATE_PACKAGES.find((p) => p.key === (isLanding ? "landing" : "basic"))!;
  const lump = isLanding ? LUMP_SUM[1] : LUMP_SUM[0];
  const industry = sample.industryKey ? INDUSTRY_SPEC[sample.industryKey] : undefined;
  const designCode = `${(sample.industryKey ?? "tpl").split("-")[0]?.slice(0, 2).toUpperCase()}${
    isLanding ? "L" : "B"
  }-1001`;

  const copyLink = () => {
    void navigator.clipboard.writeText(window.location.href);
    toast.success("템플릿 링크가 복사되었습니다.");
  };

  return (
    <aside className="rounded-2xl border border-border bg-card p-6 shadow-xs">
      {/* 디자인 코드 */}
      <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <p className="text-[11px] font-medium text-muted-foreground">디자인 코드</p>
          <p className="mt-0.5 font-mono text-base font-bold text-foreground">{designCode}</p>
        </div>
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          <Link2 className="h-3 w-3" /> 링크복사
        </button>
      </div>

      {/* 가격 */}
      <div className="border-b border-border py-5">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-bold text-secondary-foreground">
            {pkg.label}
          </span>
          <span className="text-[11px] text-muted-foreground">VAT 별도</span>
        </div>
        <p className="mt-3 flex items-end gap-1.5">
          <span className="text-3xl font-extrabold tracking-tight text-primary">
            {formatMan(pkg.total)}
          </span>
          <span className="pb-1 text-sm font-semibold text-muted-foreground">부터</span>
        </p>
        <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
          호스팅 1년 24만원 + 셋팅 10만원 + 업종 전용 기능 30만원
          {pkg.designCost > 0 && ` + 디자인 ${formatMan(pkg.designCost)}`} 포함
        </p>
        <p className="mt-2 rounded-md bg-secondary/60 px-3 py-2 text-[11px] text-muted-foreground">
          일시불 구매 시 <strong className="font-bold text-foreground">{formatMan(lump.price)}</strong> ·
          제작 기간 {PRODUCTION_PERIOD}
        </p>
      </div>

      {/* 제공 스펙 */}
      <dl className="divide-y divide-border/70">
        {SPEC_ROWS.map((r) => (
          <div key={r.label} className="py-3">
            <dt className="text-xs font-bold text-foreground">{r.label}</dt>
            <dd className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{r.value}</dd>
          </div>
        ))}
      </dl>

      {/* 기능 설명 */}
      <div className="mt-2 space-y-2 border-t border-border pt-4">
        <div className="rounded-lg bg-secondary/50 p-3">
          <p className="text-[11px] font-bold text-foreground">기본 기능</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{BASE_FEATURES}</p>
        </div>
        {industry && (
          <div className="rounded-lg border border-primary/25 bg-primary/[0.05] p-3">
            <p className="flex items-center gap-1 text-[11px] font-bold text-primary">
              <Check className="h-3 w-3" /> {industry.label} 전용 기능
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-foreground/80">{industry.dedicated}</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-5 space-y-2">
        <Button asChild size="lg" className="w-full gap-2 font-bold">
          <Link to="/contact">
            <Send className="h-4 w-4" />이 디자인으로 상담받기
          </Link>
        </Button>

        {industry?.adminDemoHref && (
          <Button asChild variant="outline" size="lg" className="w-full gap-1.5 font-semibold">
            <a href={industry.adminDemoHref} target="_blank" rel="noopener noreferrer">
              <ShieldCheck className="h-4 w-4 text-primary" />
              관리자 모드 체험
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        )}

        <Button asChild variant="ghost" size="lg" className="w-full gap-1.5 font-semibold">
          <Link to="/website/features">
            <LayoutGrid className="h-4 w-4" />
            다양한 기능 소개
          </Link>
        </Button>
      </div>
    </aside>
  );
}
