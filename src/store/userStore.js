/**
 * Mock User Store
 *
 * Provides a simple exported object simulating the current authenticated user.
 * In production, this would be replaced by a Zustand store or React Context
 * backed by JWT token decoding and API calls.
 *
 * Roles: "USER" | "OWNER" | "ADMIN"
 * Business Statuses: "NONE" | "VERIFY" | "PENDING" | "VERIFIED"
 */

import { create } from "zustand";

export const userData = {
  isAuthenticated: true,
  role: "OWNER", // Change to "USER", "OWNER", or "ADMIN" for testing
  businessStatus: "VERIFIED", // "NONE" | "VERIFY" | "PENDING" | "VERIFIED"
  name: "Santo",
  email: "santo@todayfix.com",
  avatar: null,
};

export const useUserStoreData = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
