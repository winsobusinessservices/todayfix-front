import React, { useState } from "react";
import { IndianRupee, Search, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { userBookingHistory } from "../../services/userApi";
import UnifiedBookingList from "./UnifiedBookingList";

const ProfileServicesHistory = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: bookingsData, isLoading } = useQuery({
    queryKey: ["userBookingsHistory", currentPage],
    queryFn: () => userBookingHistory({ page: currentPage }),
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
    (acc, curr) => acc + parseInt(curr.price || curr.total_payable_price || 0),
    0,
  );
  const averageRating = "0.0"; // Hardcoded for MVP as per user suggestion

  const filteredHistory = serviceHistory.filter((service) => {
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
      !service.business?.name?.toLowerCase().includes(search.toLowerCase()) &&
      !service.requested_service_name?.toLowerCase().includes(search.toLowerCase())
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
          <p className="text-xl md:text-3xl text-center font-black text-text-primary tracking-tight flex items-center justify-center">
            <IndianRupee className="w-6 h-6 mr-1 stroke-[3]" />
            {totalSpent.toLocaleString()}
          </p>
        </div>
        <div className="bg-surface-primary border border-border-primary rounded-2xl p-3 md:p-6 shadow-sm text-center">
          <p className="text-zinc-500 font-medium mb-1 text-xs md:text-sm">
            Average Rating
          </p>
          <p className="text-xl md:text-3xl text-center font-black text-text-primary tracking-tight flex items-center justify-center gap-2">
            {averageRating}
            <svg className="w-5 h-5 md:w-6 md:h-6 fill-amber-500" viewBox="0 0 20 20">
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
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
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

      <UnifiedBookingList
        bookings={filteredHistory}
        isLoading={isLoading}
        emptyIcon={Calendar}
        emptyTitle="No services found"
        emptyDescription="Try adjusting your filters or search term."
      />

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl bg-surface-primary border border-border-primary text-sm font-bold text-text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-secondary cursor-pointer"
          >
            Previous
          </button>
          <span className="text-sm font-bold text-text-secondary">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl bg-surface-primary border border-border-primary text-sm font-bold text-text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-secondary cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileServicesHistory;
