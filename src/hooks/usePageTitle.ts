import { useEffect } from "react";

/** 라우트 진입 시 문서 제목과 메타 설명을 갱신한다. */
export function usePageTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) {
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", description);
    }
  }, [title, description]);
}
