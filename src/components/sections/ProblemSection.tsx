import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { PROBLEM_POINTS } from "@/lib/pricing";

export function ProblemSection() {
  return (
    <section className="border-y border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeader
          label="WHY MINTCL"
          title="블로그와 SNS만으로는 부족할 때가 있습니다."
          description="검색했을 때 보여줄 공식 페이지, 가격·서비스·상담 방법이 한눈에 정리된 화면, 광고를 돌릴 때 연결할 랜딩페이지가 필요한 순간이 있습니다."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {PROBLEM_POINTS.map((item, i) => (
            <FadeIn key={item.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-border bg-card p-7">
                <p className="text-sm font-semibold text-primary">0{i + 1}</p>
                <h3 className="mt-3 font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
