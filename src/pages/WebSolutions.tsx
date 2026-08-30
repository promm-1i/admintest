import { Link } from "react-router-dom";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { cn } from "@/lib/utils";
import { INDUSTRY_ITEMS } from "@/components/site/navData";
import { FadeIn } from "@/components/ui/FadeIn";

type Tier = {
  name: string;
  setupFee: string;
  tagline: string;
  recommended?: boolean;
};

/**
 * 맞춤형 구축비. 모든 구성이 반응형으로 제작되며, 구축비에 첫 해 호스팅료와
 * 셋팅비용, 도메인 1개(1년)가 모두 포함된다. 2년차부터 연 39만원(호스팅 36 + 도메인 3).
 */
const TIERS: Tier[] = [
  {
    name: "기본형",
    setupFee: "150만 원",
    tagline: "필요한 정보를 정직하게 전달하는 구성",
  },
  {
    name: "랜딩형",
    setupFee: "200만 원",
    tagline: "스크롤 연출과 인터랙션으로 상담까지 연결하는 구성",
    recommended: true,
  },
  {
    name: "쇼핑몰",
    setupFee: "300만 원~",
    tagline: "상품 등록부터 결제·회원까지 직접 판매하는 구성",
  },
  {
    name: "홈페이지 리뉴얼",
    setupFee: "별도 협의",
    tagline: "기존 홈페이지의 디자인과 구조를 현재 기준으로 개선",
  },
];

/** 구축비에 기본으로 포함되는 항목 */
const INCLUDED_IN_SETUP = [
  "반응형 제작 (PC · 태블릿 · 모바일)",
  "첫 해 호스팅료",
  "셋팅비용",
  "도메인 1개 (첫 1년 무료)",
];

/** 요금제 구분 없이 맞춤형에 모두 들어가는 기능 */
const COMMON_FEATURES = [
  "관리자 페이지 (콘텐츠 · 데이터 관리)",
  "데이터베이스 연동",
  "검색 · 필터 기능",
  "문의 · 예약 접수 관리",
  "직원별 접근 권한 설정",
  "작업 이력(활동 로그) 관리",
  "통계 대시보드",
  "업종 맞춤 기능",
  "기본 SEO 세팅",
  "유지보수 옵션 (월 3회, 선택)",
];

export default function WebSolutions() {
  usePageTitle(
    "업종별 맞춤 홈페이지 제작 — NOVERIQ",
    "부동산, 렌트카, 병원 등 업종에 맞는 관리자 시스템과 기능까지 갖춘 맞춤형 홈페이지 제작 범위와 요금을 안내합니다.",
  );

  return (
    <div className="mx-auto max-w-7xl px-3 py-14 sm:px-5">
      <div className="flex items-center gap-2">
        <span className="rounded-full border border-primary/40 bg-primary/[0.07] px-3 py-1 text-[11px] font-bold tracking-wide text-primary">
          PREMIUM LINE
        </span>
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground">
          CUSTOM BY INDUSTRY
        </p>
      </div>
      <h1 className="mt-4 text-3xl font-semibold break-keep">
        업종별 맞춤 홈페이지 제작
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
        정해진 템플릿을 고르는 것이 아니라, 업종의 업무 방식에 맞춰 화면과 기능을 처음부터 설계하는
        프리미엄 라인입니다. 반응형 제작과 관리자 시스템, 데이터베이스까지 모두 기본으로 포함되며,
        정확한 기능 구성과 견적은 상담 후 확정됩니다.
      </p>

      {/* 템플릿형과의 차이 */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <FadeIn direction="left">
        <div className="h-full rounded-2xl border border-border bg-secondary/30 p-5">
          <p className="text-xs font-bold text-muted-foreground">템플릿형</p>
          <p className="mt-1.5 text-sm font-semibold text-foreground">완성된 디자인을 골라 빠르게</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground break-keep">
            이미 만들어 둔 디자인에 문구·이미지를 적용해 빠르고 합리적으로 시작합니다. 반응형은
            선택해서 추가할 수 있습니다.
          </p>
          <Link
            to="/templates"
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            템플릿 보기 · 64만 원부터
          </Link>
        </div>
        </FadeIn>
        <FadeIn direction="right" delay={100}>
        <div className="h-full rounded-2xl border border-primary/40 bg-primary/[0.04] p-5">
          <p className="text-xs font-bold text-primary">맞춤형 · 프리미엄</p>
          <p className="mt-1.5 text-sm font-semibold text-foreground">업무 방식에 맞춰 처음부터</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground break-keep">
            화면 구성과 기능을 직접 설계합니다. 반응형 제작과 관리자 시스템, 데이터베이스, 직원 권한
            관리까지 모두 기본으로 포함됩니다.
          </p>
          <p className="mt-3 text-xs font-semibold text-primary">150만 원부터</p>
        </div>
        </FadeIn>
      </div>

      <h2 className="mt-12 text-xl font-semibold">업종</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRY_ITEMS.map((item, idx) => {
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
            <FadeIn key={item.title} delay={(idx % 3) * 80}>
            <Link
              to={item.href!}
              className="flex h-full flex-col items-start rounded-xl border border-primary/20 bg-primary/5 p-5 transition-colors hover:border-primary/40 hover:bg-primary/10"
            >
              {content}
            </Link>
            </FadeIn>
          ) : (
            <FadeIn key={item.title} delay={(idx % 3) * 80}>
            <div className="flex h-full flex-col items-start rounded-xl border border-border p-5">
              {content}
            </div>
            </FadeIn>
          );
        })}
      </div>

      <p className="mt-14 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
        PRICING
      </p>
      <h2 className="mt-2 text-xl font-semibold">프리미엄 라인 구축 비용</h2>
      <p className="mt-2 text-sm text-muted-foreground break-keep">
        모든 구성이 반응형으로 제작되며, 구축비에 첫 해 호스팅료와 셋팅비용, 도메인 1개(1년)가 모두
        포함됩니다. 반응형을 따로 추가하실 필요가 없습니다.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((tier, idx) => (
          <FadeIn key={tier.name} delay={idx * 90} className="h-full">
          <div
            className={cn(
              "relative flex h-full flex-col justify-between rounded-2xl border bg-card p-6 transition-all duration-300 motion-safe:hover:-translate-y-1.5 hover:shadow-lg hover:shadow-primary/10 motion-reduce:transition-none",
              tier.recommended ? "border-primary/60 shadow-md shadow-primary/10" : "border-border shadow-xs hover:border-primary/40",
            )}
          >
            <div>
              {tier.recommended && (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
                  추천
                </span>
              )}
              <p className="text-sm font-semibold text-muted-foreground">{tier.name}</p>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                  {tier.setupFee}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">구축비 · 부가세 별도</p>
              <p className="mt-4 text-sm leading-relaxed text-foreground break-keep">{tier.tagline}</p>
            </div>

            <Button
              asChild
              variant={tier.recommended ? "default" : "outline"}
              className="mt-6 w-full font-bold shadow-xs"
            >
              <Link to="/contact" className="inline-flex items-center justify-center gap-1.5">
                <Send className="h-3.5 w-3.5" />
                상담하기
              </Link>
            </Button>
          </div>
          </FadeIn>
        ))}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <FadeIn>
        <div className="h-full rounded-2xl border border-border bg-secondary/30 p-6">
          <p className="mb-3 text-sm font-bold text-foreground">구축비에 포함되는 것</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {INCLUDED_IN_SETUP.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="break-keep">{f}</span>
              </li>
            ))}
          </ul>
        </div>
        </FadeIn>
        <FadeIn delay={100}>
        <div className="h-full rounded-2xl border border-border bg-card p-6">
          <p className="mb-3 text-sm font-bold text-foreground">2년차부터 운영 비용</p>
          <p className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold tracking-tight text-primary">연 39만 원</span>
            <span className="text-xs text-muted-foreground">부가세 별도</span>
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>호스팅료 월 3만 원 (연 36만 원)</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>도메인 갱신 연 3만 원</span>
            </li>
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80 break-keep">
            문구 수정 등 간단한 요청은 월 3회까지 기본으로 지원합니다.
          </p>
        </div>
        </FadeIn>
      </div>

      <h3 className="mt-10 text-base font-semibold">맞춤형에 모두 포함되는 기능</h3>
      <FadeIn>
      <ul className="mt-4 grid gap-2.5 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2">
        {COMMON_FEATURES.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-foreground">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            <span className="break-keep">{f}</span>
          </li>
        ))}
      </ul>
      </FadeIn>

      <p className="mt-4 text-xs text-muted-foreground">
        ※ 표시 금액은 부가세 별도이며, 정확한 견적은 필요한 기능과 데이터 규모에 따라 상담 후
        확정됩니다.
      </p>

      <FadeIn>
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
      </FadeIn>
    </div>
  );
}
