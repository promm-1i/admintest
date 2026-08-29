import { createContext, useContext, type ReactNode } from "react";
import { toast } from "sonner";
import { useLocalStorageState } from "@/lib/useLocalStorageState";
import * as M from "./mockData";
import type {
  Course,
  Consult,
  Student,
  Enrollment,
  Attendance,
  Grade,
  Tuition,
  Teacher,
  Review,
  Achievement,
  Notice,
  Material,
  Staff,
  SiteSettings,
  ActivityLog,
} from "./types";
import { DEFAULT_SITE_SETTINGS } from "./types";

const NS = "mintcl-demo-academy:v2";

type Ctx = {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  consults: Consult[];
  setConsults: React.Dispatch<React.SetStateAction<Consult[]>>;
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  enrollments: Enrollment[];
  setEnrollments: React.Dispatch<React.SetStateAction<Enrollment[]>>;
  attendance: Attendance[];
  setAttendance: React.Dispatch<React.SetStateAction<Attendance[]>>;
  grades: Grade[];
  setGrades: React.Dispatch<React.SetStateAction<Grade[]>>;
  tuition: Tuition[];
  setTuition: React.Dispatch<React.SetStateAction<Tuition[]>>;
  teachers: Teacher[];
  setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  achievements: Achievement[];
  setAchievements: React.Dispatch<React.SetStateAction<Achievement[]>>;
  notices: Notice[];
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
  materials: Material[];
  setMaterials: React.Dispatch<React.SetStateAction<Material[]>>;
  staff: Staff[];
  setStaff: React.Dispatch<React.SetStateAction<Staff[]>>;
  siteSettings: SiteSettings;
  setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  activityLog: ActivityLog[];
  logActivity: (action: string, target: string) => void;
  deleteCourse: (id: number) => void;
  deleteTeacher: (id: number) => void;
  resetDemoData: () => void;
};

const AcademyAdminContext = createContext<Ctx | null>(null);

export function AcademyAdminProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useLocalStorageState<Course[]>(`${NS}:courses`, M.INITIAL_COURSES);
  const [consults, setConsults] = useLocalStorageState<Consult[]>(`${NS}:consults`, M.INITIAL_CONSULTS);
  const [students, setStudents] = useLocalStorageState<Student[]>(`${NS}:students`, M.INITIAL_STUDENTS);
  const [enrollments, setEnrollments] = useLocalStorageState<Enrollment[]>(`${NS}:enrollments`, M.INITIAL_ENROLLMENTS);
  const [attendance, setAttendance] = useLocalStorageState<Attendance[]>(`${NS}:attendance`, M.INITIAL_ATTENDANCE);
  const [grades, setGrades] = useLocalStorageState<Grade[]>(`${NS}:grades`, M.INITIAL_GRADES);
  const [tuition, setTuition] = useLocalStorageState<Tuition[]>(`${NS}:tuition`, M.INITIAL_TUITION);
  const [teachers, setTeachers] = useLocalStorageState<Teacher[]>(`${NS}:teachers`, M.INITIAL_TEACHERS);
  const [reviews, setReviews] = useLocalStorageState<Review[]>(`${NS}:reviews`, M.INITIAL_REVIEWS);
  const [achievements, setAchievements] = useLocalStorageState<Achievement[]>(`${NS}:achievements`, M.INITIAL_ACHIEVEMENTS);
  const [notices, setNotices] = useLocalStorageState<Notice[]>(`${NS}:notices`, M.INITIAL_NOTICES);
  const [materials, setMaterials] = useLocalStorageState<Material[]>(`${NS}:materials`, M.INITIAL_MATERIALS);
  const [staff, setStaff] = useLocalStorageState<Staff[]>(`${NS}:staff`, M.INITIAL_STAFF);
  const [siteSettings, setSiteSettings] = useLocalStorageState<SiteSettings>(`${NS}:siteSettings`, DEFAULT_SITE_SETTINGS);
  const [activityLog, setActivityLog] = useLocalStorageState<ActivityLog[]>(`${NS}:activityLog`, []);

  const logActivity = (action: string, target: string) => {
    setActivityLog((prev) =>
      [
        { id: Date.now(), time: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }), action, target },
        ...prev,
      ].slice(0, 20),
    );
  };

  const deleteCourse = (id: number) => {
    const target = courses.find((c) => c.id === id);
    setCourses((prev) => prev.filter((c) => c.id !== id));
    toast.success("강의가 삭제되었습니다.");
    if (target) logActivity("강의 삭제", target.name);
  };

  const deleteTeacher = (id: number) => {
    const target = teachers.find((t) => t.id === id);
    setTeachers((prev) => prev.filter((t) => t.id !== id));
    toast.success("강사 정보가 삭제되었습니다.");
    if (target) logActivity("강사 삭제", target.name);
  };

  const resetDemoData = () => {
    setCourses(M.INITIAL_COURSES);
    setConsults(M.INITIAL_CONSULTS);
    setStudents(M.INITIAL_STUDENTS);
    setEnrollments(M.INITIAL_ENROLLMENTS);
    setAttendance(M.INITIAL_ATTENDANCE);
    setGrades(M.INITIAL_GRADES);
    setTuition(M.INITIAL_TUITION);
    setTeachers(M.INITIAL_TEACHERS);
    setReviews(M.INITIAL_REVIEWS);
    setAchievements(M.INITIAL_ACHIEVEMENTS);
    setNotices(M.INITIAL_NOTICES);
    setMaterials(M.INITIAL_MATERIALS);
    setStaff(M.INITIAL_STAFF);
    setSiteSettings(DEFAULT_SITE_SETTINGS);
    setActivityLog([{ id: Date.now(), time: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }), action: "데모 데이터 초기화", target: "전체" }]);
  };

  return (
    <AcademyAdminContext.Provider
      value={{
        courses, setCourses,
        consults, setConsults,
        students, setStudents,
        enrollments, setEnrollments,
        attendance, setAttendance,
        grades, setGrades,
        tuition, setTuition,
        teachers, setTeachers,
        reviews, setReviews,
        achievements, setAchievements,
        notices, setNotices,
        materials, setMaterials,
        staff, setStaff,
        siteSettings, setSiteSettings,
        activityLog, logActivity,
        deleteCourse, deleteTeacher,
        resetDemoData,
      }}
    >
      {children}
    </AcademyAdminContext.Provider>
  );
}

export function useAcademyAdmin() {
  const ctx = useContext(AcademyAdminContext);
  if (!ctx) throw new Error("useAcademyAdmin must be used within AcademyAdminProvider");
  return ctx;
}
