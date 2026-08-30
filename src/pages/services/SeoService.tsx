import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Send, ArrowRight, SearchCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { CUSTOM_SERVICES } from "@/components/site/customServices";

const OTHER_SERVICES = CUSTOM_SERVICES.filter((s) => s.slug !== "seo");

const APPLIED_ITEMS = [
  { name: "<title>", desc: "페이지마다 다른 제목을 실시간으로 설정합니다." },
  { name: "<meta name=\"description\">", desc: "페이지마다 다른 요약 설명을 설정합니다." },
  { name: "og:title / og:description / og:image", desc: "카카오톡, 페이스북 등에 링크를 공유할 때 보이는 정보입니다." },
  { name: "<html lang=\"ko\">", desc: "검색엔진에 페이지의 기본 언어를 명시합니다." },
  { name: "robots.txt / sitemap.xml", desc: "검색엔진이 어떤 페이지를 수집해도 되는지, 전체 페이지 목록은 무엇인지 알려줍니다." },
];

const TITLE_EXAMPLES = [
  { title: "MintCL — 소상공인·기업 홈페이지 제작", desc: "40만 원부터 시작하는 맞춤형 홈페이지 제작. 상담부터 배포까지 정리해 드립니다." },
  { title: "제작 방법 — MintCL", desc: "홈페이지 제작 의뢰 시 상담부터 배포까지 실제로 어떻게 진행되는지 단계별로 안내합니다." },
  { title: "공지사항 — MintCL", desc: "MintCL의 서비스 안내, 일정 변경 등 소식을 확인하세요." },
];

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
    "검색엔진 최적화 — MintCL",
    "검색엔진이 홈페이지를 이해하고 수집할 수 있도록 기본 구조를 설정하는 실제 적용 항목을 확인하세요.",
  );

  return (
    <div>
      {/* 히어로 */}
      <div className="mx-auto max-w-2xl px-4 pb-4 pt-14 text-center sm:pt-20">
        <p className="mx-auto flex w-fit items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
          <SearchCheck className="h-3.5 w-3.5" />
          CUSTOM SERVICE — 검색엔진 최적화
        </p>
        <h1 className="mx-auto mt-4 max-w-lg text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          검색엔진이 페이지를 이해할 수 있도록 구조를 만듭니다
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground break-keep">
          검색 상위 노출이나 순위 상승을 보장하는 작업이 아닙니다. 검색엔진이 페이지의 제목, 설명,
          구조를 정확히 읽고 수집할 수 있도록 기본기를 갖추는 작업입니다.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="gap-2 font-bold">
            <Link to="/contact">
              <Send className="h-4 w-4" />
              구축 상담하기
            </Link>
          </Button>
        </div>
      </div>

      {/* 실제 적용 항목 */}
      <div className="border-y border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-2xl px-4">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">실제 적용된 기본 설정</p>
          <h2 className="mt-3 text-2xl font-bold text-foreground">지금 이 사이트에 적용되어 있는 항목입니다</h2>
          <div className="mt-8 divide-y divide-border border-t border-border">
            {APPLIED_ITEMS.map((item) => (
              <div key={item.name} className="py-4">
                <p className="font-mono text-sm font-semibold text-foreground">{item.name}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground break-keep">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 페이지별 title/description */}
      <div className="mx-auto max-w-2xl px-4 py-14 sm:py-20">
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">페이지마다 다르게</p>
        <h2 className="mt-3 text-2xl font-bold text-foreground">모든 페이지가 같은 제목을 쓰지 않습니다</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground break-keep">
          페이지 진입 시 제목과 설명이 그 페이지 내용에 맞게 바뀝니다. 실제로 이 사이트에 적용된
          제목입니다.
        </p>
        <div className="mt-8 space-y-3">
          {TITLE_EXAMPLES.map((t) => (
            <div key={t.title} className="rounded-lg border border-border bg-card p-4">
              <p className="font-mono text-sm font-semibold text-foreground">{t.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground break-keep">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* SERP 미리보기 */}
        <p className="mt-10 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
          검색결과에서는 이렇게 보일 수 있습니다
        </p>
        <div className="mt-4 rounded-lg border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">mintcl.netlify.app</p>
          <p className="mt-1 text-lg text-[#1a0dab] break-keep">MintCL — 소상공인·기업 홈페이지 제작</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground break-keep">
            40만 원부터 시작하는 맞춤형 홈페이지 제작. 상담부터 배포까지 정리해 드립니다.
          </p>
        </div>
        <p className="mt-3 text-xs text-muted-foreground break-keep">
          실제 검색결과 디자인은 검색엔진과 시기에 따라 달라질 수 있어, 위 미리보기는 title과
          description이 어떻게 읽힐 수 있는지 보여주는 예시입니다.
        </p>
      </div>

      {/* robots.txt 실제 파일 */}
      <div className="border-t border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-2xl px-4">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">robots.txt</p>
          <h2 className="mt-3 text-2xl font-bold text-foreground">
            검색엔진에게 어디를 수집해도 되는지 알려줍니다
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground break-keep">
            아래는 이 사이트에 실제로 배포되어 있는 robots.txt 파일입니다. 관리자 화면처럼 검색에
            노출되면 안 되는 경로는 명시적으로 제외합니다.
          </p>
          <div className="mt-6">
            <RobotsTxtPreview />
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
          <p className="text-base font-bold text-foreground break-keep">기본 구조부터 정확하게 갖추고 싶으신가요?</p>
          <p className="mt-2 text-sm text-muted-foreground break-keep">
            페이지 구조, 제목, 설명 설정부터 검색엔진 등록까지 기본 작업을 함께 안내드립니다.
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
