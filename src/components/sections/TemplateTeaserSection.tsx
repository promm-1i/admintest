import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { SAMPLES } from "@/lib/samples";

const TEMPLATE_PREVIEW = SAMPLES.slice(0, 4);

export function TemplateTeaserSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeader
            label="TEMPLATE"
            title="빠르게 시작하려면, 미리 제작된 템플릿도 있습니다."
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

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {TEMPLATE_PREVIEW.map((sample, i) => (
            <FadeIn key={sample.slug} delay={i * 60}>
              <Link to="/templates" className="group relative block overflow-hidden rounded-lg border border-border">
                <ImagePlaceholder
                  src={sample.image}
                  ratio="portrait"
                  label={sample.industry}
                  className="rounded-none border-0 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/0 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="truncate text-xs font-semibold text-white">{sample.industry}</p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
