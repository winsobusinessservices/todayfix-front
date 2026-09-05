import api from "./axiosClient";

export const userDetails = async () => {
  return await api.get("/api/auth/profile/").then((data) => data.data.data);
};

export const updateProfile = async (userData) => {
  return await api
    .post("/api/auth/profile/update/", userData)
    .then((data) => data.data);
};

export const userBookingHistory = async ({ page } = {}) => {
  const res = await api.get("/api/bookings/history/", {
    params: { page },
  });
  return res.data;
};

export const userPendingBooking = async ({ page } = {}) => {
  const res = await api.get("/api/bookings/history/pending/", {
    params: { page },
  });
  return res.data;
};

export const submitBusinessApplication = async (formData) => {
  return await api
    .post("/api/business/applications/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((data) => data.data);
};

// Dummy data until given.
export const userServicesHistory = async () => {
  const res = await new Promise((resolve) =>
    resolve(
      new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    ),
  );
  const data = await res.json();
  return data;
};

export const userPendingServices = async () => {
  const res = await new Promise((resolve) =>
    resolve(
      new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    ),
  );
  const data = await res.json();
  return data;
};

export const userReviews = async () => {
  const res = await new Promise((resolve) =>
    resolve(
      new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    ),
  );
  return await res.json();
};
