import {
  MessagesSquare,
  Building2,
  Send,
  BarChart3,
  Smartphone,
  LayoutDashboard,
  Search,
  Megaphone,
  Check,
  ArrowRight,
  Stethoscope,
  CalendarCheck,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal, RevealScale } from "@/pages/services/previewKit";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/button";
import type { Sample } from "@/lib/samples";

type IndustryContent = {
  label: string;
  /** 디자인 강점 문단 */
  designNote: string;
  /** 서브페이지로 기본 제공되는 메뉴 */
  subPages: string[];
  /** 업종 전용 기능 2개(주요 기능 8개 중 앞쪽에 배치) */
  dedicated: { icon: LucideIcon; title: string; points: [string, string] }[];
};

const INDUSTRY_CONTENT: Record<string, IndustryContent> = {
  "real-estate": {
    label: "부동산",
    designNote:
      "부동산 업종에 맞는 디자인 컨셉으로, 매물 정보와 연락처처럼 중요한 요소는 눈에 띄게 하고 가독성은 높였습니다. 문장의 위치와 크기, 색상까지 모두 고려해 제작해 드립니다.",
    subPages: ["매물 관리", "조건별 매물 검색", "상담 문의", "공지사항"],
    dedicated: [
      {
        icon: Building2,
        title: "매물 관리 시스템",
        points: [
          "다수의 매물을 실시간으로 등록·수정하고 공개 여부까지 관리",
          "거래 완료 매물은 자동으로 내려 최신 매물만 노출",
        ],
      },
      {
        icon: Search,
        title: "조건별 매물 검색",
        points: [
          "거래유형·매물종류·지역·가격대로 원하는 매물만 좁혀서 확인",
          "고객이 많이 찾는 조건을 파악해 매물 확보 전략에 활용",
        ],
      },
    ],
  },
  hospital: {
    label: "병원 · 의원",
    designNote:
      "병원·의원에 맞는 차분하고 신뢰감 있는 디자인 컨셉으로, 진료과목과 예약 동선처럼 중요한 요소는 눈에 띄게 하고 가독성은 높였습니다. 문장의 위치와 크기, 색상까지 모두 고려해 제작해 드립니다.",
    subPages: ["진료과목 안내", "의료진 소개", "온라인 예약 문의", "공지사항"],
    dedicated: [
      {
        icon: Stethoscope,
        title: "진료과목 · 의료진 관리",
        points: [
          "진료과목과 의료진 정보를 직접 등록·수정하고 노출 순서까지 관리",
          "비급여 항목 등 안내 페이지도 관리자에서 바로 갱신",
        ],
      },
      {
        icon: CalendarCheck,
        title: "진료 예약 문의",
        points: [
          "홈페이지에서 접수된 예약 문의를 한 화면에서 확인·응대",
          "문자 알림과 연결해 접수 즉시 확인 가능",
        ],
      },
    ],
  },
};

/** 업종과 무관하게 모든 템플릿에 공통으로 들어가는 기능 */
const COMMON_FEATURES: { icon: LucideIcon; title: string; points: [string, string] }[] = [
  {
    icon: MessagesSquare,
    title: "상담·문의 시스템",
    points: [
      "언제 어디서나 간편한 상담 신청, 장소의 제약 없음",
      "기록된 상담 데이터로 고객의 니즈 분석 가능",
    ],
  },
  {
    icon: Send,
    title: "문자 발송 시스템",
    points: ["문의 접수 등 실시간 문자 알림", "현황 파악을 통해 신속한 고객 응대 지원"],
  },
  {
    icon: BarChart3,
    title: "접속 통계",
    points: ["방문자 접속 현황 실시간 체크", "유입 경로 및 키워드 분석을 통해 마케팅 활용"],
  },
  {
    icon: Smartphone,
    title: "모바일웹 제작",
    points: ["반응형이 아닌 기본 템플릿 선택 시 무료 제공", "다양한 디바이스에서 안정적인 사용자 경험"],
  },
  {
    icon: LayoutDashboard,
    title: "관리자 모드 제공",
    points: ["공지사항 등 게시글 직접 등록", "악성 방문자 특정 IP 접근 차단 기능"],
  },
  {
    icon: Search,
    title: "검색엔진 최적화",
    points: ["웹 표준 코딩 및 웹 접근성 향상을 통한 SEO", "웹사이트 속도 최적화를 통한 SEO"],
  },
  {
    icon: Megaphone,
    title: "팝업 관리 기능",
    points: ["등록·수정·삭제 등 팝업창 직접 제어", "방문자가 가장 먼저 확인할 수 있도록 주요 공지 강조"],
  },
];

const BUILD_STEPS = [
  { no: "01", title: "디자인 선택", desc: "마음에 드는 템플릿을 고르고 상담을 신청합니다." },
  { no: "02", title: "자료 전달", desc: "로고, 문구, 사진 등 넣고 싶은 내용을 전달해 주세요." },
  { no: "03", title: "제작·검수", desc: "선택한 디자인에 자료를 반영하고 함께 확인합니다." },
  { no: "04", title: "오픈·운영", desc: "도메인 연결 후 오픈하고, 관리자 모드로 직접 운영합니다." },
];

/**
 * 템플릿 상세 하단의 기능 소개 랜딩. 위쪽 미리보기가 "무엇을 보여주는지"라면
 * 이 영역은 "실제로 어떤 기능이 들어가는지"를 스크롤 연출과 함께 설명한다.
 */
export function TemplateFeatureLanding({ sample }: { sample: Sample }) {
  const isLanding = sample.type.includes("landing-template");
  const industry = sample.industryKey ? INDUSTRY_CONTENT[sample.industryKey] : undefined;
  const features = [...(industry?.dedicated ?? []), ...COMMON_FEATURES];

  return (
    <div className="mt-16 space-y-16 sm:space-y-20">
      {/* 디자인 강점 */}
      <section className="rounded-2xl border border-border bg-secondary/30 p-8 sm:p-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
            DESIGN
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl break-keep">
            NOVERIQ 디자인 강점
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground break-keep sm:text-base">
            {industry?.designNote ??
              "업종에 맞는 디자인 컨셉으로 중요한 요소는 눈에 띄게, 가독성은 높게 제작해 드립니다."}
          </p>
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
          {[
            { k: "가독성", v: "글자 크기와 여백까지 조정" },
            { k: "강조", v: "연락처·문의 버튼 상시 노출" },
            { k: "일관성", v: "PC·모바일 동일한 인상" },
          ].map((c, i) => (
            <FadeIn key={c.k} direction="up" delay={i * 90}>
              <div className="rounded-xl border border-border bg-background p-4 text-center">
                <p className="text-sm font-bold text-primary">{c.k}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground break-keep">{c.v}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 홈페이지 구성 안내 */}
      <section>
        <Reveal>
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
            STRUCTURE
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
            {industry?.label ?? ""} 홈페이지 구성 안내
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-stretch">
          <RevealScale className="overflow-hidden rounded-2xl border border-border bg-card">
            {sample.image && (
              <img src={sample.image} alt="" className="h-56 w-full object-cover object-top sm:h-72" />
            )}
            <div className="p-6">
              <p className="text-xs font-bold text-primary">메인페이지</p>
              <p className="mt-2 text-lg font-bold text-foreground break-keep">
                완성도 높은 메인페이지로 이탈률을 낮춰 보세요
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-keep">
                {isLanding
                  ? "스크롤에 따라 콘텐츠가 순차적으로 나타나며, 방문자가 자연스럽게 상담까지 이어지도록 동선을 설계했습니다."
                  : "필요한 정보를 한 화면에 정직하게 정리해, 방문자가 원하는 내용을 빠르게 찾을 수 있게 구성했습니다."}
              </p>
            </div>
          </RevealScale>

          <Reveal delay={120} className="flex flex-col rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-bold text-primary">서브페이지</p>
            <p className="mt-2 text-lg font-bold text-foreground break-keep">
              원하시는 메뉴명과 구성으로 이용하실 수 있습니다
            </p>
            <ul className="mt-5 grid flex-1 content-start gap-2.5 sm:grid-cols-2">
              {(industry?.subPages ?? ["회사소개", "서비스 안내", "문의하기", "공지사항"]).map((p, i) => (
                <FadeIn key={p} direction="left" delay={i * 80}>
                  <li className="flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3.5 py-2.5 text-sm font-medium text-foreground">
                    <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                    {p}
                  </li>
                </FadeIn>
              ))}
            </ul>
            <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground break-keep">
              기본 10개 페이지 안에서 메뉴 구성을 자유롭게 바꿀 수 있고, 페이지가 더 필요하면 상담 시
              추가할 수 있습니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 주요 기능 */}
      <section>
        <Reveal>
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
            FEATURES
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">주요 기능</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
            운영 시스템부터 마케팅까지, 홈페이지를 가장 간편하고 효율적으로 이용하실 수 있도록
            도와드립니다.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            const isDedicated = i < (industry?.dedicated.length ?? 0);
            return (
              <FadeIn key={f.title} direction="up" delay={(i % 3) * 80}>
                <div
                  className={`h-full rounded-xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm ${
                    isDedicated
                      ? "border-primary/30 bg-primary/[0.04] hover:border-primary/50"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        isDedicated ? "bg-primary/12" : "bg-secondary"
                      }`}
                    >
                      <Icon className="h-4 w-4 text-primary" />
                    </span>
                    <h3 className="text-sm font-bold text-foreground break-keep">{f.title}</h3>
                  </div>
                  {isDedicated && (
                    <span className="mt-3 inline-block rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                      {industry?.label} 전용
                    </span>
                  )}
                  <ul className="mt-3 space-y-1.5">
                    {f.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground break-keep"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/50" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* 제작 방식 */}
      <section className="rounded-2xl border border-border bg-secondary/30 p-8 sm:p-10">
        <Reveal>
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
            PROCESS
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">제작 방식</h2>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BUILD_STEPS.map((s, i) => (
            <FadeIn key={s.no} direction="up" delay={i * 110}>
              <div className="relative h-full rounded-xl border border-border bg-background p-5">
                <span className="font-mono text-2xl font-bold text-primary/25">{s.no}</span>
                <h3 className="mt-1 text-sm font-bold text-foreground">{s.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground break-keep">
                  {s.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <Reveal delay={150} className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="gap-2 font-bold">
            <Link to="/contact">이 디자인으로 상담받기</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-1.5">
            <Link to="/website/process">
              제작 과정 자세히 보기
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
