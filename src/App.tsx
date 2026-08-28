import { lazy, Suspense } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileStickyCta } from "@/components/site/MobileStickyCta";
import { Toaster } from "@/components/ui/sonner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ScrollToTop } from "@/components/ScrollToTop";
import Home from "@/pages/Home";

const About = lazy(() => import("@/pages/About"));
const Services = lazy(() => import("@/pages/Services"));
const WebSolutions = lazy(() => import("@/pages/WebSolutions"));
const ProductQuoteSolution = lazy(() => import("@/pages/solutions/ProductQuoteSolution"));
const RealEstateSolution = lazy(() => import("@/pages/solutions/RealEstateSolution"));
const RealEstateAdminDemoPage = lazy(() => import("@/pages/solutions/RealEstateAdminDemoPage"));
const ReservationSolution = lazy(() => import("@/pages/solutions/ReservationSolution"));
const PlatformSolution = lazy(() => import("@/pages/solutions/PlatformSolution"));
const Samples = lazy(() => import("@/pages/Samples"));
const SampleDetail = lazy(() => import("@/pages/SampleDetail"));
const Notices = lazy(() => import("@/pages/Notices"));
const NoticeDetail = lazy(() => import("@/pages/NoticeDetail"));
const Contact = lazy(() => import("@/pages/Contact"));
const ContactStatus = lazy(() => import("@/pages/ContactStatus"));
const Auth = lazy(() => import("@/pages/Auth"));
const Admin = lazy(() => import("@/pages/Admin"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function RouteLoadingFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
      불러오는 중...
    </div>
  );
}

function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col pb-[76px] md:pb-0">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <MobileStickyCta />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          <Route path="/web-solutions/real-estate/demo" element={<RealEstateAdminDemoPage />} />
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/web-solutions" element={<WebSolutions />} />
            <Route path="/web-solutions/product-quotes" element={<ProductQuoteSolution />} />
            <Route path="/web-solutions/real-estate" element={<RealEstateSolution />} />
            <Route path="/web-solutions/reservations" element={<ReservationSolution />} />
            <Route path="/web-solutions/platform" element={<PlatformSolution />} />
            <Route path="/samples" element={<Samples />} />
            <Route path="/samples/:slug" element={<SampleDetail />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/notices/:noticeId" element={<NoticeDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact/status/:token" element={<ContactStatus />} />
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
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}
