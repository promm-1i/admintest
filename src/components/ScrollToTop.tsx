import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * 라우트 이동 시 이전 페이지의 스크롤 위치가 남아있지 않도록 맨 위로 초기화한다.
 * 다만 /services#pricing 같은 해시 앵커가 있으면 그 위치로 스크롤한다.
 *
 * 뒤로·앞으로 가기(POP)는 그 화면에서 보던 위치로 되돌린다. 브라우저 자체 복원은
 * 새 화면이 그려지기 전(앞 화면 높이 기준)에 일어나 휴대폰에서 앞 화면 길이만큼에서 잘렸다
 * (프리미엄 디자인 목록 중간에서 상세로 갔다 오면 늘 같은 곳에 멈춤, 2026-10-17).
 * 그래서 위치는 기록 항목(location.key)마다 주소와 함께 직접 적어 두고, 새 화면 높이가 찰 때까지 다시 맞춘다.
 * 다른 문서(정적 템플릿 쪽)에 다녀와 새로 열린 경우도 sessionStorage 로 되돌린다.
 */
type Saved = { y: number; path: string };
const STORE = "noveriq-scroll";
const positions = new Map<string, Saved>();
try {
  Object.entries(JSON.parse(sessionStorage.getItem(STORE) || "{}") as Record<string, Saved>).forEach(([k, v]) => {
    if (v && typeof v.y === "number" && typeof v.path === "string") positions.set(k, v);
  });
} catch {
  /* 저장소를 못 쓰면 이번 방문 안에서만 기억한다 */
}

let restoredKey: string | null = null;
/** 이 기록 항목을 뒤로 가기로 돌아와 보던 위치로 되돌렸는지 — 그랬으면 쪽이 따로 스크롤하지 않는다 */
export function wasScrollRestored(key: string) {
  return restoredKey === key;
}

function persist() {
  try {
    sessionStorage.setItem(STORE, JSON.stringify(Object.fromEntries([...positions].slice(-50))));
  } catch {
    /* 무시 */
  }
}

function jump(top: number) {
  window.scrollTo({ top, left: 0, behavior: "instant" as ScrollBehavior });
}

/** 새 화면이 다 그려질 때까지(최대 약 1.5초) 같은 위치로 다시 맞춘다 */
function restore(y: number) {
  let frames = 0;
  const step = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    jump(Math.min(y, Math.max(0, max)));
    if (max >= y - 1 || ++frames > 90) return;
    requestAnimationFrame(step);
  };
  step();
}

/** 해시 대상이 늦게 그려지는 쪽(지연 로딩)도 있어 잠깐 기다린다 */
function scrollToHash(id: string) {
  let frames = 0;
  const step = () => {
    const target = document.getElementById(id);
    if (target) return target.scrollIntoView();
    if (++frames > 60) return jump(0);
    requestAnimationFrame(step);
  };
  step();
}

export function ScrollToTop() {
  const { pathname, search, hash, key } = useLocation();
  const navType = useNavigationType();
  const current = useRef({ key, path: pathname + search });
  const prev = useRef<{ pathname: string; hash: string } | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    let timer = 0;
    const save = () => {
      // 화면이 바뀐 직후(높이가 줄며 생기는 스크롤)는 이미 새 화면으로 들어간다 — current 는 그리기 전에 바뀐다
      positions.set(current.current.key, { y: window.scrollY, path: current.current.path });
      window.clearTimeout(timer);
      timer = window.setTimeout(persist, 250);
    };
    window.addEventListener("scroll", save, { passive: true });
    window.addEventListener("pagehide", persist);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", save);
      window.removeEventListener("pagehide", persist);
    };
  }, []);

  // 그리기 전에 처리한다 — 새 화면이 더 짧으면 높이가 줄며 스크롤 이벤트가 나서
  // 되돌릴 위치를 덮어쓰기 전에 읽어야 하고, 엉뚱한 위치가 한 번 비치는 것도 막는다
  useLayoutEffect(() => {
    const path = pathname + search;
    const saved = navType === "POP" ? positions.get(key) : undefined;
    current.current = { key, path };
    const before = prev.current;
    prev.current = { pathname, hash };
    if (saved && saved.path === path) {
      restoredKey = key;
      restore(saved.y);
      return;
    }
    restoredKey = null;
    // 같은 쪽 안에서 검색 조건(?…)만 바뀐 이동은 위치를 그대로 둔다
    if (before && before.pathname === pathname && before.hash === hash) return;
    if (hash) {
      scrollToHash(decodeURIComponent(hash.slice(1)));
      return;
    }
    jump(0);
  }, [key, pathname, search, hash, navType]);

  return null;
}
