import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Send, ArrowRight, ExternalLink, Smartphone, Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CUSTOM_SERVICES } from "@/components/site/customServices";
import { useLazyMount, Reveal } from "@/pages/services/previewKit";

const OTHER_SERVICES = CUSTOM_SERVICES.filter((s) => s.slug !== "responsive");

const DEVICES = [
  { label: "Desktop", width: 1440, height: 900, displayWidth: 520, displayHeight: 325, note: "가장 넓은 여백, 통계 3열 배치" },
  { label: "Tablet", width: 768, height: 1024, displayWidth: 320, displayHeight: 427, note: "데스크톱과 같은 그리드, 여백만 축소" },
  { label: "Mobile", width: 390, height: 844, displayWidth: 220, displayHeight: 476, note: "통계 3열 → 1열, 좌우 분할 → 세로 통합" },
];

const PROBLEMS_WITHOUT = [
  "글자와 버튼이 작아져 손가락으로 누르기 어려워집니다.",
  "가로 스크롤이 생겨 내용을 온전히 보기 어려워집니다.",
  "방문자 대부분이 모바일인데, 정작 모바일 경험이 가장 불편해집니다.",
  "검색엔진이 모바일 친화적이지 않은 페이지로 판단해 노출에도 불리합니다.",
];

/** 실제 /about 페이지를 기기별 논리 해상도로 그대로 불러와, 진짜 반응형 breakpoint가 적용된 화면을 보여준다. */
function DeviceFrame({
  label,
  width,
  height,
  displayWidth,
  displayHeight,
  note,
  delay,
}: {
  label: string;
  width: number;
  height: number;
  displayWidth: number;
  displayHeight: number;
  note: string;
  delay: number;
}) {
  const { ref, shouldLoad } = useLazyMount<HTMLDivElement>();
  const scale = displayWidth / width;

  return (
    <Reveal delay={delay} className="flex flex-col items-center">
      <p className="mb-3 font-mono text-xs font-bold text-primary">
        {label} · {width}px
      </p>
      <div
        ref={ref}
        className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"
        style={{ width: displayWidth, height: displayHeight }}
        inert
      >
        <div className="origin-top-left" style={{ transform: `scale(${scale})`, width, height }}>
          {shouldLoad ? (
            <iframe
              src="/about"
              title={`MintCL 소개 페이지 — ${label} 화면`}
              style={{ width, height, border: 0 }}
            />
          ) : (
            <div style={{ width, height }} className="bg-secondary/20" />
          )}
        </div>
      </div>
      <p className="mt-3 max-w-[220px] text-center text-xs text-muted-foreground break-keep">{note}</p>
    </Reveal>
  );
}

/** 실제 /about 페이지를 담은 프레임의 폭이 데스크톱↔모바일로 자동으로 늘었다 줄었다 하며, 실시간 재배치를 보여준다. */
function BreathingPreview() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { ref, shouldLoad } = useLazyMount<HTMLDivElement>();
  const [wide, setWide] = useState(true);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => setWide((v) => !v), 3200);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  const wideState = reducedMotion || wide;

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-1.5 border-b border-border bg-secondary/60 px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-2 truncate font-mono text-[11px] text-muted-foreground">
          mintcl.app/about — 화면 폭 실시간 변화
        </span>
      </div>
      <div className="flex justify-center bg-secondary/20 px-4 py-8">
        <div
          className="max-w-full overflow-hidden rounded-lg border border-border bg-background shadow-md transition-[width] duration-[1400ms] ease-in-out"
          style={{ width: wideState ? "100%" : 340, height: 420 }}
        >
          {shouldLoad && (
            <iframe src="/about" title="반응형 실시간 예시" style={{ width: "100%", height: "100%", border: 0 }} />
          )}
        </div>
      </div>
      <p className="pb-4 text-center font-mono text-xs tabular-nums text-muted-foreground transition-all">
        {wideState ? "넓은 화면" : "좁은 화면 (340px)"}
      </p>
    </div>
  );
}

export default function ResponsiveService() {
  usePageTitle(
    "반응형 웹 제작 — MintCL",
    "하나의 홈페이지가 데스크톱, 태블릿, 모바일에서 어떻게 자연스럽게 재배치되는지 실제 화면으로 확인하세요.",
  );

  return (
    <div>
      {/* 히어로 */}
      <div className="mx-auto max-w-3xl px-4 pb-4 pt-14 text-center sm:pt-20">
        <p className="mx-auto flex w-fit items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
          <Smartphone className="h-3.5 w-3.5" />
          CUSTOM SERVICE — 반응형 웹 제작
        </p>
        <h1 className="mx-auto mt-4 max-w-xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          하나의 홈페이지가, 모든 화면에서 자연스럽습니다
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground break-keep">
          PC, 태블릿, 모바일 화면 크기에 맞춰 콘텐츠 배치와 크기가 자동으로 바뀝니다. 아래는 실제
          MintCL 소개 페이지가 화면 폭에 따라 실시간으로 재배치되는 모습입니다.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="gap-2 font-bold">
            <Link to="/contact">
              <Send className="h-4 w-4" />
              구축 상담하기
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-1.5">
            <a href="/about" target="_blank" rel="noopener noreferrer">
              실제 페이지 열어보기
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>

      {/* 실시간 폭 변화 */}
      <div className="py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal className="mb-8 text-center">
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">실시간으로 보기</p>
            <h2 className="mt-3 text-2xl font-bold text-foreground">화면 폭이 줄어들면, 이렇게 반응합니다</h2>
          </Reveal>
          <Reveal delay={100}>
            <BreathingPreview />
          </Reveal>
        </div>
      </div>

      {/* 3단 실제 화면 비교 (확대 + annotation) */}
      <div className="border-y border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">실제 화면 비교</p>
            <h2 className="mt-3 max-w-xl text-2xl font-bold text-foreground">
              같은 페이지, 화면 폭에 따라 다르게 배치됩니다
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground break-keep">
              세 화면 모두 실제 MintCL 소개 페이지를 기기별 논리 해상도로 그대로 불러온 결과입니다.
            </p>
          </Reveal>

          <div className="mt-10 flex items-end gap-8 overflow-x-auto px-1 pb-2">
            {DEVICES.map((d, i) => (
              <DeviceFrame key={d.label} {...d} delay={i * 100} />
            ))}
          </div>
        </div>
      </div>

      {/* 반응형이 아니면 생기는 문제 */}
      <Reveal className="py-14 sm:py-20">
        <div className="mx-auto max-w-2xl px-4">
          <p className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
            <AlertTriangle className="h-3.5 w-3.5" />
            반응형이 아니라면
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foreground break-keep">
            PC 화면 그대로 축소된 모바일 페이지는 이런 문제가 생깁니다
          </h2>
          <div className="mt-8 space-y-4">
            {PROBLEMS_WITHOUT.map((text) => (
              <div key={text} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-foreground break-keep">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 다른 맞춤형 서비스 */}
      <div className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">다른 맞춤형 서비스</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {OTHER_SERVICES.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {s.navLabel}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 마무리 CTA */}
      <div className="py-14 text-center">
        <div className="mx-auto max-w-md px-4">
          <p className="text-base font-bold text-foreground break-keep">모바일 방문자가 더 많다면, 더 중요합니다.</p>
          <p className="mt-2 text-sm text-muted-foreground break-keep">
            업종별 방문 기기 비율을 고려해 반응형 우선순위를 함께 설계합니다.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button asChild className="gap-2 font-bold">
              <Link to="/contact">
                <Send className="h-4 w-4" />
                구축 상담하기
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-1.5">
              <Link to="/website/features">
                전체 기능 소개 보기
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
