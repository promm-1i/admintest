import { useState } from "react";
import { Link } from "react-router-dom";
import { Send, Check, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { KAKAO_CHANNEL_URL } from "@/lib/contact";
import { Reveal } from "@/pages/services/previewKit";
import { PricingComparison } from "@/components/site/PricingComparison";

const EXTRA_FEATURES = [
  { name: "예약 기능", price: "별도 협의" },
  { name: "결제 연동", price: "별도 협의" },
  { name: "다국어 지원", price: "별도 협의" },
  { name: "외부 API 연동", price: "별도 협의" },
  { name: "AI 기능", price: "별도 협의" },
];

/** 마우스를 올리면 칩이 살짝 커지면서 항목 설명이 말풍선으로 뜬다 */
const QUOTE_FACTORS = [
  { label: "페이지 수", desc: "만들어야 하는 화면의 개수입니다. 페이지가 많을수록 디자인·개발 시간이 늘어납니다." },
  { label: "디자인 난이도", desc: "맞춤 그래픽, 애니메이션, 인터랙션이 많이 들어갈수록 작업 범위가 커집니다." },
  { label: "관리자 기능", desc: "공지·매물·상품 등을 직접 등록하고 수정하는 관리 화면의 범위입니다." },
  { label: "데이터베이스", desc: "매물·상품·예약처럼 저장하고 검색해야 하는 데이터의 종류와 양입니다." },
  { label: "회원 기능", desc: "회원가입·로그인, 마이페이지 등 회원 체계를 어디까지 갖출지에 따라 달라집니다." },
  { label: "예약 기능", desc: "날짜·시간 선택, 예약 확정과 취소 알림 등 실시간 예약 처리의 범위입니다." },
  { label: "결제 연동", desc: "카드·간편결제 등 온라인 결제 모듈을 연동하는 작업입니다." },
  { label: "외부 API 연동", desc: "지도, 문자, 공공데이터처럼 외부 서비스와 데이터를 주고받는 연결 작업입니다." },
  { label: "다국어 지원", desc: "영어·중국어 등 언어별 페이지 구성과 전환 기능입니다." },
  { label: "자료 정리 정도", desc: "문구·사진 같은 원고가 정리되어 있을수록 제작 기간과 비용이 줄어듭니다." },
];

const INCLUDED_BY_DEFAULT = [
  "관리자 모드 (공지 · 문의 · 콘텐츠 관리)",
  "회원 기능",
  "모바일 웹 기본타입",
  "도메인 1개 (첫 1년 무료)",
  "DB · 파일 무제한",
  "실시간 문자 기능 (무료 설치)",
  "기본 SEO 설정",
  "문의 · 상담 연결",
  "배포 및 오픈 지원",
];

/**
 * 항목을 고르면 설명이 칩 목록 아래 고정 영역에 나온다.
 * 떠 있는 툴팁은 오른쪽 끝 칩에서 화면 밖으로 잘리고, 터치 기기에는 hover가 없어서 쓰기 어렵다.
 */
function FactorPicker({ factors }: { factors: readonly { label: string; desc: string }[] }) {
  const [active, setActive] = useState<string | null>(null);
  const activeFactor = factors.find((f) => f.label === active);

  return (
    <div className="mt-7">
      <div className="flex flex-wrap gap-3">
        {factors.map((f) => {
          const isActive = f.label === active;
          return (
            <button
              key={f.label}
              type="button"
              aria-pressed={isActive}
              onMouseEnter={() => setActive(f.label)}
              onFocus={() => setActive(f.label)}
              onClick={() => setActive(f.label)}
              className={`rounded-full border px-5 py-2.5 text-base font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 motion-reduce:transition-none ${
                isActive
                  ? "border-primary/50 bg-primary/5 text-primary"
                  : "border-border bg-card text-foreground/80 hover:border-primary/50 hover:text-primary"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
      <p
        aria-live="polite"
        className="mt-4 min-h-[3rem] rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm leading-relaxed text-muted-foreground break-keep"
      >
        {activeFactor ? activeFactor.desc : "각 항목을 누르면 어떤 작업인지 확인하실 수 있습니다."}
      </p>
    </div>
  );
}

export default function PriceLanding() {
  usePageTitle(
    "제작 비용 — NOVERIQ",
    "홈페이지 제작 유형별 가격과 추가 기능 비용을 안내합니다. 정확한 견적은 상담 후 확정됩니다.",
  );

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-5 sm:py-20 lg:px-6">
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
          <Reveal delay={80} className="rounded-xl border border-border bg-secondary/30 p-6">
            <p className="text-xs font-bold tracking-wide text-muted-foreground">TEMPLATE</p>
            <h3 className="mt-1.5 text-lg font-bold text-foreground">템플릿으로 빠르게 제작</h3>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground break-keep">
              검증된 디자인을 선택해 더 빠르고 합리적인 비용으로 시작합니다.
            </p>
          </Reveal>
          <Reveal delay={160} className="rounded-xl border border-primary/40 bg-primary/[0.04] p-6">
            <p className="text-xs font-bold tracking-wide text-primary">CUSTOM · PREMIUM</p>
            <h3 className="mt-1.5 text-lg font-bold text-foreground">처음부터 맞춤 제작</h3>
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
        <Reveal delay={100}>
          <FactorPicker factors={QUOTE_FACTORS} />
        </Reveal>

        {/* 기본으로 제공되는 것 */}
        <Reveal className="mt-20">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">기본으로 제공되는 것</h2>
        </Reveal>
        <Reveal delay={100}>
          <ul className="mt-7 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED_BY_DEFAULT.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 text-base font-medium text-foreground break-keep transition-colors hover:border-primary/40 sm:text-lg"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-4 w-4 text-primary" />
                </span>
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
                className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-primary/40"
              >
                <span className="text-base font-semibold text-foreground break-keep sm:text-lg">{item.name}</span>
                <span className="shrink-0 text-base font-semibold text-primary sm:text-lg">{item.price}</span>
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

      {/* 좌우 여백을 줄여 비교표가 최대한 넓게 나오도록 별도 컨테이너를 쓴다 */}
      <div className="mx-auto max-w-7xl px-3 py-16 sm:px-5 sm:py-20">
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
