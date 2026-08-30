import { useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Filter,
  Heart,
  Layers3,
  List,
  Map,
  MapPin,
  MessageCircle,
  Phone,
  Route,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Train,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useRealEstateAdmin } from "./real-estate-admin/store";
import type { Listing } from "./real-estate-admin/types";

type ViewMode = "list" | "map";
type DealFilter = "전체" | "매매" | "전세" | "월세" | "권리";
type PriceBand = "전체" | "1억 이하" | "1~5억" | "5~10억" | "10억 이상";
type SortOption = "추천순" | "최신순" | "낮은가격순" | "높은가격순";
type DetailTab = "정보" | "설명" | "교통" | "주변";
type CalculatorDeal = "매매" | "전세" | "월세";

const DEAL_OPTIONS: DealFilter[] = ["전체", "매매", "전세", "월세", "권리"];
const PRICE_BANDS: PriceBand[] = ["전체", "1억 이하", "1~5억", "5~10억", "10억 이상"];
const SORT_OPTIONS: SortOption[] = ["추천순", "최신순", "낮은가격순", "높은가격순"];
const DETAIL_TABS: DetailTab[] = ["정보", "설명", "교통", "주변"];

const MOBILE_NAV: Array<{ label: string; icon: LucideIcon; href: string }> = [
  { label: "검색", icon: Search, href: "#listings" },
  { label: "지도", icon: Map, href: "#map" },
  { label: "계산", icon: Calculator, href: "#calculator" },
  { label: "문의", icon: MessageCircle, href: "#contact" },
];

const MAP_POINTS = [
  { x: 68, y: 38 },
  { x: 35, y: 34 },
  { x: 61, y: 63 },
  { x: 50, y: 73 },
  { x: 76, y: 52 },
  { x: 30, y: 56 },
  { x: 44, y: 45 },
  { x: 58, y: 31 },
  { x: 70, y: 70 },
  { x: 23, y: 42 },
  { x: 83, y: 59 },
  { x: 48, y: 24 },
];

const FEATURE_TAGS = ["역세권", "즉시입주", "관리양호", "주차가능", "추천", "채광좋음", "신축급", "상권우수"];

function getDealType(price: string): DealFilter {
  if (price.includes("월")) return "월세";
  if (price.includes("전")) return "전세";
  if (price.includes("권")) return "권리";
  if (price.includes("매")) return "매매";
  return "전체";
}

function getPriceValueManwon(price: string) {
  const eok = [...price.matchAll(/(\d+(?:\.\d+)?)억/g)].reduce((sum, match) => sum + Number(match[1]) * 10000, 0);
  const cheon = [...price.matchAll(/(\d+(?:,\d+)?)천/g)].reduce((sum, match) => sum + Number(match[1].replace(/,/g, "")) * 1000, 0);
  const deposit = price.match(/보\s*(\d+(?:,\d+)?)/);
  const fallback = deposit ? Number(deposit[1].replace(/,/g, "")) : 0;
  return eok + cheon || fallback;
}

function matchesPriceBand(price: string, band: PriceBand) {
  const value = getPriceValueManwon(price);
  if (band === "전체") return true;
  if (band === "1억 이하") return value <= 10000;
  if (band === "1~5억") return value > 10000 && value <= 50000;
  if (band === "5~10억") return value > 50000 && value <= 100000;
  return value > 100000;
}

function getListingTags(listing: Listing) {
  return [FEATURE_TAGS[listing.id % FEATURE_TAGS.length], FEATURE_TAGS[(listing.id + 3) % FEATURE_TAGS.length]];
}

function getListingArea(listing: Listing) {
  const area = 28 + ((listing.id * 17) % 96);
  return `${area}㎡`;
}

function getMapPoint(listing: Listing, index: number) {
  return MAP_POINTS[(listing.id + index) % MAP_POINTS.length];
}

function formatManwon(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "0원";
  if (value >= 10000) {
    const eok = Math.floor(value / 10000);
    const rest = Math.round(value % 10000);
    return rest > 0 ? `${eok}억 ${rest.toLocaleString("ko-KR")}만원` : `${eok}억원`;
  }
  return `${Math.round(value).toLocaleString("ko-KR")}만원`;
}

function calculateCommission(deal: CalculatorDeal, amountManwon: number, depositManwon: number, monthlyManwon: number) {
  const transactionAmount =
    deal === "월세"
      ? (() => {
          const standard = depositManwon + monthlyManwon * 100;
          return standard >= 5000 ? standard : depositManwon + monthlyManwon * 70;
        })()
      : amountManwon;

  const saleRates = [
    { max: 5000, rate: 0.006, cap: 25 },
    { max: 20000, rate: 0.005, cap: 80 },
    { max: 90000, rate: 0.004, cap: null },
    { max: 120000, rate: 0.005, cap: null },
    { max: 150000, rate: 0.006, cap: null },
    { max: Infinity, rate: 0.007, cap: null },
  ];
  const leaseRates = [
    { max: 5000, rate: 0.005, cap: 20 },
    { max: 10000, rate: 0.004, cap: 30 },
    { max: 60000, rate: 0.003, cap: null },
    { max: 120000, rate: 0.004, cap: null },
    { max: 150000, rate: 0.005, cap: null },
    { max: Infinity, rate: 0.006, cap: null },
  ];

  const tier = (deal === "매매" ? saleRates : leaseRates).find((item) => transactionAmount < item.max) ?? leaseRates[leaseRates.length - 1];
  const rawFee = transactionAmount * tier.rate;
  const fee = tier.cap ? Math.min(rawFee, tier.cap) : rawFee;

  return {
    fee,
    rate: tier.rate,
    transactionAmount,
  };
}

export default function RealEstateCustomerSitePage() {
  usePageTitle(
    "부동산 샘플 (데모)",
    "MintCL 부동산 매물관리 웹 솔루션으로 구축한 고객용 홈페이지 데모입니다.",
  );

  const { listings, setInquiries, logActivity } = useRealEstateAdmin();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("전체");
  const [dealFilter, setDealFilter] = useState<DealFilter>("전체");
  const [priceBand, setPriceBand] = useState<PriceBand>("전체");
  const [sortOption, setSortOption] = useState<SortOption>("추천순");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selected, setSelected] = useState<Listing | null>(null);
  const [detailTab, setDetailTab] = useState<DetailTab>("정보");
  const [inquiryTarget, setInquiryTarget] = useState<Listing | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMemo, setContactMemo] = useState("");
  const [calculatorDeal, setCalculatorDeal] = useState<CalculatorDeal>("매매");
  const [calculatorAmount, setCalculatorAmount] = useState("90000");
  const [calculatorDeposit, setCalculatorDeposit] = useState("30000");
  const [calculatorMonthly, setCalculatorMonthly] = useState("80");

  const publicListings = useMemo(() => listings.filter((listing) => listing.status === "공개"), [listings]);
  const types = useMemo(() => ["전체", ...new Set(publicListings.map((listing) => listing.type))], [publicListings]);

  const filtered = useMemo(() => {
    return publicListings
      .filter((listing) => {
        const normalizedQuery = query.trim();
        const matchesQuery =
          normalizedQuery === "" || listing.title.includes(normalizedQuery) || listing.region.includes(normalizedQuery) || listing.manager.includes(normalizedQuery);
        const matchesType = typeFilter === "전체" || listing.type === typeFilter;
        const matchesDeal = dealFilter === "전체" || getDealType(listing.price) === dealFilter;
        const matchesPrice = matchesPriceBand(listing.price, priceBand);
        return matchesQuery && matchesType && matchesDeal && matchesPrice;
      })
      .sort((a, b) => {
        if (sortOption === "최신순") return new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime();
        if (sortOption === "낮은가격순") return getPriceValueManwon(a.price) - getPriceValueManwon(b.price);
        if (sortOption === "높은가격순") return getPriceValueManwon(b.price) - getPriceValueManwon(a.price);
        return a.id - b.id;
      });
  }, [dealFilter, priceBand, publicListings, query, sortOption, typeFilter]);

  const commission = calculateCommission(
    calculatorDeal,
    Number(calculatorAmount) || 0,
    Number(calculatorDeposit) || 0,
    Number(calculatorMonthly) || 0,
  );

  const stats = [
    { label: "공개 매물", value: `${publicListings.length}건` },
    { label: "오늘 추천", value: `${filtered.slice(0, 4).length}건` },
    { label: "상담 전화", value: "070-8098-8054" },
  ];

  const openDetail = (listing: Listing) => {
    setSelected(listing);
    setDetailTab("정보");
  };

  const openInquiry = (listing: Listing | null) => {
    setInquiryTarget(listing);
    if (listing) {
      setContactMemo(`${listing.title} 상담을 받고 싶습니다.`);
    }
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const submitInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!contactName.trim() || !contactPhone.trim()) {
      toast.error("이름과 연락처를 입력해 주세요.");
      return;
    }

    const targetTitle = inquiryTarget?.title ?? "홈페이지 일반 문의";
    setInquiries((prev) => [
      {
        id: Date.now(),
        name: contactName.trim(),
        phone: contactPhone.trim(),
        content: `${targetTitle} - ${contactMemo.trim() || "상담 요청"}`,
        status: "상담중",
      },
      ...prev,
    ]);
    logActivity("홈페이지 상담 접수", targetTitle);
    toast.success("상담 문의가 접수되었습니다.");
    setContactName("");
    setContactPhone("");
    setContactMemo("");
    setInquiryTarget(null);
  };

  return (
    <div className="min-h-screen bg-background pb-16 text-foreground lg:pb-0">
      <div className="border-b border-border bg-foreground px-4 py-2 text-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-center text-[11px] sm:flex-row sm:text-left">
          <span>관리자 페이지에서 공개한 매물이 실시간 반영되는 고객용 홈페이지 데모입니다.</span>
          <Link to="/web-solutions/real-estate/demo" className="inline-flex items-center gap-1 font-semibold underline underline-offset-2">
            <ArrowLeft className="h-3 w-3" />
            관리자 페이지로
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link to="/web-solutions/real-estate/demo/site" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">부동산 샘플</p>
              <p className="text-[11px] text-muted-foreground">MintCL 웹 솔루션 데모</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex">
            <a href="#listings" className="hover:text-foreground">
              매물검색
            </a>
            <a href="#map" className="hover:text-foreground">
              지도보기
            </a>
            <a href="#calculator" className="hover:text-foreground">
              중개보수
            </a>
            <a href="#contact" className="hover:text-foreground">
              상담문의
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <a className="hidden items-center gap-1.5 text-sm font-semibold sm:flex" href="tel:070-8098-8054">
              <Phone className="h-4 w-4 text-primary" />
              070-8098-8054
            </a>
            <Button size="sm" className="font-bold" onClick={scrollToContact}>
              상담 문의
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-border bg-[linear-gradient(135deg,var(--secondary)_0%,var(--background)_48%,var(--accent)_100%)] px-4 py-10 sm:py-14">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                <Sparkles className="h-4 w-4" />
                Find Your Place
              </p>
              <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">
                원하는 매물을 조건으로 좁히고, 위치까지 바로 확인하세요
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                아파트, 오피스텔, 원룸, 상가, 사무실 매물을 검색 조건과 지도 기반으로 탐색하고 상담까지 이어집니다.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-lg border border-border bg-background/80 px-4 py-3">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="mt-1 text-lg font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-background p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-primary">빠른 매물 검색</p>
                  <h2 className="mt-1 text-xl font-bold">조건을 선택하세요</h2>
                </div>
                <Filter className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="mt-5 grid gap-3">
                <label className="relative block">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="지역명, 매물명, 담당자 검색"
                    className="h-11 pl-9"
                  />
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <FilterGroup label="거래유형" options={DEAL_OPTIONS} value={dealFilter} onChange={(value) => setDealFilter(value as DealFilter)} />
                  <FilterGroup label="가격대" options={PRICE_BANDS} value={priceBand} onChange={(value) => setPriceBand(value as PriceBand)} />
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold text-muted-foreground">매물종류</p>
                  <div className="flex flex-wrap gap-1.5">
                    {types.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setTypeFilter(type)}
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                          typeFilter === type
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground",
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <a
                  href="#listings"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  매물 {filtered.length}건 보기
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="listings" className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold text-primary">Property Search</p>
              <h2 className="mt-1 text-2xl font-bold">전체 매물 {filtered.length}건</h2>
              <p className="mt-2 text-sm text-muted-foreground">공개 상태 매물만 고객 화면에 노출됩니다.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="inline-flex rounded-lg border border-border bg-secondary/50 p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={cn("inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-semibold", viewMode === "list" ? "bg-background shadow-sm" : "text-muted-foreground")}
                >
                  <List className="h-4 w-4" />
                  목록
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("map")}
                  className={cn("inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-semibold", viewMode === "map" ? "bg-background shadow-sm" : "text-muted-foreground")}
                >
                  <Map className="h-4 w-4" />
                  지도
                </button>
              </div>
              <select
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value as SortOption)}
                className="h-11 rounded-md border border-border bg-background px-3 text-sm font-medium outline-none focus:border-primary"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-sm font-bold">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              상세 조건
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr]">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="예: 강남, 역세권, 사무실"
                  className="h-11 pl-9"
                />
              </label>
              <FilterGroup label="거래유형" options={DEAL_OPTIONS} value={dealFilter} onChange={(value) => setDealFilter(value as DealFilter)} compact />
              <FilterGroup label="가격대" options={PRICE_BANDS} value={priceBand} onChange={(value) => setPriceBand(value as PriceBand)} compact />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-border px-4 py-16 text-center">
              <p className="text-sm font-semibold">조건에 맞는 매물이 없습니다.</p>
              <p className="mt-2 text-sm text-muted-foreground">검색어나 조건을 줄이면 더 많은 매물을 볼 수 있습니다.</p>
            </div>
          ) : viewMode === "list" ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((listing) => (
                <ListingCard key={listing.id} listing={listing} onOpen={() => openDetail(listing)} onInquiry={() => openInquiry(listing)} />
              ))}
            </div>
          ) : (
            <MapPanel listings={filtered} selected={selected} onOpen={openDetail} onInquiry={openInquiry} />
          )}
        </section>

        <section id="map" className="border-y border-border bg-secondary/25 px-4 py-10">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold text-primary">Map View</p>
              <h2 className="mt-1 text-2xl font-bold">주요 매물 위치</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                지역별 매물 분포를 먼저 보고, 원하는 매물을 누르면 상세 정보와 상담 버튼으로 이어집니다.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {["지역별 분포", "매물 카드 연동", "상세 모달", "전화 CTA"].map((label) => (
                  <div key={label} className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
            <MapSurface listings={filtered.slice(0, 10)} onOpen={openDetail} />
          </div>
        </section>

        <section id="calculator" className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-semibold text-primary">Brokerage Fee</p>
            <h2 className="mt-1 text-2xl font-bold">중개보수 계산기</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              매매·전세·월세 거래금액 기준으로 주택 중개보수 상한액을 빠르게 확인합니다.
            </p>
            <div className="mt-5 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                <span>월세는 보증금과 월차임을 환산한 거래금액을 사용합니다.</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock3 className="mt-0.5 h-4 w-4 text-primary" />
                <span>실제 금액은 물건 종류와 협의 요율에 따라 달라질 수 있습니다.</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="grid gap-4 sm:grid-cols-3">
              {(["매매", "전세", "월세"] as CalculatorDeal[]).map((deal) => (
                <button
                  key={deal}
                  type="button"
                  onClick={() => setCalculatorDeal(deal)}
                  className={cn(
                    "h-10 rounded-md border text-sm font-bold transition-colors",
                    calculatorDeal === deal ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground",
                  )}
                >
                  {deal}
                </button>
              ))}
            </div>
            {calculatorDeal === "월세" ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <MoneyInput label="보증금" value={calculatorDeposit} onChange={setCalculatorDeposit} />
                <MoneyInput label="월세" value={calculatorMonthly} onChange={setCalculatorMonthly} />
              </div>
            ) : (
              <div className="mt-5">
                <MoneyInput label={calculatorDeal === "매매" ? "매매가" : "전세보증금"} value={calculatorAmount} onChange={setCalculatorAmount} />
              </div>
            )}
            <div className="mt-5 grid gap-3 rounded-lg bg-secondary/45 p-4 sm:grid-cols-3">
              <ResultBlock label="거래금액" value={formatManwon(commission.transactionAmount)} />
              <ResultBlock label="상한요율" value={`${(commission.rate * 100).toFixed(1)}%`} />
              <ResultBlock label="예상 중개보수" value={formatManwon(commission.fee)} strong />
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-border bg-foreground px-4 py-10 text-background">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-background/70">Contact</p>
              <h2 className="mt-2 text-2xl font-bold">조건에 맞는 매물을 제안받아 보세요</h2>
              <p className="mt-3 text-sm leading-6 text-background/70">
                희망 지역과 예산을 남기면 담당자가 공개 매물과 신규 등록 매물을 함께 확인합니다.
              </p>
              <a href="tel:070-8098-8054" className="mt-5 inline-flex items-center gap-2 text-lg font-bold">
                <Phone className="h-5 w-5" />
                070-8098-8054
              </a>
            </div>
            <InquiryForm
              name={contactName}
              phone={contactPhone}
              memo={contactMemo}
              target={inquiryTarget}
              onName={setContactName}
              onPhone={setContactPhone}
              onMemo={setContactMemo}
              onSubmit={submitInquiry}
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-secondary/30 px-4 py-8 text-center text-xs text-muted-foreground">
        <p>부동산 샘플 (데모) · 070-8098-8054</p>
        <p className="mt-1">MintCL 웹 솔루션으로 구축 가능한 고객용 홈페이지 예시입니다.</p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-3 py-2 backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
          {MOBILE_NAV.map((item) => {
            const Icon = item.icon;
            return (
              <a key={item.label} href={item.href} className="flex h-11 flex-col items-center justify-center gap-0.5 rounded-md text-[11px] font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground">
                <Icon className="h-4 w-4" />
                {item.label}
              </a>
            );
          })}
        </div>
      </div>

      <ListingDetailModal
        listing={selected}
        tab={detailTab}
        onTab={setDetailTab}
        onClose={() => setSelected(null)}
        onInquiry={(listing) => {
          setSelected(null);
          openInquiry(listing);
          window.setTimeout(scrollToContact, 100);
        }}
      />
    </div>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
  compact = false,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  compact?: boolean;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-muted-foreground">{label}</p>
      <div className={cn("flex flex-wrap gap-1.5", compact && "max-h-20 overflow-auto pr-1")}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
              value === option ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground",
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function ListingCard({ listing, onOpen, onInquiry }: { listing: Listing; onOpen: () => void; onInquiry: () => void }) {
  const tags = getListingTags(listing);

  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
      <button type="button" onClick={onOpen} className="block w-full text-left">
        <div className="relative flex h-40 w-full items-center justify-center bg-secondary/50 text-6xl">
          {listing.image}
          <span className="absolute left-3 top-3 rounded bg-background/95 px-2 py-1 text-[11px] font-bold text-primary shadow-sm">{getDealType(listing.price)}</span>
          <span className="absolute right-3 top-3 rounded bg-foreground px-2 py-1 text-[11px] font-bold text-background">추천</span>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">{listing.type}</span>
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Star className="h-3 w-3 fill-primary text-primary" />
              {4.6 + (listing.id % 4) / 10}
            </span>
          </div>
          <h3 className="mt-3 line-clamp-1 text-base font-bold">{listing.title}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {listing.region}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-secondary px-2 py-1 text-[11px] font-medium text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground">전용면적 {getListingArea(listing)}</p>
              <p className="mt-1 text-lg font-extrabold">{listing.price}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </button>
      <div className="flex items-center gap-2 border-t border-border p-3">
        <Button variant="outline" size="sm" className="flex-1 font-semibold" onClick={onOpen}>
          상세
        </Button>
        <Button size="sm" className="flex-1 font-semibold" onClick={onInquiry}>
          문의
        </Button>
      </div>
    </article>
  );
}

function MapPanel({
  listings,
  selected,
  onOpen,
  onInquiry,
}: {
  listings: Listing[];
  selected: Listing | null;
  onOpen: (listing: Listing) => void;
  onInquiry: (listing: Listing) => void;
}) {
  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
      <MapSurface listings={listings.slice(0, 12)} onOpen={onOpen} selectedId={selected?.id} />
      <div className="max-h-[520px] overflow-auto rounded-xl border border-border bg-card p-3">
        <div className="mb-3 flex items-center justify-between px-1">
          <p className="text-sm font-bold">지도 주변 매물</p>
          <span className="text-xs text-muted-foreground">{listings.length}건</span>
        </div>
        <div className="space-y-2">
          {listings.map((listing) => (
            <article key={listing.id} className="rounded-lg border border-border bg-background p-3 transition-colors hover:border-primary/50">
              <button type="button" onClick={() => onOpen(listing)} className="w-full text-left">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-secondary text-2xl">{listing.image}</div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-bold">{listing.title}</p>
                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{listing.region}</p>
                    <p className="mt-1 text-sm font-extrabold">{listing.price}</p>
                  </div>
                </div>
              </button>
              <Button size="sm" variant="outline" className="mt-3 w-full font-semibold" onClick={() => onInquiry(listing)}>
                상담 문의
              </Button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function MapSurface({ listings, onOpen, selectedId }: { listings: Listing[]; onOpen: (listing: Listing) => void; selectedId?: number }) {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-xl border border-border bg-[#eef2ed] shadow-sm">
      <div className="absolute inset-0 opacity-80 [background-image:linear-gradient(rgba(20,60,50,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(20,60,50,0.08)_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="absolute left-0 top-1/3 h-16 w-full rotate-[-8deg] bg-background/70" />
      <div className="absolute left-1/4 top-0 h-full w-20 rotate-[18deg] bg-background/60" />
      <div className="absolute bottom-8 right-10 h-28 w-44 rounded-[48%] bg-primary/10" />
      <div className="absolute left-5 top-5 rounded-lg border border-border bg-background/95 px-3 py-2 shadow-sm">
        <p className="text-xs font-semibold text-muted-foreground">선택 조건 기준</p>
        <p className="mt-0.5 text-sm font-bold">매물 {listings.length}건</p>
      </div>
      {listings.map((listing, index) => {
        const point = getMapPoint(listing, index);
        return (
          <button
            key={listing.id}
            type="button"
            onClick={() => onOpen(listing)}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-background px-3 py-1 text-xs font-extrabold shadow-lg transition-transform hover:scale-105",
              selectedId === listing.id ? "border-primary text-primary" : "border-foreground/15 text-foreground",
            )}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          >
            {listing.type}
          </button>
        );
      })}
      <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-border bg-background/95 p-3 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-bold">
          <Route className="h-4 w-4 text-primary" />
          강남 · 마포 · 성남 · 용인 권역
        </div>
        <p className="mt-1 text-xs text-muted-foreground">마커를 선택하면 매물 상세가 열립니다.</p>
      </div>
    </div>
  );
}

function MoneyInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <div className="mt-2 flex items-center overflow-hidden rounded-md border border-border bg-background focus-within:border-primary">
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value.replace(/[^\d]/g, ""))}
          inputMode="numeric"
          className="h-11 border-0 focus-visible:ring-0"
        />
        <span className="px-3 text-sm font-semibold text-muted-foreground">만원</span>
      </div>
    </label>
  );
}

function ResultBlock({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      <p className={cn("mt-1 break-keep text-lg font-extrabold", strong && "text-primary")}>{value}</p>
    </div>
  );
}

function InquiryForm({
  name,
  phone,
  memo,
  target,
  onName,
  onPhone,
  onMemo,
  onSubmit,
}: {
  name: string;
  phone: string;
  memo: string;
  target: Listing | null;
  onName: (value: string) => void;
  onPhone: (value: string) => void;
  onMemo: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-background/15 bg-background p-5 text-foreground">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-primary">상담 문의</p>
          <h3 className="mt-1 text-xl font-bold">{target ? target.title : "맞춤 매물 상담"}</h3>
        </div>
        <MessageCircle className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Input value={name} onChange={(event) => onName(event.target.value)} placeholder="이름" className="h-11" />
        <Input value={phone} onChange={(event) => onPhone(event.target.value)} placeholder="연락처" className="h-11" />
      </div>
      <textarea
        value={memo}
        onChange={(event) => onMemo(event.target.value)}
        placeholder="희망 지역, 예산, 입주 시기"
        className="mt-3 min-h-28 w-full resize-none rounded-md border border-border bg-background px-3 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
      />
      <label className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        <input type="checkbox" required className="h-4 w-4 rounded border-border" />
        개인정보 수집·이용 동의
      </label>
      <Button type="submit" className="mt-4 h-11 w-full font-bold">
        상담문의 남기기
      </Button>
    </form>
  );
}

function ListingDetailModal({
  listing,
  tab,
  onTab,
  onClose,
  onInquiry,
}: {
  listing: Listing | null;
  tab: DetailTab;
  onTab: (tab: DetailTab) => void;
  onClose: () => void;
  onInquiry: (listing: Listing) => void;
}) {
  if (!listing) return null;

  const infoRows = [
    ["주소", listing.region],
    ["거래유형", getDealType(listing.price)],
    ["가격", listing.price],
    ["매물종류", listing.type],
    ["전용면적", getListingArea(listing)],
    ["담당자", listing.manager],
    ["등록일", listing.registeredAt],
    ["상태", listing.status],
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4" role="dialog" aria-modal="true">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-xl bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="text-xs font-semibold text-primary">매물 상세</p>
            <h2 className="mt-1 text-xl font-bold">{listing.title}</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-md border border-border px-3 py-1.5 text-sm font-semibold hover:bg-secondary">
            닫기
          </button>
        </div>
        <div className="max-h-[calc(92vh-73px)] overflow-auto">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="border-b border-border lg:border-b-0 lg:border-r">
              <div className="flex h-72 items-center justify-center bg-secondary/50 text-8xl">{listing.image}</div>
              <div className="flex gap-2 overflow-auto border-y border-border p-3">
                {[0, 1, 2, 3].map((item) => (
                  <div key={item} className="flex h-16 w-20 shrink-0 items-center justify-center rounded-md bg-secondary text-2xl">
                    {listing.image}
                  </div>
                ))}
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  {DETAIL_TABS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => onTab(item)}
                      className={cn("rounded-full border px-4 py-2 text-sm font-bold", tab === item ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground")}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <div className="mt-5">
                  {tab === "정보" && (
                    <dl className="grid gap-3 sm:grid-cols-2">
                      {infoRows.map(([label, value]) => (
                        <div key={label} className="rounded-lg border border-border p-3">
                          <dt className="text-xs text-muted-foreground">{label}</dt>
                          <dd className="mt-1 font-bold">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {tab === "설명" && (
                    <div className="space-y-3 text-sm leading-6 text-muted-foreground">
                      <p className="font-semibold text-foreground">{listing.title}</p>
                      <p>{listing.region} 핵심 생활권에 위치한 {listing.type} 매물입니다. 조건 확인 후 담당자가 방문 일정과 세부 내용을 안내합니다.</p>
                      <div className="flex flex-wrap gap-1.5">
                        {getListingTags(listing).map((tag) => (
                          <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {tab === "교통" && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      <InfoChip icon={Train} title="인근 지하철" text="도보권 주요 역세권 확인" />
                      <InfoChip icon={Route} title="버스 노선" text="간선·지선 노선 접근 가능" />
                    </div>
                  )}
                  {tab === "주변" && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {["편의점", "카페", "은행", "병원"].map((item) => (
                        <div key={item} className="rounded-lg border border-border p-3 text-sm font-semibold">
                          {item}
                          <p className="mt-1 text-xs font-normal text-muted-foreground">반경 생활 편의시설</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <aside className="p-5">
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm font-bold">매물 문의하기</p>
                <p className="mt-3 text-2xl font-extrabold">{listing.price}</p>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {listing.region}
                  </p>
                  <p className="flex items-center gap-2">
                    <Layers3 className="h-4 w-4 text-primary" />
                    {listing.type} · {getListingArea(listing)}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    070-8098-8054
                  </p>
                </div>
                <div className="mt-5 rounded-lg bg-secondary/60 p-3">
                  <p className="text-xs text-muted-foreground">담당자</p>
                  <p className="mt-1 font-bold">{listing.manager}</p>
                </div>
                <Button className="mt-4 h-11 w-full font-bold" onClick={() => onInquiry(listing)}>
                  이 매물 상담 문의
                </Button>
                <Button variant="outline" className="mt-2 h-11 w-full font-bold">
                  <Heart className="mr-2 h-4 w-4" />
                  관심매물
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoChip({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="rounded-lg border border-border p-3">
      <div className="flex items-center gap-2 text-sm font-bold">
        <Icon className="h-4 w-4 text-primary" />
        {title}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{text}</p>
    </div>
  );
}
