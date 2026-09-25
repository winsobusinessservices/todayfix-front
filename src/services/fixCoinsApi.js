import api from "./axiosClient";

export const fixCoinsApi = {
  // GET /api/fix-coins/balance/
  getBalance: async () => {
    const response = await api.get("/api/fix-coins/balance/");
    return response.data;
  },

  // GET /api/fix-coins/history/
  getHistory: async (page = 1) => {
    const response = await api.get(`/api/fix-coins/history/?page=${page}`);
    return response.data;
  },

  // POST /api/fix-coins/redeem/preview/
  previewRedemption: async (data) => {
    // data: { eligible_amount: string, coins_to_redeem: number }
    const response = await api.post("/api/fix-coins/redeem/preview/", data);
    return response.data;
  }
};
