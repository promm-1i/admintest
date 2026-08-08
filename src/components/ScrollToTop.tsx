import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** 라우트 이동 시 이전 페이지의 스크롤 위치가 남아있지 않도록 맨 위로 초기화한다. */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
