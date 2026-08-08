import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { FadeIn } from "@/components/ui/FadeIn";
import { STATS, PROCESS_STEPS } from "@/lib/pricing";

export function HeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
        <FadeIn>
          <p className="text-sm font-medium tracking-widest text-primary">MINTCL</p>
          <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            작은 회사도
            <br />
            제대로 보이게.
          </h1>
          <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            소상공인·1인기업을 위한 홈페이지 제작. 기획, 디자인, 배포, 기본 유지보수까지 — 처음
            홈페이지를 만드는 분도 이해하기 쉽게 진행합니다.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/contact">제작 상담하기</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/samples">샘플 보기</Link>
            </Button>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-xl font-semibold tracking-tight sm:text-2xl">{s.value}</dd>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </dl>
        </FadeIn>

        <FadeIn direction="left" delay={120} className="relative">
          <div className="relative ml-auto max-w-sm">
            <ImagePlaceholder ratio="portrait" label="제작 홈페이지 미리보기" className="shadow-sm" />
            <div className="absolute -bottom-8 -left-8 w-48 rounded-xl border border-border bg-card p-4 shadow-lg sm:-left-12 sm:w-56">
              <p className="text-xs font-medium text-muted-foreground">제작 진행 상태</p>
              <ul className="mt-2 space-y-1.5">
                {PROCESS_STEPS.slice(0, 3).map((s, i) => (
                  <li key={s.step} className="flex items-center gap-2 text-xs">
                    <span
                      className={
                        i < 2
                          ? "size-1.5 shrink-0 rounded-full bg-primary"
                          : "size-1.5 shrink-0 rounded-full border border-muted-foreground/40"
                      }
                    />
                    <span className={i < 2 ? "text-foreground" : "text-muted-foreground"}>{s.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
