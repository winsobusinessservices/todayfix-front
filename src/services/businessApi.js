import api from "./axiosClient";

export const businessApi = {
  // GET /api/business/profiles/ (List Business Profiles)
  getProfiles: async () => {
    const response = await api.get("/api/business/profiles/");
    return response.data;
  },

  // PUT /api/business/profiles/<uuid>/ (Update Profile)
  updateProfile: async (profileId, data) => {
    const response = await api.put(`/api/business/profiles/${profileId}/`, data);
    return response.data;
  },

  // GET /api/business/applications/list/ (List My Business Applications)
  getBusinessApplicationList: async () => {
    const response = await api.get("/api/business/applications/list/");
    return response.data;
  },

  // GET /api/business/applications/<uuid>/ (Get My Business Application Details)
  getBusinessApplicationDetails: async (applicationId) => {
    const response = await api.get(`/api/business/applications/${applicationId}/`);
    return response.data;
  },

  // GET /api/business/employees/ (List Employees)
  getEmployees: async (page = 1) => {
    const response = await api.get(`/api/business/employees/?page=${page}`);
    return response.data;
  },

  // POST /api/business/employees/create/ (Create Employee)
  createEmployee: async (data) => {
    const response = await api.post(`/api/business/employees/create/`, data);
    return response.data;
  },

  // POST /api/business/employees/<uuid>/update/ (Update Employee)
  updateEmployee: async ({ id, data }) => {
    const response = await api.post(`/api/business/employees/${id}/update/`, data);
    return response.data;
  },

  // DELETE /api/business/employees/<uuid>/delete/ (Deactivate Employee)
  deleteEmployee: async (id) => {
    const response = await api.delete(`/api/business/employees/${id}/delete/`);
    return response.data;
  },
};
