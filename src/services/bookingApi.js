import api from "./axiosClient";

export const bookingApi = {
  // ==========================================
  // USER ENDPOINTS
  // ==========================================
  
  // GET /api/bookings/ (List User Bookings)
  getUserBookings: async (params) => {
    const response = await api.get("/api/bookings/", { params });
    return response.data;
  },

  // GET /api/bookings/availability/ (Check Slot Availability)
  checkAvailability: async (params) => {
    const response = await api.get("/api/bookings/availability/", { params });
    return response.data;
  },

  // POST /api/bookings/create/ (Create Booking)
  createBooking: async (data) => {
    const response = await api.post("/api/bookings/create/", data);
    return response.data;
  },

  // GET /api/bookings/<uuid>/ (Get User Booking Details)
  getUserBookingDetails: async (bookingId) => {
    const response = await api.get(`/api/bookings/${bookingId}/`);
    return response.data;
  },

  // POST /api/bookings/<uuid>/cancel/ (Cancel Booking)
  cancelBooking: async (bookingId, reason) => {
    const response = await api.post(`/api/bookings/${bookingId}/cancel/`, { reason });
    return response.data;
  },

  // ==========================================
  // PROVIDER / BUSINESS ENDPOINTS
  // ==========================================

  // GET /api/bookings/business/list/ (List Business Bookings)
  getBusinessBookings: async () => {
    const response = await api.get("/api/bookings/business/list/");
    return response.data;
  },

  // GET /api/bookings/business/<uuid>/ (Business Booking Details)
  getBusinessBookingDetails: async (bookingId) => {
    const response = await api.get(`/api/bookings/business/${bookingId}/`);
    return response.data;
  },

  // POST /api/bookings/business/<uuid>/accept/ (Accept Booking)
  acceptBooking: async (bookingId) => {
    const response = await api.post(`/api/bookings/business/${bookingId}/accept/`);
    return response.data;
  },

  // POST /api/bookings/business/<uuid>/reject/ (Reject Booking)
  rejectBooking: async (bookingId, reason) => {
    const response = await api.post(`/api/bookings/business/${bookingId}/reject/`, { reason });
    return response.data;
  },

  // POST /api/bookings/business/<uuid>/start/ (Start Booking)
  startBooking: async (bookingId) => {
    const response = await api.post(`/api/bookings/business/${bookingId}/start/`);
    return response.data;
  },

  // POST /api/bookings/business/<uuid>/complete/ (Mark Completed)
  completeBooking: async (bookingId) => {
    const response = await api.post(`/api/bookings/business/${bookingId}/complete/`);
    return response.data;
  },

  // POST /api/bookings/business/<uuid>/assign-employee/ (Assign Employee)
  assignEmployee: async (bookingId, employeeId) => {
    const response = await api.post(`/api/bookings/business/${bookingId}/assign-employee/`, { employee_uuid: employeeId });
    return response.data;
  },

  // POST /api/bookings/business/<uuid>/reassign-employee/ (Reassign Employee)
  reassignEmployee: async (bookingId, employeeId) => {
    const response = await api.post(`/api/bookings/business/${bookingId}/reassign-employee/`, { employee_uuid: employeeId });
    return response.data;
  },
};
