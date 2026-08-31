import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { Reveal } from "@/pages/services/previewKit";
import { usePageTitle } from "@/hooks/usePageTitle";
import { SAMPLES } from "@/lib/samples";
import { INDUSTRY_LANDING } from "@/lib/industryLanding";
import { cn } from "@/lib/utils";

const SMS_PHONE = "01048944905";

const STYLES = [
  { key: "basic", name: "기본형", design: 0, desc: "핵심 정보만 담백하게, 애니메이션 없음" },
  { key: "landing", name: "랜딩형", design: 200_000, desc: "스크롤 연출이 더해진 프리미엄 원페이지", hot: true },
] as const;

const HOSTING = [
  { years: 1, label: "1년", cost: 240_000, saveLabel: "" },
  { years: 2, label: "2년", cost: 432_000, saveLabel: "10% 할인" },
  { years: 3, label: "3년", cost: 576_000, saveLabel: "20% 할인" },
] as const;

const DOMAINS = [
  { key: "free", name: "무료 도메인 제공", desc: "com · co.kr · kr 등 여러 도메인 중 원하시는 것으로 — 첫 1년 무료" },
  { key: "own", name: "보유 도메인 연동", desc: "이미 쓰고 계신 도메인이 있다면 그대로 연결해 드립니다" },
] as const;

const FIXED = { feature: 300_000, setup: 100_000 };

const won = (n: number) => n.toLocaleString("ko-KR");

/** 1분 견적 계산기 — /estimate */
export default function Estimate() {
  usePageTitle(
    "홈페이지 제작 견적 계산기 — 1분이면 나옵니다 | NOVERIQ",
    "업종과 형태만 고르면 홈페이지 제작 예상 비용이 바로 계산됩니다. 호스팅 · 셋팅 · 업종 전용 기능 포함가.",
  );

  const industries = useMemo(
    () =>
      Object.keys(INDUSTRY_LANDING)
        .map((key) => {
          const s = SAMPLES.find((x) => x.industryKey === key && x.type.includes("landing-template"));
          return s ? { key, label: s.industry.replace(" 홈페이지", "") } : null;
        })
        .filter((x): x is NonNullable<typeof x> => Boolean(x))
        .sort((a, b) => a.label.localeCompare(b.label, "ko")),
    [],
  );

  const [industry, setIndustry] = useState(industries[0]?.key ?? "");
  const [style, setStyle] = useState<(typeof STYLES)[number]["key"]>("landing");
  const [domain, setDomain] = useState<(typeof DOMAINS)[number]["key"]>("free");
  const [hostingYears, setHostingYears] = useState<1 | 2 | 3>(1);

  const styleInfo = STYLES.find((s) => s.key === style)!;
  const hosting = HOSTING.find((h) => h.years === hostingYears)!;
  const industryLabel = industries.find((i) => i.key === industry)?.label ?? "";

  const domainInfo = DOMAINS.find((d) => d.key === domain)!;
  const rows = [
    { name: `디자인 (${styleInfo.name})`, cost: styleInfo.design, note: styleInfo.design === 0 ? "무료" : "" },
    { name: domain === "free" ? "도메인 (신규)" : "보유 도메인 연동", cost: 0, note: domain === "free" ? "첫 1년 무료" : "연동 무료" },
    { name: "업종 전용 기능", cost: FIXED.feature, note: `${industryLabel} 맞춤` },
    { name: "셋팅 비용", cost: FIXED.setup, note: "도메인 연결 · 초기 등록" },
    { name: `호스팅 ${hosting.label}`, cost: hosting.cost, note: hosting.saveLabel },
  ];
  const total = rows.reduce((a, r) => a + r.cost, 0);

  const summary = `${industryLabel} · ${styleInfo.name} · ${domainInfo.name} · 호스팅 ${hosting.label}`;
  const smsBody = `[견적상담] ${summary} / 예상 ${won(total)}원(VAT별도) — 이 구성으로 상담받고 싶습니다.`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <Reveal>
        <p className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
          <Calculator className="h-3.5 w-3.5" /> ESTIMATE
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">1분 견적 계산기</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep sm:text-base">
          업종과 형태만 고르면 예상 비용이 바로 나옵니다. 호스팅 · 셋팅 · 업종 전용 기능이 전부
          포함된 금액이라, 여기서 본 숫자가 곧 시작 비용입니다. (VAT 별도)
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-start">
        {/* 선택 */}
        <FadeIn direction="up" className="space-y-8 rounded-2xl border border-border bg-card p-7">
          <div>
            <p className="text-sm font-bold text-foreground">01 · 업종</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {industries.map((i) => (
                <button
                  key={i.key}
                  type="button"
                  onClick={() => setIndustry(i.key)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors",
                    industry === i.key
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-foreground/65 hover:border-primary/50 hover:text-primary",
                  )}
                >
                  {i.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold text-foreground">02 · 형태</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {STYLES.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setStyle(s.key)}
                  className={cn(
                    "relative rounded-xl border p-4 text-left transition-colors",
                    style === s.key ? "border-primary bg-primary/5 ring-1 ring-primary/30" : "border-border hover:border-primary/40",
                  )}
                >
                  {"hot" in s && s.hot && (
                    <span className="absolute -top-2.5 left-4 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                      추천
                    </span>
                  )}
                  <p className="text-sm font-bold text-foreground">{s.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground break-keep">{s.desc}</p>
                  <p className="mt-2 text-xs font-bold text-primary">
                    {s.design === 0 ? "디자인 무료" : `디자인 +${won(s.design)}원`}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold text-foreground">03 · 도메인</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {DOMAINS.map((d) => (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => setDomain(d.key)}
                  className={cn(
                    "rounded-xl border p-4 text-left transition-colors",
                    domain === d.key ? "border-primary bg-primary/5 ring-1 ring-primary/30" : "border-border hover:border-primary/40",
                  )}
                >
                  <p className="text-sm font-bold text-foreground">{d.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground break-keep">{d.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold text-foreground">04 · 호스팅 기간</p>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {HOSTING.map((h) => (
                <button
                  key={h.years}
                  type="button"
                  onClick={() => setHostingYears(h.years)}
                  className={cn(
                    "rounded-xl border p-3 text-center transition-colors",
                    hostingYears === h.years ? "border-primary bg-primary/5 ring-1 ring-primary/30" : "border-border hover:border-primary/40",
                  )}
                >
                  <p className="text-sm font-bold text-foreground">{h.label}</p>
                  <p className="mt-0.5 text-[11px] font-semibold text-primary">{h.saveLabel || "기본"}</p>
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* 결과 */}
        <FadeIn direction="up" delay={90} className="lg:sticky lg:top-24">
          <div className="rounded-2xl border border-border bg-foreground p-7 text-background shadow-lg">
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-background/60">
              YOUR ESTIMATE
            </p>
            <p className="mt-2 text-sm font-semibold text-background/80">{summary}</p>
            <p className="mt-3 text-4xl font-extrabold tracking-tight">
              {won(total)}
              <span className="ml-1 text-base font-bold text-background/70">원~</span>
            </p>
            <p className="mt-1 text-xs text-background/55">VAT 별도 · 제작 기간 영업일 7일~</p>

            <ul className="mt-5 space-y-2 border-t border-background/15 pt-5">
              {rows.map((r) => (
                <li key={r.name} className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="text-background/75">
                    {r.name}
                    {r.note && <span className="ml-1.5 text-[11px] text-background/45">{r.note}</span>}
                  </span>
                  <span className="font-bold tabular-nums">{r.cost === 0 ? "무료" : `${won(r.cost)}원`}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2.5">
              <Button asChild size="lg" className="w-full gap-1.5 font-bold">
                <a href={`sms:${SMS_PHONE}?body=${encodeURIComponent(smsBody)}`}>
                  <Send className="h-4 w-4" />
                  이 견적으로 문자 상담하기
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg" className="w-full gap-1.5 font-bold">
                <Link to="/contact">
                  상담 폼으로 문의하기
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-[11px] leading-relaxed text-background/50 break-keep">
              페이지 추가 · 촬영 · 로고 등은 상담에서 범위를 정한 뒤 서면으로 확정합니다. 계약서에
              없는 비용은 청구하지 않습니다.
            </p>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            2년차부터 도메인 연 30,000원이 호스팅료에 추가됩니다
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
