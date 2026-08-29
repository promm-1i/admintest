import { IndustryAdminPageShell } from "@/components/site/IndustryAdminPageShell";
import { usePageTitle } from "@/hooks/usePageTitle";
import { HospitalAdminDemo } from "@/pages/solutions/HospitalAdminDemo";

export default function HospitalAdminDemoPage() {
  usePageTitle(
    "병원·의원 관리자 데모 — MintCL",
    "병원·의원 맞춤형 홈페이지의 관리자 기능을 직접 체험해볼 수 있는 데모 페이지입니다.",
  );

  return (
    <IndustryAdminPageShell
      title="병원·의원 관리자 데모"
      homeHref="/web-solutions/hospital/demo/site"
      backHref="/web-solutions/hospital"
    >
      <HospitalAdminDemo />
    </IndustryAdminPageShell>
  );
}
