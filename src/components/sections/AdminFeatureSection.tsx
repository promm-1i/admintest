import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { ADMIN_FEATURE_POINTS } from "@/lib/pricing";

export function AdminFeatureSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <SectionHeader
          label="ADMIN"
          title="공지사항과 문의내역도 관리할 수 있습니다."
          description="필요한 경우 관리자 페이지를 통해 공지사항을 등록하거나 문의내역을 확인할 수 있는 구조로 확장할 수 있습니다. 기본 홈페이지 제작과 별도 기능은 상담 후 범위를 정합니다."
        />
        <FadeIn delay={80}>
          <ImagePlaceholder src="/images/admin-dashboard.webp" ratio="video" label="관리자 화면" />
        </FadeIn>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ADMIN_FEATURE_POINTS.map((item, i) => (
          <FadeIn key={item} delay={i * 60}>
            <div className="rounded-xl border border-border bg-card px-5 py-4 text-sm font-medium">
              {item}
            </div>
          </FadeIn>
        ))}
      </div>
      <p className="mt-5 text-xs text-muted-foreground">
        ※ 모든 홈페이지에 기본 제공되는 기능은 아니며, 별도 협의 또는 기능 범위에 따라 제공됩니다.
      </p>
    </section>
  );
}
