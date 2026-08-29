import { IndustryAdminShell } from "@/components/site/IndustryAdminShell";
import { MENU, FLAT_MENU } from "./interior-admin/menu";
import {
  DashboardView,
  QuoteView,
  SurveyView,
  EstimateView,
  ContractView,
  ProjectView,
  ProcessView,
  MaterialView,
} from "./interior-admin/views/Views";
import {
  PartnerView,
  PaymentView,
  AsView,
  CaseListView,
  CaseRegisterView,
  PackageView,
  StaffView,
  PermissionView,
  SettingsView,
  ActivityLogView,
} from "./interior-admin/views/CrmViews";

export function InteriorAdminDemo() {
  return (
    <IndustryAdminShell
      menu={MENU}
      flatMenu={FLAT_MENU}
      defaultOpenGroups={["content"]}
      renderContent={(activeKey, navigate) => {
        switch (activeKey) {
          case "dashboard":
            return <DashboardView />;
          case "quote":
            return <QuoteView />;
          case "survey":
            return <SurveyView />;
          case "estimate":
            return <EstimateView />;
          case "contract":
            return <ContractView />;
          case "project":
            return <ProjectView />;
          case "process":
            return <ProcessView />;
          case "material":
            return <MaterialView />;
          case "partner":
            return <PartnerView />;
          case "payment":
            return <PaymentView />;
          case "as":
            return <AsView />;
          case "case-list":
            return <CaseListView onNavigate={navigate} />;
          case "case-register":
            return <CaseRegisterView onNavigate={navigate} />;
          case "package":
            return <PackageView />;
          case "staff":
            return <StaffView />;
          case "permission":
            return <PermissionView />;
          case "settings":
            return <SettingsView />;
          case "activitylog":
            return <ActivityLogView />;
          default:
            return null;
        }
      }}
    />
  );
}
