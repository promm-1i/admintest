import { createContext, useContext, type ReactNode } from "react";
import { toast } from "sonner";
import { useLocalStorageState } from "@/lib/useLocalStorageState";
import * as M from "./mockData";
import type { Department, ReservationInquiry, NonCoveredItem, Staff, ActivityLog } from "./types";

const NS = "mintcl-demo-hospital";

type Ctx = {
  departments: Department[];
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;
  inquiries: ReservationInquiry[];
  setInquiries: React.Dispatch<React.SetStateAction<ReservationInquiry[]>>;
  nonCovered: NonCoveredItem[];
  setNonCovered: React.Dispatch<React.SetStateAction<NonCoveredItem[]>>;
  staff: Staff[];
  setStaff: React.Dispatch<React.SetStateAction<Staff[]>>;
  activityLog: ActivityLog[];
  logActivity: (action: string, target: string) => void;
  deleteDepartment: (id: number) => void;
};

const HospitalAdminContext = createContext<Ctx | null>(null);

export function HospitalAdminProvider({ children }: { children: ReactNode }) {
  const [departments, setDepartments] = useLocalStorageState<Department[]>(`${NS}:departments`, M.INITIAL_DEPARTMENTS);
  const [inquiries, setInquiries] = useLocalStorageState<ReservationInquiry[]>(`${NS}:inquiries`, M.INITIAL_INQUIRIES);
  const [nonCovered, setNonCovered] = useLocalStorageState<NonCoveredItem[]>(`${NS}:nonCovered`, M.INITIAL_NONCOVERED);
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

  const deleteDepartment = (id: number) => {
    const target = departments.find((d) => d.id === id);
    setDepartments((prev) => prev.filter((d) => d.id !== id));
    toast.success("진료과목이 삭제되었습니다.");
    if (target) logActivity("진료과목 삭제", target.name);
  };

  return (
    <HospitalAdminContext.Provider
      value={{ departments, setDepartments, inquiries, setInquiries, nonCovered, setNonCovered, staff, setStaff, activityLog, logActivity, deleteDepartment }}
    >
      {children}
    </HospitalAdminContext.Provider>
  );
}

export function useHospitalAdmin() {
  const ctx = useContext(HospitalAdminContext);
  if (!ctx) throw new Error("useHospitalAdmin must be used within HospitalAdminProvider");
  return ctx;
}
