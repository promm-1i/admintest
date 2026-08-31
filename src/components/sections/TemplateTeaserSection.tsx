import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { SAMPLES } from "@/lib/samples";

/** 판매 중인 템플릿(industryKey 보유)을 기본형/랜딩형 두 그룹으로 나눠 전부 표출한다. */
const STYLE_GROUPS = [
  {
    key: "basic-template",
    label: "기본형 템플릿",
    desc: "핵심 정보만 담백하게 담은 표준 구성",
    href: "/templates?style=basic-template",
  },
  {
    key: "landing-template",
    label: "랜딩형 템플릿",
    desc: "스크롤 연출이 더해진 프리미엄 원페이지",
    href: "/templates?style=landing-template",
  },
].map((g) => ({
  ...g,
  items: SAMPLES.filter((s) => s.industryKey && s.type.includes(g.key)),
}));

export function TemplateTeaserSection() {
  return (
    <section className="px-3 py-20 sm:px-5 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeader
            label="TEMPLATE"
            title={<>빠르게 시작하려면,<br />미리 제작된 템플릿도 있습니다.</>}
            description="완성된 디자인을 기반으로 문구·이미지·회사정보를 적용해 빠르게 제작할 수 있습니다. 맞춤 제작과 달리 정해진 구성 안에서 빠르게 시작하는 상품입니다."
          />
          <Link
            to="/templates"
            className="flex shrink-0 items-center gap-1.5 self-start text-sm font-medium text-primary hover:underline md:self-auto"
          >
            홈페이지 템플릿 보기
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {STYLE_GROUPS.map((group, gi) => (
            <FadeIn key={group.key} delay={gi * 80}>
              <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5 sm:p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{group.label}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{group.desc}</p>
                  </div>
                  <Link
                    to={group.href}
                    className="flex shrink-0 items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    전체 보기
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {group.items.map((sample) => (
                    <Link
                      key={sample.slug}
                      to={`/samples/${sample.slug}`}
                      className="group relative block overflow-hidden rounded-lg border border-border"
                    >
                      <ImagePlaceholder
                        src={sample.image}
                        ratio="photo"
                        label={sample.industry}
                        className="rounded-none border-0 transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* 썸네일만 보고도 무슨 업종인지 바로 읽히도록 그라데이션 위에 크게 표기 */}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3.5 pb-3 pt-10">
                        <p className="text-[11px] font-semibold text-white/70">{sample.tag}</p>
                        <div className="mt-0.5 flex items-center justify-between gap-2">
                          <p className="truncate text-base font-extrabold text-white drop-shadow-sm">
                            {sample.industry.replace(" 홈페이지", "")}
                          </p>
                          <ArrowRight className="h-4 w-4 shrink-0 text-white/80 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
