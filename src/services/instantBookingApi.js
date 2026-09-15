import api from "./axiosClient";

export const instantBookingApi = {
  // POST /api/instant-bookings/ (Create Instant Booking)
  createInstantBooking: async (data) => {
    const response = await api.post("/api/instant-bookings/", data);
    return response.data;
  },

  // GET /api/instant-bookings/services/ (Instant Service Search)
  getInstantServices: async (params) => {
    const response = await api.get("/api/instant-bookings/services/", {
      params,
    });
    return response.data;
  },

  // GET /api/instant-bookings/<uuid>/ (Customer views booking details)
  getCustomerInstantBookingDetails: async (bookingId) => {
    const response = await api.get(`/api/instant-bookings/${bookingId}/`);
    return response.data;
  },

  // POST /api/instant-bookings/<uuid>/cancel/ (Customer cancels instant booking)
  cancelCustomerInstantBooking: async (bookingId) => {
    const response = await api.post(
      `/api/instant-bookings/${bookingId}/cancel/`,
    );
    return response.data;
  },

  // POST /api/instant-bookings/<uuid>/retry/ (Customer adds tip / retries)
  retryCustomerInstantBooking: async (bookingId, tipAmount) => {
    const response = await api.post(
      `/api/instant-bookings/${bookingId}/retry/`,
      { tip_amount: tipAmount },
    );
    return response.data;
  },

  // GET /api/instant-bookings/provider/offers/ (List Instant Offers)
  // getInstantBookingOffers: async () => {
  //   const response = await api.get("/api/instant-bookings/provider/offers/");
  //   return response.data;
  // },

  // POST /api/instant-bookings/provider/offers/<uuid>/accept/ (Accept Instant Offer)
  acceptInstantBookingOffer: async (offerId) => {
    const response = await api.post(
      `/api/instant-bookings/provider/offers/${offerId}/accept/`,
    );
    return response.data;
  },

  // GET /api/instant-bookings/provider/accepted/ (Accepted Instant Bookings)
  acceptedInstantBookingOffer: async (offerId) => {
    const response = await api.get(`/api/instant-bookings/provider/accepted/`);
    return response.data;
  },

  // POST /api/instant-bookings/<uuid>/start/ (Start Instant Booking)
  startInstantBooking: async (bookingId) => {
    const response = await api.post(
      `/api/instant-bookings/${bookingId}/start/`,
    );
    return response.data;
  },

  // POST /api/instant-bookings/<uuid>/complete/ (Complete Instant Booking)
  completeInstantBooking: async (bookingId) => {
    const response = await api.post(
      `/api/instant-bookings/${bookingId}/complete/`,
    );
    return response.data;
  },

  // GET /api/instant-bookings/provider/popups/ (View Pending Popups)
  pendingInstantBookings: async () => {
    const response = await api.get("/api/instant-bookings/provider/popups/");
    return response.data;
  },
};
