import { Link, useNavigate } from "react-router";
import React, { useRef, useState } from "react";
import { IconMenu2, IconX, IconChevronDown } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "../../utils/cn";
import Logo from "../brand/Logo";
import { useUserStore } from "../../store/userStore";
import Icon from "../../assets/TF_LIGHT_LOGO_TRANS.png";
import { areasData } from "../../data/collectedData";
import { Bell } from "lucide-react";
import NotificationDrawer from "../notifications/NotificationDrawer";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  // State for dropdowns
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const navigate = useNavigate();
  const userData = useUserStore((state) => state.user);

  const loggedIn =
    useUserStore((state) => state.isAuthenticated) || userData?.isAuthenticated;
  const hasBusiness =
    userData?.role === "BUSINESS" || userData?.role === "OWNER";
  const isAdmin = userData?.role === "ADMIN";
  // console.log(userData);

  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 50);
  });

  const navItems = [
    { name: "Services", link: "/services" },
    { name: "Pricing", link: "/pricing" },
    {
      name: "Areas",
      type: "dropdown",
      items: areasData,
    },
  ];

  const buttonBase =
    "px-4 py-2 rounded-md bg-surface-primary button bg-surface-dark text-text-inverted text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";
  const buttonPrimary =
    "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]";
  const buttonSecondary = "bg-transparent shadow-none !text-text-primary";

  const logoMarkup = (
    <Link
      to="/"
      className="relative z-20 mr-2 flex shrink-0 items-center space-x-2 px-2 py-1 text-sm font-normal text-text-primary sm:mr-4"
    >
      <img src={Icon} alt="logo" width={55} height={55} />
      {/* <video src="logo-vid.mp4" autoPlay muted loop height={55} width={55} className="rounded-md"></video> */}
      <Logo />
    </Link>
  );

  return (
    <>
      <motion.div ref={ref} className="">
        {/* DESKTOP NAVIGATION */}
        <motion.div
          animate={{
            backdropFilter: visible ? "blur(10px)" : "none",
            boxShadow: visible
              ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
              : "none",
            width: visible ? "40%" : "100%",
            y: visible ? 20 : 0,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 50 }}
          style={{ minWidth: "850px" }}
          className={cn(
            "relative z-[60] mx-auto hidden h-14 w-full flex-row items-center justify-between self-start rounded-3xl bg-transparent px-4 py-2 lg:flex ",
            visible && "bg-white/80 ",
          )}
        >
          {logoMarkup}

          {/* Desktop Nav Items */}
          <motion.div
            onMouseLeave={() => {
              setHoveredItem(null);
              setDropdownOpen(false);
            }}
            className="hidden min-w-0 flex-1 flex-row items-center justify-center space-x-1 whitespace-nowrap text-xl font-medium text-text-primary transition duration-200 lg:flex xl:space-x-2"
          >
            {navItems.map((item, idx) => {
              if (item.type === "dropdown") {
                return (
                  <div
                    key={`link-${idx}`}
                    onMouseEnter={() => {
                      setHoveredItem(idx);
                      setDropdownOpen(true);
                    }}
                    className={cn(
                      "relative flex cursor-pointer items-center gap-1 px-4 py-1.5 transition-colors hover:text-text-inverted text-neutral-600 font-medium",
                      visible && "text-text-primary",
                    )}
                  >
                    {hoveredItem === idx && (
                      <motion.div
                        layoutId="hovered"
                        className="absolute inset-0 h-full w-full rounded-full bg-surface-dark"
                      />
                    )}
                    <span className="relative z-20">{item.name}</span>
                    <IconChevronDown
                      size={18}
                      className={cn(
                        "relative z-20 transition-transform duration-200",
                        dropdownOpen && hoveredItem === idx ? "rotate-180" : "",
                      )}
                    />

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {dropdownOpen && hoveredItem === idx && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 top-full mt-2 grid w-64 -translate-x-1/2 grid-cols-2 rounded-2xl bg-surface-primary p-2 shadow-[0_0_24px_rgba(34,_42,_53,_0.1)] ring-1 ring-black/5 z-50 "
                        >
                          {item.items.map((subItem, subIdx) => (
                            <Link
                              key={subIdx}
                              to={"/cities" + subItem.link}
                              className="px-4 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-text-primary rounded-xl"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={`link-${idx}`}
                  to={item.link}
                  onMouseEnter={() => {
                    setHoveredItem(idx);
                    setDropdownOpen(false);
                  }}
                  className={cn(
                    "relative px-4 py-1.5 transition-colors hover:text-text-inverted text-neutral-600 font-medium",
                    visible && "text-text-primary",
                  )}
                >
                  {hoveredItem === idx && (
                    <motion.div
                      layoutId="hovered"
                      className="absolute inset-0 h-full w-full rounded-full bg-surface-dark "
                    />
                  )}
                  <span className="relative z-20">{item.name}</span>
                </Link>
              );
            })}
          </motion.div>

          {/* Desktop Buttons */}
          <div className="relative z-20 flex shrink-0 items-center justify-center gap-1 xl:gap-2">
            {loggedIn && (
              <button
                type="button"
                onClick={() => setIsNotificationDrawerOpen(true)}
                aria-label="Open notifications"
                aria-expanded={isNotificationDrawerOpen}
                className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-transparent text-text-primary transition-colors hover:border-border-primary hover:bg-surface-secondary"
              >
                <Bell size={20} />
                {unreadNotificationCount > 0 && (
                  <span className="absolute right-0 top-2 h-2 w-2 rounded-full border border-surface-primary bg-red-500" />
                )}
              </button>
            )}
            {loggedIn ? (
              <ProfileMenu user={userData} />
            ) : (
              <button
                onClick={() => navigate("/login")}
                className={cn(buttonBase, buttonSecondary)}
              >
                <span className="flex items-end gap-1">Login</span>
              </button>
            )}
            {loggedIn ? (
              isAdmin ? (
                <button
                  onClick={() => navigate("/admin")}
                  className={cn(buttonBase, buttonPrimary)}
                >
                  Admin Panel
                </button>
              ) : hasBusiness ? (
                <button
                  onClick={() => navigate("/owner-dashboard")}
                  className={cn(buttonBase, buttonPrimary)}
                >
                  Manage Business
                </button>
              ) : (
                <button
                  onClick={() => navigate("/list-business")}
                  className={cn(buttonBase, buttonPrimary)}
                >
                  List Your Business
                </button>
              )
            ) : (
              <button
                onClick={() => navigate("/register")}
                className={cn(buttonBase, buttonPrimary)}
              >
                Register
              </button>
            )}
          </div>
        </motion.div>

        {/* MOBILE NAVIGATION */}
        <motion.div
          animate={{
            backdropFilter: visible ? "blur(10px)" : "none",
            boxShadow: visible
              ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
              : "none",
            width: visible ? "90%" : "100%",
            paddingRight: visible ? "12px" : "0px",
            paddingLeft: visible ? "12px" : "0px",
            borderRadius: visible ? "25px" : "2rem",
            y: visible ? 20 : 0,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 50 }}
          className={cn(
            "relative z-50 mx-auto flex w-full max-w-[calc(100vw-1rem)] flex-col items-center justify-between bg-transparent px-0 lg:hidden",
            visible && "bg-white/80 ",
          )}
        >
          {/* Mobile Header (Logo + Toggle) */}
          <div className="flex w-full min-w-0 flex-row items-center justify-between gap-2">
            {logoMarkup}
            <div className="flex shrink-0 items-center gap-2">
              {loggedIn && (
                <button
                  type="button"
                  onClick={() => setIsNotificationDrawerOpen(true)}
                  aria-label="Open notifications"
                  aria-expanded={isNotificationDrawerOpen}
                  className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-text-primary hover:bg-surface-secondary"
                >
                  <Bell size={20} />
                  {unreadNotificationCount > 0 && (
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full border border-surface-primary bg-red-500" />
                  )}
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((current) => !current)}
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-primary hover:bg-surface-secondary"
              >
                {isMobileMenuOpen ? <IconX /> : <IconMenu2 />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="styled-scrollbar absolute inset-x-0 top-16 z-50 flex max-h-[calc(100dvh-6.5rem)] w-full flex-col items-start justify-start gap-4 overflow-y-auto overscroll-contain rounded-2xl bg-surface-primary px-4 py-6 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              >
                {navItems.map((item, idx) => {
                  if (item.type === "dropdown") {
                    return (
                      <div
                        key={`mobile-link-${idx}`}
                        className="flex w-full flex-col"
                      >
                        <div
                          className="flex w-full cursor-pointer items-center justify-between py-1 text-neutral-600 "
                          onClick={() =>
                            setMobileDropdownOpen(!mobileDropdownOpen)
                          }
                        >
                          <span className="block">{item.name}</span>
                          <IconChevronDown
                            size={18}
                            className={cn(
                              "transition-transform duration-200",
                              mobileDropdownOpen ? "rotate-180" : "",
                            )}
                          />
                        </div>
                        <AnimatePresence>
                          {mobileDropdownOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="grid grid-cols-2 gap-2 overflow-hidden pl-4 pt-2 border-y pb-2 border-neutral-200 "
                            >
                              {item.items.map((subItem, subIdx) => (
                                <Link
                                  key={subIdx}
                                  to={"cities" + subItem.link}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block py-1 text-sm text-neutral-500 hover:text-text-primary"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={`mobile-link-${idx}`}
                      to={item.link}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="relative w-full py-1 text-neutral-600 "
                    >
                      <span className="block">{item.name}</span>
                    </Link>
                  );
                })}
                <div className="flex w-full flex-col gap-4 mt-2">
                  {loggedIn ? (
                    <ProfileMenu
                      user={userData}
                      mobile
                      onNavigate={() => setIsMobileMenuOpen(false)}
                    />
                  ) : (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate("/login");
                      }}
                      className={cn(
                        buttonBase,
                        buttonSecondary,
                        "w-full shadow-sm ring-1 ring-black/5 text-text-primary",
                      )}
                    >
                      <span className="flex items-end gap-1 justify-center">
                        Login
                      </span>
                    </button>
                  )}
                  {loggedIn ? (
                    isAdmin ? (
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate("/admin");
                        }}
                        className={cn(buttonBase, buttonPrimary, "w-full")}
                      >
                        Admin Panel
                      </button>
                    ) : hasBusiness ? (
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate("/owner-dashboard");
                        }}
                        className={cn(buttonBase, buttonPrimary, "w-full")}
                      >
                        Manage Business
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate("/list-business");
                        }}
                        className={cn(buttonBase, buttonPrimary, "w-full")}
                      >
                        List Your Business
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate("/register");
                      }}
                      className={cn(buttonBase, buttonPrimary, "w-full")}
                    >
                      Register
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {loggedIn && (
        <NotificationDrawer
          open={isNotificationDrawerOpen}
          onClose={() => setIsNotificationDrawerOpen(false)}
          onUnreadCountChange={setUnreadNotificationCount}
        />
      )}
    </>
  );
}
