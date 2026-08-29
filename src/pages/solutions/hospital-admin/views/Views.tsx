import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Search, Plus, Trash2, Pencil, Stethoscope, Users, CalendarCheck, Star, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useHospitalAdmin } from "../store";
import { EMPTY_DEPARTMENT_FORM, EMPTY_DOCTOR_FORM } from "../types";
import {
  PanelHeader,
  StatusBadge,
  StatCard,
  Modal,
  Row,
  EmptyResult,
} from "@/pages/solutions/real-estate-admin/components";
import type { Department, Doctor, Reservation } from "../types";

export function DashboardView() {
  const { departments, doctors, reservations, consults, customers, reviews, activityLog } = useHospitalAdmin();
  const today = "2026-08-29";
  const stats = [
    { label: "전체 진료과목", value: departments.length, icon: Stethoscope },
    { label: "전체 의료진", value: doctors.length, icon: Users },
    { label: "오늘 예약", value: reservations.filter((r) => r.date === today).length, icon: CalendarCheck },
    { label: "상담 대기중", value: consults.filter((c) => c.status !== "완료").length, icon: MessageSquare },
    { label: "누적 고객", value: customers.length, icon: Users },
    { label: "게시된 후기", value: reviews.filter((r) => r.published).length, icon: Star },
  ];
  return (
    <div>
      <PanelHeader title="대시보드" description="진료과목·예약·상담·고객 현황을 한눈에 확인합니다. 아래 숫자는 이 데모에서 실제로 조작한 데이터를 기준으로 계산됩니다." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

export function DepartmentListView({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { departments, setDepartments, deleteDepartment, logActivity } = useHospitalAdmin();
  const [query, setQuery] = useState("");
  const [editTarget, setEditTarget] = useState<Department | null>(null);

  const filtered = departments
    .filter((d) => query.trim() === "" || d.name.includes(query))
    .sort((a, b) => a.order - b.order);

  return (
    <div>
      <PanelHeader title="진료과목 목록" description="진료과목의 노출 순서와 공개 여부를 관리합니다." />
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="진료과목 검색" className="pl-9" />
      </div>
      <div className="mt-4 space-y-2">
        {filtered.length === 0 && <EmptyResult message="조건에 맞는 진료과목이 없습니다." />}
        {filtered.map((d) => (
          <Row key={d.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                <span className="mr-1.5">{d.icon}</span>
                {d.name} <span className="font-normal text-muted-foreground">· 노출순서 {d.order}</span>
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
            <label className="text-xs font-medium text-muted-foreground">노출 순서</label>
            <Input type="number" className="mt-1.5" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
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
  const { departments, setDepartments, logActivity } = useHospitalAdmin();
  const [form, setForm] = useState(EMPTY_DEPARTMENT_FORM);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("진료과목명을 입력해 주세요.");
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
      <PanelHeader title="진료과목 등록" description={`새 진료과목의 기본 정보를 입력합니다. 현재 ${departments.length}개 진료과목이 등록되어 있습니다.`} />
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-muted-foreground">진료과목명</label>
          <Input className="mt-1.5" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="예: 내과" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">노출 순서</label>
          <Input type="number" className="mt-1.5" value={form.order} onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))} />
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

export function DoctorListView({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { doctors, deleteDoctor, setDoctors, logActivity } = useHospitalAdmin();
  const [query, setQuery] = useState("");
  const [editTarget, setEditTarget] = useState<Doctor | null>(null);

  const filtered = doctors.filter((d) => query.trim() === "" || d.name.includes(query) || d.department.includes(query));

  return (
    <div>
      <PanelHeader title="의료진 목록" description="의료진 정보와 홈페이지 노출 여부를 관리합니다." />
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="이름 · 진료과목 검색" className="pl-9" />
      </div>
      <div className="mt-4 space-y-2">
        {filtered.length === 0 && <EmptyResult message="조건에 맞는 의료진이 없습니다." />}
        {filtered.map((d) => (
          <Row key={d.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {d.name} <span className="font-normal text-muted-foreground">· {d.department} · {d.position}</span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground break-keep">{d.career} · 진료요일 {d.days}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <StatusBadge
                label={d.public ? "공개" : "비공개"}
                tone={d.public ? "success" : "neutral"}
                onClick={() => {
                  setDoctors((prev) => prev.map((p) => (p.id === d.id ? { ...p, public: !p.public } : p)));
                  logActivity("의료진 공개상태 변경", d.name);
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
                onClick={() => deleteDoctor(d.id)}
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
        <Button size="sm" className="gap-1.5 font-bold" onClick={() => onNavigate("doctor-register")}>
          <Plus className="h-3.5 w-3.5" />
          신규 의료진 등록
        </Button>
      </div>
      <DoctorEditModal doctor={editTarget} onClose={() => setEditTarget(null)} />
    </div>
  );
}

function DoctorEditModal({ doctor, onClose }: { doctor: Doctor | null; onClose: () => void }) {
  const { setDoctors, logActivity } = useHospitalAdmin();
  const [form, setForm] = useState<Doctor | null>(doctor);
  useEffect(() => {
    setForm(doctor);
  }, [doctor]);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setDoctors((prev) => prev.map((d) => (d.id === form.id ? form : d)));
    toast.success("의료진 정보가 수정되었습니다.");
    logActivity("의료진 수정", form.name);
    onClose();
  };

  return (
    <Modal open={!!doctor} onClose={onClose} title="의료진 수정">
      {form && (
        <form onSubmit={handleSave} className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-muted-foreground">이름</label>
            <Input className="mt-1.5" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">직급</label>
            <Input className="mt-1.5" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">진료과목</label>
            <Input className="mt-1.5" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">진료요일</label>
            <Input className="mt-1.5" value={form.days} onChange={(e) => setForm({ ...form, days: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-muted-foreground">경력</label>
            <Input className="mt-1.5" value={form.career} onChange={(e) => setForm({ ...form, career: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-muted-foreground">소개</label>
            <Input className="mt-1.5" value={form.profile} onChange={(e) => setForm({ ...form, profile: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" className="gap-1.5 font-bold">저장</Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export function DoctorRegisterView({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { departments, setDoctors, logActivity } = useHospitalAdmin();
  const [form, setForm] = useState(EMPTY_DOCTOR_FORM);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.department.trim()) {
      toast.error("이름과 진료과목을 입력해 주세요.");
      return;
    }
    setDoctors((prev) => [{ id: Date.now(), ...form, public: true }, ...prev]);
    toast.success("의료진이 등록되었습니다.");
    logActivity("의료진 등록", form.name);
    setForm(EMPTY_DOCTOR_FORM);
    onNavigate("doctor-list");
  };

  return (
    <div>
      <PanelHeader title="의료진 등록" description="새 의료진의 기본 정보를 입력합니다." />
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-muted-foreground">이름</label>
          <Input className="mt-1.5" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="예: 김진료" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">진료과목</label>
          <Select value={form.department} onValueChange={(v) => setForm((f) => ({ ...f, department: v }))}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="진료과목 선택" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((d) => (
                <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">직급</label>
          <Input className="mt-1.5" value={form.position} onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">진료요일</label>
          <Input className="mt-1.5" value={form.days} onChange={(e) => setForm((f) => ({ ...f, days: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">경력</label>
          <Input className="mt-1.5" value={form.career} onChange={(e) => setForm((f) => ({ ...f, career: e.target.value }))} placeholder="예: 10년차" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">소개</label>
          <Input className="mt-1.5" value={form.profile} onChange={(e) => setForm((f) => ({ ...f, profile: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" className="gap-1.5 font-bold">
            <Plus className="h-3.5 w-3.5" />
            의료진 등록하기
          </Button>
        </div>
      </form>
    </div>
  );
}

const RESERVATION_STATUSES: Reservation["status"][] = ["대기", "확정", "완료", "취소"];

export function ReservationListView() {
  const { reservations, setReservations, departments, logActivity } = useHospitalAdmin();
  const [deptFilter, setDeptFilter] = useState("전체");
  const [detail, setDetail] = useState<Reservation | null>(null);

  const filtered = reservations.filter((r) => deptFilter === "전체" || r.department === deptFilter);

  return (
    <div>
      <PanelHeader title="예약 목록" description="고객이 신청한 예약을 확인하고 상태를 변경합니다. 행을 클릭하면 상세 메모를 볼 수 있습니다." />
      <div className="flex flex-wrap gap-1.5">
        {["전체", ...departments.map((d) => d.name)].map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setDeptFilter(name)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              deptFilter === name ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:bg-secondary"
            }`}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {filtered.length === 0 && <EmptyResult message="조건에 맞는 예약이 없습니다." />}
        {filtered.map((r) => (
          <Row key={r.id}>
            <button type="button" onClick={() => setDetail(r)} className="min-w-0 flex-1 text-left">
              <p className="text-sm font-medium text-foreground">
                {r.customerName} <span className="font-normal text-muted-foreground">· {r.department} {r.doctor} · {r.date} {r.time}</span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground break-keep">{r.memo}</p>
            </button>
            <StatusBadge
              label={r.status}
              tone={r.status === "완료" ? "success" : r.status === "확정" ? "info" : r.status === "취소" ? "danger" : "warning"}
              onClick={() => {
                const next = RESERVATION_STATUSES[(RESERVATION_STATUSES.indexOf(r.status) + 1) % RESERVATION_STATUSES.length];
                setReservations((prev) => prev.map((p) => (p.id === r.id ? { ...p, status: next } : p)));
                logActivity("예약 상태 변경", `${r.customerName} → ${next}`);
              }}
            />
          </Row>
        ))}
      </div>
      <Modal open={!!detail} onClose={() => setDetail(null)} title="예약 상세">
        {detail && (
          <div className="space-y-2 text-sm">
            <p><span className="text-muted-foreground">고객명</span> · {detail.customerName}</p>
            <p><span className="text-muted-foreground">연락처</span> · {detail.phone}</p>
            <p><span className="text-muted-foreground">진료과목/의료진</span> · {detail.department} {detail.doctor}</p>
            <p><span className="text-muted-foreground">일시</span> · {detail.date} {detail.time}</p>
            <p className="break-keep"><span className="text-muted-foreground">메모</span> · {detail.memo}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export function ReservationCalendarView() {
  const { reservations } = useHospitalAdmin();
  const byDate = reservations.reduce<Record<string, Reservation[]>>((acc, r) => {
    (acc[r.date] ??= []).push(r);
    return acc;
  }, {});
  const dates = Object.keys(byDate).sort();

  return (
    <div>
      <PanelHeader title="진료 일정" description="날짜별 예약 현황을 달력 형태의 목록으로 확인합니다." />
      <div className="space-y-4">
        {dates.length === 0 && <EmptyResult message="등록된 예약이 없습니다." />}
        {dates.map((date) => (
          <div key={date} className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm font-semibold text-foreground">{date}</p>
            <div className="mt-2 space-y-1.5">
              {byDate[date]
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((r) => (
                  <div key={r.id} className="flex items-center gap-3 rounded-lg bg-secondary/30 px-3 py-2 text-xs">
                    <span className="shrink-0 font-medium text-foreground">{r.time}</span>
                    <span className="min-w-0 flex-1 truncate text-muted-foreground">{r.department} {r.doctor} · {r.customerName}</span>
                    <StatusBadge
                      label={r.status}
                      tone={r.status === "완료" ? "success" : r.status === "확정" ? "info" : r.status === "취소" ? "danger" : "warning"}
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

const NONCOVERED_CATEGORIES = ["검진", "예방접종", "피부", "치과", "안과", "재활", "미용"];

export function NonCoveredView() {
  const { nonCovered, setNonCovered, logActivity } = useHospitalAdmin();
  const [category, setCategory] = useState("검진");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const addItem = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price.trim()) return;
    setNonCovered((prev) => [{ id: Date.now(), category, name: name.trim(), price: price.trim(), desc: "", published: true }, ...prev]);
    toast.success("비급여 항목이 등록되었습니다.");
    logActivity("비급여 항목 등록", name.trim());
    setName("");
    setPrice("");
  };

  const grouped = NONCOVERED_CATEGORIES.map((c) => ({ category: c, items: nonCovered.filter((i) => i.category === c) })).filter((g) => g.items.length > 0);

  return (
    <div>
      <PanelHeader title="비급여 관리" description="홈페이지에 노출되는 비급여 진료 항목과 가격을 카테고리별로 관리합니다." />
      <form onSubmit={addItem} className="flex flex-wrap gap-2">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {NONCOVERED_CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="항목명" className="min-w-40 flex-1" />
        <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="가격" className="w-32" />
        <Button type="submit" size="sm" className="shrink-0 gap-1.5 font-bold">
          <Plus className="h-3.5 w-3.5" />
          등록
        </Button>
      </form>
      <div className="mt-5 space-y-5">
        {grouped.map((g) => (
          <div key={g.category}>
            <h4 className="text-xs font-semibold text-muted-foreground">{g.category}</h4>
            <div className="mt-2 space-y-2">
              {g.items.map((item) => (
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
        ))}
      </div>
    </div>
  );
}
