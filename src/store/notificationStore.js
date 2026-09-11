import { create } from "zustand";
import { notificationsApi } from "../services/notificationsApi";

const getNotificationList = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.results)) return response.results;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.results)) return response.data.results;
  return [];
};

const normalizeRealtimeNotification = (notification) => ({
  ...notification,
  id:
    notification?.id ||
    notification?.notification_uuid ||
    `realtime-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  title:
    notification?.title ||
    notification?.service_title ||
    "New notification",
  message:
    notification?.message ||
    notification?.detail ||
    notification?.morphed_location ||
    "You have a new update.",
  is_read: notification?.is_read ?? false,
  created_at: notification?.created_at || new Date().toISOString(),
});

export const useNotificationStore = create((set) => ({
  notifications: [],
  isLoading: false,
  error: null,

  receiveNotification: (incomingNotification) => {
    const notification = normalizeRealtimeNotification(incomingNotification);
    set((state) => ({
      notifications: [
        notification,
        ...state.notifications.filter((item) => item.id !== notification.id),
      ],
    }));
    return notification;
  },

  fetchNotifications: async ({ silent = false } = {}) => {
    if (!silent) set({ isLoading: true, error: null });
    try {
      const response = await notificationsApi.getNotifications();
      const notifications = getNotificationList(response);
      set({ notifications, isLoading: false, error: null });
      return notifications;
    } catch (error) {
      if (!silent) set({ error, isLoading: false });
      throw error;
    }
  },

  markAsRead: async (id) => {
    const updatedNotification = await notificationsApi.markAsRead(id);
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id
          ? { ...notification, ...updatedNotification, is_read: true }
          : notification,
      ),
    }));
  },

  markAllAsRead: async () => {
    await notificationsApi.markAllAsRead();
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        is_read: true,
      })),
    }));
  },

  deleteNotification: async (id) => {
    await notificationsApi.deleteNotification(id);
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id,
      ),
    }));
  },
}));
