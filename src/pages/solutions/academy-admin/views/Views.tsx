import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Search, Plus, Trash2, Pencil, BookOpen, MessageSquare, Users, Wallet } from "lucide-react";
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
import type { Course, Consult, Student } from "../types";

export function DashboardView() {
  const { courses, consults, students, tuition, grades, activityLog } = useAcademyAdmin();
  const unpaidCount = tuition.filter((t) => t.status !== "완납").length;
  const stats = [
    { label: "전체 강의", value: courses.length, icon: BookOpen },
    { label: "재원생", value: students.filter((s) => s.status === "재원").length, icon: Users },
    { label: "상담 대기중", value: consults.filter((c) => c.status !== "완료").length, icon: MessageSquare },
    { label: "수강료 미납", value: unpaidCount, icon: Wallet },
    { label: "이번달 평가 건수", value: grades.length, icon: BookOpen },
    { label: "전체 학생", value: students.length, icon: Users },
  ];
  return (
    <div>
      <PanelHeader title="대시보드" description="강의·학생·상담·수강료 현황을 한눈에 확인합니다. 아래 숫자는 이 데모에서 실제로 조작한 데이터를 기준으로 계산됩니다." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

function cycleConsultStatus(status: Consult["status"]) {
  if (status === "접수") return "상담중" as const;
  if (status === "상담중") return "완료" as const;
  return "접수" as const;
}

export function ConsultView() {
  const { consults, setConsults, logActivity } = useAcademyAdmin();
  const [channel, setChannel] = useState("전체");
  const filtered = consults.filter((c) => channel === "전체" || c.channel === channel);

  return (
    <div>
      <PanelHeader title="수강 상담 관리" description="학부모·학생이 남긴 상담 문의를 관리합니다. 상태 배지를 클릭하면 변경됩니다." />
      <div className="flex flex-wrap gap-1.5">
        {["전체", "온라인", "전화", "방문상담"].map((c) => (
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
        {filtered.length === 0 && <EmptyResult message="접수된 상담이 없습니다." />}
        {filtered.map((i) => (
          <Row key={i.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {i.name} <span className="font-normal text-muted-foreground">· {i.phone} · 학생 {i.studentName}({i.grade}) · {i.channel} · 담당 {i.assignee}</span>
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground break-keep">{i.content}</p>
            </div>
            <StatusBadge
              label={i.status}
              tone={i.status === "완료" ? "success" : i.status === "상담중" ? "warning" : "info"}
              onClick={() => {
                setConsults((prev) => prev.map((p) => (p.id === i.id ? { ...p, status: cycleConsultStatus(p.status) } : p)));
                logActivity("상담 상태 변경", i.name);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}

export function StudentView() {
  const { students } = useAcademyAdmin();
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState<Student | null>(null);

  const filtered = students.filter((s) => query.trim() === "" || s.name.includes(query) || s.parentName.includes(query));

  return (
    <div>
      <PanelHeader title="학생/학부모 관리" description="상담부터 등록, 출결, 성적까지 학생별 활동 이력을 확인합니다." />
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="학생명 · 학부모명 검색" className="pl-9" />
      </div>
      <div className="mt-4 space-y-2">
        {filtered.length === 0 && <EmptyResult message="조건에 맞는 학생이 없습니다." />}
        {filtered.map((s) => (
          <Row key={s.id} onClick={() => setDetail(s)}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {s.name} <span className="font-normal text-muted-foreground">· {s.grade} · 학부모 {s.parentName} · {s.parentPhone}</span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground break-keep">수강중: {s.enrolledCourses.join(", ") || "없음"}</p>
            </div>
            <StatusBadge label={s.status} tone={s.status === "재원" ? "success" : s.status === "휴원" ? "warning" : "neutral"} />
          </Row>
        ))}
      </div>
      <Modal open={!!detail} onClose={() => setDetail(null)} title={detail ? `${detail.name} 학생 이력` : ""}>
        {detail && (
          <div>
            <p className="text-xs text-muted-foreground">{detail.grade} · 학부모 {detail.parentName} · {detail.parentPhone}</p>
            <p className="mt-1 text-xs text-muted-foreground">등록일 {detail.joinDate} · 수강중: {detail.enrolledCourses.join(", ") || "없음"}</p>
            {detail.activities.length === 0 ? (
              <p className="mt-4 text-xs text-muted-foreground">활동 이력이 없습니다.</p>
            ) : (
              <div className="mt-4 space-y-3 border-l border-border pl-4">
                {detail.activities.map((a) => (
                  <div key={a.id} className="relative">
                    <span className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-primary" />
                    <p className="text-xs font-medium text-foreground">{a.type} · {a.at}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground break-keep">{a.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

export function EnrollmentView() {
  const { enrollments, setEnrollments, logActivity } = useAcademyAdmin();
  const [query, setQuery] = useState("");
  const filtered = enrollments.filter((e) => query.trim() === "" || e.studentName.includes(query) || e.courseName.includes(query));

  return (
    <div>
      <PanelHeader title="수강등록 관리" description="학생별 수강 등록 현황과 수강료 납부 상태를 관리합니다." />
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="학생명 · 강의명 검색" className="pl-9" />
      </div>
      <div className="mt-4 space-y-2">
        {filtered.length === 0 && <EmptyResult message="조건에 맞는 수강등록이 없습니다." />}
        {filtered.map((e) => (
          <Row key={e.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {e.studentName} <span className="font-normal text-muted-foreground">· {e.courseName} · {e.teacher} · {e.startDate}~</span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">수강료 {e.tuitionStatus}</p>
            </div>
            <StatusBadge
              label={e.status}
              tone={e.status === "수강중" ? "success" : e.status === "휴강" ? "warning" : "neutral"}
              onClick={() => {
                const order = ["수강중", "휴강", "종료"] as const;
                const next = order[(order.indexOf(e.status) + 1) % order.length];
                setEnrollments((prev) => prev.map((p) => (p.id === e.id ? { ...p, status: next } : p)));
                logActivity("수강등록 상태 변경", `${e.studentName} → ${next}`);
              }}
            />
          </Row>
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
      <PanelHeader title="강의 목록" description="개설된 강의와 정원, 시간표를 관리합니다." />
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
                {c.name} <span className="font-normal text-muted-foreground">· {c.teacher}</span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{c.subject} · {c.schedule} · 정원 {c.enrolled}/{c.capacity} · {c.price}</p>
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
  useEffect(() => {
    setForm(course);
  }, [course]);

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
            <label className="text-xs font-medium text-muted-foreground">담당 강사</label>
            <Input className="mt-1.5" value={form.teacher} onChange={(e) => setForm({ ...form, teacher: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">정원</label>
            <Input type="number" className="mt-1.5" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })} />
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
    setCourses((prev) => [{ id: Date.now(), ...form, enrolled: 0, status: "공개", icon: "📘" }, ...prev]);
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
          <label className="text-xs font-medium text-muted-foreground">담당 강사</label>
          <Input className="mt-1.5" value={form.teacher} onChange={(e) => setForm((f) => ({ ...f, teacher: e.target.value }))} placeholder="예: 박강사" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">정원</label>
          <Input type="number" className="mt-1.5" value={form.capacity} onChange={(e) => setForm((f) => ({ ...f, capacity: Number(e.target.value) }))} />
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

const ATTENDANCE_STATUSES = ["출석", "결석", "지각", "조퇴"] as const;

export function AttendanceView() {
  const { attendance, setAttendance, logActivity } = useAcademyAdmin();
  const byDate = attendance.reduce<Record<string, typeof attendance>>((acc, a) => {
    (acc[a.date] ??= []).push(a);
    return acc;
  }, {});
  const dates = Object.keys(byDate).sort().reverse();

  return (
    <div>
      <PanelHeader title="출결 관리" description="날짜별 출결 현황을 확인하고 상태를 변경합니다." />
      <div className="space-y-4">
        {dates.length === 0 && <EmptyResult message="출결 기록이 없습니다." />}
        {dates.map((date) => (
          <div key={date} className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm font-semibold text-foreground">{date}</p>
            <div className="mt-2 space-y-1.5">
              {byDate[date].map((a) => (
                <div key={a.id} className="flex items-center gap-3 rounded-lg bg-secondary/30 px-3 py-2 text-xs">
                  <span className="min-w-0 flex-1 truncate text-foreground">{a.studentName} <span className="text-muted-foreground">· {a.courseName}</span></span>
                  <StatusBadge
                    label={a.status}
                    tone={a.status === "출석" ? "success" : a.status === "결석" ? "danger" : "warning"}
                    onClick={() => {
                      const next = ATTENDANCE_STATUSES[(ATTENDANCE_STATUSES.indexOf(a.status) + 1) % ATTENDANCE_STATUSES.length];
                      setAttendance((prev) => prev.map((p) => (p.id === a.id ? { ...p, status: next } : p)));
                      logActivity("출결 상태 변경", `${a.studentName} → ${next}`);
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

export function TimetableView() {
  const { courses } = useAcademyAdmin();
  const DAYS = ["월", "화", "수", "목", "금", "토", "일"];
  const byDay = (day: string) => courses.filter((c) => c.status === "공개" && c.schedule.includes(day));

  return (
    <div>
      <PanelHeader title="시간표" description="요일별 개설 강의 시간표를 확인합니다." />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {DAYS.map((day) => (
          <div key={day} className="rounded-xl border border-border bg-card p-3">
            <p className="text-sm font-semibold text-foreground">{day}요일</p>
            <div className="mt-2 space-y-1.5">
              {byDay(day).length === 0 && <p className="text-xs text-muted-foreground">수업 없음</p>}
              {byDay(day).map((c) => (
                <div key={c.id} className="rounded-lg bg-secondary/30 px-2.5 py-2 text-xs">
                  <p className="font-medium text-foreground">{c.name}</p>
                  <p className="mt-0.5 text-muted-foreground">{c.schedule.split(" ")[1] ?? ""} · {c.teacher}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GradeView() {
  const { grades } = useAcademyAdmin();
  const [query, setQuery] = useState("");
  const filtered = grades.filter((g) => query.trim() === "" || g.studentName.includes(query));

  return (
    <div>
      <PanelHeader title="성적 관리" description="학생별 시험·평가 성적을 확인합니다." />
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="학생명 검색" className="pl-9" />
      </div>
      <div className="mt-4 overflow-hidden rounded-xl border border-border">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/40 text-xs text-muted-foreground">
              <th className="px-4 py-2.5 font-medium">학생</th>
              <th className="px-4 py-2.5 font-medium">강의</th>
              <th className="px-4 py-2.5 font-medium">시험명</th>
              <th className="px-4 py-2.5 text-right font-medium">점수</th>
              <th className="px-4 py-2.5 font-medium">일자</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((g) => (
              <tr key={g.id} className="border-b border-border/60 last:border-b-0">
                <td className="px-4 py-2.5 font-medium text-foreground">{g.studentName}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{g.courseName}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{g.examName}</td>
                <td className="px-4 py-2.5 text-right font-semibold text-foreground">{g.score}/{g.maxScore}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{g.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <EmptyResult message="조건에 맞는 성적 기록이 없습니다." />}
      </div>
    </div>
  );
}

export function TuitionView() {
  const { tuition, setTuition, logActivity } = useAcademyAdmin();
  const TUITION_STATUSES = ["완납", "부분납부", "미납"] as const;

  return (
    <div>
      <PanelHeader title="수강료 관리" description="학생별 수강료 납부 상태를 관리합니다. 배지를 클릭하면 상태가 변경됩니다." />
      <div className="space-y-2">
        {tuition.map((t) => (
          <Row key={t.id}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {t.studentName} <span className="font-normal text-muted-foreground">· {t.courseName}</span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{t.amount} · 납부기한 {t.dueDate}</p>
            </div>
            <StatusBadge
              label={t.status}
              tone={t.status === "완납" ? "success" : t.status === "부분납부" ? "warning" : "danger"}
              onClick={() => {
                const next = TUITION_STATUSES[(TUITION_STATUSES.indexOf(t.status) + 1) % TUITION_STATUSES.length];
                setTuition((prev) => prev.map((p) => (p.id === t.id ? { ...p, status: next } : p)));
                logActivity("수강료 상태 변경", `${t.studentName} → ${next}`);
              }}
            />
          </Row>
        ))}
      </div>
    </div>
  );
}
