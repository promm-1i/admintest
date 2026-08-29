import { IndustryAdminShell } from "@/components/site/IndustryAdminShell";
import { MENU, FLAT_MENU } from "./interior-admin/menu";
import {
  DashboardView,
  CaseListView,
  CaseRegisterView,
  QuoteView,
  PackageView,
  StaffView,
} from "./interior-admin/views/Views";

export function InteriorAdminDemo() {
  return (
    <IndustryAdminShell
      menu={MENU}
      flatMenu={FLAT_MENU}
      defaultOpenGroups={["case"]}
      renderContent={(activeKey, navigate) => {
        switch (activeKey) {
          case "dashboard":
            return <DashboardView />;
          case "case-list":
            return <CaseListView onNavigate={navigate} />;
          case "case-register":
            return <CaseRegisterView onNavigate={navigate} />;
          case "quote":
            return <QuoteView />;
          case "package":
            return <PackageView />;
          case "staff":
            return <StaffView />;
          default:
            return null;
        }
      }}
    />
  );
}
