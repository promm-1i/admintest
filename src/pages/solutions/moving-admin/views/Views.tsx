import { MessageSquare, CalendarCheck, Truck, Wallet } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMovingAdmin } from "../store";
import {
  PanelHeader,
  StatusBadge,
  StatCard,
  Row,
  EmptyResult,
} from "@/pages/solutions/real-estate-admin/components";
import type { QuoteInquiry } from "../types";

export function DashboardView() {
  const { inquiries, reservations, workStatus, payments, activityLog } = useMovingAdmin();
  const today = "2026-09-10";
  const unpaidCount = payments.filter((p) => p.status !== "완납").length;
  const stats = [
    { label: "견적 문의", value: inquiries.length, icon: MessageSquare },
    { label: "오늘 예약 작업", value: reservations.filter((r) => r.moveDate === today).length, icon: CalendarCheck },
    { label: "작업중", value: workStatus.filter((w) => w.stage !== "완료").length, icon: Truck },
    { label: "결제 미완료", value: unpaidCount, icon: Wallet },
  ];
  return (
    <div>
      <PanelHeader title="대시보드" description="견적·예약·작업·결제 현황을 한눈에 확인합니다. 아래 숫자는 이 데모에서 실제로 조작한 데이터를 기준으로 계산됩니다." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
        ))}
      </div>
      <h3 className="mt-8 text-sm font-semibold text-foreground">최근 작업 내역</h3>
      <div className="mt-3 space-y-2">
        {activityLog.length === 0 && (
          <p className="rounded-lg border border-dashed border-border bg-secondary/30 p-6 text-center text-xs text-muted-foreground break-keep">
            아직 작업 내역이 없습니다. 왼쪽 메뉴에서 견적 문의를 처리하거나 상태를 변경해보면 여기에 기록됩니다.
          </p>
        )}
        {activityLog.slice(0, 10).map((log) => (
          <div key={log.id} className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 px-3 py-2 text-xs">
            <span className="shrink-0 text-muted-foreground">{log.time}</span>
            <span className="shrink-0 font-medium text-foreground">{log.action}</span>
            <span className="min-w-0 flex-1 truncate text-muted-foreground">{log.target}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function cycleQuoteStatus(status: QuoteInquiry["status"]) {
  if (status === "접수") return "상담중" as const;
  if (status === "상담중") return "완료" as const;
  return "접수" as const;
}

export function QuoteView() {
  const { inquiries, setInquiries, logActivity } = useMovingAdmin();
  return (
    <div>
      <PanelHeader title="견적 문의 관리" description="고객이 남긴 견적 문의를 관리합니다. 상태 배지를 클릭하면 변경됩니다." />
      <div className="space-y-2">
        {inquiries.length === 0 && <EmptyResult message="접수된 문의가 없습니다." />}
        {inquiries.map((i) => (
          <Row key={i.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {i.name} <span className="font-normal text-muted-foreground">· {i.phone} · {i.serviceType} · {i.fromAddress} → {i.toAddress} · {i.moveDate}</span>
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground break-keep">{i.content}</p>
            </div>
            <StatusBadge
              label={i.status}
              tone={i.status === "완료" ? "success" : i.status === "상담중" ? "warning" : "info"}
              onClick={() => {
                setInquiries((prev) => prev.map((p) => (p.id === i.id ? { ...p, status: cycleQuoteStatus(p.status) } : p)));
                logActivity("견적 문의 상태 변경", i.name);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function EstimateView() {
  const { quotes, setQuotes, logActivity } = useMovingAdmin();
  const STATUSES = ["작성중", "발송완료", "승인", "반려"] as const;
  return (
    <div>
      <PanelHeader title="견적 관리" description="이사·청소 유형별 항목 견적을 확인합니다." />
      <div className="space-y-2">
        {quotes.map((q) => (
          <Row key={q.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {q.customerName} <span className="font-normal text-muted-foreground">· {q.serviceType} · {q.moveDate}</span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{q.items.map((item) => `${item.name} ${item.cost}`).join(" · ")}</p>
              <p className="mt-0.5 text-xs font-semibold text-foreground">총액 {q.totalAmount}</p>
            </div>
            <StatusBadge
              label={q.status}
              tone={q.status === "승인" ? "success" : q.status === "반려" ? "danger" : q.status === "발송완료" ? "info" : "neutral"}
              onClick={() => {
                const next = STATUSES[(STATUSES.indexOf(q.status) + 1) % STATUSES.length];
                setQuotes((prev) => prev.map((p) => (p.id === q.id ? { ...p, status: next } : p)));
                logActivity("견적 상태 변경", `${q.customerName} → ${next}`);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function ReservationView() {
  const { reservations, setReservations, teams, vehicles, logActivity } = useMovingAdmin();
  const STATUSES = ["대기", "확정", "완료", "취소"] as const;
  return (
    <div>
      <PanelHeader title="예약 관리" description="확정된 작업 예약과 배정된 팀·차량을 관리합니다." />
      <div className="space-y-2">
        {reservations.map((r) => (
          <Row key={r.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {r.customerName} <span className="font-normal text-muted-foreground">· {r.serviceType} · {r.moveDate} {r.time}</span>
              </p>
              <p className="mt-0.5 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <Select
                  value={r.team}
                  onValueChange={(v) => {
                    setReservations((prev) => prev.map((p) => (p.id === r.id ? { ...p, team: v } : p)));
                    logActivity("작업팀 배정 변경", `${r.customerName} → ${v}`);
                  }}
                >
                  <SelectTrigger className="h-7 w-28 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((t) => (
                      <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={r.vehicle}
                  onValueChange={(v) => {
                    setReservations((prev) => prev.map((p) => (p.id === r.id ? { ...p, vehicle: v } : p)));
                    logActivity("차량 배정 변경", `${r.customerName} → ${v}`);
                  }}
                >
                  <SelectTrigger className="h-7 w-36 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles.map((v) => (
                      <SelectItem key={v.id} value={`${v.type} (${v.plateNumber})`}>{v.type} ({v.plateNumber})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </p>
            </div>
            <StatusBadge
              label={r.status}
              tone={r.status === "완료" ? "success" : r.status === "취소" ? "danger" : r.status === "확정" ? "info" : "warning"}
              onClick={() => {
                const next = STATUSES[(STATUSES.indexOf(r.status) + 1) % STATUSES.length];
                setReservations((prev) => prev.map((p) => (p.id === r.id ? { ...p, status: next } : p)));
                logActivity("예약 상태 변경", `${r.customerName} → ${next}`);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function TeamView() {
  const { teams, setTeams, logActivity } = useMovingAdmin();
  const STATUSES = ["대기", "작업중", "휴무"] as const;
  return (
    <div>
      <PanelHeader title="작업팀 관리" description="이사·청소 작업팀 현황을 관리합니다." />
      <div className="space-y-2">
        {teams.map((t) => (
          <Row key={t.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {t.name} <span className="font-normal text-muted-foreground">· 팀장 {t.leader} · {t.members}명 · {t.phone}</span>
              </p>
            </div>
            <StatusBadge
              label={t.status}
              tone={t.status === "작업중" ? "info" : t.status === "휴무" ? "neutral" : "success"}
              onClick={() => {
                const next = STATUSES[(STATUSES.indexOf(t.status) + 1) % STATUSES.length];
                setTeams((prev) => prev.map((p) => (p.id === t.id ? { ...p, status: next } : p)));
                logActivity("작업팀 상태 변경", `${t.name} → ${next}`);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function VehicleView() {
  const { vehicles, setVehicles, logActivity } = useMovingAdmin();
  const STATUSES = ["대기", "운행중", "정비중"] as const;
  return (
    <div>
      <PanelHeader title="차량 관리" description="보유 차량의 배정과 운행 상태를 관리합니다." />
      <div className="space-y-2">
        {vehicles.map((v) => (
          <Row key={v.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {v.plateNumber} <span className="font-normal text-muted-foreground">· {v.type} · 배정팀 {v.assignedTeam}</span>
              </p>
            </div>
            <StatusBadge
              label={v.status}
              tone={v.status === "운행중" ? "info" : v.status === "정비중" ? "danger" : "success"}
              onClick={() => {
                const next = STATUSES[(STATUSES.indexOf(v.status) + 1) % STATUSES.length];
                setVehicles((prev) => prev.map((p) => (p.id === v.id ? { ...p, status: next } : p)));
                logActivity("차량 상태 변경", `${v.plateNumber} → ${next}`);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function WorkStatusView() {
  const { workStatus, setWorkStatus, logActivity } = useMovingAdmin();
  const STAGES = ["출발전", "이동중", "작업중", "완료"] as const;
  const byDate = workStatus.reduce<Record<string, typeof workStatus>>((acc, w) => {
    (acc[w.date] ??= []).push(w);
    return acc;
  }, {});
  const dates = Object.keys(byDate).sort();

  return (
    <div>
      <PanelHeader title="작업 현황" description="당일 작업의 진행 단계를 실시간으로 관리합니다." />
      <div className="space-y-4">
        {dates.map((date) => (
          <div key={date} className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm font-semibold text-foreground">{date}</p>
            <div className="mt-2 space-y-1.5">
              {byDate[date].map((w) => (
                <div key={w.id} className="flex items-center gap-3 rounded-lg bg-secondary/30 px-3 py-2 text-xs">
                  <span className="min-w-0 flex-1 truncate text-foreground">{w.customerName} <span className="text-muted-foreground">· {w.serviceType} · {w.team}</span></span>
                  <StatusBadge
                    label={w.stage}
                    tone={w.stage === "완료" ? "success" : w.stage === "작업중" ? "info" : w.stage === "이동중" ? "warning" : "neutral"}
                    onClick={() => {
                      const next = STAGES[(STAGES.indexOf(w.stage) + 1) % STAGES.length];
                      setWorkStatus((prev) => prev.map((p) => (p.id === w.id ? { ...p, stage: next } : p)));
                      logActivity("작업 현황 변경", `${w.customerName} → ${next}`);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PaymentView() {
  const { payments, setPayments, logActivity } = useMovingAdmin();
  const STATUSES = ["완납", "부분납부", "미납"] as const;
  return (
    <div>
      <PanelHeader title="결제 관리" description="작업별 결제 현황을 관리합니다. 배지를 클릭하면 상태가 변경됩니다." />
      <div className="space-y-2">
        {payments.map((p) => (
          <Row key={p.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {p.customerName} <span className="font-normal text-muted-foreground">· {p.serviceType}</span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{p.amount} · 납부기한 {p.dueDate}</p>
            </div>
            <StatusBadge
              label={p.status}
              tone={p.status === "완납" ? "success" : p.status === "부분납부" ? "warning" : "danger"}
              onClick={() => {
                const next = STATUSES[(STATUSES.indexOf(p.status) + 1) % STATUSES.length];
                setPayments((prev) => prev.map((x) => (x.id === p.id ? { ...x, status: next } : x)));
                logActivity("결제 상태 변경", `${p.customerName} → ${next}`);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}
