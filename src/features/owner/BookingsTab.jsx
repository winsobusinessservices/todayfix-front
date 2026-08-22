import React, { useState } from "react";
import {
  MapPin,
  Clock,
  IndianRupee,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Calendar,
  MessageSquare,
  Phone,
  ShieldAlert,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingApi } from "../../services/bookingApi";
import toast from "react-hot-toast";
import Contact from "../../components/modals/Contact";
import Chat from "../../components/modals/Chat";
import Otp from "../../components/modals/Otp";

const StatusBadge = ({ status }) => {
  const styles = {
    PENDING: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    CONFIRMED: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    IN_PROGRESS: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    COMPLETED: "bg-green-500/10 text-green-500 border-green-500/20",
    CANCELLED: "bg-red-500/10 text-red-500 border-red-500/20",
    REJECTED: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const BookingsTab = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("ALL");
  const [activeModal, setActiveModal] = useState(null); // { type: 'otp' | 'contact' | 'chat', bookingId: string }
  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState(false);

  const { data: bookingsData, isLoading } = useQuery({
    queryKey: ["businessBookings"],
    queryFn: bookingApi.getBusinessBookings,
  });

  const bookingsList = bookingsData?.results || bookingsData || [];

  const { mutate: acceptBooking, isPending: isAccepting } = useMutation({
    mutationFn: bookingApi.acceptBooking,
    onSuccess: () => {
      toast.success("Booking accepted!");
      queryClient.invalidateQueries(["businessBookings"]);
    },
    onError: () => toast.error("Failed to accept booking")
  });

  const { mutate: completeBooking, isPending: isCompleting } = useMutation({
    mutationFn: bookingApi.completeBooking,
    onSuccess: () => {
      toast.success("Booking marked as complete!");
      queryClient.invalidateQueries(["businessBookings"]);
      setActiveModal(null);
      setOtpValue("");
      setOtpError(false);
    },
    onError: () => toast.error("Failed to complete booking")
  });

  const handleVerifyOtp = () => {
    if (otpValue === "1234") {
      completeBooking(activeModal.bookingId);
    } else {
      setOtpError(true);
    }
  };

  const filteredBookings =
    filter === "ALL"
      ? bookingsList
      : bookingsList.filter((b) => {
          if (filter === "ACTIVE") return b.status === "CONFIRMED" || b.status === "IN_PROGRESS";
          return b.status === filter;
        });

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-text-primary mb-2">
            Bookings
          </h1>
          <p className="text-zinc-400">
            Manage your upcoming and past service requests.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 bg-surface-primary p-1 rounded-2xl border border-border-primary">
          {["ALL", "PENDING", "ACTIVE", "COMPLETED"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all duration-300 ${
                filter === f
                  ? "bg-surface-secondary text-text-primary shadow-sm border border-border-primary"
                  : "text-zinc-500 hover:text-text-primary border border-transparent"
              }`}
            >
              {f.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="grid gap-4">
        {isLoading && (
          <div className="text-center py-16">
            <span className="w-8 h-8 border-4 border-text-primary border-t-transparent rounded-full animate-spin inline-block"></span>
          </div>
        )}
        {filteredBookings.map((booking) => (
          <div
            key={booking.uuid}
            className="bg-surface-primary rounded-2xl border border-border-primary p-6 shadow-2xl shadow-black/5 hover:border-text-primary transition-all duration-300 group"
          >
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-grow space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-zinc-500 uppercase">
                    {booking.uuid.split('-')[0]}
                  </span>
                  <StatusBadge status={booking.status} />
                </div>

                <div>
                  <h3 className="text-xl font-bold tracking-tight text-text-primary mb-1">
                    {booking.service?.name}
                  </h3>
                  <p className="text-zinc-400 font-medium">
                    {booking.user?.first_name} {booking.user?.last_name}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {booking.scheduled_date} ({booking.slot_type})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{booking.address?.locality || booking.address?.city}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-end items-start md:items-end md:min-w-[150px] border-t md:border-t-0 md:border-l border-border-primary pt-4 md:pt-0 md:pl-6">
                <div className="flex items-center gap-1 text-2xl font-black tracking-tight text-text-primary md:self-center md: mb-3">
                  <IndianRupee className="w-5 h-5 text-zinc-400" />
                  {booking.price || "TBD"}
                </div>

                {/* Conditional Actions based on status */}
                <div className="w-full flex flex-wrap md:justify-end gap-2">
                  {booking.status === "PENDING" && (
                    <button
                      onClick={() => acceptBooking(booking.uuid)}
                      disabled={isAccepting}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-colors shadow-md cursor-pointer disabled:opacity-50"
                    >
                      <CheckCircle2 className="w-4 h-4" /> {isAccepting ? "Accepting..." : "Accept Job"}
                    </button>
                  )}
                  {booking.status === "CONFIRMED" && (
                    <>
                      <button
                        onClick={() =>
                          setActiveModal({
                            type: "contact",
                            bookingId: booking.uuid,
                          })
                        }
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-surface-secondary text-text-primary border border-border-primary font-bold text-sm rounded-xl hover:bg-zinc-800 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" /> Contact
                      </button>
                      <button
                        onClick={() =>
                          setActiveModal({ type: "otp", bookingId: booking.uuid })
                        }
                        disabled={isCompleting}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-surface-dark text-white font-bold text-sm rounded-xl hover:bg-emerald-600 transition-colors shadow-md cursor-pointer disabled:opacity-50"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Finish Job
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {!isLoading && filteredBookings.length === 0 && (
          <div className="text-center py-20 bg-surface-primary rounded-3xl border border-border-primary">
            <Calendar className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text-primary mb-2">
              No bookings found
            </h3>
            <p className="text-zinc-500">
              You don't have any {filter} bookings right now.
            </p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeModal?.type === "contact" && (
          <Contact activeModal={activeModal} setActiveModal={setActiveModal} />
        )}

        {activeModal?.type === "chat" && (
          <Chat
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            bookingsList={bookingsList}
          />
        )}

        {activeModal?.type === "otp" && (
          <Otp
            otpValue={otpValue}
            setOtpValue={setOtpValue}
            otpError={otpError}
            setOtpError={setOtpError}
            handleVerifyOtp={handleVerifyOtp}
            setActiveModal={setActiveModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingsTab;

