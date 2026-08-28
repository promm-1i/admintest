import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Building2,
  Search,
  MapPin,
  Settings,
  Send,
  Plus,
  Trash2,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePageTitle } from "@/hooks/usePageTitle";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: Building2,
    title: "매물 등록",
    desc: "매물 정보와 사진을 관리자 페이지에서 직접 등록·수정합니다.",
  },
  {
    icon: Search,
    title: "검색",
    desc: "지역, 매물 유형, 가격대 등 조건별로 매물을 검색합니다.",
  },
  {
    icon: MapPin,
    title: "지도",
    desc: "지도 위에서 매물 위치를 바로 확인할 수 있습니다.",
  },
  {
    icon: Settings,
    title: "관리자",
    desc: "매물 등록 현황과 문의 내역을 관리자 페이지에서 관리합니다.",
  },
];

const PROPERTY_TYPES = ["아파트", "오피스텔", "원룸", "단독주택"];

type Listing = {
  id: number;
  title: string;
  region: string;
  type: string;
  price: string;
};

const INITIAL_LISTINGS: Listing[] = [
  { id: 1, title: "역세권 신축 아파트", region: "서울 강남구 대치동", type: "아파트", price: "매 9억" },
  { id: 2, title: "깨끗한 리모델링 오피스텔", region: "서울 마포구 합정동", type: "오피스텔", price: "전 3억" },
  { id: 3, title: "채광 좋은 원룸", region: "서울 광진구 능동", type: "원룸", price: "보 3천 / 월 50" },
  { id: 4, title: "마당 있는 단독주택", region: "경기 성남시 분당구", type: "단독주택", price: "매 12억" },
];

const EMPTY_FORM = { title: "", region: "", type: PROPERTY_TYPES[0], price: "" };

export default function RealEstateSolution() {
  usePageTitle(
    "부동산 매물관리 웹 솔루션 — MintCL",
    "매물 등록, 검색, 지도, 관리자 기능을 갖춘 부동산 매물관리 웹 솔루션을 안내합니다.",
  );

  const [tab, setTab] = useState("list");
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("전체");
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = listings.filter((l) => {
    const matchesType = typeFilter === "전체" || l.type === typeFilter;
    const matchesQuery =
      query.trim() === "" || l.title.includes(query) || l.region.includes(query);
    return matchesType && matchesQuery;
  });

  const handleDelete = (id: number) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
    toast.success("매물이 삭제되었습니다.");
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.region.trim() || !form.price.trim()) {
      toast.error("모든 항목을 입력해 주세요.");
      return;
    }
    setListings((prev) => [{ id: Date.now(), ...form }, ...prev]);
    toast.success("매물이 등록되었습니다.");
    setForm(EMPTY_FORM);
    setTab("list");
  };

  const handleMapClick = () => {
    toast("데모 페이지입니다", {
      description: "실제 서비스에서는 지도 API가 연동되어 매물 위치가 표시됩니다.",
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
        WEB SOLUTION
      </p>
      <h1 className="mt-3 text-3xl font-semibold">부동산 매물관리 웹 솔루션</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
        매물을 등록하고 지도와 조건별 검색으로 고객이 원하는 매물을 쉽게 찾을 수 있는 웹
        솔루션입니다. 부동산 중개업소, 분양·임대 사무실에 적합합니다.
      </p>

      <h2 className="mt-12 text-xl font-semibold">주요 기능</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className="flex h-full flex-col items-start gap-3 rounded-xl border border-border bg-card p-6 shadow-xs transition-all duration-300 hover:border-primary/50 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground break-keep">{f.desc}</p>
            </div>
          );
        })}
      </div>

      <h2 className="mt-16 flex items-center gap-2 text-xl font-semibold">
        <LayoutDashboard className="h-5 w-5 text-primary" />
        관리자 기능 직접 체험해보기
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-keep">
        실제 관리자 페이지와 동일한 방식으로 매물을 검색·등록·삭제해볼 수 있는 데모입니다. 이
        데모의 데이터는 저장되지 않으며, 지도 등 외부 서비스 연동이 필요한 기능은 실제 구축 시
        연결됩니다.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <span className="h-3 w-3 rounded-full bg-green-400/80" />
          </div>
          <div className="flex items-center gap-1.5 rounded-md border border-border/60 bg-background px-3 py-1 text-[11px] font-mono text-muted-foreground">
            <Settings className="h-3 w-3 text-primary" />
            매물관리 관리자 모드 (데모)
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="list">매물 목록</TabsTrigger>
              <TabsTrigger value="register">매물 등록</TabsTrigger>
              <TabsTrigger value="map">지도</TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="매물명 또는 지역으로 검색"
                    className="pl-9"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["전체", ...PROPERTY_TYPES].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTypeFilter(t)}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                        typeFilter === t
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {filtered.length === 0 && (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    조건에 맞는 매물이 없습니다.
                  </p>
                )}
                {filtered.map((l) => (
                  <div
                    key={l.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/30 p-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{l.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {l.region} · {l.type} · {l.price}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(l.id)}
                      className="shrink-0 rounded-md p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      aria-label={`${l.title} 삭제`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-muted-foreground">매물명</label>
                  <Input
                    className="mt-1.5"
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    placeholder="예: 역세권 신축 아파트"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">지역</label>
                  <Input
                    className="mt-1.5"
                    value={form.region}
                    onChange={(e) => setForm((f) => ({ ...f, region: e.target.value }))}
                    placeholder="예: 서울 강남구 대치동"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">매물 종류</label>
                  <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTY_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-muted-foreground">가격</label>
                  <Input
                    className="mt-1.5"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    placeholder="예: 매 9억, 전 3억, 보 3천 / 월 50"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" className="gap-1.5 font-bold">
                    <Plus className="h-3.5 w-3.5" />
                    매물 등록하기
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="map">
              <button
                type="button"
                onClick={handleMapClick}
                className="flex h-64 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-secondary/30 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <MapPin className="h-8 w-8" />
                <span className="text-sm">지도에서 매물 위치 보기</span>
              </button>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
        <p className="text-sm text-muted-foreground">
          구축비와 월 이용료 등 자세한 요금은 웹 솔루션 요금 페이지에서 확인하실 수 있습니다.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button asChild variant="outline">
            <Link to="/web-solutions">요금 확인하기</Link>
          </Button>
          <Button asChild className="gap-1.5 font-bold">
            <Link to="/contact">
              <Send className="h-3.5 w-3.5" />
              구축 문의하기
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
