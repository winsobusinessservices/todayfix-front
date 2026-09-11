import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNotificationStore } from "../store/notificationStore";
import { useUserStore } from "../store/userStore";

const POLLING_INTERVAL_MS = 15000;
const MAX_RECONNECT_ATTEMPTS = 2;

const getNotificationSocketUrl = (baseUrl, accessToken) => {
  const socketUrl = new URL(baseUrl, window.location.origin);
  socketUrl.protocol = socketUrl.protocol === "https:" ? "wss:" : "ws:";
  socketUrl.pathname = "/ws/notifications/";
  socketUrl.search = "";
  socketUrl.searchParams.set("token", accessToken);
  return socketUrl.toString();
};

const getNotificationFromMessage = (message) => {
  if (message?.notification && typeof message.notification === "object") {
    return message.notification;
  }
  if (message?.data && typeof message.data === "object") {
    return message.data;
  }
  if (message?.id && (message?.title || message?.message)) return message;
  return null;
};

export const useNotificationWebSocket = (onMessage) => {
  const accessToken = useUserStore((state) => state.accessToken);
  const receiveNotification = useNotificationStore(
    (state) => state.receiveNotification,
  );
  const fetchNotifications = useNotificationStore(
    (state) => state.fetchNotifications,
  );
  const onMessageRef = useRef(onMessage);
  const knownNotificationIdsRef = useRef(new Set());
  const hasNotificationBaselineRef = useRef(false);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    if (!accessToken) return undefined;

    knownNotificationIdsRef.current = new Set();
    hasNotificationBaselineRef.current = false;
    const configuredSocketUrl = import.meta.env.VITE_WS_BASE_URL;
    let socket;
    let reconnectTimer;
    let pollingTimer;
    let reconnectAttempt = 0;
    let stopped = false;

    const showNotification = (notification, message) => {
      knownNotificationIdsRef.current.add(notification.id);
      toast(`${notification.title}\n${notification.message}`, { icon: "🔔" });
      onMessageRef.current?.(message);
    };

    const refreshNotifications = async (announceNew = false) => {
      try {
        const latestNotifications = await fetchNotifications({ silent: true });
        if (stopped) return;

        if (!hasNotificationBaselineRef.current) {
          knownNotificationIdsRef.current = new Set(
            latestNotifications.map((notification) => notification.id),
          );
          hasNotificationBaselineRef.current = true;
          return;
        }

        if (announceNew) {
          latestNotifications
            .filter(
              (notification) =>
                !knownNotificationIdsRef.current.has(notification.id),
            )
            .reverse()
            .forEach((notification) =>
              showNotification(notification, {
                type: "notification",
                notification,
              }),
            );
        }

        latestNotifications.forEach((notification) =>
          knownNotificationIdsRef.current.add(notification.id),
        );
      } catch {
        // The notification drawer already exposes the REST error and retry UI.
      }
    };

    const startPolling = () => {
      if (stopped || pollingTimer) return;
      refreshNotifications(false);
      pollingTimer = window.setInterval(() => {
        refreshNotifications(true);
      }, POLLING_INTERVAL_MS);
    };

    if (!configuredSocketUrl) {
      startPolling();
      return () => {
        stopped = true;
        window.clearInterval(pollingTimer);
      };
    }

    const connect = () => {
      try {
        socket = new WebSocket(
          getNotificationSocketUrl(configuredSocketUrl, accessToken),
        );
      } catch (error) {
        console.error("Unable to create notification WebSocket:", error);
        startPolling();
        return;
      }

      socket.onopen = () => {
        reconnectAttempt = 0;
      };

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          const incomingNotification = getNotificationFromMessage(message);

          if (incomingNotification) {
            const notification = receiveNotification(incomingNotification);
            showNotification(notification, message);
          }

          if (!incomingNotification) onMessageRef.current?.(message);
          const eventType = String(message?.type || "").toLowerCase();
          if (
            incomingNotification ||
            eventType.includes("notification") ||
            eventType === "new_booking"
          ) {
            refreshNotifications(false);
          }
        } catch (error) {
          console.error("Unable to process notification WebSocket message:", error);
        }
      };

      socket.onerror = () => {
        socket.close();
      };

      socket.onclose = () => {
        if (stopped) return;
        if (reconnectAttempt >= MAX_RECONNECT_ATTEMPTS) {
          startPolling();
          return;
        }
        const delay = Math.min(30000, 1000 * 2 ** reconnectAttempt);
        reconnectAttempt += 1;
        reconnectTimer = window.setTimeout(connect, delay);
      };
    };

    connect();

    return () => {
      stopped = true;
      window.clearTimeout(reconnectTimer);
      window.clearInterval(pollingTimer);
      socket?.close();
    };
  }, [accessToken, fetchNotifications, receiveNotification]);
};
