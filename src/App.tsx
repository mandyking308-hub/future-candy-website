import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Journal from "./pages/Journal";
import Collab from "./pages/Collab";
import ContactPage from "./pages/ContactPage";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DigitalLicensing from "./pages/DigitalLicensing";
import ModernSlavery from "./pages/ModernSlavery";
import RefundPolicy from "./pages/RefundPolicy";
import CookiesPolicy from "./pages/CookiesPolicy";
import GlobalLicensing from "./pages/GlobalLicensing";
import MultilingualRights from "./pages/MultilingualRights";
import NotFound from "./pages/NotFound";
import AdminManual from "./pages/AdminManual";
import AdminQAReport from "./pages/AdminQAReport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/collab" element={<Collab />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/digital-licensing" element={<DigitalLicensing />} />
          <Route path="/modern-slavery" element={<ModernSlavery />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/cookies" element={<CookiesPolicy />} />
          <Route path="/global-licensing" element={<GlobalLicensing />} />
          <Route path="/multilingual-rights" element={<MultilingualRights />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/manual" element={<AdminManual />} />
          <Route path="/admin/qa-report" element={<AdminQAReport />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
