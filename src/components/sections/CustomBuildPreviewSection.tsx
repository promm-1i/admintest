import { useCallback, useEffect, useRef, useState } from "react";
import { LayoutTemplate, MousePointerClick, SlidersHorizontal, Workflow, Play } from "lucide-react";
import { Reveal } from "@/pages/services/previewKit";
import { FadeIn } from "@/components/ui/FadeIn";

type BuildPreview = {
  slug: string;
  title: string;
  desc: string;
  icon: typeof LayoutTemplate;
};

/**
 * 영상은 public/videos/custom/<slug>.webm · .mp4 · .jpg(포스터)로 넣습니다.
 * 파일이 아직 없어도 카드는 브랜드 플레이스홀더로 정상 표시됩니다.
 */
const PREVIEWS: BuildPreview[] = [
  {
    slug: "layout",
    title: "자유로운 레이아웃 설계",
    desc: "정해진 틀에 맞추지 않습니다. 필요한 영역을 원하는 자리에 배치해 화면을 새로 구성합니다.",
    icon: LayoutTemplate,
  },
  {
    slug: "realtime",
    title: "실시간 수정 반영",
    desc: "상담에서 나온 요청을 그 자리에서 반영하고, 바뀐 화면을 바로 함께 확인합니다.",
    icon: MousePointerClick,
  },
  {
    slug: "admin",
    title: "관리자 시스템 맞춤 구축",
    desc: "업무 흐름에 맞춰 관리자 화면을 설계합니다. 쓰지 않는 기능은 넣지 않습니다.",
    icon: SlidersHorizontal,
  },
  {
    slug: "integration",
    title: "기능 · 데이터 연동 확장",
    desc: "예약 · 결제 · 지도 · 외부 API까지, 운영하면서 필요해진 기능을 이어 붙입니다.",
    icon: Workflow,
  },
];

function PreviewCard({ item, index }: { item: BuildPreview; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const start = useCallback(() => {
    if (reduced) return;
    const v = videoRef.current;
    if (!v) return;
    v.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );
  }, [reduced]);

  // 되감지 않고 멈춥니다. 영상 첫 프레임이 비어 있는 것들이 있어, 마지막 프레임을 남기는 편이 낫습니다.
  const stop = useCallback(() => {
    videoRef.current?.pause();
    setPlaying(false);
  }, []);

  return (
    <FadeIn direction="up" delay={index * 90}>
      <button
        type="button"
        onMouseEnter={start}
        onMouseLeave={stop}
        onFocus={start}
        onBlur={stop}
        onClick={() => (playing ? stop() : start())}
        aria-label={`${item.title} — 미리보기 영상 재생`}
        className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition-all duration-500 ease-[cubic-bezier(.32,.72,0,1)] hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <span className="relative block aspect-video w-full overflow-hidden bg-gradient-to-br from-primary/[0.07] via-secondary/40 to-background">
          {/* 포스터를 배경으로도 깔아 둔다 — video의 poster는 메타데이터를 받은 뒤에야
              그려져서, 카드가 잠깐 빈 채로 보이는 일이 있다. */}
          <span
            aria-hidden
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(/videos/custom/${item.slug}.jpg)` }}
          />
          <video
            ref={videoRef}
            className="relative h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
            poster={`/videos/custom/${item.slug}.jpg`}
            tabIndex={-1}
          >
            <source src={`/videos/custom/${item.slug}.webm`} type="video/webm" />
            <source src={`/videos/custom/${item.slug}.mp4`} type="video/mp4" />
          </video>
          <span
            aria-hidden
            className={`absolute bottom-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
              playing ? "opacity-0" : "opacity-100"
            }`}
          >
            <Play className="h-3.5 w-3.5 fill-primary text-primary" />
          </span>
        </span>
        <span className="flex flex-1 flex-col p-5">
          <span className="text-base font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
            {item.title}
          </span>
          <span className="mt-1.5 text-sm leading-relaxed text-muted-foreground break-keep">{item.desc}</span>
        </span>
      </button>
    </FadeIn>
  );
}

export function CustomBuildPreviewSection() {
  return (
    <div id="how" className="scroll-mt-24 border-y border-border bg-secondary/20 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">개발 방식</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground break-keep">
            정해진 틀이 아니라, 설계부터 만드는 방식
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground break-keep">
            아래 네 가지가 커스텀 개발에서 실제로 일어나는 일입니다. 카드에 마우스를 올리면(모바일은
            탭하면) 짧은 미리보기가 재생됩니다.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PREVIEWS.map((p, i) => (
            <PreviewCard key={p.slug} item={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
