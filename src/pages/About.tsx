import { Link } from "react-router-dom";
import { usePageTitle } from "@/hooks/usePageTitle";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/button";
import { MessageSquare, Target, ShieldCheck, CheckCircle2, ArrowRight, PhoneCall, Sparkles } from "lucide-react";

const CORE_VALUES = [
  {
    num: "01",
    title: "담당자와 직접 소통",
    icon: MessageSquare,
    badge: "1:1 다이렉트 소통",
    desc: "복잡한 기획 대행사나 단계를 거치지 않고, 제작 담당자와 1:1로 직접 피드백을 주고받으며 원하는 방향을 신속하게 반영합니다.",
    points: ["불필요한 커뮤니케이션 비용 제거", "요구사항 실시간 피드백 반영", "친절하고 쉬운 용어로 진행 안내"],
  },
  {
    num: "02",
    title: "실체 있는 문의 중심 구조",
    icon: Target,
    badge: "전환율 중심 설계",
    desc: "화려하기만 하고 복잡한 디자인 대신, 방문객이 대표 서비스와 매장 위치, 가격을 한눈에 파악하고 즉시 전화·카톡 문의로 이어지도록 동선을 설계합니다.",
    points: ["주요 서비스 및 메뉴 직관적 정리", "전화/지도/카톡 문의 버튼 상시 노출", "모바일 화면에 최적화된 UX"],
  },
  {
    num: "03",
    title: "제작 후 든든한 사후 관리",
    icon: ShieldCheck,
    badge: "안심 유지보수 지원",
    desc: "홈페이지 배포 후 나몰라라 하지 않습니다. 간단한 문구 수정, 이미지 교체, 공지사항 등록 등 제작 이후 운영 중에도 지속적인 수정을 도와드립니다.",
    points: ["안정적인 Cloud/Netlify 배포", "운영 중 문구 및 사진 수정 지원", "관리자 대시보드 확장 옵션 제공"],
  },
];

const STAT_ITEMS = [
  { value: "30만원대~", label: "부담 없는 합리적 시작가" },
  { value: "1:1 Direct", label: "담당자 직통 피드백" },
  { value: "100% Mobile", label: "완벽한 반응형 디바이스 대응" },
];

export default function About() {
  usePageTitle(
    "민트클 소개 — MintCL",
    "소상공인과 기업을 위한 민트클의 홈페이지 제작 철학과 신뢰 가치를 소개합니다."
  );

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20 space-y-20">
      {/* Editorial Hero Header */}
      <div className="max-w-3xl space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" /> MintCL PHILOSOPHY
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground break-keep leading-tight">
          소상공인과 기업의 <br className="hidden sm:inline" />
          가장 확실한 첫인상을 만듭니다
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground break-keep">
          민트클(MintCL)은 블로그나 SNS만으로는 부족했던 비즈니스의 신뢰감을 채워주는 맞춤형 홈페이지 제작 스튜디오입니다. 복잡한 거품을 빼고, 실제 고객 문의로 이어지는 실용적인 사이트를 함께 만듭니다.
        </p>
      </div>

      {/* Stat Metric Grid */}
      <div className="grid gap-6 sm:grid-cols-3 border-y border-border/80 py-8">
        {STAT_ITEMS.map((stat) => (
          <div key={stat.label} className="space-y-1">
            <p className="text-2xl sm:text-3xl font-semibold text-primary font-mono">{stat.value}</p>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Core Values Feature Grid */}
      <div className="space-y-10">
        <div className="space-y-2">
          <span className="text-xs font-mono text-primary font-medium">WHY CHOOSE US</span>
          <h2 className="text-2xl font-semibold text-foreground break-keep">
            민트클이 약속하는 3가지 핵심 가치
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {CORE_VALUES.map((item, index) => {
            const IconComp = item.icon;
            return (
              <FadeIn key={item.num} delay={index * 80}>
                <div className="flex flex-col h-full rounded-xl border border-border bg-card p-6 sm:p-8 shadow-xs transition-all duration-300 hover:border-primary/50">
                  <div className="flex items-center justify-between pb-4 border-b border-border/60">
                    <span className="font-mono text-sm font-semibold text-primary">{item.num}</span>
                    <span className="rounded bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground">
                      {item.badge}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground break-keep">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground break-keep flex-1">
                    {item.desc}
                  </p>

                  <ul className="mt-6 space-y-2 pt-4 border-t border-border/60 text-xs text-muted-foreground">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="break-keep">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {/* Simple CTA Panel */}
      <div className="rounded-xl border border-border bg-card p-8 sm:p-12 text-center space-y-5">
        <h3 className="text-2xl font-semibold text-foreground break-keep">
          어떤 홈페이지가 필요한지 고민되시나요?
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground max-w-lg mx-auto break-keep">
          업종과 갖고 계신 생각만 간단히 들려주세요. 부담 없는 맞춤 구성안과 견적을 친절히 정리해 드립니다.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="px-8 font-medium">
            <Link to="/contact" className="gap-2">
              <PhoneCall className="h-4 w-4" /> 무료 제작 상담하기
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8 font-medium">
            <Link to="/samples" className="gap-2">
              포트폴리오 확인하기 <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

