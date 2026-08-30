import { Link } from "react-router-dom";
import {
  Send,
  ArrowRight,
  ExternalLink,
  Inbox,
  ArrowDown,
  MessagesSquare,
  Check,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { CUSTOM_SERVICES } from "@/components/site/customServices";
import { RealEstateAdminProvider, useRealEstateAdmin } from "@/pages/solutions/real-estate-admin/store";
import { PanelHeader, StatusBadge } from "@/pages/solutions/real-estate-admin/components";
import { BrowserFrame, LiveComponentPreview, LazyIframePreview, LoopingBeforeAfter, Reveal } from "@/pages/services/previewKit";

const OTHER_SERVICES = CUSTOM_SERVICES.filter((s) => s.slug !== "inquiry-reservation");

const INDUSTRY_USES = [
  { label: "부동산", flow: "매물 문의 → 상담 배정 → 임장 일정" },
  { label: "렌트카", flow: "예약 문의 → 차량 배정 → 픽업 일정" },
  { label: "병원 · 의원", flow: "진료 문의 → 예약 확정 → 방문 확인" },
  { label: "학원", flow: "상담 문의 → 레벨테스트 → 수강 등록" },
];

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

/** 실제 일정 데이터를 담당자 · 유형 · 완료여부와 함께 읽기 전용으로 보여준다. */
function ScheduleListPreview() {
  const { schedules } = useRealEstateAdmin();
  return (
    <div>
      <PanelHeader title="일정 관리" description="임장, 계약, 상담 일정을 담당자별로 확인합니다." />
      <ul className="divide-y divide-border rounded-lg border border-border">
        {schedules.slice(0, 6).map((s) => (
          <li key={s.id} className="flex items-center justify-between gap-3 px-3 py-2.5 text-xs">
            <div className="min-w-0">
              <p className="font-medium text-foreground">
                {s.date} · {s.type}
              </p>
              <p className="mt-0.5 truncate text-muted-foreground">
                {s.title} — 담당 {s.manager}
              </p>
            </div>
            <StatusBadge label={s.done ? "완료" : "예정"} tone={s.done ? "success" : "info"} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 실제 문의 2건(상담중 상태 · 완료 상태)을 번갈아 보여줘, 상태가 바뀐다는 것을 동작으로 보여준다. */
function StatusLoopPreview() {
  const { inquiries } = useRealEstateAdmin();
  const before = inquiries.find((i) => i.status === "상담중") ?? inquiries[0];
  const after = inquiries.find((i) => i.status === "완료") ?? inquiries[1];

  const card = (i: typeof before, label: string) => (
    <div className="flex h-full flex-col justify-center gap-4 rounded-xl border border-border bg-card p-6">
      <p className="font-mono text-xs font-bold text-primary">{label}</p>
      <div>
        <p className="text-sm font-bold text-foreground">{i.name}</p>
        <p className="mt-1 text-sm text-muted-foreground break-keep">{i.content}</p>
      </div>
      <StatusBadge label={i.status} tone={i.status === "완료" ? "success" : "warning"} />
    </div>
  );

  return (
    <div className="h-[280px]">
      <LoopingBeforeAfter before={card(before, "처리 전")} after={card(after, "처리 후")} />
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

      {/* 왜 필요한가 */}
      <Reveal className="border-y border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-2xl px-4">
          <p className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
            <MessagesSquare className="h-3.5 w-3.5" />
            왜 필요한가
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foreground break-keep">
            전화, 문자, 카카오톡 — 문의가 흩어지면 놓칩니다
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground break-keep">
            채널마다 따로 확인하다 보면 어떤 문의가 처리됐는지, 누가 담당인지 헷갈리기 쉽습니다.
            바쁜 날에는 문의 하나가 그대로 묻히기도 합니다.
          </p>
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-sm font-medium text-foreground break-keep">
              홈페이지로 들어온 문의를 담당자가 한 화면에서 확인하고, 상담중 · 완료 상태를 바꾸며
              처리 이력까지 남깁니다.
            </p>
          </div>
        </div>
      </Reveal>

      {/* 3단 Flow: 접수 → 확인 → 상태 변경 (확대) */}
      <div className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">실제 처리 흐름</p>
            <h2 className="mt-3 max-w-xl text-2xl font-bold text-foreground">
              문의 하나가 접수부터 완료까지 이렇게 이동합니다
            </h2>
          </Reveal>

          <div className="mt-10 grid items-start gap-6 lg:grid-cols-3">
            <Reveal>
              <p className="mb-3 font-mono text-xs font-bold text-primary">01 · 고객 접수</p>
              <BrowserFrame label="고객 홈페이지 — 상담 문의" heightClassName="h-[340px]">
                <LazyIframePreview
                  src="/web-solutions/real-estate/demo/site#contact"
                  scale={0.6}
                  title="MintCL 고객용 문의 폼 데모"
                />
              </BrowserFrame>
            </Reveal>

            <Reveal delay={100}>
              <p className="mb-3 font-mono text-xs font-bold text-primary">02 · 관리자 확인</p>
              <BrowserFrame label="/web-solutions/real-estate/demo" heightClassName="h-[340px]">
                <RealEstateAdminProvider>
                  <LiveComponentPreview scale={0.82}>
                    <InquiryListPreview />
                  </LiveComponentPreview>
                </RealEstateAdminProvider>
              </BrowserFrame>
            </Reveal>

            <Reveal delay={200}>
              <p className="mb-3 font-mono text-xs font-bold text-primary">03 · 상태 변경</p>
              <BrowserFrame label="상담중 ↔ 완료" heightClassName="h-[340px]">
                <RealEstateAdminProvider>
                  <div className="p-4">
                    <StatusLoopPreview />
                  </div>
                </RealEstateAdminProvider>
              </BrowserFrame>
            </Reveal>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground/50 lg:hidden">
            <ArrowDown className="h-5 w-5" />
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground break-keep">
            변경 이력은 활동 로그에 자동으로 남아, 누가 언제 처리했는지 나중에도 확인할 수 있습니다.
          </p>
        </div>
      </div>

      {/* 예약 · 일정 관리 */}
      <Reveal className="border-y border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
            <CalendarDays className="h-3.5 w-3.5" />
            예약 · 일정도 함께
          </p>
          <h2 className="mt-3 max-w-xl text-2xl font-bold text-foreground">
            문의뿐 아니라 예약 · 일정도 같은 화면에서 관리합니다
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground break-keep">
            임장, 계약, 상담, 전화, 입주처럼 업종에 필요한 일정 유형을 만들고, 담당자별로 배정해
            진행 상태를 확인할 수 있습니다. 아래는 실제 일정 데이터입니다.
          </p>

          <div className="mt-8">
            <BrowserFrame label="/web-solutions/real-estate/demo" heightClassName="h-[360px]">
              <RealEstateAdminProvider>
                <LiveComponentPreview scale={0.85}>
                  <ScheduleListPreview />
                </LiveComponentPreview>
              </RealEstateAdminProvider>
            </BrowserFrame>
          </div>
        </div>
      </Reveal>

      {/* 업종별 활용 */}
      <div className="py-14 sm:py-20">
        <div className="mx-auto max-w-2xl px-4">
          <Reveal>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">업종별 활용</p>
            <h2 className="mt-3 text-2xl font-bold text-foreground">업종마다 문의 · 예약의 흐름이 다릅니다</h2>
          </Reveal>
          <div className="mt-8 divide-y divide-border border-t border-border">
            {INDUSTRY_USES.map((item, i) => (
              <Reveal key={item.label} delay={i * 60} className="flex items-center justify-between gap-4 py-4">
                <p className="text-sm font-bold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.flow}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* 이런 경우 추천합니다 */}
      <Reveal className="border-t border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-2xl px-4">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">이런 경우 추천합니다</p>
          <h2 className="mt-3 text-2xl font-bold text-foreground">이런 상황에서 특히 필요합니다</h2>
          <div className="mt-8 space-y-4">
            {[
              "전화, 문자, 카카오톡, 홈페이지 문의가 각각 따로 관리되는 경우",
              "담당자가 여러 명이라 누가 어떤 문의를 처리 중인지 헷갈리는 경우",
              "예약 · 방문 일정을 수기로 관리해 누락이 생기는 경우",
              "문의부터 계약까지 처리 이력을 남겨야 하는 경우",
            ].map((text) => (
              <div key={text} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-foreground break-keep">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

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
