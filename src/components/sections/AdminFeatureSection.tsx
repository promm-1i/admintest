import { useState } from "react";
import { Check, ShieldCheck, PlusCircle, ToggleLeft, ToggleRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

/** 좌측 항목에 마우스를 올리면 우측 대시보드가 해당 화면으로 실시간 전환된다 */
const ADMIN_CAPABILITIES = [
  "콘텐츠 등록 / 수정",
  "문의 내역 관리",
  "공개 / 비공개 설정",
  "고객 관리",
  "예약 / 일정 관리",
  "직원 권한 관리",
  "운영 통계",
] as const;

type Capability = (typeof ADMIN_CAPABILITIES)[number];

const Badge = ({ tone, children }: { tone: "green" | "amber" | "red" | "gray"; children: React.ReactNode }) => (
  <span
    className={cn(
      "rounded-full px-2 py-0.5 text-[10px] font-bold",
      tone === "green" && "bg-emerald-500/15 text-emerald-400",
      tone === "amber" && "bg-amber-500/15 text-amber-400",
      tone === "red" && "bg-primary/20 text-red-400",
      tone === "gray" && "bg-white/10 text-neutral-400",
    )}
  >
    {children}
  </span>
);

const Panel = ({ title, action, children }: { title: string; action?: string; children: React.ReactNode }) => (
  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
    <div className="mb-3 flex items-center justify-between">
      <p className="text-xs font-semibold text-neutral-300">{title}</p>
      {action && (
        <span className="flex items-center gap-1 text-[11px] font-bold text-red-400">
          <PlusCircle className="h-3 w-3" /> {action}
        </span>
      )}
    </div>
    {children}
  </div>
);

const Row = ({ children, dim }: { children: React.ReactNode; dim?: boolean }) => (
  <div className={cn("flex items-center justify-between gap-3 rounded-md bg-black/30 px-3.5 py-2.5", dim && "opacity-60")}>
    {children}
  </div>
);

function ContentView() {
  return (
    <div className="space-y-4">
      <Panel title="📄 공지사항 관리" action="글쓰기">
        <div className="space-y-2">
          <Row>
            <span className="truncate text-xs font-semibold text-white">[공지] 9월 휴무 안내</span>
            <Badge tone="green">게시중</Badge>
          </Row>
          <Row>
            <span className="truncate text-xs text-neutral-300">[이벤트] 가을 신메뉴 출시</span>
            <Badge tone="green">게시중</Badge>
          </Row>
          <Row dim>
            <span className="truncate text-xs text-neutral-400">[초안] 연말 영업시간 변경</span>
            <Badge tone="gray">임시저장</Badge>
          </Row>
        </div>
      </Panel>
      <Panel title="🖼 갤러리 관리">
        <div className="grid grid-cols-4 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="aspect-square rounded-md bg-gradient-to-br from-white/15 to-white/5" />
          ))}
        </div>
      </Panel>
    </div>
  );
}

function InquiryView() {
  return (
    <Panel title="✉️ 상담 문의내역" action="">
      <div className="space-y-2">
        <Row>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-white">김서연 · 예약 변경 문의</p>
            <p className="text-[10px] text-neutral-500">010-1234-5678 · 5분 전</p>
          </div>
          <Badge tone="red">신규</Badge>
        </Row>
        <Row>
          <div className="min-w-0">
            <p className="truncate text-xs text-neutral-300">박준호 · 가격 문의</p>
            <p className="text-[10px] text-neutral-500">010-9876-5432 · 1시간 전</p>
          </div>
          <Badge tone="amber">답변중</Badge>
        </Row>
        <Row dim>
          <div className="min-w-0">
            <p className="truncate text-xs text-neutral-400">이민지 · 단체 예약</p>
            <p className="text-[10px] text-neutral-500">어제</p>
          </div>
          <Badge tone="green">완료</Badge>
        </Row>
      </div>
      <p className="mt-3 text-[10px] text-neutral-500">문의 접수 시 실시간 문자 알림 · 처리 상태별 필터</p>
    </Panel>
  );
}

function VisibilityView() {
  return (
    <Panel title="👁 공개 / 비공개 설정">
      <div className="space-y-2">
        {[
          { name: "가을 프로모션 배너", on: true },
          { name: "매물 · 상품 12건", on: true },
          { name: "겨울 시즌 페이지", on: false },
          { name: "리뉴얼 준비 섹션", on: false },
        ].map((r) => (
          <Row key={r.name} dim={!r.on}>
            <span className={cn("text-xs", r.on ? "font-semibold text-white" : "text-neutral-400")}>{r.name}</span>
            {r.on ? <ToggleRight className="h-5 w-5 shrink-0 text-emerald-400" /> : <ToggleLeft className="h-5 w-5 shrink-0 text-neutral-500" />}
          </Row>
        ))}
      </div>
      <p className="mt-3 text-[10px] text-neutral-500">토글 한 번으로 홈페이지에 즉시 반영</p>
    </Panel>
  );
}

function CustomerView() {
  return (
    <Panel title="👥 고객 관리" action="고객 등록">
      <div className="space-y-2">
        {[
          { n: "김서연", tag: "단골 · 방문 14회", badge: "VIP", tone: "amber" as const },
          { n: "박준호", tag: "최근 방문 8/29", badge: "일반", tone: "gray" as const },
          { n: "이민지", tag: "신규 · 첫 방문", badge: "신규", tone: "green" as const },
        ].map((c) => (
          <Row key={c.n}>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white">{c.n}</p>
              <p className="text-[10px] text-neutral-500">{c.tag}</p>
            </div>
            <Badge tone={c.tone}>{c.badge}</Badge>
          </Row>
        ))}
      </div>
      <p className="mt-3 text-[10px] text-neutral-500">방문 이력 · 메모 · 문자 발송까지 한 화면에서</p>
    </Panel>
  );
}

function ScheduleView() {
  const days = ["월", "화", "수", "목", "금", "토"];
  const slots = [3, 5, 2, 6, 4, 7];
  return (
    <Panel title="📅 예약 / 일정 관리" action="예약 등록">
      <div className="grid grid-cols-6 gap-1.5">
        {days.map((d, i) => (
          <div key={d} className="rounded-md bg-black/30 p-2 text-center">
            <p className="text-[10px] font-bold text-neutral-400">{d}</p>
            <p className={cn("mt-1 text-sm font-extrabold", slots[i] >= 6 ? "text-red-400" : "text-white")}>{slots[i]}</p>
            <p className="text-[9px] text-neutral-500">건</p>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        <Row>
          <span className="text-xs font-semibold text-white">14:00 · 김서연 (2인)</span>
          <Badge tone="green">확정</Badge>
        </Row>
        <Row>
          <span className="text-xs text-neutral-300">16:30 · 신규 예약 요청</span>
          <Badge tone="red">대기</Badge>
        </Row>
      </div>
    </Panel>
  );
}

function StaffView() {
  return (
    <Panel title="🔐 직원 권한 관리" action="직원 초대">
      <div className="space-y-2">
        {[
          { n: "대표 (사장님)", role: "전체 관리", tone: "red" as const },
          { n: "실장 김OO", role: "예약 · 문의", tone: "amber" as const },
          { n: "직원 박OO", role: "게시글만", tone: "gray" as const },
        ].map((s) => (
          <Row key={s.n}>
            <span className="text-xs font-semibold text-white">{s.n}</span>
            <Badge tone={s.tone}>{s.role}</Badge>
          </Row>
        ))}
      </div>
      <p className="mt-3 text-[10px] text-neutral-500">계정별로 볼 수 있는 메뉴를 다르게 설정</p>
    </Panel>
  );
}

function StatsView() {
  const bars = [42, 61, 55, 78, 70, 96, 88];
  const sources = [
    { k: "네이버 검색", v: 46 },
    { k: "직접 방문", v: 27 },
    { k: "인스타그램", v: 17 },
    { k: "기타", v: 10 },
  ];
  return (
    <div className="space-y-4">
      <Panel title="📊 이번 주 방문자">
        <div className="flex items-end gap-1.5" style={{ height: 64 }}>
          {bars.map((b, i) => (
            <div key={i} className={cn("flex-1 rounded-t", i === 5 ? "bg-red-400" : "bg-white/25")} style={{ height: `${b}%` }} />
          ))}
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <p className="text-[10px] text-neutral-500">월 – 일</p>
          <p className="text-xs font-bold text-white">
            총 <span className="text-red-400">1,284명</span> · 전주 대비 +18%
          </p>
        </div>
      </Panel>
      <Panel title="🔎 유입 경로">
        <div className="space-y-2">
          {sources.map((s) => (
            <div key={s.k} className="flex items-center gap-3">
              <span className="w-20 shrink-0 text-[11px] text-neutral-400">{s.k}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-red-400/80" style={{ width: `${s.v}%` }} />
              </div>
              <span className="w-8 shrink-0 text-right text-[11px] font-bold text-white">{s.v}%</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

const VIEWS: Record<Capability, () => React.ReactNode> = {
  "콘텐츠 등록 / 수정": ContentView,
  "문의 내역 관리": InquiryView,
  "공개 / 비공개 설정": VisibilityView,
  "고객 관리": CustomerView,
  "예약 / 일정 관리": ScheduleView,
  "직원 권한 관리": StaffView,
  "운영 통계": StatsView,
};

export function AdminFeatureSection() {
  const [active, setActive] = useState<Capability>(ADMIN_CAPABILITIES[0]);
  const View = VIEWS[active];

  return (
    <section className="bg-neutral-950 px-4 py-20 text-white sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
        {/* Left Info Column */}
        <div className="lg:col-span-6 space-y-6">
          <p className="text-sm font-bold tracking-widest text-primary uppercase">ADMIN SYSTEM</p>
          <h2 className="text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            홈페이지 제작에서
            <br />
            끝나지 않습니다.
          </h2>
          <p className="text-pretty text-sm leading-relaxed text-neutral-400 sm:text-base">
            공지사항, 문의, 고객, 상품, 일정, 예약, 매물, 계약 등 실제 운영 업무를 관리할 수 있는 관리자
            시스템까지 함께 구축합니다. 항목에 마우스를 올리면 실제 화면 구성이 보입니다.
          </p>

          <ul className="grid gap-2.5 pt-2 sm:grid-cols-2">
            {ADMIN_CAPABILITIES.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(item)}
                  onFocus={() => setActive(item)}
                  onClick={() => setActive(item)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg border p-3 text-left text-sm font-medium break-keep transition-colors",
                    active === item
                      ? "border-primary/60 bg-primary/10 text-white"
                      : "border-white/10 bg-white/5 text-neutral-300 hover:border-white/30 hover:text-white",
                  )}
                >
                  <Check className={cn("h-4 w-4 shrink-0", active === item ? "text-red-400" : "text-primary")} />
                  {item}
                </button>
              </li>
            ))}
          </ul>

          <p className="text-xs text-neutral-500 break-keep pt-1">
            ※ 모든 홈페이지에 기본 포함되는 기능은 아니며, 업종과 운영 형태에 따라 맞춤 구성됩니다.
          </p>

          <a
            href="#industry-section"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            업종별 관리자 데모 보러 가기 ↓
          </a>
        </div>

        {/* Right Dashboard Mockup Column — 좌측 선택에 따라 실시간 전환 */}
        <div className="lg:col-span-6">
          <FadeIn delay={120}>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-3">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                  Admin Dashboard
                </span>
                <div className="flex items-center gap-1.5 rounded-md bg-white/5 px-3 py-1 text-[11px] font-mono text-neutral-400 border border-white/10">
                  <ShieldCheck className="h-3 w-3 text-primary" />
                  관리자 모드
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-xs font-mono font-medium text-primary">MANAGEMENT</span>
                    <h3 className="text-base font-semibold">{active}</h3>
                  </div>
                  <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
                    온라인
                  </span>
                </div>

                <div key={active} className="min-h-[300px] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-300">
                  <View />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
