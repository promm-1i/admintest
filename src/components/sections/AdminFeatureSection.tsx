import { Check, ShieldCheck, FileText, Inbox } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

const ADMIN_CAPABILITIES = [
  "콘텐츠 등록 / 수정",
  "문의 내역 관리",
  "공개 / 비공개 설정",
  "고객 관리",
  "예약 / 일정 관리",
  "직원 권한 관리",
  "운영 통계",
];

export function AdminFeatureSection() {
  return (
    <section className="bg-neutral-950 px-4 py-20 text-white sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
        {/* Left Info Column */}
        <div className="lg:col-span-6 space-y-6">
          <p className="text-sm font-bold tracking-widest text-primary uppercase">ADMIN SYSTEM</p>
          <h2 className="text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            홈페이지 제작에서
            <br />
            끝나지 않습니다.
          </h2>
          <p className="text-pretty text-sm leading-relaxed text-neutral-400 sm:text-base">
            공지사항, 문의, 고객, 상품, 일정, 예약, 매물, 계약 등 실제 운영 업무를 관리할 수 있는 관리자
            시스템까지 함께 구축합니다.
          </p>

          <ul className="grid gap-2.5 pt-2 sm:grid-cols-2">
            {ADMIN_CAPABILITIES.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 p-3 text-sm font-medium break-keep"
              >
                <Check className="h-4 w-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>

          <p className="text-xs text-neutral-500 break-keep pt-1">
            ※ 모든 홈페이지에 기본 포함되는 기능은 아니며, 업종과 운영 형태에 따라 맞춤 구성됩니다.
          </p>

          <a
            href="#industry-section"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            업종별 관리자 데모 보러 가기 ↓
          </a>
        </div>

        {/* Right Dashboard Mockup Column */}
        <div className="lg:col-span-6">
          <FadeIn delay={120}>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-3">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                  Admin Dashboard
                </span>
                <div className="flex items-center gap-1.5 rounded-md bg-white/5 px-3 py-1 text-[11px] font-mono text-neutral-400 border border-white/10">
                  <ShieldCheck className="h-3 w-3 text-primary" />
                  관리자 모드
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono text-primary font-medium">MANAGEMENT</span>
                    <h3 className="text-base font-semibold">관리자 대시보드 Preview</h3>
                  </div>
                  <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
                    온라인
                  </span>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-primary" /> 공지사항 관리
                    </span>
                    <span className="text-xs text-primary font-medium">+ 글쓰기</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between rounded bg-white/5 p-2.5">
                      <span className="truncate font-medium max-w-[200px] sm:max-w-[280px]">
                        [공지] NOVERIQ 홈페이지 서비스 개선 안내
                      </span>
                      <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-400 font-medium">
                        게시중
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-white/[0.03] p-2.5 text-neutral-400">
                      <span className="truncate max-w-[200px] sm:max-w-[280px]">
                        [안내] 제작 진행 절차 및 FAQ 안내
                      </span>
                      <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-400 font-medium">
                        게시중
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Inbox className="h-3.5 w-3.5 text-primary" /> 상담 문의내역
                    </span>
                    <span className="text-xs text-neutral-400">신규 2건</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between rounded bg-white/5 p-2.5">
                      <div>
                        <p className="font-medium">홍길동 (소상공인 홈페이지 문의)</p>
                        <p className="text-[11px] text-neutral-500 mt-0.5">010-1234-5678</p>
                      </div>
                      <span className="rounded bg-amber-500/15 px-2 py-0.5 text-[10px] text-amber-400 font-medium">
                        접수완료
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
