import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, Outlet, useLocation } from "react-router";
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
} from "lucide-react";
import Logo from "../components/logo/Logo";

const SIDEBAR_ITEMS = [
  { id: "", label: "Overview", icon: LayoutDashboard },
  { id: "bookings", label: "Bookings", icon: CalendarCheck },
  { id: "services", label: "Services", icon: Wrench },
  { id: "portfolio", label: "Portfolio", icon: ImageIcon },
  { id: "reviews", label: "Reviews", icon: Star },
  { id: "financials", label: "Financials", icon: Wallet },
  { id: "settings", label: "Settings", icon: Settings },
];

const OwnerDashboard = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <button className="flex items-center gap-4 px-5 py-3.5 w-full text-left text-red-500 hover:bg-red-500/10 rounded-2xl transition-colors duration-300 font-bold text-sm">
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
              <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-zinc-500">
                <CheckCircle2 className="w-3 h-3 text-green-500" /> Verified Pro
                Vendor
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
    </div>
  );
};

export default OwnerDashboard;
