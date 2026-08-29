import { IndustryAdminShell } from "@/components/site/IndustryAdminShell";
import { MENU, FLAT_MENU } from "./moving-admin/menu";
import {
  DashboardView,
  CaseListView,
  CaseRegisterView,
  QuoteView,
  RegionView,
  StaffView,
} from "./moving-admin/views/Views";

export function MovingAdminDemo() {
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
          case "region":
            return <RegionView />;
          case "staff":
            return <StaffView />;
          default:
            return null;
        }
      }}
    />
  );
}
