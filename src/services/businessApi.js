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
};
