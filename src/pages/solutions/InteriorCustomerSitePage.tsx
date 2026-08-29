import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Building2, Phone, Hammer } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useInteriorAdmin } from "./interior-admin/store";
import { Modal } from "./real-estate-admin/components";
import type { Case } from "./interior-admin/types";

export default function InteriorCustomerSitePage() {
  usePageTitle(
    "MintCL 인테리어 (데모)",
    "MintCL 인테리어·리모델링 맞춤형 홈페이지 웹 솔루션으로 구축한 고객용 홈페이지 데모입니다.",
  );

  const { cases, packages, siteSettings, setInquiries, logActivity } = useInteriorAdmin();
  const [areaFilter, setAreaFilter] = useState("전체");
  const [selected, setSelected] = useState<Case | null>(null);
  const [target, setTarget] = useState<Case | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [memo, setMemo] = useState("");

  const publicCases = cases.filter((c) => c.status === "공개");
  const areas = ["전체", ...new Set(publicCases.map((c) => c.area))];
  const filtered = publicCases.filter((c) => areaFilter === "전체" || c.area === areaFilter);
  const publishedPackages = packages.filter((p) => p.published);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("이름과 연락처를 입력해 주세요.");
      return;
    }
    setInquiries((prev) => [
      {
        id: Date.now(),
        name: name.trim(),
        phone: phone.trim(),
        area: target?.area ?? "미지정",
        spaceType: "전체",
        budget: "미정",
        content: memo.trim() || "견적 요청",
        status: "접수",
        assignee: "-",
      },
      ...prev,
    ]);
    logActivity("홈페이지 견적 문의 접수", target?.name ?? "일반 문의");
    toast.success("견적 문의가 접수되었습니다.");
    setName("");
    setPhone("");
    setMemo("");
    setTarget(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-center gap-1.5 bg-foreground px-4 py-1.5 text-center text-[11px] text-background">
        <span>이 화면은 관리자 페이지에서 등록·공개한 내용이 실시간 반영되는 고객용 홈페이지 데모입니다.</span>
        <Link to="/web-solutions/interior/demo" className="inline-flex items-center gap-1 font-semibold underline underline-offset-2">
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
              <p className="text-sm font-bold text-foreground">{siteSettings.companyName}</p>
              <p className="text-[11px] text-muted-foreground">{siteSettings.tagline}</p>
            </div>
          </div>
          <span className="hidden items-center gap-1.5 text-sm font-medium text-foreground sm:flex">
            <Phone className="h-3.5 w-3.5 text-primary" />
            {siteSettings.phone}
          </span>
        </div>
      </header>

      {siteSettings.showCases && (
        <section className="bg-secondary/40 px-4 py-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">CASES</p>
          <h1 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">시공 사례</h1>
          <p className="mt-2 text-sm text-muted-foreground">평형대별 시공 사례를 확인하고 견적을 문의해보세요</p>
          <div className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-1.5">
            {areas.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAreaFilter(a)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  areaFilter === a ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground",
                )}
              >
                {a}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-12">
        {siteSettings.showCases && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelected(c)}
                  className="flex flex-col items-start overflow-hidden rounded-xl border border-border bg-card text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex h-32 w-full items-center justify-center bg-secondary/50">
                    <Hammer className="h-8 w-8 text-muted-foreground/40" strokeWidth={1.25} />
                  </div>
                  <div className="p-4">
                    <span className="inline-block rounded bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">{c.area}</span>
                    <p className="mt-2 text-sm font-semibold text-foreground">{c.name}</p>
                    <p className="mt-2 text-sm font-bold text-foreground">{c.price}</p>
                  </div>
                </button>
              ))}
            </div>
            {filtered.length === 0 && <p className="py-16 text-center text-sm text-muted-foreground">조건에 맞는 시공 사례가 없습니다.</p>}
          </>
        )}

        {siteSettings.showPackages && publishedPackages.length > 0 && (
          <div className="mt-14">
            <h2 className="text-lg font-semibold text-foreground">평형별 패키지</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {publishedPackages.map((p) => (
                <div key={p.id} className="rounded-lg border border-border bg-secondary/30 px-4 py-3 text-sm">
                  <p className="font-medium text-foreground">{p.title} <span className="font-normal text-muted-foreground">· {p.area}</span></p>
                  <p className="mt-1 text-xs text-muted-foreground">{p.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section id="contact" className="border-t border-border bg-foreground px-4 py-10 text-background">
        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-background/70">Contact</p>
            <h2 className="mt-2 text-2xl font-bold">견적 문의</h2>
            <p className="mt-3 text-sm leading-6 text-background/70">평형과 원하는 공간을 남기면 담당자가 확인 후 연락드립니다.</p>
            <a href={`tel:${siteSettings.phone}`} className="mt-5 inline-flex items-center gap-2 text-lg font-bold">
              <Phone className="h-5 w-5" />
              {siteSettings.phone}
            </a>
          </div>
          <form onSubmit={submit} className="rounded-xl border border-background/15 bg-background p-5 text-foreground">
            <p className="text-sm font-bold">{target ? `${target.name} 견적 문의` : "견적 문의"}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" className="h-11" />
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="연락처" className="h-11" />
            </div>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="평형, 원하는 공간, 예산 등"
              className="mt-3 min-h-24 w-full resize-none rounded-md border border-border bg-background px-3 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <Button type="submit" className="mt-4 h-11 w-full font-bold">견적 문의하기</Button>
          </form>
        </div>
      </section>

      <footer className="border-t border-border bg-secondary/30 px-4 py-8 text-center text-xs text-muted-foreground">
        <p>{siteSettings.companyName} (데모) · {siteSettings.phone}</p>
        <p className="mt-1">이 페이지는 MintCL 업종별 맞춤 홈페이지로 구축 가능한 고객용 홈페이지 예시입니다.</p>
      </footer>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name ?? ""}>
        {selected && (
          <div>
            <div className="flex h-32 items-center justify-center rounded-lg bg-secondary/50">
              <Hammer className="h-9 w-9 text-muted-foreground/40" strokeWidth={1.25} />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{selected.area}</p>
            <p className="mt-1 text-sm font-bold text-foreground">{selected.price}</p>
            <Button
              className="mt-5 w-full font-bold"
              onClick={() => {
                const c = selected;
                setSelected(null);
                setTarget(c);
                setMemo(`${c.name}과(와) 비슷한 평형 견적 문의드립니다.`);
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              이 사례로 견적 문의
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
