import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard, Users, Briefcase, Store, ClipboardList,
  Wrench, FolderTree, MapPin, Star, CreditCard, Banknote,
  Repeat, Bell, BarChart3, LifeBuoy, Shield, Settings,
  LogOut, Menu, Search, Command
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../components/brand/Logo";

const SIDEBAR_SECTIONS = [
  {
    label: "Main",
    items: [
      { id: "", label: "Overview", icon: LayoutDashboard },
    ]
  },
  {
    label: "Management",
    items: [
      { id: "users", label: "Users", icon: Users },
      { id: "providers", label: "Providers", icon: Briefcase },
      { id: "businesses", label: "Businesses", icon: Store },
      { id: "verifications", label: "Verifications", icon: Shield },
    ]
  },
  {
    label: "Operations",
    items: [
      { id: "requests", label: "Service Requests", icon: ClipboardList },
      { id: "services", label: "Services", icon: Wrench },
      { id: "categories", label: "Categories", icon: FolderTree },
      { id: "cities", label: "Cities & Locations", icon: MapPin },
      { id: "reviews", label: "Reviews", icon: Star },
    ]
  },
  {
    label: "Financials",
    items: [
      { id: "payments", label: "Payments", icon: CreditCard },
      { id: "payouts", label: "Payouts", icon: Banknote },
      { id: "subscriptions", label: "Subscriptions", icon: Repeat },
    ]
  },
  {
    label: "System",
    items: [
      { id: "notifications", label: "Notifications", icon: Bell },
      { id: "reports", label: "Reports & Analytics", icon: BarChart3 },
      { id: "support", label: "Support & Disputes", icon: LifeBuoy },
      { id: "audit-logs", label: "Audit Logs", icon: Shield },
      { id: "settings", label: "Settings", icon: Settings },
    ]
  }
];

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Global Search keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const logoMarkup = (
    <Link to="/admin" className="relative z-20 flex items-center space-x-2 text-sm font-normal text-text-primary">
      <img src="/tfix.png" alt="logo" width={45} height={45} />
      <Logo />
    </Link>
  );

  return (
    <div className="bg-surface-secondary h-screen flex overflow-hidden font-sans">
      <Toaster position="top-right" toastOptions={{ style: { background: '#18181b', color: '#fff', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold' } }} />
      {/* Global Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-start justify-center pt-24 px-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-primary w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-border-primary"
            >
              <div className="p-4 border-b border-border-primary flex items-center gap-3">
                <Search className="w-5 h-5 text-zinc-400" />
                <input 
                  type="text" 
                  autoFocus 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users, providers, requests, or payments..." 
                  className="flex-1 bg-transparent border-none outline-none text-lg text-text-primary placeholder-zinc-400"
                />
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-surface-secondary rounded border border-border-primary text-xs font-bold text-zinc-500 font-mono">ESC</kbd>
                </div>
              </div>
              <div className="p-4 bg-surface-secondary/30 h-64 overflow-y-auto styled-scrollbar">
                <p className="text-sm font-bold text-zinc-500 mb-2 px-2 uppercase tracking-wider">Recent Searches</p>
                <div className="space-y-1">
                  {["User: Jane Doe", "Provider: AC Experts", "REQ-002"]
                    .filter((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((s, i) => (
                      <button 
                        key={i} 
                        onClick={() => {
                          setIsSearchOpen(false);
                          toast(`Navigating to: ${s}`);
                          setSearchQuery("");
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-surface-secondary rounded-lg text-sm font-medium text-text-primary flex items-center gap-3 transition-colors cursor-pointer"
                      >
                        <Search className="w-4 h-4 text-zinc-400" /> {s}
                      </button>
                    ))}
                </div>
              </div>
            </motion.div>
            <div className="absolute inset-0 -z-10" onClick={() => setIsSearchOpen(false)}></div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Left Sidebar */}
      <aside className={`w-72 bg-surface-primary border-r border-border-primary flex flex-col z-50 shadow-2xl lg:shadow-none shrink-0 fixed inset-y-0 left-0 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-20 px-6 border-b border-border-primary flex justify-between items-center shrink-0">
          {logoMarkup}
        </div>

        <nav className="flex-1 overflow-y-auto styled-scrollbar py-6 px-4 space-y-8">
          {SIDEBAR_SECTIONS.map((section, sIdx) => (
            <div key={sIdx}>
              <p className="px-3 mb-3 text-[11px] font-black text-zinc-400 uppercase tracking-widest">{section.label}</p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const targetPath = item.id ? `/admin/${item.id}` : "/admin";
                  const isActive = location.pathname === targetPath || (item.id === "" && location.pathname === "/admin/");

                  return (
                    <Link
                      key={item.label}
                      to={targetPath}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-bold text-sm ${
                        isActive
                          ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                          : "text-zinc-500 hover:text-text-primary hover:bg-surface-secondary"
                      }`}
                    >
                      <Icon size={18} className={isActive ? "text-white" : "text-zinc-400"} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-border-primary shrink-0">
          <button 
            onClick={() => {
              toast.success("Admin logged out successfully.");
              setTimeout(() => {
                navigate("/");
              }, 800);
            }}
            className="flex items-center justify-center gap-2 px-4 py-3 w-full text-zinc-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-200 font-bold text-sm cursor-pointer"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Right Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F9FAFB]">
        {/* Top Navbar */}
        <header className="bg-surface-primary border-b border-border-primary h-20 shrink-0 px-4 md:px-8 flex items-center justify-between z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 -ml-2 text-zinc-500 hover:text-text-primary rounded-lg hover:bg-surface-secondary"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            {/* Breadcrumb / Title area */}
            <div className="hidden md:block">
              <h1 className="text-xl font-black text-text-primary tracking-tight capitalize">
                {location.pathname.split('/').pop() || "Overview"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Button */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center gap-3 bg-surface-secondary border border-border-primary px-4 py-2 rounded-xl text-sm font-medium text-zinc-500 hover:border-zinc-300 transition-colors w-64 cursor-pointer"
            >
              <Search size={16} />
              <span>Search...</span>
              <div className="ml-auto flex items-center gap-1">
                <Command size={14} />
                <span>K</span>
              </div>
            </button>

            <button className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-zinc-500 hover:bg-surface-secondary" onClick={() => setIsSearchOpen(true)}>
              <Search size={20} />
            </button>

            <button 
              onClick={() => toast("You have 3 unread notifications", { icon: "🔔" })}
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-zinc-500 hover:bg-surface-secondary border border-transparent hover:border-border-primary transition-all cursor-pointer"
            >
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-surface-primary"></span>
            </button>

            <div className="h-8 w-px bg-border-secondary mx-1"></div>

            <button 
              onClick={() => toast.success("Logged in as Alex Admin (Super Admin)")}
              className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-surface-secondary border border-transparent hover:border-border-primary transition-all cursor-pointer"
            >
              <img src="https://i.pravatar.cc/150?img=11" alt="Admin" className="w-8 h-8 rounded-full border border-border-primary" />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold text-text-primary leading-none">Alex Admin</p>
                <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest mt-1">Super Admin</p>
              </div>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto styled-scrollbar p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
