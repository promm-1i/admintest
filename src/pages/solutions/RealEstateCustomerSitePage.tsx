import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Phone, ArrowLeft, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useRealEstateAdmin } from "./real-estate-admin/store";
import { Modal } from "./real-estate-admin/components";
import type { Listing } from "./real-estate-admin/types";

export default function RealEstateCustomerSitePage() {
  usePageTitle(
    "부동산에 기술을 더하는 사람들 (데모)",
    "MintCL 부동산 매물관리 웹 솔루션으로 구축한 고객용 홈페이지 데모입니다.",
  );

  const { listings } = useRealEstateAdmin();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("전체");
  const [selected, setSelected] = useState<Listing | null>(null);

  const publicListings = listings.filter((l) => l.status === "공개");
  const types = ["전체", ...new Set(publicListings.map((l) => l.type))];
  const filtered = publicListings.filter((l) => {
    const matchesType = typeFilter === "전체" || l.type === typeFilter;
    const matchesQuery =
      query.trim() === "" || l.title.includes(query) || l.region.includes(query);
    return matchesType && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-center gap-1.5 bg-foreground px-4 py-1.5 text-center text-[11px] text-background">
        <span>이 화면은 관리자 페이지에서 등록·공개한 매물이 반영되는 고객용 홈페이지 데모입니다.</span>
        <Link to="/web-solutions/real-estate/demo" className="inline-flex items-center gap-1 font-semibold underline underline-offset-2">
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
              <p className="text-sm font-bold text-foreground">부동산에 기술을 더하는 사람들</p>
              <p className="text-[11px] text-muted-foreground">MintCL 웹 솔루션 데모</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-1.5 text-sm font-medium text-foreground sm:flex">
              <Phone className="h-3.5 w-3.5 text-primary" />
              070-8098-8054
            </span>
            <Button size="sm" className="font-bold">
              상담 문의
            </Button>
          </div>
        </div>
      </header>

      <section className="bg-secondary/40 px-4 py-14 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">FIND YOUR PLACE</p>
        <h1 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">원하는 매물을 빠르게 찾아보세요</h1>
        <p className="mt-2 text-sm text-muted-foreground">아파트 · 오피스텔 · 원룸 · 상가까지, 등록된 매물을 한눈에</p>

        <div className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="지역명 또는 매물명으로 검색"
              className="h-11 bg-background pl-9"
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
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">전체 매물 {filtered.length}건</h2>
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground break-keep">
            조건에 맞는 매물이 없습니다. 관리자 페이지에서 매물을 등록하거나 공개로 전환해보세요.
          </p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setSelected(l)}
                className="flex flex-col items-start overflow-hidden rounded-xl border border-border bg-card text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex h-36 w-full items-center justify-center bg-secondary/50 text-5xl">
                  {l.image}
                </div>
                <div className="p-4">
                  <span className="inline-block rounded bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                    {l.type}
                  </span>
                  <p className="mt-2 text-sm font-semibold text-foreground">{l.title}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {l.region}
                  </p>
                  <p className="mt-2 text-sm font-bold text-foreground">{l.price}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      <footer className="border-t border-border bg-secondary/30 px-4 py-8 text-center text-xs text-muted-foreground">
        <p>부동산에 기술을 더하는 사람들 (데모) · 070-8098-8054</p>
        <p className="mt-1">이 페이지는 MintCL 웹 솔루션으로 구축 가능한 고객용 홈페이지 예시입니다.</p>
      </footer>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title ?? ""}>
        {selected && (
          <div>
            <div className="flex h-40 items-center justify-center rounded-lg bg-secondary/50 text-6xl">
              {selected.image}
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <dt className="text-muted-foreground">지역</dt>
                <dd className="mt-0.5 font-medium text-foreground">{selected.region}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">매물 종류</dt>
                <dd className="mt-0.5 font-medium text-foreground">{selected.type}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">가격</dt>
                <dd className="mt-0.5 font-medium text-foreground">{selected.price}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">담당자</dt>
                <dd className="mt-0.5 font-medium text-foreground">{selected.manager}</dd>
              </div>
            </dl>
            <Button className="mt-5 w-full font-bold">이 매물 상담 문의</Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
