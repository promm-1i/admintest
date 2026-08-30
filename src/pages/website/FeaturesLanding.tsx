import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Send,
  ArrowRight,
  ArrowDown,
  Check,
  ExternalLink,
  ShieldCheck,
  Globe,
  LayoutDashboard,
  Database,
  MessageSquare,
  Mail,
  Users,
  CreditCard,
  Share2,
  MapPin,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { DashboardPreview } from "@/components/site/DashboardPreview";
import { ConnectionFlow } from "@/components/site/ConnectionFlow";
import { INDUSTRY_SHOWCASES } from "@/components/site/industryShowcase";
import { SAMPLES } from "@/lib/samples";
import { cn } from "@/lib/utils";
import { Reveal, RevealScale } from "@/pages/services/previewKit";

const BASIC_FEATURE_GROUPS = [
  { title: "화면", items: ["PC / 모바일 반응형", "이미지 갤러리", "파일 다운로드"] },
  { title: "고객 연결", items: ["문의 버튼", "전화 연결", "카카오톡 연결", "지도"] },
  { title: "콘텐츠", items: ["게시판", "FAQ"] },
  { title: "검색 노출", items: ["기본 SEO"] },
];

const BUILD_LEVELS = [
  { level: "기본 홈페이지", chain: ["반응형", "전화", "카카오톡", "지도", "SEO"] },
  { level: "상담형 홈페이지", prefix: "기본 홈페이지 +", chain: ["문의폼", "문의 DB", "관리자 확인"] },
  { level: "운영형 홈페이지", chain: ["검색", "예약", "고객관리", "일정", "직원관리"] },
  { level: "플랫폼형 웹사이트", chain: ["회원", "결제", "API", "데이터베이스", "AI"] },
];

const CUSTOMER_FLOW = ["검색", "조건 선택", "상세 확인", "예약 / 견적 요청", "결제"];
const CUSTOMER_FEATURES = ["검색", "조건별 필터", "예약", "견적 요청", "문의폼", "회원가입", "로그인", "마이페이지", "결제", "파일 업로드"];

const ADMIN_FEATURES = [
  "공지 등록",
  "콘텐츠 수정",
  "상품 / 매물 / 차량 관리",
  "고객 문의 관리",
  "예약 관리",
  "일정 관리",
  "공개 / 비공개",
  "직원 관리",
  "권한 관리",
  "통계",
  "활동로그",
];

const EXTENSION_GROUPS = [
  { title: "데이터", icon: Database, items: ["DB", "공공데이터", "주소 검색", "지도 기반 검색"] },
  { title: "커뮤니케이션", icon: MessageSquare, items: ["SMS", "이메일", "챗봇"] },
  { title: "사용자 서비스", icon: Users, items: ["회원관리", "결제", "배송", "다국어"] },
  { title: "외부 시스템", icon: Share2, items: ["외부 API", "AI 기능"] },
];

const CONNECTION_NODES = [
  { icon: Database, label: "DB" },
  { icon: CreditCard, label: "결제" },
  { icon: MapPin, label: "지도" },
  { icon: Mail, label: "SMS" },
  { icon: Share2, label: "외부 API" },
];

const INDUSTRY_FLOWS: Record<string, string[]> = {
  "real-estate": ["매물 등록", "고객 연결", "임장 일정", "계약 관리", "홈페이지 공개"],
  rentcar: ["차량 등록", "예약 접수", "대여 · 반납", "정비 관리", "홈페이지 공개"],
  hospital: ["진료과목", "의료진", "예약", "상담", "홈페이지 공개"],
  academy: ["학생", "수강", "출결", "성적", "수강료"],
  interior: ["문의", "실측", "견적", "계약", "공정", "A/S"],
  moving: ["견적", "예약", "작업팀 배정", "결제", "후기"],
};

const GROWTH_STAGES = [
  { stage: "처음에는", items: ["홈페이지", "문의"] },
  { stage: "사업이 커지면", items: ["관리자", "고객관리"] },
  { stage: "추가 운영이 필요하면", items: ["예약", "결제", "API"] },
];

const featureImage = SAMPLES.find((s) => s.slug === "objetbath");
const flowSample = SAMPLES.find((s) => s.slug === "roadin-rentcar");

export default function FeaturesLanding() {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const industry = INDUSTRY_SHOWCASES[activeIndustry];

  usePageTitle(
    "기능 소개 — MintCL",
    "MintCL 홈페이지 제작에서 구현 가능한 기본 기능, 고객 편의 기능, 관리자 기능, 확장 기능을 안내합니다.",
  );

  return (
    <div>
      {/* 01 Hero */}
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:pb-24 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary motion-safe:animate-hero-text-fade">
              FEATURES
            </p>
            <h1
              className="mt-4 text-4xl font-bold leading-[1.15] tracking-tight text-foreground motion-safe:animate-hero-text-fade sm:text-5xl"
              style={{ animationDelay: "80ms" }}
            >
              홈페이지, 어디까지
              <br />
              만들 수 있을까요?
            </h1>
            <p
              className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground break-keep motion-safe:animate-hero-text-fade"
              style={{ animationDelay: "160ms" }}
            >
              단순한 소개형 홈페이지부터 예약·고객관리·관리자·DB가 연결된 웹시스템까지. 필요한 기능만
              조합해 구축합니다.
            </p>
            <div
              className="mt-8 flex flex-wrap gap-3 motion-safe:animate-hero-text-fade"
              style={{ animationDelay: "260ms" }}
            >
              <Button asChild size="lg" className="gap-2 font-bold">
                <Link to="/contact">
                  <Send className="h-4 w-4" />
                  구축 상담하기
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/web-solutions/demos">관리자 데모 보기</Link>
              </Button>
            </div>
          </div>

          <RevealScale delay={150} className="lg:col-span-6">
            <div className="mx-auto flex max-w-xs flex-col items-stretch">
              {[
                { label: "고객 홈페이지", icon: Globe },
                { label: "문의 · 검색 · 예약 · 결제", icon: Search },
                { label: "관리자 시스템", icon: LayoutDashboard },
                { label: "DB · API · SMS · AI", icon: Database },
              ].map((node, i, arr) => {
                const Icon = node.icon;
                return (
                  <div key={node.label} className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border px-5 py-4",
                        i === 2
                          ? "border-primary/30 bg-primary/5"
                          : "border-border bg-card",
                      )}
                    >
                      <Icon className={cn("h-4 w-4 shrink-0", i === 2 ? "text-primary" : "text-muted-foreground")} />
                      <span className="text-base font-semibold text-foreground">{node.label}</span>
                    </div>
                    {i < arr.length - 1 && <ArrowDown className="my-2 h-4 w-4 shrink-0 text-muted-foreground/40" />}
                  </div>
                );
              })}
            </div>
          </RevealScale>
        </div>
      </div>

      {/* 02 구축 수준 */}
      <div className="border-y border-border bg-secondary/30 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              필요한 수준에 따라 여기까지 확장할 수 있습니다
            </h2>
          </Reveal>
          <div className="mt-10 space-y-6">
            {BUILD_LEVELS.map((lvl, i) => (
              <Reveal
                key={lvl.level}
                delay={i * 90}
                className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-5 sm:flex-row sm:items-center sm:gap-6"
              >
                <span className="shrink-0 text-base font-bold text-foreground sm:w-40">{lvl.level}</span>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-muted-foreground">
                  {lvl.prefix && <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">{lvl.prefix}</span>}
                  {lvl.chain.map((step, i) => (
                    <span key={step} className="flex items-center gap-2">
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-foreground">{step}</span>
                      {i < lvl.chain.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground/50" />}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        {/* 03 기본 웹사이트 기능 */}
        <div className="border-b border-border py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <span className="font-mono text-5xl font-bold text-primary/25">01</span>
              <h2 className="mt-2 text-3xl font-bold text-foreground">기본 웹사이트 기능</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground break-keep">
                홈페이지를 구성하는 기본적인 기능입니다. 모든 홈페이지에 기본으로 포함됩니다.
              </p>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-8">
              <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
                {BASIC_FEATURE_GROUPS.map((group) => (
                  <div key={group.title}>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                      {group.title}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {group.items.map((item) => (
                        <li key={item} className="text-base text-foreground break-keep">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {featureImage && (
                <a
                  href={featureImage.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 flex max-w-xs items-center gap-3 rounded-xl border border-border p-2 transition-colors hover:border-primary/40"
                >
                  <img
                    src={featureImage.image}
                    alt={featureImage.title}
                    className="h-16 w-24 shrink-0 rounded-lg object-cover"
                  />
                  <span className="flex items-center gap-1 text-sm font-medium text-primary">
                    실제 홈페이지 화면 보기
                    <ExternalLink className="h-3 w-3" />
                  </span>
                </a>
              )}
            </Reveal>
          </div>
        </div>

        {/* 04 고객 편의 기능 */}
        <div className="border-b border-border py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <span className="font-mono text-5xl font-bold text-primary/25">02</span>
              <h2 className="mt-2 text-3xl font-bold text-foreground">고객이 홈페이지에서 직접 할 수 있습니다</h2>

              <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1.5">
                {CUSTOMER_FLOW.map((step, i) => (
                  <Reveal key={step} delay={i * 90} className="flex items-center gap-2">
                    <span className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary">
                      {step}
                    </span>
                    {i < CUSTOMER_FLOW.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/50" />}
                  </Reveal>
                ))}
              </div>

              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
                {CUSTOMER_FEATURES.map((item) => (
                  <li key={item} className="text-base text-foreground break-keep">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            {flowSample && (
              <RevealScale delay={150} className="lg:col-span-5">
                <a
                  href={flowSample.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-xl border border-border transition-colors hover:border-primary/40"
                >
                  <img src={flowSample.image} alt={flowSample.title} className="h-56 w-full object-cover" />
                  <div className="flex items-center justify-between p-4">
                    <span className="text-base font-medium text-foreground">{flowSample.title}</span>
                    <span className="flex items-center gap-1 text-sm font-medium text-primary">
                      실제 사이트 보기
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </a>
              </RevealScale>
            )}
          </div>
        </div>

        {/* 05 관리자 기능 — 메인 하이라이트 */}
        <div className="border-b border-border py-16 sm:py-24">
          <Reveal>
            <span className="font-mono text-5xl font-bold text-primary/25">03</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              홈페이지를 직접 운영할 수 있는 관리자 시스템
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground break-keep">
              문의 확인부터 콘텐츠 등록, 예약·고객·직원관리까지. 필요한 업무를 하나의 관리자 화면으로
              구성할 수 있습니다.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start">
            <Reveal delay={120} className="lg:col-span-4">
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 lg:grid-cols-1">
                {ADMIN_FEATURES.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-base text-foreground break-keep">
                    <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-8 gap-2 font-bold shadow-md">
                <Link to="/web-solutions/demos">
                  <ShieldCheck className="h-4 w-4" />
                  실제 관리자 데모 체험하기
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
            <RevealScale delay={220} className="lg:col-span-8">
              <DashboardPreview stats={INDUSTRY_SHOWCASES[0].previewStats} menuIcons={INDUSTRY_SHOWCASES[0].features} />
            </RevealScale>
          </div>
        </div>

        {/* 06 확장 기능 */}
        <div className="py-16 sm:py-24">
          <Reveal>
            <span className="font-mono text-5xl font-bold text-primary/25">04</span>
            <h2 className="mt-2 text-3xl font-bold text-foreground">다른 서비스와 연결할 수 있습니다</h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground break-keep">
              필요한 경우 데이터베이스, 결제, 지도, 문자, 외부 서비스까지 홈페이지와 연결해 구축할 수
              있습니다.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {EXTENSION_GROUPS.map((group, i) => {
              const GroupIcon = group.icon;
              return (
                <Reveal key={group.title} delay={i * 80}>
                  <div className="flex items-center gap-2">
                    <GroupIcon className="h-4 w-4 text-primary" />
                    <h3 className="text-base font-bold text-foreground">{group.title}</h3>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground break-keep">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={200} className="mt-14 flex flex-col items-center">
            <div className="rounded-xl border border-primary/30 bg-primary/5 px-6 py-3">
              <span className="text-base font-bold text-foreground">MintCL 홈페이지</span>
            </div>
            <div className="h-6 w-px bg-border" />
            <div className="flex w-full max-w-2xl flex-wrap justify-center gap-x-8 gap-y-4 border-t border-border pt-0 sm:justify-between">
              {CONNECTION_NODES.map((node, i) => {
                const NodeIcon = node.icon;
                return (
                  <Reveal key={node.label} delay={250 + i * 90} className="flex flex-col items-center">
                    <div className="h-5 w-px bg-border" />
                    <div className="mt-2 flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2">
                      <NodeIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{node.label}</span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>

      {/* 07 업종별 활용 예 */}
      <div className="border-y border-border bg-secondary/30 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 className="text-3xl font-bold text-foreground">업종별 실제 활용 예</h2>
            <p className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground break-keep">
              업종별 맞춤 제작에서는 실제 업무 흐름에 맞춰 관리자 기능이 연결됩니다.
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-8 flex flex-wrap gap-2">
            {INDUSTRY_SHOWCASES.map((ind, i) => (
              <button
                key={ind.key}
                type="button"
                onClick={() => setActiveIndustry(i)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  i === activeIndustry
                    ? "bg-foreground text-background"
                    : "bg-card text-muted-foreground border border-border hover:text-foreground",
                )}
              >
                {ind.name}
              </button>
            ))}
          </Reveal>

          {/* 업종 탭을 바꾸면 key가 바뀌며 내용이 부드럽게 크로스페이드된다 */}
          <div key={industry.key} className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center motion-safe:animate-hero-text-fade">
            <div className="lg:col-span-5">
              <h3 className="text-xl font-bold text-foreground">{industry.name} 운영 흐름</h3>
              <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
                {INDUSTRY_FLOWS[industry.key].map((step, i, arr) => (
                  <span key={step} className="flex items-center gap-2">
                    <span className="rounded-full bg-card border border-border px-3 py-1.5 text-sm text-foreground">{step}</span>
                    {i < arr.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/50" />}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground break-keep">{industry.connectionNote}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="sm" variant="outline" className="gap-1.5">
                  <a href={industry.siteHref} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-3.5 w-3.5" />
                    고객 홈페이지
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
                <Button asChild size="sm" className="gap-1.5 font-bold">
                  <a href={industry.adminHref} target="_blank" rel="noopener noreferrer">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    관리자 데모
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-7">
              <DashboardPreview stats={industry.previewStats} menuIcons={industry.features} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        {/* 08 관리자 ↔ 홈페이지 연결 */}
        <div className="border-b border-border py-16 sm:py-24">
          <Reveal>
            <h2 className="text-3xl font-bold text-foreground">관리하면, 홈페이지에 반영됩니다</h2>
            <p className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground break-keep">
              예를 들어 관리자가 새로운 매물을 등록하고 공개하면, 데이터가 저장되고 고객 홈페이지의 매물
              목록에 바로 표시됩니다.
            </p>
          </Reveal>
          <RevealScale delay={150} className="mt-8 max-w-2xl">
            <ConnectionFlow note="홈페이지의 내용과 관리자 데이터가 연결되도록 구축할 수 있습니다. 매번 개발자에게 요청하지 않고 운영자가 직접 관리할 수 있습니다." />
          </RevealScale>
        </div>

        {/* 09 필요한 만큼 확장 */}
        <div className="py-16 sm:py-24">
          <Reveal>
            <h2 className="text-3xl font-bold text-foreground">필요한 기능만 선택하면 됩니다</h2>
            <p className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground break-keep">
              모든 기능을 처음부터 사용할 필요는 없습니다. 사업에 필요한 페이지와 기능만 선택해 구성하며,
              향후 필요할 때 추가 기능을 확장할 수도 있습니다.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {GROWTH_STAGES.map((stage, i) => (
              <Reveal key={stage.stage} delay={i * 150} className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-0">
                <div className="rounded-xl border border-border bg-card p-5 flex-1 sm:w-full">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">{stage.stage}</p>
                  <ul className="mt-3 space-y-1.5">
                    {stage.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-base font-medium text-foreground">
                        <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {i < GROWTH_STAGES.length - 1 && (
                  <ArrowRight className="hidden h-5 w-5 shrink-0 text-muted-foreground/40 sm:block sm:mx-auto sm:my-3 sm:rotate-0" />
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* 10 마지막 CTA */}
      <Reveal className="border-t border-border bg-secondary/30 py-16 text-center sm:py-24">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            우리 회사에는 어떤 기능이 필요할까요?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground break-keep">
            소개형 홈페이지부터 관리자·DB가 연결된 업무 시스템까지, 필요한 범위에 맞춰 구성해드립니다.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="gap-2 font-bold shadow-md">
              <Link to="/contact">
                <Send className="h-4 w-4" />
                필요한 기능 상담하기
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/web-solutions">업종별 구축 사례 보기</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">구체적인 기능을 아직 정하지 못해도 괜찮습니다.</p>
        </div>
      </Reveal>
    </div>
  );
}
