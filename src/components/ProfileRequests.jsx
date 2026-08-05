import React, { useState } from "react";
import {
  IndianRupee,
  MapPin,
  Clock,
  Search,
  CheckCircle2,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";

const INITIAL_REQUESTS = [
  {
    id: "REQ-001",
    service: "AC Servicing & Repair",
    date: "Aug 5, 2026",
    budget: "1500",
    location: "Indiranagar, Bengaluru",
    status: "looking", // pending, looking, accepted
    description:
      "My split AC is not cooling properly and making a loud noise. It's a 1.5 ton Voltas AC.",
  },
  {
    id: "REQ-002",
    service: "Deep Home Cleaning",
    date: "Aug 1, 2026",
    budget: "2500",
    location: "Whitefield, Bengaluru",
    status: "accepted",
    vendorName: "Sparkle Cleaners",
    description:
      "Full deep cleaning of a 2BHK unfurnished flat before moving in.",
  },
  {
    id: "REQ-003",
    service: "Plumbing Fixes",
    date: "Jul 28, 2026",
    budget: "800",
    location: "Koramangala, Bengaluru",
    status: "pending",
    description: "Kitchen sink pipe is leaking heavily.",
  },
];

const StatusBadge = ({ status }) => {
  if (status === "pending") {
    return (
      <div className="flex items-center gap-1.5 text-orange-500 bg-orange-500/10 px-3 py-1.5 rounded-full text-xs font-bold border border-orange-500/20 w-fit">
        <Clock size={14} /> Pending Admin Review
      </div>
    );
  }
  if (status === "looking") {
    return (
      <div className="flex items-center gap-1.5 text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-full text-xs font-bold border border-blue-500/20 w-fit">
        <Search size={14} className="animate-pulse" /> Looking for Vendors
      </div>
    );
  }
  if (status === "accepted") {
    return (
      <div className="flex items-center gap-1.5 text-green-500 bg-green-500/10 px-3 py-1.5 rounded-full text-xs font-bold border border-green-500/20 w-fit">
        <CheckCircle2 size={14} /> Accepted by Vendor
      </div>
    );
  }
  return null;
};

const ProfileRequests = ({ addresses }) => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDelete = (id) => {
    setRequests(requests.filter((req) => req.id !== id));
    setConfirmDeleteId(null);
  };

  const handleRequest = () => {
    navigate("/request-service", {
      state: {
        addresses: addresses,
      },
    });
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-text-primary">
            My Requests
          </h2>
          <p className="text-sm text-zinc-400">
            Track your active service requests and their status.
          </p>
        </div>
        <button
          onClick={handleRequest}
          className="px-5 text-nowrap py-2.5 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md border border-zinc-700"
        >
          New Request
        </button>
      </div>

      <div className="grid gap-6">
        {requests.map((req, i) => (
          <motion.div
            key={req.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface-secondary border border-border-primary rounded-3xl p-6 relative overflow-hidden"
          >
            {/* Top row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-text-primary mb-1">
                  {req.service}
                </h3>
                <p className="text-sm text-zinc-500 font-medium">
                  Request ID: {req.id} • {req.date}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={req.status} />

                <button
                  onClick={() => setConfirmDeleteId(req.id)}
                  className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors cursor-pointer"
                  title="Delete Request"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-300 font-medium leading-relaxed mb-6">
              "{req.description}"
            </p>

            {/* Bottom details */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-4 border-t border-border-primary">
              <div className="flex items-center gap-2 text-text-primary font-bold">
                <IndianRupee className="w-5 h-5 text-zinc-500" />
                {req.budget} (Budget)
              </div>
              <div className="flex items-center gap-2 text-text-primary font-bold">
                <MapPin className="w-5 h-5 text-zinc-500" />
                {req.location}
              </div>
            </div>

            {/* Accepted Info Box */}
            {req.status === "accepted" && (
              <div className="mt-6 bg-surface-primary border border-green-500/30 rounded-2xl p-4 flex items-start gap-3">
                <AlertCircle
                  className="text-green-500 shrink-0 mt-0.5"
                  size={18}
                />
                <div>
                  <h4 className="text-sm font-bold text-green-500 mb-1">
                    Vendor Accepted!
                  </h4>
                  <p className="text-sm text-zinc-400">
                    <span className="text-text-primary font-bold">
                      {req.vendorName}
                    </span>{" "}
                    has accepted your request. They will contact you shortly on
                    your registered mobile number to confirm the exact time.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        ))}

        {requests.length === 0 && (
          <div className="text-center py-16 bg-surface-secondary rounded-3xl border border-border-primary">
            <Search className="w-12 h-12 text-zinc-600 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-text-primary mb-2">
              No Active Requests
            </h3>
            <p className="text-sm text-zinc-500">
              You don't have any pending service requests.
            </p>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmDeleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm border">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-primary border border-border-primary rounded-3xl p-6 max-w-sm w-full shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4 text-red-500">
                <AlertCircle size={24} />
                <h3 className="text-xl font-bold text-text-primary">
                  Cancel Request?
                </h3>
              </div>
              <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                Are you sure you want to cancel this service request? This
                action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="flex-1 px-4 py-2.5 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  No, Keep it
                </button>
                <button
                  onClick={() => handleDelete(confirmDeleteId)}
                  className="flex-1 px-4 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-lg cursor-pointer"
                >
                  Yes, Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileRequests;
