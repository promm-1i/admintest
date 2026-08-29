import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Search, Plus, Trash2, Pencil, BookOpen, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAcademyAdmin } from "../store";
import { SUBJECTS } from "../mockData";
import { EMPTY_COURSE_FORM } from "../types";
import {
  PanelHeader,
  StatusBadge,
  StatCard,
  Modal,
  Row,
  EmptyResult,
} from "@/pages/solutions/real-estate-admin/components";
import type { Course } from "../types";

export function DashboardView() {
  const { courses, inquiries, activityLog } = useAcademyAdmin();
  const stats = [
    { label: "전체 강의", value: courses.length, icon: BookOpen },
    { label: "공개 강의", value: courses.filter((c) => c.status === "공개").length, icon: BookOpen },
    { label: "수강 상담", value: inquiries.length, icon: MessageSquare },
    { label: "상담중", value: inquiries.filter((i) => i.status === "상담중").length, icon: MessageSquare },
  ];
  return (
    <div>
      <PanelHeader title="대시보드" description="강의·상담 현황을 한눈에 확인합니다. 아래 숫자는 이 데모에서 실제로 조작한 데이터를 기준으로 계산됩니다." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
        ))}
      </div>
      <h3 className="mt-8 text-sm font-semibold text-foreground">최근 작업 내역</h3>
      <div className="mt-3 space-y-2">
        {activityLog.length === 0 && (
          <p className="rounded-lg border border-dashed border-border bg-secondary/30 p-6 text-center text-xs text-muted-foreground break-keep">
            아직 작업 내역이 없습니다. 왼쪽 메뉴에서 강의를 등록하거나 상태를 변경해보면 여기에 기록됩니다.
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

export function CourseListView({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { courses, setCourses, deleteCourse, logActivity } = useAcademyAdmin();
  const [query, setQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("전체");
  const [editTarget, setEditTarget] = useState<Course | null>(null);

  const filtered = courses.filter((c) => {
    const matchesSubject = subjectFilter === "전체" || c.subject === subjectFilter;
    const matchesQuery = query.trim() === "" || c.name.includes(query);
    return matchesSubject && matchesQuery;
  });

  return (
    <div>
      <PanelHeader title="강의 목록" description="개설된 강의와 시간표를 관리합니다." />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="강의명 검색" className="pl-9" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["전체", ...SUBJECTS].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSubjectFilter(s)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                subjectFilter === s ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {filtered.length === 0 && <EmptyResult message="조건에 맞는 강의가 없습니다." />}
        {filtered.map((c) => (
          <Row key={c.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                <span className="mr-1.5">{c.icon}</span>
                {c.name}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{c.subject} · {c.schedule} · {c.price}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <StatusBadge
                label={c.status}
                tone={c.status === "공개" ? "success" : "neutral"}
                onClick={() => {
                  setCourses((prev) => prev.map((p) => (p.id === c.id ? { ...p, status: p.status === "공개" ? "비공개" : "공개" } : p)));
                  logActivity("강의 공개상태 변경", c.name);
                }}
              />
              <button type="button" onClick={() => setEditTarget(c)} className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" aria-label={`${c.name} 수정`}>
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button type="button" onClick={() => deleteCourse(c.id)} className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive" aria-label={`${c.name} 삭제`}>
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </Row>
        ))}
      </div>
      <div className="mt-4">
        <Button size="sm" className="gap-1.5 font-bold" onClick={() => onNavigate("course-register")}>
          <Plus className="h-3.5 w-3.5" />
          신규 강의 등록
        </Button>
      </div>
      <CourseEditModal course={editTarget} onClose={() => setEditTarget(null)} />
    </div>
  );
}

function CourseEditModal({ course, onClose }: { course: Course | null; onClose: () => void }) {
  const { setCourses, logActivity } = useAcademyAdmin();
  const [form, setForm] = useState<Course | null>(course);
  if (course && form?.id !== course.id) setForm(course);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setCourses((prev) => prev.map((c) => (c.id === form.id ? form : c)));
    toast.success("강의 정보가 수정되었습니다.");
    logActivity("강의 수정", form.name);
    onClose();
  };

  return (
    <Modal open={!!course} onClose={onClose} title="강의 수정">
      {form && (
        <form onSubmit={handleSave} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-muted-foreground">강의명</label>
            <Input className="mt-1.5" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">시간표</label>
            <Input className="mt-1.5" value={form.schedule} onChange={(e) => setForm({ ...form, schedule: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">수강료</label>
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

export function CourseRegisterView({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { setCourses, logActivity } = useAcademyAdmin();
  const [form, setForm] = useState(EMPTY_COURSE_FORM);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.schedule.trim() || !form.price.trim()) {
      toast.error("모든 항목을 입력해 주세요.");
      return;
    }
    setCourses((prev) => [{ id: Date.now(), ...form, status: "공개", icon: "📘" }, ...prev]);
    toast.success("강의가 등록되었습니다.");
    logActivity("강의 등록", form.name);
    setForm(EMPTY_COURSE_FORM);
    onNavigate("course-list");
  };

  return (
    <div>
      <PanelHeader title="강의 등록" description="새 강의의 기본 정보를 입력합니다." />
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">강의명</label>
          <Input className="mt-1.5" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="예: 고등 수학 심화반" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">과목</label>
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
          <label className="text-xs font-medium text-muted-foreground">시간표</label>
          <Input className="mt-1.5" value={form.schedule} onChange={(e) => setForm((f) => ({ ...f, schedule: e.target.value }))} placeholder="예: 월·수·금 19:00" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">수강료</label>
          <Input className="mt-1.5" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} placeholder="예: 월 35만원" />
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" className="gap-1.5 font-bold">
            <Plus className="h-3.5 w-3.5" />
            강의 등록하기
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

export function ConsultView() {
  const { inquiries, setInquiries, logActivity } = useAcademyAdmin();
  return (
    <div>
      <PanelHeader title="수강 상담 관리" description="학부모·학생이 남긴 상담 문의를 관리합니다. 상태 배지를 클릭하면 변경됩니다." />
      <div className="space-y-2">
        {inquiries.length === 0 && <EmptyResult message="접수된 상담이 없습니다." />}
        {inquiries.map((i) => (
          <Row key={i.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {i.name} <span className="font-normal text-muted-foreground">· {i.phone} · {i.course}</span>
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground break-keep">{i.content}</p>
            </div>
            <StatusBadge
              label={i.status}
              tone={i.status === "완료" ? "success" : i.status === "상담중" ? "warning" : "info"}
              onClick={() => {
                setInquiries((prev) => prev.map((p) => (p.id === i.id ? { ...p, status: cycleStatus(p.status) } : p)));
                logActivity("상담 상태 변경", i.name);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function ReviewView() {
  const { reviews, setReviews, logActivity } = useAcademyAdmin();
  const [draft, setDraft] = useState("");

  const addReview = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setReviews((prev) => [{ id: Date.now(), title: draft.trim(), published: true }, ...prev]);
    toast.success("게시글이 등록되었습니다.");
    logActivity("합격/후기 등록", draft.trim());
    setDraft("");
  };

  return (
    <div>
      <PanelHeader title="합격 · 후기 관리" description="합격 수기와 수강 후기를 관리합니다." />
      <form onSubmit={addReview} className="flex gap-2">
        <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="새 게시글 제목" className="flex-1" />
        <Button type="submit" size="sm" className="shrink-0 gap-1.5 font-bold">
          <Plus className="h-3.5 w-3.5" />
          등록
        </Button>
      </form>
      <div className="mt-4 space-y-2">
        {reviews.map((r) => (
          <Row key={r.id}>
            <p className="truncate text-sm font-medium text-foreground">{r.title}</p>
            <StatusBadge
              label={r.published ? "게시중" : "비공개"}
              tone={r.published ? "success" : "neutral"}
              onClick={() => {
                setReviews((prev) => prev.map((p) => (p.id === r.id ? { ...p, published: !p.published } : p)));
                logActivity(r.published ? "게시글 비공개 전환" : "게시글 게시", r.title);
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
