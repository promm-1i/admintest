import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createReservation, reservationSchema, type ReservationInput } from "@/lib/api/reservations";
import { PRODUCT_TYPES } from "@/lib/pricing";
import { QUOTE_FEATURES, getQuoteConfig, calculateQuote, formatQuoteSummary } from "@/lib/quote";
import { KAKAO_CHANNEL_URL } from "@/lib/contact";
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
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // 실시간 견적 계산기 상태 — 제작 유형을 바꾸면 초기화되고, 사용자가 문의 내용을
  // 직접 수정하면 더 이상 자동으로 덮어쓰지 않는다.
  const [pageCount, setPageCount] = useState(1);
  const [features, setFeatures] = useState<string[]>([]);
  const [messageAutoManaged, setMessageAutoManaged] = useState(true);

  const quoteConfig = getQuoteConfig(form.service);
  const estimatedTotal = quoteConfig ? calculateQuote(quoteConfig, pageCount, features) : 0;

  // 제작 유형이 바뀌면 견적 입력값을 그 유형에 맞게 초기화한다.
  useEffect(() => {
    const config = getQuoteConfig(form.service);
    if (config) {
      setPageCount(config.includedPages);
      setFeatures([]);
      setMessageAutoManaged(true);
    } else if (messageAutoManaged) {
      setForm((p) => ({ ...p, message: "" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.service]);

  // 견적 입력값이 바뀌면(그리고 사용자가 문의 내용을 직접 건드리지 않았다면)
  // 문의 내용 칸에 견적 요약을 자동으로 채워 넣는다.
  useEffect(() => {
    if (!quoteConfig || !messageAutoManaged) return;
    const summary = formatQuoteSummary(form.service, pageCount, features, estimatedTotal);
    setForm((p) => ({ ...p, message: summary }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.service, pageCount, features, messageAutoManaged]);

  const toggleFeature = (key: string) => {
    setFeatures((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const mutation = useMutation({
    mutationFn: createReservation,
    onSuccess: (data) => {
      setForm(EMPTY);
      setErrors({});
      setAccessToken(data.access_token);
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

  if (accessToken) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14">
        <h1 className="text-3xl font-semibold">문의가 접수되었습니다</h1>
        <p className="mt-4 text-sm text-muted-foreground">확인 후 남겨주신 연락처로 연락드립니다.</p>

        <div className="mt-8 space-y-4 rounded-lg border border-border bg-card p-6">
          <p className="text-sm font-medium">아래 링크로 내 문의 내용을 확인하거나 취소할 수 있습니다.</p>
          <p className="text-xs text-muted-foreground">
            이 링크를 잃어버리면 본인도 다시 조회할 수 없으니 꼭 저장해 주세요.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              to={`/contact/status/${accessToken}`}
              className="flex-1 truncate rounded-md border border-input bg-background px-3 py-2 text-sm text-primary"
            >
              내 문의 확인하기 →
            </Link>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                void navigator.clipboard.writeText(
                  `${window.location.origin}/contact/status/${accessToken}`,
                );
                toast.success("링크가 복사되었습니다.");
              }}
            >
              링크 복사
            </Button>
          </div>
        </div>

        <Button variant="ghost" className="mt-6" onClick={() => setAccessToken(null)}>
          새 문의 남기기
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="text-3xl font-semibold">제작 문의</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        업종과 제작 희망 내용을 남겨 주시면 담당자가 확인 후 연락드립니다.
      </p>
      <a
        href={KAKAO_CHANNEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#FEE500] px-4 py-2.5 text-sm font-bold text-[#191919] hover:bg-[#FADA00] shadow-xs transition-colors"
      >
        <MessageCircle className="h-4 w-4 fill-[#191919]" />
        카카오톡으로 바로 문의하기 →
      </a>

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

        {quoteConfig && (
          <div className="space-y-4 rounded-lg border border-dashed border-primary/40 bg-secondary/30 p-4">
            <p className="text-sm font-medium text-primary">실시간 견적 계산기</p>

            {quoteConfig.pagesAdjustable && (
              <div className="space-y-2">
                <Label>예상 페이지 수</Label>
                <Input
                  type="number"
                  min={1}
                  max={30}
                  value={pageCount}
                  onChange={(e) => setPageCount(Math.max(1, Number(e.target.value) || 1))}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>선택 기능</Label>
              <div className="space-y-2">
                {QUOTE_FEATURES.map((f) => (
                  <div key={f.key} className="flex items-center justify-between">
                    <span className="text-sm">
                      {f.label}
                      <span className="ml-1 text-xs text-muted-foreground">
                        (+{f.price.toLocaleString("ko-KR")}원)
                      </span>
                    </span>
                    <Switch checked={features.includes(f.key)} onCheckedChange={() => toggleFeature(f.key)} />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-md bg-card p-4 text-sm">
              <p>
                선택 유형: <span className="font-medium">{form.service}</span>
              </p>
              <p>
                예상 페이지 수:{" "}
                <span className="font-medium">
                  {quoteConfig.pagesAdjustable ? pageCount : quoteConfig.includedPages}페이지
                </span>
              </p>
              <p>
                선택 기능:{" "}
                <span className="font-medium">
                  {features.length > 0
                    ? QUOTE_FEATURES.filter((f) => features.includes(f.key))
                        .map((f) => f.label)
                        .join(", ")
                    : "없음"}
                </span>
              </p>
              <p className="mt-2 text-base font-semibold text-primary">
                산출 예상 비용: 약 {estimatedTotal.toLocaleString("ko-KR")}원
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                실제 견적은 상담 후 확정되며, 아래 문의 내용에 자동으로 반영됩니다(자유롭게 수정 가능).
              </p>
            </div>
          </div>
        )}

        <Field label="완료 희망 날짜" error={errors["preferred_at"]}>
          <Input
            type="date"
            value={form.preferred_at}
            onChange={(e) => set("preferred_at")(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">언제까지 완성되면 좋을지 알려주시면 일정 조율에 참고합니다.</p>
        </Field>
        <Field label="제작 희망 내용" error={errors["message"]}>
          <Textarea
            rows={7}
            placeholder="어떤 업종이고, 어떤 페이지가 필요한지 자유롭게 적어 주세요."
            value={form.message}
            maxLength={1000}
            onChange={(e) => {
              set("message")(e.target.value);
              setMessageAutoManaged(false);
            }}
          />
          {quoteConfig && !messageAutoManaged && (
            <button
              type="button"
              className="text-xs text-primary underline"
              onClick={() => setMessageAutoManaged(true)}
            >
              견적 요약으로 다시 채우기
            </button>
          )}
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
