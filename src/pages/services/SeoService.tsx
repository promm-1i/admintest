import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Send, ArrowRight, SearchCheck, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { CUSTOM_SERVICES } from "@/components/site/customServices";
import { useLazyMount, Reveal, RevealScale, NextStepsSection } from "@/pages/services/previewKit";

const OTHER_SERVICES = CUSTOM_SERVICES.filter((s) => s.slug !== "seo");

const APPLIED_ITEMS = [
  { name: "<title>", desc: "페이지마다 다른 제목을 실시간으로 설정합니다." },
  { name: "<meta name=\"description\">", desc: "페이지마다 다른 요약 설명을 설정합니다." },
  { name: "og:title / og:description / og:image", desc: "카카오톡, 페이스북 등에 링크를 공유할 때 보이는 정보입니다." },
  { name: "<html lang=\"ko\">", desc: "검색엔진에 페이지의 기본 언어를 명시합니다." },
  { name: "robots.txt / sitemap.xml", desc: "검색엔진이 어떤 페이지를 수집해도 되는지, 전체 페이지 목록은 무엇인지 알려줍니다." },
];

const TITLE_EXAMPLES = [
  { title: "NOVERIQ — 소상공인·기업 홈페이지 제작", desc: "소상공인과 기업을 위한 맞춤형 홈페이지 제작. 상담부터 배포까지 정리해 드립니다." },
  { title: "제작 방법 — NOVERIQ", desc: "홈페이지 제작 의뢰 시 상담부터 배포까지 실제로 어떻게 진행되는지 단계별로 안내합니다." },
  { title: "공지사항 — NOVERIQ", desc: "NOVERIQ의 서비스 안내, 일정 변경 등 소식을 확인하세요." },
];

const DOES = [
  "페이지마다 다른 title · description 설정",
  "robots.txt · sitemap.xml로 수집 경로 안내",
  "이미지 대체 텍스트, 시맨틱 마크업 정리",
  "공유 시 보이는 정보(og 태그) 설정",
];
const DOES_NOT = [
  "검색 순위를 인위적으로 조작",
  "허위 백링크나 트래픽 구매",
  "키워드를 부자연스럽게 반복 삽입",
  "특정 순위를 숫자로 보장",
];

/** 실제 홈페이지를 브라우저 탭 형태로 감싸, title이 실제로 어디에 표시되는지 보여준다. */
function TitleTabDemo() {
  const { ref, shouldLoad } = useLazyMount<HTMLDivElement>();
  return (
    <div ref={ref}>
      <p className="mx-auto mb-2 w-fit rounded-full bg-foreground px-3 py-1 text-center text-xs font-medium text-background">
        ↓ 이 문구가 브라우저 탭에 그대로 표시됩니다
      </p>
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-end gap-1 bg-secondary/50 px-3 pt-2.5">
          <div className="flex items-center gap-2 rounded-t-lg border border-b-0 border-border bg-background px-3 py-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-sm bg-primary/70" />
            <span className="max-w-[220px] truncate text-sm font-medium text-foreground">
              NOVERIQ — 소상공인·기업 홈페이지 제작
            </span>
          </div>
        </div>
        <div className="aspect-video overflow-hidden border-t border-border bg-background">
          {shouldLoad ? (
            <div className="origin-top-left" style={{ transform: "scale(0.42)", width: `${100 / 0.42}%` }}>
              <iframe src="/" title="NOVERIQ 홈페이지" style={{ width: "100%", height: 1500, border: 0 }} />
            </div>
          ) : (
            <div className="h-full w-full bg-secondary/20" />
          )}
        </div>
      </div>
    </div>
  );
}

/** 실제 배포된 robots.txt를 그 자리에서 fetch해 보여준다 — 하드코딩된 예시가 아니라 실제 파일이다. */
function RobotsTxtPreview() {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    fetch("/robots.txt")
      .then((r) => r.text())
      .then(setContent)
      .catch(() => setContent(null));
  }, []);

  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-card px-5 py-4 font-mono text-xs leading-relaxed text-foreground">
      {content ?? "불러오는 중…"}
    </pre>
  );
}

export default function SeoService() {
  usePageTitle(
    "검색엔진 최적화 — NOVERIQ",
    "검색엔진이 홈페이지를 이해하고 수집할 수 있도록 기본 구조를 설정하는 실제 적용 항목을 확인하세요.",
  );

  return (
    <div>
      {/* 히어로 */}
      <div className="mx-auto max-w-4xl px-4 pb-4 pt-14 text-center sm:pt-20">
        <p className="mx-auto flex w-fit items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
          <SearchCheck className="h-3.5 w-3.5" />
          CUSTOM SERVICE — 검색엔진 최적화
        </p>
        <h1 className="mx-auto mt-4 max-w-lg text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          검색엔진이 페이지를 이해할 수 있도록 구조를 만듭니다
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted-foreground break-keep">
          검색 상위 노출이나 순위 상승을 보장하는 작업이 아닙니다. 검색엔진이 페이지의 제목, 설명,
          구조를 정확히 읽고 수집할 수 있도록 기본기를 갖추는 작업입니다.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="gap-2 font-bold">
            <Link to="/contact">
              <Send className="h-4 w-4" />
              구축 상담하기
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="gap-1.5 text-primary hover:bg-primary/5">
            <Link to="/website/features">
              구현 가능한 기능 보기
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* 실제 화면 + annotation */}
      <div className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="mb-8 text-center">
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">실제 화면에서</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">title은 이렇게, 실제로 보입니다</h2>
          </Reveal>
          <RevealScale delay={100}>
            <TitleTabDemo />
          </RevealScale>
        </div>
      </div>

      {/* 실제 적용 항목 */}
      <Reveal className="border-y border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">실제 적용된 기본 설정</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground">지금 이 사이트에 적용되어 있는 항목입니다</h2>
          <div className="mt-8 divide-y divide-border border-t border-border">
            {APPLIED_ITEMS.map((item) => (
              <div key={item.name} className="py-4">
                <p className="font-mono text-base font-semibold text-foreground">{item.name}</p>
                <p className="mt-1.5 text-base leading-relaxed text-muted-foreground break-keep">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Reveal delay={150} className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-6 py-5">
              <p className="text-base font-medium text-foreground break-keep">
                기본 설정 외에 어떤 것까지 구현 가능한지 확인해보세요.
              </p>
              <Button asChild variant="outline" className="shrink-0 gap-1.5">
                <Link to="/website/features">
                  전체 기능 보기
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </Reveal>

      {/* 페이지별 title/description + 큰 SERP 미리보기 */}
      <div className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">페이지마다 다르게</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">모든 페이지가 같은 제목을 쓰지 않습니다</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground break-keep">
              페이지 진입 시 제목과 설명이 그 페이지 내용에 맞게 바뀝니다. 실제로 이 사이트에 적용된
              제목입니다.
            </p>
          </Reveal>
          <Reveal delay={100} className="mt-8 space-y-3">
            {TITLE_EXAMPLES.map((t) => (
              <div key={t.title} className="rounded-lg border border-border bg-card p-4">
                <p className="font-mono text-base font-semibold text-foreground">{t.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground break-keep">{t.desc}</p>
              </div>
            ))}
          </Reveal>

          {/* SERP 미리보기 (확대) */}
          <RevealScale delay={200} className="mt-12">
            <p className="text-center text-xs font-mono font-semibold uppercase tracking-widest text-primary">
              검색결과에서는 이렇게 보일 수 있습니다
            </p>
            <div className="mt-4 rounded-xl border border-border bg-card p-7">
              <p className="text-sm text-muted-foreground">www.noveriq.co.kr</p>
              <p className="mt-1.5 text-xl text-[#1a0dab] break-keep">NOVERIQ — 소상공인·기업 홈페이지 제작</p>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground break-keep">
                소상공인과 기업을 위한 맞춤형 홈페이지 제작. 상담부터 배포까지 정리해 드립니다.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
                <span>↑ 파란 글씨 = title</span>
                <span>↑ 회색 글씨 = description</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground break-keep">
              실제 검색결과 디자인은 검색엔진과 시기에 따라 달라질 수 있어, 위 미리보기는 title과
              description이 어떻게 읽힐 수 있는지 보여주는 예시입니다.
            </p>
          </RevealScale>
        </div>
      </div>

      {/* 하는 것 / 하지 않는 것 */}
      <Reveal className="border-y border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">범위를 정확하게</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground">SEO에서 하는 것 / 하지 않는 것</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-widest text-emerald-600">
                <Check className="h-3.5 w-3.5" />
                하는 것
              </p>
              <ul className="mt-4 space-y-3">
                {DOES.map((text) => (
                  <li key={text} className="flex items-start gap-2 text-base text-foreground break-keep">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground">
                <X className="h-3.5 w-3.5" />
                하지 않는 것
              </p>
              <ul className="mt-4 space-y-3">
                {DOES_NOT.map((text) => (
                  <li key={text} className="flex items-start gap-2 text-base text-muted-foreground break-keep">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/60" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>

      {/* robots.txt 실제 파일 (핵심만 발췌, 보조 위치) */}
      <div className="py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">robots.txt</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">
              검색엔진에게 어디를 수집해도 되는지 알려줍니다
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground break-keep">
              아래는 이 사이트에 실제로 배포되어 있는 robots.txt 파일입니다. 관리자 화면처럼 검색에
              노출되면 안 되는 경로는 명시적으로 제외합니다.
            </p>
          </Reveal>
          <Reveal delay={100} className="mt-6">
            <RobotsTxtPreview />
          </Reveal>
        </div>
      </div>

      {/* 다른 맞춤형 서비스 + 마무리 CTA (하나의 이어진 section) */}
      <NextStepsSection
        otherServices={OTHER_SERVICES}
        ctaTitle="기본 구조부터 정확하게 갖추고 싶으신가요?"
        ctaDesc="페이지 구조, 제목, 설명 설정부터 검색엔진 등록까지 기본 작업을 함께 안내드립니다."
      />
    </div>
  );
}
