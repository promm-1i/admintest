import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Search, Plus, Trash2, Pencil, Star, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useInteriorAdmin } from "../store";
import { AREAS } from "../mockData";
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

export function PartnerView() {
  const { partners } = useInteriorAdmin();
  const [query, setQuery] = useState("");
  const filtered = partners.filter((p) => query.trim() === "" || p.name.includes(query) || p.category.includes(query));

  return (
    <div>
      <PanelHeader title="협력업체 관리" description="공정별 협력업체 연락처와 평점을 관리합니다." />
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="업체명 · 공정 검색" className="pl-9" />
      </div>
      <div className="mt-4 space-y-2">
        {filtered.length === 0 && <EmptyResult message="조건에 맞는 협력업체가 없습니다." />}
        {filtered.map((p) => (
          <Row key={p.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {p.name} <span className="font-normal text-muted-foreground">· {p.category} · {p.contact} · {p.phone}</span>
              </p>
            </div>
            <p className="flex shrink-0 items-center gap-0.5 text-amber-500">
              {Array.from({ length: p.rating }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </p>
          </Row>
        ))}
      </div>
    </div>
  );
}

export function PaymentView() {
  const { payments, setPayments, logActivity } = useInteriorAdmin();
  const STATUSES = ["완납", "부분납부", "미납"] as const;
  return (
    <div>
      <PanelHeader title="결제 관리" description="프로젝트별 결제 현황을 관리합니다. 배지를 클릭하면 상태가 변경됩니다." />
      <div className="space-y-2">
        {payments.map((p) => (
          <Row key={p.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {p.customerName} <span className="font-normal text-muted-foreground">· {p.projectName}</span>
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

export function AsView() {
  const { asRequests, setAsRequests, logActivity } = useInteriorAdmin();
  const STATUSES = ["접수", "처리중", "완료"] as const;
  return (
    <div>
      <PanelHeader title="A/S 관리" description="시공 완료 후 접수된 A/S 요청을 관리합니다." />
      <div className="space-y-2">
        {asRequests.length === 0 && <EmptyResult message="접수된 A/S가 없습니다." />}
        {asRequests.map((a) => (
          <Row key={a.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {a.customerName} <span className="font-normal text-muted-foreground">· {a.projectName} · 담당 {a.assignee}</span>
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground break-keep">{a.content}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">접수일 {a.requestDate}</p>
            </div>
            <StatusBadge
              label={a.status}
              tone={a.status === "완료" ? "success" : a.status === "처리중" ? "warning" : "info"}
              onClick={() => {
                const next = STATUSES[(STATUSES.indexOf(a.status) + 1) % STATUSES.length];
                setAsRequests((prev) => prev.map((x) => (x.id === a.id ? { ...x, status: next } : x)));
                logActivity("A/S 상태 변경", `${a.customerName} → ${next}`);
              }}
            />
          </Row>
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

export function PackageView() {
  const { packages, setPackages, logActivity } = useInteriorAdmin();
  const [title, setTitle] = useState("");
  const [area, setArea] = useState(AREAS[0]);
  const [price, setPrice] = useState("");

  const addPackage = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price.trim()) return;
    setPackages((prev) => [{ id: Date.now(), title: title.trim(), area, price: price.trim(), published: true }, ...prev]);
    toast.success("패키지가 등록되었습니다.");
    logActivity("패키지 등록", title.trim());
    setTitle("");
    setPrice("");
  };

  return (
    <div>
      <PanelHeader title="평형별 패키지 관리" description="평형대별 시공 패키지와 가격을 관리합니다." />
      <form onSubmit={addPackage} className="flex flex-wrap gap-2">
        <Select value={area} onValueChange={setArea}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {AREAS.map((a) => (
              <SelectItem key={a} value={a}>{a}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="패키지명" className="min-w-40 flex-1" />
        <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="가격" className="w-36" />
        <Button type="submit" size="sm" className="shrink-0 gap-1.5 font-bold">
          <Plus className="h-3.5 w-3.5" />
          등록
        </Button>
      </form>
      <div className="mt-4 space-y-2">
        {packages.map((p) => (
          <Row key={p.id}>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{p.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{p.area} · {p.price}</p>
            </div>
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

const PERMISSION_CATEGORIES = ["견적/계약 관리", "프로젝트 관리", "결제 관리", "협력업체 관리", "홈페이지 설정"];

export function PermissionView() {
  const { staff } = useInteriorAdmin();
  const [grants, setGrants] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    staff.forEach((s) => {
      PERMISSION_CATEGORIES.forEach((c) => {
        init[`${s.id}:${c}`] = s.role === "관리자" || c === "프로젝트 관리";
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
  const { siteSettings, setSiteSettings, logActivity } = useInteriorAdmin();

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
            <span className="text-xs font-medium text-foreground">시공 사례 노출</span>
            <Switch checked={siteSettings.showCases} onCheckedChange={(v) => setSiteSettings((f) => ({ ...f, showCases: v }))} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-2.5">
            <span className="text-xs font-medium text-foreground">평형별 패키지 노출</span>
            <Switch checked={siteSettings.showPackages} onCheckedChange={(v) => setSiteSettings((f) => ({ ...f, showPackages: v }))} />
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
              <p>{siteSettings.showCases ? "✓ 시공 사례 섹션 노출" : "✗ 시공 사례 섹션 숨김"}</p>
              <p>{siteSettings.showPackages ? "✓ 패키지 섹션 노출" : "✗ 패키지 섹션 숨김"}</p>
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
  const { activityLog } = useInteriorAdmin();
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
