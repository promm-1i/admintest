import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Search, Plus, Trash2, Pencil, Stethoscope, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useHospitalAdmin } from "../store";
import { EMPTY_DEPARTMENT_FORM } from "../types";
import {
  PanelHeader,
  StatusBadge,
  StatCard,
  Modal,
  Row,
  EmptyResult,
} from "@/pages/solutions/real-estate-admin/components";
import type { Department } from "../types";

export function DashboardView() {
  const { departments, inquiries, activityLog } = useHospitalAdmin();
  const stats = [
    { label: "전체 진료과목", value: departments.length, icon: Stethoscope },
    { label: "공개 진료과목", value: departments.filter((d) => d.status === "공개").length, icon: Stethoscope },
    { label: "예약 문의", value: inquiries.length, icon: CalendarCheck },
    { label: "상담중", value: inquiries.filter((i) => i.status === "상담중").length, icon: CalendarCheck },
  ];
  return (
    <div>
      <PanelHeader title="대시보드" description="진료과목·예약문의 현황을 한눈에 확인합니다. 아래 숫자는 이 데모에서 실제로 조작한 데이터를 기준으로 계산됩니다." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
        ))}
      </div>
      <h3 className="mt-8 text-sm font-semibold text-foreground">최근 작업 내역</h3>
      <div className="mt-3 space-y-2">
        {activityLog.length === 0 && (
          <p className="rounded-lg border border-dashed border-border bg-secondary/30 p-6 text-center text-xs text-muted-foreground break-keep">
            아직 작업 내역이 없습니다. 왼쪽 메뉴에서 진료과목을 등록하거나 상태를 변경해보면 여기에 기록됩니다.
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

export function DepartmentListView({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { departments, setDepartments, deleteDepartment, logActivity } = useHospitalAdmin();
  const [query, setQuery] = useState("");
  const [editTarget, setEditTarget] = useState<Department | null>(null);

  const filtered = departments.filter((d) => query.trim() === "" || d.name.includes(query) || d.doctor.includes(query));

  return (
    <div>
      <PanelHeader title="진료과목 목록" description="진료과목과 담당 의료진을 관리합니다." />
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="진료과목 · 의료진 검색" className="pl-9" />
      </div>
      <div className="mt-4 space-y-2">
        {filtered.length === 0 && <EmptyResult message="조건에 맞는 진료과목이 없습니다." />}
        {filtered.map((d) => (
          <Row key={d.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                <span className="mr-1.5">{d.icon}</span>
                {d.name} <span className="font-normal text-muted-foreground">· {d.doctor}</span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground break-keep">{d.desc}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <StatusBadge
                label={d.status}
                tone={d.status === "공개" ? "success" : "neutral"}
                onClick={() => {
                  setDepartments((prev) => prev.map((p) => (p.id === d.id ? { ...p, status: p.status === "공개" ? "비공개" : "공개" } : p)));
                  logActivity("진료과목 공개상태 변경", d.name);
                }}
              />
              <button
                type="button"
                onClick={() => setEditTarget(d)}
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label={`${d.name} 수정`}
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => deleteDepartment(d.id)}
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label={`${d.name} 삭제`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </Row>
        ))}
      </div>
      <div className="mt-4">
        <Button size="sm" className="gap-1.5 font-bold" onClick={() => onNavigate("department-register")}>
          <Plus className="h-3.5 w-3.5" />
          신규 진료과목 등록
        </Button>
      </div>
      <DepartmentEditModal department={editTarget} onClose={() => setEditTarget(null)} />
    </div>
  );
}

function DepartmentEditModal({ department, onClose }: { department: Department | null; onClose: () => void }) {
  const { setDepartments, logActivity } = useHospitalAdmin();
  const [form, setForm] = useState<Department | null>(department);
  useEffect(() => {
    setForm(department);
  }, [department]);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setDepartments((prev) => prev.map((d) => (d.id === form.id ? form : d)));
    toast.success("진료과목 정보가 수정되었습니다.");
    logActivity("진료과목 수정", form.name);
    onClose();
  };

  return (
    <Modal open={!!department} onClose={onClose} title="진료과목 수정">
      {form && (
        <form onSubmit={handleSave} className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-muted-foreground">진료과목명</label>
            <Input className="mt-1.5" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">담당 의료진</label>
            <Input className="mt-1.5" value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-muted-foreground">소개</label>
            <Input className="mt-1.5" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" className="gap-1.5 font-bold">저장</Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export function DepartmentRegisterView({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { setDepartments, logActivity } = useHospitalAdmin();
  const [form, setForm] = useState(EMPTY_DEPARTMENT_FORM);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.doctor.trim()) {
      toast.error("진료과목명과 담당 의료진을 입력해 주세요.");
      return;
    }
    setDepartments((prev) => [{ id: Date.now(), ...form, status: "공개", icon: "🩺" }, ...prev]);
    toast.success("진료과목이 등록되었습니다.");
    logActivity("진료과목 등록", form.name);
    setForm(EMPTY_DEPARTMENT_FORM);
    onNavigate("department-list");
  };

  return (
    <div>
      <PanelHeader title="진료과목 등록" description="새 진료과목의 기본 정보를 입력합니다." />
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-muted-foreground">진료과목명</label>
          <Input className="mt-1.5" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="예: 내과" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">담당 의료진</label>
          <Input className="mt-1.5" value={form.doctor} onChange={(e) => setForm((f) => ({ ...f, doctor: e.target.value }))} placeholder="예: 김진료 원장" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">소개</label>
          <Input className="mt-1.5" value={form.desc} onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" className="gap-1.5 font-bold">
            <Plus className="h-3.5 w-3.5" />
            진료과목 등록하기
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

export function ReservationView() {
  const { inquiries, setInquiries, logActivity } = useHospitalAdmin();
  return (
    <div>
      <PanelHeader title="예약 문의 관리" description="고객이 남긴 예약 문의를 관리합니다. 상태 배지를 클릭하면 변경됩니다." />
      <div className="space-y-2">
        {inquiries.length === 0 && <EmptyResult message="접수된 문의가 없습니다." />}
        {inquiries.map((i) => (
          <Row key={i.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {i.name} <span className="font-normal text-muted-foreground">· {i.phone} · {i.department}</span>
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground break-keep">{i.content}</p>
            </div>
            <StatusBadge
              label={i.status}
              tone={i.status === "완료" ? "success" : i.status === "상담중" ? "warning" : "info"}
              onClick={() => {
                setInquiries((prev) => prev.map((p) => (p.id === i.id ? { ...p, status: cycleStatus(p.status) } : p)));
                logActivity("예약 문의 상태 변경", i.name);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function NonCoveredView() {
  const { nonCovered, setNonCovered, logActivity } = useHospitalAdmin();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const addItem = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price.trim()) return;
    setNonCovered((prev) => [{ id: Date.now(), name: name.trim(), price: price.trim(), published: true }, ...prev]);
    toast.success("비급여 항목이 등록되었습니다.");
    logActivity("비급여 항목 등록", name.trim());
    setName("");
    setPrice("");
  };

  return (
    <div>
      <PanelHeader title="비급여 안내" description="홈페이지에 노출되는 비급여 진료 항목과 가격을 관리합니다." />
      <form onSubmit={addItem} className="flex gap-2">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="항목명" className="flex-1" />
        <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="가격" className="w-32" />
        <Button type="submit" size="sm" className="shrink-0 gap-1.5 font-bold">
          <Plus className="h-3.5 w-3.5" />
          등록
        </Button>
      </form>
      <div className="mt-4 space-y-2">
        {nonCovered.map((item) => (
          <Row key={item.id}>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.price}</p>
            </div>
            <StatusBadge
              label={item.published ? "게시중" : "비공개"}
              tone={item.published ? "success" : "neutral"}
              onClick={() => {
                setNonCovered((prev) => prev.map((p) => (p.id === item.id ? { ...p, published: !p.published } : p)));
                logActivity(item.published ? "비급여 비공개 전환" : "비급여 게시", item.name);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function StaffView() {
  const { staff, setStaff, logActivity } = useHospitalAdmin();
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
