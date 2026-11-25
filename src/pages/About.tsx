import { Link } from "react-router-dom";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Send } from "lucide-react";
import { Reveal } from "@/pages/services/previewKit";
import { FadeIn } from "@/components/ui/FadeIn";

// 11-25 앱 먼저: 하는 일 셋 = PC · 태블릿 앱 / 폰 앱 / 홈페이지 제작. 앱 문장은 /apps(RenewalEditorial APPS) 사실 그대로.
const CORE_VALUES = [
  {
    num: "01",
    title: "PC와 태블릿 앱",
    desc: "안드로이드 태블릿을 윈도우 PC의 두 번째 모니터, 마우스로 넘나드는 옆 화면, 단축키 버튼판, 펜 태블릿으로 씁니다. 태블릿 앱과 윈도우 PC 프로그램이 한 벌입니다.",
    points: ["바이스크린", "바이크로스", "바이패드", "바이펜"],
  },
  {
    num: "02",
    title: "폰 앱",
    desc: "폰 사진과 동영상을 집 PC로 백업하고, 부모님 폰 화면을 내 폰에서 보며 도와 드리고, 남는 폰이나 태블릿을 카메라 모니터로 씁니다.",
    points: ["바이포토", "바이케어", "바이뷰"],
  },
  {
    num: "03",
    title: "홈페이지 제작",
    desc: "소상공인 · 기업 홈페이지를 만듭니다. 업종에 필요한 메뉴와 기능을 골라 전화 · 카카오톡 · 문의 폼으로 연락이 오게 합니다.",
    points: ["제작 담당자와 직접 소통", "PC · 모바일 화면", "오픈 후 1개월 무상 수정"],
  },
];

const STAT_ITEMS = [
  { value: "7", label: "출시한 앱" },
  { value: "안드로이드", label: "폰 · 태블릿 앱" },
  { value: "윈도우", label: "PC 프로그램" },
];

export default function About() {
  usePageTitle(
    "노베릭 소개 — NOVERIQ",
    "윈도우 PC와 안드로이드 폰 · 태블릿에서 쓰는 앱, 소상공인 · 기업 홈페이지를 만드는 노베릭입니다.",
  );

  return (
    <div>
      <Reveal className="mx-auto max-w-7xl px-4 pb-12 pt-16 sm:pt-24">
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">ABOUT NOVERIQ</p>
        <h1 className="mt-5 text-4xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-5xl break-keep">
          앱과 홈페이지를
          <br />
          만듭니다
        </h1>
        <div className="mt-6 h-1 w-14 bg-primary" aria-hidden />
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground break-keep sm:text-lg">
          NOVERIQ은 윈도우 PC와 안드로이드 폰 · 태블릿에서 쓰는 앱을 만듭니다. 소상공인 · 기업
          홈페이지도 만듭니다.
        </p>
      </Reveal>

      <div className="border-y border-border bg-secondary/20 py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-4 lg:grid-cols-3">
          {STAT_ITEMS.map((stat, i) => (
            <FadeIn key={stat.label} direction="up" delay={i * 90}>
              <p className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">{stat.value}</p>
              <p className="mt-1.5 text-sm font-medium text-muted-foreground break-keep">{stat.label}</p>
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
        <Reveal>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">하는 일</h2>
        </Reveal>
        <div className="mt-8 divide-y divide-border border-t border-border">
          {CORE_VALUES.map((item, i) => (
            <FadeIn key={item.num} direction="left" delay={i * 150} className="py-9">
              <div className="grid gap-4 sm:grid-cols-12 sm:gap-8">
                <div className="sm:col-span-4">
                  <span aria-hidden="true" className="font-mono text-4xl font-bold text-primary/80">{item.num}</span>
                  <h3 className="mt-1.5 text-xl font-bold text-foreground break-keep">{item.title}</h3>
                </div>
                <div className="sm:col-span-8">
                  <p className="text-base leading-relaxed text-muted-foreground break-keep">{item.desc}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.points.map((pt) => (
                      <li
                        key={pt}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs font-medium text-foreground/80 break-keep"
                      >
                        <Check className="h-3 w-3 text-primary" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <Reveal className="border-t border-border bg-secondary/30 py-16 text-center sm:py-20">
        <div className="mx-auto max-w-lg px-4">
          <h2 className="text-2xl font-bold text-foreground break-keep sm:text-3xl">
            출시한 앱과 홈페이지 제작
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground break-keep">
            홈페이지는 업종과 필요한 기능을 남겨 주시면 구성과 금액을 정리해 드립니다.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="gap-2 font-bold">
              <Link to="/apps">
                출시한 앱
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link to="/contact">
                <Send className="h-4 w-4" />
                홈페이지 제작 상담
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
