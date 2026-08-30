import { Link } from "react-router-dom";
import { Send, MessageCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { KAKAO_CHANNEL_URL } from "@/lib/contact";
import { Reveal } from "@/pages/services/previewKit";

const GLOSSARY = [
  { num: "01", term: "도메인", eyebrow: "DOMAIN", desc: "홈페이지 주소입니다. 예: company.co.kr" },
  { num: "02", term: "호스팅", eyebrow: "HOSTING", desc: "홈페이지가 인터넷에서 24시간 운영되는 서버 공간입니다." },
  {
    num: "03",
    term: "유지보수",
    eyebrow: "MAINTENANCE",
    desc: "홈페이지 오픈 후 필요한 문구 수정, 이미지 교체, 페이지 변경, 신규 기능, 오류 대응 등을 말합니다.",
  },
];

const SUPPORT_POLICY = [
  "제작 완료 후 일정 기간 기본 지원",
  "단순 문구 / 이미지 수정 등 지원",
  "레이아웃 변경 및 신규 기능은 별도 협의",
];

const SIMPLE_SCOPE = ["오타", "연락처", "주소", "텍스트 일부", "이미지 교체", "링크 변경"];
const SEPARATE_SCOPE = ["신규 페이지", "페이지 구조 변경", "전체 레이아웃 변경", "관리자 기능", "DB 수정", "API", "결제", "회원", "전체 리뉴얼"];

const COST_TIERS = [
  { title: "간단 수정", desc: "지원 범위 내" },
  { title: "추가 수정", desc: "작업량에 따라 견적" },
  { title: "신규 기능", desc: "기능 범위 확인 후 견적" },
  { title: "리뉴얼", desc: "상담 후 견적" },
];

const SELF_MANAGE_EXAMPLES = ["공지사항", "상품", "매물", "차량", "가격", "배너", "후기"];

export default function MaintenanceLanding() {
  usePageTitle(
    "유지보수 안내 — NOVERIQ",
    "홈페이지 오픈 이후 도메인, 호스팅, 유지보수가 어떻게 지원되는지 안내합니다.",
  );

  return (
    <div>
      {/* 01 Hero */}
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24 lg:px-10">
        <Reveal>
          <p className="text-sm font-mono font-semibold uppercase tracking-widest text-primary">SUPPORT</p>
          <h1 className="mt-4 text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl">
            홈페이지 오픈 이후도
            <br />
            걱정하지 마세요.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground break-keep sm:text-xl">
            도메인부터 간단 수정, 기능 추가까지. 운영 중 필요한 지원 범위를 명확하게 안내합니다.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="gap-2 font-bold">
              <Link to="/contact?service=유지보수 / 수정 문의">
                <Send className="h-4 w-4" />
                유지보수 문의하기
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>

      {/* 02 홈페이지 운영에 필요한 3가지 */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        <Reveal>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">홈페이지 운영에 필요한 3가지</h2>
        </Reveal>
        <div className="mt-8 divide-y divide-border border-t border-border">
          {GLOSSARY.map((g, i) => (
            <Reveal key={g.num} delay={i * 100} className="grid gap-3 py-10 sm:grid-cols-12 sm:gap-6">
              <div className="sm:col-span-3">
                <span className="font-mono text-4xl font-bold text-primary/25">{g.num}</span>
                <p className="mt-1.5 text-sm font-semibold uppercase tracking-widest text-muted-foreground/70">
                  {g.eyebrow}
                </p>
                <h3 className="mt-1.5 text-2xl font-bold text-foreground">{g.term}이란?</h3>
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground break-keep sm:col-span-9 sm:pt-1">
                {g.desc}
              </p>
            </Reveal>
          ))}
        </div>
        <p className="mt-7 max-w-2xl text-sm leading-relaxed text-muted-foreground/80 break-keep">
          도메인과 호스팅은 대행해서 안내드리며, 보유하신 도메인이 있다면 그대로 사용할 수 있습니다. 두
          가지 모두 기간제로 운영되어 주기적인 갱신이 필요하며, 만료 전에 미리 안내드립니다.
        </p>
      </div>

      {/* 03 제작 후 지원 정책 */}
      <div className="border-y border-border bg-secondary/30 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
          <Reveal>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">제작 후 지원 정책</h2>
          </Reveal>
          <Reveal delay={100}>
            <ul className="mt-8 flex flex-col gap-3.5">
              {SUPPORT_POLICY.map((item) => (
                <li key={item} className="flex items-start gap-3 text-lg text-foreground break-keep">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* 04 어떤 작업이 간단 수정인가요 */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        <Reveal>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">어떤 작업이 간단 수정인가요?</h2>
        </Reveal>
        <div className="mt-9 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={90}>
            <h3 className="text-xl font-bold text-foreground">간단 수정</h3>
            <ul className="mt-5 space-y-2.5">
              {SIMPLE_SCOPE.map((item) => (
                <li key={item} className="text-lg text-foreground break-keep">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={180} className="lg:border-l lg:border-border lg:pl-16">
            <h3 className="text-xl font-bold text-foreground">별도 작업 (견적 후 진행)</h3>
            <ul className="mt-5 space-y-2.5">
              {SEPARATE_SCOPE.map((item) => (
                <li key={item} className="text-lg text-muted-foreground break-keep">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* 05 유지보수 비용 */}
      <div className="border-y border-border bg-secondary/30 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
          <Reveal>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">유지보수 비용</h2>
          </Reveal>
          <div className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {COST_TIERS.map((tier, i) => (
              <Reveal key={tier.title} delay={i * 80} className="border-t-2 border-foreground pt-5">
                <h3 className="text-lg font-bold text-foreground">{tier.title}</h3>
                <p className="mt-2 text-base text-muted-foreground break-keep">{tier.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* 06 관리자로 직접 관리 */}
      <Reveal className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">홈페이지를 직접 관리할 수도 있습니다</h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground break-keep">
          자주 수정해야 하는 내용이라면 매번 유지보수를 요청하기보다, 관리자 기능을 구축해 직접 관리할
          수 있습니다.
        </p>
        <div className="mt-7 flex flex-wrap gap-2.5">
          {SELF_MANAGE_EXAMPLES.map((item) => (
            <span key={item} className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground">
              {item}
            </span>
          ))}
        </div>
        <Link
          to="/website/features"
          className="mt-6 inline-flex items-center gap-1.5 text-base font-medium text-primary hover:underline"
        >
          관리자 기능 자세히 보기 →
        </Link>
      </Reveal>

      {/* 07 CTA */}
      <Reveal className="border-t border-border py-16 text-center sm:py-20">
        <div className="mx-auto max-w-md px-4">
          <p className="text-xl font-bold text-foreground break-keep">수정할 내용이 있으신가요?</p>
          <p className="mt-2.5 text-base text-muted-foreground break-keep">
            현재 홈페이지와 필요한 수정사항을 알려주시면 확인 후 안내드립니다.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild className="gap-2 font-bold">
              <Link to="/contact?service=유지보수 / 수정 문의">
                <Send className="h-4 w-4" />
                유지보수 문의하기
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2 font-bold">
              <a href={KAKAO_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                카카오톡 문의
              </a>
            </Button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
