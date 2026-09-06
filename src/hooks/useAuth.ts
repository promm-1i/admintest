import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";

export type AuthState = {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
};

/**
 * 세션 + 관리자 권한 상태.
 * 관리자 판별은 user_roles 테이블(RLS 보호)을 조회해서 결정한다.
 * UI에서 숨기는 용도일 뿐, 실제 권한은 데이터베이스 RLS가 강제한다.
 */
/** supabase-js(~120KB)는 첫 화면 렌더 뒤에 받도록 늦게 불러온다 — 헤더가 매 페이지에서 쓰기 때문 */
const loadSupabase = () => import("@/integrations/supabase/client").then((m) => m.supabase);

export function useAuth(): AuthState {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let unsubscribe = () => {};

    void loadSupabase().then((supabase) => {
    if (!active) return;
    const resolveRole = async (uid: string | undefined) => {
      if (!uid) {
        if (active) setIsAdmin(false);
        return;
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid)
        .eq("role", "admin")
        .maybeSingle();
      if (active) setIsAdmin(Boolean(data));
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      void resolveRole(nextSession?.user?.id);
    });

    void supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      setSession(data.session);
      await resolveRole(data.session?.user?.id);
      if (active) setLoading(false);
    });

    unsubscribe = () => sub.subscription.unsubscribe();
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return { session, user: session?.user ?? null, isAdmin, loading };
}

export async function signInWithEmail(email: string, password: string) {
  const supabase = await loadSupabase();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signOut() {
  const supabase = await loadSupabase();
  await supabase.auth.signOut();
}
