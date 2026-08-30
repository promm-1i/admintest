import { Link } from "react-router-dom";
import { Send, ArrowRight, ExternalLink, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { CUSTOM_SERVICES } from "@/components/site/customServices";
import { useLazyMount } from "@/pages/services/previewKit";

const OTHER_SERVICES = CUSTOM_SERVICES.filter((s) => s.slug !== "responsive");

const DEVICES = [
  { label: "Desktop", width: 1440, height: 900, displayWidth: 420, displayHeight: 262 },
  { label: "Tablet", width: 768, height: 1024, displayWidth: 260, displayHeight: 348 },
  { label: "Mobile", width: 390, height: 844, displayWidth: 180, displayHeight: 390 },
];

/** 실제 /about 페이지를 기기별 논리 해상도로 그대로 불러와, 진짜 반응형 breakpoint가 적용된 화면을 보여준다. */
function DeviceFrame({
  label,
  width,
  height,
  displayWidth,
  displayHeight,
}: {
  label: string;
  width: number;
  height: number;
  displayWidth: number;
  displayHeight: number;
}) {
  const { ref, shouldLoad } = useLazyMount<HTMLDivElement>();
  const scale = displayWidth / width;

  return (
    <div className="flex flex-col items-center">
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
          MintCL 소개 페이지를 세 가지 화면 폭으로 그대로 불러온 결과입니다.
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

      {/* 3단 실제 화면 비교 */}
      <div className="border-y border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">실제 화면 비교</p>
          <h2 className="mt-3 max-w-xl text-2xl font-bold text-foreground">
            같은 페이지, 화면 폭에 따라 다르게 배치됩니다
          </h2>

          <div className="mt-10 flex items-end gap-8 overflow-x-auto px-1 pb-2">
            {DEVICES.map((d) => (
              <DeviceFrame key={d.label} {...d} />
            ))}
          </div>
        </div>
      </div>

      {/* 다른 맞춤형 서비스 */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">다른 맞춤형 서비스</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {OTHER_SERVICES.map((s) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {s.navLabel}
            </Link>
          ))}
        </div>
      </div>

      {/* 마무리 CTA */}
      <div className="border-t border-border bg-secondary/30 py-14 text-center">
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
