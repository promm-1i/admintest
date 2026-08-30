import { Phone, MapPin, ArrowRight, Star } from "lucide-react";
import { Reveal, RevealScale } from "@/pages/services/previewKit";
import { FadeIn } from "@/components/ui/FadeIn";

const LISTINGS = [
  { type: "매매", title: "역삼동 32평 아파트", price: "9억 5,000", desc: "역삼역 도보 5분 · 남향 · 25층" },
  { type: "전세", title: "삼성동 신축 오피스텔", price: "3억 8,000", desc: "삼성역 도보 3분 · 풀옵션" },
  { type: "월세", title: "논현동 1층 상가", price: "보증금 5,000 / 월 250", desc: "논현역 인근 · 15평" },
];

const STATS = [
  { value: "20년", label: "지역 중개 경력" },
  { value: "1,200+", label: "누적 거래 성사" },
  { value: "4.9", label: "고객 평균 만족도" },
];

/** 부동산 중개업소 홈페이지 — 랜딩형 템플릿: 스크롤 reveal과 스케일 연출이 들어간 프리미엄 구성. */
export function RealEstateLandingPreview() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-neutral-900 bg-neutral-950 font-sans text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-neutral-950/80 px-6 py-4 backdrop-blur">
        <span className="text-lg font-bold tracking-tight">
          마루<span className="text-amber-400">부동산</span>
        </span>
        <a href="#contact" className="rounded-full bg-amber-400 px-4 py-2 text-sm font-bold text-neutral-950">
          매물 상담 신청
        </a>
      </header>

      {/* Hero */}
      <Reveal className="relative px-6 py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">GANGNAM REAL ESTATE</p>
        <h1 className="mx-auto mt-4 max-w-md text-3xl font-bold leading-tight sm:text-4xl">
          당신의 다음 공간을
          <br />
          가장 정확하게 찾아드립니다
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-sm text-white/60">
          20년 경력 공인중개사가 매매·전세·월세부터 상가 투자까지 데이터로 검증한 매물만 안내합니다.
        </p>
        <a
          href="#contact"
          className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-neutral-950"
        >
          지금 매물 상담받기 <ArrowRight className="h-4 w-4" />
        </a>

        <div className="mx-auto mt-14 grid max-w-lg grid-cols-3 gap-4">
          {STATS.map((s, i) => (
            <FadeIn key={s.label} direction="up" delay={i * 100}>
              <p className="text-2xl font-extrabold text-amber-400 sm:text-3xl">{s.value}</p>
              <p className="mt-1 text-[11px] text-white/50">{s.label}</p>
            </FadeIn>
          ))}
        </div>
      </Reveal>

      {/* 매물 리스트 */}
      <div className="border-t border-white/10 px-6 py-16">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">CURATED LISTINGS</p>
          <h2 className="mt-2 text-2xl font-bold">지금 확인 가능한 매물</h2>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {LISTINGS.map((item, i) => (
            <RevealScale key={item.title} delay={i * 100}>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-amber-400/40">
                <span className="rounded-full bg-amber-400/15 px-2.5 py-1 text-[11px] font-bold text-amber-400">
                  {item.type}
                </span>
                <p className="mt-3 text-sm font-bold">{item.title}</p>
                <p className="mt-1.5 text-lg font-extrabold text-white">{item.price}</p>
                <p className="mt-1 text-xs text-white/50">{item.desc}</p>
              </div>
            </RevealScale>
          ))}
        </div>
      </div>

      {/* 고객 후기 */}
      <Reveal className="border-t border-white/10 px-6 py-16 text-center">
        <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="flex gap-0.5 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400" />
            ))}
          </div>
          <p className="text-sm leading-relaxed text-white/70">
            "처음 매매하는 거라 걱정이 많았는데, 서류부터 시세 분석까지 꼼꼼하게 챙겨주셔서 안심하고 계약할 수
            있었습니다."
          </p>
          <p className="text-xs text-white/40">— 역삼동 아파트 매수 고객</p>
        </div>
      </Reveal>

      {/* Footer / CTA */}
      <footer id="contact" className="border-t border-white/10 bg-neutral-900 px-6 py-10 text-center">
        <h3 className="text-lg font-bold">부담 없이 먼저 상담해 보세요</h3>
        <div className="mt-5 flex flex-wrap justify-center gap-4 text-xs text-white/50">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> 서울시 강남구 역삼로 123 마루빌딩 1층
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" /> 02-1234-5678
          </span>
        </div>
        <a
          href="#contact"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-neutral-950"
        >
          매물 상담 신청하기 <ArrowRight className="h-4 w-4" />
        </a>
      </footer>
    </div>
  );
}
