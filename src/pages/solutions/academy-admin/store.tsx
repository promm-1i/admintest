import { createContext, useContext, type ReactNode } from "react";
import { toast } from "sonner";
import { useLocalStorageState } from "@/lib/useLocalStorageState";
import * as M from "./mockData";
import type { Course, ConsultInquiry, Review, Staff, ActivityLog } from "./types";

const NS = "mintcl-demo-academy";

type Ctx = {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  inquiries: ConsultInquiry[];
  setInquiries: React.Dispatch<React.SetStateAction<ConsultInquiry[]>>;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  staff: Staff[];
  setStaff: React.Dispatch<React.SetStateAction<Staff[]>>;
  activityLog: ActivityLog[];
  logActivity: (action: string, target: string) => void;
  deleteCourse: (id: number) => void;
};

const AcademyAdminContext = createContext<Ctx | null>(null);

export function AcademyAdminProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useLocalStorageState<Course[]>(`${NS}:courses`, M.INITIAL_COURSES);
  const [inquiries, setInquiries] = useLocalStorageState<ConsultInquiry[]>(`${NS}:inquiries`, M.INITIAL_INQUIRIES);
  const [reviews, setReviews] = useLocalStorageState<Review[]>(`${NS}:reviews`, M.INITIAL_REVIEWS);
  const [staff, setStaff] = useLocalStorageState<Staff[]>(`${NS}:staff`, M.INITIAL_STAFF);
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

  return (
    <AcademyAdminContext.Provider
      value={{ courses, setCourses, inquiries, setInquiries, reviews, setReviews, staff, setStaff, activityLog, logActivity, deleteCourse }}
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
