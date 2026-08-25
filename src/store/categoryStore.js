import { create } from "zustand";
import { categoryApi } from "../services/categoryApi";

export const useCategoryStore = create((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
  fetchCategories: async () => {
    try {
      const response = await categoryApi.getCategories();
      set({ categories: response.data });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  },
}));
