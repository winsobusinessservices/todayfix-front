import api from "./axiosClient";

export const chatApi = {
  // GET /api/chat/conversations/ (List conversations)
  getConversations: async () => {
    const response = await api.get("/api/chat/conversations/");
    return response.data;
  },
  
  // GET /api/chat/conversations/<uuid>/ (Conversation details)
  getConversationDetails: async (conversationId) => {
    const response = await api.get(`/api/chat/conversations/${conversationId}/`);
    return response.data;
  },

  // POST /api/chat/conversations/ (Create conversation)
  createConversation: async (data) => {
    const response = await api.post("/api/chat/conversations/", data);
    return response.data;
  },

  // GET /api/chat/conversations/<uuid>/messages/ (List messages in conversation)
  getMessages: async (conversationId) => {
    const response = await api.get(`/api/chat/conversations/${conversationId}/messages/`);
    return response.data;
  },

  // POST /api/chat/conversations/<uuid>/messages/ (Send message)
  sendMessage: async (conversationId, data) => {
    const response = await api.post(`/api/chat/conversations/${conversationId}/messages/`, data);
    return response.data;
  }
};
