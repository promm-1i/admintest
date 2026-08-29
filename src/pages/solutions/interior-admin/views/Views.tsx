import { useState } from "react";
import { MessageSquare, FolderKanban, Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useInteriorAdmin } from "../store";
import {
  PanelHeader,
  StatusBadge,
  StatCard,
  Modal,
  Row,
  EmptyResult,
} from "@/pages/solutions/real-estate-admin/components";
import type { Estimate, QuoteInquiry } from "../types";

export function DashboardView() {
  const { inquiries, projects, payments, activityLog } = useInteriorAdmin();
  const unpaidCount = payments.filter((p) => p.status !== "완납").length;
  const stats = [
    { label: "견적 문의", value: inquiries.length, icon: MessageSquare },
    { label: "진행중 프로젝트", value: projects.filter((p) => p.status === "진행중").length, icon: FolderKanban },
    { label: "완료 프로젝트", value: projects.filter((p) => p.status === "완료").length, icon: FolderKanban },
    { label: "결제 미완료", value: unpaidCount, icon: Wallet },
  ];
  return (
    <div>
      <PanelHeader title="대시보드" description="견적·프로젝트·결제 현황을 한눈에 확인합니다. 아래 숫자는 이 데모에서 실제로 조작한 데이터를 기준으로 계산됩니다." />
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
  const { inquiries, setInquiries, logActivity } = useInteriorAdmin();
  return (
    <div>
      <PanelHeader title="견적 문의 관리" description="고객이 남긴 견적 문의를 관리합니다. 상태 배지를 클릭하면 변경됩니다." />
      <div className="space-y-2">
        {inquiries.length === 0 && <EmptyResult message="접수된 문의가 없습니다." />}
        {inquiries.map((i) => (
          <Row key={i.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {i.name} <span className="font-normal text-muted-foreground">· {i.phone} · {i.area} · {i.spaceType} · 예산 {i.budget}</span>
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

export function SurveyView() {
  const { surveys, setSurveys, logActivity } = useInteriorAdmin();
  const STATUSES = ["예정", "완료", "취소"] as const;
  return (
    <div>
      <PanelHeader title="현장 실측 관리" description="방문 실측 일정과 결과를 관리합니다." />
      <div className="space-y-2">
        {surveys.map((s) => (
          <Row key={s.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {s.customerName} <span className="font-normal text-muted-foreground">· {s.address} · {s.area} · {s.scheduledDate} · 담당 {s.surveyor}</span>
              </p>
              {s.memo && <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground break-keep">{s.memo}</p>}
            </div>
            <StatusBadge
              label={s.status}
              tone={s.status === "완료" ? "success" : s.status === "취소" ? "danger" : "info"}
              onClick={() => {
                const next = STATUSES[(STATUSES.indexOf(s.status) + 1) % STATUSES.length];
                setSurveys((prev) => prev.map((p) => (p.id === s.id ? { ...p, status: next } : p)));
                logActivity("현장 실측 상태 변경", `${s.customerName} → ${next}`);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function EstimateView() {
  const { estimates, setEstimates, logActivity } = useInteriorAdmin();
  const [detail, setDetail] = useState<Estimate | null>(null);
  const [query, setQuery] = useState("");
  const STATUSES = ["작성중", "발송완료", "승인", "반려"] as const;
  const filtered = estimates.filter((e) => query.trim() === "" || e.customerName.includes(query) || e.projectName.includes(query));

  return (
    <div>
      <PanelHeader title="견적서 관리" description="항목별 견적 내역을 확인합니다. 행을 클릭하면 세부 항목을 볼 수 있습니다." />
      <div className="relative">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="고객명 · 프로젝트명 검색" />
      </div>
      <div className="mt-4 space-y-2">
        {filtered.length === 0 && <EmptyResult message="조건에 맞는 견적서가 없습니다." />}
        {filtered.map((e) => (
          <Row key={e.id}>
            <button type="button" onClick={() => setDetail(e)} className="min-w-0 flex-1 text-left">
              <p className="text-sm font-medium text-foreground">
                {e.customerName} <span className="font-normal text-muted-foreground">· {e.projectName}</span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">총액 {e.totalAmount} · 작성일 {e.createdDate}</p>
            </button>
            <StatusBadge
              label={e.status}
              tone={e.status === "승인" ? "success" : e.status === "반려" ? "danger" : e.status === "발송완료" ? "info" : "neutral"}
              onClick={() => {
                const next = STATUSES[(STATUSES.indexOf(e.status) + 1) % STATUSES.length];
                setEstimates((prev) => prev.map((p) => (p.id === e.id ? { ...p, status: next } : p)));
                logActivity("견적서 상태 변경", `${e.customerName} → ${next}`);
              }}
            />
          </Row>
        ))}
      </div>
      <Modal open={!!detail} onClose={() => setDetail(null)} title="견적서 상세">
        {detail && (
          <div>
            <p className="text-sm font-medium text-foreground">{detail.customerName} · {detail.projectName}</p>
            <p className="mt-1 text-xs text-muted-foreground">{detail.area} · 작성일 {detail.createdDate}</p>
            <div className="mt-4 overflow-hidden rounded-lg border border-border">
              <table className="w-full border-collapse text-left text-sm">
                <tbody>
                  {detail.items.map((item, idx) => (
                    <tr key={idx} className="border-b border-border/60 last:border-b-0">
                      <td className="px-3 py-2 text-foreground">{item.name}</td>
                      <td className="px-3 py-2 text-right text-muted-foreground">{item.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-right text-sm font-bold text-foreground">총액 {detail.totalAmount}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export function ContractView() {
  const { contracts, setContracts, logActivity } = useInteriorAdmin();
  const STATUSES = ["계약대기", "계약완료", "취소"] as const;
  return (
    <div>
      <PanelHeader title="계약 관리" description="고객별 계약 현황을 관리합니다." />
      <div className="space-y-2">
        {contracts.map((c) => (
          <Row key={c.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {c.customerName} <span className="font-normal text-muted-foreground">· {c.projectName}</span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">계약금액 {c.contractAmount} · 계약일 {c.contractDate}</p>
            </div>
            <StatusBadge
              label={c.status}
              tone={c.status === "계약완료" ? "success" : c.status === "취소" ? "danger" : "warning"}
              onClick={() => {
                const next = STATUSES[(STATUSES.indexOf(c.status) + 1) % STATUSES.length];
                setContracts((prev) => prev.map((p) => (p.id === c.id ? { ...p, status: next } : p)));
                logActivity("계약 상태 변경", `${c.customerName} → ${next}`);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function ProjectView() {
  const { projects, setProjects, logActivity } = useInteriorAdmin();
  const STATUSES = ["진행전", "진행중", "완료", "보류"] as const;
  return (
    <div>
      <PanelHeader title="프로젝트 관리" description="계약 이후 시공 프로젝트의 진행 현황을 관리합니다." />
      <div className="space-y-2">
        {projects.map((p) => (
          <Row key={p.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {p.customerName} <span className="font-normal text-muted-foreground">· {p.projectName}</span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{p.area} · {p.startDate} ~ {p.endDate} · 담당 {p.manager}</p>
            </div>
            <StatusBadge
              label={p.status}
              tone={p.status === "완료" ? "success" : p.status === "보류" ? "danger" : p.status === "진행중" ? "info" : "neutral"}
              onClick={() => {
                const next = STATUSES[(STATUSES.indexOf(p.status) + 1) % STATUSES.length];
                setProjects((prev) => prev.map((x) => (x.id === p.id ? { ...x, status: next } : x)));
                logActivity("프로젝트 상태 변경", `${p.customerName} → ${next}`);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function ProcessView() {
  const { process, setProcess, logActivity } = useInteriorAdmin();
  const STATUSES = ["예정", "진행중", "완료"] as const;
  const byProject = process.reduce<Record<string, typeof process>>((acc, s) => {
    (acc[s.projectName] ??= []).push(s);
    return acc;
  }, {});

  return (
    <div>
      <PanelHeader title="공정 관리" description="프로젝트별 공정 단계를 확인하고 진행 상태를 변경합니다." />
      <div className="space-y-4">
        {Object.entries(byProject).map(([projectName, steps]) => (
          <div key={projectName} className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm font-semibold text-foreground">{projectName}</p>
            <div className="mt-2 space-y-1.5">
              {steps.map((s) => (
                <div key={s.id} className="flex items-center gap-3 rounded-lg bg-secondary/30 px-3 py-2 text-xs">
                  <span className="shrink-0 font-medium text-foreground">{s.stepName}</span>
                  <span className="min-w-0 flex-1 truncate text-muted-foreground">{s.scheduledDate} · {s.worker}</span>
                  <StatusBadge
                    label={s.status}
                    tone={s.status === "완료" ? "success" : s.status === "진행중" ? "info" : "neutral"}
                    onClick={() => {
                      const next = STATUSES[(STATUSES.indexOf(s.status) + 1) % STATUSES.length];
                      setProcess((prev) => prev.map((p) => (p.id === s.id ? { ...p, status: next } : p)));
                      logActivity("공정 상태 변경", `${projectName} · ${s.stepName} → ${next}`);
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

export function MaterialView() {
  const { materials, setMaterials, logActivity } = useInteriorAdmin();
  const STATUSES = ["주문", "입고", "사용완료"] as const;
  return (
    <div>
      <PanelHeader title="자재 관리" description="프로젝트별 자재 발주·입고 현황을 관리합니다." />
      <div className="space-y-2">
        {materials.map((m) => (
          <Row key={m.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {m.name} <span className="font-normal text-muted-foreground">· {m.category} · {m.supplier}</span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{m.unitPrice} · {m.projectName}</p>
            </div>
            <StatusBadge
              label={m.status}
              tone={m.status === "사용완료" ? "success" : m.status === "입고" ? "info" : "neutral"}
              onClick={() => {
                const next = STATUSES[(STATUSES.indexOf(m.status) + 1) % STATUSES.length];
                setMaterials((prev) => prev.map((p) => (p.id === m.id ? { ...p, status: next } : p)));
                logActivity("자재 상태 변경", `${m.name} → ${next}`);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}
