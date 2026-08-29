import { Outlet } from "react-router-dom";
import { MovingAdminProvider } from "./moving-admin/store";

export default function MovingDemoLayout() {
  return (
    <MovingAdminProvider>
      <Outlet />
    </MovingAdminProvider>
  );
}
