import { IndustryAdminShell } from "@/components/site/IndustryAdminShell";
import { MENU, FLAT_MENU } from "./hospital-admin/menu";
import {
  DashboardView,
  DepartmentListView,
  DepartmentRegisterView,
  ReservationView,
  NonCoveredView,
  StaffView,
} from "./hospital-admin/views/Views";

export function HospitalAdminDemo() {
  return (
    <IndustryAdminShell
      menu={MENU}
      flatMenu={FLAT_MENU}
      defaultOpenGroups={["department"]}
      renderContent={(activeKey, navigate) => {
        switch (activeKey) {
          case "dashboard":
            return <DashboardView />;
          case "department-list":
            return <DepartmentListView onNavigate={navigate} />;
          case "department-register":
            return <DepartmentRegisterView onNavigate={navigate} />;
          case "reservation":
            return <ReservationView />;
          case "noncovered":
            return <NonCoveredView />;
          case "staff":
            return <StaffView />;
          default:
            return null;
        }
      }}
    />
  );
}
