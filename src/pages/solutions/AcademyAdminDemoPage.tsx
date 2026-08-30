import { IndustryAdminPageShell } from "@/components/site/IndustryAdminPageShell";
import { usePageTitle } from "@/hooks/usePageTitle";
import { AcademyAdminDemo } from "@/pages/solutions/AcademyAdminDemo";
import { useAcademyAdmin } from "@/pages/solutions/academy-admin/store";

export default function AcademyAdminDemoPage() {
  usePageTitle(
    "학원 관리자 데모 — NOVERIQ",
    "학원 맞춤형 홈페이지의 관리자 기능을 직접 체험해볼 수 있는 데모 페이지입니다.",
  );
  const { resetDemoData } = useAcademyAdmin();

  return (
    <IndustryAdminPageShell
      title="학원 관리자 데모"
      homeHref="/web-solutions/academy/demo/site"
      backHref="/web-solutions/academy"
      onResetDemoData={resetDemoData}
    >
      <AcademyAdminDemo />
    </IndustryAdminPageShell>
  );
}
