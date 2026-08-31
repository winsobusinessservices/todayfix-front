import { Route, Routes } from "react-router";
import PublicLayout from "../components/layout/PublicLayout";
import ScrollToTop from "../components/layout/ScrollToTop";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Vendor from "../pages/Vendor";
import Service from "../pages/Service";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
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
import ServiceAssignmentsTab from "../features/owner/ServiceAssignmentsTab";
import FinancialsTab from "../features/owner/FinancialsTab";
import SettingsTab from "../features/owner/SettingsTab";
import ProtectedRoute from "../components/layout/ProtectedRoute";

import AdminDashboard from "../pages/AdminDashboard";
import AdminOverviewTab from "../features/admin/AdminOverviewTab";
import AdminVerificationTab from "../features/admin/AdminVerificationTab";
import AdminRequestsTab from "../features/admin/AdminRequestsTab";
import AdminDisputesTab from "../features/admin/AdminDisputesTab";

import AdminUsersTab from "../features/admin/AdminUsersTab";
import AdminProvidersTab from "../features/admin/AdminProvidersTab";
import AdminBusinessesTab from "../features/admin/AdminBusinessesTab";
import AdminServicesTab from "../features/admin/AdminServicesTab";
import AdminCategoriesTab from "../features/admin/AdminCategoriesTab";
import AdminCitiesTab from "../features/admin/AdminCitiesTab";
import AdminReviewsTab from "../features/admin/AdminReviewsTab";
import AdminPaymentsTab from "../features/admin/AdminPaymentsTab";
import AdminPayoutsTab from "../features/admin/AdminPayoutsTab";
import AdminSubscriptionsTab from "../features/admin/AdminSubscriptionsTab";
import AdminNotificationsTab from "../features/admin/AdminNotificationsTab";
import AdminReportsTab from "../features/admin/AdminReportsTab";
import AdminSupportTab from "../features/admin/AdminSupportTab";
import AdminAuditLogTab from "../features/admin/AdminAuditLogTab";
import AdminSettingsTab from "../features/admin/AdminSettingsTab";
import VerificationPage from "../pages/VerificationPage";
import VerificationSuccess from "../pages/VerificationSuccess";
import Demo from "../pages/Demo";
import EmployeesTab from "../features/owner/EmployeesTab";

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<Service />} />
        <Route path="/vendor/:id" element={<Vendor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerificationSuccess />} />
        {/* <Route path="/otp" element={<VerificationPage/>} /> */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
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
        <Route path="/partners/:name" element={<Demo />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<ProtectedRoute allowedRoles={["USER", "BUSINESS", "ADMIN"]} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/list-business" element={<ListBusinessPage />} />
          <Route path="/list-business/documents" element={<BusinessDocumentsPage />} />
          <Route path="/verification-pending" element={<VerificationPendingPage />} />
          <Route path="/request-service" element={<RequestService />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["BUSINESS", "ADMIN"]} />}>
        <Route path="/owner-dashboard" element={<OwnerDashboard />}>
          <Route index element={<OverviewTab />} />
          <Route path="job-board" element={<JobBoardTab />} />
          <Route path="bookings" element={<BookingsTab />} />
          <Route path="services" element={<ServicesTab />} />
          <Route path="portfolio" element={<PortfolioTab />} />
          <Route path="reviews" element={<ReviewsTab />} />
          <Route path="employees" element={<EmployeesTab />} />
          <Route path="assignments" element={<ServiceAssignmentsTab />} />
          <Route path="financials" element={<FinancialsTab />} />
          <Route path="settings" element={<SettingsTab />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path="/admin" element={<AdminDashboard />}>
          {/* Main */}
          <Route index element={<AdminOverviewTab />} />
          
          {/* Management */}
          <Route path="users" element={<AdminUsersTab />} />
          <Route path="providers" element={<AdminProvidersTab />} />
          <Route path="businesses" element={<AdminBusinessesTab />} />
          <Route path="verifications" element={<AdminVerificationTab />} />
          
          {/* Operations */}
          <Route path="requests" element={<AdminRequestsTab />} />
          <Route path="services" element={<AdminServicesTab />} />
          <Route path="categories" element={<AdminCategoriesTab />} />
          <Route path="cities" element={<AdminCitiesTab />} />
          <Route path="reviews" element={<AdminReviewsTab />} />
          
          {/* Financials */}
          <Route path="payments" element={<AdminPaymentsTab />} />
          <Route path="payouts" element={<AdminPayoutsTab />} />
          <Route path="subscriptions" element={<AdminSubscriptionsTab />} />
          
          {/* System */}
          <Route path="notifications" element={<AdminNotificationsTab />} />
          <Route path="reports" element={<AdminReportsTab />} />
          <Route path="support" element={<AdminSupportTab />} />
          <Route path="disputes" element={<AdminDisputesTab />} />
          <Route path="audit-logs" element={<AdminAuditLogTab />} />
          <Route path="settings" element={<AdminSettingsTab />} />
        </Route>
      </Route>
    </Routes>
    </>
  );
}

export default AppRoutes;
