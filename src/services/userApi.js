import api from "./axiosClient";

export const register = async ({ userRegisterData }) => {
  return await api.post("/auth/register", {
    firstName: userRegisterData.firstName,
    lastName: userRegisterData.lastName,
    email: userRegisterData.email,
    password: userRegisterData.password,
  });
};

export const login = async ({ loginData }) => {
  return await api.post("/auth/login", {
    email: loginData.email,
    password: loginData.password,
  });
};

export const userDetails = async () => {
  return await api.get("/user");
};

export const userServicesHistory = async () => {
  return await api.get("/servicesHistory");
};

export const userPendingServices = async () => {
  return await api.get("/pendingServices");
};

export const userReviews = async () => {
  return await api.get("/userReviews");
};
