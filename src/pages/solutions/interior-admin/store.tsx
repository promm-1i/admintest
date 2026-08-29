import { createContext, useContext, type ReactNode } from "react";
import { toast } from "sonner";
import { useLocalStorageState } from "@/lib/useLocalStorageState";
import * as M from "./mockData";
import type {
  Case,
  QuoteInquiry,
  SiteSurvey,
  Estimate,
  Contract,
  Project,
  ProcessStep,
  MaterialItem,
  Partner,
  Payment,
  AsRequest,
  Package,
  Staff,
  SiteSettings,
  ActivityLog,
} from "./types";
import { DEFAULT_SITE_SETTINGS } from "./types";

const NS = "mintcl-demo-interior:v2";

type Ctx = {
  cases: Case[];
  setCases: React.Dispatch<React.SetStateAction<Case[]>>;
  inquiries: QuoteInquiry[];
  setInquiries: React.Dispatch<React.SetStateAction<QuoteInquiry[]>>;
  surveys: SiteSurvey[];
  setSurveys: React.Dispatch<React.SetStateAction<SiteSurvey[]>>;
  estimates: Estimate[];
  setEstimates: React.Dispatch<React.SetStateAction<Estimate[]>>;
  contracts: Contract[];
  setContracts: React.Dispatch<React.SetStateAction<Contract[]>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  process: ProcessStep[];
  setProcess: React.Dispatch<React.SetStateAction<ProcessStep[]>>;
  materials: MaterialItem[];
  setMaterials: React.Dispatch<React.SetStateAction<MaterialItem[]>>;
  partners: Partner[];
  setPartners: React.Dispatch<React.SetStateAction<Partner[]>>;
  payments: Payment[];
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
  asRequests: AsRequest[];
  setAsRequests: React.Dispatch<React.SetStateAction<AsRequest[]>>;
  packages: Package[];
  setPackages: React.Dispatch<React.SetStateAction<Package[]>>;
  staff: Staff[];
  setStaff: React.Dispatch<React.SetStateAction<Staff[]>>;
  siteSettings: SiteSettings;
  setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  activityLog: ActivityLog[];
  logActivity: (action: string, target: string) => void;
  deleteCase: (id: number) => void;
  resetDemoData: () => void;
};

const InteriorAdminContext = createContext<Ctx | null>(null);

export function InteriorAdminProvider({ children }: { children: ReactNode }) {
  const [cases, setCases] = useLocalStorageState<Case[]>(`${NS}:cases`, M.INITIAL_CASES);
  const [inquiries, setInquiries] = useLocalStorageState<QuoteInquiry[]>(`${NS}:inquiries`, M.INITIAL_INQUIRIES);
  const [surveys, setSurveys] = useLocalStorageState<SiteSurvey[]>(`${NS}:surveys`, M.INITIAL_SURVEYS);
  const [estimates, setEstimates] = useLocalStorageState<Estimate[]>(`${NS}:estimates`, M.INITIAL_ESTIMATES);
  const [contracts, setContracts] = useLocalStorageState<Contract[]>(`${NS}:contracts`, M.INITIAL_CONTRACTS);
  const [projects, setProjects] = useLocalStorageState<Project[]>(`${NS}:projects`, M.INITIAL_PROJECTS);
  const [process, setProcess] = useLocalStorageState<ProcessStep[]>(`${NS}:process`, M.INITIAL_PROCESS);
  const [materials, setMaterials] = useLocalStorageState<MaterialItem[]>(`${NS}:materials`, M.INITIAL_MATERIALS);
  const [partners, setPartners] = useLocalStorageState<Partner[]>(`${NS}:partners`, M.INITIAL_PARTNERS);
  const [payments, setPayments] = useLocalStorageState<Payment[]>(`${NS}:payments`, M.INITIAL_PAYMENTS);
  const [asRequests, setAsRequests] = useLocalStorageState<AsRequest[]>(`${NS}:asRequests`, M.INITIAL_AS);
  const [packages, setPackages] = useLocalStorageState<Package[]>(`${NS}:packages`, M.INITIAL_PACKAGES);
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
    toast.success("시공 사례가 삭제되었습니다.");
    if (target) logActivity("시공 사례 삭제", target.name);
  };

  const resetDemoData = () => {
    setCases(M.INITIAL_CASES);
    setInquiries(M.INITIAL_INQUIRIES);
    setSurveys(M.INITIAL_SURVEYS);
    setEstimates(M.INITIAL_ESTIMATES);
    setContracts(M.INITIAL_CONTRACTS);
    setProjects(M.INITIAL_PROJECTS);
    setProcess(M.INITIAL_PROCESS);
    setMaterials(M.INITIAL_MATERIALS);
    setPartners(M.INITIAL_PARTNERS);
    setPayments(M.INITIAL_PAYMENTS);
    setAsRequests(M.INITIAL_AS);
    setPackages(M.INITIAL_PACKAGES);
    setStaff(M.INITIAL_STAFF);
    setSiteSettings(DEFAULT_SITE_SETTINGS);
    setActivityLog([{ id: Date.now(), time: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }), action: "데모 데이터 초기화", target: "전체" }]);
  };

  return (
    <InteriorAdminContext.Provider
      value={{
        cases, setCases,
        inquiries, setInquiries,
        surveys, setSurveys,
        estimates, setEstimates,
        contracts, setContracts,
        projects, setProjects,
        process, setProcess,
        materials, setMaterials,
        partners, setPartners,
        payments, setPayments,
        asRequests, setAsRequests,
        packages, setPackages,
        staff, setStaff,
        siteSettings, setSiteSettings,
        activityLog, logActivity,
        deleteCase,
        resetDemoData,
      }}
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
