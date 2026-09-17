import React, { useState } from "react";
import {
  IndianRupee,
  MapPin,
  Calendar,
  Search,
  User,
  Clock,
  MessageSquare,
  ChevronRight,
  Zap,
  X,
  Phone,
  PhoneCallIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userBookingHistory } from "../../services/userApi";
import { reviewApi } from "../../services/reviewApi";
import { motion, AnimatePresence } from "framer-motion";
import ReviewModel from "../../components/modals/ReviewModel";
import { instantBookingApi } from "../../services/instantBookingApi";
import toast from "react-hot-toast";
import { dateFormater } from "../../utils/dateFormater";

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
    service.service_uuid;

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
    <span className="flex gap-2 w-full sm:w-auto">
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
          onClick={() =>
            onViewReview &&
            bookingReview &&
            onViewReview(bookingReview?.data || bookingReview)
          }
          className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium bg-surface-accent text-text-primary border border-border-primary hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-amber-500/20"
        >
          <View className="w-4 h-4 text-green-600" /> View Review
        </button>
      )}
    </span>
  );
};

const ProfileServicesHistory = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [detailsModal, setDetailsModal] = useState(null);
  const [reportModal, setReportModal] = useState(null);
  const [reportType, setReportType] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const queryClient = useQueryClient();

  // Review Modal State
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedBookingForReview, setSelectedBookingForReview] =
    useState(null);
  const [existingReviewForEdit, setExistingReviewForEdit] = useState(null);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const { data: bookingsData, isLoading } = useQuery({
    queryKey: ["userBookingsHistory", currentPage],
    queryFn: () => userBookingHistory({ page: currentPage }),
  });

  const { mutate: cancelBooking, isPending: isCanceling } = useMutation({
    mutationFn: (id) => instantBookingApi.cancelCustomerInstantBooking(id),
    onSuccess: () => {
      toast.success("Booking cancelled successfully.");
      queryClient.invalidateQueries(["instantBookingTracking", id]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to cancel booking.");
    },
  });

  const rawServiceHistory =
    bookingsData?.results?.data || bookingsData?.results || bookingsData || [];
  const serviceHistory = rawServiceHistory.filter(
    (s) => s.booking_type === "INSTANT",
  );

  const count = bookingsData?.count || 0;
  const totalPages = Math.ceil(count / 10);

  const completedServices = serviceHistory.filter(
    (s) => s.status === "COMPLETED",
  );
  const totalSpent = completedServices.reduce(
    (acc, curr) => acc + parseInt(curr.price || 0),
    0,
  );
  const averageRating = "0.0"; // Hardcoded for MVP as per user suggestion

  const filteredHistory = serviceHistory.filter((service) => {
    // Hide pending/in-progress from history by default unless we specifically want them
    if (filter !== "All" && service.status !== filter.toUpperCase())
      return false;
    if (
      filter === "All" &&
      (service.status === "PENDING" || service.status === "CONFIRMED")
    )
      return false; // Usually history is for past events

    if (
      search &&
      !service.service?.name?.toLowerCase().includes(search.toLowerCase()) &&
      !service.business?.name?.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6">
      {/* Header Summary */}
      <div className="grid grid-cols-3 gap-4 mb-2">
        <div className="bg-surface-primary border border-border-primary rounded-2xl p-3 md:p-6 shadow-sm text-center">
          <p className="text-zinc-500 font-medium mb-1 text-xs md:text-sm">
            Completed Services
          </p>
          <p className="text-xl md:text-3xl font-black text-text-primary tracking-tight text-center">
            {completedServices.length}
          </p>
        </div>
        <div className="bg-surface-primary border border-border-primary rounded-2xl p-3 md:p-6 shadow-sm text-center">
          <p className="text-zinc-500 font-medium mb-1 text-xs md:text-sm">
            Total Spent
          </p>
          <p className="text-xl md:text-3xl text-center font-black text-text-primary tracking-tight flex items-center">
            <IndianRupee className="w-6 h-6 mr-1 stroke-[3]" />
            {totalSpent.toLocaleString()}
          </p>
        </div>
        <div className="bg-surface-primary border border-border-primary rounded-2xl p-3 md:p-6 shadow-sm text-center">
          <p className="text-zinc-500 font-medium mb-1 text-xs md:text-sm">
            Average Rating
          </p>
          <p className="text-xl md:text-3xl text-center font-black text-text-primary tracking-tight flex items-center gap-2">
            {averageRating}
            <svg className="w-6 h-6 fill-amber-500" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex bg-surface-secondary p-1 rounded-2xl w-full sm:w-fit">
          {["All", "Completed", "Cancelled"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                filter === f
                  ? "bg-surface-primary text-text-primary shadow-sm"
                  : "text-zinc-500 hover:text-text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface-primary border border-border-primary rounded-xl py-2.5 pl-11 pr-4 text-sm font-medium focus:outline-none focus:border-zinc-500 transition-colors"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-4 mt-6">
        {isLoading && (
          <div className="text-center py-16">
            <span className="w-8 h-8 border-4 border-text-primary border-t-transparent rounded-full animate-spin inline-block"></span>
          </div>
        )}
        {!isLoading && filteredHistory.length === 0 && (
          <div className="text-center py-20 bg-surface-primary rounded-3xl border border-border-primary">
            <Calendar className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text-primary mb-2">
              No services found
            </h3>
            <p className="text-zinc-500">
              Try adjusting your filters or search term.
            </p>
          </div>
        )}
        {filteredHistory.map((service, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            key={service.uuid || index}
            className="group relative bg-surface-primary rounded-2xl border border-border-primary overflow-hidden hover:border-zinc-400/50 transition-colors duration-200"
          >
            <div className="p-4 sm:p-6">
              {/* Header: ID, Status, Price */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-5">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="text-xs sm:text-sm font-medium text-zinc-500 font-mono">
                    #
                    {(
                      service.instant_booking_uuid ||
                      service.booking_uuid ||
                      service.uuid ||
                      "BOOKING"
                    )
                      .split("-")[0]
                      .toUpperCase()}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-zinc-300" />
                  <div className="scale-90 origin-left sm:scale-100">
                    <StatusBadge status={service.status} />
                  </div>
                  {service.booking_type === "INSTANT" && (
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
                    ₹{service.price || "TBD"}
                  </div>
                </div>
              </div>
              {/* Service Title */}
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-text-primary mb-4 sm:mb-6 leading-tight">
                {service.service?.name || "Service Request"}
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
                      {service.business?.name ||
                        (service.booking_type === "INSTANT"
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
                      {service.booking_type === "INSTANT"
                        ? "Instant Booking (ASAP)"
                        : service.scheduled_date}
                    </p>
                    {service.booking_type !== "INSTANT" &&
                      service.slot_type && (
                        <p className="text-zinc-500 mt-0.5">
                          {service.slot_type}
                        </p>
                      )}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-2 sm:gap-3 sm:col-span-2">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-zinc-500 font-medium mb-0.5">Location</p>
                    <p className="text-text-primary font-medium">
                      {service.address
                        ? `${service.address.address_type}: ${service.address.address_line}, ${service.address.locality || service.address.city}`
                        : "Location details"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 sm:pt-5 border-t border-border-primary flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mt-2">
                <div className="flex-1">
                  {service.booking_type === "INSTANT" &&
                    !["COMPLETED", "CANCELLED", "REJECTED"].includes(
                      service.status,
                    ) && (
                      <button
                        onClick={() =>
                          navigate(
                            `/track/instant/${service.instant_booking_uuid || service.booking_uuid}`,
                          )
                        }
                        className="text-blue-600 font-bold hover:underline text-sm flex items-center gap-1"
                      >
                        Track Request <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                </div>
                {/* {console.log(service)} */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  {(service?.status === "SEARCHING" ||
                    service?.status === "TIP_REQUIRED") && (
                    <button
                      onClick={() =>
                        cancelBooking(
                          service.instant_booking_uuid || service.booking_uuid,
                        )
                      }
                      disabled={isCanceling}
                      className="flex-1 sm:flex-none px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500 text-white border border-border-primary font-medium rounded-lg hover:bg-red-400 transition-colors text-sm cursor-pointer"
                    >
                      {isCanceling ? "Canceling..." : "Cancel"}
                    </button>
                  )}
                  {service?.status === "ASSIGNED" ||
                    (service?.status === "IN_PROGRESS" && (
                      <>
                        {/* <button
                        onClick={() =>
                          setActiveModal({
                            type: "chat",
                            bookingId:
                              booking.id ||
                              booking.uuid ||
                              booking.instant_booking_uuid,
                            booking: booking,
                          })
                        }
                        className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium bg-surface-primary text-text-primary border border-border-primary hover:bg-surface-secondary transition-all flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" /> Chat
                      </button> */}
                        <a
                          href={`tel:${service?.business?.phone || service?.employee?.phone}`}
                          className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium bg-surface-primary text-text-primary border border-border-primary hover:bg-surface-secondary transition-all flex items-center justify-center gap-2"
                        >
                          <PhoneCallIcon className="w-4 h-4" /> Contact
                        </a>
                      </>
                    ))}
                  <button
                    className="flex-1 sm:flex-none px-3 py-1.5 sm:px-4 sm:py-2 bg-surface-dark text-text-inverted font-medium rounded-lg hover:bg-surface-dark/80 transition-colors text-sm cursor-pointer"
                    onClick={() => setDetailsModal(service)}
                  >
                    Details
                  </button>
                  <ReviewAction
                    service={service}
                    onRate={setReviewModalOpen}
                    onBookAgain={() =>
                      navigate(`/services/${service.service?.slug || ""}`)
                    }
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-xl border border-border-primary text-text-primary hover:bg-surface-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show limited pages (first, last, and pages around current)
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
                      currentPage === page
                        ? "bg-text-primary text-surface-primary"
                        : "text-text-primary hover:bg-surface-secondary"
                    }`}
                  >
                    {page}
                  </button>
                );
              }
              // Show ellipsis
              if (
                page === currentPage - 2 ||
                page === currentPage + 2
              ) {
                return <span key={page} className="px-1 text-zinc-500">...</span>;
              }
              return null;
            })}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl border border-border-primary text-text-primary hover:bg-surface-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      <AnimatePresence>
        {/* Details Modal */}
        {detailsModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-primary rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setDetailsModal(null)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-text-primary"
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
                    {detailsModal.service?.name}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border-primary pb-4">
                  <span className="text-zinc-500 font-medium">
                    Professional
                  </span>
                  <span className="font-bold text-text-primary">
                    {detailsModal.business?.name || '"Not Assigned"'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border-primary pb-4">
                  <span className="text-zinc-500 font-medium">Date & Time</span>
                  <p className="text-sm font-bold text-text-primary flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-zinc-400" />
                    {dateFormater(detailsModal?.created_at)}
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
                    ₹{detailsModal.price || "0"}
                  </p>
                </div>
                <div className="pt-6 flex gap-3">
                  <button
                    onClick={() => setDetailsModal(null)}
                    className="flex-1 px-4 py-3 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 transition-colors text-sm"
                  >
                    Close
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/services/${detailsModal.service?.slug || ""}`)
                    }
                    className="flex-1 px-4 py-3 bg-text-primary text-surface-primary font-bold rounded-xl hover:bg-zinc-800 transition-colors text-sm text-center"
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
            selectedBookingForReview={reviewModalOpen}
            setReviewModalOpen={setReviewModalOpen}
          />
        )}

        {/* Report Issue Modal */}
        {reportModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-primary rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setReportModal(null)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-text-primary cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-black tracking-tight text-text-primary mb-2">
                Report an Issue
              </h2>
              <p className="text-zinc-500 font-medium mb-6">
                What went wrong with {reportModal.serviceName}?
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-zinc-500 mb-3">
                    Select Issue Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Unprofessional Behavior",
                      "Poor Quality",
                      "Late Arrival",
                      "Overcharged",
                      "Other",
                    ].map((type) => (
                      <button
                        key={type}
                        onClick={() => setReportType(type)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors cursor-pointer ${
                          reportType === type
                            ? "bg-red-500/10 border-red-500/30 text-red-500"
                            : "bg-surface-secondary border-border-secondary text-zinc-500 hover:text-text-primary hover:border-zinc-400"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-zinc-500 mb-2">
                    Additional Details
                  </label>
                  <textarea
                    required
                    rows="4"
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Please describe the issue in detail so our support team can investigate..."
                    className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl p-4 focus:outline-none focus:border-red-500/50 transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportModal(null)}
                    className="flex-1 px-4 py-3 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!reportType || !reportDetails.trim()}
                    onClick={() => {
                      alert(
                        "Issue reported successfully to admin. Support will contact you shortly.",
                      );
                      setReportModal(null);
                      setReportType("");
                      setReportDetails("");
                    }}
                    className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    Submit Report
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileServicesHistory;
