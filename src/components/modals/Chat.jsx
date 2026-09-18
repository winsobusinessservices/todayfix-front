import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Phone,
  XCircle,
  Send,
  Circle,
  Rotate3DIcon,
  CheckCheck,
  Check,
  Pencil,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "../../services/chatApi";
import { useUserStore } from "../../store/userStore";
import { IMAGE_URL } from "../../services/axiosClient";
import { useChatWebSocket } from "../../hooks/useChatWebSocket";

const Chat = ({ activeModal, setActiveModal, bookingsList }) => {
  const [newMessage, setNewMessage] = useState("");
  const [editingMessage, setEditingMessage] = useState(null);
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();
  const { user, accessToken } = useUserStore();
  const currentUserId = user?.user_uuid || user?.id;
  const bookingId = activeModal?.bookingId;

  // Extract target booking from the modal payload
  const targetBooking = activeModal?.booking;

  const isCustomer =
    targetBooking?.user?.id === currentUserId ||
    targetBooking?.user?.user_uuid === currentUserId;
  const targetName = isCustomer
    ? targetBooking?.business?.name || "Service Provider"
    : targetBooking?.user?.first_name + " " + targetBooking?.user?.last_name ||
      "Customer";

  const isChatDisabled =
    targetBooking &&
    ["COMPLETED", "CANCELLED", "REJECTED"].includes(targetBooking.status);

  // 1. Fetch Conversations
  const { data: conversations } = useQuery({
    queryKey: ["chatConversations"],
    queryFn: async () => {
      const res = await chatApi.getConversations();
      return res.data || res;
    },
    enabled: !!bookingId,
  });

  const conversationList = Array.isArray(conversations)
    ? conversations
    : conversations?.results || [];

  const activeConversation = conversationList.find((c) => {
    const sBooking = c.scheduled_booking;
    const iBooking = c.instant_booking;
    console.log(sBooking, iBooking);
    return (
      sBooking == bookingId ||
      iBooking == bookingId ||
      (targetBooking?.id && sBooking == targetBooking.id) ||
      (targetBooking?.id && iBooking == targetBooking.id) ||
      sBooking === targetBooking?.uuid ||
      iBooking === targetBooking?.uuid ||
      sBooking === targetBooking?.booking_uuid
    );
  });

  const conversationId = activeConversation?.conversation_uuid || activeConversation?.uuid;
  // const conversationId = targetBooking?.uuid;

  // 1. Setup WebSocket Hook First (so we can use isConnected)
  const handleWebSocketMessage = useCallback(
    (messageData) => {
      queryClient.setQueryData(["chatMessages", conversationId], (oldData) => {
        const oldList = Array.isArray(oldData)
          ? oldData
          : oldData?.results || [];

        if (
          oldList.find(
            (m) =>
              m.message_uuid === messageData.message_uuid ||
              (messageData.id && m.id === messageData.id),
          )
        ) {
          return oldData;
        }

        const newList = [...oldList, messageData];
        if (oldData && !Array.isArray(oldData) && oldData.results) {
          return { ...oldData, results: newList };
        }
        return newList;
      });
    },
    [conversationId, queryClient],
  );

  const handleTypingEvent = useCallback(
    (data) => {
      if (data.user_uuid !== currentUserId) {
        if (data.type === "typing_started") {
          setIsOtherTyping(true);
        } else if (data.type === "typing_stopped") {
          setIsOtherTyping(false);
        }
      }
    },
    [currentUserId],
  );

  const { isConnected, sendTypingEvent } = useChatWebSocket({
    conversationId,
    onMessageReceived: handleWebSocketMessage,
    onTypingEvent: handleTypingEvent,
  });

  // 2. Fetch Messages
  const { data: messagesData, isLoading: messagesLoading } = useQuery({
    queryKey: ["chatMessages", conversationId],
    queryFn: async () => {
      const res = await chatApi.getMessages(conversationId);
      return res.data || res;
    },
    enabled: !!conversationId,
    refetchInterval: isConnected ? false : 3000, // Fallback to polling every 3s if WebSocket fails
  });

  const messagesList = Array.isArray(messagesData)
    ? messagesData
    : messagesData?.results || [];

  // 3. Send Message Mutation
  const { mutate: sendMsg, isPending: isSending } = useMutation({
    mutationFn: (text) => chatApi.sendMessage(conversationId, { text }),
    onSuccess: () => {
      setNewMessage("");
    },
  });

  const { mutate: updateMsg, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, text }) => chatApi.updateMessage(id, { text }),
    onSuccess: () => {
      setNewMessage("");
      setEditingMessage(null);
    },
  });

  const { mutate: deleteMsg } = useMutation({
    mutationFn: (id) => chatApi.deleteMessage(id),
  });

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesList]);

  // Mark incoming messages as read
  useEffect(() => {
    messagesList.forEach((msg) => {
      const senderId = msg.sender?.user_uuid || msg.sender?.id || msg.sender;
      const isOwnMessage =
        senderId === user?.user_uuid ||
        senderId === user?.id ||
        String(senderId) === String(user?.id) ||
        String(senderId) === String(user?.user_uuid);

      if (!isOwnMessage && !msg.is_read) {
        chatApi.markMessageAsRead(msg.message_uuid || msg.id).catch(() => {});
      }
    });
  }, [messagesList, user]);

  const handleSend = () => {
    if (newMessage.trim() && conversationId && !isSending && !isUpdating) {
      if (editingMessage) {
        updateMsg({
          id: editingMessage.message_uuid || editingMessage.id,
          text: newMessage.trim(),
        });
      } else {
        sendMsg(newMessage.trim());
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="bg-surface-primary border border-border-primary shadow-xl rounded-xl w-full max-w-lg h-[600px] max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-border-primary flex items-center justify-between bg-surface-secondary shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-secondary text-text-primary flex items-center justify-center font-bold text-lg border border-border-primary">
                {targetName.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-text-primary">{targetName}</h3>
                <p className="text-xs text-zinc-500 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse"></span>{" "}
                  Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setActiveModal({
                    type: "contact",
                    bookingId: activeModal.bookingId,
                  })
                }
                className="p-2 text-zinc-500 hover:text-text-primary hover:bg-surface-primary rounded-full transition-colors"
              >
                <Phone className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 text-zinc-500 hover:text-text-primary hover:bg-surface-primary rounded-full transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 styled-scrollbar bg-surface-primary">
            <div className="text-center pb-4">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest bg-surface-secondary px-3 py-1 rounded-full border border-border-primary">
                Chat History
              </span>
            </div>

            {!conversationId && !messagesLoading && (
              <div className="text-center text-text-secondary text-sm italic mt-10">
                Conversation not initialized yet.
              </div>
            )}

            {messagesList.toReversed().map((msg) => {
              // msg.sender might be an ID or an object. If it's an object, it usually has user_uuid or id
              const senderId =
                msg.sender?.user_uuid || msg.sender?.id || msg.sender;
              const isOutgoing = senderId === currentUserId;
              return (
                <div
                  key={msg.message_uuid || msg.id}
                  className={`flex ${isOutgoing ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-center gap-2 group ${isOutgoing ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`w-fit rounded-xl p-2 shadow-sm ${
                        isOutgoing
                          ? "bg-text-primary text-surface-primary rounded-br-none"
                          : "bg-surface-secondary border border-border-primary text-text-primary rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm font-medium leading-relaxed">
                        {msg.text}
                      </p>

                      <div className="flex gap-1 items-center">
                        {msg.isEdited && (
                          <span className="italic text-[10px]">Edited</span>
                        )}
                        <p
                          className={`text-[10px] mt-1 text-right font-bold ${isOutgoing ? "text-surface-secondary/70" : "text-zinc-500"}`}
                        >
                          {msg.created_at
                            ? new Date(msg.created_at).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </p>
                        {msg?.is_read ? (
                          <CheckCheck className="h-3" />
                        ) : (
                          <Check className="h-3" />
                        )}
                      </div>
                    </div>
                    {isOutgoing && !isChatDisabled && (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                        <button
                          onClick={() => {
                            setEditingMessage(msg);
                            setNewMessage(msg.text);
                          }}
                          className="text-zinc-400 hover:text-blue-500 cursor-pointer"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => deleteMsg(msg.message_uuid || msg.id)}
                          className="text-zinc-400 hover:text-red-500 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-surface-secondary border-t border-border-primary shrink-0">
            {isChatDisabled ? (
              <div className="text-center text-sm font-bold text-zinc-500 py-3 bg-surface-primary border border-border-primary rounded-xl">
                This booking is {bookingsList?.status.toLowerCase()}, chat is
                closed.
              </div>
            ) : (
              <div className="flex flex-col gap-2 relative">
                {editingMessage && (
                  <div className="flex items-center justify-between bg-surface-primary border border-blue-500/30 rounded-xl px-4 py-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Pencil size={12} className="text-blue-500" />
                      <span className="text-zinc-500">Editing Message</span>
                    </div>
                    <button
                      onClick={() => {
                        setEditingMessage(null);
                        setNewMessage("");
                      }}
                      className="text-zinc-400 hover:text-text-primary"
                    >
                      <XCircle size={14} />
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-2 relative">
                  <AnimatePresence>
                    {isOtherTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute -top-7 left-2 text-xs font-bold text-zinc-500 bg-surface-primary px-3 py-1 rounded-full border border-border-primary shadow-sm flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
                        <span
                          className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></span>
                        <span
                          className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></span>
                        <span className="ml-1">{targetName} is typing...</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    disabled={!conversationId || isSending || isUpdating}
                    onChange={(e) => {
                      setNewMessage(e.target.value);

                      // Handle typing events
                      sendTypingEvent(true);

                      if (typingTimeoutRef.current) {
                        clearTimeout(typingTimeoutRef.current);
                      }

                      typingTimeoutRef.current = setTimeout(() => {
                        sendTypingEvent(false);
                      }, 1500);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newMessage.trim()) {
                        if (typingTimeoutRef.current) {
                          clearTimeout(typingTimeoutRef.current);
                        }
                        sendTypingEvent(false);
                        handleSend();
                      }
                    }}
                    className="flex-1 bg-surface-primary border border-border-primary rounded-2xl pl-5 pr-14 py-4 text-sm font-medium text-text-primary focus:outline-none focus:border-text-primary transition-colors shadow-inner disabled:opacity-50"
                  />
                  <button
                    onClick={handleSend}
                    disabled={
                      !newMessage.trim() ||
                      !conversationId ||
                      isSending ||
                      isUpdating ||
                      isChatDisabled
                    }
                    className="btn-primary absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-text-primary text-surface-primary rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 shadow-md cursor-pointer"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Chat;
