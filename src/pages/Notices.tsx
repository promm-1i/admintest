import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { listPublishedNotices } from "@/lib/api/notices";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function Notices() {
  usePageTitle(
    "공지사항 — MINTCL",
    "MINTCL의 서비스 안내, 일정 변경 등 소식을 확인하세요.",
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ["notices", "published"],
    queryFn: listPublishedNotices,
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="text-3xl font-semibold">공지사항</h1>

      {isLoading && <p className="mt-8 text-sm text-muted-foreground">불러오는 중…</p>}
      {error && <p className="mt-8 text-sm text-destructive">공지사항을 불러오지 못했습니다.</p>}

      <ul className="mt-8 divide-y divide-border rounded-lg border border-border bg-card">
        {(data ?? []).map((notice) => (
          <li key={notice.id}>
            <Link to={`/notices/${notice.id}`} className="block px-5 py-5 hover:bg-muted/60">
              <p className="font-medium">{notice.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {new Date(notice.created_at).toLocaleDateString("ko-KR")}
              </p>
            </Link>
          </li>
        ))}
        {!isLoading && (data ?? []).length === 0 && (
          <li className="px-5 py-10 text-center text-sm text-muted-foreground">
            등록된 공지사항이 없습니다.
          </li>
        )}
      </ul>
    </div>
  );
}
