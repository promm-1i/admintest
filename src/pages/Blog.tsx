import { Link } from "react-router-dom";
import { Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function Blog() {
  usePageTitle(
    "블로그 — MintCL",
    "MintCL의 제작 후기와 운영 팁을 전합니다.",
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-semibold">블로그</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground break-keep">
        제작 후기와 홈페이지 운영 팁을 전합니다.
      </p>

      <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-secondary/20 px-4 py-16 text-center">
        <Newspaper className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">아직 게시된 글이 없습니다</p>
        <p className="max-w-sm text-xs text-muted-foreground break-keep">
          준비되는 대로 제작 후기와 운영 팁을 올리겠습니다.
        </p>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
        <p className="text-sm text-muted-foreground">궁금한 점은 먼저 문의해 주세요.</p>
        <Button asChild className="mt-4">
          <Link to="/contact">상담 문의하기</Link>
        </Button>
      </div>
    </div>
  );
}
