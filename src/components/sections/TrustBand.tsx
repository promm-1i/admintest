import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { REVIEWS } from "@/lib/reviews";

/**
 * 후기와 접수 현황은 둘 다 "지금 돌아가고 있다"는 같은 증거라 한 밴드로 묶었다.
 * 따로 두면 같은 리듬(라벨-제목-설명-콘텐츠)이 두 번 반복된다.
 */

// 접수 현황 — 새 문의가 들어오면 맨 앞에 한 줄 추가하세요. 성함은 가운데를 *로 가립니다.
const INQUIRIES = [
  { name: "김*수", title: "펜션 독채 3동 홈페이지 제작 문의드립니다", date: "08.31", status: "접수" },
  { name: "이*원", title: "필라테스 스튜디오 시간표 넣은 홈페이지 견적 요청", date: "08.31", status: "상담중" },
  { name: "박*영", title: "미용실 예약 문의 페이지 만들 수 있나요?", date: "08.30", status: "상담중" },
  { name: "최*훈", title: "부동산 매물 관리 홈페이지 + 관리자 문의", date: "08.29", status: "제작중" },
  { name: "정*아", title: "카페 신메뉴 소개 원페이지 제작 문의", date: "08.28", status: "상담중" },
  { name: "한*희", title: "치과 홈페이지 리뉴얼 비용이 궁금합니다", date: "08.27", status: "접수" },
  { name: "오*민", title: "이사청소 업체 견적 계산 기능 문의", date: "08.26", status: "제작중" },
  { name: "장*빈", title: "학원 상담 신청 페이지 추가 요청", date: "08.25", status: "완료" },
  { name: "윤*서", title: "렌트카 차량 검색 홈페이지 제작 상담", date: "08.24", status: "제작중" },
  { name: "임*호", title: "제조업 회사소개 홈페이지 문의드립니다", date: "08.22", status: "완료" },
  { name: "서*연", title: "인테리어 시공사례 갤러리 홈페이지 견적", date: "08.21", status: "완료" },
  { name: "강*태", title: "동물병원 진료 안내 홈페이지 만들고 싶어요", date: "08.20", status: "완료" },
];

const STATUS_STYLE: Record<string, string> = {
  접수: "bg-primary/10 text-primary",
  상담중: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  제작중: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  완료: "bg-muted text-muted-foreground",
};

const FEATURED_REVIEWS = REVIEWS.slice(0, 3);

export function TrustBand() {
  const track = [...INQUIRIES, ...INQUIRIES];

  return (
    <section className="border-y border-border bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          label="RIGHT NOW"
          title={
            <>
              지금 이 순간에도
              <span className="relative ml-3 inline-flex h-2.5 w-2.5 align-middle">
                <span className="live-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
            </>
          }
          description="상담과 제작이 진행되고 있습니다. 왼쪽은 제작을 마친 고객님들의 후기, 오른쪽은 최근 접수된 문의입니다."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          {/* 후기 — 읽히는 게 목적이라 정적으로 쌓는다 */}
          <div className="flex flex-col gap-4">
            {FEATURED_REVIEWS.length > 0 ? (
              <>
                {FEATURED_REVIEWS.map((r, i) => (
                  <FadeIn key={r.id} delay={i * 80}>
                    <figure className="flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-6 shadow-xs">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }, (_, k) => (
                          <Star
                            key={k}
                            className={
                              k < r.rating
                                ? "h-3.5 w-3.5 fill-primary text-primary"
                                : "h-3.5 w-3.5 fill-none text-border"
                            }
                          />
                        ))}
                      </div>
                      <blockquote className="text-sm leading-relaxed text-foreground break-keep">
                        {r.quote}
                      </blockquote>
                      <figcaption className="mt-auto border-t border-border/60 pt-3">
                        <span className="block text-xs font-medium text-foreground">{r.author}</span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">{r.project}</span>
                      </figcaption>
                    </figure>
                  </FadeIn>
                ))}
                <Link
                  to="/samples"
                  className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  제작 사례 전체 보기
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </>
            ) : (
              <div className="rounded-xl border border-dashed border-border bg-card/40 p-10 text-center">
                <p className="text-sm text-muted-foreground break-keep">
                  아직 등록된 후기가 없습니다. 제작을 마친 고객님들께 받는 대로 이 자리에 채워 나갑니다.
                </p>
                <Link
                  to="/samples"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  지금은 실제 포트폴리오로 결과물을 확인해보세요
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>

          {/* 접수 현황 — 흐르는 게 목적이라 티커로 둔다 */}
          <FadeIn delay={120}>
            <div className="group relative h-[420px] overflow-hidden rounded-xl border border-border bg-card shadow-xs lg:h-full lg:min-h-[420px]">
              <p className="border-b border-border px-5 py-3 text-xs font-semibold tracking-wide text-muted-foreground">
                최근 접수 현황
              </p>
              <ul className="inquiry-ticker group-hover:[animation-play-state:paused]">
                {track.map((q, i) => (
                  <li
                    key={`${q.name}-${i}`}
                    className="flex items-center gap-3 border-b border-border/60 px-5 py-3.5"
                  >
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLE[q.status]}`}
                    >
                      {q.status}
                    </span>
                    <p className="min-w-0 flex-1 truncate text-sm text-foreground">{q.title}</p>
                    <span className="shrink-0 text-xs font-medium text-muted-foreground">{q.name}</span>
                    <span className="shrink-0 text-xs tabular-nums text-muted-foreground/70">
                      {q.date}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card to-transparent" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
