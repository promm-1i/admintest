import { lazy, Suspense, useEffect } from "react";
import { trackPageView } from "@/lib/analytics";
import { Route, Routes, Outlet, useLocation } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { RenewalShell, RenewalHomeBody, RenewalPriceBody, RenewalSamplesBody, RenewalContentBody, RenewalPrivacyBody } from "@/pages/RenewalEditorial";
import { organizationSchema } from "@/hooks/useStructuredData";
import "@/pages/RenewalEditorial.css";
import { MobileStickyCta } from "@/components/site/MobileStickyCta";
import { FloatingQuickActions } from "@/components/site/FloatingQuickActions";
import { Toaster } from "@/components/ui/sonner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ScrollToTop } from "@/components/ScrollToTop";
import Home from "@/pages/Home";

const About = lazy(() => import("@/pages/About"));
const IndustryIndex = lazy(() => import("@/pages/IndustryIndex"));
const IndustryLanding = lazy(() => import("@/pages/IndustryLanding"));
const Estimate = lazy(() => import("@/pages/Estimate"));
const ServiceDetail = lazy(() => import("@/pages/ServiceDetail"));
const CustomDevService = lazy(() => import("@/pages/services/CustomDevService"));
const AdminSystemService = lazy(() => import("@/pages/services/AdminSystemService"));
const InquiryReservationService = lazy(() => import("@/pages/services/InquiryReservationService"));
const SearchFilterService = lazy(() => import("@/pages/services/SearchFilterService"));
const ContentManagementService = lazy(() => import("@/pages/services/ContentManagementService"));
const DatabaseApiService = lazy(() => import("@/pages/services/DatabaseApiService"));
const ResponsiveService = lazy(() => import("@/pages/services/ResponsiveService"));
const SeoService = lazy(() => import("@/pages/services/SeoService"));
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
const RenewalEditorial = lazy(() => import("@/pages/RenewalEditorial"));

function RouteLoadingFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
      불러오는 중...
    </div>
  );
}

/**
 * 리뉴얼 디자인을 본 사이트 전체에 씌운다. 헤더·푸터는 리뉴얼 것을 쓰고
 * 안쪽 화면은 각 페이지가 그대로 그린다. 예전 껍데기로 되돌리려면
 * VITE_LEGACY_SHELL=1 로 빌드한다.
 */
const LEGACY_SHELL = import.meta.env.VITE_LEGACY_SHELL === "1";

function SiteLayout() {
  // 사업자 정보는 어느 쪽에서 들어와도 같으니 index.html 에 한 번만 심는다
  useEffect(() => {
    if (document.getElementById("noveriq-org-schema")) return;
    const node = document.createElement("script");
    node.type = "application/ld+json";
    node.id = "noveriq-org-schema";
    node.textContent = JSON.stringify(organizationSchema());
    document.head.appendChild(node);
  }, []);

  if (!LEGACY_SHELL) {
    return (
      <RenewalShell>
        <main className="flex-1">
          <Outlet />
        </main>
      </RenewalShell>
    );
  }
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

function AnalyticsPageView() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteLoadingFallback />}>
        <AnalyticsPageView />
      <Routes>
          <Route path="/renewal-editorial/*" element={<RenewalEditorial />} />
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
            <Route path="/" element={LEGACY_SHELL ? <Home /> : <RenewalHomeBody />} />
            <Route path="/about" element={<About />} />
            <Route path="/services/custom" element={LEGACY_SHELL ? <CustomDevService /> : <RenewalContentBody />} />
            <Route path="/services/admin-system" element={LEGACY_SHELL ? <AdminSystemService /> : <RenewalContentBody />} />
            <Route path="/services/inquiry-reservation" element={LEGACY_SHELL ? <InquiryReservationService /> : <RenewalContentBody />} />
            <Route path="/services/search-filter" element={LEGACY_SHELL ? <SearchFilterService /> : <RenewalContentBody />} />
            <Route path="/services/content-management" element={LEGACY_SHELL ? <ContentManagementService /> : <RenewalContentBody />} />
            <Route path="/services/database-api" element={LEGACY_SHELL ? <DatabaseApiService /> : <RenewalContentBody />} />
            <Route path="/services/responsive" element={LEGACY_SHELL ? <ResponsiveService /> : <RenewalContentBody />} />
            <Route path="/services/seo" element={LEGACY_SHELL ? <SeoService /> : <RenewalContentBody />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/web-solutions" element={<WebSolutions />} />
            <Route path="/web-solutions/demos" element={<DemoHub />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/homepage" element={<IndustryIndex />} />
            <Route path="/homepage/:key" element={<IndustryLanding />} />
            <Route path="/estimate" element={<Estimate />} />
            <Route path="/website/process" element={LEGACY_SHELL ? <ProcessLanding /> : <RenewalContentBody />} />
            <Route path="/website/price" element={LEGACY_SHELL ? <PriceLanding /> : <RenewalPriceBody />} />
            <Route path="/website/features" element={LEGACY_SHELL ? <FeaturesLanding /> : <RenewalContentBody />} />
            <Route path="/website/maintenance" element={LEGACY_SHELL ? <MaintenanceLanding /> : <RenewalContentBody />} />
            <Route path="/web-solutions/product-quotes" element={<ProductQuoteSolution />} />
            <Route path="/web-solutions/real-estate" element={<RealEstateSolution />} />
            <Route path="/web-solutions/rentcar" element={<RentcarSolution />} />
            <Route path="/web-solutions/hospital" element={<HospitalSolution />} />
            <Route path="/web-solutions/academy" element={<AcademySolution />} />
            <Route path="/web-solutions/interior" element={<InteriorSolution />} />
            <Route path="/web-solutions/moving" element={<MovingSolution />} />
            <Route path="/web-solutions/reservations" element={<ReservationSolution />} />
            <Route path="/web-solutions/platform" element={<PlatformSolution />} />
            <Route path="/samples" element={LEGACY_SHELL ? <Samples /> : <RenewalSamplesBody />} />
            <Route path="/privacy" element={<RenewalPrivacyBody />} />
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
