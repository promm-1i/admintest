import { Link } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";

const keywords = ["#렌트카", "#부동산", "#관리자", "#검색필터", "#유지보수"];

export default function Search() {
  usePageTitle("검색 — NOVERIQ", "NOVERIQ 홈페이지 제작 서비스 검색 페이지입니다.");

  return (
    <div className="min-h-[calc(100vh-72px)]">
      <section className="flex h-[240px] items-center justify-center bg-secondary/45 px-5">
        <h1 className="text-5xl font-black sm:text-6xl">검색</h1>
      </section>
      <section className="mx-auto max-w-[520px] px-5 py-12">
        <form className="relative mx-auto h-12 max-w-[480px] overflow-hidden border border-primary bg-background">
          <input
            type="search"
            placeholder="검색어를 입력해주세요."
            className="h-full w-full bg-transparent px-5 pr-14 text-base outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
          />
          <button type="submit" aria-label="검색하기" className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center">
            <SearchIcon className="size-5" />
          </button>
        </form>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {keywords.map((keyword) => (
            <Link key={keyword} to="/web-solutions" className="rounded-full bg-secondary px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground">
              {keyword}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
