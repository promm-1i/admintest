import { useEffect, useRef, useState } from "react";
import {
  Phone,
  MapPin,
  ArrowRight,
  Star,
  ShieldCheck,
  Search,
  Handshake,
  ChevronDown,
  Quote,
} from "lucide-react";
import { Reveal, RevealScale, useLazyMount } from "@/pages/services/previewKit";
import { FadeIn } from "@/components/ui/FadeIn";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import houseModern from "@/assets/images/re_house_modern.jpg";
import villaPool from "@/assets/images/re_villa_pool.jpg";
import officeTower from "@/assets/images/re_office_tower.jpg";
import living01 from "@/assets/images/re_living_01.jpg";
import living02 from "@/assets/images/re_living_02.jpg";
import living03 from "@/assets/images/re_living_03.jpg";
import retail from "@/assets/images/re_retail.jpg";
import studio from "@/assets/images/re_studio.jpg";
import { RealEstateMapSearch } from "@/components/samples/RealEstateMapSearch";

const STATS = [
  { to: 20, suffix: "년", label: "지역 중개 경력" },
  { to: 1200, suffix: "건+", label: "누적 거래 성사" },
  { to: 98, suffix: "%", label: "재상담 고객 비율" },
  { to: 4.9, suffix: "", label: "고객 평균 만족도", decimals: 1 },
];

const LISTINGS = [
  {
    img: villaPool,
    deal: "매매",
    title: "청담동 프라이빗 타운하우스",
    price: "24억 8,000",
    specs: "전용 168㎡ · 복층 · 주차 2대",
    tags: ["단지 내 정원", "청담역 10분"],
  },
  {
    img: living01,
    deal: "매매",
    title: "역삼동 센트럴파크 32평",
    price: "9억 5,000",
    specs: "전용 84.9㎡ · 12/25층 · 남향",
    tags: ["역삼역 5분", "즉시 입주"],
  },
  {
    img: officeTower,
    deal: "임대",
    title: "삼성동 프라임 오피스",
    price: "보증 3억 / 월 1,850",
    specs: "전용 331㎡ · 14층 · 전면 통창",
    tags: ["삼성역 직결", "무권리"],
  },
  {
    img: living02,
    deal: "전세",
    title: "삼성동 아이파크 24평",
    price: "6억 2,000",
    specs: "전용 59.8㎡ · 8/20층 · 남동향",
    tags: ["삼성역 8분", "올수리"],
  },
  {
    img: studio,
    deal: "월세",
    title: "논현동 리버스텔 오피스텔",
    price: "3,000 / 월 130",
    specs: "전용 33.1㎡ · 11/15층 · 풀옵션",
    tags: ["논현역 3분", "관리비 8만"],
  },
  {
    img: retail,
    deal: "임대",
    title: "신사동 가로수길 1층 상가",
    price: "1억 / 월 550",
    specs: "전용 49.5㎡ · 1/5층 · 권리금 협의",
    tags: ["가로수길 메인", "유동인구"],
  },
];

const REASONS = [
  {
    icon: ShieldCheck,
    title: "계약 전 권리관계 전수 확인",
    desc: "등기부등본, 건축물대장, 근저당 설정까지 직접 열람해 확인한 내용을 서면으로 정리해 드립니다.",
  },
  {
    icon: Search,
    title: "실거래가 기반 적정가 분석",
    desc: "최근 6개월 동일 단지 실거래 데이터를 근거로 지금 이 가격이 적정한지 숫자로 설명드립니다.",
  },
  {
    icon: Handshake,
    title: "잔금·등기까지 동행",
    desc: "계약이 끝이 아닙니다. 잔금 지급과 소유권 이전 등기 완료까지 담당 중개사가 함께합니다.",
  },
];

const STEPS = [
  { no: "01", title: "상담 신청", desc: "예산과 조건을 남겨 주시면 24시간 내 연락드립니다." },
  { no: "02", title: "맞춤 매물 선별", desc: "조건에 맞는 매물만 3~5건으로 압축해 제안합니다." },
  { no: "03", title: "현장 임장 동행", desc: "채광, 소음, 주변 인프라까지 함께 확인합니다." },
  { no: "04", title: "계약·잔금 완료", desc: "권리 분석과 등기까지 안전하게 마무리합니다." },
];

const CASES = [
  {
    img: living02,
    tag: "매매 · 역삼동",
    title: "3주 만에 희망가로 매도 완료",
    desc: "장기간 거래가 없던 매물을 실거래가 분석으로 가격을 재조정해 3주 만에 계약까지 진행했습니다.",
  },
  {
    img: living03,
    tag: "전세 · 삼성동",
    title: "보증금 전액 안전 회수",
    desc: "선순위 근저당이 있던 물건에서 전세권 설정과 특약으로 보증금 리스크를 제거했습니다.",
  },
  {
    img: retail,
    tag: "상가 임대 · 신사동",
    title: "권리금 4,000만원 절감",
    desc: "인근 상권 임대 시세를 근거로 협상해 초기 제시 권리금에서 4,000만원을 낮췄습니다.",
  },
];

const REVIEWS = [
  {
    name: "역삼동 아파트 매수",
    text: "처음 매매하는 거라 걱정이 많았는데, 서류부터 시세 분석까지 꼼꼼하게 챙겨주셔서 안심하고 계약할 수 있었습니다.",
  },
  {
    name: "삼성동 전세 계약",
    text: "근저당이 있어서 망설였는데 위험 요소를 하나씩 설명해 주시고 특약까지 넣어주셔서 믿고 진행했어요.",
  },
  {
    name: "신사동 상가 임대",
    text: "권리금 협상까지 대신 해주셔서 예산 안에서 원하던 자리를 구했습니다. 상권 분석 자료가 특히 도움됐어요.",
  },
];

const FAQS = [
  {
    q: "방문 전에 미리 매물을 볼 수 있나요?",
    a: "상담 신청 시 조건에 맞는 매물 사진과 상세 정보를 먼저 보내드립니다. 관심 있는 매물만 골라 방문 일정을 잡으시면 됩니다.",
  },
  {
    q: "중개보수는 어떻게 산정되나요?",
    a: "서울시 주택 중개보수 상한 요율 기준으로 산정하며, 계약 전에 예상 금액을 서면으로 안내해 드립니다. 별도의 추가 비용은 없습니다.",
  },
  {
    q: "타 지역 매물도 중개가 가능한가요?",
    a: "역삼·삼성·논현 일대를 주력으로 하지만, 강남구 전역과 서초 일부 지역까지 중개가 가능합니다. 먼저 문의 주세요.",
  },
];

/** 숫자가 뷰포트에 들어올 때 0부터 목표값까지 카운트업된다. prefers-reduced-motion에서는 즉시 최종값. */
function Counter({ to, suffix, decimals = 0 }: { to: number; suffix: string; decimals?: number }) {
  // threshold 기반 IntersectionObserver는 요소 폭이 0으로 잡히는 환경(미리보기 프레임 등)에서
  // 영영 트리거되지 않는다. 프로젝트 전반에서 안정적으로 쓰는 rootMargin 방식을 그대로 쓴다.
  const { ref, shouldLoad } = useLazyMount<HTMLParagraphElement>();
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [value, setValue] = useState(0);
  const [fallback, setFallback] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  // 안전장치: 관찰자가 어떤 이유로든 트리거되지 않아도(프레임 안 렌더링, 0 크기 뷰포트 등)
  // 사용자가 "0"에 멈춘 숫자를 보는 일이 없도록 일정 시간 뒤에는 무조건 카운트를 시작한다.
  useEffect(() => {
    const id = window.setTimeout(() => setFallback(true), 2500);
    return () => window.clearTimeout(id);
  }, []);

  const isInView = shouldLoad || fallback;

  useEffect(() => {
    if (!isInView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    // requestAnimationFrame 대신 타이머로 보간한다 — 백그라운드 탭처럼 rAF가 멈추는 환경에서도
    // 숫자가 0에 멈춰 있지 않고 끝까지 올라간다(1.4초 one-shot이라 rAF의 이점이 필요 없다).
    const duration = 1400;
    const start = performance.now();
    const id = window.setInterval(() => {
      const p = Math.min(1, (performance.now() - start) / duration);
      // ease-out cubic — 끝으로 갈수록 감속
      setValue(to * (1 - Math.pow(1 - p, 3)));
      if (p >= 1) window.clearInterval(id);
    }, 16);
    timerRef.current = id;
    return () => window.clearInterval(id);
  }, [isInView, reduced, to]);

  return (
    <p ref={ref} className="text-3xl font-extrabold tracking-tight text-amber-400 sm:text-4xl">
      {value.toLocaleString("ko-KR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </p>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm font-semibold text-white">{q}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-amber-400 transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <p className="overflow-hidden text-xs leading-relaxed text-white/60">{a}</p>
      </div>
    </div>
  );
}

/** 부동산 중개업소 홈페이지 — 랜딩형 템플릿: 스크롤 연출과 인터랙션이 들어간 전환 중심 구성. */
export function RealEstateLandingPreview() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 font-sans text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-neutral-950/85 px-6 py-4 backdrop-blur">
        <div>
          <p className="text-lg font-bold tracking-tight">
            마루<span className="text-amber-400">부동산</span>
          </p>
          <p className="text-[9px] tracking-[0.25em] text-white/35">MARU REAL ESTATE</p>
        </div>
        <nav className="hidden gap-7 text-xs font-medium text-white/55 lg:flex">
          {["대표 매물", "우리의 차별점", "거래 절차", "고객 후기"].map((n) => (
            <span key={n} className="cursor-default transition-colors hover:text-white">
              {n}
            </span>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-full bg-amber-400 px-4 py-2 text-xs font-bold text-neutral-950 transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          매물 상담 신청
        </a>
      </header>

      {/* Hero */}
      <section className="relative">
        <img src={houseModern} alt="" className="h-[420px] w-full object-cover sm:h-[520px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/75 via-neutral-950/60 to-neutral-950" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="motion-safe:animate-[hero-text-fade_600ms_ease-out_both] text-[11px] font-semibold tracking-[0.28em] text-amber-400">
            GANGNAM REAL ESTATE
          </p>
          <h1
            className="mt-4 max-w-lg text-3xl font-bold leading-tight motion-safe:animate-[hero-text-fade_700ms_ease-out_150ms_both] sm:text-[2.6rem]"
            style={{ textWrap: "balance" }}
          >
            당신의 다음 공간을
            <br />
            가장 정확하게 찾아드립니다
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65 motion-safe:animate-[hero-text-fade_700ms_ease-out_300ms_both]">
            20년 경력 공인중개사가 매매·전세·월세부터 상가 투자까지, 권리관계와 실거래가를 직접 검증한
            매물만 안내합니다.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 motion-safe:animate-[hero-text-fade_700ms_ease-out_450ms_both]">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-7 py-3.5 text-sm font-bold text-neutral-950 shadow-lg shadow-amber-400/20 transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              지금 매물 상담받기
              <ArrowRight className="h-4 w-4 motion-safe:animate-[bounce-x_1.2s_ease-in-out_infinite]" />
            </a>
            <a
              href="#listings"
              className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white/85 transition-colors hover:border-white/60 hover:text-white"
            >
              대표 매물 둘러보기
            </a>
          </div>
        </div>
      </section>

      {/* 신뢰 지표 */}
      <div className="border-y border-white/10 bg-neutral-900/60 px-6 py-10">
        <dl className="mx-auto grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <FadeIn key={s.label} direction="up" delay={i * 90} className="text-center">
              <Counter to={s.to} suffix={s.suffix} decimals={s.decimals ?? 0} />
              <dd className="mt-1.5 text-[11px] text-white/45">{s.label}</dd>
            </FadeIn>
          ))}
        </dl>
      </div>

      {/* 대표 매물 */}
      <section id="listings" className="px-6 py-20">
        <Reveal className="text-center">
          <p className="text-[11px] font-semibold tracking-widest text-amber-400">CURATED LISTINGS</p>
          <h2 className="mt-2.5 text-2xl font-bold sm:text-3xl">지금 확인 가능한 대표 매물</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/55">
            직접 방문해 상태를 확인하고, 권리관계까지 검증을 마친 매물만 올립니다. 현재 공개 매물{" "}
            <span className="font-bold text-amber-400">128건</span>
          </p>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LISTINGS.map((item, i) => (
            <RevealScale key={item.title} delay={(i % 3) * 110}>
              <article className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/40 hover:shadow-xl hover:shadow-amber-400/10">
                <div className="relative overflow-hidden">
                  <img
                    src={item.img}
                    alt=""
                    className="h-40 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-bold text-neutral-950">
                    {item.deal}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-bold">{item.title}</h3>
                  <p className="mt-1.5 text-xl font-extrabold text-amber-400">{item.price}</p>
                  <p className="mt-1.5 text-[11px] text-white/45">{item.specs}</p>
                  <ul className="mt-3.5 flex flex-wrap gap-1.5 border-t border-white/10 pt-3.5">
                    {item.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full bg-white/[0.07] px-2 py-0.5 text-[10px] text-white/60"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </RevealScale>
          ))}
        </div>
      </section>

      {/* 지도 기반 매물 탐색 */}
      <section className="border-t border-white/10 bg-neutral-900/40 px-6 py-20">
        <Reveal className="text-center">
          <p className="text-[11px] font-semibold tracking-widest text-amber-400">MAP SEARCH</p>
          <h2 className="mt-2.5 text-2xl font-bold sm:text-3xl">지도에서 바로 확인하세요</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/55">
            원하는 동네를 움직이면 그 지역의 공개 매물과 시세가 실시간으로 표시됩니다.
          </p>
        </Reveal>
        <RevealScale delay={120} className="mx-auto mt-10 max-w-5xl">
          <RealEstateMapSearch tone="dark" />
        </RevealScale>
      </section>

      {/* 차별점 */}
      <section className="border-t border-white/10 bg-neutral-900/40 px-6 py-20">
        <Reveal className="text-center">
          <p className="text-[11px] font-semibold tracking-widest text-amber-400">WHY MARU</p>
          <h2 className="mt-2.5 text-2xl font-bold sm:text-3xl">
            싸게 파는 곳이 아니라, 안전하게 끝내는 곳
          </h2>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-3">
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            return (
              <FadeIn key={r.title} direction="up" delay={i * 120}>
                <div className="h-full rounded-2xl border border-white/10 bg-neutral-950/60 p-6 transition-colors duration-300 hover:border-amber-400/30">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/12">
                    <Icon className="h-5 w-5 text-amber-400" />
                  </span>
                  <h3 className="mt-4 text-base font-bold">{r.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/55">{r.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* 거래 절차 */}
      <section className="px-6 py-20">
        <Reveal className="text-center">
          <p className="text-[11px] font-semibold tracking-widest text-amber-400">PROCESS</p>
          <h2 className="mt-2.5 text-2xl font-bold sm:text-3xl">상담부터 등기까지, 4단계</h2>
        </Reveal>

        <div className="relative mx-auto mt-12 max-w-5xl">
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <FadeIn key={s.no} direction="up" delay={i * 130}>
                <div className="relative">
                  <span className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/40 bg-neutral-950 text-xs font-bold text-amber-400">
                    {s.no}
                  </span>
                  <h3 className="mt-4 text-sm font-bold">{s.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/50">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 거래 사례 */}
      <section className="border-t border-white/10 bg-neutral-900/40 px-6 py-20">
        <Reveal className="text-center">
          <p className="text-[11px] font-semibold tracking-widest text-amber-400">CASE STUDY</p>
          <h2 className="mt-2.5 text-2xl font-bold sm:text-3xl">최근 거래 사례</h2>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-3">
          {CASES.map((c, i) => (
            <RevealScale key={c.title} delay={i * 110}>
              <article className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/60">
                <div className="overflow-hidden">
                  <img
                    src={c.img}
                    alt=""
                    className="h-40 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-semibold tracking-wider text-amber-400">{c.tag}</span>
                  <h3 className="mt-2 text-sm font-bold">{c.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/55">{c.desc}</p>
                </div>
              </article>
            </RevealScale>
          ))}
        </div>
      </section>

      {/* 후기 */}
      <section className="px-6 py-20">
        <Reveal className="text-center">
          <p className="text-[11px] font-semibold tracking-widest text-amber-400">REVIEWS</p>
          <h2 className="mt-2.5 text-2xl font-bold sm:text-3xl">고객이 남긴 후기</h2>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <FadeIn key={r.name} direction="up" delay={i * 110}>
              <figure className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <Quote className="h-5 w-5 text-amber-400/50" />
                <div className="mt-3 flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, n) => (
                    <Star key={n} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="mt-3 text-xs leading-relaxed text-white/65">{r.text}</blockquote>
                <figcaption className="mt-4 border-t border-white/10 pt-3 text-[11px] text-white/40">
                  — {r.name} 고객
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/10 bg-neutral-900/40 px-6 py-20">
        <Reveal className="mx-auto max-w-2xl">
          <p className="text-center text-[11px] font-semibold tracking-widest text-amber-400">FAQ</p>
          <h2 className="mt-2.5 text-center text-2xl font-bold sm:text-3xl">자주 묻는 질문</h2>
          <div className="mt-8">
            {FAQS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* 최종 CTA */}
      <section
        id="contact"
        className="relative overflow-hidden border-t border-white/10 px-6 py-20 text-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.13),transparent_65%)]" />
        <Reveal className="relative">
          <h2 className="mx-auto max-w-lg text-2xl font-bold leading-snug sm:text-3xl">
            어떤 집을 찾고 계신지만 알려주세요
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60">
            예산과 조건을 남겨 주시면, 조건에 맞는 매물만 골라 24시간 안에 연락드립니다. 상담은 무료입니다.
          </p>

          <div className="mx-auto mt-8 flex max-w-md flex-col gap-2.5 sm:flex-row">
            <div className="flex-1 rounded-full border border-white/15 bg-white/[0.06] px-5 py-3.5 text-left text-xs text-white/35">
              연락처를 입력해 주세요
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-amber-400 px-7 py-3.5 text-sm font-bold text-neutral-950 transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              상담 신청 <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-white/45">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-amber-400" /> 02-1234-5678
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-amber-400" /> 서울시 강남구 역삼로 123 마루빌딩 1층
            </span>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-neutral-950 px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-3 text-[10px] text-white/35 sm:flex-row">
          <p>
            마루부동산 · 대표 김마루 · 공인중개사사무소 등록번호 11680-2024-00000 · 사업자등록번호
            123-45-67890
          </p>
          <p>© 2026 MARU REAL ESTATE</p>
        </div>
      </footer>
    </div>
  );
}
