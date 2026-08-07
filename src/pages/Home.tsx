import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { listPublishedNotices } from "@/lib/api/notices";
import { usePageTitle } from "@/hooks/usePageTitle";

const HIGHLIGHTS = [
  { title: "1:1 맞춤 상담", desc: "방문 전 상담으로 필요한 관리만 제안해 드립니다." },
  { title: "프라이빗 공간", desc: "예약제로 운영되어 여유롭게 이용하실 수 있습니다." },
  { title: "꾸준한 사후 관리", desc: "관리 이후에도 상태를 확인하고 안내해 드립니다." },
];

export default function Home() {
  usePageTitle(
    "MINTCL STUDIO — 프라이빗 케어 스튜디오",
    "1:1 맞춤 상담과 정성스러운 관리로 편안한 시간을 제공하는 프라이빗 스튜디오입니다.",
  );

  const { data: notices } = useQuery({
    queryKey: ["notices", "published"],
    queryFn: listPublishedNotices,
  });

  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="text-sm tracking-widest text-primary">PRIVATE CARE STUDIO</p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            편안한 공간에서
            <br />
            나에게 맞는 관리를
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            충분한 상담과 여유로운 예약제 운영으로, 방문하시는 한 분 한 분께 집중합니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/reserve">예약 문의하기</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/services">서비스 보기</Link>
            </Button>
          </div>
        </div>
        <ImagePlaceholder ratio="portrait" label="메인 이미지" className="md:max-h-[520px]" />
      </section>

      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <div key={item.title} className="rounded-lg bg-card p-6 shadow-sm">
              <h2 className="text-base font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">스튜디오 둘러보기</h2>
          <Link to="/gallery" className="text-sm text-primary">
            더보기
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <ImagePlaceholder key={n} label={`스튜디오 이미지 ${n}`} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">공지사항</h2>
          <Link to="/notices" className="text-sm text-primary">
            전체보기
          </Link>
        </div>
        <ul className="mt-6 divide-y divide-border rounded-lg border border-border bg-card">
          {(notices ?? []).slice(0, 4).map((notice) => (
            <li key={notice.id}>
              <Link
                to={`/notices/${notice.id}`}
                className="flex items-center justify-between gap-4 px-5 py-4 text-sm hover:bg-muted/60"
              >
                <span className="truncate">{notice.title}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {new Date(notice.created_at).toLocaleDateString("ko-KR")}
                </span>
              </Link>
            </li>
          ))}
          {(notices ?? []).length === 0 && (
            <li className="px-5 py-8 text-center text-sm text-muted-foreground">
              등록된 공지사항이 없습니다.
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
