import { Link } from "react-router-dom";
import { Building2, Search, MapPin, Settings, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";

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

export default function RealEstateSolution() {
  usePageTitle(
    "부동산 매물관리 웹 솔루션 — MintCL",
    "매물 등록, 검색, 지도, 관리자 기능을 갖춘 부동산 매물관리 웹 솔루션을 안내합니다.",
  );

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
