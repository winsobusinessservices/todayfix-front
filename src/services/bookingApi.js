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

  // POST /api/instant-bookings/ (Create Instant Booking)
  createInstantBooking: async (data) => {
    const response = await api.post("/api/instant-bookings/", data);
    return response.data;
  },

  // GET /api/instant-bookings/services/ (Instant Service Search)
  getInstantServices: async (params) => {
    const response = await api.get("/api/instant-bookings/services/", { params });
    return response.data;
  },

  // GET /api/instant-bookings/<uuid>/ (Customer views booking details)
  getCustomerInstantBookingDetails: async (bookingId) => {
    const response = await api.get(`/api/instant-bookings/${bookingId}/`);
    return response.data;
  },

  // POST /api/instant-bookings/<uuid>/cancel/ (Customer cancels instant booking)
  cancelCustomerInstantBooking: async (bookingId) => {
    const response = await api.post(`/api/instant-bookings/${bookingId}/cancel/`);
    return response.data;
  },

  // POST /api/instant-bookings/<uuid>/retry/ (Customer adds tip / retries)
  retryCustomerInstantBooking: async (bookingId, tipAmount) => {
    const response = await api.post(`/api/instant-bookings/${bookingId}/retry/`, { tip_amount: tipAmount });
    return response.data;
  },

  // GET /api/bookings/<uuid>/ (Get User Booking Details)
  getUserBookingDetails: async (bookingId) => {
    const response = await api.get(`/api/bookings/${bookingId}/`);
    return response.data;
  },

  // POST /api/bookings/<uuid>/cancel/ (Cancel Booking)
  cancelBooking: async (bookingId) => {
    const response = await api.post(`/api/bookings/${bookingId}/cancel/`);
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

  // GET /api/instant-bookings/provider/offers/ (List Instant Offers)
  getInstantBookingOffers: async () => {
    const response = await api.get("/api/instant-bookings/provider/offers/");
    return response.data;
  },

  // GET /api/bookings/business/<uuid>/ (Business Booking Details)
  getBusinessBookingDetails: async (bookingId) => {
    const response = await api.get(`/api/bookings/business/${bookingId}/`);
    return response.data;
  },

  // POST /api/bookings/business/<uuid>/accept/ (Accept Scheduled Booking)
  acceptBooking: async (bookingId) => {
    const response = await api.post(`/api/bookings/business/${bookingId}/accept/`);
    return response.data;
  },

  // POST /api/instant-bookings/provider/offers/<uuid>/accept/ (Accept Instant Offer)
  acceptInstantBookingOffer: async (offerId) => {
    const response = await api.post(`/api/instant-bookings/provider/offers/${offerId}/accept/`);
    return response.data;
  },

  // POST /api/instant-bookings/<uuid>/start/ (Start Instant Booking)
  startInstantBooking: async (bookingId) => {
    const response = await api.post(`/api/instant-bookings/${bookingId}/start/`);
    return response.data;
  },

  // POST /api/instant-bookings/<uuid>/complete/ (Complete Instant Booking)
  completeInstantBooking: async (bookingId) => {
    const response = await api.post(`/api/instant-bookings/${bookingId}/complete/`);
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
