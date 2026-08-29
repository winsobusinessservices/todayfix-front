import api from "./axiosClient";

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
