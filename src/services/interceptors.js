import api from "./axiosClient";

export const setupInterceptors = () => {
  // Automatically inject bearer tokens on every request
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Catch global errors (like 401 Unauthorized or 500 Server Error)
  api.interceptors.response.use(
    (response) => response.data, // Simplify response data handling
    async (error) => {
      const originalRequest = error.config;
      // Basic 401 handling for token expiration
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // Implement token refresh logic here
        return api(originalRequest);
      }
      return Promise.reject(error);
    },
  );
};
