import { useEffect, useRef, useState } from "react";

/**
 * 요소가 뷰포트에 처음 들어오는 순간을 감지한다. 한 번 보이면 계속 true를 유지한다.
 *
 * 감지에 실패하면 화면이 비는 구조라(FadeIn이 isInView=false 동안 opacity-0을 건다)
 * 두 겹의 안전장치를 둔다.
 * 1. IntersectionObserver가 없는 환경은 즉시 노출한다 — 크롤러, 구형 브라우저.
 * 2. 관찰자는 붙이는 즉시 한 번은 콜백을 준다(교차 여부와 무관하게). 그 첫 콜백조차
 *    오지 않으면 관찰자가 동작하지 않는 환경이므로 그냥 노출한다. 교차하지 않았다는
 *    콜백을 받은 경우에는 발동하지 않으므로 스크롤 연출은 그대로 살아 있다.
 */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    let answered = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        answered = true;
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    const failsafe = setTimeout(() => {
      if (!answered) setIsInView(true);
    }, 1200);

    return () => {
      clearTimeout(failsafe);
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, isInView };
}
