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
  Phone,
  Zap,
  PhoneCallIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutletContext } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingApi } from "../../services/bookingApi";
import { instantBookingApi } from "../../services/instantBookingApi";
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
    ACCEPTED: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20",
    ASSIGNED: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20",
    IN_PROGRESS: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20",
    COMPLETED: "bg-green-500/10 text-green-500 border-green-500/20",
    CANCELLED: "bg-red-500/10 text-red-500 border-red-500/20",
    REJECTED: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${styles[status] || "bg-zinc-500/10 text-zinc-600 border-zinc-500/20"}`}
    >
      {status}
    </span>
  );
};

const getMapLink = (address) => {
  if (!address) return "#";
  if (address.location) {
    const match = address.location.match(/src="([^"]+)"/);
    if (match && match[1]) {
      return match[1].replace(/&?output=embed/, "");
    }
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    [
      address.address_line,
      address.locality,
      address.city,
      address.state,
      address.pincode,
    ]
      .filter(Boolean)
      .join(", ") || "Customer Location",
  )}`;
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

  const bookingsList = Array.isArray(bookingsData?.results)
    ? bookingsData.results
    : Array.isArray(bookingsData)
      ? bookingsData
      : bookingsData?.data && Array.isArray(bookingsData.data)
        ? bookingsData.data
        : [];

  // Instant bookings query
  const { data: instantBookingsData, isLoading: isLoadingInstant } = useQuery({
    queryKey: ["instantBusinessBookings"],
    queryFn: instantBookingApi.acceptedInstantBookingOffer,
  });

  const instantBookingsList = Array.isArray(instantBookingsData?.results)
    ? instantBookingsData.results
    : Array.isArray(instantBookingsData)
      ? instantBookingsData
      : instantBookingsData?.data && Array.isArray(instantBookingsData.data)
        ? instantBookingsData.data
        : [];

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
    onError: () => toast.error("Failed to initiate completion"),
  });

  const { mutate: verifyBooking, isPending: isVerifying } = useMutation({
    mutationFn: bookingApi.completeBookingVerify,
    onSuccess: () => {
      toast.success("Booking marked as complete!");
      queryClient.invalidateQueries(["businessBookings"]);
      setActiveModal(null);
      setOtpValue("");
      setOtpError(false);
    },
    onError: () => toast.error("Failed to verify OTP"),
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
    if (otpValue && otpValue.length > 0) {
      if (activeTab === "INSTANT") {
        verifyInstantBooking({
          bookingId: activeModal.bookingId,
          otp: otpValue,
        });
      } else {
        verifyBooking({ bookingId: activeModal.bookingId, otp: otpValue });
      }
    } else {
      setOtpError(true);
    }
  };

  const { mutate: startInstantBooking, isPending: isStartingInstant } =
    useMutation({
      mutationFn: instantBookingApi.startInstantBooking,
      onSuccess: () => {
        toast.success("Job started!");
        queryClient.invalidateQueries(["instantBusinessBookings"]);
      },
      onError: () => toast.error("Failed to start job"),
    });

  const { mutate: completeInstantBooking, isPending: isCompletingInstant } =
    useMutation({
      mutationFn: instantBookingApi.completeInstantBooking,
      onError: () => toast.error("Failed to initiate completion"),
    });

  const { mutate: verifyInstantBooking, isPending: isVerifyingInstant } =
    useMutation({
      mutationFn: instantBookingApi.completeInstantBookingVerify,
      onSuccess: () => {
        toast.success("Job completed!");
        queryClient.invalidateQueries(["instantBusinessBookings"]);
        setActiveModal(null);
        setOtpValue("");
        setOtpError(false);
      },
      onError: () => toast.error("Failed to verify OTP"),
    });

  const currentList = Array.isArray(
    activeTab === "INSTANT" ? instantBookingsList : bookingsList,
  )
    ? activeTab === "INSTANT"
      ? instantBookingsList
      : bookingsList
    : [];

  const filteredBookings =
    filter === "ALL"
      ? currentList
      : currentList.filter((b) => {
          if (filter === "ACTIVE")
            return (
              b.status === "CONFIRMED" ||
              b.status === "IN_PROGRESS" ||
              b.status === "ACCEPTED"
            );
          return b.status === filter;
        });
  // console.log(currentList);

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

          <div className="flex flex-col gap-4">
            {/* Tab Switcher */}
            <div className="flex bg-surface-secondary p-1 rounded-2xl w-fit">
              {["SCHEDULED", "INSTANT"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-surface-primary text-text-primary shadow-sm"
                      : "text-zinc-500 hover:text-text-primary"
                  }`}
                >
                  {tab === "SCHEDULED"
                    ? "Scheduled Bookings"
                    : "Instant Bookings"}
                </button>
              ))}
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
      </div>

      {/* Bookings List */}
      <div className="grid gap-4">
        {(isLoading || isLoadingInstant) && (
          <div className="text-center py-16">
            <span className="w-8 h-8 border-4 border-text-primary border-t-transparent rounded-full animate-spin inline-block"></span>
          </div>
        )}
        {filteredBookings?.map((booking, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            key={
              booking.booking_uuid ||
              booking.instant_booking_uuid ||
              booking.uuid
            }
            className="group relative bg-surface-primary rounded-2xl border border-border-primary overflow-hidden hover:border-zinc-400/50 transition-colors duration-200"
          >
            <div className="p-6">
              {/* Header: ID, Status, Price */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-sm font-medium text-zinc-500 font-mono">
                    #
                    {(
                      booking.booking_uuid ||
                      booking.uuid ||
                      booking.instant_booking_uuid ||
                      booking.id ||
                      "OFFER"
                    )
                      .split("-")[0]
                      .toUpperCase()}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-zinc-300" />
                  <StatusBadge status={booking.status} />
                  {activeTab === "INSTANT" && (
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
                    ₹{booking.price || booking.total_payable_price || "TBD"}
                  </div>
                  {activeTab === "INSTANT" &&
                    booking.tip_amount &&
                    Number(booking.tip_amount) > 0 && (
                      <p className="text-sm font-medium text-emerald-600 mt-0.5">
                        + ₹{booking.tip_amount} tip
                      </p>
                    )}
                </div>
              </div>

              {/* Service Title */}
              <h3 className="text-xl font-semibold tracking-tight text-text-primary mb-6">
                {booking.service?.name ||
                  booking.requested_service_name ||
                  "Service Request"}
              </h3>

              {/* Minimal Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 mb-6 text-sm">
                {/* Customer */}
                {(booking.user || activeTab === "INSTANT") && (
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-zinc-400 mt-0.5" />
                    <div>
                      <p className="text-zinc-500 font-medium mb-0.5">
                        Customer
                      </p>
                      <p className="text-text-primary font-medium">
                        {activeTab === "INSTANT"
                          ? "Instant Request"
                          : booking?.status === "IN_PROGRESS" ||
                              booking?.status === "COMPLETED" ||
                              booking?.status === "CONFIRMED"
                            ? `${booking?.user?.first_name || ""} ${booking?.user?.last_name || ""}`.trim()
                            : booking.user?.user_uuid?.split("-")[0] ||
                              "Customer"}
                      </p>
                    </div>
                  </div>
                )}

                {/* Schedule */}
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-zinc-400 mt-0.5" />
                  <div>
                    <p className="text-zinc-500 font-medium mb-0.5">Schedule</p>
                    <p className="text-text-primary font-medium">
                      {activeTab === "INSTANT"
                        ? "As soon as possible"
                        : dateFormater(booking.scheduled_date)}
                    </p>
                    {activeTab !== "INSTANT" && booking.slot_type && (
                      <p className="text-zinc-500 mt-0.5">
                        {booking.slot_type}
                      </p>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 sm:col-span-2">
                  <MapPin className="w-4 h-4 text-zinc-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-zinc-500 font-medium mb-0.5">Location</p>
                    {booking.status === "IN_PROGRESS" ||
                    booking.status === "COMPLETED" ||
                    booking?.status === "CONFIRMED" ||
                    booking.status === "ASSIGNED" ? (
                      <a
                        href={
                          booking.instant_booking_uuid
                            ? getMapLink(booking)
                            : getMapLink(booking?.address)
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-primary font-medium hover:underline hover:text-text-secondary transition-colors inline-block"
                      >
                        {[
                          booking.address?.address_line,
                          booking.address?.locality,
                          booking.address?.city,
                          booking.address?.state,
                          booking.address?.pincode,
                        ]
                          .filter(Boolean)
                          .join(", ") ||
                          booking?.address ||
                          "View Location"}
                      </a>
                    ) : (
                      <p className="text-text-primary font-medium">
                        {booking.address?.locality ||
                          booking.address?.city ||
                          booking.address?.address_line ||
                          "Customer Location"}
                        {booking.distance_km && (
                          <span className="text-zinc-500 font-normal">
                            {" "}
                            • {booking.distance_km} km away
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                </div>

                {/* Notes */}
                {(booking.notes || booking.customer_note) && (
                  <div className="flex items-start gap-3 sm:col-span-2">
                    <MessageSquare className="w-4 h-4 text-zinc-400 mt-0.5" />
                    <div>
                      <p className="text-zinc-500 font-medium mb-0.5">Notes</p>
                      <p className="text-text-primary">
                        {booking?.notes || booking?.customer_note}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Assigned Staff & Actions */}
              <div className="pt-5 border-t border-border-primary flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                {/* Assigned Staff */}
                <div className="flex-1">
                  {(booking.booking_employees?.length > 0 ||
                    booking.employee ||
                    booking.employee_name) && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-zinc-500">
                        Assigned to:
                      </span>
                      <span className="text-sm font-medium text-text-primary">
                        {booking.booking_employees?.[0]?.name ||
                          booking.employee?.name ||
                          booking.employee_name ||
                          "Employee"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  {booking.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => declineBooking(booking.uuid)}
                        disabled={isDeclining}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium bg-surface-primary text-text-primary border border-border-primary hover:bg-surface-secondary transition-all disabled:opacity-50"
                      >
                        {isDeclining ? "Declining..." : "Decline"}
                      </button>
                      <button
                        onClick={() => acceptBooking(booking.uuid)}
                        disabled={isAccepting}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium bg-text-primary text-surface-primary hover:bg-zinc-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        {isAccepting ? "Accepting..." : "Accept"}
                      </button>
                    </>
                  )}

                  {(booking.status === "CONFIRMED" ||
                    booking.status === "ASSIGNED" ||
                    booking.status === "ACCEPTED") && (
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
                      {isIndividual || activeTab === "INSTANT" ? (
                        <button
                          onClick={() => {
                            if (activeTab === "INSTANT") {
                              startInstantBooking(
                                booking.id ||
                                  booking.uuid ||
                                  booking.instant_booking_uuid,
                              );
                            } else {
                              startBooking(
                                booking.booking_uuid || booking.uuid,
                              );
                            }
                          }}
                          disabled={isStarting || isStartingInstant}
                          className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium bg-text-primary text-surface-primary hover:bg-zinc-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          <Clock className="w-4 h-4" />
                          {isStarting || isStartingInstant
                            ? "Starting..."
                            : "Start Job"}
                        </button>
                      ) : !(
                          booking.booking_employees?.length > 0 ||
                          booking.employee ||
                          booking.employee_uuid
                        ) ? (
                        <button
                          onClick={() =>
                            setActiveModal({
                              type: "assign",
                              bookingId:
                                booking.id ||
                                booking.uuid ||
                                booking.instant_booking_uuid,
                              serviceId: booking.service?.service_uuid,
                              isReassign: false,
                              booking: booking,
                            })
                          }
                          className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium bg-text-primary text-surface-primary hover:bg-zinc-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          <UserPlus className="w-4 h-4" /> Assign
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() =>
                              setActiveModal({
                                type: "assign",
                                bookingId:
                                  booking.id ||
                                  booking.uuid ||
                                  booking.instant_booking_uuid,
                                serviceId: booking.service?.service_uuid,
                                isReassign: true,
                                oldEmployeeId:
                                  booking.booking_employees?.[0]
                                    ?.employee_uuid ||
                                  booking.employee?.employee_uuid ||
                                  booking.employee_uuid,
                                booking: booking,
                              })
                            }
                            className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium bg-surface-primary text-text-primary border border-border-primary hover:bg-surface-secondary transition-all"
                          >
                            Reassign
                          </button>
                          <button
                            onClick={() => {
                              if (activeTab === "INSTANT") {
                                startInstantBooking(
                                  booking.id ||
                                    booking.uuid ||
                                    booking.instant_booking_uuid,
                                );
                              } else {
                                startBooking(
                                  booking.booking_uuid || booking.uuid,
                                );
                              }
                            }}
                            disabled={isStarting || isStartingInstant}
                            className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium bg-text-primary text-surface-primary hover:bg-zinc-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                            <Clock className="w-4 h-4" />
                            {isStarting || isStartingInstant
                              ? "Starting..."
                              : "Start Job"}
                          </button>
                        </>
                      )}
                    </>
                  )}

                  {booking.status === "IN_PROGRESS" && (
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
                        href={`tel:${booking?.user?.phone || booking.customer_phone}`}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium bg-surface-primary text-text-primary border border-border-primary hover:bg-surface-secondary transition-all flex items-center justify-center gap-2"
                      >
                        <PhoneCallIcon className="w-4 h-4" /> Contact
                      </a>
                      <button
                        onClick={() => {
                          const targetId =
                            booking.id ||
                            booking.uuid ||
                            booking.instant_booking_uuid;
                          if (activeTab === "INSTANT") {
                            completeInstantBooking(targetId, {
                              onSuccess: () => {
                                setActiveModal({
                                  type: "otp",
                                  bookingId: targetId,
                                  booking: booking,
                                });
                              },
                            });
                          } else {
                            completeBooking(targetId, {
                              onSuccess: () => {
                                setActiveModal({
                                  type: "otp",
                                  bookingId: targetId,
                                  booking: booking,
                                });
                              },
                            });
                          }
                        }}
                        disabled={isCompleting || isCompletingInstant}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-nowrap text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        {isCompleting || isCompletingInstant
                          ? "Completing..."
                          : "Finish Job"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
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
        {activeModal?.type === "chat" && (
          <Chat activeModal={activeModal} setActiveModal={setActiveModal} />
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
            isLoading={isVerifying || isVerifyingInstant}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingsTab;
