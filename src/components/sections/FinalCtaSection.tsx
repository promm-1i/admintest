import { Link } from "react-router-dom";
import { Send, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { KAKAO_CHANNEL_URL, PHONE_TEL_HREF } from "@/lib/contact";

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 px-4 py-24 text-center text-white">
      {/* Ambient glow — 정지 화면에 은은한 숨결 */}
      <div aria-hidden className="idle-glow pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-primary/15 blur-[110px]" />
      <div aria-hidden className="idle-float-slower pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
      <FadeIn className="mx-auto max-w-7xl">
        <h2 className="text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          홈페이지가 필요한 상황이라면,
          <br />
          먼저 구성부터 정리해드립니다.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-neutral-400">
          어떤 페이지가 필요한지, 어떤 기능이 필요한지, 예산 안에서 가능한 범위를
          <br />
          먼저 안내드립니다.
        </p>
        <div className="mt-9 flex flex-col items-center gap-3">
          {/* Top row: 제작상담 & 카카오톡 */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="font-bold gap-2 shadow-md">
              <Link to="/contact">
                <Send className="h-4 w-4" />
                제작 상담하기
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-[#FEE500] text-[#191919] hover:bg-[#FADA00] font-bold border-none shadow-sm gap-2"
            >
              <a href={KAKAO_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 fill-[#191919]" />
                카카오톡 문의
              </a>
            </Button>
            <Button asChild size="lg" className="bg-white text-neutral-900 hover:bg-white/90 font-bold gap-2 shadow-sm">
              <a href={PHONE_TEL_HREF}>
                <Phone className="h-4 w-4" />
                전화 문의
              </a>
            </Button>
          </div>
          {/* Bottom row: 포트폴리오 다시보기 centered */}
          <div className="mt-1 flex justify-center">
            <Link
              to="/samples"
              className="text-sm font-medium text-neutral-400 underline underline-offset-4 decoration-neutral-700 transition-colors hover:text-white hover:decoration-white"
            >
              포트폴리오 다시 보기
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

