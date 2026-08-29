import { Outlet } from "react-router-dom";
import { RealEstateAdminProvider } from "./real-estate-admin/store";

export default function RealEstateDemoLayout() {
  return (
    <RealEstateAdminProvider>
      <Outlet />
    </RealEstateAdminProvider>
  );
}
