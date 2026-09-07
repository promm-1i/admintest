import { useEffect, useRef, useState } from "react";
import { HeroFluid } from "@/components/sections/HeroFluid";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { getLatestTemplateDesigns } from "@/lib/samples";
import { cn } from "@/lib/utils";

/**
 * ClipCut 레퍼런스 구도의 히어로: 딥 다크 배경 + 중앙 정렬 타이포 + 하단에
 * 템플릿 카드 12장이 3D 원통 캐러셀(레퍼런스 실측 구조)로 화면 좌우를 꽉 채운다.
 * - 카드는 임의 선정이 아니라 실제 템플릿 데이터에서 최신순 · 업종 중복 없이 12개를 파생한다
 * - 좌클릭 드래그(모바일 스와이프)로 원통이 회전하고 관성으로 감속한다
 * - 배경에는 커서를 따라오는 WebGL 무지개 유체와 잔별 42개
 * - prefers-reduced-motion 사용자는 정적 아치를 본다
 */

/** 최신 템플릿에서 업종 중복 없이 12개 — 프리미엄 디자인 목록과 같은 출처 */
const HERO_ITEMS = getLatestTemplateDesigns(12).map((d) => ({
  src: d.sample.image!,
  label: d.label,
  href: d.href,
}));

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
 * 레퍼런스 실측 그대로의 3D 원통 캐러셀.
 * 카드 12장이 반지름 570px 원(30° 간격)에 안쪽을 향해 배치되고, perspective 500px로
 * 원통 "안"에서 반대편 벽을 바라본다 — 그래서 중앙(먼 쪽)이 작고 양옆(가까운 쪽)이 크며,
 * 앞쪽 반원의 카드는 backface-visibility:hidden으로 자연히 사라진다.
 * 드래그(스와이프)하면 원통이 돌고, 놓으면 관성으로 감속한다.
 * 원본 실측: 카드 260×370 radius 20, 반지름 700(팔 1400) - 카드 반폭 = 중심 반경 약 570, perspective 500.
 */
const CARD_W = 260;
const CARD_H = 370;
const STEP = 360 / 12; // 30° 간격 (팔 7개 × 카드 2장 = 위치 12곳 + 반복 2곳)
/**
 * 정지 각은 30° 그리드 정렬(0°) — 레퍼런스(clipcut) 캡처 실측: 정지 상태에서
 * 카드 하나가 화면 정중앙(180° 위치)에 오고, ±90° 카드 두 장이 원근 전단으로
 * 늘어나 좌우 끝의 "육각 벽"이 되어 항상 대칭이다. 드래그가 아무 각도에서 멈추면
 * 한쪽 벽만 남아 비대칭으로 보이므로, 관성이 끝나면 가장 가까운 그리드 각으로 스냅한다.
 */
const REST_OFFSET = 0;
/**
 * 원본 Arm 7개 — 각 팔의 [왼쪽 끝, 오른쪽 끝] 카드에 들어갈 HERO_ITEMS 인덱스.
 * 디자인 12종 + 마지막 팔은 반대편 180° 위치라 겹쳐 보이지 않는 반복 2장.
 */
const ARM_PAIRS: Array<[number, number]> = [
  [0, 1],
  [2, 3],
  [4, 5],
  [6, 7],
  [8, 9],
  [10, 11],
  [0, 6],
];

function CylinderShowcase() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggedRef = useRef(false);
  const angleRef = useRef(REST_OFFSET);
  const velRef = useRef(0);
  const rafRef = useRef(0);
  const spinRef = useRef<HTMLDivElement | null>(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setOpened(true), 300);
    return () => window.clearTimeout(t);
  }, []);

  // 드래그 → 회전각, 놓으면 관성 감속
  useEffect(() => {
    const el = containerRef.current;
    const spin = spinRef.current;
    if (!el || !spin) return;

    const apply = () => {
      spin.style.transform = `rotateY(${angleRef.current}deg)`;
    };
    apply();

    let dragging = false;
    let lastX = 0;
    let lastT = 0;

    // 관성이 끝나면 가장 가까운 대칭 각(n·STEP + REST_OFFSET)으로 스르륵 정렬 —
    // 아무 각도에서 멈추면 한쪽 가장자리 카드만 남아 좌우가 비대칭으로 보인다.
    const settle = () => {
      const target =
        Math.round((angleRef.current - REST_OFFSET) / STEP) * STEP + REST_OFFSET;
      const tick = () => {
        const diff = target - angleRef.current;
        if (Math.abs(diff) < 0.05) {
          angleRef.current = target;
          apply();
          return;
        }
        angleRef.current += diff * 0.08;
        apply();
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const momentum = () => {
      velRef.current *= 0.95;
      if (Math.abs(velRef.current) < 0.005) {
        settle();
        return;
      }
      angleRef.current += velRef.current;
      apply();
      rafRef.current = requestAnimationFrame(momentum);
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      draggedRef.current = false;
      lastX = e.clientX;
      lastT = performance.now();
      velRef.current = 0;
      cancelAnimationFrame(rafRef.current);
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const now = performance.now();
      lastX = e.clientX;
      if (Math.abs(dx) > 2) draggedRef.current = true;
      const dAngle = -dx * 0.12; // 카드가 마우스 이동 방향을 따라가도록 (뒤쪽 벽 시점이라 부호 반전)
      angleRef.current += dAngle;
      velRef.current = (dAngle / Math.max(now - lastT, 1)) * 16; // 프레임당 속도
      lastT = now;
      apply();
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      el.releasePointerCapture(e.pointerId);
      if (reducedMotion) {
        // 모션 최소화: 즉시 대칭 각으로
        angleRef.current =
          Math.round((angleRef.current - REST_OFFSET) / STEP) * STEP + REST_OFFSET;
        apply();
        return;
      }
      if (Math.abs(velRef.current) > 0.02) {
        rafRef.current = requestAnimationFrame(momentum);
      } else {
        settle();
      }
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [reducedMotion]);

  const k = isDesktop ? 1 : 0.55;

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
        // 가로만 ±800(k배)에서 잘라낸다 — 좌우 벽 카드(중앙에서 770)는 그대로 두고,
        // 1705px보다 넓은 화면에서만 걸리던 카메라 앞 카드 두 장(852~)을 어느 폭에서도 대칭으로 숨긴다
        "relative mx-auto w-full cursor-grab touch-pan-y select-none [overflow-x:clip] active:cursor-grabbing",
        isDesktop ? "h-[440px]" : "h-[250px]",
      )}
      style={{
        maxWidth: `${1600 * k}px`,
        opacity: opened ? 1 : 0,
        transform: opened ? "translateY(0)" : "translateY(50px)", // 원본과 같은 등장(페이드업)
        transition: reducedMotion ? "none" : "opacity 700ms ease, transform 700ms ease",
      }}
      aria-label="실제 구축한 홈페이지 템플릿 — 드래그해서 돌려보기"
    >
      {/* 원본 구조 그대로: Carousel(1200×240, perspective 500) > Arms > Arm(1400×240, rotY 30°) × 카드 2장(±90°).
          팔의 두 카드가 서로 반대를 보므로 가까운 쪽 카드가 거대하게 투영되어
          화면 좌우 끝에 "잘린 카드"가 넓은 화면에서도 원본처럼 나타난다. */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: `${1200 * k}px`,
          height: `${240 * k}px`,
          marginLeft: `${-600 * k}px`,
          marginTop: `${-120 * k}px`,
          transform: `perspective(${500 * k}px)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div ref={spinRef} className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {ARM_PAIRS.map(([li, ri], a) => (
            <div
              key={a}
              className="absolute top-0 left-1/2"
              style={{
                width: `${1400 * k}px`,
                height: `${240 * k}px`,
                marginLeft: `${-700 * k}px`,
                transform: `rotateY(${a * STEP}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              {[
                { card: HERO_ITEMS[li], side: "l" as const },
                { card: HERO_ITEMS[ri], side: "r" as const },
              ].map(({ card, side }) => (
                <Link
                  key={side}
                  to={card.href}
                  aria-label={`${card.label} 템플릿 보기`}
                  className="group absolute block overflow-hidden bg-neutral-900 shadow-[0_18px_50px_rgba(0,0,0,0.55)] ring-1 ring-white/15 outline-none transition-shadow hover:ring-white/50 focus-visible:ring-2 focus-visible:ring-white"
                  style={{
                    width: `${CARD_W * k}px`,
                    height: `${CARD_H * k}px`,
                    top: `${((240 - CARD_H) / 2) * k}px`,
                    ...(side === "l" ? { left: 0 } : { right: 0 }),
                    borderRadius: `${20 * k}px`, // 원본 실측 radius 20
                    backfaceVisibility: "hidden",
                    transform: `rotateY(${side === "l" ? 90 : -90}deg)`,
                  }}
                >
                  <img
                    src={card.src.replace("/thumbs/", "/thumbs/sm/")}
                    alt=""
                    draggable={false}
                    decoding="async"
                    className="pointer-events-none h-full w-full object-cover object-top"
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2.5 pb-2 pt-6 text-[10px] font-bold text-white">
                    {card.label}
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
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
        <CylinderShowcase />
        <p className="mt-4 text-center text-xs font-medium text-white/45">
          실제로 저희가 만든 홈페이지입니다 — 좌우로 드래그하고, 카드를 눌러 그대로 확인하세요
        </p>
      </div>
    </section>
  );
}
