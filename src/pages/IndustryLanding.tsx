import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, Check, Send, Smartphone, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { Reveal } from "@/pages/services/previewKit";
import { usePageTitle } from "@/hooks/usePageTitle";
import { SAMPLES } from "@/lib/samples";
import { TEMPLATE_SECTIONS } from "@/lib/templateSections";
import { INDUSTRY_LANDING } from "@/lib/industryLanding";

/** industryKey → 랜딩형 대표 샘플. 추가 디자인 시안(designCode 지정)은 대표에서 제외한다 */
function landingSampleOf(key: string) {
  return SAMPLES.find(
    (s) => s.industryKey === key && s.type.includes("landing-template") && !s.designCode,
  );
}

const PACKAGES = [
  { name: "기본형", price: "64만원~", note: "가성비 패키지" },
  { name: "기본형 + 반응형", price: "94만원~", note: "" },
  { name: "랜딩형", price: "84만원~", note: "추천" },
  { name: "랜딩형 + 반응형", price: "114만원~", note: "" },
];

/**
 * 업종별 SEO 랜딩 — /homepage/:key
 * "{업종} 홈페이지 제작" 검색 유입을 받아 템플릿 상세 · 상담으로 연결한다.
 */
export default function IndustryLanding() {
  const { key = "" } = useParams();
  const copy = INDUSTRY_LANDING[key];
  const sample = landingSampleOf(key);

  usePageTitle(
    copy ? `${copy.keyword} — 64만원부터, 7일 완성 | NOVERIQ` : "업종별 홈페이지 제작 | NOVERIQ",
    copy
      ? `${copy.intro} 호스팅 · 도메인 · 관리자까지 포함, 영업일 7일 제작. 실제 화면을 보고 시작하세요.`
      : undefined,
  );

  if (!copy || !sample) return <Navigate to="/homepage" replace />;

  const label = sample.industry.replace(" 홈페이지", "");
  const slug = sample.liveUrl?.match(/\/templates\/([a-z]+)-/)?.[1] ?? "";
  const shots = (TEMPLATE_SECTIONS[slug] ?? []).slice(0, 2);
  const others = Object.keys(INDUSTRY_LANDING)
    .filter((k) => k !== key)
    .map((k) => ({ k, s: landingSampleOf(k) }))
    .filter((x) => x.s)
    .slice(0, 23);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      {/* 히어로 */}
      <Reveal>
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
          INDUSTRY · {label}
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl break-keep">
          {copy.keyword}, <br className="sm:hidden" />
          실제 화면을 보고 시작하세요
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep sm:text-base">
          {copy.intro}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button asChild className="gap-1.5 font-bold">
            <Link to="/contact">
              <Send className="h-3.5 w-3.5" />
              {label} 홈페이지 상담하기
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-1.5 font-bold">
            <Link to={`/samples/${sample.slug}`}>
              템플릿 자세히 보기
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">
            기본형 <b className="text-foreground">64만원~</b> · 영업일 7일
          </span>
        </div>
      </Reveal>

      {/* 실물 화면 */}
      <FadeIn direction="up" delay={100} className="mt-10">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Link to={`/samples/${sample.slug}`} className="group relative block overflow-hidden rounded-2xl border border-border shadow-xs">
            <img
              src={sample.image}
              alt={`${label} 홈페이지 실제 화면`}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <span className="absolute left-4 top-4 rounded-full bg-black/65 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-xs">
              실제 배포된 화면
            </span>
          </Link>
          <div className="grid gap-4">
            {shots.map((shot) => (
              <div key={shot.img} className="overflow-hidden rounded-2xl border border-border shadow-xs">
                <img src={shot.img} alt={shot.title} loading="lazy" className="max-h-[200px] w-full object-cover object-top" />
                <p className="border-t border-border bg-card px-4 py-2 text-xs font-bold text-foreground">{shot.title}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* 고민 → 해결 */}
      <section className="mt-16">
        <Reveal>
          <h2 className="text-2xl font-bold sm:text-3xl">이런 고민, 홈페이지가 대신합니다</h2>
        </Reveal>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {copy.pains.map((pain, i) => (
            <FadeIn key={pain.p} direction="up" delay={i * 90}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <p className="text-[15px] font-bold leading-snug text-foreground break-keep">“{pain.p}”</p>
                <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground break-keep">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {pain.s}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
        {sample.features && (
          <Reveal delay={120} className="mt-6 flex flex-wrap gap-2">
            {sample.features.map((f) => (
              <span key={f} className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1.5 text-xs font-bold text-primary">
                <Check className="h-3 w-3" />
                {f}
              </span>
            ))}
          </Reveal>
        )}
      </section>

      {/* 모바일 + 가격 */}
      <section className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <FadeIn direction="up" className="flex items-center gap-6 rounded-2xl bg-foreground p-7 text-background">
          <div className="w-[132px] shrink-0 overflow-hidden rounded-[20px] border-[5px] border-black/80 bg-black shadow-xl">
            <img src={`/thumbs/mobile/${slug}-1.jpg`} alt="모바일 화면" loading="lazy" className="aspect-[390/780] w-full object-cover object-top" />
          </div>
          <div>
            <p className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-background/60">
              <Smartphone className="h-3.5 w-3.5" /> MOBILE
            </p>
            <p className="mt-2 text-lg font-bold break-keep">손님 절반은 폰으로 봅니다</p>
            <p className="mt-2 text-sm leading-relaxed text-background/70 break-keep">
              같은 홈페이지가 모바일에 맞게 자동으로 재배치되고, 전화 · 문자 버튼이 하단에 고정됩니다.
            </p>
          </div>
        </FadeIn>
        <FadeIn direction="up" delay={90} className="rounded-2xl border border-border bg-card p-7">
          <h2 className="text-lg font-bold">제작 비용 (VAT 별도)</h2>
          <p className="mt-1 text-xs text-muted-foreground">호스팅 1년 · 셋팅 · 업종 전용 기능이 모두 포함된 금액입니다.</p>
          <ul className="mt-4 divide-y divide-border/70">
            {PACKAGES.map((p) => (
              <li key={p.name} className="flex items-baseline justify-between gap-3 py-2.5">
                <span className="text-sm font-semibold text-foreground">
                  {p.name}
                  {p.note && <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">{p.note}</span>}
                </span>
                <span className="text-sm font-extrabold tabular-nums text-foreground">{p.price}</span>
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" className="mt-4 w-full gap-1.5 font-bold">
            <Link to="/estimate">
              <Calculator className="h-3.5 w-3.5" />
              1분 견적 계산해 보기
            </Link>
          </Button>
        </FadeIn>
      </section>

      {/* CTA */}
      <Reveal className="mt-16 rounded-2xl border border-border bg-secondary/40 p-8 text-center sm:p-10">
        <h2 className="text-xl font-bold sm:text-2xl break-keep">{label} 홈페이지, 이 화면 그대로 시작할 수 있습니다</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground break-keep">
          상호 · 주소 · 가격만 알려주시면 문구와 사진 구성은 저희가 다듬어 드립니다. 영업일 7일이면 오픈합니다.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button asChild className="gap-1.5 font-bold">
            <Link to="/contact">
              <Send className="h-3.5 w-3.5" />
              제작 상담하기
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-1.5 font-bold">
            <Link to={sample.liveUrl ?? "/templates"} target="_blank">
              실제 사이트 열어보기
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </Reveal>

      {/* 다른 업종 */}
      <section className="mt-16">
        <h2 className="text-sm font-bold text-muted-foreground">다른 업종 홈페이지 제작</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {others.map(({ k, s }) => (
            <Link
              key={k}
              to={`/homepage/${k}`}
              className="rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold text-foreground/70 transition-colors hover:border-primary/50 hover:text-primary"
            >
              {s!.industry.replace(" 홈페이지", "")}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
