import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Ruler,
  Type,
  Smartphone,
  Gauge,
  Search,
  ShieldCheck,
  Camera,
  Palette,
  type LucideIcon,
} from "lucide-react";
import type { Sample } from "@/lib/samples";
import { TEMPLATE_SECTIONS } from "@/lib/templateSections";
import { Reveal } from "@/pages/services/previewKit";

/** 프리미엄 라인에 공통으로 들어가는 제작 사양 — 기본형·랜딩형과 구분되는 지점만 적는다 */
const PREMIUM_SPECS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Ruler,
    title: "픽셀 단위 실측 설계",
    body: "레이아웃·여백·라운드·그림자를 눈대중이 아니라 값으로 정하고, 세 가지 화면 폭에서 다시 재서 맞춥니다.",
  },
  {
    icon: Type,
    title: "한글 조판까지 손봅니다",
    body: "제목이 어디서 끊기는지, 마지막 줄에 한 글자만 남지 않는지까지 문장 단위로 조정합니다.",
  },
  {
    icon: Camera,
    title: "사진을 새로 만들어 넣습니다",
    body: "업종과 화면 크기에 맞는 사진을 제작해 채웁니다. 가지고 계신 사진이 있으면 그것을 씁니다.",
  },
  {
    icon: Smartphone,
    title: "PC · 태블릿 · 모바일 각각",
    body: "축소만 하지 않습니다. 1440 · 768 · 390 세 폭에서 배치를 따로 짜고 손가락 터치 영역까지 확인합니다.",
  },
  {
    icon: Gauge,
    title: "움직임이 있는 화면",
    body: "스크롤에 따라 나타나는 요소, 흐르는 띠, 열리고 닫히는 목록을 넣되 속도를 줄이는 설정도 함께 지원합니다.",
  },
  {
    icon: Search,
    title: "검색 노출 준비",
    body: "제목·설명·대표 이미지·구조화 정보를 넣어 검색과 카카오톡·문자 공유에서 제대로 보이게 합니다.",
  },
];

const PREMIUM_INCLUDED = [
  "이 디자인 그대로 문구 · 사진 · 색을 바꿔 제작",
  "업종에 맞는 사진 제작 (필요 수량만큼)",
  "PC · 태블릿 · 모바일 세 폭 각각 배치",
  "문의 · 상담 폼과 접수 알림 문자",
  "관리자 화면 (공지 · 문의 · 팝업 직접 관리)",
  "도메인 1개 · 호스팅 1년",
  "검색엔진 최적화와 검색 등록 대행",
  "오픈 후 한 달 무상 수정",
];

const PREMIUM_STEPS = [
  { no: "01", title: "디자인 확정", body: "이 화면을 기준으로 바꾸실 부분(색 · 메뉴 · 섹션 순서)을 먼저 정합니다." },
  { no: "02", title: "자료 전달", body: "상호 · 로고 · 연락처와 넣고 싶은 내용을 주시면 나머지 문구는 저희가 다듬습니다." },
  { no: "03", title: "제작 · 검수", body: "사진을 만들어 채우고 세 폭에서 확인한 뒤 함께 보면서 고칩니다." },
  { no: "04", title: "오픈 · 운영", body: "도메인을 연결해 열고, 이후에는 관리자 화면에서 직접 운영하십니다." },
];

const PREMIUM_FAQ = [
  {
    q: "기본형 · 랜딩형과 무엇이 다른가요?",
    a: "기본형과 랜딩형은 완성된 틀에 내용을 넣는 방식입니다. 프리미엄은 이 화면 자체를 사장님 브랜드에 맞춰 다시 짭니다. 사진도 새로 만들고, 화면 폭마다 배치를 따로 잡습니다.",
  },
  {
    q: "이 디자인에서 색이나 구성을 바꿀 수 있나요?",
    a: "네. 이 화면은 출발점입니다. 브랜드 색 · 메뉴 구성 · 섹션 순서 · 사진 분위기를 원하시는 대로 조정해 제작합니다.",
  },
  {
    q: "사진이 하나도 없는데 괜찮을까요?",
    a: "괜찮습니다. 이 화면에 들어간 사진도 전부 제작한 것입니다. 매장 · 제품 사진을 주시면 그것을 우선 쓰고, 부족한 자리는 만들어 채웁니다.",
  },
  {
    q: "제작 기간은 얼마나 걸리나요?",
    a: "자료를 받은 뒤 영업일 기준 3~4주를 봅니다. 사진 제작과 검수에 시간이 걸리기 때문이고, 급하시면 상담 때 일정을 따로 잡습니다.",
  },
  {
    q: "오픈한 다음 내용은 어떻게 고치나요?",
    a: "공지 · 문의 · 팝업은 관리자 화면에서 직접 수정하십니다. 디자인을 바꾸는 수정은 오픈 후 한 달 동안 무상이고, 이후에는 건별로 처리합니다.",
  },
];

export function PremiumDetailSections({ sample }: { sample: Sample }) {
  const folder = sample.liveUrl?.match(/\/templates\/([a-z0-9-]+)\//)?.[1];
  const shots = folder ? (TEMPLATE_SECTIONS[folder] ?? []) : [];

  return (
    <div className="mt-16 space-y-16">
      {/* 이 디자인에 담긴 화면들 — 실물 캡처 */}
      {shots.length > 0 && (
        <section>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-primary">
            Inside This Design
          </p>
          <h2 className="mt-2 text-xl font-bold text-foreground sm:text-2xl">이 디자인에 담긴 화면들</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
            실제 배포된 화면을 그대로 잘라왔습니다. 문구 · 사진 · 가격만 바꾸면 이 구성이 그대로 사장님 홈페이지가 됩니다.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {shots.map((shot, i) => (
              <Reveal key={shot.img} delay={i * 70}>
                <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
                  <img
                    src={shot.img}
                    alt={shot.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover object-top"
                  />
                  <figcaption className="flex items-center justify-between gap-3 border-t border-border px-5 py-3.5">
                    <span className="min-w-0 truncate text-sm font-semibold text-foreground">{shot.title}</span>
                    <span className="shrink-0 rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-secondary-foreground">
                      실물 캡처
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* 구성 안내 — 이 디자인의 주요 구성 + 추천 대상 */}
      <section>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-primary">Structure</p>
        <h2 className="mt-2 text-xl font-bold text-foreground sm:text-2xl">홈페이지 구성 안내</h2>
        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
          <div className="bg-card p-6 sm:p-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">주요 구성</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {sample.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="font-medium text-foreground break-keep">{f}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground break-keep">
              {sample.purpose}
            </p>
          </div>
          <div className="bg-card p-6 sm:p-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">이런 곳에 맞습니다</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground break-keep">{sample.idealFor}</p>
            <h3 className="mt-8 text-sm font-bold uppercase tracking-wider text-muted-foreground/70">
              페이지 구성
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground break-keep">
              이 화면은 한 페이지 안에서 소개부터 문의까지 이어지는 구성입니다. 회사소개 · 서비스 안내 ·
              공지사항 같은 서브페이지가 필요하시면 상담 때 함께 정합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 프리미엄 제작 사양 */}
      <section>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-primary">How We Build</p>
        <h2 className="mt-2 text-xl font-bold text-foreground sm:text-2xl">프리미엄 라인은 이렇게 만듭니다</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
          완성된 틀에 내용만 채우는 방식이 아니라, 화면 자체를 브랜드에 맞춰 다시 짭니다.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PREMIUM_SPECS.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-xs">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-keep">{f.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* 포함되는 것 + 제작 방식 */}
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-primary">Included</p>
          <h2 className="mt-2 text-xl font-bold text-foreground sm:text-2xl">함께 제공되는 것</h2>
          <ul className="mt-6 grid gap-2.5">
            {PREMIUM_INCLUDED.map((t) => (
              <li key={t} className="flex items-start gap-2.5 rounded-xl border border-border bg-card px-4 py-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground break-keep">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-primary">Process</p>
          <h2 className="mt-2 text-xl font-bold text-foreground sm:text-2xl">제작 방식</h2>
          <ol className="mt-6 space-y-4">
            {PREMIUM_STEPS.map((s) => (
              <li key={s.no} className="flex gap-4 rounded-xl border border-border bg-card p-5">
                <span className="font-mono text-sm font-bold text-primary">{s.no}</span>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-foreground">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground break-keep">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-primary">FAQ</p>
        <h2 className="mt-2 text-xl font-bold text-foreground sm:text-2xl">제작 전에 자주 묻는 질문</h2>
        <div className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {PREMIUM_FAQ.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-sm font-bold text-foreground">
                <span className="break-keep">{f.q}</span>
                <span className="shrink-0 text-lg font-normal text-primary transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground break-keep">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 가격 안내 */}
      <section className="rounded-2xl border border-primary/40 bg-primary/[0.04] p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            PREMIUM DESIGN
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
            <Palette className="h-3.5 w-3.5" />
            디자인 · 사진 제작 포함
          </span>
        </div>
        <h2 className="mt-3 text-lg font-bold text-foreground">제작 비용</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
          이 디자인을 기반으로 문구 · 이미지 · 구성을 맞춰 제작하며,{" "}
          <strong className="font-mono text-base text-foreground">300만 원</strong>부터 시작합니다 (부가세 별도).
          호스팅 1년과 도메인 1개가 포함된 금액이고, 사진 수량과 서브페이지 수에 따라 달라집니다.
        </p>
        <Link
          to="/web-solutions"
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          프리미엄 라인 안내 보기 →
        </Link>
      </section>
    </div>
  );
}
