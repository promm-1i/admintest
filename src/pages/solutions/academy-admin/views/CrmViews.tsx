import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Search, Plus, Trash2, Pencil, Star, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAcademyAdmin } from "../store";
import { SUBJECTS } from "../mockData";
import { EMPTY_TEACHER_FORM } from "../types";
import {
  PanelHeader,
  StatusBadge,
  Modal,
  Row,
  EmptyResult,
  DemoNote,
} from "@/pages/solutions/real-estate-admin/components";
import type { Teacher } from "../types";

export function TeacherListView({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { teachers, deleteTeacher, setTeachers, logActivity } = useAcademyAdmin();
  const [query, setQuery] = useState("");
  const [editTarget, setEditTarget] = useState<Teacher | null>(null);
  const filtered = teachers.filter((t) => query.trim() === "" || t.name.includes(query) || t.subject.includes(query));

  return (
    <div>
      <PanelHeader title="강사 목록" description="강사 정보와 홈페이지 노출 여부를 관리합니다." />
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="이름 · 과목 검색" className="pl-9" />
      </div>
      <div className="mt-4 space-y-2">
        {filtered.length === 0 && <EmptyResult message="조건에 맞는 강사가 없습니다." />}
        {filtered.map((t) => (
          <Row key={t.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {t.name} <span className="font-normal text-muted-foreground">· {t.subject} · {t.career}</span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground break-keep">{t.intro} · 근무요일 {t.days}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <StatusBadge
                label={t.public ? "공개" : "비공개"}
                tone={t.public ? "success" : "neutral"}
                onClick={() => {
                  setTeachers((prev) => prev.map((p) => (p.id === t.id ? { ...p, public: !p.public } : p)));
                  logActivity("강사 공개상태 변경", t.name);
                }}
              />
              <button type="button" onClick={() => setEditTarget(t)} className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" aria-label={`${t.name} 수정`}>
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button type="button" onClick={() => deleteTeacher(t.id)} className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive" aria-label={`${t.name} 삭제`}>
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </Row>
        ))}
      </div>
      <div className="mt-4">
        <Button size="sm" className="gap-1.5 font-bold" onClick={() => onNavigate("teacher-register")}>
          <Plus className="h-3.5 w-3.5" />
          신규 강사 등록
        </Button>
      </div>
      <TeacherEditModal teacher={editTarget} onClose={() => setEditTarget(null)} />
    </div>
  );
}

function TeacherEditModal({ teacher, onClose }: { teacher: Teacher | null; onClose: () => void }) {
  const { setTeachers, logActivity } = useAcademyAdmin();
  const [form, setForm] = useState<Teacher | null>(teacher);
  useEffect(() => {
    setForm(teacher);
  }, [teacher]);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setTeachers((prev) => prev.map((t) => (t.id === form.id ? form : t)));
    toast.success("강사 정보가 수정되었습니다.");
    logActivity("강사 수정", form.name);
    onClose();
  };

  return (
    <Modal open={!!teacher} onClose={onClose} title="강사 수정">
      {form && (
        <form onSubmit={handleSave} className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-muted-foreground">이름</label>
            <Input className="mt-1.5" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">담당 과목</label>
            <Input className="mt-1.5" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">경력</label>
            <Input className="mt-1.5" value={form.career} onChange={(e) => setForm({ ...form, career: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">근무요일</label>
            <Input className="mt-1.5" value={form.days} onChange={(e) => setForm({ ...form, days: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-muted-foreground">소개</label>
            <Input className="mt-1.5" value={form.intro} onChange={(e) => setForm({ ...form, intro: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" className="gap-1.5 font-bold">저장</Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export function TeacherRegisterView({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { setTeachers, logActivity } = useAcademyAdmin();
  const [form, setForm] = useState(EMPTY_TEACHER_FORM);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("이름을 입력해 주세요.");
      return;
    }
    setTeachers((prev) => [{ id: Date.now(), ...form, public: true }, ...prev]);
    toast.success("강사가 등록되었습니다.");
    logActivity("강사 등록", form.name);
    setForm(EMPTY_TEACHER_FORM);
    onNavigate("teacher-list");
  };

  return (
    <div>
      <PanelHeader title="강사 등록" description="새 강사의 기본 정보를 입력합니다." />
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-muted-foreground">이름</label>
          <Input className="mt-1.5" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="예: 박강사" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">담당 과목</label>
          <Select value={form.subject} onValueChange={(v) => setForm((f) => ({ ...f, subject: v }))}>
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SUBJECTS.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">경력</label>
          <Input className="mt-1.5" value={form.career} onChange={(e) => setForm((f) => ({ ...f, career: e.target.value }))} placeholder="예: 5년차" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">근무요일</label>
          <Input className="mt-1.5" value={form.days} onChange={(e) => setForm((f) => ({ ...f, days: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">소개</label>
          <Input className="mt-1.5" value={form.intro} onChange={(e) => setForm((f) => ({ ...f, intro: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" className="gap-1.5 font-bold">
            <Plus className="h-3.5 w-3.5" />
            강사 등록하기
          </Button>
        </div>
      </form>
    </div>
  );
}

export function ReviewView() {
  const { reviews, setReviews, logActivity } = useAcademyAdmin();
  return (
    <div>
      <PanelHeader title="후기 관리" description="학부모·학생 후기의 홈페이지 게시 여부를 관리합니다." />
      <div className="space-y-2">
        {reviews.map((r) => (
          <Row key={r.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {r.studentName} <span className="font-normal text-muted-foreground">· {r.courseName} · {r.date}</span>
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
                logActivity(r.published ? "후기 비공개 전환" : "후기 게시", r.studentName);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function AchievementView() {
  const { achievements, setAchievements, logActivity } = useAcademyAdmin();
  return (
    <div>
      <PanelHeader title="합격/성과 관리" description="합격 사례와 성과를 관리합니다." />
      <div className="space-y-2">
        {achievements.map((a) => (
          <Row key={a.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {a.studentName} <span className="font-normal text-muted-foreground">· {a.school} · {a.year}</span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground break-keep">{a.memo}</p>
            </div>
            <StatusBadge
              label={a.published ? "게시중" : "비공개"}
              tone={a.published ? "success" : "neutral"}
              onClick={() => {
                setAchievements((prev) => prev.map((p) => (p.id === a.id ? { ...p, published: !p.published } : p)));
                logActivity(a.published ? "합격사례 비공개 전환" : "합격사례 게시", a.studentName);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function NoticeView() {
  const { notices, setNotices, logActivity } = useAcademyAdmin();
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

const MATERIAL_CATEGORIES = ["커리큘럼", "시간표", "학습자료", "입시정보"];

export function MaterialView() {
  const { materials, setMaterials, logActivity } = useAcademyAdmin();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(MATERIAL_CATEGORIES[0]);

  const addMaterial = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setMaterials((prev) => [{ id: Date.now(), title: title.trim(), category, uploadedAt: "2026-08-29", published: true }, ...prev]);
    toast.success("자료가 등록되었습니다.");
    logActivity("자료실 등록", title.trim());
    setTitle("");
  };

  return (
    <div>
      <PanelHeader title="자료실" description="학부모·학생에게 공개하는 학습 자료를 관리합니다." />
      <form onSubmit={addMaterial} className="flex flex-wrap gap-2">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MATERIAL_CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="자료 제목" className="min-w-40 flex-1" />
        <Button type="submit" size="sm" className="shrink-0 gap-1.5 font-bold">
          <Plus className="h-3.5 w-3.5" />
          등록
        </Button>
      </form>
      <div className="mt-4 space-y-2">
        {materials.map((m) => (
          <Row key={m.id}>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{m.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{m.category} · {m.uploadedAt}</p>
            </div>
            <StatusBadge
              label={m.published ? "게시중" : "비공개"}
              tone={m.published ? "success" : "neutral"}
              onClick={() => {
                setMaterials((prev) => prev.map((p) => (p.id === m.id ? { ...p, published: !p.published } : p)));
                logActivity(m.published ? "자료 비공개 전환" : "자료 게시", m.title);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function StaffView() {
  const { staff, setStaff, logActivity } = useAcademyAdmin();
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

const PERMISSION_CATEGORIES = ["수강등록 관리", "학생 관리", "수강료 관리", "성적 관리", "홈페이지 설정"];

export function PermissionView() {
  const { staff } = useAcademyAdmin();
  const [grants, setGrants] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    staff.forEach((s) => {
      PERMISSION_CATEGORIES.forEach((c) => {
        init[`${s.id}:${c}`] = s.role === "관리자" || c === "학생 관리" || c === "수강등록 관리";
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
  const { siteSettings, setSiteSettings, logActivity } = useAcademyAdmin();

  const save = () => {
    toast.success("홈페이지 설정이 저장되었습니다.");
    logActivity("홈페이지 설정 저장", siteSettings.academyName);
  };

  return (
    <div>
      <PanelHeader title="홈페이지 설정" description="고객 홈페이지에 표시되는 기본 정보와 노출 항목을 관리합니다. 저장하지 않아도 값을 바꾸면 고객 홈페이지에 바로 반영됩니다." />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">학원명</label>
            <Input className="mt-1.5" value={siteSettings.academyName} onChange={(e) => setSiteSettings((f) => ({ ...f, academyName: e.target.value }))} />
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
            <span className="text-xs font-medium text-foreground">강사 소개 노출</span>
            <Switch checked={siteSettings.showTeachers} onCheckedChange={(v) => setSiteSettings((f) => ({ ...f, showTeachers: v }))} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-2.5">
            <span className="text-xs font-medium text-foreground">강의 노출</span>
            <Switch checked={siteSettings.showCourses} onCheckedChange={(v) => setSiteSettings((f) => ({ ...f, showCourses: v }))} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-2.5">
            <span className="text-xs font-medium text-foreground">합격/성과 노출</span>
            <Switch checked={siteSettings.showAchievements} onCheckedChange={(v) => setSiteSettings((f) => ({ ...f, showAchievements: v }))} />
          </div>
          <Button size="sm" className="font-bold" onClick={save}>저장하기</Button>
        </div>

        <div className="rounded-xl border border-border bg-secondary/20 p-5">
          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">미리보기</p>
          <div className="mt-3 overflow-hidden rounded-lg border border-border bg-background">
            <div className="bg-primary/90 px-4 py-6 text-center text-primary-foreground">
              <p className="text-xs opacity-80">{siteSettings.academyName}</p>
              <p className="mt-2 text-lg font-bold">{siteSettings.tagline}</p>
              <p className="mt-1 text-xs opacity-90">{siteSettings.hours}</p>
            </div>
            <div className="space-y-1 p-4 text-xs text-muted-foreground">
              <p>{siteSettings.showCourses ? "✓ 강의 섹션 노출" : "✗ 강의 섹션 숨김"}</p>
              <p>{siteSettings.showTeachers ? "✓ 강사 섹션 노출" : "✗ 강사 섹션 숨김"}</p>
              <p>{siteSettings.showAchievements ? "✓ 합격/성과 섹션 노출" : "✗ 합격/성과 섹션 숨김"}</p>
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
  const { activityLog } = useAcademyAdmin();
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
