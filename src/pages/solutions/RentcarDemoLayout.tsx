import { Outlet } from "react-router-dom";
import { RentcarAdminProvider } from "./rentcar-admin/store";

export default function RentcarDemoLayout() {
  return (
    <RentcarAdminProvider>
      <Outlet />
    </RentcarAdminProvider>
  );
}
