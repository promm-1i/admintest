import { Link } from "react-router-dom";
import { Send, ArrowRight, ExternalLink, Inbox, ArrowDown, ArrowRight as ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { CUSTOM_SERVICES } from "@/components/site/customServices";
import { RealEstateAdminProvider, useRealEstateAdmin } from "@/pages/solutions/real-estate-admin/store";
import { PanelHeader, StatusBadge } from "@/pages/solutions/real-estate-admin/components";
import { BrowserFrame, LiveComponentPreview, LazyIframePreview } from "@/pages/services/previewKit";

const OTHER_SERVICES = CUSTOM_SERVICES.filter((s) => s.slug !== "inquiry-reservation");

const SCHEDULE_TYPES = ["임장", "계약", "상담", "전화", "입주"];

/** 실제 문의 데이터를 검색·수정·모달 없이 읽기 전용 목록으로만 보여준다. */
function InquiryListPreview() {
  const { inquiries } = useRealEstateAdmin();
  return (
    <div>
      <PanelHeader title="홈페이지 문의" description="접수된 문의를 확인하고 상담 상태를 관리합니다." />
      <ul className="divide-y divide-border rounded-lg border border-border">
        {inquiries.map((i) => (
          <li key={i.id} className="flex items-center justify-between gap-3 px-3 py-2.5 text-xs">
            <div className="min-w-0">
              <p className="font-medium text-foreground">{i.name}</p>
              <p className="mt-0.5 truncate text-muted-foreground">{i.content}</p>
            </div>
            <StatusBadge label={i.status} tone={i.status === "완료" ? "success" : "warning"} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function InquiryReservationService() {
  usePageTitle(
    "문의 · 예약 관리 — MintCL",
    "홈페이지로 들어온 문의와 예약을 관리자 화면에서 확인하고 처리 상태까지 관리하는 흐름을 실제 데모로 확인하세요.",
  );

  return (
    <div>
      {/* 히어로 */}
      <div className="mx-auto max-w-4xl px-4 pb-4 pt-14 text-center sm:pt-20">
        <p className="mx-auto flex w-fit items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
          <Inbox className="h-3.5 w-3.5" />
          CUSTOM SERVICE — 문의 · 예약 관리
        </p>
        <h1 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          문의가 접수되면, 끝까지 놓치지 않고 관리합니다
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground break-keep">
          고객이 남긴 문의는 관리자 화면에 실시간으로 쌓이고, 상담 진행 상태를 그때그때 바꿔가며
          이력을 관리할 수 있습니다.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
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

      {/* 3단 Flow: 접수 → 확인 → 상태 변경 */}
      <div className="border-y border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">실제 처리 흐름</p>
          <h2 className="mt-3 max-w-xl text-2xl font-bold text-foreground">
            문의 하나가 접수부터 완료까지 이렇게 이동합니다
          </h2>

          <div className="mt-10 grid items-start gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <div>
              <p className="mb-3 font-mono text-xs font-bold text-primary">01 · 고객 접수</p>
              <BrowserFrame label="고객 홈페이지 — 상담 문의" heightClassName="h-[280px]">
                <LazyIframePreview
                  src="/web-solutions/real-estate/demo/site#contact"
                  scale={0.42}
                  title="MintCL 고객용 문의 폼 데모"
                />
              </BrowserFrame>
            </div>

            <div className="flex items-center justify-center py-2 text-muted-foreground/50">
              <ArrowDown className="h-6 w-6 lg:hidden" />
              <ArrowRightIcon className="hidden h-6 w-6 lg:block" />
            </div>

            <div>
              <p className="mb-3 font-mono text-xs font-bold text-primary">02 · 관리자 확인</p>
              <BrowserFrame label="/web-solutions/real-estate/demo" heightClassName="h-[280px]">
                <RealEstateAdminProvider>
                  <LiveComponentPreview scale={0.62}>
                    <InquiryListPreview />
                  </LiveComponentPreview>
                </RealEstateAdminProvider>
              </BrowserFrame>
            </div>

            <div className="flex items-center justify-center py-2 text-muted-foreground/50">
              <ArrowDown className="h-6 w-6 lg:hidden" />
              <ArrowRightIcon className="hidden h-6 w-6 lg:block" />
            </div>

            <div>
              <p className="mb-3 font-mono text-xs font-bold text-primary">03 · 상태 변경</p>
              <div className="flex h-[280px] flex-col justify-center gap-4 rounded-xl border border-border bg-card p-6">
                <p className="text-xs text-muted-foreground break-keep">
                  담당자가 상담을 마치면 버튼 하나로 상태를 바꿉니다.
                </p>
                <div className="flex items-center gap-3">
                  <StatusBadge label="상담중" tone="warning" />
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <StatusBadge label="완료" tone="success" />
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground break-keep">
                  변경 이력은 활동 로그에 자동으로 남아, 누가 언제 처리했는지 나중에도 확인할 수
                  있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 예약 관리도 같은 방식 */}
      <div className="mx-auto max-w-4xl px-4 py-14 sm:py-20">
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">예약 · 일정도 함께</p>
        <h2 className="mt-3 text-2xl font-bold text-foreground">문의뿐 아니라 예약 · 일정도 같은 화면에서 관리합니다</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground break-keep">
          임장, 계약, 상담, 전화, 입주처럼 업종에 필요한 일정 유형을 만들고, 담당자별로 배정해
          진행 상태를 확인할 수 있습니다.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {SCHEDULE_TYPES.map((t) => (
            <li
              key={t}
              className="rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* 다른 맞춤형 서비스 */}
      <div className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">다른 맞춤형 서비스</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {OTHER_SERVICES.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {s.navLabel}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 마무리 CTA */}
      <div className="py-14 text-center">
        <div className="mx-auto max-w-md px-4">
          <p className="text-base font-bold text-foreground break-keep">문의부터 예약까지 한 화면에서 관리하세요.</p>
          <p className="mt-2 text-sm text-muted-foreground break-keep">
            업종과 필요한 처리 흐름을 알려주시면 적합한 구성을 안내드립니다.
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
