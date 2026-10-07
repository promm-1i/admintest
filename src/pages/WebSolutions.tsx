import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/FadeIn";
import { getPremiumCategories } from "@/lib/samples";
import { getDesignCode } from "@/lib/designCode";
import { LineComparison } from "@/components/site/LineComparison";

type Tier = {
  name: string;
  setupFee: string;
  tagline: string;
  recommended?: boolean;
};

/**
 * 맞춤형 구축비. 모든 구성이 반응형으로 제작되며, 구축비에 호스팅과
 * 셋팅비용, 도메인 1개(1년)가 모두 포함된다.
 *
 * 2026-09-21, 호스팅을 청구 항목에서 뺐다. 고객이 직접 하면 들지 않는 비용이라
 * 따로 받을 근거가 없다. 템플릿 라인과 같은 기준이다. 2년차부터 드는 것은
 * 도메인 갱신 연 3만원뿐이다.
 */
const TIERS: Tier[] = [
  {
    name: "브랜드 페이지",
    setupFee: "150만원",
    tagline: "디자인과 사진까지 새로 만드는 브랜드 사이트 — 서브페이지 확장 가능",
    recommended: true,
  },
  {
    name: "쇼핑몰",
    setupFee: "200만원~",
    tagline: "상품 등록부터 결제·회원까지 직접 판매하는 구성",
  },
  {
    name: "홈페이지 리뉴얼",
    setupFee: "별도 협의",
    tagline: "기존 홈페이지의 디자인과 구조를 현재 기준으로 개선",
  },
];

/** 구축비에 기본으로 포함되는 항목 */
const INCLUDED_IN_SETUP = [
  "반응형 제작 (PC · 태블릿 · 모바일)",
  "셋팅비용",
  "도메인 1개 (첫 1년 무료)",
];

/** 요금제 구분 없이 프리미엄 라인에 모두 들어가는 기능 */
const COMMON_FEATURES = [
  "관리자 페이지 (콘텐츠 · 데이터 관리)",
  "데이터베이스 연동",
  "검색 · 필터 기능",
  "문의 · 예약 접수 관리",
  "직원별 접근 권한 설정",
  "업종 맞춤 기능",
  "기본 SEO 세팅",
  "오픈 후 1개월 무상 수정",
];

/**
 * 프리미엄 디자인 진열 목록 — samples.ts의 premium 플래그 + 카테고리가 단일 출처다.
 * 헤더 "프리미엄 디자인" 플라이아웃과 같은 분류를 쓰며, 새 시안을 추가하면
 * samples.ts 한 곳만 고쳐도 헤더와 이 페이지가 함께 갱신된다.
 */
const PREMIUM_GROUPS = getPremiumCategories();

/**
 * 묶음이 15개로 늘어 한 줄 띠에서는 뒤쪽 칸이 화면 밖으로 밀렸다. 두 줄 격자로 놓고
 * 지금 보고 있는 묶음을 켜 준다. 누르면 그 묶음으로 넘어간다.
 * 열 수 = 묶음 수의 절반(올림). 넓은 화면에선 열이 폭을 나눠 갖고, 좁으면 두 줄 그대로 옆으로 민다.
 * 위에 붙는 높이는 머리글(1024 이상 110px, 그 아래 56px) 바로 밑.
 * 1280 이상은 두 줄 안에 다 들어가고, 그보다 좁으면 오른쪽 끝을 흐리게 해 옆에 더 있음을 알린다.
 */
function CategoryBar({ active }: { active: string }) {
  const cols = Math.ceil(PREMIUM_GROUPS.length / 2);
  const listRef = useRef<HTMLUListElement>(null);
  const [more, setMore] = useState(false);
  useEffect(() => {
    const ul = listRef.current;
    if (!ul) return;
    const update = () => setMore(ul.scrollLeft + ul.clientWidth < ul.scrollWidth - 2);
    update();
    ul.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      ul.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  // 켜진 칸이 가려져 있으면 보이게 옆으로 민다(좁은 화면)
  useEffect(() => {
    const ul = listRef.current;
    const el = ul?.querySelector<HTMLElement>("[aria-current]");
    if (!ul || !el || ul.scrollWidth <= ul.clientWidth) return;
    const l = el.offsetLeft - ul.offsetLeft;
    if (l < ul.scrollLeft || l + el.offsetWidth > ul.scrollLeft + ul.clientWidth) {
      ul.scrollTo({ left: Math.max(0, l - 16), behavior: "smooth" });
    }
  }, [active]);
  return (
    <nav
      aria-label="프리미엄 디자인 분류"
      data-cat-bar
      className="sticky top-14 z-30 -mx-4 mt-8 border-y border-border bg-background px-4 py-3 lg:top-[110px]"
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-background to-transparent transition-opacity duration-200",
          more ? "opacity-100" : "opacity-0",
        )}
      />
      <ul
        ref={listRef}
        className="grid gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(max-content, 1fr))` }}
      >
        {PREMIUM_GROUPS.map((group) => {
          const on = active === group.key;
          return (
            <li key={group.key}>
              <a
                href={`#cat-${group.key}`}
                aria-current={on ? "true" : undefined}
                className={cn(
                  "flex h-11 items-center justify-between gap-2 rounded-xl px-2.5 text-[15px] font-semibold tracking-tight whitespace-nowrap transition-colors duration-200 min-[1440px]:gap-3 min-[1440px]:px-4",
                  on
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                    : "bg-secondary/60 text-foreground/80 hover:bg-primary/10 hover:text-primary",
                )}
              >
                {group.label}
                <span
                  className={cn(
                    "min-w-6 rounded-full px-1.5 py-0.5 text-center text-xs font-bold tabular-nums",
                    on ? "bg-white/20 text-primary-foreground" : "bg-background text-muted-foreground",
                  )}
                >
                  {group.items.length}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** 화면 위쪽(머리글 + 분류 칸 바로 아래)에 걸린 묶음을 현재 분류로 본다 */
function useActiveCategory() {
  const [active, setActive] = useState(PREMIUM_GROUPS[0]?.key ?? "");
  useEffect(() => {
    const sections = PREMIUM_GROUPS
      .map((g) => document.getElementById(`cat-${g.key}`))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const bar = document.querySelector<HTMLElement>("[data-cat-bar]");
    const barBottom = bar ? parseFloat(getComputedStyle(bar).top) + bar.offsetHeight : 120;
    // 콜백에는 이번에 바뀐 묶음만 온다. 멀리 건너뛰면 지나친 묶음이 마지막에 남으므로
    // 지금 걸려 있는 묶음 전체를 들고 있다가 그중 맨 위(문서 순서 첫째)를 켠다.
    const inZone = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? inZone.add(e.target) : inZone.delete(e.target)));
        const shown = sections.find((el) => inZone.has(el));
        if (shown) setActive(shown.id.replace("cat-", ""));
      },
      { rootMargin: `-${Math.round(barBottom) + 8}px 0px -55% 0px`, threshold: 0 },
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export default function WebSolutions() {
  usePageTitle(
    "프리미엄 디자인 홈페이지 제작 — NOVERIQ",
    "프리미엄 등급 디자인을 기반으로 관리자 시스템과 업종 기능까지 갖춰 제작하는 프리미엄 라인의 범위와 요금을 안내합니다.",
  );

  const activeCategory = useActiveCategory();

  // 헤더에서 ?cat=<key> 로 들어오면 해당 카테고리로 스크롤한다.
  const [params] = useSearchParams();
  const cat = params.get("cat");
  useEffect(() => {
    if (!cat) return;
    const el = document.getElementById(`cat-${cat}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [cat]);

  return (
    <div className="mx-auto max-w-7xl px-3 py-14 sm:px-5">
      <div className="flex items-center gap-2">
        <span className="rounded-full border border-primary/40 bg-primary/[0.07] px-3 py-1 text-[11px] font-bold tracking-wide text-primary">
          PREMIUM LINE
        </span>
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground">
          PREMIUM DESIGN
        </p>
      </div>
      <h1 className="mt-4 text-3xl font-semibold break-keep">
        프리미엄 디자인 홈페이지 제작
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
        프리미엄 등급 시안을 출발점으로 섹션 구성부터 브랜드에 맞춰
        다시 잡는 라인입니다. 사진도 브랜드에 맞춰 새로 제작하고, 관리자는 사장님 사업 데이터에 맞춰
        설계합니다. 정확한 기능 구성과 견적은 상담 후 확정됩니다.
      </p>

      {/* 템플릿형과의 차이 */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <FadeIn direction="left">
        <div className="h-full rounded-2xl border border-border bg-secondary/30 p-5">
          <p className="text-xs font-bold text-muted-foreground">템플릿 라인</p>
          <p className="mt-1.5 text-sm font-semibold text-foreground">완성된 화면을 고릅니다</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground break-keep">
            이미 만들어 둔 화면에 문구·사진만 바꿔 빠르고 합리적으로 시작합니다. 관리자 모드와
            데이터베이스, 반응형 제작도 여기에 기본으로 들어갑니다.
          </p>
          <Link
            to="/templates"
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            템플릿 보기 · 64만원부터
          </Link>
        </div>
        </FadeIn>
        <FadeIn direction="right" delay={100}>
        <div className="h-full rounded-2xl border border-primary/40 bg-primary/[0.04] p-5">
          <p className="text-xs font-bold text-primary">프리미엄 라인</p>
          <p className="mt-1.5 text-sm font-semibold text-foreground">브랜드에 맞춰 짓습니다</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground break-keep">
            같은 기능 위에서, 섹션 구성과 브랜드 색·글꼴을 다시 잡고 사진을 새로 제작합니다. 조건
            검색과 직원별 권한, 예약 접수 관리가 값에 포함됩니다.
          </p>
          <p className="mt-3 text-xs font-semibold text-primary">150만원부터</p>
        </div>
        </FadeIn>
      </div>

      {/* 프리미엄 디자인 — 최근 제작한 디자인부터, 별도 가격 정책(150만원부터) */}
      <div className="mt-14 flex flex-wrap items-end justify-between gap-3">
        <FadeIn>
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
            PREMIUM DESIGN
          </p>
          <h2 className="mt-2 text-xl font-semibold">프리미엄 디자인</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground break-keep">
            최근 제작한 프리미엄 등급 디자인입니다. 이 디자인을 기반으로 문구 · 이미지 · 구성을
            맞춰 제작하며,
            <br />
            <strong className="text-foreground">150만원부터</strong> 시작합니다
            <span className="text-xs"> (부가세 별도)</span>.
          </p>
        </FadeIn>
      </div>

      {/* 카테고리별 진열 — 헤더 플라이아웃(홈페이지 템플릿 → 프리미엄 디자인)과 같은 분류를 쓴다.
          ?cat=<key> 로 들어오면 해당 묶음으로 스크롤된다. */}
      <CategoryBar active={activeCategory} />
      {PREMIUM_GROUPS.map((group, gi) => (
        <section
          key={group.key}
          id={`cat-${group.key}`}
          className={cn(gi === 0 ? "mt-8" : "mt-10", "scroll-mt-48 lg:scroll-mt-[250px]")}
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-border pb-2">
            <h3 className="text-sm font-bold text-foreground">{group.label}</h3>
            <p className="text-xs text-muted-foreground break-keep">{group.desc}</p>
            <span className="ml-auto shrink-0 text-xs text-muted-foreground">{group.items.length}종</span>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {group.items.map((d, idx) => (
              <FadeIn key={d.href} delay={(idx % 4) * 70}>
                <Link
                  to={d.href}
                  className="group block overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 motion-safe:hover:-translate-y-1"
                >
                  <div className="overflow-hidden">
                    <img
                      src={d.sample.image}
                      alt={`${d.label} 프리미엄 디자인`}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 px-4 py-3">
                    <span className="truncate text-sm font-semibold text-foreground group-hover:text-primary">
                      {d.label}
                    </span>
                    <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                      {getDesignCode(d.sample)}
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      ))}

      <p className="mt-14 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
        PRICING
      </p>
      <h2 className="mt-2 text-xl font-semibold">프리미엄 라인 구축 비용</h2>
      <p className="mt-2 text-sm text-muted-foreground break-keep">
        구축비에 셋팅비용과 도메인 1개(1년)가 모두 포함됩니다. 아래 금액 외에 오픈까지
        더 드는 비용은 없습니다.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {TIERS.map((tier, idx) => (
          <FadeIn key={tier.name} delay={idx * 90} className="h-full">
          <div
            className={cn(
              "relative flex h-full flex-col justify-between rounded-2xl border bg-card p-6 transition-all duration-300 motion-safe:hover:-translate-y-1.5 hover:shadow-lg hover:shadow-primary/10 motion-reduce:transition-none",
              tier.recommended ? "border-primary/60 shadow-md shadow-primary/10" : "border-border shadow-xs hover:border-primary/40",
            )}
          >
            <div>
              {tier.recommended && (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
                  추천
                </span>
              )}
              <p className="text-sm font-semibold text-muted-foreground">{tier.name}</p>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                  {tier.setupFee}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">구축비 · 부가세 별도</p>
              <p className="mt-4 text-sm leading-relaxed text-foreground break-keep">{tier.tagline}</p>
            </div>

            <Button
              asChild
              variant={tier.recommended ? "default" : "outline"}
              className="mt-6 w-full font-bold shadow-xs"
            >
              <Link to="/contact" className="inline-flex items-center justify-center gap-1.5">
                <Send className="h-3.5 w-3.5" />
                상담하기
              </Link>
            </Button>
          </div>
          </FadeIn>
        ))}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <FadeIn>
        <div className="h-full rounded-2xl border border-border bg-secondary/30 p-6">
          <p className="mb-3 text-sm font-bold text-foreground">구축비에 포함되는 것</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {INCLUDED_IN_SETUP.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="break-keep">{f}</span>
              </li>
            ))}
          </ul>
        </div>
        </FadeIn>
        <FadeIn delay={100}>
        <div className="h-full rounded-2xl border border-border bg-card p-6">
          <p className="mb-3 text-sm font-bold text-foreground">2년차부터 운영 비용</p>
          <p className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold tracking-tight text-primary">연 3만원</span>
            <span className="text-xs text-muted-foreground">부가세 별도</span>
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>도메인 갱신 연 3만원</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>호스팅료는 따로 받지 않습니다</span>
            </li>
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80 break-keep">
            오픈 후 1개월은 무상 수정입니다. 이후 유지보수는 월 3만원 계약(간단 수정 월 3회) 또는
            건별 협의로 진행하며, 위 금액과 별개입니다.
          </p>
        </div>
        </FadeIn>
      </div>

      {/* 150만원을 본 직후 "템플릿 114만과 뭐가 다른가"에 스스로 답하게 하는 자리 */}
      <div className="mt-16">
        <LineComparison />
      </div>

      <h3 className="mt-16 text-base font-semibold">프리미엄 라인에 모두 포함되는 기능</h3>
      <FadeIn>
      <ul className="mt-4 grid gap-2.5 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2">
        {COMMON_FEATURES.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-foreground">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            <span className="break-keep">{f}</span>
          </li>
        ))}
      </ul>
      </FadeIn>

      <p className="mt-4 text-xs text-muted-foreground">
        ※ 표시 금액은 부가세 별도이며, 정확한 견적은 필요한 기능과 데이터 규모에 따라 상담 후
        확정됩니다.
      </p>

      <FadeIn>
      <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
        <p className="text-sm text-muted-foreground">필요한 기능에 맞춘 맞춤 상담을 도와드립니다.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link to="/contact">구축 문의하기</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/web-solutions/demos">데모 보기</Link>
          </Button>
        </div>
      </div>
      </FadeIn>
    </div>
  );
}
