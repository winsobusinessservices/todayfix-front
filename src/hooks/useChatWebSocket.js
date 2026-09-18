import { useEffect, useRef, useState, useCallback } from "react";
import { useUserStore } from "../store/userStore";
import { IMAGE_URL } from "../services/axiosClient";

const MAX_RECONNECT_ATTEMPTS = 5;

const getChatSocketUrl = (baseUrl, conversationId, accessToken) => {
  const socketUrl = new URL(baseUrl, window.location.origin);
  socketUrl.protocol = socketUrl.protocol === "https:" ? "wss:" : "ws:";
  socketUrl.pathname = `/ws/chat/${conversationId}/`;
  socketUrl.search = "";
  socketUrl.searchParams.set("token", accessToken);
  return socketUrl.toString();
};

export const useChatWebSocket = ({
  conversationId,
  onMessageReceived,
  onTypingEvent,
}) => {
  const accessToken = useUserStore((state) => state.accessToken);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);
  
  const onMessageReceivedRef = useRef(onMessageReceived);
  const onTypingEventRef = useRef(onTypingEvent);

  // Keep refs updated
  useEffect(() => {
    onMessageReceivedRef.current = onMessageReceived;
    onTypingEventRef.current = onTypingEvent;
  }, [onMessageReceived, onTypingEvent]);

  useEffect(() => {
    if (!accessToken || !conversationId) return undefined;

    let configuredSocketUrl = import.meta.env.VITE_WS_BASE_URL || IMAGE_URL || "http://localhost:8000";
    // For local dev where IMAGE_URL might be a relative path or production url, make sure it's valid
    if (configuredSocketUrl === "https://todayfix.in" && window.location.hostname === "localhost") {
       configuredSocketUrl = "https://todayfix.in";
    }

    let reconnectTimer;
    let reconnectAttempt = 0;
    let stopped = false;

    const connect = () => {
      try {
        const url = getChatSocketUrl(
          configuredSocketUrl,
          conversationId,
          accessToken
        );
        socketRef.current = new WebSocket(url);
      } catch (error) {
        console.error("Unable to create chat WebSocket:", error);
        return;
      }

      socketRef.current.onopen = () => {
        reconnectAttempt = 0;
        setIsConnected(true);
      };

      socketRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === "typing_started" || data.type === "typing_stopped") {
            onTypingEventRef.current?.(data);
            return;
          }

          // Handle message wrapper or direct payload
          const messageData = data.message || data;
          if (messageData && (messageData.message_uuid || messageData.id)) {
            onMessageReceivedRef.current?.(messageData);
          }
        } catch (error) {
          console.error("Unable to process chat WebSocket message:", error);
        }
      };

      socketRef.current.onerror = () => {
        socketRef.current?.close();
      };

      socketRef.current.onclose = () => {
        setIsConnected(false);
        if (stopped) return;
        
        if (reconnectAttempt >= MAX_RECONNECT_ATTEMPTS) {
          console.warn("Max chat websocket reconnect attempts reached.");
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
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [accessToken, conversationId]);

  const sendTypingEvent = useCallback((isTyping) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: isTyping ? "typing_started" : "typing_stopped",
        })
      );
    }
  }, []);

  return {
    isConnected,
    sendTypingEvent,
  };
};
