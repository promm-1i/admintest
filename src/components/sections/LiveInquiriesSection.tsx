import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";

// 접수 현황 데이터 — 새 문의가 들어오면 맨 앞에 한 줄 추가하세요.
// name은 가운데 글자를 *로 가린 형태로 적습니다.
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
  상담중: "bg-amber-500/10 text-amber-600",
  제작중: "bg-blue-500/10 text-blue-600",
  완료: "bg-muted text-muted-foreground",
};

function InquiryRow({ q }: { q: (typeof INQUIRIES)[number] }) {
  return (
    <li className="flex items-center gap-3 border-b border-border/60 px-5 py-3.5">
      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLE[q.status]}`}
      >
        {q.status}
      </span>
      <p className="min-w-0 flex-1 truncate text-sm text-foreground">{q.title}</p>
      <span className="shrink-0 text-xs font-medium text-muted-foreground">{q.name}</span>
      <span className="shrink-0 text-xs tabular-nums text-muted-foreground/70">{q.date}</span>
    </li>
  );
}

/**
 * 실시간 접수 현황 — 최근 문의가 아래에서 위로 흐르는 세로 티커.
 * 마우스를 올리면 멈추고, prefers-reduced-motion 사용자에게는 정적 목록으로 보입니다.
 */
export function LiveInquiriesSection() {
  const track = [...INQUIRIES, ...INQUIRIES];
  return (
    <section className="bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4">
        <FadeIn>
          <SectionHeader
            label="LIVE"
            title={
              <>
                실시간 접수 현황
                <span className="relative ml-3 inline-flex h-2.5 w-2.5 align-middle">
                  <span className="live-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
              </>
            }
            description="지금 이 순간에도 상담과 제작이 진행되고 있습니다. 개인정보 보호를 위해 성함은 일부만 표시합니다."
          />
        </FadeIn>
        <FadeIn delay={100}>
          <div className="group relative mt-10 h-[300px] overflow-hidden rounded-xl border border-border bg-card shadow-xs">
            <ul className="inquiry-ticker group-hover:[animation-play-state:paused]">
              {track.map((q, i) => (
                <InquiryRow key={`${q.name}-${i}`} q={q} />
              ))}
            </ul>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-card to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-card to-transparent" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
