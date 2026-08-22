import api from "./axiosClient";

export const categoryApi = {
  // GET /api/categories/ (List Categories)
  getCategories: async () => {
    const response = await api.get("/api/categories/");
    return response.data;
  },

  // GET /api/categories/<uuid>/subcategories/ (List Subcategories)
  getSubcategories: async (categoryId) => {
    const response = await api.get(`/api/categories/${categoryId}/subcategories/`);
    return response.data;
  },

  // POST /api/categories/ (Create category)
  createCategory: async (categoryData) => {
    const response = await api.post("/api/categories/", categoryData);
    return response.data;
  },

  // GET /api/categories/<uuid>/ (Get single category)
  getCategory: async (catUuid) => {
    const response = await api.get(`/api/categories/${catUuid}/`);
    return response.data;
  },

  // PATCH /api/categories/<uuid>/ (Update category)
  updateCategory: async (catUuid, categoryData) => {
    const response = await api.patch(`/api/categories/${catUuid}/`, categoryData);
    return response.data;
  },

  // POST /api/categories/<cat_uuid>/subcategories/ (Create subcategory)
  createSubcategory: async (catUuid, subCategoryData) => {
    const response = await api.post(`/api/categories/${catUuid}/subcategories/`, subCategoryData);
    return response.data;
  },

  // GET /api/categories/subcategories/<subCat_uuid>/ (Get single subcategory)
  getSubcategory: async (subCatUuid) => {
    const response = await api.get(`/api/categories/subcategories/${subCatUuid}/`);
    return response.data;
  },

  // PATCH /api/categories/subcategories/<subCat_uuid>/ (Update subcategory)
  updateSubcategory: async (subCatUuid, subCategoryData) => {
    const response = await api.patch(`/api/categories/subcategories/${subCatUuid}/`, subCategoryData);
    return response.data;
  },
};
