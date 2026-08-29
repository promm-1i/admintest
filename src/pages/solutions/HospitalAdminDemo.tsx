import { IndustryAdminShell } from "@/components/site/IndustryAdminShell";
import { MENU, FLAT_MENU } from "./hospital-admin/menu";
import {
  DashboardView,
  DepartmentListView,
  DepartmentRegisterView,
  DoctorListView,
  DoctorRegisterView,
  ReservationListView,
  ReservationCalendarView,
  NonCoveredView,
} from "./hospital-admin/views/Views";
import {
  CustomerView,
  ConsultView,
  ReviewView,
  NoticeView,
  BannerView,
  StaffView,
  PermissionView,
  SettingsView,
  ActivityLogView,
} from "./hospital-admin/views/CrmViews";

export function HospitalAdminDemo() {
  return (
    <IndustryAdminShell
      menu={MENU}
      flatMenu={FLAT_MENU}
      defaultOpenGroups={["department", "doctor", "reservation"]}
      renderContent={(activeKey, navigate) => {
        switch (activeKey) {
          case "dashboard":
            return <DashboardView />;
          case "department-list":
            return <DepartmentListView onNavigate={navigate} />;
          case "department-register":
            return <DepartmentRegisterView onNavigate={navigate} />;
          case "doctor-list":
            return <DoctorListView onNavigate={navigate} />;
          case "doctor-register":
            return <DoctorRegisterView onNavigate={navigate} />;
          case "reservation-list":
            return <ReservationListView />;
          case "reservation-calendar":
            return <ReservationCalendarView />;
          case "customer":
            return <CustomerView />;
          case "consult":
            return <ConsultView />;
          case "noncovered":
            return <NonCoveredView />;
          case "review":
            return <ReviewView />;
          case "notice":
            return <NoticeView />;
          case "banner":
            return <BannerView />;
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
