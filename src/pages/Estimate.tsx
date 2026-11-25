import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { Reveal } from "@/pages/services/previewKit";
import { usePageTitle } from "@/hooks/usePageTitle";
import { TEMPLATE_INDUSTRY_LABELS } from "@/lib/samples";
import { WEBSITE_PACKAGES } from "@/lib/templatePackages";
import { cn } from "@/lib/utils";

const SMS_PHONE = "01048944905";

const STYLES = WEBSITE_PACKAGES.map((item) => ({ key: item.key, name: item.label, total: item.total, desc: item.desc }));

const DOMAINS = [
  { key: "free", name: "무료 도메인 제공", desc: "com · co.kr · kr 등 여러 도메인 중 원하시는 것으로 — 첫 1년 무료" },
  { key: "own", name: "보유 도메인 연동", desc: "이미 쓰고 계신 도메인이 있다면 그대로 연결해 드립니다" },
] as const;


const won = (n: number) => n.toLocaleString("ko-KR");

/** 1분 견적 계산기 — /estimate */
export default function Estimate() {
  usePageTitle(
    "홈페이지 제작 견적 계산기 — 1분이면 나옵니다 | NOVERIQ",
    "업종과 형태만 고르면 홈페이지 제작 예상 비용이 바로 계산됩니다. 셋팅과 업종 전용 기능이 포함된 금액입니다.",
  );

  const industries = useMemo(
    () =>
      Object.entries(TEMPLATE_INDUSTRY_LABELS).map(([key, label]) => ({ key, label }))
        .sort((a, b) => a.label.localeCompare(b.label, "ko")),
    [],
  );

  const [industry, setIndustry] = useState(industries[0]?.key ?? "");
  const [style, setStyle] = useState<(typeof STYLES)[number]["key"]>("premium");
  const [domain, setDomain] = useState<(typeof DOMAINS)[number]["key"]>("free");

  const styleInfo = STYLES.find((s) => s.key === style)!;
  const industryLabel = industries.find((i) => i.key === industry)?.label ?? "";

  const domainInfo = DOMAINS.find((d) => d.key === domain)!;
  const rows = [
    { name: styleInfo.name, cost: styleInfo.total, note: "", show: "포함" },
    { name: domain === "free" ? "도메인 (신규)" : "보유 도메인 연동", cost: 0, note: domain === "free" ? "첫 1년 무료" : "연동 무료", show: "포함" },
    { name: "업종 전용 기능", cost: 0, note: `${industryLabel} 맞춤`, show: "포함" },
    { name: "셋팅 비용", cost: 0, note: "도메인 연결 · 서버 설정 · 초기 등록", show: "포함" },
  ];
  const total = rows.reduce((a, r) => a + r.cost, 0);

  const summary = `${industryLabel} · ${styleInfo.name} · ${domainInfo.name}`;
  const smsBody = `[견적상담] ${summary} / 예상 ${won(total)}원(VAT별도) — 이 구성으로 상담받고 싶습니다.`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <Reveal>
        <p className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
          <Calculator className="h-3.5 w-3.5" /> ESTIMATE
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">1분 견적 계산기</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep sm:text-base">
          업종과 형태만 고르면 예상 비용이 바로 나옵니다. 셋팅과 업종 전용 기능이 전부
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
                  <p className="text-sm font-bold text-foreground">{s.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground break-keep">{s.desc}</p>
                  <p className="mt-2 text-xs font-bold text-primary">
                    {`${won(s.total)}원~`}
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
            <p className="mt-1 text-xs text-background/55">VAT 별도 · 제작 일정 상담 후 확정</p>

            <ul className="mt-5 space-y-2 border-t border-background/15 pt-5">
              {rows.map((r) => (
                <li key={r.name} className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="text-background/75">
                    {r.name}
                    {r.note && <span className="ml-1.5 text-[11px] text-background/60">{r.note}</span>}
                  </span>
                  <span className="font-bold">{r.show}</span>
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
              촬영 · 로고 등은 상담에서 범위를 정한 뒤 서면으로 확정합니다. 계약서에
              없는 비용은 청구하지 않습니다.
            </p>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            도메인 1개가 위 금액에 포함되고 호스팅료는 따로 받지 않습니다. 2년차부터 도메인 갱신 연 30,000원이 듭니다
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
