import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { usePageTitle } from "@/hooks/usePageTitle";

const SERVICES = [
  { name: "베이직 케어", time: "60분", desc: "처음 방문하시는 분을 위한 기본 관리 코스입니다." },
  { name: "딥 케어", time: "90분", desc: "상태에 따라 단계를 조절하는 집중 관리 코스입니다." },
  { name: "리커버리 케어", time: "75분", desc: "관리 이후 회복과 진정에 초점을 둔 코스입니다." },
  { name: "정기 관리", time: "월 4회", desc: "일정한 주기로 상태를 유지하는 프로그램입니다." },
];

export default function Services() {
  usePageTitle(
    "서비스 안내 — MINTCL STUDIO",
    "기본 관리부터 집중 관리까지, MINTCL STUDIO의 서비스 구성을 안내합니다.",
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-3xl font-semibold">서비스 안내</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        모든 코스는 사전 상담 후 진행되며, 상태에 따라 구성이 조정될 수 있습니다.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {SERVICES.map((service) => (
          <article key={service.name} className="overflow-hidden rounded-lg border border-border bg-card">
            <ImagePlaceholder ratio="video" label={`${service.name} 이미지`} className="rounded-none border-0" />
            <div className="p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-lg font-semibold">{service.name}</h2>
                <span className="text-xs text-muted-foreground">{service.time}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.desc}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-lg border border-border bg-secondary/40 p-8 text-center">
        <p className="text-sm text-muted-foreground">어떤 코스가 맞을지 고민되신다면 먼저 문의해 주세요.</p>
        <Button asChild className="mt-4">
          <Link to="/reserve">예약 문의하기</Link>
        </Button>
      </div>
    </div>
  );
}
