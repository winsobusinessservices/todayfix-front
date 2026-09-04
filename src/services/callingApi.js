import api from "./axiosClient";

export const callingApi = {
  // GET /api/calling/calls/ (List call sessions)
  getCallSessions: async () => {
    const response = await api.get("/api/calling/calls/");
    return response.data;
  },
  
  // GET /api/calling/calls/<uuid>/ (Call session details)
  getCallSessionDetails: async (sessionId) => {
    const response = await api.get(`/api/calling/calls/${sessionId}/`);
    return response.data;
  },

  // POST /api/calling/calls/ (Create a call session)
  createCallSession: async (data) => {
    const response = await api.post("/api/calling/calls/", data);
    return response.data;
  }
};
