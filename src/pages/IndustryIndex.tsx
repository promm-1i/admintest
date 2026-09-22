import { Link } from "react-router-dom";
import { FadeIn } from "@/components/ui/FadeIn";
import { Reveal } from "@/pages/services/previewKit";
import { usePageTitle } from "@/hooks/usePageTitle";
import { SAMPLES } from "@/lib/samples";
import { INDUSTRY_LANDING } from "@/lib/industryLanding";

/** 업종별 홈페이지 제작 인덱스 — /homepage */
export default function IndustryIndex() {
  usePageTitle(
    "업종별 홈페이지 제작 — 23개 업종, 실제 화면으로 확인 | NOVERIQ",
    "부동산 · 미용실 · 음식점 · 치과 등 23개 업종별 홈페이지 제작. 실제 배포된 화면을 보고 64만원부터, 영업일 7일이면 시작합니다.",
  );

  const items = Object.entries(INDUSTRY_LANDING)
    .map(([key, copy]) => {
      const s = SAMPLES.find(
        (x) => x.industryKey === key && x.type.includes("landing-template") && !x.designCode,
      );
      return s ? { key, copy, sample: s, label: s.industry.replace(" 홈페이지", "") } : null;
    })
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .sort((a, b) => a.label.localeCompare(b.label, "ko"));

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <Reveal>
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
          HOMEPAGE BY INDUSTRY
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">업종별 홈페이지 제작</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep sm:text-base">
          업종마다 손님이 궁금해하는 것이 다릅니다. 23개 업종 각각에 맞게 설계된 실제 화면을 보고
          시작하세요 — 기본형 64만원부터, 영업일 7일이면 오픈합니다.
        </p>
      </Reveal>

      {/* everybot 상세쪽 수상내역 격자 실측(2026-09-22):
          ul 폭 1400 · gap 40px 20px · 칸 264x330
          .img_box 264x264 라운드 10 테두리 1px #e4e4e4 · img 262x262 cover
          캡션 padding-top 15 · 가운데 · 18px/400 #5d5d5d */}
      <ul className="re-tilegrid">
        {items.map((it, i) => (
          <li className="re-tile" key={it.key}>
            <FadeIn direction="up" delay={(i % 5) * 60}>
              <Link to={`/homepage/${it.key}`} className="re-tile__link">
                <span className="re-tile__box">
                  <img src={it.sample.image} alt={`${it.label} 홈페이지`} loading="lazy" />
                </span>
                <span className="re-tile__name">{it.label}</span>
              </Link>
            </FadeIn>
          </li>
        ))}
      </ul>
    </div>
  );
}
