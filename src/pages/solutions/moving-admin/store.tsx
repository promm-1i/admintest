import { createContext, useContext, useState, type ReactNode } from "react";
import { toast } from "sonner";
import * as M from "./mockData";
import type { Case, QuoteInquiry, ServiceRegion, Staff, ActivityLog } from "./types";

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
  const [cases, setCases] = useState<Case[]>(M.INITIAL_CASES);
  const [inquiries, setInquiries] = useState<QuoteInquiry[]>(M.INITIAL_INQUIRIES);
  const [regions, setRegions] = useState<ServiceRegion[]>(M.INITIAL_REGIONS);
  const [staff, setStaff] = useState<Staff[]>(M.INITIAL_STAFF);
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);

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
