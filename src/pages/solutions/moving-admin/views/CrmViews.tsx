import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Search, Plus, Trash2, Pencil, Star, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMovingAdmin } from "../store";
import { REGIONS } from "../mockData";
import { EMPTY_CASE_FORM } from "../types";
import {
  PanelHeader,
  StatusBadge,
  Modal,
  Row,
  EmptyResult,
  DemoNote,
} from "@/pages/solutions/real-estate-admin/components";
import type { Case } from "../types";

export function CaseListView({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { cases, setCases, deleteCase, logActivity } = useMovingAdmin();
  const [query, setQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("전체");
  const [editTarget, setEditTarget] = useState<Case | null>(null);

  const filtered = cases.filter((c) => {
    const matchesRegion = regionFilter === "전체" || c.region === regionFilter;
    const matchesQuery = query.trim() === "" || c.name.includes(query);
    return matchesRegion && matchesQuery;
  });

  return (
    <div>
      <PanelHeader title="작업 사례 목록" description="완료된 이사·청소 작업 사례를 관리합니다." />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="작업명 검색" className="pl-9" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["전체", ...REGIONS].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegionFilter(r)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                regionFilter === r ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {filtered.length === 0 && <EmptyResult message="조건에 맞는 작업 사례가 없습니다." />}
        {filtered.map((c) => (
          <Row key={c.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                <span className="mr-1.5">{c.icon}</span>
                {c.name}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{c.region} · {c.price}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <StatusBadge
                label={c.status}
                tone={c.status === "공개" ? "success" : "neutral"}
                onClick={() => {
                  setCases((prev) => prev.map((p) => (p.id === c.id ? { ...p, status: p.status === "공개" ? "비공개" : "공개" } : p)));
                  logActivity("작업 사례 공개상태 변경", c.name);
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
          신규 작업 사례 등록
        </Button>
      </div>
      <CaseEditModal caseItem={editTarget} onClose={() => setEditTarget(null)} />
    </div>
  );
}

function CaseEditModal({ caseItem, onClose }: { caseItem: Case | null; onClose: () => void }) {
  const { setCases, logActivity } = useMovingAdmin();
  const [form, setForm] = useState<Case | null>(caseItem);
  useEffect(() => {
    setForm(caseItem);
  }, [caseItem]);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setCases((prev) => prev.map((c) => (c.id === form.id ? form : c)));
    toast.success("작업 사례 정보가 수정되었습니다.");
    logActivity("작업 사례 수정", form.name);
    onClose();
  };

  return (
    <Modal open={!!caseItem} onClose={onClose} title="작업 사례 수정">
      {form && (
        <form onSubmit={handleSave} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-muted-foreground">작업명</label>
            <Input className="mt-1.5" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">지역</label>
            <Input className="mt-1.5" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">비용</label>
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
  const { setCases, logActivity } = useMovingAdmin();
  const [form, setForm] = useState(EMPTY_CASE_FORM);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price.trim()) {
      toast.error("모든 항목을 입력해 주세요.");
      return;
    }
    setCases((prev) => [{ id: Date.now(), ...form, status: "공개", icon: "📦" }, ...prev]);
    toast.success("작업 사례가 등록되었습니다.");
    logActivity("작업 사례 등록", form.name);
    setForm(EMPTY_CASE_FORM);
    onNavigate("case-list");
  };

  return (
    <div>
      <PanelHeader title="작업 사례 등록" description="새 작업 사례의 기본 정보를 입력합니다." />
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">작업명</label>
          <Input className="mt-1.5" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="예: 강남구 30평대 포장이사" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">지역</label>
          <Select value={form.region} onValueChange={(v) => setForm((f) => ({ ...f, region: v }))}>
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((r) => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">비용</label>
          <Input className="mt-1.5" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} placeholder="예: 120만원" />
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" className="gap-1.5 font-bold">
            <Plus className="h-3.5 w-3.5" />
            작업 사례 등록하기
          </Button>
        </div>
      </form>
    </div>
  );
}

export function ServiceView() {
  const { services, setServices, logActivity } = useMovingAdmin();
  return (
    <div>
      <PanelHeader title="서비스 관리" description="제공하는 서비스 종류와 기본 안내 가격을 관리합니다." />
      <div className="space-y-2">
        {services.map((s) => (
          <Row key={s.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{s.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground break-keep">{s.desc}</p>
              <p className="mt-0.5 text-xs font-medium text-foreground">{s.basePrice}</p>
            </div>
            <StatusBadge
              label={s.published ? "게시중" : "비공개"}
              tone={s.published ? "success" : "neutral"}
              onClick={() => {
                setServices((prev) => prev.map((p) => (p.id === s.id ? { ...p, published: !p.published } : p)));
                logActivity(s.published ? "서비스 비공개 전환" : "서비스 게시", s.name);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function RegionView() {
  const { regions, setRegions, logActivity } = useMovingAdmin();
  const [draft, setDraft] = useState("");

  const addRegion = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setRegions((prev) => [{ id: Date.now(), name: draft.trim(), published: true }, ...prev]);
    toast.success("서비스 지역이 등록되었습니다.");
    logActivity("서비스 지역 등록", draft.trim());
    setDraft("");
  };

  return (
    <div>
      <PanelHeader title="서비스 지역 관리" description="홈페이지에 노출되는 서비스 가능 지역을 관리합니다." />
      <form onSubmit={addRegion} className="flex gap-2">
        <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="예: 서울 전지역" className="flex-1" />
        <Button type="submit" size="sm" className="shrink-0 gap-1.5 font-bold">
          <Plus className="h-3.5 w-3.5" />
          등록
        </Button>
      </form>
      <div className="mt-4 space-y-2">
        {regions.map((r) => (
          <Row key={r.id}>
            <p className="truncate text-sm font-medium text-foreground">{r.name}</p>
            <StatusBadge
              label={r.published ? "게시중" : "비공개"}
              tone={r.published ? "success" : "neutral"}
              onClick={() => {
                setRegions((prev) => prev.map((x) => (x.id === r.id ? { ...x, published: !x.published } : x)));
                logActivity(r.published ? "지역 비공개 전환" : "지역 게시", r.name);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function ReviewView() {
  const { reviews, setReviews, logActivity } = useMovingAdmin();
  return (
    <div>
      <PanelHeader title="후기 관리" description="고객 후기의 홈페이지 게시 여부를 관리합니다." />
      <div className="space-y-2">
        {reviews.map((r) => (
          <Row key={r.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {r.customerName} <span className="font-normal text-muted-foreground">· {r.serviceType} · {r.date}</span>
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

export function ClaimView() {
  const { claims, setClaims, logActivity } = useMovingAdmin();
  const STATUSES = ["접수", "처리중", "완료"] as const;
  return (
    <div>
      <PanelHeader title="클레임/A·S 관리" description="작업 후 접수된 클레임과 A/S 요청을 관리합니다." />
      <div className="space-y-2">
        {claims.length === 0 && <EmptyResult message="접수된 클레임이 없습니다." />}
        {claims.map((c) => (
          <Row key={c.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {c.customerName} <span className="font-normal text-muted-foreground">· 담당 {c.assignee} · 접수일 {c.requestDate}</span>
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground break-keep">{c.content}</p>
            </div>
            <StatusBadge
              label={c.status}
              tone={c.status === "완료" ? "success" : c.status === "처리중" ? "warning" : "info"}
              onClick={() => {
                const next = STATUSES[(STATUSES.indexOf(c.status) + 1) % STATUSES.length];
                setClaims((prev) => prev.map((p) => (p.id === c.id ? { ...p, status: next } : p)));
                logActivity("클레임 상태 변경", `${c.customerName} → ${next}`);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function StaffView() {
  const { staff, setStaff, logActivity } = useMovingAdmin();
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

const PERMISSION_CATEGORIES = ["견적 관리", "예약 관리", "결제 관리", "작업팀/차량 관리", "홈페이지 설정"];

export function PermissionView() {
  const { staff } = useMovingAdmin();
  const [grants, setGrants] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    staff.forEach((s) => {
      PERMISSION_CATEGORIES.forEach((c) => {
        init[`${s.id}:${c}`] = s.role === "관리자" || c === "예약 관리";
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
  const { siteSettings, setSiteSettings, logActivity } = useMovingAdmin();

  const save = () => {
    toast.success("홈페이지 설정이 저장되었습니다.");
    logActivity("홈페이지 설정 저장", siteSettings.companyName);
  };

  return (
    <div>
      <PanelHeader title="홈페이지 설정" description="고객 홈페이지에 표시되는 기본 정보와 노출 항목을 관리합니다. 저장하지 않아도 값을 바꾸면 고객 홈페이지에 바로 반영됩니다." />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">업체명</label>
            <Input className="mt-1.5" value={siteSettings.companyName} onChange={(e) => setSiteSettings((f) => ({ ...f, companyName: e.target.value }))} />
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
            <label className="text-xs font-medium text-muted-foreground">운영시간</label>
            <Input className="mt-1.5" value={siteSettings.hours} onChange={(e) => setSiteSettings((f) => ({ ...f, hours: e.target.value }))} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-2.5">
            <span className="text-xs font-medium text-foreground">서비스 안내 노출</span>
            <Switch checked={siteSettings.showServices} onCheckedChange={(v) => setSiteSettings((f) => ({ ...f, showServices: v }))} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-2.5">
            <span className="text-xs font-medium text-foreground">작업 사례 노출</span>
            <Switch checked={siteSettings.showCases} onCheckedChange={(v) => setSiteSettings((f) => ({ ...f, showCases: v }))} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-2.5">
            <span className="text-xs font-medium text-foreground">서비스 지역 노출</span>
            <Switch checked={siteSettings.showRegions} onCheckedChange={(v) => setSiteSettings((f) => ({ ...f, showRegions: v }))} />
          </div>
          <Button size="sm" className="font-bold" onClick={save}>저장하기</Button>
        </div>

        <div className="rounded-xl border border-border bg-secondary/20 p-5">
          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">미리보기</p>
          <div className="mt-3 overflow-hidden rounded-lg border border-border bg-background">
            <div className="bg-primary/90 px-4 py-6 text-center text-primary-foreground">
              <p className="text-xs opacity-80">{siteSettings.companyName}</p>
              <p className="mt-2 text-lg font-bold">{siteSettings.tagline}</p>
              <p className="mt-1 text-xs opacity-90">{siteSettings.hours}</p>
            </div>
            <div className="space-y-1 p-4 text-xs text-muted-foreground">
              <p>{siteSettings.showServices ? "✓ 서비스 섹션 노출" : "✗ 서비스 섹션 숨김"}</p>
              <p>{siteSettings.showCases ? "✓ 작업 사례 섹션 노출" : "✗ 작업 사례 섹션 숨김"}</p>
              <p>{siteSettings.showRegions ? "✓ 서비스 지역 섹션 노출" : "✗ 서비스 지역 섹션 숨김"}</p>
              <p>{siteSettings.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ActivityLogView() {
  const { activityLog } = useMovingAdmin();
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
