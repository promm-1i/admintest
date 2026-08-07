import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

/**
 * 로그인 여부만 확인하는 클라이언트 사이드 가드.
 * 실제 데이터 접근 권한은 Supabase RLS가 강제하므로, 여기서는 UX 목적의
 * 리다이렉트만 수행한다 (관리자 여부 판별은 Admin 페이지 내부에서 처리).
 */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">확인 중…</p>
      </div>
    );
  }

  if (!session) return <Navigate to="/auth" replace />;

  return <>{children}</>;
}
