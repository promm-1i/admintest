import { Outlet } from "react-router-dom";
import { AcademyAdminProvider } from "./academy-admin/store";

export default function AcademyDemoLayout() {
  return (
    <AcademyAdminProvider>
      <Outlet />
    </AcademyAdminProvider>
  );
}
