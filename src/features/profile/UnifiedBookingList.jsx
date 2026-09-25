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
  BookOpen,
  PhoneCallIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookingApi } from "../../services/bookingApi";
import { instantBookingApi } from "../../services/instantBookingApi";
import { reviewApi } from "../../services/reviewApi";
import toast from "react-hot-toast";
import { dateFormater } from "../../utils/dateFormater";
import Chat from "../../components/modals/Chat";
import ReviewModel from "../../components/modals/ReviewModel";

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
    SEARCHING: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    TIP_REQUIRED: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
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
  const isInstant = service.booking_type === "INSTANT";
  const targetId =
    service.booking_uuid ||
    service.uuid ||
    service.instant_booking_uuid ||
    service._id;

  const { data, isLoading } = useQuery({
    queryKey: ["reviewEligibility", targetId, isInstant],
    queryFn: () =>
      isInstant
        ? reviewApi.instantBookingEligiblityReview(targetId)
        : reviewApi.eligibilityReview(targetId),
    enabled: service.status === "COMPLETED" && !!targetId,
    retry: 0,
  });

  const isEligible = data?.data?.eligible === true;
  const alreadyReviewed = data?.data?.already_reviewed === true;

  const { data: bookingReview } = useQuery({
    queryKey: ["bookingReview", targetId, isInstant],
    queryFn: () =>
      isInstant
        ? reviewApi.instantBookingReview(targetId)
        : reviewApi.bookingReview(targetId),
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
      {service.status === "COMPLETED" && (
        <button
          onClick={onBookAgain}
          className="btn-primary flex-1 sm:flex-none px-4 py-2 bg-text-primary text-surface-primary font-medium rounded-lg hover:bg-zinc-800 transition-colors text-sm cursor-pointer"
        >
          Book Again
        </button>
      )}
      {service.status === "COMPLETED" && isEligible && (
        <button
          onClick={onRate}
          className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium bg-amber-500 text-white hover:bg-amber-600 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-amber-500/20"
        >
          <Star className="w-4 h-4 fill-current" /> Rate Service
        </button>
      )}
      {alreadyReviewed && (
        <button
          onClick={() =>
            onViewReview &&
            bookingReview &&
            onViewReview(bookingReview?.data || bookingReview)
          }
          className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium bg-surface-primary text-text-primary border border-border-primary hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-amber-500/20"
        >
          <BookOpen className="w-4 h-4 text-text-primary" /> View Review
        </button>
      )}
    </span>
  );
};

const UnifiedBookingList = ({
  bookings = [],
  isLoading = false,
  emptyIcon: EmptyIcon = Calendar,
  emptyTitle = "No Bookings Found",
  emptyDescription = "You don't have any bookings matching this criteria.",
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [confirmDeleteBooking, setConfirmDeleteBooking] = useState(null);
  const [detailsModal, setDetailsModal] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // Chat Modal

  // Review Modal State
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedBookingForReview, setSelectedBookingForReview] =
    useState(null);
  const [existingReviewForEdit, setExistingReviewForEdit] = useState(null);

  const { mutate: cancelBooking, isPending: isCancelling } = useMutation({
    mutationFn: (booking) => {
      const isInstant = booking.booking_type === "INSTANT";
      const id =
        booking.instant_booking_uuid || booking.booking_uuid || booking.uuid;
      if (isInstant) {
        return instantBookingApi.cancelCustomerInstantBooking(id);
      } else {
        return bookingApi.cancelBooking(id);
      }
    },
    onSuccess: (_, booking) => {
      toast.success("Booking cancelled successfully");
      queryClient.invalidateQueries(["userBookings"]);
      queryClient.invalidateQueries(["userBookingsHistory"]);
      const isInstant = booking.booking_type === "INSTANT";
      if (isInstant) {
        const id =
          booking.instant_booking_uuid || booking.booking_uuid || booking.uuid;
        queryClient.invalidateQueries(["instantBookingTracking", id]);
      }
      setConfirmDeleteBooking(null);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to cancel booking");
      setConfirmDeleteBooking(null);
    },
  });

  const handleDelete = () => {
    if (confirmDeleteBooking) {
      cancelBooking(confirmDeleteBooking);
    }
  };

  const handleBookAgain = (service) => {
    if (service.service?.slug) {
      navigate(`/services/${service.service.slug}`);
    } else {
      navigate("/services");
    }
  };

  return (
    <div className="grid gap-4 mt-4">
      {isLoading && (
        <div className="text-center py-16">
          <span className="w-8 h-8 border-4 border-text-primary border-t-transparent rounded-full animate-spin inline-block"></span>
        </div>
      )}

      {bookings?.map((req, index) => {
        const isInstant = req.booking_type === "INSTANT";
        const bookingId =
          req.instant_booking_uuid || req.booking_uuid || req.uuid;

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            key={bookingId || index}
            className="group relative bg-surface-primary rounded-2xl border border-border-primary overflow-hidden hover:border-zinc-400/50 transition-colors duration-200"
          >
            <div className="p-4 sm:p-6">
              {/* Header: ID, Status, Price */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-5">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="text-xs sm:text-sm font-medium text-zinc-500 font-mono">
                    #{(bookingId || "BOOKING").split("-")[0].toUpperCase()}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-zinc-300" />
                  <div className="scale-90 origin-left sm:scale-100">
                    <StatusBadge status={req.status} />
                  </div>
                  {isInstant && (
                    <>
                      <div className="w-1 h-1 rounded-full bg-zinc-300" />
                      <span className="text-xs sm:text-[13px] font-semibold text-amber-600 flex items-center gap-1 sm:gap-1.5">
                        <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        Instant Request
                      </span>
                    </>
                  )}
                </div>
                <div className="flex flex-col sm:items-end">
                  <div className="text-lg sm:text-xl font-semibold tracking-tight text-text-primary">
                    ₹{req.price || req.total_payable_price || "TBD"}
                  </div>
                </div>
              </div>

              {/* Service Title */}
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-text-primary mb-4 sm:mb-6 leading-tight">
                {req.service?.name ||
                  req.requested_service_name ||
                  "Service Request"}
              </h3>

              {/* Minimal Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-5 gap-x-4 sm:gap-x-8 mb-4 sm:mb-6 text-xs sm:text-sm">
                {/* Professional */}
                <div className="flex items-start gap-2 sm:gap-3">
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-zinc-500 font-medium mb-0.5">
                      Professional
                    </p>
                    <p className="text-text-primary font-medium">
                      {req.business?.name ||
                        req.employee_name ||
                        (isInstant &&
                        (req.status === "PENDING" ||
                          req.status === "SEARCHING" ||
                          req.status === "TIP_REQUIRED")
                          ? "Finding Provider..."
                          : "No Provider Assigned")}
                    </p>
                  </div>
                </div>

                {/* Schedule */}
                <div className="flex items-start gap-2 sm:gap-3">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-zinc-500 font-medium mb-0.5">Schedule</p>
                    <p className="text-text-primary font-medium">
                      {isInstant
                        ? "Instant Booking (ASAP)"
                        : dateFormater(req.scheduled_date)}
                    </p>
                    {!isInstant && req.slot_type && (
                      <p className="text-zinc-500 mt-0.5">{req.slot_type}</p>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-2 sm:gap-3 sm:col-span-2">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400 mt-0.5 shrink-0" />
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
                {(req.notes || req.customer_note) && (
                  <div className="flex items-start gap-2 sm:gap-3 sm:col-span-2">
                    <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-zinc-500 font-medium mb-0.5">Notes</p>
                      <p className="text-text-primary">
                        {req.notes || req.customer_note}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions & Alerts */}
              <div className="pt-4 sm:pt-5 border-t border-border-primary flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mt-2">
                <div className="flex-1">
                  {isInstant &&
                    !["COMPLETED", "CANCELLED", "REJECTED"].includes(
                      req.status,
                    ) && (
                      <button
                        onClick={() => navigate(`/track/instant/${bookingId}`)}
                        className="text-blue-600 font-bold hover:underline text-sm flex items-center gap-1"
                      >
                        Track Request <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  {(req.status === "PENDING" ||
                    req.status === "SEARCHING" ||
                    req.status === "TIP_REQUIRED") && (
                    <button
                      onClick={() => setConfirmDeleteBooking(req)}
                      className="flex-1 sm:flex-none px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium bg-surface-primary text-text-primary border border-border-primary hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Cancel
                    </button>
                  )}

                  {(req.status === "CONFIRMED" ||
                    req.status === "IN_PROGRESS" ||
                    req.status === "ASSIGNED") && (
                    <>
                      {req.business && !isInstant && (
                        <button
                          onClick={() =>
                            setActiveModal({ type: "chat", bookingId: bookingId })
                          }
                          className="flex-1 sm:flex-none px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium bg-surface-primary text-text-primary border border-border-primary hover:bg-surface-secondary transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{" "}
                          Chat
                        </button>
                      )}
                      {(req.business?.phone || req.employee?.phone) && (
                        <a
                          href={`tel:${req.business?.phone || req.employee?.phone}`}
                          className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium bg-surface-primary text-text-primary border border-border-primary hover:bg-surface-secondary transition-all flex items-center justify-center gap-2"
                        >
                          <PhoneCallIcon className="w-4 h-4" /> Contact
                        </a>
                      )}
                    </>
                  )}

                  <button
                    className="btn-primary flex-1 sm:flex-none px-3 py-1.5 sm:px-4 sm:py-2 bg-surface-dark text-text-inverted font-medium rounded-lg hover:bg-surface-dark/80 transition-colors text-sm cursor-pointer"
                    onClick={() => setDetailsModal(req)}
                  >
                    Details
                  </button>

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
                    onBookAgain={() => handleBookAgain(req)}
                  />

                  {req.status === "NO_PROVIDER" && (
                    <button
                      onClick={() => handleBookAgain(req)}
                      className="flex-1 sm:flex-none px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium bg-text-primary text-surface-primary hover:bg-zinc-800 transition-all flex items-center justify-center cursor-pointer"
                    >
                      Schedule Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {bookings.length === 0 && !isLoading && (
        <div className="text-center py-20 bg-surface-primary rounded-3xl border border-border-primary mt-6">
          <EmptyIcon className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-text-primary mb-2">
            {emptyTitle}
          </h3>
          <p className="text-zinc-500">{emptyDescription}</p>
        </div>
      )}

      <AnimatePresence>
        {/* Confirmation Modal */}
        {confirmDeleteBooking && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-primary rounded-2xl max-w-sm w-full p-6 md:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setConfirmDeleteBooking(null)}
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
                  onClick={() => setConfirmDeleteBooking(null)}
                  className="flex-1 px-4 py-3 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer text-sm"
                >
                  No, Keep it
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isCancelling}
                  className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors cursor-pointer disabled:opacity-50 text-sm"
                >
                  {isCancelling ? "Cancelling..." : "Yes, Cancel"}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Details Modal */}
        {detailsModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-primary rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setDetailsModal(null)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-text-primary cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-black text-text-primary tracking-tight mb-6">
                Service Summary
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between border-b border-border-primary pb-4">
                  <span className="text-zinc-500 font-medium">Service</span>
                  <span className="font-bold text-text-primary">
                    {detailsModal.service?.name ||
                      detailsModal.requested_service_name}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border-primary pb-4">
                  <span className="text-zinc-500 font-medium">
                    Professional
                  </span>
                  <span className="font-bold text-text-primary">
                    {detailsModal.business?.name ||
                      detailsModal.employee_name ||
                      '"Not Assigned"'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border-primary pb-4">
                  <span className="text-zinc-500 font-medium">Date & Time</span>
                  <p className="text-sm font-bold text-text-primary flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-zinc-400" />
                    {dateFormater(
                      detailsModal?.scheduled_date || detailsModal?.created_at,
                    )}
                  </p>
                </div>
                <div className="pt-2">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                    Location
                  </p>
                  <p className="text-sm font-bold text-text-primary flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-zinc-400" />
                    {detailsModal.address?.address_line},{" "}
                    {detailsModal.address?.locality},{" "}
                    {detailsModal.address?.city}
                  </p>
                </div>
                <div className="pt-4 border-t border-border-primary mt-4">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">
                    Amount Paid
                  </p>
                  <p className="text-2xl font-black text-text-primary">
                    ₹{detailsModal.price || detailsModal.total_payable_price || "0"}
                  </p>
                </div>
                <div className="pt-6 flex gap-3">
                  <button
                    onClick={() => setDetailsModal(null)}
                    className="flex-1 px-4 py-3 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 transition-colors text-sm cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleBookAgain(detailsModal)}
                    className="btn-primary flex-1 px-4 py-3 font-bold rounded-xl transition-colors text-sm text-center cursor-pointer"
                  >
                    Book Again
                  </button>
                </div>
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

export default UnifiedBookingList;
