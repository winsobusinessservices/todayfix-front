import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router";
import {
  ChevronRight,
  ClipboardList,
  History,
  MapPinHouse,
  Star,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/authApi";
import { useUserStore } from "../../store/userStore";
import { popup } from "../pop-up/pop-up";


const MENU_ITEMS = [
  { label: "My Requests", description: "Track active bookings", icon: ClipboardList, to: "/profile?tab=requests" },
  { label: "Service History", description: "View completed services", icon: History, to: "/profile?tab=history" },
  { label: "My Reviews", description: "Manage your feedback", icon: Star, to: "/profile?tab=reviews" },
  { label: "Profile & Addresses", description: "Update personal details", icon: MapPinHouse, to: "/profile?tab=profile" },
];

const ProfileMenu = ({ user, mobile = false, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const refreshToken = useUserStore((state) => state.refreshToken);
  const clearAuth = useUserStore((state) => state.clearAuth);
  const firstName = user?.firstName || user?.first_name || "My";
  const lastName = user?.lastName || user?.last_name || "Account";
  const email = user?.email || user?.user?.email || "Manage your account";
  const profileImage = user?.profileImage || user?.profile_image;
  const initials = `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();

  useEffect(() => {
    if (!open) return undefined;
    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const goTo = (path) => {
    setOpen(false);
    onNavigate?.();
    navigate(path);
  };
  const finishLogout = () => {
    setOpen(false);
    clearAuth();
    queryClient.clear();
    navigate("/", { replace: true });
    popup("Logout Successful", "You've been safely logged out.", "logout");
  };

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSettled: finishLogout,
  });

  const handleLogout = () => {
    if (refreshToken) mutate(refreshToken);
    else finishLogout();
  };

  return (
    <div ref={menuRef} className={mobile ? "relative w-full" : "relative"}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label="Open profile menu"
        aria-haspopup="menu"
        aria-expanded={open}
        className={mobile
          ? "flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-surface-primary px-4 py-2 text-sm font-bold text-text-primary shadow-sm ring-1 ring-black/5 transition-colors hover:bg-surface-secondary"
          : "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-text-primary transition-colors hover:bg-surface-secondary"}
      >
                          <svg viewBox="0 0 16 16" fill="#000000" height={30}>
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fill="#000000"
                        fillRule="evenodd"
                        d="M8,16 C12.4183,16 16,12.4183 16,8 C16,3.58172 12.4183,0 8,0 C3.58172,0 0,3.58172 0,8 C0,12.4183 3.58172,16 8,16 Z M12.9533,11.387 C13.6137,10.4231 14,9.25665 14,8 C14,4.68629 11.3137,2 8,2 C4.68629,2 2,4.68629 2,8 C2,9.25665 2.38632,10.4231 3.04668,11.387 C3.25368,10.0411 4.13147,8.91649 5.32791,8.36519 C5.11827,7.95568 5,7.49165 5,7 C5,5.34315 6.34315,4 8,4 C9.65685,4 11,5.34315 11,7 C11,7.49165 10.8817,7.95568 10.6721,8.36519 C11.8685,8.91649 12.7463,10.0411 12.9533,11.387 Z M11,13.1973 L11,12 C11,10.8954 10.1046,10 9,10 L7,10 C5.89543,10 5,10.8954 5,12 L5,13.1973 C5.88252,13.7078 6.90714,14 8,14 C9.09286,14 10.1175,13.7078 11,13.1973 Z M8,8 C8.55228,8 9,7.55228 9,7 C9,6.44772 8.55228,6 8,6 C7.44772,6 7,6.44772 7,7 C7,7.55228 7.44772,8 8,8 Z"
                      ></path>{" "}
                    </g>
                  </svg>
        {mobile && <span>Profile</span>}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={mobile
              ? "relative z-[80] mt-3 w-full overflow-hidden rounded-2xl border border-border-primary bg-surface-primary text-left shadow-xl"
              : "absolute right-0 top-full z-[80] mt-3 w-80 overflow-hidden rounded-2xl border border-border-primary bg-surface-primary text-left shadow-2xl shadow-black/15"}
          >
            <div className="border-b border-border-secondary bg-surface-secondary/70 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-dark text-sm font-black text-text-inverted">
                  {profileImage ? (
                    <img src={profileImage} alt={`${firstName} ${lastName}`} className="h-full w-full object-cover" />
                  ) : initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-text-primary">{firstName} {lastName}</p>
                  <p className="truncate text-xs font-medium text-text-secondary">{email}</p>
                </div>
              </div>
            </div>

            <div className="p-2">
              {MENU_ITEMS.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.to}
                    type="button"
                    role="menuitem"
                    onClick={() => goTo(item.to)}
                    className="group flex w-full cursor-pointer items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-surface-secondary"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border-primary bg-surface-primary text-text-secondary transition-colors group-hover:bg-surface-dark group-hover:text-text-inverted">
                      <ItemIcon size={17} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-text-primary">{item.label}</span>
                      <span className="block text-xs font-medium text-text-secondary">{item.description}</span>
                    </span>
                    <ChevronRight size={16} className="text-zinc-300 transition-transform group-hover:translate-x-0.5 group-hover:text-text-primary" />
                  </button>
                );
              })}
            </div>

            <div className="border-t border-border-secondary p-2 flex items-center justify-center">
            <button
              onClick={handleLogout}
              disabled={isPending}
              className="flex cursor-pointer items-center justify-center gap-2 px-4 py-1 font-bold text-red-500 transition-colors disabled:cursor-wait disabled:opacity-50 lg:py-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              {isPending ? "Logging out..." : "Logout"}
            </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileMenu;
