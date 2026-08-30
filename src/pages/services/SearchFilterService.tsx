import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Send, ArrowRight, ExternalLink, Search, Check, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CUSTOM_SERVICES } from "@/components/site/customServices";
import { RealEstateAdminProvider, useRealEstateAdmin } from "@/pages/solutions/real-estate-admin/store";
import { BrowserFrame, LazyIframePreview, Reveal, RevealScale, NextStepsSection } from "@/pages/services/previewKit";

const OTHER_SERVICES = CUSTOM_SERVICES.filter((s) => s.slug !== "search-filter");

const INDUSTRY_USES = [
  { label: "부동산", desc: "거래유형 · 가격대 · 지역을 조합해 매물을 찾습니다." },
  { label: "렌트카", desc: "차종 · 기간 · 지점을 조합해 차량을 찾습니다." },
  { label: "이커머스", desc: "가격대 · 브랜드 · 옵션을 조합해 상품을 찾습니다." },
];

function useConditionCounts() {
  const { listings } = useRealEstateAdmin();
  return [
    { condition: "조건 없음 — 전체 매물", count: listings.length },
    { condition: "매물종류: 아파트", count: listings.filter((l) => l.type === "아파트").length },
    { condition: "지역: 강남구", count: listings.filter((l) => l.region.includes("강남구")).length },
    {
      condition: "복수 조건: 강남구 + 공개 매물",
      count: listings.filter((l) => l.region.includes("강남구") && l.status === "공개").length,
    },
    { condition: "상태: 공개 매물만", count: listings.filter((l) => l.status === "공개").length },
  ];
}

/** 히어로의 조건→결과 숫자가 자동으로 순환한다. 실제 listings를 그 자리에서 필터링해 계산한다. */
function CyclingHeroCounter() {
  const rows = useConditionCounts();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => setIdx((v) => (v + 1) % rows.length), 2400);
    return () => window.clearInterval(id);
  }, [reducedMotion, rows.length]);

  const current = rows[idx];

  return (
    <div className="mx-auto mt-10 flex flex-col items-center" key={current.condition}>
      <p className="font-mono text-7xl font-bold tabular-nums text-primary motion-safe:animate-hero-text-fade sm:text-8xl">
        {current.count}
      </p>
      <p className="mt-3 max-w-xs text-sm text-muted-foreground break-keep motion-safe:animate-hero-text-fade">
        {current.condition}
      </p>
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
      {/* 히어로: 순환하는 큰 숫자 전환이 곧 비주얼 */}
      <div className="mx-auto max-w-3xl px-4 pb-4 pt-14 text-center sm:pt-20">
        <p className="mx-auto flex w-fit items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
          <Search className="h-3.5 w-3.5" />
          CUSTOM SERVICE — 검색 · 필터 기능
        </p>
        <h1 className="mx-auto mt-4 max-w-xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          조건을 좁힐수록, 원하는 결과만 남습니다
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground break-keep">
          매물, 상품, 차량처럼 목록이 많은 홈페이지에서 고객이 조건을 선택하면 결과가 그 자리에서
          바뀝니다. 아래 숫자는 조건 없음부터 복수 조건 조합까지, 실제 데모 데이터를 그대로
          계산한 결과입니다.
        </p>

        <CyclingHeroCounter />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="gap-2 font-bold">
            <Link to="/contact">
              <Send className="h-4 w-4" />
              구축 상담하기
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-1.5">
            <a href="/web-solutions/real-estate/demo/site#listings" target="_blank" rel="noopener noreferrer">
              실제 검색 직접 체험하기
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
          <Button asChild size="lg" variant="ghost" className="gap-1.5 text-primary hover:bg-primary/5">
            <Link to="/website/features">
              구현 가능한 기능 보기
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* 왜 필요한가 */}
      <Reveal className="border-y border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-2xl px-4">
          <p className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            조건은 어떻게 설계할까
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground break-keep">
            목록이 많을수록, 고객은 끝까지 넘겨보지 않습니다
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground break-keep">
            매물이나 상품이 수십, 수백 건이면 고객은 원하는 것을 찾다가 포기하기 쉽습니다. 실제로
            자주 찾는 기준(가격대, 지역, 종류)을 조건으로 만들어두면, 고객이 몇 번의 클릭만으로
            원하는 결과에 도달합니다.
          </p>
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-base font-medium text-foreground break-keep">
              조건은 업종마다 다릅니다. 실제 고객이 무엇을 기준으로 고르는지부터 함께 정리한 뒤
              필터를 설계합니다.
            </p>
          </div>
        </div>
      </Reveal>

      {/* 실제 라이브 검색 화면 (확대) */}
      <div className="py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <Reveal>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">실제 화면</p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold text-foreground">
              거래유형 · 가격대 · 매물종류를 조합해 검색합니다
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground break-keep">
              아래는 실제로 작동하는 고객용 검색 화면입니다. 조건 버튼을 조합할 때마다 결과 목록이
              실시간으로 바뀝니다.
            </p>
          </Reveal>
          <RevealScale delay={120} className="mt-8">
            <BrowserFrame label="고객 홈페이지 — 매물 검색" heightClassName="h-[520px] sm:h-[640px]">
              <LazyIframePreview
                src="/web-solutions/real-estate/demo/site#listings"
                scale={0.8}
                title="MintCL 고객용 검색 화면 데모"
              />
            </BrowserFrame>
          </RevealScale>

          <Reveal delay={240} className="mt-8 flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-6 py-5">
            <p className="text-base font-medium text-foreground break-keep">
              이 기능 외에 어떤 것까지 구현 가능한지 확인해보세요.
            </p>
            <Button asChild variant="outline" className="shrink-0 gap-1.5">
              <Link to="/website/features">
                전체 기능 보기
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>

      {/* 조건별 결과 변화 표 */}
      <div className="border-y border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-2xl px-4">
          <Reveal>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">조건별 결과</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">조건을 바꿀 때마다 이렇게 달라집니다</h2>
          </Reveal>
          <div className="mt-8 divide-y divide-border border-t border-border">
            {rows.map((r, i) => (
              <Reveal key={r.condition} delay={i * 60} className="flex items-center justify-between gap-4 py-4">
                <span className="text-base text-foreground">{r.condition}</span>
                <span className="font-mono text-lg font-bold tabular-nums text-foreground">{r.count}건</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* 업종별 활용 */}
      <div className="py-14 sm:py-20">
        <div className="mx-auto max-w-2xl px-4">
          <Reveal>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">업종별 활용</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">조건은 업종마다 다르게 설계합니다</h2>
          </Reveal>
          <div className="mt-8 divide-y divide-border border-t border-border">
            {INDUSTRY_USES.map((item, i) => (
              <Reveal key={item.label} delay={i * 60} className="py-4">
                <p className="text-base font-bold text-foreground">{item.label}</p>
                <p className="mt-1 text-sm text-muted-foreground break-keep">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* 이런 경우 추천합니다 */}
      <Reveal className="border-t border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-2xl px-4">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">이런 경우 추천합니다</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground">이런 상황에서 특히 필요합니다</h2>
          <div className="mt-8 space-y-4">
            {[
              "매물, 상품, 차량 등 목록형 콘텐츠가 20건 이상인 경우",
              "고객이 특정 조건(가격대, 지역, 종류)으로 자주 찾는 경우",
              "목록이 길어 스크롤만으로 원하는 것을 찾기 어려운 경우",
              "지도 기반으로 위치를 함께 보여줘야 하는 경우",
            ].map((text) => (
              <div key={text} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-base leading-relaxed text-foreground break-keep">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 다른 맞춤형 서비스 + 마무리 CTA (하나의 이어진 section) */}
      <NextStepsSection
        otherServices={OTHER_SERVICES}
        ctaTitle="필요한 검색 조건을 알려주세요."
        ctaDesc="업종에 맞는 조건과 필터 구성을 정리해 예상 비용을 안내드립니다."
      />
    </div>
  );
}
