import api from "./axiosClient";

export const scheduleApi = {
  // GET /api/business/working-schedules/list/ (List Schedules)
  getSchedules: async () => {
    const response = await api.get("/api/business/working-schedules/list/");
    return response.data;
  },

  // POST /api/business/working-schedules/ (Create Schedule)
  createSchedule: async (data) => {
    const response = await api.post("/api/business/working-schedules/", data);
    return response.data;
  },

  // PUT /api/business/working-schedules/<uuid>/ (Update Schedule)
  updateSchedule: async (scheduleId, data) => {
    const response = await api.put(`/api/business/working-schedules/${scheduleId}/`, data);
    return response.data;
  },

  // DELETE /api/business/working-schedules/<uuid>/delete/ (Delete Schedule)
  deleteSchedule: async (scheduleId) => {
    const response = await api.delete(`/api/business/working-schedules/${scheduleId}/delete/`);
    return response.data;
  },

  // GET /api/business/availability/ (View Availability)
  getAvailability: async () => {
    const response = await api.get("/api/business/availability/");
    return response.data;
  },

  // POST /api/business/availability/create/ (Create Availability)
  createAvailability: async (data) => {
    const response = await api.post("/api/business/availability/create/", data);
    return response.data;
  },

  // PUT /api/business/availability/<uuid>/update/ (Update Availability)
  updateAvailability: async (availabilityId, data) => {
    const response = await api.put(`/api/business/availability/${availabilityId}/update/`, data);
    return response.data;
  },
};
