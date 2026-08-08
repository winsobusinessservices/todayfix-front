import React from "react";
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

const Otp = ({
  otpValue,
  setOtpValue,
  otpError,
  setOtpError,
  handleVerifyOtp,
  setActiveModal,
}) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-surface-primary border border-border-primary shadow-xl rounded-xl p-6 w-full max-w-sm text-center"
        >
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-text-primary mb-2">
            Completion PIN
          </h3>
          <p className="text-sm text-zinc-400 mb-6">
            Ask the customer for the 4-digit PIN displayed on their dashboard to
            mark this job as complete. <br />
            <br />
            (Hint for demo: Use 1234)
          </p>

          <input
            type="text"
            maxLength="4"
            placeholder="• • • •"
            value={otpValue}
            onChange={(e) => {
              setOtpValue(e.target.value);
              setOtpError(false);
            }}
            className={`w-full text-center text-3xl font-black tracking-[0.5em] bg-surface-secondary border ${otpError ? "border-red-500 text-red-500" : "border-border-primary text-text-primary"} rounded-xl p-4 mb-2 focus:outline-none focus:border-text-primary`}
          />
          {otpError && (
            <p className="text-red-500 text-xs font-bold mb-4">
              Invalid PIN. Try again.
            </p>
          )}

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => {
                setActiveModal(null);
                setOtpValue("");
                setOtpError(false);
              }}
              className="flex-1 py-3 text-center bg-surface-accent text-text-primary font-bold rounded-xl hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleVerifyOtp}
              className="flex-1 py-3 text-center bg-surface-dark text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-md"
            >
              Verify
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Otp;
