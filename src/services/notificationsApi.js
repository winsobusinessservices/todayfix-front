import api from "./axiosClient";

export const notificationsApi = {
  // GET /api/notifications/ (List Notifications)
  getNotifications: async () => {
    const response = await api.get("/api/notifications/");
    return response.data;
  },
  // DELETE /api/notifications/{id}/ (Delete Notification)
  deleteNotification: async (id) => {
    const response = await api.delete(`/api/notifications/${id}/`);
    return response.data;
  },
  // PATCH /api/notifications/{id}/read/ (Mark Notification as Read)
  markAsRead: async (id) => {
    const response = await api.patch(`/api/notifications/${id}/read/`, {
      is_read: true,
    });
    return response.data;
  },
  // PATCH /api/notifications/read-all/ (Mark All Notifications as Read)
  markAllAsRead: async () => {
    const response = await api.patch("/api/notifications/read-all/");
    return response.data;
  },
};
