import api from "./axiosClient";

export const adminApi = {
  // GET /api/business/admin/applications/ (List Business Applications)
  getBusinessApplications: async () => {
    const response = await api.get("/api/business/admin/applications/");
    return response.data;
  },

  // POST /api/business/admin/applications/<uuid>/approve/ (Approve Application)
  approveApplication: async (applicationId) => {
    const response = await api.post(`/api/business/admin/applications/${applicationId}/approve/`);
    return response.data;
  },

  // POST /api/business/admin/applications/<uuid>/reject/ (Reject Application)
  rejectApplication: async (applicationId, reason) => {
    const response = await api.post(`/api/business/admin/applications/${applicationId}/reject/`, { reason });
    return response.data;
  },
};
