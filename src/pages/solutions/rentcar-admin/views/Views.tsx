import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Search, Plus, Trash2, Pencil, Car as CarIcon, MessageSquare, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useRentcarAdmin } from "../store";
import { VEHICLE_TYPES } from "../mockData";
import { EMPTY_VEHICLE_FORM } from "../types";
import {
  PanelHeader,
  StatusBadge,
  StatCard,
  Modal,
  Row,
  EmptyResult,
} from "@/pages/solutions/real-estate-admin/components";
import type { Vehicle, RentalInquiry } from "../types";

export function DashboardView() {
  const { vehicles, inquiries, activityLog } = useRentcarAdmin();
  const stats = [
    { label: "전체 차량", value: vehicles.length, icon: CarIcon },
    { label: "공개 차량", value: vehicles.filter((v) => v.status === "공개").length, icon: CarIcon },
    { label: "렌트 문의", value: inquiries.filter((i) => i.type === "문의").length, icon: MessageSquare },
    { label: "예약 접수", value: inquiries.filter((i) => i.type === "예약").length, icon: CalendarCheck },
  ];

  return (
    <div>
      <PanelHeader
        title="대시보드"
        description="차량·문의·예약 현황을 한눈에 확인합니다. 아래 숫자는 이 데모에서 실제로 조작한 데이터를 기준으로 계산됩니다."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
        ))}
      </div>

      <h3 className="mt-8 text-sm font-semibold text-foreground">최근 작업 내역</h3>
      <div className="mt-3 space-y-2">
        {activityLog.length === 0 && (
          <p className="rounded-lg border border-dashed border-border bg-secondary/30 p-6 text-center text-xs text-muted-foreground break-keep">
            아직 작업 내역이 없습니다. 왼쪽 메뉴에서 차량을 등록하거나 상태를 변경해보면 여기에
            기록됩니다.
          </p>
        )}
        {activityLog.map((log) => (
          <div
            key={log.id}
            className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 px-3 py-2 text-xs"
          >
            <span className="shrink-0 text-muted-foreground">{log.time}</span>
            <span className="shrink-0 font-medium text-foreground">{log.action}</span>
            <span className="min-w-0 flex-1 truncate text-muted-foreground">{log.target}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function VehicleListView({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { vehicles, setVehicles, deleteVehicle, logActivity } = useRentcarAdmin();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("전체");
  const [editTarget, setEditTarget] = useState<Vehicle | null>(null);

  const filtered = vehicles.filter((v) => {
    const matchesType = typeFilter === "전체" || v.type === typeFilter;
    const matchesQuery = query.trim() === "" || v.name.includes(query) || v.location.includes(query);
    return matchesType && matchesQuery;
  });

  return (
    <div>
      <PanelHeader title="차량 목록" description="등록된 차량을 검색·관리합니다." />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="차량명 · 지점 검색" className="pl-9" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["전체", ...VEHICLE_TYPES].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                typeFilter === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="py-2 pr-3 font-medium">차량명</th>
              <th className="py-2 pr-3 font-medium">구분</th>
              <th className="py-2 pr-3 font-medium">지점</th>
              <th className="py-2 pr-3 font-medium">1일 요금</th>
              <th className="py-2 pr-3 font-medium">상태</th>
              <th className="py-2 pr-3 font-medium">관리</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v) => (
              <tr key={v.id} className="border-b border-border/60 hover:bg-secondary/30">
                <td className="py-2.5 pr-3 font-medium text-foreground">
                  <span className="mr-1.5">{v.image}</span>
                  {v.name}
                </td>
                <td className="py-2.5 pr-3 text-muted-foreground">{v.type} · {v.category}</td>
                <td className="py-2.5 pr-3 text-muted-foreground">{v.location}</td>
                <td className="py-2.5 pr-3 text-muted-foreground">{v.dailyPrice.toLocaleString("ko-KR")}원</td>
                <td className="py-2.5 pr-3">
                  <StatusBadge
                    label={v.status}
                    tone={v.status === "공개" ? "success" : "neutral"}
                    onClick={() => {
                      setVehicles((prev) => prev.map((p) => (p.id === v.id ? { ...p, status: p.status === "공개" ? "비공개" : "공개" } : p)));
                      logActivity("차량 공개상태 변경", v.name);
                    }}
                  />
                </td>
                <td className="py-2.5 pr-3">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setEditTarget(v)}
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      aria-label={`${v.name} 수정`}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteVehicle(v.id)}
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      aria-label={`${v.name} 삭제`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <EmptyResult message="조건에 맞는 차량이 없습니다." />}
      </div>

      <div className="mt-4">
        <Button size="sm" className="gap-1.5 font-bold" onClick={() => onNavigate("vehicle-register")}>
          <Plus className="h-3.5 w-3.5" />
          신규 차량 등록
        </Button>
      </div>

      <VehicleEditModal vehicle={editTarget} onClose={() => setEditTarget(null)} />
    </div>
  );
}

function VehicleEditModal({ vehicle, onClose }: { vehicle: Vehicle | null; onClose: () => void }) {
  const { setVehicles, logActivity } = useRentcarAdmin();
  const [form, setForm] = useState<Vehicle | null>(vehicle);
  if (vehicle && form?.id !== vehicle.id) setForm(vehicle);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setVehicles((prev) => prev.map((v) => (v.id === form.id ? form : v)));
    toast.success("차량 정보가 수정되었습니다.");
    logActivity("차량 수정", form.name);
    onClose();
  };

  return (
    <Modal open={!!vehicle} onClose={onClose} title="차량 수정">
      {form && (
        <form onSubmit={handleSave} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-muted-foreground">차량명</label>
            <Input className="mt-1.5" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">지점</label>
            <Input className="mt-1.5" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">1일 요금</label>
            <Input
              type="number"
              className="mt-1.5"
              value={form.dailyPrice}
              onChange={(e) => setForm({ ...form, dailyPrice: Number(e.target.value) })}
            />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" className="gap-1.5 font-bold">
              저장
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export function VehicleRegisterView({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { setVehicles, logActivity } = useRentcarAdmin();
  const [form, setForm] = useState(EMPTY_VEHICLE_FORM);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("차량명을 입력해 주세요.");
      return;
    }
    setVehicles((prev) => [
      { id: Date.now(), ...form, status: "공개", image: "🚗" },
      ...prev,
    ]);
    toast.success("차량이 등록되었습니다.");
    logActivity("차량 등록", form.name);
    setForm(EMPTY_VEHICLE_FORM);
    onNavigate("vehicle-list");
  };

  return (
    <div>
      <PanelHeader title="차량 등록" description="새 차량의 기본 정보를 입력합니다." />
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">차량명</label>
          <Input className="mt-1.5" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="예: 아반떼" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">차량 구분</label>
          <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}>
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {VEHICLE_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">지점</label>
          <Input className="mt-1.5" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">1일 요금 (원)</label>
          <Input
            type="number"
            className="mt-1.5"
            value={form.dailyPrice}
            onChange={(e) => setForm((f) => ({ ...f, dailyPrice: Number(e.target.value) }))}
          />
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" className="gap-1.5 font-bold">
            <Plus className="h-3.5 w-3.5" />
            차량 등록하기
          </Button>
        </div>
      </form>
    </div>
  );
}

function cycleStatus(status: RentalInquiry["status"]): RentalInquiry["status"] {
  if (status === "접수") return "상담중";
  if (status === "상담중") return "완료";
  return "접수";
}

function InquiryList({ type, title, description }: { type: "문의" | "예약"; title: string; description: string }) {
  const { inquiries, setInquiries, logActivity } = useRentcarAdmin();
  const filtered = inquiries.filter((i) => i.type === type);

  return (
    <div>
      <PanelHeader title={title} description={description} />
      <div className="space-y-2">
        {filtered.length === 0 && <EmptyResult message="접수된 내역이 없습니다." />}
        {filtered.map((i) => (
          <Row key={i.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {i.name} <span className="font-normal text-muted-foreground">· {i.phone} · {i.vehicle}</span>
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground break-keep">{i.content}</p>
            </div>
            <StatusBadge
              label={i.status}
              tone={i.status === "완료" ? "success" : i.status === "상담중" ? "warning" : "info"}
              onClick={() => {
                setInquiries((prev) => prev.map((p) => (p.id === i.id ? { ...p, status: cycleStatus(p.status) } : p)));
                logActivity(`${type} 상태 변경`, i.name);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function InquiryView() {
  return <InquiryList type="문의" title="렌트 문의 관리" description="고객이 남긴 렌트 문의를 관리합니다. 상태 배지를 클릭하면 변경됩니다." />;
}

export function ReservationView() {
  return <InquiryList type="예약" title="예약 상담 접수" description="접수된 예약 상담을 관리합니다. 상태 배지를 클릭하면 변경됩니다." />;
}

export function NoticeView() {
  const { notices, setNotices, logActivity } = useRentcarAdmin();
  const [draft, setDraft] = useState("");

  const addNotice = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setNotices((prev) => [{ id: Date.now(), title: draft.trim(), published: true }, ...prev]);
    toast.success("공지사항이 등록되었습니다.");
    logActivity("공지 등록", draft.trim());
    setDraft("");
  };

  return (
    <div>
      <PanelHeader title="공지사항" description="홈페이지에 노출되는 공지사항을 관리합니다." />
      <form onSubmit={addNotice} className="flex gap-2">
        <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="새 공지사항 제목" className="flex-1" />
        <Button type="submit" size="sm" className="shrink-0 gap-1.5 font-bold">
          <Plus className="h-3.5 w-3.5" />
          등록
        </Button>
      </form>
      <div className="mt-4 space-y-2">
        {notices.map((n) => (
          <Row key={n.id}>
            <p className="truncate text-sm font-medium text-foreground">{n.title}</p>
            <StatusBadge
              label={n.published ? "게시중" : "비공개"}
              tone={n.published ? "success" : "neutral"}
              onClick={() => {
                setNotices((prev) => prev.map((p) => (p.id === n.id ? { ...p, published: !p.published } : p)));
                logActivity(n.published ? "공지 비공개 전환" : "공지 게시", n.title);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function StaffView() {
  const { staff, setStaff, logActivity } = useRentcarAdmin();
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

