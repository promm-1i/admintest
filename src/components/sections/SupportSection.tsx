import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/sections/SectionHeader";

const SUPPORT_ITEMS = [
  "도메인 연결",
  "운영 방법 안내",
  "문구 / 이미지 수정",
  "오류 대응",
  "추가 페이지",
  "신규 기능",
  "리뉴얼",
  "유지보수 협의",
];

export function SupportSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          label="SUPPORT"
          title="오픈 이후도 필요한 부분은 계속 지원합니다."
          description="간단한 문구·이미지 수정은 기본 정책 범위에서, 그 이상 신규 기능이나 리뉴얼은 별도 협의로 진행합니다."
        />

        <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
          {SUPPORT_ITEMS.map((item) => (
            <li key={item} className="border-t border-border pt-3 text-sm text-foreground break-keep">
              {item}
            </li>
          ))}
        </ul>

        <Link
          to="/services#maintenance"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          유지보수 정책 자세히 보기
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
