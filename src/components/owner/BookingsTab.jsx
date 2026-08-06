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
import Contact from "../pop-ups/Contact";
import Chat from "../pop-ups/Chat";
import Otp from "../pop-ups/Otp";

const INITIAL_BOOKINGS = [
  {
    id: "BKG-001",
    customer: "Sarah Jenkins",
    service: "Deep Home Cleaning",
    date: "Oct 24, 2026",
    time: "10:00 AM",
    price: "4,500",
    status: "accepted",
    location: "123 Palm Avenue, Downtown",
  },
  {
    id: "BKG-002",
    customer: "Michael Chen",
    service: "AC Servicing & Repair",
    date: "Oct 24, 2026",
    time: "02:30 PM",
    price: "1,200",
    status: "accepted",
    location: "45B Tech Park, Block C",
  },
  {
    id: "BKG-003",
    customer: "Priya Sharma",
    service: "Plumbing Inspection",
    date: "Oct 23, 2026",
    time: "09:00 AM",
    price: "800",
    status: "completed",
    location: "78 Sunset Blvd",
  },
  {
    id: "BKG-004",
    customer: "David Wilson",
    service: "Electrical Wiring",
    date: "Oct 22, 2026",
    time: "11:00 AM",
    price: "2,100",
    status: "completed",
    location: "12 North Street",
  },
];

const StatusBadge = ({ status }) => {
  const styles = {
    accepted: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    completed: "bg-green-500/10 text-green-500 border-green-500/20",
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
  const [filter, setFilter] = useState("accepted");
  const [bookingsList, setBookingsList] = useState(INITIAL_BOOKINGS);
  const [activeModal, setActiveModal] = useState(null); // { type: 'otp' | 'contact' | 'chat', bookingId: string }
  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState(false);

  const updateBookingStatus = (id, newStatus) => {
    setBookingsList((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: newStatus } : booking,
      ),
    );
  };

  const handleVerifyOtp = () => {
    if (otpValue === "1234") {
      updateBookingStatus(activeModal.bookingId, "completed");
      setActiveModal(null);
      setOtpValue("");
      setOtpError(false);
    } else {
      setOtpError(true);
    }
  };

  const filteredBookings =
    filter === "all"
      ? bookingsList
      : bookingsList.filter((b) => b.status === filter);

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
          {["all", "accepted", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all duration-300 ${
                filter === f
                  ? "bg-surface-secondary text-text-primary shadow-sm border border-border-primary"
                  : "text-zinc-500 hover:text-text-primary border border-transparent"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="grid gap-4">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-surface-primary rounded-2xl border border-border-primary p-6 shadow-2xl shadow-black/5 hover:border-text-primary transition-all duration-300 group"
          >
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-grow space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-zinc-500">
                    {booking.id}
                  </span>
                  <StatusBadge status={booking.status} />
                </div>

                <div>
                  <h3 className="text-xl font-bold tracking-tight text-text-primary mb-1">
                    {booking.service}
                  </h3>
                  <p className="text-zinc-400 font-medium">
                    {booking.customer}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {booking.date} at {booking.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{booking.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-end items-start md:items-end md:min-w-[150px] border-t md:border-t-0 md:border-l border-border-primary pt-4 md:pt-0 md:pl-6">
                <div className="flex items-center gap-1 text-2xl font-black tracking-tight text-text-primary md:self-center md: mb-3">
                  <IndianRupee className="w-5 h-5 text-zinc-400" />
                  {booking.price}
                </div>

                {/* Conditional Actions based on status */}
                <div className="w-full flex flex-wrap md:justify-end gap-2">
                  {booking.status === "accepted" && (
                    <>
                      <button
                        onClick={() =>
                          setActiveModal({
                            type: "contact",
                            bookingId: booking.id,
                          })
                        }
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-surface-secondary text-text-primary border border-border-primary font-bold text-sm rounded-xl hover:bg-zinc-800 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" /> Contact
                      </button>
                      <button
                        onClick={() =>
                          setActiveModal({ type: "otp", bookingId: booking.id })
                        }
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-surface-dark text-white font-bold text-sm rounded-xl hover:bg-emerald-600 transition-colors shadow-md cursor-pointer"
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

        {filteredBookings.length === 0 && (
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
