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
  // createConversation: async (data) => {
  //   const response = await api.post("/api/chat/conversations/", data);
  //   return response.data;
  // },

  // GET /api/chat/conversations/<uuid>/messages/ (List messages in conversation)
  getMessages: async (conversationId) => {
    const response = await api.get(`/api/chat/conversations/${conversationId}/messages/`);
    return response.data;
  },

  // POST /api/chat/conversations/<uuid>/messages/ (Send message)
  sendMessage: async (conversationId, data) => {
    const response = await api.post(`/api/chat/conversations/${conversationId}/messages/`, data);
    return response.data;
  },

  // PATCH /api/chat/messages/<uuid>/ (Update/Edit message)
  updateMessage: async (messageId, data) => {
    const response = await api.patch(`/api/chat/messages/${messageId}/`, data);
    return response.data;
  },

  // DELETE /api/chat/messages/<uuid>/ (Delete message)
  deleteMessage: async (messageId) => {
    const response = await api.delete(`/api/chat/messages/${messageId}/`);
    return response.data;
  },

  // POST /api/chat/messages/<uuid>/read/ (Mark message as read)
  markMessageAsRead: async (messageId) => {
    const response = await api.post(`/api/chat/messages/${messageId}/read/`);
    return response.data;
  }
};
