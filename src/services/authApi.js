import api, { API_URL } from "./axiosClient";
import axios from "axios";

export const register = async (userRegisterData) => {
  return await api
    .post("/api/auth/signup/register/", userRegisterData)
    .then((data) => data.data);
};

export const verifyEmail = async (data) => {
  return await api
    .post("/api/auth/signup/verify-email/", {
      pending_registration_uuid: data.uuid,
      token: data.token,
    })
    .then((data) => data.data);
};

export const verifyOTP = async (data) => {
  return await api
    .post("/api/auth/signup/verify-otp/", {
      phone: data.phone,
      otp: data.otp,
    })
    .then((data) => data.data);
};

export const login = async (loginData) => {
  return await api
    .post("/api/auth/login/", loginData)
    .then((data) => data.data);
};

export const sendLoginOTP = async (phone) => {
  return await api
    .post("/api/auth/login/send-otp/", { phone })
    .then((data) => data.data);
};

export const verifyLoginOTP = async (data) => {
  return await api
    .post("/api/auth/login/verify-otp/", {
      phone: data.phone,
      otp: data.otp,
    })
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

export const resetPassword = async (data) => {
  return await api
    .post("/api/auth/password/reset/", data)
    .then((res) => res.data);
};

export const refreshTokenApi = async (refreshToken) => {
  return await axios
    .post(`${API_URL}/api/auth/token/refresh/`, {
      refresh: refreshToken,
    })
    .then((data) => data.data);
};

export const googleLogin = async (credential) => {
  return await api
    .post("/api/auth/google/", { credential: credential })
    .then((res) => res.data);
};

export const verifyProfilePhone = async (data) => {
  return await api
    .post("/api/auth/profile/verify-phone/", {
      phone: data.phone,
      otp: data.otp,
    })
    .then((res) => res.data);
};

export const requestAccountDeletion = async (password) => {
  return await api
    .post("/api/auth/profile/delete/request/", { password })
    .then((res) => res.data);
};

export const verifyProfileEmail = async (data) => {
  return await api
    .post("/api/auth/profile/verify-email/", {
      email_update_verification_uuid: data.email_update_verification_uuid,
      token: data.token,
    })
    .then((res) => res.data);
};

export const verifyAccountDeletion = async (otp) => {
  return await api
    .post("/api/auth/profile/delete/verify/", { otp })
    .then((res) => res.data);
};

// These two need an explicit token passed because they run before the user is fully logged in
export const getAccountDeletionStatus = async (token) => {
  return await axios
    .get(`${API_URL}/api/auth/profile/delete/status/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => res.data);
};

export const cancelAccountDeletion = async (token) => {
  return await axios
    .post(`${API_URL}/api/auth/profile/delete/cancel/`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => res.data);
};
