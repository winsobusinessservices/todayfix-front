import api from "./axiosClient";

export const googleLogin = async (credential) => {
  return await api
    .post("/api/auth/google/", { credential: credential })
    .then((res) => res.data);
};
