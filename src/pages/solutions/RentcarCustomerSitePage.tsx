import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Building2, Car, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useRentcarAdmin } from "./rentcar-admin/store";
import { Modal } from "./real-estate-admin/components";
import type { Vehicle } from "./rentcar-admin/types";

type PriceBand = "전체" | "5만원 이하" | "5~10만원" | "10만원 이상";

function matchesPriceBand(price: number, band: PriceBand) {
  if (band === "전체") return true;
  if (band === "5만원 이하") return price <= 50000;
  if (band === "5~10만원") return price > 50000 && price <= 100000;
  return price > 100000;
}

const PRICE_BANDS: PriceBand[] = ["전체", "5만원 이하", "5~10만원", "10만원 이상"];

export default function RentcarCustomerSitePage() {
  usePageTitle(
    "MintCL 렌트카 (데모)",
    "MintCL 렌트카 맞춤형 홈페이지 웹 솔루션으로 구축한 고객용 홈페이지 데모입니다.",
  );

  const { vehicles, setInquiries, logActivity } = useRentcarAdmin();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("전체");
  const [priceBand, setPriceBand] = useState<PriceBand>("전체");
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [inquiryTarget, setInquiryTarget] = useState<Vehicle | null>(null);
  const [inquiryType, setInquiryType] = useState<"문의" | "예약">("문의");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [memo, setMemo] = useState("");

  const publicVehicles = vehicles.filter((v) => v.status === "공개");
  const types = ["전체", ...new Set(publicVehicles.map((v) => v.type))];

  const filtered = publicVehicles.filter((v) => {
    const matchesQuery = query.trim() === "" || v.name.includes(query) || v.location.includes(query);
    const matchesType = typeFilter === "전체" || v.type === typeFilter;
    const matchesPrice = matchesPriceBand(v.dailyPrice, priceBand);
    return matchesQuery && matchesType && matchesPrice;
  });

  const openInquiry = (vehicle: Vehicle | null, type: "문의" | "예약") => {
    setInquiryTarget(vehicle);
    setInquiryType(type);
    if (vehicle) setMemo(`${vehicle.name} ${type} 요청드립니다.`);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const submitInquiry = (e: FormEvent) => {
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
        vehicle: inquiryTarget?.name ?? "차량 미지정",
        content: memo.trim() || "상담 요청",
        type: inquiryType,
        status: "접수",
      },
      ...prev,
    ]);
    logActivity(`홈페이지 ${inquiryType} 접수`, inquiryTarget?.name ?? "일반 문의");
    toast.success(`${inquiryType}가 접수되었습니다.`);
    setName("");
    setPhone("");
    setMemo("");
    setInquiryTarget(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-center gap-1.5 bg-foreground px-4 py-1.5 text-center text-[11px] text-background">
        <span>이 화면은 관리자 페이지에서 등록·공개한 차량이 실시간 반영되는 고객용 홈페이지 데모입니다.</span>
        <Link to="/web-solutions/rentcar/demo" className="inline-flex items-center gap-1 font-semibold underline underline-offset-2">
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
              <p className="text-sm font-bold text-foreground">MintCL 렌트카</p>
              <p className="text-[11px] text-muted-foreground">MintCL 업종별 맞춤 홈페이지 데모</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-1.5 text-sm font-medium text-foreground sm:flex">
              <Phone className="h-3.5 w-3.5 text-primary" />
              1544-0000
            </span>
            <Button size="sm" className="font-bold" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              상담 문의
            </Button>
          </div>
        </div>
      </header>

      <section className="bg-secondary/40 px-4 py-14 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">FIND YOUR CAR</p>
        <h1 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">원하는 차량을 빠르게 찾아보세요</h1>
        <p className="mt-2 text-sm text-muted-foreground">차종 · 가격대 · 지점별로 등록된 차량을 한눈에</p>

        <div className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="차량명 또는 지점으로 검색"
              className="h-11 bg-background"
            />
          </div>
        </div>

        <div className="mx-auto mt-4 flex max-w-xl flex-wrap justify-center gap-1.5">
          {types.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                typeFilter === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="mx-auto mt-2 flex max-w-xl flex-wrap justify-center gap-1.5">
          {PRICE_BANDS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setPriceBand(b)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                priceBand === b
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {b}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-lg font-semibold text-foreground">전체 차량 {filtered.length}건</h2>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground break-keep">
            조건에 맞는 차량이 없습니다. 관리자 페이지에서 차량을 등록하거나 공개로 전환해보세요.
          </p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelected(v)}
                className="flex flex-col items-start overflow-hidden rounded-xl border border-border bg-card text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex h-32 w-full items-center justify-center bg-secondary/50">
                  <Car className="h-8 w-8 text-muted-foreground/40" strokeWidth={1.25} />
                </div>
                <div className="p-4">
                  <span className="inline-block rounded bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                    {v.type} · {v.category}
                  </span>
                  <p className="mt-2 text-sm font-semibold text-foreground">{v.name}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {v.location}
                  </p>
                  <p className="mt-2 text-sm font-bold text-foreground">{v.dailyPrice.toLocaleString("ko-KR")}원 / 일</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      <section id="contact" className="border-t border-border bg-foreground px-4 py-10 text-background">
        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-background/70">Contact</p>
            <h2 className="mt-2 text-2xl font-bold">렌트 문의 · 예약 상담</h2>
            <p className="mt-3 text-sm leading-6 text-background/70">원하는 차량과 대여 기간을 남기면 담당자가 확인 후 연락드립니다.</p>
            <a href="tel:1544-0000" className="mt-5 inline-flex items-center gap-2 text-lg font-bold">
              <Phone className="h-5 w-5" />
              1544-0000
            </a>
          </div>
          <form onSubmit={submitInquiry} className="rounded-xl border border-background/15 bg-background p-5 text-foreground">
            <div className="mb-4 flex items-center gap-2">
              {(["문의", "예약"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setInquiryType(t)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-semibold",
                    inquiryType === t ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="text-sm font-bold">{inquiryTarget ? inquiryTarget.name : "차량 미지정"}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" className="h-11" />
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="연락처" className="h-11" />
            </div>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="희망 차량, 대여 기간 등"
              className="mt-3 min-h-24 w-full resize-none rounded-md border border-border bg-background px-3 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <Button type="submit" className="mt-4 h-11 w-full font-bold">
              {inquiryType} 접수하기
            </Button>
          </form>
        </div>
      </section>

      <footer className="border-t border-border bg-secondary/30 px-4 py-8 text-center text-xs text-muted-foreground">
        <p>MintCL 렌트카 (데모) · 1544-0000</p>
        <p className="mt-1">이 페이지는 MintCL 업종별 맞춤 홈페이지로 구축 가능한 고객용 홈페이지 예시입니다.</p>
      </footer>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name ?? ""}>
        {selected && (
          <div>
            <div className="flex h-36 items-center justify-center rounded-lg bg-secondary/50">
              <Car className="h-10 w-10 text-muted-foreground/40" strokeWidth={1.25} />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <dt className="text-muted-foreground">차종</dt>
                <dd className="mt-0.5 font-medium text-foreground">{selected.type} · {selected.category}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">지점</dt>
                <dd className="mt-0.5 font-medium text-foreground">{selected.location}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">1일 요금</dt>
                <dd className="mt-0.5 font-medium text-foreground">{selected.dailyPrice.toLocaleString("ko-KR")}원</dd>
              </div>
            </dl>
            <div className="mt-5 flex gap-2">
              <Button className="flex-1 gap-1.5 font-bold" onClick={() => { const v = selected; setSelected(null); openInquiry(v, "문의"); }}>
                <Car className="h-3.5 w-3.5" />
                문의하기
              </Button>
              <Button variant="outline" className="flex-1 gap-1.5 font-bold" onClick={() => { const v = selected; setSelected(null); openInquiry(v, "예약"); }}>
                예약하기
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
