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

/** 누구나 예약 문의를 등록할 수 있다 (RLS: anon/authenticated INSERT 허용) */
export async function createReservation(input: ReservationInput): Promise<void> {
  const parsed = reservationSchema.parse(input);
  const { error } = await supabase.from("reservations").insert({
    name: parsed.name,
    phone: parsed.phone,
    email: parsed.email || null,
    service: parsed.service || null,
    preferred_at: parsed.preferred_at ? new Date(parsed.preferred_at).toISOString() : null,
    message: parsed.message || null,
  });
  if (error) throw error;
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