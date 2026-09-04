import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  MapPin,
  Clock,
  Loader2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  MessageSquare,
  IndianRupee,
  ChevronLeft,
} from "lucide-react";
import { bookingApi } from "../services/bookingApi";
import toast from "react-hot-toast";

const InstantBookingTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tipAmount, setTipAmount] = useState(50);

  // Poll every 5 seconds if we are in SEARCHING or TIP_REQUIRED state
  const { data: bookingData, isLoading, error } = useQuery({
    queryKey: ["instantBookingTracking", id],
    queryFn: async () => {
      const res = await bookingApi.getCustomerInstantBookingDetails(id);
      return res.data || res;
    },
    refetchInterval: (query) => {
      const status = query?.state?.data?.status;
      if (status === "SEARCHING" || status === "TIP_REQUIRED") {
        return 5000;
      }
      return false;
    },
  });

  const { mutate: cancelBooking, isPending: isCanceling } = useMutation({
    mutationFn: bookingApi.cancelCustomerInstantBooking,
    onSuccess: () => {
      toast.success("Booking cancelled successfully.");
      queryClient.invalidateQueries(["instantBookingTracking", id]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to cancel booking.");
    },
  });

  const { mutate: retryBooking, isPending: isRetrying } = useMutation({
    mutationFn: () => bookingApi.retryCustomerInstantBooking(id, tipAmount),
    onSuccess: () => {
      toast.success("Retrying with additional tip!");
      queryClient.invalidateQueries(["instantBookingTracking", id]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to retry booking.");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-text-primary" />
      </div>
    );
  }

  if (error || !bookingData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-black text-text-primary mb-2">
          Tracking Not Found
        </h2>
        <p className="text-text-secondary mb-6 max-w-sm">
          We couldn't find the details for this instant booking. It may have
          expired or been cancelled.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2.5 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  const booking = bookingData;
  const status = booking.status;

  const getStatusDisplay = () => {
    switch (status) {
      case "SEARCHING":
        return {
          icon: <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />,
          title: "Finding a Provider",
          desc: "We are currently searching for the best available service provider near you. This usually takes less than 15 minutes.",
          color: "bg-blue-50 border-blue-200 text-blue-800",
        };
      case "TIP_REQUIRED":
        return {
          icon: <AlertTriangle className="w-16 h-16 text-orange-500" />,
          title: "No Providers Available",
          desc: "We couldn't find a provider for your initial request. Adding a tip incentivizes providers to accept your booking.",
          color: "bg-orange-50 border-orange-200 text-orange-800",
        };
      case "CONFIRMED":
        return {
          icon: <CheckCircle className="w-16 h-16 text-emerald-500" />,
          title: "Provider On The Way!",
          desc: "A provider has accepted your request and is preparing to head to your location.",
          color: "bg-emerald-50 border-emerald-200 text-emerald-800",
        };
      case "IN_PROGRESS":
        return {
          icon: <Loader2 className="w-16 h-16 text-emerald-500 animate-spin" />,
          title: "Service In Progress",
          desc: "The provider is currently working on your request.",
          color: "bg-emerald-50 border-emerald-200 text-emerald-800",
        };
      case "COMPLETED":
        return {
          icon: <CheckCircle className="w-16 h-16 text-emerald-600" />,
          title: "Service Completed",
          desc: "The service has been successfully completed.",
          color: "bg-emerald-100 border-emerald-300 text-emerald-900",
        };
      case "CANCELLED":
        return {
          icon: <XCircle className="w-16 h-16 text-red-500" />,
          title: "Booking Cancelled",
          desc: "This instant booking request has been cancelled.",
          color: "bg-red-50 border-red-200 text-red-800",
        };
      case "NO_PROVIDER":
        return {
          icon: <XCircle className="w-16 h-16 text-red-500" />,
          title: "Request Expired",
          desc: "No providers were able to accept your request in time. Please try booking a scheduled service instead.",
          color: "bg-red-50 border-red-200 text-red-800",
        };
      default:
        return {
          icon: <Clock className="w-16 h-16 text-zinc-400" />,
          title: status,
          desc: "Status pending update.",
          color: "bg-zinc-50 border-zinc-200 text-zinc-800",
        };
    }
  };

  const display = getStatusDisplay();

  return (
    <div className="min-h-screen bg-surface-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors font-bold text-sm"
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </button>

        {/* Status Card */}
        <div className="bg-surface-primary border border-border-primary rounded-3xl p-8 shadow-sm text-center relative overflow-hidden">
          {/* Subtle background pulse for searching */}
          {status === "SEARCHING" && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-64 h-64 border-4 border-blue-500 rounded-full animate-ping"></div>
            </div>
          )}

          <div className="flex justify-center mb-6 relative z-10">
            {display.icon}
          </div>
          <h1 className="text-3xl font-black text-text-primary tracking-tight mb-3 relative z-10">
            {display.title}
          </h1>
          <p className="text-text-secondary text-lg max-w-lg mx-auto relative z-10">
            {display.desc}
          </p>

          {/* Time Remaining / Deadline */}
          {status === "SEARCHING" && booking.expires_at && (
            <div className="mt-8 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-bold border border-blue-100 relative z-10">
              <Clock className="w-4 h-4" />
              <span>Search expires at: {new Date(booking.expires_at).toLocaleTimeString()}</span>
            </div>
          )}
        </div>

        {/* Tip Required Actions */}
        {status === "TIP_REQUIRED" && (
          <div className="bg-surface-primary border border-border-primary rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <IndianRupee className="w-5 h-5" /> Add a Tip to Expedite
            </h3>
            <p className="text-text-secondary mb-6 text-sm">
              Increase your chances of a provider accepting by adding a tip to the total cost.
            </p>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-bold text-text-secondary mb-2">
                  Tip Amount (₹)
                </label>
                <input
                  type="number"
                  value={tipAmount}
                  onChange={(e) => setTipAmount(e.target.value)}
                  className="w-full bg-surface-secondary border border-border-primary rounded-xl px-4 py-3 font-semibold focus:outline-none focus:border-text-primary"
                  min="50"
                  step="50"
                />
              </div>
              <button
                onClick={() => retryBooking()}
                disabled={isRetrying || tipAmount < 50}
                className="px-6 py-3 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md disabled:opacity-50 min-w-[120px]"
              >
                {isRetrying ? "Retrying..." : "Retry Now"}
              </button>
            </div>
          </div>
        )}

        {/* Provider Details */}
        {(status === "CONFIRMED" || status === "IN_PROGRESS" || status === "COMPLETED") && booking.business_name && (
          <div className="bg-surface-primary border border-border-primary rounded-3xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-text-primary mb-4 border-b border-border-primary pb-4">
              Assigned Provider
            </h3>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-surface-secondary rounded-full flex items-center justify-center border border-border-primary">
                  <User className="w-6 h-6 text-zinc-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-text-primary">{booking.business_name}</h4>
                  <p className="text-sm text-text-secondary font-medium">
                    Professional: {booking.employee_name || "Owner"}
                  </p>
                </div>
              </div>
              {/* Chat action could go here if we had a dedicated chat route for customers. For now, we will wait until Chat.jsx is global or integrated. */}
            </div>
          </div>
        )}

        {/* Booking Summary */}
        <div className="bg-surface-primary border border-border-primary rounded-3xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-text-primary mb-6 border-b border-border-primary pb-4">
            Booking Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-bold text-zinc-500 mb-1">Service</p>
              <p className="font-bold text-text-primary text-lg">
                {booking.requested_service_name || booking.service_name || "Instant Service"}
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-500 mb-1">Location</p>
              <p className="font-bold text-text-primary flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-1 text-zinc-400" />
                <span>
                  {booking.address?.address_line || "Customer Address"}
                  <br />
                  <span className="text-sm font-medium text-text-secondary">
                    {booking.address?.locality || booking.address?.city}
                  </span>
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-500 mb-1">Total Expected (Min)</p>
              <p className="font-bold text-text-primary flex items-center gap-1">
                <IndianRupee className="w-4 h-4" />
                {booking.price || "TBD"}
              </p>
            </div>
            {booking.tip_amount > 0 && (
              <div>
                <p className="text-sm font-bold text-zinc-500 mb-1">Added Tip</p>
                <p className="font-bold text-emerald-600 flex items-center gap-1">
                  <IndianRupee className="w-4 h-4" />
                  {booking.tip_amount}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Global Actions */}
        {(status === "SEARCHING" || status === "TIP_REQUIRED") && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => cancelBooking()}
              disabled={isCanceling}
              className="px-6 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50"
            >
              {isCanceling ? "Canceling..." : "Cancel Request"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstantBookingTracking;
