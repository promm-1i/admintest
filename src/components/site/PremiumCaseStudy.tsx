import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KAKAO_CHANNEL_URL } from "@/lib/contact";
import { SAMPLES, type Sample } from "@/lib/samples";
import type { CaseStudy } from "@/lib/caseStudies";
import { getDesignCode } from "@/lib/designCode";
import { Reveal, RevealScale } from "@/pages/services/previewKit";
import { cn } from "@/lib/utils";

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
      <img src={src} alt={alt} className="block w-full" />
    </div>
  );
}

function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border-[7px] border-neutral-900 bg-neutral-900 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.45)]">
      <img src={src} alt={alt} loading="lazy" className="block aspect-[390/844] w-full rounded-[1.55rem] object-cover object-top" />
    </div>
  );
}

export function PremiumCaseStudy({ sample, study }: { sample: Sample; study: CaseStudy }) {
  const code = getDesignCode(sample);
  const liveUrl = sample.liveUrl ?? "";
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
            <Button asChild size="lg" className="gap-2 font-bold">
              <Link to="/contact">
                <Send className="h-4 w-4" />이 디자인으로 상담
              </Link>
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
          <p className="mt-6 text-base leading-[1.9] text-muted-foreground break-keep">{study.overview}</p>
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
            </Reveal>
            <RevealScale className={cn(i % 2 === 1 && "lg:order-1")}>
              <figure>
                <div className="overflow-hidden rounded-xl bg-white shadow-[0_20px_50px_-24px_rgba(0,0,0,0.3)] ring-1 ring-black/5">
                  <img src={pt.img} alt={pt.caption} loading="lazy" className="block w-full" />
                </div>
                <figcaption className="mt-3 text-xs font-medium text-muted-foreground">{pt.caption}</figcaption>
              </figure>
            </RevealScale>
          </section>
        ))}
      </div>

      {/* ⑤ 모바일 — 연한 대표색 판 위 폰 세 대 */}
      <section className="mx-auto mt-24 max-w-[1280px] px-4 sm:px-6 lg:mt-32 lg:px-8">
        <div className="rounded-3xl px-5 py-14 sm:px-10 lg:py-20" style={{ background: study.tintColor }}>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-[2rem] break-keep">
              {study.mobile.title}
            </h2>
            <p className="mt-4 text-base leading-[1.9] text-neutral-600 break-keep">{study.mobile.body}</p>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-[880px] grid-cols-3 items-start gap-3 sm:gap-8">
            {study.mobile.shots.map((s, i) => (
              <div key={s.img} className={cn(i === 1 && "sm:-translate-y-8")}>
                <RevealScale delay={i * 100}>
                  <PhoneFrame src={s.img} alt={`${study.brand} 모바일 ${s.caption}`} />
                  <p className="mt-3 text-center text-xs font-semibold text-neutral-700">{s.caption}</p>
                </RevealScale>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            <Button asChild size="lg" className="gap-2 font-bold shadow-sm">
              <Link to="/contact">
                <Send className="h-4 w-4" />
                제작 상담하기
              </Link>
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
    </div>
  );
}
