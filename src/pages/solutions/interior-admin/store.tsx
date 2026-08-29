import { createContext, useContext, type ReactNode } from "react";
import { toast } from "sonner";
import { useLocalStorageState } from "@/lib/useLocalStorageState";
import * as M from "./mockData";
import type { Case, QuoteInquiry, Package, Staff, ActivityLog } from "./types";

const NS = "mintcl-demo-interior";

type Ctx = {
  cases: Case[];
  setCases: React.Dispatch<React.SetStateAction<Case[]>>;
  inquiries: QuoteInquiry[];
  setInquiries: React.Dispatch<React.SetStateAction<QuoteInquiry[]>>;
  packages: Package[];
  setPackages: React.Dispatch<React.SetStateAction<Package[]>>;
  staff: Staff[];
  setStaff: React.Dispatch<React.SetStateAction<Staff[]>>;
  activityLog: ActivityLog[];
  logActivity: (action: string, target: string) => void;
  deleteCase: (id: number) => void;
};

const InteriorAdminContext = createContext<Ctx | null>(null);

export function InteriorAdminProvider({ children }: { children: ReactNode }) {
  const [cases, setCases] = useLocalStorageState<Case[]>(`${NS}:cases`, M.INITIAL_CASES);
  const [inquiries, setInquiries] = useLocalStorageState<QuoteInquiry[]>(`${NS}:inquiries`, M.INITIAL_INQUIRIES);
  const [packages, setPackages] = useLocalStorageState<Package[]>(`${NS}:packages`, M.INITIAL_PACKAGES);
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
    toast.success("시공 사례가 삭제되었습니다.");
    if (target) logActivity("시공 사례 삭제", target.name);
  };

  return (
    <InteriorAdminContext.Provider
      value={{ cases, setCases, inquiries, setInquiries, packages, setPackages, staff, setStaff, activityLog, logActivity, deleteCase }}
    >
      {children}
    </InteriorAdminContext.Provider>
  );
}

export function useInteriorAdmin() {
  const ctx = useContext(InteriorAdminContext);
  if (!ctx) throw new Error("useInteriorAdmin must be used within InteriorAdminProvider");
  return ctx;
}
