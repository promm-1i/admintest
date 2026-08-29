import { IndustryAdminPageShell } from "@/components/site/IndustryAdminPageShell";
import { usePageTitle } from "@/hooks/usePageTitle";
import { MovingAdminDemo } from "@/pages/solutions/MovingAdminDemo";

export default function MovingAdminDemoPage() {
  usePageTitle(
    "이사·청소 관리자 데모 — MintCL",
    "이사·청소업체 맞춤형 홈페이지의 관리자 기능을 직접 체험해볼 수 있는 데모 페이지입니다.",
  );

  return (
    <IndustryAdminPageShell title="이사·청소 관리자 데모" homeHref="/web-solutions/moving/demo/site" backHref="/web-solutions/moving">
      <MovingAdminDemo />
    </IndustryAdminPageShell>
  );
}
