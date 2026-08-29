import { Link } from "react-router-dom";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Button } from "@/components/ui/button";
import { ArrowRight, Send } from "lucide-react";

const CORE_VALUES = [
  {
    num: "01",
    title: "담당자와 직접 소통",
    desc: "복잡한 기획 대행사나 단계를 거치지 않고, 제작 담당자와 1:1로 직접 피드백을 주고받으며 원하는 방향을 신속하게 반영합니다.",
    points: ["불필요한 커뮤니케이션 비용 제거", "요구사항 실시간 피드백 반영", "친절하고 쉬운 용어로 진행 안내"],
  },
  {
    num: "02",
    title: "실제 문의로 이어지는 구조",
    desc: "화려하기만 하고 복잡한 디자인 대신, 방문객이 대표 서비스와 매장 위치, 가격을 한눈에 파악하고 즉시 전화·카톡 문의로 이어지도록 동선을 설계합니다.",
    points: ["주요 서비스 및 메뉴 직관적 정리", "전화 / 지도 / 카톡 문의 버튼 상시 노출", "모바일 화면에 최적화된 UX"],
  },
  {
    num: "03",
    title: "제작 후 든든한 사후 관리",
    desc: "홈페이지 배포 후 나 몰라라 하지 않습니다. 간단한 문구 수정, 이미지 교체, 공지사항 등록 등 제작 이후 운영 중에도 지속적인 수정을 도와드립니다.",
    points: ["안정적인 배포 환경", "운영 중 문구 및 사진 수정 지원", "관리자 대시보드 확장 옵션 제공"],
  },
];

const STAT_ITEMS = [
  { value: "40만 원부터", label: "부담 없는 합리적 시작가" },
  { value: "1:1", label: "담당자 직통 피드백" },
  { value: "100%", label: "PC · 모바일 반응형 대응" },
];

export default function About() {
  usePageTitle(
    "민트클 소개 — MintCL",
    "소상공인과 기업을 위한 민트클의 홈페이지 제작 철학과 신뢰 가치를 소개합니다.",
  );

  return (
    <div>
      <div className="mx-auto max-w-3xl px-4 pb-10 pt-14 sm:pt-20">
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">MINTCL PHILOSOPHY</p>
        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl break-keep">
          소상공인과 기업의 가장 확실한 첫인상을 만듭니다.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground break-keep">
          MintCL은 블로그나 SNS만으로는 부족했던 비즈니스의 신뢰감을 채워주는 맞춤형 홈페이지 제작
          스튜디오입니다. 복잡한 거품을 빼고, 실제 고객 문의로 이어지는 실용적인 사이트를 함께
          만듭니다.
        </p>
      </div>

      <div className="border-y border-border py-10">
        <div className="mx-auto grid max-w-3xl gap-6 px-4 sm:grid-cols-3">
          {STAT_ITEMS.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
        <h2 className="text-2xl font-bold text-foreground">MintCL이 약속하는 3가지</h2>
        <div className="mt-8 divide-y divide-border border-t border-border">
          {CORE_VALUES.map((item) => (
            <div key={item.num} className="grid gap-3 py-8 sm:grid-cols-12 sm:gap-6">
              <div className="sm:col-span-4">
                <span className="font-mono text-3xl font-bold text-primary/25">{item.num}</span>
                <h3 className="mt-1 text-lg font-bold text-foreground break-keep">{item.title}</h3>
              </div>
              <div className="sm:col-span-8">
                <p className="text-sm leading-relaxed text-muted-foreground break-keep">{item.desc}</p>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5">
                  {item.points.map((pt) => (
                    <li key={pt} className="text-xs font-medium text-foreground/80 break-keep">
                      · {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border bg-secondary/30 py-16 text-center sm:py-20">
        <div className="mx-auto max-w-md px-4">
          <h2 className="text-2xl font-bold text-foreground break-keep">
            어떤 홈페이지가 필요한지 고민되시나요?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground break-keep">
            업종과 갖고 계신 생각만 간단히 들려주세요. 부담 없는 맞춤 구성안과 견적을 정리해
            드립니다.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="gap-2 font-bold">
              <Link to="/contact">
                <Send className="h-4 w-4" />
                무료 제작 상담하기
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link to="/samples">
                포트폴리오 확인하기
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
