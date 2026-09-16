import React, { useState } from "react";
import {
  IndianRupee,
  MapPin,
  Clock,
  Search,
  CheckCircle2,
  AlertCircle,
  Trash2,
  User,
  MessageSquare,
  ChevronRight,
  Zap,
  Calendar,
  X,
  Star,
  View,
  Check,
  CheckCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingApi } from "../../services/bookingApi";
import toast from "react-hot-toast";
import { dateFormater } from "../../utils/dateFormater";
import Chat from "../../components/modals/Chat";
import ReviewModel from "../../components/modals/ReviewModel";

import { reviewApi } from "../../services/reviewApi";

const StatusBadge = ({ status }) => {
  const styles = {
    PENDING: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    CONFIRMED: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20",
    ACCEPTED: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20",
    ASSIGNED: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20",
    IN_PROGRESS: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20",
    COMPLETED: "bg-green-500/10 text-green-500 border-green-500/20",
    CANCELLED: "bg-red-500/10 text-red-500 border-red-500/20",
    REJECTED: "bg-red-500/10 text-red-500 border-red-500/20",
    NO_PROVIDER: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${
        styles[status] || "bg-zinc-500/10 text-zinc-600 border-zinc-500/20"
      }`}
    >
      {status === "NO_PROVIDER" ? "NO PROVIDER" : status}
    </span>
  );
};

const ReviewAction = ({ service, onRate, onBookAgain, onViewReview }) => {
  const targetId =
    service.booking_uuid ||
    service.uuid ||
    service.instant_booking_uuid ||
    service._id;

  const { data, isLoading } = useQuery({
    queryKey: ["reviewEligibility", targetId],
    queryFn: () => reviewApi.eligibilityReview(targetId),
    enabled:
      service.status === "COMPLETED" &&
      service.booking_type !== "INSTANT" &&
      !!targetId,
    retry: 0,
  });

  const isEligible = data?.data?.eligible === true;
  const alreadyReviewed = data?.data?.already_reviewed === true;

  const { data: bookingReview } = useQuery({
    queryKey: ["bookingReview", targetId],
    queryFn: () => reviewApi.bookingReview(targetId),
    enabled: !!alreadyReviewed,
    retry: 0,
  });

  if (isLoading) {
    return (
      <div className="flex-1 sm:flex-none px-4 py-2 bg-surface-secondary animate-pulse rounded-lg w-28 h-[38px]" />
    );
  }

  return (
    <span className="flex gap-2 w-full sm:w-auto text-nowrap">
      {service.status === "COMPLETED" && service.booking_type !== "INSTANT" && (
        <button
          onClick={onBookAgain}
          className="flex-1 sm:flex-none px-4 py-2 bg-text-primary text-surface-primary font-medium rounded-lg hover:bg-zinc-800 transition-colors text-sm cursor-pointer"
        >
          Book Again
        </button>
      )}
      {service.status === "COMPLETED" &&
        service.booking_type !== "INSTANT" &&
        isEligible && (
          <button
            onClick={onRate}
            className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium bg-amber-500 text-white hover:bg-amber-600 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-amber-500/20"
          >
            <Star className="w-4 h-4 fill-current" /> Rate Service
          </button>
        )}
      {alreadyReviewed && (
        <button 
          onClick={() => onViewReview && bookingReview && onViewReview(bookingReview?.data || bookingReview)}
          className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium bg-surface-accent text-text-primary border border-border-primary hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-amber-500/20"
        >
          <View className="w-4 h-4 text-green-600" /> View Review
        </button>
      )}
    </span>
  );
};

const ProfileRequests = ({ addresses }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  // Review Modal State
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedBookingForReview, setSelectedBookingForReview] =
    useState(null);
  const [existingReviewForEdit, setExistingReviewForEdit] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const { data: bookingsData, isLoading } = useQuery({
    queryKey: ["userBookings", currentPage],
    queryFn: () => bookingApi.getUserBookings({ page: currentPage }),
  });

  const rawBookings =
    bookingsData?.results?.data || bookingsData?.results || [];
  const bookings = rawBookings.filter((req) => req.booking_type !== "INSTANT");
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
    navigate("/services", {
      state: {
        addresses: addresses,
      },
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6">
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
          className="px-5 text-nowrap py-2.5 bg-text-primary text-surface-primary font-bold rounded-xl hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
        >
          New Request
        </button>
      </div>

      <div className="grid gap-4">
        {isLoading && (
          <div className="text-center py-16">
            <span className="w-8 h-8 border-4 border-text-primary border-t-transparent rounded-full animate-spin inline-block"></span>
          </div>
        )}

        {bookings?.map((req, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            key={req.uuid || index}
            className="group relative bg-surface-primary rounded-2xl border border-border-primary overflow-hidden hover:border-zinc-400/50 transition-colors duration-200"
          >
            <div className="p-6">
              {/* Header: ID, Status, Price */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-sm font-medium text-zinc-500 font-mono">
                    #
                    {(req.booking_uuid || req.uuid || "BOOKING")
                      .split("-")[0]
                      .toUpperCase()}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-zinc-300" />
                  <StatusBadge status={req.status} />
                  {req.booking_type === "INSTANT" && (
                    <>
                      <div className="w-1 h-1 rounded-full bg-zinc-300" />
                      <span className="text-[13px] font-semibold text-amber-600 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        Instant Request
                      </span>
                    </>
                  )}
                </div>
                <div className="flex flex-col sm:items-end">
                  <div className="text-xl font-semibold tracking-tight text-text-primary">
                    ₹{req.price || "TBD"}
                  </div>
                </div>
              </div>

              {/* Service Title */}
              <h3 className="text-xl font-semibold tracking-tight text-text-primary mb-6">
                {req.service?.name || "Service Request"}
              </h3>

              {/* Minimal Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 mb-6 text-sm">
                {/* Professional */}
                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-zinc-400 mt-0.5" />
                  <div>
                    <p className="text-zinc-500 font-medium mb-0.5">
                      Professional
                    </p>
                    <p className="text-text-primary font-medium">
                      {req.business?.name ||
                        (req.booking_type === "INSTANT" &&
                        req.status === "PENDING"
                          ? "Finding Provider..."
                          : "No Provider Assigned")}
                    </p>
                  </div>
                </div>

                {/* Schedule */}
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-zinc-400 mt-0.5" />
                  <div>
                    <p className="text-zinc-500 font-medium mb-0.5">Schedule</p>
                    <p className="text-text-primary font-medium">
                      {req.booking_type === "INSTANT"
                        ? "Instant Booking (ASAP)"
                        : dateFormater(req.scheduled_date)}
                    </p>
                    {req.booking_type !== "INSTANT" && req.slot_type && (
                      <p className="text-zinc-500 mt-0.5">{req.slot_type}</p>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 sm:col-span-2">
                  <MapPin className="w-4 h-4 text-zinc-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-zinc-500 font-medium mb-0.5">Location</p>
                    <p className="text-text-primary font-medium">
                      {req.address
                        ? `${req.address.address_type}: ${req.address.address_line}, ${req.address.locality || req.address.city}`
                        : "Location details"}
                    </p>
                  </div>
                </div>

                {/* Notes */}
                {req.notes && (
                  <div className="flex items-start gap-3 sm:col-span-2">
                    <MessageSquare className="w-4 h-4 text-zinc-400 mt-0.5" />
                    <div>
                      <p className="text-zinc-500 font-medium mb-0.5">Notes</p>
                      <p className="text-text-primary">{req.notes}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions & Alerts */}
              <div className="pt-5 border-t border-border-primary flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                <div className="flex-1">
                  {req.booking_type === "INSTANT" &&
                    !["COMPLETED", "CANCELLED", "REJECTED"].includes(
                      req.status,
                    ) && (
                      <button
                        onClick={() =>
                          navigate(`/track/instant/${req.booking_uuid}`)
                        }
                        className="text-blue-600 font-bold hover:underline text-sm flex items-center gap-1"
                      >
                        Track Request <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  {req.status === "PENDING" && (
                    <button
                      onClick={() => setConfirmDeleteId(req.uuid)}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium bg-surface-primary text-text-primary border border-border-primary hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" /> Cancel
                    </button>
                  )}

                  {(req.status === "CONFIRMED" ||
                    req.status === "IN_PROGRESS") &&
                    req.business && (
                      <button
                        onClick={() =>
                          setActiveModal({ type: "chat", bookingId: req.uuid })
                        }
                        className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium bg-surface-primary text-text-primary border border-border-primary hover:bg-surface-secondary transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" /> Chat
                      </button>
                    )}

                  {req.status === "COMPLETED" &&
                    req.booking_type !== "INSTANT" && (
                      <ReviewAction
                        service={req}
                        onRate={() => {
                          setSelectedBookingForReview(req);
                          setExistingReviewForEdit(null);
                          setReviewModalOpen(true);
                        }}
                        onViewReview={(reviewData) => {
                          setSelectedBookingForReview(req);
                          setExistingReviewForEdit(reviewData);
                          setReviewModalOpen(true);
                        }}
                        onBookAgain={() => handleRequest()}
                      />
                    )}

                  {req.status === "NO_PROVIDER" && (
                    <button
                      onClick={() => handleRequest()}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium bg-text-primary text-surface-primary hover:bg-zinc-800 transition-all flex items-center justify-center cursor-pointer"
                    >
                      Schedule Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {bookings.length === 0 && !isLoading && (
          <div className="text-center py-20 bg-surface-primary rounded-3xl border border-border-primary">
            <Search className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text-primary mb-2">
              No Active Requests
            </h3>
            <p className="text-zinc-500">
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

      <AnimatePresence>
        {/* Confirmation Modal */}
        {confirmDeleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-primary rounded-2xl max-w-sm w-full p-6 md:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-text-primary cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3 mb-4 text-red-500">
                <AlertCircle size={24} />
                <h3 className="text-xl font-black tracking-tight text-text-primary">
                  Cancel Request?
                </h3>
              </div>
              <p className="text-zinc-500 font-medium text-sm mb-8 leading-relaxed">
                Are you sure you want to cancel this service request? This
                action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="flex-1 px-4 py-3 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer text-sm"
                >
                  No, Keep it
                </button>
                <button
                  onClick={() => handleDelete(confirmDeleteId)}
                  disabled={isCancelling}
                  className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors cursor-pointer disabled:opacity-50 text-sm"
                >
                  {isCancelling ? "Cancelling..." : "Yes, Cancel"}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Review Modal */}
        {reviewModalOpen && (
          <ReviewModel
            selectedBookingForReview={selectedBookingForReview}
            setReviewModalOpen={setReviewModalOpen}
            existingReview={existingReviewForEdit}
          />
        )}

        {/* Chat Modal */}
        {activeModal?.type === "chat" && (
          <Chat
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            bookingsList={bookings}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileRequests;
