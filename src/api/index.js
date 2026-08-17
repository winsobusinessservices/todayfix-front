const API_URL = "http://localhost:3001";

export const api = {
  // --- Services & Areas ---
  getServices: async () => {
    const res = await fetch(`${API_URL}/services`);
    if (!res.ok) throw new Error("Failed to fetch services");
    return res.json();
  },

  getAreas: async () => {
    const res = await fetch(`${API_URL}/areas`);
    if (!res.ok) throw new Error("Failed to fetch areas");
    return res.json();
  },

  // --- Vendors ---
  getFeaturedVendors: async () => {
    const res = await fetch(
      `${API_URL}/vendorProfile?isFeatured=true&status=APPROVED`,
    );
    if (!res.ok) throw new Error("Failed to fetch featured vendors");
    return res.json();
  },

  getVendorsByService: async (serviceName) => {
    const res = await fetch(
      `${API_URL}/vendorProfile?service=${encodeURIComponent(serviceName)}&status=APPROVED`,
    );
    if (!res.ok) throw new Error("Failed to fetch vendors for service");
    return res.json();
  },

  getAllVendors: async () => {
    const res = await fetch(`${API_URL}/vendorProfile?status=APPROVED`);
    if (!res.ok) throw new Error("Failed to fetch vendors");
    return res.json();
  },

  getVendorById: async (id) => {
    const res = await fetch(`${API_URL}/vendorProfile/${id}`);
    if (!res.ok) throw new Error("Failed to fetch vendor");
    return res.json();
  },

  registerVendor: async (vendorData) => {
    const res = await fetch(`${API_URL}/vendorProfile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...vendorData,
        status: "PENDING",
        isFeatured: false,
      }),
    });
    if (!res.ok) throw new Error("Failed to register vendor");
    return res.json();
  },

  // --- Service Requests ---
  createServiceRequest: async (requestData) => {
    const res = await fetch(`${API_URL}/serviceRequests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...requestData,
        status: "PENDING_ADMIN",
        assignedVendorId: null,
      }),
    });
    if (!res.ok) throw new Error("Failed to create request");
    return res.json();
  },

  // --- Bookings ---
  getBookingsByCustomerId: async (customerId) => {
    const res = await fetch(`${API_URL}/bookings?customerId=${customerId}`);
    if (!res.ok) throw new Error("Failed to fetch bookings");
    return res.json();
  },

  // --- Reviews ---
  getReviewsByVendorId: async (vendorId) => {
    const res = await fetch(`${API_URL}/reviews?vendorId=${vendorId}`);
    if (!res.ok) throw new Error("Failed to fetch reviews");
    return res.json();
  },

  addReview: async (reviewData) => {
    const res = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...reviewData,
        date: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error("Failed to add review");
    return res.json();
  },
};
