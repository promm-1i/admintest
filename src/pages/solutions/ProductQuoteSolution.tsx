import { Link } from "react-router-dom";
import { Package, Tags, Search, FolderOpen, ClipboardList, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";

const FEATURES = [
  {
    icon: Package,
    title: "제품관리",
    desc: "제품 등록·수정·삭제와 이미지, 상세 정보를 관리자 페이지에서 직접 관리합니다.",
  },
  {
    icon: Tags,
    title: "카테고리",
    desc: "제품군별로 카테고리를 나눠 정리해 원하는 제품을 쉽게 찾을 수 있습니다.",
  },
  {
    icon: Search,
    title: "검색",
    desc: "제품명, 카테고리 등 다양한 조건으로 빠르게 검색합니다.",
  },
  {
    icon: FolderOpen,
    title: "자료실",
    desc: "카탈로그, 도면, 매뉴얼 등 첨부 자료를 업로드하고 다운로드할 수 있습니다.",
  },
  {
    icon: ClipboardList,
    title: "견적문의",
    desc: "고객이 원하는 제품을 선택해 바로 견적을 요청할 수 있습니다.",
  },
];

export default function ProductQuoteSolution() {
  usePageTitle(
    "제품 / 견적관리 웹 솔루션 — NOVERIQ",
    "제품을 체계적으로 관리하고 고객이 바로 견적을 요청할 수 있는 웹 솔루션을 안내합니다.",
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
        WEB SOLUTION
      </p>
      <h1 className="mt-3 text-3xl font-semibold">제품 / 견적관리 웹 솔루션</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
        제품을 체계적으로 관리하고, 고객이 필요한 제품에 바로 견적을 요청할 수 있는 웹 솔루션입니다.
        카탈로그형 홈페이지가 필요한 제조·유통·B2B 기업에 적합합니다.
      </p>

      <h2 className="mt-12 text-xl font-semibold">주요 기능</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className="flex h-full flex-col items-start gap-3 rounded-xl border border-border bg-card p-6 shadow-xs transition-all duration-300 hover:border-primary/50 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground break-keep">{f.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
        <p className="text-sm text-muted-foreground">
          구축비와 월 이용료 등 자세한 요금은 웹 솔루션 요금 페이지에서 확인하실 수 있습니다.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button asChild variant="outline">
            <Link to="/web-solutions">요금 확인하기</Link>
          </Button>
          <Button asChild className="gap-1.5 font-bold">
            <Link to="/contact">
              <Send className="h-3.5 w-3.5" />
              구축 문의하기
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
