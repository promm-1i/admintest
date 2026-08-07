import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getNotice } from "@/lib/api/notices";
import { NoticeImage } from "@/components/site/NoticeImage";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function NoticeDetail() {
  usePageTitle("공지사항 상세 — MINTCL", "MINTCL 공지사항 상세 내용입니다.");

  const { noticeId } = useParams<{ noticeId: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ["notice", noticeId],
    queryFn: () => getNotice(noticeId!),
    enabled: Boolean(noticeId),
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <Link to="/notices" className="text-sm text-primary">
        ← 목록으로
      </Link>

      {isLoading && <p className="mt-8 text-sm text-muted-foreground">불러오는 중…</p>}
      {!isLoading && !data && (
        <p className="mt-8 text-sm text-muted-foreground">공지사항을 찾을 수 없습니다.</p>
      )}

      {data && (
        <article className="mt-6">
          <h1 className="text-2xl font-semibold">{data.title}</h1>
          <p className="mt-2 text-xs text-muted-foreground">
            {new Date(data.created_at).toLocaleDateString("ko-KR")}
          </p>
          {data.image_url && (
            <div className="mt-6">
              <NoticeImage path={data.image_url} alt={data.title} />
            </div>
          )}
          <div className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
            {data.content}
          </div>
        </article>
      )}
    </div>
  );
}
