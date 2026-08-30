import { useEffect, useRef } from "react";

/**
 * 카카오지도 JS SDK 기반 실제 지도. 서울 강서구 일대를 중심으로
 * 데모 매물 가격 핀과 동별 클러스터를 CustomOverlay로 뿌린다.
 *
 * VITE_KAKAO_MAP_KEY(JavaScript 앱 키)가 없거나 SDK 로드에 실패하면
 * 부모(RealEstateMapSearch)가 기존 SVG 약도로 폴백한다.
 */

// SDK 전역 타입 (외부 스크립트라 최소한으로만 선언)
declare global {
  interface Window {
    kakao?: {
      maps: {
        load: (cb: () => void) => void;
        Map: new (el: HTMLElement, opts: unknown) => unknown;
        LatLng: new (lat: number, lng: number) => unknown;
        CustomOverlay: new (opts: unknown) => { setMap: (m: unknown | null) => void };
        ZoomControl: new () => unknown;
        ControlPosition: { RIGHT: unknown };
      };
    };
  }
}

const KEY = import.meta.env.VITE_KAKAO_MAP_KEY as string | undefined;

export const hasKakaoKey = Boolean(KEY);

let sdkPromise: Promise<NonNullable<typeof window.kakao>> | null = null;

function loadSdk(key: string) {
  if (!sdkPromise) {
    sdkPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`;
      s.onload = () => {
        if (!window.kakao) return reject(new Error("kakao sdk missing"));
        window.kakao.maps.load(() => resolve(window.kakao!));
      };
      s.onerror = () => reject(new Error("kakao sdk load failed"));
      document.head.appendChild(s);
    });
  }
  return sdkPromise;
}

/** 강서구 일대 중심 (등촌 · 마곡 사이) */
const CENTER = { lat: 37.5587, lng: 126.837 };

/** 데모 매물 핀 — 강서구 곳곳에 대충 흩뿌린 좌표 (지도 데모용) */
const GEO_PINS: { lat: number; lng: number; label: string; hot?: boolean }[] = [
  { lat: 37.5601, lng: 126.8258, label: "9.5억" },
  { lat: 37.5655, lng: 126.8296, label: "6.2억", hot: true },
  { lat: 37.5701, lng: 126.8452, label: "월 130" },
  { lat: 37.5618, lng: 126.8514, label: "24.8억" },
  { lat: 37.5533, lng: 126.858, label: "2.9억" },
  { lat: 37.5484, lng: 126.8621, label: "월 550" },
  { lat: 37.5512, lng: 126.8226, label: "5.4억" },
  { lat: 37.5451, lng: 126.8351, label: "월 95" },
  { lat: 37.5415, lng: 126.8404, label: "7.8억" },
  { lat: 37.5726, lng: 126.8337, label: "3.3억" },
  { lat: 37.5468, lng: 126.8532, label: "월 210" },
  { lat: 37.5563, lng: 126.8443, label: "11.2억" },
  { lat: 37.5539, lng: 126.8306, label: "월 68" },
  { lat: 37.5662, lng: 126.8541, label: "4.6억" },
];

const GEO_CLUSTERS: { lat: number; lng: number; name: string; count: number }[] = [
  { lat: 37.5629, lng: 126.8194, name: "마곡동", count: 84 },
  { lat: 37.5388, lng: 126.8465, name: "화곡동", count: 57 },
  { lat: 37.5507, lng: 126.8659, name: "등촌동", count: 43 },
];

function pinHtml(label: string, hot: boolean, light: boolean) {
  const chip = hot
    ? light
      ? "border-neutral-900 bg-neutral-900 text-white"
      : "border-amber-500 bg-amber-400 text-neutral-950"
    : "border-neutral-300 bg-white text-neutral-900";
  const tri = hot ? (light ? "border-t-neutral-900" : "border-t-amber-400") : "border-t-white";
  return `
    <div class="pointer-events-none select-none">
      <span class="block rounded-md border px-1.5 py-0.5 text-[11px] font-bold shadow-sm ${chip}">${label}</span>
      <span class="mx-auto block h-0 w-0 border-x-4 border-t-[5px] border-x-transparent ${tri}"></span>
    </div>`;
}

function clusterHtml(name: string, count: number, light: boolean) {
  const tone = light ? "bg-neutral-900/85 text-white" : "bg-amber-400/95 text-neutral-950";
  return `
    <div class="pointer-events-none flex h-12 w-12 select-none flex-col items-center justify-center rounded-full shadow-md ${tone}">
      <span class="text-sm font-extrabold leading-none">${count}</span>
      <span class="mt-0.5 text-[8px] font-medium leading-none opacity-80">${name}</span>
    </div>`;
}

export function KakaoAreaMap({ tone, onError }: { tone: "light" | "dark"; onError: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const light = tone === "light";

  useEffect(() => {
    if (!KEY) {
      onError();
      return;
    }
    let cancelled = false;
    const overlays: { setMap: (m: unknown | null) => void }[] = [];

    loadSdk(KEY)
      .then((kakao) => {
        if (cancelled || !ref.current) return;
        const map = new kakao.maps.Map(ref.current, {
          center: new kakao.maps.LatLng(CENTER.lat, CENTER.lng),
          level: 6,
        });
        (map as { addControl: (c: unknown, p: unknown) => void }).addControl(
          new kakao.maps.ZoomControl(),
          kakao.maps.ControlPosition.RIGHT,
        );
        GEO_PINS.forEach((p) => {
          const el = document.createElement("div");
          el.innerHTML = pinHtml(p.label, Boolean(p.hot), light);
          const ov = new kakao.maps.CustomOverlay({
            map,
            position: new kakao.maps.LatLng(p.lat, p.lng),
            content: el,
            yAnchor: 1,
          });
          overlays.push(ov);
        });
        GEO_CLUSTERS.forEach((c) => {
          const el = document.createElement("div");
          el.innerHTML = clusterHtml(c.name, c.count, light);
          const ov = new kakao.maps.CustomOverlay({
            map,
            position: new kakao.maps.LatLng(c.lat, c.lng),
            content: el,
            yAnchor: 0.5,
          });
          overlays.push(ov);
        });
      })
      .catch(() => {
        if (!cancelled) onError();
      });

    return () => {
      cancelled = true;
      overlays.forEach((o) => o.setMap(null));
    };
    // onError는 부모의 setState 래퍼라 참조가 안정적이지 않아도 최초 1회만 실행하면 된다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref} className="absolute inset-0 h-full w-full" />;
}
