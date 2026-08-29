import { IndustryAdminPageShell } from "@/components/site/IndustryAdminPageShell";
import { usePageTitle } from "@/hooks/usePageTitle";
import { InteriorAdminDemo } from "@/pages/solutions/InteriorAdminDemo";
import { useInteriorAdmin } from "@/pages/solutions/interior-admin/store";

export default function InteriorAdminDemoPage() {
  usePageTitle(
    "인테리어 관리자 데모 — MintCL",
    "인테리어·리모델링 맞춤형 홈페이지의 관리자 기능을 직접 체험해볼 수 있는 데모 페이지입니다.",
  );
  const { resetDemoData } = useInteriorAdmin();

  return (
    <IndustryAdminPageShell
      title="인테리어 관리자 데모"
      homeHref="/web-solutions/interior/demo/site"
      backHref="/web-solutions/interior"
      onResetDemoData={resetDemoData}
    >
      <InteriorAdminDemo />
    </IndustryAdminPageShell>
  );
}
