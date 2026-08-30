import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Building2, Phone, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useAcademyAdmin } from "./academy-admin/store";
import { Modal } from "./real-estate-admin/components";
import type { Course } from "./academy-admin/types";

export default function AcademyCustomerSitePage() {
  usePageTitle(
    "NOVERIQ 학원 (데모)",
    "NOVERIQ 학원 맞춤형 홈페이지 웹 솔루션으로 구축한 고객용 홈페이지 데모입니다.",
  );

  const { courses, teachers, reviews, achievements, notices, siteSettings, setConsults, logActivity } = useAcademyAdmin();
  const [subjectFilter, setSubjectFilter] = useState("전체");
  const [selected, setSelected] = useState<Course | null>(null);
  const [target, setTarget] = useState<Course | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [memo, setMemo] = useState("");

  const publicCourses = courses.filter((c) => c.status === "공개");
  const subjects = ["전체", ...new Set(publicCourses.map((c) => c.subject))];
  const filtered = publicCourses.filter((c) => subjectFilter === "전체" || c.subject === subjectFilter);
  const publicTeachers = teachers.filter((t) => t.public);
  const publishedReviews = reviews.filter((r) => r.published);
  const publishedAchievements = achievements.filter((a) => a.published);
  const publishedNotices = notices.filter((n) => n.published);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("이름과 연락처를 입력해 주세요.");
      return;
    }
    setConsults((prev) => [
      {
        id: Date.now(),
        name: name.trim(),
        phone: phone.trim(),
        studentName: name.trim(),
        grade: "미입력",
        channel: "온라인",
        content: memo.trim() || `${target?.name ?? "일반"} 상담 요청`,
        status: "접수",
        assignee: "-",
      },
      ...prev,
    ]);
    logActivity("홈페이지 수강 상담 접수", target?.name ?? "일반 상담");
    toast.success("상담 신청이 접수되었습니다.");
    setName("");
    setPhone("");
    setMemo("");
    setTarget(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-center gap-1.5 bg-foreground px-4 py-1.5 text-center text-[11px] text-background">
        <span>이 화면은 관리자 페이지에서 등록·공개한 내용이 실시간 반영되는 고객용 홈페이지 데모입니다.</span>
        <Link to="/web-solutions/academy/demo" className="inline-flex items-center gap-1 font-semibold underline underline-offset-2">
          <ArrowLeft className="h-3 w-3" />
          관리자 페이지로
        </Link>
      </div>

      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">{siteSettings.academyName}</p>
              <p className="text-[11px] text-muted-foreground">{siteSettings.tagline}</p>
            </div>
          </div>
          <span className="hidden items-center gap-1.5 text-sm font-medium text-foreground sm:flex">
            <Phone className="h-3.5 w-3.5 text-primary" />
            {siteSettings.phone}
          </span>
        </div>
      </header>

      {siteSettings.showCourses && (
        <section className="bg-secondary/40 px-4 py-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">COURSES</p>
          <h1 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">개설 강의 안내</h1>
          <p className="mt-2 text-sm text-muted-foreground">과목별 강의를 확인하고 상담을 신청해보세요</p>
          <div className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-1.5">
            {subjects.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSubjectFilter(s)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  subjectFilter === s ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-12">
        {siteSettings.showCourses && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelected(c)}
                  className="flex flex-col items-start rounded-xl border border-border bg-card p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <span className="text-3xl">{c.icon}</span>
                  <span className="mt-3 inline-block rounded bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">{c.subject}</span>
                  <p className="mt-2 text-sm font-semibold text-foreground">{c.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{c.teacher} · {c.schedule}</p>
                  <p className="mt-2 text-sm font-bold text-foreground">{c.price}</p>
                </button>
              ))}
            </div>
            {filtered.length === 0 && <p className="py-16 text-center text-sm text-muted-foreground">조건에 맞는 강의가 없습니다.</p>}
          </>
        )}

        {siteSettings.showTeachers && publicTeachers.length > 0 && (
          <div className="mt-14">
            <h2 className="text-lg font-semibold text-foreground">강사 소개</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {publicTeachers.map((t) => (
                <div key={t.id} className="rounded-xl border border-border bg-card p-4">
                  <p className="text-sm font-semibold text-foreground">{t.name} <span className="font-normal text-muted-foreground">· {t.subject}</span></p>
                  <p className="mt-1 text-xs text-muted-foreground">{t.career}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground break-keep">{t.intro}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {siteSettings.showAchievements && publishedAchievements.length > 0 && (
          <div className="mt-14">
            <h2 className="flex items-center gap-1.5 text-lg font-semibold text-foreground">
              <Award className="h-4 w-4 text-primary" />
              합격 · 성과
            </h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {publishedAchievements.map((a) => (
                <div key={a.id} className="rounded-lg border border-border bg-secondary/30 px-4 py-3 text-sm">
                  <p className="font-medium text-foreground">{a.studentName} · {a.school}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{a.year} · {a.memo}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {publishedReviews.length > 0 && (
          <div className="mt-14">
            <h2 className="text-lg font-semibold text-foreground">학부모 후기</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {publishedReviews.map((r) => (
                <div key={r.id} className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs font-medium text-primary">{r.courseName}</p>
                  <p className="mt-2 text-xs leading-relaxed text-foreground break-keep">{r.content}</p>
                  <p className="mt-2 text-[11px] text-muted-foreground">{r.studentName}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {publishedNotices.length > 0 && (
          <div className="mt-14">
            <h2 className="text-lg font-semibold text-foreground">공지사항</h2>
            <div className="mt-4 space-y-2">
              {publishedNotices.map((n) => (
                <p key={n.id} className="rounded-lg border border-border bg-secondary/30 px-4 py-2.5 text-sm text-foreground">{n.title}</p>
              ))}
            </div>
          </div>
        )}
      </section>

      <section id="contact" className="border-t border-border bg-foreground px-4 py-10 text-background">
        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-background/70">Contact</p>
            <h2 className="mt-2 text-2xl font-bold">수강 상담 신청</h2>
            <p className="mt-3 text-sm leading-6 text-background/70">희망 강의와 연락처를 남기면 담당자가 확인 후 연락드립니다.</p>
            <a href={`tel:${siteSettings.phone}`} className="mt-5 inline-flex items-center gap-2 text-lg font-bold">
              <Phone className="h-5 w-5" />
              {siteSettings.phone}
            </a>
          </div>
          <form onSubmit={submit} className="rounded-xl border border-background/15 bg-background p-5 text-foreground">
            <p className="text-sm font-bold">{target ? `${target.name} 상담 신청` : "수강 상담 신청"}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" className="h-11" />
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="연락처" className="h-11" />
            </div>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="희망 과목, 학년 등"
              className="mt-3 min-h-24 w-full resize-none rounded-md border border-border bg-background px-3 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <Button type="submit" className="mt-4 h-11 w-full font-bold">상담 신청하기</Button>
          </form>
        </div>
      </section>

      <footer className="border-t border-border bg-secondary/30 px-4 py-8 text-center text-xs text-muted-foreground">
        <p>{siteSettings.academyName} (데모) · {siteSettings.phone}</p>
        <p className="mt-1">이 페이지는 NOVERIQ 업종별 맞춤 홈페이지로 구축 가능한 고객용 홈페이지 예시입니다.</p>
      </footer>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name ?? ""}>
        {selected && (
          <div>
            <p className="text-sm text-muted-foreground">{selected.subject} · {selected.teacher} · {selected.schedule}</p>
            <p className="mt-2 text-sm font-bold text-foreground">{selected.price}</p>
            <Button
              className="mt-5 w-full font-bold"
              onClick={() => {
                const c = selected;
                setSelected(null);
                setTarget(c);
                setMemo(`${c.name} 상담 신청드립니다.`);
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              이 강의 상담 신청
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
