import { useEffect, useId, useRef, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createReservation } from "@/lib/api/reservations";

/** 010-1234-1234 형식을 끝까지 다 채웠을 때만 통과 */
const PHONE_RE = /^010-\d{4}-\d{4}$/;

/** 숫자만 받아 010-1234-1234 모양으로 하이픈을 끼운다 */
function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}

/**
 * 상세 페이지를 떠나지 않고 받는 간단 상담 접수 — 이름 · 전화번호 · 선택 디자인만.
 * 접수는 문의 페이지와 같은 create_reservation 으로 들어가 관리자 화면 · 메일 알림에 똑같이 잡힌다.
 * 네이티브 <dialog> 라 Esc 닫기 · 포커스 가두기 · 배경 막기가 브라우저 기본으로 된다.
 */
export function QuickConsultDialog({
  open,
  onClose,
  designName,
  designCode,
}: {
  open: boolean;
  onClose: () => void;
  designName: string;
  designCode: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const uid = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "fail">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      setStatus("idle");
      setErrors({});
      el.showModal();
    } else if (!open && el.open) {
      el.close();
    }
  }, [open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = "이름을 입력해 주세요.";
    if (!PHONE_RE.test(phone)) next.phone = "010-1234-1234 형식으로 끝까지 입력해 주세요.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      await createReservation({
        name: name.trim(),
        phone,
        email: "",
        preferred_at: "",
        service: `간단 상담 · 디자인 ${designCode}`.slice(0, 100),
        message: `선택하신 디자인: ${designName} (${designCode})`,
      });
      setStatus("done");
      setName("");
      setPhone("");
    } catch {
      setStatus("fail");
    }
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onKeyDown={(e) => {
        // 브라우저 기본 Esc 닫기는 다른 전역 키 처리에 막힐 때가 있어 직접 받는다
        if (e.key === "Escape") {
          e.preventDefault();
          onClose();
        }
      }}
      onClick={(e) => {
        // 바깥(배경) 클릭으로 닫기 — dialog 요소 자신이 눌렸을 때만
        if (e.target === ref.current) onClose();
      }}
      aria-labelledby={`${uid}-title`}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-card p-0 text-foreground shadow-2xl backdrop:bg-black/50"
    >
      <div className="relative p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute right-4 top-4 rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "done" ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
            <h2 id={`${uid}-title`} className="mt-4 text-xl font-bold">
              상담 신청이 접수되었습니다
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-keep">
              확인 후 남겨 주신 번호로 연락드리겠습니다.
            </p>
            <Button type="button" className="mt-6 w-full" onClick={onClose}>
              확인
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <h2 id={`${uid}-title`} className="text-xl font-bold">
              이 디자인으로 상담 신청
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground break-keep">
              이름과 연락처만 남겨 주시면 확인 후 연락드립니다.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <Label htmlFor={`${uid}-design`}>선택하신 디자인</Label>
                <Input
                  id={`${uid}-design`}
                  value={`${designName} · ${designCode}`}
                  readOnly
                  className="mt-1.5 bg-secondary/60 font-semibold"
                />
              </div>
              <div>
                <Label htmlFor={`${uid}-name`}>
                  이름 <span className="text-primary">*</span>
                </Label>
                <Input
                  id={`${uid}-name`}
                  value={name}
                  maxLength={50}
                  autoComplete="name"
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name && e.target.value.trim()) setErrors((p) => ({ ...p, name: undefined }));
                  }}
                  aria-invalid={Boolean(errors.name)}
                  className="mt-1.5"
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor={`${uid}-phone`}>
                  전화번호 <span className="text-primary">*</span>
                </Label>
                <Input
                  id={`${uid}-phone`}
                  value={phone}
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="010-1234-1234"
                  onChange={(e) => {
                    const next = formatPhone(e.target.value);
                    setPhone(next);
                    if (errors.phone && PHONE_RE.test(next)) setErrors((p) => ({ ...p, phone: undefined }));
                  }}
                  aria-invalid={Boolean(errors.phone)}
                  className="mt-1.5"
                />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>
            </div>

            {status === "fail" && (
              <p className="mt-4 rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
                접수에 실패했습니다. 잠시 후 다시 시도해 주세요.
              </p>
            )}

            <Button type="submit" size="lg" className="mt-6 w-full font-bold" disabled={status === "sending"}>
              {status === "sending" ? "접수 중…" : "상담 신청하기"}
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">연락처는 상담 회신 용도로만 사용됩니다.</p>
          </form>
        )}
      </div>
    </dialog>
  );
}
