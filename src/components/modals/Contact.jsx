import {
  ChevronRight,
  MessageSquare,
  Phone,
  ShieldAlert,
  XCircle,
} from "lucide-react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Contact = ({ activeModal ,setActiveModal }) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-surface-primary border border-border-primary shadow-xl rounded-xl p-6 w-full max-w-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-text-primary">
              Contact Customer
            </h3>
            <button
              onClick={() => setActiveModal(null)}
              className="text-zinc-500 hover:text-text-primary"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            <button
              onClick={() =>
                setActiveModal({
                  type: "chat",
                  bookingId: activeModal.bookingId,
                })
              }
              className="w-full flex items-center justify-between p-4 rounded-xl border border-border-primary bg-surface-secondary hover:border-text-primary transition-colors"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="text-blue-500" />
                <span className="font-bold text-text-primary">In-App Chat</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-xl border border-border-primary bg-surface-secondary hover:border-text-primary transition-colors relative overflow-hidden group">
              <div className="flex items-center gap-3 relative z-10">
                <Phone className="text-emerald-500" />
                <div className="text-left">
                  <span className="font-bold text-text-primary block">
                    Secure Call
                  </span>
                  <span className="text-xs text-zinc-500 font-medium">
                    Number is masked
                  </span>
                </div>
              </div>
              <ShieldAlert className="w-16 h-16 text-border-primary absolute -right-2 -bottom-2 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Contact;
