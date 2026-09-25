import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { bookingApi } from "../../services/bookingApi";
import UnifiedBookingList from "./UnifiedBookingList";
import { Search } from "lucide-react";

const ProfileRequests = ({ addresses }) => {
  const navigate = useNavigate();
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
          className="btn-primary px-5 text-nowrap py-2.5 bg-text-primary text-surface-primary font-bold rounded-xl hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
        >
          New Request
        </button>
      </div>

      <UnifiedBookingList
        bookings={bookings}
        isLoading={isLoading}
        emptyIcon={Search}
        emptyTitle="No Active Requests"
        emptyDescription="You don't have any pending service requests."
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

export default ProfileRequests;
