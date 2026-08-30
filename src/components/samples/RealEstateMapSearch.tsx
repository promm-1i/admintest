import { useState } from "react";
import { Plus, Minus, Crosshair, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { KakaoAreaMap, hasKakaoKey } from "@/components/samples/KakaoAreaMap";
import living01 from "@/assets/images/re_living_01.jpg";
import living02 from "@/assets/images/re_living_02.jpg";
import studio from "@/assets/images/re_studio.jpg";
import oneroom from "@/assets/images/re_oneroom.jpg";
import retail from "@/assets/images/re_retail.jpg";

/** 지도 위 가격 핀 — 다방·직방처럼 매물 가격이 그대로 칩으로 뜬다 */
const PINS: { x: number; y: number; label: string; hot?: boolean }[] = [
  { x: 16, y: 20, label: "9.5억" },
  { x: 27, y: 33, label: "6.2억", hot: true },
  { x: 38, y: 16, label: "월 130" },
  { x: 46, y: 42, label: "24.8억" },
  { x: 55, y: 24, label: "2.9억" },
  { x: 63, y: 48, label: "월 550" },
  { x: 21, y: 55, label: "5.4억" },
  { x: 34, y: 62, label: "월 95" },
  { x: 58, y: 66, label: "7.8억" },
  { x: 70, y: 14, label: "3.3억" },
  { x: 74, y: 58, label: "월 210" },
  { x: 43, y: 76, label: "11.2억" },
  { x: 12, y: 40, label: "월 68" },
  { x: 66, y: 34, label: "4.6억" },
];

/** 동 단위 클러스터 — 네이버부동산처럼 지역별 매물 수가 원으로 뜬다 */
const CLUSTERS: { x: number; y: number; name: string; count: number }[] = [
  { x: 24, y: 82, name: "역삼동", count: 84 },
  { x: 84, y: 74, name: "삼성동", count: 57 },
  { x: 88, y: 26, name: "논현동", count: 43 },
];

const FILTERS = ["매매", "전세", "월세", "가격대", "면적", "방 개수", "입주일"];

const SIDE_LIST = [
  { img: living01, deal: "매매", title: "역삼동 센트럴파크 32평", price: "9억 5,000", spec: "아파트 · 84.9㎡ · 12/25층" },
  { img: living02, deal: "전세", title: "삼성동 아이파크 24평", price: "6억 2,000", spec: "아파트 · 59.8㎡ · 남동향" },
  { img: studio, deal: "월세", title: "논현동 리버스텔", price: "3,000/130", spec: "오피스텔 · 33.1㎡ · 풀옵션" },
  { img: retail, deal: "임대", title: "신사동 가로수길 1층", price: "1억/550", spec: "상가 · 49.5㎡ · 권리금 협의" },
  { img: oneroom, deal: "전세", title: "역삼동 대로변 투룸", price: "2억 9,000", spec: "빌라 · 42.6㎡ · 신축 3년" },
];

type Tone = "light" | "dark";

/**
 * 지도 기반 매물 탐색 섹션. 실제 부동산 포털(다방·직방·네이버부동산)의 관습대로
 * 가격 핀 다수 + 동별 클러스터 + 우측 콤팩트 매물 리스트로 "매물이 많다"는 인상을 준다.
 * tone으로 기본형(light)·랜딩형(dark) 템플릿의 톤을 따라간다.
 */
export function RealEstateMapSearch({ tone }: { tone: Tone }) {
  const light = tone === "light";
  // 카카오 JS 키가 있으면 실제 지도(강서구 일대), 없거나 로드 실패 시 SVG 약도 폴백
  const [kakaoFailed, setKakaoFailed] = useState(false);
  const useKakao = hasKakaoKey && !kakaoFailed;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border",
        light ? "border-neutral-200 bg-white" : "border-white/10 bg-neutral-950",
      )}
    >
      {/* 필터 바 */}
      <div
        className={cn(
          "flex items-center gap-2 overflow-x-auto border-b px-4 py-3",
          light ? "border-neutral-200" : "border-white/10",
        )}
      >
        {FILTERS.map((f, i) => (
          <span
            key={f}
            className={cn(
              "flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium",
              i === 0
                ? light
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-amber-400 bg-amber-400 font-bold text-neutral-950"
                : light
                  ? "border-neutral-200 text-neutral-600"
                  : "border-white/15 text-white/60",
            )}
          >
            {f}
            {i >= 3 && <ChevronDown className="h-3 w-3 opacity-60" />}
          </span>
        ))}
        <span
          className={cn(
            "ml-auto shrink-0 text-xs font-bold",
            light ? "text-neutral-900" : "text-amber-400",
          )}
        >
          지도 영역 매물 128건
        </span>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* 지도 */}
        <div className="relative h-[360px] overflow-hidden sm:h-[440px]">
          {useKakao ? (
            <KakaoAreaMap tone={tone} onError={() => setKakaoFailed(true)} />
          ) : (
            <>
          <svg
            viewBox="0 0 800 480"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <rect width="800" height="480" fill={light ? "#edeff2" : "#17181c"} />
            {/* 블록 */}
            <g fill={light ? "#e1e4e8" : "#1f2127"}>
              <rect x="20" y="20" width="130" height="80" rx="8" />
              <rect x="170" y="30" width="100" height="70" rx="8" />
              <rect x="300" y="20" width="150" height="90" rx="8" />
              <rect x="30" y="190" width="140" height="90" rx="8" />
              <rect x="200" y="200" width="120" height="80" rx="8" />
              <rect x="350" y="190" width="140" height="100" rx="8" />
              <rect x="60" y="330" width="120" height="90" rx="8" />
              <rect x="230" y="340" width="150" height="80" rx="8" />
              <rect x="430" y="330" width="120" height="90" rx="8" />
              <rect x="580" y="200" width="110" height="90" rx="8" />
              <rect x="590" y="340" width="140" height="80" rx="8" />
              <rect x="480" y="30" width="90" height="80" rx="8" />
            </g>
            {/* 공원 */}
            <ellipse cx="660" cy="100" rx="95" ry="62" fill={light ? "#d6e6d2" : "#1d2b22"} />
            {/* 하천 */}
            <path
              d="M0 448 Q 200 420 420 452 T 800 436 L 800 480 L 0 480 Z"
              fill={light ? "#d5e2ee" : "#1b2430"}
            />
            {/* 주요 도로 */}
            <g stroke={light ? "#ffffff" : "#2a2d34"} strokeWidth="16" strokeLinecap="round" fill="none">
              <path d="M0 150 H800" />
              <path d="M280 0 V480" />
              <path d="M560 0 V430" />
            </g>
            {/* 이면 도로 */}
            <g stroke={light ? "#f6f7f8" : "#22252b"} strokeWidth="6" fill="none">
              <path d="M0 60 H800" />
              <path d="M0 310 H560" />
              <path d="M120 0 V480" />
              <path d="M420 150 V480" />
              <path d="M680 0 V200" />
              <path d="M0 400 H280" />
            </g>
          </svg>

          {/* 역 마커 */}
          <div className="absolute left-[35%] top-[31%] flex -translate-x-1/2 items-center gap-1">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[8px] font-bold text-white shadow">
              2
            </span>
            <span
              className={cn(
                "rounded px-1 text-[9px] font-semibold",
                light ? "bg-white/85 text-neutral-700" : "bg-neutral-900/85 text-white/80",
              )}
            >
              역삼역
            </span>
          </div>

          {/* 가격 핀 */}
          {PINS.map((p) => (
            <div
              key={`${p.x}-${p.y}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-full cursor-default transition-transform duration-200 hover:z-10 hover:scale-110"
            >
              <span
                className={cn(
                  "block rounded-md border px-1.5 py-0.5 text-[10px] font-bold shadow-sm",
                  p.hot
                    ? light
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-amber-400 bg-amber-400 text-neutral-950"
                    : light
                      ? "border-neutral-300 bg-white text-neutral-900"
                      : "border-white/20 bg-neutral-800 text-white",
                )}
              >
                {p.label}
              </span>
              <span
                className={cn(
                  "mx-auto block h-0 w-0 border-x-4 border-t-[5px] border-x-transparent",
                  p.hot
                    ? light
                      ? "border-t-neutral-900"
                      : "border-t-amber-400"
                    : light
                      ? "border-t-white"
                      : "border-t-neutral-800",
                )}
              />
            </div>
          ))}

          {/* 동 클러스터 */}
          {CLUSTERS.map((c) => (
            <div
              key={c.name}
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
              className={cn(
                "absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full shadow-md transition-transform duration-200 hover:scale-110",
                light ? "bg-neutral-900/85 text-white" : "bg-amber-400/90 text-neutral-950",
              )}
            >
              <span className="text-sm font-extrabold leading-none">{c.count}</span>
              <span className="mt-0.5 text-[8px] font-medium leading-none opacity-80">{c.name}</span>
            </div>
          ))}

          {/* 줌 컨트롤 */}
          <div
            className={cn(
              "absolute right-3 top-3 flex flex-col overflow-hidden rounded-lg border shadow-sm",
              light ? "border-neutral-200 bg-white text-neutral-700" : "border-white/15 bg-neutral-900 text-white/80",
            )}
          >
            <span className="flex h-8 w-8 items-center justify-center">
              <Plus className="h-4 w-4" />
            </span>
            <span className={cn("h-px w-full", light ? "bg-neutral-200" : "bg-white/15")} />
            <span className="flex h-8 w-8 items-center justify-center">
              <Minus className="h-4 w-4" />
            </span>
          </div>
          <span
            className={cn(
              "absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg border shadow-sm",
              light ? "border-neutral-200 bg-white text-neutral-700" : "border-white/15 bg-neutral-900 text-white/80",
            )}
          >
            <Crosshair className="h-4 w-4" />
          </span>
            </>
          )}
        </div>

        {/* 우측 매물 리스트 */}
        <aside
          className={cn(
            "border-t lg:border-l lg:border-t-0",
            light ? "border-neutral-200" : "border-white/10",
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between border-b px-4 py-2.5",
              light ? "border-neutral-200" : "border-white/10",
            )}
          >
            <p className={cn("text-xs font-bold", light ? "text-neutral-900" : "text-white")}>
              이 지역 매물 <span className={light ? "text-neutral-900" : "text-amber-400"}>128</span>
            </p>
            <span className={cn("flex items-center gap-0.5 text-[11px]", light ? "text-neutral-500" : "text-white/50")}>
              추천순 <ChevronDown className="h-3 w-3" />
            </span>
          </div>
          <ul className={cn("divide-y", light ? "divide-neutral-100" : "divide-white/[0.06]")}>
            {SIDE_LIST.map((item) => (
              <li key={item.title} className="flex items-center gap-3 px-4 py-2.5">
                <img src={item.img} alt="" className="h-14 w-16 shrink-0 rounded-md object-cover" />
                <div className="min-w-0">
                  <p className={cn("text-[11px] font-bold", light ? "text-neutral-500" : "text-white/50")}>
                    {item.deal}{" "}
                    <span className={cn("text-sm", light ? "text-neutral-900" : "text-white")}>{item.price}</span>
                  </p>
                  <p className={cn("truncate text-xs font-semibold", light ? "text-neutral-800" : "text-white/85")}>
                    {item.title}
                  </p>
                  <p className={cn("truncate text-[10px]", light ? "text-neutral-400" : "text-white/40")}>
                    {item.spec}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p
            className={cn(
              "border-t px-4 py-3 text-center text-xs font-semibold",
              light ? "border-neutral-200 text-neutral-700" : "border-white/10 text-amber-400",
            )}
          >
            매물 123건 더보기
          </p>
        </aside>
      </div>
    </div>
  );
}
