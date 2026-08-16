import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { SectionPhoto } from "@/components/ui/SectionPhoto";
import { HelpCircle, RefreshCw, Gem, MessageSquareWarning } from "lucide-react";
import photo from "@/assets/images/04_code_editor.jpg";

const RECOMMENDED_FOR = [
  {
    icon: HelpCircle,
    title: "홈페이지가 처음이신 분",
    desc: "어떤 메뉴와 내용이 필요한지 잘 모르셔도 함께 구성합니다.",
  },
  {
    icon: RefreshCw,
    title: "기존 홈페이지가 오래된 분",
    desc: "PC 중심의 오래된 홈페이지를 모바일 환경에 맞게 개선합니다.",
  },
  {
    icon: Gem,
    title: "브랜드 이미지를 제대로 보여주고 싶은 분",
    desc: "단순 정보 전달을 넘어 브랜드 분위기에 맞춰 구성합니다.",
  },
  {
    icon: MessageSquareWarning,
    title: "업체에 수정 요청하기 불편했던 분",
    desc: "추후 수정과 확장을 고려해 제작합니다.",
  },
];

export function RecommendedForSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:py-28">
      <SectionPhoto src={photo} className="-right-16 -top-14 h-64 w-64" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader label="FOR YOU" title="이런 분께 추천합니다" align="center" />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {RECOMMENDED_FOR.map((item, i) => {
            const IconComp = item.icon;
            return (
              <FadeIn key={item.title} delay={i * 70}>
                <div className="flex h-full flex-col gap-3 rounded-xl border border-border bg-card/70 p-6 shadow-xs transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground break-keep">{item.title}</h3>
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
