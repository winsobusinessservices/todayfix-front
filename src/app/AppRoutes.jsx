import { Route, Routes } from "react-router";
import PublicLayout from "../components/layout/PublicLayout";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Vendor from "../pages/Vendor";
import Service from "../pages/Service";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Pricing from "../pages/Pricing";
import Area from "../pages/Area";
import AboutUs from "../pages/AboutUs";
import NotFound from "../pages/NotFound";
import ListBusinessPage from "../pages/ListBusinessPage";
import BusinessDocumentsPage from "../pages/BusinessDocumentsPage";
import VerificationPendingPage from "../pages/VerificationPendingPage";
import OwnerDashboard from "../pages/OwnerDashboard";
import RequestService from "../pages/RequestService";
import Profile from "../pages/Profile";
import Careers from "../pages/Careers";
import Blog from "../pages/Blog";
import Contact from "../pages/Contact";
import Partner from "../pages/Partner";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
import CancellationPolicy from "../pages/CancellationPolicy";
import RefundPolicy from "../pages/RefundPolicy";
import Safety from "../pages/Safety";
import BecomeProfessional from "../pages/BecomeProfessional";
import HelpCenter from "../pages/HelpCenter";
import FAQPage from "../pages/FAQPage";
import ProFAQ from "../pages/ProFAQ";

import JobBoardTab from "../features/owner/JobBoardTab";
import OverviewTab from "../features/owner/OverviewTab";
import BookingsTab from "../features/owner/BookingsTab";
import ServicesTab from "../features/owner/ServicesTab";
import PortfolioTab from "../features/owner/PortfolioTab";
import ReviewsTab from "../features/owner/ReviewsTab";
import FinancialsTab from "../features/owner/FinancialsTab";
import SettingsTab from "../features/owner/SettingsTab";
import ProtectedRoute from "../components/layout/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<Service />} />
        <Route path="/vendor/:id" element={<Vendor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/cities/:slug" element={<Area />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cancellation-policy" element={<CancellationPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/become-a-professional" element={<BecomeProfessional />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/professionals/faq" element={<ProFAQ />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<ProtectedRoute allowedRoles={["USER", "OWNER"]} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/list-business" element={<ListBusinessPage />} />
          <Route path="/list-business/documents" element={<BusinessDocumentsPage />} />
          <Route path="/verification-pending" element={<VerificationPendingPage />} />
          <Route path="/request-service" element={<RequestService />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["OWNER"]} />}>
        <Route path="/owner-dashboard" element={<OwnerDashboard />}>
          <Route index element={<OverviewTab />} />
          <Route path="job-board" element={<JobBoardTab />} />
          <Route path="bookings" element={<BookingsTab />} />
          <Route path="services" element={<ServicesTab />} />
          <Route path="portfolio" element={<PortfolioTab />} />
          <Route path="reviews" element={<ReviewsTab />} />
          <Route path="financials" element={<FinancialsTab />} />
          <Route path="settings" element={<SettingsTab />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
