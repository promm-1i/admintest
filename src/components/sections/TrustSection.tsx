import { FadeIn } from "@/components/ui/FadeIn";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { Palette, MonitorSmartphone, Layers, LifeBuoy } from "lucide-react";
import bgTexture from "@/assets/images/bg_texture_1.jpg";

const PERFORMANCE_STATS = [
  { value: "일 3건+", label: "평균 문의 접수" },
  { value: "50+", label: "누적 프로젝트 완료" },
  { value: "20+", label: "재계약 고객" },
  { value: "80%+", label: "재계약률" },
];

const TRUST_ITEMS = [
  {
    icon: Palette,
    title: "맞춤형 제작",
    desc: "업종과 원하는 분위기에 맞춰 구성부터 디자인합니다.",
  },
  {
    icon: MonitorSmartphone,
    title: "PC · 모바일 반응형",
    desc: "PC, 태블릿, 모바일 환경에 맞게 최적화합니다.",
  },
  {
    icon: Layers,
    title: "운영까지 고려한 설계",
    desc: "단순히 보여주기 위한 페이지가 아니라 실제 운영과 확장성을 고려합니다.",
  },
  {
    icon: LifeBuoy,
    title: "제작 후 지원",
    desc: "도메인 연결과 기본적인 운영 방법까지 안내합니다.",
  },
];

export function TrustSection() {
  return (
    <section className="relative overflow-hidden bg-background py-16 lg:py-20">
      <SectionBackground
        src={bgTexture}
        opacity={0.08}
        overlayClassName="bg-gradient-to-b from-background/75 via-background/50 to-background/80"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <p className="text-center text-sm font-medium tracking-widest text-primary">MINTCL WEB STUDIO</p>
          <h2 className="mt-3 text-balance text-center text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            홈페이지 제작, 이런 부분까지 함께합니다.
          </h2>
        </FadeIn>

        <FadeIn delay={40}>
          <dl className="mt-8 grid grid-cols-2 gap-6 rounded-2xl border border-border bg-card px-6 py-6 sm:grid-cols-4 sm:gap-4">
            {PERFORMANCE_STATS.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-xl font-semibold tracking-tight text-primary sm:text-2xl">
                  {s.value}
                </dd>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </dl>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_ITEMS.map((item, i) => {
            const IconComp = item.icon;
            return (
              <FadeIn key={item.title} delay={i * 60}>
                <div className="flex h-full flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center shadow-xs transition-all duration-300 hover:border-primary/50 hover:shadow-md">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground break-keep">{item.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
