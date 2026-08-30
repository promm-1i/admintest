import { Link } from "react-router-dom";
import { Send, ArrowRight, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { CUSTOM_SERVICES } from "@/components/site/customServices";
import { RealEstateAdminProvider, useRealEstateAdmin } from "@/pages/solutions/real-estate-admin/store";
import { BrowserFrame, LazyIframePreview } from "@/pages/services/previewKit";

const OTHER_SERVICES = CUSTOM_SERVICES.filter((s) => s.slug !== "search-filter");

function useConditionCounts() {
  const { listings } = useRealEstateAdmin();
  return [
    { condition: "조건 없음 — 전체 매물", count: listings.length },
    { condition: "매물종류: 아파트", count: listings.filter((l) => l.type === "아파트").length },
    { condition: "지역: 강남구", count: listings.filter((l) => l.region.includes("강남구")).length },
    { condition: "상태: 공개 매물만", count: listings.filter((l) => l.status === "공개").length },
  ];
}

/** 히어로에 쓰는 큰 조건→결과 숫자 전환. 실제 listings 데이터를 그 자리에서 필터링해 계산한다. */
function HeroCounter() {
  const rows = useConditionCounts();
  const before = rows[0];
  const after = rows[2];
  return (
    <div className="mx-auto mt-10 flex max-w-lg items-center justify-center gap-6 sm:gap-10">
      <div className="text-center">
        <p className="font-mono text-6xl font-bold tabular-nums text-foreground sm:text-7xl">{before.count}</p>
        <p className="mt-2 text-xs text-muted-foreground break-keep">{before.condition}</p>
      </div>
      <ArrowRight className="h-6 w-6 shrink-0 text-primary" />
      <div className="text-center">
        <p className="font-mono text-6xl font-bold tabular-nums text-primary sm:text-7xl">{after.count}</p>
        <p className="mt-2 text-xs text-muted-foreground break-keep">{after.condition}</p>
      </div>
    </div>
  );
}

export default function SearchFilterService() {
  usePageTitle(
    "검색 · 필터 기능 — MintCL",
    "조건을 선택하면 결과가 실시간으로 좁혀지는 검색·필터 기능을 실제 데모 데이터로 확인하세요.",
  );

  return (
    <RealEstateAdminProvider>
      <SearchFilterContent />
    </RealEstateAdminProvider>
  );
}

function SearchFilterContent() {
  const rows = useConditionCounts();

  return (
    <div>
      {/* 히어로: 큰 숫자 전환이 곧 비주얼 */}
      <div className="mx-auto max-w-3xl px-4 pb-4 pt-14 text-center sm:pt-20">
        <p className="mx-auto flex w-fit items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
          <Search className="h-3.5 w-3.5" />
          CUSTOM SERVICE — 검색 · 필터 기능
        </p>
        <h1 className="mx-auto mt-4 max-w-xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          조건을 좁힐수록, 원하는 결과만 남습니다
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground break-keep">
          매물, 상품, 차량처럼 목록이 많은 홈페이지에서 고객이 조건을 선택하면 결과가 그 자리에서
          바뀝니다. 아래 숫자는 실제 부동산 데모 데이터를 조건별로 계산한 결과입니다.
        </p>

        <HeroCounter />

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="gap-2 font-bold">
            <Link to="/contact">
              <Send className="h-4 w-4" />
              구축 상담하기
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-1.5">
            <a href="/web-solutions/real-estate/demo/site#listings" target="_blank" rel="noopener noreferrer">
              직접 조건 선택해보기
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>

      {/* 실제 라이브 검색 화면 */}
      <div className="border-y border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">실제 화면</p>
          <h2 className="mt-3 max-w-xl text-2xl font-bold text-foreground">
            거래유형 · 가격대 · 매물종류를 조합해 검색합니다
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground break-keep">
            아래는 실제로 작동하는 고객용 검색 화면입니다. 조건 버튼을 조합할 때마다 결과 목록이
            실시간으로 바뀝니다.
          </p>
          <div className="mt-8">
            <BrowserFrame label="고객 홈페이지 — 매물 검색" heightClassName="h-[420px] sm:h-[520px]">
              <LazyIframePreview
                src="/web-solutions/real-estate/demo/site#listings"
                scale={0.62}
                title="MintCL 고객용 검색 화면 데모"
              />
            </BrowserFrame>
          </div>
        </div>
      </div>

      {/* 조건별 결과 변화 표 */}
      <div className="mx-auto max-w-2xl px-4 py-14 sm:py-20">
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">조건별 결과</p>
        <h2 className="mt-3 text-2xl font-bold text-foreground">조건 하나를 바꿀 때마다 이렇게 달라집니다</h2>
        <div className="mt-8 divide-y divide-border border-t border-border">
          {rows.map((r) => (
            <div key={r.condition} className="flex items-center justify-between gap-4 py-4">
              <span className="text-sm text-foreground">{r.condition}</span>
              <span className="font-mono text-lg font-bold tabular-nums text-foreground">{r.count}건</span>
            </div>
          ))}
        </div>
      </div>

      {/* 다른 맞춤형 서비스 */}
      <div className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">다른 맞춤형 서비스</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {OTHER_SERVICES.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {s.navLabel}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 마무리 CTA */}
      <div className="py-14 text-center">
        <div className="mx-auto max-w-md px-4">
          <p className="text-base font-bold text-foreground break-keep">필요한 검색 조건을 알려주세요.</p>
          <p className="mt-2 text-sm text-muted-foreground break-keep">
            업종에 맞는 조건과 필터 구성을 정리해 예상 비용을 안내드립니다.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button asChild className="gap-2 font-bold">
              <Link to="/contact">
                <Send className="h-4 w-4" />
                구축 상담하기
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-1.5">
              <Link to="/website/features">
                전체 기능 소개 보기
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
