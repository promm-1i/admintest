import { createContext, useContext, type ReactNode } from "react";
import { toast } from "sonner";
import { useLocalStorageState } from "@/lib/useLocalStorageState";
import * as M from "./mockData";
import type { Case, QuoteInquiry, ServiceRegion, Staff, ActivityLog } from "./types";

const NS = "mintcl-demo-moving";

type Ctx = {
  cases: Case[];
  setCases: React.Dispatch<React.SetStateAction<Case[]>>;
  inquiries: QuoteInquiry[];
  setInquiries: React.Dispatch<React.SetStateAction<QuoteInquiry[]>>;
  regions: ServiceRegion[];
  setRegions: React.Dispatch<React.SetStateAction<ServiceRegion[]>>;
  staff: Staff[];
  setStaff: React.Dispatch<React.SetStateAction<Staff[]>>;
  activityLog: ActivityLog[];
  logActivity: (action: string, target: string) => void;
  deleteCase: (id: number) => void;
};

const MovingAdminContext = createContext<Ctx | null>(null);

export function MovingAdminProvider({ children }: { children: ReactNode }) {
  const [cases, setCases] = useLocalStorageState<Case[]>(`${NS}:cases`, M.INITIAL_CASES);
  const [inquiries, setInquiries] = useLocalStorageState<QuoteInquiry[]>(`${NS}:inquiries`, M.INITIAL_INQUIRIES);
  const [regions, setRegions] = useLocalStorageState<ServiceRegion[]>(`${NS}:regions`, M.INITIAL_REGIONS);
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

  const deleteCase = (id: number) => {
    const target = cases.find((c) => c.id === id);
    setCases((prev) => prev.filter((c) => c.id !== id));
    toast.success("작업 사례가 삭제되었습니다.");
    if (target) logActivity("작업 사례 삭제", target.name);
  };

  return (
    <MovingAdminContext.Provider
      value={{ cases, setCases, inquiries, setInquiries, regions, setRegions, staff, setStaff, activityLog, logActivity, deleteCase }}
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
