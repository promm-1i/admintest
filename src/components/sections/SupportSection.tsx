import { Link } from "react-router-dom";
import { ArrowRight, Link2, BookOpen, PenLine, Bug, FilePlus, Puzzle, Paintbrush, MessagesSquare } from "lucide-react";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";

const SUPPORT_ITEMS = [
  { icon: Link2, label: "도메인 연결" },
  { icon: BookOpen, label: "운영 방법 안내" },
  { icon: PenLine, label: "문구 / 이미지 수정" },
  { icon: Bug, label: "오류 대응" },
  { icon: FilePlus, label: "추가 페이지" },
  { icon: Puzzle, label: "신규 기능" },
  { icon: Paintbrush, label: "리뉴얼" },
  { icon: MessagesSquare, label: "유지보수 협의" },
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

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SUPPORT_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <FadeIn delay={i * 50} direction="up">
                  <div className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3.5 text-sm font-medium text-foreground shadow-xs break-keep">
                    <Icon className="h-4 w-4 shrink-0 text-primary" />
                    {item.label}
                  </div>
                </FadeIn>
              </li>
            );
          })}
        </ul>

        <Link
          to="/website/maintenance"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          유지보수 정책 자세히 보기
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
