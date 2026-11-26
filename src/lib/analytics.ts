// 구글 애널리틱스(GA4) 연동 — 방문자 수 · 유입 경로 · 페이지별 조회 통계.
//
// 사용법: analytics.google.com 에서 속성을 만들고 받은 측정 ID(G-XXXXXXXXXX)를
// 아래 GA_MEASUREMENT_ID 에 넣으면 배포 즉시 수집이 시작됩니다.
// 비워두면 아무 스크립트도 로드하지 않습니다(개발 중 오염 방지).
// 앱 안내처럼 public 에 있는 정적 쪽은 scripts/static-analytics.mjs 가 이 ID 를 읽어 빌드 때 넣습니다.

export const GA_MEASUREMENT_ID = "G-VQDDH561MD"; // 11-26 대표님이 만든 NOVERIQ 속성

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// 실제 주소에서만 모은다. 개발 서버 · 넷리파이 미리보기 주소 · 빌드 때 프리렌더(localhost)를 빼야
// 숫자가 안 부풀고, 프리렌더 HTML 에 gtag 스크립트가 구워지지 않는다.
const LIVE = window.location.hostname === "noveriq.co.kr";

/** 앱 시작 시 1회 호출 — gtag 스크립트를 주입하고 초기화한다 */
export function initAnalytics() {
  if (!GA_MEASUREMENT_ID || !LIVE) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js 는 arguments 객체만 명령으로 읽는다. 배열(...args)을 넣으면 아무것도 보내지지 않는다.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  // SPA라서 페이지뷰는 라우터에서 직접 보낸다 (send_page_view: false)
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
}

/** 라우트가 바뀔 때마다 호출 — SPA 페이지뷰 전송 */
export function trackPageView(path: string) {
  if (!GA_MEASUREMENT_ID || !LIVE || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
