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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingApi } from "../../services/bookingApi";
import toast from "react-hot-toast";
import { Star, X } from "lucide-react";

const StatusBadge = ({ status }) => {
  if (status === "PENDING") {
    return (
      <div className="flex items-center gap-1.5 text-orange-500 bg-orange-500/10 px-3 py-1.5 rounded-full text-xs font-bold border border-orange-500/20 w-fit">
        <Clock size={14} /> Pending Review
      </div>
    );
  }
  if (status === "CONFIRMED" || status === "IN_PROGRESS") {
    return (
      <div className="flex items-center gap-1.5 text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-full text-xs font-bold border border-blue-500/20 w-fit">
        <Search size={14} className="animate-pulse" />{" "}
        {status === "CONFIRMED" ? "Confirmed" : "In Progress"}
      </div>
    );
  }
  if (status === "COMPLETED") {
    return (
      <div className="flex items-center gap-1.5 text-green-500 bg-green-500/10 px-3 py-1.5 rounded-full text-xs font-bold border border-green-500/20 w-fit">
        <CheckCircle2 size={14} /> Completed
      </div>
    );
  }
  if (status === "CANCELLED" || status === "REJECTED") {
    return (
      <div className="flex items-center gap-1.5 text-red-500 bg-red-500/10 px-3 py-1.5 rounded-full text-xs font-bold border border-red-500/20 w-fit">
        <AlertCircle size={14} />{" "}
        {status === "CANCELLED" ? "Cancelled" : "Rejected"}
      </div>
    );
  }
  if (status === "NO_PROVIDER") {
    return (
      <div className="flex items-center gap-1.5 text-zinc-500 bg-zinc-500/10 px-3 py-1.5 rounded-full text-xs font-bold border border-zinc-500/20 w-fit">
        <AlertCircle size={14} /> No Provider Found
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 text-zinc-500 bg-zinc-500/10 px-3 py-1.5 rounded-full text-xs font-bold border border-zinc-500/20 w-fit">
      <AlertCircle size={14} /> {status}
    </div>
  );
};

const ProfileRequests = ({ addresses }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Review Modal State
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedBookingForReview, setSelectedBookingForReview] =
    useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const { data: bookingsData, isLoading } = useQuery({
    queryKey: ["userBookings", currentPage],
    // queryFn: () => userPendingBoooking({ page: currentPage }),
    queryFn:() => bookingApi.getUserBookings({ page: currentPage }),
  });
  // console.log(bookingsData);

  const bookings = bookingsData?.results?.data || bookingsData?.results || [];
  const count = bookingsData?.count || 0;
  const totalPages = Math.ceil(count / 10);

  const { mutate: cancelBooking, isPending: isCancelling } = useMutation({
    mutationFn: (id) => bookingApi.cancelBooking(id),
    onSuccess: () => {
      toast.success("Booking cancelled successfully");
      queryClient.invalidateQueries(["userBookings"]);
      setConfirmDeleteId(null);
    },
    onError: () => {
      toast.error("Failed to cancel booking");
      setConfirmDeleteId(null);
    },
  });

  const handleDelete = (id) => {
    cancelBooking(id);
  };

  const handleRequest = () => {
    navigate("/request-service", {
      state: {
        addresses: addresses,
      },
    });
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    // MOCK API CALL for Reviews
    toast.success("Thank you for your review!");
    setReviewModalOpen(false);
    setSelectedBookingForReview(null);
    setRating(0);
    setReviewText("");
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
        {isLoading && (
          <div className="text-center py-16">
            <span className="w-8 h-8 border-4 border-text-primary border-t-transparent rounded-full animate-spin inline-block"></span>
          </div>
        )}
        {bookings?.map((req, i) => (
          <motion.div
            key={req.booking_uuid}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface-secondary border border-border-primary rounded-3xl p-6 relative overflow-hidden"
          >
            {/* Top row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-text-primary mb-1">
                  {req.service?.name || "Service Request"}
                </h3>
                <p className="text-sm text-zinc-500 font-medium">
                  ID: {req?.booking_uuid?.split("-")[0].toUpperCase()} •{" "}
                  {req.booking_type === "INSTANT"
                    ? "Instant Booking (ASAP)"
                    : `${req.scheduled_date} (${req.slot_type})`}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={req.status} />

                {req.status === "PENDING" && (
                  <button
                    onClick={() => setConfirmDeleteId(req.booking_uuid)}
                    className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors cursor-pointer"
                    title="Cancel Request"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-300 font-medium leading-relaxed mb-6">
              {req.notes || "No additional notes provided."}
            </p>

            {/* Bottom details */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-4 border-t border-border-primary">
              <div className="flex items-center gap-2 text-text-primary font-bold">
                <IndianRupee className="w-5 h-5 text-zinc-500" />
                {req.price ? `Rs. ${req.price}` : "To be decided"}
              </div>
              <div className="flex items-center gap-2 text-text-primary font-bold max-w-[60%]">
                <MapPin className="w-5 h-5 text-zinc-500 shrink-0" />
                <span
                  className="truncate"
                  title={
                    req.address
                      ? `${req.address.address_line}, ${req.address.locality || req.address.city}`
                      : "Location details"
                  }
                >
                  {req.address
                    ? `${req.address.address_type}: ${req.address.address_line}, ${req.address.locality || req.address.city}`
                    : "Location details"}
                </span>
              </div>
            </div>

            {/* Accepted Info Box */}
            {req.status === "CONFIRMED" && req.business && (
              <div className="mt-6 bg-surface-primary border border-blue-500/30 rounded-2xl p-4 flex items-start gap-3">
                <AlertCircle
                  className="text-blue-500 shrink-0 mt-0.5"
                  size={18}
                />
                <div>
                  <h4 className="text-sm font-bold text-blue-500 mb-1">
                    Vendor Assigned
                  </h4>
                  <p className="text-sm text-zinc-400">
                    <span className="text-text-primary font-bold">
                      {req.business.name}
                    </span>{" "}
                    has been assigned to your request. They will contact you
                    shortly on your registered mobile number.
                  </p>
                </div>
              </div>
            )}

            {/* Completed Review Box */}
            {req.status === "COMPLETED" && (
              <div className="mt-6 bg-surface-primary border border-green-500/30 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-green-500 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 size={16} /> Job Completed!
                  </h4>
                  <p className="text-sm text-zinc-400">
                    Hope you liked the service. Please leave a review for the
                    professional.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedBookingForReview(req);
                    setReviewModalOpen(true);
                  }}
                  className="px-4 py-2 bg-green-500/10 text-green-500 font-bold rounded-lg border border-green-500/20 hover:bg-green-500/20 transition-colors shrink-0"
                >
                  Leave a Review
                </button>
              </div>
            )}

            {/* No Provider Info Box */}
            {req.status === "NO_PROVIDER" && (
              <div className="mt-6 bg-surface-primary border border-zinc-500/30 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <AlertCircle
                    className="text-zinc-500 shrink-0 mt-0.5"
                    size={18}
                  />
                  <div>
                    <h4 className="text-sm font-bold text-zinc-500 mb-1">
                      No Providers Nearby
                    </h4>
                    <p className="text-sm text-zinc-400">
                      We couldn't find an available professional for instant booking in your area right now. We recommend switching to a scheduled booking.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRequest()}
                  className="px-4 py-2 bg-zinc-500/10 text-zinc-500 font-bold rounded-lg border border-zinc-500/20 hover:bg-zinc-500/20 transition-colors shrink-0"
                >
                  Schedule Booking
                </button>
              </div>
            )}
          </motion.div>
        ))}

        {bookings.length === 0 && !isLoading && (
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

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl bg-surface-primary border border-border-primary text-sm font-bold text-text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-secondary"
            >
              Previous
            </button>
            <span className="text-sm font-bold text-text-secondary">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl bg-surface-primary border border-border-primary text-sm font-bold text-text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-secondary"
            >
              Next
            </button>
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
                  disabled={isCancelling}
                  className="flex-1 px-4 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-lg cursor-pointer disabled:opacity-50"
                >
                  {isCancelling ? "Cancelling..." : "Yes, Cancel"}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Review Modal */}
        {reviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm border">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-primary border border-border-primary rounded-3xl p-6 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => {
                  setReviewModalOpen(false);
                  setRating(0);
                  setReviewText("");
                }}
                className="absolute top-4 right-4 text-zinc-500 hover:text-text-primary transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mb-6">
                <h3 className="text-2xl font-black text-text-primary mb-1">
                  Rate your experience
                </h3>
                <p className="text-zinc-400 text-sm">
                  How was the service provided by{" "}
                  <span className="font-bold text-text-primary">
                    {selectedBookingForReview?.business?.name ||
                      "the professional"}
                  </span>
                  ?
                </p>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-2 mb-6 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      size={40}
                      className={`${
                        star <= (hoverRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-zinc-600"
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>

              {/* Review Text */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-text-secondary mb-2">
                  Leave a comment (Optional)
                </label>
                <textarea
                  rows={4}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tell us what you liked or what could be improved..."
                  className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-text-primary transition-colors resize-none font-medium"
                />
              </div>

              <button
                onClick={handleSubmitReview}
                className="w-full py-3.5 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md"
              >
                Submit Review
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileRequests;
