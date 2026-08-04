import { create } from "zustand";

const defaultFilters = {
  keyword: "",
  category: "",
  state: "",
  city: "",
  area: "",
  rating: "",
  verified: false,
  latest: false,
};

const defaultRegistrationDraft = {
  businessName: "",
  mobileNumber: "",
  whatsappNumber: "",
  email: "",
  businessCategory: "",
  description: "",
  address: "",
  area: "",
  city: "",
  state: "",
  logoUpload: "",
  websiteUrl: "",
  googleMapEmbed: "",
  services: [],
  businessImages: [],
  coverImage: "",
};

export const useDirectoryStore = create((set) => ({
  filters: { ...defaultFilters },
  registrationDraft: { ...defaultRegistrationDraft },
  adminModule: "dashboard",
  setFilters: (updates) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...updates,
      },
    })),
  resetFilters: () => set({ filters: { ...defaultFilters } }),
  setRegistrationDraft: (updates) =>
    set((state) => ({
      registrationDraft: {
        ...state.registrationDraft,
        ...updates,
      },
    })),
  resetRegistrationDraft: () =>
    set({ registrationDraft: { ...defaultRegistrationDraft } }),
  setAdminModule: (adminModule) => set({ adminModule }),
}));
