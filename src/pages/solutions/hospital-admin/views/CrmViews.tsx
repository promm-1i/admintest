import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Search, Plus, Star, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useHospitalAdmin } from "../store";
import {
  PanelHeader,
  StatusBadge,
  Modal,
  Row,
  EmptyResult,
  DemoNote,
} from "@/pages/solutions/real-estate-admin/components";
import type { Customer, Consult } from "../types";

export function CustomerView() {
  const { customers } = useHospitalAdmin();
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState<Customer | null>(null);

  const filtered = customers.filter((c) => query.trim() === "" || c.name.includes(query) || c.phone.includes(query));

  return (
    <div>
      <PanelHeader title="고객 관리" description="문의부터 예약, 진료까지 고객별 활동 이력을 확인합니다." />
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="이름 · 연락처 검색" className="pl-9" />
      </div>
      <div className="mt-4 space-y-2">
        {filtered.length === 0 && <EmptyResult message="조건에 맞는 고객이 없습니다." />}
        {filtered.map((c) => (
          <Row key={c.id} onClick={() => setDetail(c)}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {c.name} <span className="font-normal text-muted-foreground">· {c.phone} · 관심과목 {c.interestDepartment}</span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">최초 문의 {c.firstContactAt} · 최근 상담 {c.lastConsultAt}</p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">활동 {c.activities.length}건</span>
          </Row>
        ))}
      </div>
      <Modal open={!!detail} onClose={() => setDetail(null)} title={detail ? `${detail.name} 고객 이력` : ""}>
        {detail && (
          <div>
            <p className="text-xs text-muted-foreground">{detail.phone} · 관심과목 {detail.interestDepartment}</p>
            <div className="mt-4 space-y-3 border-l border-border pl-4">
              {detail.activities.map((a) => (
                <div key={a.id} className="relative">
                  <span className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-primary" />
                  <p className="text-xs font-medium text-foreground">{a.type} · {a.at}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground break-keep">{a.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function cycleConsultStatus(status: Consult["status"]) {
  if (status === "접수") return "상담중" as const;
  if (status === "상담중") return "완료" as const;
  return "접수" as const;
}

const CONSULT_CHANNELS = ["전체", "온라인", "전화", "예약문의"] as const;

export function ConsultView() {
  const { consults, setConsults, logActivity } = useHospitalAdmin();
  const [channel, setChannel] = useState<(typeof CONSULT_CHANNELS)[number]>("전체");

  const filtered = consults.filter((c) => channel === "전체" || c.channel === channel);

  return (
    <div>
      <PanelHeader title="상담 문의 관리" description="채널별로 접수된 상담 문의를 관리합니다. 상태 배지를 클릭하면 변경됩니다." />
      <div className="flex flex-wrap gap-1.5">
        {CONSULT_CHANNELS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setChannel(c)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              channel === c ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:bg-secondary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {filtered.length === 0 && <EmptyResult message="조건에 맞는 상담 문의가 없습니다." />}
        {filtered.map((c) => (
          <Row key={c.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {c.name} <span className="font-normal text-muted-foreground">· {c.phone} · {c.channel} · 담당 {c.assignee}</span>
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground break-keep">{c.content}</p>
            </div>
            <StatusBadge
              label={c.status}
              tone={c.status === "완료" ? "success" : c.status === "상담중" ? "warning" : "info"}
              onClick={() => {
                setConsults((prev) => prev.map((p) => (p.id === c.id ? { ...p, status: cycleConsultStatus(p.status) } : p)));
                logActivity("상담 문의 상태 변경", c.name);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function ReviewView() {
  const { reviews, setReviews, logActivity } = useHospitalAdmin();
  return (
    <div>
      <PanelHeader title="후기 관리" description="고객 후기의 홈페이지 게시 여부를 관리합니다." />
      <div className="space-y-2">
        {reviews.map((r) => (
          <Row key={r.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {r.customerName} <span className="font-normal text-muted-foreground">· {r.department} · {r.date}</span>
              </p>
              <p className="mt-0.5 flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground break-keep">{r.content}</p>
            </div>
            <StatusBadge
              label={r.published ? "게시중" : "비공개"}
              tone={r.published ? "success" : "neutral"}
              onClick={() => {
                setReviews((prev) => prev.map((p) => (p.id === r.id ? { ...p, published: !p.published } : p)));
                logActivity(r.published ? "후기 비공개 전환" : "후기 게시", r.customerName);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function NoticeView() {
  const { notices, setNotices, logActivity } = useHospitalAdmin();
  const [title, setTitle] = useState("");

  const addNotice = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setNotices((prev) => [{ id: Date.now(), title: title.trim(), published: true }, ...prev]);
    toast.success("공지사항이 등록되었습니다.");
    logActivity("공지사항 등록", title.trim());
    setTitle("");
  };

  return (
    <div>
      <PanelHeader title="공지사항" description="홈페이지에 노출되는 공지사항을 관리합니다." />
      <form onSubmit={addNotice} className="flex gap-2">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="공지 제목" className="flex-1" />
        <Button type="submit" size="sm" className="shrink-0 gap-1.5 font-bold">
          <Plus className="h-3.5 w-3.5" />
          등록
        </Button>
      </form>
      <div className="mt-4 space-y-2">
        {notices.length === 0 && <EmptyResult message="등록된 공지사항이 없습니다." />}
        {notices.map((n) => (
          <Row key={n.id}>
            <p className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">{n.title}</p>
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

export function BannerView() {
  const { banners, setBanners, logActivity } = useHospitalAdmin();
  const [title, setTitle] = useState("");

  const addBanner = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setBanners((prev) => [...prev, { id: Date.now(), title: title.trim(), icon: "📌", active: true, order: prev.length + 1 }]);
    toast.success("배너가 등록되었습니다.");
    logActivity("배너 등록", title.trim());
    setTitle("");
  };

  return (
    <div>
      <PanelHeader title="배너 관리" description="홈페이지 상단에 노출되는 배너·팝업을 관리합니다." />
      <form onSubmit={addBanner} className="flex gap-2">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="배너 문구" className="flex-1" />
        <Button type="submit" size="sm" className="shrink-0 gap-1.5 font-bold">
          <Plus className="h-3.5 w-3.5" />
          등록
        </Button>
      </form>
      <div className="mt-4 space-y-2">
        {banners
          .sort((a, b) => a.order - b.order)
          .map((b) => (
            <Row key={b.id}>
              <p className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
                <span className="mr-1.5">{b.icon}</span>
                {b.title}
              </p>
              <StatusBadge
                label={b.active ? "노출중" : "숨김"}
                tone={b.active ? "success" : "neutral"}
                onClick={() => {
                  setBanners((prev) => prev.map((p) => (p.id === b.id ? { ...p, active: !p.active } : p)));
                  logActivity(b.active ? "배너 숨김" : "배너 노출", b.title);
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
      <PanelHeader title="직원 목록" description="관리자 · 직원 계정과 재직 상태를 관리합니다." />
      <div className="space-y-2">
        {staff.map((s) => (
          <Row key={s.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{s.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.position} · {s.phone}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <StatusBadge
                label={s.status}
                tone={s.status === "재직" ? "success" : "neutral"}
                onClick={() => {
                  setStaff((prev) => prev.map((p) => (p.id === s.id ? { ...p, status: p.status === "재직" ? "비활성" : "재직" } : p)));
                  logActivity("재직 상태 변경", s.name);
                }}
              />
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
            </div>
          </Row>
        ))}
      </div>
    </div>
  );
}

const PERMISSION_CATEGORIES = ["예약 관리", "고객 관리", "비급여 관리", "후기 관리", "홈페이지 설정"];

export function PermissionView() {
  const { staff } = useHospitalAdmin();
  const [grants, setGrants] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    staff.forEach((s) => {
      PERMISSION_CATEGORIES.forEach((c) => {
        init[`${s.id}:${c}`] = s.role === "관리자" || c === "예약 관리" || c === "고객 관리";
      });
    });
    return init;
  });

  const toggle = (staffId: number, category: string) => {
    setGrants((prev) => ({ ...prev, [`${staffId}:${category}`]: !prev[`${staffId}:${category}`] }));
  };

  return (
    <div>
      <PanelHeader title="권한 설정" description="직원별로 접근 가능한 관리 기능을 매트릭스로 관리합니다." />
      <DemoNote>
        <Info className="h-3 w-3" />
        데모 화면 — 실제 접근 제어에는 반영되지 않는 시연용 매트릭스입니다
      </DemoNote>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[560px] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              <th className="px-3 py-2.5 font-medium text-foreground">직원</th>
              {PERMISSION_CATEGORIES.map((c) => (
                <th key={c} className="px-3 py-2.5 text-center font-medium text-foreground">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => (
              <tr key={s.id} className="border-b border-border/60 last:border-b-0">
                <td className="px-3 py-2.5 font-medium text-foreground">{s.name} <span className="font-normal text-muted-foreground">· {s.role}</span></td>
                {PERMISSION_CATEGORIES.map((c) => (
                  <td key={c} className="px-3 py-2.5 text-center">
                    <Switch checked={!!grants[`${s.id}:${c}`]} onCheckedChange={() => toggle(s.id, c)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SettingsView() {
  const { siteSettings, setSiteSettings, logActivity } = useHospitalAdmin();

  const save = () => {
    toast.success("홈페이지 설정이 저장되었습니다.");
    logActivity("홈페이지 설정 저장", siteSettings.hospitalName);
  };

  return (
    <div>
      <PanelHeader title="홈페이지 설정" description="고객 홈페이지에 표시되는 기본 정보와 노출 항목을 관리합니다. 저장하지 않아도 값을 바꾸면 고객 홈페이지에 바로 반영됩니다." />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">병원명</label>
            <Input className="mt-1.5" value={siteSettings.hospitalName} onChange={(e) => setSiteSettings((f) => ({ ...f, hospitalName: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">슬로건</label>
            <Input className="mt-1.5" value={siteSettings.tagline} onChange={(e) => setSiteSettings((f) => ({ ...f, tagline: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">대표 전화</label>
            <Input className="mt-1.5" value={siteSettings.phone} onChange={(e) => setSiteSettings((f) => ({ ...f, phone: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">주소</label>
            <Input className="mt-1.5" value={siteSettings.address} onChange={(e) => setSiteSettings((f) => ({ ...f, address: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">진료시간</label>
            <Input className="mt-1.5" value={siteSettings.hours} onChange={(e) => setSiteSettings((f) => ({ ...f, hours: e.target.value }))} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-2.5">
            <span className="text-xs font-medium text-foreground">의료진 소개 노출</span>
            <Switch checked={siteSettings.showDoctors} onCheckedChange={(v) => setSiteSettings((f) => ({ ...f, showDoctors: v }))} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-2.5">
            <span className="text-xs font-medium text-foreground">진료과목 노출</span>
            <Switch checked={siteSettings.showDepartments} onCheckedChange={(v) => setSiteSettings((f) => ({ ...f, showDepartments: v }))} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-2.5">
            <span className="text-xs font-medium text-foreground">예약 문의 버튼 노출</span>
            <Switch checked={siteSettings.showReserveButton} onCheckedChange={(v) => setSiteSettings((f) => ({ ...f, showReserveButton: v }))} />
          </div>
          <Button size="sm" className="font-bold" onClick={save}>저장하기</Button>
        </div>

        <div className="rounded-xl border border-border bg-secondary/20 p-5">
          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">미리보기</p>
          <div className="mt-3 overflow-hidden rounded-lg border border-border bg-background">
            <div className="bg-primary/90 px-4 py-6 text-center text-primary-foreground">
              <p className="text-xs opacity-80">{siteSettings.hospitalName}</p>
              <p className="mt-2 text-lg font-bold">{siteSettings.tagline}</p>
              <p className="mt-1 text-xs opacity-90">{siteSettings.hours}</p>
              {siteSettings.showReserveButton && (
                <span className="mt-3 inline-block rounded-full bg-background px-4 py-1.5 text-xs font-bold text-foreground">예약 문의하기</span>
              )}
            </div>
            <div className="space-y-1 p-4 text-xs text-muted-foreground">
              <p>{siteSettings.showDepartments ? "✓ 진료과목 섹션 노출" : "✗ 진료과목 섹션 숨김"}</p>
              <p>{siteSettings.showDoctors ? "✓ 의료진 섹션 노출" : "✗ 의료진 섹션 숨김"}</p>
              <p>{siteSettings.address}</p>
              <p>{siteSettings.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ActivityLogView() {
  const { activityLog } = useHospitalAdmin();
  return (
    <div>
      <PanelHeader title="활동 로그" description="관리자 화면에서 발생한 모든 변경 이력입니다." />
      <div className="space-y-2">
        {activityLog.length === 0 && <EmptyResult message="아직 활동 내역이 없습니다." />}
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
