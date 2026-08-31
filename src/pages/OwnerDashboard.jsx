import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  CalendarCheck,
  Wrench,
  Image as ImageIcon,
  Star,
  Wallet,
  Settings,
  LogOut,
  Bell,
  CheckCircle2,
  Menu,
  X,
  ShieldAlert,
  Users,
  UserCheck,
} from "lucide-react";
import Logo from "../components/brand/Logo";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../services/authApi";
import { useUserStore } from "../store/userStore";
import { popup } from "../components/pop-up/pop-up";

const SIDEBAR_ITEMS = [
  { id: "", label: "Overview", icon: LayoutDashboard },
  { id: "job-board", label: "Job Board", icon: Bell },
  { id: "bookings", label: "Bookings", icon: CalendarCheck },
  { id: "services", label: "Services", icon: Wrench },
  { id: "portfolio", label: "Portfolio", icon: ImageIcon },
  { id: "reviews", label: "Reviews", icon: Star },
  { id: "employees", label: "Employees", icon: Users },
  { id: "assignments", label: "Service Assignments", icon: UserCheck },
  { id: "financials", label: "Financials", icon: Wallet },
  { id: "settings", label: "Settings", icon: Settings },
];

const OwnerDashboard = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMockPopup, setShowMockPopup] = useState(false); // For simulating WebSocket ping
  const navigate = useNavigate();
  const refreshToken = useUserStore((state) => state.refreshToken);
  const clearAuth = useUserStore((state) => state.clearAuth);

  const logoMarkup = (
    <Link
      to="/owner-dashboard"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-text-primary"
    >
      <img src="tfix.png" alt="logo" width={55} height={55} />
      {/* <video src="logo-vid.mp4" autoPlay muted loop height={55} width={55} className="rounded-md"></video> */}
      <Logo />
    </Link>
  );

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: logout,
    onSuccess: (response) => {
      if (response.success) {
        navigate("/");
        clearAuth();
        popup("Logout Successful", "You've been safely logged out.", "logout");
        window.location.reload();
      }
    },
  });

  const handleLogout = () => {
    mutate(refreshToken);
  };

  return (
    <div className="bg-surface-secondary h-screen flex overflow-hidden font-sans">
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* 1. Left Side: Navigation Sidebar */}
      <aside
        className={`w-72 bg-surface-primary border-r border-border-primary flex flex-col z-50 shadow-2xl shadow-black/5 shrink-0 fixed inset-y-0 left-0 transform transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-border-primary flex justify-between items-center">
          {logoMarkup}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto styled-scrollbar p-6 space-y-2">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const targetPath = item.id
              ? `/owner-dashboard/${item.id}`
              : "/owner-dashboard";
            const isActive =
              location.pathname === targetPath ||
              (item.id === "" && location.pathname === "/owner-dashboard/");

            return (
              <Link
                key={item.label}
                to={targetPath}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 font-bold text-sm ${
                  isActive
                    ? "bg-surface-dark text-text-inverted shadow-lg scale-[0.98]"
                    : "text-zinc-500 hover:text-text-primary hover:bg-surface-secondary"
                }`}
              >
                <Icon
                  size={20}
                  className={isActive ? "text-text-inverted" : "text-zinc-400"}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-6 border-t border-border-primary">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-5 py-3.5 w-full text-left text-red-500 hover:bg-red-500/10 rounded-2xl transition-colors duration-300 font-bold text-sm cursor-pointer"
          >
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Right Side: Header + Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative w-full">
        {/* 2. Top Center: Header (Company Name & Data) */}
        <header className="bg-surface-primary border-b border-border-primary h-20 md:h-24 shrink-0 px-4 md:px-8 flex items-center justify-between z-10 shadow-sm">
          <div className="flex items-center gap-3 md:gap-4">
            <button
              className="md:hidden p-2 -ml-2 text-zinc-500 hover:text-text-primary"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full p-1 bg-border-secondary shrink-0">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=AC&backgroundColor=transparent"
                alt="Company Logo"
                className="w-full h-full rounded-full bg-surface-secondary object-cover"
              />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-black text-text-primary tracking-tight">
                AC Experts
              </h1>
              <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-zinc-500 mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Verified
                Pro Vendor
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-surface-secondary border border-border-primary flex items-center justify-center text-text-primary hover:bg-border-primary transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-text-primary rounded-full border border-surface-primary"></span>
            </button>
          </div>
        </header>

        {/* 3. Middle Part: Outlet Component */}
        <main className="flex-1 overflow-y-auto styled-scrollbar p-4 md:p-6 lg:p-10 relative h-full">
          {/* VERIFICATION LOCK SCREEN OVERLAY */}
          {/* <AnimatePresence>
            {!isVerified && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-40 bg-surface-secondary/80 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center"
              >
                <div className="w-24 h-24 bg-surface-primary border border-border-primary rounded-full flex items-center justify-center mb-6 shadow-2xl">
                  <ShieldAlert size={40} className="text-orange-500 animate-pulse" />
                </div>
                <h2 className="text-3xl font-black text-text-primary tracking-tight mb-3">
                  Account Pending Verification
                </h2>
                <p className="text-zinc-500 max-w-md mx-auto mb-8 font-medium leading-relaxed">
                  Your business documents are currently being reviewed by our Admin team. You will unlock access to the Job Board and Bookings once verified. This usually takes 24-48 hours.
                </p>
                <button 
                  className="px-8 py-4 bg-surface-primary border border-border-primary text-text-primary font-bold rounded-xl hover:bg-surface-secondary transition-colors shadow-lg"
                  onClick={() => window.location.href = 'mailto:support@todayfix.com'}
                >
                  Contact Support
                </button>
              </motion.div>
            )}
          </AnimatePresence> */}

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full max-w-6xl mx-auto"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* --- MOCK WEBSOCKET INCOMING REQUEST FULL-SCREEN MODAL --- */}
      <AnimatePresence>
        {showMockPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-surface-primary border border-border-primary shadow-2xl shadow-black/20 rounded-3xl p-8 w-full max-w-md relative overflow-hidden"
            >
              {/* Minimalist pulse background effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-zinc-500/10 rounded-full blur-3xl animate-pulse"></div>

              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-surface-secondary border border-border-primary shadow-inner rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  {/* Subtle ring animation */}
                  <div className="absolute inset-0 border border-text-primary rounded-full animate-ping opacity-20"></div>
                  <Bell size={32} className="text-text-primary" />
                </div>

                <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 animate-pulse">
                  New Service Request
                </h2>
                <h3 className="text-3xl font-black text-text-primary tracking-tight mb-2">
                  Plumbing Fixes
                </h3>
                <p className="text-sm font-medium text-zinc-500 mb-8">
                  Koramangala, Bengaluru (~3km away)
                </p>

                <div className="p-5 mb-8">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                    Guaranteed Payout
                  </p>
                  <p className="text-5xl font-black text-text-primary">₹800</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowMockPopup(false)}
                    className="flex-1 py-4 text-center bg-surface-primary border border-border-primary text-text-primary font-bold rounded-xl hover:bg-surface-secondary transition-colors cursor-pointer"
                  >
                    Decline
                  </button>
                  <Link
                    to="/owner-dashboard/job-board"
                    onClick={() => setShowMockPopup(false)}
                    className="flex-[2] py-4 text-center bg-text-primary text-surface-primary font-black rounded-xl hover:scale-[1.02] active:scale-95 transition-transform shadow-xl cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={20} />
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dev Tool: Trigger Mock Popup */}
      <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2">
        {/* <button 
            onClick={() => setIsVerified(!isVerified)}
            className={`text-[10px] font-mono px-2 py-1 rounded-md opacity-50 hover:opacity-100 transition-opacity font-bold ${isVerified ? 'bg-orange-500 text-white' : 'bg-emerald-500 text-white'}`}
            title="Toggle Verification State"
          >
            {isVerified ? "Revoke Verification" : "Verify Account"}
          </button> */}
        <button
          onClick={() => setShowMockPopup(true)}
          className="text-[10px] font-mono bg-zinc-800 text-white px-2 py-1 rounded-md opacity-50 hover:opacity-100 transition-opacity"
          title="Simulate WebSocket Ping from Admin"
        >
          Ping Websocket
        </button>
      </div>
    </div>
  );
};

export default OwnerDashboard;
