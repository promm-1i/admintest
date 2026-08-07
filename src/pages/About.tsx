import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function About() {
  usePageTitle(
    "스튜디오 소개 — MINTCL STUDIO",
    "MINTCL STUDIO의 운영 철학과 공간, 이용 안내를 소개합니다.",
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-3xl font-semibold">스튜디오 소개</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        MINTCL STUDIO는 예약제로 운영되는 프라이빗 케어 스튜디오입니다. 충분한 상담 시간을 확보하고,
        방문하시는 분의 상태에 맞춘 관리를 제안합니다.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <ImagePlaceholder ratio="video" label="내부 공간 이미지" />
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            공간은 최소한의 요소로 구성되어 있습니다. 불필요한 자극 없이 편안하게 머무를 수 있도록
            조명과 동선을 정리했습니다.
          </p>
          <p>모든 기구와 소모품은 회차마다 위생 관리 후 사용합니다.</p>
        </div>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {[
          { k: "운영 시간", v: "평일 10:00 – 20:00 / 토 10:00 – 17:00" },
          { k: "예약 방식", v: "온라인 예약 문의 후 확정 연락" },
          { k: "휴무", v: "일요일 및 공휴일" },
        ].map((item) => (
          <div key={item.k} className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm font-medium">{item.k}</p>
            <p className="mt-2 text-sm text-muted-foreground">{item.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
