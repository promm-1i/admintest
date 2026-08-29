import { Check, ShieldCheck, FileText, Inbox } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";

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
    <section className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:items-center">
        {/* Left Info Column */}
        <div className="lg:col-span-6 space-y-6">
          <SectionHeader
            label="ADMIN SYSTEM"
            title="홈페이지 제작에서 끝나지 않습니다."
            description="공지사항, 문의, 고객, 상품, 일정, 예약, 매물, 계약 등 실제 운영 업무를 관리할 수 있는 관리자 시스템까지 함께 구축합니다."
          />

          <ul className="grid gap-x-6 gap-y-2.5 pt-2 sm:grid-cols-2">
            {ADMIN_CAPABILITIES.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-foreground break-keep">
                <Check className="h-4 w-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>

          <p className="text-xs text-muted-foreground/80 break-keep pt-1">
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
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-3">
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  Admin Dashboard
                </span>
                <div className="flex items-center gap-1.5 rounded-md bg-background px-3 py-1 text-[11px] font-mono text-muted-foreground border border-border/60">
                  <ShieldCheck className="h-3 w-3 text-primary" />
                  관리자 모드
                </div>
              </div>

              <div className="p-6 space-y-5 bg-background/50">
                <div className="flex items-center justify-between pb-3 border-b border-border/60">
                  <div>
                    <span className="text-xs font-mono text-primary font-medium">MANAGEMENT</span>
                    <h3 className="text-base font-semibold text-foreground">관리자 대시보드 Preview</h3>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    온라인
                  </span>
                </div>

                <div className="rounded-lg border border-border bg-card p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-primary" /> 공지사항 관리
                    </span>
                    <span className="text-xs text-primary font-medium">+ 글쓰기</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between rounded bg-secondary/40 p-2.5">
                      <span className="truncate font-medium text-foreground max-w-[200px] sm:max-w-[280px]">
                        [공지] MintCL 홈페이지 서비스 개선 안내
                      </span>
                      <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-600 font-medium">
                        게시중
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-secondary/20 p-2.5 text-muted-foreground">
                      <span className="truncate max-w-[200px] sm:max-w-[280px]">
                        [안내] 제작 진행 절차 및 FAQ 안내
                      </span>
                      <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-600 font-medium">
                        게시중
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-card p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <Inbox className="h-3.5 w-3.5 text-primary" /> 상담 문의내역
                    </span>
                    <span className="text-xs text-muted-foreground">신규 2건</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between rounded bg-secondary/40 p-2.5">
                      <div>
                        <p className="font-medium text-foreground">홍길동 (소상공인 홈페이지 문의)</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">010-1234-5678</p>
                      </div>
                      <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-600 font-medium">
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
