import { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import PublicLayout from "./pages/PublicLayout";
import Home from "./pages/Home";
import { motion, AnimatePresence } from "framer-motion";
import Services from "./pages/Services";
import Vendor from "./pages/Vendor";
import Service from "./pages/Service";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pricing from "./pages/Pricing";
import Area from "./pages/Area";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import ListBusinessPage from "./pages/ListBusinessPage";
import BusinessDocumentsPage from "./pages/BusinessDocumentsPage";
import VerificationPendingPage from "./pages/VerificationPendingPage";
import OwnerDashboard from "./pages/OwnerDashboard";
import RequestService from "./pages/RequestService";
import Profile from "./pages/Profile";
import ProfileRequests from "./components/ProfileRequests";
import JobBoardTab from "./components/owner/JobBoardTab";

import OverviewTab from "./components/owner/OverviewTab";
import BookingsTab from "./components/owner/BookingsTab";
import ServicesTab from "./components/owner/ServicesTab";
import PortfolioTab from "./components/owner/PortfolioTab";
import ReviewsTab from "./components/owner/ReviewsTab";
import FinancialsTab from "./components/owner/FinancialsTab";
import SettingsTab from "./components/owner/SettingsTab";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide the loader after the internal animation finishes (~2.5s)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
            }}
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/loader" element={<LoadingScreen />} /> */}
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<Service />} />
          <Route path="/vendor/:id" element={<Vendor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/cities/:slug" element={<Area />} />
          <Route path="/about" element={<AboutUs />} />
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
    </>
  );
}

export default App;
