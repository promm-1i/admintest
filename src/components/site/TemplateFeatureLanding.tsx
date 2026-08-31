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
import { getDesignCode } from "@/lib/designCode";
import type { Sample } from "@/lib/samples";
import { TEMPLATE_SECTIONS } from "@/lib/templateSections";

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

/** 템플릿 구매 전 공통 질문 — 상담 직전 망설임을 줄이는 답 */
const BUY_FAQ = [
  {
    q: "쓸 만한 사진이 없어요.",
    a: "업종에 맞는 고품질 이미지를 저희가 준비해 드립니다. 매장 사진이 있으면 더 좋지만, 없어도 제작에는 문제가 없습니다.",
  },
  {
    q: "문구를 어떻게 써야 할지 모르겠어요.",
    a: "업종별로 검증된 문구 구성이 템플릿에 들어 있습니다. 상호 · 주소 · 가격만 알려주시면 나머지는 저희가 다듬어 드립니다.",
  },
  {
    q: "수정은 몇 번까지 되나요?",
    a: "제작 중 검수 단계에서 문구 · 사진 교체는 횟수 제한 없이 반영합니다. 구성 자체를 바꾸는 큰 수정은 상담 시 범위를 정합니다.",
  },
  {
    q: "여기서 색이나 메뉴를 바꿀 수 있나요?",
    a: "네. 템플릿은 시작점이고, 브랜드 색 · 메뉴 구성 · 섹션 순서를 원하시는 대로 조정해 제작합니다.",
  },
  {
    q: "제작 후에 내용은 어떻게 고치나요?",
    a: "공지 · 게시글 · 팝업은 관리자 모드에서 직접 수정하실 수 있고, 디자인 수정이 필요하면 건별로 빠르게 처리해 드립니다.",
  },
  {
    q: "매달 나가는 비용이 있나요?",
    a: "호스팅(연 24만원)과 2년차부터의 도메인 연 3만원이 전부입니다. 그 외 숨은 월 비용은 없습니다.",
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
  // /templates/{slug}-basic|landing/ 형태의 liveUrl에서 섹션 미리보기 이미지 슬러그를 뽑는다
  const sectionSlug = sample.liveUrl?.match(/\/templates\/([a-z]+)-(?:basic|landing)\//)?.[1];
  const industry = sample.industryKey ? INDUSTRY_CONTENT[sample.industryKey] : undefined;
  const sectionShots = sectionSlug ? (TEMPLATE_SECTIONS[sectionSlug] ?? []) : [];

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

      {/* 이 템플릿에 담긴 화면들 — 실물 섹션 캡처 + 실제 섹션 제목 */}
      {sectionShots.length > 0 && (
        <section>
          <Reveal>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
              INSIDE THIS TEMPLATE
            </p>
            <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
              이 템플릿에 담긴 화면들
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
              실제 배포된 템플릿에서 화면을 그대로 잘라왔습니다. 문구 · 사진 · 가격만 바꾸면 이
              구성이 그대로 사장님 홈페이지가 됩니다.
            </p>
          </Reveal>

          {sample.features && (
            <Reveal delay={80} className="mt-5 flex flex-wrap gap-2">
              {sample.features.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1.5 text-xs font-bold text-primary"
                >
                  <Check className="h-3 w-3" />
                  {f}
                </span>
              ))}
            </Reveal>
          )}

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {sectionShots.map((shot, i) => (
              <FadeIn key={shot.img} direction="up" delay={(i % 2) * 90}>
                <figure className="group overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
                  <div className="overflow-hidden border-b border-border">
                    <img
                      src={shot.img}
                      alt={shot.title}
                      loading="lazy"
                      className="max-h-[340px] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="flex items-center gap-3 px-5 py-3.5">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 font-mono text-[11px] font-bold text-primary">
                      {i + 1}
                    </span>
                    <span className="truncate text-sm font-bold text-foreground">{shot.title}</span>
                    <span className="ml-auto shrink-0 text-[11px] font-medium text-muted-foreground">
                      실물 캡처
                    </span>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* 주요 기능 */}
      <section>
        <Reveal>
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
            FEATURES
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
            함께 제공되는 기능
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
            화면 뒤에서 운영을 받쳐주는 기능들입니다. 전부 기본 제공되며, 별도 프로그램 없이
            관리자 화면에서 직접 다룹니다.
          </p>
        </Reveal>

        {industry && industry.dedicated.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {industry.dedicated.map((f, i) => {
              const Icon = f.icon;
              return (
                <FadeIn key={f.title} direction="up" delay={i * 90}>
                  <div className="h-full rounded-2xl bg-primary/[0.05] p-6 ring-1 ring-primary/15">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      <div>
                        <p className="text-[11px] font-bold tracking-wide text-primary">업종 전용</p>
                        <p className="text-base font-bold text-foreground">{f.title}</p>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-1.5">
                      {f.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-sm leading-relaxed text-foreground/75 break-keep">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        )}

        <FadeIn direction="up" delay={120}>
          <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="grid sm:grid-cols-2">
              {COMMON_FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className={`flex items-start gap-4 px-6 py-5 ${i > 0 ? "border-t border-border/70" : ""} ${i > 1 ? "" : "sm:border-t-0"} ${i % 2 === 1 ? "sm:border-l sm:border-border/70" : ""} ${i > 1 ? "sm:border-t sm:border-border/70" : ""}`}
                  >
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <Icon className="h-4 w-4 text-primary" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-foreground">{f.title}</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground break-keep">
                        {f.points[0]} · {f.points[1]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 모바일 미리보기 — 손님 절반은 폰으로 봅니다 */}
      {sectionSlug && (
        <section className="overflow-hidden rounded-2xl border border-border bg-foreground p-8 text-background sm:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <Reveal>
              <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary-foreground/60">
                MOBILE
              </p>
              <h2 className="mt-3 text-2xl font-bold sm:text-3xl break-keep">
                손님 절반은
                <br />
                휴대폰으로 봅니다
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-background/70 break-keep">
                같은 홈페이지가 태블릿 · 모바일 화면 크기에 맞춰 자동으로 재배치됩니다. 줄바꿈과
                버튼 크기까지 손가락에 맞게 조정된 실제 화면 그대로입니다.
              </p>
              <ul className="mt-6 space-y-2">
                {["전화 · 문자 버튼이 항상 손 닿는 곳에", "표와 가격도 가로 스크롤 없이", "하단 고정 상담 바 기본 제공"].map((t) => (
                  <li key={t} className="flex items-center gap-2.5 text-sm text-background/80">
                    <Check className="h-4 w-4 shrink-0 text-primary-foreground/70" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <FadeIn direction="up" delay={120} className="mx-auto flex items-end gap-5 lg:gap-6">
              {/* 태블릿 — 얇은 균일 베젤 */}
              <div className="hidden shrink-0 overflow-hidden rounded-[22px] border-[9px] border-neutral-800 bg-black shadow-2xl md:block md:w-[250px] lg:w-[280px]">
                <img
                  src={`/thumbs/tablet/${sectionSlug}.jpg`}
                  alt="태블릿 화면"
                  loading="lazy"
                  className="aspect-[768/1024] w-full object-cover object-top"
                />
              </div>
              {/* iPhone 17 Pro Max — 큰 라운드 코너 + 다이나믹 아일랜드 */}
              <div className="relative w-[190px] shrink-0 overflow-hidden rounded-[34px] border-[7px] border-black bg-black shadow-2xl sm:w-[210px]">
                <div className="absolute left-1/2 top-2 z-10 h-[18px] w-[74px] -translate-x-1/2 rounded-full bg-black" />
                <img
                  src={`/thumbs/mobile/${sectionSlug}-1.jpg`}
                  alt="모바일 화면 1"
                  loading="lazy"
                  className="aspect-[390/780] w-full rounded-[27px] object-cover object-top"
                />
              </div>
              {/* Galaxy S25 Ultra — 각진 코너 + 중앙 펀치홀 */}
              <div className="relative hidden w-[190px] shrink-0 overflow-hidden rounded-[16px] border-[6px] border-neutral-900 bg-black shadow-2xl sm:block sm:w-[210px] sm:translate-y-5">
                <div className="absolute left-1/2 top-2.5 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
                <img
                  src={`/thumbs/mobile/${sectionSlug}-2.jpg`}
                  alt="모바일 화면 2"
                  loading="lazy"
                  className="aspect-[390/780] w-full rounded-[10px] object-cover object-top"
                />
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* 제작 전에 자주 묻는 질문 */}
      <section>
        <Reveal>
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">FAQ</p>
          <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
            제작 전에 자주 묻는 질문
          </h2>
        </Reveal>
        <FadeIn direction="up" delay={100}>
          <div className="mt-7 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {BUY_FAQ.map((f) => (
              <div key={f.q} className="rounded-2xl border border-border bg-card p-6">
                <p className="flex items-start gap-2.5 text-[15px] font-bold text-foreground break-keep">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-[11px] font-extrabold text-primary">
                    Q
                  </span>
                  {f.q}
                </p>
                <p className="mt-2.5 pl-[30px] text-sm leading-relaxed text-muted-foreground break-keep">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
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
            <Link to={`/contact?design=${encodeURIComponent(getDesignCode(sample))}`}>
              이 디자인으로 상담받기
            </Link>
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
