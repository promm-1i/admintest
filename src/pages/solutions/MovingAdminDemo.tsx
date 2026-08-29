import { IndustryAdminShell } from "@/components/site/IndustryAdminShell";
import { MENU, FLAT_MENU } from "./moving-admin/menu";
import {
  DashboardView,
  QuoteView,
  EstimateView,
  ReservationView,
  TeamView,
  VehicleView,
  WorkStatusView,
  PaymentView,
} from "./moving-admin/views/Views";
import {
  CaseListView,
  CaseRegisterView,
  ServiceView,
  RegionView,
  ReviewView,
  ClaimView,
  StaffView,
  PermissionView,
  SettingsView,
  ActivityLogView,
} from "./moving-admin/views/CrmViews";

export function MovingAdminDemo() {
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
          case "estimate":
            return <EstimateView />;
          case "reservation":
            return <ReservationView />;
          case "team":
            return <TeamView />;
          case "vehicle":
            return <VehicleView />;
          case "workstatus":
            return <WorkStatusView />;
          case "payment":
            return <PaymentView />;
          case "case-list":
            return <CaseListView onNavigate={navigate} />;
          case "case-register":
            return <CaseRegisterView onNavigate={navigate} />;
          case "service":
            return <ServiceView />;
          case "region":
            return <RegionView />;
          case "review":
            return <ReviewView />;
          case "claim":
            return <ClaimView />;
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
