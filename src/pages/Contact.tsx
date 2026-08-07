import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createReservation, reservationSchema, type ReservationInput } from "@/lib/api/reservations";
import { PRODUCT_TYPES } from "@/lib/pricing";
import { usePageTitle } from "@/hooks/usePageTitle";

const EMPTY: ReservationInput = {
  name: "",
  phone: "",
  email: "",
  service: "",
  preferred_at: "",
  message: "",
};

export default function Contact() {
  usePageTitle(
    "제작 문의 — MINTCL",
    "홈페이지 제작 문의, 상담 문의를 남겨 주시면 확인 후 연락드립니다.",
  );

  const [form, setForm] = useState<ReservationInput>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: createReservation,
    onSuccess: () => {
      setForm(EMPTY);
      setErrors({});
      toast.success("문의가 접수되었습니다. 확인 후 연락드리겠습니다.");
    },
    onError: () => toast.error("접수에 실패했습니다. 잠시 후 다시 시도해 주세요."),
  });

  const set = (key: keyof ReservationInput) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = reservationSchema.safeParse(form);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of (result.error as z.ZodError).issues) {
        next[String(issue.path[0])] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    mutation.mutate(result.data);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="text-3xl font-semibold">제작 문의</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        업종과 제작 희망 내용을 남겨 주시면 담당자가 확인 후 연락드립니다.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5 rounded-lg border border-border bg-card p-6">
        <Field label="이름" required error={errors["name"]}>
          <Input value={form.name} maxLength={50} onChange={(e) => set("name")(e.target.value)} />
        </Field>
        <Field label="연락처" required error={errors["phone"]}>
          <Input
            value={form.phone}
            maxLength={30}
            placeholder="010-0000-0000"
            onChange={(e) => set("phone")(e.target.value)}
          />
        </Field>
        <Field label="이메일" error={errors["email"]}>
          <Input
            type="email"
            value={form.email}
            maxLength={255}
            onChange={(e) => set("email")(e.target.value)}
          />
        </Field>
        <Field label="희망 제작 유형" error={errors["service"]}>
          <Select value={form.service} onValueChange={set("service")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="선택해 주세요" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_TYPES.map((type) => (
                <SelectItem key={type.name} value={type.name}>
                  {type.name}
                </SelectItem>
              ))}
              <SelectItem value="기타">기타 (문의 내용에 설명)</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="연락 희망 일시" error={errors["preferred_at"]}>
          <Input
            type="datetime-local"
            value={form.preferred_at}
            onChange={(e) => set("preferred_at")(e.target.value)}
          />
        </Field>
        <Field label="제작 희망 내용" error={errors["message"]}>
          <Textarea
            rows={5}
            placeholder="어떤 업종이고, 어떤 페이지가 필요한지 자유롭게 적어 주세요."
            value={form.message}
            maxLength={1000}
            onChange={(e) => set("message")(e.target.value)}
          />
        </Field>

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "접수 중…" : "문의 보내기"}
        </Button>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean | undefined;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
