import { useEffect } from "react";

const ORIGIN = "https://noveriq.co.kr";

/** name=""/property="" 메타를 없으면 만들어서 채운다 */
function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

/**
 * 라우트 진입 시 문서 제목과 메타를 갱신한다.
 *
 * 제목·설명만 바꾸면 카카오톡 · 네이버 · 당근 공유 미리보기가 어느 페이지를 올려도
 * index.html의 기본값("NOVERIQ — 홈페이지부터 플랫폼형 웹까지")으로 뜨므로
 * og:title · og:description · og:url 과 canonical 까지 함께 맞춘다.
 */
export function usePageTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title;

    const url = ORIGIN + window.location.pathname;
    setMeta("property", "og:title", title);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", title);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:description", description);
    }
  }, [title, description]);
}
