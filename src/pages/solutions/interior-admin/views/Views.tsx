import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Search, Plus, Trash2, Pencil, Hammer, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useInteriorAdmin } from "../store";
import { AREAS } from "../mockData";
import { EMPTY_CASE_FORM } from "../types";
import {
  PanelHeader,
  StatusBadge,
  StatCard,
  Modal,
  Row,
  EmptyResult,
} from "@/pages/solutions/real-estate-admin/components";
import type { Case } from "../types";

export function DashboardView() {
  const { cases, inquiries, activityLog } = useInteriorAdmin();
  const stats = [
    { label: "전체 시공 사례", value: cases.length, icon: Hammer },
    { label: "공개 사례", value: cases.filter((c) => c.status === "공개").length, icon: Hammer },
    { label: "견적 문의", value: inquiries.length, icon: MessageSquare },
    { label: "상담중", value: inquiries.filter((i) => i.status === "상담중").length, icon: MessageSquare },
  ];
  return (
    <div>
      <PanelHeader title="대시보드" description="시공 사례·견적문의 현황을 한눈에 확인합니다. 아래 숫자는 이 데모에서 실제로 조작한 데이터를 기준으로 계산됩니다." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
        ))}
      </div>
      <h3 className="mt-8 text-sm font-semibold text-foreground">최근 작업 내역</h3>
      <div className="mt-3 space-y-2">
        {activityLog.length === 0 && (
          <p className="rounded-lg border border-dashed border-border bg-secondary/30 p-6 text-center text-xs text-muted-foreground break-keep">
            아직 작업 내역이 없습니다. 왼쪽 메뉴에서 시공 사례를 등록하거나 상태를 변경해보면 여기에 기록됩니다.
          </p>
        )}
        {activityLog.map((log) => (
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

export function CaseListView({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { cases, setCases, deleteCase, logActivity } = useInteriorAdmin();
  const [query, setQuery] = useState("");
  const [areaFilter, setAreaFilter] = useState("전체");
  const [editTarget, setEditTarget] = useState<Case | null>(null);

  const filtered = cases.filter((c) => {
    const matchesArea = areaFilter === "전체" || c.area === areaFilter;
    const matchesQuery = query.trim() === "" || c.name.includes(query);
    return matchesArea && matchesQuery;
  });

  return (
    <div>
      <PanelHeader title="시공 사례 목록" description="완료된 시공 사례를 관리합니다." />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="사례명 검색" className="pl-9" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["전체", ...AREAS].map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAreaFilter(a)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                areaFilter === a ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {filtered.length === 0 && <EmptyResult message="조건에 맞는 시공 사례가 없습니다." />}
        {filtered.map((c) => (
          <Row key={c.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                <span className="mr-1.5">{c.icon}</span>
                {c.name}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{c.area} · {c.price}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <StatusBadge
                label={c.status}
                tone={c.status === "공개" ? "success" : "neutral"}
                onClick={() => {
                  setCases((prev) => prev.map((p) => (p.id === c.id ? { ...p, status: p.status === "공개" ? "비공개" : "공개" } : p)));
                  logActivity("시공 사례 공개상태 변경", c.name);
                }}
              />
              <button type="button" onClick={() => setEditTarget(c)} className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" aria-label={`${c.name} 수정`}>
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button type="button" onClick={() => deleteCase(c.id)} className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive" aria-label={`${c.name} 삭제`}>
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </Row>
        ))}
      </div>
      <div className="mt-4">
        <Button size="sm" className="gap-1.5 font-bold" onClick={() => onNavigate("case-register")}>
          <Plus className="h-3.5 w-3.5" />
          신규 시공 사례 등록
        </Button>
      </div>
      <CaseEditModal caseItem={editTarget} onClose={() => setEditTarget(null)} />
    </div>
  );
}

function CaseEditModal({ caseItem, onClose }: { caseItem: Case | null; onClose: () => void }) {
  const { setCases, logActivity } = useInteriorAdmin();
  const [form, setForm] = useState<Case | null>(caseItem);
  useEffect(() => {
    setForm(caseItem);
  }, [caseItem]);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setCases((prev) => prev.map((c) => (c.id === form.id ? form : c)));
    toast.success("시공 사례 정보가 수정되었습니다.");
    logActivity("시공 사례 수정", form.name);
    onClose();
  };

  return (
    <Modal open={!!caseItem} onClose={onClose} title="시공 사례 수정">
      {form && (
        <form onSubmit={handleSave} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-muted-foreground">사례명</label>
            <Input className="mt-1.5" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">평형</label>
            <Input className="mt-1.5" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">시공비</label>
            <Input className="mt-1.5" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" className="gap-1.5 font-bold">저장</Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export function CaseRegisterView({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { setCases, logActivity } = useInteriorAdmin();
  const [form, setForm] = useState(EMPTY_CASE_FORM);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price.trim()) {
      toast.error("모든 항목을 입력해 주세요.");
      return;
    }
    setCases((prev) => [{ id: Date.now(), ...form, status: "공개", icon: "🏠" }, ...prev]);
    toast.success("시공 사례가 등록되었습니다.");
    logActivity("시공 사례 등록", form.name);
    setForm(EMPTY_CASE_FORM);
    onNavigate("case-list");
  };

  return (
    <div>
      <PanelHeader title="시공 사례 등록" description="새 시공 사례의 기본 정보를 입력합니다." />
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">사례명</label>
          <Input className="mt-1.5" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="예: 역삼동 24평 아파트 전체 리모델링" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">평형</label>
          <Select value={form.area} onValueChange={(v) => setForm((f) => ({ ...f, area: v }))}>
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {AREAS.map((a) => (
                <SelectItem key={a} value={a}>{a}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">시공비</label>
          <Input className="mt-1.5" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} placeholder="예: 3,200만원" />
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" className="gap-1.5 font-bold">
            <Plus className="h-3.5 w-3.5" />
            시공 사례 등록하기
          </Button>
        </div>
      </form>
    </div>
  );
}

function cycleStatus(status: "접수" | "상담중" | "완료") {
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
                {i.name} <span className="font-normal text-muted-foreground">· {i.phone} · {i.area}</span>
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground break-keep">{i.content}</p>
            </div>
            <StatusBadge
              label={i.status}
              tone={i.status === "완료" ? "success" : i.status === "상담중" ? "warning" : "info"}
              onClick={() => {
                setInquiries((prev) => prev.map((p) => (p.id === i.id ? { ...p, status: cycleStatus(p.status) } : p)));
                logActivity("견적 문의 상태 변경", i.name);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function PackageView() {
  const { packages, setPackages, logActivity } = useInteriorAdmin();
  const [draft, setDraft] = useState("");

  const addPackage = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setPackages((prev) => [{ id: Date.now(), title: draft.trim(), published: true }, ...prev]);
    toast.success("패키지가 등록되었습니다.");
    logActivity("패키지 등록", draft.trim());
    setDraft("");
  };

  return (
    <div>
      <PanelHeader title="평형별 패키지 관리" description="평형대별 시공 패키지와 가격을 관리합니다." />
      <form onSubmit={addPackage} className="flex gap-2">
        <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="예: 20평대 패키지 - 2,200만원부터" className="flex-1" />
        <Button type="submit" size="sm" className="shrink-0 gap-1.5 font-bold">
          <Plus className="h-3.5 w-3.5" />
          등록
        </Button>
      </form>
      <div className="mt-4 space-y-2">
        {packages.map((p) => (
          <Row key={p.id}>
            <p className="truncate text-sm font-medium text-foreground">{p.title}</p>
            <StatusBadge
              label={p.published ? "게시중" : "비공개"}
              tone={p.published ? "success" : "neutral"}
              onClick={() => {
                setPackages((prev) => prev.map((x) => (x.id === p.id ? { ...x, published: !x.published } : x)));
                logActivity(p.published ? "패키지 비공개 전환" : "패키지 게시", p.title);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function StaffView() {
  const { staff, setStaff, logActivity } = useInteriorAdmin();
  return (
    <div>
      <PanelHeader title="관리자 모드" description="관리자 · 직원 계정과 권한을 관리합니다." />
      <div className="space-y-2">
        {staff.map((s) => (
          <Row key={s.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{s.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.position} · {s.phone}</p>
            </div>
            <Select
              value={s.role}
              onValueChange={(v) => {
                setStaff((prev) => prev.map((p) => (p.id === s.id ? { ...p, role: v as typeof s.role } : p)));
                logActivity("권한 변경", `${s.name} → ${v}`);
                toast.success("권한이 변경되었습니다.");
              }}
            >
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="관리자">관리자</SelectItem>
                <SelectItem value="직원">직원</SelectItem>
              </SelectContent>
            </Select>
          </Row>
        ))}
      </div>
    </div>
  );
}
