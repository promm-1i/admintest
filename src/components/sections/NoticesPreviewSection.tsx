import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { listPublishedNotices } from "@/lib/api/notices";

export function NoticesPreviewSection() {
  const { data: notices } = useQuery({
    queryKey: ["notices", "published"],
    queryFn: listPublishedNotices,
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader label="NOTICE" title="공지사항" />
        <Link to="/notices" className="text-sm font-medium text-primary">
          전체보기 →
        </Link>
      </div>
      <FadeIn delay={80}>
        <ul className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
          {(notices ?? []).slice(0, 3).map((notice) => (
            <li key={notice.id}>
              <Link
                to={`/notices/${notice.id}`}
                className="flex items-center justify-between gap-4 px-6 py-4 text-sm hover:bg-muted/60"
              >
                <span className="flex min-w-0 items-center gap-2">
                  {notice.is_pinned && (
                    <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      고정
                    </span>
                  )}
                  <span className="truncate">{notice.title}</span>
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {new Date(notice.created_at).toLocaleDateString("ko-KR")}
                </span>
              </Link>
            </li>
          ))}
          {(notices ?? []).length === 0 && (
            <li className="px-6 py-8 text-center text-sm text-muted-foreground">
              등록된 공지사항이 없습니다.
            </li>
          )}
        </ul>
      </FadeIn>
    </section>
  );
}
