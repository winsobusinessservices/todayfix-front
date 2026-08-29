import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: Cookies.get("accessToken") || null,
      refreshToken: Cookies.get("refreshToken") || null,
      isAuthenticated: !!Cookies.get("accessToken"),

      // Initialize session with tokens and user details
      setAuthData: ({ access, refresh, user }) => {
        const isSecure = window.location.protocol === "https:";
        const cookieOptions = {
          expires: 7,
          secure: isSecure,
          sameSite: "Lax",
          path: "/",
        };
        Cookies.set("accessToken", access, cookieOptions);
        Cookies.set("refreshToken", refresh, { ...cookieOptions, expires: 30 });
        set({
          accessToken: access,
          refreshToken: refresh,
          user: user,
          isAuthenticated: true,
        });
      },

      // Update just the tokens (e.g. after refresh)
      setTokens: ({ access, refresh }) => {
        const isSecure = window.location.protocol === "https:";
        const cookieOptions = {
          expires: 7,
          secure: isSecure,
          sameSite: "Lax",
          path: "/",
        };
        Cookies.set("accessToken", access, cookieOptions);
        Cookies.set("refreshToken", refresh, { ...cookieOptions, expires: 30 });
        set((state) => ({
          accessToken: access,
          refreshToken: refresh || state.refreshToken,
          isAuthenticated: true,
        }));
      },

      // Update just the user details (e.g. after profile update)
      setUser: (user) => set({ user }),

      // Clear session
      clearAuth: () => {
        Cookies.remove("accessToken", { path: "/" });
        Cookies.remove("refreshToken", { path: "/" });
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage", // key in localStorage
      // Persist all necessary auth state so it isn't lost on refresh
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
