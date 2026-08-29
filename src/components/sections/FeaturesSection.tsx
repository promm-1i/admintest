import { Monitor, SlidersHorizontal, Rocket } from "lucide-react";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";

const FEATURE_GROUPS = [
  {
    num: "01",
    title: "기본 웹 기능",
    icon: Monitor,
    items: ["PC / 모바일 반응형", "기본 SEO", "문의 / 상담 폼", "전화 · 카카오톡 연결", "지도 연동", "게시판 / 공지사항"],
  },
  {
    num: "02",
    title: "운영 기능",
    icon: SlidersHorizontal,
    items: ["관리자 페이지", "데이터베이스", "검색 / 필터", "고객 문의 관리", "파일 관리"],
  },
  {
    num: "03",
    title: "확장 기능",
    icon: Rocket,
    items: ["결제 연동", "회원 기능", "외부 API 연동", "AI 기능"],
  },
];

export function FeaturesSection() {
  return (
    <section className="border-y border-border bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          label="FEATURES"
          title="필요한 기능을 홈페이지 안에 함께 구축합니다."
          description="기본적인 웹 기능부터 예약·문의를 관리하는 운영 기능, 결제·회원 같은 확장 기능까지 필요한 범위에 맞춰 구성합니다."
        />

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {FEATURE_GROUPS.map((group, i) => {
            const Icon = group.icon;
            return (
            <FadeIn key={group.title} delay={i * 80}>
              <div className={i > 0 ? "sm:border-l sm:border-border sm:pl-10" : ""}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary">{group.num}</span>
                  <Icon className="h-6 w-6 text-muted-foreground/40" strokeWidth={1.5} />
                </div>
                <h3 className="mt-2 text-base font-semibold text-foreground">{group.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm leading-relaxed text-muted-foreground break-keep">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            );
          })}
        </div>

        <p className="mt-10 text-xs leading-relaxed text-muted-foreground/80 break-keep">
          ※ 모든 기능이 기본 포함되는 것은 아니며, 필요한 범위는 상담 후 맞춤으로 결정됩니다.
        </p>
      </div>
    </section>
  );
}
