import { createContext, useContext, useState, type ReactNode } from "react";
import { toast } from "sonner";
import * as M from "./mockData";
import type { Vehicle, RentalInquiry, Notice, Staff, ActivityLog } from "./types";

type Ctx = {
  vehicles: Vehicle[];
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
  inquiries: RentalInquiry[];
  setInquiries: React.Dispatch<React.SetStateAction<RentalInquiry[]>>;
  notices: Notice[];
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
  staff: Staff[];
  setStaff: React.Dispatch<React.SetStateAction<Staff[]>>;
  activityLog: ActivityLog[];
  logActivity: (action: string, target: string) => void;
  deleteVehicle: (id: number) => void;
};

const RentcarAdminContext = createContext<Ctx | null>(null);

export function RentcarAdminProvider({ children }: { children: ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(M.INITIAL_VEHICLES);
  const [inquiries, setInquiries] = useState<RentalInquiry[]>(M.INITIAL_INQUIRIES);
  const [notices, setNotices] = useState<Notice[]>(M.INITIAL_NOTICES);
  const [staff, setStaff] = useState<Staff[]>(M.INITIAL_STAFF);
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);

  const logActivity = (action: string, target: string) => {
    setActivityLog((prev) =>
      [
        {
          id: Date.now(),
          time: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
          action,
          target,
        },
        ...prev,
      ].slice(0, 20),
    );
  };

  const deleteVehicle = (id: number) => {
    const target = vehicles.find((v) => v.id === id);
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    toast.success("차량이 삭제되었습니다.");
    if (target) logActivity("차량 삭제", target.name);
  };

  return (
    <RentcarAdminContext.Provider
      value={{
        vehicles,
        setVehicles,
        inquiries,
        setInquiries,
        notices,
        setNotices,
        staff,
        setStaff,
        activityLog,
        logActivity,
        deleteVehicle,
      }}
    >
      {children}
    </RentcarAdminContext.Provider>
  );
}

export function useRentcarAdmin() {
  const ctx = useContext(RentcarAdminContext);
  if (!ctx) throw new Error("useRentcarAdmin must be used within RentcarAdminProvider");
  return ctx;
}
