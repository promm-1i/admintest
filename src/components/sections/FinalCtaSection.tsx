import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { KAKAO_CHANNEL_URL } from "@/lib/contact";

export function FinalCtaSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 text-center">
      <FadeIn>
        <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          홈페이지가 필요한 상황이라면,
          <br />
          먼저 구성부터 정리해드립니다.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          어떤 페이지가 필요한지, 어떤 기능이 필요한지, 예산 안에서 가능한 범위를 먼저 안내드립니다.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/contact">제작 상담하기</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={KAKAO_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
              카카오톡 문의
            </a>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link to="/samples">샘플 다시 보기</Link>
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
