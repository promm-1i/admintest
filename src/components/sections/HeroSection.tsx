import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import hospitalShot from "@/assets/images/hospital_solution_thumbnail.jpg";
import academyShot from "@/assets/images/academy_solution_thumbnail.jpg";
import rentcarShot from "@/assets/images/rentcar_solution_thumbnail.jpg";
import interiorShot from "@/assets/images/interior_solution_thumbnail.jpg";
import realEstateShot from "@/assets/images/real_estate_platform_thumbnail.jpg";

/**
 * 폴더에서 실제 구축 사이트들이 튀어나오는 히어로.
 * 좌측 카피는 기존 첫 슬라이드 메시지를 그대로 잇고, 우측은 포트폴리오 폴더 연출:
 * 화면에 들어오면 실화면 캡처 5장이 스프링 곡선으로 부채꼴 팝아웃된다.
 * 배경에는 커서를 따라 느리게 흐르는 브랜드 글로우(유체 커서의 경량 재현).
 * prefers-reduced-motion 사용자는 펼쳐진 정적 상태로 본다.
 */

const SHOWCASE = [
  { src: rentcarShot, label: "로드인 렌트카", href: "/samples/rentcar-solution", rot: -16, x: -200, y: 58 },
  { src: hospitalShot, label: "리엔 클리닉", href: "/samples/hospital-solution", rot: -8, x: -102, y: 98 },
  { src: academyShot, label: "세움학원", href: "/samples/academy-solution", rot: 0, x: 0, y: 122 },
  { src: interiorShot, label: "오브제바스", href: "/samples/interior-solution", rot: 8, x: 102, y: 98 },
  { src: realEstateShot, label: "부동산 플랫폼", href: "/samples/commercial-real-estate-platform", rot: 16, x: 200, y: 58 },
];

/** 스프링 느낌의 오버슈트 곡선 — 라이브러리 없이 CSS transition으로 낸다 */
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

function FolderShowcase({ compact }: { compact?: boolean }) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  // 히어로는 로드 직후 화면에 있으므로 스크롤 감지 없이 첫 페인트 뒤 바로 팝아웃한다
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setOpened(true), 350);
    return () => window.clearTimeout(t);
  }, []);
  const open = opened || reducedMotion;
  const [hovered, setHovered] = useState<number | null>(null);
  // 카드 좌표는 데스크톱 기준 px — 모바일은 통째로 축소해 비율을 유지한다
  const k = compact ? 0.62 : 1;

  return (
    <div
      className={cn("relative mx-auto", compact ? "h-[320px] w-[340px]" : "h-[460px] w-[560px]")}
      aria-label="실제 구축한 홈페이지 모음"
    >
      {/* 폴더 뒷판 */}
      <svg
        viewBox="0 0 280 190"
        className={cn("absolute bottom-0 left-1/2 -translate-x-1/2", compact ? "w-[230px]" : "w-[320px]")}
        aria-hidden
      >
        <path
          d="M12 34 q0-10 10-10 h74 l20 18 h140 q12 0 12 12 v120 q0 12-12 12 H24 q-12 0-12-12 Z"
          fill="#8E0B15"
        />
      </svg>

      {/* 실화면 카드 5장 — 폴더에서 팝아웃 */}
      {SHOWCASE.map((card, i) => (
        <Link
          key={card.href}
          to={card.href}
          aria-label={`${card.label} 구축 사례 보기`}
          className="group absolute left-1/2 block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            width: `${176 * k}px`,
            bottom: `${88 * k}px`,
            zIndex: hovered === i ? 30 : 10 - Math.abs(i - 2),
            // 바깥은 등장(위치·투명도)만 담당 — 스태거가 hover와 섞이지 않는다
            transform: open
              ? `translateX(calc(-50% + ${card.x * k}px)) translateY(${-card.y * k}px)`
              : "translateX(-50%) translateY(40px)",
            opacity: open ? 1 : 0,
            transition: reducedMotion
              ? "none"
              : `transform 850ms ${SPRING} ${i * 90}ms, opacity 400ms ease ${i * 90}ms`,
          }}
        >
          {/* 안쪽은 기울기·hover 리프트 담당 */}
          <div
            className="overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/10 transition-shadow group-hover:shadow-2xl"
            style={{
              transform: open
                ? `rotate(${hovered === i ? 0 : card.rot}deg) scale(${hovered === i ? 1.12 : 1})`
                : "rotate(0deg) scale(0.5)",
              transition: reducedMotion ? "none" : `transform 320ms ${SPRING}`,
            }}
          >
            <img src={card.src} alt="" className="aspect-[16/10] w-full object-cover object-top" />
            <span
              className={cn(
                "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2.5 pb-1.5 pt-5 text-[10px] font-bold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100",
                compact && "opacity-100",
              )}
            >
              {card.label}
            </span>
          </div>
        </Link>
      ))}

      {/* 폴더 앞판 — 카드 아랫단을 물고 있어 "들어있다"가 읽힌다 */}
      <svg
        viewBox="0 0 280 150"
        className={cn(
          "pointer-events-none absolute bottom-0 left-1/2 z-20 -translate-x-1/2",
          compact ? "w-[230px]" : "w-[320px]",
        )}
        aria-hidden
      >
        <defs>
          <linearGradient id="heroFolderFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C81423" />
            <stop offset="1" stopColor="#A00C18" />
          </linearGradient>
        </defs>
        <path d="M10 24 q0-12 12-12 h236 q12 0 12 12 v102 q0 12-12 12 H22 q-12 0-12-12 Z" fill="url(#heroFolderFront)" />
        <path d="M10 30 q60 14 130 14 t130-14 v96 q0 12-12 12 H22 q-12 0-12-12 Z" fill="#B20D1A" opacity=".55" />
      </svg>

      {/* 폴더 이름표 */}
      <p
        className={cn(
          "absolute inset-x-0 z-20 text-center font-semibold text-foreground/70",
          compact ? "-bottom-6 text-[11px]" : "-bottom-7 text-xs",
        )}
      >
        NOVERIQ 제작 사례 — 카드를 눌러 실제 화면을 확인하세요
      </p>
    </div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [hasPointer, setHasPointer] = useState(false);

  // 유체 커서의 경량 재현: 블러 글로우 두 개가 커서를 서로 다른 지연으로 따라온다
  useEffect(() => {
    if (reducedMotion) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;

    const blobs = [...glow.children] as HTMLElement[];
    const pos = blobs.map(() => ({ x: 0, y: 0 }));
    let target = { x: 0, y: 0 };
    let raf = 0;
    let running = false;

    const tick = () => {
      let settled = true;
      blobs.forEach((b, i) => {
        const ease = i === 0 ? 0.09 : 0.045; // 두 번째 블롭이 더 늦게 따라와 유체감이 난다
        pos[i]!.x += (target.x - pos[i]!.x) * ease;
        pos[i]!.y += (target.y - pos[i]!.y) * ease;
        if (Math.abs(target.x - pos[i]!.x) + Math.abs(target.y - pos[i]!.y) > 1) settled = false;
        b.style.transform = `translate3d(${pos[i]!.x}px, ${pos[i]!.y}px, 0)`;
      });
      if (settled) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      target = { x: e.clientX - r.left, y: e.clientY - r.top };
      setHasPointer(true);
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    section.addEventListener("mousemove", onMove);
    return () => {
      section.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background">
      {/* 커서 추종 글로우 (포인터 없는 기기·감속 설정에서는 기존 idle 드리프트) */}
      <div ref={glowRef} aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className={cn(
            "absolute -ml-40 -mt-40 h-80 w-80 rounded-full bg-primary/[0.13] blur-[100px]",
            !hasPointer && "idle-float left-[55%] top-[30%]",
          )}
        />
        <div
          className={cn(
            "absolute -ml-32 -mt-32 h-64 w-64 rounded-full bg-amber-500/10 blur-[90px]",
            !hasPointer && "idle-float-slow left-[70%] top-[55%]",
          )}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-6 lg:py-24">
        {/* 좌측 카피 — 기존 메시지 유지 */}
        <FadeIn>
          <span className="idle-breath inline-block rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            맞춤형 웹사이트 제작 전문
          </span>
          <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.2] tracking-tight text-foreground sm:text-5xl">
            기획부터 디자인
            <br />
            직접 만듭니다.
          </h1>
          <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            레이아웃 설계부터 실제 화면 디자인까지, 만드는 과정을 한 번에 진행합니다.
          </p>
          <ul className="mt-6 flex flex-col gap-2">
            {["요구사항에 맞춘 기획·디자인", "완성된 화면 그대로 확인", "필요한 페이지만 구성"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/contact">제작 상담하기</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/samples">포트폴리오 보기</Link>
            </Button>
          </div>
        </FadeIn>

        {/* 우측 폴더 팝아웃 — 데스크톱 */}
        <div className="hidden lg:block">
          <FolderShowcase />
        </div>
        {/* 모바일: 카피 아래 축소판 */}
        <div className="pb-8 lg:hidden">
          <FolderShowcase compact />
        </div>
      </div>
    </section>
  );
}
