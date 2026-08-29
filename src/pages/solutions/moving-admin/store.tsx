import { createContext, useContext, type ReactNode } from "react";
import { toast } from "sonner";
import { useLocalStorageState } from "@/lib/useLocalStorageState";
import * as M from "./mockData";
import type {
  Case,
  QuoteInquiry,
  Quote,
  Reservation,
  Team,
  Vehicle,
  WorkStatus,
  Payment,
  Service,
  ServiceRegion,
  Review,
  Claim,
  Staff,
  SiteSettings,
  ActivityLog,
} from "./types";
import { DEFAULT_SITE_SETTINGS } from "./types";

const NS = "mintcl-demo-moving:v2";

type Ctx = {
  cases: Case[];
  setCases: React.Dispatch<React.SetStateAction<Case[]>>;
  inquiries: QuoteInquiry[];
  setInquiries: React.Dispatch<React.SetStateAction<QuoteInquiry[]>>;
  quotes: Quote[];
  setQuotes: React.Dispatch<React.SetStateAction<Quote[]>>;
  reservations: Reservation[];
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
  teams: Team[];
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  vehicles: Vehicle[];
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
  workStatus: WorkStatus[];
  setWorkStatus: React.Dispatch<React.SetStateAction<WorkStatus[]>>;
  payments: Payment[];
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  regions: ServiceRegion[];
  setRegions: React.Dispatch<React.SetStateAction<ServiceRegion[]>>;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  claims: Claim[];
  setClaims: React.Dispatch<React.SetStateAction<Claim[]>>;
  staff: Staff[];
  setStaff: React.Dispatch<React.SetStateAction<Staff[]>>;
  siteSettings: SiteSettings;
  setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  activityLog: ActivityLog[];
  logActivity: (action: string, target: string) => void;
  deleteCase: (id: number) => void;
  resetDemoData: () => void;
};

const MovingAdminContext = createContext<Ctx | null>(null);

export function MovingAdminProvider({ children }: { children: ReactNode }) {
  const [cases, setCases] = useLocalStorageState<Case[]>(`${NS}:cases`, M.INITIAL_CASES);
  const [inquiries, setInquiries] = useLocalStorageState<QuoteInquiry[]>(`${NS}:inquiries`, M.INITIAL_INQUIRIES);
  const [quotes, setQuotes] = useLocalStorageState<Quote[]>(`${NS}:quotes`, M.INITIAL_QUOTES);
  const [reservations, setReservations] = useLocalStorageState<Reservation[]>(`${NS}:reservations`, M.INITIAL_RESERVATIONS);
  const [teams, setTeams] = useLocalStorageState<Team[]>(`${NS}:teams`, M.INITIAL_TEAMS);
  const [vehicles, setVehicles] = useLocalStorageState<Vehicle[]>(`${NS}:vehicles`, M.INITIAL_VEHICLES);
  const [workStatus, setWorkStatus] = useLocalStorageState<WorkStatus[]>(`${NS}:workStatus`, M.INITIAL_WORK_STATUS);
  const [payments, setPayments] = useLocalStorageState<Payment[]>(`${NS}:payments`, M.INITIAL_PAYMENTS);
  const [services, setServices] = useLocalStorageState<Service[]>(`${NS}:services`, M.INITIAL_SERVICES);
  const [regions, setRegions] = useLocalStorageState<ServiceRegion[]>(`${NS}:regions`, M.INITIAL_REGIONS);
  const [reviews, setReviews] = useLocalStorageState<Review[]>(`${NS}:reviews`, M.INITIAL_REVIEWS);
  const [claims, setClaims] = useLocalStorageState<Claim[]>(`${NS}:claims`, M.INITIAL_CLAIMS);
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

  const deleteCase = (id: number) => {
    const target = cases.find((c) => c.id === id);
    setCases((prev) => prev.filter((c) => c.id !== id));
    toast.success("작업 사례가 삭제되었습니다.");
    if (target) logActivity("작업 사례 삭제", target.name);
  };

  const resetDemoData = () => {
    setCases(M.INITIAL_CASES);
    setInquiries(M.INITIAL_INQUIRIES);
    setQuotes(M.INITIAL_QUOTES);
    setReservations(M.INITIAL_RESERVATIONS);
    setTeams(M.INITIAL_TEAMS);
    setVehicles(M.INITIAL_VEHICLES);
    setWorkStatus(M.INITIAL_WORK_STATUS);
    setPayments(M.INITIAL_PAYMENTS);
    setServices(M.INITIAL_SERVICES);
    setRegions(M.INITIAL_REGIONS);
    setReviews(M.INITIAL_REVIEWS);
    setClaims(M.INITIAL_CLAIMS);
    setStaff(M.INITIAL_STAFF);
    setSiteSettings(DEFAULT_SITE_SETTINGS);
    setActivityLog([{ id: Date.now(), time: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }), action: "데모 데이터 초기화", target: "전체" }]);
  };

  return (
    <MovingAdminContext.Provider
      value={{
        cases, setCases,
        inquiries, setInquiries,
        quotes, setQuotes,
        reservations, setReservations,
        teams, setTeams,
        vehicles, setVehicles,
        workStatus, setWorkStatus,
        payments, setPayments,
        services, setServices,
        regions, setRegions,
        reviews, setReviews,
        claims, setClaims,
        staff, setStaff,
        siteSettings, setSiteSettings,
        activityLog, logActivity,
        deleteCase,
        resetDemoData,
      }}
    >
      {children}
    </MovingAdminContext.Provider>
  );
}

export function useMovingAdmin() {
  const ctx = useContext(MovingAdminContext);
  if (!ctx) throw new Error("useMovingAdmin must be used within MovingAdminProvider");
  return ctx;
}
