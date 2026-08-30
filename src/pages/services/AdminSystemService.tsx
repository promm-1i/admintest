import { Link } from "react-router-dom";
import {
  Send,
  ArrowRight,
  ExternalLink,
  LayoutDashboard,
  ArrowDown,
  ArrowRight as ArrowRightIcon,
  PhoneOff,
  MessagesSquare,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { CUSTOM_SERVICES, getCustomService } from "@/components/site/customServices";
import { RealEstateAdminProvider, useRealEstateAdmin } from "@/pages/solutions/real-estate-admin/store";
import { DashboardView } from "@/pages/solutions/real-estate-admin/views/DashboardView";
import { PanelHeader, StatusBadge } from "@/pages/solutions/real-estate-admin/components";
import { MENU } from "@/pages/solutions/real-estate-admin/menu";
import {
  BrowserFrame,
  LiveComponentPreview,
  LazyIframePreview,
  Reveal,
  RevealScale,
  NextStepsSection,
} from "@/pages/services/previewKit";

const OTHER_SERVICES = CUSTOM_SERVICES.filter((s) => s.slug !== "admin-system");
const ADMIN_SERVICE = getCustomService("admin-system")!;

const INDUSTRY_DEMOS = [
  { label: "부동산", flow: "매물 등록 → 노출 → 상담 접수", href: "/web-solutions/real-estate/demo" },
  { label: "렌트카", flow: "차량 등록 → 예약 → 고객 관리", href: "/web-solutions/rentcar/demo" },
  { label: "병원 · 의원", flow: "진료과목 관리 → 예약 문의", href: "/web-solutions/hospital/demo" },
  { label: "학원", flow: "강의 · 시간표 관리 → 수강 상담", href: "/web-solutions/academy/demo" },
  { label: "인테리어 · 리모델링", flow: "시공 사례 관리 → 견적 문의", href: "/web-solutions/interior/demo" },
  { label: "이사 · 청소업체", flow: "서비스 지역 관리 → 견적 문의", href: "/web-solutions/moving/demo" },
];

const FEATURED_ITEMS = [
  {
    title: "고객 문의 관리",
    scenario: "전화, 문자, 카카오톡으로 흩어져 들어오던 문의를",
    benefit: "관리자 화면 하나에서 확인하고, 상담중 · 완료 상태로 정리할 수 있습니다.",
  },
  {
    title: "상품 / 매물 / 차량 관리",
    scenario: "새 매물이나 상품이 생길 때마다 제작자에게 연락하는 대신",
    benefit: "관리자가 직접 등록하고, 즉시 홈페이지에 반영할 수 있습니다.",
  },
  {
    title: "공개 / 비공개",
    scenario: "아직 준비되지 않은 콘텐츠는",
    benefit: "비공개로 두었다가, 준비되면 버튼 하나로 공개 전환할 수 있습니다.",
  },
];

/** PropertyListView의 검색·필터·수정·삭제 UI 없이, 같은 실제 매물 데이터만 읽기 전용으로 보여준다. */
function PropertyListPreview() {
  const { listings } = useRealEstateAdmin();
  return (
    <div>
      <PanelHeader title="전체 매물 목록" description="등록된 모든 매물을 검색·필터·일괄관리합니다." />
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-left text-xs">
          <thead className="bg-secondary/50 text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">매물명</th>
              <th className="px-3 py-2 font-medium">지역</th>
              <th className="px-3 py-2 font-medium">가격</th>
              <th className="px-3 py-2 font-medium">담당자</th>
              <th className="px-3 py-2 font-medium">상태</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {listings.map((l) => (
              <tr key={l.id}>
                <td className="px-3 py-2 font-medium text-foreground">
                  {l.image} {l.title}
                </td>
                <td className="px-3 py-2 text-muted-foreground">{l.region}</td>
                <td className="px-3 py-2 font-semibold text-foreground">{l.price}</td>
                <td className="px-3 py-2 text-muted-foreground">{l.manager}</td>
                <td className="px-3 py-2">
                  <StatusBadge label={l.status} tone={l.status === "공개" ? "success" : "neutral"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** 실제 listings 데이터를 기준으로 "공개 매물 N건"이 살아있는 화면임을 보여주는 카운터. */
function PublicCountBadge() {
  const { listings } = useRealEstateAdmin();
  const publicCount = listings.filter((l) => l.status === "공개").length;
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-2">
      <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-primary" />
      <span className="text-sm font-bold text-foreground">공개 매물 {publicCount}건</span>
      <span className="text-sm text-muted-foreground">— 지금 고객 화면에 노출 중</span>
    </div>
  );
}

export default function AdminSystemService() {
  usePageTitle(
    "관리자 시스템 — MintCL",
    "문의 확인부터 콘텐츠, 예약, 고객, 직원 관리까지. 실제로 구축되어 있는 관리자 시스템 데모를 직접 확인하세요.",
  );

  const menuGroups = MENU.filter((item) => item.key !== "dashboard");
  const otherIncludes = ADMIN_SERVICE.includes.filter((i) => !FEATURED_ITEMS.some((f) => f.title === i));

  return (
    <div>
      {/* Hero: 문제 정의 + 실제 대시보드 큰 미리보기 */}
      <div className="mx-auto max-w-6xl px-4 pb-4 pt-14 sm:pt-20">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <p className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
              <LayoutDashboard className="h-3.5 w-3.5" />
              CUSTOM SERVICE — 관리자 시스템
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              매번 요청하지 않고
              <br />
              직접 운영하는 관리자 시스템
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground break-keep">
              공지 등록, 콘텐츠 수정, 상품 · 매물 · 차량 관리, 문의 · 예약 관리를 홈페이지 운영자가
              직접 처리할 수 있도록 관리자 화면을 구축합니다.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
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
              <Button asChild size="lg" variant="ghost" className="gap-1.5 text-primary hover:bg-primary/5">
                <Link to="/website/features">
                  구현 가능한 기능 보기
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>

          <RevealScale>
            <BrowserFrame label="/web-solutions/real-estate/demo" heightClassName="h-[420px] sm:h-[520px] lg:h-[620px]">
              <RealEstateAdminProvider>
                <LiveComponentPreview scale={0.88}>
                  <DashboardView />
                </LiveComponentPreview>
              </RealEstateAdminProvider>
            </BrowserFrame>
          </RevealScale>
        </div>
      </div>

      {/* 왜 필요한가 */}
      <Reveal className="border-y border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-2xl px-4">
          <p className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
            <PhoneOff className="h-3.5 w-3.5" />
            왜 필요한가
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground break-keep">
            새 상품 하나 올리는데, 왜 매번 개발자를 거쳐야 할까요
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground break-keep">
            홈페이지에 관리자 화면이 없으면, 공지 하나 수정하는 일도 제작자에게 연락하고 기다려야
            합니다. 바쁜 시기일수록 이런 사소한 수정이 늦어지고, 홈페이지는 점점 방치됩니다.
          </p>
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <MessagesSquare className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-base font-medium text-foreground break-keep">
              관리자 시스템이 있으면, 운영자가 필요한 순간 직접 바꿉니다. 개발자를 기다릴 필요가
              없습니다.
            </p>
          </div>
        </div>
      </Reveal>

      {/* 관리 가능한 항목 */}
      <div className="mx-auto max-w-4xl px-4 py-14 sm:py-20">
        <Reveal>
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">관리 가능한 항목</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground">이런 항목을 직접 관리합니다</h2>
        </Reveal>

        <div className="mt-8 divide-y divide-border border-t border-border">
          {FEATURED_ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 100} className="py-6">
              <p className="font-mono text-xs font-bold text-primary">0{i + 1}</p>
              <h3 className="mt-1.5 text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-1.5 text-base leading-relaxed text-muted-foreground break-keep">
                {item.scenario} {item.benefit}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-wrap gap-2">
          {otherIncludes.map((label) => (
            <span
              key={label}
              className="rounded-full border border-border px-3.5 py-1.5 text-sm font-medium text-muted-foreground"
            >
              {label}
            </span>
          ))}
        </Reveal>
      </div>

      {/* 실제 관리자 메뉴 구조 + 실제 목록 화면 (확대) */}
      <div className="border-y border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">실제 화면에서 사용합니다</p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold text-foreground">
              부동산 데모 기준, 관리자 메뉴는 이렇게 구성되어 있습니다
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground break-keep">
              아래는 실제 구축되어 있는 부동산 매물관리 관리자 데모의 메뉴 구조와, 실제 매물 목록
              화면입니다. 업종과 필요에 따라 메뉴 구성은 달라집니다.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <Reveal>
              <ul className="divide-y divide-border border-t border-border">
                {menuGroups.map((item) => (
                  <li key={item.key} className="flex items-center justify-between gap-4 py-3">
                    <span className="text-base font-medium text-foreground">{item.label}</span>
                    {item.children && (
                      <span className="shrink-0 font-mono text-xs text-muted-foreground/70">
                        {item.children.length}개 세부 메뉴
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>

            <RevealScale delay={120}>
              <BrowserFrame label="전체 매물 목록" heightClassName="h-[520px] sm:h-[600px]">
                <RealEstateAdminProvider>
                  <LiveComponentPreview scale={0.92}>
                    <PropertyListPreview />
                  </LiveComponentPreview>
                </RealEstateAdminProvider>
              </BrowserFrame>
            </RevealScale>
          </div>

          <Reveal delay={200} className="mt-10 flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-6 py-5">
            <p className="text-base font-medium text-foreground break-keep">
              이 기능 외에 어떤 것까지 구현 가능한지 확인해보세요.
            </p>
            <Button asChild variant="outline" className="shrink-0 gap-1.5">
              <Link to="/website/features">
                전체 기능 보기
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>

      {/* 관리자 ↔ 고객 화면 연결 */}
      <div className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
              관리자와 고객 화면의 연결
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold text-foreground">
              관리자가 등록한 내용이 고객 화면에 그대로 반영됩니다
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground break-keep">
              관리자 화면에서 매물을 등록하고 공개 상태로 전환하면, 별도 작업 없이 고객이 보는
              홈페이지에 실시간으로 노출됩니다.
            </p>
            <div className="mt-6">
              <RealEstateAdminProvider>
                <PublicCountBadge />
              </RealEstateAdminProvider>
            </div>
          </Reveal>

          <div className="mt-10 grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
            <RevealScale delay={120}>
              <BrowserFrame label="관리자 — 매물 관리" heightClassName="h-[340px] sm:h-[400px]">
                <RealEstateAdminProvider>
                  <LiveComponentPreview scale={0.68}>
                    <PropertyListPreview />
                  </LiveComponentPreview>
                </RealEstateAdminProvider>
              </BrowserFrame>
            </RevealScale>

            <Reveal delay={280} className="flex items-center justify-center py-2 text-primary">
              <ArrowDown className="h-6 w-6 lg:hidden" />
              <ArrowRightIcon className="hidden h-6 w-6 lg:block" />
            </Reveal>

            <RevealScale delay={320}>
              <BrowserFrame label="고객 홈페이지 — 매물검색" heightClassName="h-[340px] sm:h-[400px]">
                <LazyIframePreview
                  src="/web-solutions/real-estate/demo/site"
                  scale={0.5}
                  title="MintCL 고객용 홈페이지 데모"
                />
              </BrowserFrame>
            </RevealScale>
          </div>
        </div>
      </div>

      {/* 업종별 활용 */}
      <div className="border-t border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">업종별 활용</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">업종에 맞게 관리자 화면을 다르게 구성합니다</h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground break-keep">
              같은 관리자 시스템이라도 업종마다 필요한 항목은 다릅니다. 아래 업종은 실제로 구축되어
              있는 데모로 직접 확인할 수 있습니다.
            </p>
          </Reveal>

          <div className="mt-8 divide-y divide-border border-t border-border">
            {INDUSTRY_DEMOS.map((item, i) => (
              <Reveal key={item.href} delay={i * 60}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-4 transition-colors"
                >
                  <div>
                    <p className="text-base font-bold text-foreground">{item.label}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.flow}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* 커스터마이징 가능한 범위 */}
      <Reveal className="py-14 sm:py-20">
        <div className="mx-auto max-w-2xl px-4">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">이런 경우 추천합니다</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground">필요한 범위만 골라서 구축할 수 있습니다</h2>
          <div className="mt-8 space-y-4">
            {[
              "홈페이지 오픈 이후에도 콘텐츠가 자주 바뀌는 경우",
              "직원마다 다른 권한으로 접근해야 하는 경우",
              "문의 · 예약이 여러 채널로 흩어져 관리가 안 되는 경우",
              "상품 · 매물 · 차량처럼 목록형 콘텐츠가 계속 늘어나는 경우",
            ].map((text) => (
              <div key={text} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-base leading-relaxed text-foreground break-keep">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground break-keep">
            반대로 콘텐츠 변경이 거의 없는 소개형 홈페이지라면, 관리자 시스템 없이도 충분한 경우가
            많습니다. 필요 여부부터 상담을 통해 함께 판단합니다.
          </p>
        </div>
      </Reveal>

      {/* 다른 맞춤형 서비스 + 마무리 CTA (하나의 이어진 section) */}
      <NextStepsSection
        otherServices={OTHER_SERVICES}
        ctaTitle="필요한 기능을 조합해서 구축할 수 있습니다."
        ctaDesc="업종과 필요한 기능을 알려주시면 적합한 구성과 예상 비용을 안내드립니다."
      />
    </div>
  );
}
