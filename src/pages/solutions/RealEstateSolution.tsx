import { Link } from "react-router-dom";
import { Building2, Search, MapPin, Settings, Send, LayoutDashboard, ExternalLink } from "lucide-react";
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
    "부동산 맞춤형 홈페이지 — MintCL",
    "매물 등록, 검색, 지도, 관리자 기능을 갖춘 부동산 업종 맞춤형 홈페이지를 안내합니다.",
  );

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
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
        매물, 고객·문의, 일정, 직원 권한, 게시판까지 — 실제 관리자 페이지와 동일한 방식으로
        체험해볼 수 있는 데모를 새 창에서 열어드립니다. 이 데모의 데이터는 저장되지 않으며,
        지도 등 외부 서비스 연동이 필요한 기능은 실제 구축 시 연결됩니다.
      </p>

      <div className="mt-6 flex flex-col items-start gap-5 rounded-2xl border border-border bg-secondary/40 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">관리자 데모 새 창에서 열기</p>
            <p className="mt-1 text-xs text-muted-foreground break-keep">
              매물·고객·일정·직원·게시판 관리를 실제 관리자 화면처럼 체험해보세요.
            </p>
          </div>
        </div>
        <Button asChild className="shrink-0 gap-1.5 font-bold">
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
