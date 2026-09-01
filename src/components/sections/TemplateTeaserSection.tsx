import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { SAMPLES } from "@/lib/samples";

/**
 * 홈에서는 "이런 게 있다"만 보여주고 고르는 건 /templates 에서 한다.
 * 전량을 깔면 홈 한 페이지에서 썸네일을 수백 장 내려받게 되고,
 * 카드가 끝없이 반복되는 화면이 된다.
 */
const LANDING = SAMPLES.filter((s) => s.industryKey && s.type.includes("landing-template"));

/** 업종이 겹치지 않게 앞에서부터 하나씩 골라 다양성을 보여준다 */
function pickByIndustry(limit: number) {
  const seen = new Set<string>();
  const out: typeof LANDING = [];
  for (const s of LANDING) {
    if (seen.has(s.industryKey!)) continue;
    seen.add(s.industryKey!);
    out.push(s);
    if (out.length === limit) break;
  }
  return out;
}

const FEATURED = pickByIndustry(5);
const [LEAD, ...REST] = FEATURED;

const INDUSTRY_COUNT = new Set(SAMPLES.filter((s) => s.industryKey).map((s) => s.industryKey)).size;
const TOTAL = SAMPLES.filter((s) => s.industryKey).length;

export function TemplateTeaserSection() {
  return (
    <section className="border-y border-border bg-secondary/25 px-3 py-20 sm:px-5 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            label="TEMPLATE"
            title={
              <>
                빠르게 시작하려면,
                <br />
                미리 제작된 템플릿도 있습니다.
              </>
            }
            description="완성된 디자인에 문구 · 이미지 · 회사정보만 적용해 시작합니다. 맞춤 제작과 달리 정해진 구성 안에서 빠르게 여는 상품입니다."
          />
          <dl className="flex shrink-0 gap-8">
            <div>
              <dt className="text-xs text-muted-foreground">업종</dt>
              <dd className="mt-1 font-mono text-3xl font-bold tabular-nums text-foreground">
                {INDUSTRY_COUNT}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">디자인 시안</dt>
              <dd className="mt-1 font-mono text-3xl font-bold tabular-nums text-primary">{TOTAL}</dd>
            </div>
          </dl>
        </div>

        {/* 큰 한 장 + 작은 넉 장. 균일 그리드를 피해 시선 순서를 만든다 */}
        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <FadeIn className="lg:col-span-7">
            <Link
              to={`/samples/${LEAD.slug}`}
              className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-card"
            >
              <ImagePlaceholder
                src={LEAD.image}
                ratio="photo"
                label={LEAD.industry}
                className="h-full rounded-none border-0 transition-transform duration-700 ease-[cubic-bezier(.32,.72,0,1)] group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent px-6 pb-5 pt-16">
                <p className="text-xs font-semibold tracking-wide text-white/70">
                  {LEAD.tag ?? "랜딩형 템플릿"}
                </p>
                <p className="mt-1 flex items-center gap-2 text-2xl font-extrabold text-white">
                  {LEAD.industry.replace(" 홈페이지", "")}
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-rows-2">
            {REST.map((s, i) => (
              <FadeIn key={s.slug} delay={80 + i * 70}>
                <Link
                  to={`/samples/${s.slug}`}
                  className="group relative block h-full overflow-hidden rounded-xl border border-border bg-card"
                >
                  <ImagePlaceholder
                    src={s.image}
                    ratio="photo"
                    label={s.industry}
                    className="h-full rounded-none border-0 transition-transform duration-700 ease-[cubic-bezier(.32,.72,0,1)] group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-10">
                    <p className="truncate text-sm font-bold text-white">
                      {s.industry.replace(" 홈페이지", "")}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={200} className="mt-6">
          <div className="flex flex-col gap-3 rounded-xl border border-border bg-background px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground break-keep">
              업종마다 기본형 · 랜딩형 각 5종씩 준비돼 있습니다. 목록에서 업종을 고르면 시안이 한눈에
              보입니다.
            </p>
            <Link
              to="/templates"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              템플릿 {TOTAL}종 전체 보기
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
