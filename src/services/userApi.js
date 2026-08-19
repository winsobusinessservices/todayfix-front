import axios from "axios";
import api, { API_URL } from "./axiosClient";

export const register = async (userRegisterData) => {
  return await api
    .post("/api/auth/signup/register/", userRegisterData)
    .then((data) => data.data);
};

export const verifyEmail = async (data) => {
  return await api
    .post("/api/auth/signup/verify-email/", {
      uuid: data.uuid,
      token: data.token,
    })
    .then((data) => data.data);
};

export const verifyOTP = async (otp) => {
  return await api
    .post("/api/auth/signup/verify-otp/", {
      otp: otp,
    })
    .then((data) => data.data);
};

export const login = async (loginData) => {
  return await api
    .post("/api/auth/login/", loginData)
    .then((data) => data.data);
};

export const logout = async (refreshToken) => {
  return await api
    .post("/api/auth/logout/", {
      refresh: refreshToken,
    })
    .then((data) => data.data);
};

export const forgetPassword = async (email) => {
  return await api
    .post("/api/auth/password/forgot/", {
      email: email,
    })
    .then((data) => data.data);
};

export const refreshTokenApi = async (refreshToken) => {
  return await axios
    .post(`${API_URL}/api/auth/token/refresh/`, {
      refresh: refreshToken,
    })
    .then((data) => data.data);
};

export const userDetails = async () => {
  return await api.get("/api/auth/profile/").then((data) => data.data.data);
};

export const updateProfile = async (userData) => {
  return await api
    .post("/api/auth/profile/update/", userData)
    .then((data) => data.data);
};

// Dummy data until given.
export const userServicesHistory = async () => {
  const service = [
    {
      id: "1",
      name: "Interior Design",
      description:
        "Transform your living space with our top-rated, verified interior design professionals.",
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Home & Decor",
      vendorCount: 142,
      vendors: [
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice&backgroundColor=b6e3f4",
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob&backgroundColor=c0aede",
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie&backgroundColor=d1d4f9",
      ],
    },
    {
      id: "2",
      name: "Solar Installation",
      description:
        "Switch to renewable energy with certified solar panel installers and consultants.",
      image:
        "https://images.unsplash.com/photo-1509391366360-519e372179a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Green Energy",
      vendorCount: 86,
      vendors: [
        "https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=ffdfbf",
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Eva&backgroundColor=b6e3f4",
      ],
    },
    {
      id: "3",
      name: "Packers & Movers",
      description:
        "Stress-free relocation services for your home or office with trusted moving teams.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Logistics",
      vendorCount: 215,
      vendors: [
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace&backgroundColor=c0aede",
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Heidi&backgroundColor=d1d4f9",
      ],
    },
    {
      id: "4",
      name: "Home Cleaning",
      description:
        "Deep cleaning services for your entire home, keeping it spotless and hygienic.",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Maintenance",
      vendorCount: 310,
      vendors: [
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack&backgroundColor=ffdfbf",
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Karen&backgroundColor=c0aede",
      ],
    },
    {
      id: "5",
      name: "AC Repair",
      description:
        "Quick and reliable AC servicing and repair to keep your home cool.",
      image:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Appliances",
      vendorCount: 95,
      vendors: [
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Mona&backgroundColor=d1d4f9",
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Ned&backgroundColor=ffd5dc",
      ],
    },
    {
      id: "6",
      name: "Pest Control",
      description:
        "Effective pest control solutions to protect your home and family from bugs.",
      image:
        "https://images.unsplash.com/photo-1584820927498-cafe8c1c9695?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Maintenance",
      vendorCount: 154,
      vendors: [
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Paul&backgroundColor=c0aede",
      ],
    },
    {
      id: "7",
      name: "Electrician",
      description:
        "Expert electricians for wiring, fixing faults, and installing appliances safely.",
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Repairs",
      vendorCount: 220,
      vendors: [
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam&backgroundColor=b6e3f4",
      ],
    },
    {
      id: "8",
      name: "Plumbing",
      description:
        "Fast and reliable plumbing services for leaks, pipes, and fixture installations.",
      image:
        "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Repairs",
      vendorCount: 185,
      vendors: [
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Victor&backgroundColor=ffdfbf",
      ],
    },
  ];
  const res = await new Promise((resolve) =>
    resolve(
      new Response(JSON.stringify(service), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    ),
  );
  const data = await res.json();
  return data;
};

export const userPendingServices = async () => {
  const userPendingServices = [
    {
      id: "REQ-001",
      service: "AC Servicing & Repair",
      date: "Aug 5, 2026",
      budget: "1500",
      location: "Indiranagar, Bengaluru",
      status: "looking",
      description:
        "My split AC is not cooling properly and making a loud noise. It's a 1.5 ton Voltas AC.",
    },
    {
      id: "REQ-002",
      service: "Deep Home Cleaning",
      date: "Aug 1, 2026",
      budget: "2500",
      location: "Whitefield, Bengaluru",
      status: "accepted",
      vendorName: "Sparkle Cleaners",
      description:
        "Full deep cleaning of a 2BHK unfurnished flat before moving in.",
    },
    {
      id: "REQ-003",
      service: "Plumbing Fixes",
      date: "Jul 28, 2026",
      budget: "800",
      location: "Koramangala, Bengaluru",
      status: "pending",
      description: "Kitchen sink pipe is leaking heavily.",
    },
  ];
  const res = await new Promise((resolve) =>
    resolve(
      new Response(JSON.stringify(userPendingServices), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    ),
  );
  const data = await res.json();
  return data;
};

export const userReviews = async () => {
  const userReviews = [
    {
      providerId: 1,
      businessName: "Sparkle Cleaners",
      rating: 5,
      comment: "Excellent team. They were on time and left the house spotless.",
      date: "1-Aug-2026",
    },
  ];
  const res = await new Promise((resolve) =>
    resolve(
      new Response(JSON.stringify(userReviews), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    ),
  );
  return await res.json();
};
