import { useEffect, useRef, useState } from "react";
import { HeroFluid } from "@/components/sections/HeroFluid";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import hospitalShot from "@/assets/images/hospital_solution_thumbnail.jpg";
import academyShot from "@/assets/images/academy_solution_thumbnail.jpg";
import rentcarShot from "@/assets/images/rentcar_solution_thumbnail.jpg";
import interiorShot from "@/assets/images/interior_solution_thumbnail.jpg";
import realEstateShot from "@/assets/images/real_estate_platform_thumbnail.jpg";

/**
 * ClipCut 레퍼런스 방식의 히어로: 딥 다크 배경 + 중앙 정렬 타이포 + 아래에
 * 실제 구축 사이트 5장이 3D 원근(rotateY) 아치로 늘어선다.
 * 등장은 스프링 오버슈트 + 중앙→바깥 스태거, hover 시 해당 카드가 정면으로 떠오른다.
 * 커서를 따라오는 무지개 글로우(회전하는 무지개 원판 + 반짝이 입자)가 배경에 흐른다.
 * prefers-reduced-motion 사용자는 펼쳐진 정적 아치만 본다.
 */

const SHOWCASE = [
  { src: rentcarShot, label: "로드인 렌트카", href: "/samples/rentcar-solution", rotY: 34, x: -430, y: 6, w: 250 },
  { src: hospitalShot, label: "리엔 클리닉", href: "/samples/hospital-solution", rotY: 18, x: -232, y: -14, w: 205 },
  { src: academyShot, label: "세움학원", href: "/samples/academy-solution", rotY: 0, x: 0, y: -26, w: 180 },
  { src: interiorShot, label: "오브제바스", href: "/samples/interior-solution", rotY: -18, x: 232, y: -14, w: 205 },
  { src: realEstateShot, label: "부동산 플랫폼", href: "/samples/commercial-real-estate-platform", rotY: -34, x: 430, y: 6, w: 250 },
];

/** 스프링 느낌의 오버슈트 곡선 — 라이브러리 없이 CSS transition으로 낸다 */
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

/** 레퍼런스처럼 배경에 흩뿌려진 작은 별 입자 (%, 크기 px, 깜빡임 지연 s) */
const STARS = [
  { x: 8, y: 18, size: 3, delay: 0 },
  { x: 16, y: 62, size: 2, delay: 1.3 },
  { x: 26, y: 34, size: 2, delay: 2.1 },
  { x: 38, y: 12, size: 3, delay: 0.6 },
  { x: 55, y: 8, size: 2, delay: 1.8 },
  { x: 66, y: 28, size: 3, delay: 0.2 },
  { x: 78, y: 15, size: 2, delay: 2.6 },
  { x: 88, y: 42, size: 3, delay: 1.0 },
  { x: 93, y: 68, size: 2, delay: 0.4 },
  { x: 72, y: 58, size: 2, delay: 1.5 },
];

function ShowcaseArc() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [opened, setOpened] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  useEffect(() => {
    const t = window.setTimeout(() => setOpened(true), 300);
    return () => window.clearTimeout(t);
  }, []);
  const open = opened || reducedMotion;
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const k = isDesktop ? 1 : 0.42;

  return (
    <div
      className={cn("relative mx-auto w-full", isDesktop ? "h-[290px]" : "h-[150px]")}
      style={{ perspective: "1100px" }}
      aria-label="실제 구축한 홈페이지 모음"
    >
      {SHOWCASE.map((card, i) => {
        const centerDist = Math.abs(i - 2); // 중앙에서 먼 카드일수록 늦게 등장
        const on = hovered === i;
        return (
          <Link
            key={card.href}
            to={card.href}
            aria-label={`${card.label} 구축 사례 보기`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="group absolute left-1/2 top-1/2 block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-white"
            style={{
              width: `${card.w * k}px`,
              zIndex: on ? 30 : 10 - centerDist,
              transform: open
                ? `translate(calc(-50% + ${card.x * k}px), calc(-50% + ${card.y * k}px))`
                : "translate(-50%, calc(-50% + 90px))",
              opacity: open ? 1 : 0,
              transition: reducedMotion
                ? "none"
                : `transform 900ms ${SPRING} ${centerDist * 110}ms, opacity 450ms ease ${centerDist * 110}ms`,
            }}
          >
            {/* 안쪽 래퍼가 3D 기울기와 hover 리프트를 담당 — 등장 스태거와 충돌하지 않는다 */}
            <div
              className="overflow-hidden rounded-xl bg-neutral-900 shadow-[0_18px_50px_rgba(0,0,0,0.55)] ring-1 ring-white/15 transition-shadow group-hover:ring-white/40"
              style={{
                transform: open
                  ? `rotateY(${on ? 0 : card.rotY}deg) scale(${on ? 1.14 : 1})`
                  : "rotateY(0deg) scale(0.82)",
                transition: reducedMotion ? "none" : `transform 340ms ${SPRING}`,
              }}
            >
              <img src={card.src} alt="" className="aspect-[16/11] w-full object-cover object-top" />
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
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#15100E] text-white"
    >
      {/* 배경 앰비언트 — 레퍼런스처럼 따뜻한 비네트 */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-96 w-[560px] -translate-x-1/2 rounded-full bg-[#B20D1A]/25 blur-[130px]" />
        <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-amber-600/15 blur-[110px]" />
      </div>

      {/* 커서를 따라 소용돌이치는 무지개 유체 (레퍼런스 설정값 그대로) */}
      <HeroFluid targetRef={sectionRef} />

      {/* 배경 별 입자 — 레퍼런스의 잔별 */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {STARS.map((sp) => (
          <span
            key={`${sp.x}-${sp.y}`}
            className="absolute rounded-full bg-white/70 motion-safe:animate-[heroTwinkle_3.2s_ease-in-out_infinite] motion-reduce:opacity-60"
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

      {/* 실제 구축 사이트 3D 아치 */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:pb-20">
        <ShowcaseArc />
        <p className="mt-5 text-center text-xs font-medium text-white/45">
          실제로 저희가 만든 홈페이지입니다 — 카드를 눌러 그대로 확인하세요
        </p>
      </div>
    </section>
  );
}
