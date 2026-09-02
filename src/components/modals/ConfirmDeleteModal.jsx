import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, X } from "lucide-react";

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isDeleting,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-surface-primary rounded-3xl border border-border-primary shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-6 text-center pt-8">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                <Trash2 size={28} className="text-red-500" />
              </div>
              <h2 className="text-xl font-black text-text-primary tracking-tight mb-2">
                {title || "Confirm Delete"}
              </h2>
              <p className="text-sm font-medium text-zinc-500">
                {message ||
                  "Are you sure you want to delete this item? This action cannot be undone."}
              </p>
            </div>

            <div className="p-4 bg-surface-secondary flex gap-3 border-t border-border-primary">
              <button
                onClick={onClose}
                disabled={isDeleting}
                className="flex-1 py-3 bg-surface-primary border border-border-primary text-text-primary font-bold rounded-xl hover:bg-surface-secondary transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isDeleting}
                className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20 disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDeleteModal;
