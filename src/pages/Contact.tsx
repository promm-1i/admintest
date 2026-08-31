import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDesignCodeOptions } from "@/lib/designCode";
import { createReservation, reservationSchema, type ReservationInput } from "@/lib/api/reservations";
import { KAKAO_CHANNEL_URL, PHONE_TEL_HREF } from "@/lib/contact";
import { usePageTitle } from "@/hooks/usePageTitle";

/**
 * 문의 폼은 이탈을 줄이기 위해 성함 · 연락처 · 제작 희망 내용 세 칸만 받는다.
 * 템플릿/서비스 페이지에서 넘어온 ?service= 값은 화면에 노출하지 않고 접수 데이터에만 실어 보낸다.
 */
export default function Contact() {
  usePageTitle(
    "제작 문의 — NOVERIQ",
    "홈페이지 제작 문의, 상담 문의를 남겨 주시면 확인 후 연락드립니다.",
  );

  const [searchParams] = useSearchParams();
  const serviceFromLink = searchParams.get("service") ?? "";

  // 템플릿 상세의 "이 디자인으로 상담받기"에서 넘어온 ?design= 값. 폼의 디자인 코드 셀렉트에 미리 선택해 둔다.
  const designOptions = useMemo(() => getDesignCodeOptions(), []);
  const designFromLink = searchParams.get("design") ?? "";
  const [designCode, setDesignCode] = useState(() =>
    designOptions.some((o) => o.code === designFromLink) ? designFromLink : "",
  );
  const designGroups = useMemo(() => {
    const groups = new Map<string, typeof designOptions>();
    for (const o of designOptions) {
      const list = groups.get(o.industry) ?? [];
      list.push(o);
      groups.set(o.industry, list);
    }
    return [...groups.entries()];
  }, [designOptions]);

  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: createReservation,
    onSuccess: (data) => {
      setForm({ name: "", phone: "", message: "" });
      setDesignCode("");
      setErrors({});
      setAccessToken(data.access_token);
      toast.success("문의가 접수되었습니다. 확인 후 연락드리겠습니다.");
    },
    onError: () => toast.error("접수에 실패했습니다. 잠시 후 다시 시도해 주세요."),
  });

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: ReservationInput = {
      name: form.name,
      phone: form.phone,
      message: form.message,
      service: [serviceFromLink, designCode && `디자인 ${designCode}`]
        .filter(Boolean)
        .join(" · ")
        .slice(0, 100),
      email: "",
      preferred_at: "",
    };
    const result = reservationSchema.safeParse(payload);
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
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={KAKAO_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-[#FEE500] px-4 py-2.5 text-sm font-bold text-[#191919] hover:bg-[#FADA00] shadow-xs transition-colors"
        >
          <MessageCircle className="h-4 w-4 fill-[#191919]" />
          카카오톡으로 바로 문의하기 →
        </a>
        <a
          href={PHONE_TEL_HREF}
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold text-foreground hover:bg-secondary shadow-xs transition-colors"
        >
          <Phone className="h-4 w-4 text-primary" />
          전화 문의
        </a>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        접수: 24시간 언제든 가능 · 응답: 1일 이내 회신
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5 rounded-lg border border-border bg-card p-6">
        <Field label="성함 / 업체명" required error={errors["name"]}>
          <Input
            value={form.name}
            maxLength={50}
            placeholder="김민수 / OO인테리어"
            onChange={(e) => set("name")(e.target.value)}
          />
        </Field>
        <Field label="연락처" required error={errors["phone"]}>
          <Input
            value={form.phone}
            maxLength={30}
            placeholder="010-0000-0000"
            onChange={(e) => set("phone")(e.target.value)}
          />
        </Field>
        <Field label="관심 디자인 코드 (선택)">
          <Select value={designCode} onValueChange={setDesignCode}>
            <SelectTrigger>
              <SelectValue placeholder="템플릿에서 마음에 든 디자인이 있다면 선택해 주세요" />
            </SelectTrigger>
            <SelectContent>
              {designGroups.map(([industry, options]) => (
                <SelectGroup key={industry}>
                  <SelectLabel>{industry}</SelectLabel>
                  {options.map((o) => (
                    <SelectItem key={o.code} value={o.code}>
                      {o.code} · {o.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="제작 희망 내용" error={errors["message"]}>
          <Textarea
            rows={6}
            placeholder="어떤 업종이고, 어떤 홈페이지가 필요한지 자유롭게 적어 주세요. 간단히 적어주셔도 됩니다."
            value={form.message}
            maxLength={1000}
            onChange={(e) => set("message")(e.target.value)}
          />
        </Field>

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "접수 중…" : "문의 보내기"}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          연락처는 상담 회신 용도로만 사용됩니다.
        </p>
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
