import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { SectionPhoto } from "@/components/ui/SectionPhoto";
import { Layout, Code2, LifeBuoy } from "lucide-react";
import photo from "@/assets/images/03_wireframe_sketch.jpg";

const DIFFERENTIATORS = [
  {
    num: "01",
    title: "맞춤 제작",
    desc: "템플릿에 맞추는 것이 아니라 업종과 목적에 따라 화면과 기능을 설계합니다.",
    icon: Layout,
  },
  {
    num: "02",
    title: "직접 개발",
    desc: "디자인뿐 아니라 기능과 구조까지 자유롭게 커스터마이징합니다.",
    icon: Code2,
  },
  {
    num: "03",
    title: "제작 후 지원",
    desc: "오픈 후 발생하는 수정과 운영에 대한 지원을 계속 이어갑니다.",
    icon: LifeBuoy,
  },
];

export function ProblemSection() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-secondary/30 py-20 lg:py-28">
      <SectionPhoto src={photo} />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          label="WHY MintCL"
          title="왜 MintCL과 함께해야 할까요?"
          description="정해진 템플릿이 아니라, 사업과 목적에 맞춰 처음부터 설계합니다."
        />

        {/* Differentiator Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {DIFFERENTIATORS.map((item, i) => {
            const IconComp = item.icon;

            return (
              <FadeIn key={item.num} delay={i * 100} className="h-full">
                <div className="group h-full rounded-2xl border border-border bg-card p-7 shadow-xs transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-primary">{item.num}</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <IconComp className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="mt-6 text-lg font-bold tracking-tight text-foreground break-keep">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground break-keep">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}


