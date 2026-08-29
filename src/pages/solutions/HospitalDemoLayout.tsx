import { Outlet } from "react-router-dom";
import { HospitalAdminProvider } from "./hospital-admin/store";

export default function HospitalDemoLayout() {
  return (
    <HospitalAdminProvider>
      <Outlet />
    </HospitalAdminProvider>
  );
}
