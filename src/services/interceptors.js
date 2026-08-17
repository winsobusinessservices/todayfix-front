import axios from "axios";
import { useUserStore } from "../store/userStore";
import api, { API_URL } from "./axiosClient";
import { refreshTokenApi } from "./userApi";

export const setupInterceptors = () => {
  // Automatically inject bearer tokens on every request
  api.interceptors.request.use(
    (config) => {
      const token = useUserStore.getState().accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If error is 401 and we haven't already retried this request
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = useUserStore.getState().refreshToken;

        if (refreshToken) {
          try {
            // Note: using axios directly inside refreshTokenApi to avoid interceptor loops
            const responseData = await refreshTokenApi(refreshToken);

            const newAccessToken = responseData.access;

            // If the backend returns a new refresh token, we save that too.
            // Otherwise, we keep using the old one.
            useUserStore.getState().setTokens({
              access: newAccessToken,
              refresh: responseData.refresh || refreshToken,
            });

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            // If refresh fails (e.g., refresh token is expired), log the user out
            useUserStore.getState().clearAuth();
            // Optionally redirect to login here, but React Router usually handles this
            // via protected routes checking `isAuthenticated`.
          }
        } else {
          // No refresh token available, logout
          useUserStore.getState().clearAuth();
        }
      }

      return Promise.reject(error);
    },
  );
};
