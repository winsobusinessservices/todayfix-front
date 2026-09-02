import axios from "axios";

export const API_URL = import.meta.env.VITE_API_BASE_URL || "";
export const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL || "http://97.74.95.171:8000";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
