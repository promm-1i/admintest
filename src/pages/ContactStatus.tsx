import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  getReservationByToken,
  cancelReservationByToken,
  RESERVATION_STATUS_LABELS,
} from "@/lib/api/reservations";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function ContactStatus() {
  usePageTitle("내 문의 확인 — NOVERIQ", "접수하신 제작 문의 내용을 확인하고 취소할 수 있습니다.");

  const { token } = useParams<{ token: string }>();
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["reservation-by-token", token],
    queryFn: () => getReservationByToken(token!),
    enabled: Boolean(token),
  });

  const cancelMutation = useMutation({
    mutationFn: () => cancelReservationByToken(token!),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["reservation-by-token", token] });
      toast.success("문의가 취소되었습니다.");
    },
    onError: () => toast.error("취소에 실패했습니다. 잠시 후 다시 시도해 주세요."),
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <Link to="/contact" className="text-sm text-primary">
        ← 새 문의 남기기
      </Link>

      <h1 className="mt-6 text-3xl font-semibold">내 문의 확인</h1>

      {isLoading && <p className="mt-8 text-sm text-muted-foreground">불러오는 중…</p>}
      {(error || (!isLoading && !data)) && (
        <p className="mt-8 text-sm text-muted-foreground">
          문의를 찾을 수 없습니다. 링크가 정확한지 확인해 주세요.
        </p>
      )}

      {data && (
        <div className="mt-8 space-y-5 rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <p className="font-medium">{data.name}</p>
            <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
              {RESERVATION_STATUS_LABELS[data.status]}
            </span>
          </div>
          <dl className="space-y-3 text-sm">
            <Row label="연락처" value={data.phone} />
            {data.email && <Row label="이메일" value={data.email} />}
            {data.service && <Row label="희망 제작 유형" value={data.service} />}
            {data.preferred_at && (
              <Row label="완료 희망 날짜" value={new Date(data.preferred_at).toLocaleDateString("ko-KR")} />
            )}
            <Row label="접수일" value={new Date(data.created_at).toLocaleString("ko-KR")} />
            {data.message && (
              <div>
                <dt className="text-muted-foreground">문의 내용</dt>
                <dd className="mt-1 whitespace-pre-wrap">{data.message}</dd>
              </div>
            )}
          </dl>

          {data.status === "cancelled" ? (
            <p className="text-sm text-muted-foreground">이미 취소된 문의입니다.</p>
          ) : (
            <Button
              variant="destructive"
              disabled={cancelMutation.isPending}
              onClick={() => {
                if (confirm("이 문의를 취소할까요?")) cancelMutation.mutate();
              }}
            >
              {cancelMutation.isPending ? "취소 중…" : "문의 취소하기"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd className="truncate text-right">{value}</dd>
    </div>
  );
}
