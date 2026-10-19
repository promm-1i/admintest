import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("페이지를 찾을 수 없습니다 — NOVERIQ");

  // Netlify SPA 폴백이라 없는 주소도 200 으로 나간다. 검색엔진이 이 쪽을 색인하지 않도록
  // 렌더 뒤에 noindex 를 단다(구글은 렌더된 HTML 의 noindex 를 따른다). 다른 쪽으로 넘어가면 뗀다.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">페이지를 찾을 수 없습니다</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          주소가 바뀌었거나 없어진 페이지입니다.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            홈으로 가기
          </Link>
        </div>
      </div>
    </div>
  );
}
