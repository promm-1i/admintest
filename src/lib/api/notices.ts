import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Notice = Database["public"]["Tables"]["notices"]["Row"];

export type NoticeInput = {
  title: string;
  content: string;
  image_url: string | null;
  category: string | null;
  is_pinned: boolean;
  published: boolean;
};

export const NOTICE_CATEGORIES = ["공지", "이벤트", "안내"] as const;

const NOTICE_BUCKET = "notice-images";

/** 상단 고정 공지가 먼저 오도록 정렬 */
function sortPinnedFirst(notices: Notice[]): Notice[] {
  return [...notices].sort((a, b) => {
    if (a.is_pinned !== b.is_pinned) return a.is_pinned ? -1 : 1;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
}

/** 공개된 공지사항 목록 (비로그인 사용자 포함), 상단 고정 우선 정렬 */
export async function listPublishedNotices(): Promise<Notice[]> {
  const { data, error } = await supabase
    .from("notices")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return sortPinnedFirst(data ?? []);
}

/** 관리자용 전체 공지사항 목록 (비공개 포함), 상단 고정 우선 정렬 */
export async function listAllNotices(): Promise<Notice[]> {
  const { data, error } = await supabase
    .from("notices")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return sortPinnedFirst(data ?? []);
}

export async function getNotice(id: string): Promise<Notice | null> {
  const { data, error } = await supabase.from("notices").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function createNotice(input: NoticeInput): Promise<Notice> {
  const { data: userData } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("notices")
    .insert({ ...input, author_id: userData.user?.id ?? null })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateNotice(id: string, input: Partial<NoticeInput>): Promise<Notice> {
  const { data, error } = await supabase.from("notices").update(input).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteNotice(id: string): Promise<void> {
  const { error } = await supabase.from("notices").delete().eq("id", id);
  if (error) throw error;
}

/** 공지 이미지 업로드 -> 스토리지 경로 반환 (관리자만 RLS 통과) */
export async function uploadNoticeImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(NOTICE_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  return path;
}

/** 스토리지 경로를 열람 가능한 URL로 변환 */
export async function getNoticeImageUrl(path: string | null): Promise<string | null> {
  if (!path) return null;
  if (path.startsWith("http") || path.startsWith("/")) return path;
  const { data, error } = await supabase.storage.from(NOTICE_BUCKET).createSignedUrl(path, 60 * 60);
  if (error) return null;
  return data.signedUrl;
}