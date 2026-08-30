import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { NAVER_BLOG_URL } from "@/lib/contact";
import { RevealScale } from "@/pages/services/previewKit";

export function BlogTeaserSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28">
      <RevealScale className="mx-auto max-w-4xl rounded-2xl border border-border bg-secondary/30 p-8 sm:p-12 text-center">
        <SectionHeader
          label="BLOG"
          align="center"
          title="홈페이지 제작 TIP"
          description="제작 사례와 운영 팁을 NOVERIQ 블로그에서 확인하실 수 있습니다."
        />
        <div className="mt-6 flex justify-center">
          <Button asChild variant="outline" className="gap-1.5 font-bold">
            <a href={NAVER_BLOG_URL} target="_blank" rel="noopener noreferrer">
              네이버 블로그 보기
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </RevealScale>
    </section>
  );
}
