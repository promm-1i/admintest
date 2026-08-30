import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Building2, Phone, Star, Megaphone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useHospitalAdmin } from "./hospital-admin/store";
import { Modal } from "./real-estate-admin/components";
import type { Department, Doctor } from "./hospital-admin/types";

export default function HospitalCustomerSitePage() {
  usePageTitle(
    "NOVERIQ 의원 (데모)",
    "NOVERIQ 병원·의원 맞춤형 홈페이지 웹 솔루션으로 구축한 고객용 홈페이지 데모입니다.",
  );

  const { departments, doctors, nonCovered, reviews, notices, banners, siteSettings, setReservations, logActivity } = useHospitalAdmin();
  const [selected, setSelected] = useState<Department | null>(null);
  const [target, setTarget] = useState<Department | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [memo, setMemo] = useState("");

  const publicDepartments = departments.filter((d) => d.status === "공개").sort((a, b) => a.order - b.order);
  const publicDoctors = doctors.filter((d) => d.public);
  const publishedItems = nonCovered.filter((n) => n.published);
  const publishedReviews = reviews.filter((r) => r.published);
  const publishedNotices = notices.filter((n) => n.published);
  const activeBanners = banners.filter((b) => b.active).sort((a, b) => a.order - b.order);

  const doctorsByDept = (deptName: string) => publicDoctors.filter((d: Doctor) => d.department === deptName);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("이름과 연락처를 입력해 주세요.");
      return;
    }
    setReservations((prev) => [
      {
        id: Date.now(),
        customerName: name.trim(),
        phone: phone.trim(),
        department: target?.name ?? "미지정",
        doctor: "미지정",
        date: "미정",
        time: "미정",
        status: "대기",
        memo: memo.trim() || "홈페이지 예약 문의",
      },
      ...prev,
    ]);
    logActivity("홈페이지 예약 문의 접수", target?.name ?? "일반 문의");
    toast.success("예약 문의가 접수되었습니다.");
    setName("");
    setPhone("");
    setMemo("");
    setTarget(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-center gap-1.5 bg-foreground px-4 py-1.5 text-center text-[11px] text-background">
        <span>이 화면은 관리자 페이지에서 등록·공개한 내용이 실시간 반영되는 고객용 홈페이지 데모입니다.</span>
        <Link to="/web-solutions/hospital/demo" className="inline-flex items-center gap-1 font-semibold underline underline-offset-2">
          <ArrowLeft className="h-3 w-3" />
          관리자 페이지로
        </Link>
      </div>

      {activeBanners.length > 0 && (
        <div className="space-y-0.5 bg-primary/5 px-4 py-2">
          {activeBanners.map((b) => (
            <p key={b.id} className="flex items-center justify-center gap-1.5 text-xs font-medium text-primary">
              <span>{b.icon}</span>
              {b.title}
            </p>
          ))}
        </div>
      )}

      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">{siteSettings.hospitalName}</p>
              <p className="text-[11px] text-muted-foreground">{siteSettings.tagline}</p>
            </div>
          </div>
          <span className="hidden items-center gap-1.5 text-sm font-medium text-foreground sm:flex">
            <Phone className="h-3.5 w-3.5 text-primary" />
            {siteSettings.phone}
          </span>
        </div>
      </header>

      {siteSettings.showDepartments && (
        <section className="bg-secondary/40 px-4 py-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">DEPARTMENTS</p>
          <h1 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">진료과목 안내</h1>
          <p className="mt-2 text-sm text-muted-foreground">원하는 진료과목을 선택해 예약 문의를 남겨보세요</p>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-12">
        {siteSettings.showDepartments && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {publicDepartments.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelected(d)}
                  className="flex flex-col items-start rounded-xl border border-border bg-card p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <span className="text-3xl">{d.icon}</span>
                  <p className="mt-3 text-sm font-semibold text-foreground">{d.name}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground break-keep">{d.desc}</p>
                </button>
              ))}
            </div>
            {publicDepartments.length === 0 && (
              <p className="py-16 text-center text-sm text-muted-foreground">공개된 진료과목이 없습니다.</p>
            )}
          </>
        )}

        {siteSettings.showDoctors && publicDoctors.length > 0 && (
          <div className="mt-14">
            <h2 className="text-lg font-semibold text-foreground">의료진 소개</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {publicDoctors.map((d) => (
                <div key={d.id} className="rounded-xl border border-border bg-card p-4">
                  <p className="text-sm font-semibold text-foreground">{d.name} <span className="font-normal text-muted-foreground">· {d.position}</span></p>
                  <p className="mt-1 text-xs text-muted-foreground">{d.department} · {d.career}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground break-keep">{d.profile}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {publishedItems.length > 0 && (
          <div className="mt-14">
            <h2 className="text-lg font-semibold text-foreground">비급여 안내</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-border">
              <table className="w-full border-collapse text-left text-sm">
                <tbody>
                  {publishedItems.map((item) => (
                    <tr key={item.id} className="border-b border-border/60 last:border-b-0">
                      <td className="px-4 py-3 text-foreground">
                        {item.name} <span className="text-xs text-muted-foreground">· {item.category}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-foreground">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {publishedReviews.length > 0 && (
          <div className="mt-14">
            <h2 className="text-lg font-semibold text-foreground">고객 후기</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {publishedReviews.map((r) => (
                <div key={r.id} className="rounded-xl border border-border bg-card p-4">
                  <p className="flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-foreground break-keep">{r.content}</p>
                  <p className="mt-2 text-[11px] text-muted-foreground">{r.customerName} · {r.department}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {publishedNotices.length > 0 && (
          <div className="mt-14">
            <h2 className="flex items-center gap-1.5 text-lg font-semibold text-foreground">
              <Megaphone className="h-4 w-4 text-primary" />
              공지사항
            </h2>
            <div className="mt-4 space-y-2">
              {publishedNotices.map((n) => (
                <p key={n.id} className="rounded-lg border border-border bg-secondary/30 px-4 py-2.5 text-sm text-foreground">{n.title}</p>
              ))}
            </div>
          </div>
        )}
      </section>

      {siteSettings.showReserveButton && (
        <section id="contact" className="border-t border-border bg-foreground px-4 py-10 text-background">
          <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-background/70">Contact</p>
              <h2 className="mt-2 text-2xl font-bold">예약 문의</h2>
              <p className="mt-3 text-sm leading-6 text-background/70">원하는 진료과목과 방문 희망일을 남기면 담당자가 확인 후 연락드립니다.</p>
              <a href={`tel:${siteSettings.phone}`} className="mt-5 inline-flex items-center gap-2 text-lg font-bold">
                <Phone className="h-5 w-5" />
                {siteSettings.phone}
              </a>
            </div>
            <form onSubmit={submit} className="rounded-xl border border-background/15 bg-background p-5 text-foreground">
              <p className="text-sm font-bold">{target ? `${target.name} 예약 문의` : "예약 문의"}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" className="h-11" />
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="연락처" className="h-11" />
              </div>
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="희망 방문일, 증상 등"
                className="mt-3 min-h-24 w-full resize-none rounded-md border border-border bg-background px-3 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
              />
              <Button type="submit" className="mt-4 h-11 w-full font-bold">예약 문의하기</Button>
            </form>
          </div>
        </section>
      )}

      <footer className="border-t border-border bg-secondary/30 px-4 py-8 text-center text-xs text-muted-foreground">
        <p>{siteSettings.hospitalName} (데모) · {siteSettings.phone}</p>
        <p className="mt-1">이 페이지는 NOVERIQ 업종별 맞춤 홈페이지로 구축 가능한 고객용 홈페이지 예시입니다.</p>
      </footer>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name ?? ""}>
        {selected && (
          <div>
            <p className="text-sm leading-relaxed text-foreground break-keep">{selected.desc}</p>
            {doctorsByDept(selected.name).length > 0 && (
              <div className="mt-3 space-y-1.5">
                {doctorsByDept(selected.name).map((d) => (
                  <p key={d.id} className="text-xs text-muted-foreground">{d.name} {d.position} · {d.career}</p>
                ))}
              </div>
            )}
            {siteSettings.showReserveButton && (
              <Button
                className="mt-5 w-full font-bold"
                onClick={() => {
                  const d = selected;
                  setSelected(null);
                  setTarget(d);
                  setMemo(`${d.name} 예약 문의드립니다.`);
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                이 진료과목 예약 문의
              </Button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
