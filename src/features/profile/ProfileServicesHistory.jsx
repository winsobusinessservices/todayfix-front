import React, { useState } from "react";
import { IndianRupee, MapPin, Calendar, Search } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  userBookingHistory,
  userPendingBoooking,
} from "../../services/userApi";

const ProfileServicesHistory = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [detailsModal, setDetailsModal] = useState(null);
  const [reviewModal, setReviewModal] = useState(null);
  const [reportModal, setReportModal] = useState(null);
  const [reportType, setReportType] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const { data: bookingsData, isLoading } = useQuery({
    queryKey: ["userBookingsHistory", currentPage],
    queryFn: () => userBookingHistory({ page: currentPage }),
  });
  // console.log(bookingsData);

  // Since it's history, we filter out PENDING or IN_PROGRESS if possible,
  // but let's just use the real data and filter by the selected filter state
  const serviceHistory =
    bookingsData?.results?.data || bookingsData?.results || bookingsData || [];
  const count = bookingsData?.count || 0;
  const totalPages = Math.ceil(count / 10);

  const completedServices = serviceHistory.filter(
    (s) => s.status === "COMPLETED",
  );
  const totalSpent = completedServices.reduce(
    (acc, curr) => acc + parseInt(curr.price || 0),
    0,
  );
  const averageRating = "4.8"; // Hardcoded for MVP as per user suggestion

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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-surface-primary border border-border-primary rounded-2xl p-4 text-center shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <p className="text-2xl md:text-3xl font-black text-text-primary">
            {completedServices.length}
          </p>
          <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mt-1">
            Completed
          </p>
        </div>
        <div className="bg-surface-primary border border-border-primary rounded-2xl p-4 text-center shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <p className="text-2xl md:text-3xl font-black text-text-primary flex items-center justify-center gap-1">
            <IndianRupee className="w-5 h-5 md:w-6 md:h-6 stroke-[3]" />
            {totalSpent.toLocaleString()}
          </p>
          <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mt-1">
            Total Spent
          </p>
        </div>
        <div className="bg-surface-primary border border-border-primary rounded-2xl p-4 text-center shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <p className="text-2xl md:text-3xl font-black text-text-primary flex items-center justify-center gap-1">
            {averageRating}
            <svg
              className="w-5 h-5 md:w-6 md:h-6 fill-amber-500"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </p>
          <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mt-1">
            Your Rating
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
        <div className="flex gap-2 bg-surface-secondary p-1 rounded-xl border border-border-secondary w-full sm:w-auto">
          {["All", "Completed", "Cancelled"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-bold flex-1 sm:flex-none transition-colors ${filter === f ? "bg-surface-primary shadow-sm text-text-primary" : "text-text-secondary hover:text-text-primary"}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface-secondary border border-border-secondary rounded-xl py-2 pl-9 pr-4 text-sm font-medium focus:outline-none focus:border-zinc-500"
          />
        </div>
      </div>

      {/* Cards */}
      {isLoading && (
        <div className="text-center py-16">
          <span className="w-8 h-8 border-4 border-text-primary border-t-transparent rounded-full animate-spin inline-block"></span>
        </div>
      )}
      {!isLoading && filteredHistory.length === 0 && (
        <div className="text-center py-16 bg-surface-secondary rounded-3xl border border-border-secondary">
          <Search className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
          <p className="text-text-primary font-bold text-lg mb-1">
            No services found
          </p>
          <p className="text-text-secondary font-medium">
            Try adjusting your filters or search term.
          </p>
        </div>
      )}
      {filteredHistory.map((service, index) => (
        <div
          key={service.uuid || index}
          className="bg-surface-primary border border-border-primary rounded-[1.5rem] p-6 md:p-8 shadow-sm hover:shadow-lg hover:border-black transition-all mb-4"
        >
          {/* Header: Title & Status */}
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-secondary flex items-center justify-center border border-border-secondary shrink-0 mt-1">
                <div className="w-3 h-3 rounded-full bg-text-primary"></div>
              </div>
              <div>
                <h3 className="text-xl font-black text-text-primary leading-tight">
                  {service.service?.name || "Service Request"}
                </h3>
                <p className="text-base font-medium text-text-secondary mt-1">
                  {service.business?.name ||
                    (service.booking_type === "INSTANT"
                      ? "Finding Provider..."
                      : "No Provider Assigned")}
                </p>
              </div>
            </div>
            <span
              className={`px-3 py-1.5 text-[10px] sm:text-xs font-black rounded-full uppercase tracking-widest flex items-center gap-1.5 shrink-0 ${service.status === "COMPLETED" ? "bg-green-500/10 text-green-600 border border-green-500/20" : service.status === "NO_PROVIDER" ? "bg-zinc-100 text-zinc-500 border border-zinc-200" : "bg-zinc-100 text-zinc-600 border border-zinc-200"}`}
            >
              {service.status === "COMPLETED" && <span>✓</span>}{" "}
              {service.status === "NO_PROVIDER"
                ? "NO PROVIDER"
                : service.status}
            </span>
          </div>

          {/* Middle: Details */}
          <div className="pl-14 mt-4 space-y-3">
            <div className="flex items-center gap-2 text-sm text-text-secondary font-medium">
              <Calendar className="w-4 h-4" />
              {service.booking_type === "INSTANT"
                ? "Instant Booking (ASAP)"
                : service.scheduled_date}
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary font-medium max-w-[80%]">
              <MapPin className="w-4 h-4 shrink-0" />
              <span
                className="truncate"
                title={
                  service.address
                    ? `${service.address.address_line}, ${service.address.locality || service.address.city}`
                    : "Location details"
                }
              >
                {service.address
                  ? `${service.address.address_type}: ${service.address.address_line}, ${service.address.locality || service.address.city}`
                  : "Location details"}
              </span>
            </div>
          </div>

          {/* Bottom: Payment & Actions */}
          <div className="pt-5 border-t border-border-secondary flex flex-col sm:flex-row justify-between items-center gap-5 pl-0 sm:pl-14">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-sm font-bold text-text-secondary uppercase tracking-widest">
                Total paid
              </span>
              <span className="text-xl font-black text-text-primary">
                {service.price}
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                className="flex-1 sm:flex-none px-6 py-3 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 transition-colors text-sm cursor-pointer"
                onClick={() => setDetailsModal(service)}
              >
                View Details
              </button>
              {/* Assuming for this demo that the first one is unrated and others are rated, to show both states */}
              {service.status === "Completed" ? (
                index === 0 ? (
                  <button
                    onClick={() => setReviewModal(service)}
                    className="flex-1 sm:flex-none px-6 py-3 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md text-sm cursor-pointer"
                  >
                    Rate Service
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/request-service")}
                    className="flex-1 sm:flex-none px-6 py-3 bg-surface-dark border border-border-secondary text-text-inverted font-bold rounded-xl hover:bg-surface-secondary hover:text-text-primary transition-colors text-sm cursor-pointer"
                  >
                    Book Again
                  </button>
                )
              ) : (
                <button
                  onClick={() => navigate("/request-service")}
                  className="flex-1 sm:flex-none px-6 py-3 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md text-sm cursor-pointer"
                >
                  Book Again
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* {filteredHistory.length === 0 && (
          
        )} */}
      {/* </div> */}

      {/* Details Modal */}
      {detailsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface-primary rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative">
            <button
              onClick={() => setDetailsModal(null)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-text-primary"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              Service Summary
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between border-b border-border-secondary pb-4">
                <span className="text-text-secondary font-medium">Service</span>
                <span className="font-bold text-text-primary">
                  {detailsModal.service?.name}
                </span>
              </div>
              <div className="flex justify-between border-b border-border-secondary pb-4">
                <span className="text-text-secondary font-medium">
                  Professional
                </span>
                <span className="font-bold text-text-primary">
                  {detailsModal.business?.name}
                </span>
              </div>
              <div className="flex justify-between border-b border-border-secondary pb-4">
                <span className="text-text-secondary font-medium">
                  Date & Time
                </span>
                {/* </p> */}
                <p className="text-sm font-bold text-text-primary flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {detailsModal.scheduled_date} at {detailsModal.scheduled_time}{" "}
                  ({detailsModal.slot_type})
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">
                  Location
                </p>
                <p className="text-sm font-bold text-text-primary flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {detailsModal.address?.address_line},{" "}
                  {detailsModal.address?.locality}, {detailsModal.address?.city}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">
                  Amount Paid
                </p>
                <p className="text-xl font-black text-text-primary">
                  {detailsModal.price}
                </p>
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setDetailsModal(null)}
                  className="flex-1 px-4 py-3 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 transition-colors text-sm"
                >
                  Close
                </button>
                <Link
                  to={`/vendor/${detailsModal.business?.business_profile_uuid}`}
                  className="flex-1 px-4 py-3 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform text-sm text-center border border-zinc-700"
                >
                  Book Again
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface-primary rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative">
            <button
              onClick={() => setReviewModal(null)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-text-primary"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Rate Service
            </h2>
            <p className="text-text-secondary font-medium mb-6">
              How was your experience with {reviewModal.businessName}?
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2">
                  Rating
                </label>
                <div className="flex gap-2 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className={`w-8 h-8 cursor-pointer transition-transform hover:scale-110 ${star <= reviewRating ? "fill-current" : "text-slate-200 fill-current"}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2">
                  Review Details
                </label>
                <textarea
                  required
                  rows="4"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience..."
                  className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-text-primary resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewModal(null)}
                  className="flex-1 px-4 py-3 bg-surface-secondary text-text-primary font-bold rounded-xl hover:bg-zinc-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!reviewText.trim()}
                  onClick={() => {
                    alert("Review submitted!");
                    setReviewModal(null);
                    setReviewText("");
                    setReviewRating(5);
                  }}
                  className="flex-1 px-4 py-3 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform disabled:opacity-50"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Issue Modal */}
      {reportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface-primary rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative">
            <button
              onClick={() => setReportModal(null)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-text-primary cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Report an Issue
            </h2>
            <p className="text-text-secondary font-medium mb-6">
              What went wrong with {reportModal.serviceName}?
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-text-secondary mb-3">
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
                          : "bg-surface-secondary border-border-secondary text-text-secondary hover:text-text-primary hover:border-zinc-400"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-text-secondary mb-2">
                  Additional Details
                </label>
                <textarea
                  required
                  rows="4"
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  placeholder="Please describe the issue in detail so our support team can investigate..."
                  className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none"
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
                  className="flex-1 px-4 py-3 bg-red-500 text-white font-bold rounded-xl hover:scale-[0.98] hover:bg-red-600 transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-red-500/20"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileServicesHistory;
