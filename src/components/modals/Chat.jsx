import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  XCircle,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "../../services/chatApi";

const Chat = ({ activeModal, setActiveModal, bookingsList }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();
  const bookingId = activeModal?.bookingId;

  // Derive target user info from bookingsList if available
  const targetBooking = bookingsList?.find((b) => b.id === bookingId || b.instant_booking_uuid === bookingId || b.uuid === bookingId);
  const targetName = targetBooking?.customer || targetBooking?.business_name || "User";

  // 1. Fetch Conversations
  const { data: conversations } = useQuery({
    queryKey: ["chatConversations"],
    queryFn: async () => {
      const res = await chatApi.getConversations();
      return res.data || res;
    },
    enabled: !!bookingId,
  });

  const conversationList = Array.isArray(conversations) ? conversations : (conversations?.results || []);
  const activeConversation = conversationList.find(
    (c) => c.scheduled_booking === bookingId || c.instant_booking === bookingId
  );
  
  const conversationId = activeConversation?.conversation_uuid;

  // 2. Fetch Messages
  const { data: messagesData, isLoading: messagesLoading } = useQuery({
    queryKey: ["chatMessages", conversationId],
    queryFn: async () => {
      const res = await chatApi.getMessages(conversationId);
      return res.data || res;
    },
    enabled: !!conversationId,
    refetchInterval: 3000, // Poll every 3 seconds
  });

  const messagesList = Array.isArray(messagesData) ? messagesData : (messagesData?.results || []);

  // 3. Send Message Mutation
  const { mutate: sendMsg, isPending: isSending } = useMutation({
    mutationFn: (text) => chatApi.sendMessage({ conversation: conversationId, text }),
    onSuccess: () => {
      queryClient.invalidateQueries(["chatMessages", conversationId]);
      setNewMessage("");
    }
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
                <h3 className="font-bold text-text-primary">
                  {targetName}
                </h3>
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
              // The backend `msg.sender` might just be an ID, or we need to check if we are the sender
              // For now, if msg.is_me is not provided, we might have to infer it or rely on standard formatting
              // We'll just assume all incoming are from 'customer' and outgoing 'vendor' for demo purposes if backend doesn't flag it, 
              // but ideally backend gives us an 'is_me' boolean or 'sender_id' we match with current user.
              // We'll assume msg.text is the content.
              
              const isOutgoing = true; // Hardcoded for demo if no sender logic exists, ideally check msg.sender === currentUser.id
              
              return (
                <div
                  key={msg.message_uuid || msg.id}
                  className={`flex justify-start`} // In real app: isOutgoing ? "justify-end" : "justify-start"
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 shadow-sm bg-surface-secondary border border-border-primary text-text-primary rounded-bl-none`}
                  >
                    <p className="text-sm font-medium leading-relaxed">
                      {msg.text}
                    </p>
                    <p className="text-[10px] mt-1 text-right font-bold text-zinc-500">
                      {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
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
