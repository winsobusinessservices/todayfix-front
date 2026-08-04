import { Link, useNavigate } from "react-router";
import React, { useRef, useState } from "react";
import { IconMenu2, IconX, IconChevronDown } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Logo from "./logo/Logo";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  // State for dropdowns
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const navigate = useNavigate();

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
      name: "Cities",
      type: "dropdown",
      items: [
        { name: "MG Road", link: "/mg-road" },
        { name: "Cubbon Park", link: "/cubbon-park" },
        { name: "Majestic", link: "/majestic" },
        { name: "Indiranagar", link: "/indiranagar" },
        { name: "Whitefield", link: "/whitefield" },
        { name: "KR Puram", link: "/kr-puram" },
        { name: "Koramangala", link: "/koramangala" },
        { name: "Jayanagar", link: "/jayanagar" },
        { name: "HSR Layout", link: "/hsr-layout" },
        { name: "BTM Layout", link: "/btm-layout" },
        { name: "Hebbal", link: "/hebbal" },
        { name: "Yelahanka", link: "/yelahanka" },
        { name: "Malleswaram", link: "/malleswaram" },
        { name: "Rajajinagar", link: "/rajajinagar" },
        { name: "Vijayanagar", link: "/vijayanagar" },
      ],
    },
  ];

  const buttonBase =
    "px-4 py-2 rounded-md bg-surface-primary button bg-surface-dark text-text-inverted text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";
  const buttonPrimary =
    "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]";
  const buttonSecondary = "bg-transparent shadow-none dark:text-text-primary";

  const logoMarkup = (
    <Link
      to="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-text-primary"
    >
      <img src="tfix.png" alt="logo" width={55} height={55} />
      {/* <video src="logo-vid.mp4" autoPlay muted loop height={55} width={55} className="rounded-md"></video> */}
      <Logo />
    </Link>
  );

  const loggedIn = true; // Replace with actual authentication logic
  const hasBusiness = false; // Replace with actual authentication logic

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
            "relative z-[60] mx-auto hidden h-14 w-full flex-row items-center justify-between self-start rounded-3xl bg-transparent px-4 py-2 lg:flex dark:bg-transparent",
            visible && "bg-neutral-950/80 dark:bg-white/80",
          )}
        >
          {logoMarkup}

          {/* Desktop Nav Items */}
          <motion.div
            onMouseLeave={() => {
              setHoveredItem(null);
              setDropdownOpen(false);
            }}
            className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-xl font-medium text-zinc-600 transition duration-200 lg:flex lg:space-x-2"
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
                    className="relative flex cursor-pointer items-center gap-1 px-2 py-1.5 text-text-inverted transition-colors hover:text-text-primary dark:text-text-primary dark:hover:text-text-inverted"
                  >
                    {hoveredItem === idx && (
                      <motion.div
                        layoutId="hovered"
                        className="absolute inset-0 h-full w-full rounded-full bg-surface-primary dark:bg-neutral-800"
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
                          className="absolute left-1/2 top-full mt-2 grid w-64 -translate-x-1/2 grid-cols-2 rounded-2xl bg-surface-primary p-2 shadow-[0_0_24px_rgba(34,_42,_53,_0.1)] ring-1 ring-black/5 z-50 dark:bg-neutral-950"
                        >
                          {item.items.map((subItem, subIdx) => (
                            <Link
                              key={subIdx}
                              to={"/cities" + subItem.link}
                              className="px-4 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-text-primary rounded-xl dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-text-inverted"
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
                  className="relative px-4 py-2 text-text-inverted transition-colors hover:text-text-primary dark:text-text-primary dark:hover:text-text-inverted"
                >
                  {hoveredItem === idx && (
                    <motion.div
                      layoutId="hovered"
                      className="absolute inset-0 h-full w-full rounded-full bg-surface-primary dark:bg-surface-dark"
                    />
                  )}
                  <span className="relative z-20">{item.name}</span>
                </Link>
              );
            })}
          </motion.div>

          {/* Desktop Buttons */}
          <div className="flex items-center gap-4">
            {loggedIn ? (
              <button
                onClick={() => navigate("/profile")}
                className={cn(buttonBase, buttonSecondary)}
              >
                {/* <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#000000"
                >
                  <path
                    d="M5 20V19C5 15.134 8.13401 12 12 12V12C15.866 12 19 15.134 19 19V20"
                    stroke="#000000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                    stroke="#000000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg> */}
                Profile
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className={cn(buttonBase, buttonSecondary)}
              >
                <span className="flex items-end gap-1">Login</span>
              </button>
            )}
            {loggedIn ? (
              hasBusiness ? (
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
            "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 lg:hidden",
            visible && "bg-white/80 dark:bg-neutral-950/80",
          )}
        >
          {/* Mobile Header (Logo + Toggle) */}
          <div className="flex w-full flex-row items-center justify-between">
            {logoMarkup}
            {isMobileMenuOpen ? (
              <IconX
                className="cursor-pointer text-text-primary dark:text-text-inverted"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            ) : (
              <IconMenu2
                className="cursor-pointer text-text-primary dark:text-text-inverted"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            )}
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-2xl bg-surface-primary px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950"
              >
                {navItems.map((item, idx) => {
                  if (item.type === "dropdown") {
                    return (
                      <div
                        key={`mobile-link-${idx}`}
                        className="flex w-full flex-col"
                      >
                        <div
                          className="flex w-full cursor-pointer items-center justify-between py-1 text-neutral-600 dark:text-neutral-300"
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
                              className="grid grid-cols-2 gap-2 overflow-hidden pl-4 pt-2 border-y pb-2 border-neutral-200 dark:border-neutral-800"
                            >
                              {item.items.map((subItem, subIdx) => (
                                <Link
                                  key={subIdx}
                                  to={"cities" + subItem.link}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block py-1 text-sm text-neutral-500 hover:text-text-primary dark:text-neutral-400 dark:hover:text-text-inverted"
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
                      className="relative w-full py-1 text-neutral-600 dark:text-neutral-300"
                    >
                      <span className="block">{item.name}</span>
                    </Link>
                  );
                })}
                <div className="flex w-full flex-col gap-4 mt-2">
                  {loggedIn ? (
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
                        Profile
                      </span>
                    </button>
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
                    hasBusiness ? (
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
    </>
  );
}
