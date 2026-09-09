import React, { useState, useEffect, useRef } from "react";
import { Phone, XCircle, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "../../services/chatApi";
import { useUserStore } from "../../store/userStore";


const Chat = ({ activeModal, setActiveModal, bookingsList }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();
  const { user } = useUserStore();
  const currentUserId = user?.user_uuid || user?.id;
  const bookingId = activeModal?.bookingId;

  // Derive target user info from bookingsList if available
  const targetBooking = bookingsList?.find((b) => b.uuid === bookingId);
  const targetName =
    targetBooking?.user?.first_name + " " + targetBooking?.user?.last_name ||
    "User";

  // 1. Fetch Conversations
  const { data: conversations } = useQuery({
    queryKey: ["chatConversations"],
    queryFn: async () => {
      const res = await chatApi.getConversations();
      return res.data || res;
    },
    enabled: !!bookingId,
  });
  // console.log(conversations);

  const conversationList = Array.isArray(conversations)
    ? conversations
    : conversations?.results || [];
  const activeConversation = conversationList.find(
    (c) => c.scheduled_booking === bookingId || c.instant_booking === bookingId,
  );
  // console.log(bookingId);

  const conversationId = activeConversation?.conversation_uuid;
  // console.log(conversationId);

  // 2. Fetch Messages
  const { data: messagesData, isLoading: messagesLoading } = useQuery({
    queryKey: ["chatMessages", conversationId],
    queryFn: async () => {
      const res = await chatApi.getMessages(conversationId);
      return res.data || res;
    },
    enabled: !!conversationId,
  });
  // console.log(messagesData);
  

  const messagesList = Array.isArray(messagesData)
    ? messagesData
    : messagesData?.results || [];

  // WebSocket Integration for Chat
  useEffect(() => {
    if (!conversationId) return;

    // Use wss:// for production, ws:// for local
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const host =
      window.location.hostname === "localhost"
        ? "localhost:8000"
        : window.location.host;

    // Connect to chat websocket
    const ws = new WebSocket(`${protocol}//${host}/ws/chat/${conversationId}/`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Determine if it's a typing event or a message
      if (data.type === 'typing_started' || data.type === 'typing_stopped') {
        // Handle typing (could add a typing indicator state here in the future)
        return;
      }

      // We assume it's a message object
      const messageData = data.message || data; // handle both { message: {...} } and direct message payload

      if (!messageData.message_uuid && !messageData.id) return; // not a message

      // Update React Query cache instantly
      queryClient.setQueryData(["chatMessages", conversationId], (oldData) => {
        const oldList = Array.isArray(oldData)
          ? oldData
          : oldData?.results || [];

        // Prevent duplicate appending if we just sent it
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
    };

    return () => {
      ws.close();
    };
  }, [conversationId, queryClient]);

  // 3. Send Message Mutation
  const { mutate: sendMsg, isPending: isSending } = useMutation({
    mutationFn: (text) =>
      chatApi.sendMessage(conversationId, { text }),
    onSuccess: () => {
      // Invalidate to ensure consistency, though WebSocket will append it
      // queryClient.invalidateQueries(["chatMessages", conversationId]);
      setNewMessage("");
    },
  });

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesList]);

  const handleSend = () => {
    if (newMessage.trim() && conversationId && !isSending) {
      sendMsg(newMessage.trim());
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
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-lg border border-emerald-500/20">
                {targetName.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-text-primary">{targetName}</h3>
                <p className="text-xs text-zinc-500 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>{" "}
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

            {messagesList.map((msg) => {
              // msg.sender might be an ID or an object. If it's an object, it usually has user_uuid or id
              const senderId = msg.sender?.user_uuid || msg.sender?.id || msg.sender;
              const isOutgoing = senderId === currentUserId;

              return (
                <div
                  key={msg.message_uuid || msg.id}
                  className={`flex ${isOutgoing ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                      isOutgoing
                        ? "bg-text-primary text-surface-primary rounded-br-none"
                        : "bg-surface-secondary border border-border-primary text-text-primary rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm font-medium leading-relaxed">
                      {msg.text}
                    </p>
                    <p className={`text-[10px] mt-1 text-right font-bold ${isOutgoing ? "text-surface-secondary/70" : "text-zinc-500"}`}>
                      {msg.created_at
                        ? new Date(msg.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-surface-secondary border-t border-border-primary shrink-0">
            <div className="flex items-center gap-2 relative">
              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                disabled={!conversationId || isSending}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newMessage.trim()) {
                    handleSend();
                  }
                }}
                className="flex-1 bg-surface-primary border border-border-primary rounded-2xl pl-5 pr-14 py-4 text-sm font-medium text-text-primary focus:outline-none focus:border-text-primary transition-colors shadow-inner disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!conversationId || !newMessage.trim() || isSending}
                className={`absolute right-2 p-2.5 rounded-xl transition-all duration-300 ${newMessage.trim() ? "bg-text-primary text-surface-primary scale-100 cursor-pointer" : "bg-surface-secondary text-zinc-400 scale-90 cursor-not-allowed"}`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Chat;
