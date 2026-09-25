import api from "./axiosClient";

export const reviewApi = {
  // POST - /api/reviews/ (Add Reviews)
  addReview: async (formData) => {
    return await api.post(`/api/reviews/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // GET - /api/reviews/{review_uuid}/ (Get Single Review)
  getSingleReview: async ({ review_uuid }) => {
    return (await api.get(`/api/reviews/${review_uuid}/`)).data;
  },

  // DELETE - /api/reviews/{review_uuid}/ (Delete Review)
  deleteReview: async ({ review_uuid }) => {
    return (await api.delete(`/api/reviews/${review_uuid}/`)).data;
  },

  // DELETE - /api/reviews/{review_uuid}/images/{image_uuid} (Delete Review Images)
  deleteReviewImages: async ({ review_uuid, image_uuid }) => {
    return await api.delete(
      `/api/reviews/${review_uuid}/images/${image_uuid}/`,
    );
  },

  // GET - /api/reviews/booking/{booking_uuid}/
  bookingReview: async (booking_uuid) => {
    return (await api.get(`/api/reviews/booking/${booking_uuid}/`)).data;
  },

  instantBookingReview: async (instant_booking_uuid) => {
    return (
      await api.get(`/api/reviews/instant-booking/${instant_booking_uuid}/`)
    ).data;
  },

  // GET - /api/reviews/booking/{booking_uuid}/eligibility/
  eligibilityReview: async (booking_uuid) => {
    return (await api.get(`/api/reviews/booking/${booking_uuid}/eligibility/`))
      .data;
  },

  instantBookingEligiblityReview: async (instant_booking_uuid) => {
    return (
      await api.get(
        `/api/reviews/instant-booking/${instant_booking_uuid}/eligibility/`,
      )
    ).data;
  },

  // GET - /api/reviews/my/
  getMyReviews: async () => {
    return (await api.get(`/api/reviews/my/`)).data;
  },

  // GET - /api/reviews/rating-summary/
  ratingSummary: async (params) => {
    return (await api.get(`/api/reviews/rating-summary/`, { params })).data;
  },
};
