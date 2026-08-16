import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { SectionPhoto } from "@/components/ui/SectionPhoto";
import { Search, Layout, ArrowRight, CheckCircle2 } from "lucide-react";
import photo from "@/assets/images/03_wireframe_sketch.jpg";

const WORKFLOW_STEPS = [
  {
    step: "STEP 01",
    title: "요구사항 & 예산 진단",
    subtitle: "맞춤 제작 범위 정리",
    desc: "어떤 페이지와 기능이 필요한지 분석하고, 예산 범위 안에서 가장 효율적인 구성을 사전에 명확히 안내드립니다.",
    icon: Search,
  },
  {
    step: "STEP 02",
    title: "신뢰 중심 디자인 & 기획",
    subtitle: "직관적인 서비스 안내",
    desc: "검색 시 고객에게 신뢰를 주는 공식 사이트 디자인과 대표 서비스, 가격 정책을 한눈에 파악되도록 설계합니다.",
    icon: Layout,
  },
  {
    step: "STEP 03",
    title: "상담 연결 & 배포 지원",
    subtitle: "전환 최적화 & 사후 지원",
    desc: "전화, 카카오톡, 문의 폼으로 즉시 연결되는 최적의 상담 동선을 구축하고 배포 후에도 쉬운 운영을 지원합니다.",
    icon: CheckCircle2,
  },
];

export function ProblemSection() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-secondary/30 py-20 lg:py-28">
      <SectionPhoto src={photo} className="-right-14 -bottom-16 h-72 w-72" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          label="WHY MintCL"
          title={
            <>
              SNS나 블로그만으로는
              <br />
              아쉬운 순간이 있습니다.
            </>
          }
          description={
            <>
              검색했을 때 보여줄 공식 대표 사이트, 서비스와 가격이 한눈에 보이는 화면, 마케팅 광고 시
              <br className="hidden sm:inline" />
              연결할 랜딩페이지가 필요할 때 민트클이 함께합니다.
            </>
          }
        />

        {/* Highlight Banner */}
        <FadeIn delay={60} className="mt-6 flex justify-center text-center">
          <p className="inline-block rounded-full border border-border bg-secondary px-6 py-2.5 text-xs sm:text-sm font-semibold text-foreground shadow-2xs break-keep">
            어떤 페이지가 필요한지, 어떤 기능이 필요한지, 예산 안에서 가능한 범위를
            <br />
            먼저 안내드립니다.
          </p>
        </FadeIn>

        {/* Workflow Steps Grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-3 relative">
          {WORKFLOW_STEPS.map((item, i) => {
            const IconComp = item.icon;
            const isLast = i === WORKFLOW_STEPS.length - 1;

            return (
              <FadeIn key={item.step} delay={i * 100} className="relative h-full">
                <div className="group relative h-full flex flex-col justify-between rounded-2xl border border-border bg-card p-7 shadow-xs transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-block rounded-md bg-primary/15 px-3 py-1 font-mono text-xs font-bold text-primary">
                        {item.step}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <IconComp className="h-5 w-5" />
                      </div>
                    </div>

                    <h3 className="mt-6 text-lg font-bold tracking-tight text-foreground break-keep">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-primary">
                      {item.subtitle}
                    </p>

                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground break-keep">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    <span>MintCL Workflow</span>
                    <span className="font-mono">0{i + 1}</span>
                  </div>
                </div>

                {/* Arrow connector between steps on desktop */}
                {!isLast && (
                  <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-primary shadow-xs">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}


