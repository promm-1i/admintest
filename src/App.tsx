import { Route, Routes } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Toaster } from "@/components/ui/sonner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Gallery from "@/pages/Gallery";
import Notices from "@/pages/Notices";
import NoticeDetail from "@/pages/NoticeDetail";
import Reserve from "@/pages/Reserve";
import Auth from "@/pages/Auth";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/notices/:noticeId" element={<NoticeDetail />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
      <Toaster />
    </div>
  );
}
