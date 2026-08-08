import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  listReservations,
  updateReservationStatus,
  RESERVATION_STATUSES,
  RESERVATION_STATUS_LABELS,
  type ReservationStatus,
} from "@/lib/api/reservations";

export function ReservationManager() {
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["reservations"],
    queryFn: listReservations,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ReservationStatus }) =>
      updateReservationStatus(id, status),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["reservations"] });
      toast.success("상태가 변경되었습니다.");
    },
    onError: () => toast.error("상태 변경에 실패했습니다."),
  });

  if (isLoading) return <p className="text-sm text-muted-foreground">불러오는 중…</p>;
  if (error) return <p className="text-sm text-destructive">문의 목록을 불러오지 못했습니다.</p>;

  return (
    <ul className="space-y-4">
      {(data ?? []).map((r) => (
        <li key={r.id} className="rounded-lg border border-border bg-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-medium">
                {r.name} <span className="text-sm text-muted-foreground">{r.phone}</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                신청 {new Date(r.created_at).toLocaleString("ko-KR")}
                {r.preferred_at && ` · 완료 희망 ${new Date(r.preferred_at).toLocaleDateString("ko-KR")}`}
                {r.service && ` · ${r.service}`}
              </p>
              {r.email && <p className="mt-1 text-xs text-muted-foreground">{r.email}</p>}
              {r.message && (
                <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">{r.message}</p>
              )}
            </div>
            <Select
              value={r.status}
              onValueChange={(v) => statusMutation.mutate({ id: r.id, status: v as ReservationStatus })}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RESERVATION_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {RESERVATION_STATUS_LABELS[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </li>
      ))}
      {(data ?? []).length === 0 && (
        <li className="rounded-lg border border-border bg-card px-5 py-10 text-center text-sm text-muted-foreground">
          접수된 제작 문의가 없습니다.
        </li>
      )}
    </ul>
  );
}