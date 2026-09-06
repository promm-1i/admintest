import { useEffect, useRef, useState } from "react";
import { HeroFluid } from "@/components/sections/HeroFluid";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SAMPLES } from "@/lib/samples";
import { cn } from "@/lib/utils";

/**
 * ClipCut 레퍼런스 구도의 히어로: 딥 다크 배경 + 중앙 정렬 타이포 + 하단에
 * 템플릿 카드가 3D 코버플로우 아치(가운데 작고 바깥으로 갈수록 큼)로 화면 좌우를 꽉 채운다.
 * - 카드는 임의 선정이 아니라 실제 템플릿 데이터에서 최신순 · 업종 중복 없이 12개를 파생한다
 * - 좌클릭 드래그(모바일 스와이프)로 좌우 스크롤되며 무한 순환한다
 * - 배경에는 커서를 따라오는 WebGL 무지개 유체와 잔별 42개
 * - prefers-reduced-motion 사용자는 정적 아치를 본다
 */

/** 최신 템플릿(배열 앞이 최신)에서 업종 중복 없이 12개 — 히어로 카드의 단일 출처 */
const HERO_ITEMS = (() => {
  const seen = new Set<string>();
  const items: { src: string; label: string; href: string }[] = [];
  for (const s of SAMPLES) {
    if (!s.industryKey || !s.type.includes("landing-template") || !s.image) continue;
    if (seen.has(s.industryKey)) continue;
    seen.add(s.industryKey);
    items.push({
      src: s.image,
      label: s.industry.replace(" 홈페이지", ""),
      href: `/samples/${s.slug}`,
    });
    if (items.length >= 12) break;
  }
  return items;
})();

/** 스프링 느낌의 오버슈트 곡선 — 라이브러리 없이 CSS transition으로 낸다 */
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

/** 레퍼런스처럼 촘촘한 잔별 — 고정 시드로 42개를 흩뿌린다 (렌더마다 위치가 흔들리지 않게) */
const STARS = Array.from({ length: 42 }, (_, i) => {
  const r1 = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
  const r2 = Math.abs(Math.sin(i * 78.233) * 12543.2341) % 1;
  const r3 = Math.abs(Math.sin(i * 39.425) * 26251.5459) % 1;
  return {
    x: +(r1 * 100).toFixed(2),
    y: +(r2 * 78).toFixed(2), // 하단 카드 영역은 피한다
    size: r3 > 0.75 ? 3 : 2,
    delay: +(r3 * 4).toFixed(2),
    dim: r3 < 0.4, // 일부는 더 흐릿하게 — 깊이감
  };
});

/**
 * 드래그로 도는 무한 코버플로우.
 * 카드의 크기·기울기·높이는 화면 중앙으로부터의 거리 d(-1~1)의 연속 함수라
 * 어느 위치로 굴려도 "가운데 작고 바깥이 큰" 레퍼런스 곡선이 유지된다.
 */
function CoverflowShowcase() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggedRef = useRef(false);
  const [cw, setCw] = useState(1440);
  const [offset, setOffset] = useState(0);
  const [opened, setOpened] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const t1 = window.setTimeout(() => setOpened(true), 300);
    const t2 = window.setTimeout(() => setEntranceDone(true), 1700);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setCw(el.clientWidth));
    ro.observe(el);
    setCw(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  // 좌클릭 드래그 / 터치 스와이프로 offset 이동
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let dragging = false;
    let lastX = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      draggedRef.current = false;
      lastX = e.clientX;
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      if (Math.abs(dx) > 2) draggedRef.current = true;
      setOffset((o) => o - dx);
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      el.releasePointerCapture(e.pointerId);
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const open = opened || reducedMotion;
  const n = HERO_ITEMS.length;
  const spacing = cw * (isDesktop ? 0.115 : 0.3);
  const total = n * spacing;
  const half = cw / 2;

  return (
    <div
      ref={containerRef}
      onClickCapture={(e) => {
        // 드래그 직후의 클릭은 카드 이동으로 이어지지 않게 삼킨다
        if (draggedRef.current) {
          e.preventDefault();
          e.stopPropagation();
          draggedRef.current = false;
        }
      }}
      onDragStart={(e) => e.preventDefault()}
      className={cn(
        "relative w-full cursor-grab touch-pan-y select-none active:cursor-grabbing",
        isDesktop ? "h-[330px]" : "h-[190px]",
      )}
      style={{ perspective: "1300px" }}
      aria-label="실제 구축한 홈페이지 템플릿 — 드래그해서 더 보기"
    >
      {HERO_ITEMS.map((card, i) => {
        // 무한 순환: 카드의 화면상 x를 [-total/2, total/2) 범위로 감는다
        const raw = i * spacing - offset;
        const x = ((((raw + total / 2) % total) + total) % total) - total / 2;
        if (Math.abs(x) > half + spacing * 1.6) return null; // 화면 밖 여유분만 렌더

        const d = Math.max(-1, Math.min(1, x / half)); // 중앙 거리 -1~1
        const ad = Math.abs(d);
        const w = (isDesktop ? 1 : 0.62) * (165 + 175 * ad);
        const rotY = -42 * d;
        const y = (isDesktop ? 1 : 0.6) * (14 - 44 * ad);
        const on = hovered === i;

        return (
          <Link
            key={card.href}
            to={card.href}
            aria-label={`${card.label} 템플릿 보기`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="group absolute left-1/2 top-1/2 block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-white"
            style={{
              width: `${w}px`,
              zIndex: on ? 200 : 100 - Math.round(ad * 60),
              transform: open
                ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                : `translate(calc(-50% + ${x}px), calc(-50% + 110px))`,
              opacity: open ? 1 : 0,
              transition:
                reducedMotion || entranceDone
                  ? "none"
                  : `transform 900ms ${SPRING} ${Math.round(ad * 260)}ms, opacity 450ms ease ${Math.round(ad * 260)}ms`,
            }}
          >
            {/* 안쪽 래퍼가 3D 기울기와 hover 리프트 담당 — 드래그 이동과 충돌하지 않는다 */}
            <div
              className="overflow-hidden rounded-xl bg-neutral-900 shadow-[0_18px_50px_rgba(0,0,0,0.55)] ring-1 ring-white/15 transition-shadow group-hover:ring-white/40"
              style={{
                transform: `rotateY(${on ? 0 : rotY}deg) scale(${on ? 1.1 : 1})`,
                transition: reducedMotion ? "none" : `transform 300ms ${SPRING}`,
              }}
            >
              <img
                src={card.src}
                alt=""
                draggable={false}
                className="pointer-events-none aspect-[16/11] w-full object-cover object-top"
              />
              <span
                className={cn(
                  "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2.5 pb-1.5 pt-6 text-[10px] font-bold text-white transition-opacity duration-200",
                  isDesktop ? "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100" : "opacity-100",
                )}
              >
                {card.label}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#15100E] text-white">
      {/* 배경 앰비언트 — 레퍼런스처럼 따뜻한 비네트 */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-96 w-[560px] -translate-x-1/2 rounded-full bg-[#B20D1A]/25 blur-[130px]" />
        <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-amber-600/15 blur-[110px]" />
      </div>

      {/* 커서를 따라 소용돌이치는 무지개 유체 (레퍼런스 설정값 그대로) */}
      <HeroFluid targetRef={sectionRef} />

      {/* 배경 잔별 */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {STARS.map((sp) => (
          <span
            key={`${sp.x}-${sp.y}`}
            className={cn(
              "absolute rounded-full motion-safe:animate-[heroTwinkle_3.2s_ease-in-out_infinite] motion-reduce:opacity-60",
              sp.dim ? "bg-white/40" : "bg-white/75",
            )}
            style={{
              left: `${sp.x}%`,
              top: `${sp.y}%`,
              width: sp.size,
              height: sp.size,
              animationDelay: `${sp.delay}s`,
              boxShadow: "0 0 6px 1px rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-6 pt-16 text-center sm:px-6 lg:pt-24">
        <span className="idle-breath inline-block rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-bold text-white/90">
          맞춤형 웹사이트 제작 전문
        </span>
        <h1 className="mx-auto mt-6 max-w-4xl text-balance text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
          기획부터 디자인,
          <br />
          직접 만듭니다.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
          레이아웃 설계부터 실제 화면 디자인까지, 만드는 과정을 한 번에 진행합니다.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-full px-7 font-bold shadow-lg shadow-primary/30">
            <Link to="/contact">제작 상담하기</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-white/25 bg-white/5 px-7 font-bold text-white hover:bg-white/15 hover:text-white"
          >
            <Link to="/samples">포트폴리오 보기</Link>
          </Button>
        </div>
        <p className="mt-5 text-xs text-white/45">
          요구사항에 맞춘 기획·디자인 · 완성된 화면 그대로 확인 · 필요한 페이지만 구성
        </p>
      </div>

      {/* 최신 템플릿 코버플로우 — 좌우 끝까지 꽉 차고, 드래그로 순환 */}
      <div className="relative z-10 w-full pb-12 pt-8 lg:pb-16">
        <CoverflowShowcase />
        <p className="mt-4 text-center text-xs font-medium text-white/45">
          실제로 저희가 만든 홈페이지입니다 — 좌우로 드래그하고, 카드를 눌러 그대로 확인하세요
        </p>
      </div>
    </section>
  );
}
