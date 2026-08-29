import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Search, MapPin, Settings, Send, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { cn } from "@/lib/utils";

const FEATURE_CHIPS = [
  { icon: Building2, label: "매물 등록" },
  { icon: Search, label: "검색" },
  { icon: MapPin, label: "지도" },
  { icon: Settings, label: "관리자" },
];

type ViewTab = "site" | "admin";

const VIEW_TABS: { key: ViewTab; label: string; src: string; urlLabel: string }[] = [
  {
    key: "site",
    label: "고객 화면",
    src: "/web-solutions/real-estate/demo/site",
    urlLabel: "mintcl-realestate-demo.co.kr",
  },
  {
    key: "admin",
    label: "관리자 화면",
    src: "/web-solutions/real-estate/demo",
    urlLabel: "mintcl-realestate-demo.co.kr/admin",
  },
];

export default function RealEstateSolution() {
  usePageTitle(
    "부동산 맞춤형 홈페이지 — MintCL",
    "매물 등록, 검색, 지도, 관리자 기능을 갖춘 부동산 업종 맞춤형 홈페이지를 안내합니다.",
  );

  const [tab, setTab] = useState<ViewTab>("site");
  const activeView = VIEW_TABS.find((t) => t.key === tab)!;

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
        CUSTOM BY INDUSTRY
      </p>
      <h1 className="mt-3 text-3xl font-semibold">부동산 맞춤형 홈페이지</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
        매물을 등록하고 지도와 조건별 검색으로 고객이 원하는 매물을 쉽게 찾을 수 있는 부동산
        업종 맞춤형 홈페이지입니다. 부동산 중개업소, 분양·임대 사무실에 적합합니다.
      </p>

      <h2 className="mt-14 text-xl font-semibold">부동산 업종에 알맞는 전용 화면</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
        부동산 중개업에 특화된 기능을 페이지를 벗어나지 않고 바로 체험해보세요.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {FEATURE_CHIPS.map((f) => {
          const Icon = f.icon;
          return (
            <span
              key={f.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground"
            >
              <Icon className="h-3.5 w-3.5" />
              {f.label}
            </span>
          );
        })}
      </div>

      <div className="mt-6 inline-flex rounded-lg border border-border bg-secondary/40 p-1">
        {VIEW_TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-semibold transition-colors",
              tab === t.key ? "bg-background text-foreground shadow-sm" : "text-muted-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-[1.75rem] border-[10px] border-foreground bg-foreground p-1.5 shadow-xl">
        <div className="overflow-hidden rounded-xl bg-background">
          <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-2.5">
            <span className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
            </span>
            <span className="ml-1 truncate rounded bg-background px-2 py-0.5 text-[11px] text-muted-foreground">
              {activeView.urlLabel}
            </span>
          </div>
          <iframe
            key={activeView.src}
            src={activeView.src}
            title="부동산 맞춤형 홈페이지 데모 미리보기"
            className="h-[620px] w-full border-0"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button asChild className="gap-1.5 font-bold">
          <a href="/web-solutions/real-estate/demo" target="_blank" rel="noopener noreferrer">
            데모 열기
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
        <p className="text-sm text-muted-foreground">
          구축비와 월 이용료 등 자세한 요금은 업종별 맞춤 홈페이지 요금 페이지에서 확인하실 수 있습니다.
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
