import { Route, Routes } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileStickyCta } from "@/components/site/MobileStickyCta";
import { Toaster } from "@/components/ui/sonner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ScrollToTop } from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import WebSolutions from "@/pages/WebSolutions";
import ProductQuoteSolution from "@/pages/solutions/ProductQuoteSolution";
import Samples from "@/pages/Samples";
import SampleDetail from "@/pages/SampleDetail";
import Notices from "@/pages/Notices";
import NoticeDetail from "@/pages/NoticeDetail";
import Contact from "@/pages/Contact";
import ContactStatus from "@/pages/ContactStatus";
import Auth from "@/pages/Auth";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col pb-[76px] md:pb-0">
      <ScrollToTop />
      <SiteHeader />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/web-solutions" element={<WebSolutions />} />
          <Route path="/web-solutions/product-quotes" element={<ProductQuoteSolution />} />
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
        </Routes>
      </main>
      <SiteFooter />
      <MobileStickyCta />
      <Toaster />
    </div>
  );
}
