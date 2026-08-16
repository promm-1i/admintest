import { useState, type ReactNode, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createReservation } from "@/lib/api/reservations";

type PhoneCallbackButtonProps = {
  className?: string;
  children: ReactNode;
};

/**
 * 실제 전화번호를 노출하는 tel: 링크 대신, 번호를 남기면 민트클이
 * 먼저 전화를 거는 콜백 요청 폼을 연다. 접수는 문의 폼과 동일하게
 * createReservation(RPC)을 통해 저장된다.
 */
export function PhoneCallbackButton({ className, children }: PhoneCallbackButtonProps) {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");

  const mutation = useMutation({
    mutationFn: () =>
      createReservation({
        name: "전화 문의",
        phone,
        email: "",
        service: "전화 문의 요청",
        preferred_at: "",
        message: "전화 문의 요청입니다. 남겨주신 번호로 편하실 때 연락 부탁드립니다.",
      }),
    onSuccess: () => {
      toast.success("요청이 접수되었습니다. 빠르게 연락드리겠습니다.");
      setPhone("");
      setOpen(false);
    },
    onError: () => toast.error("접수에 실패했습니다. 잠시 후 다시 시도해 주세요."),
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[0-9+\-()\s]{7,}$/.test(phone.trim())) {
      toast.error("연락처를 정확히 입력해 주세요.");
      return;
    }
    mutation.mutate();
  };

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">전화 문의 요청</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="닫기"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground break-keep">
              번호를 남겨주시면 확인 후 전화드립니다.
              <br />
              접수: 24시간 언제든 가능 · 응답: 1일 이내 회신
            </p>
            <form onSubmit={onSubmit} className="mt-4 space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="callback-phone">연락처</Label>
                <Input
                  id="callback-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-0000-0000"
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full font-bold gap-1.5" disabled={mutation.isPending}>
                <Phone className="h-4 w-4" />
                {mutation.isPending ? "접수 중…" : "전화 요청하기"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
