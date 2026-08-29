import { createContext, useContext, type ReactNode } from "react";
import { toast } from "sonner";
import { useLocalStorageState } from "@/lib/useLocalStorageState";
import * as M from "./mockData";
import type {
  Department,
  Doctor,
  Reservation,
  Consult,
  Customer,
  NonCoveredItem,
  Review,
  Notice,
  Banner,
  Staff,
  SiteSettings,
  ActivityLog,
} from "./types";
import { DEFAULT_SITE_SETTINGS } from "./types";

const NS = "mintcl-demo-hospital:v2";

type Ctx = {
  departments: Department[];
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;
  doctors: Doctor[];
  setDoctors: React.Dispatch<React.SetStateAction<Doctor[]>>;
  reservations: Reservation[];
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
  consults: Consult[];
  setConsults: React.Dispatch<React.SetStateAction<Consult[]>>;
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  nonCovered: NonCoveredItem[];
  setNonCovered: React.Dispatch<React.SetStateAction<NonCoveredItem[]>>;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  notices: Notice[];
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
  banners: Banner[];
  setBanners: React.Dispatch<React.SetStateAction<Banner[]>>;
  staff: Staff[];
  setStaff: React.Dispatch<React.SetStateAction<Staff[]>>;
  siteSettings: SiteSettings;
  setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  activityLog: ActivityLog[];
  logActivity: (action: string, target: string) => void;
  deleteDepartment: (id: number) => void;
  deleteDoctor: (id: number) => void;
  resetDemoData: () => void;
};

const HospitalAdminContext = createContext<Ctx | null>(null);

export function HospitalAdminProvider({ children }: { children: ReactNode }) {
  const [departments, setDepartments] = useLocalStorageState<Department[]>(`${NS}:departments`, M.INITIAL_DEPARTMENTS);
  const [doctors, setDoctors] = useLocalStorageState<Doctor[]>(`${NS}:doctors`, M.INITIAL_DOCTORS);
  const [reservations, setReservations] = useLocalStorageState<Reservation[]>(`${NS}:reservations`, M.INITIAL_RESERVATIONS);
  const [consults, setConsults] = useLocalStorageState<Consult[]>(`${NS}:consults`, M.INITIAL_CONSULTS);
  const [customers, setCustomers] = useLocalStorageState<Customer[]>(`${NS}:customers`, M.INITIAL_CUSTOMERS);
  const [nonCovered, setNonCovered] = useLocalStorageState<NonCoveredItem[]>(`${NS}:nonCovered`, M.INITIAL_NONCOVERED);
  const [reviews, setReviews] = useLocalStorageState<Review[]>(`${NS}:reviews`, M.INITIAL_REVIEWS);
  const [notices, setNotices] = useLocalStorageState<Notice[]>(`${NS}:notices`, M.INITIAL_NOTICES);
  const [banners, setBanners] = useLocalStorageState<Banner[]>(`${NS}:banners`, M.INITIAL_BANNERS);
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

  const deleteDepartment = (id: number) => {
    const target = departments.find((d) => d.id === id);
    setDepartments((prev) => prev.filter((d) => d.id !== id));
    toast.success("진료과목이 삭제되었습니다.");
    if (target) logActivity("진료과목 삭제", target.name);
  };

  const deleteDoctor = (id: number) => {
    const target = doctors.find((d) => d.id === id);
    setDoctors((prev) => prev.filter((d) => d.id !== id));
    toast.success("의료진 정보가 삭제되었습니다.");
    if (target) logActivity("의료진 삭제", target.name);
  };

  const resetDemoData = () => {
    setDepartments(M.INITIAL_DEPARTMENTS);
    setDoctors(M.INITIAL_DOCTORS);
    setReservations(M.INITIAL_RESERVATIONS);
    setConsults(M.INITIAL_CONSULTS);
    setCustomers(M.INITIAL_CUSTOMERS);
    setNonCovered(M.INITIAL_NONCOVERED);
    setReviews(M.INITIAL_REVIEWS);
    setNotices(M.INITIAL_NOTICES);
    setBanners(M.INITIAL_BANNERS);
    setStaff(M.INITIAL_STAFF);
    setSiteSettings(DEFAULT_SITE_SETTINGS);
    setActivityLog([{ id: Date.now(), time: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }), action: "데모 데이터 초기화", target: "전체" }]);
  };

  return (
    <HospitalAdminContext.Provider
      value={{
        departments, setDepartments,
        doctors, setDoctors,
        reservations, setReservations,
        consults, setConsults,
        customers, setCustomers,
        nonCovered, setNonCovered,
        reviews, setReviews,
        notices, setNotices,
        banners, setBanners,
        staff, setStaff,
        siteSettings, setSiteSettings,
        activityLog, logActivity,
        deleteDepartment, deleteDoctor,
        resetDemoData,
      }}
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
