import api from "./axiosClient";

export const serviceApi = {
  // GET /api/services/ (List Services)
  getServices: async () => {
    const response = await api.get("/api/services/");
    return response.data;
  },

  // GET /api/services/search/ (Search Services)
  searchServices: async (query) => {
    const response = await api.get("/api/services/search/", {
      params: { q: query }, // Assuming standard query param 'q'
    });
    return response.data;
  },

  // GET /api/services/<uuid>/ (Service Details)
  getServiceDetails: async (serviceId) => {
    const response = await api.get(`/api/services/${serviceId}/`);
    return response.data;
  },

  // ==========================================
  // BUSINESS OWNER ENDPOINTS
  // ==========================================

  // POST /api/services/create/
  createService: async (data) => {
    const response = await api.post("/api/services/create/", data);
    return response.data;
  },

  // PUT /api/services/<uuid>/update/
  updateService: async (serviceId, data) => {
    const response = await api.put(`/api/services/${serviceId}/update/`, data);
    return response.data;
  },

  // DELETE /api/services/<uuid>/delete/
  deleteService: async (serviceId) => {
    const response = await api.delete(`/api/services/${serviceId}/delete/`);
    return response.data;
  },
};
