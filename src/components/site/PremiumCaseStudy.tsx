import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CheckCircle2, MessageCircle, Send } from "lucide-react";
import { QuickConsultDialog } from "@/components/site/QuickConsultDialog";
import { Button } from "@/components/ui/button";
import { KAKAO_CHANNEL_URL } from "@/lib/contact";
import { SAMPLES, type Sample } from "@/lib/samples";
import type { CaseStudy } from "@/lib/caseStudies";
import { toCustomerFacingCaseStudy } from "@/lib/caseStudies/customerCopy";
import { getDesignCode } from "@/lib/designCode";
import { Reveal, RevealScale } from "@/pages/services/previewKit";
import { cn } from "@/lib/utils";
import { TEMPLATE_SECTIONS } from "@/lib/templateSections";

/** 줄바꿈(\n)을 살려 제목을 끊는다 — 한글 제목은 끊는 자리를 문구에서 정한다 */
function Lines({ text }: { text: string }) {
  const parts = text.split("\n");
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

function BrowserFrame({ src, alt, url }: { src: string; alt: string; url: string }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
      <div className="flex items-center gap-3 border-b border-neutral-200 bg-neutral-50 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
          <i className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
          <i className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-md bg-white px-3 py-1 text-[11px] text-neutral-500 ring-1 ring-neutral-200">
          {url}
        </span>
      </div>
      <img src={src} srcSet={shotSrcSet(src, 1440)} sizes="(min-width: 1100px) 1040px, 92vw" alt={alt} className="block w-full" />
    </div>
  );
}

// 캡처마다 가로 800px 짜리 `-sm.webp` 가 옆에 있다 — 휴대폰은 작은 쪽을 받는다
function shotSrcSet(src: string, fullWidth: number) {
  return `${src.replace(/\.webp$/, "-sm.webp")} 800w, ${src} ${fullWidth}w`;
}

function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border-[7px] border-neutral-900 bg-neutral-900 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.45)]">
      <img src={src} alt={alt} loading="lazy" className="block aspect-[390/844] w-full rounded-[1.55rem] object-cover object-top" />
    </div>
  );
}

function CapabilityShowcase({
  capabilities,
  brandColor,
  liveUrl,
}: {
  capabilities: NonNullable<CaseStudy["capabilities"]>;
  brandColor: string;
  liveUrl: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = capabilities.groups[activeIndex] ?? capabilities.groups[0];
  if (!active) return null;

  return (
    <section className="mx-auto mt-24 max-w-[1280px] px-4 sm:px-6 lg:mt-32 lg:px-8">
      <div className="border-y border-neutral-200 py-12 text-neutral-950 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <Reveal>
            <p className="text-sm font-bold" style={{ color: brandColor }}>
              사이트 구성
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-[1.25] tracking-tight sm:text-4xl break-keep">
              {capabilities.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-[1.85] text-neutral-600 break-keep">{capabilities.body}</p>
          </Reveal>
          <dl className="grid grid-cols-2 border-l border-t border-neutral-200">
            {capabilities.stats.map((stat) => (
              <div key={stat.label} className="border-b border-r border-neutral-200 px-4 py-5 sm:px-6 sm:py-6">
                <strong className="block text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                  {stat.value}
                </strong>
                <span className="mt-2 block text-sm font-bold text-neutral-900">{stat.label}</span>
                <span className="mt-1 block text-xs leading-relaxed text-neutral-500 break-keep">{stat.note}</span>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12 grid min-w-0 border-t border-neutral-200 lg:mt-16 lg:grid-cols-[270px_minmax(0,1fr)]">
          <div className="min-w-0 border-b border-neutral-200 lg:border-b-0 lg:border-r">
            <div className="flex overflow-x-auto lg:block lg:overflow-visible" role="tablist" aria-label="사이트 화면 선택">
              {capabilities.groups.map((group, i) => {
                const selected = i === activeIndex;
                return (
                  <button
                    key={group.label}
                    type="button"
                    role="tab"
                    aria-pressed={selected}
                    aria-selected={selected}
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "group min-w-[168px] border-b-2 px-4 py-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 lg:block lg:w-full lg:min-w-0 lg:border-b lg:border-neutral-200 lg:border-l-2 lg:px-5 lg:py-5",
                      selected
                        ? "border-neutral-950 text-neutral-950 lg:border-b-neutral-200"
                        : "border-neutral-200 text-neutral-400 hover:text-neutral-900 lg:border-l-transparent",
                    )}
                    style={selected ? { borderLeftColor: brandColor } : undefined}
                  >
                    <span className="text-xs font-semibold tabular-nums" style={{ color: selected ? brandColor : undefined }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="ml-3 text-sm font-bold sm:text-base">{group.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="min-w-0 pt-8 sm:pt-10 lg:pl-12 lg:pt-12">
            <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,5fr)_minmax(280px,3fr)] xl:gap-12">
              <RevealScale key={active.img}>
                <a
                  href={`${liveUrl}${active.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-xl bg-neutral-100 ring-1 ring-neutral-200"
                  aria-label={`${active.label} 실제 화면 새 창으로 보기`}
                >
                  <img
                    src={active.img}
                    srcSet={shotSrcSet(active.img, 960)}
                    sizes="(min-width: 1280px) 520px, (min-width: 1024px) 55vw, 92vw"
                    alt={active.caption}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
                  />
                </a>
                <p className="mt-3 text-xs text-neutral-500">{active.caption}</p>
              </RevealScale>
              <div>
                <p className="text-sm font-bold" style={{ color: brandColor }}>
                  {active.label}
                </p>
                <h3 className="mt-3 break-words text-2xl font-bold leading-snug tracking-tight sm:text-3xl sm:break-keep">
                  {active.title}
                </h3>
                <p className="mt-4 break-words text-sm leading-[1.85] text-neutral-600 sm:text-base sm:break-keep">
                  {active.body}
                </p>
                <ul className="mt-6 divide-y divide-neutral-200 border-y border-neutral-200">
                  {active.items.map((item, i) => (
                    <li key={item} className="flex items-start gap-3 py-3 text-sm text-neutral-700">
                      <span className="mt-px shrink-0 text-xs font-semibold tabular-nums text-neutral-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="break-words font-medium sm:break-keep">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`${liveUrl}${active.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-1.5 border-b border-neutral-950 pb-1 text-sm font-bold text-neutral-950 transition-opacity hover:opacity-60"
                >
                  이 화면 열어보기
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PremiumCaseStudy({ sample, study: sourceStudy }: { sample: Sample; study: CaseStudy }) {
  const sectionShots = TEMPLATE_SECTIONS[sample.liveUrl?.match(/\/templates\/([a-z0-9-]+)\//)?.[1] ?? ""] ?? [];
  const study = toCustomerFacingCaseStudy(sourceStudy);
  const code = getDesignCode(sample);
  const liveUrl = sample.liveUrl ?? "";
  const [consultOpen, setConsultOpen] = useState(false);
  const related = SAMPLES.filter(
    (s) => s.premium && s.industryKey === sample.industryKey && s.slug !== sample.slug,
  );

  return (
    <div className="pb-20">
      {/* ① 머리 — 브랜드 이름을 크게 */}
      <section className="mx-auto max-w-[1280px] px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <Link
          to="/web-solutions"
          className="inline-flex items-center text-xs font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="mr-1 h-3.5 w-3.5" />
          프리미엄 디자인 목록으로
        </Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="font-mono text-xs font-semibold tracking-widest text-muted-foreground">
              PREMIUM DESIGN · {code}
            </p>
            <h1 className="mt-3 text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              {study.brand}
            </h1>
            <p className="mt-4 text-xl font-semibold text-foreground sm:text-2xl">{study.headline}</p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground break-keep">
              {study.summary}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="outline" className="gap-1.5 font-semibold">
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                실제 화면 보기
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" className="gap-2 font-bold" onClick={() => setConsultOpen(true)}>
              <Send className="h-4 w-4" />이 디자인으로 상담
            </Button>
          </div>
        </div>
      </section>

      {/* ② 대표색 띠 위 PC 화면 — 띠는 목업 가운데까지만 깔린다 */}
      <section
        className="mt-12 px-4 sm:px-6 lg:px-8"
        style={{
          background: `linear-gradient(to bottom, transparent 0 14%, ${study.brandColor} 14% 72%, transparent 72%)`,
        }}
      >
        <RevealScale className="mx-auto max-w-[1040px] py-6">
          <BrowserFrame src={study.mainShot} alt={`${study.brand} 메인 화면`} url={`noveriq.co.kr${liveUrl}`} />
        </RevealScale>
      </section>

      {/* ③ Overview + 번호 3칸 */}
      <section className="mx-auto mt-16 grid max-w-[1280px] gap-12 px-4 sm:px-6 lg:mt-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:px-8">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Overview</h2>
          <div className="mt-6 space-y-5">
            {study.overview.split("\n\n").map((para) => (
              <p key={para.slice(0, 24)} className="text-base leading-[1.9] text-muted-foreground break-keep">
                {para}
              </p>
            ))}
          </div>
        </Reveal>
        <div className="space-y-7">
          {study.meta.map((m, i) => (
            <Reveal key={m.label} delay={i * 80}>
              <div className="flex gap-5">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border font-mono text-sm font-bold"
                  style={{ borderColor: study.brandColor, color: study.brandColor }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 pt-0.5">
                  <h3 className="text-lg font-bold text-foreground">{m.label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground break-keep">{m.value}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {study.capabilities && (
        <CapabilityShowcase capabilities={study.capabilities} brandColor={study.brandColor} liveUrl={liveUrl} />
      )}

      {/* ③-2 한 페이지 디자인 — 위에서부터 섹션이 어떻게 이어지는지 */}
      {study.flow && study.flow.length > 0 && (
        <section className="mx-auto mt-24 max-w-[1280px] px-4 sm:px-6 lg:mt-32 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs font-semibold tracking-widest" style={{ color: study.brandColor }}>
              {study.flowLabel ?? "FLOW"}
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-[2rem] break-keep">
              {study.flowTitle ?? "한 페이지 안에 위에서부터 이렇게 이어집니다"}
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-x-10 gap-y-0 md:grid-cols-2">
            {study.flow.map((f, i) => (
              <li key={f.name} className="flex gap-5 border-t border-border py-5">
                <span className="w-7 shrink-0 pt-0.5 font-mono text-sm font-bold" style={{ color: study.brandColor }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-foreground break-keep">{f.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground break-keep">{f.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ③-3 여러 페이지 디자인 — 몇 쪽이고 쪽마다 무엇이 들어 있는지 */}
      {study.pages && study.pages.length > 0 && (
      <section className="mx-auto mt-24 max-w-[1280px] px-4 sm:px-6 lg:mt-32 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs font-semibold tracking-widest" style={{ color: study.brandColor }}>
            {study.pagesLabel ?? "PAGES"}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-[2rem]">
            {study.pagesTitle ?? `${study.pages.length}개 페이지에 담긴 것`}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {study.pages.map((pg, i) => (
            <Reveal key={pg.file} delay={i * 60}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
                <a
                  href={`${liveUrl}${pg.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden border-b border-border"
                  aria-label={`${pg.name} 실제 화면 새 창으로 보기`}
                >
                  <img
                    src={pg.img}
                    srcSet={shotSrcSet(pg.img, 960)}
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 46vw, 92vw"
                    alt=""
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </a>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-bold text-foreground">
                      <span className="mr-2 font-mono text-sm" style={{ color: study.brandColor }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {pg.name}
                    </h3>
                    <a
                      href={`${liveUrl}${pg.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-xs font-semibold text-muted-foreground hover:text-foreground"
                    >
                      화면 보기 ↗
                    </a>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-keep">{pg.desc}</p>
                  <ul className="mt-4 space-y-1.5 border-t border-border pt-4">
                    {pg.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-[13px] text-foreground">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: study.brandColor }} />
                        <span className="break-keep">{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      )}

      {/* ④ 디자인 포인트 — 글과 화면이 좌우로 번갈아 */}
      <div className="mx-auto mt-24 max-w-[1280px] space-y-24 px-4 sm:px-6 lg:mt-32 lg:space-y-32 lg:px-8">
        {study.points.map((pt, i) => (
          <section
            key={pt.img}
            className={cn(
              "grid items-center gap-10 lg:gap-16",
              // 화면 쪽이 늘 넓은 칸을 차지하게 좌우가 바뀔 때 열 비율도 뒤집는다
              i % 2 === 1 ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]",
            )}
          >
            <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
              <p className="font-mono text-xs font-semibold tracking-widest" style={{ color: study.brandColor }}>
                POINT {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-foreground sm:text-[2rem] break-keep">
                <Lines text={pt.title} />
              </h2>
              <p className="mt-5 text-base leading-[1.9] text-muted-foreground break-keep">{pt.body}</p>
              {pt.items && (
                <ul className="mt-6 space-y-2 border-t border-border pt-6">
                  {pt.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: study.brandColor }} />
                      <span className="break-keep">{it}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
            <RevealScale className={cn(i % 2 === 1 && "lg:order-1")}>
              <figure>
                <div className="overflow-hidden rounded-xl bg-white shadow-[0_20px_50px_-24px_rgba(0,0,0,0.3)] ring-1 ring-black/5">
                  <img
                    src={pt.img}
                    srcSet={shotSrcSet(pt.img, 1280)}
                    sizes="(min-width: 1024px) 700px, 92vw"
                    alt={pt.caption}
                    loading="lazy"
                    className="block w-full"
                  />
                </div>
                <figcaption className="mt-3 text-xs font-medium text-muted-foreground">{pt.caption}</figcaption>
              </figure>
            </RevealScale>
          </section>
        ))}
      </div>

      {/* ④-2 눈에 잘 안 띄는 디테일 */}
      <section className="mx-auto mt-24 max-w-[1280px] px-4 sm:px-6 lg:mt-32 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs font-semibold tracking-widest" style={{ color: study.brandColor }}>
            {study.detailsLabel ?? "DETAILS"}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-[2rem] break-keep">
            {study.detailsTitle ?? "화면에 잘 안 보이지만 들어 있는 것"}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {study.details.map((d, i) => (
            <div key={d.title} className="bg-card p-6 sm:p-7">
              <span className="font-mono text-xs font-bold" style={{ color: study.brandColor }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-base font-bold text-foreground break-keep">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-keep">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ⑤ 모바일 — 연한 대표색 판 위 폰 */}
      <section className="mx-auto mt-24 max-w-[1280px] px-4 sm:px-6 lg:mt-32 lg:px-8">
        <div
          className="rounded-3xl px-5 py-14 sm:px-10 lg:py-20"
          style={{ background: study.tintColor }}
        >
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2
              className={cn(
                "text-2xl font-bold tracking-tight sm:text-[2rem] break-keep",
                study.mobileDark ? "text-white" : "text-neutral-900",
              )}
            >
              {study.mobile.title}
            </h2>
            <p
              className={cn(
                "mt-4 text-base leading-[1.9] break-keep",
                study.mobileDark ? "text-white/70" : "text-neutral-600",
              )}
            >
              {study.mobile.body}
            </p>
          </Reveal>
          <div
            className={cn(
              "mx-auto mt-12 grid items-start gap-4 sm:gap-8",
              study.mobile.shots.length > 3 ? "max-w-[1080px] grid-cols-2 sm:grid-cols-4" : "max-w-[880px] grid-cols-3",
            )}
          >
            {study.mobile.shots.map((s, i) => (
              <div key={s.img} className={cn(i % 2 === 1 && "sm:-translate-y-8")}>
                <RevealScale delay={i * 100}>
                  <PhoneFrame src={s.img} alt={`${study.brand} 모바일 ${s.caption}`} />
                  <p
                    className={cn(
                      "mt-3 text-center text-xs font-semibold",
                      study.mobileDark ? "text-white/80" : "text-neutral-700",
                    )}
                  >
                    {s.caption}
                  </p>
                </RevealScale>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑤-2 실물 구간 캡처 — 템플릿이 가진 만큼 전부, 자르지 않고 */}
      {sectionShots.length > 0 && (
        <section className="mx-auto mt-24 max-w-[1280px] px-4 sm:px-6 lg:mt-32 lg:px-8">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-primary">Inside This Design</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">이 디자인에 담긴 화면 {sectionShots.length}개</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
            실제 배포된 화면을 구간째로 담았습니다. 중간에서 자르지 않아 각 화면이 끝까지 보입니다.
            여기서 섹션 순서와 브랜드 색 · 글꼴을 사업에 맞춰 다시 잡고 사진을 새로 만들어 채웁니다.
          </p>
          {/* 구간마다 높이가 다르다. 격자에 맞춰 자르면 내용이 끊겨 컬럼 배치로 원래 비율 그대로 둔다. */}
          <div className="mt-8 gap-5 sm:columns-2 sm:[column-gap:1.25rem]">
            {sectionShots.map((shot, i) => (
              <Reveal key={shot.img} delay={i * 60}>
                <figure className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
                  <img
                    src={shot.img}
                    srcSet={`${shot.img.replace(".webp", "-640.webp")} 640w, ${shot.img} 1280w`}
                    sizes="(min-width: 640px) 50vw, 100vw"
                    alt={shot.title}
                    loading="lazy"
                    decoding="async"
                    width={shot.width ?? 1280}
                    height={shot.height ?? 960}
                    className="h-auto w-full"
                  />
                  <figcaption className="flex items-center justify-between gap-3 border-t border-border px-5 py-3.5">
                    <span className="min-w-0 truncate text-sm font-semibold text-foreground">{shot.title}</span>
                    <span className="shrink-0 rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-secondary-foreground">실물 캡처</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ⑥ 이 디자인 FAQ */}
      <section className="mx-auto mt-24 max-w-[1040px] px-4 sm:px-6 lg:mt-32 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">FAQ</h2>
        <div className="mt-10 space-y-3">
          {study.faq.map((f) => (
            <details key={f.q} className="group rounded-xl border border-border bg-card">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[15px] font-semibold text-foreground">
                <span className="break-keep">{f.q}</span>
                <span className="shrink-0 text-xl font-light text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground break-keep">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ⑦ 비용 · 상담 */}
      <section className="mx-auto mt-24 max-w-[1040px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-xs sm:p-12">
          <p className="font-mono text-xs font-semibold tracking-widest text-primary">PREMIUM DESIGN</p>
          <h2 className="mt-3 text-2xl font-bold text-foreground break-keep">
            이 디자인으로 제작하면 300만 원부터입니다
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground break-keep">
            부가세 별도, 호스팅 1년과 도메인 1개 포함입니다. 브랜드 색 · 메뉴 · 섹션 구성을 사업에 맞춰 다시
            잡고 사진을 새로 만들어 채웁니다.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button size="lg" className="gap-2 font-bold shadow-sm" onClick={() => setConsultOpen(true)}>
              <Send className="h-4 w-4" />
              제작 상담하기
            </Button>
            <Button
              asChild
              size="lg"
              className="gap-2 border-none bg-[#FEE500] font-bold text-[#191919] shadow-sm hover:bg-[#FADA00]"
            >
              <a href={KAKAO_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 fill-[#191919]" />
                카카오톡 문의
              </a>
            </Button>
          </div>
          <Link
            to="/web-solutions"
            className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            프리미엄 라인 제작 방식 · 포함 사항 보기 →
          </Link>
        </div>
      </section>

      {/* ⑧ 같은 업종 다른 디자인 */}
      {related.length > 0 && (
        <section className="mx-auto mt-24 max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">같은 업종의 다른 디자인</h2>
            <Link to="/web-solutions" className="text-sm font-semibold text-muted-foreground hover:text-foreground">
              전체 보기 →
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} to={`/samples/${r.slug}`} className="group block">
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                  <img
                    src={r.image}
                    alt={r.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <p className="mt-3 font-mono text-[11px] font-semibold text-muted-foreground">{getDesignCode(r)}</p>
                <p className="mt-1 text-sm font-bold text-foreground break-keep">{r.title}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <QuickConsultDialog
        open={consultOpen}
        onClose={() => setConsultOpen(false)}
        designName={`${study.brand} (${study.headline})`}
        designCode={code}
      />
    </div>
  );
}
