import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Send, ArrowRight, ExternalLink, LayoutDashboard, ArrowDown, ArrowRight as ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { cn } from "@/lib/utils";
import { CUSTOM_SERVICES } from "@/components/site/customServices";
import { RealEstateAdminProvider } from "@/pages/solutions/real-estate-admin/store";
import { DashboardView } from "@/pages/solutions/real-estate-admin/views/DashboardView";
import { PropertyListView } from "@/pages/solutions/real-estate-admin/views/PropertyViews";
import { MENU } from "@/pages/solutions/real-estate-admin/menu";

const OTHER_SERVICES = CUSTOM_SERVICES.filter((s) => s.slug !== "admin-system");

const INDUSTRY_DEMOS = [
  { label: "부동산", flow: "매물 등록 → 노출 → 상담 접수", href: "/web-solutions/real-estate/demo" },
  { label: "렌트카", flow: "차량 등록 → 예약 → 고객 관리", href: "/web-solutions/rentcar/demo" },
  { label: "병원 · 의원", flow: "진료과목 관리 → 예약 문의", href: "/web-solutions/hospital/demo" },
  { label: "학원", flow: "강의 · 시간표 관리 → 수강 상담", href: "/web-solutions/academy/demo" },
  { label: "인테리어 · 리모델링", flow: "시공 사례 관리 → 견적 문의", href: "/web-solutions/interior/demo" },
  { label: "이사 · 청소업체", flow: "서비스 지역 관리 → 견적 문의", href: "/web-solutions/moving/demo" },
];

function BrowserFrame({
  label,
  heightClassName,
  children,
}: {
  label: string;
  heightClassName: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-1.5 border-b border-border bg-secondary/60 px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-2 truncate font-mono text-[11px] text-muted-foreground">{label}</span>
      </div>
      <div className={cn("overflow-hidden bg-background", heightClassName)}>{children}</div>
    </div>
  );
}

/**
 * 실제 관리자 데모 컴포넌트를 축소해 보여주는 미리보기. inert로 전체 서브트리를 포인터/키보드
 * 조작과 접근성 트리에서 완전히 제외해, 미리보기 안의 버튼을 눌러 데모 데이터가 바뀌지 않게 한다.
 */
function LiveComponentPreview({ scale, children }: { scale: number; children: ReactNode }) {
  return (
    <div className="select-none" inert>
      <div className="origin-top-left p-5" style={{ transform: `scale(${scale})`, width: `${100 / scale}%` }}>
        {children}
      </div>
    </div>
  );
}

/** 실제 고객용 데모 페이지를 iframe으로 그대로 불러와 축소 표시한다. inert로 포커스·클릭을 모두 막는다. */
function LiveSitePreview({ src, scale }: { src: string; scale: number }) {
  return (
    <div className="h-full w-full overflow-hidden" inert>
      <div className="origin-top-left" style={{ transform: `scale(${scale})`, width: `${100 / scale}%` }}>
        <iframe
          src={src}
          title="MintCL 고객용 홈페이지 데모"
          loading="lazy"
          style={{ width: "100%", height: 900, border: 0 }}
        />
      </div>
    </div>
  );
}

export default function AdminSystemService() {
  usePageTitle(
    "관리자 시스템 — MintCL",
    "문의 확인부터 콘텐츠, 예약, 고객, 직원 관리까지. 실제로 구축되어 있는 관리자 시스템 데모를 직접 확인하세요.",
  );

  const menuGroups = MENU.filter((item) => item.key !== "dashboard");

  return (
    <div>
      {/* Hero: 문제 정의 + 실제 대시보드 큰 미리보기 (비대칭) */}
      <div className="mx-auto max-w-6xl px-4 pb-4 pt-14 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
              <LayoutDashboard className="h-3.5 w-3.5" />
              CUSTOM SERVICE — 관리자 시스템
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              매번 요청하지 않고
              <br />
              직접 운영하는 관리자 시스템
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground break-keep">
              공지 등록, 콘텐츠 수정, 상품 · 매물 · 차량 관리, 문의 · 예약 관리를 홈페이지 운영자가
              직접 처리할 수 있도록 관리자 화면을 구축합니다. 오른쪽은 실제로 구축되어 있는 부동산
              매물관리 관리자 데모의 대시보드 화면입니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2 font-bold">
                <Link to="/contact">
                  <Send className="h-4 w-4" />
                  구축 상담하기
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-1.5">
                <a href="/web-solutions/real-estate/demo" target="_blank" rel="noopener noreferrer">
                  관리자 데모 직접 체험하기
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
            </div>
          </div>

          <BrowserFrame label="/web-solutions/real-estate/demo" heightClassName="h-[320px] sm:h-[380px] lg:h-[420px]">
            <RealEstateAdminProvider>
              <LiveComponentPreview scale={0.58}>
                <DashboardView />
              </LiveComponentPreview>
            </RealEstateAdminProvider>
          </BrowserFrame>
        </div>
      </div>

      {/* 실제 관리자 메뉴 구조 + 실제 목록 화면 */}
      <div className="border-y border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">실제 화면에서 사용합니다</p>
          <h2 className="mt-3 max-w-xl text-2xl font-bold text-foreground">
            부동산 데모 기준, 관리자 메뉴는 이렇게 구성되어 있습니다
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground break-keep">
            아래는 실제 구축되어 있는 부동산 매물관리 관리자 데모의 메뉴 구조입니다. 업종과 필요에
            따라 메뉴 구성은 달라집니다.
          </p>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <ul className="divide-y divide-border border-t border-border">
              {menuGroups.map((item) => (
                <li key={item.key} className="flex items-center justify-between gap-4 py-3">
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                  {item.children && (
                    <span className="shrink-0 font-mono text-xs text-muted-foreground/70">
                      {item.children.length}개 세부 메뉴
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <BrowserFrame label="전체 매물 목록" heightClassName="h-[420px] sm:h-[480px]">
              <RealEstateAdminProvider>
                <LiveComponentPreview scale={0.6}>
                  <PropertyListView onNavigate={() => {}} />
                </LiveComponentPreview>
              </RealEstateAdminProvider>
            </BrowserFrame>
          </div>
        </div>
      </div>

      {/* 관리자 ↔ 고객 화면 연결 */}
      <div className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">관리자와 고객 화면의 연결</p>
          <h2 className="mt-3 max-w-xl text-2xl font-bold text-foreground">
            관리자가 등록한 내용이 고객 화면에 그대로 반영됩니다
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground break-keep">
            관리자 화면에서 매물을 등록하고 공개 상태로 전환하면, 별도 작업 없이 고객이 보는
            홈페이지에 실시간으로 노출됩니다.
          </p>

          <div className="mt-10 grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
            <BrowserFrame label="관리자 — 매물 관리" heightClassName="h-[300px] sm:h-[340px]">
              <RealEstateAdminProvider>
                <LiveComponentPreview scale={0.55}>
                  <PropertyListView onNavigate={() => {}} />
                </LiveComponentPreview>
              </RealEstateAdminProvider>
            </BrowserFrame>

            <div className="flex items-center justify-center py-2 text-muted-foreground/50 lg:rotate-0">
              <ArrowDown className="h-6 w-6 lg:hidden" />
              <ArrowRightIcon className="hidden h-6 w-6 lg:block" />
            </div>

            <BrowserFrame label="고객 홈페이지 — 매물검색" heightClassName="h-[300px] sm:h-[340px]">
              <LiveSitePreview src="/web-solutions/real-estate/demo/site" scale={0.42} />
            </BrowserFrame>
          </div>
        </div>
      </div>

      {/* 업종별 활용 */}
      <div className="border-t border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">업종별 활용</p>
          <h2 className="mt-3 text-2xl font-bold text-foreground">업종에 맞게 관리자 화면을 다르게 구성합니다</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground break-keep">
            같은 관리자 시스템이라도 업종마다 필요한 항목은 다릅니다. 아래 업종은 실제로 구축되어
            있는 데모로 직접 확인할 수 있습니다.
          </p>

          <div className="mt-8 divide-y divide-border border-t border-border">
            {INDUSTRY_DEMOS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 py-4 transition-colors"
              >
                <div>
                  <p className="text-sm font-bold text-foreground">{item.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.flow}</p>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 다른 맞춤형 서비스 */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">다른 맞춤형 서비스</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {OTHER_SERVICES.map((s) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {s.navLabel}
            </Link>
          ))}
        </div>
      </div>

      {/* 마무리 CTA */}
      <div className="border-t border-border bg-secondary/30 py-14 text-center">
        <div className="mx-auto max-w-md px-4">
          <p className="text-base font-bold text-foreground break-keep">필요한 범위만 골라 구축할 수 있습니다.</p>
          <p className="mt-2 text-sm text-muted-foreground break-keep">
            업종과 필요한 기능을 알려주시면 적합한 구성과 예상 비용을 안내드립니다.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button asChild className="gap-2 font-bold">
              <Link to="/contact">
                <Send className="h-4 w-4" />
                구축 상담하기
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-1.5">
              <Link to="/website/features">
                전체 기능 소개 보기
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
