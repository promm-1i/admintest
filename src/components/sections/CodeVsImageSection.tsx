import { MousePointer2, Search, Check, X } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";

/**
 * "자체 코딩 vs 이미지 붙여넣기" 실연 비교.
 * 왼쪽은 진짜 텍스트라 방문자가 직접 드래그하면 글자가 한 자씩 선택되고,
 * 오른쪽은 같은 화면을 이미지 한 장으로 넣어 드래그하면 통째로 끌려온다.
 * 오른쪽 이미지는 왼쪽 패널을 그대로 캡처한 것 (/images/code_vs_image_sample.png).
 */

function SamplePage({ asImage }: { asImage?: boolean }) {
  if (asImage) {
    return (
      <img
        src="/images/code_vs_image_sample.png"
        alt="이미지로만 만든 홈페이지 예시 — 글자가 전부 그림 속에 있어 선택도 검색도 되지 않습니다"
        className="w-full select-none"
      />
    );
  }
  return (
    <div id="code-sample-capture" className="bg-white p-6 selection:bg-[#B20D1A]/20 sm:p-7">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#B20D1A]">
        Green Home Interior
      </p>
      <h4 className="mt-2 text-xl font-bold text-neutral-900">그린홈 인테리어</h4>
      <p className="mt-0.5 text-sm font-medium text-neutral-600">주방 · 욕실 · 전체 리모델링 전문</p>
      <p className="mt-3 text-[13px] leading-relaxed text-neutral-500 break-keep">
        상담부터 실측, 자재 선정, 시공, 마감 점검까지 한 팀이 책임지고 진행합니다. 시공 후에도
        하자 점검을 도와드립니다.
      </p>
      <ul className="mt-4 space-y-1.5 text-[13px] text-neutral-700">
        <li>· 무료 방문 실측</li>
        <li>· 확정 견적제 운영</li>
        <li>· 전담 시공팀 배정</li>
      </ul>
      <span className="mt-5 inline-block rounded-md bg-neutral-900 px-4 py-2 text-xs font-bold text-white">
        견적 문의하기
      </span>
    </div>
  );
}

const PANELS = [
  {
    key: "code",
    tone: "good" as const,
    title: "직접 코딩한 홈페이지",
    sub: "NOVERIQ 방식",
    crawler: "그린홈 인테리어 · 주방 · 욕실 · 전체 리모델링 전문 · 상담부터 실측, 자재 선정…",
    crawlerBadge: "색인 가능",
    hint: "글자를 드래그해 보세요 — 한 자씩 선택됩니다",
  },
  {
    key: "image",
    tone: "bad" as const,
    title: "이미지로 만든 홈페이지",
    sub: "이미지 몇 장을 붙여 넣는 방식",
    crawler: "이미지 파일 1장 — 읽을 수 있는 글자 없음",
    crawlerBadge: "색인 불가",
    hint: "드래그해 보세요 — 이미지가 통째로 끌려옵니다",
  },
];

export function CodeVsImageSection() {
  return (
    <section className="border-y border-border bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          label="WHY CUSTOM CODE"
          title="같아 보여도, 검색엔진에게는 전혀 다릅니다."
          description="이미지 몇 장을 붙여 만든 홈페이지는 겉보기엔 비슷하지만, 글자가 그림 속에 있어 네이버·구글이 내용을 읽지 못합니다. 두 화면을 직접 드래그해서 차이를 확인해 보세요."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {PANELS.map((panel, i) => {
            const good = panel.tone === "good";
            return (
              <FadeIn key={panel.key} delay={i * 100} className="flex h-full flex-col">
                <div
                  className={
                    "flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-xs " +
                    (good ? "border-primary/40" : "border-border")
                  }
                >
                  {/* 패널 헤더 */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={
                          "h-2 w-2 rounded-full " + (good ? "bg-emerald-500" : "bg-neutral-400")
                        }
                      />
                      <p className="text-sm font-bold text-foreground">
                        {panel.title}
                        <span className="ml-2 text-xs font-medium text-muted-foreground">
                          {panel.sub}
                        </span>
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold text-foreground/70">
                      <MousePointer2 className="h-3 w-3" />
                      드래그해 보세요
                    </span>
                  </div>

                  {/* 예시 화면 */}
                  <div className="border-b border-border">
                    <SamplePage asImage={!good} />
                  </div>
                  <p className="border-b border-border bg-secondary/40 px-5 py-2 text-[11px] text-muted-foreground">
                    {panel.hint}
                  </p>

                  {/* 검색엔진이 읽는 내용 */}
                  <div className="mt-auto px-5 py-4">
                    <p className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                      <Search className="h-3.5 w-3.5" />
                      검색엔진이 읽어가는 내용
                    </p>
                    <div className="mt-2 flex items-start justify-between gap-3">
                      <p
                        className={
                          "min-w-0 truncate font-mono text-xs " +
                          (good ? "text-foreground/80" : "text-muted-foreground/70 line-through")
                        }
                      >
                        {panel.crawler}
                      </p>
                      <span
                        className={
                          "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold " +
                          (good ? "bg-emerald-500/10 text-emerald-600" : "bg-primary/10 text-primary")
                        }
                      >
                        {good ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        {panel.crawlerBadge}
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={150}>
          <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground break-keep">
            그래서 NOVERIQ는 모든 페이지를 <strong className="text-foreground">직접 코딩으로 제작</strong>
            합니다. 글자 하나하나가 코드로 존재해야 네이버 · 구글 검색에 내용이 잡히고, 문구 수정도
            이미지 재제작 없이 바로 할 수 있습니다.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
