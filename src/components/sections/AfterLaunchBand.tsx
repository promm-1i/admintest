import { Link } from "react-router-dom";
import {
  ArrowRight,
  ExternalLink,
  Link2,
  BookOpen,
  PenLine,
  Bug,
  FilePlus,
  Puzzle,
  Paintbrush,
  MessagesSquare,
} from "lucide-react";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { NAVER_BLOG_URL } from "@/lib/contact";

/**
 * 오픈 이후 이야기(유지보수 · 운영 팁)를 한 섹션에 모았다.
 * 블로그는 별도 섹션을 차지할 만큼의 무게가 아니라 이 밴드의 꼬리로 붙인다.
 */
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

export function AfterLaunchBand() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:items-start">
          <SectionHeader
            label="SUPPORT"
            title={
              <>
                오픈 이후도
                <br />
                계속 지원합니다.
              </>
            }
            description="간단한 문구 · 이미지 수정은 기본 정책 범위에서, 신규 기능이나 리뉴얼은 별도 협의로 진행합니다."
          />

          <ul className="grid grid-cols-2 gap-3">
            {SUPPORT_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <FadeIn delay={i * 45} direction="up">
                    <div className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3.5 text-sm font-medium text-foreground shadow-xs break-keep">
                      <Icon className="h-4 w-4 shrink-0 text-primary" />
                      {item.label}
                    </div>
                  </FadeIn>
                </li>
              );
            })}
          </ul>
        </div>

        <FadeIn delay={160} className="mt-10">
          <div className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/website/maintenance"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              유지보수 정책 자세히 보기
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href={NAVER_BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              제작 사례와 운영 팁은 블로그에서
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
