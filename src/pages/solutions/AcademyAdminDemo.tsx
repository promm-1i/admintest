import { IndustryAdminShell } from "@/components/site/IndustryAdminShell";
import { MENU, FLAT_MENU } from "./academy-admin/menu";
import {
  DashboardView,
  CourseListView,
  CourseRegisterView,
  ConsultView,
  ReviewView,
  StaffView,
} from "./academy-admin/views/Views";

export function AcademyAdminDemo() {
  return (
    <IndustryAdminShell
      menu={MENU}
      flatMenu={FLAT_MENU}
      defaultOpenGroups={["course"]}
      renderContent={(activeKey, navigate) => {
        switch (activeKey) {
          case "dashboard":
            return <DashboardView />;
          case "course-list":
            return <CourseListView onNavigate={navigate} />;
          case "course-register":
            return <CourseRegisterView onNavigate={navigate} />;
          case "consult":
            return <ConsultView />;
          case "review":
            return <ReviewView />;
          case "staff":
            return <StaffView />;
          default:
            return null;
        }
      }}
    />
  );
}
