import { Link } from "react-router-dom";
import { Send, Check, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { ADDONS } from "@/lib/pricing";
import { KAKAO_CHANNEL_URL } from "@/lib/contact";
import { Reveal } from "@/pages/services/previewKit";
import { PricingComparison } from "@/components/site/PricingComparison";

const EXTRA_FEATURES = [
  ...ADDONS.map((a) => ({ name: a.name, price: a.price })),
  { name: "다국어 지원", price: "별도 협의" },
  { name: "회원 기능", price: "별도 협의" },
  { name: "결제 연동", price: "별도 협의" },
  { name: "외부 API 연동", price: "별도 협의" },
  { name: "업종별 관리자 시스템", price: "별도 협의" },
];

const QUOTE_FACTORS = [
  "페이지 수",
  "디자인 난이도",
  "관리자 기능",
  "데이터베이스",
  "회원 기능",
  "예약 기능",
  "결제 연동",
  "외부 API 연동",
  "다국어 지원",
  "자료 정리 정도",
];

const INCLUDED_BY_DEFAULT = [
  "PC · 모바일 반응형",
  "기본 SEO 설정",
  "문의 · 상담 연결",
  "도메인 연결 지원",
  "배포 및 오픈 지원",
];

export default function PriceLanding() {
  usePageTitle(
    "제작 비용 — NOVERIQ",
    "홈페이지 제작 유형별 가격과 추가 기능 비용을 안내합니다. 정확한 견적은 상담 후 확정됩니다.",
  );

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        <Reveal>
          <p className="text-sm font-mono font-semibold uppercase tracking-widest text-primary">PRICING</p>
          <h1 className="mt-4 text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
            필요한 만큼만 구성하는
            <br />
            홈페이지 제작 비용
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground break-keep sm:text-xl">
            단순 소개 홈페이지부터 관리자·DB가 연결된 맞춤형 웹사이트까지, 필요한 페이지와 기능에 따라
            합리적으로 견적을 구성합니다.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="gap-2 font-bold">
              <Link to="/contact">
                <Send className="h-4 w-4" />
                제작 상담하기
              </Link>
            </Button>
          </div>
        </Reveal>

        {/* 제작방식 2가지 (요약, 상세는 제작 방법 페이지) */}
        <Reveal className="mt-20">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">제작 방식 2가지</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Reveal delay={80} className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-bold text-foreground">템플릿으로 빠르게 제작</h3>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground break-keep">
              검증된 디자인을 선택해 더 빠르고 합리적인 비용으로 시작합니다.
            </p>
          </Reveal>
          <Reveal delay={160} className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-bold text-foreground">처음부터 맞춤 제작</h3>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground break-keep">
              사업에 필요한 구조와 기능부터 새롭게 설계합니다.
            </p>
          </Reveal>
        </div>
        <Link
          to="/website/process"
          className="mt-5 inline-flex items-center gap-1.5 text-base font-medium text-primary hover:underline"
        >
          제작 방식 자세히 보기
          <ArrowRight className="h-4 w-4" />
        </Link>

        {/* 왜 홈페이지마다 가격이 다를까요 */}
        <Reveal className="mt-20">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">왜 홈페이지마다 가격이 다를까요?</h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground break-keep">
            같은 유형이어도 아래 항목에 따라 최종 견적이 달라질 수 있습니다. 디자인비만이 아니라, 관리자
            기능과 데이터 처리 범위가 가격 대부분을 결정합니다.
          </p>
        </Reveal>
        <Reveal delay={100} className="mt-6 flex flex-wrap gap-2.5">
          {QUOTE_FACTORS.map((f) => (
            <span key={f} className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground">
              {f}
            </span>
          ))}
        </Reveal>

        {/* 기본으로 제공되는 것 */}
        <Reveal className="mt-20">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">기본으로 제공되는 것</h2>
        </Reveal>
        <Reveal delay={100}>
          <ul className="mt-7 grid gap-3.5 sm:grid-cols-2">
            {INCLUDED_BY_DEFAULT.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-lg text-foreground break-keep">
                <Check className="h-4 w-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* 필요하면 추가할 수 있는 기능 */}
        <Reveal className="mt-20">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">필요하면 추가할 수 있는 기능</h2>
        </Reveal>
        <Reveal delay={100}>
          <ul className="mt-7 grid gap-3.5 sm:grid-cols-2">
            {EXTRA_FEATURES.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between gap-4 rounded-lg bg-secondary/40 px-5 py-4 border border-border/40"
              >
                <span className="text-base font-medium text-foreground break-keep">{item.name}</span>
                <span className="shrink-0 text-lg font-semibold text-primary">{item.price}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* 관리자 시스템까지 필요한 경우 */}
      <div className="border-y border-border bg-secondary/30 py-16 sm:py-20">
        <Reveal className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">관리자 시스템까지 필요하신가요?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground break-keep">
            홈페이지뿐 아니라 관리자, 고객관리, 업무 흐름까지 하나로 구축하는 업종별 맞춤 솔루션을
            제공합니다.
          </p>
          <div className="mt-7">
            <Button asChild className="gap-1.5 font-bold">
              <Link to="/web-solutions">
                업종별 맞춤 제작 보기
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        {/* 템플릿 요금제 4구조 비교 */}
        <Reveal>
          <PricingComparison />
        </Reveal>


        {/* 최종 CTA */}
        <Reveal delay={150} className="mt-20 rounded-2xl border border-border bg-secondary/40 p-10 text-center">
          <p className="text-xl font-semibold text-foreground">정확한 견적은 필요한 기능만 알려주세요.</p>
          <p className="mt-2.5 text-base text-muted-foreground break-keep">
            업종과 필요한 페이지, 기능을 알려주시면 상담 후 정확한 견적을 안내드립니다.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="gap-2 font-bold">
              <Link to="/contact">
                <Send className="h-4 w-4" />
                제작 상담하기
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 font-bold">
              <a href={KAKAO_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                기능 및 견적 문의
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
