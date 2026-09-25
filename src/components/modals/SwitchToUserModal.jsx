import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, CheckCircle, ShieldAlert } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { businessApi } from "../../services/businessApi";
import { useUserStore } from "../../store/userStore";
import toast from "react-hot-toast";

const SwitchToUserModal = ({ isOpen, onClose }) => {
  const { logout } = useUserStore();
  const [step, setStep] = useState(1); // 1: Password, 2: OTP
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  // Request Switch (Password check)
  const { mutate: requestSwitch, isPending: isRequesting } = useMutation({
    mutationFn: (data) => businessApi.requestSwitchToUser(data),
    onSuccess: () => {
      toast.success("Verification code sent!");
      setStep(2);
    },
    onError: (err) => {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.response?.data?.detail ||
        "Failed to verify password or active bookings found.";
      toast.error(errorMsg);
    },
  });

  // Verify Switch (OTP check)
  const { mutate: verifySwitch, isPending: isVerifying } = useMutation({
    mutationFn: (data) => businessApi.verifySwitchToUser(data),
    onSuccess: () => {
      toast.success("Account successfully switched to a standard user.");
      // Because role changed significantly, the safest action is to logout the user
      // so they can log back in with their new permissions.
      setTimeout(() => {
        logout();
      }, 1500);
    },
    onError: (err) => {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.response?.data?.detail ||
        "Failed to verify code.";
      toast.error(errorMsg);
    },
  });

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      toast.error("Please enter your password");
      return;
    }
    requestSwitch({ password });
  };

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the verification code");
      return;
    }
    verifySwitch({ otp });
  };

  const handleClose = () => {
    if (isRequesting || isVerifying) return;
    setStep(1);
    setPassword("");
    setOtp("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-surface-primary rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative"
        >
          <div className="p-6 border-b border-border-primary flex justify-between items-center bg-red-50/50">
            <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" />
              Switch to User Account
            </h2>
            <button
              onClick={handleClose}
              className="p-2 text-zinc-400 hover:text-text-primary rounded-xl hover:bg-surface-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <h3 className="text-sm font-bold text-amber-800 flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4" /> Warning
              </h3>
              <p className="text-sm text-amber-700 leading-relaxed">
                Switching to a standard user account will immediately deactivate
                your business profile. You cannot have any pending or
                in-progress bookings. After a successful switch, you will be
                logged out.
              </p>
            </div>

            {step === 1 ? (
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-text-primary mb-2">
                    Enter Password to Continue
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your current password"
                    className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-text-primary transition-colors font-medium"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isRequesting}
                  className="w-full btn-primary px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-md disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {isRequesting ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    "Verify Password"
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-text-primary mb-2">
                    Verification Code
                  </label>
                  <p className="text-xs text-zinc-500 mb-3">
                    We've sent a one-time code to your registered email/phone.
                  </p>
                  <input
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-text-primary transition-colors font-medium tracking-widest text-center"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full btn-primary px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-md disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {isVerifying ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    "Confirm Deactivation"
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SwitchToUserModal;
