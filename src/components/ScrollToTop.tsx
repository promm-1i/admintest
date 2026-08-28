import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * 라우트 이동 시 이전 페이지의 스크롤 위치가 남아있지 않도록 맨 위로 초기화한다.
 * 다만 /services#pricing 같은 해시 앵커가 있으면 그 위치로 스크롤한다.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
