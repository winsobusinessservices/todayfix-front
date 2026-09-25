import api from "./axiosClient";

export const businessApi = {
  // GET /api/business/profiles/ (List Business Profiles)
  getProfiles: async () => {
    const response = await api.get("/api/business/profiles/");
    return response.data;
  },

  // PUT /api/business/profiles/<uuid>/ (Update Profile)
  updateProfile: async (profileId, data) => {
    const response = await api.patch(`/api/business/profiles/${profileId}/`, data);
    return response.data;
  },

  // GET /api/business/applications/list/ (List My Business Applications)
  getBusinessApplicationList: async () => {
    const response = await api.get("/api/business/applications/list/");
    return response.data;
  },

  getBusinessApplicationDocuments: async (applicationId) => {
    const response = await api.get(`/api/business/applications/${applicationId}/documents/`);
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

  // GET /api/business/working-schedules/list/ (List Slots)
  getWorkingSchedules: async () => {
    const response = await api.get("/api/business/working-schedules/list/");
    return response.data;
  },

  // POST /api/business/working-schedules/ (Create Slot)
  createWorkingSchedule: async (data) => {
    const response = await api.post("/api/business/working-schedules/", data);
    return response.data;
  },

  // POST /api/business/working-schedules/apply-to-days/ (Apply Slots to Days)
  applySlotsToDays: async (data) => {
    const response = await api.post("/api/business/working-schedules/apply-to-days/", data);
    return response.data;
  },

  // POST /api/business/working-schedules/{uuid}/ (Update Slot)
  updateWorkingSchedule: async ({ id, data }) => {
    const response = await api.post(`/api/business/working-schedules/${id}/`, data);
    return response.data;
  },

  // DELETE /api/business/working-schedules/{uuid}/delete/ (Delete Slot)
  deleteWorkingSchedule: async (id) => {
    const response = await api.delete(`/api/business/working-schedules/${id}/delete/`);
    return response.data;
  },

  // GET /api/business/availability/ (List Provider Availability)
  getAvailability: async (employee_uuid) => {
    const params = employee_uuid ? { employee_uuid, employee: employee_uuid } : {};
    const response = await api.get("/api/business/availability/", { params });
    return response.data;
  },

  // POST /api/business/availability/create/ (Create Provider Availability)
  createAvailability: async (data) => {
    const response = await api.post("/api/business/availability/create/", data);
    return response.data;
  },

  // POST /api/business/availability/{uuid}/update/ (Update Provider Availability)
  updateAvailability: async ({ id, data }) => {
    const response = await api.post(`/api/business/availability/${id}/update/`, data);
    return response.data;
  },

  // UPGRADE REQUESTS
  // GET /api/business/upgrade-requests/list/
  getUpgradeRequests: async () => {
    const response = await api.get("/api/business/upgrade-requests/list/");
    return response.data;
  },

  // POST /api/business/upgrade-requests/
  createUpgradeRequest: async (data) => {
    const response = await api.post("/api/business/upgrade-requests/", data);
    return response.data;
  },

  // POST /api/business/upgrade-requests/<uuid>/documents/
  uploadUpgradeDocuments: async (requestId, formData) => {
    const response = await api.post(`/api/business/upgrade-requests/${requestId}/documents/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // GET /api/business/profiles/public/{subCat_uuid}/s
  businessProfileBySubcategory: async (subCategoryId) => {
    const response = await api.get(`/api/business/profiles/public/${subCategoryId}/s`);
    return response.data;
  },

  // GET /api/business/portfolio/{business_profile_uuid}/
  businessPortfolio: async (businessId) => {
    const response = await api.get(`/api/business/portfolio/${businessId}/`)
    return response.data;
  },

  // POST /api/business/portfolio/create/
  businessCreatePortfolio: async (data) => {
    const response = await api.post("/api/business/portfolio/create/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // PATCH /api/business/portfolio/update/
  businessUpdatePortfolio: async (data) => {
    const response = await api.patch(`/api/business/portfolio/update/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // DELETE /api/business/portfolio/faqs/{faq_uuid}/delete/
  businessDeletePortfolioFaq: async (faqId) => {
    const response = await api.delete(`/api/business/portfolio/faqs/${faqId}/delete/`);
    return response.data;
  },

  // DELETE /api/business/portfolio/gallery/{gallery_image_uuid}/delete/
  businessPortfolioDeleteGalleryImage: async (galleryId) => {
    const response = await api.delete(`/api/business/portfolio/gallery/${galleryId}/delete/`);
    return response.data;
  },

  // POST /api/business/switch-to-user/request/
  requestSwitchToUser: async (data) => {
    const response = await api.post(`/api/business/switch-to-user/request/`, data);
    return response.data;
  },

  // POST /api/business/switch-to-user/verify/
  verifySwitchToUser: async (data) => {
    const response = await api.post(`/api/business/switch-to-user/verify/`, data);
    return response.data;
  },
};
