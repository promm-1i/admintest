import { IndustryAdminShell } from "@/components/site/IndustryAdminShell";
import { MENU, FLAT_MENU } from "./academy-admin/menu";
import {
  DashboardView,
  ConsultView,
  StudentView,
  EnrollmentView,
  CourseListView,
  CourseRegisterView,
  AttendanceView,
  TimetableView,
  GradeView,
  TuitionView,
} from "./academy-admin/views/Views";
import {
  TeacherListView,
  TeacherRegisterView,
  ReviewView,
  AchievementView,
  NoticeView,
  MaterialView,
  StaffView,
  PermissionView,
  SettingsView,
  ActivityLogView,
} from "./academy-admin/views/CrmViews";

export function AcademyAdminDemo() {
  return (
    <IndustryAdminShell
      menu={MENU}
      flatMenu={FLAT_MENU}
      defaultOpenGroups={["course", "teacher"]}
      renderContent={(activeKey, navigate) => {
        switch (activeKey) {
          case "dashboard":
            return <DashboardView />;
          case "consult":
            return <ConsultView />;
          case "student":
            return <StudentView />;
          case "enrollment":
            return <EnrollmentView />;
          case "course-list":
            return <CourseListView onNavigate={navigate} />;
          case "course-register":
            return <CourseRegisterView onNavigate={navigate} />;
          case "attendance":
            return <AttendanceView />;
          case "timetable":
            return <TimetableView />;
          case "grade":
            return <GradeView />;
          case "tuition":
            return <TuitionView />;
          case "teacher-list":
            return <TeacherListView onNavigate={navigate} />;
          case "teacher-register":
            return <TeacherRegisterView onNavigate={navigate} />;
          case "review":
            return <ReviewView />;
          case "achievement":
            return <AchievementView />;
          case "notice":
            return <NoticeView />;
          case "material":
            return <MaterialView />;
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
