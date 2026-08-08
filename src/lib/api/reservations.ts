import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { z } from "zod";

export type Reservation = Database["public"]["Tables"]["reservations"]["Row"];
export type ReservationStatus = Database["public"]["Enums"]["reservation_status"];

export const RESERVATION_STATUS_LABELS: Record<ReservationStatus, string> = {
  received: "접수",
  reviewing: "확인 중",
  confirmed: "확정",
  cancelled: "취소",
};

export const RESERVATION_STATUSES: ReservationStatus[] = [
  "received",
  "reviewing",
  "confirmed",
  "cancelled",
];

export const reservationSchema = z.object({
  name: z.string().trim().min(1, "이름을 입력해 주세요.").max(50),
  phone: z
    .string()
    .trim()
    .min(1, "연락처를 입력해 주세요.")
    .max(30)
    .regex(/^[0-9+\-()\s]+$/, "연락처 형식이 올바르지 않습니다."),
  email: z.string().trim().email("이메일 형식이 올바르지 않습니다.").max(255).or(z.literal("")),
  service: z.string().trim().max(100),
  preferred_at: z.string().trim().max(40),
  message: z.string().trim().max(1000),
});

export type ReservationInput = z.infer<typeof reservationSchema>;

// Formspree 엔드포인트는 클라이언트에 노출되도록 설계된 공개 폼 URL이라 안전하다
// (Resend API 키 같은 비밀값과 다름). 실제 문의 기록은 Supabase가 정본이며,
// 이 요청은 이메일 알림용 best-effort 전송이라 실패해도 문의 접수 자체는 성공 처리한다.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvkpzklq";

async function notifyByEmail(parsed: ReservationInput): Promise<void> {
  try {
    await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: "MintCL 새 제작 문의",
        이름: parsed.name,
        연락처: parsed.phone,
        이메일: parsed.email || "(미입력)",
        희망제작유형: parsed.service || "(미입력)",
        연락희망일시: parsed.preferred_at || "(미입력)",
        문의내용: parsed.message || "(미입력)",
      }),
    });
  } catch (e) {
    console.error("[Formspree] 이메일 알림 전송 실패", e);
  }
}

/** 누구나 예약 문의를 등록할 수 있다 (RLS: anon/authenticated INSERT 허용) */
export async function createReservation(input: ReservationInput): Promise<{ access_token: string }> {
  const parsed = reservationSchema.parse(input);
  const { data, error } = await supabase
    .from("reservations")
    .insert({
      name: parsed.name,
      phone: parsed.phone,
      email: parsed.email || null,
      service: parsed.service || null,
      preferred_at: parsed.preferred_at ? new Date(parsed.preferred_at).toISOString() : null,
      message: parsed.message || null,
    })
    .select("access_token")
    .single();
  if (error) throw error;
  void notifyByEmail(parsed);
  return data;
}

/** 회원가입 없이, 발급받은 조회 토큰으로 본인 문의 1건을 조회한다 */
export async function getReservationByToken(token: string): Promise<Reservation | null> {
  const { data, error } = await supabase.rpc("get_reservation_by_token", { _token: token });
  if (error) throw error;
  return data ?? null;
}

/** 회원가입 없이, 발급받은 조회 토큰으로 본인 문의를 취소한다 */
export async function cancelReservationByToken(token: string): Promise<Reservation> {
  const { data, error } = await supabase.rpc("cancel_reservation_by_token", { _token: token });
  if (error) throw error;
  return data;
}

/** 관리자 전용 목록 조회 (RLS로 관리자만 통과) */
export async function listReservations(): Promise<Reservation[]> {
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function updateReservationStatus(id: string, status: ReservationStatus): Promise<void> {
  const { error } = await supabase.from("reservations").update({ status }).eq("id", id);
  if (error) throw error;
}