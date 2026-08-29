import { Outlet } from "react-router-dom";
import { InteriorAdminProvider } from "./interior-admin/store";

export default function InteriorDemoLayout() {
  return (
    <InteriorAdminProvider>
      <Outlet />
    </InteriorAdminProvider>
  );
}
