import React, { useState } from "react";
import {
  MapPin,
  Clock,
  IndianRupee,
  CheckCircle2,
  Calendar,
  X,
  UserPlus,
  User,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutletContext } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingApi } from "../../services/bookingApi";
import toast from "react-hot-toast";
import Contact from "../../components/modals/Contact";
import Chat from "../../components/modals/Chat";
import Otp from "../../components/modals/Otp";
import AssignEmployee from "../../components/modals/AssignEmployee";
import { dateFormater } from "../../utils/dateFormater";

const StatusBadge = ({ status }) => {
  const styles = {
    PENDING: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    CONFIRMED: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20",
    IN_PROGRESS: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20",
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
  const businessProfile = useOutletContext();
  const businessType = businessProfile?.business_type?.toUpperCase();
  const isIndividual =
    !businessType ||
    businessType === "INDIVIDUAL" ||
    businessType === "INDIVISUAL";
  const [activeTab, setActiveTab] = useState("SCHEDULED"); // "SCHEDULED" | "INSTANT"
  const [filter, setFilter] = useState("ALL");
  const [activeModal, setActiveModal] = useState(null); // { type: 'otp' | 'contact' | 'chat', bookingId: string }
  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState(false);

  // Scheduled bookings query
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
    onError: () => toast.error("Failed to accept booking"),
  });

  const { mutate: declineBooking, isPending: isDeclining } = useMutation({
    mutationFn: bookingApi.rejectBooking,
    onSuccess: () => {
      toast.success("Booking declined!");
      queryClient.invalidateQueries(["businessBookings"]);
    },
    onError: () => toast.error("Failed to decline booking"),
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
    onError: () => toast.error("Failed to complete booking"),
  });

  const { mutate: startBooking, isPending: isStarting } = useMutation({
    mutationFn: bookingApi.startBooking,
    onSuccess: () => {
      toast.success("Job started successfully!");
      queryClient.invalidateQueries(["businessBookings"]);
    },
    onError: () => toast.error("Failed to start job"),
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
          if (filter === "ACTIVE")
            return b.status === "CONFIRMED" || b.status === "IN_PROGRESS";
          return b.status === filter;
        });
  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col gap-6">
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
          <div className="flex flex-wrap gap-2 bg-surface-primary p-1 rounded-2xl border border-border-primary w-fit">
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
            className="bg-surface-primary/80 backdrop-blur-md rounded-2xl border border-border-primary p-6 shadow-lg hover:shadow-purple-500/10 hover:border-purple-500/30 transition-all duration-300 group"
          >
            <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
              <div className="flex-grow space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-zinc-500 uppercase">
                    {(booking.uuid || booking.id || "OFFER")?.split("-")[0]}
                  </span>
                  <StatusBadge status={booking.status} />
                </div>

                <div>
                  <h3 className="text-xl font-bold tracking-tight text-text-primary mb-1">
                    {booking.service?.name || "Service Request"}
                  </h3>
                  {booking.user && (
                    <p className="text-zinc-400 font-medium uppercase">
                      Client -{" "}
                      {booking?.status === "IN_PROGRESS" || booking?.status === "COMPLETED"
                        ? booking?.user?.first_name +
                          " " +
                          booking?.user?.last_name
                        : booking.user?.user_uuid.split("-")[0] || "Customer"}
                    </p>
                  )}
                  {booking.notes && (
                    <p className="text-sm text-zinc-500 italic mt-1 bg-surface-secondary p-2 rounded-lg border border-border-primary inline-block">
                      "{booking?.notes}"
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-500 mt-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <span>
                      {dateFormater(booking.scheduled_date)} (
                      {booking.slot_type})
                    </span>
                  </div>
                  <div className="flex items-start sm:items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-500 mt-0.5 sm:mt-0 flex-shrink-0" />
                    {booking.status === "IN_PROGRESS" || booking.status === "COMPLETED" ? (
                      <span className="text-zinc-300 line-clamp-2" title={[booking.address?.address_line, booking.address?.locality, booking.address?.city, booking.address?.state, booking.address?.pincode].filter(Boolean).join(", ")}>
                        {[
                          booking.address?.address_line,
                          booking.address?.locality,
                          booking.address?.city,
                          booking.address?.state,
                          booking.address?.pincode,
                        ]
                          .filter(Boolean)
                          .join(", ") || "Customer Location"}
                      </span>
                    ) : (
                      <span
                        className="truncate max-w-[200px]"
                        title={
                          booking.address?.locality ||
                          booking.address?.city ||
                          booking.address?.address_line ||
                          (booking.distance_km
                            ? `${booking.distance_km} km away`
                            : "")
                        }
                      >
                        {booking.address?.locality ||
                          booking.address?.city ||
                          booking.address?.address_line ||
                          (booking.distance_km
                            ? `${booking.distance_km} km away (${booking.estimated_travel_minutes} min)`
                            : "Customer Location")}
                      </span>
                    )}
                  </div>
                </div>

                {/* Assigned Employee Details */}
                {(booking.booking_employees?.length > 0 || booking.employee) && (
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border-primary/50">
                    <div className="w-10 h-10 rounded-full bg-surface-secondary flex items-center justify-center border border-border-primary flex-shrink-0">
                      <User className="w-5 h-5 text-text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Assigned To</p>
                      <p className="text-sm font-bold text-zinc-200">
                        {booking.booking_employees?.[0]?.name || booking.employee?.name || "Employee"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-end items-start md:items-end md:min-w-[150px] border-t md:border-t-0 md:border-l border-border-primary pt-4 md:pt-0 md:pl-6">
                <div className="flex items-center gap-1 text-2xl font-black tracking-tight text-text-primary md:self-center md: mb-3">
                  <IndianRupee className="w-5 h-5 text-zinc-400" />
                  {booking.price || "TBD"}
                </div>

                {/* Conditional Actions based on status */}
                <div className="w-full flex flex-wrap md:justify-end gap-2 mt-4 md:mt-0">
                  {booking.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => acceptBooking(booking.uuid)}
                        disabled={isAccepting}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-text-primary text-text-inverted font-bold text-sm rounded-xl hover:bg-surface-dark transition-colors shadow-md cursor-pointer disabled:opacity-50"
                      >
                        <CheckCircle2 className="w-4 h-4" />{" "}
                        {isAccepting ? "Accepting..." : "Accept Job"}
                      </button>
                      <button
                        onClick={() => declineBooking(booking.uuid)}
                        disabled={isDeclining}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-red-500/10 text-red-500 border border-red-500/20 font-bold text-sm rounded-xl hover:bg-red-500/20 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />{" "}
                        {isDeclining ? "Declining..." : "Decline Job"}
                      </button>
                    </>
                  )}
                  {booking.status === "CONFIRMED" && (
                    <>
                      {isIndividual ? (
                        <button
                          onClick={() => startBooking(booking.uuid)}
                          disabled={isStarting}
                          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-surface-dark text-text-inverted font-bold text-sm rounded-xl hover:opacity-90 transition-all shadow-md cursor-pointer disabled:opacity-50"
                        >
                          <Clock className="w-4 h-4" />{" "}
                          {isStarting ? "Starting..." : "Start Job"}
                        </button>
                      ) : !(
                        booking.booking_employees?.length > 0 ||
                        booking.employee
                      ) ? (
                        <button
                          onClick={() =>
                            setActiveModal({
                              type: "assign",
                              bookingId: booking.uuid,
                              serviceId: booking.service?.service_uuid,
                              isReassign: false,
                            })
                          }
                          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all shadow-md shadow-purple-500/25 cursor-pointer"
                        >
                          <UserPlus className="w-4 h-4" /> Assign Employee
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() =>
                              setActiveModal({
                                type: "assign",
                                bookingId: booking.uuid,
                                serviceId: booking.service?.service_uuid,
                                isReassign: true,
                                oldEmployeeId:
                                  booking.booking_employees?.[0]
                                    ?.employee_uuid ||
                                  booking.employee?.employee_uuid,
                              })
                            }
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-surface-secondary text-text-secondary border border-border-primary font-bold text-sm rounded-xl hover:bg-surface-tertiary transition-colors shadow-sm cursor-pointer"
                          >
                            Reassign
                          </button>
                          <button
                            onClick={() => startBooking(booking.uuid)}
                            disabled={isStarting}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-surface-dark text-text-inverted font-bold text-sm rounded-xl hover:opacity-90 transition-all shadow-md cursor-pointer disabled:opacity-50"
                          >
                            <Clock className="w-4 h-4" />{" "}
                            {isStarting ? "Starting..." : "Start Job"}
                          </button>
                        </>
                      )}
                    </>
                  )}

                  {booking.status === "IN_PROGRESS" && (
                    <>
                      <button
                        onClick={() =>
                          setActiveModal({
                            type: "contact",
                            bookingId: booking.uuid,
                          })
                        }
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-surface-secondary text-text-primary border border-border-primary font-bold text-sm rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" /> Contact
                      </button>
                      <button
                        onClick={() =>
                          setActiveModal({
                            type: "otp",
                            bookingId: booking.uuid,
                          })
                        }
                        disabled={isCompleting}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm rounded-xl hover:from-emerald-500 hover:to-teal-500 transition-all shadow-md shadow-emerald-500/25 cursor-pointer disabled:opacity-50"
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

        {activeModal?.type === "assign" && !isIndividual && (
          <AssignEmployee
            activeModal={activeModal}
            setActiveModal={setActiveModal}
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
