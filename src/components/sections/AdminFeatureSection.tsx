import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { FileText, Inbox, Eye, Lock, ShieldCheck } from "lucide-react";

const ADMIN_FEATURES = [
  {
    icon: FileText,
    title: "공지사항 등록",
    desc: "새 소식이나 공지글을 직접 작성하고 바로 게시합니다.",
  },
  {
    icon: Inbox,
    title: "문의내역 확인",
    desc: "고객이 남긴 상담/예약 문의를 한눈에 모아 확인합니다.",
  },
  {
    icon: Eye,
    title: "노출 / 비노출 관리",
    desc: "필요에 따라 게시글의 공개 여부를 클릭 한 번으로 변경합니다.",
  },
  {
    icon: Lock,
    title: "관리자 로그인",
    desc: "안전한 비밀번호 인증 기반의 전용 대시보드를 제공합니다.",
  },
];

export function AdminFeatureSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        {/* Left Info Column */}
        <div className="lg:col-span-6 space-y-6">
          <SectionHeader
            label="ADMIN CONTROL"
            title={
              <>
                공지사항과 문의내역도
                <br />
                직접 관리할 수 있습니다.
              </>
            }
            description={
              <>
                필요한 경우 관리자 페이지를 통해 공지사항을 등록하거나 문의내역을 확인할 수
                <br />
                있는 구조로 확장할 수 있습니다. 기본 홈페이지 제작 외 추가 기능은 상담 후
                <br />
                맞춤 범위를 결정합니다.
              </>
            }
          />

          <div className="grid gap-4 sm:grid-cols-2 pt-2">
            {ADMIN_FEATURES.map((item, i) => {
              const IconComp = item.icon;
              return (
                <FadeIn key={item.title} delay={i * 60}>
                  <div className="group rounded-xl border border-border bg-card/60 p-5 transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <IconComp className="h-4 w-4" />
                      </div>
                      <h4 className="text-sm font-semibold text-foreground break-keep">
                        {item.title}
                      </h4>
                    </div>
                    <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground break-keep">
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <p className="text-xs text-muted-foreground/80 break-keep pt-1">
            ※ 모든 홈페이지에 기본 포함되는 기능은 아니며, 운영 형태에 따라 맞춤 옵션으로 추가 제공됩니다.
          </p>
        </div>

        {/* Right Dashboard Mockup Column */}
        <div className="lg:col-span-6">
          <FadeIn delay={120}>
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              {/* Browser Window Header */}
              <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <span className="h-3 w-3 rounded-full bg-green-400/80" />
                </div>
                <div className="flex items-center gap-1.5 rounded-md bg-background px-3 py-1 text-[11px] font-mono text-muted-foreground border border-border/60">
                  <ShieldCheck className="h-3 w-3 text-primary" />
                  관리자 모드
                </div>
              </div>

              {/* Mock Dashboard Body */}
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

                {/* Mock Notices Row */}
                <div className="rounded-lg border border-border bg-card p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-primary" /> 공지사항 관리
                    </span>
                    <span className="text-xs text-primary font-medium cursor-pointer">+ 글쓰기</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between rounded bg-secondary/40 p-2.5">
                      <span className="truncate font-medium text-foreground max-w-[200px] sm:max-w-[280px]">
                        [공지] MINTCL 홈페이지 서비스 개선 안내
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

                {/* Mock Inquiry Row */}
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

