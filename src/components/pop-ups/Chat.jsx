import React, { useState } from "react";
import {
  MapPin,
  Clock,
  IndianRupee,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Calendar,
  MessageSquare,
  Phone,
  ShieldAlert,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_BOOKINGS = [
  {
    id: "BKG-001",
    customer: "Sarah Jenkins",
    service: "Deep Home Cleaning",
    date: "Oct 24, 2026",
    time: "10:00 AM",
    price: "4,500",
    status: "accepted",
    location: "123 Palm Avenue, Downtown",
  },
  {
    id: "BKG-002",
    customer: "Michael Chen",
    service: "AC Servicing & Repair",
    date: "Oct 24, 2026",
    time: "02:30 PM",
    price: "1,200",
    status: "accepted",
    location: "45B Tech Park, Block C",
  },
  {
    id: "BKG-003",
    customer: "Priya Sharma",
    service: "Plumbing Inspection",
    date: "Oct 23, 2026",
    time: "09:00 AM",
    price: "800",
    status: "completed",
    location: "78 Sunset Blvd",
  },
  {
    id: "BKG-004",
    customer: "David Wilson",
    service: "Electrical Wiring",
    date: "Oct 22, 2026",
    time: "11:00 AM",
    price: "2,100",
    status: "completed",
    location: "12 North Street",
  },
];

const Chat = ({ activeModal, setActiveModal, bookingsList }) => {
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "customer",
      text: "Hi, what time will you be arriving?",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "vendor",
      text: "Hello! I am on my way, should be there in 15 mins.",
      time: "10:32 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
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
                {bookingsList
                  .find((b) => b.id === activeModal.bookingId)
                  ?.customer.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-text-primary">
                  {
                    bookingsList.find((b) => b.id === activeModal.bookingId)
                      ?.customer
                  }
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
                Today
              </span>
            </div>
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "vendor" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${msg.sender === "vendor" ? "bg-text-primary text-surface-primary rounded-br-none" : "bg-surface-secondary border border-border-primary text-text-primary rounded-bl-none"}`}
                >
                  <p className="text-sm font-medium leading-relaxed">
                    {msg.text}
                  </p>
                  <p
                    className={`text-[10px] mt-1 text-right font-bold ${msg.sender === "vendor" ? "text-surface-secondary/70" : "text-zinc-500"}`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-surface-secondary border-t border-border-primary shrink-0">
            <div className="flex items-center gap-2 relative">
              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newMessage.trim()) {
                    setChatMessages([
                      ...chatMessages,
                      {
                        id: Date.now(),
                        sender: "vendor",
                        text: newMessage,
                        time: new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        }),
                      },
                    ]);
                    setNewMessage("");
                  }
                }}
                className="flex-1 bg-surface-primary border border-border-primary rounded-2xl pl-5 pr-14 py-4 text-sm font-medium text-text-primary focus:outline-none focus:border-text-primary transition-colors shadow-inner"
              />
              <button
                onClick={() => {
                  if (newMessage.trim()) {
                    setChatMessages([
                      ...chatMessages,
                      {
                        id: Date.now(),
                        sender: "vendor",
                        text: newMessage,
                        time: new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        }),
                      },
                    ]);
                    setNewMessage("");
                  }
                }}
                className={`absolute right-2 p-2.5 rounded-xl transition-all duration-300 ${newMessage.trim() ? "bg-text-primary text-surface-primary scale-100" : "bg-surface-secondary text-zinc-400 scale-90"}`}
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
