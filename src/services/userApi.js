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

const DUMMY_URL = "http://localhost:3001";

export const userServicesHistory = async () => {
  // return await api.get("/servicesHistory").then((data) => data.data);
  const res = await fetch(DUMMY_URL + "/servicesHistory");
  const data = await res.json();
  // console.log(data);
  return data;
};

export const userPendingServices = async () => {
  // return await api.get("/userPendingServices").then((data) => data.data);
  const res = await fetch(DUMMY_URL + "/userPendingServices");
  const data = await res.json();
  // console.log(data);
  return data;
};

export const userReviews = async () => {
  // return await api.get("/userReviews").then((data) => data.data);
  const res = await fetch(DUMMY_URL + "/userReviews");
  return await res.json();
};
