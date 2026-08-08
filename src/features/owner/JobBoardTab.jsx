import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  IndianRupee,
  Clock,
  ShieldCheck,
  CheckCircle2,
  X,
} from "lucide-react";

// Mock data for active broadcasts (from Admin)
const INITIAL_BROADCASTS = [
  {
    id: "REQ-002",
    service: "AC Servicing & Repair",
    customerMasked: "Customer #8421",
    location: "Indiranagar, Bengaluru (approx. 2km away)",
    date: "Aug 6, 2026",
    time: "Morning (9 AM - 12 PM)",
    payout: "850",
    description:
      "My split AC is not cooling properly and making a loud noise. It's a 1.5 ton Voltas AC.",
    urgency: "High",
  },
  {
    id: "REQ-005",
    service: "Deep Home Cleaning",
    customerMasked: "Customer #3190",
    location: "Koramangala, Bengaluru (approx. 4.5km away)",
    date: "Aug 8, 2026",
    time: "Flexible",
    payout: "2200",
    description:
      "Full deep cleaning of a 2BHK unfurnished flat before moving in.",
    urgency: "Normal",
  },
];

const JobBoardTab = () => {
  const navigate = useNavigate();
  const [broadcasts, setBroadcasts] = useState(INITIAL_BROADCASTS);
  const [acceptedJobId, setAcceptedJobId] = useState(null);

  const handleAcceptJob = (id) => {
    setAcceptedJobId(id);
    setTimeout(() => {
      setBroadcasts((prev) => prev.filter((b) => b.id !== id));
      setAcceptedJobId(null);
      navigate("/owner-dashboard/bookings");
    }, 1500); // Simulate network delay
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-text-primary">
          Job Board
        </h2>
        <p className="text-sm text-zinc-400">
          Live feed of available service requests in your area. Accept quickly
          before another vendor claims them.
        </p>
      </div>

      <div className="grid gap-6">
        <AnimatePresence>
          {broadcasts.map((job) => (
            <motion.div
              key={job.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-primary border border-border-primary rounded-3xl p-6 relative overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl hover:border-black transition-all duration-300 group"
            >
              {/* Accepted Overlay */}
              <AnimatePresence>
                {acceptedJobId === job.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-green-500/10 backdrop-blur-sm z-10 flex flex-col items-center justify-center border border-green-500/20"
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-500 mb-2" />
                    <h3 className="text-xl font-bold text-green-500">
                      Job Accepted!
                    </h3>
                    <p className="text-green-600/80 text-sm font-medium">
                      Moving to Bookings tab...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Left Side: Job Details */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-1 bg-surface-dark text-text-inverted text-[10px] font-bold uppercase tracking-wider rounded-md">
                          New Request
                        </span>
                        {job.urgency === "High" && (
                          <span className="px-2.5 py-1 bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-wider rounded-md flex items-center gap-1">
                            <Clock size={12} /> High Urgency
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-text-primary tracking-tight">
                        {job.service}
                      </h3>
                      <p className="text-sm font-medium text-zinc-500 flex items-center gap-1.5 mt-1">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        {job.customerMasked} (Identity Protected)
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-400 font-medium leading-relaxed bg-surface-secondary p-4 rounded-xl border border-border-primary">
                    "{job.description}"
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-text-primary">
                      <MapPin size={16} className="text-zinc-400" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-text-primary">
                      <Calendar size={16} className="text-zinc-400" />
                      {job.date} • {job.time}
                    </div>
                  </div>
                </div>

                {/* Right Side: Payout & Action */}
                <div className="flex flex-col justify-center items-center md:items-end w-full md:w-48 shrink-0 md:border-l border-t md:border-t-0 border-border-secondary pt-6 md:pt-0 pl-0 md:pl-6">
                  <div className="text-center md:text-right mb-4">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">
                      Your Payout
                    </p>
                    <div className="flex items-center justify-center md:justify-end gap-1 text-3xl font-black text-text-primary">
                      <IndianRupee size={24} className="text-text-primary" />
                      {job.payout}
                    </div>
                    <p className="text-xs text-emerald-500 font-bold mt-1">
                      Guaranteed by Admin
                    </p>
                  </div>

                  <button
                    onClick={() => handleAcceptJob(job.id)}
                    className="w-full py-3.5 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-lg active:scale-95 cursor-pointer"
                  >
                    Accept Job
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {broadcasts.length === 0 && (
          <div className="text-center py-20 bg-surface-secondary rounded-3xl border border-border-primary">
            <div className="w-16 h-16 bg-surface-primary rounded-full flex items-center justify-center mx-auto mb-4 border border-border-primary">
              <Clock className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">
              No Active Broadcasts
            </h3>
            <p className="text-sm text-zinc-500 max-w-md mx-auto">
              You're all caught up! There are no active service requests in your
              area right now. We'll notify you when a new one arrives.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobBoardTab;

