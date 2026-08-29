import { lazy, Suspense } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileStickyCta } from "@/components/site/MobileStickyCta";
import { FloatingQuickActions } from "@/components/site/FloatingQuickActions";
import { Toaster } from "@/components/ui/sonner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ScrollToTop } from "@/components/ScrollToTop";
import Home from "@/pages/Home";

const About = lazy(() => import("@/pages/About"));
const ServiceDetail = lazy(() => import("@/pages/ServiceDetail"));
const AdminSystemService = lazy(() => import("@/pages/services/AdminSystemService"));
const WebSolutions = lazy(() => import("@/pages/WebSolutions"));
const DemoHub = lazy(() => import("@/pages/solutions/DemoHub"));
const Templates = lazy(() => import("@/pages/Templates"));
const ProcessLanding = lazy(() => import("@/pages/website/ProcessLanding"));
const PriceLanding = lazy(() => import("@/pages/website/PriceLanding"));
const FeaturesLanding = lazy(() => import("@/pages/website/FeaturesLanding"));
const MaintenanceLanding = lazy(() => import("@/pages/website/MaintenanceLanding"));
const ProductQuoteSolution = lazy(() => import("@/pages/solutions/ProductQuoteSolution"));
const RealEstateSolution = lazy(() => import("@/pages/solutions/RealEstateSolution"));
const RealEstateDemoLayout = lazy(() => import("@/pages/solutions/RealEstateDemoLayout"));
const RealEstateAdminDemoPage = lazy(() => import("@/pages/solutions/RealEstateAdminDemoPage"));
const RealEstateCustomerSitePage = lazy(() => import("@/pages/solutions/RealEstateCustomerSitePage"));
const RentcarSolution = lazy(() => import("@/pages/solutions/RentcarSolution"));
const RentcarDemoLayout = lazy(() => import("@/pages/solutions/RentcarDemoLayout"));
const RentcarAdminDemoPage = lazy(() => import("@/pages/solutions/RentcarAdminDemoPage"));
const RentcarCustomerSitePage = lazy(() => import("@/pages/solutions/RentcarCustomerSitePage"));
const HospitalSolution = lazy(() => import("@/pages/solutions/HospitalSolution"));
const HospitalDemoLayout = lazy(() => import("@/pages/solutions/HospitalDemoLayout"));
const HospitalAdminDemoPage = lazy(() => import("@/pages/solutions/HospitalAdminDemoPage"));
const HospitalCustomerSitePage = lazy(() => import("@/pages/solutions/HospitalCustomerSitePage"));
const AcademySolution = lazy(() => import("@/pages/solutions/AcademySolution"));
const AcademyDemoLayout = lazy(() => import("@/pages/solutions/AcademyDemoLayout"));
const AcademyAdminDemoPage = lazy(() => import("@/pages/solutions/AcademyAdminDemoPage"));
const AcademyCustomerSitePage = lazy(() => import("@/pages/solutions/AcademyCustomerSitePage"));
const InteriorSolution = lazy(() => import("@/pages/solutions/InteriorSolution"));
const InteriorDemoLayout = lazy(() => import("@/pages/solutions/InteriorDemoLayout"));
const InteriorAdminDemoPage = lazy(() => import("@/pages/solutions/InteriorAdminDemoPage"));
const InteriorCustomerSitePage = lazy(() => import("@/pages/solutions/InteriorCustomerSitePage"));
const MovingSolution = lazy(() => import("@/pages/solutions/MovingSolution"));
const MovingDemoLayout = lazy(() => import("@/pages/solutions/MovingDemoLayout"));
const MovingAdminDemoPage = lazy(() => import("@/pages/solutions/MovingAdminDemoPage"));
const MovingCustomerSitePage = lazy(() => import("@/pages/solutions/MovingCustomerSitePage"));
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
const FAQ = lazy(() => import("@/pages/FAQ"));
const Blog = lazy(() => import("@/pages/Blog"));
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
      <FloatingQuickActions />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          <Route path="/web-solutions/real-estate/demo" element={<RealEstateDemoLayout />}>
            <Route index element={<RealEstateAdminDemoPage />} />
            <Route path="site" element={<RealEstateCustomerSitePage />} />
          </Route>
          <Route path="/web-solutions/rentcar/demo" element={<RentcarDemoLayout />}>
            <Route index element={<RentcarAdminDemoPage />} />
            <Route path="site" element={<RentcarCustomerSitePage />} />
          </Route>
          <Route path="/web-solutions/hospital/demo" element={<HospitalDemoLayout />}>
            <Route index element={<HospitalAdminDemoPage />} />
            <Route path="site" element={<HospitalCustomerSitePage />} />
          </Route>
          <Route path="/web-solutions/academy/demo" element={<AcademyDemoLayout />}>
            <Route index element={<AcademyAdminDemoPage />} />
            <Route path="site" element={<AcademyCustomerSitePage />} />
          </Route>
          <Route path="/web-solutions/interior/demo" element={<InteriorDemoLayout />}>
            <Route index element={<InteriorAdminDemoPage />} />
            <Route path="site" element={<InteriorCustomerSitePage />} />
          </Route>
          <Route path="/web-solutions/moving/demo" element={<MovingDemoLayout />}>
            <Route index element={<MovingAdminDemoPage />} />
            <Route path="site" element={<MovingCustomerSitePage />} />
          </Route>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services/admin-system" element={<AdminSystemService />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/web-solutions" element={<WebSolutions />} />
            <Route path="/web-solutions/demos" element={<DemoHub />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/website/process" element={<ProcessLanding />} />
            <Route path="/website/price" element={<PriceLanding />} />
            <Route path="/website/features" element={<FeaturesLanding />} />
            <Route path="/website/maintenance" element={<MaintenanceLanding />} />
            <Route path="/web-solutions/product-quotes" element={<ProductQuoteSolution />} />
            <Route path="/web-solutions/real-estate" element={<RealEstateSolution />} />
            <Route path="/web-solutions/rentcar" element={<RentcarSolution />} />
            <Route path="/web-solutions/hospital" element={<HospitalSolution />} />
            <Route path="/web-solutions/academy" element={<AcademySolution />} />
            <Route path="/web-solutions/interior" element={<InteriorSolution />} />
            <Route path="/web-solutions/moving" element={<MovingSolution />} />
            <Route path="/web-solutions/reservations" element={<ReservationSolution />} />
            <Route path="/web-solutions/platform" element={<PlatformSolution />} />
            <Route path="/samples" element={<Samples />} />
            <Route path="/samples/:slug" element={<SampleDetail />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/notices/:noticeId" element={<NoticeDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact/status/:token" element={<ContactStatus />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
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
