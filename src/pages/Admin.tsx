import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { NoticeManager } from "@/components/admin/NoticeManager";
import { ReservationManager } from "@/components/admin/ReservationManager";
import { signOut, useAuth } from "@/hooks/useAuth";
import { usePageTitle } from "@/hooks/usePageTitle";

// 새 관리 영역(예: 샘플 사이트 관리)을 추가할 때는 이 배열에 탭을 하나 더하면 된다.
const ADMIN_TABS = [
  { value: "notices", label: "공지사항", content: <NoticeManager /> },
  { value: "inquiries", label: "제작 문의", content: <ReservationManager /> },
];

export default function Admin() {
  usePageTitle("관리자 — NOVERIQ", "공지사항과 제작 문의를 관리하는 운영자 페이지입니다.");

  const { isAdmin, loading, user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const handleSignOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await signOut();
    navigate("/auth", { replace: true });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">관리자</h1>
          <p className="mt-1 text-sm text-muted-foreground">{user?.email}</p>
        </div>
        <Button variant="outline" onClick={() => void handleSignOut()}>
          로그아웃
        </Button>
      </div>

      {loading && <p className="mt-10 text-sm text-muted-foreground">권한 확인 중…</p>}

      {!loading && !isAdmin && (
        <div className="mt-10 rounded-lg border border-border bg-card p-8">
          <p className="font-medium">관리자 권한이 없습니다.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            이 계정에는 관리자 권한이 부여되어 있지 않습니다. 공지사항 및 문의 데이터는 데이터베이스
            보안 정책(RLS)에 의해서도 차단됩니다.
          </p>
        </div>
      )}

      {!loading && isAdmin && (
        <Tabs defaultValue={ADMIN_TABS[0]!.value} className="mt-8">
          <TabsList>
            {ADMIN_TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {ADMIN_TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-6">
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
